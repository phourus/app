"use strict";
let React = require('react');
let Router = require('react-router');
let { Link, History } = Router;

let Actions = require('../actions/post');
let Store = require('../stores/post');

let ActionsView = require('./post/actions');
let Comments = require('./post/comments');
let Content = require('./post/content');
let Details = require('./post/details');
let Links = require('./post/links');
let Poll = require('./post/poll');
let Privacy = require('./post/privacy');
let Profile = require('./profile');
let Share = require('./post/share');
let Stats = require('./post/stats');
let Tags = require('./post/tags');
let Thumbs = require('./post/thumbs');
let Title = require('./post/title');
let Type = require('./post/type');

let Drag = require('./post/drag');

let Post = React.createClass({
	mixins: [History],
	getInitialState: function () {
		return {
			scroll: false,
			confirmTrash: false,
			owner: false,
			location: {},
			saving: false,
			post: {
				id: 0
			},
			user: {
				id: 0
			},
			privacy: false
		}
	},
	componentDidUpdate: function () {
		let type = this.props._route;
		if ((type === 'post' || type === 'edit') && this.props.scroll === false) {
			let element = this.getDOMNode();
			let y = element.offsetTop - element.scrollTop + element.clientTop - 80;
			window.scrollTo(0, y);
		}
	},
	componentDidMount: function () {
		this.unsubscribe = Store.listen((data) => {
			if (data.hasOwnProperty('saving')) {
				if (data.saving === false) {
					this.history.pushState(null, "/stream/me");
				}
				this.setState({saving: data.saving, types: false});
			}
			if (data.add === true) {
				this.history.pushState(null, `/edit/${data.post.id}`);
			}
			if (data.post) {
				document.title = data.post.title;
				document.description = data.post.content.slice(0, 120);
				this.setState({post: data.post});
			}
			if (data.deleted) {
				this.history.pushState(null, "/stream/me");
			}
			if (data.changes) {
				let current = this.state.post;
				Object.keys(data.changes).forEach((key) => {
					current[key] = data.changes[key];
				});
				this.setState({post: current});
			}
		});
		this._context();
	},
	componentWillUnmount: function () {
		this.unsubscribe();
	},
	componentWillReceiveProps: function (data) {
		this._context();
	},
	render: function () {
		let mode = this.props._route.type;
		return (
			<div className="post">
				{mode === 'create' ? <Create {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
				{mode === 'edit' ? <Edit {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
				{mode === 'post' ? <Single {...this.state} _route={this.props._route} owner={this.props.owner} /> : false}
			</div>
		);
	},
	_context: function () {
		let route = this.props._route;
		let params = route.params;
		let id = route.id;
		let type = route.type;
		if (type === 'edit' || type === 'post') {
			Actions.single(id);
		}
		if (type === 'create') {
			Actions.change('type', 'blog');
			Actions.change('title', 'Enter your post title here');
			Actions.change('content', CreateContent);
		}
	},
});

let Create = React.createClass({
	render: function () {
		return (
			<div className="create postItem">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
			</div>
		);
	}
});

let Edit = React.createClass({
	render: function () {
		return (
			<div className="edit postItem">
				<div className="toolbar"></div>
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Links post={this.props.post} _route={this.props._route} owner={this.props.owner} />
			</div>
		);
	}
});

let Single = React.createClass({
	render: function () {
		return (
			<div className="single postItem">
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Content post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Share post={this.props.post} />
				<Profile _route={this.props._route} postMode={true} />
				<Stats post={this.props.post} _route={this.props._route} />
				<Links post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Comments post={this.props.post} />
			</div>
		);
	}
});

Post.Item = React.createClass({
	render: function () {
		return (
			<div className="postItem" id={`post${this.props.post.id}`}>
				<Drag id={this.props.post.id} />
				<ActionsView post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Type post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Privacy post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Title post={this.props.post} _route={this.props._route} owner={this.props.owner} />
				<Details post={this.props.post} _route={this.props._route} owner={this.props.owner} user={this.props.user} location={this.props.location} />
				<Tags post={this.props.post} _route={this.props._route} owner={this.props.owner} tag={this.props.tag} />
				<Stats post={this.props.post} _route={this.props._route} />
			</div>
		);
	}
});

module.exports = Post;

const CreateContent = `<div><span style="font-size: 32px;">Creating a Post</span></div><div><br></div><div>To create a post on Phourus, you can quickly clear or replace the text in this box, and use the formatting toolbar above. When you are finished, click 'Post' to publish your post. If you wish not to save your work, then just click cancel instead. </div><div><br></div><div><i>There are 4 different categories of posts on Phourus, each color coded:</i></div><div><br></div><ol><li><b>General information</b> - Green [Blogs, Ideas]</li><li><b>Educational</b> - Blue [Subjects, Questions]</li><li><b>Divisionary</b> - Red [Debates, Polls]</li><li><b>Cultural</b> - Gold [Opinions, Quotes] </li></ol><div><br></div><div><i><u><b>Research</b></u></i></div><div>Whenever research is being done, Phourus should come to mind. The ideal place to store, find and centralize research done in a variety of departments.</div><div><br></div><div>- Market analysis</div><div>- Data-driven conclusions</div><div>- Engineering research</div><div>- Competitor research</div><div>- Doctorate/Post-Grad Thesis</div><div>- Theoretical research</div><div>- Medical information</div><div><br></div><div><u style="background-color: inherit;"><i><b>Training</b></i></u></div><div>Having a go-to source for new employees to go for a variety of information such as:</div><div><br></div><div>- Company policy</div><div>- Product or service information</div><div>- Latest research or findings</div><div>- Company vision or mission</div><div>- Training resource</div><div>- Question about company or product</div><div>- Budget or financial information</div><div>- Product specs</div><div>- Support material</div><div><br></div><div><u style="background-color: inherit;"><i><b>Public</b></i></u></div><div>With advanced post permissions you can create posts to interact with the public such as:</div><div><br></div><div>- Poll most important product features</div><div>- Educate consumers, prospects or customers</div><div>- Report news to customers, investors or shareholders</div><div>- Discuss company direction</div><div><br></div><div><u style="background-color: inherit;"><i><b>Feedback</b></i></u></div><div>Internal and external feedback is imperative to an organization:</div><div><br></div><div>- Business strategy or overall vision</div><div>- The good, bad or ugly</div><div>- Internal poll for a challenging decision</div><div>- Cross-department collaboration</div><div>- Management feedback</div><div>- Debate purchasing decisions</div><div><br></div><div><i><u><b>Ideas</b></u></i></div><div>Ideas for new products, campaigns, strategies are j</div><div><br></div><div>- Idea for product or service</div><div>- Improve internal operations</div><div>- New procedure idea</div><div>- Marketing campaign idea</div><div>- Customer ideas</div><div><br></div><div><i><u><b>Vision</b></u></i></div><div>Ideas, opinions and inspiration serve as important keys to success:</div><div><br></div><div>- Goal for the organization or team</div><div>- Personal opinion&nbsp;</div><div>- Inspirational quote</div><div>- Sales pitch tip</div><div>- Marketing or sales strategy</div><div>- Poor experience</div><div><br></div><div><br></div><div><br></div>`;
