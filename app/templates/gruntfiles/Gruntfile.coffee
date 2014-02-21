module.exports = ->
  config=
    jshint:
      options:
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js']
        jshintrc: '.jshintrc'
      all: ['Gruntfile.js', 'public/js/**/*.js', '**/*.js']
    <%= cssPreprocessor %>:
      files: [{
        expand: true,
        cwd: 'public/<%= cssPreprocessor %>'
        src: '**/*.<%= cssExt %>'
        dest: 'public/css'
        ext: '.css'
      }]
    cssmin:
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
    nodemon:
      dev:
        script: 'app.js'
        options:
          nodeArgs: ['--debug']
          cwd: __dirname
          cwd: __dirname,
          ignore: ['node_modules/**', 'public/**']
          ext: 'js'
          watch: ['./**']
          delay: 1
          legacyWatch: true
    watch:
      options:
        files: ['!node_modules/**', '!public/vendor/**', '!**/*.min.*']
      livereload:
        options:
          livereload: 3006
        files: ['public/css/**/*.min.css']
      scripts:
        files: ['Gruntfile.js', 'public/js/**/*.js', '**/*.js']
        tasks: ['jshint']
        livereload: 3006
      <%= viewEngine %>:
        files: ['views/**']
        options:
          livereload: 3006
      <%= cssExt %>:
        files: ['public/<%= cssPreprocessor %>/**/*.<%= cssExt %>']
        tasks: ['<%= cssPreprocessor %>', 'cssmin']
    concurrent:
      tasks: ['nodemon', 'node-inspector', 'watch']
      options:
        logConcurrentOutput: true

  @initConfig config

  # Load the tasks

  require('matchdep').filterDev('grunt-*').forEach @loadNpmTasks
  @registerTask 'default', ['jshint', '<%= cssPreprocessor %>', 'cssmin', 'concurrent']
