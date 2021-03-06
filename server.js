// Require client library and private key.
const ee = require('@google/earthengine');
// const dot = require('dotenv').config({ path: '.env' });
// const privateKey = process.env.PRIVATEKEY;
// const upload = require('./upload');
const privateKey = require('./privatekey.json');

// console.log(privateKey);

const geeScript = require('./geeScripts/geeScript');

function initializationError (e) {
    console.error('Initialization error: ' + e);
}

// Initialize client library and run analysis
function runAnalysis () {
    ee.initialize(null, null, geeScript, initializationError);
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, e => {
    console.error('Authentication error: ' + e);
});

// upload(auth).catch(console.error);