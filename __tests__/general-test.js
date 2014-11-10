jest.dontMock('../build/react/general');
var React, General, TestUtils;
describe('General Test', function() {
 it('case 1', function() {
    React = require('react/addons');
    General = require('../build/react/general');
    TestUtils = React.addons.TestUtils;
 });
});