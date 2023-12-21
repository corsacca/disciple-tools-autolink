<?php

$this->layout( 'layouts/settings', compact( 'tab', 'link', 'page_title', 'error' ) )
?>

    <form method="post">
		<?php wp_nonce_field( 'dt_admin_form', 'dt_admin_form_nonce' ) ?>
        <table class="widefat striped">
            <thead>
            <tr>
                <th><?php esc_html_e( 'Options', 'disciple-tools-autolink' ) ?></th>
                <th style="width: 99%;"></th>
            </tr>
            </thead>
            <tbody>
            <tr><form method="post">
		<?php wp_nonce_field( 'dt_admin_form', 'dt_admin_form_nonce' ) ?>

        <!-- Add a form -->
    </form>
                <td style="white-space: nowrap;">
					<?php esc_html_e( 'Allow parent group selection?', 'disciple-tools-autolink' ) ?>
                </td>
                <td style="text-align: left;">
                    <input type="checkbox"
                           name="disciple_tools_autolink_allow_parent_group_selection"
                           value="1"
					       <?php if ( $old['disciple_tools_autolink_allow_parent_group_selection'] === '1' ): ?>checked<?php endif; ?> />
                </td>
            </tr>
            <tr>
                <td style="white-space: nowrap;">
					<?php esc_html_e( 'Add main DT menu link?', 'disciple-tools-autolink' ) ?>
                </td>
                <td style="text-align: left;">
                    <input type="checkbox"
                           name="disciple_tools_autolink_show_in_menu"
                           value="1"
					       <?php if ( $old['disciple_tools_autolink_show_in_menu'] === '1' ): ?>checked<?php endif; ?> />
                </td>
            </tr>
            <tr>
                <td style="white-space: nowrap;">
					<?php echo esc_attr( $training_videos_translations['label'] ) ?>
                </td>
                <td style="text-align: left;">
                    <div style="max-width: 600px">
                        <admin-training-videos-field
                                name="disciple_tools_autolink_training_videos"
                                value='<?php echo esc_attr( $old['disciple_tools_autolink_training_videos'] ) ?>'
                                default='<?php echo esc_attr( $default_training_videos ) ?>'
                                translations='<?php echo esc_attr( json_encode( $training_videos_translations ) ) ?>'
                        ></admin-training-videos-field>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <button class="button">
						<?php esc_html_e( 'Save', 'disciple-tools-autolink' ) ?>
                    </button>
                </td>
                <td></td>
            </tr>
            </tbody>
        </table>
    </form>

<?php $this->start( 'right' ) ?>

    <table class="widefat striped">
        <thead>
        <tr>
            <th>
				<?php esc_html_e( 'Help', 'disciple-tools-autolink' ) ?>
            </th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>
                <b>
					<?php esc_html_e( 'Allow parent group selection?', 'disciple-tools-autolink' ) ?>
                </b>
            </td>
        </tr>
        <tr>
            <td>

                <p>
					<?php esc_html_e( "If enabled, the user will be able to select a parent group when creating a new group.", 'disciple-tools-autolink' ) ?>
                </p>

                <p>
					<?php esc_html_e( "If disabled, the group will be assigned to the first leader's first group.", 'disciple-tools-autolink' ) ?>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <b>
					<?php esc_html_e( 'Add main DT menu link?', 'disciple-tools-autolink' ) ?>
                </b>
            </td>
        </tr>
        <tr>
            <td>

                <p>
					<?php esc_html_e( 'If enabled, an "Autolink" menu item will be present in the primary Disciple.Tools menu allowing easy access to Autolink.', 'disciple-tools-autolink' ) ?>
                </p>
            </td>
        </tr>
        <tr>
            <td>
                <b>
					<?php esc_html_e( 'Training Videos', 'disciple-tools-autolink' ) ?>
                </b>
            </td>
        </tr>
        <tr>
            <td>

                <p>
					<?php esc_html_e( 'Training vidoes are available from within the AutoLink main menu.', 'disciple-tools-autolink' ) ?>
                </p>
                <p>
                    <a class="button" href="<?php echo esc_attr( $training_videos_url ) ?>">
						<?php esc_html_e( 'View Training Videos', 'disciple-tools-autolink' ) ?>
                    </a>
                </p>
            </td>
        </tr>
        </tbody>
    </table>

<?php $this->stop() ?>