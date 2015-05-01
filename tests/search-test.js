/** @jsx React.DOM **/
jest.genMockFromModule('socket.io-client');
jest.dontMock('../src/react/search.js');
var React, Search, TestUtils, view;

describe('Search', function() { 
  React = require('react/addons');
  Search = require('../src/react/search.js');
  TestUtils = React.addons.TestUtils;
     
  beforeEach(function () {
      view = TestUtils.renderIntoDocument(<Search />);
  });
  it('should have composed views', function () {
      expect(TestUtils.isElement(<Search />)).toEqual(true);
      //var groups = TestUtils.findRenderedDOMComponentWithClass(view, 'groups');
      var filter = TestUtils.findRenderedDOMComponentWithClass(view, 'filter');
      //var dates = TestUtils.findRenderedDOMComponentWithClass(view, 'dates');
      var types = TestUtils.findRenderedDOMComponentWithClass(view, 'types');
      var pagination = TestUtils.findRenderedDOMComponentWithClass(view, 'pagination');
      var posts = TestUtils.findRenderedDOMComponentWithClass(view, 'posts');
      
      // Test if React Component, not just DOM component?
      //expect(TestUtils.isDOMComponent(groups)).toEqual(true);
      expect(TestUtils.isDOMComponent(filter)).toEqual(true);
      //expect(TestUtils.isDOMComponent(dates)).toEqual(true);
      expect(TestUtils.isDOMComponent(types)).toEqual(true);
      expect(TestUtils.isDOMComponent(pagination)).toEqual(true);
      expect(TestUtils.isDOMComponent(posts)).toEqual(true);
 });
    
 it('should have default properties', function () {
     var props = view.props;
     expect(props.posts.length).toEqual(0);
     expect(props.limit).toEqual(10);
     expect(props.page).toEqual(1);
     expect(props.sort).toEqual('influence');
     expect(props.direction).toEqual('DESC');
     expect(props.search).toEqual('');
     expect(props.total).toEqual(0);
 });
 
 it('should have a search field', function () {
     var term = view.refs.term.getDOMNode();
     var button = view.refs.search.getDOMNode();
     expect(view.props.search).toEqual('');
     view.setProps({search: 'test'});
     // uncontrolled component, value is not set on search field, need to revisit 
     //expect(term.value).toEqual('test');
     // Simulate does not work??
     //TestUtils.Simulate.change(term, {target: {value: "keyword"}}); 
     term.value = 'keyword';
     expect(term.value).toEqual('keyword');
     expect(view.props.search).toEqual('test');
     TestUtils.Simulate.click(button);
     expect(view.props.search).toEqual('keyword');
 });
});
/*

describe('Groups', function() {
 var groups;
 beforeEach(function () {
    //search = TestUtils.renderIntoDocument(<Search />);
    //groups = TestUtils.findRenderedDOMComponentWithTag(search, 'Groups');
 });
 
 it('case 1', function() {

 });
});

*/
describe('Filter', function() {
 var sort, direction;
 
 beforeEach(function () {
     search = TestUtils.renderIntoDocument(<Search />);
     sort = TestUtils.findRenderedDOMComponentWithClass(search, 'sort').getDOMNode();
     direction = TestUtils.findRenderedDOMComponentWithClass(search, 'direction').getDOMNode();
 });
 
 it('should have a default sort value of "influence"', function () {
     expect(search.props.sort).toEqual('influence');
 });
 
 it('should have a default direction value of "DESC"', function () {
     expect(search.props.direction).toEqual('DESC');
 });
 
 it('should sort posts by a field', function() {
     TestUtils.Simulate.change(sort, {target: {value: 'comments'}});
     expect(search.props.sort).toEqual('comments');
 });
 
 it('should change sort direction', function() {
     TestUtils.Simulate.change(direction, {target: {value: 'ASC'}});
     expect(search.props.direction).toEqual('ASC');
 });
});

describe('Types', function() {
 it('case 1', function() {
      //expect(TestUtils.scryRenderedDOMComponentsWithTag(search, 'div')[0].getDOMNode()).toEqual(true);
 });
});

describe('Pagination', function() {
 var next, previous;
 
 beforeEach(function () {
     view = TestUtils.renderIntoDocument(<Search />);
     next = view.refs.pagination.refs.next.getDOMNode();
     previous = view.refs.pagination.refs.prev.getDOMNode();
     //next = TestUtils.findRenderedDOMComponentWithClass(search, 'next').getDOMNode();
     //previous = TestUtils.findRenderedDOMComponentWithClass(search, 'prev').getDOMNode();
 });
 
 it('should have a default page value of 1', function () {
     expect(view.props.page).toEqual(1);
 });
 
 it('should have a default limit value of 10', function () {
     expect(view.props.limit).toEqual(10);
 });
 
 it('should not decrement page when page is 1', function () {
     expect(view.props.page).toEqual(1);
     TestUtils.Simulate.click(previous);
     expect(view.props.page).toEqual(1);
 });
 
  it('should not increment page when total is 0', function () {
     expect(view.props.total).toEqual(0);
     expect(view.props.page).toEqual(1);
     TestUtils.Simulate.click(next);
     expect(view.props.page).toEqual(1);
 });
 
 it('should increment page when page is 1 and total is 11', function () {
     view.setProps({total: 11});
     expect(view.props.total).toEqual(11);
     TestUtils.Simulate.click(next);
     expect(view.props.page).toEqual(2);
 }); 
 
 it('should decrement page when page is 2', function () {
     view.setProps({page: 2});
     expect(view.props.page).toEqual(2);
     TestUtils.Simulate.click(previous);
     expect(view.props.page).toEqual(1);
 }); 

});

describe('Posts', function() {
 it('case 1', function() {

 });
});

describe('PostItem', function() {
 it('case 1', function() {

 });
});