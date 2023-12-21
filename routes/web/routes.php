<?php
/**
 * @var RouteCollector $r
 */

use DT\Autolink\Controllers\RedirectController;
use DT\Autolink\FastRoute\RouteCollector;

$r->get( 'autolink', RedirectController::class . '@show' );
