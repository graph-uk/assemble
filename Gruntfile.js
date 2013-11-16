'use strict';

module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		// project config
		pkg: pkg,

		// pages
		assemble: {
			options: {
				layoutdir: 'src/layouts',
				layout: 'default.hbs',
				partials: ['src/partials/*.hbs'],
				flatten: true,
				siteConfig: pkg.siteConfig
			},
			dev: {
				src: ['src/pages/*.hbs'],
				dest: './'
			},
			prod: {
				options: {
					production: true
				},
				src: ['src/pages/*.hbs'],
				dest: './'
			}
		},

		// styles
		less: {
			dist: {
				files: {
					'assets/styles/all.css': 'assets/styles/all.less'
				},
				options: {
					compress: true
				}
			}
		},

		// scripts
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				separator: "\n\n;",
				stripBanners: true
			},
			dist: {
				src: [
					'assets/javascripts/components/*.js',
					'assets/javascripts/application.js'
				],
				dest: 'assets/javascripts/all.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= concat.options.banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'assets/javascripts/all.min.js'
			}
		},

		// file watcher
		watch: {
			options: {
				atBegin: true,
				livereload: true
			},
			pages: {
				files: ['src/**/*.hbs'],
				tasks: 'assemble:dev'
			},
			styles: {
				files: ['assets/styles/**/*.less'],
				tasks: 'less'
			},
			scripts: {
				files: [
					'assets/javascripts/**/*.js',
					'!assets/javascripts/all.js',
					'!assets/javascripts/all.min.js'
				],
				tasks: ['concat', 'uglify']
			}
		},

		// internal server
		connect: {
			server: {
				options: {
					livereload: true
				}
			}
		}
	});


	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('server', ['connect', 'watch']);
	grunt.registerTask('assets', ['concat', 'uglify', 'less']);
	grunt.registerTask('default', ['assemble:prod', 'assets']);
	grunt.registerTask('dev', ['assemble:dev', 'assets']);

};
