'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		"assemble": {
			"options": {
				//"engine": "mustache",
				"layoutdir": "src/layouts",
				"layout": "default.hbs",
				"helpers": "helpers/*.js",
				"partials": ["src/partials/*.hbs"],
				"flatten": true
			},
			"site": {
				"src": ['src/pages/*.hbs'],
				"dest": "site/"
			}
		},
		"watch": {
			"files": ['src/**/*.hbs'],
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
