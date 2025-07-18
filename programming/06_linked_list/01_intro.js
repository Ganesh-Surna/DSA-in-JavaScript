// About linked lists

// 1. Definition:
// A linked list is a linear data structure where elements (nodes) are stored in non-contiguous memory locations.
// Each node contains data and a reference (pointer) to the next node in the sequence.

// 2. Types of Linked Lists:
// - Singly Linked List: Each node points to the next node.
// - Doubly Linked List: Each node points to both the next and previous nodes.
// - Circular Linked List: The last node points back to the first node.

// 3. Advantages:
// - Dynamic size (can grow/shrink at runtime).
// - Easy insertion and deletion (especially at the beginning).

// 4. Disadvantages:
// - No random access (must traverse from the head).
// - Extra memory for pointers.
// - More complex than arrays.

// 5. Common Operations:
// - Traversal (visiting each node)
// - Insertion (at head, tail, or middle)
// - Deletion (by value or position)
// - Searching for a value

// 6. Use Cases:
// - Implementing stacks and queues
// - Undo functionality in editors
// - Adjacency lists in graphs


// ✅ Differences between arrays & Linked Lists:
//
// 1. Memory Allocation:
//    - Arrays: Contiguous memory allocation.
//    - Linked Lists: Non-contiguous memory allocation (nodes can be anywhere in memory).
//
// 2. Size:
//    - Arrays: Fixed size (static, unless using dynamic arrays).
//    - Linked Lists: Dynamic size (can grow/shrink at runtime).
//
// 3. Access Time:
//    - Arrays: O(1) random access using index.
//    - Linked Lists: O(n) access (must traverse from head).
//
// 4. Insertion/Deletion:
//    - Arrays: Costly (O(n)) for insertion/deletion except at the end.
//    - Linked Lists: Efficient (O(1)) insertion/deletion at the beginning (or with pointer to node).
//
// 5. Memory Usage:
//    - Arrays: No extra memory for pointers.
//    - Linked Lists: Extra memory required for storing pointers (next/prev).
//
// 6. Cache Locality:
//    - Arrays: Better cache locality due to contiguous memory.
//    - Linked Lists: Poor cache locality.
//
// 7. Implementation Complexity:
//    - Arrays: Simple to implement and use.
//    - Linked Lists: More complex due to pointer management.
