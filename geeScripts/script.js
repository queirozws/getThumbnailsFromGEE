const ee = require('@google/earthengine');
const fs = require('fs');
const fetch = require('node-fetch');

const print = require('/home/wsq/mapbiomas/js/get-thumbnails-from-gee/auxiliar/print.js'); // Por que funciona apenas com full path?

async function download(url, filename, format) {
    const response = await fetch(url);

    // print
    
    const buffer = await response.buffer();

    fs.writeFile (`./thumbnails/${filename}.${format}`, buffer, () => console.log('Finished downloading!') );

}

function script () {

    var paletteModis = [
        'aec3d4', // water
        '152106', '225129', '369b47', '30eb5b', '387242', // forest
        '6a2325', 'c3aa69', 'b76031', 'd9903d', '91af40', // shrub, grass, savannah
        '111149', // wetlands
        'cdb33b', // croplands
        'cc0013', // urban
        '33280d', // crop mosaic
        'd7cdcc', // snow and ice
        'f7e084', // barren
        '6f6f6f'  // tundra
    ];
    
    let geometry = ee.Geometry.Polygon([[
        [-75.00992260404627, 5.3573768477192605],
        [-75.00992260404627, -34.23131082965636],
        [-34.316563229046274, -34.23131082965636],
        [-34.316563229046274, 5.3573768477192605]
    ]], null, false);
    
    let visParams = {
        version: null,
        bands: ['Land_Cover_Type_1'],
        min: 0,
        max: 17,
        gain: null,
        bias: null,
        gamma: null,
        palette: paletteModis,
        opacity: null,
        format: 'png', // or "jpg"

        // Thumbnails vis params
        dimensions: 420,
        region: geometry
    };
    
    let idList = [
        'MODIS/051/MCD12Q1/2001_01_01',
        'MODIS/051/MCD12Q1/2001_01_01',
        'MODIS/051/MCD12Q1/2001_01_01',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-accumulated-burned-area-1',
        // 'projects/nexgenmap/mapbiomas2/landsat/mosaics',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-annual-burned-area-1',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-annual-burned-coverage-1',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-fire-frequency-1'
    ];

    let urlList = idList.map(function (id) {
        
        let thumbURL = ee.Image(id).getThumbURL( visParams ); // {ee.String}

        let filename = id.split('/').slice(-1)[0];

        download(thumbURL, filename, visParams.format);

        print(thumbURL, ee.String);

        return thumbURL

    });

}

module.exports = script