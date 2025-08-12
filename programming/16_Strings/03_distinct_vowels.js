// Expected Time Complexity: O(|S|).
// Expected Auxiliary Space: O(1).

function countDistinctVowels(s) {
    // code here
    let vowels = new Set(['a', 'e', 'i', 'o', 'u'])
    // Initial size of vowels is = 5
    for(let char of s){
        if(vowels.size === 0) break
        if(vowels.has(char)){
            vowels.delete(char)
        }
    }
    
    return 5 - vowels.size
}