<?php

namespace DT\Autolink;

use DT\Autolink\Illuminate\Support\Str;
use DT\Autolink\League\Plates\Engine;
use DT\Autolink\Services\Template;

function plugin() {
	return Plugin::$instance;
}

function container() {
	return plugin()->container;
}


function plugin_path( $path = '' ) {
	return '/' . implode( '/', [
			trim( Str::remove( '/src', plugin_dir_path( __FILE__ ) ), '/' ),
			trim( $path, '/' ),
		] );
}

function plugin_url( $path = '' ) {
	return plugin_dir_url( Str::remove( __FILE__, '/src') . '/' . $path );
}

function src_path( $path = '' ) {
	return plugin_path( 'src/' . $path );
}

function resources_path( $path = '' ) {
	return plugin_path( 'resources/' . $path );
}

function routes_path( $path = '' ) {
	return plugin_path( 'routes/' . $path );
}

function views_path( $path = '' ) {
	return plugin_path( 'resources/views/' . $path );
}

function view( $view = "", $args = [] ) {
	$engine = container()->make( Engine::class );
	if ( ! $view ) {
		return $engine;
	}

	// phpcs:ignore
	echo $engine->render( $view, $args );
}

function template( $template = "", $args = [] ) {
	$service = container()->make( Template::class );
	if ( ! $template ) {
		return $service;
	}

	return $service->render( $template, $args );
}
