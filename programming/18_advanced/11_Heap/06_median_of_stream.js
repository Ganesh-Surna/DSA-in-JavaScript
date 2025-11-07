/* Problem: ✅✅✅✅ Median of Data Stream ✅✅✅✅

Given a stream of integers, find the median of all elements seen so far.
The median is the middle value in a sorted list. For an even number of elements,
the median is the average of the two middle elements.

The problem requires:
- Find median of all elements seen so far
- Handle both odd and even number of elements
- Maintain efficient insertion and median calculation
- Optimize for large streams

You are given a stream of integers. After each element is added to the stream,
return the median of all elements seen so far.

Example 1:
Input: arr = [25, 7, 10, 15, 20]
Output: [25, 16, 10, 12.5, 15]
Explanation: 
- After 25: median = 25
- After 7: median = (25+7)/2 = 16
- After 10: median = 10 (middle of [7,10,25])
- After 15: median = (10+15)/2 = 12.5
- After 20: median = 15 (middle of [7,10,15,20,25])

Example 2:
Input: arr = [5, 15, 1, 3]
Output: [5, 10, 5, 4]
Explanation:
- After 5: median = 5
- After 15: median = (5+15)/2 = 10
- After 1: median = 5 (middle of [1,5,15])
- After 3: median = (3+5)/2 = 4

Constraints:
- 1 ≤ stream length ≤ 10^4
- 1 ≤ stream[i] ≤ 10^5
- Elements are added one by one

Expected Complexities:
Time Complexity: O(n log n) - using two heaps approach
Auxiliary Space: O(n) - for storing elements
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
class MaxHeap {
constructor() {
    this.size = 0;
    this.harr = []
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

    while (i > 0 && this.harr[this.parent(i)] < this.harr[i]) {
    // ✅ For Min Heap < is used
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

    while (i > 0 && this.harr[this.parent(i)] < this.harr[i]) {
    // ✅ For Min Heap < is used
    let p = this.parent(i);
    [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
    i = p;
    }
}

deleteKey(i) {
    if (this.size === 0 || i >= this.size) return -1;

    this.increaseKey(i, Infinity); // ✅ For minHeap --> decreaseKey(i, -Infinity)
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
    if (l < this.size && this.harr[l] > this.harr[maxIdx]) {
        // ✅ For Min Heap < is used
        maxIdx = l;
    }
    if (r < this.size && this.harr[r] > this.harr[maxIdx]) {
        // ✅ For Min Heap < is used
        maxIdx = r;
    }

    if (maxIdx === i) break;

    [this.harr[i], this.harr[maxIdx]] = [this.harr[maxIdx], this.harr[i]];

    i = maxIdx; // Move to child
    }
}
}

// NOTE : No fixed capacity in Max and Min Heaps(since the heap can grow dynamically in this case)
  
// ✅ TC = O(n log n) - n elements, each heap operation O(log n)
// ✅ SC = O(n) --> for storing all elements
  // 1. Efficient Approach : Using Min and Max Heaps
  function medianOfStream(arr) {
      // 1. Initialize result array and two heaps
      let res = []
      
      // 2. Create two heaps to maintain median efficiently
      let smallerHalf = new MaxHeap() // Max Heap to store smaller half of the stream
      let greaterHalf = new MinHeap() // Min Heap to store greater half of the stream
      
      // 3. Process each element in the stream
      for(let i=0; i<arr.length; i++){
          // 4. Insert element into smaller half (max heap)
          smallerHalf.insertKey(arr[i])
          
          // 5. Move maximum from smaller half to greater half
          greaterHalf.insertKey(smallerHalf.extractMax())
          
          // 6. Balance the heaps - ensure smaller half has at most one more element
          if(greaterHalf.size > smallerHalf.size){ // If overall len is odd, the odd/extra element should be in smallerHalf
              smallerHalf.insertKey(greaterHalf.extractMin())
          }
          
          // 7. Calculate median based on heap sizes
          // Note : Not else if
          if(greaterHalf.size < smallerHalf.size){
             // Means the extra element is in smallerHalf. And the median is the Max Element(Top element) in smallerHalf
              res.push(smallerHalf.harr[0]) // Do not extract (It should be there to calculate the subsequent medians with increasing length)
          }else{
            // Means the overall_len(smallerHalf + greaterHalf) is even. And the median is the Average of Max Element(Top element) in smallerHalf and Min Element(Top element) in greaterHalf
              res.push((smallerHalf.harr[0] + greaterHalf.harr[0])/2)
          }
      }
      
      return res
  }



// 2. Alternative Approach : Using BST (Augmented BST)
// ✅ TC = O(n²) - worst case for skewed BST
// ✅ SC = O(n) --> for BST nodes
class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.leftCount = 0; // number of nodes in left subtree
  }
}
// ✅ Main function: Median of stream using BST
function medianOfStreamBST(arr) {
  let n = arr.length;
  let root = null;
  let res = [];

  for (let i = 0; i < n; i++) {
    root = insert(root, arr[i]);
    let count = i + 1;

    if (count % 2 === 1) {
      // Odd count -> middle element
      res.push(kthSmallest(root, Math.ceil(count / 2)));
    } else {
      // Even count -> average of two middles
      let m1 = kthSmallest(root, count / 2);
      let m2 = kthSmallest(root, count / 2 + 1);
      res.push((m1 + m2) / 2);
    }
  }

  return res;

  // Helper functions:
  // 1. Helper to insert node in BST and update leftCount
  function insert(root, val) {
    if (!root) return new Node(val);

    if (val <= root.val) {
      root.left = insert(root.left, val);
      root.leftCount++;
    } else {
      root.right = insert(root.right, val);
    }

    return root;
  }

  // 2. Helper to find kth smallest element in BST
  function kthSmallest(root, k) {
    if (!root) return null;

    // Rank of current node = leftCount + 1
    let rank = root.leftCount + 1;

    if (rank === k) return root.val;
    if (k < rank) return kthSmallest(root.left, k);
    return kthSmallest(root.right, k - rank);
  }
}



// 3. Naive Approach : Using Temporary Array and Sorting
// ✅ TC = O(n² log n) - n elements, each sort O(n log n)
// ✅ SC = O(n) --> for temporary array
function medianOfStreamNaive(arr) {
  let n = arr.length;
  let res = new Array(n);

  let temp = [];
  for (let i = 0; i < n; i++) {
    // ✅ TC = O(n) * O(n log n) = O(n² log n)
    temp.push(arr[i]);
    temp.sort((a, b) => a - b); // ✅ Sort the temporary array (O(n log n))
    let tempLen = temp.length;
    if (tempLen % 2 === 0) {
      res[i] = (temp[tempLen / 2 - 1] + temp[tempLen / 2]) / 2; // ✅ Floor of average of two medians
    } else {
      res[i] = temp[Math.floor(tempLen / 2)]; // ✅ Median is the middle element
    }
  }

  return res;
}

// Test cases
console.log("Test 1:", medianOfStream([25, 7, 10, 15, 20])); // [25, 16, 10, 12.5, 15]
console.log("Test 2:", medianOfStream([5, 15, 1, 3])); // [5, 10, 5, 4]
console.log("Test 3:", medianOfStream([1, 2])); // [1, 1.5]

/*🎯 CORE IDEA: Use two heaps to efficiently maintain median of a data stream.
Maintain a max heap for the smaller half and a min heap for the greater half.
The median is either the root of the max heap (odd count) or the average of
both roots (even count). This ensures O(log n) insertion and O(1) median access.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create max heap for smaller half
   - Create min heap for greater half
   - Initialize result array
   - Prepare for stream processing

2️⃣ ELEMENT INSERTION:
   - Insert new element into max heap (smaller half)
   - Move maximum from max heap to min heap
   - Ensure proper balance between heaps
   - Maintain heap properties

3️⃣ HEAP BALANCING:
   - Check if greater half has more elements
   - If yes, move minimum from min heap to max heap
   - Ensure max heap has at most one more element
   - Maintain balanced structure

4️⃣ MEDIAN CALCULATION:
   - If max heap has more elements: median = max heap root
   - If both heaps equal size: median = average of both roots
   - Add median to result array
   - Continue for next element

5️⃣ RESULT PREPARATION:
   - Process all elements in stream
   - Return array of medians
   - Handle edge cases

🧠 WHY THIS APPROACH?
- Two heaps maintain median efficiently
- O(log n) insertion time
- O(1) median access time
- Optimal space usage
- Handles both odd and even counts

💡 KEY INSIGHTS:
- Use max heap for smaller half
- Use min heap for greater half
- Balance heaps after each insertion
- Median is always at heap roots
- Maintain size difference ≤ 1
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Median of Data Stream

INPUT: arr = [25, 7, 10, 15, 20]
EXPECTED OUTPUT: [25, 16, 10, 12.5, 15]

🎯 GOAL: Find median after each element is added!

🔍 STEP-BY-STEP PROCESS:

TWO HEAPS APPROACH:

STEP 1: Insert 25
MaxHeap (smaller): [25]
MinHeap (greater): []
Median: 25 (odd count, max heap root)

STEP 2: Insert 7
Insert 7 into max heap: [7, 25]
Move max to min heap: [25]
MaxHeap: [7]
MinHeap: [25]
Median: (7 + 25) / 2 = 16 (even count)

STEP 3: Insert 10
Insert 10 into max heap: [7, 10]
Move max to min heap: [10, 25]
MaxHeap: [7]
MinHeap: [10, 25]
Balance: Move min to max heap: [7, 10]
MaxHeap: [7, 10]
MinHeap: [25]
Median: 10 (odd count, max heap root)

STEP 4: Insert 15
Insert 15 into max heap: [7, 10, 15]
Move max to min heap: [15, 25]
MaxHeap: [7, 10]
MinHeap: [15, 25]
Median: (10 + 15) / 2 = 12.5 (even count)

STEP 5: Insert 20
Insert 20 into max heap: [7, 10, 20]
Move max to min heap: [20, 15, 25]
MaxHeap: [7, 10]
MinHeap: [15, 20, 25]
Balance: Move min to max heap: [7, 10, 15]
MaxHeap: [7, 10, 15]
MinHeap: [20, 25]
Median: 15 (odd count, max heap root)

🏆 FINAL RESULT: [25, 16, 10, 12.5, 15]

─────────────────────────────────────────

📊 EXAMPLE 2: Different Stream

INPUT: arr = [5, 15, 1, 3]
EXPECTED OUTPUT: [5, 10, 5, 4]

PROCESS:

STEP 1: Insert 5
MaxHeap: [5], MinHeap: []
Median: 5

STEP 2: Insert 15
MaxHeap: [5], MinHeap: [15]
Median: (5 + 15) / 2 = 10

STEP 3: Insert 1
MaxHeap: [1, 5], MinHeap: [15]
Balance: MaxHeap: [1, 5], MinHeap: [15]
Median: 5

STEP 4: Insert 3
MaxHeap: [1, 3], MinHeap: [5, 15]
Median: (3 + 5) / 2 = 4

🏆 RESULT: [5, 10, 5, 4]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [25, 7, 10, 15, 20]:

After 25: MaxHeap=[25], MinHeap=[]
After 7: MaxHeap=[7], MinHeap=[25]
After 10: MaxHeap=[7,10], MinHeap=[25]
After 15: MaxHeap=[7,10], MinHeap=[15,25]
After 20: MaxHeap=[7,10,15], MinHeap=[20,25]

─────────────────────────────────────────

📊 HEAP PROPERTY MAINTENANCE:

WHY TWO HEAPS WORK:

- Max heap root = largest in smaller half
- Min heap root = smallest in greater half
- Median is always between these two roots
- Balanced sizes ensure correct median
- Efficient insertion and access

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Insertion: O(log n) per element
- Median access: O(1)
- Total: O(n log n)

SPACE COMPLEXITY:
- Max heap: O(n/2)
- Min heap: O(n/2)
- Total: O(n)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ TWO HEAP PROPERTY:
   - Max heap stores smaller half
   - Min heap stores greater half
   - Roots are adjacent in sorted order
   - Median is always between roots

2️⃣ INSERTION STRATEGY:
   - Insert into max heap first
   - Move maximum to min heap
   - Balance heap sizes
   - Maintain heap properties

3️⃣ BALANCING STRATEGY:
   - Ensure max heap has at most one more element
   - Move elements between heaps as needed
   - Maintain size difference ≤ 1
   - Keep median accessible

4️⃣ MEDIAN CALCULATION:
   - Odd count: max heap root
   - Even count: average of both roots
   - O(1) access time
   - Always correct median

5️⃣ EFFICIENT PROCESSING:
   - O(log n) per insertion
   - O(1) median access
   - Optimal for streams
   - Better than sorting

💡 KEY INSIGHT:
Using two heaps (max heap for smaller half, min heap for greater half) to
maintain median of a data stream, where we balance heap sizes and calculate
median from heap roots, ensuring O(log n) insertion and O(1) median access,
achieving O(n log n) total time complexity and O(n) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Insertion per element: O(log n)
- Median access: O(1)
- Total for n elements: O(n log n)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Max heap: O(n/2)
- Min heap: O(n/2)
- Result array: O(n)
- Total: O(n)
- Linear in input size

🎯 EDGE CASES:

CASE 1: Single element
Input: [5]
Process: Only one element
Result: [5]
Output: [5]

CASE 2: Two elements
Input: [1, 2]
Process: Even count
Result: [1, 1.5]
Output: [1, 1.5]

CASE 3: All same elements
Input: [3, 3, 3, 3]
Process: Duplicate elements
Result: [3, 3, 3, 3]
Output: [3, 3, 3, 3]

CASE 4: Descending order
Input: [5, 4, 3, 2, 1]
Process: Decreasing sequence
Result: [5, 4.5, 4, 3.5, 3]
Output: [5, 4.5, 4, 3.5, 3]

CASE 5: Ascending order
Input: [1, 2, 3, 4, 5]
Process: Increasing sequence
Result: [1, 1.5, 2, 2.5, 3]
Output: [1, 1.5, 2, 2.5, 3]

CASE 6: Mixed order
Input: [1, 5, 2, 4, 3]
Process: Random order
Result: [1, 3, 2, 3, 3]
Output: [1, 3, 2, 3, 3]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Maintains correct median: ✓
- Handles odd/even counts: ✓
- Returns correct result: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 228-229: Create two heaps
- Line 234: Insert into max heap
- Line 237: Move max to min heap
- Line 240-242: Balance heaps
- Line 246-252: Calculate median

🎯 HEAP OPERATIONS:

INSERTION:
- Add element at end
- Bubble up to maintain heap property
- Time: O(log n)

EXTRACTION:
- Remove root element
- Move last element to root
- Heapify down to maintain property
- Time: O(log n)

This ensures efficient operations!

🎯 BALANCING LOGIC:
if(greaterHalf.size > smallerHalf.size){
    smallerHalf.insertKey(greaterHalf.extractMin());
}

This maintains proper balance!

🎯 MEDIAN CALCULATION:
if(greaterHalf.size < smallerHalf.size){
    res.push(smallerHalf.harr[0]); // Odd count
}else{
    res.push((smallerHalf.harr[0] + greaterHalf.harr[0])/2); // Even count
}

This gives correct median!

🎯 ADVANTAGES:
- O(log n) insertion time
- O(1) median access time
- Optimal space usage
- Handles all cases correctly
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires two heap implementations
- More complex than naive approach
- Additional space for heaps
- Not optimal for small streams

🎯 REAL-WORLD APPLICATIONS:
- Real-time data analysis
- Financial market monitoring
- System performance metrics
- Data streaming applications
- Competitive programming
- System design

🎯 RELATED PROBLEMS:
- Find median in unsorted array
- Sliding window median
- Running average
- Percentile calculations
- Priority queue operations
- Heap sort

🎯 TESTING STRATEGY:
- Single element
- Two elements
- All same elements
- Ascending/descending order
- Mixed order
- Large streams

🎯 DEBUGGING TIPS:
- Print heap states
- Trace element insertions
- Verify heap properties
- Check median calculations
- Monitor heap sizes

🎯 COMMON MISTAKES:
- Wrong heap types (min vs max)
- Incorrect balancing logic
- Wrong median calculation
- Missing edge cases
- Heap property violations

🎯 BEST PRACTICES:
- Use correct heap types
- Handle all edge cases
- Maintain heap properties
- Efficient balancing logic
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain two heap approach
- Discuss balancing strategy
- Show heap operations
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 HEAP SIZE RATIONALE:
- Why two heaps? Need to maintain median efficiently
- Max heap root = largest in smaller half
- Min heap root = smallest in greater half
- Median is between these roots

This ensures correctness!

🎯 BALANCING STRATEGY:
1. Insert into max heap
2. Move max to min heap
3. Check size difference
4. Balance if needed
5. Calculate median

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

NAIVE APPROACH:
function medianOfStreamNaive(arr) {
    let temp = [];
    let res = [];
    for(let num of arr) {
        temp.push(num);
        temp.sort((a, b) => a - b);
        let len = temp.length;
        if(len % 2 === 0) {
            res.push((temp[len/2-1] + temp[len/2]) / 2);
        } else {
            res.push(temp[Math.floor(len/2)]);
        }
    }
    return res;
}
- Time: O(n² log n)
- Space: O(n)
- Simple but not optimal

HEAP APPROACH:
- Time: O(n log n)
- Space: O(n)
- Optimal for streams
- Efficient insertion and access

🎯 CONCLUSION:
Finding median of a data stream is efficiently achieved using two heaps (max heap
for smaller half, min heap for greater half), balancing heap sizes after each
insertion, and calculating median from heap roots, achieving O(log n) insertion
time, O(1) median access time, and O(n) space complexity!
*/
