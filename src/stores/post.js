let Reflux = require('reflux');

let Actions = require('../actions/post');
let posts = require('../api/posts');

module.exports = Reflux.createStore({
  init: function () {
    this.post = {};
    this.changes = {};
    this.listenTo(Actions.single, this._single);
    this.listenTo(Actions.refresh, this._refresh);
    this.listenTo(Actions.change, this._change);
    this.listenTo(Actions.add, this._add);
    this.listenTo(Actions.save, this._save);
    this.listenTo(Actions.trash, this._trash);
    this.listenTo(Actions.poll, this._poll);
    this.listenTo(Actions.vote, this._vote);
  },
  _single: function (id) {
    if (!id) {
      this.post = {};
      return;
    }
    if (id === 'create') {
      this.post = {
        type: 'blog',
        title: 'Enter your post title here',
        content: CreateContent
      };
      this.changes = this.post;
      return this.trigger({post: this.post, changes: this.changes});
    }

    posts.single(id)
    .then(data => {
      this.post = data;
      this.trigger({post: data});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'load',
          color: 'yellow',
          code: code,
          msg: 'Post could not be loaded'
        };
        this.trigger({alert: alert});
        console.warn(alert);
       }
    });
  },
  _refresh: function () {
    this._single(this.post.id);
  },
  _add: function () {
    let model = this.changes;
    posts.add(model)
    .then(data => {
      this.trigger({add: true, post: data});
    })
    .catch(code => {
      let alert = {
        action: 'add',
        color: 'red',
        code: code,
        msg: 'Post could not be created'
      };
      this.trigger({alert: alert});
      console.warn(alert);
    });
  },
  _save: function () {
    posts.save(this.post.id, this.changes)
    .then(data => {
      this.trigger({saving: false});
    })
    .catch(code => {
      if (code != 204) {
        let alert = {
          action: 'save',
          color: 'red',
          code: code,
          msg: 'Post could not be saved'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
  },
  _trash: function () {
    posts.save(this.post.id, {privacy: 'trash'})
    .then(data => {
      this.trigger({deleted: true});
    })
    .catch(code => {
      if (code != 204) {
        let alert = {
          action: 'delete',
          color: 'red',
          code: code,
          msg: 'Post could not be deleted'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
  },
  _change: function (key, value) {
    this.changes[key] = value;
    this.trigger({changes: this.changes});
  },
  _poll: function (id) {
    posts.poll(id)
    .then(data => {
      let votes = {};
      let postId = 0;
      if (data[0]) {
        postId = data[0].postId;
      }
      data.forEach((item) => {
        votes[item.option] = item.count;
      });
      this.trigger({votes: votes, postId: postId});
    })
    .catch(code => {
      if (code != 200) {
        let alert = {
          action: 'poll',
          color: 'red',
          code: code,
          msg: 'Poll could not be loaded'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
  },
  _vote: function (postId, option) {
    posts.vote(postId, option)
    .then(data => {
      this._poll(postId);
      this.trigger({selected: option});
    })
    .catch(code => {
      if (code != 202) {
        let alert = {
          action: 'vote',
          color: 'red',
          code: code,
          msg: 'Vote could not be saved'
        };
        this.trigger({alert: alert});
        console.warn(alert);
      }
    });
  }
});

const CreateContent = `# Creating a Post

To create a post on Phourus, you can quickly clear or replace the text in this box, and use the formatting toolbar above. When you are finished, click 'Post' to publish your post. If you wish not to save your work, then just click cancel instead.

There are 4 different categories of posts on Phourus, each color coded:

* General information - Green [Blogs, Ideas]
* Educational - Blue [Subjects, Questions]
* Divisionary - Red [Debates, Polls]
* Cultural - Gold [Opinions, Quotes]

## Research
Whenever research is being done, Phourus should come to mind. The ideal place to store, find and centralize research done in a variety of departments.

* Market analysis
* Data-driven conclusions
* Engineering research
* Competitor research
* Doctorate/Post-Grad Thesis
* Theoretical research
* Medical information

## Training
Having a go-to source for new employees to go for a variety of information such as:

* Company policy
* Product or service information
* Latest research or findings
* Company vision or mission
* Training resource
* Question about company or product
* Budget or financial information
* Product specs
* Support material

## Public
With advanced post permissions you can create posts to interact with the public such as:

* Poll most important product features
* Educate consumers, prospects or customers
* Report news to customers, investors or shareholders
* Discuss company direction

## Feedback
Internal and external feedback is imperative to an organization:

* Business strategy or overall vision
* The good, bad or ugly
* Internal poll for a challenging decision
* Cross-department collaboration
* Management feedback
* Debate purchasing decisions

## Ideas
Ideas for new products, campaigns, strategies are j

* Idea for product or service
* Improve internal operations
* New procedure idea
* Marketing campaign idea
* Customer ideas

## Vision
Ideas, opinions and inspiration serve as important keys to success:

* Goal for the organization or team
* Personal opinion
* Inspirational quote
* Sales pitch tip
* Marketing or sales strategy
* Poor experience`;
//const CreateContent = `<div><span style="font-size: 32px;">Creating a Post</span></div><div><br></div><div>To create a post on Phourus, you can quickly clear or replace the text in this box, and use the formatting toolbar above. When you are finished, click 'Post' to publish your post. If you wish not to save your work, then just click cancel instead. </div><div><br></div><div><i>There are 4 different categories of posts on Phourus, each color coded:</i></div><div><br></div><ol><li><b>General information</b> - Green [Blogs, Ideas]</li><li><b>Educational</b> - Blue [Subjects, Questions]</li><li><b>Divisionary</b> - Red [Debates, Polls]</li><li><b>Cultural</b> - Gold [Opinions, Quotes] </li></ol><div><br></div><div><i><u><b>Research</b></u></i></div><div>Whenever research is being done, Phourus should come to mind. The ideal place to store, find and centralize research done in a variety of departments.</div><div><br></div><div>- Market analysis</div><div>- Data-driven conclusions</div><div>- Engineering research</div><div>- Competitor research</div><div>- Doctorate/Post-Grad Thesis</div><div>- Theoretical research</div><div>- Medical information</div><div><br></div><div><u style="background-color: inherit;"><i><b>Training</b></i></u></div><div>Having a go-to source for new employees to go for a variety of information such as:</div><div><br></div><div>- Company policy</div><div>- Product or service information</div><div>- Latest research or findings</div><div>- Company vision or mission</div><div>- Training resource</div><div>- Question about company or product</div><div>- Budget or financial information</div><div>- Product specs</div><div>- Support material</div><div><br></div><div><u style="background-color: inherit;"><i><b>Public</b></i></u></div><div>With advanced post permissions you can create posts to interact with the public such as:</div><div><br></div><div>- Poll most important product features</div><div>- Educate consumers, prospects or customers</div><div>- Report news to customers, investors or shareholders</div><div>- Discuss company direction</div><div><br></div><div><u style="background-color: inherit;"><i><b>Feedback</b></i></u></div><div>Internal and external feedback is imperative to an organization:</div><div><br></div><div>- Business strategy or overall vision</div><div>- The good, bad or ugly</div><div>- Internal poll for a challenging decision</div><div>- Cross-department collaboration</div><div>- Management feedback</div><div>- Debate purchasing decisions</div><div><br></div><div><i><u><b>Ideas</b></u></i></div><div>Ideas for new products, campaigns, strategies are j</div><div><br></div><div>- Idea for product or service</div><div>- Improve internal operations</div><div>- New procedure idea</div><div>- Marketing campaign idea</div><div>- Customer ideas</div><div><br></div><div><i><u><b>Vision</b></u></i></div><div>Ideas, opinions and inspiration serve as important keys to success:</div><div><br></div><div>- Goal for the organization or team</div><div>- Personal opinion&nbsp;</div><div>- Inspirational quote</div><div>- Sales pitch tip</div><div>- Marketing or sales strategy</div><div>- Poor experience</div><div><br></div><div><br></div><div><br></div>`;
