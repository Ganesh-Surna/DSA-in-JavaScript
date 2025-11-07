/* Problem: ✅✅✅✅ Sort K-Sorted Array ✅✅✅✅

Given a k-sorted array, sort it efficiently. A k-sorted array is an array where 
each element is at most k positions away from its sorted position.

The k-sorted property means:
- Element at position i can be at positions [i-k, i+k] in sorted array
- We can use this property to optimize sorting
- Min heap of size k+1 is sufficient for sorting

You are given a k-sorted array and the value of k. 
Return the sorted array efficiently.

Example 1:
Input: arr = [6, 5, 3, 2, 8, 10, 9], k = 3
Output: [2, 3, 5, 6, 8, 9, 10]
Explanation: Each element is at most 3 positions away from its sorted position.

Example 2:
Input: arr = [10, 9, 8, 7, 4, 70, 60, 50], k = 4
Output: [4, 7, 8, 9, 10, 50, 60, 70]
Explanation: Each element is at most 4 positions away from its sorted position.

Example 3:
Input: arr = [1, 2, 3, 4, 5], k = 0
Output: [1, 2, 3, 4, 5]
Explanation: Array is already sorted (k=0).

Constraints:
- 1 ≤ array length ≤ 10^4
- 0 ≤ k ≤ array length
- 1 ≤ array[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log k) - using min heap approach
Auxiliary Space: O(k) - for min heap
*/

class MinHeap{
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
        
        while(i > 0 && this.harr[this.parent(i)] > this.harr[i]){
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p; // Move to parent
        }
        
        this.size++
    }
    
    decreaseKey(i, x){
        this.harr[i] = x
        
        while(i > 0 && this.harr[this.parent(i)] > this.harr[i]){
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p;
        }
    }
    
    deleteKey(i){
        if(this.size === 0 || i >= this.size) return -1
        
        this.decreaseKey(i, -Infinity)
        this.extractMin()
    }
    
    extractMin(){
        if(this.size === 0) return -1;
        
        [this.harr[0], this.harr[this.size - 1]] = [this.harr[this.size-1], this.harr[0]];
        
        let min = this.harr.pop()
        this.size--
        
        this.minHeapify(0) // root is violated
        
        return min
    }
    
    minHeapify(i){
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            
            let minIdx = i
            if(l < this.size && this.harr[l] < this.harr[minIdx]){
                minIdx = l
            }
            if(r < this.size && this.harr[r] < this.harr[minIdx]){
                minIdx = r
            }
            
            if(minIdx === i) break;
            
            [this.harr[i], this.harr[minIdx]] = [this.harr[minIdx], this.harr[i]];
            
            i=minIdx // Move to child
        }
    }
    
}

// 1. Efficient Approach : Using Min Heap
// ✅ TC = O(NlogK) <--- O((K+1)log(K+1)) + O((N-K)logK)
// ✅ SC = O(K) --> for heap
function sortKSortedArray(arr, k){
    // 1. Create Heap with size=k+1
    let h = new MinHeap(k+1)
    
    // 2. Insert k+1 items into heap
    for(let i=0; i<k+1; i++){
        h.insertKey(arr[i])
    }
    
    // 3. // Initialize index where next min to be place in the arr
    let idx = 0
    
    // 4. For all other keys: Extract min from heap & place at idx of arr. And then do idx++. And insert new key
    for(let i=k+1; i<arr.length; i++){
        let min = h.extractMin() // Extract Min
        arr[idx] = min // Place min at index=idx in arr
        idx++ // increase idx
        h.insertKey(arr[i]) // insert new key into heap
    }
    
    // 5. Extract all the remaining min's from heap
    while(h.size > 0){
        let min = h.extractMin() // Extract Min
        arr[idx] = min // Place min at index=idx in arr
        idx++ // increase idx
    }
    
    return arr
}

// 2. OR (we simulate the heap using array)
function sortKSortedArray(arr, n, k) {
    // Insert first k+1 items in a priority queue (or min
    // heap)
    //(A O(k) operation). We assume, k < n.
    //if size of array = k i.e k away from its target position
    //then
    let size = n === k ? k : k + 1;
    let pq = []; // Simulate the heap(Priority Queue) using array
    for (let i = 0; i < size; i++) {
      pq.push(arr[i]);
    }
    pq.sort((a, b) => a - b); // ✅ Maintain the Min Heap property using sort
  
    // i is index for remaining elements in arr[] and index
    // is target index of for current minimum element in
    // Min Heap 'pq'.
    let index = 0;
    for (let i = k + 1; i < n; i++) {
      arr[index++] = pq.shift(); // Extract the min element from the heap
      pq.push(arr[i]); // Insert the new element into the heap
      pq.sort((a, b) => a - b); // ✅ Maintain the Min Heap property using sort
    }
  
    while (pq.length > 0) {
      arr[index++] = pq.shift(); // Extract the min element from the heap
    }

    return arr
}

// 3. Naive Approach : Using Sorting
// ✅ TC = O(n log n)
// ✅ SC = O(1)
function sortKSortedArrayNaive(arr, k){
    return arr.sort((a, b) => a - b)
}

// Test cases
console.log("Test 1:", sortKSortedArray([6, 5, 3, 2, 8, 10, 9], 3)); // [2, 3, 5, 6, 8, 9, 10]
console.log("Test 2:", sortKSortedArray([10, 9, 8, 7, 4, 70, 60, 50], 4)); // [4, 7, 8, 9, 10, 50, 60, 70]
console.log("Test 3:", sortKSortedArray([1, 2, 3, 4, 5], 0)); // [1, 2, 3, 4, 5]

/*🎯 CORE IDEA: Use min heap of size k+1 to efficiently sort k-sorted array.
Maintain a sliding window of k+1 elements in min heap, extract minimum
element, place it in correct position, and add next element to heap.
This leverages the k-sorted property for optimal performance.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create min heap of size k+1
   - Insert first k+1 elements
   - Prepare for sliding window approach
   - Initialize output index

2️⃣ SLIDING WINDOW PROCESSING:
   - Extract minimum from heap
   - Place minimum at current output index
   - Increment output index
   - Insert next element into heap
   - Maintain heap size of k+1

3️⃣ REMAINING ELEMENTS:
   - Process remaining elements in heap
   - Extract minimums one by one
   - Place in correct positions
   - Complete the sorting process

4️⃣ HEAP MAINTENANCE:
   - Maintain min heap property
   - Handle insertions and extractions
   - Ensure efficient operations
   - Optimize for k-sorted property

5️⃣ OUTPUT CONSTRUCTION:
   - Build sorted array in-place
   - Use original array for output
   - Maintain correct ordering
   - Return sorted result

🧠 WHY THIS APPROACH?
- Leverages k-sorted property
- O(n log k) time complexity
- O(k) space complexity
- Optimal for k-sorted arrays
- Efficient heap operations

💡 KEY INSIGHTS:
- Use min heap of size k+1
- Sliding window approach
- Extract minimum and insert next
- Leverage k-sorted property
- Optimal time complexity
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Sort K-Sorted Array

INPUT: arr = [6, 5, 3, 2, 8, 10, 9], k = 3
EXPECTED OUTPUT: [2, 3, 5, 6, 8, 9, 10]

🎯 GOAL: Sort the k-sorted array efficiently!

🔍 STEP-BY-STEP PROCESS:

MIN HEAP APPROACH:

STEP 1: Initialize
Create min heap of size k+1 = 4
Insert first 4 elements: [6, 5, 3, 2]
Heap: [2, 3, 5, 6] (min heap)
Output index: 0

STEP 2: Process element at index 4 (8)
Extract min: 2
Place at arr[0]: arr = [2, 5, 3, 6, 8, 10, 9]
Insert 8: Heap = [3, 5, 6, 8]
Output index: 1

STEP 3: Process element at index 5 (10)
Extract min: 3
Place at arr[1]: arr = [2, 3, 5, 6, 8, 10, 9]
Insert 10: Heap = [5, 6, 8, 10]
Output index: 2

STEP 4: Process element at index 6 (9)
Extract min: 5
Place at arr[2]: arr = [2, 3, 5, 6, 8, 10, 9]
Insert 9: Heap = [6, 8, 9, 10]
Output index: 3

STEP 5: Extract remaining elements
Extract min: 6, Place at arr[3]: arr = [2, 3, 5, 6, 8, 10, 9]
Extract min: 8, Place at arr[4]: arr = [2, 3, 5, 6, 8, 10, 9]
Extract min: 9, Place at arr[5]: arr = [2, 3, 5, 6, 8, 9, 10]
Extract min: 10, Place at arr[6]: arr = [2, 3, 5, 6, 8, 9, 10]

🏆 FINAL RESULT: [2, 3, 5, 6, 8, 9, 10]

─────────────────────────────────────────

📊 EXAMPLE 2: Larger K Value

INPUT: arr = [10, 9, 8, 7, 4, 70, 60, 50], k = 4
EXPECTED OUTPUT: [4, 7, 8, 9, 10, 50, 60, 70]

PROCESS:

STEP 1: Initialize heap of size 5
Insert first 5 elements: [10, 9, 8, 7, 4]
Heap: [4, 7, 8, 9, 10]

STEP 2: Process remaining elements
Extract 4, insert 70: Heap = [7, 8, 9, 10, 70]
Extract 7, insert 60: Heap = [8, 9, 10, 60, 70]
Extract 8, insert 50: Heap = [9, 10, 50, 60, 70]

STEP 3: Extract remaining
Extract 9, 10, 50, 60, 70 in order

🏆 RESULT: [4, 7, 8, 9, 10, 50, 60, 70]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [6, 5, 3, 2, 8, 10, 9], k=3:

Initial heap (size 4): [2, 3, 5, 6]
After extracting 2: [3, 5, 6, 8]
After extracting 3: [5, 6, 8, 10]
After extracting 5: [6, 8, 9, 10]
After extracting 6: [8, 9, 10]
After extracting 8: [9, 10]
After extracting 9: [10]
After extracting 10: []

─────────────────────────────────────────

📊 K-SORTED PROPERTY:

WHY HEAP SIZE K+1 WORKS:

For element at position i in sorted array:
- It can be at positions [i-k, i+k] in original array
- We need to consider k+1 elements to find minimum
- Heap of size k+1 is sufficient
- Sliding window approach works perfectly

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initial heap creation: O(k log k)
- Main loop: O((n-k) log k)
- Final extraction: O(k log k)
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Variables: O(1)
- Total: O(k)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ K-SORTED PROPERTY UTILIZATION:
   - Each element at most k positions away
   - Heap of size k+1 sufficient
   - Sliding window approach
   - Optimal for this property

2️⃣ MIN HEAP EFFICIENCY:
   - Extract minimum in O(log k)
   - Insert element in O(log k)
   - Maintain heap property
   - Efficient operations

3️⃣ SLIDING WINDOW APPROACH:
   - Process elements sequentially
   - Maintain window of k+1 elements
   - Extract minimum and insert next
   - Optimal space usage

4️⃣ IN-PLACE SORTING:
   - Use original array for output
   - No additional space needed
   - Efficient memory usage
   - Clean implementation

5️⃣ OPTIMAL COMPLEXITY:
   - O(n log k) time complexity
   - O(k) space complexity
   - Better than O(n log n) sorting
   - Optimal for k-sorted arrays

💡 KEY INSIGHT:
Using min heap of size k+1 with sliding window approach to efficiently sort
k-sorted array, where we maintain a window of k+1 elements, extract minimum,
place it in correct position, and insert next element, achieving O(n log k)
time complexity by leveraging the k-sorted property!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Final extraction: O(k log k)
- Total: O(n log k)
- Optimal for k-sorted arrays

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(k)
- Variables: O(1)
- Total: O(k)
- Linear in k, not n

🎯 EDGE CASES:

CASE 1: Already Sorted (k=0)
Input: [1, 2, 3, 4, 5], k=0
Process: Heap size 1, extract and insert
Result: [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5]

CASE 2: Completely Unsorted (k=n-1)
Input: [5, 4, 3, 2, 1], k=4
Process: Heap size 5, normal processing
Result: [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5]

CASE 3: Single Element
Input: [5], k=0
Process: Heap size 1, extract only
Result: [5]
Output: [5]

CASE 4: Two Elements
Input: [2, 1], k=1
Process: Heap size 2, extract and insert
Result: [1, 2]
Output: [1, 2]

CASE 5: Large K Value
Input: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], k=9
Process: Heap size 10, normal processing
Result: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

CASE 6: Empty Array
Input: [], k=0
Process: No processing needed
Result: []
Output: []

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains sorted order: ✓
- Handles k-sorted property: ✓
- Uses optimal heap size: ✓
- Returns correct result: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 91: Create heap of size k+1
- Line 94-96: Insert first k+1 elements
- Line 99: Initialize output index
- Line 102-107: Main processing loop
- Line 110-114: Extract remaining elements

🎯 HEAP OPERATIONS:

INSERTION:
- Add element at end
- Bubble up to maintain heap property
- Time: O(log k)

EXTRACTION:
- Remove root (minimum)
- Move last element to root
- Heapify down to maintain property
- Time: O(log k)

This ensures efficient operations!

🎯 SLIDING WINDOW LOGIC:
1. Maintain heap of size k+1
2. Extract minimum element
3. Place at current output position
4. Insert next element
5. Repeat until array processed

This gives optimal performance!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(k) space complexity
- Optimal for k-sorted arrays
- In-place sorting
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires k-sorted property
- More complex than simple sorting
- Heap implementation needed
- Not optimal for general arrays

🎯 REAL-WORLD APPLICATIONS:
- External sorting
- Streaming data processing
- Database query optimization
- Network packet ordering
- Real-time data processing
- Merge operations

🎯 RELATED PROBLEMS:
- Merge k sorted arrays
- Find kth largest element
- Top k frequent elements
- Sliding window maximum
- Heap sort
- Priority queue operations

🎯 TESTING STRATEGY:
- Already sorted arrays
- Completely unsorted arrays
- Single element arrays
- Large k values
- Edge cases
- Performance testing

🎯 DEBUGGING TIPS:
- Print heap state
- Trace element extraction
- Verify output positions
- Check heap properties
- Monitor index management

🎯 COMMON MISTAKES:
- Wrong heap size (not k+1)
- Incorrect index management
- Not handling remaining elements
- Wrong heap operations
- Missing edge cases

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient index management
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain k-sorted property
- Discuss heap size choice
- Show sliding window approach
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why k+1? Element at position i can be at [i-k, i+k]
- Need to consider k+1 elements for minimum
- Sliding window of k+1 elements
- Optimal for k-sorted property

This ensures correctness!

🎯 SLIDING WINDOW PATTERN:
1. Initialize window
2. Process elements sequentially
3. Maintain window size
4. Extract minimum
5. Insert next element

This gives optimal performance!

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH (Sorting):
function sortKSortedArrayNaive(arr, k) {
    return arr.sort((a, b) => a - b);
}
- Time: O(n log n)
- Space: O(1) or O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(k)
- Optimal for k-sorted arrays
- Leverages k-sorted property

🎯 CONCLUSION:
Sorting k-sorted array is efficiently achieved using min heap of size k+1
with sliding window approach, extracting minimum elements, placing them
in correct positions, and inserting next elements, achieving O(n log k)
time complexity and O(k) space complexity by leveraging the k-sorted property!
*/