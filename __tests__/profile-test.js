jest.dontMock('../src/react/profile');
var React, Profile, TestUtils;

describe('Profile', function() {
    React = require('react/addons');
    Profile = require('../src/react/profile');
    TestUtils = React.addons.TestUtils;
    var orgProfile = {
        org: {
            
        },
        stats: {
           people: 1434,
           members: 143,
           pending: 22,
           influence: 55
       }
    };
    var userProfile = {
        user: {
            
        },
        stats: {
            
        }
    };
    
    beforeEach(function () {
       profile = TestUtils.renderIntoDocument(<Profile />); 
    });
    
    it('should have default properties', function() {
        expect(profile.props.profile).toEqual({});
    });
    
    it('should accept a User model', function() {
    
    });
    
    it('should accept an Org model', function () {
        
    });
});

describe('Profile: Heading', function() {
 it('case 1', function() {

 });
});

describe('Profile: Basic', function() {
 it('case 1', function() {

 });
});

describe('Profile: Details', function() {
 it('case 1', function() {

 });
});

describe('Profile: Stats', function() {
 it('case 1', function() {

 });
});

describe('Profile: Tabs', function() {
 it('case 1', function() {

 });
});

describe('Profile: Views', function() {
 it('case 1', function() {

 });
});

describe('Profile: ViewInfo', function() {
 it('case 1', function() {

 });
});

describe('Profile: ViewPosts', function() {
 it('case 1', function() {

 });
});

describe('Profile: ViewRank', function() {
 it('case 1', function() {

 });
});

describe('Profile: ViewMembership', function() {
 it('case 1', function() {

 });
});

describe('Profile: ViewExtras', function() {
 it('case 1', function() {

 });
});

describe('Profile: Widget', function() {
 it('case 1', function() {

 });
});