/* Problem: ✅✅✅✅ Check if a String is Isogram ✅✅✅✅

Given a string s of lowercase alphabets, You have to check that  it is isogram or not.
An Isogram is a string in which no letter occurs more than once.

Examples:

Input: s = "machine"
Output: true
Explanation: "machine" is an isogram as no letter has appeared twice. so we return true.

Input: s = "geeks"
Output: false
Explanation: "geeks" is not an isogram as 'e' appears twice. so we return false.

Constraints:
1 ≤ |s| ≤ 103

Expected Complexities
Time Complexity: O(n)
Auxiliary Space: O(1)
*/

// ✅ TC = O(n)
// ✅ SC = O(26) = O(1)
function isIsogram(s) {
    let freq = new Array(26).fill(0)
    
    for(let ch of s){
        let codeIdx = ch.charCodeAt(0) - "a".charCodeAt(0)
        if(freq[codeIdx] > 0){
            return false
        }
        freq[codeIdx]++
    }
    
    return true
}