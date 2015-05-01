jest.dontMock('../src/react/404');
var React, View404, TestUtils, view404;

describe('404', function() {
    React = require('react/addons');
    View401 = require('../src/react/404');
    TestUtils = React.addons.TestUtils;

    beforeEach(function() {
        view404 = TestUtils.renderIntoDocument(<View404 />);
    });    
});