const readFile = require('./app/file.js');
const lexico = require('./app/lexico.js/index.js');
const dictionary = [
    {type: "int", patten: ["^([0-9]){1,20}$"]},
    {type: "variable", patten: ["^([a-z]){1,20}$"]},
    {type: "operator", patten: ["^([+-]){1,1}$"]},
    {
        type: "operator-attribution", 
        patten: ["^([=]){1,1}$"],
        check: (str) => str != "=="
    },
    {type: "operator-compare", patten: ["^(==){1,1}$"]},
    {type: "operator-if", patten: ["^if$"]},
    {type: "scope_open", patten: ["^{$"]},
    {type: "scope_close", patten: ["^}$"]},
    {type: "parameters_open", patten: ["^[(]$"]},
    {type: "parameters_close", patten: ["^[)]$"]},
];
readFile()
.then(teste => {
    const tokens = lexico(teste, dictionary);
    console.log(tokens);
});
