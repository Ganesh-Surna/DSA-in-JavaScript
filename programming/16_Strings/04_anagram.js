function areAnagrams(s1, s2) {
    // code here
    if(s1.length !== s2.length) return false
    
    let freq = new Map()
    
    for(let char of s1){
        freq.set(char, (freq.get(char)|| 0)+1)
    }
    
    for(let char of s2){
        if(!freq.has(char) || freq.get(char)<0) return false
        
        freq.set(char, (freq.get(char)||0)-1)
    }
    
    for(let [key, val] of freq.entries()){
        if(val !== 0) return false
    }
    
    return true
}