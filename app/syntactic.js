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
            construct: "<int><operator-compare><int>", 
            type: "compare", 
            resolve: (int1, operator, int2) => {
                const temp = int1.token == int2.token;
                return { token: temp, type: 'boolean'};
            }
        },
        {
            construct: "<bracket-open><boolean><bracket-close>", 
            type: "isolation", 
            resolve: (variable, operator, int) => {
                if(typeof operator.token == "string"){
                    operator.token = operator.token == "true";
                }
                return { token: operator, type: 'isolation'};
            }
        },
        {
            construct: "<bracket-open><variable><bracket-close>", 
            type: "isolation", 
            resolve: (variable, operator, int) => {
                return { token: operator, type: 'isolation'};
            }
        },
        {
            construct: "<bracket-open><int><bracket-close>", 
            type: "isolation", 
            resolve: (variable, operator, int) => {
                return { token: operator, type: 'isolation'};
            }
        },
        {
            construct: "<operator-if><isolation><scope-open>", 
            type: "cond",
            resolve: (variable, operator, int, tokens, pos) => {
                const close = [...tokens]
                    .map((token, i)=> {
                        token['index'] = i; 
                        return token;
                    })
                    .filter((token,i) => 
                        i>pos && token.type=="scope-close"
                    );
                if(close.length>0){
                    if(operator.token.token){       
                        tokens.splice(close[0].index,1);
                    } else {
                        tokens.splice(pos+1, close[0].index - pos)
                    }
                } else {
                    // message error here
                }
                return '';
            }
        },
        {
            construct: "<print><isolation>", 
            type: "print-operation",
            resolve: (value) => {
                switch(value.token.type){
                    case 'variable':
                        console.log(hash[value.token.token].token)
                        break;
                    case 'int':
                        console.log(value.token.token)
                        break;
                }
                return '';
            }
        }
    ]
    let pos = 0,
    str = "";
    while(pos < tokens.length){
        str += `<${tokens[pos].type}>`;
        let filtered = constructs.filter(construct => {
            return str.includes(construct.construct);
        });
        if(filtered.length == 1){
            let no = null,
            twoOpts = false;
            if(filtered[0].type == "print-operation"){
                twoOpts = true;
            }
            if(twoOpts){
                no = new Node( tokens[pos-1], tokens[pos]);       
            } else {
                no = new Node( tokens[pos-1], tokens[pos-2], tokens[pos]);
            }
            const retorno =  filtered[0].resolve(no.esq, no.value, no.dir, tokens, pos),
            dif = twoOpts ? 1 : 2;
            if(retorno){
                tokens[pos] = retorno;
                tokens.splice(pos-dif,dif);
            } else {
                tokens.splice(pos-dif,dif+1);
            }
            str = "";
            pos = 0;
            continue;
        }   
        pos++;
    }
}
module.exports = syntactic;