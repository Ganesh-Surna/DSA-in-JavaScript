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