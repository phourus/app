let storage = {};
// if (typeof document !== 'undefined') {
//   import {CrossStorageClient as Client} from 'cross-storage';
//   let host = location.hostname;
//   let protocol = location.protocol + '//';
//   let port = location.port;
//   if (location.port !== "") {
//     port = `:${location.port}`;
//   }
//   let options = ['localhost', 'phourus.local', 'phourus.com', 'phourus-staging.us-west-2.elasticbeanstalk.com'];
//   for (let i = 0; i < options.length; i++) {
//     if (host.indexOf(options[i]) > -1) {
//       let url = `${protocol}${options[i]}${port}/hub.html`;
//       storage = new Client(url);
//     }
//   }
// }

export default storage;
