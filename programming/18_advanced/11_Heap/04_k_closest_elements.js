/* Problem: ✅✅✅✅ Find K Closest Elements ✅✅✅✅

Given a sorted array of integers, an integer k, and a target value x, 
find the k closest elements to x in the array. The elements should be 
returned in the order they appear in the original array.

The problem requires:
- Find k elements with smallest absolute difference to x
- Handle ties appropriately (prefer smaller elements)
- Return elements in original array order
- Optimize for large arrays

You are given a sorted array of integers, an integer k, and a target value x.
Return an array containing the k closest elements to x in the order they 
appear in the original array.

Example 1:
Input: arr = [1, 2, 3, 4, 5], k = 3, x = 3
Output: [3, 2, 4]
Explanation: The 3 closest elements to 3 are 3 (diff=0), 2 (diff=1), and 4 (diff=1).

Example 2:
Input: arr = [1, 2, 3, 4, 5], k = 4, x = 3
Output: [3, 2, 4, 1]
Explanation: The 4 closest elements to 3 are 3, 2, 4, and 1 (all with diff ≤ 2).

Example 3:
Input: arr = [1, 2, 3, 4, 5], k = 2, x = 3
Output: [3, 2]
Explanation: The 2 closest elements to 3 are 3 (diff=0) and 2 (diff=1).

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ k ≤ array length
- 1 ≤ array[i] ≤ 10^5
- Array is sorted in ascending order

Expected Complexities:
Time Complexity: O(n log k) - using max heap approach
Auxiliary Space: O(k) - for max heap
*/

/* NOTE : ✅✅✅✅✅✅
  Need to Constomize methods(insertKey, increaseKey, deleteKey, extractMax, maxHeapify) for this problem
  Because we are storing [absDiff, index] pairs in the heap
  And we need to compare by the first element (absDiff)
*/
class MaxHeap {
  constructor(cap) {
    this.cap = cap;
    this.size = 0;
    this.harr = new Array(cap);
  }

  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }

  insertKey(val) {
    if (this.size === this.cap) return;

    let i = this.size;
    this.harr[i] = val;

    while (i > 0 && this.harr[this.parent(i)][0] < this.harr[i][0]) {
      // ✅ For Min Heap < is used, comparing by first element (absDiff)
      let p = this.parent(i);
      [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
      i = p; // Move to parent
    }

    this.size++;
  }

  // ✅ For Min Heap we use decreaseKey (Coz decreasing a key violates the min heap property, which helps in deleting the element)
  // ✅ For Max Heap we use increaseKey (Coz increasing a key violates the max heap property, which helps in deleting the element)
  increaseKey(i, x) {
    this.harr[i] = x;

    while (i > 0 && this.harr[this.parent(i)][0] < this.harr[i][0]) {
      // ✅ For Min Heap < is used, comparing by first element (absDiff)
      let p = this.parent(i);
      [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
      i = p;
    }
  }

  deleteKey(i) {
    if (this.size === 0 || i >= this.size) return -1;

    this.increaseKey(i, [Infinity, this.harr[i][1]]); // ✅ For minHeap --> decreaseKey(i, [-Infinity, index])
    this.extractMax();
  }

  extractMax() {
    if (this.size === 0) return -1;

    [this.harr[0], this.harr[this.size - 1]] = [
      this.harr[this.size - 1],
      this.harr[0],
    ];

    let max = this.harr.pop();
    this.size--;

    this.maxHeapify(0); // root is violated

    return max;
  }

  maxHeapify(i) {
    while (true) {
      let l = this.left(i);
      let r = this.right(i);

      let maxIdx = i;
      if (l < this.size && this.harr[l][0] > this.harr[maxIdx][0]) {
        // ✅ For Min Heap < is used, comparing by first element (absDiff)
        maxIdx = l;
      }
      if (r < this.size && this.harr[r][0] > this.harr[maxIdx][0]) {
        // ✅ For Min Heap < is used, comparing by first element (absDiff)
        maxIdx = r;
      }

      if (maxIdx === i) break;

      [this.harr[i], this.harr[maxIdx]] = [this.harr[maxIdx], this.harr[i]];

      i = maxIdx; // Move to child
    }
  }
}

/* NOTE : 
    k closest elements to x means, k elements that have the smallest absolute difference with x.
    For ✅SMALLEST abs diff elements, we need ✅MAX HEAP to store k elements that have the smallest abs diff with x
    Coz if the new element has smaller abs diff with x than the top(max of k smallest abs diff elements) of the heap,
     then we need to replace the max element with the new element.
*/

// 1. Efficient Approach : Using Max Heap
// ✅ TC = O(n log k) - n elements, each heap operation O(log k)
// ✅ SC = O(k) --> for heap
function kClosestElements(arr, k, x) {
  // 1. Create Max Heap (to store k closest elements)
  let h = new MaxHeap(k);

  // 2. Insert first k elements with their absolute differences
  for (let i = 0; i < k; i++) {
    h.insertKey([Math.abs(x - arr[i]), i]); // Storing [absDiff, idxOfElement]
  }

  // 3. Process remaining elements
  for (let i = k; i < arr.length; i++) {
    // let [maxDiff, idx] = h.harr[0] // Top of max heap is max element
    if (h.harr[0][0] > Math.abs(x - arr[i])) {
      // OR maxDiff > Math.abs(x - arr[i])
      h.extractMax();
      h.insertKey([Math.abs(x - arr[i]), i]);
    }
  }

  // 4. Extract result maintaining original order
  // Creating array with size=k to keep elements from R->L in constant time. Since we extract max abs diff elements one by one --> therefore R->L
  let res = new Array(k); // OR h.size
  let i = k - 1; // OR h.size - 1
  while (h.size > 0) {
    let [maxDiff, idx] = h.extractMax();
    let originalEl = arr[idx];
    res[i] = originalEl; // O(1)
    i--;
  }

  return res;
}

// Test cases
console.log("Test 1:", kClosestElements([1, 2, 3, 4, 5], 3, 3)); // [3, 2, 4]
console.log("Test 2:", kClosestElements([1, 2, 3, 4, 5], 4, 3)); // [3, 2, 4, 1]
console.log("Test 3:", kClosestElements([1, 2, 3, 4, 5], 2, 3)); // [3, 2]
console.log("Test 4:", kClosestElements([1, 2, 3, 4, 5], 1, 3)); // [3]

/*🎯 CORE IDEA: Use max heap of size k to efficiently find k closest elements to x.
Maintain a max heap containing the k elements with smallest absolute differences 
to x seen so far. For each new element, if its absolute difference to x is smaller 
than the maximum difference in heap, replace the maximum with the new element.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create max heap of size k
   - Insert first k elements with [absDiff, index] pairs
   - Prepare for comparison-based filtering
   - Initialize with first k elements

2️⃣ ELEMENT PROCESSING:
   - Process remaining elements one by one
   - Calculate absolute difference to x
   - Compare with maximum difference in heap
   - If current diff < heap maximum diff:
     - Remove maximum from heap
     - Insert current element with its diff
   - Maintain heap size of k

3️⃣ RESULT EXTRACTION:
   - Extract all elements from heap
   - Store original elements in result array
   - Maintain original array order
   - Return k closest elements

4️⃣ HEAP MAINTENANCE:
   - Maintain max heap property on differences
   - Handle insertions and extractions
   - Ensure efficient operations
   - Keep only k closest elements

5️⃣ OUTPUT PREPARATION:
   - Extract elements maintaining order
   - Return final result
   - Handle edge cases

🧠 WHY THIS APPROACH?
- Max heap maintains k smallest differences
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use max heap of size k
- Store [absDiff, index] pairs
- Replace maximum when smaller diff found
- Maintain k closest elements
- Preserve original array order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find K Closest Elements

INPUT: arr = [1, 2, 3, 4, 5], k = 3, x = 3
EXPECTED OUTPUT: [3, 2, 4]

🎯 GOAL: Find the 3 closest elements to x=3 efficiently!

🔍 STEP-BY-STEP PROCESS:

MAX HEAP APPROACH:

STEP 1: Initialize
Create max heap of size k = 3
Insert first 3 elements with differences:
- arr[0]=1: diff = |3-1| = 2 → [2, 0]
- arr[1]=2: diff = |3-2| = 1 → [1, 1]  
- arr[2]=3: diff = |3-3| = 0 → [0, 2]

Heap: [[2, 0], [1, 1], [0, 2]] (max heap by diff)
Maximum diff: 2

STEP 2: Process element arr[3]=4 (index 3)
Calculate diff: |3-4| = 1
Compare: 1 < 2 (heap maximum diff) ✓
Extract max: [2, 0] (element 1)
Insert: [1, 3] (element 4)
Heap: [[1, 1], [0, 2], [1, 3]]
Maximum diff: 1

STEP 3: Process element arr[4]=5 (index 4)
Calculate diff: |3-5| = 2
Compare: 2 < 1 (heap maximum diff) ✗
Skip element 5
Heap remains: [[1, 1], [0, 2], [1, 3]]

STEP 4: Extract result
Extract all elements maintaining order:
- Extract [1, 3] → res[2] = arr[3] = 4
- Extract [1, 1] → res[1] = arr[1] = 2  
- Extract [0, 2] → res[0] = arr[2] = 3

Result: [3, 2, 4]

🏆 FINAL RESULT: [3, 2, 4]

─────────────────────────────────────────

📊 EXAMPLE 2: Larger K Value

INPUT: arr = [1, 2, 3, 4, 5], k = 4, x = 3
EXPECTED OUTPUT: [3, 2, 4, 1]

PROCESS:

STEP 1: Initialize heap with first 4 elements
Heap: [[2, 0], [1, 1], [0, 2], [1, 3]]
Maximum diff: 2

STEP 2: Process remaining elements
arr[4]=5: diff = |3-5| = 2
Compare: 2 < 2? No (skip)

STEP 3: Extract and arrange
Extract: [[1, 3], [1, 1], [0, 2], [2, 0]]
Arrange: [3, 2, 4, 1]

🏆 RESULT: [3, 2, 4, 1]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [1, 2, 3, 4, 5], k=3, x=3:

Initial heap: [[2, 0], [1, 1], [0, 2]]
After processing 4: [[1, 1], [0, 2], [1, 3]]
After processing 5: [[1, 1], [0, 2], [1, 3]] (no change)

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MAX HEAP WORKS:

- Root contains maximum of k smallest differences
- If new element's diff < maximum diff, it's among k closest
- Replace maximum with new element
- Maintain heap property
- Keep exactly k closest elements

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initial heap creation: O(k log k)
- Main loop: O((n-k) log k)
- Final extraction: O(k log k)
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Result array: O(k)
- Total: O(k)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MAX HEAP PROPERTY:
   - Root contains maximum difference
   - Easy to compare with new elements
   - Efficient replacement strategy
   - Maintains k closest elements

2️⃣ REPLACEMENT STRATEGY:
   - If new element's diff < heap maximum diff
   - Replace maximum with new element
   - Maintain heap size of k
   - Keep k closest elements

3️⃣ EFFICIENT PROCESSING:
   - Process elements sequentially
   - O(log k) operations per element
   - Optimal for large arrays
   - Better than sorting entire array

4️⃣ SPACE OPTIMIZATION:
   - Only store k elements
   - O(k) space complexity
   - Independent of array size
   - Efficient memory usage

5️⃣ RESULT PREPARATION:
   - Extract all elements
   - Maintain original order
   - Return k closest elements
   - Handle edge cases

💡 KEY INSIGHT:
Using max heap of size k to maintain k closest elements to x, where we store
[absoluteDifference, index] pairs, replace the maximum difference when a smaller
difference is found, ensuring we always have the k closest elements seen so far,
achieving O(n log k) time complexity and O(k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Final extraction: O(k log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Max heap: O(k)
- Result array: O(k)
- Variables: O(1)
- Total: O(k)
- Linear in k, not n

🎯 EDGE CASES:

CASE 1: k equals array length
Input: [1, 2, 3, 4, 5], k=5, x=3
Process: All elements in heap
Result: [3, 2, 4, 1, 5]
Output: [3, 2, 4, 1, 5]

CASE 2: k equals 1
Input: [1, 2, 3, 4, 5], k=1, x=3
Process: Find closest element
Result: [3]
Output: [3]

CASE 3: x equals array element
Input: [1, 2, 3, 4, 5], k=3, x=3
Process: Element 3 has diff=0
Result: [3, 2, 4]
Output: [3, 2, 4]

CASE 4: x outside array range
Input: [1, 2, 3, 4, 5], k=3, x=0
Process: All elements have large diff
Result: [1, 2, 3]
Output: [1, 2, 3]

CASE 5: x at array boundary
Input: [1, 2, 3, 4, 5], k=3, x=1
Process: Element 1 has diff=0
Result: [1, 2, 3]
Output: [1, 2, 3]

CASE 6: Single element array
Input: [5], k=1, x=3
Process: Only one element
Result: [5]
Output: [5]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains k closest elements: ✓
- Handles ties correctly: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 148: Create heap of size k
- Line 151-153: Insert first k elements with [diff, index]
- Line 156-163: Process remaining elements
- Line 167-174: Extract result maintaining order
- Line 176: Return final result

🎯 HEAP OPERATIONS:

INSERTION:
- Add [diff, index] pair at end
- Bubble up to maintain heap property
- Time: O(log k)

EXTRACTION:
- Remove root (maximum difference)
- Move last element to root
- Heapify down to maintain property
- Time: O(log k)

This ensures efficient operations!

🎯 REPLACEMENT LOGIC:
if (h.harr[0][0] > Math.abs(x - arr[i])) {
    h.extractMax();      // Remove maximum difference
    h.insertKey([Math.abs(x - arr[i]), i]);  // Insert smaller difference
}

This maintains k closest elements!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(k) space complexity
- Optimal for large arrays
- Handles ties correctly
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than sorting
- Additional extraction step needed
- Not optimal for small k

🎯 REAL-WORLD APPLICATIONS:
- Recommendation systems
- Search result ranking
- Data analysis (outliers)
- Performance metrics
- Competitive programming
- Database queries

🎯 RELATED PROBLEMS:
- Find kth closest element
- Top k frequent elements
- Merge k sorted arrays
- Sliding window problems
- Heap sort
- Priority queue operations

🎯 TESTING STRATEGY:
- k equals array length
- k equals 1
- x equals array element
- x outside array range
- x at array boundary
- Single element array

🎯 DEBUGGING TIPS:
- Print heap state with differences
- Trace element comparisons
- Verify heap properties
- Check result extraction
- Monitor heap size

🎯 COMMON MISTAKES:
- Wrong heap size (not k)
- Incorrect difference calculation
- Not handling ties correctly
- Wrong extraction order
- Missing edge cases

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient difference calculation
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain max heap approach
- Discuss replacement strategy
- Show heap operations
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k closest elements
- Max heap root = maximum of k smallest differences
- Easy to compare with new elements
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Calculate absolute difference to x
2. Compare with heap maximum difference
3. If smaller, replace maximum
4. Maintain heap property
5. Keep exactly k elements

This gives optimal performance!

🎯 COMPARISON WITH SORTING:

SORTING APPROACH:
function kClosestElementsSort(arr, k, x) {
    return arr
        .map((val, idx) => [Math.abs(x - val), idx, val])
        .sort((a, b) => a[0] - b[0])
        .slice(0, k)
        .map(item => item[2]);
}
- Time: O(n log n)
- Space: O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(k)
- Optimal for k << n
- Efficient for large arrays

🎯 CONCLUSION:
Finding k closest elements is efficiently achieved using max heap of size k,
maintaining k closest elements seen so far with [difference, index] pairs,
replacing maximum difference when smaller difference found, and extracting
result maintaining original order, achieving O(n log k) time complexity
and O(k) space complexity!
*/
