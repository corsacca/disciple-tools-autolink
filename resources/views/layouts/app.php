<?php echo $this->layout( 'layouts/plugin' ); ?>

<?php
$logo_url = $logo_url ?? $this->functions()->fetch_logo();
?>
<header class="navbar">
	<a href="<?php echo esc_url( $this->functions()->get_link_url() ); ?>" title="<?php esc_attr_e( 'Autolink Home', 'disciple-tools-autolink' ) ?>">
		<img class="navbar__logo" src="<?php echo esc_url( $logo_url ) ?>">
	</a>
	<app-menu></app-menu>
</header>

<div class="app__wrapper <?php echo esc_attr( $app_class ?? "app--default" ); ?>">
	<?php echo $this->section( 'content' ) ?>
</div>