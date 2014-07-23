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
				layout: 'one-column.hbs',
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
					'assets/_/styles/all.css': 'assets/styles/all.less'
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
			scripts: {
				src: [
					'assets/javascripts/components/**/*.js',
					'assets/javascripts/application.js'
				],
				dest: 'assets/_/javascripts/all.js'
			},
			core: {
				src: [
					'assets/javascripts/core.js'
				],
				dest: 'assets/_/javascripts/core.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= concat.options.banner %>'
			},
			scripts: {
				src: '<%= concat.scripts.dest %>',
				dest: '<%= concat.scripts.dest %>'
			},
			core: {
				src: '<%= concat.core.dest %>',
				dest: '<%= concat.core.dest %>'
			}
		},

		clean: {
			options: {
				force: true
			},
			pages: ['*.html'],
			styles: ['assets/_/styles'],
			scripts: ['assets/_/javascripts']
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
					'assets/javascripts/**/*.js'
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('server', ['connect', 'watch']);
	grunt.registerTask('assets', ['clean:styles', 'clean:scripts', 'concat', 'uglify', 'less']);
	grunt.registerTask('default', ['clean:pages', 'assemble:prod', 'assets']);
	grunt.registerTask('dev', ['clean:pages', 'assemble:dev', 'assets']);

};
