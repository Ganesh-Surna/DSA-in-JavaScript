function palindromePartition(str, l=0, r=str.length-1){
    if(l > r) return 0
    if(isPalindrome(str, l, r)){
        return 0 // No partition for palindrome
    }
    
    let res = Infinity
    for(let i=l; i<r; i++){
        let left = palindromePartition(str, l, i) 
        let right = palindromePartition(str, i+1, r)
        res = Math.min(res, 1 + left + right)
    }
    return res


    // Helper function to check if a substring is a palindrome
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