module.exports = function (grunt) {
  var config = {
    jshint: {
      options: {
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
        jshintrc: '.jshintrc'
      },
      gruntfile: 'Gruntfile.js',
      server: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js'],
      client: 'public/**/*.js'
    },
    <%= cssPreprocessor %>: {
      files: [{
        expand: true,
        cwd: 'public/<%= cssPreprocessor %>',
        src: '**/*.<%= cssExt %>',
        dest: 'public/css',
        ext: '.css'
      }]
    },
    cssmin: {
      files: [{
        expand: true,
        cwd: 'public/css',
        src: '**/*.css',
        dest: 'public/css',
        ext: '.min.css'
      }]
    },
    'node-inspector': {
      options: {
        'save-live-edit': true
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          cwd: __dirname,
          ignore: ['node_modules/', 'public/'],
          ext: 'js',
          watch: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js'],
          delay: 1,
          legacyWatch: true
        }
      }
    },
    watch: {
      all: {
        files: ['public/**/*', 'views/**', '!**/node_modules/**', '!public/vendor/**/*', '!**/*.min.*'],
        options: {
          livereload: 3006
        }
      },
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: 'jshint:gruntfile'
      },
      scripts: {
        files: 'public/js/**/*.js',
        tasks: 'jshint:client'
      },
      server: {
        files: [<% if (options.mvc) { %>'controllers/**/*.js', 'models/**/*.js', <% } %>'routes/**/*.js', 'app.js', 'config.js'],
        tasks: 'jshint:server'
      },
      <%= cssExt %>: {
        files: ['public/<%= cssPreprocessor %>/**/*.<%= cssExt %>'],
        tasks: ['<%= cssPreprocessor %>', 'cssmin']
      }
    },
    concurrent: {
      tasks: ['nodemon', 'node-inspector', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  };

  grunt.initConfig(config);

  // Load the tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', '<%= cssPreprocessor %>', 'cssmin', 'concurrent']);
};
