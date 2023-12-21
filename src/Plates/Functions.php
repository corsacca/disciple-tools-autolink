<?php

namespace DT\Autolink\Plates;

use DT\Autolink\League\Plates\Engine;
use DT\Autolink\League\Plates\Extension\ExtensionInterface;
use DT\Autolink\Functions as AutolinkFunctions;
use function DT\Autolink\container;

class Functions implements ExtensionInterface {


	public function register( Engine $engine ) {
		$engine->registerFunction( 'functions', function() {
			return container()->make( AutolinkFunctions::class);
		} );
	}
}
