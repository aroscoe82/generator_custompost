<?php
/*
Plugin Name: <%= customer %>
Description: Custom Plugin For <%= customer %>: <%= postName %>: . <strong>CMB2 plugin dependent</strong>.
Version: 1.0
Author: Amanda Roscoe
Author URI: http://aroscoe.com/
*/

register_activation_hook( __FILE__, array('ARInstallCheck', 'install') );
if ( ! class_exists( 'ARInstallCheck' ) ) {
  class ARInstallCheck {
    static function install() {
      /**
      * Check if CMB2 is active
      **/
      if ( !in_array( 'cmb2/init.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) )  ) {
        
        // Deactivate the plugin
        deactivate_plugins(__FILE__);
        
        // Throw an error in the wordpress admin console
        $error_message = __('This plugin requires <a href="https://wordpress.org/plugins/cmb2/">CMB2</a> plugin to be active!', 'cmb2');
        die($error_message);
        
      }
    }
  }
}

add_action( 'init', 'create_<%= customPostName %>' );
function create_<%= customPostName %>() {
  register_post_type( '<%= customPostName %>',
    array(
      'labels' => array(
        'name' => '<%= postName %>',
        'singular_name' => '<%= postName %>',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New <%= postSingleName %>',
        'edit' => 'Edit',
        'edit_item' => 'Edit <%= postSingleName %>',
        'new_item' => 'New <%= postSingleName %>',
        'view' => 'View',
        'view_item' => 'View <%= postSingleName %>',
        'search_items' => 'Search <%= postSingleName %>s',
        'not_found' => 'No <%= postSingleName %>s found',
        'not_found_in_trash' => 'No <%= postSingleName %>s found in Trash',
        'parent' => 'Parent <%= postSingleName %>'
        ),

      'public' => true,
      'menu_position' => 5,
      'supports' => array( 'title', 'editor' ),
      'taxonomies' => array( '' ),
      'menu_icon' => 'dashicons-info',
      'has_archive' => true,
      )
    );
}

/* Templating */
function include_template_function( $template_path ) {
  if ( get_post_type() == '<%= customPostName %>' ) {
    if ( is_single() ) {
            // checks if the file exists in the theme first,
            // otherwise serve the file from the plugin
      if ( $theme_file = locate_template( array ( 'single-<%= customPostName %>.php' ) ) ) {
        $template_path = $theme_file;
      } else {
        $template_path = plugin_dir_path( __FILE__ ) . '/single-<%= customPostName %>.php';
      }
    }
  }
  return $template_path;
}
add_filter( 'template_include', 'include_template_function', 1 );

function <%= customPostName %>_admin_css($hook_suffix) {

  global $typenow; if ($typenow=="<%= customPostName %>") {

    echo  "<link type='text/css' rel='stylesheet' href='" . plugins_url('css/cmb2.css', __FILE__) . "' />";
    echo  "<link type='text/css' rel='stylesheet' href='" . plugins_url('css/<%= customPostName %>_custom.css', __FILE__) . "' />";

  }
}
add_action('admin_enqueue_scripts', '<%= customPostName %>_admin_css');

@include 'cmb2-js-validation-required.php';

<% if (customMeta) {%>
@include '<%= postSingleName %>s_Meta.php';
<% } %>
?>