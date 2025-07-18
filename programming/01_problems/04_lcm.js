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
