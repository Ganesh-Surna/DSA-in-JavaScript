function palindromePartition(str, n=str.length){
    let dp = new Array(n)
    for(let i=0; i<n+1; i++){
        dp[i] = new Array(n).fill(Infinity)
    }
    
    // dp[i][j] --> Min cuts required to partition string [i...j] into palindromes.
    // So final answer is dp[0][n-1] --> i.e., [0...n-1] means whole string
    
    for(let i=0; i<n+1; i++){
        dp[i][i] = 0
    }
    
    for(let gap=1; gap<n; gap++){
        for(let i=0; i+gap < n; i++){
            let j = i+gap
            
            if(isPalindrome(str, i, j)){
                dp[i][j] = 0 // 0 cuts if string[i...j] is palindrome
            }else{
                for(let p=i; p<j; p++){
                    // p is the partition point
                    let left = dp[i][p] // [i...p] means left string
                    let right = dp[p+1][j] // [p+1...j] means remaining string
                    dp[i][j] = Math.min(dp[i][j], 1 + left + right)
                }
            }
            
        }
    }
    
    return dp[0][n-1]
    
    function isPalindrome(str, l, r){
        while(l < r){
            if(str[l] !== str[r]){
                return false
            }
            l++
            r--
        }
        return true
    }
}

console.log(palindromePartition("nitin")); // 0 --> nitin is a palindrome
console.log(palindromePartition("abc")); // 2 --> a | b | c
console.log(palindromePartition("aab")); // 1 --> a, ab
console.log(palindromePartition("abcde")); // 4 --> a | b | c | d | e
console.log(palindromePartition("aabbc")); // 2 --> aa | bb | c
console.log(palindromePartition("aabbcde")); // 4 --> aa | bb | c | d | e
console.log(palindromePartition("abbabbc")); // 2 --> abba | bb | c   --> OR --> a | bbabb | c