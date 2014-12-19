/** @jsx React.DOM **/
jest.dontMock('../src/react/search.js');
var React, Search, TestUtils, search;

describe('Search', function() { 
  React = require('react/addons');
  Search = require('../src/react/search.js');
  TestUtils = React.addons.TestUtils;
     
  beforeEach(function () {
      search = TestUtils.renderIntoDocument(<Search />);
  });
  it('should have composed views', function () {
      expect(TestUtils.isElement(<Search />)).toEqual(true);
      var groups = TestUtils.findRenderedDOMComponentWithClass(search, 'groups');
      var filter = TestUtils.findRenderedDOMComponentWithClass(search, 'filter');
      var dates = TestUtils.findRenderedDOMComponentWithClass(search, 'dates');
      var types = TestUtils.findRenderedDOMComponentWithClass(search, 'types');
      var pagination = TestUtils.findRenderedDOMComponentWithClass(search, 'pagination');
      var posts = TestUtils.findRenderedDOMComponentWithClass(search, 'posts');
      
      // Test if React Component, not just DOM component?
      expect(TestUtils.isDOMComponent(groups)).toEqual(true);
      expect(TestUtils.isDOMComponent(filter)).toEqual(true);
      expect(TestUtils.isDOMComponent(dates)).toEqual(true);
      expect(TestUtils.isDOMComponent(types)).toEqual(true);
      expect(TestUtils.isDOMComponent(pagination)).toEqual(true);
      expect(TestUtils.isDOMComponent(posts)).toEqual(true);
 });
    
 it('should have default properties', function () {
     var props = search.props;
     expect(props.posts.length).toEqual(0);
     expect(props.limit).toEqual(10);
     expect(props.page).toEqual(1);
     expect(props.sort).toEqual('influence');
     expect(props.direction).toEqual('DESC');
     expect(props.search).toEqual('');
     expect(props.total).toEqual(0);
 });
 
 it('should have a search field', function () {
     var term = search.refs.term.getDOMNode();
     var button = search.refs.search.getDOMNode();
     expect(search.props.search).toEqual('');
     search.setProps({search: 'test'});
     expect(term.value).toEqual('test');
     // Simulate does not work??
     //TestUtils.Simulate.change(term, {target: {value: "keyword"}}); 
     term.value = 'keyword';
     expect(term.value).toEqual('keyword');
     expect(search.props.search).toEqual('test');
     TestUtils.Simulate.click(button);
     expect(search.props.search).toEqual('keyword');
 });
});

describe('Groups', function() {
 var groups;
 beforeEach(function () {
    //search = TestUtils.renderIntoDocument(<Search />);
    //groups = TestUtils.findRenderedDOMComponentWithTag(search, 'Groups');
 });
 
 it('case 1', function() {

 });
});

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
     search = TestUtils.renderIntoDocument(<Search />);
     next = TestUtils.findRenderedDOMComponentWithClass(search, 'next').getDOMNode();
     previous = TestUtils.findRenderedDOMComponentWithClass(search, 'prev').getDOMNode();
 });
 
 it('should have a default page value of 1', function () {
     expect(search.props.page).toEqual(1);
 });
 
 it('should have a default limit value of 10', function () {
     expect(search.props.limit).toEqual(10);
 });
 
 it('should not decrement page when page is 1', function () {
     expect(search.props.page).toEqual(1);
     TestUtils.Simulate.click(previous);
     expect(search.props.page).toEqual(1);
 });
 
  it('should not increment page when total is 0', function () {
     expect(search.props.total).toEqual(0);
     expect(search.props.page).toEqual(1);
     TestUtils.Simulate.click(next);
     expect(search.props.page).toEqual(1);
 });
 
 it('should increment page when page is 1 and total is 11', function () {
     search.setProps({total: 11});
     expect(search.props.total).toEqual(11);
     TestUtils.Simulate.click(next);
     expect(search.props.page).toEqual(2);
 }); 
 
 it('should decrement page when page is 2', function () {
     search.setProps({page: 2});
     expect(search.props.page).toEqual(2);
     TestUtils.Simulate.click(previous);
     expect(search.props.page).toEqual(1);
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