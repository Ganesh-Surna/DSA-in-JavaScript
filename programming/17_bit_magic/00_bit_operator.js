// All bit operators clearly with examples & explanation:

// ========================================
// 1. AND (&) - Bitwise AND
// ========================================
/*
AND operator returns 1 only when both bits are 1
Truth table:
0 & 0 = 0
0 & 1 = 0  
1 & 0 = 0
1 & 1 = 1

Use cases: Check if bit is set, clear specific bits, mask operations
*/

function demonstrateAND() {
    console.log("\n=== AND (&) Operator ===");
    
    let a = 5;  // Binary: 101
    let b = 3;  // Binary: 011
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`b = ${b} (binary: ${b.toString(2)})`);
    console.log(`a & b = ${a & b} (binary: ${(a & b).toString(2)})`);
    
    // Check if specific bit is set
    let num = 13; // 1101
    let bitPosition = 2; // Check 3rd bit (0-indexed)
    let mask = 1 << bitPosition; // 0100
    let isSet = (num & mask) !== 0;
    console.log(`Is bit ${bitPosition} set in ${num}? ${isSet}`);
    
    // Clear specific bit
    let clearBit = num & ~(1 << 1); // Clear 2nd bit
    console.log(`Clear 2nd bit of ${num}: ${clearBit} (binary: ${clearBit.toString(2)})`);
}

// ========================================
// 2. OR (|) - Bitwise OR
// ========================================
/*
OR operator returns 1 when at least one bit is 1
Truth table:
0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1

Use cases: Set specific bits, combine flags
*/

function demonstrateOR() {
    console.log("\n=== OR (|) Operator ===");
    
    let a = 5;  // Binary: 101
    let b = 3;  // Binary: 011
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`b = ${b} (binary: ${b.toString(2)})`);
    console.log(`a | b = ${a | b} (binary: ${(a | b).toString(2)})`);
    
    // Set specific bit
    let num = 8; // 1000
    let setBit = num | (1 << 1); // Set 2nd bit
    console.log(`Set 2nd bit of ${num}: ${setBit} (binary: ${setBit.toString(2)})`);
    
    // Combine flags
    let flag1 = 1;  // 001
    let flag2 = 2;  // 010
    let flag3 = 4;  // 100
    let combined = flag1 | flag2 | flag3;
    console.log(`Combined flags: ${combined} (binary: ${combined.toString(2)})`);
}

// ========================================
// 3. XOR (^) - Bitwise XOR
// ========================================
/*
XOR operator returns 1 when bits are different
Truth table:
0 ^ 0 = 0
0 ^ 1 = 1
1 ^ 0 = 1
1 ^ 1 = 0

Use cases: Toggle bits, find single number, swap without temp
*/

function demonstrateXOR() {
    console.log("\n=== XOR (^) Operator ===");
    
    let a = 5;  // Binary: 101
    let b = 3;  // Binary: 011
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`b = ${b} (binary: ${b.toString(2)})`);
    console.log(`a ^ b = ${a ^ b} (binary: ${(a ^ b).toString(2)})`);
    
    // Toggle specific bit
    let num = 10; // 1010
    let toggleBit = num ^ (1 << 2); // Toggle 3rd bit
    console.log(`Toggle 3rd bit of ${num}: ${toggleBit} (binary: ${toggleBit.toString(2)})`);
    
    // Swap without temporary variable
    let x = 5, y = 10;
    console.log(`Before swap: x = ${x}, y = ${y}`);
    x = x ^ y;
    y = x ^ y;
    x = x ^ y;
    console.log(`After swap: x = ${x}, y = ${y}`);
    
    // Find single number in array where others appear twice
    let arr = [4, 1, 2, 1, 2];
    let single = arr.reduce((acc, num) => acc ^ num, 0);
    console.log(`Single number in [${arr}]: ${single}`);
}

// ========================================
// 4. NOT (~) - Bitwise NOT
// ========================================
/*
NOT operator inverts all bits
~0 = -1 (all 1s in 32-bit)
~1 = -2
~5 = -6

Note: In JavaScript, numbers are 64-bit, but bitwise operations work on 32-bit
*/

function demonstrateNOT() {
    console.log("\n=== NOT (~) Operator ===");
    
    let a = 5;  // Binary: 101
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`~a = ${~a} (binary: ${(~a >>> 0).toString(2)})`);
    
    // Create mask to clear specific bit
    let num = 15; // 1111
    let clearBit = num & ~(1 << 2); // Clear 3rd bit
    console.log(`Clear 3rd bit of ${num}: ${clearBit} (binary: ${clearBit.toString(2)})`);
    
    // Two's complement
    console.log(`Two's complement of ${a}: ${~a + 1}`);
}

// ========================================
// 5. Left Shift (<<) - Bitwise Left Shift
// ========================================
/*
Left shift moves all bits to the left by specified positions
Each shift multiplies by 2
a << b = a * (2^b)

Use cases: Multiplication by powers of 2, creating masks
*/

function demonstrateLeftShift() {
    console.log("\n=== Left Shift (<<) Operator ===");
    
    let a = 5;  // Binary: 101
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`a << 1 = ${a << 1} (binary: ${(a << 1).toString(2)})`);
    console.log(`a << 2 = ${a << 2} (binary: ${(a << 2).toString(2)})`);
    console.log(`a << 3 = ${a << 3} (binary: ${(a << 3).toString(2)})`);
    
    // Create masks
    let mask1 = 1 << 3; // 1000 (8)
    let mask2 = 1 << 5; // 100000 (32)
    console.log(`Mask for bit 3: ${mask1} (binary: ${mask1.toString(2)})`);
    console.log(`Mask for bit 5: ${mask2} (binary: ${mask2.toString(2)})`);
    
    // Multiplication by powers of 2
    console.log(`5 * 8 = ${5 * 8} = ${5 << 3}`);
    console.log(`7 * 16 = ${7 * 16} = ${7 << 4}`);
}

// ========================================
// 6. Right Shift (>>) - Arithmetic Right Shift
// ========================================
/*
Right shift moves all bits to the right by specified positions
Each shift divides by 2 (integer division)
a >> b = Math.floor(a / (2^b))

Preserves sign bit (arithmetic shift)
*/

function demonstrateRightShift() {
    console.log("\n=== Right Shift (>>) Operator ===");
    
    let a = 20;  // Binary: 10100
    let b = -20; // Binary: -10100
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`a >> 1 = ${a >> 1} (binary: ${(a >> 1).toString(2)})`);
    console.log(`a >> 2 = ${a >> 2} (binary: ${(a >> 2).toString(2)})`);
    
    console.log(`b = ${b} (binary: ${b.toString(2)})`);
    console.log(`b >> 1 = ${b >> 1} (binary: ${(b >> 1).toString(2)})`);
    console.log(`b >> 2 = ${b >> 2} (binary: ${(b >> 2).toString(2)})`);
    
    // Integer division by powers of 2
    console.log(`20 / 4 = ${Math.floor(20 / 4)} = ${20 >> 2}`);
    console.log(`-20 / 4 = ${Math.floor(-20 / 4)} = ${-20 >> 2}`);
}

// ========================================
// 7. Unsigned Right Shift (>>>) - Logical Right Shift
// ========================================
/*
Unsigned right shift fills with 0s instead of preserving sign
Always returns positive number
Useful for treating number as unsigned
*/

function demonstrateUnsignedRightShift() {
    console.log("\n=== Unsigned Right Shift (>>>) Operator ===");
    
    let a = -20; // Binary: -10100
    
    console.log(`a = ${a} (binary: ${a.toString(2)})`);
    console.log(`a >> 1 = ${a >> 1} (arithmetic, preserves sign)`);
    console.log(`a >>> 1 = ${a >>> 1} (logical, fills with 0s)`);
    
    // Convert to unsigned 32-bit
    let unsigned = a >>> 0;
    console.log(`Unsigned 32-bit representation: ${unsigned}`);
    console.log(`Binary: ${unsigned.toString(2)}`);
}

// ========================================
// 8. Practical Examples & Common Patterns
// ========================================

function demonstrateCommonPatterns() {
    console.log("\n=== Common Bit Manipulation Patterns ===");
    
    // Check if number is power of 2
    function isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
    }
    
    console.log(`Is 8 power of 2? ${isPowerOfTwo(8)}`);
    console.log(`Is 7 power of 2? ${isPowerOfTwo(7)}`);
    console.log(`Is 16 power of 2? ${isPowerOfTwo(16)}`);
    
    // Get lowest set bit
    function getLowestSetBit(n) {
        return n & (-n);
    }
    
    console.log(`Lowest set bit of 12: ${getLowestSetBit(12)}`);
    console.log(`Lowest set bit of 8: ${getLowestSetBit(8)}`);
    
    // Check if number is even/odd
    function isEven(n) {
        return (n & 1) === 0;
    }
    
    console.log(`Is 10 even? ${isEven(10)}`);
    console.log(`Is 7 even? ${isEven(7)}`);
    
    // Absolute value without branching
    function abs(n) {
        const mask = n >> 31;
        return (n + mask) ^ mask;
    }
    
    console.log(`Absolute value of -15: ${abs(-15)}`);
    console.log(`Absolute value of 20: ${abs(20)}`);
}

// ========================================
// 9. Performance & Best Practices
// ========================================

function demonstratePerformance() {
    console.log("\n=== Performance & Best Practices ===");
    
    // Multiplication vs Left Shift
    let num = 25;
    console.log(`25 * 8 = ${num * 8}`);
    console.log(`25 << 3 = ${num << 3}`);
    
    // Division vs Right Shift
    console.log(`25 / 4 = ${Math.floor(25 / 4)}`);
    console.log(`25 >> 2 = ${25 >> 2}`);
    
    // Modulo by power of 2
    console.log(`25 % 8 = ${25 % 8}`);
    console.log(`25 & 7 = ${25 & 7}`);
    
    // Check if bit is set (more efficient than division)
    let checkNum = 13;
    let bitPos = 2;
    console.log(`Is bit ${bitPos} set in ${checkNum}? ${(checkNum & (1 << bitPos)) !== 0}`);
}

// ========================================
// 10. Run All Demonstrations
// ========================================

function runAllDemonstrations() {
    console.log("🚀 BITWISE OPERATORS COMPLETE GUIDE 🚀");
    console.log("=====================================");
    
    demonstrateAND();
    demonstrateOR();
    demonstrateXOR();
    demonstrateNOT();
    demonstrateLeftShift();
    demonstrateRightShift();
    demonstrateUnsignedRightShift();
    demonstrateCommonPatterns();
    demonstratePerformance();
    
    console.log("\n✅ All bitwise operator demonstrations completed!");
}

// Run the demonstrations
runAllDemonstrations();