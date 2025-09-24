/* Problem:
Given two strings s1 and s2, return the length of their longest common subsequence (LCS). If there is no common subsequence, return 0.

A subsequence is a sequence that can be derived from the given string by deleting some or no elements without changing the order of the remaining elements. For example, "ABE" is a subsequence of "ABCDE".

Example 1:
Input: s1 = "ABCDGH", s2 = "AEDFHR"
Output: 3
Explanation: The longest common subsequence of "ABCDGH" and "AEDFHR" is "ADH", which has a length of 3.

Example 2:
Input: s1 = "ABC", s2 = "AC"
Output: 2
Explanation: The longest common subsequence of "ABC" and "AC" is "AC", which has a length of 2.

Example 3:
Input: s1 = "XYZW", s2 = "XYWZ"
Output: 3
Explanation: The longest common subsequences of "XYZW" and "XYWZ" are "XYZ" and "XYW", both of length 3.

Example 4:
Input: s1 = "AGGTAB", s2 = "GXTXAYB"
Output: 4
Explanation: The longest common subsequence is "GTAB", which has a length of 4.

Constraints:
1 ≤ s1.size(), s2.size() ≤ 10^3
Both strings s1 and s2 contain only uppercase English letters.

Expected Time Complexity: O(n * m)
Expected Auxiliary Space: O(min(n, m))
*/

// ✅✅✅ Approach 1: Using Recursion (Naive) ✅✅✅
// ✅ TC = O(2^(n+m))
// ✅ SC = O(n+m)

function lcs(s1,s2){
    
    let m = s1.length;
    let n = s2.length;
    return lcsRec(s1,s2,m,n);
}

// Returns length of LCS for s1[0..m-1], s2[0..n-1]
function lcsRec(s1, s2, m, n) {
  
    // Base case: If either string is empty, the length of LCS is 0
    if (m === 0 || n === 0){
        return 0;
    }

    // If the last characters of both substrings match
    if (s1[m - 1] === s2[n - 1]){
        // Include this character in LCS and recur for remaining substrings
        return 1 + lcsRec(s1, s2, m - 1, n - 1);
    }
    // If the last characters of both substrings don't match, Take maximum of two choices (Exclude one character from either string)
    else{
        return Math.max(lcsRec(s1, s2, m, n - 1), lcsRec(s1, s2, m - 1, n));
    }
}