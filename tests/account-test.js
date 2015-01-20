/** @jsx React.DOM **/
jest.genMockFromModule('socket.io-client');
jest.dontMock('../src/react/account');
var React, Account, TestUtils, view, model, account;

describe('Account', function() {
    React = require('react/addons');
    Account = require('../src/react/account');
    TestUtils = React.addons.TestUtils;

    model = {
        id: 123,
        pic: "/assets/logos/logo-new.png",
        username: "jessedrelick",
        first: "Jesse",
        last: "Drelick",
        email: "info@jessedrelick.com",
        phone: "603-783-1358",
        company: "Phourus Inc.",
        occupation: "Software dude",
        website: "www.phourus.com",
        dob: "7-9-87",
        gender: "M",
        address: {
            street: "100 White Cap Lane",
            city: "Newport Coast",
            state: "CA",
            zip: "92657"
        }
    }

    beforeEach(function() {
        view = TestUtils.renderIntoDocument(<Account />);  
    });
    
    it('should have default properties', function () {
        expect(view.props.id).toBeNull();
        expect(view.props.pic).toEqual("");
        expect(view.props.username).toEqual("");
        expect(view.props.first).toEqual("");
        expect(view.props.last).toEqual("");
        expect(view.props.email).toEqual("");
        expect(view.props.phone).toEqual("");
        expect(view.props.company).toEqual("");
        expect(view.props.occupation).toEqual("");
        expect(view.props.website).toEqual("");
        expect(view.props.dob).toEqual("");
        expect(view.props.gender).toEqual("");
        expect(view.props.address.street).toEqual("");
        expect(view.props.address.city).toEqual("");
        expect(view.props.address.state).toEqual("");
        expect(view.props.address.zip).toEqual("");
    });
    
    it('should accept an Account model', function() {
        view.setProps(model);
        expect(view.props.id).toEqual(model.id);
        expect(view.props.pic).toEqual(model.pic);
        expect(view.props.username).toEqual(model.username);
        expect(view.props.first).toEqual(model.first);
        expect(view.props.last).toEqual(model.last);
        expect(view.props.email).toEqual(model.email);
        expect(view.props.phone).toEqual(model.phone);
        expect(view.props.company).toEqual(model.company);
        expect(view.props.occupation).toEqual(model.occupation);
        expect(view.props.website).toEqual(model.website);
        expect(view.props.dob).toEqual(model.dob);
        expect(view.props.gender).toEqual(model.gender);
        expect(view.props.address.street).toEqual(model.address.street);
        expect(view.props.address.city).toEqual(model.address.city);
        expect(view.props.address.state).toEqual(model.address.state);
        expect(view.props.address.zip).toEqual(model.address.zip);
    });
});

describe('Account: Pic Uploader', function() {
 it('case 1', function() {

 });
});

describe('Account: Info', function() {
    var username, first, last, email, phone;
    
    beforeEach(function() {
        account = TestUtils.renderIntoDocument(<Account />);
        username = TestUtils.findRenderedDOMComponentWithClass(account, 'username').getDOMNode();
        first = TestUtils.findRenderedDOMComponentWithClass(account, 'first').getDOMNode();
        last = TestUtils.findRenderedDOMComponentWithClass(account, 'last').getDOMNode();
        email = TestUtils.findRenderedDOMComponentWithClass(account, 'email').getDOMNode();
        phone = TestUtils.findRenderedDOMComponentWithClass(account, 'phone').getDOMNode();
    });
    
    it('should populate default values', function() {
        expect(username.value).toEqual('');
        expect(first.value).toEqual('');
        expect(last.value).toEqual('');
        expect(email.value).toEqual('');
        expect(phone.value).toEqual('');
    });
    
    it('should populate Account model', function() {
        account.setProps(model);
        expect(username.value).toEqual(model.username);
        expect(first.value).toEqual(model.first);
        expect(last.value).toEqual(model.last);
        expect(email.value).toEqual(model.email);
        expect(phone.value).toEqual(model.phone);    
    });
});

describe('Account: Details', function() {
    var company, occupation, website, dob, gender;
    
    beforeEach(function() {
        account = TestUtils.renderIntoDocument(<Account />);
        company = TestUtils.findRenderedDOMComponentWithClass(account, 'company').getDOMNode();
        occupation = TestUtils.findRenderedDOMComponentWithClass(account, 'occupation').getDOMNode();
        website = TestUtils.findRenderedDOMComponentWithClass(account, 'website').getDOMNode();
        dob = TestUtils.findRenderedDOMComponentWithClass(account, 'dob').getDOMNode();
        gender = TestUtils.findRenderedDOMComponentWithClass(account, 'gender').getDOMNode();
    });
    
    it('should populate default values', function() {
        expect(company.value).toEqual('');
        expect(occupation.value).toEqual('');
        expect(website.value).toEqual('');
        expect(dob.value).toEqual('');
        expect(gender.value).toEqual('');
    });
    
    it('should populate Account model', function() {
        account.setProps(model);
        expect(company.value).toEqual(model.company);
        expect(occupation.value).toEqual(model.occupation);
        expect(website.value).toEqual(model.website);
        expect(dob.value).toEqual(model.dob); 
        expect(gender.value).toEqual(model.gender);    
    });
});

describe('Account: Address', function() {
    var street, city, state, zip;
    
    beforeEach(function() {
        account = TestUtils.renderIntoDocument(<Account />);
        street = TestUtils.findRenderedDOMComponentWithClass(account, 'street').getDOMNode();
        city = TestUtils.findRenderedDOMComponentWithClass(account, 'city').getDOMNode();
        state = TestUtils.findRenderedDOMComponentWithClass(account, 'state').getDOMNode();
        zip = TestUtils.findRenderedDOMComponentWithClass(account, 'zip').getDOMNode();
    });
    
    it('should populate default values', function() {
        expect(street.value).toEqual('');
        expect(city.value).toEqual('');
        expect(state.value).toEqual('');
        expect(zip.value).toEqual('');
    });
    
    it('should populate Address model', function() {
        account.setProps(model);
        expect(street.value).toEqual(model.address.street);
        expect(city.value).toEqual(model.address.city);
        expect(state.value).toEqual(model.address.state);
        expect(zip.value).toEqual(model.address.zip);    
    });
});

describe('Account: Social', function() {
 it('case 1', function() {

 });
});

describe('Account: Password', function() {
 it('case 1', function() {

 });
});