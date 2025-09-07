/* 
⭐ Problem 1: Given an infinite sorted array, find the first occurrence of the target element.
*/

/*
✅ Approach:
1. Find the range in which the target element is present. (Since the array is infinite, we can't use the length of the array)
2. Apply binary search in the range to find the first occurrence of the target element.
*/

function binarySearchFirstOccurence(arr, x, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === x) {
      if (mid === 0 || arr[mid] !== arr[mid - 1]) {
        return mid;
      }
      end = mid - 1;
    } else if (arr[mid] < x) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

// ✅ TC= O(log pos)
// ✅ SC = O(1)
function infiniteSearch(arr, x) {
  if (arr[0] === x) {
    return 0;
  }

  let i = 1;
  while (arr[i] < x) { // TC = O(log 2*pos) = O(log pos)
    i = i * 2;
  }

  // For first occurrence, we can't use this, because even we found the target element, we don't know if it is the first occurrence or not.
  // if(arr[i]===x){
  //     return i
  // }

  // Math.floor(i/2)+1 --> start of reduced range
  // i-1 --> end of reduced range
  return binarySearch(arr, x, Math.floor(i / 2) + 1, i - 1); // TC = O(log pos)
}

let arr = [
  1, 2, 5, 10, 12, 100, 100, 100, 100, 100, 105, 200, 230, 258, 300, 304, 350,
  359, 400, 425, 469, 500, 503, 600, 699, 700, 755, 766, 801, 890, 891, 905,
  989, 1000,
];
console.log(infiniteSearch(arr, 100)); // 5



/*
⭐Problem 2: Given an infinite sorted array, find the index of the target element.
*/

function binarySearch(arr, x, start, end) {
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === x) {
      return mid;
    } else if (arr[mid] < x) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return -1;
}

// ✅ TC= O(log n)
// ✅ SC = O(1)
// ✅ "Exponential Search Algorithm" - Mainly For Infinite Sized Array
function infiniteSearch1(arr, x) {
  if (arr[0] === x) {
    return 0;
  }

  let i = 1;
  while (arr[i] < x && i < arr.length) { // TC = O(log 2*pos) = O(log pos)
    i = i * 2;
  }

  if (arr[i] === x) {
    return i;
  }

  // Math.floor(i/2)+1 --> start of reduced range
  // i-1 --> end of reduced range
  return binarySearch(arr, x, Math.floor(i / 2) + 1, i - 1); // TC = O(log pos)
}

let arr1 = [
  1, 2, 5, 10, 12, 100, 105, 200, 230, 258, 300, 304, 350, 359, 400, 425, 469,
  500, 503, 600, 699, 700, 755, 766, 801, 890, 891, 905, 989, 1000,
];
console.log(infiniteSearch1(arr1, 100)); // 5
