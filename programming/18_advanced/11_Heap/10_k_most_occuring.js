
/* Problem: ✅✅✅✅ K Most Frequent Elements ✅✅✅✅

Given an array of integers and an integer k, find the sum of frequencies of the k most frequent elements.
The k most frequent elements are the elements that appear most frequently in the array.

The problem requires:
- Find k most frequent elements efficiently
- Calculate sum of their frequencies
- Handle duplicates correctly
- Optimize for large arrays
- Return the sum of frequencies

You are given an array of integers and an integer k. 
Return the sum of frequencies of the k most frequent elements.

Example 1:
Input: arr = [3, 1, 4, 4, 5, 2, 6, 1], k = 2
Output: 4
Explanation: 
Frequency map: {3: 1, 1: 2, 4: 2, 5: 1, 2: 1, 6: 1}
Most frequent elements: 1 (freq=2), 4 (freq=2)
Sum: 2 + 2 = 4

Example 2:
Input: arr = [3, 3, 3, 4, 1, 1, 6, 1], k = 2
Output: 6
Explanation:
Frequency map: {3: 3, 4: 1, 1: 3, 6: 1}
Most frequent elements: 3 (freq=3), 1 (freq=3)
Sum: 3 + 3 = 6

Example 3:
Input: arr = [1, 2, 3, 4, 5], k = 3
Output: 3
Explanation:
Frequency map: {1: 1, 2: 1, 3: 1, 4: 1, 5: 1}
Most frequent elements: 1, 2, 3 (each freq=1)
Sum: 1 + 1 + 1 = 3

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ k ≤ number of distinct elements
- 1 ≤ array[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log k) - using min heap approach
Auxiliary Space: O(n) - for frequency map + heap
*/

class MinHeap {
    constructor() {
      this.size = 0;
      this.harr = [];
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
      let i = this.size;
      this.harr[i] = val;
  
      while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
        let p = this.parent(i);
        [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
        i = p; // Move to parent
      }
  
      this.size++;
    }
  
    decreaseKey(i, x) {
      this.harr[i] = x;
  
      while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
        let p = this.parent(i);
        [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
        i = p;
      }
    }
  
    deleteKey(i) {
      if (this.size === 0 || i >= this.size) return -1;
  
      this.decreaseKey(i, -Infinity);
      this.extractMin();
    }
  
    extractMin() {
      if (this.size === 0) return -1;
  
      [this.harr[0], this.harr[this.size - 1]] = [
        this.harr[this.size - 1],
        this.harr[0],
      ];
  
      let min = this.harr.pop();
      this.size--;
  
      this.minHeapify(0); // root is violated
  
      return min;
    }
  
    minHeapify(i) {
      while (true) {
        let l = this.left(i);
        let r = this.right(i);
  
        let minIdx = i;
        if (l < this.size && this.harr[l] < this.harr[minIdx]) {
          minIdx = l;
        }
        if (r < this.size && this.harr[r] < this.harr[minIdx]) {
          minIdx = r;
        }
  
        if (minIdx === i) break;
  
        [this.harr[i], this.harr[minIdx]] = [this.harr[minIdx], this.harr[i]];
  
        i = minIdx; // Move to child
      }
    }
}
/* Note : ✅✅
k - no.of elements which occur most frequently in arr. 
Means k no.of elements with largest frequency.
    1. build frequency map
    2. Store k largest frequency elements in a min heap

    ⭐ Why Min Heap?
        Among k largest frequency elements in MinHeap,
        the element with SMALLEST frequency will be at the ROOT.
        If any element with LARGER frequency comes, we can replace the root with this new element.
*/

// 1. Efficient Approach: Using Min Heap
// ✅ TC = O(n log k) --> Building frequency map + Min Heap operations
// ✅ SC = O(n) --> For frequency map + heap
function kMostFrequent(arr, k) {
    // 1. Validate input
    let n = arr.length
    if(k > n) return 0
    
    // 2. Build frequency map
    let freq = new Map()
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // 3. Use min heap to store k largest frequencies
    let h = new MinHeap()
    for(let [num, f] of freq){
        if(h.size < k){
            // ✅ Initially to store k items into heap
            h.insertKey(f) // Just storing the freq count
        }
        else if(f > h.harr[0]){
            // ✅ After storing the initial k items:
            // h.extractMin()
            // h.insertKey(f)
            
            // ✅✅ Instead of extractMin and insert, we can directly replace the root with the new element and then minHeapify the root.
            h.harr[0] = f
            h.minHeapify(0)
        }
    }
    
    // 4. Calculate sum of k most frequent frequencies
    let res = 0
    // while(h.size > 0){
    //     res += h.extractMin()
    // }
    for(let f of h.harr){
        res += f
    }
    
    return res
}

// 2. Alternative Approach: Using Map and Sorting (Less efficient)
// ✅ TC = O(n log n) --> Sorting the frequency map
// ✅ SC = O(n) --> For the frequency map
function kMostFrequent(arr, k) {
    // 1. Validate input
    let n = arr.length;
    if (k > n) return 0;

    // 2. Build frequency map
    let freq = new Map();
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    
    // 3. Sort frequencies in descending order
    let sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]); // [[num1, freq1], [num2, freq2], ...]
    
    // 4. Calculate sum of k most frequent frequencies
    let res = 0;
    for (let i = 0; i < k; i++) {
        res += sorted[i][1];
    }
    return res;
}

// Test cases
console.log("Test 1:", kMostFrequent([3,1,4,4,5,2,6,1], 2)); // 4
console.log("Test 2:", kMostFrequent([3,3,3,4,1,1,6,1], 2)); // 6
console.log("Test 3:", kMostFrequent([1,2,3,4,5], 3)); // 3

/*🎯 CORE IDEA: Use min heap of size k to efficiently find sum of k most frequent elements.
Build a frequency map, then use min heap to maintain k largest frequencies seen so far.
The root contains the minimum frequency among k largest frequencies. For each new frequency,
if it's larger than the root, replace the root and heapify to maintain the heap property.

📋 STEP-BY-STEP FLOW:

1️⃣ FREQUENCY MAP CONSTRUCTION:
   - Count frequency of each element
   - Use Map for O(1) access and updates
   - Handle duplicates correctly
   - Build complete frequency mapping

2️⃣ HEAP INITIALIZATION:
   - Create min heap of size k
   - Insert first k frequencies
   - Prepare for comparison-based filtering
   - Initialize with first k frequencies

3️⃣ FREQUENCY PROCESSING:
   - Process remaining frequencies one by one
   - Compare with root element (minimum of k largest)
   - If current frequency > heap root:
     - Replace root with current frequency
     - Heapify to maintain heap property
   - Maintain heap size of k

4️⃣ OPTIMIZATION TECHNIQUE:
   - Instead of extractMin + insert (2 O(log k) operations)
   - Directly replace root + heapify (1 O(log k) operation)
   - Reduces constant factor in time complexity
   - More efficient implementation

5️⃣ RESULT CALCULATION:
   - Sum all frequencies in heap
   - Return total sum of k most frequent frequencies
   - O(k) calculation time
   - Direct array traversal

🧠 WHY THIS APPROACH?
- Min heap maintains k largest frequencies
- O(n log k) time complexity
- O(n) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use min heap of size k for frequencies
- Root contains minimum of k largest frequencies
- Replace root when larger frequency found
- Direct replacement + heapify optimization
- Sum all frequencies in final heap
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: K Most Frequent Elements

INPUT: arr = [3, 1, 4, 4, 5, 2, 6, 1], k = 2
EXPECTED OUTPUT: 4

🎯 GOAL: Find sum of frequencies of 2 most frequent elements!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Build Frequency Map
freq = {3: 1, 1: 2, 4: 2, 5: 1, 2: 1, 6: 1}

STEP 2: Initialize Min Heap (k=2)
Insert first 2 frequencies: [1, 1]
Heap: [1, 1] (min heap)
Root (min of k largest): 1

STEP 3: Process remaining frequencies
Process freq=2 (element 1):
Compare: 2 > 1 (heap root) ✓
Replace root: [2, 1]
Heapify: [1, 2]
Root: 1

Process freq=2 (element 4):
Compare: 2 > 1 (heap root) ✓
Replace root: [2, 1]
Heapify: [1, 2]
Root: 1

Process freq=1 (element 5):
Compare: 1 > 1 (heap root) ✗
Skip frequency 1
Heap remains: [1, 2]

Process freq=1 (element 2):
Compare: 1 > 1 (heap root) ✗
Skip frequency 1
Heap remains: [1, 2]

Process freq=1 (element 6):
Compare: 1 > 1 (heap root) ✗
Skip frequency 1
Heap remains: [1, 2]

STEP 4: Calculate Sum
Sum = 1 + 2 = 3

Wait, this is wrong! Let me recalculate...

Actually, let me trace this correctly:

STEP 1: Build Frequency Map
freq = {3: 1, 1: 2, 4: 2, 5: 1, 2: 1, 6: 1}

STEP 2: Process frequencies in order
Process freq=1 (element 3): Insert → Heap: [1]
Process freq=2 (element 1): Insert → Heap: [1, 2]
Process freq=2 (element 4): Compare 2 > 1 ✓ → Replace → Heap: [2, 2]
Process freq=1 (element 5): Compare 1 > 2 ✗ → Skip
Process freq=1 (element 2): Compare 1 > 2 ✗ → Skip
Process freq=1 (element 6): Compare 1 > 2 ✗ → Skip

Final heap: [2, 2]
Sum = 2 + 2 = 4

🏆 FINAL RESULT: 4

─────────────────────────────────────────

📊 EXAMPLE 2: Different K Value

INPUT: arr = [3, 3, 3, 4, 1, 1, 6, 1], k = 2
EXPECTED OUTPUT: 6

PROCESS:

STEP 1: Build Frequency Map
freq = {3: 3, 4: 1, 1: 3, 6: 1}

STEP 2: Process frequencies
Process freq=3 (element 3): Insert → Heap: [3]
Process freq=1 (element 4): Insert → Heap: [1, 3]
Process freq=3 (element 1): Compare 3 > 1 ✓ → Replace → Heap: [3, 3]
Process freq=1 (element 6): Compare 1 > 3 ✗ → Skip

Final heap: [3, 3]
Sum = 3 + 3 = 6

🏆 RESULT: 6

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [3, 1, 4, 4, 5, 2, 6, 1], k=2:

Frequency map: {3: 1, 1: 2, 4: 2, 5: 1, 2: 1, 6: 1}

Processing order: 1, 2, 2, 1, 1, 1
Initial heap: [1]
After processing 2: [1, 2]
After processing 2: [2, 2] (replaced 1)
After processing 1: [2, 2] (no change)
After processing 1: [2, 2] (no change)
After processing 1: [2, 2] (no change)

Final sum: 2 + 2 = 4

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MIN HEAP WORKS:

- Root contains minimum of k largest frequencies
- Minimum of k largest = threshold for replacement
- Easy to compare with new frequencies
- Efficient replacement strategy
- Maintains k largest frequencies

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Frequency map building: O(n)
- Heap operations: O(d log k) where d = distinct elements
- Total: O(n + d log k) = O(n log k) in worst case

SPACE COMPLEXITY:
- Frequency map: O(d) where d = distinct elements
- Heap storage: O(k)
- Total: O(d + k) = O(n) in worst case

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ FREQUENCY MAPPING:
   - Count all element frequencies
   - Handle duplicates correctly
   - O(n) time complexity
   - Complete frequency information

2️⃣ MIN HEAP PROPERTY:
   - Root contains minimum element
   - Easy to compare with new frequencies
   - Efficient replacement strategy
   - Maintains k largest frequencies

3️⃣ REPLACEMENT STRATEGY:
   - If new frequency > heap root
   - Replace root with new frequency
   - Heapify to maintain property
   - Keep k largest frequencies

4️⃣ OPTIMIZATION TECHNIQUE:
   - Direct root replacement: O(1)
   - Heapify operation: O(log k)
   - Total per replacement: O(log k)
   - Better than extract + insert

5️⃣ RESULT CALCULATION:
   - Sum all frequencies in heap
   - O(k) calculation time
   - Direct array traversal
   - Efficient final step

💡 KEY INSIGHT:
Using min heap of size k to maintain k largest frequencies, where the root contains
the minimum frequency among k largest, and we replace the root when a larger
frequency is found, using direct replacement + heapify optimization, ensuring
O(n log k) time complexity and O(n) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Frequency map building: O(n)
- Heap operations: O(d log k) where d = distinct elements
- Total: O(n + d log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Frequency map: O(d) where d = distinct elements
- Min heap: O(k)
- Total: O(d + k)
- Linear in input size

🎯 EDGE CASES:

CASE 1: k equals 1
Input: [1, 2, 3, 4, 5], k=1
Process: Find most frequent element
Result: 1 (frequency 1)
Output: 1

CASE 2: k equals number of distinct elements
Input: [1, 2, 3], k=3
Process: All elements are most frequent
Result: 1 + 1 + 1 = 3
Output: 3

CASE 3: All elements same
Input: [3, 3, 3, 3, 3], k=2
Process: Only one distinct element
Result: 5 (frequency 5)
Output: 5

CASE 4: k greater than distinct elements
Input: [1, 2], k=3
Process: Invalid k
Result: 0
Output: 0

CASE 5: Single element
Input: [5], k=1
Process: Only one element
Result: 1
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Processes all frequencies: ✓
- Maintains k largest frequencies: ✓
- Handles duplicates correctly: ✓
- Returns correct sum: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 151: Validate input
- Line 155-158: Build frequency map
- Line 161-176: Process frequencies with heap
- Line 183-185: Calculate sum

🎯 HEAP OPERATIONS:

INSERTION:
- Add frequency at end
- Bubble up to maintain heap property
- Time: O(log k)

REPLACEMENT + HEAPIFY:
- Replace root with new frequency: O(1)
- Heapify down to maintain property: O(log k)
- Total: O(log k)

This ensures efficient operations!

🎯 OPTIMIZATION LOGIC:
// Instead of:
h.extractMin(); // O(log k)
h.insertKey(f); // O(log k)
// Total: O(log k)

// Use:
h.harr[0] = f; // O(1)
h.minHeapify(0); // O(log k)
// Total: O(log k) but better constant factor

This improves performance!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(n) space complexity
- Optimal for large arrays
- Handles duplicates correctly
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than sorting
- Additional space for heap
- Not optimal for small k

🎯 REAL-WORLD APPLICATIONS:
- Data analysis
- Frequency analysis
- Performance metrics
- Competitive programming
- Database queries
- System monitoring

🎯 RELATED PROBLEMS:
- Find kth largest element
- Top k frequent elements
- Most frequent element
- Priority queue operations
- Heap sort
- Frequency counting

🎯 TESTING STRATEGY:
- k equals 1
- k equals distinct elements
- All elements same
- Random arrays
- Edge cases

🎯 DEBUGGING TIPS:
- Print frequency map
- Trace heap state
- Verify heap properties
- Check frequency comparisons
- Monitor heap size

🎯 COMMON MISTAKES:
- Wrong heap size (not k)
- Incorrect frequency comparison
- Not handling duplicates
- Wrong replacement strategy
- Missing edge cases

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient replacement logic
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain min heap approach
- Discuss frequency mapping
- Show optimization technique
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k largest frequencies
- Min heap root = minimum of k largest = threshold
- Easy to compare with new frequencies
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Compare new frequency with heap root
2. If larger, replace root
3. Heapify to maintain property
4. Keep exactly k frequencies
5. Sum all frequencies in final heap

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

SORTING APPROACH:
function kMostFrequentSort(arr, k) {
    let freq = new Map();
    for (let num of arr) {
        freq.set(num, (freq.get(num) || 0) + 1);
    }
    let sorted = [...freq.values()].sort((a, b) => b - a);
    return sorted.slice(0, k).reduce((sum, freq) => sum + freq, 0);
}
- Time: O(n log n)
- Space: O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(n)
- Optimal for k << n
- Efficient for large arrays

BUCKET SORT:
- Time: O(n)
- Space: O(n)
- Good for small frequency ranges
- Not stable for large ranges

🎯 CONCLUSION:
Finding sum of k most frequent elements is efficiently achieved using min heap of size k,
maintaining k largest frequencies seen so far, replacing root when larger frequency
found using direct replacement + heapify optimization, achieving O(n log k) time
complexity and O(n) space complexity!
*/
