export function lastOccurenceIndex() {
    // ✅ TC= O(log n)
    // ✅ SC = O(1)
    function lastOccurIdx(arr, x) {
      let start = 0;
      let end = arr.length - 1;
      while (start <= end) {
        let mid = Math.floor((start + end) / 2);
  
        if (arr[mid] === x) {
          if (mid === arr.length-1 || arr[mid + 1] !== x) {
            // Means this is the last occurrence index
            return mid;
          }
  
          start = mid + 1; // Searching in remaining right part
        } else if (arr[mid] > x) {
          end = mid - 1;
        } else {
          start = mid + 1;
        }
      }
  
      return -1;
    }
    console.log(lastOccurIdx([5, 10, 10, 10, 10, 10, 10, 70], 10));
  }