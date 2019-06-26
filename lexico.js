const gramatica = [
    {type: 'number', regex: '^[0-9]$'},
    {type: 'variable', regex: '^[A-Z]$'},
    {type: "conditional", regex: '^[if]$'},
    {type: "open-bracket", regex: '^[(]$'}, //opens brackets
    {type: "close-bracket", regex: '^[)]$'}, //close brackets
    {type: "open-key", regex: '^[{]$'}, //opens keys
    {type: "close-key", regex: '^[}]$'}, //close keys
];
const lexico = code => {
    let str = '';
    for(let i = 0, lim = code.length; i < lim; i++){
        str += code[i];
    }
}
module.exports = lexico;