"use strict";
let React = require('react');

let ga = require('../../analytics');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      visible: true
    };
  },
  render: function () {
    return (
      <div className="share">
        {this.state.visible
          ? false
          : <div className="toggle" onClick={this._toggle}>
            <i className="fa fa-share" />
            Share
          </div>
        }
        {this.state.visible
          ? <Share toggle={this._toggle} post={this.props.post} />
          : false
        }
      </div>
    );
  },
  _toggle: function () {
    this.setState({visible: !this.state.visible});
  }
});

let Share = React.createClass({
  getInitialState: function () {
    return {
      selected: '',
      base: 'https://phourus.com/stream/',
      popup: 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600'
    };
  },
  render: function () {
    //<li onClick={this._cancel}><i className="fa fa-close" /> Cancel</li>
    return (
      <ul>
        <li onClick={this._facebook}><i className="fa fa-facebook" /> Facebook</li>
        <li onClick={this._twitter}><i className="fa fa-twitter" /> Twitter</li>
        <li onClick={this._linkedin}><i className="fa fa-linkedin" /> LinkedIn</li>
        <li onClick={this._google}><i className="fa fa-google" /> Google +</li>
        <li onClick={this._slack}><i className="fa fa-slack" /> Slack</li>
        <li onClick={this._email}><i className="fa fa-envelope" /> Email</li>
      </ul>
    );
  },
  _cancel: function () {
    ga('send', 'event', 'engagement', 'share', 'cancel');
    this.props.toggle();
  },
  _facebook: function () {
    let url = "https://www.facebook.com/dialog/share";
    let params = {
      app_id: 1663090460638387,
      display: 'popup',
      href: this.state.base + this.props.post.id,
      redirect_uri: this.state.base + this.props.post.id
    };
    this.setState({selected: 'facebook'});
    this._open(url, params);
    ga('send', 'event', 'engagement', 'share', 'facebook');
  },
  _twitter: function () {
    let url = "https://twitter.com/intent/tweet";
    let tags = "";
    if (this.props.post && this.props.post.tags) {
      tags = this.props.post.tags.map((tag) => {
        return tag.tag;
      }).join(',');
    }
    let params = {
      text: this.props.post.title,
      url: this.state.base + this.props.post.id,
      hashtags: tags,
      //via: '@'
    };
    this.setState({selected: 'twitter'});
    this._open(url, params);
    ga('send', 'event', 'engagement', 'share', 'twitter');
  },
  _linkedin: function () {
    let url = "https://www.linkedin.com/shareArticle";
    let params = {
      mini: true,
      url: this.state.base + this.props.post.id,
      title: this.props.post.title,
      summary: 'Post shared from Phourus.com',
      source: 'Phourus.com'
    };
    this.setState({selected: 'linkedin'});
    this._open(url, params);
    ga('send', 'event', 'engagement', 'share', 'linkedin');
  },
  _google: function () {
    let url = "https://plus.google.com/share";
    let params = {
      url: this.state.base + this.props.post.id
    };
    this.setState({selected: 'google'});
    this._open(url, params);
    ga('send', 'event', 'engagement', 'share', 'google');
  },
  _slack: function () {
    this.setState({selected: 'slack'});
    ga('send', 'event', 'engagement', 'share', 'slack');
  },
  _email: function () {
    let body = "The following post has been shared with you from Phourus.com: \r\n \r\n '" + this.props.post.title + "' \r\n \r\n " + this.state.base + this.props.post.id;
    this.setState({selected: 'email'});
    ga('send', 'event', 'engagement', 'share', 'email');
    window.location.href = encodeURI('mailto:recipient@yourfriend.com?Subject=Somebody shared a Post from Phourus.com with you&body=' + body);
  },
  _open: function (url, params) {
    let query = "";
    Object.keys(params).forEach((key) => {
      query += key + "=" + params[key] + "&";
    });
    window.open(url + '?' + encodeURI(query.slice(0, -1)), '', this.state.popup);
  }
});

// let Facebook = React.createClass({
//   componentDidMount: function () {
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId      : 'your-app-id',
//         xfbml      : true,
//         version    : 'v2.5'
//       });
//       FB.ui({
//         method: 'share',
//         href: 'https://phourus.com/stream/1',
//       }, function(response){
//         console.log(response);
//       });
//     };
//     (function(d, s, id){
//        var js, fjs = d.getElementsByTagName(s)[0];
//        if (d.getElementById(id)) {return;}
//        js = d.createElement(s); js.id = id;
//        js.src = "//connect.facebook.net/en_US/sdk.js";
//        fjs.parentNode.insertBefore(js, fjs);
//      }(document, 'script', 'facebook-jssdk'));
//   },
//   render: function () {
//     return (
//       <script></script>
//     );
//   }
// });
