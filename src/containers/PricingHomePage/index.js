import React from 'react';
import Router, { History, Link } from 'react-router';

import Features from '../../components/Features';

let About = React.createClass({
    mixins: [History],
    getInitialState: function () {
        return {
            mode: "signup"
        }
    },
    render: function () {
        let classes = {
            signup: "",
            create: "",
            interact: "",
            rank: ""
        };
        let views = {
            signup: <Signup />,
        create: <Create />,
    interact: <Interact />,
rank: <Rank />
};
classes[this.state.mode] = "selected";
return (
    <div className="pricing">
        <div className="options">
            <h1>Pricing Options</h1>
            <div className="user">
                <br /><br /><br />
                <span className="currency">$</span>
                <span className="amount">4</span>
                <span className="per">/user</span>
                <br /><br /><br />
                <div className="period">per month</div><br /><br />
                <div className="asterisk">* Free for individual use</div>
                <br /><br />
                <button className="button green" onClick={this._start}>Get Started</button>
            </div>
            <div className="or">
                <div className="vertical"></div>
                <div className="text">or</div>
                <div className="vertical"></div>
            </div>
            <div className="organization">
                <p>Discounted rates are available for organizations that purchase for all employees. Pricing is based on organization size, not per user.</p>
                <table>
                    <thead>
                        <th>Total Employees</th><th>Monthly Rate</th>
                    </thead>
                    <tr><td className="users">Up to 20</td><td><strong>$40/month</strong><br />($2/user)</td></tr>
                    <tr><td className="users">50</td><td><strong>$100/month</strong><br />($2/user)</td></tr>
                    <tr><td className="users">100</td><td><strong>$200/month</strong><br />($2/user)</td></tr>
                    <tr><td className="users">500</td><td><strong>$500/month</strong><br />($1/user)</td></tr>
                    <tr><td className="users">1k</td><td><strong>$1,000/month</strong><br />($1/user)</td></tr>
                    <tr><td className="users">2k</td><td><strong>$2,000/month</strong><br />($1/user)</td></tr>
                    <tr><td className="users">5k</td><td><strong>$4,000/month</strong><br />($0.80/user)</td></tr>
                    <tr><td className="users">More than 10k</td><td><Link to="/contact">Contact Us</Link></td></tr>
                </table>
                <div className="asterisk">* After 14-day free trial</div>
            </div>
        </div>
        <div className="screenshots">
            <div>
                <img src="/assets/screenshots/stream.jpg" alt="Phourus Stream Screenshot" />
                <h3>Discover Content</h3>
                <p>...using the Phourus Stream with advanced searching and filtering capability</p>
                <div style={{clear: "both"}}></div>
            </div>
            <div>
                <img src="/assets/screenshots/editor.jpg" className="left" alt="Phourus Editor Screenshot" />
                <h3>Create Posts</h3>
                <p>...on a variety of topics with rich text, file attachments and detailed metadata</p>
                <div style={{clear: "both"}}></div>
            </div>
            <div>
                <img src="/assets/screenshots/comments.jpg" alt="Phourus Comments Screenshot" />
                <h3>Interact</h3>
                <p>...with the Phourus community by viewing posts and commenting, voting and sharing</p>
                <div style={{clear: "both"}}></div>
            </div>
        </div>
        <Features />
        <div className="platforms"></div>
        <div className="integrations">
            <br />
            <h2>Integrations</h2>
            <br />
            <i className="fa fa-facebook" />
            <i className="fa fa-dropbox" />
            <i className="fa fa-linkedin" />
            <i className="fa fa-slack" />
            <i className="fa fa-google" />
            <i className="fa fa-rss" />
        </div>
        <div className="contact">
            <h2>Contact Us</h2>
            <div></div>
            <div>
                <i className="fa fa-map-marker" /><br />
                Phourus Inc.<br />
            1411 7th St #305<br />
        Santa Monica, CA 90401
    </div>
    <div>
        <i className="fa fa-phone" /><br />
        1-844-PHOURUS<br />
    1-844-746-8787<br />
<a href="mailto:info@phourus.com?Subject=Support">info@phourus.com</a>
</div>
<div></div>
</div>
</div>
);
},
_signup: function () {
    this.setState({mode: 'signup'});
},
_create: function () {
    this.setState({mode: 'create'});
},
_interact: function () {
    this.setState({mode: 'interact'});
},
_rank: function () {
    this.setState({mode: 'rank'});
},
_start: function () {
    this.history.pushState(null, "/home");
}
});

let Signup = React.createClass({
    render: function () {
        return (
            <div className="signup">
                <br />
                <h2 className="title">How do I get started?</h2>
                <p>It's as simple as signing up! Simply register with your email, fill out your profile and start using Phourus today.</p>
                <div>
                    <i className="fa fa-user" />
                    <h3>Sign up as an Individual</h3>
                    <button className="button blue">Sign Up Now</button>
                </div>
                <div>
                    <i className="fa fa-users" />
                    <h3>Sign up as an Organization</h3>
                    <button className="button blue">Sign Up Now</button>
                </div>
                <p>Already have an account with Phourus? <Link to="/account">Click here to login.</Link></p>
            </div>
        )
    }
});

let Create = React.createClass({
    render: function () {
        return (
            <div className="create">
                <br />
                <h2 className="title">What kind of posts can I create on Phourus?</h2>
                <p>Each element of Phourus has two post types to choose from:</p>
                <div>
                    <i className="fa fa-laptop" />
                    <h3>Blogs & Events</h3>
                    <p>General posts and real-life events</p>
                </div>
                <div>
                    <i className="fa fa-question" />
                    <h3>Subjects & Questions</h3>
                    <p>Educational posts and Q&A</p>
                </div>
                <div>
                    <i className="fa fa-bullhorn" />
                    <h3>Debates & Polls</h3>
                    <p>Polarized discussions and survey-style polling</p>
                </div>
                <div>
                    <i className="fa fa-quote-right" />
                    <h3>Beliefs & Quotes</h3>
                    <p>Deep-seated thoughts and meaningful quotes</p>
                </div>
            </div>
        )
    }
});

let Interact = React.createClass({
    render: function () {
        return (
            <div className="interact">
                <br />
                <h2 className="title">How do I participate?</h2>
                <p>It's easy to participate on Phourus with common social features like commenting, voting and sharing.</p>
                <div>
                    <i className="fa fa-eye" />
                    <h3>View</h3>
                    <p>View a post if it piques your interest or is respected by the community</p>
                </div>
                <div>
                    <i className="fa fa-comment" />
                    <h3>Comment</h3>
                    <p>Join the discussion to provide feedback, good or bad, to the post's author</p>
                </div>
                <div>
                    <i className="fa fa-thumbs-up" />
                    <h3>Vote</h3>
                    <p>Upvote or downvote to alter the Influence and visibility of a post</p>
                </div>
                <div>
                    <i className="fa fa-share" />
                    <h3>Share</h3>
                    <p>Help increase a post's visibility and points the most by sharing</p>
                </div>
            </div>
        )
    }
});

let Rank = React.createClass({
    render: function () {
        return (
            <div className="rank">
                <br />
                <h2 className="title">How do I compete?</h2>
                <p>Earn points on Phourus to increase your visibility and credibility</p>
                <div>
                    <i className="fa fa-star" />
                    <h3>Influence</h3>
                    <p>Users, posts and organizations earn Influence points based on positive community feedback</p>
                </div>
                <div>
                    <i className="fa fa-trophy" />
                    <h3>Leaders</h3>
                    <p>Top-rated users, posts and organizations are featured on the Leaders page</p>
                </div>
            </div>
        )
    }
});

module.exports = About;
