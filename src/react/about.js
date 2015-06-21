"use strict";
let React = require('react');

let About = React.createClass({
     render: function () {
          return (
            <div className="general">
              <h2>What is Phourus?</h2>
              <blockquote>Phourus is the curation of truth, individually, organizationally and societally, built for the 4 elements of society (Business, Education, Politics and Religion).</blockquote>
              <p>For individuals, a free tool to express themselves professionally, educationally, politically and religiously; a place where expression and representation meet.</p>
              <p>For organizations, such as businesses, government agencies, religious/charitable organizations and educational institutions, Phourus is a tool to create valuable content both internally and externally, with a competitive, social spin with the purpose of giving higher visibility to great content.</p>
              <h2>How does it work?</h2>
              <p>Phourus might sound complicated, but it's really not. It consists of a few basic actions:</p>
              <ol>
                <li>Create an account</li>
                <li>Create posts (explained in next section)</li>
                <li>Find and interact with posts</li>
                <li>Compete to become a Leader (explained below)</li>
                <li>Use within an Organization as a social content tool</li>
              </ol>
              <h2>What kind of posts can I create on Phourus?</h2>
              <p>Each element of Phourus has two associated post types to choose from:</p>
              <ol>
                <li>Blogs & Events: General posts and real-life events</li>
                <li>Subjects & Questions: Educational posts and Q&A</li>
                <li>Debates & Polls: Polarized discussions and survey-style polling</li>
                <li>Beliefs & Quotes: Deep-seated thoughts and meaningful quotes</li>
              </ol>
              <h2>Can I import or export my posts?</h2>
              <p>Your content is extremely important to you and to Phourus. That's why we're working hard to giving you all of the following options to safely and securely store and export content:</p>
              <ul>
                <li><strong>Automated Backups:</strong> Phourus uses Amazon Web Services (AWS), the world standard in cloud hosting and data storage. We backup all Phourus data regularly using their secure, proven technology.</li>
                <li><strong>Export Feature:</strong> At any time, you can export a single post or all of your content with a single click to PDF, Microsoft Word or Google Drive formats.</li>
                <li><strong>Optional Weekly/Monthly Email:</strong> In addition, we can optionally send you a weekly or monthly email with a full PDF containing the entire 'story' of your profile, containing all of your posts.</li>
              </ul>
              <p>Aside from our options for exporting your data, we are also working hard to offer you multiple ways to import content you've already created, rather than start from scratch</p>
              <ul>
                <li><strong>Google Drive: </strong> Google Drive is an excellent authoring tool, but lacks some of the search, social and competitive features of Phourus</li>
                <li><strong>RSS Feeds: </strong> For bloggers, import content you've created as an RSS feed. No need to recreate on Phourus or worrying about syncing changes</li>
                <li><strong>Social Feeds: </strong> Import existing posts or share Phourus posts with popular social media sites such as Facebook, Twitter, Google+ and LinkedIn</li>
                <li><strong>Multimedia: </strong> Add videos from Youtube, links to 3rd-party sites and even audio or podcasts for full multimedia capabilities</li>
              </ul>
              <h2>What do you do with my data?</h2>
              <h2>What is Influence?</h2>
              <p>Influence is a scoring algorithm for identifying and promoting ‘truth’ and insightful content rather than paid-for/biased content</p>
              <h2>What are Leaders?</h2>
                “CivilSoft” - Competition for being a valuable citizen of the world
              <h2>What are Organizational accounts?</h2>
              <p>Success of an organization relies on the ability to capture the truth from it's members. For organizations, internal + external social wiki, paid for per member, documenting who and what your organization is
              Building the culture of your organization while being both a public and private document-repository. It’s an investment in your people.
              Culture-as-a-service/CultureSoft
              Culture is not a ping-pong table and blue jeans
              “Google commits $150 million to diversity, exemplifies leadership on bringing women and other minorities into tech, where they are under-represented. Counting Apple's $50 million and Intel's $300 million, the three technology giants are investing half a billion dollars in diversity. Is your company or organization also promoting diversity and inclusion?”</p>
              <h2>What platforms does Phourus support</h2>
              <p>Phourus understands how valuable being able to access your content via multiple devices is. That's why we've put the time into ensuring the web-based application is available on mobile and tablet devices via the web-browser, as well as iOS and Android apps.</p>
              <p>Unlike some apps that are totally different on each platform, requiring you to re-learn the tool for each device, Phourus uses the same app but simply formats it for each device in a way that is both easy-to-use and consistent among each platform.</p>
              <p>In addition, Phourus has plans to offer a desktop application that can be accessed like any software application, and will even support offline access should you be without an internet connection.</p>
              <h2>How do I get started?</h2>
              <p>For individuals, it's as simple as signing up! Simply register with your email, fill out your profile, and start using Phourus today.</p>
              <p>For organizations, the best way is to contact us so we can discuss your needs and how we can help. We want to work very closely with your organization to deliver the best possible experience and value, so let's chat! </p>
              <strong>Phourus Inc.</strong><br />
              1149 7th Street #305<br />
              Santa Monica, CA 90401<br /><br />
              1-800-PHOURUS<br />
              1-800-746-8787<br />
              <a href='mailto:info@phourus.com'>info@phourus.com</a>
            </div>
          );
     }
});

module.exports = About;
