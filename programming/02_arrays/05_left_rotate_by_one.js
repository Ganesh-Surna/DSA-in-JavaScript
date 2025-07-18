function reverse(arr, start, end) {
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]]
        start++;
        end--;
    }
}

function rotateArr(arr, d) {
    let len = arr.length;
    if (len === 0) return arr;
    let rotation = d % len;
    if (rotation === 0) return arr;

    // Step 1: Reverse first d elements
    reverse(arr, 0, rotation - 1);
    // Step 2: Reverse the rest
    reverse(arr, rotation, len - 1);
    // Step 3: Reverse the whole array
    reverse(arr, 0, len - 1);
    return arr;
}