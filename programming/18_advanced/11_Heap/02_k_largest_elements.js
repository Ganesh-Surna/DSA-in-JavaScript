/* Problem: ✅✅✅✅ Find K Largest Elements ✅✅✅✅

Given an array of integers and an integer k, find the k largest elements 
from the array. The elements should be returned in descending order.

The problem requires:
- Find k largest elements efficiently
- Handle duplicates correctly
- Return elements in descending order
- Optimize for large arrays

You are given an array of integers and an integer k. 
Return an array containing the k largest elements in descending order.

Example 1:
Input: arr = [1, 23, 12, 9, 30, 2, 50], k = 3
Output: [50, 30, 23]
Explanation: The 3 largest elements are 50, 30, and 23.

Example 2:
Input: arr = [1, 23, 12, 9, 30, 2, 50], k = 4
Output: [50, 30, 23, 12]
Explanation: The 4 largest elements are 50, 30, 23, and 12.

Example 3:
Input: arr = [7, 10, 4, 3, 20, 15], k = 2
Output: [20, 15]
Explanation: The 2 largest elements are 20 and 15.

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ k ≤ array length
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
// ✅ TC = O(n log k) - n elements, each heap operation O(log k)
// ✅ SC = O(k) --> for heap
function kLargestElements(arr, k){
    // 1. Create Min Heap ( to store k largest elements )
    let h = new MinHeap(k)
    
    // 2. Insert the first k elements into the heap
    for(let i=0; i<k; i++){
        h.insertKey(arr[i])
    }
    
    // 3. Process the remaining elements
    for(let i=k; i<arr.length; i++){
        if(h.harr[0] < arr[i]){
            // If the top(Min of k largest elements) of the heap(size k) < new element, then the new element can be in the heap(k largest elements), so extract min & insert new element
            h.extractMin()
            h.insertKey(arr[i])
        }
    }
    
    // 4.
    let res = []
    while(h.size > 0){
        let min = h.extractMin()
        res.push(min)
    }
    // If u want to print in correct order(DESC), then sort(klogk)
    res.sort((a, b)=>b-a)
    
    return res
}


// 2. Naive Approach : Using Sorting
// ✅ TC = O(NlogN)
// ✅ SC = O(1)
function kLargestElementsNaive(arr, k){
    return arr.sort((a, b)=>b-a).slice(0, k)
}

// Test cases
console.log("Test 1:", kLargestElements([1, 23, 12, 9, 30, 2, 50], 3)); // [50, 30, 23]
console.log("Test 2:", kLargestElements([1, 23, 12, 9, 30, 2, 50], 4)); // [50, 30, 23, 12]
console.log("Test 3:", kLargestElements([7, 10, 4, 3, 20, 15], 2)); // [20, 15]

/*🎯 CORE IDEA: Use min heap of size k to efficiently find k largest elements.
Maintain a min heap containing the k largest elements seen so far. For each
new element, if it's larger than the minimum in heap, replace the minimum
with the new element. This keeps the k largest elements in the heap.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create min heap of size k
   - Insert first k elements
   - Prepare for comparison-based filtering
   - Initialize with first k elements

2️⃣ ELEMENT PROCESSING:
   - Process remaining elements one by one
   - Compare with minimum element in heap
   - If current element > heap minimum:
     - Remove minimum from heap
     - Insert current element
   - Maintain heap size of k

3️⃣ RESULT EXTRACTION:
   - Extract all elements from heap
   - Store in result array
   - Sort in descending order
   - Return k largest elements

4️⃣ HEAP MAINTENANCE:
   - Maintain min heap property
   - Handle insertions and extractions
   - Ensure efficient operations
   - Keep only k largest elements

5️⃣ OUTPUT PREPARATION:
   - Extract elements from heap
   - Sort in descending order
   - Return final result
   - Handle edge cases

🧠 WHY THIS APPROACH?
- Min heap maintains k largest elements
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use min heap of size k
- Replace minimum when larger element found
- Maintain k largest elements
- Sort result in descending order
- Efficient space usage
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find K Largest Elements

INPUT: arr = [1, 23, 12, 9, 30, 2, 50], k = 3
EXPECTED OUTPUT: [50, 30, 23]

🎯 GOAL: Find the 3 largest elements efficiently!

🔍 STEP-BY-STEP PROCESS:

MIN HEAP APPROACH:

STEP 1: Initialize
Create min heap of size k = 3
Insert first 3 elements: [1, 23, 12]
Heap: [1, 23, 12] (min heap)
Minimum: 1

STEP 2: Process element 9 (index 3)
Compare: 9 > 1 (heap minimum) ✓
Extract min: 1
Insert 9: Heap = [9, 23, 12]
Minimum: 9

STEP 3: Process element 30 (index 4)
Compare: 30 > 9 (heap minimum) ✓
Extract min: 9
Insert 30: Heap = [12, 23, 30]
Minimum: 12

STEP 4: Process element 2 (index 5)
Compare: 2 > 12 (heap minimum) ✗
Skip element 2
Heap remains: [12, 23, 30]

STEP 5: Process element 50 (index 6)
Compare: 50 > 12 (heap minimum) ✓
Extract min: 12
Insert 50: Heap = [23, 30, 50]
Minimum: 23

STEP 6: Extract result
Extract all elements: [23, 30, 50]
Sort in descending order: [50, 30, 23]

🏆 FINAL RESULT: [50, 30, 23]

─────────────────────────────────────────

📊 EXAMPLE 2: Larger K Value

INPUT: arr = [1, 23, 12, 9, 30, 2, 50], k = 4
EXPECTED OUTPUT: [50, 30, 23, 12]

PROCESS:

STEP 1: Initialize heap with first 4 elements
Heap: [1, 9, 12, 23]
Minimum: 1

STEP 2: Process remaining elements
30 > 1: Replace 1 with 30 → Heap: [9, 12, 23, 30]
2 > 9: No (skip)
50 > 9: Replace 9 with 50 → Heap: [12, 23, 30, 50]

STEP 3: Extract and sort
Extract: [12, 23, 30, 50]
Sort: [50, 30, 23, 12]

🏆 RESULT: [50, 30, 23, 12]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [1, 23, 12, 9, 30, 2, 50], k=3:

Initial heap: [1, 23, 12]
After processing 9: [9, 23, 12]
After processing 30: [12, 23, 30]
After processing 2: [12, 23, 30] (no change)
After processing 50: [23, 30, 50]

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MIN HEAP WORKS:

- Root contains minimum of k largest elements
- If new element > minimum, it's among k largest
- Replace minimum with new element
- Maintain heap property
- Keep exactly k largest elements

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initial heap creation: O(k log k)
- Main loop: O((n-k) log k)
- Final extraction: O(k log k)
- Sorting: O(k log k)
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Result array: O(k)
- Total: O(k)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MIN HEAP PROPERTY:
   - Root contains minimum element
   - Easy to compare with new elements
   - Efficient replacement strategy
   - Maintains k largest elements

2️⃣ REPLACEMENT STRATEGY:
   - If new element > heap minimum
   - Replace minimum with new element
   - Maintain heap size of k
   - Keep k largest elements

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
   - Sort in descending order
   - Return k largest elements
   - Handle edge cases

💡 KEY INSIGHT:
Using min heap of size k to maintain k largest elements, where we replace
the minimum element when a larger element is found, ensuring we always
have the k largest elements seen so far, achieving O(n log k) time
complexity and O(k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Final extraction: O(k log k)
- Sorting result: O(k log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(k)
- Result array: O(k)
- Variables: O(1)
- Total: O(k)
- Linear in k, not n

🎯 EDGE CASES:

CASE 1: k equals array length
Input: [1, 2, 3, 4, 5], k=5
Process: All elements in heap
Result: [5, 4, 3, 2, 1]
Output: [5, 4, 3, 2, 1]

CASE 2: k equals 1
Input: [1, 2, 3, 4, 5], k=1
Process: Find maximum element
Result: [5]
Output: [5]

CASE 3: All elements same
Input: [5, 5, 5, 5, 5], k=3
Process: All elements equal
Result: [5, 5, 5]
Output: [5, 5, 5]

CASE 4: Descending order
Input: [5, 4, 3, 2, 1], k=3
Process: First k elements are largest
Result: [5, 4, 3]
Output: [5, 4, 3]

CASE 5: Ascending order
Input: [1, 2, 3, 4, 5], k=3
Process: Last k elements are largest
Result: [5, 4, 3]
Output: [5, 4, 3]

CASE 6: Single element
Input: [5], k=1
Process: Only one element
Result: [5]
Output: [5]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains k largest elements: ✓
- Handles duplicates correctly: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 130: Create heap of size k
- Line 132-134: Insert first k elements
- Line 136-140: Process remaining elements
- Line 142-146: Extract result
- Line 148: Sort in descending order

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

🎯 REPLACEMENT LOGIC:
if (h.harr[0] < arr[i]) {
    h.extractMin();      // Remove minimum
    h.insertKey(arr[i]);  // Insert larger element
}

This maintains k largest elements!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(k) space complexity
- Optimal for large arrays
- Handles duplicates correctly
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than sorting
- Additional sorting step needed
- Not optimal for small k

🎯 REAL-WORLD APPLICATIONS:
- Top k recommendations
- Ranking systems
- Data analysis
- Performance metrics
- Competitive programming
- Database queries

🎯 RELATED PROBLEMS:
- Find kth largest element
- Top k frequent elements
- Merge k sorted arrays
- Sliding window maximum
- Heap sort
- Priority queue operations

🎯 TESTING STRATEGY:
- k equals array length
- k equals 1
- All elements same
- Ascending/descending order
- Random arrays
- Edge cases

🎯 DEBUGGING TIPS:
- Print heap state
- Trace element comparisons
- Verify heap properties
- Check result extraction
- Monitor heap size

🎯 COMMON MISTAKES:
- Wrong heap size (not k)
- Incorrect comparison logic
- Not handling duplicates
- Wrong sorting order
- Missing edge cases

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient comparison logic
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain min heap approach
- Discuss replacement strategy
- Show heap operations
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k largest elements
- Min heap root = minimum of k largest
- Easy to compare with new elements
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Compare new element with heap minimum
2. If larger, replace minimum
3. Maintain heap property
4. Keep exactly k elements
5. Process all elements

This gives optimal performance!

🎯 COMPARISON WITH SORTING:

SORTING APPROACH:
function kLargestElementsSort(arr, k) {
    arr.sort((a, b) => b - a);
    return arr.slice(0, k);
}
- Time: O(n log n)
- Space: O(1) or O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(k)
- Optimal for k << n
- Efficient for large arrays

🎯 CONCLUSION:
Finding k largest elements is efficiently achieved using min heap of size k,
maintaining k largest elements seen so far, replacing minimum when larger
element found, and sorting result in descending order, achieving O(n log k)
time complexity and O(k) space complexity!
*/