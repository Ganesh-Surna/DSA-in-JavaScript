/* Problem: ✅✅✅✅ Find K Smallest Elements ✅✅✅✅

Given an array of integers and an integer k, find the k smallest elements 
from the array. The elements should be returned in ascending order.

The problem requires:
- Find k smallest elements efficiently
- Handle duplicates correctly
- Return elements in ascending order
- Optimize for large arrays

You are given an array of integers and an integer k. 
Return an array containing the k smallest elements in ascending order.

Example 1:
Input: arr = [1, 23, 12, 9, 30, 2, 50], k = 3
Output: [1, 2, 9]
Explanation: The 3 smallest elements are 1, 2, and 9.

Example 2:
Input: arr = [1, 23, 12, 9, 30, 2, 50], k = 4
Output: [1, 2, 9, 12]
Explanation: The 4 smallest elements are 1, 2, 9, and 12.

Example 3:
Input: arr = [7, 10, 4, 3, 20, 15], k = 2
Output: [3, 4]
Explanation: The 2 smallest elements are 3 and 4.

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

// 1. Efficient Approach : Using Max Heap
// ✅ TC = O(n log k) - n elements, each heap operation O(log k)
// ✅ SC = O(k) --> for heap
function kSmallestElements(arr, k){
    // 1. Create Max Heap ( to store k smallest elements )
    let h = new MaxHeap(k)
    
    // 2. Insert the first k elements into the heap
    for(let i=0; i<k; i++){
        h.insertKey(arr[i])
    }
    
    // 3. Process the remaining elements
    for(let i=k; i<arr.length; i++){
        if(h.harr[0] > arr[i]){
            // If the top(Max of k smallest elements) of the heap(size k) > new element, then the new element can be in the heap(k smallest elements), so extract max & insert new element
            h.extractMax()
            h.insertKey(arr[i])
        }
    }
    
    // 4. Extract result 
    let res = []
    while(h.size > 0){
        let max = h.extractMax()
        res.push(max)
    }
    // If u want to print in correct order(ASC), then sort(klogk)
    res.sort((a, b)=>a-b)
    
    return res
}


// 2. Naive Approach : Using Sorting
// ✅ TC = O(NlogN)
// ✅ SC = O(1)
function kSmallestElementsNaive(arr, k){
    return arr.sort((a, b)=>a-b).slice(0, k)
}

// Test cases
console.log("Test 1:", kSmallestElements([1, 23, 12, 9, 30, 2, 50], 3)); // [1, 2, 9]
console.log("Test 2:", kSmallestElements([1, 23, 12, 9, 30, 2, 50], 4)); // [1, 2, 9, 12]
console.log("Test 3:", kSmallestElements([7, 10, 4, 3, 20, 15], 2)); // [3, 4]

/*🎯 CORE IDEA: Use max heap of size k to efficiently find k smallest elements.
Maintain a max heap containing the k smallest elements seen so far. For each
new element, if it's smaller than the maximum in heap, replace the maximum
with the new element. This keeps the k smallest elements in the heap.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create max heap of size k
   - Insert first k elements
   - Prepare for comparison-based filtering
   - Initialize with first k elements

2️⃣ ELEMENT PROCESSING:
   - Process remaining elements one by one
   - Compare with maximum element in heap
   - If current element < heap maximum:
     - Remove maximum from heap
     - Insert current element
   - Maintain heap size of k

3️⃣ RESULT EXTRACTION:
   - Extract all elements from heap
   - Store in result array
   - Sort in ascending order
   - Return k smallest elements

4️⃣ HEAP MAINTENANCE:
   - Maintain max heap property
   - Handle insertions and extractions
   - Ensure efficient operations
   - Keep only k smallest elements

5️⃣ OUTPUT PREPARATION:
   - Extract elements from heap
   - Sort in ascending order
   - Return final result
   - Handle edge cases

🧠 WHY THIS APPROACH?
- Max heap maintains k smallest elements
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large arrays
- Optimal for this problem

💡 KEY INSIGHTS:
- Use max heap of size k
- Replace maximum when smaller element found
- Maintain k smallest elements
- Sort result in ascending order
- Efficient space usage
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find K Smallest Elements

INPUT: arr = [1, 23, 12, 9, 30, 2, 50], k = 3
EXPECTED OUTPUT: [1, 2, 9]

🎯 GOAL: Find the 3 smallest elements efficiently!

🔍 STEP-BY-STEP PROCESS:

MAX HEAP APPROACH:

STEP 1: Initialize
Create max heap of size k = 3
Insert first 3 elements: [1, 23, 12]
Heap: [23, 1, 12] (max heap)
Maximum: 23

STEP 2: Process element 9 (index 3)
Compare: 9 < 23 (heap maximum) ✓
Extract max: 23
Insert 9: Heap = [12, 1, 9]
Maximum: 12

STEP 3: Process element 30 (index 4)
Compare: 30 < 12 (heap maximum) ✗
Skip element 30
Heap remains: [12, 1, 9]

STEP 4: Process element 2 (index 5)
Compare: 2 < 12 (heap maximum) ✓
Extract max: 12
Insert 2: Heap = [9, 1, 2]
Maximum: 9

STEP 5: Process element 50 (index 6)
Compare: 50 < 9 (heap maximum) ✗
Skip element 50
Heap remains: [9, 1, 2]

STEP 6: Extract result
Extract all elements: [9, 1, 2]
Sort in ascending order: [1, 2, 9]

🏆 FINAL RESULT: [1, 2, 9]

─────────────────────────────────────────

📊 EXAMPLE 2: Larger K Value

INPUT: arr = [1, 23, 12, 9, 30, 2, 50], k = 4
EXPECTED OUTPUT: [1, 2, 9, 12]

PROCESS:

STEP 1: Initialize heap with first 4 elements
Heap: [23, 1, 12, 9]
Maximum: 23

STEP 2: Process remaining elements
30 < 23: No (skip)
2 < 23: Replace 23 with 2 → Heap: [12, 1, 9, 2]
50 < 12: No (skip)

STEP 3: Extract and sort
Extract: [12, 1, 9, 2]
Sort: [1, 2, 9, 12]

🏆 RESULT: [1, 2, 9, 12]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [1, 23, 12, 9, 30, 2, 50], k=3:

Initial heap: [23, 1, 12]
After processing 9: [12, 1, 9]
After processing 30: [12, 1, 9] (no change)
After processing 2: [9, 1, 2]
After processing 50: [9, 1, 2] (no change)

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MAX HEAP WORKS:

- Root contains maximum of k smallest elements
- If new element < maximum, it's among k smallest
- Replace maximum with new element
- Maintain heap property
- Keep exactly k smallest elements

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

1️⃣ MAX HEAP PROPERTY:
   - Root contains maximum element
   - Easy to compare with new elements
   - Efficient replacement strategy
   - Maintains k smallest elements

2️⃣ REPLACEMENT STRATEGY:
   - If new element < heap maximum
   - Replace maximum with new element
   - Maintain heap size of k
   - Keep k smallest elements

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
   - Sort in ascending order
   - Return k smallest elements
   - Handle edge cases

💡 KEY INSIGHT:
Using max heap of size k to maintain k smallest elements, where we replace
the maximum element when a smaller element is found, ensuring we always
have the k smallest elements seen so far, achieving O(n log k) time
complexity and O(k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O((n-k) log k)
- Final extraction: O(k log k)
- Sorting result: O(k log k)
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
Input: [1, 2, 3, 4, 5], k=5
Process: All elements in heap
Result: [1, 2, 3, 4, 5]
Output: [1, 2, 3, 4, 5]

CASE 2: k equals 1
Input: [1, 2, 3, 4, 5], k=1
Process: Find minimum element
Result: [1]
Output: [1]

CASE 3: All elements same
Input: [5, 5, 5, 5, 5], k=3
Process: All elements equal
Result: [5, 5, 5]
Output: [5, 5, 5]

CASE 4: Ascending order
Input: [1, 2, 3, 4, 5], k=3
Process: First k elements are smallest
Result: [1, 2, 3]
Output: [1, 2, 3]

CASE 5: Descending order
Input: [5, 4, 3, 2, 1], k=3
Process: Last k elements are smallest
Result: [3, 2, 1]
Output: [1, 2, 3]

CASE 6: Single element
Input: [5], k=1
Process: Only one element
Result: [5]
Output: [5]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains k smallest elements: ✓
- Handles duplicates correctly: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 132: Create heap of size k
- Line 135-137: Insert first k elements
- Line 140-146: Process remaining elements
- Line 149-153: Extract result
- Line 155: Sort in ascending order

🎯 HEAP OPERATIONS:

INSERTION:
- Add element at end
- Bubble up to maintain heap property
- Time: O(log k)

EXTRACTION:
- Remove root (maximum)
- Move last element to root
- Heapify down to maintain property
- Time: O(log k)

This ensures efficient operations!

🎯 REPLACEMENT LOGIC:
if (h.harr[0] > arr[i]) {
    h.extractMax();      // Remove maximum
    h.insertKey(arr[i]);  // Insert smaller element
}

This maintains k smallest elements!

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
- Bottom k recommendations
- Ranking systems (worst performers)
- Data analysis (outliers)
- Performance metrics (slowest)
- Competitive programming
- Database queries (LIMIT)

🎯 RELATED PROBLEMS:
- Find kth smallest element
- Bottom k frequent elements
- Merge k sorted arrays
- Sliding window minimum
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
- Explain max heap approach
- Discuss replacement strategy
- Show heap operations
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need to store k smallest elements
- Max heap root = maximum of k smallest
- Easy to compare with new elements
- Efficient replacement strategy

This ensures correctness!

🎯 REPLACEMENT STRATEGY:
1. Compare new element with heap maximum
2. If smaller, replace maximum
3. Maintain heap property
4. Keep exactly k elements
5. Process all elements

This gives optimal performance!

🎯 COMPARISON WITH SORTING:

SORTING APPROACH:
function kSmallestElementsSort(arr, k) {
    arr.sort((a, b) => a - b);
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
Finding k smallest elements is efficiently achieved using max heap of size k,
maintaining k smallest elements seen so far, replacing maximum when smaller
element found, and sorting result in ascending order, achieving O(n log k)
time complexity and O(k) space complexity!
*/