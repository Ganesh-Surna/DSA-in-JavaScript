// Sieve of Eratosthenes:
// ✅ TC = O(√n * log log √n) (for isPrime with sieve optimization)
// ✅ SC = O(√n)

import readline from "readline";

function withUserInputAndClass() {
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // ✅ TC =  here it's O(√n * √n) = O(n)
  // ✅ SC = O(1) (excluding input)
  class Solution {
    isPrime(n) {
      if (n <= 1) return false;
      if (n <= 3) return true;
      if (n % 2 === 0 || n % 3 === 0) return false;
      for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
      }
      return true;
    }
    exactly3Divisors(n) {
      let count = 0;
      for (let i = 2; i * i <= n; i = i + 1) {
        if (this.isPrime(i)) {
          count += 1;
        }
      }
      return count;
    }
  }

  readlineInterface.question("Enter n: ", (answer) => {
    const n = parseInt(answer, 10);
    const sol = new Solution();
    const result = sol.exactly3Divisors(n);
    console.log(`Count of numbers with exactly 3 divisors up to ${n}:`, result);
    console.log("TC = O(n), SC = O(1)");
    readlineInterface.close();
  });
}

export function exactly3Divisors() {
  // withUserInputAndClass();

  // ✅ TC = O(√n * log log √n) (for isPrime with sieve optimization)
  // ✅ SC = O(√n)
  function exactly3Divisors1(n) {
    if (n < 4) return 0; // No numbers <4 have exactly 3 divisors

    const limit = Math.floor(Math.sqrt(n));
    const sieve = new Array(limit + 1).fill(true);
    sieve[0] = sieve[1] = false;

    // Sieve of Eratosthenes
    for (let i = 2; i * i <= limit; i++) {
      if (sieve[i]) {
        for (let j = i * i; j <= limit; j += i) {
          sieve[j] = false;
        }
      }
    }

    // Count primes p where p² ≤ n
    let count = 0;
    for (let i = 2; i <= limit; i++) {
      if (sieve[i]) {
        count++;
      }
    }

    return count;
  }

  console.log("--> exactly3Divisors Result: ");
  console.log(exactly3Divisors1(10000));
  console.log("TC = O(√n * log log √n), SC = O(√n)");
}
