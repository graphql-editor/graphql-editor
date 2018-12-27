module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    },
    watch: {
      files: ['src/**/*.tsx'],
      tasks: ['default']
    }
  });
  grunt.event.on('watch', function(action, filepath, target) {
    grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['ts']);
};
