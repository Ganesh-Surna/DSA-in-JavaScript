/*
====================================
BINARY SEARCH TREE (BST) - BASICS
====================================

1. DEFINITION:
   - A Binary Search Tree is a binary tree data structure where each node has at most two children
   - It follows a specific ordering property that makes searching efficient

2. BST PROPERTY (MOST IMPORTANT):
   - For every node in the tree:
     * All values in the LEFT subtree are SMALLER than the node's value
     * All values in the RIGHT subtree are GREATER than the node's value
   - This property must hold for EVERY node in the tree
   - No duplicate values are allowed (in standard BST)

3. STRUCTURE:
   class Node {
     constructor(data) {
       this.data = data;
       this.left = null;
       this.right = null;
     }
   }

4. TIME COMPLEXITIES:
   Operation          Average Case    Worst Case (Skewed Tree)    Best Case (Balanced)
   ----------------------------------------------------------------------------------
   Search             O(log n)        O(n)                        O(log n)
   Insert             O(log n)        O(n)                        O(log n)
   Delete             O(log n)        O(n)                        O(log n)
   Find Min/Max       O(log n)        O(n)                        O(log n)
   
   * Worst case occurs when tree becomes skewed (like a linked list)
   * Best case occurs when tree is perfectly balanced

5. SPACE COMPLEXITY:
   - O(n) for storing n nodes
   - O(h) for recursive operations (h = height of tree)

6. BASIC OPERATIONS:
   a) Search: Compare with root, go left if smaller, right if larger
   b) Insert: Find correct position using search logic, add new node
   c) Delete: Three cases:
      - Node with no children: Simply remove
      - Node with one child: Replace node with its child
      - Node with two children: Replace with inorder successor/predecessor
   d) Traversals:
      - Inorder (Left, Root, Right) → Gives SORTED order
      - Preorder (Root, Left, Right)
      - Postorder (Left, Right, Root)
      - Level Order (BFS)

7. IMPORTANT PROPERTIES:
   - Inorder traversal of BST always gives elements in SORTED (ascending) order
   - Minimum element: Leftmost node
   - Maximum element: Rightmost node
   - Height of balanced BST: O(log n)
   - Height of skewed BST: O(n)

8. TYPES OF BST:
   - Standard BST: Basic implementation
   - Self-Balancing BST:
     * AVL Tree (height difference ≤ 1)
     * Red-Black Tree (color-based balancing)
     * Splay Tree (recently accessed nodes near root)
   - B-Tree, B+ Tree: Multi-way search trees for databases

9. ADVANTAGES:
   - Faster search than linear structures (if balanced)
   - Maintains sorted order
   - Dynamic size (unlike arrays)
   - Efficient insertion and deletion
   - Easy to find min/max elements
   - Supports range queries efficiently

10. DISADVANTAGES:
    - Can become unbalanced (degrading to O(n) operations)
    - Extra memory for pointers
    - No random access like arrays
    - More complex implementation than arrays/linked lists

11. USE CASES:
    - Implementing associative arrays (maps/dictionaries)
    - Database indexing
    - File system organization
    - Expression parsing (expression trees)
    - Priority queues (using heap variant)
    - Autocomplete features
    - Maintaining sorted stream of data

12. BST vs OTHER DATA STRUCTURES:
    Structure        Search    Insert    Delete    Sorted    Random Access
    -------------------------------------------------------------------------
    Array            O(n)      O(n)      O(n)      No        O(1)
    Sorted Array     O(log n)  O(n)      O(n)      Yes       O(1)
    Linked List      O(n)      O(1)      O(1)      No        O(n)
    BST (balanced)   O(log n)  O(log n)  O(log n)  Yes       O(log n)
    Hash Table       O(1)      O(1)      O(1)      No        O(1)

13. COMMON PROBLEMS:
    - Check if a binary tree is BST
    - Find kth smallest/largest element
    - Lowest Common Ancestor (LCA)
    - Convert sorted array to BST
    - Validate BST
    - Find inorder successor/predecessor
    - Ceil and Floor in BST
    - Range sum queries
    - Serialize and deserialize BST

14. IMPORTANT FORMULAS:
    - Maximum nodes at level L: 2^L (root is at level 0)
    - Maximum nodes in tree of height h: 2^(h+1) - 1
    - Minimum height for n nodes: ⌈log₂(n+1)⌉ - 1
    - For complete binary tree: height = ⌊log₂n⌋

15. BALANCING CONDITION:
    - A BST is balanced if: |height(left) - height(right)| ≤ 1 for every node
    - Balanced BST ensures O(log n) operations

16. TIPS FOR CODING:
    - Most BST operations are naturally recursive
    - Always check for null/empty tree
    - Remember BST property: left < root < right
    - Inorder traversal → sorted sequence
    - Use recursion for cleaner code
    - Handle edge cases: empty tree, single node, duplicate values

17. REAL-WORLD APPLICATIONS:
    - MySQL/PostgreSQL use B+ trees (variant of BST) for indexing
    - File systems use tree structures
    - Compilers use BST for symbol tables
    - Network routers use BST for routing tables
    - Game engines use BST for spatial partitioning

*/