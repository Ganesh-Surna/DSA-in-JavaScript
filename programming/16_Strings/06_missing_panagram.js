function missingPanagram1(s) {
    const present = new Array(26).fill(false);
    const aCode = 'a'.charCodeAt(0);
    
    for (const char of s.toLowerCase()) {
        const code = char.charCodeAt(0) - aCode;
        if (code >= 0 && code < 26) {
            present[code] = true;
        }
    }
    
    const missing = [];
    for (let i = 0; i < 26; i++) {
        if (!present[i]) {
            missing.push(String.fromCharCode(aCode + i));
        }
    }
    
    return missing.length === 0 ? -1 : missing.join('');
}

function missingPanagram2(s) {

    let alphabets = new Set('abcdefghijklmnopqrstuvwxyz')
    
    for(let char of s.toLowerCase()){
        if(alphabets.has(char)){
            alphabets.delete(char)
            if(alphabets.size === 0) break
        }
    }
    
   return alphabets.size > 0 ? Array.from(alphabets).join('') : -1
}