jest.dontMock('../src/map');
var React, TestUtils, Map;

describe('Map', function() {
    React = require('react/addons');
    Map = require('../src/map');
    TestUtils = React.addons.TestUtils;
    
    it('should have default properties', function() {
        expect(Map.map).toEqual({});
        expect(Map.markers).toEqual([]);
        expect(Map.windows).toEqual([]);
        expect(Map.clusters).toEqual([]);
        expect(Map.geocoder).toEqual({});
        expect(Map.container).toEqual('#map');
        expect(Map.config).toEqual({
            zoom: 4,
    		x: 38,
    		y: -95
        });
    });
});

describe('Init', function() {
    beforeEach(function() {
        //Map.init();    
    });
    
    it('should initialize', function () {
        
    });
});

describe('Go', function() {
    
});

describe('Marker', function() {
    
});

describe('Clusterize', function() {
    
});