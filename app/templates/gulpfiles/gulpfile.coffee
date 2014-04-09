gulp = require 'gulp'
<%= cssPreprocessor %> = require 'gulp-<%= cssPreprocessor %>'
concat = require 'gulp-concat'
jshint = require 'gulp-jshint'
uglify = require 'gulp-uglify'
watch = require 'gulp-watch'
minifyCss = require 'gulp-minify-css'
rename = require 'gulp-rename'
concat =  require 'gulp-concat'
livereload = require 'gulp-livereload'
nodemon = require 'gulp-nodemon'

paths =
  server: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js']
  client: ['./public/js/**/*.js', '!./public/js/**/*.min.js']

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

gulp.task 'uglify', ->
  gulp
    .src paths.client
    .pipe uglify()
    .pipe rename suffix: '.min'
    .pipe gulp.dest './public/js'

gulp.task 'concatJs', ->
  gulp
    .src ['./public/vendor/jquery/dist/jquery.min.js', './public/vendor/bootstrap/dist/js/bootstrap.min.js', './public/js/**/*.min.js']
    .pipe concat 'app.min.js'
    .pipe gulp.dest './public/js'

gulp.task '<%= cssPreprocessor %>', ->
  gulp
    .src './public/<%= cssPreprocessor %>/**/*.<%= cssExt %>'
    .pipe <%= cssPreprocessor %>()
    .pipe gulp.dest './public/css'

gulp.task 'css', ->
  gulp
    .src ['./public/css/**/*.css', '!./public/css/**/*.min.css']
    .pipe minifyCss()
    .pipe rename suffix: '.min'
    .pipe gulp.dest './public/css'

gulp.task 'concatCss', ->
  gulp
    .src ['./public/vendor/bootstrap/dist/css/bootstrap.min.css,' './public/css/**/*.min.css']
    .pipe concat 'app.styles.min.css'
    .pipe gulp.dest './public/css'

gulp.task 'dev', ->
  nodemon
    script: 'app.js'
    nodeArgs: ['--debug']
    cwd: __dirname
    ignore: ['node_modules/', 'public/']
    ext: 'js'
    watch: paths.server
    delay: 1
    legacyWatch: true

gulp.task 'watch', ->
  server = livereload()

  gulp.watch paths.server, ['lintserver']
  gulp.watch paths.client, ['lintclient']
  gulp.watch paths.client, ['buildJs']
  gulp.watch './public/<%= cssPreprocessor %>/**/*.<%= cssExt %>', ['buildCss']
  gulp
    .src ['./views/**/*.<%= viewEngine %>', './public/css/**/*.min.css', './public/js/**/*.min.js']
    .pipe watch()
    .pipe server

gulp.task 'lint' ['lintserver', 'lintclient']
gulp.task 'buildCss' ['<%= cssPreprocessor %>', 'css', 'concatCss']
gulp.task 'buildJs' ['uglifyJs', 'concatJs']
gulp.task 'default', ['lint', 'buildCss', 'buildJs', 'watch']
