jest.dontMock('../src/react/general');
var React, General, TestUtils;
describe('General Test', function() {
 it('case 1', function() {
    React = require('react/addons');
    General = require('../src/react/general');
    TestUtils = React.addons.TestUtils;
 });
});