// 1. Is Kth Bit Set?

// For 0-based indexing from right (we use k instead of k-1)
function isKthBitSetOpt0BasedSol1(n, k) {
    // Left shift 1 by k times --> 2^k (kth bit is set) 
    // (i.e., 1 << k = 2^k --> so,  1 << 1 = 2^(1))
    let x = (1 << k);
    // Bitwise AND of n and x will be non-zero if the kth bit is set, otherwise it will be zero.
    if((n & x) !==0) return true;
    return false;
}
function isKthBitSetOpt0BasedSol2(n, k) {
    // Right shift n by k times --> floor of (n/2^k)
    let x = (n >> k); // (i.e., floor of n/2^k)
    if((x & 1) !==0) return true;
    return false;
}



// NOTE: THE BELOW ALL ARE CONSIDERED (1-based indexing from right)

// I. Optimized Sol 1:
// TC = O(1)
// SC = O(1)
function isKthBitSetOptimized1(n, k) {
    // Left shift 1 by (k-1) times --> 2^(k-1) (kth bit is set) 
    // (i.e., 1 << k = 2^k --> so,  1 << 1 = 2^(1))
    let x = (1 << (k-1));
    // Bitwise AND of n and x will be non-zero if the kth bit is set, otherwise it will be zero.
    if((n & x) !==0) return true;
    return false;
}

// I. Optimized Sol 2:
// TC = O(1)
// SC = O(1)
function isKthBitSetOptimized2(n, k) {
    // Right shift n by (k-1) times --> floor of (n/2^(k-1))
    let x = (n >> (k-1)); // (i.e., floor of n/2^(k-1) )
    if((x & 1) !==0) return true;
    return false;
}


// II. Naive Sol 1:
// TC = O(k)
function isKthBitSetNaive2(n, k) {
    // Divide n by 2 --> (k-1) times
    for(let i=0; i<(k-1); i++){
        n = Math.floor(n/2)
    }
    if((n & 1) !==0) return true;
    return false;
}
// Idea for Naive Sol 1:
// n = 10 (binary: 1010)
// k = 2
// i=0 i<(k-1)✅ --> n = 10/2 = 5 (binary: 101)
// i=1 i<(k-1)❌
// n&1 --> 5(binary: 0101) & 1(binary: 0001) = 1 (non-zero) ✅
// So, the kth bit is set


// II. Naive Sol 2:
// TC = O(k)
// SC = O(1)
function isKthBitSetNaive2(n, k) {
    let x = 1;
    for(let i=0; i<(k-1); i++){
        x = x*2;
    }
    if((n & x) !==0) return true;
    return false;
}
// Idea:
// n & 1(i.e., 2^0) --> to check if the last bit is set or not
// n & 2(i.e., 2^1) --> to check if the second last bit is set or not
// n & 4(i.e., 2^2) --> to check if the third last bit is set or not
// n & 8(i.e., 2^3) --> to check if the fourth last bit is set or not
// n & 16(i.e., 2^4) --> to check if the fifth last bit is set or not
// ... and so on

// n & 2^(k-1) --> to check if the kth bit is set or not

// Bitwise AND of n and 2^(k-1) will be non-zero if the kth bit is set, otherwise it will be zero.

// Example:
// n = 10 (binary: 1010)
// k = 2
// 2^(k-1) = 2^1 = 2 (binary: 10)
// n & 2^(k-1) = 1010 & 10 = 0010 = 2 (non-zero) 
// So, the kth bit is set