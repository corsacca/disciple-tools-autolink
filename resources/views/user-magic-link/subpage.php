<?php
$this->layout( 'layouts/plugin' );
?>

<div>
    <b>
        Subpage
    </b>
</div>

<a href="<?php echo $this->e( $home_url ); ?>">
	<?php $this->esc_html_e( 'Visit home', 'disciple-tools-autolink' ); ?>
</a>
