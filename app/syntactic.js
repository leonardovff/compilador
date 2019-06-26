const Node = function(value, esq, dir) {
    this.value = value;
    this.esq = esq;
    this.dir = dir;
}
const syntactic = (tokens) => {
    let constructs = [
        {construct: "<variable><math-operator><int>", type: "expression"},
        {construct: "<variable><operator-attribution><int>", type: "attribution"},
        {construct: "<variable><operator-compare><int>", type: "compare"},
        {construct: "<bracket-open><compare><bracket-close>", type: "isolation"},
        {construct: "<operator-if><isolation><operator-if>", type: "cond"}
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