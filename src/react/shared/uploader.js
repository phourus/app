import React from 'react';
import { Link } from 'react-router';

import {User as AccountActions} from '../../actions/profile';
import {Org as OrgActions} from '../../actions/profile';
import ImageUploader from '../../lib/uploader';
import Token from '../../lib/token';

export default React.createClass({
  getInitialState: function () {
    return {
      img: '/assets/avatars/default.jpg',
      default: '/assets/avatars/default.jpg',
      upload: 0
    }
  },
  componentDidMount: function () {
    this.uploader = document.getElementById('uploader');
  },
  componentWillReceiveProps: function (data) {
    if (data.img) {
      this.setState(data);
    }
  },
  render: function () {
    let upload = 'ca8rwbsdf8';
    return (
      <div className="pic">
        <input id="uploader" type="file" name="uploader" className="uploader" />
        <img src={this.state.img + '?upload=' + upload} onClick={this._upload} onError={this._default} alt="Phourus Profile Image Uploader" />
      </div>
    );
  },
  _upload: function (e) {
    let id = this.state.id;
    this.uploader.click();
    let options = {
      inputElement: this.uploader,
      onProgress: function (event) {
        // event.done, event.total
      },
      onFileComplete: function (event, file) {
        // file.fileName, event.target.status
      },
      maxWidth: 400,
      quality: 1,
      //timeout: 5000,
      debug : true
    };

    if (this.props.route.root === 'admin') {
      let id = this.props.route.id;
      if (!id) {
        return;
      }
      options.uploadUrl = '/rest/orgs/' + id + '/pic';
      options.onComplete = function (event) {
        OrgActions.single(id);
      };
    } else {
      options.uploadUrl = '/rest/account/pic';
      options.onComplete = function (event) {
        AccountActions.get();
      };
    }

    Token.onConnect()
    .then(() => {
      Token.get('token')
      .then((data) => {
        options.headers = {
          "Authorization": data
        };
        new ImageUploader(options);
      });
    });
  },
  _default: function () {
    this.setState({img: this.state.default});
  }
});

// let _Uploader = React.createClass({
//   render: function () {
//     return (
//       <div className="uploader">
//         <h3>Profile Picture</h3>
//         <img src={`/assets/avatars/${this.props.img}.jpg`} height="200" alt="Phourus Profile Image Uploader" />
//         <form action={`/rest/pic/${this.props.id}`} method="post" encType="multipart/form-data" target="upload">
//           <input type="file" ref="pic" id="pic" />
//           <input type="hidden" ref="type" value="user" />
//         </form>
//       </div>
//     );
//   }
// });
