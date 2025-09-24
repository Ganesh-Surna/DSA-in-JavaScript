/* Problem: ✅✅✅✅ Merge K Sorted Linked Lists ✅✅✅✅

Given an array of k linked-lists lists, each linked-list is sorted in ascending order.
Merge all the linked-lists into one sorted linked-list and return it.

Example 1:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:
Input: lists = []
Output: []
Explanation: Empty list

Example 3:
Input: lists = [[]]
Output: []
Explanation: List containing one empty list

Example 4:
Input: lists = [[1,3,7],[2,4,8],[9]]
Output: [1,2,3,4,7,8,9]
Explanation: The linked-lists are:
[
  1->3->7,
  2->4->8,
  9
]
merging them into one sorted list:
1->2->3->4->7->8->9

Constraints:
- k == lists.length
- 0 <= k <= 10^4
- 0 <= lists[i].length <= 500
- -10^4 <= lists[i][j] <= 10^4
- lists[i] is sorted in ascending order
- The sum of lists[i].length will not exceed 10^4

Expected Time Complexity: O(n log k) where n is total number of nodes
Expected Auxiliary Space: O(k) for heap approach, O(1) for divide & conquer
*/

// I. Approach: Using Divide & Conquer
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Merge two sorted linked lists
function mergeTwoLists(l1, l2) {
  let dummy = new Node(-1);
  let tail = dummy;

  while (l1 && l2) {
    if (l1.data <= l2.data) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  // attach the remaining list
  if (l1) tail.next = l1;
  if (l2) tail.next = l2;

  return dummy.next;
}

// ✅ TC = O(nklogk) --> O(k) * O(logk) * n nodes
// ✅ SC = O(1)
function mergeKLists(arr) {
  if (arr.length === 0) return null;

  let last = arr.length - 1;

  while (last !== 0) {
    let i = 0,
      j = last;

    while (i < j) {
      arr[i] = mergeTwoLists(arr[i], arr[j]);
      i++;
      j--;

      // all pairs merged, update last
      if (i >= j) last = j;
    }
  }

  return arr[0];
}

// II. Approach: Using Min Heap
class MinHeap {
  constructor(cap) {
    this.heap_size = 0;
    this.capacity = cap;
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

  // You need to write code for below three functions
  /**
   * @return {number}
   */
  extractMin() {
    // Your code here.
    let arr = this.harr,
      n = this.heap_size;
    if (n === 0) return -1;

    // Step1: Swap root with last
    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];

    // Step2: Delete last (min after above swap)
    let min = arr.pop();
    this.heap_size--;

    // Step3: Only root violates the minHeap properties, so minHeapify the root
    this.MinHeapify(0);

    return min;
  }

  /**
   * @param {number} k
   */

  // ✅ TC = O(logn)
  insertKey(k) {
    // Your code here.
    let arr = this.harr;
    if (this.heap_size === this.capacity) return;

    // New Index to be heap_size
    let i = this.heap_size;
    arr[i] = k;

    // If parent is greater than the child then swap, (minHeapifying iteratively)
    while (i > 0 && arr[this.parent(i)] > arr[i]) {
      let p = this.parent(i);
      [arr[i], arr[p]] = [arr[p], arr[i]];
      i = p;
    }

    this.heap_size++;
  }

  /**
   * @param {number} i
   */
  deleteKey(i) {
    // Your code here.
    if (i >= this.heap_size || this.heap_size === 0) return;
    this.decreaseKey(i, -Infinity);
    this.extractMin();
  }

  // Decrease key operation, helps in deleting the element
  decreaseKey(i, new_val) {
    this.harr[i] = new_val;
    while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
      let temp = this.harr[i];
      this.harr[i] = this.harr[this.parent(i)];
      this.harr[this.parent(i)] = temp;
      i = this.parent(i);
    }
  }

  /* You may call below MinHeapify function in
      above codes. Please do not delete this code
      if you are not writing your own MinHeapify */
  // ✅ TC = O(logn)
  // ✅ SC = O(logn)
  MinHeapify(i) {
    let l = this.left(i);
    let r = this.right(i);
    let smallest = i;
    if (l < this.heap_size && this.harr[l] < this.harr[smallest]) smallest = l;
    if (r < this.heap_size && this.harr[r] < this.harr[smallest]) smallest = r;
    if (smallest != i) {
      let temp = this.harr[i];
      this.harr[i] = this.harr[smallest];
      this.harr[smallest] = temp;
      this.MinHeapify(smallest);
    }
  }

  // ✅ TC = O(logn)
  // ✅ SC = O(1)
  minHeapifyIterative(i) {
    while (true) {
      let arr = this.harr;
      let size = this.heap_size;

      let l = 2 * i + 1; // left child
      let r = 2 * i + 2; // right child
      let minIdx = i;

      if (l < size && arr[l] < arr[minIdx]) minIdx = l;
      if (r < size && arr[r] < arr[minIdx]) minIdx = r;

      if (minIdx === i) break; // already min-heap at this node

      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]; // swap
      i = minIdx; // move to child
    }
  }
}

// ✅ TC = O(nlogk) --> (extractMin + insertKey → O(log k)) * n nodes
// ✅ SC = O(k) for heap
function mergeKLists(arr) {
  // 1. create a min heap
  let k = arr.length;
  let heap = new MinHeap(k);

  // 2. push all heads into the heap
  for (let head of arr) {
    if (head) heap.insertKey(head);
  }

  // 3. create a dummy node to store the result
  let dummy = new Node(-1);
  let tail = dummy;

  // 4. extract the minimum node from the heap and insert the next node of the extracted node into the heap
  while (heap.heap_size > 0) {
    let minNode = heap.extractMin();
    tail.next = minNode;
    tail = tail.next;

    if (minNode.next) {
      heap.insertKey(minNode.next);
    }
  }

  // 5. return the result
  return dummy.next;
}

// Example 1
let l1 = new Node(1);
l1.next = new Node(3);
l1.next.next = new Node(7);

let l2 = new Node(2);
l2.next = new Node(4);
l2.next.next = new Node(8);

let l3 = new Node(9);

let arr = [l1, l2, l3];
let merged = mergeKLists(arr);

// Print result
let res = [];
while (merged) {
  res.push(merged.data);
  merged = merged.next;
}
console.log(res.join(" -> "));
// Output: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

/*🎯 CORE IDEA: Two approaches to merge K sorted linked lists efficiently.

APPROACH 1: DIVIDE & CONQUER
- Use divide and conquer strategy to merge lists in pairs
- Merge lists two at a time until only one list remains
- Time: O(n log k), Space: O(1)

APPROACH 2: MIN HEAP
- Use min heap to always get the smallest element among all lists
- Extract minimum, add to result, insert next element from same list
- Time: O(n log k), Space: O(k)

📋 STEP-BY-STEP FLOW:

APPROACH 1 - DIVIDE & CONQUER:
1️⃣ INITIALIZATION:
   - Check if array is empty
   - Set last = arr.length - 1

2️⃣ PAIRWISE MERGING:
   - While last !== 0:
     * i = 0, j = last
     * While i < j: merge arr[i] and arr[j]
     * Move i++, j--
     * Update last = j when all pairs merged

3️⃣ RETURN RESULT:
   - Return arr[0] (the merged list)

APPROACH 2 - MIN HEAP:
1️⃣ HEAP INITIALIZATION:
   - Create min heap of size k
   - Insert all head nodes into heap

2️⃣ EXTRACTION LOOP:
   - While heap is not empty:
     * Extract minimum node
     * Add to result list
     * Insert next node from same list

3️⃣ RETURN RESULT:
   - Return dummy.next

🧠 WHY THESE APPROACHES?
- Divide & Conquer: Reduces problem size by half each iteration
- Min Heap: Always provides smallest element efficiently
- Both achieve optimal O(n log k) complexity

💡 KEY INSIGHTS:
- Divide & Conquer: O(1) space, pairwise merging
- Min Heap: O(k) space, always get minimum
- Both handle different list sizes efficiently
- Merge two lists is the building block
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 APPROACH 1 - DIVIDE & CONQUER:
INPUT: arr = [[1,3,7], [2,4,8], [9]]

🎯 GOAL: Merge K sorted lists using divide & conquer!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [list1, list2, list3]
list1: 1 -> 3 -> 7
list2: 2 -> 4 -> 8  
list3: 9
last = 2

📋 ITERATION 1: last = 2
i = 0, j = 2
merge(arr[0], arr[2]): merge([1,3,7], [9])
- Compare 1 vs 9: 1 < 9, add 1
- Compare 3 vs 9: 3 < 9, add 3
- Compare 7 vs 9: 7 < 9, add 7
- Add remaining 9
Result: 1 -> 3 -> 7 -> 9

i = 1, j = 1 (i >= j)
last = 1

STATE: arr = [[1,3,7,9], [2,4,8], [9]]

📋 ITERATION 2: last = 1
i = 0, j = 1
merge(arr[0], arr[1]): merge([1,3,7,9], [2,4,8])
- Compare 1 vs 2: 1 < 2, add 1
- Compare 3 vs 2: 3 > 2, add 2
- Compare 3 vs 4: 3 < 4, add 3
- Compare 7 vs 4: 7 > 4, add 4
- Compare 7 vs 8: 7 < 8, add 7
- Compare 9 vs 8: 9 > 8, add 8
- Add remaining 9
Result: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

i = 1, j = 0 (i >= j)
last = 0

🏆 FINAL RESULT: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

─────────────────────────────────────────

📊 APPROACH 2 - MIN HEAP:
INPUT: arr = [[1,3,7], [2,4,8], [9]]

🎯 GOAL: Merge K sorted lists using min heap!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: HEAP INITIALIZATION
heap = MinHeap(3)
Insert heads: heap = [1, 2, 9] (min heap order)
dummy = Node(-1), tail = dummy

📋 STEP 2: EXTRACTION LOOP

ITERATION 1:
extractMin() = 1 (from list1)
tail.next = 1, tail = 1
Insert next: heap.insertKey(3)
heap = [2, 3, 9]
result: dummy -> 1

ITERATION 2:
extractMin() = 2 (from list2)
tail.next = 2, tail = 2
Insert next: heap.insertKey(4)
heap = [3, 4, 9]
result: dummy -> 1 -> 2

ITERATION 3:
extractMin() = 3 (from list1)
tail.next = 3, tail = 3
Insert next: heap.insertKey(7)
heap = [4, 7, 9]
result: dummy -> 1 -> 2 -> 3

ITERATION 4:
extractMin() = 4 (from list2)
tail.next = 4, tail = 4
Insert next: heap.insertKey(8)
heap = [7, 8, 9]
result: dummy -> 1 -> 2 -> 3 -> 4

ITERATION 5:
extractMin() = 7 (from list1)
tail.next = 7, tail = 7
Insert next: null (list1 exhausted)
heap = [8, 9]
result: dummy -> 1 -> 2 -> 3 -> 4 -> 7

ITERATION 6:
extractMin() = 8 (from list2)
tail.next = 8, tail = 8
Insert next: null (list2 exhausted)
heap = [9]
result: dummy -> 1 -> 2 -> 3 -> 4 -> 7 -> 8

ITERATION 7:
extractMin() = 9 (from list3)
tail.next = 9, tail = 9
Insert next: null (list3 exhausted)
heap = []
result: dummy -> 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

🏆 FINAL RESULT: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DIVIDE & CONQUER APPROACH:
INITIAL:
arr[0]: 1 -> 3 -> 7
arr[1]: 2 -> 4 -> 8
arr[2]: 9

ITERATION 1 (merge 0,2):
arr[0]: 1 -> 3 -> 7 -> 9
arr[1]: 2 -> 4 -> 8
arr[2]: 9

ITERATION 2 (merge 0,1):
arr[0]: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9
arr[1]: 2 -> 4 -> 8
arr[2]: 9

FINAL: 1 -> 2 -> 3 -> 4 -> 7 -> 8 -> 9

MIN HEAP APPROACH:
INITIAL HEAP: [1, 2, 9]
┌─────┐
│  1  │ ← min
├─────┤
│  2  │
├─────┤
│  9  │
└─────┘

EXTRACTION PROCESS:
1. Extract 1 → heap: [2, 3, 9]
2. Extract 2 → heap: [3, 4, 9]
3. Extract 3 → heap: [4, 7, 9]
4. Extract 4 → heap: [7, 8, 9]
5. Extract 7 → heap: [8, 9]
6. Extract 8 → heap: [9]
7. Extract 9 → heap: []

─────────────────────────────────────────

📊 SECOND EXAMPLE: arr = [[1,3], [8], [4,5,6]]

🔍 DIVIDE & CONQUER PROCESS:

INITIAL:
arr[0]: 1 -> 3
arr[1]: 8
arr[2]: 4 -> 5 -> 6

ITERATION 1 (merge 0,2):
arr[0]: 1 -> 3 -> 4 -> 5 -> 6
arr[1]: 8
arr[2]: 4 -> 5 -> 6

ITERATION 2 (merge 0,1):
arr[0]: 1 -> 3 -> 4 -> 5 -> 6 -> 8
arr[1]: 8
arr[2]: 4 -> 5 -> 6

🏆 FINAL RESULT: 1 -> 3 -> 4 -> 5 -> 6 -> 8

🔍 MIN HEAP PROCESS:

INITIAL HEAP: [1, 8, 4]
EXTRACTIONS:
1. Extract 1 → heap: [3, 8, 4]
2. Extract 3 → heap: [4, 8, 5]
3. Extract 4 → heap: [5, 8, 6]
4. Extract 5 → heap: [6, 8]
5. Extract 6 → heap: [8]
6. Extract 8 → heap: []

🏆 FINAL RESULT: 1 -> 3 -> 4 -> 5 -> 6 -> 8

🔍 WHY THESE APPROACHES WORK:
1️⃣ DIVIDE & CONQUER: Reduces problem size by half each iteration
2️⃣ MIN HEAP: Always provides smallest element efficiently
3️⃣ Both achieve optimal O(n log k) complexity
4️⃣ Handle different list sizes efficiently
5️⃣ Merge two lists is the building block

💡 KEY INSIGHT:
Divide & Conquer reduces space complexity to O(1),
while Min Heap provides more intuitive approach!

🎯 TIME COMPLEXITY ANALYSIS:
- Divide & Conquer: O(n log k) - log k levels, n nodes per level
- Min Heap: O(n log k) - n extractions, each O(log k)
- Both approaches are optimal

🎯 SPACE COMPLEXITY ANALYSIS:
- Divide & Conquer: O(1) - only pointers used
- Min Heap: O(k) - heap stores k nodes
- Divide & Conquer is more space efficient

🎯 EDGE CASES HANDLED:
- Empty array
- Single list
- Empty lists
- Different list sizes
- Single element lists

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to merge all lists correctly
- Maintains sorted order
- Handles all edge cases
- Optimal time complexity

🎯 APPROACH COMPARISON:
- Divide & Conquer: Better space complexity
- Min Heap: More intuitive, easier to understand
- Both: Same time complexity
- Choose based on space constraints

🎯 IMPLEMENTATION DETAILS:
- mergeTwoLists: Standard two-pointer merge
- MinHeap: Standard heap operations
- Divide & Conquer: Pairwise merging
- Both: Handle null lists gracefully
*/
