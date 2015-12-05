var sendgrid  = require('sendgrid')('phourus', 'v2O%2*d4"e,A');
var footer = "Thank you,<br /><br />The Phourus Team<br />1411 7th St #305<br />Santa Monica, CA 90401<br /><br /><strong>1-844-PHOURUS</strong><br />(844-746-8787)<br /><a href='mailto:info@phourus.com'>info@phourus.com</a>";
var generate = function (template, data) {
  var templates = {
    contact: {
      name: 'Phourus.com',
      from: 'info@phourus.com',
      subject: 'Message Received',
      content: 'Hello, <p>We have received your message and will follow up as soon as possible. Below is a record of the message we received:</p><i>' + data.message + '</i><br /><br />' + footer
    },
    reset: {
      name: 'Phourus.com',
      from: 'info@phourus.com',
      subject: 'Password Reset',
      content: 'Hello, <p>We have received a request to reset your password on Phourus. If you did not submit this request, please let us know. Otherwise, simply click the link below to go to the password reset form.</p> <a href="http://phourus.com/?reset=true&token=' + data.token + '&userId=' + data.userId + '">Click here to reset your password</a><br /><br />' + footer
    },
    signup: {
      name: 'Phourus.com',
      from: 'info@phourus.com',
      subject: 'Your New Phourus Account',
      content: 'Hello! <p>This email was sent to confirm you have successfully created your account on <a href="http://phourus.com">Phourus.com</a> using this email address. We are very excited to have you as a user and as part of the Phourus Platform! Please let us know if you need anything, we\'d love to help :)</p>' + footer
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
      fromname: email.name,
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
