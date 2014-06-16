'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  var modRewrite = require('connect-modrewrite');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: [
        '/**',
        ' * <%= pkg.description %>',
        ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>',
        ' * @link <%= pkg.homepage %>',
        ' * @author <%= pkg.author %>',
        ' * @license MIT License, http://www.opensource.org/licenses/MIT',
        ' */'
      ].join('\n')
    },
    dirs: {
      dest: 'dist'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['src/*.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    zip: {
      '<%= dirs.dest %>/logfmt-angular.zip': ['<%= dirs.dest %>/<%= pkg.name %>.js', '<%= dirs.dest %>/<%= pkg.name %>.min.js']
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
      }
    },
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
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.registerTask('build', ['karma:build', 'concat', 'uglify', 'zip']);

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'karma:build'
  ]);

  grunt.registerTask('default', ['build']);

  // Provides the bump task.
  grunt.registerTask('bump', 'Increment version number', function() {
    var versionType = grunt.option('type');
    function bumpVersion(version, versionType) {
      var type = {patch: 2, minor: 1, major: 0},
          parts = version.split('.'),
          idx = type[versionType || 'patch'];
      parts[idx] = parseInt(parts[idx], 10) + 1;
      while(++idx < parts.length) { parts[idx] = 0; }
      return parts.join('.');
    }
    var version;
    function updateFile(file) {
      var json = grunt.file.readJSON(file);
      version = json.version = bumpVersion(json.version, versionType || 'patch');
      grunt.file.write(file, JSON.stringify(json, null, '  '));
    }
    updateFile('package.json');
    updateFile('bower.json');
    grunt.log.ok('Version bumped to ' + version);
  });
};
