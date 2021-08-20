const fetch = require('node-fetch');
const fs = require('fs');

async function download(url, filename, format) {
    const response = await fetch(url);

    const buffer = await response.buffer();

    fs.writeFile (`./thumbnails/${filename}.${format}`, buffer, () => console.log('Finished downloading!') );

}

module.exports = download