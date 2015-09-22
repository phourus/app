var Chance = require('chance');

var Users = require('../models/users');
var Passwords = require('../models/passwords');

var Posts = require('../models/posts');
var Links = require('../models/links');
var Tags = require('../models/tags');

var Views = require('../models/views');
var Thumbs = require('../models/thumbs');
var Comments = require('../models/comments');

var Locations = require('../models/locations');

var Orgs = require('../models/orgs');
var Members = require('../models/members');

var Collaborators = require('../models/collaborators');
var Favorites = require('../models/favorites');
var Mentions = require('../models/mentions');
var Teams = require('../models/teams');
var Teammates = require('../models/teammates');
var Votes = require('../models/votes');

var chance = new Chance();

var POST_TOTAL = 500;
var USER_TOTAL = 200;
var ORG_TOTAL = 50;
var TEAM_TOTAL = 200;
var COMMENT_TOTAL = 500;

/** TYPES **/
var User = function User () {
  return {
        username: chance.word(),
        first: chance.first(),
        last: chance.last(),
        email: chance.email(),
        phone: chance.phone(),
        gender: chance.character({pool: "MFP"}),
        occupation: chance.word(),
        company: chance.word(),
        website: chance.domain(),
        dob: chance.birthday(),
        influence: chance.integer({min: 0, max: 100}),
        img: '/assets/avatars/' + chance.integer({min: 1, max: 10}) + '.jpg'
    };
};

var Post = function Post () {
  return {
    userId: chance.integer({min: 1, max: USER_TOTAL}),
    orgId: [null, chance.integer({min: 1, max: ORG_TOTAL})][(chance.integer({min: 0, max: 1}))],
    privacy: ['public', 'members', 'private'][chance.integer({min: 0, max: 2})],
    type: ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'][chance.integer({min: 0, max: 7})],
    title: chance.sentence(),
    slug: chance.word(),
    content: chance.paragraph(),

    // Meta
    scope: ['local', 'county', 'state', 'national', 'international'][chance.integer({min: 0, max: 4})],
    zip: chance.zip(),
    author: chance.name(),

    // Stats
    totalComments: chance.integer({min: 0, max: 1000}),
    totalViews: chance.integer({min: 0, max: 100000}),
    totalThumbs: chance.integer({min: 0, max: 10000}),
    popularity: chance.integer({min: 0, max: 100}),
    influence: chance.integer({min: 0, max: 100}),

    // Location
    lat: chance.latitude(),
    lng: chance.longitude()
  };
};

var View = function View () {
    var rndm = [{KEY: 'userId', MAX: USER_TOTAL}, {KEY: 'postId', MAX: POST_TOTAL}, {KEY: 'orgId', MAX: ORG_TOTAL}][chance.integer({min: 0, max: 1})];
    var out = {
        ip: chance.ip(),
        path: '/',
        location: '',
        viewerId: chance.integer({min: 1, max: USER_TOTAL}),
        referer: chance.url(),
        exit: chance.url()
    };
    out[rndm.KEY] = chance.integer({min: 1, max: rndm.MAX});
    return out;
};

var Thumb = function Thumb () {
    return {
        postId: chance.integer({min: 1, max: POST_TOTAL}),
        userId: chance.integer({min: 1, max: USER_TOTAL}),
        positive: chance.bool()
    };
};

var Comment = function Comment () {
    return {
        userId: chance.integer({min: 1, max: USER_TOTAL}),
        postId: chance.integer({min: 1, max: POST_TOTAL}),
        content: chance.paragraph()
    };
};

var Location = function Location () {
    return {
        //orgId: chance.integer({min: 1, max: ORG_TOTAL}),
        userId: chance.integer({min: 1, max: USER_TOTAL}),
        street: chance.street(),
        city: chance.city(),
        county: chance.province(),
        state: chance.state(),
        country: chance.country(),
        zip: chance.zip(),
        lat: chance.latitude(),
        lng: chance.longitude(),
        type: ['primary', 'business', 'residential', 'mailing'][chance.integer({min: 0, max: 3})]
    };
};

var Link = function Link () {
    return {
        postId: chance.integer({min: 1, max: POST_TOTAL}),
        url: chance.url(),
        title: chance.sentence(),
        caption: chance.sentence()
    };
};

var Tag = function Tag () {
    return {
        postId: chance.integer({min: 1, max: POST_TOTAL}),
        tag: chance.word()
    };
};

var Org = function Org () {
    return {
        type: ['company', 'school', 'government', 'group'][chance.integer({min: 0, max: 3})],
        name: chance.sentence(),
        shortname: chance.word(),
        email: chance.email(),
        phone: chance.phone(),
        fax: chance.phone(),
        website: chance.domain(),
        influence: chance.integer({min: 0, max: 100}),
        img: '/assets/organizations/' + chance.integer({min: 1, max: 10}) + '.jpg',
        people: chance.integer({min: 1, max: 10000}),
        about: chance.paragraph(),
        video: chance.url(),
        channel: chance.url(),
        contact: chance.paragraph()
    };
};

var Collaborator = function Collaborator () {
  let team = chance.integer({min: 0, max: 1});
  return {
    userId: [chance.integer({min: 1, max: USER_TOTAL}), null][team],
    postId: chance.integer({min: 1, max: POST_TOTAL}),
    teamId: [null, chance.integer({min: 1, max: TEAM_TOTAL})][team]
  };
};

var Favorite = function Favorite () {
  return {
    targetId: chance.integer({min: 1, max: USER_TOTAL}),
    userId: chance.integer({min: 1, max: USER_TOTAL}),
  };
};

var Mention = function Mention () {
  return {
    commentId: chance.integer({min: 1, max: COMMENT_TOTAL}),
    userId: chance.integer({min: 1, max: USER_TOTAL})
  };
};

var Team = function Team () {
  return {
    name: chance.word(),
    orgId: chance.integer({min: 1, max: ORG_TOTAL})
  };
};

var Teammate = function Teammate () {
  return {
    userId: chance.integer({min: 1, max: USER_TOTAL}),
    teamId: chance.integer({min: 1, max: TEAM_TOTAL})
  };
};

var Vote = function Vote () {
  return {
    option: chance.word(),
    postId: chance.integer({min: 1, max: POST_TOTAL}),
    userId: chance.integer({min: 1, max: USER_TOTAL})
  };
};
// var Clout = function Clout () {
//     return {
//         org_id: chance.integer({min: 1, max: ORG_TOTAL}),
//         type: ['press', 'award'][chance.integer({min: 0, max: 1})],
//         title: chance.sentence(),
//         date: chance.date(),
//         content: chance.paragraph(),
//         img: ''
//     }
// }
//
// var Review = function Review () {
//     return {
//         org_id: chance.integer({min: 1, max: ORG_TOTAL}),
//         user_id: chance.integer({min: 1, max: USER_TOTAL}),
//         title: chance.sentence(),
//         content: chance.paragraph(),
//         rating: chance.integer({min: 1, max: 5})
//     }
// }

var Member = function Member () {
    return {
        orgId: chance.integer({min: 1, max: ORG_TOTAL}),
        userId: chance.integer({min: 1, max: USER_TOTAL}),
        admin: chance.bool(),
        approved: chance.bool()
    };
};

var Password = function Password () {
    return {
        userId: chance.integer({min: 1, max: USER_TOTAL}),
        hash: '$2a$10$Pq96YXDhtlUMgDzq9Z0yiO3SpcHE82gqGU98vTPvQtyeOw8OyuwES'
    };
};

/** GENERATE **/
function generate (Model, count, db) {
    var i = 0;
    while (i < count) {
        var model = new Model();
        db.create(model).catch(function(err) {
            console.log(err);
        });
        i++;
    };
};

/** EXECUTE **/
// STEP 1
generate(User, USER_TOTAL, Users);
generate(Post, POST_TOTAL, Posts);
generate(Org, ORG_TOTAL, Orgs);

// STEP 2
// generate(Member, ORG_TOTAL * 8, Members);
// generate(Password, USER_TOTAL, Passwords);
// generate(Tag, POST_TOTAL * 4, Tags);
// generate(Link, POST_TOTAL, Links);
// generate(View, 1000, Views);
// generate(Thumb, POST_TOTAL * 10, Thumbs);
// generate(Comment, COMMENT_TOTAL, Comments);
// generate(Location, USER_TOTAL * 2, Locations);
// generate(Collaborator, POST_TOTAL, Collaborators);
// generate(Favorite, USER_TOTAL * 5, Favorites);
// generate(Mention, COMMENT_TOTAL * 2, Mentions);
// generate(Team, ORG_TOTAL * 2, Teams);
// generate(Teammate, TEAM_TOTAL * 5, Teammates);
// generate(Vote, POST_TOTAL, Votes);

/*
generate(Clout, 200, Clouts);
generate(Review, 200, Reviews);
*/
