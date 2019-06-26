const fs = require('fs'),
readFile = () => new Promise( resolve => {
    fs.readFile('./code-font.ts', function read(err, data) {
        if (err) {
            throw err;
        }
        resolve(data+'');
    });
});
module.exports = readFile;