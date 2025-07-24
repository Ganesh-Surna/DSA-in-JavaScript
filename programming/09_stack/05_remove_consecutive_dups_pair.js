// You are given string s. You need to remove the pair of duplicates.
// Note: The pair should be of adjacent elements and 
// after removing a pair the remaining string is joined together. 

// Examples:

// Ex1:
// Input: s = "aaabbaaccd"
// Output: ad

// Explanation: 
// Remove (aa)abbaaccd =>abbaaccd
// Remove a(bb)aaccd => aaaccd
// Remove (aa)accd => accd
// Remove a(cc)d => ad

// Ex2:
// Input: s = "aaaa"
// Output: Empty String

// Explanation:
// Remove (aa)aa => aa
// Again removing pair of duplicates then (aa) 
// will be removed and we will get 'Empty String'.

// Constraints:
// 1 <= |s| <= 103

// Expected Complexities
// Time Complexity: O(n)
// Auxiliary Space: O(n)

class Solution {
    // ✅ TC: O(n), SC: O(n)
    removePair(s) {
        // code here
        let stack = []
        for(let i=0; i<s.length; i++){
            if(stack.length===0 || stack[stack.length - 1] !== s[i]){
                stack.push(s[i])
            }else{
                // Means stack has the peak same as current char
                stack.pop()
            }
        }
        return stack.join('')
    }
}