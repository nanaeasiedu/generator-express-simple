module.exports = function (grunt) {
  var config = {
    jshint: {
      options: {
        ignores: ['node_modules/**', 'public/vendor/**', '**/*.min.js'],
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'public/js/**/*.js', '**/*.js']
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
        script: 'index.js',
        options: {
          nodeArgs: ['--debug'],
          cwd: __dirname,
          ignore: ['node_modules/**', 'public/**'],
          ext: 'js',
          watch: ['./**'],
          delay: 1,
          legacyWatch: true
        }
      }
    },
    watch: {
      options: {
        files: ['!node_modules/**', '!public/vendor/**', '!**/*.min.*'],
        livereload: 3006
      },
      scripts: {
        files: ['Gruntfile.js', 'public/js/**/*.js', '**/*.js'],
        tasks: ['jshint']
      },
      <%= viewEngine %>: {
        files: ['views/**'],
        options: {
          livereload: 3006,
        }
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
