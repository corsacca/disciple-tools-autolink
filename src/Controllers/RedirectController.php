<?php

namespace DT\Autolink\Controllers;

use DT\Autolink\Functions;
use WP_REST_Response;
use function DT\Autolink\plugin_url;
use function DT\Autolink\template;

class RedirectController {
	/**
	 * @var Functions
	 */
	private $functions;

	public function __construct(Functions $functions) {
		$this->functions = $functions;
	}

	public function show() {
		if ( is_user_logged_in() ) {
			$this->functions->redirect_to_app();
		}

		wp_redirect( plugin_url('login') );
	}
}
