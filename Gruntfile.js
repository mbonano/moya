/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
      simplemocha: {
          options: {
              //globals: ['expect'],
              timeout: 3000,
              //ignoreLeaks: false,
              //grep: '*-test',
              ui: 'bdd',
              reporter: 'tap'
          },

          all: { src: ['test/**/*.js'] }
      },
      clean: {
          // clean all compilation directories prior to a build
          build: ['release'],
          // clean all tests and extraneous debug files from a release candidate
          dev: ['release/test','release/Gruntfile.js', 'release/conf/prod.conf.json'],
          prod: ['release/test','release/Gruntfile.js', 'release/conf/dev.conf.json']
      },
      copy: {
          release: {
              files: [
                  {
                      expand: true,
                      src: ['**'],
                      dest: 'release/'
                  }
              ]
          }
      }
  });

  // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task.
    grunt.registerTask('test', ['clean:build','simplemocha']);
    grunt.registerTask('release-dev', ['test','copy:release','clean:dev']);
    grunt.registerTask('release-prod', ['test','copy:release','clean:prod']);
    grunt.registerTask('default', ['release-dev']);

};
