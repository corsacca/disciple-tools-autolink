<?php

namespace DT\Autolink\Controllers\UserMagicLInk;

use DT\Autolink\Functions;
use DT\Autolink\MagicLinks\UserMagicLink;
use DT_Posts;
use WP_REST_Response;
use function DT\Autolink\view;

class AppController extends UserMagicLInkController {
	public function show() {
		$user        = wp_get_current_user();
		if ( ! $this->functions->survey_completed() ) {
			return wp_redirect( $this->functions->get_app_link() . '?action=survey' );
		}

		$post_type          = get_post_type_object( 'groups' );
		$group_labels       = get_post_type_labels( $post_type );
		$delete_group_nonce = wp_create_nonce( 'dt_autolink_delete_group' );
		$action             = '';
		$limit              = 10;
		$churches           = DT_Posts::list_posts( 'groups', [
			'assigned_to' => [ get_current_user_id() ],
			'limit'       => $limit,
			'sort'        => '-post_date'
		], false );

		//Apply WP formatting to all date fields.
		$churches['posts'] = array_map( function ( $church ) {
			foreach ( $church as $key => $value ) {
				if ( is_array( $value ) && isset( $value['timestamp'] ) ) {
					$church[ $key ]['formatted'] = dt_format_date( $value['timestamp'], get_option( 'date_format' ) );
				}
			}

			return $church;
		}, $churches['posts'] ?? [] );
		$churches['total'] = $churches['total'] ?? 0;
		$translations      = [
			'groups_heading'       => __( 'My', 'disciple-tools-autolink' ) . ' ' . $group_labels->name,
			'start_date_label'     => __( 'Church Start Date', 'disciple-tools-autolink' ),
			'view_group'           => __( 'View', 'disciple-tools-autolink' ) . ' ' . $group_labels->singular_name,
			'delete_group'         => __( 'Delete', 'disciple-tools-autolink' ) . ' ' . $group_labels->singular_name,
			'delete_group_confirm' => __( 'Are you sure you want to delete this ', 'disciple-tools-autolink' ) . strtolower( $group_labels->singular_name ) . '?',
			'edit_group'           => __( 'Edit', 'disciple-tools-autolink' ) . ' ' . $group_labels->singular_name,
			'more'                 => __( 'More', 'disciple-tools-autolink' )
		];
		$links             = [
			'delete_group' => $this->functions->get_app_link() . '?action=delete-group&_wpnonce=' . $delete_group_nonce,
			'edit_group'   => $this->functions->get_app_link() . '?action=edit-group',
			'view_group'   => $this->functions->get_app_link() . '?action=group',
			'create_group' => $this->functions->get_app_link() . '?action=create-group'
		];

		$error = $params['error'] ?? false;

		if ( is_wp_error( $churches ) ) {
			$churches = [];
		}

		$group_fields                = DT_Posts::get_post_field_settings( 'groups' );
		$church_fields               = [
			'health_metrics' => $group_fields['health_metrics']['default'] ?? [],
		];
		$church_health_field         = $church_fields['health_metrics'];
		$allowed_church_count_fields = [
			'member_count',
			'leader_count',
			'believer_count',
			'baptized_count',
			'baptized_in_group_count'
		];
		$church_count_fields         = [];

		foreach ( $allowed_church_count_fields as $field ) {
			//Fields can be registered or deregistered by plugins,so check and make sure it exists
			if ( isset( $group_fields[ $field ] ) && ( ! isset( $group_fields[ $field ]['hidden'] ) || ! $group_fields[ $field ]['hidden'] ) ) {
				$church_count_fields[ $field ] = $group_fields[ $field ];
			}
		}


		view( 'user-magic-link/show', array_merge($this->global_data(), compact(
			'user',
			'churches',
			'church_count_fields',
			'church_health_field',
			'church_fields',
			'group_labels',
			'links',
			'error',
			'limit',
			'translations',
			'action'
		) ));
	}

	public function data() {
		$user = wp_get_current_user();
		$data = [
			'user_login' => $user->user_login,
		];

		return new WP_REST_Response( $data, 200 );
	}
}
