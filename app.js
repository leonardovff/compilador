const readFile = require('./app/file.js');
const lexico = require('./app/lexico.js');
const syntactic = require('./app/syntactic.js');
const dictionary = [
    {type: "int", patten: ["^([0-9]){1,20}$"]},
    {type: "math-operator", patten: ["^([+-]){1,1}$"]},
    {
        type: "operator-attribution", 
        patten: ["^([=]){1,1}$"],
        check: (str) => str != "=="
    },
    {type: "operator-compare", patten: ["^(==){1,1}$"]},
    {type: "operator-if", patten: ["^if$"]},
    {
        type: "variable", 
        patten: ["^([a-z]){1,20}$"],
        check: str => str != "if"
    },
    {type: "scope-open", patten: ["^{$"]},
    {type: "scope-close", patten: ["^}$"]},
    {type: "bracket-open", patten: ["^[(]$"]},
    {type: "bracket-close", patten: ["^[)]$"]},
];


readFile('./code-font.ifal')
.then(code => {
    const {tokens, hash} = {...lexico(code, dictionary)};
    syntactic(tokens, hash);
});
