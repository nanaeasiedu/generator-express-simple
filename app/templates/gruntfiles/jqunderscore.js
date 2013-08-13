module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> \n' + '* By <%= pkg.author %> \n' + '* Distributed under <%= pkg.license %> \n' + '* Copyrights <%= grunt.template.today("yyyy") %> . All Rights Reserved */\n',
    jshint: {
      options: {
        ignores: ['./node_modules'],
        node: true,
        esnext: true,
        bitwise: true,
        camelcase: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        quotmark: "single",
        regexp: true,
        undef: true,
        unused: true,
        strict: true,
        trailing: true,
        smarttabs: true,
        white: true,
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
        }
      },
      my_target: {
        files: {}
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
      css: {
        files: ['!node_modules', './public/**/*.css'],
        options: {
          events: ['all'],
          livereload: 3355
        },
        tasks: ['cssmin']
      },
      html: {
        files: ['!node_modules', './views/**/*.html'],
        options: {
          events: ['all'],
          livereload: 3355
        },
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);
};
