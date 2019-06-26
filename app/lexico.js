const lexico = (code, dictionary) => {
    let str = '',
    tokens = [],
    temp = null,
    hash = {};

    code = code.replace(/[ \s]/gi, '')+'e';
    for(let i = 0; i < code.length; i++){
        str += code[i];
        const filtered = dictionary.filter( word => {
            if(!new RegExp(`${word.patten}`, "gi").test(str)){
                return false;
            }
            if(word.check){
                return word.check(str);
            }
            return true;
        });
        if(temp){
            temp = temp.filter(word => {
                if(word.check){
                    return word.check(str);
                }
                return true;
            });
            temp = temp.length == 0 ? null : temp;
        }

        if(filtered.length == 1 && !temp){
            temp = filtered;
            continue;
        }
        if(
            (
                filtered.length == 1 && 
                (temp[0].type != filtered[0].type || i == code.length-1)
            ) 
            || (
                filtered.length == 0 && 
                (temp || i == code.length-1)
            )
        ){
            if(temp[0].type == "variable"){
                let id = hash[str.substr(0, str.length-1)];
                if(!id){
                    hash[str.substr(0, str.length-1)] = {
                        value: null,
                        type: undefined
                    }
                }
            }
            tokens.push({
                type: temp[0].type,
                token: str.substr(0, str.length-1)
            });      
            i += -1;

            str = '';
            temp = null;
        }
    }
    return {tokens, hash};
}
module.exports = lexico;