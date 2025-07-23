export function trailingZerosInFactorial() {
  console.log("******* START of trailingZerosInFactorial ********");
  // ✅ TC= O(log n)
  // ✅ SC = O(1)
  function fun(n) {
    let res = 0;
    for (let i = 5; i <= n; i = i * 5) {
      res += Math.floor(n / i);
    }
    console.log("Trailing Zeros in Fact: ", res);
  }

  // function fact(n){
  //   let res = 1
  //   while(n>1){
  //     res = res * n
  //     n = n-1
  //   }

  //   return res
  // }

  fun(fact(252));
  console.log("******* END of trailingZerosInFactorial ********");
}

// Idea for this problem:
// The number of trailing zeros in n! (n factorial) is determined by how many times 10 is a factor in the product.
// Since 10 = 2 x 5, and there are always more 2s than 5s in n!, the number of 5s determines the count of trailing zeros.
// So, count how many multiples of 5, 25, 125, etc. are in n (since each contributes at least one 5 to the factorization).

// Explanation:
// For any number n, to find the number of trailing zeros in n!:
// 1. Count how many numbers from 1 to n are divisible by 5 (each adds one 5).
// 2. Count how many are divisible by 25 (each adds an extra 5), by 125, and so on.
// 3. Add up all these counts. This gives the total number of 5s in the factorization, which equals the number of trailing zeros.
// Example: For n = 100, 100/5 = 20, 100/25 = 4, 100/125 = 0. So, 20 + 4 = 24 trailing zeros in 100!.


// Correct Usage:
// You should call fun(252), not fun(fact(252)).
// The beauty of the trailing zeros algorithm is that it avoids computing the factorial entirely.