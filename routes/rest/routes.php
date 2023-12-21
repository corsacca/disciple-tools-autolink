<?php

use DT\Autolink\Controllers\HelloController;
use function DT\Autolink\container;

register_rest_route( 'dt/autolink/v1', 'hello', [
	[
		'methods'             => 'GET',
		'callback'            => [ container()->make( HelloController::class ), 'data' ],
		'permission_callback' => '__return_true',
	]
] );
