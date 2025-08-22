// Algorithm to find two numbers that appear odd number of times in an array
// All other numbers appear even number of times


function oddOccurringNum(arr){
    // Step 1: XOR all elements to get XOR of the two odd occurring numbers
    // Even occurring numbers will cancel out (a^a = 0)
    let x = arr[0]
    for(let i=1; i<arr.length; i++){
        x = x^arr[i]  // x will contain XOR of the two odd occurring numbers
    }
    
    // Step 2: Find the rightmost set bit in x
    // This bit will be different between the two odd occurring numbers
    // k will have only this bit set (e.g., if x=1010, k=0010)
    let k = x & (~(x-1)) // number which only contains single bit set and i.e., corresponding to last set bit of x
    
    // Step 3: Divide array into two groups based on whether this bit is set
    // One group will contain one odd occurring number, other group will contain the other
    let res1 = 0, res2 = 0;
    for(let i=0; i<arr.length; i++){
        if((arr[i] & k) !== 0){
            // if the num has set bit as k (bit is 1)
            res1 = res1 ^ arr[i]  // XOR with first group
        }else{
            // if the num doesn't have this bit set (bit is 0)
            res2 = res2 ^ arr[i]  // XOR with second group
        }
    }
    
    return [res1, res2]  // Return the two odd occurring numbers
}

console.log(oddOccurringNum([4, 4, 3, 4, 5, 5, 4, 6])) // [3, 6]

// Key points:
// 1. XOR Properties:
//    - a^a = 0 (same number XORed with itself gives 0)
//    - a^0 = a (any number XORed with 0 gives the number itself)
//    - a^b^b = a (XOR is associative and commutative)
//
// 2. Why XOR all elements first?
//    - Even occurring numbers cancel out: 4^4^5^5 = 0
//    - Result x = odd1^odd2 (XOR of two odd occurring numbers)
//
// 3. Why find rightmost set bit?
//    - This bit must be different between odd1 and odd2
//    - If odd1 has this bit set, odd2 must not have it (or vice versa)
//    - This allows us to separate them into different groups
//
// 4. How k = x & (~(x-1)) works:
//    - x-1: flips all bits from rightmost 1 onwards
//    - ~(x-1): inverts all bits
//    - x & (~(x-1)): isolates only the rightmost set bit
//    - Example: x=1010, x-1=1001, ~(x-1)=0110, k=0010
//
// 5. Time Complexity: O(n) - single pass through array
//    Space Complexity: O(1) - constant extra space
//
// 6. Example walkthrough:
//    Array: [4,4,3,4,5,5,4,6]
//    Step 1: x = 4^4^3^4^5^5^4^6 = 3^6 = 5 (binary: 101)
//    Step 2: k = 5 & (~4) = 5 & (-5) = 5 & (11111111111111111111111111111011) = 1
//    Step 3: Group by bit 0 (rightmost bit / last bit)
//            Group 1 (bit 0 = 1): 3, 5, 5 → res1 = 3^5^5 = 3
//            Group 2 (bit 0 = 0): 4,4,4,4,6 → res2 = 4^4^4^4^6 = 6
//    Result: [3, 6]