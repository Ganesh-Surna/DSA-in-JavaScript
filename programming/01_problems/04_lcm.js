function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function lcm() {
  console.log("******* START of lcm ********");
  // ✅ TC= O(log(min(a,b)))
  // ✅ SC = O(1)
  function fun1(a, b) {
    return (a * b) / gcd(a, b); //--> TC is the TC of gcd only
  }
  console.log("LCM: ", fun1(4, 6));

  // ✅ TC= O(log(min(a,b)))
  // ✅ SC = O(1)
  function fun2(a, b) {
    let [x, y] = [a, b];
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return (x * y) / a;
  }
  console.log("LCM: ", fun2(4, 6));
  console.log("******* END of lcm ********");
}

// Idea for this problem:
//
// The LCM (Least Common Multiple) of two numbers is the smallest number that is a multiple of both numbers.
//
// Key relationship:
// - LCM(a, b) × GCD(a, b) = a × b
// - So, LCM(a, b) = (a × b) / GCD(a, b)
//
// This means if you can compute the GCD efficiently (using the Euclidean algorithm), you can also compute the LCM efficiently.
//
// Explanation:
//
// - The LCM is useful for finding a common time or cycle for two repeating events.
// - By dividing the product of the numbers by their GCD, you avoid counting common factors twice.
//
// Example:
// - LCM(4, 6):
//   - GCD(4, 6) = 2
//   - LCM = (4 × 6) / 2 = 24 / 2 = 12
//   - So, 12 is the smallest number divisible by both 4 and 6.

