// 2. Count Set Bits (i.e., number of 1's in binary representation of n)



// I. Optimzed Sol 1:
// ✅ Brain Kerningham's Algorithm
// Idea: Traverse only through the set bits
// TC = O(set Bits count)
function countSetBitsOptimized(n){
    let count = 0;
    while(n>0){
        n = n & (n-1); // Remove the last set bit (i.e., unset the last set bit) (means set last set bit as 0)
        count++;
    }
    return count;
}

// What (n-1) will do?
// Ans: all bits after last set bit will be set & last set bit will be unset
/*
    n=40 (binary: 101000)
    n-1=39 (binary: 100111) --> 
*/

// How n & (n-1) will unset last set bit?
/*
    n=40 (binary: 101000)
    n-1=39 (binary: 100111) --> all bits after last set bit will be set & last set bit will be unset
    n & (n-1) = 101000 & 100111 = 100000 = 32
*/

// II. Sol 2:
// TC = O(d) --> d = number of bits in n from last to MSB(Most Significant Bit --> first set bit from left)
// SC = O(1)
function countSetBits(n){
    let count = 0;
    while(n>0){
        if((n&1) !==0) count++;  // count if last bit is 1
        n = n>>1; // Remove the last bit 
    }
    return count;
}

// Example with flow(clearly):
/*
Let's trace through countSetBitsOptimized1(13):

n = 13 (decimal)
Binary representation: 1101

Step-by-step flow:
1. n = 13, count = 0
   - n & 1 = 1101 & 0001 = 0001 = 1 (≠ 0)
   - count++ → count = 1
   - n = n >> 1 = 1101 >> 1 = 0110 = 6

2. n = 6, count = 1
   - n & 1 = 0110 & 0001 = 0000 = 0 (= 0)
   - count remains 1
   - n = n >> 1 = 0110 >> 1 = 0011 = 3

3. n = 3, count = 1
   - n & 1 = 0011 & 0001 = 0001 = 1 (≠ 0)
   - count++ → count = 2
   - n = n >> 1 = 0011 >> 1 = 0001 = 1

4. n = 1, count = 2
   - n & 1 = 0001 & 0001 = 0001 = 1 (≠ 0)
   - count++ → count = 3
   - n = n >> 1 = 0001 >> 1 = 0000 = 0

5. n = 0, count = 3
   - While loop condition (n > 0) is false
   - Return count = 3

Result: 13 has 3 set bits in its binary representation (1101)
*/

// Test the function
console.log("countSetBitsOptimized1(13):", countSetBitsOptimized1(13)); // Expected: 3
console.log("countSetBitsOptimized1(7):", countSetBitsOptimized1(7));  // Expected: 3 (111)
console.log("countSetBitsOptimized1(8):", countSetBitsOptimized1(8));  // Expected: 1 (1000)
console.log("countSetBitsOptimized1(15):", countSetBitsOptimized1(15)); // Expected: 4 (1111)