module.exports = (grunt) ->
  
  grunt.initConfig
 
    concat:
      lib:
        src: ["src/lib/*.js"]
        dest: "build/lib.cat.js"  
     
    uglify:
      app:
        files:
          "build/app.min.js": "src/app.js"
      lib:
        files:
          "build/lib.min.js": "build/lib.cat.js"
              
    less:
      build: 
        files: 
          "build/style.css": "src/less/style.less"
    
    cssmin:
      build: 
        files: 
          "build/style.min.css": "build/style.css"
    
    copy:
      react:
        files: [
          expand: true
          cwd: "app/html"
          src: ["**/*.html"]
          dest: "build/html"
          ext: ".html"
        ]
      assets:
        files: [
          expand: true
          cwd: "assets"
          src: ["**/*"]
          dest: "build/assets"
        ]
      html:
        files: [
          expand: true
          cwd: "app"
          src: ["html/**/*"]
          dest: "build/"
        ]
      lib:
        files: [
          expand: true
          cwd: "app/lib"
          src: ["**/*.js"]
          dest: "build/lib"
          ext: ".js"
        ]
      index:
      	files:
      	  "build/index.html": "build/html/index.html"
    
    clean: ['build/lib.cat.css']
    
    ###
    watch:
      app:
        options:
          livereload: true
        files: ["app/coffee/**/*.coffee"]
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
    ###
   
  grunt.loadNpmTasks "grunt-contrib-concat"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-watch"
  

  grunt.registerTask "default", ["concat", "uglify", "less", "cssmin", "copy", "clean"]