module.exports = {
  navigation: [
    {
      title: 'Phourus Logo',
      text: "Click 'Posts' in the main navigation at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization. ",
      selector: 'header .brand a',
      position: 'bottom'
    },
    {
      title: 'Post Stream',
      text: "Click 'Posts' in the main navigation at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization. ",
      selector: 'header li.posts',
      position: 'bottom'
    },
    {
      title: "'Me' dropdown menu",
      text: "Click 'Posts' in the main navigation at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization. ",
      selector: 'header li.posts',
      position: 'bottom'
    },
    {
      title: 'Create Post',
      text: "Click 'Posts' in the main navigation at any point to view the Stream. This is where the content on Phourus lives, and acts as the 'Thought Stream' of your organization. ",
      selector: 'header li.posts',
      position: 'bottom'
    },
    {
      title: 'Keyword Search',
      text: 'If you are looking for a specific post on a given topic, simply use the search bar to find posts related to the search term.',
      selector: '.header .keywords',
      position: 'bottom',
    }
  ],
  account: [
    {
      title: 'Upload your profile pic',
      text: 'Share that pretty face with the world! Simply click the default image here to find a picture of yourself to upload to Phourus.',
      selector: '.pic',
      position: 'bottom'
    },
    {
      title: 'Fill out your profile information',
      text: 'Fill out your profile information here in order to take credit for the posts you create.',
      selector: '.info',
      position: 'top-left'
    },
    {
      title: 'Join organizations',
      text: 'Use this search field to find the organization or organizations you belong to.<br /><br /> Simply start typing the organization name and select your organization from the list. A request will be sent to the organization to be approved by an administrator.',
      selector: '.is-searchable',
      position: 'bottom'
    },
    {
      title: 'Create organization',
      text: "Is your organization not listed in the search field above? If so, this is your chance to be a pioneer and create an account for your organization!<br /><br /> Simply type the name of your organization and click 'Create New Organization' to create a new organization account. You will automatically be approved as an administrator once you finish.",
      selector: '.orgs .create',
      position: 'bottom'
    },
    {
      title: 'Membership Status',
      text: "The status of any organizations you have selected to join will appear here. If you have requested membership but have not been approved, your status will say 'Pending', otherwise it will say 'Approved'.<br /><br />If you'd like to cancel a pending request or remove yourself from an organization, simply click the 'Cancel Request' or 'Remove Me' link next to your status.",
      selector: '.org',
      position: 'top'
    },
    {
      title: 'Admin Access',
      text: "If you have the privilege of being an administrator for your organization, you will see an 'Admin' button which will bring you to the Administrative Dashboard for that organization. Otherwise, no need to worry about it!",
      selector: '.org .button.blue',
      position: 'top'
    }
  ],
  stream: [
    {
      title: 'Post Preview',
      text: 'The Stream will display a preview of each post based on the current search and filter criteria.',
      selector: '.postItem',
      position: 'bottom'
    },
    {
      title: 'Post Title',
      text: 'The Post title should give you a good idea what the post is about, and clicking the title will bring you to the full Post, not just a preview.',
      selector: '.postItem .title',
      position: 'bottom',
    },
    {
      title: 'Post Type',
      text: 'There are 8 different color-coded Post Types on Phourus. ****Simply click the Post Type to quickly show only posts with the current post type.***',
      selector: '.postItem .type',
      position: 'bottom',
    },
    {
      title: 'Post Author',
      text: 'The Post author section will give some details regarding who wrote the post, and for what organization. Clicking the profile image will bring you to all posts created by that user or belonging to the organization.',
      selector: '.postItem .details',
      position: 'bottom',
    },
    {
      title: 'Post Stats',
      text: 'Post Stats are a good way to determine the credibility of a Post. The Influence score is a scoring algorithm that gives a relative importance to the post.',
      selector: '.postItem .interact',
      position: 'bottom',
    },
    {
      title: 'Custom Folders',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '#sidebar',
      position: 'right',
    },
  ],
  post: [
    {
      title: 'Close Post',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.close',
      position: 'right',
    },
    {
      title: 'Share Post',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.share',
      position: 'right',
    },
    {
      title: 'Upvote/Downvote',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.thumb',
      position: 'right',
    },
    {
      title: 'Links',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.links',
      position: 'right',
    },
    {
      title: 'Comments',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.comments',
      position: 'right',
    },
  ],
  create: [
    {
      title: 'Cancel',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.delete',
      position: 'right',
    },
    {
      title: 'Rich Text',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.quill-toolbar',
      position: 'right',
    },
    {
      title: 'Post Type',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.close',
      position: 'right',
    },
    {
      title: 'Title & Content',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.close',
      position: 'right',
    },
    {
      title: 'Publish Post',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.close',
      position: 'right',
    },
    {
      title: 'My Posts & Editing',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.close',
      position: 'right',
    }
  ],
  edit: [
    {
      title: 'Save Changes',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.actions .save',
      position: 'right',
    },
    {
      title: 'Delete',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.actions .delete',
      position: 'right',
    },
    {
      title: 'Privacy',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.privacy',
      position: 'right',
    },
    {
      title: 'Collaborators',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.collaborators',
      position: 'right',
    },
    {
      title: 'Tags',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.tags',
      position: 'right',
    },
    {
      title: 'Links',
      text: 'You can create custom folders and subfolders to help make your life easier managing all the useful content on Phourus.<br /><br />After creating the folder structure you like, simply drag and drop posts to save it to that folder.',
      selector: '.links',
      position: 'right',
    }
  ],
  activity: [

  ],
  admin: [

  ]
};
