function countWords(str) {
    // write your code here
    let word_count = 1
    
    for(let char of str.trim()){
        if(char === ' '){
            word_count++
        }
    }
    
    return word_count
}