module.exports = (grunt) ->
  
  grunt.task.loadTasks 'misc/gruntcomponents/tasks'
  grunt.task.loadNpmTasks 'grunt-contrib-coffee'
  grunt.task.loadNpmTasks 'grunt-contrib-watch'
  grunt.task.loadNpmTasks 'grunt-contrib-concat'
  grunt.task.loadNpmTasks 'grunt-contrib-uglify'
  grunt.task.loadNpmTasks 'grunt-mocha'

  grunt.initConfig

    pkg: grunt.file.readJSON('package.json')
    banner: """
      /*! <%= pkg.name %> (<%= pkg.repository.url %>)
       * lastupdate: <%= grunt.template.today("yyyy-mm-dd") %>
       * version: <%= pkg.version %>
       * author: <%= pkg.author %>
       * License: MIT */

      """

    growl:

      ok:
        title: 'COMPLETE!!'
        msg: '＼(^o^)／'

    coffee:

      libself:
        src: [ 'jquery.domwin.coffee' ]
        dest: 'jquery.domwin.js'

      test_common:
        src: [ 'tests/mocha/common/test.coffee' ]
        dest: 'tests/mocha/common/test.js'
      test_hideoverlay:
        src: [ 'tests/mocha/hideoverlay/test.coffee' ]
        dest: 'tests/mocha/hideoverlay/test.js'

    concat:

      banner:
        options:
          banner: '<%= banner %>'
        src: [ '<%= coffee.libself.dest %>' ]
        dest: '<%= coffee.libself.dest %>'

    uglify:

      options:
        banner: '<%= banner %>'
      libself:
        src: '<%= concat.banner.dest %>'
        dest: 'jquery.domwin.min.js'

    mocha:

      all: [ 'tests/mocha/**/*.html' ]
      
      common:
        src: [ 'tests/mocha/common/index.html' ]
      hideoverlay:
        src: [ 'tests/mocha/hideoverlay/index.html' ]

    watch:

      libself:
        files: [
          '<%= coffee.libself.src %>'
        ]
        tasks: [
          'default'
        ]

      test_common:
        files: [ '<%= coffee.test_common.src %>' ]
        tasks: [
          'coffee:test_common'
          'mocha:common'
        ]

      test_hideoverlay:
        files: [ '<%= coffee.test_hideoverlay.src %>' ]
        tasks: [
          'coffee:test_hideoverlay'
          'mocha:hideoverlay'
        ]

  grunt.registerTask 'default', [
    'coffee'
    'concat'
    'uglify'
    'mocha:all'
    'growl:ok'
  ]

