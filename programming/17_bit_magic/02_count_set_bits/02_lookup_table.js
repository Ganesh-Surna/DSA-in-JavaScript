let tbl = [];

// Initialize the lookup table
function initialize() {
  tbl[0] = 0; // 0 contains 0 set bits

  // Initialize the lookup table for 8-bit numbers
  for (let i = 1; i < 256; i++) { 
    tbl[i] = tbl[i & (i - 1)] + 1; // i contains (set bits of(i-1)) + 1
  }
}

// TC = O(1)
function countSetBits(n){
    // (255 in binary: 00...11111111) 8-1's, 24-0's
    // tbl[n & 255] --> count of set bits in last 8 bits
    // tbl[(n >> 8) & 255] --> ... in next 8 bits
    // tbl[(n >> 16) & 255] --> ... in next 8 bits
    // tbl[(n >> 24) & 255] --> ... in next 8 bits
    // so, we are adding the count of set bits of all 4 parts of n
    return tbl[n & 255] + tbl[(n >> 8) & 255] + tbl[(n >> 16) & 255] + tbl[(n >> 24) & 255];
}

// Example flow:
// Let's say n = 1234567890 (in binary: 01001001100101100000001011010010)
// 
// Step 1: n & 255 (last 8 bits)
//   1234567890 & 255 = 1234567890 & 00000000000000000000000011111111
//   = 00000000000000000000000011010010 (last 8 bits: 210 in decimal)
//   tbl[210] = 4 (210 has 4 set bits: 11010010)
//
// Step 2: (n >> 8) & 255 (next 8 bits)
//   1234567890 >> 8 = 00000000000000000100100110010110 (shifted right by 8)
//   (1234567890 >> 8) & 255 = 00000000000000000100100110010110 & 00000000000000000000000011111111
//   = 00000000000000000000000010010110 (next 8 bits: 150 in decimal)
//   tbl[150] = 4 (150 has 4 set bits: 10010110)
//
// Step 3: (n >> 16) & 255 (next 8 bits)
//   1234567890 >> 16 = 00000000000000000000000010010011 (shifted right by 16)
//   (1234567890 >> 16) & 255 = 00000000000000000000000010010011 & 00000000000000000000000011111111
//   = 00000000000000000000000010010011 (next 8 bits: 147 in decimal)
//   tbl[147] = 3 (147 has 3 set bits: 10010011)
//
// Step 4: (n >> 24) & 255 (first 8 bits)
//   1234567890 >> 24 = 00000000000000000000000000000001 (shifted right by 24)
//   (1234567890 >> 24) & 255 = 00000000000000000000000000000001 & 00000000000000000000000011111111
//   = 00000000000000000000000000000001 (first 8 bits: 1 in decimal)
//   tbl[1] = 1 (1 has 1 set bit: 00000001)
//
// Total set bits = 4 + 4 + 3 + 1 = 12
//
// Why 255?
// - 255 in binary is 11111111 (8 bits all set to 1)
// - When we do n & 255, we extract only the last 8 bits of n
// - This is equivalent to n % 256, but using bitwise AND is faster
//
// Why n >> 8, n >> 16, n >> 24?
// - We shift right by 8 bits to move to the next group of 8 bits
// - Since we're working with 32-bit integers, we need 4 groups of 8 bits
// - n >> 8: moves from bits 0-7 to bits 8-15
// - n >> 16: moves from bits 0-7 to bits 16-23  
// - n >> 24: moves from bits 0-7 to bits 24-31
// - This allows us to process the entire 32-bit number in chunks of 8 bits

// Test the function
initialize();
console.log("Set bits in 1234567890:", countSetBits(1234567890)); // Should output 12
console.log("Set bits in 255:", countSetBits(255)); // Should output 8
console.log("Set bits in 0:", countSetBits(0)); // Should output 0
console.log("Set bits in 1:", countSetBits(1)); // Should output 1
