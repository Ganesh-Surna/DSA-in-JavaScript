/* Problem: ✅✅✅✅ Find Kth Smallest Element ✅✅✅✅

Given an array of integers and an integer k, find the kth smallest element 
in the array. The kth smallest element is the element that would be at 
position k when the array is sorted in ascending order.

The problem requires:
- Find kth smallest element efficiently
- Handle duplicates correctly
- Optimize for large arrays
- Return the actual element value

You are given an array of integers and an integer k. 
Return the kth smallest element in the array.

Example 1:
Input: arr = [3, 1, 4, 1, 5, 9, 2, 6], k = 3
Output: 2
Explanation: Sorted in ascending order: [1, 1, 2, 3, 4, 5, 6, 9]
The 3rd smallest element is 2.

Example 2:
Input: arr = [1, 2, 3, 4, 5], k = 2
Output: 2
Explanation: Sorted in ascending order: [1, 2, 3, 4, 5]
The 2nd smallest element is 2.

Example 3:
Input: arr = [7, 10, 4, 3, 20, 15], k = 3
Output: 7
Explanation: Sorted in ascending order: [3, 4, 7, 10, 15, 20]
The 3rd smallest element is 7.

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ k ≤ array length
- 1 ≤ array[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log k) - using max heap approach
Auxiliary Space: O(k) - for max heap
*/

class MaxHeap{
    constructor(cap){
        this.cap = cap
        this.size = 0
        this.harr = new Array(cap)
    }
    
    parent(i){
        return Math.floor((i-1)/2)
    }
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    
    insertKey(val){
        if(this.size === this.cap) return
        
        let i = this.size
        this.harr[i] = val
        
        while(i > 0 && this.harr[this.parent(i)] < this.harr[i]){ // ✅ For Min Heap < is used
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p; // Move to parent
        }
        
        this.size++
    }
    
    // ✅ For Min Heap we use decreaseKey (Coz decreasing a key violates the min heap property, which helps in deleting the element)
    // ✅ For Max Heap we use increaseKey (Coz increasing a key violates the max heap property, which helps in deleting the element)
    increaseKey(i, x){
        this.harr[i] = x
        
        while(i > 0 && this.harr[this.parent(i)] < this.harr[i]){ // ✅ For Min Heap < is used
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p;
        }
    }
    
    deleteKey(i){
        if(this.size === 0 || i >= this.size) return -1
        
        this.increaseKey(i, Infinity) // ✅ For minHeap --> decreaseKey(i, -Infinity)
        this.extractMax()
    }
    
    extractMax(){
        if(this.size === 0) return -1;
        
        [this.harr[0], this.harr[this.size - 1]] = [this.harr[this.size-1], this.harr[0]];
        
        let max = this.harr.pop()
        this.size--
        
        this.maxHeapify(0) // root is violated
        
        return max
    }
    
    maxHeapify(i){
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            
            let maxIdx = i
            if(l < this.size && this.harr[l] > this.harr[maxIdx]){ // ✅ For Min Heap < is used
                maxIdx = l
            }
            if(r < this.size && this.harr[r] > this.harr[maxIdx]){ // ✅ For Min Heap < is used
                maxIdx = r
            }
            
            if(maxIdx === i) break;
            
            [this.harr[i], this.harr[maxIdx]] = [this.harr[maxIdx], this.harr[i]];
            
            i=maxIdx // Move to child
        }
    }
    
}

/* NOTE : We just need methods(✅insertKey, ✅extractMax, ✅maxHeapify) to implement the Max Heap. 
 We don't need to implement the entire Max Heap class. */

 // 1. Efficient Approach: Using Max Heap
 // ✅ TC = O(n log k) - n elements, each heap operation O(log k)
 // ✅ SC = O(k) --> for max heap
function kthSmallest(arr, k) {
    // 1. Create Max Heap (to store k smallest elements)
    let maxHeap = new MaxHeap(k);
    
    // 2. Insert first k elements into the heap
    for(let i=0; i<k; i++){
        maxHeap.insertKey(arr[i]);
    }
    
    // 3. Process remaining elements
    for(let i=k; i<arr.length; i++){
        if(arr[i] < maxHeap.harr[0]){
            // maxHeap.extractMax();
            // maxHeap.insertKey(arr[i]);
            
            // ✅✅ Instead of extractMax and insert, we can directly replace the root with the new element and then maxHeapify the root.
            maxHeap.harr[0] = arr[i];
            maxHeap.maxHeapify(0);
        }
    }

    // 4. Return the kth smallest element
    // return maxHeap.extractMax();
    return maxHeap.harr[0];
}

// 2. Efficient Approach: Using Lomuto Partition (QuickSelect)
// ✅ TC = O(n) average, O(n²) worst - QuickSelect algorithm
// ✅ SC = O(1) --> in-place partitioning
function kthSmallest(arr, k) {
    // 1. Initialize search boundaries
    let l=0, h=arr.length-1;
    let res = -1;
    
    // 2. Validate k value
    if(k > arr.length){
        return res
    }
    
    // 3. QuickSelect algorithm
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

    // Helper Functions
    function lomutoPartition(arr, l, h){
        let pivot = arr[h];
        
        let i=l-1;
        
        for(let j=l; j<h; j++){
            if(arr[j]<pivot){
                i++
                [arr[i], arr[j]]=[arr[j], arr[i]]
            }
        }
        
        [arr[i+1], arr[h]]=[arr[h], arr[i+1]]
        
        return i+1
    }
}

// Test cases
console.log("Test 1:", kthSmallest([3, 1, 4, 1, 5, 9, 2, 6], 3)); // 2
console.log("Test 2:", kthSmallest([1, 2, 3, 4, 5], 2)); // 2
console.log("Test 3:", kthSmallest([7, 10, 4, 3, 20, 15], 3)); // 7

/*🎯 CORE IDEA: Use max heap of size k to efficiently find kth smallest element.
Maintain a max heap containing the k smallest elements seen so far. The root
of the max heap contains the kth smallest element. For each new element, if it's
smaller than the root, replace the root and heapify to maintain the heap property.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create max heap of size k
   - Insert first k elements
   - Prepare for comparison-based filtering
   - Initialize with first k elements

2️⃣ ELEMENT PROCESSING:
   - Process remaining elements one by one
   - Compare with root element (maximum of k smallest)
   - If current element < heap root:
     - Replace root with current element
     - Heapify to maintain heap property
   - Maintain heap size of k

3️⃣ OPTIMIZATION TECHNIQUE:
   - Instead of extractMax + insert (2 O(log k) operations)
   - Directly replace root + heapify (1 O(log k) operation)
   - Reduces constant factor in time complexity
   - More efficient implementation

4️⃣ RESULT EXTRACTION:
   - Root of max heap contains kth smallest element
   - Return heap root directly
   - O(1) access time
   - No need to extract

5️⃣ HEAP MAINTENANCE:
   - Maintain max heap property
   - Handle root replacement efficiently
   - Ensure correct kth smallest element
   - Optimize for performance

🧠 WHY THIS APPROACH?
- Max heap maintains k smallest elements
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use max heap of size k
- Root contains kth smallest element
- Replace root when smaller element found
- Direct replacement + heapify optimization
- Maintain k smallest elements
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find Kth Smallest Element

INPUT: arr = [3, 1, 4, 1, 5, 9, 2, 6], k = 3
EXPECTED OUTPUT: 2

🎯 GOAL: Find the 3rd smallest element efficiently!

🔍 STEP-BY-STEP PROCESS:

MAX HEAP APPROACH:

STEP 1: Initialize
Create max heap of size k = 3
Insert first 3 elements: [3, 1, 4]
Heap: [4, 1, 3] (max heap)
Root (kth smallest): 4

STEP 2: Process element 1 (index 3)
Compare: 1 < 4 (heap root) ✓
Replace root: [1, 1, 3]
Heapify: [3, 1, 1]
Root (kth smallest): 3

STEP 3: Process element 5 (index 4)
Compare: 5 < 3 (heap root) ✗
Skip element 5
Heap remains: [3, 1, 1]

STEP 4: Process element 9 (index 5)
Compare: 9 < 3 (heap root) ✗
Skip element 9
Heap remains: [3, 1, 1]

STEP 5: Process element 2 (index 6)
Compare: 2 < 3 (heap root) ✓
Replace root: [2, 1, 1]
Heapify: [2, 1, 1]
Root (kth smallest): 2

STEP 6: Process element 6 (index 7)
Compare: 6 < 2 (heap root) ✗
Skip element 6
Heap remains: [2, 1, 1]

🏆 FINAL RESULT: 2

─────────────────────────────────────────

📊 EXAMPLE 2: Different K Value

INPUT: arr = [1, 2, 3, 4, 5], k = 2
EXPECTED OUTPUT: 2

PROCESS:

STEP 1: Initialize heap with first 2 elements
Heap: [2, 1]
Root: 2

STEP 2: Process remaining elements
3 < 2: Replace → Heap: [3, 1], Root: 3
4 < 3: Replace → Heap: [4, 1], Root: 4
5 < 4: Replace → Heap: [5, 1], Root: 5

Wait, this is wrong! Let me recalculate...

STEP 1: Initialize heap with first 2 elements
Heap: [2, 1] (max heap)
Root: 2

STEP 2: Process remaining elements
3 < 2: Replace → Heap: [3, 1], Root: 3
4 < 3: Replace → Heap: [4, 1], Root: 4
5 < 4: Replace → Heap: [5, 1], Root: 5

Actually, let me trace this correctly:

Initial: [1, 2] → Max heap: [2, 1], Root: 2
Process 3: 3 < 2? No, skip
Process 4: 4 < 2? No, skip  
Process 5: 5 < 2? No, skip

Result: 2

🏆 RESULT: 2

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [3, 1, 4, 1, 5, 9, 2, 6], k=3:

Initial heap: [4, 1, 3]
After processing 1: [3, 1, 1]
After processing 5: [3, 1, 1] (no change)
After processing 9: [3, 1, 1] (no change)
After processing 2: [2, 1, 1]
After processing 6: [2, 1, 1] (no change)

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MAX HEAP WORKS:

- Root contains maximum of k smallest elements
- Maximum of k smallest = kth smallest element
- Easy to compare with new elements
- Efficient replacement strategy
- Maintains k smallest elements

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

1️⃣ MAX HEAP PROPERTY:
   - Root contains maximum element
   - Easy to compare with new elements
   - Efficient replacement strategy
   - Maintains k smallest elements

2️⃣ REPLACEMENT STRATEGY:
   - If new element < heap root
   - Replace root with new element
   - Heapify to maintain property
   - Keep k smallest elements

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
   - Root contains kth smallest
   - O(1) access time
   - No extraction needed
   - Direct return

💡 KEY INSIGHT:
Using max heap of size k to maintain k smallest elements, where the root contains
the kth smallest element, and we replace the root when a smaller element is found,
using direct replacement + heapify optimization, ensuring O(n log k) time
complexity and O(k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Max heap: O(k)
- Variables: O(1)
- Total: O(k)
- Linear in k, not n

🎯 EDGE CASES:

CASE 1: k equals 1
Input: [1, 2, 3, 4, 5], k=1
Process: Find minimum element
Result: 1
Output: 1

CASE 2: k equals array length
Input: [1, 2, 3, 4, 5], k=5
Process: Find maximum element
Result: 5
Output: 5

CASE 3: All elements same
Input: [3, 3, 3, 3, 3], k=3
Process: All elements equal
Result: 3
Output: 3

CASE 4: Ascending order
Input: [1, 2, 3, 4, 5], k=3
Process: First k elements are smallest
Result: 3
Output: 3

CASE 5: Descending order
Input: [5, 4, 3, 2, 1], k=3
Process: Last k elements are smallest
Result: 3
Output: 3

CASE 6: Single element
Input: [5], k=1
Process: Only one element
Result: 5
Output: 5

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains k smallest elements: ✓
- Handles duplicates correctly: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 139: Create heap with capacity k
- Line 142-144: Insert first k elements
- Line 147-156: Process remaining elements
- Line 160: Return heap root

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
maxHeap.extractMax(); // O(log k)
maxHeap.insertKey(arr[i]); // O(log k)
// Total: O(log k)

// Use:
maxHeap.harr[0] = arr[i]; // O(1)
maxHeap.maxHeapify(0); // O(log k)
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
- Find kth largest element
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
- Explain max heap approach
- Discuss replacement strategy
- Show optimization technique
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k smallest elements
- Max heap root = maximum of k smallest = kth smallest
- Easy to compare with new elements
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Compare new element with heap root
2. If smaller, replace root
3. Heapify to maintain property
4. Keep exactly k elements
5. Root contains kth smallest

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

SORTING APPROACH:
function kthSmallestSort(arr, k) {
    arr.sort((a, b) => a - b);
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
Finding kth smallest element is efficiently achieved using max heap of size k,
maintaining k smallest elements seen so far, replacing root when smaller element
found using direct replacement + heapify optimization, achieving O(n log k)
time complexity and O(k) space complexity!
*/