/* Problem: ✅✅✅✅ Check if Two Strings are Isomorphic ✅✅✅✅

Given two strings s1 and s2 consisting of only lowercase English letters and of equal length, 
check if these two strings are isomorphic to each other.
If the characters in s1 can be changed to get s2, then two strings, s1 and s2 are isomorphic. 
A character must be completely swapped out for another character while maintaining the order of the characters. 
A character may map to itself, but no two characters may map to the same character.

Examples:

Input: s1 = "aab", s2 = "xxy"
Output: true
Explanation: Each character in s1 can be consistently mapped to a unique character in s2 (a → x, b → y).

Input: s1 = "aab", s2 = "xyz"
Output: false
Explanation: Same character 'a' in s1 maps to two different characters 'x' and 'y' in s2.

Input: s1 = "abc", s2 = "xxz"
Output: false
Explanation: Two different characters 'a' and 'b' in s1 maps with same character 'x' in s2.

Constraints:
1 ≤ s1.size() = s2.size() ≤ 105

Expected Complexities
Time Complexity: O(n)
Auxiliary Space: O(1)
*/

// ✅ TC = O(n)
// ✅ SC = O(26) = O(1)
function areIsomorphic(s1, s2) {
    if (s1.length !== s2.length) return false;

    const map1 = new Array(26).fill(-1); // mapping s1 → s2
    const map2 = new Array(26).fill(-1); // mapping s2 → s1

    for (let i = 0; i < s1.length; i++) {
        const c1 = s1.charCodeAt(i) - 97; // 'a' = 97
        const c2 = s2.charCodeAt(i) - 97;

        // If not mapped yet
        if (map1[c1] === -1 && map2[c2] === -1) {
            map1[c1] = c2;
            map2[c2] = c1;
        } 
        // Already mapped, check consistency
        else if (map1[c1] !== c2 || map2[c2] !== c1) {
            return false;
        }
    }

    return true;
}

// 🔹 Test cases
console.log(areIsomorphic("aab", "xxy")); // true
console.log(areIsomorphic("aab", "xyz")); // false
console.log(areIsomorphic("abc", "xxz")); // false
console.log(areIsomorphic("paper", "title")); // true
