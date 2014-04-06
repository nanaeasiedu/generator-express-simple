gulp = require 'gulp'
<%= cssPreprocessor %> = require 'gulp-<%= cssPreprocessor %>'
concat = require 'gulp-concat'
jshint = require 'gulp-jshint'
nodemon = require 'gulp-nodemon'

paths:
  server: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js']
  client: 'public/js/**/*.js'

gulp.task 'lintserver', ->
  gulp
    .src paths.server
    .pipe jshint '.jshintrc'
    .pipe jshint.reporter 'jshint-stylish'

gulp.task 'lintclient', ->
  gulp
    .src paths.client
    .pipe jshint '.jshintrc'
    .pipe jshint.reporter 'jshint-stylish'

gulp.task 'lint', ['lintserver', 'lintclient']

gulp.task '<%= cssPreprocessor %>', ->
  gulp
    .src './public/<%= cssPreprocessor %>/**/*.<%= cssExt %>'
    .pipe <%= cssPreprocessor %>()
    .pipe gulp.dest './public/css'

gulp.task 'dev'. ->
  nomdeon
    script: 'app.js'
    nodeArgs: ['--debug']
    cwd: __dirname
    ignore: ['node_modules/', 'public/']
    ext: 'js'
    watch: paths.server
    delay: 1
    legacyWatch: true
