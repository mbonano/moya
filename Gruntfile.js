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
      jshint: {
          all: ['lib','test']
      },
      watch: {
          options: {
              livereload: true
          },
          files: ['lib/**','test/**'],
          tasks: ['test']
      }
  });

  // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
    grunt.registerTask('test', ['simplemocha','jshint']);
    grunt.registerTask('default', ['test']);

};
