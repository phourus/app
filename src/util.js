let w = require('window-or-global');
let location = w.location;

module.exports = {
  getEnv: function () {
    let env = 'dev';
    if (location.hostname.match(/phourus\.com^/)) {
      env = 'production';
    }
    if (location.hostname.match(/elasticbeanstalk\.com^/)) {
      env = 'staging';
    }
    return env;
  },
  createHomeURL: function () {
    let env = this.getEnv();
    let local = 'phourus.local:3000';
    if (w.location) {
      local = w.location.host;
      // strip subdomain
    }
    let out = {
      production: 'https://phourus.com',
      staging: 'http://phourus-staging.us-west-2.elasticbeanstalk.com',
      dev: 'http://' + local
    };
    return out[env];
  },
  createOrgLink: function (shortname) {
    let protocol = location.protocol;
    // need wildcard ssl
    protocol = 'http';
    let host = location.host;
    let parts = host.split('.');
    // www.phourus.com/.local, phourus.com/.local, phourus-staging
    if (['www', 'phourus', 'phourus-staging'].indexOf(parts[0]) === -1) {
      parts.shift();
      host = parts.join('.');
    }
    return `${protocol}//${shortname}.${host}`
  }
};
