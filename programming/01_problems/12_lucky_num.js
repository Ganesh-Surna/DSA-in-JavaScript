/**
 * @param {number} n
 * @returns {boolean}
 */

class Solution {
  isLucky(n) {
    let k = 2; // (remove every 2nd number)
    if (n % k === 0) return 0;

    while (k <= n) {
      if (n % k === 0) return 0;
      n = n - Math.floor(n / k); // adjusting the n to correct position after removing Math.floor(n/k)
      k = k + 1;
    }
    return 1;
  }
}

// Idea for this problem:
//
// A lucky number is defined by a sieve-like process:
// 1. Start with a list of natural numbers beginning with 1.
// 2. Remove every 2nd number (all even numbers).
// 3. From the remaining numbers, remove every 3rd number.
// 4. Continue this process: at the k-th step, remove every k-th remaining number.
// 5. If a number survives all rounds, it is called a lucky number.
//
// To check if a number n is lucky:
// - Simulate the process by repeatedly removing every k-th number and adjusting n's position accordingly.
// - If n is ever removed (n % k == 0), it is not lucky.
// - If k exceeds n, n survives and is lucky.
//
// Explanation:
// - At each step, n is updated to its new position after removals.
// - If n is never removed in any round, it is a lucky number.
//
// Example:
// - For n = 5:
//   - Remove every 2nd: 1, 3, 5, 7, ... (5 remains)
//   - Remove every 3rd: 1, 3, 7, ... (5 is removed in this round)
//   - So, 5 is not a lucky number.
