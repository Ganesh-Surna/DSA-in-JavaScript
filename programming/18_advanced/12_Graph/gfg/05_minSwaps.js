function minSwaps(arr) {
    const n = arr.length;

    // Step 1: store value with original index
    const arrPos = arr.map((val, idx) => [val, idx]);

    // Step 2: sort by value
    arrPos.sort((a, b) => a[0] - b[0]);

    // Step 3: visited array
    const visited = new Array(n).fill(false);
    let swaps = 0;

    // Step 4: find cycles
    for (let i = 0; i < n; i++) {
        // If already visited or in correct position
        if (visited[i] || arrPos[i][1] === i) continue;

        let cycleSize = 0;
        let j = i;

        // Follow the cycle
        while (!visited[j]) {
            visited[j] = true;
            j = arrPos[j][1];
            cycleSize++;
        }

        if (cycleSize > 1) swaps += (cycleSize - 1);
    }

    return swaps;
}

// ✅ Examples
console.log(minSwaps([2, 8, 5, 4]));       // 1
console.log(minSwaps([10, 19, 6, 3, 5]));  // 2
console.log(minSwaps([1, 3, 4, 5, 6]));    // 0
