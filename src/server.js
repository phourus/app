"use strict";
let React = require('react');
var ReactRouter = require('react-router');
var RoutingContext = ReactRouter.RoutingContext;

module.exports = React.createClass({
  render: function () {
    return (
      <html lang="en">
        <head>
          <title>Phourus.com</title>
          <meta name="Author" content="Phourus.com" />
          <meta name="Description" content="A central place to manage the information, content and ideas for your organization" />
          <meta name="Keywords" content="Information,Content,Ideas,Organization" />
          <meta charSet="utf-8" />
          <meta content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <link rel="stylesheet" href="/style.css" type="text/css" />
          <link rel="stylesheet" href="/quill.base.css" type="text/css" />
          <link rel="stylesheet" href="/quill.snow.css" type="text/css" />
          <link rel="stylesheet" href="/joyride.css" type="text/css" />
          <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
          <link href='http://fonts.googleapis.com/css?family=Rokkitt:400,700|Open+Sans:400,700' rel='stylesheet' type='text/css' />
        </head>
        <body className="body">
          <div id="app">
            <RoutingContext {...this.props} />
          </div>
          <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
          <script src="http://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
          <script src="http://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min.js"></script>
          <script type="text/javascript" src="/app.js"></script>
        </body>
      </html>
    );
  }
})
