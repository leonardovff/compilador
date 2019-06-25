const readFile = require('./file.js');
const lexico = require('./lexico.js');
readFile()
.then(teste => {
    lexico(teste);
});
