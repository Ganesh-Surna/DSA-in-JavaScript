// I. Recursive Sol:




// II. Iterative Sol:
// ✅ TC = O(n × 2^n)
// ✅ SC = O(1)
function subsets(str) {
    let n = str.length;
    // let powSize = Math.pow(2, n); // 2^n - total number of possible subsets
    let powSize = 1 << n; // 2^n - using left shift (more efficient than Math.pow)
  
    // Iterate through all numbers from 0 to 2^n-1
    // Each number represents a unique combination of elements
    for (let i = 0; i < powSize; i++) {
      let curr = "";
  
      // For each number i, we will check each bit of i
      // Each bit position corresponds to a character position in the string
      for (let j = 0; j < n; j++) {
        // Check if the jth bit is set in i using (1<<j) as a mask
        // 1<<j creates a number with only the jth bit set
        // Example: 1<<0 = 1, 1<<1 = 2, 1<<2 = 4
        if ((i & (1 << j)) !== 0) {
          // if the jth bit is set in i, then add the jth character to the current subset
          curr += str[j];
        }
      }
      console.log(curr);
    }
}

// Key concepts:
// 1. Why 2^n subsets?
//    - For each character, we have 2 choices: include it or exclude it
//    - Total combinations = 2 × 2 × 2 × ... × 2 (n times) = 2^n
//
// 2. How bit manipulation works:
//    - Each bit in the binary representation of i represents a character
//    - Bit 0 (rightmost) → character at index 0
//    - Bit 1 → character at index 1, and so on
//    - 1 = include, 0 = exclude
//
// 3. Example with "abc" (n=3):
//    i=0: 000 → [] (no characters)
//    i=1: 001 → ["a"] (only first character)
//    i=2: 010 → ["b"] (only second character)
//    i=3: 011 → ["a","b"] (first and second characters)
//    i=4: 100 → ["c"] (only third character)
//    i=5: 101 → ["a","c"] (first and third characters)
//    i=6: 110 → ["b","c"] (second and third characters)
//    i=7: 111 → ["a","b","c"] (all characters)
//
// 4. Time Complexity: O(n × 2^n) - for each of 2^n subsets, we check n bits
//    Space Complexity: O(n) - for storing current subset (excluding output storage)