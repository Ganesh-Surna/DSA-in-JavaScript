/*
Problem:
You are given a string. You need to return the power-set (in any order) of the string.
Note: The string s contains lowercase letter of alphabet.

Input: s = a
Output: ["","a"]
Explanation: empty string and "a" are only sets.

Input: s = abc
Output: ["", "a", "ab", "abc", "ac", "b", "bc", "c"]
Explanation: empty string, a, ab, abc, ac, b, bc, c are the sets.

Constraints:
1 ≤ s.length() ≤ 10
*/

// variant 1:
// ✅ TC = O(n * 2^n) - 2^n recursive calls, each with O(n) string concatenation (i.e., O(n) string concatenation at each call - as curr grows from empty string to potentially length n)
// ✅ SC = O(n * 2^n) - recursion stack O(n) + storing 2^n subsets of max length n
function generateSubsets(str) {
  const result = []; // n * 2^n due to storing 2^n subsets of max length n

  function generateHelper(curr, i) {
    if (i === str.length) {
      result.push(curr);
      return;
    }

    generateHelper(curr, i + 1); // Exclude current character
    generateHelper(curr + str[i], i + 1); // Include current character
  }

  generateHelper("", 0);
  return result;
}
// variant 2:
function generateSubsets(str, curr = "", i = 0, res = []) {
  if (i === str.length) {
    res.push(curr);
    return res;
  }

  generateSubsets(str, curr, i + 1, res); // not including the current character, but increasing the i
  generateSubsets(str, curr + str[i], i + 1, res); // including the current character, & increasing the i

  return res;
}
// variant 3:
// ✅ TC = O(n * 2^n) - 2^n recursive calls, each with O(n) string concatenation
// ✅ SC = O(n * 2^n) - call stack stores up to 2^n active calls, each with curr string up to length n
function generateSubsetsLogsEachInLine(str, curr = "", i = 0) {
  if (i === str.length) {
    console.log(curr);
    return;
  }

  generateSubsets(str, curr, i + 1);
  generateSubsets(str, curr + str[i], i + 1);
}

function generateSubsets1(str) {
  if (str.length === 0) return [];

  let res = ["", str];

  for (let i = 0; i < str.length; i++) {
    res = [...res, ...generateSubsets1(str.slice(0, i) + str.slice(i + 1))];
  }

  return Array.from(new Set(res));
}

// Test cases
console.log(generateSubsets("AB")); // ["", "B", "A", "AB"]
console.log(generateSubsets("ABC")); // ["", "C", "B", "BC", "A", "AC", "AB", "ABC"]
console.log(generateSubsets("ABCD")); // ["", "D", "C", "CD", "B", "BD", "BC", "BCD", "A", "AD", "AC", "ACD", "AB", "ABD", "ABC", "ABCD"]

// Example flow of recursive calls for generateSubsets("ABC"):

/*
RECURSIVE CALL STACK FLOW for generateSubsets("ABC"):

Initial call: generateHelper("", 0)
├── generateHelper("", 0) - i=0, str[0]='A'
│   ├── generateHelper("", 1) - i=1, str[1]='B' (exclude 'A')
│   │   ├── generateHelper("", 2) - i=2, str[2]='C' (exclude 'B')
│   │   │   ├── generateHelper("", 3) - i=3, BASE CASE: result.push("") → [""]
│   │   │   └── generateHelper("C", 3) - i=3, BASE CASE: result.push("C") → ["", "C"]
│   │   └── generateHelper("B", 2) - i=2, str[2]='C' (include 'B')
│   │       ├── generateHelper("B", 3) - i=3, BASE CASE: result.push("B") → ["", "C", "B"]
│   │       └── generateHelper("BC", 3) - i=3, BASE CASE: result.push("BC") → ["", "C", "B", "BC"]
│   └── generateHelper("A", 1) - i=1, str[1]='B' (include 'A')
│       ├── generateHelper("A", 2) - i=2, str[2]='C' (exclude 'B')
│       │   ├── generateHelper("A", 3) - i=3, BASE CASE: result.push("A") → ["", "C", "B", "BC", "A"]
│       │   └── generateHelper("AC", 3) - i=3, BASE CASE: result.push("AC") → ["", "C", "B", "BC", "A", "AC"]
│       └── generateHelper("AB", 2) - i=2, str[2]='C' (include 'B')
│           ├── generateHelper("AB", 3) - i=3, BASE CASE: result.push("AB") → ["", "C", "B", "BC", "A", "AC", "AB"]
│           └── generateHelper("ABC", 3) - i=3, BASE CASE: result.push("ABC") → ["", "C", "B", "BC", "A", "AC", "AB", "ABC"]

FINAL RESULT: ["", "C", "B", "BC", "A", "AC", "AB", "ABC"]

KEY INSIGHTS:
1. Each recursive call makes TWO branches: exclude current char vs include current char
2. The "exclude" branch is processed first (left subtree), then "include" branch (right subtree)
3. This creates a binary tree with 2^n leaf nodes (where n = string length)
4. The order of results follows a specific pattern due to the recursion order
5. Each path from root to leaf represents one subset
6. The depth of recursion equals the string length (n)
7. Total calls = 2^(n+1) - 1 (including the initial call)
*/
