jest.dontMock('../src/react/401');
var React, View, TestUtils, view;

describe('401', function() {
    React = require('react/addons');
    View = require('../src/react/401');
    TestUtils = React.addons.TestUtils;

    beforeEach(function() {
        view = TestUtils.renderIntoDocument(<View />);
    });    
    
    it("should only display a login form initially", function () {
        var login = TestUtils.findRenderedDOMComponentWithClass(view, 'login').getDOMNode(); 
        expect(login).toBeDefined();
        expect(view.getDOMNode().childNodes.length).toEqual(1);
    });
});

describe('Login', function () {
    var login;
    
    beforeEach(function () {
        view = TestUtils.renderIntoDocument(<View />);
        login = TestUtils.findRenderedDOMComponentWithClass(view, 'login');
    });
    
    it("should have a title", function () {
        expect(TestUtils.findRenderedDOMComponentWithTag(login, 'h1')).toBeDefined();
    });
    
    it("should have username/password", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(login, 'username')).toBeDefined();
        expect(TestUtils.findRenderedDOMComponentWithClass(login, 'password')).toBeDefined();
    });
    
    it("should have a login button", function () {
        expect(TestUtils.findRenderedDOMComponentWithTag(login, 'button')).toBeDefined();
    });
    
    it("should have a 'register' link and message", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(login, 'registration')).toBeDefined();
        expect(TestUtils.findRenderedDOMComponentWithClass(login, 'registerLink')).toBeDefined();
    });
    
    it("should change register state to true when signup link is clicked", function () {
        var link = TestUtils.findRenderedDOMComponentWithClass(login, 'registerLink');
        expect(view.state.mode).toEqual("login");
        TestUtils.Simulate.click(link);
        expect(view.state.mode).toEqual("register");
    });
    
    it("should have a 'forgot' link", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(login, 'forgotLink')).toBeDefined();
    });
});

describe('Register', function () {
    var register;
    
    beforeEach(function () {
        var login, link;
        view = TestUtils.renderIntoDocument(<View />);
        login = TestUtils.findRenderedDOMComponentWithClass(view, 'login');
        link = TestUtils.findRenderedDOMComponentWithClass(login, 'registerLink');
        TestUtils.Simulate.click(link);
        register = TestUtils.findRenderedDOMComponentWithClass(view, 'register');
    });    
    
    it("should have a title", function () { 
        expect(TestUtils.findRenderedDOMComponentWithTag(register, 'h1')).toBeDefined();
    });
    
    it("should have an email field", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(register, 'email')).toBeDefined();
    });
    
    it("should have a password field", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(register, 'password')).toBeDefined();
    });
    
    it("should have a confirm password field", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(register, 'confirm')).toBeDefined();
    });
    
    it("should have a submit button", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(register, 'submit')).toBeDefined();
    });
    
    it("should validate fields", function () {
        
    });    
});

describe('Forgot', function () {
    var forgot;
    
    beforeEach(function () {
        var login, link;
        view = TestUtils.renderIntoDocument(<View />);
        login = TestUtils.findRenderedDOMComponentWithClass(view, 'login');
        link = TestUtils.findRenderedDOMComponentWithClass(login, 'forgotLink');
        TestUtils.Simulate.click(link);
        forgot = TestUtils.findRenderedDOMComponentWithClass(view, 'forgot');
    });    
    
    it("should have a title", function () { 
        expect(TestUtils.findRenderedDOMComponentWithTag(forgot, 'h1')).toBeDefined();
    }); 
    
    it("should have a username/email field", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(forgot, 'handle')).toBeDefined();
    });
    
    it("should have a submit button", function () {
        expect(TestUtils.findRenderedDOMComponentWithClass(forgot, 'submit')).toBeDefined();
    });   
});