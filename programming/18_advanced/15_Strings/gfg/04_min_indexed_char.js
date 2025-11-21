/* Problem: ✅✅✅✅ Print the Minimum Index Character ✅✅✅✅

Given a string S and another string patt. Find the character in patt that is present at the minimum index in S.
 
Example 1:
Input: S = "zsyle", patt = "bjz"
Output: "z"

Example 2:
Input: S = "anskg", patt = "me"
Output: "$"
 

Your Task:
You don't need to read or print anything. 
Your task is to complete the function printMinIndexChar() which takes S and patt as input parameter 
and returns the character in patt that is present at the minimum index in S. If not possible returns "$".
 

Expected Time Complexity: O(max(|str|, |patt|))
Expected Auxilary Space: O(K) where K <= 26
 

Constraints:
1 ≤ |S|, |patt| ≤ 104

*/

// ✅ TC = O(n + m)
// ✅ SC = O(26) = O(1)
function printMinIndexChar(S, patt) {
    let freq = new Array(26).fill(0)
    let n = S.length
    let m = patt.length
    for(let i=0; i<m; i++){
        freq[patt.charCodeAt(i) - "a".charCodeAt(0)]++
    }
    
    for(let i=0; i<n; i++){
        if(freq[S.charCodeAt(i) - "a".charCodeAt(0)] > 0){
            return S[i]
        }
    }
    
    return "$"
}