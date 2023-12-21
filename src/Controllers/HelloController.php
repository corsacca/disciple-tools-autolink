<?php

namespace DT\Autolink\Controllers;

use WP_REST_Response;
use function DT\Autolink\template;

class HelloController {
	/**
	 * Show the hello world message
	 *
	 * @return WP_REST_Response
	 */
	public function data() {
		return new WP_REST_Response( [
			'status'  => 'success',
			'message' => 'Hello World!'
		], 200 );
	}

	public function show() {
		$name = 'Friend';
		template( 'hello', compact( 'name' ) );
	}
}
