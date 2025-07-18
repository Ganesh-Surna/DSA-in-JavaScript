export function moveZerosToEndAll() {
  console.log("******* START of moveZerosToEndAll ********");
  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function moveZerosToEnd(a) {
    let nonZeroCount = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== 0) {
        [a[i], a[nonZeroCount]] = [a[nonZeroCount], a[i]];
        nonZeroCount += 1;
      }
    }
    console.log(a);
  }
  console.log("-- moveZerosToEnd([8,0,5,0,0,7]) result:");
  moveZerosToEnd([8,0,5,0,0,7]);
  console.log("-- moveZerosToEnd([0,0,9,0,9,9]) result:");
  moveZerosToEnd([0,0,9,0,9,9]);
  console.log("-- moveZerosToEnd([10,20]) result:");
  moveZerosToEnd([10,20]);
  console.log("******* END of moveZerosToEndAll ********");
}