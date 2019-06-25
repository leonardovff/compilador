const gramatica = [
    {type: 'number', regex: '^[0-9]$'},
    {type: 'variable', regex: '^[A-Z]$'},
];
const lexico = code => {
    let str = '';
    for(let i = 0, lim = code.length; i < lim; i++){
        str += code[i];
    }
}
module.exports = lexico;