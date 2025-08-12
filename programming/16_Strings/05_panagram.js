// A panagram contains all the letters of english alphabet at least once.

function isPanagram(str) {
    if(str.length < 26) return false
    
    let lowerS = str.toLowerCase()
    
    let alphabets = new Set('abcdefghijklmnopqrstuvwxyz')
    
    for(let char of lowerS){
        if(alphabets.has(char)){
            alphabets.delete(char)
            if(alphabets.size === 0) return 1
        }
    }
    
    return 0
}