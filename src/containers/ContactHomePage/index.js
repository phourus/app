import React from 'react';
import Router, { History } from 'react-router';

import ContactForm from '../ContactForm';

module.exports = React.createClass({
    mixins: [History],
    render: function () {
        return (
            <div className="contact">
                <div className="description">
                    <h3>Contact Us</h3>
                    <p>For individuals, a free tool to express themselves professionally, educationally, politically and religiously; a place where expression and representation meet.</p>
                    <p>For organizations, such as businesses, government agencies, religious/charitable organizations and educational institutions, Phourus is a tool to create valuable content both internally and externally, with a competitive, social spin with the purpose of giving higher visibility to great content.</p>
                </div>
                <div className="help">
                    <h3>Have questions or need help?</h3>
                    <button className="button blue" onClick={this._docs}>View Documentation</button>
                    <p>1-844-PHOURUS</p>
                    <a href='mailto:info@phourus.com?Subject=Support'>info@phourus.com</a>
                </div>
                <ContactForm />
                <br clear="right" />
                <br />
            </div>
        );
    },
    _docs: function () {
        this.history.pushState(null, "/docs");
    }
});
