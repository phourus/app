module.exports = function () {
  return {
    headers: {
      "Authorization": require('./token').get()
    },
    promise: true
  };
};
