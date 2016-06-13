module.exports = function(grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['./app/views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['/app/*/**'],
				//tasks: ['jshint'],
				options: {
					//文件改动时重新启动
					livereload: true
				}
			}
		},
		nodemon: {
			dev: {
				options: {
					file: 'app.js',
					args: [],
					ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions: ['js'],
					watchedFolders: ['./'],
					debug: true,
					delayTime: 1,
					env: {
						PORT: 3030
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	//自动写入package.json
	grunt.loadNpmTasks('grunt-contrib-watch');
	//实时监听app.js，类似于supervisor
	grunt.loadNpmTasks('grunt-nodemon');
	//针对慢任务
	grunt.loadNpmTasks('grunt-concurrent');

	//出错时不至于全部停止grunt任务
	grunt.option('force', true);
	//配置任务
	grunt.registerTask('default', ['concurrent']);
}