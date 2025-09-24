// ✅ TC: O(m+n)
// ✅ SC: O(1) (excluding output array)
// Returns the intersection elements of two sorted arrays (no duplicates in output)
function intersection(a, b) {
  const m = a.length;
  const n = b.length;
  let i = 0,
    j = 0;
  let result = [];

  while (i < m && j < n) {
    // Escaping the duplicates (only 1 element printed that is a[i-1])
    if (i > 0 && a[i] === a[i - 1]) {
      i++;
      continue;
    }

    if (a[i] < b[j]) {
      i++;
    } else if (a[i] > b[j]) {
      j++;
    } else {
      result.push(a[i]);
      i++;
      j++;
    }
  }

  return result;
}

console.log(intersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])); // [3, 4, 5]
