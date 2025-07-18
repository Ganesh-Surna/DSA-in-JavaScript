export function binarySearch() {
  // ✅ TC= O(log n)
  // ✅ SC = O(1)
  function bSearchIterative(arr, x) {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);

      if (arr[mid] === x) {
        return mid;
      } else if (arr[mid] > x) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }

    return -1;
  }
  console.log(bSearchIterative([5, 10, 25, 40, 50, 55, 70], 10));

  // ✅ TC= O(log n)
  // ✅ SC = O(log n) (due to recursion stack)
  function bSearchRecursive(arr, x, start = 0, end = arr.length - 1) {
    let mid = Math.floor((start + end) / 2);

    if (start > end) return -1;

    if (arr[mid] === x) return mid;

    if (arr[mid] > x) return bSearchRecursive(arr, x, start, mid - 1);

    return bSearchRecursive(arr, x, mid + 1, end);
  }
  console.log(bSearchRecursive([5, 10, 25, 40, 50, 55, 70], 70));
}
