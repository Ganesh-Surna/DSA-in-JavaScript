// You are given two numbers a and b. 
// The task is to count the number of bits needed to be flipped to convert a to b.
// Note : flipping of bit means inverting its value -- changing 1 to 0 and 0 to 1

// Expected Complexities
// TC: O(1)
// SC: O(1)

function countBitsFlip1(a, b) {
    let c = 0
    let x = a ^ b // xor of a and b gives the bits that are different between a and b (1s where bits in a and b are different)
    
    // count the number of 1s in the xor result
    // TC=O(1) only (because only constant number of bits i.e., 32 bits)
    while(x > 0){
        c += 1
        x = x & (x-1)
    }
    
    return c
}


function countBitsToFlip2(a, b) {
    let xor = a ^ b;
    let count = 0;

    while (xor > 0) {
        count += xor & 1;
        xor >>= 1;
    }
    return count;
}