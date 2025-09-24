/* Problem:
Given two integer arrays a1[] and a2[]. Sort the first array a1[] such that all the relative positions of the elements in the first array are the same as the elements in the second array a2[].

Note: If elements are repeated in the second array, consider their first occurrence only. Elements not in a2[] should appear in a1[] at the end in ascending order.

Example 1:
Input: a1[] = [2, 1, 2, 3, 4], a2[] = [2, 1, 2]
Output: [2, 2, 1, 3, 4]
Explanation: Array elements of a1[] are sorted according to a2[]. So 2 comes first then 1 comes, now we append remaining elements of a1[] in sorted order.

Example 2:
Input: a1[] = [4, 1, 3, 3, 2], a2[] = [3, 1]
Output: [3, 3, 1, 2, 4]
Explanation: Elements 3 and 1 come first as per a2[]. Others (2, 4) are sorted and placed after.

Example 3:
Input: a1[] = [5, 1, 2, 3, 4], a2[] = [3, 1, 2]
Output: [3, 1, 2, 4, 5]
Explanation: Elements 3, 1, 2 come first as per a2[]. Others (4, 5) are sorted and placed after.

Example 4:
Input: a1[] = [1, 2, 3, 4, 5], a2[] = [5, 4, 3, 2, 1]
Output: [5, 4, 3, 2, 1]
Explanation: All elements are in a2[], so they appear in the order specified by a2[].

Constraints:
1 ≤ arr1.size(), arr2.size() ≤ 10^6
1 ≤ arr1[i], arr2[i] ≤ 10^6

Expected Time Complexity: O(n log n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n log n) --> Due to sorting remaining elements
// ✅ SC = O(n) --> Hash map for frequencies + result arrays
function relativeSort(a1, a2) {
    // 1. Count frequency of elements in a1
    let freq = new Map()
    for(let i=0; i<a1.length; i++){
        freq.set(a1[i], (freq.get(a1[i]) || 0) + 1)
    }
    
    // 2. Process elements in a2 order and add to result
    let res = []
    for(let i=0; i<a2.length; i++){
        if(freq.has(a2[i])){
            let count = freq.get(a2[i])
            while(count > 0){
                res.push(a2[i])
                count--
            }
            
            freq.delete(a2[i]) // Remove processed element from freq map
        }
    }
    
    // 3. Collect remaining elements (not in a2)
    let remaining = []
    for(let [num, count] of freq){
        let c = count
        while(c > 0){
            remaining.push(num)
            c--
        }
    }
    
    // 4. Sort remaining elements in ascending order
    remaining.sort((a, b) => a - b)
    
    // 5. Copy result elements back to a1
    for(let i=0; i<res.length; i++){
        a1[i] = res[i]
    }
    
    // 6. Copy remaining elements to a1 after result elements
    for(let i=0; i<remaining.length; i++){
        a1[res.length + i] = remaining[i]
    }
}

// ✅ Test Cases
let a1 = [2, 1, 2, 3, 4];
let a2 = [2, 1, 2];
relativeSort(a1, a2);
console.log(a1); // [2, 2, 1, 3, 4]

a1 = [4, 1, 3, 3, 2];
a2 = [3, 1];
relativeSort(a1, a2);
console.log(a1); // [3, 3, 1, 2, 4]

a1 = [5, 1, 2, 3, 4];
a2 = [3, 1, 2];
relativeSort(a1, a2);
console.log(a1); // [3, 1, 2, 4, 5]

a1 = [1, 2, 3, 4, 5];
a2 = [5, 4, 3, 2, 1];
relativeSort(a1, a2);
console.log(a1); // [5, 4, 3, 2, 1]

/*🎯 CORE IDEA: Instead of using complex sorting algorithms, we use HASH MAP for frequency counting and process elements in the order specified by a2[], then append remaining elements in sorted order.

📋 STEP-BY-STEP FLOW:

1️⃣ FREQUENCY COUNTING:
   - Count frequency of each element in a1[] using hash map
   - This allows us to know how many times each element appears

2️⃣ PROCESS IN A2 ORDER:
   - Iterate through a2[] in order
   - For each element in a2[], add it to result array its frequency times
   - Remove processed element from frequency map to avoid reprocessing

3️⃣ COLLECT REMAINING ELEMENTS:
   - Elements not in a2[] remain in frequency map
   - Collect all remaining elements with their frequencies

4️⃣ SORT REMAINING ELEMENTS:
   - Sort remaining elements in ascending order
   - This ensures elements not in a2[] appear in sorted order at the end

5️⃣ CONSTRUCT FINAL ARRAY:
   - Copy result elements (from a2 order) to a1[]
   - Copy remaining elements (sorted) to a1[] after result elements

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n log n) due to sorting remaining elements only
2️⃣ HASH MAP: O(1) frequency lookup and update
3️⃣ ORDER PRESERVATION: Maintains relative order as specified by a2[]
4️⃣ SIMPLICITY: Clear separation of elements in a2[] vs remaining elements

💡 KEY INSIGHTS:

1️⃣ FREQUENCY TRACKING: Hash map efficiently counts element occurrences
2️⃣ ORDER PROCESSING: Process elements in a2[] order to maintain relative positions
3️⃣ REMAINING HANDLING: Elements not in a2[] are sorted and appended
4️⃣ IN-PLACE MODIFICATION: Directly modify a1[] to avoid extra space

🎯 WHY HASH MAP WORKS?
- O(1) average time for frequency counting and lookup
- Efficient removal of processed elements
- Handles duplicate elements correctly by tracking frequencies

🎯 ALGORITHM INTUITION:
Think of it as a "custom sorting" where we first place elements in the order specified by a2[],
then append any remaining elements in their natural sorted order.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
a1 = [2, 1, 2, 3, 4], a2 = [2, 1, 2]     (n=5, m=3)

🎯 GOAL: Sort a1[] according to a2[] order!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: Count frequencies in a1[]
freq = {2: 2, 1: 1, 3: 1, 4: 1}

📋 STEP 2: Process elements in a2[] order

ITERATION 0: a2[0] = 2
freq.has(2) = true, count = 2
Add 2 to result: res = [2, 2]
freq.delete(2) → freq = {1: 1, 3: 1, 4: 1}

ITERATION 1: a2[1] = 1
freq.has(1) = true, count = 1
Add 1 to result: res = [2, 2, 1]
freq.delete(1) → freq = {3: 1, 4: 1}

ITERATION 2: a2[2] = 2
freq.has(2) = false (already deleted)
Skip this element

📊 Result after a2[] processing: res = [2, 2, 1]

📋 STEP 3: Collect remaining elements
remaining = [3, 4] (from freq = {3: 1, 4: 1})

📋 STEP 4: Sort remaining elements
remaining.sort() → remaining = [3, 4]

📋 STEP 5: Construct final array
a1[0] = res[0] = 2
a1[1] = res[1] = 2
a1[2] = res[2] = 1
a1[3] = remaining[0] = 3
a1[4] = remaining[1] = 4

🏆 FINAL RESULT: a1 = [2, 2, 1, 3, 4]

🎯 VERIFICATION:
- Elements in a2[] order: 2, 1 ✓
- Frequencies preserved: 2 appears twice, 1 appears once ✓
- Remaining elements sorted: 3, 4 ✓

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
a1 = [4, 1, 3, 3, 2], a2 = [3, 1]     (n=5, m=2)

🔍 Process:

STEP 1: freq = {4: 1, 1: 1, 3: 2, 2: 1}

STEP 2: Process a2[] order
- a2[0] = 3: res = [3, 3], freq = {4: 1, 1: 1, 2: 1}
- a2[1] = 1: res = [3, 3, 1], freq = {4: 1, 2: 1}

STEP 3: remaining = [4, 2]
STEP 4: remaining.sort() → [2, 4]
STEP 5: a1 = [3, 3, 1, 2, 4]

🏆 FINAL RESULT: [3, 3, 1, 2, 4] ✓

─────────────────────────────────────────

📊 EDGE CASE:
a1 = [1, 2, 3, 4, 5], a2 = [5, 4, 3, 2, 1]     (all elements in a2[])

🔍 Process:

STEP 1: freq = {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}

STEP 2: Process a2[] order
- a2[0] = 5: res = [5], freq = {1: 1, 2: 1, 3: 1, 4: 1}
- a2[1] = 4: res = [5, 4], freq = {1: 1, 2: 1, 3: 1}
- a2[2] = 3: res = [5, 4, 3], freq = {1: 1, 2: 1}
- a2[3] = 2: res = [5, 4, 3, 2], freq = {1: 1}
- a2[4] = 1: res = [5, 4, 3, 2, 1], freq = {}

STEP 3: remaining = [] (no remaining elements)
STEP 4: remaining.sort() → [] (empty)
STEP 5: a1 = [5, 4, 3, 2, 1]

🏆 FINAL RESULT: [5, 4, 3, 2, 1] ✓

🔍 WHY THIS WORKS:
1️⃣ FREQUENCY MAP efficiently tracks element counts
2️⃣ ORDER PROCESSING maintains relative positions as specified
3️⃣ REMAINING HANDLING ensures all elements are included
4️⃣ SORTING ensures remaining elements are in ascending order

💡 KEY INSIGHT:
We don't need to sort the entire array - we only sort the elements that aren't in a2[]!
This gives us O(n log n) complexity instead of O(n²) for naive approaches.

🎯 TIME COMPLEXITY ANALYSIS:
- Frequency counting: O(n)
- Processing a2[] order: O(m) where m = a2.length
- Collecting remaining: O(n)
- Sorting remaining: O(k log k) where k = remaining elements
- Final construction: O(n)
- Total: O(n + m + k log k) = O(n log n) in worst case

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map: O(n) for frequencies
- Result array: O(n) for processed elements
- Remaining array: O(n) for remaining elements
- Total: O(n)

🎯 MATHEMATICAL ANALYSIS:
- Elements in a2[]: Processed in O(m) time
- Elements not in a2[]: Sorted in O(k log k) time where k ≤ n
- Total elements: n = elements_in_a2 + elements_not_in_a2
- Worst case: k = n (no elements in a2[]), so O(n log n)

🎯 EDGE CASES HANDLED:
- All elements in a2[]: No remaining elements to sort
- No elements in a2[]: All elements sorted in ascending order
- Duplicate elements: Frequencies preserved correctly
- Empty arrays: Handled gracefully

🎯 COMPARISON WITH OTHER APPROACHES:
- Naive sorting: O(n²) - check every pair
- Custom comparator: O(n log n) but complex logic
- Hash map approach: O(n log n) with clear separation of concerns

🎯 OPTIMIZATION TECHNIQUES:
- Use Map instead of Object for better performance
- Delete processed elements to avoid reprocessing
- Sort only remaining elements, not entire array
- In-place modification to save space

*/