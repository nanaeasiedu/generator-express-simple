,module.exports = ->
  config=
    jshint:
      options:
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js']
        jshintrc: '.jshintrc'
      server: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js']
      client: 'public/js/**/*.js'
    concat:
      css:
        files:
          # add your css files over here to concatenate all css files
          # let's save our site users some bandwith
          src: ['public/vendor/bootstrap/dist/css/bootstrap.min.css', 'public/css/styles.min.css']
          dest: 'public/css/app.styles.min.css'
    uglify:
      options:
        mangle:
          except: ['jQuery']
      target:
        # add your js files over here to minify them into one javascript source file
        'public/js/app.min.js': ['public/vendor/jquery/dist/jquery.min.js', 'public/vendor/bootstrap/dist/js/bootstrap.min.js', 'public/js/main.js']
    <%= cssPreprocessor %>:
      src:
        files: [{
          expand: true
          cwd: 'public/<%= cssPreprocessor %>'
          src: '**/*.<%= cssExt %>'
          dest: 'public/css'
          ext: '.css'
        }]
    cssmin:
      src:
        files: [{
          expand: true
          cwd: 'public/css'
          src: '**/*.css'
          dest: 'public/css'
          ext: '.min.css'
        }]
    'node-inspector':
      options:
        'save-live-edit': true
    watch:
      all:
        files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*']
        options:
          livereload: true
      scripts:
        files: 'public/js/**/*.js'
        tasks: ['jshint:client', 'uglify']
      server:
        files: '<%%= jshint.server %>'
        tasks: 'jshint:server'
      <%= cssExt %>:
        files: ['public/<%= cssPreprocessor %>/**/*.<%= cssExt %>']
        tasks: ['<%= cssPreprocessor %>', 'cssmin', 'concat:css']
    concurrent:
      tasks: ['node-inspector', 'watch']
      options:
        logConcurrentOutput: true
        limit: 3

  @initConfig config

  # Load the tasks

  require('matchdep').filterDev('grunt-*').forEach @loadNpmTasks
  @registerTask 'default', ['jshint', 'uglify', '<%= cssPreprocessor %>', 'cssmin', 'concat:css', 'concurrent']
