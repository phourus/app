import React from 'react'

export default () => {
	return (
		<File className="button blue" config={CONFIG} eventHandlers={HANDLERS}>
			Click or drag files here
		</File>
	)
}

const CONFIG = {
	allowedFiletypes: ['.jpg', '.png', '.gif', '.pdf', '.doc', '.docx', '.xls', '.xlsx'],
  showFiletypeIcon: true,
  postUrl: '/rest/links/attachment'
}

const HANDLERS = {
	// This one receives the dropzone object as the first parameter
  // and can be used to additional work with the dropzone.js
  // object
  init: null,
  // All of these receive the event as first parameter:
  drop: function (e) {
		console.log(e);
	},
  dragstart: null,
  dragend: null,
  dragenter: null,
  dragover: null,
  dragleave: null,
  // All of these receive the file as first parameter:
  addedfile: function (e) {
		s3.upload({Bucket: 'phourus-users', Key: 'some-user', Body: e}, {}, (err, data) => {
			console.log(err, data);
		});
	},
  removedfile: null,
  thumbnail: null,
  error: null,
  processing: null,
  uploadprogress: null,
  sending: null,
  success: null,
  complete: null,
  canceled: null,
  maxfilesreached: null,
  maxfilesexceeded: null,
  // All of these receive a list of files as first parameter
  // and are only called if the uploadMultiple option
  // in djsConfig is true:
  processingmultiple: null,
  sendingmultiple: null,
  successmultiple: null,
  completemultiple: null,
  canceledmultiple: null,
  // Special Events
  totaluploadprogress: null,
  reset: null,
  queuecompleted: null
}
