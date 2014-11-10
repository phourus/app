module.exports = function(grunt) {
  grunt.initConfig({
    /*uglify: {
      app: {
        files: [
          {
            "build/app.min.js": "src/app.js",
            "build/router.js": "react-router-component.js"
          }
        ]
      }
    },
    react: {
      app: {
        files: [
          {
            expand: true,
            cwd: "src/react",*/
            //src: ["**/*"],
            /*dest: "build/react",
            ext: ".js"
          }
        ]
      }
    },*/
    browserify: {
      options: {
        exclude: ["react"],
        transform: ["reactify"]
      },
      app: {
        files: [
          {
            expand: true,
            cwd: "src/react",
            src: ["*"],
            dest: "build/react",
            ext: ".js"
          }
        ]
      }
    },
    less: {
      build: {
        files: {
          "build/style.min.css": "src/less/style.less"
        }
      }
    },
    cssmin: {
      build: {
        files: {
          "build/style.min.css": "build/style.css"
        }
      }
    },
    copy: {
      html: {
        files: [
          {
            expand: true,
            cwd: "src/html",
            src: ["**/*.html"],
            dest: "build/",
            ext: ".html"
          }
        ]
      },
      assets: {
        files: [
          {
            expand: true,
            cwd: "assets",
            src: ["**/*"],
            dest: "build/assets"
          }
        ]
      }
    },
    clean: [],
    watch: {
      app: {
        options: {
          livereload: true
        },
        files: ["src/react/**/*.js"],
        tasks: ["react"]
      },
      less: {
        options: {
          livereload: true
        },
        files: ["src/less/**/*.less"],
        tasks: ["less", "cssmin", "clean"]
      },
      html: {
        options: {
          livereload: true
        },
        files: ["src/html/**/*.html"],
        tasks: ["copy:html"]
      }
    },
    jslint: {
      react: {
        src: ["build/react/*.js"]
      }
    },
    csslint: {
      strict: {
        options: {
          "import": 2
        },
        src: ["build/style.min.css"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  //grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-less");
  //grunt.loadNpmTasks("grunt-react");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-jslint");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.registerTask("default", ["browserify", "less", "copy"]);
  return grunt.registerTask("lint", ["jslint", "csslint"]);
};