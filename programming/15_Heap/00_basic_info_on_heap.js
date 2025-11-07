/*
====================================
HEAP - BASICS
====================================

1. DEFINITION:
   - A heap is a complete binary tree that satisfies the heap property
   - Complete binary tree: All levels are filled except possibly the last level
   - Last level has nodes as left as possible
   - Heap property: Parent node is always greater/smaller than its children

2. TYPES OF HEAPS:
   a) Max Heap (Max-Heap):
      - Parent node ≥ children nodes
      - Root contains the maximum element
      - Used for: Priority queues, heap sort
      
   b) Min Heap (Min-Heap):
      - Parent node ≤ children nodes
      - Root contains the minimum element
      - Used for: Priority queues, finding kth smallest

3. HEAP PROPERTIES:
   - Complete Binary Tree: All levels filled except last (left-aligned)
   - Heap Property: Parent-child relationship maintained
   - Height: O(log n) for n elements
   - Root is always the min/max element
   - No ordering between siblings (only parent-child)

4. ARRAY REPRESENTATION:
   - Heap is stored as an array
   - For node at index i:
     * Parent: Math.floor((i-1)/2)
     * Left Child: 2*i + 1
     * Right Child: 2*i + 2
   - Root is at index 0
   - Last non-leaf node: Math.floor(n/2) - 1

5. TIME COMPLEXITIES:
   Operation              Time Complexity    Space Complexity
   -----------------------------------------------------------
   Build Heap             O(n)              O(1)
   Insert (Heapify Up)    O(log n)          O(1)
   Extract Min/Max        O(log n)          O(1)
   Peek (Get Min/Max)     O(1)              O(1)
   Delete                 O(log n)          O(1)
   Search                 O(n)              O(1)
   Heapify Down           O(log n)          O(1)
   Heap Sort              O(n log n)        O(1)

6. SPACE COMPLEXITY:
   - Storage: O(n) for n elements
   - Operations: O(1) extra space (in-place)
   - Recursive heapify: O(log n) stack space

7. HEAP OPERATIONS:

   a) Insert (Heapify Up):
      - Add element at end of array
      - Compare with parent, swap if needed
      - Continue until heap property is satisfied
      - Time: O(log n)

   b) Extract Min/Max (Heapify Down):
      - Remove root (min/max element)
      - Move last element to root
      - Compare with children, swap with smaller/larger
      - Continue until heap property is satisfied
      - Time: O(log n)

   c) Build Heap:
      - Start from last non-leaf node
      - Heapify each node from bottom to top
      - Time: O(n) - not O(n log n)!

   d) Heapify (Fix Heap Property):
      - Heapify Up: Move element up the tree
      - Heapify Down: Move element down the tree
      - Both maintain heap property

8. BUILD HEAP ANALYSIS (WHY O(n)?):
   - Height of tree: h = log n
   - Nodes at level i: ≤ n/2^(i+1)
   - Work at level i: O(i) * n/2^(i+1)
   - Total work: Σ(i=0 to h) i * n/2^(i+1) = O(n)
   - Geometric series converges to O(n)

9. HEAP SORT ALGORITHM:
   a) Build max heap from array: O(n)
   b) For i = n-1 to 1:
      - Swap root with last element
      - Heapify the reduced heap: O(log n)
   c) Total time: O(n log n)
   d) Space: O(1) - in-place sorting

10. PRIORITY QUEUE IMPLEMENTATION:
    - Min Heap: Extract minimum priority
    - Max Heap: Extract maximum priority
    - Operations: Insert, Extract, Peek, Update Priority
    - Used in: Dijkstra's algorithm, A* search, task scheduling

11. ADVANTAGES:
    - O(1) access to min/max element
    - O(log n) insertion and deletion
    - O(n) heap construction
    - In-place heap sort
    - Efficient priority queue implementation
    - Memory efficient (array representation)
    - Guaranteed O(log n) height

12. DISADVANTAGES:
    - No efficient search (O(n))
    - No random access like arrays
    - Not suitable for general-purpose sorting
    - Cache performance can be poor
    - Not stable sort
    - Limited to min/max operations

13. USE CASES:
    - Priority queues
    - Heap sort
    - Finding kth largest/smallest element
    - Merge k sorted arrays
    - Median in a stream
    - Dijkstra's shortest path algorithm
    - A* search algorithm
    - Task scheduling
    - Memory management
    - Graph algorithms (Prim's MST)

14. HEAP vs OTHER DATA STRUCTURES:
    Structure        Insert    Extract    Search    Min/Max    Space
    -----------------------------------------------------------------
    Array            O(1)      O(n)       O(n)      O(n)       O(n)
    Sorted Array     O(n)      O(n)       O(log n)  O(1)       O(n)
    BST              O(log n)  O(log n)   O(log n)  O(log n)   O(n)
    Balanced BST     O(log n)  O(log n)   O(log n)  O(log n)   O(n)
    Heap             O(log n)  O(log n)   O(n)      O(1)       O(n)
    Hash Table       O(1)      O(1)       O(1)      O(n)       O(n)

15. COMMON PROBLEMS:
    - Heap sort implementation
    - Find kth largest/smallest element
    - Merge k sorted arrays
    - Median in a stream of integers
    - Top K frequent elements
    - Connect ropes with minimum cost
    - Minimum cost to hire k workers
    - Sliding window maximum
    - Find median from data stream
    - K closest points to origin
    - Reorganize string
    - Task scheduler
    - Minimum number of refueling stops

16. HEAP IMPLEMENTATION DETAILS:
    
    class MinHeap {
      constructor() {
        this.heap = [];
      }
      
      parent(i) { return Math.floor((i-1)/2); }
      left(i) { return 2*i + 1; }
      right(i) { return 2*i + 2; }
      
      insert(key) {
        this.heap.push(key);
        this.heapifyUp(this.heap.length - 1);
      }
      
      extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();
        
        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapifyDown(0);
        return min;
      }
      
      heapifyUp(index) {
        while (index > 0 && this.heap[this.parent(index)] > this.heap[index]) {
          this.swap(this.parent(index), index);
          index = this.parent(index);
        }
      }
      
      heapifyDown(index) {
        let smallest = index;
        const left = this.left(index);
        const right = this.right(index);
        
        if (left < this.heap.length && this.heap[left] < this.heap[smallest]) {
          smallest = left;
        }
        
        if (right < this.heap.length && this.heap[right] < this.heap[smallest]) {
          smallest = right;
        }
        
        if (smallest !== index) {
          this.swap(index, smallest);
          this.heapifyDown(smallest);
        }
      }
      
      swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
      }
    }

17. SPECIALIZED HEAPS:
    - Binary Heap: Standard heap (what we discussed)
    - Binomial Heap: Union operation in O(log n)
    - Fibonacci Heap: Decrease key in O(1) amortized
    - Leftist Heap: Merge operation in O(log n)
    - Skew Heap: Self-adjusting heap
    - Pairing Heap: Simple implementation, good performance

18. HEAP APPLICATIONS IN ALGORITHMS:
    - Dijkstra's Algorithm: Min heap for shortest path
    - Prim's Algorithm: Min heap for MST
    - A* Search: Priority queue for pathfinding
    - Huffman Coding: Min heap for compression
    - Merge Sort: External sorting with heaps
    - Selection Algorithm: Find kth element
    - Event-driven simulation: Priority queue

19. HEAP PROPERTIES TO REMEMBER:
    - Complete binary tree structure
    - Heap property (parent-child relationship)
    - Array representation with index formulas
    - O(log n) height guarantees
    - O(n) build time (not O(n log n))
    - In-place operations possible
    - No ordering between siblings

20. HEAP SORT CHARACTERISTICS:
    - Time: O(n log n) worst case
    - Space: O(1) extra space
    - Not stable (equal elements may change order)
    - In-place sorting
    - Guaranteed O(n log n) performance
    - Cache performance can be poor
    - Not adaptive (doesn't benefit from partially sorted data)

21. COMPARISON WITH QUICK SORT:
    Quick Sort:     Heap Sort:
    - O(n log n)    - O(n log n)
    - O(log n)      - O(1)
    - Stable        - Not stable
    - Cache friendly - Cache unfriendly
    - Adaptive      - Not adaptive
    - Worst O(n²)   - Always O(n log n)

22. TIPS FOR CODING:
    - Use 0-based indexing for array representation
    - Remember index formulas: parent, left, right
    - Heapify up: compare with parent, swap if needed
    - Heapify down: compare with children, swap with min/max
    - Build heap: start from last non-leaf node
    - Extract: swap root with last, then heapify down
    - Insert: add at end, then heapify up
    - Check bounds before accessing array elements
    - Use Math.floor for parent calculation

23. COMMON MISTAKES:
    - Forgetting heap property (parent-child relationship)
    - Wrong index calculations
    - Not handling empty heap cases
    - Incorrect heapify direction (up vs down)
    - Off-by-one errors in array indexing
    - Not maintaining complete binary tree property

24. REAL-WORLD APPLICATIONS:
    - Operating system task scheduling
    - Network packet prioritization
    - Database query optimization
    - Memory management (garbage collection)
    - Game AI (pathfinding algorithms)
    - Financial trading systems
    - Load balancing in servers
    - Event simulation systems
    - Resource allocation
    - Graph algorithms

25. HEAP VARIATIONS:
    - Min-Max Heap: Both min and max in O(1)
    - d-ary Heap: Each node has d children
    - Soft Heap: Approximate heap with better performance
    - Weak Heap: Hybrid of heap and tournament tree
    - Treap: Combination of BST and heap
    - Interval Heap: For interval data

26. PERFORMANCE CONSIDERATIONS:
    - Cache locality: Poor due to random access pattern
    - Memory access: Not sequential like arrays
    - Branch prediction: Difficult due to conditional swaps
    - Modern CPUs: May not be optimal for cache performance
    - Alternative: Use binary search trees for better cache performance
    - Trade-off: Simplicity vs performance

*/