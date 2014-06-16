// 'use strict';
//
// module.exports = function(grunt) {
//   var modRewrite = require('connect-modrewrite');
//
//   grunt.initConfig({
//     connect: {
//       options: {
//         port: 5556,
//         hostname: 'localhost',
//         debug: true,
//         livereload: 35729,
//         middleware: function(connect, options) {
//           var middlewares = [];
//           var directory = options.directory ||
//                           options.base[options.base.length - 1];
//
//           middlewares.push(modRewrite([
//             '^/logs/*$ index.html [L]'
//           ]));
//
//           return middlewares;
//         }
//       },
//       livereload: {
//         options: {
//           open: false,
//           port: 5556,
//           base: ['.']
//         }
//       }
//     },
//     watch: {
//       livereload: {
//         files: [
//           'index.html'
//         ]
//       }
//     }
//   });
//
//   grunt.loadNpmTasks('grunt-contrib-connect');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//
//   grunt.registerTask('serve', ['connect:livereload', 'watch']);
// }

'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var modRewrite = require('connect-modrewrite');

  grunt.initConfig({
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: ['index.html']
      },
    },

    connect: {
      options: {
        port: 7000,
        hostname: 'localhost',
        debug: true,
        livereload: 35329,
        middleware: function(connect, options) {
          var middlewares = [];
          var directory = options.directory ||
                          options.base[options.base.length - 1];

          // enable Angular's HTML5 mode
          middlewares.push(modRewrite([
            '^/*/*$ /examples/index.html [L]',
            '^/logs/*$ /examples/index.html [L]'
          ]));

          if (!Array.isArray(options.base)) {
            options.base = [options.base];
          }
          options.base.forEach(function(base) {
            // Serve static files.
            middlewares.push(connect.static(base));
          });

          // Make directory browse-able.
          middlewares.push(connect.directory(directory));

          return middlewares;
        }
      },
      livereload: {
        options: {
          open: false,
          port: 7000,
          base: [
            '.'
          ]
        }
      },
    },

    karma: {
      options: {
        configFile: 'karma.conf.js'
      },
      build: {
        singleRun: true,
        autoWatch: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'karma:build'
  ]);

  grunt.registerTask('default', [
  ]);
};
