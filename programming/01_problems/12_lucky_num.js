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
