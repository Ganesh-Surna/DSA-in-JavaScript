// A number is said to be sparse if no two or more consecutive bits are set in the binary representation.
// Given a number N, check whether it is sparse or not.

// Expected Complexities
// TC: O(1)
// SC: O(1)

function isSparse1(n) {
    // if n is sparse, then n & (n >> 1) will be 0
    return (n & (n >> 1)) === 0;
}
// How does this work?
// If adjacent bits are set, then n & (n >> 1) will be non-zero. 
// See why?

// Ex 1:
// n = 6 (110)
// n >> 1 = 3 (011)
// n & (n >> 1) = 110 & 011 = 010 = 2 (non-zero)
// So, 6 is not a sparse number.

// Ex 2:
// n = 5 (101)
// n >> 1 = 2 (010)
// n & (n >> 1) = 101 & 010 = 000 = 0 (zero)
// So, 5 is a sparse number.

function isSparse2(n) {
    let lastBit = 0
    while(n > 0){
        if((n & 1) === 1 && lastBit === 1){
            return false
        }
        lastBit = n & 1
        n = n >> 1
    }
    
    return true
}