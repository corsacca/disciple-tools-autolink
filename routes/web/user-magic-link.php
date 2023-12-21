<?php

use DT\Autolink\Controllers\UserMagicLInk\UserMagicLinkController;
use DT\Autolink\Controllers\UserMagicLInk\UserMagicLinkSubpageController;
use DT\Autolink\MagicLinks\UserMagicLink;
use function DT\Autolink\container;

$container  = container();
$magic_link = $container->make( UserMagicLink::class );

$r->get( $magic_link->path, UserMagicLinkController::class . '@show' );
$r->get( $magic_link->path . '?page=subpage', UserMagicLinkSubpageController::class . '@show' );
