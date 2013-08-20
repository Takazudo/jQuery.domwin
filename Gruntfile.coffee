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

      test:
        src: [ 'tests/test.coffee' ]
        dest: 'tests/test.js'

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
      
      test1:
        src: [ 'tests/index.html' ]
        bail: true
        log: true
        mocha:
          ignoreLeaks: false
        reporter: 'Nyan'
        run: true

    watch:

      libself:
        files: [
          '<%= coffee.libself.src %>'
          '<%= coffee.test.src %>'
        ]
        tasks: [
          'default'
        ]

  grunt.registerTask 'default', [
    'coffee'
    'concat'
    'uglify'
    'mocha:test1'
    'growl:ok'
  ]

