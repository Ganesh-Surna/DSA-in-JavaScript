// Problem 1: Given an array,
// check if it can be divided into 3 different parts with equal sum.

// ⭐✅ If we just need to check(i.e., don't need to print the parts):
// ✅ TC = O(n)
// ✅ SC = O(1)
function threePartsWithSameSum(arr) {
  let n = arr.length;

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += arr[i];
  }

  // Total sum should be completely divisible by 3
  if (total % 3 !== 0) return false;

  let target_sum = total / 3; // There should be 3 parts with sum = this target sum

  let part_sum = 0;
  let parts_count = 0;

  for (let i = 0; i < n; i++) {
    part_sum += arr[i];

    // When we hit target sum, reset part_sum and count part
    if (part_sum === target_sum) {
      parts_count++;
      part_sum = 0;
    }

    // ⭐ If we found 2 parts and we're not at the end, we have 3 parts
    if (parts_count === 2 && i < n - 1) return true;
  }

  return false;
}

// ⭐✅ If we need to print the parts:
function threePartsWithSameSum(arr) {
  let n = arr.length;

  let total = 0;
  for (let i = 0; i < n; i++) {
    total += arr[i];
  }

  // Total sum should be completely divisible by 3
  if (total % 3 !== 0) return false;

  let target_sum = total / 3; // There should be 3 parts with sum = this target sum

  let parts_count = 0;
  let part_sum = 0;

  // We need to print the parts, so we need to store the start index of each part
  let part_start_idx = 0;
  let res = "";

  for (let i = 0; i < n; i++) {
    part_sum += arr[i];

    if (part_sum === target_sum) {
      parts_count++;
      part_sum = 0;
      res += `From ${part_start_idx} to ${i}\n`;
      part_start_idx = i + 1;
    }
  }

  if (parts_count === 3) {
    console.log(res);
    return true;
  }

  return false;
}

let arr = [5, 2, 6, 1, 1, 1, 1, 4]; // true ( From 0 to 1, From 2 to 3, From 4 to 7)
arr = [3, 2, 5, 1, 1, 5]; // false
arr = [3, 2, 1, 5, 1, 6]; // true (From 0 to 2, From 3 to 4, From 5 to 5)
console.log(threePartsWithSameSum(arr));
