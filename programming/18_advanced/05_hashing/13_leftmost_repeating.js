
/* Problem:
Find the leftmost repeating element in an array. Return the 1-based index of the first occurrence of the element that appears more than once. If no element repeats, return -1.

Example 1:
Input: arr[] = [1, 5, 3, 4, 3, 5, 6]
Output: 2
Explanation: Element 5 appears at indices 1 and 5 (0-based). The leftmost occurrence is at index 1, so return 2 (1-based).

Example 2:
Input: arr[] = [1, 2, 3, 4]
Output: -1
Explanation: No element repeats, so return -1.

Example 3:
Input: arr[] = [1, 2, 3, 2, 1]
Output: 1
Explanation: Element 2 appears at indices 1 and 3 (0-based). The leftmost occurrence is at index 1, so return 2 (1-based).

Constraints:
1 ≤ n ≤ 10^5
1 ≤ arr[i] ≤ 10^6

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Hash map for storing first occurrences
function firstRepeated(arr) {
    let m = new Map();
    let minIndex = Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        if (m.has(arr[i])) {
            // This element has appeared before, check if it's the smallest index so far
            minIndex = Math.min(minIndex, m.get(arr[i]));
        } else {
            // Store the first occurrence (using 1-based indexing)
            m.set(arr[i], i + 1);
        }
    }
    
    return minIndex === Infinity ? -1 : minIndex;
}

// Alternative approach: Right-to-left traversal
// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Set for tracking seen elements
function firstRepeatedRightToLeft(arr) {
    let seen = new Set();
    let minIndex = -1;
    
    // Traverse from right to left to find the leftmost repeating element
    for (let i = arr.length - 1; i >= 0; i--) {
        if (seen.has(arr[i])) {
            minIndex = i + 1; // 1-based indexing
        } else {
            seen.add(arr[i]);
        }
    }
    
    return minIndex;
}

// ✅ Test Cases
console.log(firstRepeated([1, 5, 3, 4, 3, 5, 6])); // 2
console.log(firstRepeated([1, 2, 3, 4])); // -1
console.log(firstRepeated([1, 2, 3, 2, 1])); // 1
console.log(firstRepeated([10, 5, 3, 4, 3, 5, 6])); // 3

/*🎯 CORE IDEA: Instead of using nested loops (O(n²)), we use HASH MAP to track first occurrences and efficiently find the leftmost repeating element in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ HASH MAP APPROACH (Left-to-Right):
   - Create hash map to store first occurrence index of each element
   - Traverse array from left to right
   - For each element:
     * If already seen: update minimum index if current first occurrence is smaller
     * If not seen: store first occurrence index (1-based)
   - Return minimum index found

2️⃣ SET APPROACH (Right-to-Left):
   - Create set to track seen elements
   - Traverse array from right to left
   - For each element:
     * If already seen: update leftmost repeating index
     * If not seen: add to set
   - Return leftmost repeating index

3️⃣ KEY INSIGHTS:
   - Leftmost repeating element = first occurrence of any repeating element
   - We need to track first occurrence of each element
   - Minimum of all first occurrences of repeating elements gives us the answer

4️⃣ OPTIMIZATION:
   - Single pass through array
   - O(1) hash map operations
   - No need to count frequencies, just track first occurrence

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n²) for nested loops
2️⃣ HASH MAP: O(1) lookup and insertion operations
3️⃣ SINGLE PASS: Process each element exactly once
4️⃣ SPACE TRADE-OFF: O(n) space for O(n) time

💡 KEY INSIGHTS:

1️⃣ FIRST OCCURRENCE TRACKING: Store index of first occurrence of each element
2️⃣ MINIMUM INDEX: Keep track of smallest first occurrence among repeating elements
3️⃣ REPEATING DETECTION: If element seen before, it's repeating
4️⃣ 1-BASED INDEXING: Convert 0-based to 1-based indexing for result

🎯 WHY HASH MAP WORKS?
- We need to quickly check if an element has been seen before
- We need to retrieve the first occurrence index efficiently
- Hash map provides O(1) operations for both requirements

🎯 ALGORITHM INTUITION:
Think of it as keeping a "guest book" where we record the first time each person (element) visits.
When someone visits again, we check if they're the earliest repeating visitor so far.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [1, 5, 3, 4, 3, 5, 6]     (n=7)

🎯 GOAL: Find leftmost repeating element (1-based index)!

🔍 HASH MAP APPROACH (Left-to-Right):

📋 Process each element:

ITERATION 0: i=0, arr[0] = 1
m doesn't have 1
Store first occurrence: m = {1: 1}
minIndex = Infinity

ITERATION 1: i=1, arr[1] = 5
m doesn't have 5
Store first occurrence: m = {1: 1, 5: 2}
minIndex = Infinity

ITERATION 2: i=2, arr[2] = 3
m doesn't have 3
Store first occurrence: m = {1: 1, 5: 2, 3: 3}
minIndex = Infinity

ITERATION 3: i=3, arr[3] = 4
m doesn't have 4
Store first occurrence: m = {1: 1, 5: 2, 3: 3, 4: 4}
minIndex = Infinity

ITERATION 4: i=4, arr[4] = 3
m has 3! (first occurrence at index 3)
minIndex = min(Infinity, 3) = 3
m = {1: 1, 5: 2, 3: 3, 4: 4}

ITERATION 5: i=5, arr[5] = 5
m has 5! (first occurrence at index 2)
minIndex = min(3, 2) = 2
m = {1: 1, 5: 2, 3: 3, 4: 4}

ITERATION 6: i=6, arr[6] = 6
m doesn't have 6
Store first occurrence: m = {1: 1, 5: 2, 3: 3, 4: 4, 6: 7}
minIndex = 2

🏆 FINAL RESULT: minIndex = 2

🎯 VERIFICATION:
- Element 3: first occurrence at index 3, repeats at index 5
- Element 5: first occurrence at index 2, repeats at index 6
- Leftmost repeating: Element 5 at index 2 (1-based) ✓

─────────────────────────────────────────

📊 RIGHT-TO-LEFT APPROACH:
arr = [1, 5, 3, 4, 3, 5, 6]     (n=7)

🔍 Process each element (right to left):

ITERATION 0: i=6, arr[6] = 6
seen doesn't have 6
Add to seen: seen = {6}
minIndex = -1

ITERATION 1: i=5, arr[5] = 5
seen doesn't have 5
Add to seen: seen = {6, 5}
minIndex = -1

ITERATION 2: i=4, arr[4] = 3
seen doesn't have 3
Add to seen: seen = {6, 5, 3}
minIndex = -1

ITERATION 3: i=3, arr[3] = 4
seen doesn't have 4
Add to seen: seen = {6, 5, 3, 4}
minIndex = -1

ITERATION 4: i=2, arr[2] = 3
seen has 3! (repeating element)
minIndex = 2 + 1 = 3
seen = {6, 5, 3, 4}

ITERATION 5: i=1, arr[1] = 5
seen has 5! (repeating element)
minIndex = 1 + 1 = 2
seen = {6, 5, 3, 4}

ITERATION 6: i=0, arr[0] = 1
seen doesn't have 1
Add to seen: seen = {6, 5, 3, 4, 1}
minIndex = 2

🏆 FINAL RESULT: minIndex = 2

─────────────────────────────────────────

📊 NO REPEATING ELEMENTS:
arr = [1, 2, 3, 4]     (n=4)

🔍 HASH MAP APPROACH:
- i=0: 1 → m = {1: 1}
- i=1: 2 → m = {1: 1, 2: 2}
- i=2: 3 → m = {1: 1, 2: 2, 3: 3}
- i=3: 4 → m = {1: 1, 2: 2, 3: 3, 4: 4}

minIndex = Infinity → return -1

🏆 FINAL RESULT: -1 (no repeating elements)

🔍 WHY THIS WORKS:
1️⃣ HASH MAP enables O(1) lookup for first occurrence checking
2️⃣ FIRST OCCURRENCE TRACKING ensures we find leftmost repeating element
3️⃣ MINIMUM INDEX tracking finds the earliest repeating element
4️⃣ SINGLE PASS through array maintains O(n) time complexity

💡 KEY INSIGHT:
We don't need to count frequencies - we just need to track first occurrence
and detect when an element appears again!

🎯 TIME COMPLEXITY ANALYSIS:
- Single pass through array: O(n)
- Hash map operations: O(1) per operation
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map storage: O(n) - at most n distinct elements
- Other variables: O(1)
- Total: O(n)

🎯 COMPARISON OF APPROACHES:

LEFT-TO-RIGHT (Hash Map):
✅ Pros: Intuitive, easy to understand
✅ Pros: Tracks first occurrence directly
❌ Cons: Requires hash map for first occurrence storage

RIGHT-TO-LEFT (Set):
✅ Pros: Simpler data structure (Set vs Map)
✅ Pros: More memory efficient
❌ Cons: Less intuitive logic

🎯 OPTIMIZATION TECHNIQUES:
- Use Map for O(1) first occurrence lookup
- Use Infinity for initial minimum index
- Convert to 1-based indexing at the end
- Single pass through array

*/