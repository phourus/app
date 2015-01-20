/** @jsx React.DOM **/
jest.genMockFromModule('socket.io-client');
jest.dontMock('../src/react/editor');
jest.dontMock('../src/react/401');
var React, Editor, TestUtils, view, token, posts;

describe('Editor', function() {
    React = require('react/addons');
    Editor = require('../src/react/editor');
    postsObject = require('../src/objects/posts'); 
    token = require('../src/token');
    TestUtils = React.addons.TestUtils;
    posts = [
        {id: 1, type: 'debate', title: 'Debate 1', createdAt: 'today'},
        {id: 2, type: 'blog', title: 'Blog 1', createdAt: 'yesteday'},
        {id: 3, type: 'question', title: 'Question 1', createdAt: 'last week'}
    ]
    
    beforeEach(function () {
      token.get.mockReturnValue(false);
      view = TestUtils.renderIntoDocument(<Editor />);
    });
    
    it('should have default props', function () {
        var props = view.props;
        expect(props.post).toEqual({});
        expect(props.posts).toEqual([]);
        expect(props.mode).toEqual('list');
    });
    it('should display login/registration when token does not exist', function () {
        var view401 = TestUtils.findRenderedDOMComponentWithClass(view, 'view401');
        expect(TestUtils.isDOMComponent(view401)).toEqual(true);
        //expect(TestUtils.findRenderedDOMComponentWithClass(view, 'form')).toThrow(/Error: Did not find exactly one match for class:form/);
        //expect(TestUtils.findRenderedDOMComponentWithClass(view, 'list')).toThrow();
    });
});

describe('Editor: List', function() {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor />);
    });
    
    it('should display list view when token does exist', function () {
        var list = TestUtils.findRenderedDOMComponentWithClass(view, 'list');
        expect(TestUtils.isDOMComponent(list)).toEqual(true);
    });
    
    it('should display a list of posts with titles, types, dates and edit buttons', function () {
        var table, head, row1, row2, row3;
        view.setProps({posts: posts});
        table = TestUtils.findRenderedDOMComponentWithClass(view, 'posts');
        expect(TestUtils.isDOMComponent(table)).toEqual(true);
        head = table.getDOMNode().childNodes[0];
        row1 = table.getDOMNode().childNodes[1];
        row2 = table.getDOMNode().childNodes[2];
        row3 = table.getDOMNode().childNodes[3];
        // head
        expect(head.childNodes[0].innerHTML).toEqual('Created');
        expect(head.childNodes[1].innerHTML).toEqual('Title');
        expect(head.childNodes[2].innerHTML).toEqual('Type');  
        expect(head.childNodes[3].innerHTML).toEqual('Edit');  
        // 1
        expect(row1.childNodes[0].innerHTML).toEqual(posts[0].createdAt);
        expect(row1.childNodes[1].innerHTML).toEqual(posts[0].title);
        expect(row1.childNodes[2].innerHTML).toEqual(posts[0].type);
        // 2
        expect(row2.childNodes[0].innerHTML).toEqual(posts[1].createdAt);
        expect(row2.childNodes[1].innerHTML).toEqual(posts[1].title);
        expect(row2.childNodes[2].innerHTML).toEqual(posts[1].type);
        // 3
        expect(row3.childNodes[0].innerHTML).toEqual(posts[2].createdAt);
        expect(row3.childNodes[1].innerHTML).toEqual(posts[2].title);
        expect(row3.childNodes[2].innerHTML).toEqual(posts[2].type);
    });
    
    it('should change to form view when "Add Post" button is clicked', function () {
        var add = TestUtils.findRenderedDOMComponentWithClass(view, 'add');
        TestUtils.Simulate.click(add);
        var form = TestUtils.findRenderedDOMComponentWithClass(view, 'form');
        expect(TestUtils.isDOMComponent(form)).toEqual(true);
    });
    
    it('should call posts.single when "Edit Post" button is clicked', function () {
        var edit, btn;
        view.setProps({posts: posts});
        edit = TestUtils.scryRenderedDOMComponentsWithClass(view, 'edit');
        btn = edit[2];
        TestUtils.Simulate.click(btn);
        // form won't be displayed until returnSingle
        expect(postsObject.single).toBeCalledWith(btn.props.id.toString());
    });
});

describe('Editor: Form', function() {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
    });
    
    it('should display form view when token does exist and mode is "form"', function () {
        var form = TestUtils.findRenderedDOMComponentWithClass(view, 'form');
        expect(TestUtils.isDOMComponent(form)).toEqual(true);
    });
    
    it('should have editable common fields', function () {
        var form, title, privacy, content, model;
        form = view.refs.form.refs;
        title = form.title.getDOMNode();
        privacy = form.privacy.getDOMNode();
        content = form.rte.refs.content.getDOMNode();
        
/*
        expect(TestUtils.isDOMComponent(title)).toEqual(true);
        expect(TestUtils.isDOMComponent(privacy)).toEqual(true);
        expect(TestUtils.isDOMComponent(content)).toEqual(true);
*/
        
        expect(title.value).toEqual('');
        expect(privacy.value).toEqual('private');
        expect(content.value).toEqual('');
        
        model = {title: 'TestTitle', privacy: 'phourus', content: 'TestContent'};
        view.setProps({post: model});
        
        expect(title.value).toEqual(model.title);
        expect(privacy.value).toEqual(model.privacy);
        console.log(content.value);
        expect(content.value).toEqual(model.content);
    });
    
    it('should have a "Back to List" button', function () {
        
    });
    
    it('should have a group of Type radio buttons', function () {
        
    });
});

describe('Form: Add', function () {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
    });
    
    it('should have a null value for props.post', function () {
        
    });
    
    it('should have a "Create Post" button only when in "Add" mode', function () {
        
    });
});

describe('Form: Edit', function () {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
    });
    
    it('should have a "Delete Post" button only when in "Edit" mode', function () {
        
    });
    
    it('should have an "Update Post" button only when in "Edit" mode', function () {
        
    });
});

describe('Types', function () {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
    });
    
    it('should have a Blog option', function () {
        
    });
        
    it('should have an Event option', function () {
        
    });
    
    it('should have a Subject option', function () {
        
    });
    
    it('should have a Question option', function () {
        
    });
    
    it('should have a Debate option', function () {
        
    });
    
    it('should have a Quote option', function () {
        
    });
    
    it('should have a Belief option', function () {
        
    });
});