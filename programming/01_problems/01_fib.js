// TC --> O(n)
// SC --> O(1)
export function fibSeries() {
  console.log("******* START of fibSeries ********");
  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function fun(n) {
    let a = 0;
    let b = 1;
    console.log(a);
    console.log(b);
    for (let i = 2; i < n; i++) {
      let temp = a;
      a = b;
      b = b + temp;
      console.log(b);
    }
  }

  fun(11);
  console.log("******* END of fibSeries ********");
}
