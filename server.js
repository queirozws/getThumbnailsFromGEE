// Require client library and private key.
const ee = require('@google/earthengine');
const privateKey = require('./privatekey.json');

const geeScript = require('./geeScripts/script.js');

function initializationError (e) {
    console.error('Initialization error: ' + e);
}

// Initialize client library and run analysis
function runAnalysis () {
    ee.initialize(null, null, geeScript, initializationError);
};

// Authenticate using a service account.
ee.data.authenticateViaPrivateKey(privateKey, runAnalysis, function(e) {
    console.error('Authentication error: ' + e);
});