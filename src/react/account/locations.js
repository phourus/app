let React = require('react');

module.exports = React.createClass({
  render: function () {
    return (
      <div className="address">
        <h3>My Address</h3>
        <div id="user_address">
          <label>Street
            <input ref="street" className="street" type="text" value={this.props.address.street} onChange={this.props.change} />
          </label>
          <label>Zip
            <input ref="zip" className="zip" type="text" value={this.props.address.zip} onChange={this.props.change} />
          </label>
          <label>City
            <input ref="city" className="city" type="text" value={this.props.address.city} onChange={this.props.change} />
          </label>
          <label>State
            <input ref="state" className="state" type="text" value={this.props.address.state} onChange={this.props.change} />
          </label>
        </div>
        <button className="button green">Save Address</button>
      </div>
    );
  }
  // _validate: function () {
  //   var self = this;
  //   var addresses = [];
  //   var xml = this._xmlSchema();
  //   $.get('http://production.shippingapis.com/ShippingAPI.dll?API=Verify&XML=' + xml, function (xml) {
  //     //var data = $.parseXML(xml);
  //
  //     $('Address', xml).each(function (i) {
  //       var address = {};
  //       var err = $(this).find('Error');
  //       var message = $(this).find('ReturnText');
  //       if (err.length || message.length) {
  //         addresses.push({err: (err.find('Description').text() || message.text())});
  //         return;
  //       }
  //
  //       address.unit = $(this).find('Address1').text();
  //       address.street = $(this).find('Address2').text();
  //       address.city = $(this).find('City').text();
  //       address.state = $(this).find('State').text();
  //       address.zip = $(this).find('Zip5').text();
  //       addresses.push(address);
  //     });
  //     self.setState({validAddresses: addresses});
  //   });
  // },
});
