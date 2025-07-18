export function firstOccurenceIndex() {
  // ✅ TC= O(log n)
  // ✅ SC = O(1)
  function firstOccurIdx(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (arr[mid] === x) {
        if (mid === 0 || arr[mid - 1] !== x) {
          // Means this is the first occurrence index
          return mid;
        }

        end = mid - 1; // Searching in remaining left part
      } else if (arr[mid] > x) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return -1;
  }
  console.log(firstOccurIdx([5, 10, 10, 10, 25, 40, 50, 55, 70], 10));
}
