const readFile = require('./app/file.js');
const lexico = require('./app/lexico.js');
const syntactic = require('./app/syntactic.js');
const dictionary = [
    {type: "int", patten: ["^([0-9]){1,20}$"]},
    {type: "operator", patten: ["^([+-]){1,1}$"]},
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
    {type: "scope_open", patten: ["^{$"]},
    {type: "scope_close", patten: ["^}$"]},
    {type: "bracket_open", patten: ["^[(]$"]},
    {type: "bracket_close", patten: ["^[)]$"]},
];


readFile('./code-font.ifal')
.then(code => {
    const {tokens, hash_ids} = {...lexico(code, dictionary)};
    syntactic(tokens, hash_ids);
});
