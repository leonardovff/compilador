const fs = require('fs'),
readFile = path  => new Promise( resolve => {
    fs.readFile(path, function read(err, data) {
        if (err) {
            throw err;
        }
        resolve(data+'');
    });
});
module.exports = readFile;