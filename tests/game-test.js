/** @jsx React.DOM **/
jest.dontMock('../src/react/game');
var React, game, TestUtils;
describe('Game Test', function() {
 
 it('should have a title', function() {
    React = require('react/addons');
    Game = require('../src/react/game');
    TestUtils = React.addons.TestUtils;
    game = TestUtils.renderIntoDocument(<Game />);
    expect(TestUtils.findRenderedDOMComponentWithTag(game, 'h1').getDOMNode().textContent).toEqual('Game');
 });
});