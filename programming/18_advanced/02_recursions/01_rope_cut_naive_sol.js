// Problem: Given a rope of length n, 
// you need to cut the rope into maximum possible pieces of lengths either a, b or c.

// Input: n = 5, a = 2, b = 5, c = 1
// Output: 5
// Explanation: The rope can be cut into 5 pieces of length 1 each.

// Input: n = 23, a = 12, b = 9, c = 11
// Output: 2
// Explanation: The rope can be cut into 2 pieces of length 12 and 11.

// Input: n = 5, a = 4, b = 2, c = 6
// Output: -1
// Explanation: The rope can't be cut into pieces of length 4, 2 or 6.

// Input: n = 9, a = 2, b = 2, c = 2
// Output: -1
// Explanation: The rope can't be cut into pieces of length 2, 2 or 2.

// Naive Solution: (There exist a linear sol using DP)
// ✅ TC = O(3^n)
// ✅ SC = O(n)
function ropeCuttingMaxPieces(n, a, b, c){
    if(n<0) return -1
    if(n===0) return 0
    
    let res = Math.max(ropeCuttingMaxPieces(n-a, a, b, c),ropeCuttingMaxPieces(n-b, a, b, c),ropeCuttingMaxPieces(n-c, a, b, c))
    
    if(res === -1) return -1
    
    return res + 1
}

let n=5, a=2, b=5, c=1; // 5
n=23, a=12, b=9, c=11;  // 2
n=5, a=4, b=2, c=6;     // -1
n=9, a=2, b=2, c=2;     // -1
console.log(ropeCuttingMaxPieces(n, a, b, c))

// ---------------- Pictorial Representation ----------------

// Example 1: n=5, a=2, b=5, c=1
// ropeCuttingMaxPieces(5)
// ├── ropeCuttingMaxPieces(3)   [cut 2]
// │   ├── ropeCuttingMaxPieces(1)   [cut 2]
// │   │   ├── ropeCuttingMaxPieces(-1) -> -1
// │   │   ├── ropeCuttingMaxPieces(-4) -> -1
// │   │   └── ropeCuttingMaxPieces(0)  -> 0  ✅
// │   │   return 0+1 = 1
// │   ├── ropeCuttingMaxPieces(-2) -> -1
// │   └── ropeCuttingMaxPieces(2)   [cut 1]
// │       ├── ropeCuttingMaxPieces(0) -> 0 ✅
// │       ├── ropeCuttingMaxPieces(-3) -> -1
// │       └── ropeCuttingMaxPieces(1) -> 1 (from above)
// │       return max(0, -1, 1)+1 = 2
// │   return max(1, -1, 2)+1 = 3
// ├── ropeCuttingMaxPieces(0)   [cut 5] -> 0 ✅
// └── ropeCuttingMaxPieces(4)   [cut 1]
//     ├── ropeCuttingMaxPieces(2) -> 2 (from above)
//     ├── ropeCuttingMaxPieces(-1) -> -1
//     └── ropeCuttingMaxPieces(3) -> 3 (from above)
//     return 4
// Final return = max(3, 0, 4)+1 = 5

// ✅ Answer = 5


// Example 2: n=23, a=12, b=9, c=11
// ropeCuttingMaxPieces(23)
// ├── ropeCuttingMaxPieces(11)  [cut 12]
// │   ├── ropeCuttingMaxPieces(-1) -> -1
// │   ├── ropeCuttingMaxPieces(2)  -> -1
// │   └── ropeCuttingMaxPieces(0)  -> 0 ✅
// │   return 1
// ├── ropeCuttingMaxPieces(14)  [cut 9]
// │   ├── ropeCuttingMaxPieces(2) -> -1
// │   ├── ropeCuttingMaxPieces(5) -> -1
// │   └── ropeCuttingMaxPieces(3) -> -1
// │   return -1
// └── ropeCuttingMaxPieces(12)  [cut 11]
//     ├── ropeCuttingMaxPieces(0) -> 0 ✅
//     ├── ropeCuttingMaxPieces(3) -> -1
//     └── ropeCuttingMaxPieces(1) -> -1
//     return 1
// Final return = max(1, -1, 1)+1 = 2

// ✅ Answer = 2


// Example 3: n=5, a=4, b=2, c=6
// ropeCuttingMaxPieces(5)
// ├── ropeCuttingMaxPieces(1) [cut 4] -> -1
// ├── ropeCuttingMaxPieces(3) [cut 2]
// │   ├── ropeCuttingMaxPieces(-1) -> -1
// │   ├── ropeCuttingMaxPieces(1)  -> -1
// │   └── ropeCuttingMaxPieces(-3) -> -1
// │   return -1
// └── ropeCuttingMaxPieces(-1) [cut 6] -> -1
// Final return = -1

// ✅ Answer = -1


// Example 4: n=9, a=2, b=2, c=2
// ropeCuttingMaxPieces(9)
// ├── ropeCuttingMaxPieces(7)
// │   ├── ropeCuttingMaxPieces(5)
// │   │   ├── ropeCuttingMaxPieces(3)
// │   │   │   ├── ropeCuttingMaxPieces(1)
// │   │   │   │   ├── ropeCuttingMaxPieces(-1) -> -1
// │   │   │   │   └── ropeCuttingMaxPieces(-1) -> -1
// │   │   │   return -1
// │   │   └── ropeCuttingMaxPieces(1) -> -1
// │   │   return -1
// │   └── ropeCuttingMaxPieces(3) -> -1
// │   return -1
// └── (similar branches, all lead to -1)
// Final return = -1

// ✅ Answer = -1
