const ee = require('@google/earthengine');

const print = require('../auxiliar/print');

function defineType(assetInfo, assetId, geometry) {

    switch (assetInfo.type) {

        case "Image":
        // print('Image', assetId);

        return {
            obj: ee.Image(assetId),
            url: ee.Image(assetId).select(0).getThumbURL( {dimensions: 420, region: geometry} )
        }

        case "ImageCollection":
        // print('ImageCollection: ', assetId);

        return {
            obj: ee.ImageCollection(assetId),
            url: ee.ImageCollection(assetId).mosaic().select(0).getThumbURL( {dimensions: 420, region: geometry} )
        }

        default:
            // print('Não é uma Image nem ImageCollection');
        
    }

}

function script() {
    
    const assetIdList = [
        'MODIS/051/MCD12Q1/2001_01_01',
        // 'projects/MapBiomas_Pampa/MOSAICS/mosaics_c1',
        // 'projects/MapBiomas_Pampa/COLLECTION1/classification',
        // 'projects/MapBiomas_Pampa/public/collection1/mapbiomas_pampa_collection1_integration_v1',
        // 'projects/mapbiomas_af_trinacional/MOSAICS/workspace-c1',
        // 'projects/mapbiomas_af_trinacional/public/collection1/mapbiomas_atlantic_forest_collection1_integration_v1',
        // 'projects/mapbiomas-indonesia/MOSAICS/workspace-c1',
        // 'projects/mapbiomas-indonesia/public/collection1/mapbiomas_indonesia_collection1_integration_v1',
        // 'projects/mapbiomas-chaco/public/collection1/mapbiomas_chaco_collection1_integration_v1',
        // 'projects/mapbiomas-chaco/public/collection2/mapbiomas_chaco_collection2_integration_v1',
    ];
      
    const geometry = ee.Geometry.Polygon([[
        [-75.00992260404627, 5.3573768477192605],
        [-75.00992260404627, -34.23131082965636],
        [-34.316563229046274, -34.23131082965636],
        [-34.316563229046274, 5.3573768477192605]
    ]], null, false);
    
    assetIdList.forEach(function (assetId) {

        let assetInfo = ee.data.getAsset(assetId);

        let gee = defineType(assetInfo, assetId, geometry);

        // var name = assetId.split("/").slice(-1)[0];

        // var thumbURL = eeObject.getThumbURL();

        print(gee.url, ee.String);

        // Map.addLayer(gee.obj, {}, name, true, 1);

    });

    print('ola', ee.String);

}

module.exports = script