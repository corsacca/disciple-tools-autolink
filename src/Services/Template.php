<?php

namespace DT\Autolink\Services;

use function DT\Autolink\Kucrut\Vite\enqueue_asset;
use function DT\Autolink\plugin_path;
use function DT\Autolink\view;

class Template {

	/**
	 * Allow access to blank template
	 * @return bool
	 */
	public function blank_access(): bool {
		return true;
	}

	/**
	 * Start with a blank template
	 * @return void
	 */
	public function template_redirect(): void {
		$path = get_theme_file_path( 'template-blank.php' );
		include $path;
		die();
	}

	/**
	 * Enqueue CSS and JS assets
	 * @return void
	 */
	public function wp_enqueue_scripts(): void {
		enqueue_asset(
			plugin_path( '/dist' ),
			'resources/js/plugin.js',
			[
				'handle'    => 'disciple_tools_autolink',
				'css-media' => 'all', // Optional.
				'css-only'  => false, // Optional. Set to true to only load style assets in production mode.
				'in-footer' => false, // Optional. Defaults to false.
			]
		);
	}


	/**
	 * Render the header
	 * @return void
	 */
	public function header() {
		wp_head();
	}

	/**
	 * Render the template
	 *
	 * @param $callback
	 *
	 * @return void
	 */
	public function render( $template, $data ) {
		add_action( 'template_redirect', [ $this, 'template_redirect' ] );
		add_filter( 'dt_blank_access', [ $this, 'blank_access' ] );
		add_action( 'dt_blank_head', [ $this, 'header' ] );
		add_action( 'dt_blank_footer', [ $this, 'footer' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ] );


		add_action( 'dt_blank_body', function () use ( $template, $data ) {
			// phpcs:ignore
			echo view()->render( $template, $data );
		} );
	}

	/**
	 * Render the footer
	 * @return void
	 */
	public function footer() {
		wp_footer();
	}
}
