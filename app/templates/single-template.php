<?php
 /*Template Name: <%= postName %>
 */
 
 get_header(); ?>
   <div id="primary">
    <div id="content" role="main">
      <?php
      $custom_posts = array( 'post_type' => '<%= customPostName %>', );
      $loop = new WP_Query( $custom_posts );
      ?>
      <?php 
        while ( have_posts() ) : the_post(); ?>
          <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
          <header class="entry-header">
            <?php the_title('<h1>', '</h1>'); ?>
          </header>

          <!-- Display movie review contents -->
          <div class="entry-content"><?php the_content(); ?></div>
        </article>
      <? endwhile; // End of the loop. 
      ?>
    </div>
  </div>
  <?php wp_reset_query(); ?>
<?php get_footer(); ?>