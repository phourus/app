/** @jsx React.DOM **/
jest.genMockFromModule('socket.io-client');
jest.dontMock('moment');
jest.dontMock('../src/react/editor');
jest.dontMock('../src/react/401');
var React, Editor, TestUtils, view, token, posts, Tags, moment;


// view
// - form
//      - title
//      - privacy
//      - tags
//      - rte
//          - content
//      - details
//          - type
//          - meta
//      - links
//      - save
//      - remove
//      - back
// - list

/** ISSUES
 * rendering multiple times
 * title.value = null
 * radiogroup
 * before post ID exists
 * changing views based on socket returns
 */
describe('Editor', function() {
    React = require('react/addons');
    Editor = require('../src/react/editor');
    postsObject = require('../src/objects/posts'); 
    token = require('../src/token');
    moment = require('moment');
    TestUtils = React.addons.TestUtils;
    posts = [
        {id: 1, type: 'debate', title: 'Debate 1', createdAt: new Date()},
        {id: 2, type: 'blog', title: 'Blog 1', createdAt: '2015-01-13 03:50:07'},
        {id: 3, type: 'question', title: 'Question 1', createdAt: '2014-03-23 12:45:12'}
    ]
    
    beforeEach(function () {
      token.get.mockReturnValue(false);
      view = TestUtils.renderIntoDocument(<Editor />);
    });
    
    it('should have default props', function () {
        var props = view.props;
        expect(props.post).toEqual({});
        expect(props.posts).toEqual([]);
        expect(props.mode).toEqual('list');
        expect(props.link).toEqual({url: "", caption: ""});
        expect(Object.keys(props).length).toBe(4);
    });
    it('should display login/registration when token does not exist', function () {
        var view401 = TestUtils.findRenderedDOMComponentWithClass(view, 'view401');
        expect(TestUtils.isDOMComponent(view401)).toEqual(true);
    });
});

describe('Editor: List', function() {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor />);
    });
    
    it('should display list view when token does exist', function () {
        var list = TestUtils.findRenderedDOMComponentWithClass(view, 'list');
        expect(TestUtils.isDOMComponent(list)).toEqual(true);
    });
    
    it('should display message when no posts have been created', function () {
        var table = TestUtils.findRenderedDOMComponentWithClass(view, 'posts');
        var row1 = table.getDOMNode().childNodes[1];
        expect(row1.childNodes[0].childNodes[0].innerHTML).toBe('You do not have any posts yet. Click "Add New Post" above to create your first post!');
    });
    
    /** ADD HYPERLINKS, TYPE WITH ICON **/
    it('should display a list of posts with titles, types, dates and edit buttons', function () {
        var table, head, row1, row2, row3;
        view.setProps({posts: posts});
        table = TestUtils.findRenderedDOMComponentWithClass(view, 'posts');
        expect(TestUtils.isDOMComponent(table)).toEqual(true);
        head = table.getDOMNode().childNodes[0];
        row1 = table.getDOMNode().childNodes[1];
        row2 = table.getDOMNode().childNodes[2];
        row3 = table.getDOMNode().childNodes[3];
        // head
        expect(head.childNodes[0].innerHTML).toEqual('Created');
        expect(head.childNodes[1].innerHTML).toEqual('Title');
        expect(head.childNodes[2].innerHTML).toEqual('Type');  
        expect(head.childNodes[3].innerHTML).toEqual('Edit');  
        // 1
        expect(row1.childNodes[0].innerHTML).toEqual(moment(posts[0].createdAt).fromNow());
        expect(row1.childNodes[1].childNodes[0].innerHTML).toEqual(posts[0].title);
        expect(row1.childNodes[2].innerHTML).toEqual(posts[0].type);
        // 2
        expect(row2.childNodes[0].innerHTML).toEqual(moment(posts[1].createdAt).fromNow());
        expect(row2.childNodes[1].childNodes[0].innerHTML).toEqual(posts[1].title);
        expect(row2.childNodes[2].innerHTML).toEqual(posts[1].type);
        // 3
        expect(row3.childNodes[0].innerHTML).toEqual(moment(posts[2].createdAt).fromNow());
        expect(row3.childNodes[1].childNodes[0].innerHTML).toEqual(posts[2].title);
        expect(row3.childNodes[2].innerHTML).toEqual(posts[2].type);
    });
    
    it('should change to form view when "Add Post" button is clicked', function () {
        var add = TestUtils.findRenderedDOMComponentWithClass(view, 'add');
        TestUtils.Simulate.click(add);
        var form = TestUtils.findRenderedDOMComponentWithClass(view, 'form');
        expect(TestUtils.isDOMComponent(form)).toEqual(true);
    });
    
    it('should call posts.single when "Edit Post" button is clicked', function () {
        var edit, btn;
        view.setProps({posts: posts});
        edit = TestUtils.scryRenderedDOMComponentsWithClass(view, 'edit');
        btn = edit[2];
        TestUtils.Simulate.click(btn);
        expect(postsObject.single).toBeCalledWith(btn.props.id.toString());
    });
});

describe('Editor: Form', function() {
    token = require('../src/token');   
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
    });
    
    it('should display form view when token does exist and mode is "form"', function () {
        var form = TestUtils.findRenderedDOMComponentWithClass(view, 'form');
        expect(TestUtils.isDOMComponent(form)).toEqual(true);
    });
    
    it('should have editable common fields, type selector, tags, links and a "Back to List" button', function () {
        var form, title, privacy, content, model;
        form = view.refs.form.refs;
        title = form.title.getDOMNode();
        privacy = form.privacy.getDOMNode();
        content = form.rte.refs.content.getDOMNode();
        
        expect(title).toBeDefined();
        expect(privacy).toBeDefined();
        expect(content).toBeDefined();
        expect(form.tags).toBeDefined();
        expect(form.links).toBeDefined();
        expect(form.back).toBeDefined();
        expect(form.details.refs.type).toBeDefined();
        
        
        //expect(title.value).toEqual('');
        expect(privacy.value).toEqual('private');
        expect(content.value).toEqual('');
        
        model = {title: 'TestTitle', privacy: 'phourus', content: 'TestContent'};
        view.setProps({post: model});
        
        expect(title.value).toEqual(model.title);
        expect(privacy.value).toEqual(model.privacy);
        expect(content.value).toEqual(model.content);     
    });
});

describe('Form: Add', function () {
    token = require('../src/token');   
    
    beforeEach(function () {
        var add;
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor />);
        add = TestUtils.findRenderedDOMComponentWithClass(view, 'add');
        TestUtils.Simulate.click(add);
    });
    
    xit('should handle Tags and Links when no post ID is available', function () {
        
    });
    
    it('should have default props', function () {
        expect(view.props.post).toEqual({});
        expect(view.props.mode).toEqual('form');
        expect(view.props.link).toEqual({url: "", caption: ""});
    });
    
    it('should have empty Tags and Links', function () {
        var tagsList, linksList;
        tagsList = view.refs.form.refs.tags.refs.list.getDOMNode();
        linksList = view.refs.form.refs.links.refs.list.getDOMNode();
        
        expect(tagsList.childNodes.length).toEqual(0);
        expect(linksList.childNodes.length).toEqual(0);    
    });
    
    it('should have a "Create New Post" button only when in "Add" mode', function () {
        var save = view.refs.form.refs.save.getDOMNode();
        expect(save.innerHTML).toEqual('Create New Post');
    });
});

describe('Form: Edit', function () {
    var model, form;
    token = require('../src/token');   
    model = {
        id: 1,
        type: 'subject',
        title: 'subjecttitle',
        content: 'subjectcontent',
        privacy: 'phourus',
        category: 'subjectcategory',
        subcategory: 'subjectsubcategory',
        difficulty: 'easy',
        tags: [
            {id: 1, tag: 'tag1'},
            {id: 2, tag: 'tag2'},
            {id: 3, tag: 'tag3'}
        ],
        links: [
            {id: 1, url: 'url1', caption: 'caption1'},
            {id: 2, url: 'url2', caption: 'caption2'}
        ]
    }
    
    beforeEach(function () {
        var table, row, edit;
        token.get.mockReturnValue(true);
        // can't use edit button because posts.single callback triggers change to form view
        view = TestUtils.renderIntoDocument(<Editor post={model} posts={[model]} mode="form" />);
    });
    
    it('should display common properties', function () {
        var title, privacy, content, type;
        form = view.refs.form;
        title = form.refs.title.getDOMNode();
        privacy = form.refs.privacy.getDOMNode();
        content = form.refs.rte.refs.content.getDOMNode();
        
        expect(view.props.mode).toEqual('form');
        expect(view.props.post).toBe(model);
        expect(title.value).toBe(model.title);
        expect(privacy.value).toBe(model.privacy);
        expect(content.value).toBe(model.content);
    });
    
    it('should display a list of Tags', function () {
        var tags;
        tags = form.refs.tags;
        expect(tags).toBeDefined();
        
        expect(view.props.post.tags).toBe(model.tags);
        expect(tags.refs.list.getDOMNode().childNodes.length).toBe(3);
    });
    
    it('should display a list of Links', function () {
        var links;
        links = form.refs.links;
        expect(links).toBeDefined();
        
        expect(view.props.post.links).toBe(model.links);
        expect(links.refs.list.getDOMNode().childNodes.length).toBe(2);
    });
    
    it('should show post Type in radio group', function () {
        
    });
    
    it('should have the correct meta fields for current Type', function () {
        
    });
    
    it('should have a "Delete Post" button only when in "Edit" mode', function () {
        
    });
    
    it('should have an "Update Post" button only when in "Edit" mode', function () {
        var save = view.refs.form.refs.save.getDOMNode();
        expect(save.innerHTML).toEqual('Update Post');
    });
    
    it('should go back to List when "Back to List" is clicked', function () {
       var back = view.refs.form.refs.back.getDOMNode();  
       expect(view.props.mode).toEqual('form');
       TestUtils.Simulate.click(back);
       expect(view.props.mode).toEqual('list');
    });
    
    it('should have empty values after editing a Post and clicking "Add New Post"', function () {
        var add, tags, links;
        add = TestUtils.findRenderedDOMComponentWithClass(view, 'add');
        TestUtils.Simulate.click(add);
        tags = view.refs.form.refs.tags.getDOMNode();
        links = view.refs.form.refs.links.getDOMNode();
        
        expect(view.props.link).toEqual({url: "", caption: ""});
        expect(view.props.post).toEqual({});
        expect(tags.childNodes.length).toEqual(0);
        expect(links.childNodes.length).toEqual(0); 
    });
});

describe('Types', function () {
    var form, types, radios;
    token = require('../src/token');   
    values = ['blog', 'event', 'subject', 'question', 'debate', 'quote', 'belief'];
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
        //view.setProps({post: {type: ''}});
        form = view.refs.form;
        meta = form.refs.details.refs.meta;
        types = form.refs.details.refs.type;
        radios = TestUtils.scryRenderedDOMComponentsWithTag(types, 'input');
    });
    
    it('should have a default option', function () {
        expect(view.props.post.type).toBeUndefined();   
        expect(types.getDOMNode().childNodes[0].value).toEqual(values[0]);
    });
    
    it('should have a Blog option', function () {
        var index = values.indexOf('blog');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);
        
        // element, category, positive
        expect(Object.keys(meta.refs).length).toBe(3);
        expect(meta.refs.element).toBeDefined();
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.positive).toBeDefined();       
    });
        
    it('should have an Event option', function () {
        var index = values.indexOf('event');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);  
        
        // element, category, date, address   
        expect(Object.keys(meta.refs).length).toBe(4);  
        expect(meta.refs.element).toBeDefined();
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.date).toBeDefined();
        expect(meta.refs.address).toBeDefined(); 
    });
    
    it('should have a Subject option', function () {
        var index = values.indexOf('subject');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);   
        
        // category, subcategory, difficulty 
        expect(Object.keys(meta.refs).length).toBe(3);
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.subcategory).toBeDefined();
        expect(meta.refs.difficulty).toBeDefined();        
    });
    
    it('should have a Question option', function () {
        var index = values.indexOf('question');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);
        
        // category, subcategory, difficulty
        expect(Object.keys(meta.refs).length).toBe(3);
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.subcategory).toBeDefined();
        expect(meta.refs.difficulty).toBeDefined();
    });
    
    it('should have a Debate option', function () {
        var index = values.indexOf('debate');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]); 
        
        // category, subcategory, scope, zip  
        expect(Object.keys(meta.refs).length).toBe(4);
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.subcategory).toBeDefined();
        expect(meta.refs.scope).toBeDefined();
        expect(meta.refs.zip).toBeDefined();
    });
    
    it('should have a Quote option', function () {
        var index = values.indexOf('quote');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);  
        
        // author     
        expect(Object.keys(meta.refs).length).toBe(1);
        expect(meta.refs.author).toBeDefined();
    });
    
    it('should have a Belief option', function () {
        var index = values.indexOf('belief');
        TestUtils.Simulate.change(radios[index].getDOMNode(), {});
        expect(types.getDOMNode().elements[index].value).toBe(values[index]); 
        expect(view.props.post.type).toBe(values[index]);
        
        // category, subcategory  
        expect(Object.keys(meta.refs).length).toBe(2); 
        expect(meta.refs.category).toBeDefined();
        expect(meta.refs.subcategory).toBeDefined();    
    });
});

describe('Tags', function () {
    var tags;
    token = require('../src/token');   
    Tags = require('../src/objects/tags');
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
        tags = view.refs.form.refs.tags;
    });
    
   it('should have tag field, "add tag" button, a list of tags', function () {
    var tag, add, list;
    tag = tags.refs.tag.getDOMNode();
    add = tags.refs.add.getDOMNode();
    list = tags.refs.list.getDOMNode();
    
    expect(Object.keys(tags.refs).length).toBe(3);
    expect(tags.refs.tag).toBeDefined();
    expect(tags.refs.add).toBeDefined();
    expect(tags.refs.list).toBeDefined();
   });
   
   
   it('should list tags', function () {
       var list, post;
       list = tags.refs.list.getDOMNode();
       post = {tags: []};
       view.setProps({post: post});
       expect(view.props.post.tags).toEqual([]);
       expect(list.childNodes.length).toBe(0);
    
       post = {
        tags: [
            {id: 1, tag: 'tag1'},
            {id: 2, tag: 'tag2'},
            {id: 3, tag: 'tag3'}
        ]
       }
       
       view.setProps({post: post});
       expect(view.props.post.tags).toEqual(post.tags);
       expect(list.childNodes.length).toBe(3);
   });
   
   it('should append a tag when input is not empty and "add tag" is clicked', function () {
       var tag, add, post;
       tag = tags.refs.tag.getDOMNode();
       add = tags.refs.add.getDOMNode();
       TestUtils.Simulate.click(add);
       expect(Tags.add).not.toBeCalled();
       
       // Need to figure out tags & links in Add mode
       post = {id: 1};
       view.setProps({post: post});
       tag.value = 'newtag';
       TestUtils.Simulate.click(add);
       expect(Tags.add).toBeCalledWith({post_id: post.id, tag: tag.value});
   });
   
   it('should have a way to delete tags', function () {
       
   });
   
});

describe('Links', function () {
    token = require('../src/token');   
    Links = require('../src/objects/links');
    
    beforeEach(function () {
        token.get.mockReturnValue(true);
        view = TestUtils.renderIntoDocument(<Editor mode="form" />);
        links = view.refs.form.refs.links;
    });
    
   it('should have URL input, Caption input, Add Link button', function () {
        var url, caption, add, list;
        url = links.refs.url.getDOMNode();
        caption = links.refs.caption.getDOMNode();
        add = links.refs.add.getDOMNode();
        list = links.refs.list.getDOMNode();
        
        expect(Object.keys(links.refs).length).toBe(4);
        expect(links.refs.url).toBeDefined();
        expect(links.refs.caption).toBeDefined();
        expect(links.refs.add).toBeDefined();
        expect(links.refs.list).toBeDefined();
   });
   
   it('should display list of Links', function () {
       var list, post;
       list = links.refs.list.getDOMNode();
       post = {links: []};
       view.setProps({post: post});
       expect(view.props.post.links).toEqual([]);
       expect(list.childNodes.length).toBe(0);
    
       post = {
        links: [
            {id: 1, url: 'url1', caption: 'caption1'},
            {id: 2, url: 'url2', caption: 'caption2'},
            {id: 3, url: 'url3', caption: 'caption3'}
        ]
       }
       
       view.setProps({post: post});
       expect(view.props.post.links).toEqual(post.links);
       expect(list.childNodes.length).toBe(3);
   });
   
   it('should be able to add Links', function () {
       var model = {id: 1, url: 'url1', caption: 'caption1'};
       view.setProps({link: model});
       
       // no post ID
       TestUtils.Simulate.click(links.refs.add.getDOMNode());
       expect(Links.add).not.toBeCalled();
       
       // post ID
       view.setProps({post: {id: 4}});
       TestUtils.Simulate.click(links.refs.add.getDOMNode());
       expect(Links.add).toBeCalled();
   });
   
   xit('should be able to edit Links', function () {
       var model, url, caption, post_id, model, edits, save;
       model = {id: 107, url: 'url1', caption: 'caption1'};
       post_id = 22;
       view.setProps({post: {id: post_id, links: [model]}});
       
       url = links.refs.url.getDOMNode();
       caption = links.refs.caption.getDOMNode();
       list = links.refs.list.getDOMNode();
       edits = TestUtils.scryRenderedDOMComponentsWithClass(view, 'edit');
       save = links.refs.add.getDOMNode();
       
       // List has children
       expect(list.childNodes.length).toEqual(1);
       
       // Edit sets inputs
       TestUtils.Simulate.click(edits[0]);
       expect(view.props.link.url).toBe(model.url);
       expect(view.props.link.caption).toBe(model.caption);
       
       // Links.save is called
       TestUtils.Simulate.click(save);
       expect(Links.save).toBeCalledWith(model.id, {url: model.url, caption: model.caption});
   });
   
   it('should be able to delete Links', function () {
       var removes;
       var id = "7";
       view.setProps({post: {links: [{id: id}]}});
       removes = TestUtils.scryRenderedDOMComponentsWithClass(view, 'remove');
       TestUtils.Simulate.click(removes[0]);
       expect(Links.remove).toBeCalledWith(id);
   });
});

describe('Rich Text Editor', function () {
   it('should have a Rich Text Editor', function () {
       
   });
});