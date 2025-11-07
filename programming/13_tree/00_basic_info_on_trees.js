/*
====================================
BINARY TREE - BASICS
====================================

1. DEFINITION:
   - A tree is a hierarchical data structure consisting of nodes connected by edges
   - A binary tree is a tree where each node has AT MOST two children (left and right)
   - Unlike arrays/linked lists, trees are non-linear data structures

2. TREE TERMINOLOGY:
   - Root: Topmost node (no parent)
   - Parent: Node that has children
   - Child: Node directly connected below another node
   - Leaf/External Node: Node with no children
   - Internal Node: Node with at least one child
   - Siblings: Nodes with the same parent
   - Ancestor: Any node on the path from root to that node
   - Descendant: Any node on the path from that node to a leaf
   - Subtree: Tree formed by a node and all its descendants
   - Depth: Number of edges from root to that node
   - Height: Number of edges on the longest path from that node to a leaf
   - Level: Depth + 1 (root is at level 1 or 0 depending on convention)
   - Degree: Number of children of a node

3. STRUCTURE:
   class Node {
     constructor(data) {
       this.data = data;
       this.left = null;
       this.right = null;
     }
   }

4. TYPES OF BINARY TREES:
   a) Full Binary Tree:
      - Every node has either 0 or 2 children
      - No node has exactly 1 child
      
   b) Complete Binary Tree:
      - All levels are completely filled except possibly the last
      - Last level has nodes as left as possible
      - Used in: Heap data structure
      
   c) Perfect Binary Tree:
      - All internal nodes have 2 children
      - All leaf nodes are at the same level
      - Total nodes = 2^(h+1) - 1
      
   d) Balanced Binary Tree:
      - Height of left and right subtrees differ by at most 1
      - For every node in the tree
      - Examples: AVL Tree, Red-Black Tree
      
   e) Degenerate/Skewed Tree:
      - Each parent has only one child
      - Essentially becomes a linked list
      - Height = n (worst case)
      
   f) Binary Search Tree (BST):
      - Special property: left < root < right
      - Covered in separate BST section

5. TIME COMPLEXITIES:
   Operation              Average Case    Worst Case    Best Case
   ------------------------------------------------------------------
   Search                 O(n)            O(n)          O(log n)
   Insert                 O(log n)        O(n)          O(1)
   Delete                 O(log n)        O(n)          O(1)
   Traversal (any)        O(n)            O(n)          O(n)
   Height Calculation     O(n)            O(n)          O(n)
   
   * For balanced trees, most operations are O(log n)
   * For skewed trees, operations degrade to O(n)

6. SPACE COMPLEXITY:
   - Storage: O(n) for n nodes
   - Recursive operations: O(h) stack space, where h = height
   - Level order traversal: O(w) queue space, where w = maximum width

7. TREE TRAVERSALS:
   
   a) Depth First Search (DFS):
      i)   Inorder (Left, Root, Right):
           - For BST, gives sorted order
           - Use: Expression evaluation, BST operations
           
      ii)  Preorder (Root, Left, Right):
           - Root processed first
           - Use: Creating copy of tree, prefix expressions
           
      iii) Postorder (Left, Right, Root):
           - Root processed last
           - Use: Deleting tree, postfix expressions, dependency resolution
   
   b) Breadth First Search (BFS):
      i) Level Order Traversal:
         - Process nodes level by level
         - Uses Queue data structure
         - Use: Finding level of node, shortest path in unweighted tree

8. TRAVERSAL IMPLEMENTATIONS:
   - Recursive: Natural and clean (DFS traversals)
   - Iterative: Uses explicit stack (DFS) or queue (BFS)
   - Morris Traversal: Space-efficient O(1) space, modifies tree temporarily

9. IMPORTANT PROPERTIES:
   - Maximum nodes at level L: 2^L (if root is at level 0)
   - Maximum nodes in tree of height h: 2^(h+1) - 1
   - Minimum height for n nodes: ⌈log₂(n+1)⌉ - 1
   - Maximum height for n nodes: n - 1 (skewed tree)
   - For complete binary tree with n nodes: height = ⌊log₂n⌋
   - Leaf nodes in full binary tree: (n+1)/2
   - Internal nodes in full binary tree: (n-1)/2
   - If tree has L leaves: minimum height = ⌈log₂L⌉

10. IMPORTANT FORMULAS:
    - Nodes = Internal Nodes + Leaf Nodes
    - Edges = Nodes - 1
    - For full binary tree: Leaf nodes = Internal nodes + 1
    - Height of empty tree: -1 (by convention)
    - Height of single node: 0
    - Relation: n = 2^(h+1) - 1 (for perfect binary tree)

11. TREE REPRESENTATION:
    a) Array Representation (Heap-style):
       - For node at index i:
         * Left child: 2*i + 1
         * Right child: 2*i + 2
         * Parent: (i-1)/2
       - Good for complete binary trees
       - Wastes space for sparse trees
       
    b) Linked Representation (Node-based):
       - Each node has data, left pointer, right pointer
       - More flexible, no wasted space
       - Used for general trees

12. ADVANTAGES:
    - Hierarchical structure (natural for many problems)
    - Faster search than linear structures (if balanced)
    - Flexible size (dynamic)
    - Efficient insertion and deletion (for balanced trees)
    - Reflects structural relationships
    - Better than arrays for insertion/deletion
    - Better than linked lists for search

13. DISADVANTAGES:
    - More complex than linear structures
    - Extra memory for pointers
    - No constant time random access
    - Can become unbalanced
    - Slower than hash tables for lookup
    - Difficult to implement iteratively

14. USE CASES:
    - File system hierarchy (folders and files)
    - DOM structure in HTML
    - Organization charts
    - Syntax/Parse trees in compilers
    - Expression evaluation
    - Decision trees in AI/ML
    - Database indexing (B-trees)
    - Routing tables
    - Game trees (chess, tic-tac-toe)
    - Family trees / Genealogy
    - Huffman coding for compression
    - Heap for priority queue

15. COMMON OPERATIONS:
    - Insert a node
    - Delete a node
    - Search for a value
    - Count nodes
    - Calculate height/depth
    - Check if balanced
    - Find minimum/maximum
    - Level order traversal
    - Vertical order traversal
    - Top/Bottom view
    - Left/Right view
    - Print ancestors
    - Lowest Common Ancestor (LCA)
    - Diameter of tree
    - Mirror/Invert tree
    - Check if two trees are identical
    - Convert tree to other forms

16. COMMON PROBLEMS:
    - Height/Depth of tree
    - Diameter of tree (longest path between any two nodes)
    - Check if tree is balanced
    - Check if tree is symmetric/mirror
    - Level order traversal
    - Zigzag/Spiral traversal
    - Vertical order traversal
    - Top view / Bottom view
    - Left view / Right view
    - Boundary traversal
    - Diagonal traversal
    - Sum of all nodes
    - Count leaf nodes
    - Maximum path sum
    - Path from root to node
    - Lowest Common Ancestor (LCA)
    - Distance between two nodes
    - Serialize and deserialize tree
    - Construct tree from traversals
    - Convert tree to doubly linked list
    - Check if subtree exists
    - Print all paths from root to leaf
    - Kth level nodes
    - Connect nodes at same level

17. SPECIAL TREES:
    - Binary Search Tree (BST): Ordered tree
    - AVL Tree: Self-balancing BST
    - Red-Black Tree: Self-balancing BST
    - B-Tree: Multi-way tree for databases
    - B+ Tree: Variant of B-tree
    - Segment Tree: Range query optimization
    - Fenwick Tree: Efficient prefix sums
    - Trie (Prefix Tree): String operations
    - Heap: Complete binary tree (min/max)
    - Expression Tree: Mathematical expressions
    - Suffix Tree: String matching
    - Decision Tree: Classification/Regression
    - Merkle Tree: Blockchain/cryptography

18. TRAVERSAL TECHNIQUES SUMMARY:
    Traversal      Order             Use Case                        Stack/Queue
    ---------------------------------------------------------------------------------
    Inorder        Left→Root→Right   BST sorted order, expressions   Stack (DFS)
    Preorder       Root→Left→Right   Copy tree, prefix notation      Stack (DFS)
    Postorder      Left→Right→Root   Delete tree, postfix notation   Stack (DFS)
    Level Order    Level by level    BFS, shortest path              Queue (BFS)

19. RECURSIVE VS ITERATIVE:
    - Recursive: Cleaner code, easier to understand, uses call stack
    - Iterative: More control, avoids stack overflow, explicit stack/queue
    - Choose recursive for simplicity, iterative for large trees

20. BUILDING TREES:
    - From Inorder + Preorder: Unique tree can be constructed
    - From Inorder + Postorder: Unique tree can be constructed
    - From Preorder + Postorder: NOT unique (unless full binary tree)
    - Inorder is necessary (along with one other) to uniquely construct

21. TREE PROPERTIES TO CHECK:
    - Is it balanced?
    - Is it complete?
    - Is it full?
    - Is it perfect?
    - Is it BST?
    - Is it symmetric?
    - Are two trees identical?
    - Is one tree subtree of another?

22. TIPS FOR CODING:
    - Most tree problems are naturally recursive
    - Base case: null or leaf node
    - Recursive case: process root, recurse on children
    - Think about return value: what should function return?
    - Use helper functions for extra parameters
    - Level order → use queue
    - Any DFS → use stack or recursion
    - Post-process after recursion for postorder logic
    - Pre-process before recursion for preorder logic
    - Pass parent/level information when needed
    - Use global/class variables for tracking across recursion

23. COMPLEXITY ANALYSIS TIPS:
    - Visiting each node once → O(n) time
    - Recursion depth = height → O(h) space
    - For balanced tree: h = O(log n)
    - For skewed tree: h = O(n)
    - Level order queue: O(w) where w = max width
    - Max width ≈ n/2 for complete trees

24. REAL-WORLD APPLICATIONS:
    - File systems (Windows Explorer, Mac Finder)
    - HTML DOM manipulation (web browsers)
    - Database indexing (MySQL B+ trees)
    - AI game algorithms (minimax tree)
    - Compiler design (syntax trees)
    - Router algorithms (routing tables)
    - Compression algorithms (Huffman trees)
    - Machine learning (decision trees, random forests)
    - Operating systems (process trees)
    - Network protocols (spanning tree protocol)

*/