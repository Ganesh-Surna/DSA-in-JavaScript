// Longest Substring Without Repeating Characters
// Problem: Find the longest substring without repeating characters.

// Approach:
// Expand the window from the right until the character is not in the set,
// then shrink the window from the left until the character is not in the set.


// ✅ TC = O(n), ✅ SC = O(1)
function lengthOfLongestSubstring(s) {
    const set = new Set();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        // Expand the window from the right until the character is not in the set

        // Shrink the window from the left until the character is not in the set
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}

// Test Cases
let s1 = "abcabcbb"
console.log(lengthOfLongestSubstring(s1))
// Output: 3 (subarray [abc])

// Flow:
// right=0: [a] set={a}, maxLen=1
// right=1: [a,b] set={a,b}, maxLen=2
// right=2: [a,b,c] set={a,b,c}, maxLen=3
// right=3: 'a' is duplicate, shrink left: remove 'a', left=1, window=[b,c,a], set={b,c,a}, maxLen=3
// right=4: 'b' is duplicate, shrink left: remove 'b', left=2, window=[c,a,b], set={c,a,b}, maxLen=3
// right=5: 'c' is duplicate, shrink left: remove 'c', left=3, window=[a,b,c], set={a,b,c}, maxLen=3
// right=6: 'b' is duplicate, shrink left: remove 'a', left=4, window=[b,c,b], set={b,c}, then remove 'b', left=5, window=[c,b], set={c,b}, maxLen=3
// right=7: 'b' is duplicate, shrink left: remove 'c', left=6, window=[b,b], set={b}, then remove 'b', left=7, window=[b], set={b}, maxLen=3
// Final result: 3 (substring "abc")