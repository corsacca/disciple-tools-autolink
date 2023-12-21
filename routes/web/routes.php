<?php
/**
 * @var RouteCollector $r
 */

use DT\Autolink\Controllers\HelloController;
use DT\Autolink\FastRoute\RouteCollector;

$r->get( 'dt/autolink/hello', HelloController::class . '@show' );
