<?php
namespace DT\Autolink\MagicLinks;
use DT\Autolink\Services\Router;
use DT_Magic_URL;
use DT_Magic_Url_Base;
use DT\Autolink\Functions;
use DT\Autolink\Services\GenMap;
use DT_Mapbox_API;
use function DT\Autolink\container;

/**
 * Class Disciple_Tools_Autolink_Magic_User_App
 */
class UserMagicLink extends DT_Magic_Url_Base {
	private static $_instance = null;
	public $page_title = 'Autolink';
	public $page_description = 'Autolink user app';
	public $root = "autolink";
	public $type = 'app';
	public $post_type = 'user';
	public $show_bulk_send = false;
	public $show_app_tile = false;
	public $functions;
	public $survey_controller;
	public $app_controller;
	public $genmap_controller;
	public $group_controller;
	public $tree_controller;
	public $login_controller;
	public $field_controller;
	public $training_controller;
	public $meta = [];
	private $meta_key = 'autolink-app'; // Allows for instance specific data.

	public function __construct() {
		/**
		 * Specify metadata structure, specific to the processing of current
		 * magic link type.
		 *
		 * - meta:              Magic link plugin related data.
		 *      - app_type:     Flag indicating type to be processed by magic link plugin.
		 *      - post_type     Magic link type post type.
		 *      - contacts_only:    Boolean flag indicating how magic link type user assignments are to be handled within magic link plugin.
		 *                          If True, lookup field to be provided within plugin for contacts only searching.
		 *                          If false, Dropdown option to be provided for user, team or group selection.
		 *      - fields:       List of fields to be displayed within magic link frontend form.
		 */
		$this->meta = [
			'app_type'      => 'magic_link',
			'post_type'     => $this->post_type,
			'contacts_only' => false,
			'fields'        => [
				[
					'id'    => 'name',
					'label' => 'Name'
				]
			]
		];

		$this->meta_key = $this->root . '_' . $this->type . '_magic_key';

		parent::__construct();


		$this->functions = container()->make( Functions::class );
		$this->router = container()->make( Router::class );

		//Genmapper isn't loaded on every request
		$this->functions->init_genmapper();

		$action = sanitize_key( wp_unslash( $_GET['action'] ?? '' ) );
		if ( dt_is_rest() || $action === 'genmap'
		                     && class_exists( 'DT_Genmapper_Metrics' ) ) {
			container()->make( GenMap::class );
		}

		/**
		 * user_app and module section
		 */
		add_filter( 'dt_settings_apps_list', [ $this, 'dt_settings_apps_list' ], 10, 1 );
		add_filter( 'autolink_health_fields', 'autolink_health_fields', 10, 1 );
		add_filter( 'autolink_updatable_group_fields', [ $this, 'autolink_updatable_group_fields' ], 10, 1 );
		add_action( 'rest_api_init', [ $this, 'add_endpoints' ] );

		/**
		 * tests if other URL
		 */
		$url         = dt_get_url_path();
		$current_url = $this->root . '/' . $this->type;

		if ( strpos( $url, $current_url ) === false ) {
			return;
		}

		/**
		 * tests magic link parts are registered and have valid elements
		 */
		if ( ! $this->check_parts_match() ) {
			return;
		}

		// if the user is not logged in, redirect to login page.
		if ( ! is_user_logged_in() ) {
			$this->functions->redirect_to_link();
		}

		// load if valid url
		wp_set_current_user( $this->parts['post_id'] );
		add_filter( 'user_has_cap', [ $this, 'user_has_cap' ], 100, 3 );
		add_action( 'dt_blank_body', function () {
			$this->ready();
			$this->routes();
		} );
		add_filter( 'dt_magic_url_base_allowed_css', [ $this->functions, 'dt_magic_url_base_allowed_css' ], 10, 1 );
		add_filter( 'dt_magic_url_base_allowed_js', [ $this->functions, 'dt_magic_url_base_allowed_js' ], 10, 1 );

		$app_public_key = get_user_option( DT_Magic_URL::get_public_key_meta_key( $this->root, $this->type ) );
		$this->url      = DT_Magic_URL::get_link_url( $this->root, $this->type, $app_public_key );
		$this->path     = trim( parse_url( $this->url )['path'], '/' );
	} // End instance()

	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	public function ready() {
		wp_set_current_user( $this->parts['post_id'] );
		$this->functions->add_session_leader();
	}

	/**
	 * Map routes to controllers
	 */
	public function routes() {
		$this->router
			->from_file( 'web/user-magic-link.php', [
				'param' => 'page',
			] )->make();
	}

	/**
	 * Builds magic link type settings payload:
	 * - key:               Unique magic link type key; which is usually composed of root, type and _magic_key suffix.
	 * - url_base:          URL path information to map with parent magic link type.
	 * - label:             Magic link type name.
	 * - description:       Magic link type description.
	 * - settings_display:  Boolean flag which determines if magic link type is to be listed within frontend user profile settings.
	 *
	 * @param $apps_list
	 *
	 * @return mixed
	 */
	public function dt_settings_apps_list( $apps_list ) {
		$apps_list[ $this->meta_key ] = [
			'key'              => $this->meta_key,
			'url_base'         => $this->root . '/' . $this->type,
			'label'            => $this->page_title,
			'description'      => $this->page_description,
			'settings_display' => true
		];

		return $apps_list;
	}

	/**
	 * Handle the header style hook
	 *
	 * Register the mapbox search widget css
	 */
	public function header_style() {
		DT_Mapbox_API::mapbox_search_widget_css();
	}

	/**
	 * Register REST Endpoints
	 * @link https://github.com/DiscipleTools/disciple-tools-theme/wiki/Site-to-Site-Link for outside of wordpress authentication
	 */
	public function add_endpoints() {
		$namespace = $this->root . '/v1';
		require_once routes_path( '/rest/user-magic-link.php' );
	}

	public function endpoint_post( WP_REST_Request $request ) {
		$params  = $request->get_params();
		$params  = dt_recursive_sanitize_array( $params );
		$user_id = get_current_user_id();

		if ( ! isset( $params['parts'], $params['action'] ) ) {
			return new WP_Error( __METHOD__, "Missing parameters", [ 'status' => 400 ] );
		}

		switch ( $params['action'] ) {
			case 'tree':
				return $this->tree_controller->data( $request, $params, $user_id );
			case 'onItemDrop':
				return $this->tree_controller->process( $request, $params, $user_id );
			case 'update_field':
				return $this->field_controller->update( $request, $params, $user_id );
			default:
				return new WP_Error( __METHOD__, "Invalid action", [ 'status' => 400 ] );
		}
	}

	/**
	 * Route REST endpointS by action
	 *
	 * @param WP_REST_Request $request
	 */
	public function endpoint_get( WP_REST_Request $request ) {
		$params = $request->get_params();
		if ( ! isset( $params['parts'], $params['action'] ) ) {
			return new WP_Error( __METHOD__, "Missing parameters", [ 'status' => 400 ] );
		}

		switch ( $params['action'] ) {
			case "parent_group_field":
				return $this->group_controller->parent_group_field();
				break;
			case "groups":
				return $this->group_controller->index();
			default:
				return new WP_Error( __METHOD__, "Invalid action", [ 'status' => 400 ] );
		}
	}

	/**
	 * Make sure the user can do everything we need them to do during this request.
	 *
	 * @param array $allcaps Existing capabilities for the user
	 * @param string $caps Capabilities provided by map_meta_cap()
	 * @param array $args Arguments for current_user_can()
	 *
	 * @return array
	 * @see WP_User::has_cap() in wp-includes/capabilities.php
	 */
	public function user_has_cap( $allcaps, $caps, $args ) {
		$allcaps['view_any_contacts'] = true;

		return $allcaps;
	}

	public function autolink_updatable_group_fields( $fields ) {
		return array_merge( $this->autolink_health_fields( $fields ), [
			'health_metrics'
		] );
	}

	public function autolink_health_fields( $fields ) {
		return array_merge( [
			'member_count',
			'leader_count',
			'believer_count',
			'baptized_count',
			'baptized_in_group_count'
		], $fields );
	}
}