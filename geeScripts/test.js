const ee = require('@google/earthengine');

function test () {
    // Run an Earth Engine script.
    let image = new ee.Image('srtm90_v4');

    image.getMap({min: 0, max: 1000}, function(map) {
        console.log(map);
    });
}

module.exports = test