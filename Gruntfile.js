'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		"assemble": {
			"options": {
				//"engine": "mustache",
				"layoutdir": "src/layouts",
				"layout": "default.mustache",
				"helpers": "helpers/*.js",
				"flatten": true
			},
			"site": {
				"src": ['src/pages/*.mustache'],
				"dest": "site/"
			}
		},
		"watch": {
			"files": ['src/**/*.mustache'],
			"task": "assemble"
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-watch');
//	grunt.loadNpmTasks('grunt-contrib-concat');
//	grunt.loadNpmTasks('grunt-contrib-uglify');
//	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task.
	grunt.registerTask('default', ['assemble']);

};
