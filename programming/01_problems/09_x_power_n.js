export function powerXN() {
  console.log("******* START of powerXN ********");
  // ✅ TC= O(log n)
  // ✅ SC = O(1)
  function power1(n, x) {
    let res = 1;
    while (n > 0) {
      if (n % 2 !== 0) {
        res = res * x;
      }
      x = x * x;
      n = Math.floor(n / 2);
    }
    return res;
  }
  const result = power1(5, 2);
  console.log("power1(5, 2) =", result);
  console.log("******* END of powerXN ********");
}


// Idea for this problem:
//
// The goal is to compute x^n (x raised to the power n) efficiently.
//
// Naive approach:
// - Multiply x by itself n times (O(n) time).
//
// Efficient approach (Exponentiation by Squaring):
// - Use the property: x^n = (x^2)^(n/2) if n is even, and x^n = x * (x^2)^(n/2) if n is odd.
// - Repeatedly square x and halve n, multiplying the result by x whenever n is odd.
// - This reduces the number of multiplications to O(log n).
//
// Explanation:
// - At each step, if n is odd, multiply the result by x.
// - Square x and halve n (integer division).
// - Continue until n becomes 0. The result accumulates the answer.
//
// Example:
// - To compute 2^5:
//   - n = 5 (odd): res = 1 * 2 = 2, x = 2 * 2 = 4, n = 2
//   - n = 2 (even): res = 2, x = 4 * 4 = 16, n = 1
//   - n = 1 (odd): res = 2 * 16 = 32, x = 16 * 16 = 256, n = 0
//   - Final result: 32