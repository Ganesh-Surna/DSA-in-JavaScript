/* *** 342. Power of Four ***

Given an integer n, return true if it is a power of four. Otherwise, return false.
An integer n is a power of four, if there exists an integer x such that n == 4x.

Example 1:
Input: n = 16
Output: true

Example 2:
Input: n = 5
Output: false

Example 3:
Input: n = 1
Output: true

Constraints:
-231 <= n <= 231 - 1
 
Follow up: Could you solve it without loops/recursion?

 */

/**
 * Efficient Solution using Bit Manipulation
 * 
 * A number is a power of 4 if and only if:
 * 1. It's greater than 0
 * 2. It's a power of 2 (only one bit is set)
 * 3. The set bit is at an even position (0, 2, 4, 6, ...) (0-based)
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
function isPowerOfFour(n) {
    // Check if n is positive and is a power of 2
    // A power of 2 has exactly one bit set: n & (n-1) == 0
    if (n <= 0 || (n & (n - 1)) !== 0) {
        return false;
    }
    
    // Check if the set bit is at an even position
    // For powers of 4, the set bit should be at positions 0, 2, 4, 6, ...
    // We can use a mask 0x55555555 (binary: 0101 0101 0101 0101 0101 0101 0101 0101)
    // This mask has 1s only at even positions (0-based)
    return (n & 0x55555555) !== 0;
}

function isPowerOfFourSimply(n){
    // return n>0 && (n & (n-1)) === 0 && (n & 0x55555555) !== 0  // OR
    return n>0 && (n & (n-1)) === 0 && (n & 0x55555555) === n // 0x55555555 is a mask with 1s only at even positions (0-based)
}

/**
 * Alternative Solution using Math
 * 
 * Time Complexity: O(1) - but involves floating point operations
 * Space Complexity: O(1)
 */
function isPowerOfFourMath(n) {
    if (n <= 0) return false;
    
    // Take log base 4 and check if it's an integer
    const log4 = Math.log(n) / Math.log(4);
    return Math.abs(log4 - Math.round(log4)) < 1e-10;
}

/**
 * Solution using Loop (for comparison)
 * 
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function isPowerOfFourLoop(n) {
    if (n <= 0) return false;
    
    while (n % 4 === 0) {
        n = n / 4;
    }
    
    return n === 1;
}

// Test cases
function testIsPowerOfFour() {
    const testCases = [
        { input: 16, expected: true },
        { input: 5, expected: false },
        { input: 1, expected: true },
        { input: 4, expected: true },
        { input: 64, expected: true },
        { input: 256, expected: true },
        { input: 0, expected: false },
        { input: -4, expected: false },
        { input: 8, expected: false },  // power of 2 but not 4
        { input: 32, expected: false }, // power of 2 but not 4
        { input: 1024, expected: false } // power of 2 but not 4
    ];
    
    console.log("Testing isPowerOfFour (Bit Manipulation):");
    testCases.forEach(({ input, expected }) => {
        const result = isPowerOfFour(input);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        console.log(`${status}: ${input} -> ${result} (expected: ${expected})`);
    });
    
    console.log("\nTesting isPowerOfFourMath:");
    testCases.forEach(({ input, expected }) => {
        const result = isPowerOfFourMath(input);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        console.log(`${status}: ${input} -> ${result} (expected: ${expected})`);
    });
    
    console.log("\nTesting isPowerOfFourLoop:");
    testCases.forEach(({ input, expected }) => {
        const result = isPowerOfFourLoop(input);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        console.log(`${status}: ${input} -> ${result} (expected: ${expected})`);
    });
}

// Explanation of the bit manipulation approach
console.log("=== Power of Four - Efficient Solution ===\n");

console.log("Bit Manipulation Approach:");
console.log("1. First check if n > 0 and is a power of 2");
console.log("   - A power of 2 has exactly one bit set");
console.log("   - Use n & (n-1) == 0 to check this");
console.log("2. Then check if the set bit is at an even position");
console.log("   - Powers of 4 have the set bit at positions 0, 2, 4, 6, ...");
console.log("   - Use mask 0x55555555 (0101...0101) to check even positions");
console.log("3. If both conditions are true, n is a power of 4\n");

console.log("Examples:");
console.log("4 = 100 (binary) -> bit at position 2 ✓");
console.log("16 = 10000 (binary) -> bit at position 4 ✓");
console.log("8 = 1000 (binary) -> bit at position 3 ✗ (odd position)");
console.log("32 = 100000 (binary) -> bit at position 5 ✗ (odd position)\n");

// Run tests
testIsPowerOfFour();

