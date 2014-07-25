'use strict';

module.exports = function(grunt) {

	var pkg = grunt.file.readJSON('package.json');

	if (typeof grunt.option('livereload') == "undefined") {
		grunt.option('livereload', false);
	}


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
					'assets/javascripts/core.js',
					'assets/_/javascripts/elements.js'
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

		svg2string: {
			options: {
				template: 'App.defaults("App.SVG", {"[%= sanitized %]":\n[%= content %]\n});'
			},
			elements: {
				files: {
					'assets/_/javascripts/elements.js': 'assets/images/elements.svg'
				}
			}
		},

		// file watcher
		watch: {
			options: {
				spawn: false,
				atBegin: true,
				livereload: grunt.option('livereload')
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
				tasks: 'concat'
			},
			svg2string: {
				files: [
					'assets/images/elements.svg'
				],
				tasks: ['svg2string', 'concat:core']
			}
		},

		// internal server
		connect: {
			server: {
				options: {
					livereload: false,
					base: ['Prototype', ''],
					hostname: '*',
					port: 8000
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
	grunt.loadNpmTasks('grunt-svg2string');


	grunt.registerTask('server', ['connect', 'watch']);
	grunt.registerTask('assets', ['clean:styles', 'clean:scripts', 'svg2string', 'concat', 'uglify', 'less']);
	grunt.registerTask('default', ['clean:pages', 'assemble:prod', 'assets']);
	grunt.registerTask('dev', ['clean:pages', 'assemble:dev', 'assets']);

};
