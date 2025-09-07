// ✅ TC= O(√n)
// ✅ SC = O(1)
function checkPrime(n) {
  if (n <= 1) return false; // 1 and below are not prime
  if (n <= 3) return true; // 2 and 3 are prime

  // Check divisibility by 2 or 3 first (optimization)
  if (n % 2 === 0 || n % 3 === 0) return false;

  // Only check for divisors of form 6k ± 1 up to √n
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
  }
  return true;
}

export function primeFactors() {
  console.log("******* START of primeFactors ********");
  // ✅ TC= O(√n * logn)
  // ✅ SC = O(1)
  function primeFactorsFun2MostEfficient(n) {
    if (n <= 1) return;
    while (n % 2 === 0) {
      console.log(2);
      n = n / 2;
    }
    while (n % 3 === 0) {
      console.log(3);
      n = n / 3;
    }
    for (let i = 5; i * i <= n; i = i + 6) { // TC = O(√n)
      while (n % i === 0) { // TC = O(log n)
        console.log(i);
        n = n / i;
      }
      while (n % (i + 2) === 0) { // TC = O(log n)
        console.log(i + 2);
        n = n / (i + 2);
      }
    }

    // ⭐⭐⭐ If n is still > 3, then it is a prime factor itself
    if (n > 3) {
      console.log(n);
    }
  }
  console.log("--> START primeFactorsFun2MostEfficient result: ");
  primeFactorsFun2MostEfficient(437);

  // ✅ TC= O(n3/2 * logn)
  // ✅ SC = O(1)
  function primeFactorsFun1(n) {
    // n * √n * logn --> O(n3/2 * logn)
    for (let i = 2; i <= n / 2; i++) {
      // TC= O(n/2) --> O(n)
      if (n % i === 0 && checkPrime(i)) {
        // TC= O(√n)
        console.log(i);

        let x = i * i;
        while (n % x === 0) {
          // TC = O(log[base i] n) --> O(log n)
          console.log(i);
          x = x * i;
        }
      }
    }
    if (checkPrime(n)) {
      console.log(n);
    }
  }
  console.log("--> START primeFactorsFun2MostEfficient result: ");
  primeFactorsFun1(315);
  console.log("******* END of primeFactors ********");
}

// Idea for this problem:
//
// Prime factorization is the process of finding which prime numbers multiply together to make the original number.
//
// Methods:
//
// 1. Naive Approach (`primeFactorsFun1`):
//    - Iterate from i = 2 up to n.
//    - For each `i`, first check if it's prime. If it is, then check if it divides `n`.
//    - If both are true, print `i` and keep dividing `n` by `i` to account for repeated factors (e.g., 12 = 2 * 2 * 3).
//    - This is very slow because of the repeated `checkPrime` calls inside the loop.
//
// 2. Efficient Approach (`primeFactorsFun2MostEfficient`):
//    - The key insight is that we don't need a separate primality test for our divisors.
//    - We only need to check for divisors up to `√n`.
//    - Handle divisibility by 2 and 3 separately for optimization.
//    - Then, iterate from 5 with a step of 6 (checking `i` and `i+2`), which covers all other potential prime factors efficiently.
//    - If we find a divisor `i`, we print it and divide `n` by `i` repeatedly until it's no longer divisible.
//    - If `n` is still greater than 3 after the loop, the remaining `n` is a prime factor itself.
//
// Explanation:
//
// - Any composite number `n` has at least one prime factor less than or equal to `√n`.
// - By dividing `n` by its smallest prime factors first (2, 3, then 5, 7, 11, 13...), we ensure that when we find a subsequent divisor `i`, it must be prime. For example, if `n` was divisible by 6, we would have already divided out all its factors of 2 and 3.
//
// Example (Efficient Method):
// - For n = 315:
//   1. `n` is not divisible by 2.
//   2. `n % 3 === 0`. Print 3. `n` becomes 105.
//   3. `105 % 3 === 0`. Print 3. `n` becomes 35.
//   4. Loop starts at `i = 5`. `5*5 <= 35`.
//   5. `35 % 5 === 0`. Print 5. `n` becomes 7.
//   6. The loop continues, but now `i*i` (25) is greater than `n` (7), so the loop terminates.
//   7. After the loop, `n` (which is 7) is > 3, so we print 7.
// - Final Prime factors: 3, 3, 5, 7.
