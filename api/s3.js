let AWS = require('aws-sdk');
AWS.config.update({accessKeyId: 'AKIAJJA4YUWAJE5AUIQQ', secretAccessKey: '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'});

let Buckets = {
  users: new AWS.S3({params: {Bucket: 'phourus-users'}}),
  organizations: new AWS.S3({params: {Bucket: 'phourus-organizations'}}),
  attachments: new AWS.S3({params: {Bucket: 'phourus-attachments'}})
};

module.exports = function (bucket, key, body) {
  if (!Buckets.hasOwnProperty(bucket)) {
    reject();
  }
  let Bucket = Buckets[bucket];
  return new Promise(function (resolve, reject) {
    let params = {
      Key: key.toString(),
      Body: body,
      ContentEncoding: 'base64',
      ContentType: 'image/png'
    };
    Bucket.upload(params, function(err, data) {
      if (err) {
        console.error("Error uploading data: ", err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
