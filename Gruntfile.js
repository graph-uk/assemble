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
			elements: {
				files: [
					'assets/images/elements.svg'
				],
				tasks: ['elements', 'concat:core']
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


	grunt.registerTask('elements', 'Transform a SVG sprites to a JS file',
		function () {
			var LINE_LENGTH = 100, svg = [], i, l, content;

			content = grunt.file.read('assets/images/elements.svg');
			content = content.replace(/'/g, "\\'");
			content = content.replace(/>\s+</g, "><").trim();
			l = Math.ceil(content.length / LINE_LENGTH);

			for (i = 0; i < l; i++) {
				svg.push("'" + content.substr(i * LINE_LENGTH, LINE_LENGTH) + "'");
			}

			grunt.file.write('assets/_/javascripts/elements.js',
				'App.defaults("App.SVG", {elements:\n' + svg.join('+\n') + '\n});');
		}
	);


	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');


	grunt.registerTask('server', ['connect', 'watch']);
	grunt.registerTask('assets', ['clean:styles', 'clean:scripts', 'elements', 'concat', 'uglify', 'less']);
	grunt.registerTask('default', ['clean:pages', 'assemble:prod', 'assets']);
	grunt.registerTask('dev', ['clean:pages', 'assemble:dev', 'assets']);

};
