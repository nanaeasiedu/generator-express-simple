module.exports = ->
  config=
    jshint:
      options:
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js']
        jshintrc: '.jshintrc'
      server: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js']
      client: 'public/**/*.js'
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
    nodemon:
      dev:
        script: 'app.js'
        options:
          nodeArgs: ['--debug']
          cwd: __dirname
          ignore: ['node_modules/', 'public/']
          ext: 'js'
          watch: '<%%= jshint.server %>'
          delay: 1
          legacyWatch: true
    watch:
      all:
        files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*']
        options:
          livereload: 3006
      scripts:
        files: 'public/js/**/*.js'
        tasks: 'jshint:client'
      server:
        files: '<%%= jshint.server %>'
        tasks: 'jshint:server'
      <%= cssExt %>:
        files: ['public/<%= cssPreprocessor %>/**/*.<%= cssExt %>']
        tasks: ['<%= cssPreprocessor %>', 'cssmin']
    concurrent:
      tasks: ['nodemon:dev', 'node-inspector', 'watch']
      options:
        logConcurrentOutput: true
        limit: 3

  @initConfig config

  # Load the tasks

  require('matchdep').filterDev('grunt-*').forEach @loadNpmTasks
  @registerTask 'default', ['jshint', '<%= cssPreprocessor %>', 'cssmin', 'concurrent']
