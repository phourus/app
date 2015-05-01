/** @jsx React.DOM **/
jest.genMockFromModule('socket.io-client');
jest.dontMock('../src/react/account');
var React, Account, TestUtils, view, defaults, model, account;

describe('Account', function() {
    React = require('react/addons');
    Account = require('../src/react/account');
    TestUtils = React.addons.TestUtils;
    token = require('../src/token');

    defaults = {
        _: [],
        user: {
            id: null,
            pic: "",
            username: "",
            first: "",
            last: "",
            email: "",
            phone: "",
            company: "",
            occupation: "",
            website: "",
            dob: "",
            gender: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: ""
            }
        },
        notifications: [],
        history: []
     };

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
        view = TestUtils.renderIntoDocument(<Account {...defaults} />);  
    });
    
    it("should have a route object", function () {
        expect(view.props._).toBeDefined();
        expect(view.props._).toEqual([]);    
    });
    
    it('should have default properties', function () {
        var user = view.props.user;
        expect(user).toBeDefined();
        expect(view.props.history).toEqual([]);
        expect(view.props.notifications).toEqual([]);
        
        expect(user.id).toBeNull();
        expect(user.pic).toEqual("");
        expect(user.username).toEqual("");
        expect(user.first).toEqual("");
        expect(user.last).toEqual("");
        expect(user.email).toEqual("");
        expect(user.phone).toEqual("");
        expect(user.company).toEqual("");
        expect(user.occupation).toEqual("");
        expect(user.website).toEqual("");
        expect(user.dob).toEqual("");
        expect(user.gender).toEqual("");
        expect(user.address.street).toEqual("");
        expect(user.address.city).toEqual("");
        expect(user.address.state).toEqual("");
        expect(user.address.zip).toEqual("");
    });
    
    it('should accept an Account model', function() {
        view.setProps({user: model}, function () {
            var user = view.props.user;
            expect(user.id).toEqual(model.id);
            expect(user.pic).toEqual(model.pic);
            expect(user.username).toEqual(model.username);
            expect(user.first).toEqual(model.first);
            expect(user.last).toEqual(model.last);
            expect(user.email).toEqual(model.email);
            expect(user.phone).toEqual(model.phone);
            expect(user.company).toEqual(model.company);
            expect(user.occupation).toEqual(model.occupation);
            expect(user.website).toEqual(model.website);
            expect(user.dob).toEqual(model.dob);
            expect(user.gender).toEqual(model.gender);
            expect(user.address.street).toEqual(model.address.street);
            expect(user.address.city).toEqual(model.address.city);
            expect(user.address.state).toEqual(model.address.state);
            expect(user.address.zip).toEqual(model.address.zip);
        });
    });
});

xdescribe('Account: Pic Uploader', function() {
 it('case 1', function() {

 });
});

describe('Account: Info', function() {
    var info, username, first, last, email, phone;
    
    beforeEach(function() {
        //token.get.mockReturnValue(false);
        account = TestUtils.renderIntoDocument(<Account {...defaults} />);
        info = TestUtils.findRenderedDOMComponentWithClass(account, 'info');
        username = TestUtils.findRenderedDOMComponentWithClass(info, 'username').getDOMNode();
        first = TestUtils.findRenderedDOMComponentWithClass(info, 'first').getDOMNode();
        last = TestUtils.findRenderedDOMComponentWithClass(info, 'last').getDOMNode();
        email = TestUtils.findRenderedDOMComponentWithClass(info, 'email').getDOMNode();
        phone = TestUtils.findRenderedDOMComponentWithClass(info, 'phone').getDOMNode();
    });
    
    xit('should populate default values', function() {
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
        account = TestUtils.renderIntoDocument(<Account {...defaults} />);
        company = TestUtils.findRenderedDOMComponentWithClass(account, 'company').getDOMNode();
        occupation = TestUtils.findRenderedDOMComponentWithClass(account, 'occupation').getDOMNode();
        website = TestUtils.findRenderedDOMComponentWithClass(account, 'website').getDOMNode();
        dob = TestUtils.findRenderedDOMComponentWithClass(account, 'dob').getDOMNode();
        gender = TestUtils.findRenderedDOMComponentWithClass(account, 'gender').getDOMNode();
    });
    
    xit('should populate default values', function() {
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

xdescribe('Account: Address', function() {
    var street, city, state, zip;
    
    beforeEach(function() {
        account = TestUtils.renderIntoDocument(<Account {...defaults} />);
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

xdescribe('Account: Social', function() {
 it('case 1', function() {

 });
});

xdescribe('Account: Password', function() {
 it('case 1', function() {

 });
});