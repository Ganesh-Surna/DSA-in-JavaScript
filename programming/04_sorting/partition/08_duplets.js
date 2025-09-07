function findDuplets(arr) {
    const seen = new Set();
    
    for (let num of arr) {
        const complement = -num;
        if (seen.has(complement)) {
            return true;
        }
        seen.add(num);
    }
    
    return false;
}

// Test cases
console.log(findDuplets([1, 2, -1, 3])); // true (1 and -1)
console.log(findDuplets([1, 2, 3, 4]));   // false
console.log(findDuplets([0, 1, 2]));      // true (0 and 0, if zero appears twice)



// Handling Duplicate Zeros:
function findDupletsWithZero(arr) {
    const seen = new Set();
    let zeroCount = 0;
    
    for (let num of arr) {
        if (num === 0) {
            zeroCount++;
            if (zeroCount >= 2) {
                return true;
            }
        } else {
            const complement = -num;
            if (seen.has(complement)) {
                return true;
            }
        }
        seen.add(num);
    }
    
    return false;
}

console.log(findDupletsWithZero([0, 1, 2, 0])); // true (two zeros)