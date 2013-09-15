module.exports = function(grunt) {
  grunt.initConfig({
    banner: '/* <%%= pkg.name %> <%%= pkg.version %> \n' + '* By <%%= pkg.author %> \n' + '* Distributed under <%%= pkg.license %> \n' + '* Copyrights <%%= grunt.template.today("yyyy") %> . All Rights Reserved */\n',
    pkg: grunt.file.readJSON('./package.json'),
    jshint: {
      options: {
        ignores: ['./node_modules', './public/bower_components/**/*.js', './**/*.min.js'],
        jshintrc: '.jshintrc'
      },<% if (options.mvc !== false) { %>
      all: ['routes/**/*.js', 'public/**/*.js', 'models/**/*.js', 'controllers/**/*.js', 'app.js', 'Grunfile.js']<% } else { %>
      all: ['routes/**/*.js', 'public/**/*.js', 'app.js', 'Grunfile.js']<% } %>
    },
    uglify: {
      options: {
        banner: '<%%= banner %>',
        mangle: {
          except: ['jQuery', '$']
        }
      },
      my_target: {
        files: {}
      }
    },<% if (cssPreprocessor === 'less') { %>
    less: {
      development: {
        options: {
          paths: ['./public/less']
        },
        files: {
          './public/css/style.css': './public/less/style.less'
        }
      }
    },<% } else if (cssPreprocessor === 'stylus') { %>
    stylus: {
      compile: {
        options: {
          paths: ['./public/stylus'],
          import: [],
          compress: false
        },
        files: {
          './public/css/style.css': './public/stylus/style.styl'
        }
      }
    },<% } else if (cssPreprocessor === 'sass') { %>
    sass: {
      dist: {
        options: {
          includePaths: ['./public/sass']
        },
        files: {
          './public/css/style.css': './public/sass/style.scss'
        }
      }
    },<% } %>
    cssmin: {
      compress: {
        options: {
          banner: '<%%= banner %>'
        },
        files: {
          './public/css/style.min.css': ['./public/bower_components/normalize-css/normalize.css', './public/css/style.css']
        }
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3,
        files: {}
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
      }<% if (cssPreprocessor) { %>,
      <%= cssPreprocessor %>: {
        files: ['!node_modules', <% if (cssPreprocessor === 'sass') { %>'./**/*scss'<% } else if (cssPreprocessor && cssPreprocessor !== 'sass') { %>'./**/*<%= cssPreprocessor %>'<% } %>],
        options: {
          events: ['all']
        },
        tasks: ['<%= cssPreprocessor %>', 'cssmin']
      }<% } %>,
      css: {
        files: ['!node_modules', './public/**/*.css'],
        options: {
          events: ['all'],
          livereload: 3355
        },
        tasks: ['cssmin']
      },<% if (htmlEngine === 'underscore') { %>
      html<% } else { %><%= htmlEngine %><% } %>: {
        files: ['!node_modules', <% if  (htmlEngine === 'underscore') { %>'./views/**/*.html'<% } else { %>'./views/**/*.<%= htmlEngine %>'<% } %>],
        options: {
          events: ['all'],
          livereload: 3355
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');<% if (cssPreprocessor === 'sass') { %>
  grunt.loadNpmTasks('grunt-<%= cssPreprocessor %>');<% } else if (cssPreprocessor && cssPreprocessor !== 'sass') { %>
  grunt.loadNpmTasks('grunt-contrib-<%= cssPreprocessor %>')<% } %>
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'uglify', 'imagemin', <% if (cssPreprocessor) { %>'<%= cssPreprocessor %>', <% } %>'cssmin', 'watch']);
};
