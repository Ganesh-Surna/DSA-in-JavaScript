// Problem 1: Find if there is a subarray with given sum

// ✅ TC = O(n)
// ✅ SC = O(1)
function subArrWithSum(arr, target_sum) {
    let n = arr.length;
    let sum = 0;
    let left = 0;
  
    for (let right = 0; right < n; right++) {
      sum += arr[right];
  
      while (sum > target_sum && left < right) {
        sum -= arr[left];
        left++;
      }
  
      if (sum === target_sum) return true;
    }
  
    return false;
  }
  
  let arr = [1, 4, 20, 3, 10, 5], sum = 33; // true <-- [20, 3, 10]
  arr = [1, 4, 0, 0, 3, 10, 5], sum = 7; // true <-- [1, 4, 0, 0, 3]
  arr = [2, 4], sum = 3; // false
  
  console.log(subArrWithSum(arr, sum));
  