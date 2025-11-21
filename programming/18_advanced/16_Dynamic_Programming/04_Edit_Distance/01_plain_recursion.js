function editDistance(s1, s2, m = s1.length, n = s2.length){
    if(n===0){
        return m // Should need m delete operations (to delete m length s1 string)
    }
    if(m===0){
        // Means n is not zero(coz we came here by skipping that condition)
        return n // Should need n insert operations
    }
    
    if(s1[m-1] === s2[n-1]){
        return editDistance(s1, s2, m-1, n-1)
    }
    
    /* +1 is essentially the cost of the current operation (insert/delete/replace) you're performing at this recursive step, 
    while the recursive calls compute the cost of the remaining work. */
    return 1 + Math.min(
            editDistance(s1, s2, m, n-1), // Insert (that's why reduced last char from s2 - considering inserted char in s1, so matched with last char in s2)
            editDistance(s1, s2, m-1, n), // Delete (that's why removed last char from s1)
            editDistance(s1, s2, m-1, n-1) // Replace (considering replaced last chars of s1 & s2 - means we can skip that last char from both)
        )
}

console.log(editDistance("horse", "ros")); // 3
// 1. replace 'h' with 'r' (horse -> rorse)
// 2. remove 'r' (rorse -> rose)
// 3. remove 'e' (rose -> ros)

console.log(editDistance("intention", "execution")); // 5
// 1. remove 't' (intention -> inention)
// 2. replace 'i' with 'e' (inention -> enention)
// 3. replace 'n' with 'x' (enention -> exention)
// 4. replace 'n' with 'c' (exention -> exection)
// 5. insert 'u' (exection -> execution)