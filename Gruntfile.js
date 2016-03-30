module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            options: {
                /*if false, causes error: 'Warning: Cannot delete files outside the current working directory. Use --force to continue.'*/
                force: true
            },
            build: ['build', 'dist'],
            deploy: ['doc/**', 'reports/**', 'bytepushers-core-restful-js.js', 'bytepushers-core-restful-js.min.js']
        },
        jshint: {
            options: {
                undef: false,
                unused: false,
                nonbsp: true
            },
            files: ['src/main/**/*.js']
        },
        jslint: {
            javascript: {
                options: {
                    edition: 'latest',
                    errorsOnly: true
                },
                src: ['src/main/**/*.js']
            }
        },
        karma: {
            server: {
                configFile: 'karma.conf.js'
            },
            ci: {
                configFile: 'karma.conf.ci.js'
            }
        },
        copy: {
            build: {
                files: [{expanded: true, src: ['src/main/javascript/*.js'], dest: 'build/', filter: 'isFile'}]
            },
            deploy: {
                files: [{expand: true, cwd: 'dist/', src: ['**'], dest: ''}]
            }
        },
        jsdoc: {
            build: {
                src: ['build/src/main/javascript/*.js'],
                options: {
                    destination: 'dist/doc'
                }
            }
        },
        concat: {
            build: {
                src: [
                    'build/src/main/javascript/TransformerException.js',
                    'build/src/main/javascript/WebServiceException.js',
                    'build/src/main/javascript/HttpStatus.js',
                    'build/src/main/javascript/ResponseResultSetTransformer.js',
                    'build/src/main/javascript/ResponseStatus.js',
                    'build/src/main/javascript/ResponseExceptionStackTrace.js',
                    'build/src/main/javascript/Response.js',
                    'build/src/main/javascript/ResponseTransformer.js',
                    'build/src/main/javascript/ResponseStatusTransformer.js',
                    'build/src/main/javascript/ResponseException.js'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: true
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': ['dist/bytepushers-core-restful-js.js']
                }
            }
        },

        release: {
            options: {
                commitMessage: 'release <%= version %>',
                tagMessage: 'version <%= version %>',
                github: {

                    repo: 'byte-pushers/bytepushers-core-restful-js',
                    accessTokenVar: 'GITHUB_ACCESS_TOKE_'
                }
            }
        },

        watch: {
            karma: {
                files: ['src/**/*.js', 'src/test/javascripttest-main.js'],
                tasks: ['test-karma-ci']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-release');

    grunt.loadNpmTasks('grunt-contrib-watch');

    var build = grunt.option('target') || 'build';
    var deploy = grunt.option('target') || 'deploy';
    var karma_server = grunt.option('target') || 'server';
    var karma_ci = grunt.option('target') || 'ci';

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['clean:' + build, 'lint', 'test', 'package']);

    grunt.registerTask('lint', ['jshint', 'jslint']);
    grunt.registerTask('test', ['test-karma-ci']);
    grunt.registerTask('test-karma-server', ['karma:' + karma_server]);
    grunt.registerTask('test-karma-ci', ['karma:' + karma_ci]);
    grunt.registerTask('package', ['copy:' + build, 'jsdoc', 'concat', 'uglify']);

    grunt.registerTask('deploy', ['copy:' + deploy, 'release', 'clean:' + deploy]);
};