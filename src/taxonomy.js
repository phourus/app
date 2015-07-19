"use strict";
let blogs = {};
let events = {};
let subjects = {};
let debates = {};
let polls = {};
let beliefs = {};
let filters = {};

// shared
let members = [];

subjects.category = [
{label: "English", value:"english"},
{label: "History", value:"history"},
{label: "Math", value:"math"},
{label: "Science", value:"science"},
{label: "Arts", value:"arts"},
{label: "Trades", value:"trades"},
{label: "Social", value:"social"},
{label: "Business", value:"business"}
];

subjects.english = [
{label: "Writing", value:"writing"},
{label: "Literature", value:"literature"}
];

subjects.history = [
{label: "Prehistoric", value:"prehistoric"},
{label: "Ancient", value:"ancient"},
{label: "Modern", value:"modern"},
{label: "World", value:"world"},
{label: "American", value:"american"}
];

subjects.math = [
{label: "Arithmetic", value:"arithemtic"},
{label: "Algebra", value:"algebra"},
{label: "Geometry", value:"geometry"},
{label: "Probability & Statistics", value:"stats"},
{label: "Trigonometry", value:"trigonometry"},
{label: "Calculus", value:"calculus"}
];

subjects.science = [
{label: "Physics", value:"physics"},
{label: "Chemistry", value:"chemistry"},
{label: "Biology", value:"biology"},
{label: "Geology", value:"geology"},
{label: "Computer", value:"computer"}
];

subjects.arts = [
{label: "Art", value:"art"},
{label: "Music", value:"music"},
{label: "Theatre", value:"theatre"}
];

subjects.trades = [
{label: "Auto", value:"auto"},
{label: "Electrician", value:"electrician"},
{label: "Masonry", value:"masonry"},
{label: "Plumbing", value:"plumbing"},
{label: "HVAC", value:"hvac"},
{label: "Construction", value:"construction"}
];

subjects.social = [
{label: "Psychology", value:"psychology"},
{label: "Health", value:"health"},
{label: "Government", value:"government"},
{label: "Economics", value:"economics"}
];

subjects.business = [
{label: "Administrative", value:"admin"},
{label: "Management", value:"management"},
{label: "Marketing", value:"marketing"},
{label: "Finance", value:"finance"}
];

/** EVENTS **/

/** BLOGS **/
blogs.subcategory = [
{label: "Idea", value:"idea"},
{label: "Fact", value:"fact"},
{label: "Opinion", value:"opinion"},
{label: "Rant", value:"rant"},
{label: "Rave", value:"rave"},
{label: "Humor", value:"humor"}
];

blogs.world = [
{label: "Environment", value:"environment"},
{label: "Economy", value:"economy"},
{label: "Health", value:"health"},
{label: "Money", value:"money"}
];

blogs.mind = subjects.category;

blogs.voice = [
{label: "Rights", value:"rights"},
{label: "Financial", value:"financial"},
{label: "Infrastructure", value:"infrastructure"}
];

blogs.self = [
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

debates.category = blogs.voice;
polls.category = blogs.voice;

beliefs.category = blogs.self;

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
    religion: blogs.self
}

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
}

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
}

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
}

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
}

module.exports = {
    blogs: blogs,
    events: events,
    subjects: subjects,
    debates: debates,
    polls: polls,
    beliefs: beliefs,
    quotes: '',
    questions: '',
    filters: filters
}
