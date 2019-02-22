module.exports = function(grunt) {
  grunt.initConfig({
    ts: {
      default: {
        tsconfig: './tsconfig.json'
      },
      test: {
        tsconfig: './test/tsconfig.json'
      }
    },
    copy: {
      default: {
        files: [{ expand: true, cwd: 'src/', src: ['**/*.png'], dest: 'lib/' }]
      },
      test: {
        files: [{ expand: true, cwd: 'src/', src: ['**/*.png'], dest: 'test/lib/graphql-editor/src/' }]
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('test', ['ts:test', 'copy:test']);
  grunt.registerTask('default', ['ts:default', 'copy:default']);
};
