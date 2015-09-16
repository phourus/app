"use strict";
let blog = {};
let event = {};
let subject = {};
let debate = {};
let poll = {};
let belief = {};
let filters = {};

// shared
let members = [];

subject.category = [
{label: "English", value:"english"},
{label: "History", value:"history"},
{label: "Math", value:"math"},
{label: "Science", value:"science"},
{label: "Arts", value:"arts"},
{label: "Trades", value:"trades"},
{label: "Social", value:"social"},
{label: "Business", value:"business"}
];

subject.english = [
{label: "Writing", value:"writing"},
{label: "Literature", value:"literature"}
];

subject.history = [
{label: "Prehistoric", value:"prehistoric"},
{label: "Ancient", value:"ancient"},
{label: "Modern", value:"modern"},
{label: "World", value:"world"},
{label: "American", value:"american"}
];

subject.math = [
{label: "Arithmetic", value:"arithemtic"},
{label: "Algebra", value:"algebra"},
{label: "Geometry", value:"geometry"},
{label: "Probability & Statistics", value:"stats"},
{label: "Trigonometry", value:"trigonometry"},
{label: "Calculus", value:"calculus"}
];

subject.science = [
{label: "Physics", value:"physics"},
{label: "Chemistry", value:"chemistry"},
{label: "Biology", value:"biology"},
{label: "Geology", value:"geology"},
{label: "Computer", value:"computer"}
];

subject.arts = [
{label: "Art", value:"art"},
{label: "Music", value:"music"},
{label: "Theatre", value:"theatre"}
];

subject.trades = [
{label: "Auto", value:"auto"},
{label: "Electrician", value:"electrician"},
{label: "Masonry", value:"masonry"},
{label: "Plumbing", value:"plumbing"},
{label: "HVAC", value:"hvac"},
{label: "Construction", value:"construction"}
];

subject.social = [
{label: "Psychology", value:"psychology"},
{label: "Health", value:"health"},
{label: "Government", value:"government"},
{label: "Economics", value:"economics"}
];

subject.business = [
{label: "Administrative", value:"admin"},
{label: "Management", value:"management"},
{label: "Marketing", value:"marketing"},
{label: "Finance", value:"finance"}
];

/** EVENTS **/

/** BLOGS **/
blog.subcategory = [
{label: "Idea", value:"idea"},
{label: "Fact", value:"fact"},
{label: "Opinion", value:"opinion"},
{label: "Rant", value:"rant"},
{label: "Rave", value:"rave"},
{label: "Humor", value:"humor"}
];

blog.world = [
{label: "Environment", value:"environment"},
{label: "Economy", value:"economy"},
{label: "Health", value:"health"},
{label: "Money", value:"money"}
];

blog.mind = subject.category;

blog.voice = [
{label: "Rights", value:"rights"},
{label: "Financial", value:"financial"},
{label: "Infrastructure", value:"infrastructure"}
];

blog.self = [
{label: "Christianity", value:"christians"},
{label: "Islam", value:"muslims"},
{label: "Judaism", value:"jews"},
{label: "New Age/Spiritual", value:"spiritual"},
{label: "Buddhism", value:"buddhists"},
{label: "Atheism", value:"atheists"},
{label: "Agnosticism", value:"agnostics"},
{label: "Humanism", value:"humanist"},
{label: "Other", value:"other"},
{label: "Not Religious", value:"non"}
];

debate.category = blog.voice;
poll.category = blog.voice;

belief.category = blog.self;

/** MICRO-FILTERS **/
filters.users = {
    age: [
        {label: "18-30", value:"18"},
        {label: "30-40", value:"30"},
        {label: "40-50", value:"40"},
        {label: "50+", value:"50"}
    ],
    gender: [
        {label: "Male", value:"M"},
        {label: "Female", value:"F"}
    ],
    party: [
        {label: "Liberal", value:"liberal"},
        {label: "Conservative", value:"conservative"},
        {label: "Libertarian", value:"libertarian"},
        {label: "Independent", value:"independent"},
        {label: "Other/No Party", value:"other"}
    ],
    religion: blog.self
};

members = [
    {label: "1-5", value:"1"},
    {label: "5-10", value:"5"},
    {label: "10-50", value:"10"},
    {label: "50-100", value:"50"},
    {label: "100-1000", value:"100"},
    {label: "1000+", value:"1000"}
];

filters.companies = {
    members: members,
    size: [
        {label: "1-5 Employees", value:"1"},
        {label: "5-10 Employees", value:"5"},
        {label: "10-50 Employees", value:"10"},
        {label: "50-100 Employees", value:"50"},
        {label: "100-1000 Employees", value:"100"},
        {label: "1000-10,000 Employees", value:"1000"},
        {label: "10,000+ Employees", value:"10000"}
    ],
    type: [
        {label: "Sole Proprietorship", value:"sole"},
        {label: "Partnership/LLP", value:"llp"},
        {label: "LLC", value:"llc"},
        {label: "Corporation", value:"corp"}
    ]
    // industry
};

filters.schools = {
    members: members,
    size: [
        {label: "< 100 Students", value:"100"},
        {label: "100 - 500 Students", value:"500"},
        {label: "500 - 1000 Students", value:"1000"},
        {label: "1,000 - 5,000 Students", value:"5000"},
        {label: "5,000 - 10,000 Students", value:"10000"},
        {label: "10,000+ Students", value:"20000"}
    ],
    type: [
        {label: "Public High School", value:"sole"},
        {label: "Private High School", value:"sole"},
        {label: "Public Post-Secondary", value:"corp"},
        {label: "Private Post-Secondary", value:"corp"},
        {label: "Trade School", value:"llp"},
        {label: "Charter School", value:"llp"},
        {label: "Certification Program", value:"llc"},
        {label: "Private Education/Tutoring", value:"corp"}
    ]
    // expertise
};

filters.govs = {
    members: members,
    size: [
        {label: "< 100 Students", value:"100"},
        {label: "100 - 500 Students", value:"500"},
        {label: "500 - 1000 Students", value:"1000"},
        {label: "1,000 - 5,000 Students", value:"5000"},
        {label: "5,000 - 10,000 Students", value:"10000"},
        {label: "10,000+ Students", value:"20000"}
    ],
    type: [
        {label: "Local", value:"local"},
        {label: "County", value:"county"},
        {label: "State", value:"state"},
        {label: "Federal", value:"federal"}
    ]
    // specialty
};

filters.groups = {
    members: members,
    size: [
        {label: "< 100 Students", value:"100"},
        {label: "100 - 500 Students", value:"500"},
        {label: "500 - 1000 Students", value:"1000"},
        {label: "1,000 - 5,000 Students", value:"5000"},
        {label: "5,000 - 10,000 Students", value:"10000"},
        {label: "10,000+ Students", value:"20000"}
    ],
    type: [
        {label: "Public High School", value:"sole"},
        {label: "Private High School", value:"sole"},
        {label: "Public Post-Secondary", value:"corp"},
        {label: "Private Post-Secondary", value:"corp"},
        {label: "Trade School", value:"llp"},
        {label: "Charter School", value:"llp"},
        {label: "Certification Program", value:"llc"},
        {label: "Private Education/Tutoring", value:"corp"}
    ]
    // focus
};

module.exports = {
    blog: blog,
    event: event,
    subject: subject,
    debate: debate,
    poll: poll,
    belief: belief,
    quote: belief,
    question: subject,
    filters: filters
};
