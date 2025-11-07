/* Problem: ✅✅✅✅ Find Kth Largest Element ✅✅✅✅

Given an array of integers and an integer k, find the kth largest element 
in the array. The kth largest element is the element that would be at 
position k when the array is sorted in descending order.

The problem requires:
- Find kth largest element efficiently
- Handle duplicates correctly
- Optimize for large arrays
- Return the actual element value

You are given an array of integers and an integer k. 
Return the kth largest element in the array.

Example 1:
Input: arr = [3, 1, 4, 1, 5, 9, 2, 6], k = 3
Output: 5
Explanation: Sorted in descending order: [9, 6, 5, 4, 3, 2, 1, 1]
The 3rd largest element is 5.

Example 2:
Input: arr = [1, 2, 3, 4, 5], k = 2
Output: 4
Explanation: Sorted in descending order: [5, 4, 3, 2, 1]
The 2nd largest element is 4.

Example 3:
Input: arr = [7, 10, 4, 3, 20, 15], k = 3
Output: 10
Explanation: Sorted in descending order: [20, 15, 10, 7, 4, 3]
The 3rd largest element is 10.

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ k ≤ array length
- 1 ≤ array[i] ≤ 10^5

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
/* NOTE : We just need methods(✅insertKey, ✅extractMin, ✅minHeapify) to implement the Min Heap. 
 We don't need to implement the entire Min Heap class. */

// 1. Efficient Approach: Using Min Heap
// ✅ TC = O(n log k) - n elements, each heap operation O(log k)
// ✅ SC = O(k) --> for min heap
function KthLargest(arr, k) {
    // 1. Create Min Heap (to store k largest elements)
    let minHeap = new MinHeap();

    // 2. Insert first k elements into the heap
    for (let i = 0; i < k; i++) {
        minHeap.insert(arr[i]); // ---> O(log k)
    }

    // 3. Process remaining elements
    for (let i = k; i < arr.length; i++) {
        if (arr[i] > minHeap.harr[0]) {
        // minHeap.extractMin() // ---> O(log k)
        // minHeap.insert(arr[i]) // ---> O(log k)

        // ✅✅ Instead of extractMin and insert, we can directly replace the root with the new element and then minHeapify the root.
        
        minHeap.harr[0] = arr[i] // ---> O(1)
        minHeap.minHeapify(0) // ---> O(log k)
        }
    }

    // 4. Return the kth largest element
    // return minHeap.extractMin() // ---> O(log k)
    return minHeap.harr[0]; // ---> O(1)
}


// 2. Efficient Approach: Using Lomuto Partition (QuickSelect)
// ✅ TC = O(n) average, O(n²) worst - QuickSelect algorithm
// ✅ SC = O(1) --> in-place partitioning 
function KthLargest(arr, k) {
    let n = arr.length;
    return kthSmallest(arr, n-k+1); // ✅✅✅✅✅ kth largest = (n-k+1)th smallest

    // Helper Functions:
    function kthSmallest(arr, k) {
        let l=0, h=arr.length-1;
        let res = -1;
        
        if(k > arr.length){
            return res
        }
        
        while(l <= h){
            let p = lomutoPartition(arr, l, h);
            
            // Because we are using lomuto partition, the pivot is always at its correct position. So, if p===k-1, then arr[p] is the kth smallest element.
            if(p===k-1){
                return arr[p]
            }else if(p<k-1){
                // If p<k-1, then the kth smallest element is in the right partition. So, we need to search in the right partition.
                l=p+1
            }else{
                // If p>k-1, then the kth smallest element is in the left partition. So, we need to search in the left partition.
                h=p-1
            }
        }
        
        return res
    }
    function lomutoPartition(arr, l, h){
        let pivot = arr[h];
        
        let i=l-1;
        
        for(let j=l; j<h; j++){
            if(arr[j]<pivot){
                i++;
                [arr[i], arr[j]]=[arr[j], arr[i]];
            }
        }
        
        [arr[i+1], arr[h]]=[arr[h], arr[i+1]];
        
        return i+1;
    }
}


// 3. Inefficient Approach: Using Simple Array 
// ✅ TC = O(n² log k) - n elements, each sort O(k log k)
// ✅ SC = O(k) --> for simple array
function KthLargest(arr, k) {
    // 1. Create simple array to store k largest elements
    let minHeap = [] // Simple Array to implement Min Heap
    
    // 2. Insert first k elements
    for(let i=0; i<k; i++){
        minHeap.push(arr[i])
    }
    
    // 3. Sort the array initially
    minHeap.sort((a,b)=>a-b)
    
    // 4. Process remaining elements
    for(let i=k; i<arr.length; i++){
        if(arr[i] > minHeap[0]){
            // minHeap.shift()
            // minHeap.push(arr[i])
            minHeap[0] = arr[i]
            minHeap.sort((a,b)=>a-b)
        }
    }
    
    // 5. Return the kth largest element
    // return minHeap.shift()
    return minHeap[0];
}
// Test cases
console.log("Test 1:", KthLargest([3, 1, 4, 1, 5, 9, 2, 6], 3)); // 5
console.log("Test 2:", KthLargest([1, 2, 3, 4, 5], 2)); // 4
console.log("Test 3:", KthLargest([7, 10, 4, 3, 20, 15], 3)); // 10

/*🎯 CORE IDEA: Use min heap of size k to efficiently find kth largest element.
Maintain a min heap containing the k largest elements seen so far. The root
of the min heap contains the kth largest element. For each new element, if it's
larger than the root, replace the root and heapify to maintain the heap property.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create min heap of size k
   - Insert first k elements
   - Prepare for comparison-based filtering
   - Initialize with first k elements

2️⃣ ELEMENT PROCESSING:
   - Process remaining elements one by one
   - Compare with root element (minimum of k largest)
   - If current element > heap root:
     - Replace root with current element
     - Heapify to maintain heap property
   - Maintain heap size of k

3️⃣ OPTIMIZATION TECHNIQUE:
   - Instead of extractMin + insert (2 O(log k) operations)
   - Directly replace root + heapify (1 O(log k) operation)
   - Reduces constant factor in time complexity
   - More efficient implementation

4️⃣ RESULT EXTRACTION:
   - Root of min heap contains kth largest element
   - Return heap root directly
   - O(1) access time
   - No need to extract

5️⃣ HEAP MAINTENANCE:
   - Maintain min heap property
   - Handle root replacement efficiently
   - Ensure correct kth largest element
   - Optimize for performance

🧠 WHY THIS APPROACH?
- Min heap maintains k largest elements
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use min heap of size k
- Root contains kth largest element
- Replace root when larger element found
- Direct replacement + heapify optimization
- Maintain k largest elements
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find Kth Largest Element

INPUT: arr = [3, 1, 4, 1, 5, 9, 2, 6], k = 3
EXPECTED OUTPUT: 5

🎯 GOAL: Find the 3rd largest element efficiently!

🔍 STEP-BY-STEP PROCESS:

MIN HEAP APPROACH:

STEP 1: Initialize
Create min heap of size k = 3
Insert first 3 elements: [3, 1, 4]
Heap: [1, 3, 4] (min heap)
Root (kth largest): 1

STEP 2: Process element 1 (index 3)
Compare: 1 > 1 (heap root) ✗
Skip element 1
Heap remains: [1, 3, 4]

STEP 3: Process element 5 (index 4)
Compare: 5 > 1 (heap root) ✓
Replace root: [5, 3, 4]
Heapify: [3, 4, 5]
Root (kth largest): 3

STEP 4: Process element 9 (index 5)
Compare: 9 > 3 (heap root) ✓
Replace root: [9, 4, 5]
Heapify: [4, 5, 9]
Root (kth largest): 4

STEP 5: Process element 2 (index 6)
Compare: 2 > 4 (heap root) ✗
Skip element 2
Heap remains: [4, 5, 9]

STEP 6: Process element 6 (index 7)
Compare: 6 > 4 (heap root) ✓
Replace root: [6, 5, 9]
Heapify: [5, 6, 9]
Root (kth largest): 5

🏆 FINAL RESULT: 5

─────────────────────────────────────────

📊 EXAMPLE 2: Different K Value

INPUT: arr = [1, 2, 3, 4, 5], k = 2
EXPECTED OUTPUT: 4

PROCESS:

STEP 1: Initialize heap with first 2 elements
Heap: [1, 2]
Root: 1

STEP 2: Process remaining elements
3 > 1: Replace → Heap: [2, 3], Root: 2
4 > 2: Replace → Heap: [3, 4], Root: 3
5 > 3: Replace → Heap: [4, 5], Root: 4

🏆 RESULT: 4

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [3, 1, 4, 1, 5, 9, 2, 6], k=3:

Initial heap: [1, 3, 4]
After processing 1: [1, 3, 4] (no change)
After processing 5: [3, 4, 5]
After processing 9: [4, 5, 9]
After processing 2: [4, 5, 9] (no change)
After processing 6: [5, 6, 9]

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MIN HEAP WORKS:

- Root contains minimum of k largest elements
- Minimum of k largest = kth largest element
- Easy to compare with new elements
- Efficient replacement strategy
- Maintains k largest elements

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initial heap creation: O(k log k)
- Main loop: O((n-k) log k)
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Variables: O(1)
- Total: O(k)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MIN HEAP PROPERTY:
   - Root contains minimum element
   - Easy to compare with new elements
   - Efficient replacement strategy
   - Maintains k largest elements

2️⃣ REPLACEMENT STRATEGY:
   - If new element > heap root
   - Replace root with new element
   - Heapify to maintain property
   - Keep k largest elements

3️⃣ OPTIMIZATION TECHNIQUE:
   - Direct root replacement: O(1)
   - Heapify operation: O(log k)
   - Total per replacement: O(log k)
   - Better than extract + insert

4️⃣ EFFICIENT PROCESSING:
   - Process elements sequentially
   - O(log k) operations per element
   - Optimal for large arrays
   - Better than sorting entire array

5️⃣ RESULT ACCESS:
   - Root contains kth largest
   - O(1) access time
   - No extraction needed
   - Direct return

💡 KEY INSIGHT:
Using min heap of size k to maintain k largest elements, where the root contains
the kth largest element, and we replace the root when a larger element is found,
using direct replacement + heapify optimization, ensuring O(n log k) time
complexity and O(k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(k)
- Variables: O(1)
- Total: O(k)
- Linear in k, not n

🎯 EDGE CASES:

CASE 1: k equals 1
Input: [1, 2, 3, 4, 5], k=1
Process: Find maximum element
Result: 5
Output: 5

CASE 2: k equals array length
Input: [1, 2, 3, 4, 5], k=5
Process: Find minimum element
Result: 1
Output: 1

CASE 3: All elements same
Input: [3, 3, 3, 3, 3], k=3
Process: All elements equal
Result: 3
Output: 3

CASE 4: Descending order
Input: [5, 4, 3, 2, 1], k=3
Process: First k elements are largest
Result: 3
Output: 3

CASE 5: Ascending order
Input: [1, 2, 3, 4, 5], k=3
Process: Last k elements are largest
Result: 3
Output: 3

CASE 6: Single element
Input: [5], k=1
Process: Only one element
Result: 5
Output: 5

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains k largest elements: ✓
- Handles duplicates correctly: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 112: Create heap
- Line 115-117: Insert first k elements
- Line 120-130: Process remaining elements
- Line 134: Return heap root

🎯 HEAP OPERATIONS:

INSERTION:
- Add element at end
- Bubble up to maintain heap property
- Time: O(log k)

REPLACEMENT + HEAPIFY:
- Replace root with new element: O(1)
- Heapify down to maintain property: O(log k)
- Total: O(log k)

This ensures efficient operations!

🎯 OPTIMIZATION LOGIC:
// Instead of:
minHeap.extractMin(); // O(log k)
minHeap.insert(arr[i]); // O(log k)
// Total: O(log k)

// Use:
minHeap.harr[0] = arr[i]; // O(1)
minHeap.minHeapify(0); // O(log k)
// Total: O(log k) but better constant factor

This improves performance!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(k) space complexity
- Optimal for large arrays
- Handles duplicates correctly
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than sorting
- Additional space for heap
- Not optimal for small k

🎯 REAL-WORLD APPLICATIONS:
- Ranking systems
- Data analysis
- Performance metrics
- Competitive programming
- Database queries
- System design

🎯 RELATED PROBLEMS:
- Find kth smallest element
- Top k frequent elements
- Median of data stream
- Priority queue operations
- Heap sort
- Quick select algorithm

🎯 TESTING STRATEGY:
- k equals 1
- k equals array length
- All elements same
- Ascending/descending order
- Random arrays
- Edge cases

🎯 DEBUGGING TIPS:
- Print heap state
- Trace element comparisons
- Verify heap properties
- Check root replacement
- Monitor heap size

🎯 COMMON MISTAKES:
- Wrong heap size (not k)
- Incorrect comparison logic
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
- Discuss replacement strategy
- Show optimization technique
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k largest elements
- Min heap root = minimum of k largest = kth largest
- Easy to compare with new elements
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Compare new element with heap root
2. If larger, replace root
3. Heapify to maintain property
4. Keep exactly k elements
5. Root contains kth largest

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

SORTING APPROACH:
function kthLargestSort(arr, k) {
    arr.sort((a, b) => b - a);
    return arr[k-1];
}
- Time: O(n log n)
- Space: O(1) or O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(k)
- Optimal for k << n
- Efficient for large arrays

QUICK SELECT:
- Time: O(n) average, O(n²) worst
- Space: O(1)
- Good for single query
- Not stable for multiple queries

🎯 CONCLUSION:
Finding kth largest element is efficiently achieved using min heap of size k,
maintaining k largest elements seen so far, replacing root when larger element
found using direct replacement + heapify optimization, achieving O(n log k)
time complexity and O(k) space complexity!
*/

