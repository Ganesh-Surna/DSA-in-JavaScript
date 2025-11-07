/* Problem: ✅✅✅✅ Kth Largest Element in Stream ✅✅✅✅

Design a class to efficiently find the kth largest element in a stream of data.
After each element is added to the stream, return the kth largest element seen so far.
If there are fewer than k elements, return -1.

The problem requires:
- Maintain kth largest element dynamically
- Return kth largest after each addition
- Handle stream of elements efficiently
- Return -1 when fewer than k elements
- Optimize for large streams

You are given a stream of integers and an integer k. After adding each element
to the stream, return the kth largest element seen so far. If there are fewer
than k elements, return -1.

Example 1:
Input: stream = [1, 2, 3, 4, 5, 6], k = 4
Output: [-1, -1, -1, 1, 2, 3]
Explanation:
After 1: Only 1 element → -1 (need 4 elements)
After 2: Only 2 elements → -1 (need 4 elements)
After 3: Only 3 elements → -1 (need 4 elements)
After 4: [1, 2, 3, 4], kth largest (4th) = 1
After 5: [1, 2, 3, 4, 5], kth largest (4th) = 2
After 6: [1, 2, 3, 4, 5, 6], kth largest (4th) = 3

Example 2:
Input: stream = [3, 4], k = 1
Output: [3, 4]
Explanation:
After 3: [3], kth largest (1st) = 3
After 4: [3, 4], kth largest (1st) = 4

Example 3:
Input: stream = [1, 1, 1, 1, 1], k = 2
Output: [-1, 1, 1, 1, 1]
Explanation:
After 1: Only 1 element → -1 (need 2 elements)
After 1: [1, 1], kth largest (2nd) = 1
After 1: [1, 1, 1], kth largest (2nd) = 1
After 1: [1, 1, 1, 1], kth largest (2nd) = 1
After 1: [1, 1, 1, 1, 1], kth largest (2nd) = 1

Constraints:
- 1 ≤ stream length ≤ 10^4
- 1 ≤ k ≤ stream length
- 1 ≤ stream[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log k) - using min heap approach
Auxiliary Space: O(k) - for min heap
*/

class MinHeap {
  constructor() {
    this.harr = [];
    this.size = 0;
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }

  extractMin() {
    let arr = this.harr,
      n = this.size;
    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
    let min = arr.pop();
    this.size--;
    this.minHeapify(0);
    return min;
  }

  insert(k) {
    let i = this.size;
    let arr = this.harr;
    arr[i] = k;

    while (i > 0 && arr[this.parent(i)] > arr[i]) {
      let p = this.parent(i);
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    }
    this.size++;
  }
  minHeapify(i) {
    let n = this.size,
      arr = this.harr;

    while (true) {
      let l = this.left(i);
      let r = this.right(i);
      let min = i;
      if (l < n && arr[l] < arr[min]) {
        min = l;
      }
      if (r < n && arr[r] < arr[min]) {
        min = r;
      }

      if (min === i) break;

      [arr[min], arr[i]] = [arr[i], arr[min]];

      i = min;
    }
  }
}

// ✅ TC = O(n log k) - n insertions and extractions
// ✅ SC = O(k) --> for min heap
function kthLargestInStream(arr, k) {
  // Initialize result array and min heap
  let res = [];

  let h = new MinHeap();

  // Process each element in the stream
  for (let i = 0; i < arr.length; i++) {
    // Insert current element into heap
    h.insert(arr[i]);

    // Maintain heap size at k (extract smallest if size > k)
    if (h.size > k) h.extractMin();

    // If fewer than k elements, return -1, else return kth largest (heap root)
    if (h.size < k) res.push(-1);
    else res.push(h.harr[0]);
  }

  return res;
}

// Test cases
console.log("Test 1:", kthLargestInStream([1, 2, 3, 4, 5, 6], 4)); // [-1, -1, -1, 1, 2, 3]
console.log("Test 2:", kthLargestInStream([3, 4], 1)); // [3, 4]
console.log("Test 3:", kthLargestInStream([1, 1, 1, 1, 1], 2)); // [-1, 1, 1, 1, 1]

/*🎯 CORE IDEA: Use min heap of size k to efficiently find kth largest element in stream.
Maintain a min heap containing the k largest elements seen so far. The root of the heap
contains the kth largest element (minimum of k largest). When a new element arrives,
insert it, maintain heap size at k, and return the root if heap size ≥ k, else -1.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create empty min heap
   - Initialize result array
   - Prepare for stream processing
   - Start with empty heap

2️⃣ STREAM PROCESSING:
   - Insert each element into heap
   - Maintain heap size at k
   - Extract minimum if size > k
   - Efficient dynamic maintenance

3️⃣ KTH LARGEST TRACKING:
   - Heap root = kth largest (min of k largest)
   - Return root if heap size ≥ k
   - Return -1 if heap size < k
   - Always current result

4️⃣ HEAP SIZE MAINTENANCE:
   - Keep exactly k elements in heap
   - Extract smallest when size exceeds k
   - Maintain heap property
   - Optimal heap size

5️⃣ RESULT COLLECTION:
   - Store kth largest for each element
   - Return array of results
   - Handle insufficient elements
   - Return final result array

🧠 WHY THIS APPROACH?
- Min heap maintains k largest elements
- Root contains kth largest element
- O(n log k) time complexity
- O(k) space complexity
- Efficient for streams

💡 KEY INSIGHTS:
- Use min heap of size k
- Heap root = kth largest element
- Extract minimum when size > k
- Return -1 for insufficient elements
- Process stream dynamically
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Kth Largest Element in Stream

INPUT: stream = [1, 2, 3, 4, 5, 6], k = 4
EXPECTED OUTPUT: [-1, -1, -1, 1, 2, 3]

🎯 GOAL: Find kth largest element after each element in stream!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Insert 1
Heap: [1], Size: 1
Size < k (4) → Return -1
Result: [-1]

STEP 2: Insert 2
Heap: [1, 2], Size: 2
Size < k (4) → Return -1
Result: [-1, -1]

STEP 3: Insert 3
Heap: [1, 2, 3], Size: 3
Size < k (4) → Return -1
Result: [-1, -1, -1]

STEP 4: Insert 4
Heap: [1, 2, 3, 4], Size: 4
Size == k → Return root (1)
Result: [-1, -1, -1, 1]

STEP 5: Insert 5
Heap: [1, 2, 3, 4, 5]
Size > k → Extract min (1)
Heap: [2, 3, 4, 5], Size: 4
Size == k → Return root (2)
Result: [-1, -1, -1, 1, 2]

STEP 6: Insert 6
Heap: [2, 3, 4, 5, 6]
Size > k → Extract min (2)
Heap: [3, 4, 5, 6], Size: 4
Size == k → Return root (3)
Result: [-1, -1, -1, 1, 2, 3]

🏆 FINAL RESULT: [-1, -1, -1, 1, 2, 3]

─────────────────────────────────────────

📊 EXAMPLE 2: Different K Value

INPUT: stream = [3, 4], k = 1
EXPECTED OUTPUT: [3, 4]

PROCESS:

STEP 1: Insert 3
Heap: [3], Size: 1
Size == k → Return root (3)
Result: [3]

STEP 2: Insert 4
Heap: [3, 4]
Size > k → Extract min (3)
Heap: [4], Size: 1
Size == k → Return root (4)
Result: [3, 4]

🏆 RESULT: [3, 4]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [1, 2, 3, 4, 5, 6], k=4:

Initial: []
After 1: [1], Size=1 → Return -1
After 2: [1, 2], Size=2 → Return -1
After 3: [1, 2, 3], Size=3 → Return -1
After 4: [1, 2, 3, 4], Size=4 → Return 1
After 5: [2, 3, 4, 5], Size=4 → Return 2
After 6: [3, 4, 5, 6], Size=4 → Return 3

Result: [-1, -1, -1, 1, 2, 3]

─────────────────────────────────────────

📊 HEAP OPERATION EXPLANATION:

WHY MIN HEAP WORKS:

- Root contains minimum element
- Minimum of k largest = kth largest
- Easy to access kth largest element
- Efficient size maintenance
- Optimal for stream processing

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- n insertions: O(n log k)
- n extractions (when needed): O(n log k)
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Result array: O(n)
- Total: O(k) (assuming result not counted)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MIN HEAP PROPERTY:
   - Root contains minimum element
   - Minimum of k largest = kth largest
   - Easy to access kth largest element
   - O(1) access time

2️⃣ HEAP SIZE MAINTENANCE:
   - Keep exactly k elements
   - Extract minimum when size > k
   - Maintain heap property
   - Optimal heap size

3️⃣ STREAM PROCESSING:
   - Process elements one by one
   - Dynamic heap maintenance
   - Always current kth largest
   - Efficient insertion and extraction

4️⃣ INSUFFICIENT ELEMENTS:
   - Return -1 when size < k
   - Proper handling of early elements
   - Clear indication of insufficient data
   - Expected behavior

5️⃣ EFFICIENCY:
   - O(n log k) time complexity
   - O(k) space complexity
   - Optimal for stream processing
   - Handles large streams

💡 KEY INSIGHT:
Using min heap of size k to maintain k largest elements seen so far, where the root
contains the kth largest element (minimum of k largest), and we maintain the heap
size at k by extracting the minimum when size exceeds k, ensuring O(n log k) time
complexity and O(k) space complexity for stream processing!

🎯 TIME COMPLEXITY ANALYSIS:
- n insertions: O(n log k)
- (n-k) extractions: O(n log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(k)
- Result array: O(n)
- Total: O(k) (considering only extra space)
- Efficient for streams

🎯 EDGE CASES:

CASE 1: k equals 1
Input: [3, 4, 2], k=1
Process: Maintain 1 largest element
Result: [3, 4, 4]
Output: [3, 4, 4]

CASE 2: k equals array length
Input: [1, 2, 3], k=3
Process: All elements in heap
Result: [-1, -1, 1]
Output: [-1, -1, 1]

CASE 3: All elements same
Input: [1, 1, 1, 1], k=2
Process: Duplicates handled
Result: [-1, 1, 1, 1]
Output: [-1, 1, 1, 1]

CASE 4: Descending order
Input: [5, 4, 3, 2, 1], k=3
Process: Largest maintained
Result: [-1, -1, 3, 3, 3]
Output: [-1, -1, 3, 3, 3]

CASE 5: Single element
Input: [5], k=1
Process: Only one element
Result: [5]
Output: [5]

🎯 ALGORITHM CORRECTNESS:
- Maintains k largest elements: ✓
- Returns kth largest correctly: ✓
- Handles insufficient elements: ✓
- Efficient heap operations: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 120: Initialize result array
- Line 122: Create min heap
- Line 126-137: Process stream
- Line 128: Insert element
- Line 131: Maintain heap size
- Line 134-135: Return result

🎯 HEAP OPERATIONS:

INSERTION:
- Add element at end
- Bubble up to maintain heap property
- Time: O(log k)

EXTRACTION:
- Remove root element
- Replace with last element
- Heapify down to maintain property
- Time: O(log k)

This ensures efficient operations!

🎯 STREAM PROCESSING LOGIC:
for (let i = 0; i < arr.length; i++) {
    h.insert(arr[i]); // Insert new element
    if (h.size > k) h.extractMin(); // Maintain size
    if (h.size < k) res.push(-1); // Insufficient elements
    else res.push(h.harr[0]); // Return kth largest
}

This implements efficient stream processing!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(k) space complexity
- Efficient for streams
- Simple implementation
- Optimal heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than sorting
- Additional space for heap
- Not optimal for very small k

🎯 REAL-WORLD APPLICATIONS:
- Top k streaming data
- Leaderboard maintenance
- System monitoring
- Competitive programming
- Real-time analytics
- Data streaming

🎯 RELATED PROBLEMS:
- Find kth largest element
- Top k frequent elements
- Median of stream
- Priority queue operations
- Heap sort
- Streaming algorithms

🎯 TESTING STRATEGY:
- k equals 1
- k equals array length
- All elements same
- Ascending/descending order
- Random streams
- Edge cases

🎯 DEBUGGING TIPS:
- Print heap state after each insertion
- Trace heap size maintenance
- Verify heap properties
- Check result array
- Monitor extractions

🎯 COMMON MISTAKES:
- Wrong heap size maintenance
- Incorrect kth largest logic
- Not handling insufficient elements
- Wrong heap implementation
- Missing edge cases

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient insertion and extraction
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain min heap approach
- Discuss heap size maintenance
- Show stream processing
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k largest elements
- Min heap root = minimum of k largest = kth largest
- Extract minimum when size exceeds k
- Maintain optimal heap size

This ensures correctness!

🎯 STREAM PROCESSING STRATEGY:
1. Insert new element into heap
2. Maintain heap size at k
3. Return root if size ≥ k
4. Return -1 if size < k
5. Process all elements in stream

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

SORTING APPROACH:
function kthLargestInStreamSort(arr, k) {
    let res = [];
    let stream = [];
    for (let num of arr) {
        stream.push(num);
        stream.sort((a, b) => b - a);
        if (stream.length < k) res.push(-1);
        else res.push(stream[k - 1]);
    }
    return res;
}
- Time: O(n² log n)
- Space: O(n)
- Simple but inefficient

HEAP APPROACH:
- Time: O(n log k)
- Space: O(k)
- Optimal for stream processing
- Efficient implementation

PRIORITY QUEUE:
- Similar to heap approach
- Library implementation
- Same time complexity
- Cleaner code

🎯 CONCLUSION:
Finding kth largest element in stream is efficiently achieved using min heap of size k,
maintaining k largest elements seen so far, where the root contains the kth largest
element, with heap size maintained at k by extracting minimum when size exceeds k,
ensuring O(n log k) time complexity and O(k) space complexity for optimal stream processing!
*/
