// Check is s2 is subsequence of s1

// ✅ TC = O(n) // n is the s1 length
// ✅ SC = O(1)
function checkSubSeq(s1, s2){
    let match_idx = 0
    for(let i=0; i<s1.length; i++){
        if(s1[i]===s2[match_idx]){
            match_idx++
        }
        if(match_idx===s2.length) return true
    }
    
    return false
}

let s1 = 'ABCD', s2='AD' // true
s1 = 'ABCDE', s2='AED' // false
console.log(checkSubSeq(s1, s2))


// ✅ TC = O(m+n) // m is the s1 length, n is s2 length
// ✅ SC = O(m+n)
function checkSubSeqRecursive(s1, s2, m=s1.length, n=s2.length){
    if(n===0) return true
    if(m===0) return false

    if(s1[m-1] === s2[n-1]){
        return checkSubSeqRecursive(s1, s2, m-1, n-1)
    }else{
        return checkSubSeqRecursive(s1, s2, m-1, n)
    }
}