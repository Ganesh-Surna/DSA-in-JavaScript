// ✅ Exponential Search - For Infinite Sized Array

function exponentialSearch(arr, x) {
    let n = arr.length;
    
    if (n === 0)
        return -1;

    // Find range for binary search by repeatedly doubling i
    let i = 1;
    while (i < n && arr[i] < x){
        i = 2 * i;
    }

    // Perform binary search on the range [i/2, Math.min(i, n-1)]
    let left = Math.floor(i / 2);
    let right = Math.min(i, n - 1);

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (arr[mid] === x) return mid;
        else if (arr[mid] < x) left = mid + 1;
        else right = mid - 1;
    }

    return -1;
}