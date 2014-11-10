var React = require('react');

var Account = React.createClass({
     getDefaultProps: function () {
        return {
            id: 123,
            pic: "/assets/logos/logo-new.png",
            address: {
                street: "100 White Cap Lane",
                city: "Newport Coast",
                state: "CA",
                zip: "92657"
            }
            
        }  
     },
     render: function () {
          return (
            <div>
                <PicUploader pic={this.props.pic} id={this.props.id} />
                <Info info={this.props} />
                <Details details={this.props} />
                <Address address={this.props.address} />
                <Social />
                <Password />  
            </div>
          );
     }
});

var PicUploader = React.createClass({
    render: function () {
        return (
            <div>   
                <h3>Photo Upload</h3>
                <div class="pic">
                    <img src="{this.props.pic}" onerror="this.src='/assets/pics/default.png'" height="200" />
                </div>
                <form action="/rest/pic/{this.props.id}" method="post" enctype="multipart/form-data" target="upload">
                  <input type="file" name="pic" id="pic" />
                  <input type="hidden" name="type" value="user" />
                  <input type="submit" name="submit" value="Upload" class="button blue" />
                </form>
                <iframe id="message" />
            </div>
        );
    }    
});

var Info = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Basic Info</h3>
            <div id="user_basic">
                <input ref="username" type="text" value={this.props.info.username} />
                <input ref="first" type="text" value={this.props.info.first} />
                <input ref="last" type="text" value={this.props.info.last} />
                <input ref="email" type="text" value={this.props.info.email} />
                <input ref="phone" type="text" value={this.props.info.phone} /> 
            </div>
            <button id="save_basic" class="button green save">Save Info</button>
          </div>
        );
    }    
});

var Details = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Details</h3>
            <div id="user_detail">
                <input ref="company" type="text" value={this.props.details.company} />
                <input ref="occupation" type="text" value={this.props.details.occupation} />
                <input ref="website" type="text" value={this.props.details.website} />
                <input ref="dob" type="datetime" value={this.props.details.dob} />
                <select ref="gender">{this.props.details.gender}</select>
            </div>
            <button id="save_detail" class="button green save">Save Info</button>
          </div>
        );
    }    
});

        /*                      states = []
          _.each @states, (val, key, obj) ->
            states.push {label: val, val: key}*/
var Address = React.createClass({
    render: function () {
        return (
          <div>
            <h3>My Address</h3>
            <div id="user_address">
                <input ref="street" type="text" value={this.props.address.street} />
                <input ref="zip" type="text" value={this.props.address.zip} />
                <input ref="city" type="text" value={this.props.address.city} />
                <select ref="state" type="text" value={this.props.address.city}></select>
            </div>
            <button id="save_address" class="button green save">Save Info</button>
          </div>
        );
    }    
});

var Social = React.createClass({
    render: function () {
        return (
          <div id="social">
            <h3>Verify Social Accounts</h3>
            <button id="facebook" class="social"></button> 
            <button id="linkedin" class="social"></button>
            <button id="linkedin" class="social"></button>
            <button id="google" class="social"></button>
          </div>
        );
    }    
});

var Password = React.createClass({
    render: function () {
        return (
          <div id="password">
            <h3>Change Password</h3>
            <div id="user_password">
                <input ref="current" type="password" />
                <input ref="new" type="password" />
                <input ref="verify" type="password" />
            </div>
            <button id="save_password" class="button green save">Save Info</button>
          </div>
        );
    }    
});

/*

        when "orgs"
          schema.name = "Text"
          schema.type = "Text"
          schema.shortname = "Text"
          schema.video = "Text"
          schema.channel = "Text"
          schema.email = "Text"
          schema.phone = "Text"
          schema.address = "Text"
          schema.about = "TextArea"
          schema.contact = "TextArea"
*/
  
module.exports = Account;