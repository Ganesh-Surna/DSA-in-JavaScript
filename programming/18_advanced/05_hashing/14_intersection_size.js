/* Problem:
Find the size of intersection of two arrays. The intersection size is the count of common elements between the two arrays.

Note: If an element appears multiple times in both arrays, count each occurrence separately.

Example 1:
Input: a[] = [1, 2, 3, 4, 5], b[] = [3, 4, 5, 6, 7]
Output: 3
Explanation: Common elements are 3, 4, 5. Intersection size = 3.

Example 2:
Input: a[] = [1, 2, 2, 3], b[] = [2, 2, 3, 4]
Output: 3
Explanation: 
- Element 2 appears 2 times in both arrays → count 2
- Element 3 appears 1 time in both arrays → count 1
- Total intersection size = 2 + 1 = 3

Example 3:
Input: a[] = [1, 2, 3], b[] = [4, 5, 6]
Output: 0
Explanation: No common elements, intersection size = 0.

Constraints:
1 ≤ a.length, b.length ≤ 10^5
1 ≤ a[i], b[i] ≤ 10^9

Expected Time Complexity: O(n + m)
Expected Auxiliary Space: O(min(n, m))
*/

// ✅ TC = O(n + m) --> O(n) for set creation + O(m) for iteration
// ✅ SC = O(min(n, m)) --> Set stores smaller array
function intersectionSizeSet(a, b) {
    if(a.length < b.length){
        return intersectionSizeSet(b, a) // make sure second arg is smaller
    }
    
    // Add smaller array to set to save space
    let s = new Set(b) // TC = O(m) to add into set
    
    let res = 0
    // Iterate over larger array
    for(let i=0; i<a.length; i++){ // O(n)
        if(s.has(a[i])){
            res++
            // s.delete(a[i]) // Need when no guarantee of distinct elements in array a
        }
    }
    
    return res
}

// ✅ TC = O(n + m) --> O(n) for map creation + O(m) for iteration
// ✅ SC = O(n) --> Map stores larger array frequencies
function intersectionSizeFreqMap(a, b) {
    if (a.length < b.length) {
        return intersectionSizeFreqMap(b, a);
    }
    
    // Use frequency map for larger array
    const freqMap = new Map();
    for (const num of a) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }
    
    let count = 0;
    for (const num of b) {
        if (freqMap.has(num) && freqMap.get(num) > 0) {
            count++;
            freqMap.set(num, freqMap.get(num) - 1);
        }
    }
    
    return count;
}

// ✅ Test Cases
console.log(intersectionSizeSet([1, 2, 3, 4, 5], [3, 4, 5, 6, 7])); // 3
console.log(intersectionSizeFreqMap([1, 2, 2, 3], [2, 2, 3, 4])); // 3
console.log(intersectionSizeSet([1, 2, 3], [4, 5, 6])); // 0
console.log(intersectionSizeFreqMap([1, 1, 2, 2], [1, 2, 2, 3])); // 3

/*🎯 CORE IDEA: Instead of using nested loops (O(n*m)), we use HASH MAPS to efficiently find intersection size by leveraging O(1) lookup operations.

📋 STEP-BY-STEP FLOW:

1️⃣ SET APPROACH (For Distinct Elements):
   - Ensure larger array is processed first
   - Create Set from smaller array for O(1) lookup
   - Iterate through larger array and count matches
   - Space optimized: O(min(n, m))

2️⃣ FREQUENCY MAP APPROACH (For Duplicate Elements):
   - Ensure larger array is processed first
   - Create frequency map from larger array
   - Iterate through smaller array and count matches
   - Decrease frequency when element is found
   - Handles duplicates correctly

3️⃣ SPACE OPTIMIZATION:
   - Always process larger array first
   - Store smaller array in hash structure
   - Minimize space usage to O(min(n, m))

4️⃣ DUPLICATE HANDLING:
   - Set approach: Counts each occurrence in larger array
   - Frequency map: Tracks remaining occurrences
   - Decrease frequency to avoid double counting

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n + m) vs O(n*m) for nested loops
2️⃣ HASH MAP: O(1) lookup operations for intersection checking
3️⃣ SPACE OPTIMAL: Store smaller array to minimize space usage
4️⃣ DUPLICATE SUPPORT: Frequency map handles multiple occurrences

💡 KEY INSIGHTS:

1️⃣ SPACE OPTIMIZATION: Always store the smaller array in hash structure
2️⃣ FREQUENCY TRACKING: Use Map to handle duplicate elements correctly
3️⃣ LOOKUP EFFICIENCY: O(1) hash operations vs O(m) linear search
4️⃣ DUPLICATE COUNTING: Decrease frequency to avoid double counting

🎯 WHY HASH MAP WORKS?
- We need to quickly check if an element exists in the other array
- We need to handle duplicates by tracking remaining occurrences
- Hash map provides O(1) operations for both requirements

🎯 ALGORITHM INTUITION:
Think of it as checking a "guest list" (Set) or "inventory" (Map) to see how many
items from one list appear in another. We optimize by storing the smaller list
and checking against the larger one.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
a = [1, 2, 3, 4, 5]     (n=5, larger array)
b = [3, 4, 5, 6, 7]     (m=5, smaller array)

🎯 GOAL: Find intersection size!

🔍 SET APPROACH (Distinct Elements):

📋 Process:
1. Ensure a.length >= b.length ✓ (both are 5)
2. Create Set from smaller array b: s = {3, 4, 5, 6, 7}
3. Iterate through larger array a:

ITERATION 0: i=0, a[0] = 1
s.has(1) = false → no match
res = 0

ITERATION 1: i=1, a[1] = 2
s.has(2) = false → no match
res = 0

ITERATION 2: i=2, a[2] = 3
s.has(3) = true → match!
res = 1

ITERATION 3: i=3, a[3] = 4
s.has(4) = true → match!
res = 2

ITERATION 4: i=4, a[4] = 5
s.has(5) = true → match!
res = 3

🏆 FINAL RESULT: res = 3

🎯 VERIFICATION:
- Common elements: 3, 4, 5
- Count: 3 ✓

─────────────────────────────────────────

📊 FREQUENCY MAP APPROACH (With Duplicates):
a = [1, 2, 2, 3]     (n=4, larger array)
b = [2, 2, 3, 4]     (m=4, smaller array)

🔍 Process:
1. Ensure a.length >= b.length ✓ (both are 4)
2. Create frequency map from larger array a:
   freqMap = {1: 1, 2: 2, 3: 1}
3. Iterate through smaller array b:

ITERATION 0: num = 2
freqMap.has(2) = true, freqMap.get(2) = 2 > 0
count = 1, freqMap = {1: 1, 2: 1, 3: 1}

ITERATION 1: num = 2
freqMap.has(2) = true, freqMap.get(2) = 1 > 0
count = 2, freqMap = {1: 1, 2: 0, 3: 1}

ITERATION 2: num = 3
freqMap.has(3) = true, freqMap.get(3) = 1 > 0
count = 3, freqMap = {1: 1, 2: 0, 3: 0}

ITERATION 3: num = 4
freqMap.has(4) = false
count = 3

🏆 FINAL RESULT: count = 3

🎯 VERIFICATION:
- Element 2: appears 2 times in both arrays → count 2
- Element 3: appears 1 time in both arrays → count 1
- Total: 2 + 1 = 3 ✓

─────────────────────────────────────────

📊 NO INTERSECTION:
a = [1, 2, 3]     (n=3)
b = [4, 5, 6]     (m=3)

🔍 SET APPROACH:
1. Create Set from b: s = {4, 5, 6}
2. Iterate through a:
   - a[0] = 1: s.has(1) = false
   - a[1] = 2: s.has(2) = false
   - a[2] = 3: s.has(3) = false
3. res = 0

🏆 FINAL RESULT: 0 (no common elements)

🔍 WHY THIS WORKS:
1️⃣ HASH MAP enables O(1) lookup for intersection checking
2️⃣ SPACE OPTIMIZATION by storing smaller array
3️⃣ FREQUENCY TRACKING handles duplicates correctly
4️⃣ SINGLE PASS through both arrays maintains O(n + m) time

💡 KEY INSIGHT:
We don't need to compare every pair of elements - we can use hash maps
to efficiently check membership and handle duplicates!

🎯 TIME COMPLEXITY ANALYSIS:
- Set creation: O(min(n, m))
- Array iteration: O(max(n, m))
- Hash operations: O(1) per operation
- Total: O(n + m)

🎯 SPACE COMPLEXITY ANALYSIS:
- Set/Map storage: O(min(n, m))
- Other variables: O(1)
- Total: O(min(n, m))

🎯 COMPARISON OF APPROACHES:

SET APPROACH:
✅ Pros: Simpler implementation
✅ Pros: Space efficient O(min(n, m))
✅ Pros: Good for distinct elements
❌ Cons: Doesn't handle duplicates correctly

FREQUENCY MAP APPROACH:
✅ Pros: Handles duplicates correctly
✅ Pros: More accurate counting
✅ Pros: Flexible for various use cases
❌ Cons: Uses O(n) space instead of O(min(n, m))

🎯 WHEN TO USE WHICH?

USE SET APPROACH WHEN:
- Arrays contain distinct elements
- Space optimization is critical
- Simple intersection counting needed

USE FREQUENCY MAP APPROACH WHEN:
- Arrays may contain duplicates
- Accurate counting is required
- Need to handle multiple occurrences

🎯 OPTIMIZATION TECHNIQUES:
- Always process larger array first
- Use Set for distinct elements
- Use Map for duplicate handling
- Single pass through both arrays

*/