
// Idea for this problem:
//
// In a Geometric Progression (GP), each term after the first is found by multiplying the previous term by a constant ratio (r).
//
// The nth term of a GP is given by:
//   nth term = a1 * r^(n-1)
//   - a1: first term
//   - r: common ratio
//   - n: term number (1-based)
//
// Efficient calculation:
// - Instead of multiplying r repeatedly, use fast exponentiation (exponentiation by squaring) to compute r^(n-1) in O(log n) time.
//
// Explanation:
// - If r = 1, all terms are equal to a1.
// - Otherwise, multiply a1 by r raised to the (n-1)th power.
//
// Example:
// - For a1 = 2, r = 3, n = 4:
//   - nth term = 2 * 3^(4-1) = 2 * 27 = 54

class Solution {
    nthTermOfGP(a1, r, n) {
        if (n === 1) return a1;  // r^1-1 => r^0 => 1
        if (r === 1) return a1; // All terms are a1 if r=1

        const power = (base, exp) => {
            let res = 1;
            while (exp > 0) {
                if (exp % 2 === 1) res *= base;
                base *= base;
                exp = Math.floor(exp / 2);
            }
            return res;
        };

        return a1 * power(r, n - 1);
    }
}

