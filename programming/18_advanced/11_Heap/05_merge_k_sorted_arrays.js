/* Problem: ✅✅✅✅ Merge K Sorted Arrays ✅✅✅✅

Given k sorted arrays of different sizes, merge them into a single sorted array.
The arrays are already sorted in ascending order, and we need to combine them
while maintaining the sorted order.

The problem requires:
- Merge k sorted arrays efficiently
- Maintain sorted order in result
- Handle arrays of different sizes
- Optimize for large inputs

You are given k sorted arrays of different sizes. 
Return a single sorted array containing all elements from all arrays.

Example 1:
Input: arr = [[1,3,5,7], [2,4,6,8], [0,9,10,11]], k = 3
Output: [0,1,2,3,4,5,6,7,8,9,10,11]
Explanation: Merge all three sorted arrays maintaining order.

Example 2:
Input: arr = [[1,4,7], [2,5,8], [3,6,9]], k = 3
Output: [1,2,3,4,5,6,7,8,9]
Explanation: Merge three arrays of equal size.

Example 3:
Input: arr = [[1,2], [3,4,5], [6]], k = 3
Output: [1,2,3,4,5,6]
Explanation: Merge arrays of different sizes.

Constraints:
- 1 ≤ k ≤ 10^3
- 1 ≤ total elements ≤ 10^4
- Each array is sorted in ascending order
- 1 ≤ array[i][j] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log k) - where n is total elements
Auxiliary Space: O(k) - for min heap
*/

/* NOTE : ✅✅✅✅✅✅
  Need to Customize methods(insertKey, decreaseKey, deleteKey, extractMin, minHeapify) for this problem
  Because we are storing [original element, idx of inner array having the element, idx of element in that inner array] pairs in the heap
  And we need to compare by the first element (original element)
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
        
        while(i > 0 && this.harr[this.parent(i)][0] > this.harr[i][0]){ // ✅ For Min Heap < is used, comparing by first element (original element)
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p; // Move to parent
        }
        
        this.size++
    }
    
    decreaseKey(i, x){
        this.harr[i] = x
        
        while(i > 0 && this.harr[this.parent(i)][0] > this.harr[i][0]){ // ✅ For Min Heap < is used, comparing by first element (original element)
            let p = this.parent(i);
            [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
            i=p;
        }
    }
    
    deleteKey(i){
        if(this.size === 0 || i >= this.size) return -1
        
        this.decreaseKey(i, [-Infinity, this.harr[i][1], this.harr[i][2]]) // ✅ For minHeap --> decreaseKey(i, [-Infinity, arrayIndex, elementIndex])
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
            if(l < this.size && this.harr[l][0] < this.harr[minIdx][0]){ // ✅ For Min Heap < is used, comparing by first element (original element)
                minIdx = l
            }
            if(r < this.size && this.harr[r][0] < this.harr[minIdx][0]){ // ✅ For Min Heap < is used, comparing by first element (original element)
                minIdx = r
            }
            
            if(minIdx === i) break;
            
            [this.harr[i], this.harr[minIdx]] = [this.harr[minIdx], this.harr[i]];
            
            i=minIdx // Move to child
        }
    }
    
}

// ✅ TC = O(n log k) - where n is total elements, k heap operations per element
// ✅ SC = O(k) --> for min heap
function mergeKSortedArrays(arr, k){
    // 1. Create Min Heap (to store k elements from k arrays)
    let h = new MinHeap(k)
    
    // 2. Calculate total elements and insert first element from each array
    let totalElCount = 0
    for(let i=0; i<k; i++){
        totalElCount += arr[i].length
        h.insertKey([arr[i][0], i, 0]) // [original element, idx of inner array having the element, idx of element in that inner array]
    }
    
    // 3. Extract minimum elements and merge
    let res = new Array(totalElCount)
    let i=0;
    while(h.size > 0){
       let [el, arrIdx, elIdx] = h.extractMin() // Extract the min element from the heap
       elIdx++ // Increment the index of the element in the inner array
       res[i] = el // Add the element to the result array
       i++ // Increment the index of the result array
       if(elIdx < arr[arrIdx].length){ // If the index of the element in the inner array is less than the length of the inner array, then insert the next element into the heap
           h.insertKey([arr[arrIdx][elIdx], arrIdx, elIdx]) // Insert the next element into the heap
       }
       // If no elements left in the inner array, then do nothing. Just repeat the process for the next min.
    }
    
    return res
}

// Test cases
console.log("Test 1:", mergeKSortedArrays([[1,3,5,7], [2,4,6,8], [0,9,10,11]], 3)); // [0,1,2,3,4,5,6,7,8,9,10,11]
console.log("Test 2:", mergeKSortedArrays([[1,4,7], [2,5,8], [3,6,9]], 3)); // [1,2,3,4,5,6,7,8,9]
console.log("Test 3:", mergeKSortedArrays([[1,2], [3,4,5], [6]], 3)); // [1,2,3,4,5,6]

/*🎯 CORE IDEA: Use min heap of size k to efficiently merge k sorted arrays.
Maintain a min heap containing one element from each of the k arrays. At each
step, extract the minimum element and add the next element from the same array
to the heap. This ensures we always have the smallest available element at the top.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create min heap of size k
   - Insert first element from each array
   - Store [element, arrayIndex, elementIndex] triples
   - Prepare for element-by-element merging

2️⃣ ELEMENT EXTRACTION:
   - Extract minimum element from heap
   - Add element to result array
   - Increment element index in source array
   - Prepare for next element insertion

3️⃣ ELEMENT INSERTION:
   - Check if more elements exist in source array
   - If yes, insert next element from same array
   - If no, continue with remaining heap elements
   - Maintain heap size of k

4️⃣ HEAP MAINTENANCE:
   - Maintain min heap property on elements
   - Handle insertions and extractions
   - Ensure efficient operations
   - Keep one element per array

5️⃣ RESULT PREPARATION:
   - Extract all elements in sorted order
   - Return final merged array
   - Handle arrays of different sizes

🧠 WHY THIS APPROACH?
- Min heap maintains smallest available element
- O(n log k) time complexity
- O(k) space complexity
- Efficient for large inputs
- Optimal for this problem

💡 KEY INSIGHTS:
- Use min heap of size k
- Store [element, arrayIndex, elementIndex] triples
- Extract minimum and insert next from same array
- Maintain one element per array
- Handle different array sizes
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Merge K Sorted Arrays

INPUT: arr = [[1,3,5,7], [2,4,6,8], [0,9,10,11]], k = 3
EXPECTED OUTPUT: [0,1,2,3,4,5,6,7,8,9,10,11]

🎯 GOAL: Merge three sorted arrays efficiently!

🔍 STEP-BY-STEP PROCESS:

MIN HEAP APPROACH:

STEP 1: Initialize
Create min heap of size k = 3
Insert first element from each array:
- arr[0][0] = 1 → [1, 0, 0]
- arr[1][0] = 2 → [2, 1, 0]
- arr[2][0] = 0 → [0, 2, 0]

Heap: [[0, 2, 0], [1, 0, 0], [2, 1, 0]] (min heap by element)
Minimum: 0

STEP 2: Extract minimum and merge
Extract: [0, 2, 0] → res[0] = 0
Increment: elIdx = 1
Insert next: [9, 2, 1] (arr[2][1] = 9)
Heap: [[1, 0, 0], [2, 1, 0], [9, 2, 1]]

STEP 3: Continue extraction
Extract: [1, 0, 0] → res[1] = 1
Increment: elIdx = 1
Insert next: [3, 0, 1] (arr[0][1] = 3)
Heap: [[2, 1, 0], [3, 0, 1], [9, 2, 1]]

STEP 4: Continue extraction
Extract: [2, 1, 0] → res[2] = 2
Increment: elIdx = 1
Insert next: [4, 1, 1] (arr[1][1] = 4)
Heap: [[3, 0, 1], [4, 1, 1], [9, 2, 1]]

Continue this process until all elements are extracted...

🏆 FINAL RESULT: [0,1,2,3,4,5,6,7,8,9,10,11]

─────────────────────────────────────────

📊 EXAMPLE 2: Different Array Sizes

INPUT: arr = [[1,2], [3,4,5], [6]], k = 3
EXPECTED OUTPUT: [1,2,3,4,5,6]

PROCESS:

STEP 1: Initialize heap
Heap: [[1, 0, 0], [3, 1, 0], [6, 2, 0]]

STEP 2: Extract and merge
Extract: [1, 0, 0] → res[0] = 1
Insert: [2, 0, 1] (arr[0][1] = 2)
Heap: [[2, 0, 1], [3, 1, 0], [6, 2, 0]]

STEP 3: Continue
Extract: [2, 0, 1] → res[1] = 2
No more elements in arr[0], skip insertion
Heap: [[3, 1, 0], [6, 2, 0]]

Continue until all elements extracted...

🏆 RESULT: [1,2,3,4,5,6]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [[1,3,5,7], [2,4,6,8], [0,9,10,11]], k=3:

Initial heap: [[0, 2, 0], [1, 0, 0], [2, 1, 0]]
After extracting 0: [[1, 0, 0], [2, 1, 0], [9, 2, 1]]
After extracting 1: [[2, 1, 0], [3, 0, 1], [9, 2, 1]]
After extracting 2: [[3, 0, 1], [4, 1, 1], [9, 2, 1]]

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY MIN HEAP WORKS:

- Root contains minimum element across all arrays
- Easy to extract next element in sorted order
- Efficient insertion of next element from same array
- Maintains heap property
- Handles different array sizes

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initial heap creation: O(k log k)
- Main loop: O(n log k) where n is total elements
- Total: O(n log k)

SPACE COMPLEXITY:
- Heap storage: O(k)
- Result array: O(n)
- Total: O(n + k)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MIN HEAP PROPERTY:
   - Root contains minimum element
   - Easy to extract next element
   - Efficient insertion strategy
   - Maintains sorted order

2️⃣ EXTRACTION STRATEGY:
   - Extract minimum element
   - Add to result array
   - Increment index in source array
   - Insert next element if available

3️⃣ EFFICIENT PROCESSING:
   - Process elements sequentially
   - O(log k) operations per element
   - Optimal for large inputs
   - Better than naive merging

4️⃣ SPACE OPTIMIZATION:
   - Only store k elements in heap
   - O(k) heap space complexity
   - Independent of individual array sizes
   - Efficient memory usage

5️⃣ RESULT PREPARATION:
   - Extract all elements
   - Maintain sorted order
   - Return merged array
   - Handle edge cases

💡 KEY INSIGHT:
Using min heap of size k to maintain one element from each of k sorted arrays,
where we extract the minimum element and insert the next element from the same
array, ensuring we always have the smallest available element at the top,
achieving O(n log k) time complexity and O(n + k) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial heap creation: O(k log k)
- Main processing loop: O(n log k)
- Total: O(n log k)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(k)
- Result array: O(n)
- Variables: O(1)
- Total: O(n + k)
- Linear in total elements

🎯 EDGE CASES:

CASE 1: Single array
Input: [[1,2,3,4,5]], k=1
Process: Only one array
Result: [1,2,3,4,5]
Output: [1,2,3,4,5]

CASE 2: Empty arrays
Input: [[], [], []], k=3
Process: All arrays empty
Result: []
Output: []

CASE 3: Single element arrays
Input: [[1], [2], [3]], k=3
Process: Each array has one element
Result: [1,2,3]
Output: [1,2,3]

CASE 4: One large array
Input: [[1,2,3,4,5], [6], [7]], k=3
Process: One array much larger
Result: [1,2,3,4,5,6,7]
Output: [1,2,3,4,5,6,7]

CASE 5: All arrays same size
Input: [[1,4,7], [2,5,8], [3,6,9]], k=3
Process: Equal size arrays
Result: [1,2,3,4,5,6,7,8,9]
Output: [1,2,3,4,5,6,7,8,9]

CASE 6: Duplicate elements
Input: [[1,1,2], [1,2,3], [2,3,4]], k=3
Process: Handle duplicates
Result: [1,1,1,2,2,2,3,3,4]
Output: [1,1,1,2,2,2,3,3,4]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains sorted order: ✓
- Handles different array sizes: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 136: Create heap of size k
- Line 140-143: Insert first element from each array
- Line 148-157: Extract minimum and merge
- Line 159: Return final result

🎯 HEAP OPERATIONS:

INSERTION:
- Add [element, arrayIndex, elementIndex] triple at end
- Bubble up to maintain heap property
- Time: O(log k)

EXTRACTION:
- Remove root (minimum element)
- Move last element to root
- Heapify down to maintain property
- Time: O(log k)

This ensures efficient operations!

🎯 EXTRACTION LOGIC:
let [el, arrIdx, elIdx] = h.extractMin();
elIdx++;
res[i] = el;
i++;
if(elIdx < arr[arrIdx].length){
    h.insertKey([arr[arrIdx][elIdx], arrIdx, elIdx]);
}

This maintains sorted order!

🎯 ADVANTAGES:
- O(n log k) time complexity
- O(n + k) space complexity
- Optimal for large inputs
- Handles different array sizes
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than naive approach
- Additional space for heap
- Not optimal for small k

🎯 REAL-WORLD APPLICATIONS:
- Database query optimization
- External sorting algorithms
- Distributed computing
- Data processing pipelines
- Competitive programming
- System design

🎯 RELATED PROBLEMS:
- Merge two sorted arrays
- Merge k sorted linked lists
- External merge sort
- Priority queue operations
- Heap sort
- Divide and conquer algorithms

🎯 TESTING STRATEGY:
- Single array
- Empty arrays
- Single element arrays
- Different array sizes
- Equal size arrays
- Duplicate elements

🎯 DEBUGGING TIPS:
- Print heap state with triples
- Trace element extractions
- Verify heap properties
- Check array index bounds
- Monitor heap size

🎯 COMMON MISTAKES:
- Wrong heap size (not k)
- Incorrect triple format
- Array index out of bounds
- Missing element insertion
- Wrong extraction logic

🎯 BEST PRACTICES:
- Use correct heap size
- Handle all edge cases
- Maintain heap properties
- Efficient triple handling
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain min heap approach
- Discuss extraction strategy
- Show heap operations
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why size k? Need one element per array
- Min heap root = minimum across all arrays
- Easy to extract next element
- Efficient insertion strategy

This ensures correctness!

🎯 EXTRACTION STRATEGY:
1. Extract minimum element from heap
2. Add to result array
3. Increment index in source array
4. Insert next element if available
5. Repeat until heap empty

This gives optimal performance!

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH:
function mergeKSortedArraysNaive(arr, k) {
    let result = [];
    for(let i = 0; i < k; i++) {
        result = result.concat(arr[i]);
    }
    return result.sort((a, b) => a - b);
}
- Time: O(n log n)
- Space: O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log k)
- Space: O(n + k)
- Optimal for k << n
- Efficient for large inputs

🎯 CONCLUSION:
Merging k sorted arrays is efficiently achieved using min heap of size k,
maintaining one element from each array, extracting minimum and inserting
next element from same array, ensuring sorted order throughout the process,
achieving O(n log k) time complexity and O(n + k) space complexity!
*/