const syntactic = (code, dictionary) => {
  
    let escope = 1;
    for(let i = 0; i< code.length; i++){
        if(code[i]['type'] == 'variable') code[i]['nivel-escope'] = escope;
        else if(code[i]['type'] == 'scope-open') ++escope;
        else if(code[i]['type'] == 'scope-close') --escope;   
    }
    
}
module.exports = syntactic;