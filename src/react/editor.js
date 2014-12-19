/** @jsx React.DOM */
"use strict";
var React = require('react');

// Form, Help
var Editor = React.createClass({
     componentDidMount: function () {
		var update = this.props.update;
		$.ajax({
			url: "/rest/post/"  + this.props.id,
			dataType: "json",
			success: function (data) {
				update({posts: data});
			},
			error: function (err) {
				console.log(err);
			}
		});		
	 },
     update: function (obj) {
		 this.setProps(obj);
	 },
	 create: function () {

	 },
	 save: function () {
    	 $.ajax({
			url: "/rest/post/" + this.props.id,
			method: "PUT",
			dataType: "json",
			success: function (data) {
				update({posts: data});
			},
			error: function (err) {
				console.log(err);
			}
		});    	 
	 },
	 render: function () {
          return (
            <div>
                <h1>Content Factory</h1>
                <input type="text" placeholder="title" />
                <TextEditor></TextEditor>
                <Details></Details>
                <Save></Save>
            </div>
          );
     }
});

var TextEditor = React.createClass({
    render: function () {
      return (
        <div>
            <textarea placeholder="insert content here" />
        </div>
      );
     }
});

var Details = React.createClass({
    render: function () {
      return (
        <div>
            <select>
                <option>Blog</option>
            </select>
        </div>
      );
     }     
});

var Save = React.createClass({
    render: function () {
      return (
        <div>
            <button>Save</button>
        </div>
      );
     }     
});

/*
when "blogs"
  schema.title = "Text"
  schema.element = element
  schema.category = {type: "Select", options: ["Factual", "Opinion", "Idea", "Humor", "Rant"]}
  schema.privacy = privacy
  schema.positive = "Checkbox"
  schema.content = "TextArea"
when "events"
  schema.title = "Text"
  schema.element = element
  schema.category = "Text"
  schema.privacy = privacy
  schema.date = "Date"
  schema.content = "TextArea"
  #schema.address= {type: 'NestedModel', model: Address };    
when "subjects"
  schema.title = "Text"
  schema.category = "Text"
  schema.subcategory = "Text"
  schema.privacy = privacy
  schema.difficulty = "Text"
  schema.content = "TextArea"
when "questions"
  schema.title = "Text"
  schema.category = "Text"
  schema.subcategory = "Text"
  schema.privacy = privacy
  schema.difficulty = "Text"
  schema.content = "TextArea"  
when "answers"
  schema.question = "Text"
  schema.content = "TextArea"
when "debates"
  schema.title = "Text"
  schema.category = "Text"
  schema.privacy = privacy
  schema.scope = {type: "Select", options: ["Local", "State", "National"]}
  schema.zip = "Text"
  schema.content = "TextArea"
when "votes"
  schema.vote = "Text"
  schema.source = "Text"
  schema.content = "TextArea"
when "bills"
  schema.debate = "Text"
  schema.rep = "Text"
  schema.question = "Text"
  schema.deadline = "DateTime"
  schema.content = "TextArea"
when "beliefs"
  schema.title = "Text"
  schema.category = "Text"
  schema.privacy = privacy
  schema.content = "TextArea"
when "timeline"
  schema.title = "Text"
  schema.category = "Text"
  schema.privacy = privacy
  schema.date = "Date"
  #schema.time = "Time"
  schema.content = "TextArea"        
  #schema.address= {type: 'NestedModel', model: Address };		
when "quotes"
  schema.quote = "Text"
  schema.source = "Text"
  schema.content = "TextArea"*/

module.exports = Editor;