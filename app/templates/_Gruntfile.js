module.exports = function(grunt) {
  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      mainDir: <%= title %>,
      cssDir: 'css',
      sassDir: 'sass'
    },<% if (sassInclude) {%>

    sass: {
      dev: {
        options: {
          style: 'compact',
          lineNumbers: false,
          compass: false
        },
        files: [{
          expand: true,
          cwd: '<%%= project.sassDir %>', // All src matches are relative to (but don't include) this path
          src: ['*.scss'], // Pattern(s) to match, relative to the cwd
          dest: '<%%= project.cssDir %>', // Destination path prefix
          ext: '.css' // Replace any existing extension with this value in generated dest paths
        }]
      }
    },<% } %><% if (prefixInclude) {%>

    autoprefixer: {
      dev: {
        options: {
          browsers: ['last 3 versions', 'ie9', 'ie10']
        },
        no_dest_multiple: {
          src: '<%%= project.cssDir %>/*.css'
        }
      }
    },<% } %>

    copy: {
      main: {
        src: '<%%= project.cssDir %>/style.css', // source of file to copy
        dest: 'style.css', // destination with file name
      },
    },

    watch: {
      grunt: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js']
      },<% if (sassInclude && prefixInclude) {%>

      sass: {
        files: '<%%= project.sassDir %>/*.scss',
        tasks: ['sass', 'autoprefixer', 'copy']
      },<% }else{ if (sassInclude) {%>
      sass: {
        files: '<%%= project.sassDir %>/*.scss',
        tasks: ['sass', 'copy']
      },
      <%}if (prefixInclude) {%>
      autoprefixer: {
        files: '<%%= project.cssDir %>/*.scss',
        tasks: ['autoprefixer', 'copy']
      },
      <% }} %>
    }
  });

  // load tasks
  <% if (sassInclude) {%>grunt.loadNpmTasks('grunt-contrib-sass');<% } %>
  <% if (prefixInclude) {%>grunt.loadNpmTasks('grunt-autoprefixer');<% } %>
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // tasks
  grunt.registerTask('build', [<% if(sassInclude && prefixInclude) {%> 'sass', 'autoprefixer'<% }else{ if (sassInclude){%>'sass'<%} if (prefixInclude) {%>'autoprefixer'<%}}%>]);
  grunt.registerTask('default', ['watch']);
};
