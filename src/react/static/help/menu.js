import React from 'react'
import { Link } from 'react-router'

import styles from './css/menu.module.css'

export default ({menu}) => {

  return (
    <div className={menu ? styles.menu : styles.menuHide}>
      <ul id="menu">
        <li className={styles.section}><i className="fa fa-birthday-cake" /> GETTING STARTED
          <ul>
            <li><Link to="/help/create-account">Creating an account</Link></li>
            <li><Link to="/help/edit-account">Editing account information</Link></li>
            <li><Link to="/help/join-org">Joining an Organization</Link></li>
            <li><Link to="/help/create-org">Creating an Organization</Link></li>
            <li><Link to="/help/edit-org">Editing an Organization</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-search" /> FINDING POSTS
          <ul>
            <li><Link to="/help/the-stream">The Stream</Link></li>
            <li><Link to="/help/searching">Searching</Link></li>
            <li><Link to="/help/filtering">Filtering</Link></li>
            <li><Link to="/help/post-types">Post Types</Link></li>
            <li><Link to="/help/contexts">Contexts</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-book" /> READING POSTS
          <ul>
            <li><Link to="/help/tags">Tags</Link></li>
            <li><Link to="/help/stats">Stats</Link></li>
            <li><Link to="/help/shares">Shares</Link></li>
            <li><Link to="/help/comments">Comments</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-plus" /> CREATING POSTS
          <ul>
            <li><Link to="/help/create-post">Create Post</Link></li>
            <li><Link to="/help/title-content">Title & Content</Link></li>
            <li><Link to="/help/post-type">Post Type</Link></li>
            <li><Link to="/help/publish-post">Publish Post</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-pencil" /> EDITING POSTS
          <ul>
            <li><Link to="/help/tags">Tags</Link></li>
            <li><Link to="/help/links">Links</Link></li>
            <li><Link to="/help/privacy-settings">Privacy Settings</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-bell" /> ACTIVITY
          <ul>
            <li><Link to="/help/notifications">Notifications</Link></li>
            <li><Link to="/help/history">History</Link></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-edit" /> EXAMPLES
          <ul>
            <li></li>
          </ul>
        </li>
        <li className={styles.section}><i className="fa fa-question" /> MORE INFORMATION
          <ul>
            <li><Link to="/help/help">Additional Help</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  )
}
