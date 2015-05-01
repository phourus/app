var convict = require('convict');

var conf = convict({
  "env": {
    "doc": "Current Environment",
    "format": ["development", "staging", "production"],
    "default": "development",
    "env": "PHOURUS_ENV"
  },
  "app": {
    "url": {
      "doc": "App URL",
      "format": "url",
      "default": "http://localhost",
      "env": "PHOURUS_APP_URL"
    },
    "port": {
      "doc": "App Port",
      "format": "port",
      "default": 8000,
      "env": "PHOURUS_APP_PORT"
    }
  },
  "socket": {
    "url": {
      "doc": "Socket Server URL",
      "format": "url",
      "default": "http://localhost",
      "env": "PHOURUS_SOCKET_URL"
    },
    "port": {
      "doc": "Socket Server Port",
      "format": "port",
      "default": 3000,
      "env": "PHOURUS_SOCKET_PORT"
    }
  }
});

conf.validate();
module.exports = conf;
