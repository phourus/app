"use strict";
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
// Form, Help
if (typeof module !== 'undefined' && module.exports) {
    var React = require('react');
}
/**
* @jsx React.DOM
*/
var Editor = React.createClass({
     render: function () {
          return React.DOM.h1(null, 'Editor');
     }
});
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Editor;
} else{
    var cnt = document.getElementById('content');
    React.renderComponent(Editor({}), cnt);
}

