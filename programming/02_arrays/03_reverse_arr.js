export function reverseArray() {
  console.log("******* START of reverseArray ********");
  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function reverseArr(a) {
    let start = 0, end = a.length - 1;
    while (start < end) {
      // Swapping in one line
      [a[start], a[end]] = [a[end], a[start]];
      start++;
      end--;
    }
    console.log(a);
  }
  console.log("-- reverseArr([1,2,3,4,5]) result:");
  reverseArr([1,2,3,4,5]);
  console.log("-- reverseArr([1,2,3,4]) result:");
  reverseArr([1,2,3,4]);
  console.log("-- reverseArr([1]) result:");
  reverseArr([1]);

  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function reverseArr2(a) {
    console.log(a.reverse());
  }
  console.log("-- reverseArr2([1,2,3,4,5]) result:");
  reverseArr2([1,2,3,4,5]);
  console.log("-- reverseArr2([1,2,3,4]) result:");
  reverseArr2([1,2,3,4]);
  console.log("-- reverseArr2([1]) result:");
  reverseArr2([1]);

  console.log("******* END of reverseArray ********");
}