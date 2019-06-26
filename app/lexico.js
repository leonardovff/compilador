const lexico = (code, dictionary) => {
    code = code.replace(/[ \s]/gi, '')+'e';
    let str = '',
    tokens = [],
    temp = null;
    for(let i = 0; i < code.length; i++){
        str += code[i];
        const filtered = dictionary.filter( word => 
            new RegExp(`${word.patten}`, "gi").test(str)
        );
        if(temp){
            temp = temp.filter(word => {
                if(word.check){
                    return word.check(str);
                }
                return true;
            });
            temp = temp.length == 0 ? null : temp;
        }

        console.log(filtered, str, i, code.length);
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
            tokens.push({
                type: temp[0].type,
                token: str.substr(0, str.length-1)
            });      
            i += -1;

            str = '';
            temp = null;
        }
    }
    return tokens;
}
module.exports = lexico;