module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    }
  });

  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('test', []);

  grunt.registerTask('deploy', ['test', 'shell']);
};