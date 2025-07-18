// ✅ TC= O(log n)
// ✅ SC = O(1)
function countOccurrences(arr, x) {
  let firstIdx = firstOccurIdx(arr, x);

  if (firstIdx === -1) return 0;

  let lastIdx = lastOccurIdx(arr, x, firstIdx); // start from first occurrence index to reduce left side

  return lastIdx - firstIdx + 1;
}
console.log(countOccurrences([5, 10, 10, 10, 10, 10, 40], 10));


// ************ HELPER FUNCTIONS **************
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
  
function lastOccurIdx(arr, x, start = 0) {
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
  
      if (arr[mid] === x) {
        if (mid === arr.length - 1 || arr[mid + 1] !== x) {
          // Means this is the last occurrence index
          return mid;
        }
  
        start = mid + 1; // Searching in remaining left part
      } else if (arr[mid] > x) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
  
    return -1;
}
