// 🕒 TC (Worst/Avg/Best): O(n log n)/O(n log n)/O(n log n)
// 💾 SC: O(n)

class Solution {
  // 🕒 TC: O(n log n)
  // 💾 SC: O(n)
  // Returns the number of inversions in the array
  countInversions(arr, l = 0, r = arr.length - 1) {
    let count = 0;
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      count += this.countInversions(arr, l, m);
      count += this.countInversions(arr, m + 1, r);
      count += this.countMerge(arr, l, m, r);
    }
    return count;
  }

  // 🕒 TC: O(n)
  // 💾 SC: O(n)
  // Merges two sorted parts and counts inversions
  countMerge(arr, l, m, r) {
    let left = arr.slice(l, m + 1);
    let right = arr.slice(m + 1, r + 1);
    
    let i = 0, j = 0, k = l, invCount = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
        invCount += (left.length - i);
      }
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
    return invCount;
  }

  // OR 
  countMerge1(arr, l, m, r) {
    const len1 = m + 1;
    const len2 = r+1;
    let i = l,
      j = m + 1;

    const c = [];

    let thisCount = 0;
    while (i < len1 && j < len2) {
      if (arr[i] <= arr[j]) {
        c.push(arr[i]);
        i++;
      } else if (arr[i] > arr[j]) {
        c.push(arr[j]);
        thisCount += len1 - i;
        j++;
      }
    }
    while (i < len1) {
      c.push(arr[i]);
      i++;
    }
    while (j < len2) {
      c.push(arr[j]);
      j++;
    }
    
    for(let i=0; i<c.length; i++){
        arr[l+i] = c[i]
    }

    return thisCount;
  }
}

const sol = new Solution();
console.log(sol.countInversions([40, 20, 10, 30])); // Output: 4
