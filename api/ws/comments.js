var ws = require('../socket').of('/comments');

var comments = require('../models/comments');

ws.on('connection', function (socket) {
  console.log('connected to comments server');
  comments.SESSION_USER = socket.request.user_id;

  socket.on('getCollection', function (params) {
      console.log(params);
      comments.collection(params)
        .then(function (data) {
            console.log(data);
            socket.emit('collection', 200, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('collection', 500);
        });
  });
  socket.on('postAdd', function (model) {
    comments.add(model)
        .then(function (data) {
            socket.emit('add', 201, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('add', 500);
        });
  });
  socket.on('putSave', function (id, model) {
    comments.save(id, model)
        .then(function (data) {
            socket.emit('save', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('save', 500);
        });
  });
  socket.on('delRemove', function (id) {
    comments.remove(model)
        .then(function (data) {
            socket.emit('remove', 204, data);
        })
        .catch(function (err) {
            console.error(err);
            socket.emit('remove', 500);
        });
  });
});
