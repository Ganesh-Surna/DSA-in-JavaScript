/* Problem 1: Josephus Problem (Zero Based)
    Josephus problem is a theoretical problem related to a certain elimination game.
    There are n people in a circle, numbered from 0 to n-1.
    Every kth person is eliminated until only one person remains.
    Find the position of the last remaining person. 
*/

// Input: n = 5, k = 3
// Output: 3
// Explanation: The safe position is 3.

// ✅ TC = O(n)  ( T(n) = T(n-1) + 1 --> O(n) )
// ✅ SC = O(n)
function josephusZeroBased(n, k){
    if(n===1){
        return 0
    }
    
    return ((k+josephusZeroBased(n-1, k))%n)
}

let n1 = 4, k1=3 // 1
n1 = 5, k1=3 // 3  (from above testcase jos(4, 3) = 1, so jos(5,3) = (3+jos(4, 3))%5 = 3
console.log(josephusZeroBased(n1, k1))

// Generalized explanation of the logic?

// 🎯 CORE IDEA: After killing the kth person, positions get re-mapped
// 
// Let's understand with example: n=5, k=3
// Initial circle: [0, 1, 2, 3, 4]
// 
// Step 1: Kill person at position (k-1) = (3-1) = 2
// After killing: [0, 1, X, 3, 4]  (X = killed person)
// 
// 🚀 POSITION MAPPING LOGIC:
// - Person at position k becomes the NEW position 0
// - Person at position k+1 becomes the NEW position 1  
// - Person at position k+2 becomes the NEW position 2
// - And so on...
// 
// In our example (k=3):
// Old Position → New Position
// 3 → 0  (k becomes 0)
// 4 → 1  (k+1 becomes 1)
// 0 → 2  (k+2 becomes 2, but wraps around due to modulo)
// 1 → 3  (k+3 becomes 3, but wraps around due to modulo)
// 
// 📐 FORMULA DERIVATION:
// If we know the answer for (n-1) people, call it 'prev'
// Then for n people: answer = (k + prev) % n
// 
// Why? Because:
// 1. We kill person at position (k-1)
// 2. Person at position k becomes new position 0
// 3. So we add k to the previous answer to get the new position
// 4. Use modulo n to handle wrapping around the circle
// 
// 🔄 RECURSIVE RELATIONSHIP:
// jos(n,k) = (k + jos(n-1,k)) % n
// 
// Base case: jos(1,k) = 0 (only one person left, at position 0)


/* Problem 2: Josephus Problem (One Based)
    Josephus problem is a theoretical problem related to a certain elimination game.
    There are n people in a circle, numbered from 1 to n.
    Every kth person is eliminated until only one person remains.
    Find the position of the last remaining person. 
*/

// Input: n = 5, k = 3
// Output: 3
// Explanation: The safe position is 3.

// ✅ TC = O(n)  ( T(n) = T(n-1) + 1 --> O(n) )
// ✅ SC = O(n)
function josephusOneBased(n, k){
    if(n===1){
        return 1
    }
    
    return 1 + (k-1+josephusOneBased(n-1, k))%n
}

let n = 4, k=3 // 1
n = 5, k=3 // 4  (from above testcase jos(4, 3) = 1, so jos(5,3) = 1+(3-1+jos(4, 3))%5 = 4
console.log(josephusOneBased(n, k))

// Generalized explanation of the logic?

// 🎯 CORE IDEA: One-based version (positions 1 to n) with position re-mapping
// 
// Let's understand with example: n=5, k=3
// Initial circle: [1, 2, 3, 4, 5]
// 
// Step 1: Kill person at position k = 3
// After killing: [1, 2, X, 4, 5]  (X = killed person)
// 
// 🚀 POSITION MAPPING LOGIC (One-based):
// - Person at position k+1 becomes the NEW position 1
// - Person at position k+2 becomes the NEW position 2
// - Person at position k+3 becomes the NEW position 3
// - And so on, with wrapping around
// 
// In our example (k=3):
// Old Position → New Position
// 4 → 1  (k+1 becomes 1)
// 5 → 2  (k+2 becomes 2)
// 1 → 3  (k+3 becomes 3, but wraps around due to modulo)
// 2 → 4  (k+4 becomes 4, but wraps around due to modulo)
// 
// 📐 FORMULA DERIVATION:
// If we know the answer for (n-1) people, call it 'prev'
// Then for n people: answer = 1 + (k-1 + prev) % n
// 
// Why this formula?
// 1. We kill person at position k
// 2. Person at position k+1 becomes new position 1
// 3. So we add (k-1) to the previous answer to get the new position
// 4. Use modulo n to handle wrapping around the circle
// 5. Add 1 because we're converting from 0-based to 1-based indexing
// 
// 🔄 RECURSIVE RELATIONSHIP:
// jos(n,k) = 1 + (k-1 + jos(n-1,k)) % n
// 
// Base case: jos(1,k) = 1 (only one person left, at position 1)
// 
// 💡 KEY DIFFERENCE from zero-based:
// - Zero-based: jos(n,k) = (k + jos(n-1,k)) % n
// - One-based:  jos(n,k) = 1 + (k-1 + jos(n-1,k)) % n
// The extra "1 +" and "(k-1)" handle the 1-based indexing conversion
