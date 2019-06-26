const syntactic = (code, dictionary) => {
  
    let isEscope = false;
    let escope = 1;

    for(let i = 0; i< code.length; i++){
        if(code[i]['type'] == 'variable' && !isEscope) code[i]['nivel-escope'] = escope;
        else if(code[i]['type'] == 'scope-open' && !isEscope) ++escope;
        else if(code[i]['type'] == 'scope-close' && !isEscope) --escope;   
    }

}
module.exports = syntactic;