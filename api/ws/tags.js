var ws = require('../socket').of('/tags');

var tags = require('../models/tags');

ws.on('connection', function (socket) {
  console.log('connected to tags server');

  socket.on('getSingle', function (id) {
      tags.single(id)
        .then(function (data) {
            socket.emit('single', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('single', 500);
        });
  });
  socket.on('getCollection', function (params) {
      tags.collection(params)
        .then(function (data) {
            socket.emit('collection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 500);
        });
  });
  socket.on('postAdd', function (model) {
    tags.add(model)
        .then(function (data) {
            socket.emit('add', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('add', 500);
        });
  });
  socket.on('putSave', function (id, model) {
    tags.save(id, model)
        .then(function (data) {
            socket.emit('save', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 500);
        });
  });
  socket.on('delRemove', function (id) {
    tags.remove(id)
        .then(function (data) {
            socket.emit('remove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 500);
        });
  });
});
