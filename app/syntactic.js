const Node = function(value, esq, dir) {
    this.value = value;
    this.esq = esq;
    this.dir = dir;
}
const syntactic = (tokens, hash) => {
    let constructs = [
        {construct: "<int><math-operator><int>",  type: "expression", resolve: (variable1, operator, variable2) => {
            let temp = variable1.token * 1;
            switch(operator.token){
                case "+":
                    temp += variable2.token * 1;
                    break;
                case "-":
                    temp -= variable2.token * 1;
                    break;
            }
            return { token: temp, type: 'int'};
        }},
        {construct: "<variable><math-operator><int>",  type: "variable_expression", resolve: (variable, operator, int) => {
            let temp = hash[variable.token].token * 1;

            switch(operator.token){
                case "+":
                    temp += int.token * 1;
                    break;
                case "-":
                    temp -= int.token * 1;
                    break;
            }

            return { token: temp, type: 'int'};
        }},
        {
            construct: "<variable><operator-attribution><int>", 
            type: "attribution", 
            resolve: (variable, operator, int) => {
                hash[variable.token] = int;
                return "";
            }
        },
        {
            construct: "<variable><operator-compare><int>", 
            type: "compare", 
            resolve: (variable, operator, int) => {
                
                const temp = hash[variable.token].token == int.token;
                return { token: temp, type: 'boolean'};
            }
        },
        {
            construct: "<bracket-open><boolean><bracket-close>", 
            type: "isolation", 
            resolve: (variable, operator, int) => {
                return { token: operator, type: 'isolation'};
            }
        },
        {
            construct: "<operator-if><isolation><scope-open>", 
            type: "cond",
            resolve: (variable, operator, int, tokens, pos) => {
                const close = tokens
                    .map((token, i)=> {
                        token['index'] = i; 
                        return token;
                    })
                    .filter((token,i) => 
                        i>pos && token.type=="scope-close"
                    );
                if(close.length == 1){
                    if(operator.token.token){       
                        tokens.splice(close[0].index,1);
                    } else {
                        tokens.splice(pos, close[0].index - pos + 1);
                    }
                } else {
                    // message error here
                }
                return '';
            }
        }
    ]
    let pos = 0,
    str = "";
    console.log(tokens);
    while(pos < tokens.length){
        str += `<${tokens[pos].type}>`;
        let filtered = constructs.filter(construct => {
            return str.includes(construct.construct);
        });
        if(filtered.length == 1){
            const no = new Node( tokens[pos-1], tokens[pos-2], tokens[pos]);
            const retorno =  filtered[0].resolve(no.esq, no.value, no.dir, tokens, pos);
            if(retorno){
                tokens[pos] = retorno;
                tokens.splice(pos-2,2);
            } else {
                tokens.splice(pos-2,3);
            }
            str = "";
            pos = 0;
            continue;
        }   
        pos++;
    }
    console.log(hash);
}
module.exports = syntactic;