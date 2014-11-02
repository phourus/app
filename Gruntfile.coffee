module.exports = (grunt) ->
  
  grunt.initConfig
     
    uglify:
      app:
        files:
          "build/app.min.js": "src/app.js"
              
    react:
      app:
        files: [
          expand: true
          cwd: "src/react"
          src: ["**/*"]
          dest: "build/react"
        ]
        
    less:
      build: 
        files: 
          "build/style.css": "src/less/style.less"
    
    cssmin:
      build: 
        files: 
          "build/style.min.css": "build/style.css"
    
    copy:
      html:
        files: [
          expand: true
          cwd: "src/html"
          src: ["**/*.html"]
          dest: "build/"
          ext: ".html"
        ]
      assets:
        files: [
          expand: true
          cwd: "assets"
          src: ["**/*"]
          dest: "build/assets"
        ]
      css:
        files: "build/style.min.css": "style.min.css"
    
    clean: ['build/lib.cat.js', 'build/style.css']

    watch:
      app:
        options:
          livereload: true
        files: ["src/react/**/*.js"]
        tasks: ["coffee:compile"]
      lib:
        options:
          livereload: true
        files: ["app/lib/**/*.js"]
        tasks: "copy:lib"
      less:
        options:
          livereload: true
        files: ["app/less/**/*.less"]
        tasks: ["less", "cssmin", "clean"]
      html:
        options:
          livereload: true
        files: ["app/html/**/*.html"]
        tasks: ["copy:html"]
    
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-react"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  

  grunt.registerTask "default", ["react", "less", "cssmin", "copy", "uglify", "clean"]