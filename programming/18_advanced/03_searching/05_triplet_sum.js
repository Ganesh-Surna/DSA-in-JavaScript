/* 
Problem 1: Given a sorted array and a sum, find if there is a triplet with given sum.
*/

// ✅ TC = O(n^2)
// ✅ SC = O(1)
function tripletSum(arr, x) {
  let n = arr.length;

  for (let i = 0; i < n - 2; i++) {
    let st = i + 1,
      end = n - 1;

    while (st < end) {
      let sum = arr[i] + arr[st] + arr[end];
      if (sum === x) {
        // console.log(arr[i], arr[st], arr[end]);
        return true;
      } else if (sum > x) {
        end--;
      } else {
        st++;
      }
    }
  }

  return false;
}

let arr = [2, 3, 4, 8, 9, 20, 40], x = 32; // true
arr = [1, 2, 5, 6], x = 14; // false
console.log(tripletSum(arr, x));

/*
Problem 2: Given an unsorted array and a sum, find if there is a triplet with given sum in O(n^2) time.
*/

// ✅ TC = O(n log n) + O(n^2) = O(n^2)
// ✅ SC = O(1)
function tripletSum(arr, x) {
  // ✅✅✅✅✅✅⭐⭐⭐ Sort the array first (which is just O(n log n) time which is < O(n^2))
  arr.sort((a, b) => a - b);

  let n = arr.length;
  for (let i = 0; i < n - 2; i++) {
    let st = i + 1,end = n - 1;

    while (st < end) {
      let sum = arr[i] + arr[st] + arr[end];
      if (sum === x) {
        return true;
      } else if (sum > x) {
        end--;
      } else {
        st++;
      }
    }
  }
  return false;
}
