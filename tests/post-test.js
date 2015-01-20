jest.dontMock('../src/react/post');
var React, Post, TestUtils, model, view;

describe('Post', function() {
    React = require('react/addons');
    Post = require('../src/react/post');
    TestUtils = React.addons.TestUtils;
    
    model = {
         title: "My first Phourus post",
         created: "2 weeks ago",
         influence: 65,
         element: 'voice',
         scope: 'local',
         type: 'debate',   
         user: {
             first: "Jesse",
             last: "Drelick" 
         },
         stats: {
             influence: 62,
         }   
     };
     
    beforeEach(function () {
        view = TestUtils.renderIntoDocument(<Post />);
    });

    it('should have default properties', function () {
        var props = view.props;
        
    });
    
    it('should accept a Post model', function () {
        view.setProps(model);
    });
});

describe('Post: Details', function() {
 it('case 1', function() {

 });
});

describe('Post: Stats', function() {
 it('case 1', function() {

 });
});

describe('Post: Interact', function() {
 it('case 1', function() {

 });
});

describe('Post: Views', function() {
 it('case 1', function() {

 });
});

describe('Post: Thumbs', function() {
 it('case 1', function() {

 });
});

describe('Post: Comments', function() {
 it('case 1', function() {

 });
});

describe('Post: Comment', function() {
 it('case 1', function() {

 });
});