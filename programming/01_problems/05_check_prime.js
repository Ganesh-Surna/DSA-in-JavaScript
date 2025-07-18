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
