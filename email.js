var sendgrid  = require('sendgrid')('phourus', 'v2O%2*d4"e,A');
var generate = function (template, data) {
  var templates = {
    reset: {
      from: 'info@phourus.com',
      subject: 'Password Reset',
      content: 'Hello, <p>We have received a request to reset your password on Phourus. If you did not submit this request, please let us know. Otherwise, simply click the link below to go to the password reset form.</p> <a href="http://phourus.com/reset?token=' + data.token + '&userId=' + data.userId + '">Click here to reset your password</a><br /><br />Thank you,<br />The Phourus Team'
    }
  };
  return templates[template];
};

module.exports = function (template, data) {
  var email = generate(template, data);

  return new Promise(function (resolve, reject) {
    sendgrid.send({
      to:       data.email,
      from:     email.from,
      subject:  email.subject,
      html:     email.content
    }, function(err, json) {
      if (err) {
        console.error(err);
        return reject(err);
      }
      return resolve(json);
    });
  });
};
