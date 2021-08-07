const ee = require('@google/earthengine');
const fs = require('fs');
const fetch = require('node-fetch');

const geePrint = require('/home/wsq/mapbiomas/auxiliar/print.js'); // Por que funciona apenas com full path

async function download(url, filename, format) {
    const response = await fetch(url);
    
    const buffer = await response.buffer();

    fs.writeFile (`./thumbnails/${filename}.${format}`, buffer, () => console.log('Finished downloading!') );

}

function script () {

    let palettes = [
        '#ffff00',  '#fff800',  '#fff000',  '#ffe900',  '#ffe200',  '#ffdb00',
        '#ffd300',  '#ffcc00',  '#ffc500',  '#ffbd00',  '#ffb600',  '#ffaf00',
        '#ffa800',  '#ffa000',  '#ff9900',  '#ff9200',  '#ff8a00',  '#ff8300',
        '#ff7c00',  '#ff7500',  '#ff6d00',  '#ff6600',  '#ff5f00',  '#ff5700',
        '#ff5000',  '#ff4900',  '#ff4200',  '#ff3a00',  '#ff3300',  '#ff2c00',
        '#ff2400',  '#ff1d00',  '#ff1600',  '#ff0f00',  '#ff0700',  '#ff0000'
    ];
    
    let geometry = ee.Geometry.Polygon([[
        [-75.00992260404627, 5.3573768477192605],
        [-75.00992260404627, -34.23131082965636],
        [-34.316563229046274, -34.23131082965636],
        [-34.316563229046274, 5.3573768477192605]
    ]], null, false);
    
    let visParams = {
        version: null,
        bands: 'fire_frequency_1985_2020',
        min: 0,
        max: 36,
        gain: null,
        bias: null,
        gamma: null,
        palette: palettes,
        opacity: null,
        format: 'jpg', // or "jpg"

        // Thumbnails vis params
        dimensions: 420,
        region: geometry
    };
    
    idList = [
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-accumulated-burned-area-1',
        // 'projects/nexgenmap/mapbiomas2/landsat/mosaics',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-annual-burned-area-1',
        // 'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-annual-burned-coverage-1',
        'users/queirozws/MAPBIOMAS-FIRE/COLLECTION1/mapbiomas-fire-collection1-fire-frequency-1'
    ];

    idList.map(function (id) {
        let thumbURL = ee.Image(id).getThumbURL( visParams ); // {ee.String}

        let filename = id.split('/').slice(-1)[0];

        // geePrint(thumbURL, ee.String);

        console.log(`Downloading: ${filename}\n`);

        download(thumbURL, filename, visParams.format);

        return null

    });

}

module.exports = script