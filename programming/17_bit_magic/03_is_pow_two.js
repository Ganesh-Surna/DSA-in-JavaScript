// Note: Powers of 2 have EXACTLY ONE bit set to 1, all others are 0
// n & (n-1) will unset the last(rightmost) set bit (i.e., set it to 0)

// TC = O(1)
// SC = O(1)
function isPowTwo(n){
    if(n===0) return false;
    return (n & (n-1)) === 0;
}

function isPowTwoSimply(n){
    return n>0 && (n & (n-1)) === 0;
}


console.log(isPowTwo(1)) // true (2^0)
console.log(isPowTwo(0)) // false
console.log(isPowTwo(2)) // true
console.log(isPowTwo(4)) // true
console.log(isPowTwo(6)) // false
console.log(isPowTwo(8)) // true

// Example flow:
// Let's understand how (n & (n-1)) === 0 works for powers of 2
//
// Case 1: n = 8 (power of 2)
// Binary of 8:     1000
// Binary of 7:     0111
// 8 & 7:           0000 (result is 0, so 8 is a power of 2)
//
// Case 2: n = 6 (NOT a power of 2)
// Binary of 6:     0110
// Binary of 5:     0101
// 6 & 5:           0100 (result is NOT 0, so 6 is NOT a power of 2)
//
// Case 3: n = 16 (power of 2)
// Binary of 16:    10000
// Binary of 15:    01111
// 16 & 15:         00000 (result is 0, so 16 is a power of 2)
//
// Why does this work?
// - Powers of 2 have EXACTLY ONE bit set to 1, all others are 0
// - When we subtract 1 from a power of 2, we flip all bits from the rightmost 1 onwards
// - This means the rightmost 1 becomes 0, and all bits to its right become 1
// - When we do n & (n-1), the result is 0 because there are no overlapping 1's
//
// For non-powers of 2:
// - They have multiple bits set to 1
// - Subtracting 1 only affects the rightmost 1 and bits to its right
// - The leftmost 1's remain unchanged
// - So n & (n-1) will have at least one 1 remaining (result ≠ 0)
//
// Time Complexity: O(1) - constant time bitwise operations
// Space Complexity: O(1) - no extra space needed

// Test with more examples
console.log("Is 32 a power of 2?", isPowTwo(32)); // true (2^5)
console.log("Is 64 a power of 2?", isPowTwo(64)); // true (2^6)
console.log("Is 63 a power of 2?", isPowTwo(63)); // false
console.log("Is 128 a power of 2?", isPowTwo(128)); // true (2^7)
console.log("Is 255 a power of 2?", isPowTwo(255)); // false