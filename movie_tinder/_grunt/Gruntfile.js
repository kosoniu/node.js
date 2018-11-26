module.exports = function(grunt) {

    var config = {
        src: '../public-grunt',
        dest: '../public',
        js: grunt.file.readYAML('../public-grunt/js.yaml'),
    };

    grunt.initConfig({

        config: config,

        // combine png-s form `_sprites` dir into `img/sprites.png` and `_scss/_sprites/_map.scss`
        sprite: {
            assets: {
                src: '<%= config.src %>/sprites/**/*.png',
                dest: '<%= config.dest %>/css/img/sprites.png',
                destCss: '<%= config.src %>/scss/_sprites/_map.scss',
                imgPath: 'img/sprites.png',
                cssTemplate: function(params) {
                    var items = [];
                    params.items.forEach(function(item) {
                        var attrs = [
                            '    x: ' + item.x,
                            '    y: ' + item.y,
                            '    width: ' + item.width,
                            '    height: ' + item.height,
                        ];
                        items.push('  ' + item.name + ': (\n' + attrs.join(',\n') + '\n  )');
                    });
                    return '$sprites: (\n  _image: "' + params.spritesheet.image + '",\n' + items.join(',\n') + '\n);\n';
                },
            },
        },


        // sass task - process sass files
        sass: {
            options: {
                outputStyle: 'compressed', // or 'nested'
                sourceMap: true,
                imagePath: '/img',
                // precision: 5,
                // includePaths: [],
            },
            assets: {
                src: '<%= config.src %>/scss/default.scss',
                dest: '<%= config.dest %>/css/default.min.css',
            },
        },


        // autoprefixer task - add css vendor prefixes in preprocessed css files (after sass task!) // TODO: expand
        autoprefixer: {
            assets: {
                src: '<%= config.dest %>/css/default.min.css',
                dest: '<%= config.dest %>/css/default.min.css',
            },
        },


        // concat and minify js
        uglify: {
            options: {
                sourceMap: true,
                preserveComments: 'some'
            },
            assets: {
                src: config.js,
                dest: '<%= config.dest %>/js/main.min.js',
            },
        },
        tinypng: {
            options: {
                apiKey: "rcCbAnAyE4tAJWnIjlmhz6sCPI1a4wac",
                checkSigs: true,
                sigFile: 'dest/file_sigs.json',
                summarize: true,
                showProgress: true,
                stopOnImageError: true
            },
            compress3: {
                src: ['**/*.{png,jpg,gif,svg}'],
                cwd: '../public-grunt/img',
                dest: '../public/img/',
                expand: true
            }
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    '../public/index.html': '../public-grunt/index.html',
                }
            },
        },

        // watch task
        watch: {
            options: {
                spawn: false,
                event: ['added', 'deleted', 'changed'],
            },
            grunt: {
                files: ['Gruntfile.js', '../public-grunt/js.yaml'],
            },
            sprites: {
                files: ['<%= config.src %>/sprites/**/*.png'],
                tasks: ['sprites'],
            },
            scss: {
                files: ['<%= config.src %>/scss/**/*.css', '<%= config.src %>/scss/**/*.scss'],
                tasks: ['sass'],
            },
            js: {
                files: config.js,
                tasks: ['js'],
            },
        },

    });


    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-spritesmith');
    grunt.loadNpmTasks('grunt-tinypng');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');


    grunt.registerTask('sprites', ['sprite', 'scss']);
    grunt.registerTask('scss', ['sass', 'autoprefixer']);
    grunt.registerTask('js', ['uglify']);
    grunt.registerTask('compile', ['sprites', 'scss', 'js']);
    grunt.registerTask('work', ['compile', 'watch']);
    grunt.registerTask('minimg', ['tinypng:compress3']);
    grunt.registerTask('default', ['htmlmin']);

};
