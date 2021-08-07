const ee = require('@google/earthengine');

function geeScript (callback) {

    // Load input imagery: Landsat 7 5-year composite.
    var image = ee.Image('LANDSAT/LE7_TOA_5YEAR/2008_2012');

    // Load an input region: Sierra Nevada.
    var region = ee.Feature(ee.FeatureCollection('EPA/Ecoregions/2013/L3')
    .filter(ee.Filter.eq('us_l3name', 'Sierra Nevada'))
    .first());

    // Reduce the region. The region parameter is the Feature geometry.
    var meanDictionary = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: region.geometry(),
    scale: 30,
    maxPixels: 1e9
    });

    meanDictionary.evaluate( function (success, failure) {
        
        if (success) {
            console.log(success)
        } else {
            console.log(failure)
        }
    
    });

    // The result is a Dictionary.  Print it.
    // console.log(meanDictionary);

}

module.exports = geeScript