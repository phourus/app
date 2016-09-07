import token from './token';
let t = '';
if (token.onConnect) {
  token.onConnect()
  .then(() => {
    token.get('token')
    .then((data) => {
      t = data;
    });
  });
}

export default function () {
  return {
    "Authorization": t
  };
}
