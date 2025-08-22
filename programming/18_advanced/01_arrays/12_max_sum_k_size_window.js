// Problem 1: Maximum sum of k size window
// Problem 2: Maximum XOR of k size window
// Problem 3: Maximum product of k size window
// Problem 4: Maximum average of k size window

// ✅ TC = O(n)
// ✅ SC = O(1)
function maxKWindowSum(arr, k) {
  let n = arr.length;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += arr[i];
  }
  let max_sum = sum;

  for (let i = k; i < n; i++) {
    // Remove the first element of the previous window (i-k)
    // Add the current element to the window (i)
    // Update the maximum sum
    sum += arr[i] - arr[i - k];
    max_sum = Math.max(max_sum, sum);
  }

  console.log(max_sum);
}

let arr = [1, 8, 30, -5, 20, 7], k = 3; // 45 = 30-5+20
arr = [5, -10, 6, 90, 3], k = 2; // 96 = 6+90
maxKWindowSum(arr, k);


// ✅ TC = O(n)
// ✅ SC = O(1)
function maxKWindowXOR(arr, k) {
  let n = arr.length;
  let currentXOR = 0;
  
  // Calculate initial window XOR
  for (let i = 0; i < k; i++) {
    currentXOR ^= arr[i];
  }
  let max_xor = currentXOR;

  for (let i = k; i < n; i++) {
    // Remove the first element of previous window and add current element
    // XOR operation: a ^ b ^ a = b (removing element)
    currentXOR ^= arr[i - k];  // Remove first element
    currentXOR ^= arr[i];      // Add current element
    max_xor = Math.max(max_xor, currentXOR);
  }

  console.log(max_xor);
  return max_xor;
}

// ✅ TC = O(n)
// ✅ SC = O(1)
function maxKWindowProduct(arr, k) {
  let n = arr.length;
  let currentProduct = 1;
  
  // Calculate initial window product
  for (let i = 0; i < k; i++) {
    currentProduct *= arr[i];
  }
  let max_product = currentProduct;

  for (let i = k; i < n; i++) {
    // Remove the first element (avoid division by zero)
    if (arr[i - k] !== 0) {
      currentProduct /= arr[i - k];
      currentProduct *= arr[i];  // Add current element
    } else {
      // If we're removing zero, recalculate the entire product
      currentProduct = 1;
      for (let j = i - k + 1; j <= i; j++) {
        currentProduct *= arr[j];
      }
      // DON'T multiply by arr[i] again - it's already included!
    }
    
    max_product = Math.max(max_product, currentProduct);
  }

  console.log(max_product);
  return max_product;
}

// ✅ TC = O(n)
// ✅ SC = O(1)
function findMaxAverage(nums, k) {
  let sum = 0;
  for (let i = 0; i < k; i++) sum += nums[i];
  let maxSum = sum;
  for (let i = k; i < nums.length; i++) {
      // Remove the first element of the previous window (i-k)
      // Add the current element to the window (i)
      // Update the maximum sum
      sum += nums[i] - nums[i - k];
      maxSum = Math.max(maxSum, sum);
  }
  return maxSum / k;
}