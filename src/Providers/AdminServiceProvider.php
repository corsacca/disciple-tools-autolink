<?php

namespace DT\Autolink\Providers;

use DT\Autolink\Services\Router;
use function DT\Autolink\Kucrut\Vite\enqueue_asset;
use function DT\Autolink\plugin_path;

class AdminServiceProvider extends ServiceProvider {
	/**
	 * Do any setup needed before the theme is ready.
	 * DT is not yet registered.
	 */
	public function register(): void {
		add_action( 'admin_menu', [ $this, 'register_menu' ], 99 );
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
	}

	/**
	 * Register the admin menu
	 *
	 * @return void
	 */
	public function register_menu(): void {
		add_submenu_page( 'dt_extensions',
			__( 'AutoLink', 'disciple_tools_autolink' ),
			__( 'AutoLink', 'disciple_tools_autolink' ),
			'manage_dt',
			'disciple_tools_autolink',
			[ $this, 'register_admin_routes' ]
		);
	}

	public function admin_enqueue_scripts(): void {
		enqueue_asset(
			plugin_path( '/dist' ),
			'resources/js/admin.js',
			[
				'handle'    => 'disciple_tools_autolink_admin',
				'css-media' => 'all', // Optional.
				'css-only'  => false, // Optional. Set to true to only load style assets in production mode.
				'in-footer' => false, // Optional. Defaults to false.
			]
		);
	}


	/**
	 * Register the admin routes
	 *
	 * @return void
	 */
	public function register_admin_routes(): void {
		$router = $this->container->make( Router::class );
		$router->from_file( 'web/admin.php', [
			'query_string' => true,
		] )->make();
	}

	/**
	 * Do any setup after services have been registered and the theme is ready
	 */
	public function boot(): void {
		/*
		 * Array of plugin arrays. Required keys are name and slug.
		 * If the source is NOT from the .org repo, then source is also required.
		 */
		$plugins = [
			[
				'name'     => 'Disciple.Tools Dashboard',
				'slug'     => 'disciple-tools-dashboard',
				'source'   => 'https://github.com/DiscipleTools/disciple-tools-dashboard/releases/latest/download/disciple-tools-dashboard.zip',
				'required' => false,
			],
			[
				'name'     => 'Disciple.Tools Genmapper',
				'slug'     => 'disciple-tools-genmapper',
				'source'   => 'https://github.com/DiscipleTools/disciple-tools-genmapper/releases/latest/download/disciple-tools-genmapper.zip',
				'required' => true,
			],
			[
				'name'     => 'Disciple.Tools Autolink',
				'slug'     => 'disciple-tools-autolink',
				'source'   => 'https://github.com/DiscipleTools/disciple-tools-genmapper/releases/latest/download/disciple-tools-autolink.zip',
				'required' => true,
			],
		];

		/*
		 * Array of configuration settings. Amend each line as needed.
		 *
		 * Only uncomment the strings in the config array if you want to customize the strings.
		 */
		$config = [
			'id'           => 'disciple_tools',
			// Unique ID for hashing notices for multiple instances of TGMPA.
			'default_path' => '/partials/plugins/',
			// Default absolute path to bundled plugins.
			'menu'         => 'tgmpa-install-plugins',
			// Menu slug.
			'parent_slug'  => 'plugins.php',
			// Parent menu slug.
			'capability'   => 'manage_options',
			// Capability needed to view plugin install page, should be a capability associated with the parent menu used.
			'has_notices'  => true,
			// Show admin notices or not.
			'dismissable'  => true,
			// If false, a user cannot dismiss the nag message.
			'dismiss_msg'  => 'These are recommended plugins to complement your Disciple.Tools system.',
			// If 'dismissable' is false, this message will be output at top of nag.
			'is_automatic' => true,
			// Automatically activate plugins after installation or not.
			'message'      => '',
			// Message to output right before the plugins table.
		];

		tgmpa( $plugins, $config );
	}
}
