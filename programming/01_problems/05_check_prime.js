export function checkPrime() {
  console.log("******* START of checkPrime ********");
  // ✅ TC= O(√n)
  // ✅ SC = O(1)
  function checkPrimeFun1(n) {
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

  console.log(checkPrimeFun1(47)); // true (correct)
  console.log("******* END of checkPrime ********");
}

// Idea for this problem:
//
// A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.
//
// To check if a number n is prime:
// 1. If n <= 1, it's not prime.
// 2. If n is 2 or 3, it's prime.
// 3. If n is divisible by 2 or 3, it's not prime.
// 4. For numbers greater than 3, check divisibility from 5 up to √n, only for numbers of the form 6k ± 1 (since all primes > 3 are of this form).
//
// This reduces the number of checks and improves efficiency.
//
// Explanation:
//
// - Any composite number n must have a factor less than or equal to √n, so we only need to check up to √n.
// - Numbers divisible by 2 or 3 are quickly eliminated.
// - The 6k ± 1 optimization skips unnecessary checks, as all primes greater than 3 can be written as 6k ± 1.
//
// Example:
// - For n = 47:
//   - 47 is not divisible by 2 or 3.
//   - Check 5 and 7 (since 5*5 <= 47 and 7*7 > 47): 47 is not divisible by either.
//   - So, 47 is prime.