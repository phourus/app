module.exports = {
  navigation: [
    {
      title: 'Navigation: Phourus Logo',
      text: "Click the Phourus logo at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization.",
      selector: 'header .brand a',
      position: 'bottom'
    },
    {
      title: 'Navigation: Post Stream',
      text: "Click 'Posts' in the main navigation at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization.",
      selector: 'header li.posts',
      position: 'bottom'
    },
    {
      title: "Navigation: 'Me' dropdown menu",
      text: "The 'Me' dropdown menu has several links for managing your account and organizations, viewing activity, and editing posts.",
      selector: 'header li.me',
      position: 'bottom'
    },
    {
      title: 'Navigation: Create Post',
      text: "Whenever you'd like to create a new post, simply click the 'Create' button to begin writing!",
      selector: 'header li.create',
      position: 'bottom'
    },
    {
      title: 'Navigation: Keyword Search',
      text: 'If you are looking for a specific post on a given topic, simply use the search bar to find posts related to the search term.',
      selector: '.header .keywords',
      position: 'bottom',
    }
  ],
  account: [
    {
      title: 'Account: Upload your profile pic',
      text: 'Share that pretty face with the world! Simply click the default image here to find a picture of yourself to upload to Phourus.',
      selector: '.pic',
      position: 'bottom'
    },
    {
      title: 'Account: Fill out your profile information',
      text: 'Fill out your profile information here in order to take credit for the posts you create.',
      selector: '.info',
      position: 'top-left'
    },
    {
      title: 'Account: Join organizations',
      text: 'Use this search field to find the organization or organizations you belong to.<br /><br /> Simply start typing the organization name, and then click to select your organization from the list. A request will then be sent to the organization to be approved by an administrator.',
      selector: '.is-searchable',
      position: 'bottom'
    },
    {
      title: 'Account: Create organization',
      text: "Is your organization not listed in the search field above? If so, this is your chance to be a pioneer and create an account for your organization!<br /><br /> Simply type the name of your organization and click 'Create New Organization' to create a new account for your organization. You will automatically be approved as an administrator once you finish.",
      selector: '.orgs .create',
      position: 'bottom'
    },
    {
      title: 'Account: Membership Status',
      text: "The status of any organizations you have selected to join will appear here. If you have requested membership but have not been approved, your status will say 'Pending', otherwise it will say 'Approved'.<br /><br />If you'd like to cancel a pending request or remove yourself from an organization, simply click the 'Cancel Request' or 'Remove Me' link next to your status.",
      selector: '.org',
      position: 'top'
    },
    {
      title: 'Account: Admin Access',
      text: "If you have the privilege of being an administrator for your organization, you will see an 'Admin' button which will bring you to the Administrative Dashboard for that organization. Otherwise, no need to worry about it!",
      selector: '.org .button.blue',
      position: 'top'
    }
  ],
  stream: [
    {
      title: 'Stream: Post Preview',
      text: 'The Stream will display a preview of each post based on the current search and filter criteria.',
      selector: '.postItem',
      position: 'bottom'
    },
    {
      title: 'Stream: Post Title',
      text: 'The Post title should give you a good idea what the post is about, and clicking the title will bring you to the full Post, not just a preview.',
      selector: '.postItem .title',
      position: 'bottom',
    },
    {
      title: 'Stream: Post Type',
      text: 'There are 8 different color-coded Post Types on Phourus.<br /><br />Simply click the Post Type to quickly show only posts with the current post type.',
      selector: '.postItem .type',
      position: 'bottom',
    },
    {
      title: 'Stream: Post Author',
      text: 'The Post author section will give some details regarding who wrote the post, and for what organization.<br /><br /> Clicking the profile image will bring you to all posts created by that user or belonging to the organization.',
      selector: '.postItem .details',
      position: 'bottom',
    },
    {
      title: 'Stream: Post Stats',
      text: 'Post Stats are a good way to determine the credibility of a Post.<br /><br />The Influence score is a scoring algorithm that gives a relative importance to the post.',
      selector: '.postItem .interact',
      position: 'bottom',
    },
    {
      title: 'Stream: Custom Folders',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '#sidebar',
      position: 'right',
    },
  ],
  post: [
    {
      title: 'Post: Close Post',
      text: "When viewing a post, simply click the 'X' button to return to the Stream.",
      selector: '.close',
      position: 'left',
    },
    {
      title: 'Post: Share Post',
      text: 'Have you found a post you really like? Well then go ahead and use these buttons to share with some of the most popular websites and social applications.<br /><br />Please let us know if you need to share on a site not listed here!',
      selector: '.share',
      position: 'bottom',
    },
    {
      title: 'Post: Upvote/Downvote',
      text: "Use these vote buttons to share your overall sentiment for the post.<br /><br /> Upvote if you like it, downvote if you don't! Your interaction will alter the post's Influence rank as well as it's popularity metric.",
      selector: '.thumb',
      position: 'top',
    },
    {
      title: 'Links',
      text: 'Phourus is a file-less platform, meaning there are no file uploads or files whatsoever.<br /><br /> However, you can easily link to files and webpages here, making it easy to centralize important resources within a single post.',
      selector: '.links',
      position: 'top',
    },
    {
      title: 'Post: Comments',
      text: "As a collaborative platform, Phourus encourages users to openly discuss posts in order to improve it's content or clarify any questions one may have.",
      selector: '.comments',
      position: 'top',
    },
  ],
  create: [
    {
      title: 'Create: Cancel',
      text: "When clicking the 'Create' button, you will be taken to the new post screen.<br /><br /> At this point, nothing has been created yet, so you can simply click 'Cancel' if you do not wish to create a post at this time.",
      selector: '.delete',
      position: 'bottom',
    },
    {
      title: 'Create: Rich Text',
      text: 'One of the primary goals of Phourus is to deliver an exceptional writing experience.<br /><br /> Authors can use the rich text formatting options here to create professional, scannable documents that are easy to read and consume.',
      selector: '.quill-toolbar',
      position: 'bottom',
    },
    {
      title: 'Create: Post Type',
      text: 'There are actually 8 different post types on Phourus, each with their own objective and purpose.<br /><br /> When creating a post, simply click the current selected post type to view all 8 options.',
      selector: '.create .type',
      position: 'bottom',
    },
    {
      title: 'Create: Title & Content',
      text: 'The title and content of your post are the most important parts.<br /><br /> Use the title field and the content box with rich text to craft your post.',
      selector: '.title',
      position: 'bottom',
    },
    {
      title: 'Create: Publish Post',
      text: "Once your post is ready, or at least your first draft, you can simply click 'Post' to publish your post.<br /><br /> Once posted, you will be brought to the post editing page where you can make further edits.",
      selector: '.save',
      position: 'bottom',
    },
    {
      title: 'Create: My Posts & Editing',
      text: "All posts you have created are available under 'My Posts' in the 'Me' menu.<br /><br /> Simpy hover over 'Me' and select 'My Posts' to view all your work at any time.",
      selector: 'header li.me',
      position: 'bottom',
    }
  ],
  edit: [
    {
      title: 'Edit: Save Changes',
      text: "Whenever you make changes to your post, simply click 'Save Changes' to make the edits permanent.",
      selector: '.actions .save',
      position: 'bottom',
    },
    {
      title: 'Edit: Delete',
      text: "If you decide to delete a post for whatever reason, simply click 'Delete' then 'Confirm' to send it to the trash.<br /><br />At any point you can view trashed posts by clicking the 'Trash' folder on the Stream.",
      selector: '.actions .delete',
      position: 'bottom',
    },
    {
      title: 'Edit: Privacy',
      text: 'Phourus has powerful privacy settings that can be used to determine who sees a post.<br /><br />Posts have different contexts they belong to, and are either a post on behalf of an organization or just the user.',
      selector: '.privacy',
      position: 'top',
    },
    {
      title: 'Edit: Collaborators',
      text: 'In addition to setting coarse-grained privacy settings, individuals and teams can be added to a post with full editing capabilities.<br /><br />Simply type the name or email of a teammate or the name of a team to search the directory, and click to add as a collaborator.',
      selector: '.collaborators',
      position: 'top',
    },
    {
      title: 'Edit: Tags',
      text: 'Tags are a powerful way to find and categorize posts on Phourus. Add tags to better describe your post and the topics it covers.',
      selector: '.tags',
      position: 'top',
    },
    {
      title: 'Edit: Links',
      text: 'Use the Links section to add supporting files from various sources.<br /><br />Copy webpage links or files from online storage such as Dropbox or Google Drive to provide easily accessible assets related to your post.',
      selector: '.links',
      position: 'top',
    }
  ],
  activity: [

  ],
  admin: [

  ]
};
