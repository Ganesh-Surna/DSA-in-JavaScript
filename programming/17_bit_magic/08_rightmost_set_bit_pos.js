// 1. Get First Set Bit Position (Rightmost)

// TC = O(log n)
// SC = O(1)
function getFirstSetBit(n) {
    if (n === 0) return 0; // No set bits if n is 0
    let bitPos = 1;

    // while the rightmost bit is not 1
    while ((n & 1) !== 1) {
        bitPos++;
        n = n >> 1; // right shift n by 1 bit (i.e., divide n by 2 OR in other words, remove the rightmost bit)
    }
    return bitPos;
}