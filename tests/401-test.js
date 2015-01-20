jest.dontMock('../src/react/401');
var React, View401, TestUtils, view401;

describe('401', function() {
    React = require('react/addons');
    View401 = require('../src/react/401');
    TestUtils = React.addons.TestUtils;

    beforeEach(function() {
        view401 = TestUtils.renderIntoDocument(<View401 />);
    });    
});