var ee = require('@google/earthengine');
var privateKey = require('/home/wsq/mapbiomas/privatekey.json');

// Authenticate using one (but not both) of the methods below.
// ee.data.authenticateViaOauth(YOUR_CLIENT_ID);
ee.data.authenticateViaPrivateKey(privateKey);

ee.initialize();

// Run an Earth Engine script.
var image = new ee.Image('srtm90_v4');
image.getMap({min: 0, max: 1000}, function(map) {
  console.log(map);
});