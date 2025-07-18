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
  // ✅ TC= O(n1/2 * logn)
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
    for (let i = 5; i * i <= n; i = i + 6) {
      while (n % i === 0) {
        console.log(i);
        n = n / i;
      }
      while (n % (i + 2) === 0) {
        console.log(i + 2);
        n = n / (i + 2);
      }
    }
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
        while (n % x == 0) {
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
