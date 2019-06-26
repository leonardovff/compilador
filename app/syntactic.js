const Node = function(value, esq, dir) {
    this.value = value;
    this.esq = esq;
    this.dir = dir;
}
const syntactic = (tokens, hash) => {
    let constructs = [
        {construct: "<variable><math-operator><int>",  type: "expression", resolve: (variable, operator, int) => {
            let temp = null;
            switch(operator){
                case "+":
                    temp = int;
                    break;
                case "-":
                    temp = -int;
                    break;
            }
            return hash[variable] += temp;
        }},
        {construct: "<variable><operator-attribution><int>", type: "attribution", resolve: (variable, operator, int) => {
            hash[variable.token] = int;
        }},
        {construct: "<variable><operator-compare><int>", type: "compare", resolve: () => {

        }},
        {construct: "<bracket-open><compare><bracket-close>", type: "isolation", resolve: () => {

        }},
        {construct: "<operator-if><isolation><scope-open>", type: "cond", resolve: () => {

        }}
    ]
    let pos = 0,
    str = "";
    let tree = [];

    console.log(tokens);
    while(pos < tokens.length){
        str += `<${tokens[pos].type}>`;
        console.log(str);
        let filtered = constructs.filter(construct => {
            return str.includes(construct.construct);
        });

        console.log(filtered);
        if(filtered.length == 1){
            const no = new Node( filtered[0].type, tokens[pos-2], tokens[pos]);
            tree.push(no);
            console.log(no)
            filtered[0].resolve(no.esq, no.value, no.dir);
            console.log(hash);
            tokens[pos] = {type: filtered[0].type};
            tokens.splice(pos-2,2);
            console.log(tokens);
            str = "";
            pos = 0;
        }   
        pos++;
    }
    console.log(tree);
}
module.exports = syntactic;