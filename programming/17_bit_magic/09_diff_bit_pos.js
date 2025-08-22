// 1. Position of Rightmost Different Bit

// Given two integers m and n , 
// return the position (1-based from the right) of the rightmost bit where they differ in binary,
// or -1 if both are identical.

// TC = O(log n)
// SC = O(1)
function posOfRightMostDiffBit(m, n) {
  if (m === n) return -1;

  let pos = 1;

  // while the rightmost bits are the same (i.e., both are 0 or both are 1)
  while ((n & 1) === (m & 1)) {
    pos++;
    n = n >> 1; // right shift n by 1 bit (i.e., divide n by 2 OR in other words, remove the rightmost bit)
    m = m >> 1; // right shift m by 1 bit (i.e., divide m by 2 OR in other words, remove the rightmost bit)
  }
  return pos;
}
