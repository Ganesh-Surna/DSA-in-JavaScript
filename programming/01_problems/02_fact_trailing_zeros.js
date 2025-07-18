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

  fun(252);
  console.log("******* END of trailingZerosInFactorial ********");
}

