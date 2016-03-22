'use strict';

module.exports = function(grunt) {
	var distBath = 'public/cdn/release/'
	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		compress: {
			imgcache: {
				options: {
					mode: 'zip',
					archive: 'public/offline/local.zip'
				},
				files: [
					{
						expand: true,
						cwd: distBath,
						//离线包需要打包的文件
						src: [
							'html/index.html',
							'html/detail.html',
							'html/video.html',
							'html/category.html',
							'html/more.html',
							'html/search.html',
							'html/payRead.html',
							'html/payDownload.html',
							'js/**',
							'!js/widget/act_loader.js', //活动文件不放在离线包内
							'!js/widget/floor_act*.js', //活动文件不放在离线包内
							'!js/lib/swiper.js', //活动文件不放在离线包内
							'img/404.png',
							'img/bg2.png',
							'img/comment_none.png',
							'img/detail_bg.png',
							'img/end.png',
							'img/logo.png',
							'img/share_icon.png',
							'img/tabbg.png',
							'img/index/bg_subject.jpg',
							'img/index/tag_pop.png',
							'img/index/index_sprite.png'
						],
						map: function(filename){
							var newfilename = filename.replace(distBath, 'release/');
							//console.log('replace:'+filename+'=>'+newfilename);
							return newfilename;
						},
						dest: 'imgcache.qq.com/club/client/comic/release/', filter: 'isFile'
					}
				]
			}
		},
		transport: {
			options: {
				debug: false,
				force: true
			},
			index: {
				options: {
					paths: [
						'src/js'
					],
					alias: {
						'zepto': 'lib/zepto'
					}
				},
				files: [
					{
						expand: true,
						cwd: 'src/js/',
						src: [
							'business/*.js',
							'lib/*.js',
							'page/*.js',
							'util/*.js',
							'widget/*.js'
						//'**/*.js'
						],
						dest: 'md5Src/js/'
					}
				]
			}
		},
		uglify: {
			allJs: {
				options: {
					compress: {},
					mangle: true,
					maxLineLen: 200
				},
				files: [{
					expand: true,
					cwd: 'web/jsx',
					src: '**/*.js',
					dest: 'web/js'
				}]
			},
			package: {
				options: {
					compress: {},
					mangle: true,
					maxLineLen: 200
				},
				src: [
					'md5Src/js/lib/sea.js',
					'md5Src/js/lib/seajs-module-config.js',
					'md5Src/js/business/map.js',
					'md5Src/js/business/mergeRequest.js',
					'md5Src/js/business/security.js',
					//log上报
					'md5Src/js/business/detaillogReport.js',
					'md5Src/js/business/common.js',
					'md5Src/js/business/router.js',
					'md5Src/js/business/comic.js',
					'md5Src/js/business/jsbridge.js',
					'md5Src/js/widget/redpoint.js',
					'md5Src/js/widget/login.js',
					'md5Src/js/widget/dialog.js',
					//合并请求文件
					'md5Src/js/business/mergeRequest.js',
					'md5Src/js/business/security.js',
				],
				dest: 'md5Src/js/businessLib.js'
			}

		},
        less: {
            main: {
                files: [{
                    expand: true,     // Enable dynamic expansion.
                    cwd: 'web/less',      // Src matches are relative to this path.
                    src: '**/*.less', // Actual pattern(s) to match.
                    dest: 'web/css',   // Destination path prefix.
                    ext: '.css',   // Dest filepaths will have this extension.
                }]
            }
        },
		embed: {
			online: {
				src: ['src/html/*.html'],
				map: function(filename){
					var newfilename = filename.replace('src/html',distBath +  'html').replace('src/', 'md5Src/').replace('\\src\\','\\md5Src\\');
					//console.log('online replace:'+filename+'=>'+newfilename);
					return newfilename;
				},
				urlmap: {
				}
			},
			offline: {
				src: ['web/html/*.html'],
				map: function(filename){
					var newfilename = filename.replace('src/html',distBath +  'html').replace('src/', 'md5Src/').replace('\\src\\','\\md5Src\\');
					//console.log('offline replace:'+filename+'=>'+newfilename);
					return newfilename;
				},
				urlmap: {
				}
			}
		},
		clean: {
			dirs: ['release/js','release/img','release/html', 'md5Src', 'public/cdn','offline']
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/pic/', src: '**', dest: distBath + 'pic/'},
					{expand: true, cwd: 'src/img/', src: '**', dest: distBath + 'img/'},
					{expand: true, cwd: 'src/js/', src: '**', dest: 'md5Src/js/'},
					{expand: true, cwd: 'src/css/', src: '**', dest: 'md5Src/css/'}
				]
			},
			package: {
				files: [
					{expand: true, cwd: 'md5Src/js/', src: '*.*.js', dest: distBath + 'js/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/js/business', src: ['search.js', 'video.js', 'actPoint.js', 'indexBubble.js', 'dialogMediator.js',  'animeTips.js', 'pay.js'], dest: distBath + 'js/business/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/css/', src: '*.css', dest: distBath + 'css/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/js/lib', src: ['zepto.js', 'swiper.js'], dest: distBath + 'js/lib/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/js/public', src: 'piggy.js', dest: distBath + 'js/public/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/js/util', src: 'qqComicVideoAuth.js', dest: distBath + 'js/util/', filter: 'isFile'},
					{expand: true, cwd: 'md5Src/js/widget', src: ['redpoint.js', 'floor_act.js', 'pay.js', 'act_loader.js'], dest: distBath + 'js/widget/', filter: 'isFile'}
				]
			},
			release: {
				files: [
					{expand: true, cwd: distBath, src: '**', dest: 'release/', flatten: false, filter: 'isFile'}
				]
			}
		},
		version: {
			src: 'release/version/version.js',
			dest: 'md5Src/version/'
		},
		cssmin: {
			myTest: {
				files: [{
					expand: true,
					cwd: 'src/css/',
					src: ['*.css', '!*.min.css'],
					dest: 'release/css/'
				}]
			}
		},
		md5Replace : {
			src: 'md5Src/js/lib/seajs-module-config.js',
			base: 'md5Src/js/',
			dest: distBath + 'js/',
			files: [
				//'lib/qqapi.js',
				//'lib/fastclick.js',
				//'lib/zepto.js',
				'lib/slip.js',
				'lib/bj-report.js',
				'business/compassReport.js',
				'widget/floor_act.js'
			]
		},
        watch: {
            html: {
                files: ['web/**.html'],
                options: {livereload:true}
            },
            css: {
                files: ['web/**/*.css'],
                options: {livereload:true}
            },
            js: {
                files: ['web/**/*.js'],
                options: {livereload:true}
            },
            less: {
                files: ['web/**/*.less'],
                options: {livereload:false},
                tasks: ['less:main','uglify:allJs']
            }
        }
	});

	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-htmlhint');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-cmd-transport');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-embed');
	grunt.loadNpmTasks('md5Replace');
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-livereload');



	grunt.registerTask('clean', '', function() {
		var config = grunt.config.get('clean'),
			dirs = config.dirs;
		for(var n=0;n<dirs.length;++n){
			console.log('cleaning: '+dirs[n]);
			grunt.file.delete(dirs[n], {force: true});
		}
	});

	function gruntVersion(data, file, config, done) {
		var iconv;
		var childProcess = require('child_process');
		var version;
		if (process.platform.match(/win/)) {
			childProcess.exec("svn info", {
					encoding: 'binary',
					timeout: 100000,
					maxBuffer: 200 * 1024,
					killSignal: 'SIGTERM',
					cwd: null,
					env: null
				},
				function(error, stdout, stderr) {
					iconv = require('iconv-lite');
					var str = iconv.decode(stdout, 'GBK');
					var match;
					match = str.match(/最后修改的版本: (\d+)/); //windows中文版本svn
					if (!match) {
						match = str.match(/Last Changed Rev: (\d+)/); //windows非中文版本svn
					}

					if (match && match[1]) {
						version = match[1];
						grunt.file.write(file, 'seajs.' + data.key + ' = ' + version + ';');
						var newFile = config.dest + 'version.js';
						grunt.file.copy(file, newFile);
						console.log('task version ending');
						done();
					} else {
						console.warn('get svn version fail');
						throw new Error("can not get svn version")
					}

				})
		} else {
			childProcess.exec("svn info",
				function(error, stdout, stderr) {
					var match = stdout.match(/Last Changed Rev: (\d+)/);
					if (match && match[1]) {
						version = match[1];
						grunt.file.write(file, 'seajs.' + data.key + ' = ' + version + ';');
						var newFile = config.dest + 'version.js';
						grunt.file.copy(file, newFile);
						console.log('task version ending');
						done();
					} else {
						console.warn('get svn version fail');
						throw new Error("can not get svn version")
					}

				})
		}
	}

	grunt.registerTask('version', '', function(param) {
		var done = this.async();
		var config = grunt.config.get('version');
		//设置默认选项
		var file = config.src || 'version.js';
		var data = {
			key : 'pageVersion'
		};

		gruntVersion(data,file,config,done)
	
		return;
	});

	// Default task.
	grunt.registerTask('dist', [
        'less:main',
        'uglify:allJs', //压缩所有的JS
        'watch'
	]);
//	grunt.registerTask('default', ['version', 'htmlhint', 'clean', 'copy:main',  'transport', 'uglify', 'embed:online','embed:static', 'copy:temp',/*'embed:offline'*/, /*'htmlmin',*/ 'compress']);

};
