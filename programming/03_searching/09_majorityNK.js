// Given an array arr and an element k. The task is to find the count of elements 
// in the array that appear more than n/k times and n is length of arr.


class Solution {
  // ✅ A Map can offer better performance for large datasets compared to a standard object.
  countOccurence1(arr, k) {
    const freq = new Map();
    const threshold = Math.floor(arr.length / k);
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
      const currentCount = freq.get(arr[i]) || 0;
      freq.set(arr[i], currentCount + 1);

      // Just counting once when the element's count just passed the threshold, if it is already passed the threshold we do not count it again
      if (currentCount + 1 > threshold && currentCount === threshold) {
        count++;
      }
    }
    return count;
  }

  // Takes more time than above "countOccurence1" because of the extra loop on freq Map
  countOccurence2(arr, k) {
    const freq = new Map();
    const threshold = Math.floor(arr.length / k);
    let count = 0;

    // First pass: count frequencies
    for (const num of arr) {
      freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Second pass: check frequencies against threshold
    for (const [num, cnt] of freq) {
      if (cnt > threshold) {
        count++;
      }
    }

    return count;
  }

  // Standard Object is less performant than Map for large datasets
  countOccurence3(arr, k) {
    // your code here
    const freq = {};
    const threshold = Math.floor(arr.length / k);

    for (let i = 0; i < arr.length; i++) {
      freq[arr[i]] = (freq[arr[i]] || 0) + 1;
    }

    let count = 0;
    for (const key in freq) {
      if (freq[key] > threshold) {
        count++;
      }
    }
    return count;
  }
}
