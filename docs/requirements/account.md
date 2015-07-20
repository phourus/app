# Account page
After a new user registers for Phourus, they can access their account to upload a profile pic/avatar, change their password, add/edit/remove addresses, and view their history and notifications. Also, there should be a link to the user's Posts as well as a list of Organizations the user is a member of.

### Routes
The Account page has 4 routes:
- /account/notifications - List of user's notifications (Default view)
- /account/history - History of user's activity
- /account/edit - Forms to edit user's profile information
- /account/password - Form to change the user's password

## Profile
PIC UPLOADER
The Pic Uploader is pretty straightforward. Users only have 1 picture so it really just needs to display their current profile pic or the default pic, and some sort of ‘browse + upload’ form/button.

BASIC
There should be a way to view and edit basic account details.
- username
- first name
- last name
- email
- phone

DETAILS
In addition to basic profile information, users should be able to add/modify the following as well:
- company
- occupation
- website
- date of birth
- gender

ADDRESS
Users could have multiple addresses, so some way to display a list of their addresses, with the ability to add/edit/remove addresses.
- street
- suite/apt etc
- city
- state
- zip
- type (default, mailing, billing etc)

VIEW MY POSTS
There should be a simple link that links to the user’s posts, with a count of how many posts they have.

## Notifications
The default Account page should have a list of Notifications for the user. Examples of Notification are:

- {username} viewed your profile
- {username} commented on your post “{post title”}
- {username} liked your post “{post title}”
- {username} disliked your post “{post title}”

* Each notification should have a picture for the user that performed the action
* Each username should be a hyperlink to the user’s profile
* Each post title should be a hyperlink to the post

## History
History is very similar to Notifications, only in reverse. While Notifications are other user actions related to current user, History is a list of actions current user performed.

- You viewed {username's} profile
- You commented on {username’s} post “{post title}”
- You liked {username’s} post “{post title}”
- You disliked {username’s} post “{post title}”

* Each profile view should have a picture of the user that was viewed
* Each username should be a hyperlink to the user
* Each post title should be a hyperlink to the post

## Password
