// Given a number N. 
// Find the maximum number of consecutive 1s in the binary representation of N.

// Expected Complexities
// TC: O(log N)
// SC: O(1)

function maxConsecutiveOnes1(n) {
    let max = 0;
    while (n > 0) {
        n = n & (n << 1);
        max++;
    }
    return max;
}
// How does this work(With examples)?
/*
The trick n = n & (n << 1) shrinks every run of consecutive 1s by exactly one bit
on each iteration. After k iterations, any original run of length L survives iff L >= k.
Therefore, the number of iterations until n becomes 0 equals the length of the longest
consecutive-1s run.

Why the '&' with (n << 1) shrinks runs:
- A bit at position i remains 1 only if bit i in n is 1 AND bit i-1 in n is also 1.
- This effectively removes the rightmost 1 from every contiguous block of 1s each round.

Example 1:
n = 0b1110111
iter 1:   n     1110111
          n<<1  1101110
          &     1100110
iter 2:   n     1100110
          n<<1  1001100
          &     1000100
iter 3:   n     1000100
          n<<1  0001000
          &     0000000
=> max = 3 (longest block of 1s is '111')

Example 2:
n = 0b1010011110
iter 1:   1010011110
          0100111100
          & 0000011100
iter 2:   0000011100
          0000111000
          & 0000011000
iter 3:   0000011000
          0000110000
          & 0000010000
iter 4:   0000010000
          0000100000
          & 0000000000
=> max = 4 (longest block is '1111')
*/


function maxConsecutiveOnes2(n) {
    if (n === 0) return 0;
    let max_consec_ones = 0;
    let c = 0;
    while (n > 0) {
        c = (n & 1) === 1 ? c + 1 : 0;
        max_consec_ones = Math.max(max_consec_ones, c);
        n = n >>> 1;
    }
    return max_consec_ones;
}