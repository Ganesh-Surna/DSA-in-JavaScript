/* Problem:
Given an array of integers arr[], sort the array according to the frequency of elements, i.e. elements that have higher frequency comes first. If the frequencies of two elements are the same, then the smaller number comes first.

Example 1:
Input: arr[] = [5, 5, 4, 6, 4]
Output: [4, 4, 5, 5, 6]
Explanation: The highest frequency here is 2. Both 5 and 4 have that frequency. Now since the frequencies are the same the smaller element comes first. So 4 4 comes first then comes 5 5. Finally comes 6. The output is 4 4 5 5 6.

Example 2:
Input: arr[] = [9, 9, 9, 2, 5]
Output: [9, 9, 9, 2, 5]
Explanation: The highest frequency here is 3. Element 9 has the highest frequency So 9 9 9 comes first. Now both 2 and 5 have the same frequency. So we print smaller elements first. The output is 9 9 9 2 5.

Example 3:
Input: arr[] = [1, 1, 1, 2, 2, 3]
Output: [1, 1, 1, 2, 2, 3]
Explanation: Element 1 has frequency 3 (highest), element 2 has frequency 2, element 3 has frequency 1. So 1 comes first, then 2, then 3.

Example 4:
Input: arr[] = [2, 2, 1, 1, 3, 3]
Output: [1, 1, 2, 2, 3, 3]
Explanation: All elements have frequency 2. Since frequencies are same, smaller elements come first: 1, 2, 3.

Constraints:
1 ≤ arr.size() ≤ 10^5
1 ≤ arr[i] ≤ 10^5

Expected Time Complexity: O(n log n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n log n) --> Due to sorting within buckets
// ✅ SC = O(n) --> Hash map + buckets + result array
function sortByFrequencyBucket(arr) {
    let n = arr.length;

    // Step 1: Count frequency of each element
    let freq = new Map();
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }

    // Step 2: Create buckets where index = frequency
    // n+1 buckets, so that the last bucket index = n. Because the array may have only one element with frequency n.
    let buckets = Array.from({ length: n + 1 }, () => []); // ⛔⛔⛔⛔ We can't use Array(n).fill([]) here, because it will create a single array object and all the buckets will reference the same array object.

    for (let [num, f] of freq.entries()) {
        buckets[f].push(num);
    }

    // Step 3: Traverse buckets from high frequency to low frequency
    let result = [];
    for (let f = n; f >= 1; f--) { // we don't need to consider the bucket index 0, because it will be empty anyway. (means no elements with frequency 0)
        if (buckets[f].length > 0) {
            // Sort numbers within same frequency (ascending order)
            buckets[f].sort((a, b) => a - b);
            for (let num of buckets[f]) {
                // Push `num` exactly `f` times
                for (let k = 0; k < f; k++) {
                    result.push(num);
                }
            }
        }
    }

    return result;
}

// ✅ Test Cases
console.log(sortByFrequencyBucket([5, 5, 4, 6, 4])); // [4, 4, 5, 5, 6]
console.log(sortByFrequencyBucket([9, 9, 9, 2, 5])); // [9, 9, 9, 2, 5]
console.log(sortByFrequencyBucket([1, 1, 1, 2, 2, 3])); // [1, 1, 1, 2, 2, 3]
console.log(sortByFrequencyBucket([2, 2, 1, 1, 3, 3])); // [1, 1, 2, 2, 3, 3]
console.log(sortByFrequencyBucket([1, 2, 3, 4, 5])); // [1, 2, 3, 4, 5]

/*🎯 CORE IDEA: Instead of using complex sorting algorithms, we use BUCKET SORT technique with HASH MAP for frequency counting to efficiently sort elements by frequency in O(n log n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ FREQUENCY COUNTING:
   - Count frequency of each element in arr[] using hash map
   - This allows us to know how many times each element appears

2️⃣ BUCKET CREATION:
   - Create buckets where index represents frequency
   - Place elements in buckets based on their frequency
   - buckets[f] contains all elements with frequency f

3️⃣ BUCKET PROCESSING:
   - Traverse buckets from highest frequency to lowest frequency
   - For each bucket, sort elements in ascending order (tie-breaker)
   - Add each element to result exactly f times (where f is its frequency)

4️⃣ RESULT CONSTRUCTION:
   - Elements with higher frequency appear first
   - Elements with same frequency are sorted by value (ascending)
   - Final result maintains frequency-based ordering

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n log n) due to sorting within buckets only
2️⃣ BUCKET SORT: Groups elements by frequency for efficient processing
3️⃣ HASH MAP: O(1) frequency counting and lookup
4️⃣ CLEAR SEPARATION: Frequency ordering vs value ordering handled separately

💡 KEY INSIGHTS:

1️⃣ FREQUENCY GROUPING: Buckets group elements by frequency
2️⃣ FREQUENCY ORDERING: Higher frequency elements come first
3️⃣ VALUE ORDERING: Within same frequency, smaller values come first
4️⃣ FREQUENCY PRESERVATION: Each element appears exactly its frequency times

🎯 WHY BUCKET SORT WORKS?
- Groups elements by frequency (primary sorting criterion)
- Handles tie-breaking by sorting within each frequency group
- Efficiently processes elements in frequency order

🎯 ALGORITHM INTUITION:
Think of it as "frequency-first sorting" where we first group by frequency,
then within each frequency group, sort by value in ascending order.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [5, 5, 4, 6, 4]     (n=5)

🎯 GOAL: Sort by frequency (higher frequency first, then by value)!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: Count frequencies
freq = {5: 2, 4: 2, 6: 1}

📋 STEP 2: Create buckets
buckets = [
  [],           // frequency 0 (empty)
  [6],          // frequency 1: elements with freq 1
  [5, 4],       // frequency 2: elements with freq 2
  [],           // frequency 3 (empty)
  [],           // frequency 4 (empty)
  []            // frequency 5 (empty)
]

📋 STEP 3: Process buckets from high to low frequency

ITERATION 1: f = 2 (highest frequency)
buckets[2] = [5, 4] (not empty)
Sort within bucket: [4, 5] (ascending order)
Add to result:
- Add 4 exactly 2 times: result = [4, 4]
- Add 5 exactly 2 times: result = [4, 4, 5, 5]

ITERATION 2: f = 1
buckets[1] = [6] (not empty)
Sort within bucket: [6] (already sorted)
Add to result:
- Add 6 exactly 1 time: result = [4, 4, 5, 5, 6]

ITERATION 3: f = 0 (skip, empty bucket)

🏆 FINAL RESULT: [4, 4, 5, 5, 6]

🎯 VERIFICATION:
- Frequency 2: 4, 5 (both have freq 2, 4 < 5) ✓
- Frequency 1: 6 (has freq 1) ✓
- Order: [4, 4, 5, 5, 6] ✓

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [9, 9, 9, 2, 5]     (n=5)

🔍 Process:

STEP 1: freq = {9: 3, 2: 1, 5: 1}

STEP 2: buckets = [
  [],           // freq 0
  [2, 5],       // freq 1
  [],           // freq 2
  [9],          // freq 3
  [],           // freq 4
  []            // freq 5
]

STEP 3: Process buckets
- f = 3: buckets[3] = [9] → result = [9, 9, 9]
- f = 2: buckets[2] = [] → skip
- f = 1: buckets[1] = [2, 5] → sort to [2, 5] → result = [9, 9, 9, 2, 5]

🏆 FINAL RESULT: [9, 9, 9, 2, 5] ✓

─────────────────────────────────────────

📊 EDGE CASE:
arr = [2, 2, 1, 1, 3, 3]     (all elements have same frequency)

🔍 Process:

STEP 1: freq = {2: 2, 1: 2, 3: 2}

STEP 2: buckets = [
  [],           // freq 0
  [],           // freq 1
  [2, 1, 3],    // freq 2
  [],           // freq 3
  [],           // freq 4
  [],           // freq 5
  []            // freq 6
]

STEP 3: Process buckets
- f = 2: buckets[2] = [2, 1, 3] → sort to [1, 2, 3] → result = [1, 1, 2, 2, 3, 3]

🏆 FINAL RESULT: [1, 1, 2, 2, 3, 3] ✓

🔍 WHY THIS WORKS:
1️⃣ BUCKET SORT groups elements by frequency efficiently
2️⃣ FREQUENCY ORDERING ensures higher frequency elements come first
3️⃣ VALUE ORDERING handles tie-breaking within same frequency
4️⃣ FREQUENCY PRESERVATION maintains correct element counts

💡 KEY INSIGHT:
We don't need to sort the entire array - we only sort within each frequency group!
This gives us O(n log n) complexity instead of O(n²) for naive approaches.

🎯 TIME COMPLEXITY ANALYSIS:
- Frequency counting: O(n)
- Bucket creation: O(n)
- Bucket processing: O(n + k log k) where k = max elements in any bucket
- In worst case: k = n (all elements have same frequency), so O(n log n)
- Total: O(n log n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map: O(n) for frequencies
- Buckets: O(n) for all frequency groups
- Result array: O(n) for final output
- Total: O(n)

🎯 MATHEMATICAL ANALYSIS:
- Elements with frequency f: Processed in O(f + k log k) time
- Total elements: n = Σ(f × count_of_elements_with_freq_f)
- Worst case: All elements have same frequency, so O(n log n)

🎯 EDGE CASES HANDLED:
- All elements unique: Each has frequency 1, sorted by value
- All elements same: Single frequency, sorted by value
- Mixed frequencies: Proper frequency ordering maintained
- Empty arrays: Handled gracefully

🎯 COMPARISON WITH OTHER APPROACHES:
- Naive sorting: O(n²) - check every pair
- Custom comparator: O(n log n) but complex comparison logic
- Bucket sort approach: O(n log n) with clear separation of concerns

🎯 OPTIMIZATION TECHNIQUES:
- Use Map instead of Object for better performance
- Create buckets only for frequencies that exist
- Sort within buckets only when necessary
- Process buckets in reverse order for efficiency

🎯 FREQUENCY DISTRIBUTION ANALYSIS:
- Best case: All elements have different frequencies → O(n)
- Average case: Some elements have same frequency → O(n log k) where k = max bucket size
- Worst case: All elements have same frequency → O(n log n)

🎯 BUCKET SORT ADVANTAGES:
- Natural grouping by frequency
- Efficient handling of tie-breaking
- Clear separation of primary and secondary sorting criteria
- Optimal for frequency-based sorting problems

*/
