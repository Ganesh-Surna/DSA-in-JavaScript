// You are given string s. 
// You need to remove the consecutive duplicates from the given string using a Stack.  

// Examples:

// Input: s = "aaaaaabaabccccccc"
// Output: ababc
// Explanation: 
// The order is in the following way 6->a, 1->b, 2->a, 1->b, 7->c. 
// So, only one element from each group will remain and rest all are removed. 
// Therefore, final string will be:- ababc.

// Input: s = "abbccbcd"
// Output: abcbcd
// Explanation: 
// The order is in the following way 1->a, 2->b, 2->c, 1->b, 1->c, 1->d. 
// So, only one element from each group will remain and rest all are removed. 
// Therefore, final string will be:- abcbcd. 

// Constraints:
// 1 <= |s| <= 103

// Expected Complexities
// Time Complexity: O(n)
// Auxiliary Space: O(n)

class Solution {
    // Function to remove consecutive duplicates from given string using Stack.
    // ✅ TC: O(n), SC: O(n)
    removeConsecutiveDuplicates(s) {
        // your code here
        let st = []

        // WAY 1:
        for(let i=0; i<s.length; i++){
            // [st.length-1] ==> means peak (in arr impl of stack)
            if(st.length===0 || st[st.length-1]!==s[i]){
                st.push(s[i])
            }
        }

        // WAY 2:
        // for(let i=0; i<s.length; i++){
        //     if(i===s.length-1){
        //         st.push(s[i])
        //     }else{
        //         if(s[i]!==s[i+1]){
        //             st.push(s[i])
        //         }
        //     }
        // }

        return st.join('')
    }
}