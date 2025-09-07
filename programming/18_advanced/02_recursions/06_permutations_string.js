// Problem: Generate all permutations of a string

// Input: "ABC"
// Output: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA"]

// ✅ TC = O(n!)
// ✅ SC = O(n)
function generatePermutations(str) {
    const result = [];
    const arr = str.split('');
    
    function backtrack(start) {
        if (start === arr.length) {
            result.push(arr.join(''));
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            // Swap characters at positions start and i
            [arr[start], arr[i]] = [arr[i], arr[start]];
            
            // Recursively generate permutations for the rest of the string
            backtrack(start + 1);
            
            // Backtrack: swap back to the original configuration
            [arr[start], arr[i]] = [arr[i], arr[start]];
        }
    }
    
    backtrack(0);
    return result;
}


function permutation(strArr, i=0){
    let n = strArr.length
    
    // Base case: if we've processed all characters except the last one
    // print the current permutation and return
    if(i===n-1){
        console.log(strArr.join(""))
        return
    }
    
    // Try swapping current position (i) with every position from i to n-1
    for(let j=i; j<n; j++){
        [strArr[i], strArr[j]] = [strArr[j], strArr[i]]; // Swap characters at positions i and j
        permutation(strArr, i+1); // Recursively generate permutations for remaining positions
        [strArr[i], strArr[j]] = [strArr[j], strArr[i]]; // Backtrack: restore original positions (undo swap)
    }
}

let s = 'ABCD'
permutation(s.split("")) // Convert string to array and find all permutations

// How & why Backtrack?

// Recursion Tree Call Stack (Vertical Format):
// 
// permutation("ABC", 0)
// ├── i=0, j=0: Swap A↔A (no change)
// │   permutation("ABC", 1)
// │   ├── i=1, j=1: Swap B↔B (no change)
// │   │   permutation("ABC", 2)
// │   │   ├── i=2: Base case → Print "ABC" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   ├── i=1, j=2: Swap B↔C
// │   │   "ABC" → "ACB"
// │   │   permutation("ACB", 2)
// │   │   ├── i=2: Base case → Print "ACB" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   └── Restore: "ACB" → "ABC" (undo swap)
// │       Backtrack to i=0
// │
// ├── i=0, j=1: Swap A↔B
// │   "ABC" → "BAC"
// │   permutation("BAC", 1)
// │   ├── i=1, j=1: Swap A↔A (no change)
// │   │   permutation("BAC", 2)
// │   │   ├── i=2: Base case → Print "BAC" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   ├── i=1, j=2: Swap A↔C
// │   │   "BAC" → "BCA"
// │   │   permutation("BCA", 2)
// │   │   ├── i=2: Base case → Print "BCA" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   └── Restore: "BCA" → "BAC" (undo swap)
// │       Backtrack to i=0
// │
// ├── i=0, j=2: Swap A↔C
// │   "ABC" → "CBA"
// │   permutation("CBA", 1)
// │   ├── i=1, j=1: Swap B↔B (no change)
// │   │   permutation("CBA", 2)
// │   │   ├── i=2: Base case → Print "CBA" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   ├── i=1, j=2: Swap B↔A
// │   │   "CBA" → "CAB"
// │   │   permutation("CAB", 2)
// │   │   ├── i=2: Base case → Print "CAB" ✓
// │   │   └── Backtrack to i=1
// │   │
// │   └── Restore: "CAB" → "CBA" (undo swap)
// │       Backtrack to i=0
// │
// └── Restore: "CBA" → "ABC" (undo swap)
// 
// Output: ABC, ACB, BAC, BCA, CBA, CAB (6 permutations)
// 
// Why backtrack? Each recursive call explores one path, then we must
// restore the original arrangement to explore other paths from the same level.
