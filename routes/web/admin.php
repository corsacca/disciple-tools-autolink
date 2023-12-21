<?php

use DT\Autolink\Controllers\Admin\GeneralSettingsController;

$r->get( 'wp-admin/admin.php?page=disciple_tools_autolink', GeneralSettingsController::class . '@show' );
$r->get( 'wp-admin/admin.php?page=disciple_tools_autolink&tab=general', GeneralSettingsController::class . '@show' );
$r->post( 'wp-admin/admin.php?page=disciple_tools_autolink', GeneralSettingsController::class . '@update' );
$r->post( 'wp-admin/admin.php?page=disciple_tools_autolink&tab=general', GeneralSettingsController::class . '@update' );
