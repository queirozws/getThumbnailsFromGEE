const { google } = require('googleapis');
const fs = require('fs');
// const readline = require('readline');

// 
const KEYFILEPATH = '/home/wsq/mapbiomas/js/gdrive-api/privatekey.json';

// 
const SCOPES = ['https://www.googleapis.com/auth/drive'];

// 
const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES
});

async function createAndUploadFile(auth, filepath) {

	// init drive service, it will now handle all authorization
	const driveService = google.drive({ version: 'v3', auth });

	let fileMetaData = {
		"name": 'iconeInsta2',
		"parents": ["1rlGMWJb4rpoDvDh9nzfFlKRX97dDMT1x"],
	};

	let media = {
		// mimeType: 'image/png',
		body: fs.createReadStream('/home/wsq/mapbiomas/js/get-thumbnails-from-gee/thumbnails/' + filepath + '.png')// `./thumbnails/${filename}.${format}`
	};

	let response = await driveService.files.create({
		resource: fileMetaData,
		media: media,
		// fields: 'id',
	});

	switch (response.status) {
		case 200:
				console.log( 'File Created id: ', response.data.id )
				break;
		default: 
				console.error('Error creating file, ' + response.errors)
				break;
	}
}

// createAndUploadFile(auth).catch(console.error);

module.exports = createAndUploadFile