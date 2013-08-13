module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> \n' + '* By <%= pkg.author %> \n' + '* Distributed under <%= pkg.license %> \n' + '* Copyrights <%= grunt.template.today("yyyy") %> . All Rights Reserved */\n',
    jshint: {
      options: {
        ignores: ['./node_modules', './public/js/jquery.min.js', './bower_components'],
        node: true,
        eqeqeq: true,
        curly: true,
        debug: true,
        eqnull: true,
        multistr: true,
        asi: false,
        quotmark: true,
        globals: {
          jquery: true,
          browser: true
        }
      },
      all: ['routes/**/*.js', 'public/**/*.js', 'app.js', 'Grunfile.js']
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery', '$']
        },
        banner: '<%= banner %>'
      },
      my_target: {
        files: {}
      }
    },
    less: {
      development: {
        options: {
          path: ['./public/css']
        },
        files: {
          './public/css/style.css': './less/style.less'
        }
      }
    },
    cssmin: {
      compress: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          './public/css/style.min.css': ['./bower_components/normalize-css/normalize.css', './public/css/style.css']
        }
      }
    },
    watch: {
      scripts: {
        files: ['!node_modules', 'app.js', 'Grunfile.js', './public/**/*.js', './routes/**/*.js'],
        options: {
          livereload: 3355,
          events: ['all']
        },
        tasks: ['jshint', 'uglify']
      },
      less: {
        files: ['!node_modules', './**/*.less'],
        options: {
          events: ['all']
        },
        tasks: ['less', 'cssmin']
      },
      css: {
        files: ['!node_modules', './public/**/*.css'],
        options: {
          events: ['all'],
          livereload: 3355
        },
        tasks: ['cssmin']
      },
      jade: {
        files: ['!node_modules', './views/**/*.jade'],
        options: {
          events: ['all'],
          livereload: 3355
        },
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin', 'watch']);
};
