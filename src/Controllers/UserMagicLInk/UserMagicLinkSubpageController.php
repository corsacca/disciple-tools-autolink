<?php

namespace DT\Autolink\Controllers\UserMagicLInk;

use DT\Autolink\MagicLinks\UserMagicLink;
use function DT\Autolink\view;

class UserMagicLinkSubpageController {

	public function __construct( UserMagicLink $magic_link ) {
		$this->magic_link = $magic_link;
	}

	public function show() {
		$home_url = $this->magic_link->url;
		view( 'user-magic-link/subpage', compact( 'home_url' ) );
	}
}
