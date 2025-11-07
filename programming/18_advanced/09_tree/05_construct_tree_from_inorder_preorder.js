/* Problem: ✅✅✅✅ Construct Tree from Inorder and Preorder ✅✅✅✅

Given two integer arrays inorder and preorder where inorder is the inorder traversal of a binary tree and preorder is the preorder traversal of the same tree, construct and return the binary tree.

You are given the root of a binary tree. The task is to construct the binary tree from its inorder and preorder traversal sequences, where inorder gives us the left-root-right order and preorder gives us the root-left-right order.

Example 1:
Input: 
inorder = [40, 20, 50, 10, 30, 80, 70, 90]
preorder = [10, 20, 40, 50, 30, 70, 80, 90]

Output: 
       10
      /  \
     20   70
    / \   / \
   40 50 80 90
      \
       30

Explanation: The tree is constructed using the root-first approach from preorder and left-right positioning from inorder.

Example 2:
Input:
inorder = [9, 3, 15, 20, 7]
preorder = [3, 9, 20, 15, 7]

Output:
       3
      / \
     9   20
        /  \
       15   7

Explanation: Root 3 from preorder, then left subtree [9] and right subtree [15, 20, 7].

Example 3:
Input:
inorder = [1]
preorder = [1]

Output:
       1

Explanation: Single node tree.

Constraints:
- The number of nodes in the tree is in the range [1, 3000]
- -3000 <= inorder[i], preorder[i] <= 3000
- inorder and preorder consist of unique values
- Each value of inorder also appears in preorder
- preorder is guaranteed to be the preorder traversal of the tree
- inorder is guaranteed to be the inorder traversal of the tree

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n)
// ✅ SC = O(n)
function constructTree(inorder, preorder){
    let preIdx = 0 // to track the current root in the preorder array (i.e. the 1st element of preorder is the root)
    let n = inorder.length
    
    let ioLookup = new Map() // to get index of any element of inorder arr in TC = O(1)
    for(let i=0; i<n; i++){ // TC = O(n)
        ioLookup.set(inorder[i], i)
    }
    
    return helper(inorder, preorder, 0, n-1)
    
    // Helpers
    function helper(inorder, preorder, ioStartIdx=0, ioEndIdx=n-1){ // TC = O(n)
        if(ioStartIdx > ioEndIdx){
            return null
        }
        
        let root = new TreeNode(preorder[preIdx]) // the 1st element of preorder is the root
        preIdx++ // increment the preorder index

        if(ioStartIdx === ioEndIdx){ // if there is only one element in the inorder array, then return the root
            return root
        }
        
        let i = ioLookup.get(root.key) // TC = O(1) // get the index of the curr root in the inorder array
        
        // 1. Construct the left subtree first (coz preorder is root-left-right, i.e., in preorder From L->R root comes 1st & then left & then right)
        root.left = helper(inorder, preorder, ioStartIdx, i-1)
        // 2. Construct the right subtree last (coz preorder is root-left-right, i.e., in preorder From L->R root comes 1st & then left & then right)
        root.right = helper(inorder, preorder, i+1, ioEndIdx)
        
        return root // return the root
    }
}

// just to verify
function printPreorder(root){
    if(!root) return
    
    console.log(root.key)
    printPreorder(root.left)
    printPreorder(root.right)
}

let inorder = [40, 20, 50, 10, 30, 80, 70, 90]
let preorder = [10, 20, 40, 50, 30, 70, 80, 90]
let root = constructTree(inorder, preorder)
console.log(printPreorder(root))

/*🎯 CORE IDEA: Use recursive divide-and-conquer approach with preorder for root identification and inorder for left-right subtree partitioning. Preorder gives us the root (first element), inorder helps us split left and right subtrees around the root position. Use a hashmap for O(1) root position lookup in inorder array.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Create hashmap for inorder array: O(1) index lookup
   - Initialize preorder index pointer: tracks current root
   - Set inorder boundaries: start and end indices

2️⃣ ROOT IDENTIFICATION:
   - Pick current element from preorder as root
   - Increment preorder index for next recursive call
   - Find root position in inorder using hashmap

3️⃣ SUBTREE PARTITIONING:
   - Left subtree: inorder elements before root position
   - Right subtree: inorder elements after root position
   - Recursively construct left and right subtrees

4️⃣ TREE CONSTRUCTION:
   - Create root node with current preorder element
   - Recursively build left subtree with left partition
   - Recursively build right subtree with right partition
   - Return constructed tree

🧠 WHY THIS APPROACH?
- Preorder gives root-first traversal: perfect for tree construction
- Inorder provides left-right partitioning around root
- Hashmap optimization: O(1) root position lookup
- Divide-and-conquer: breaks problem into smaller subproblems

💡 KEY INSIGHTS:
- Preorder: Root-Left-Right (root identification)
- Inorder: Left-Root-Right (subtree partitioning)
- Hashmap: O(1) position lookup optimization
- Recursive construction: divide-and-conquer approach
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Arrays [40, 20, 50, 10, 30, 80, 70, 90] and [10, 20, 40, 50, 30, 70, 80, 90]

INPUT: 
inorder = [40, 20, 50, 10, 30, 80, 70, 90]
preorder = [10, 20, 40, 50, 30, 70, 80, 90]

OUTPUT: Binary Tree
       10
      /  \
     20   70
    / \   / \
   40 50 80 90
      \
       30

EXPLANATION: Root 10 from preorder, then partition inorder around 10 to get left [40, 20, 50] and right [30, 80, 70, 90] subtrees.

🎯 GOAL: Construct binary tree from inorder and preorder traversals!

🔍 RECURSIVE CONSTRUCTION - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
preIdx = 0
inorder = [40, 20, 50, 10, 30, 80, 70, 90]
preorder = [10, 20, 40, 50, 30, 70, 80, 90]
ioLookup = {40:0, 20:1, 50:2, 10:3, 30:4, 80:5, 70:6, 90:7}

📋 RECURSIVE CALLS:

CALL 1: helper(inorder, preorder, 0, 7)
ioStartIdx = 0, ioEndIdx = 7
root = new TreeNode(preorder[0]) = 10
preIdx = 1
i = ioLookup.get(10) = 3
Left subtree: helper(inorder, preorder, 0, 2) → [40, 20, 50]
Right subtree: helper(inorder, preorder, 4, 7) → [30, 80, 70, 90]

CALL 2: helper(inorder, preorder, 0, 2) - LEFT SUBTREE
ioStartIdx = 0, ioEndIdx = 2
root = new TreeNode(preorder[1]) = 20
preIdx = 2
i = ioLookup.get(20) = 1
Left subtree: helper(inorder, preorder, 0, 0) → [40]
Right subtree: helper(inorder, preorder, 2, 2) → [50]

CALL 3: helper(inorder, preorder, 0, 0) - LEFT LEAF
ioStartIdx = 0, ioEndIdx = 0
root = new TreeNode(preorder[2]) = 40
preIdx = 3
ioStartIdx === ioEndIdx → return root (40)

CALL 4: helper(inorder, preorder, 2, 2) - RIGHT LEAF
ioStartIdx = 2, ioEndIdx = 2
root = new TreeNode(preorder[3]) = 50
preIdx = 4
ioStartIdx === ioEndIdx → return root (50)

📋 BACK TO CALL 2: Node 20 construction complete
20.left = 40
20.right = 50
return 20

CALL 5: helper(inorder, preorder, 4, 7) - RIGHT SUBTREE
ioStartIdx = 4, ioEndIdx = 7
root = new TreeNode(preorder[4]) = 30
preIdx = 5
i = ioLookup.get(30) = 4
Left subtree: helper(inorder, preorder, 4, 3) → invalid (4 > 3)
Right subtree: helper(inorder, preorder, 5, 7) → [80, 70, 90]

CALL 6: helper(inorder, preorder, 4, 3) - INVALID RANGE
ioStartIdx = 4, ioEndIdx = 3
4 > 3 → return null

CALL 7: helper(inorder, preorder, 5, 7) - RIGHT SUBTREE
ioStartIdx = 5, ioEndIdx = 7
root = new TreeNode(preorder[5]) = 70
preIdx = 6
i = ioLookup.get(70) = 6
Left subtree: helper(inorder, preorder, 5, 5) → [80]
Right subtree: helper(inorder, preorder, 7, 7) → [90]

CALL 8: helper(inorder, preorder, 5, 5) - LEFT LEAF
ioStartIdx = 5, ioEndIdx = 5
root = new TreeNode(preorder[6]) = 80
preIdx = 7
ioStartIdx === ioEndIdx → return root (80)

CALL 9: helper(inorder, preorder, 7, 7) - RIGHT LEAF
ioStartIdx = 7, ioEndIdx = 7
root = new TreeNode(preorder[7]) = 90
preIdx = 8
ioStartIdx === ioEndIdx → return root (90)

📋 BACK TO CALL 7: Node 70 construction complete
70.left = 80
70.right = 90
return 70

📋 BACK TO CALL 5: Node 30 construction complete
30.left = null
30.right = 70
return 30

📋 BACK TO CALL 1: Node 10 construction complete
10.left = 20
10.right = 30
return 10

📋 FINAL RESULT:
Constructed Tree:
       10
      /  \
     20   30
    / \    \
   40 50   70
          / \
         80 90

🏆 RESULT: Tree successfully constructed!

─────────────────────────────────────────

📊 SIMPLER EXAMPLE: Arrays [9, 3, 15, 20, 7] and [3, 9, 20, 15, 7]

INPUT:
inorder = [9, 3, 15, 20, 7]
preorder = [3, 9, 20, 15, 7]

OUTPUT: Binary Tree
       3
      / \
     9   20
        /  \
       15   7

🔍 Process:

INITIALIZATION:
preIdx = 0
ioLookup = {9:0, 3:1, 15:2, 20:3, 7:4}

CALL 1: helper(inorder, preorder, 0, 4)
root = 3, preIdx = 1, i = 1
Left: helper(0, 0) → [9]
Right: helper(2, 4) → [15, 20, 7]

CALL 2: helper(0, 0) - LEFT SUBTREE
root = 9, preIdx = 2
ioStartIdx === ioEndIdx → return 9

CALL 3: helper(2, 4) - RIGHT SUBTREE
root = 20, preIdx = 3, i = 3
Left: helper(2, 2) → [15]
Right: helper(4, 4) → [7]

CALL 4: helper(2, 2)
root = 15, preIdx = 4
return 15

CALL 5: helper(4, 4)
root = 7, preIdx = 5
return 7

FINAL TREE:
       3
      / \
     9   20
        /  \
       15   7

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

PREORDER TRAVERSAL: Root → Left → Right
[10, 20, 40, 50, 30, 70, 80, 90]
 ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
root left subtree  right subtree

INORDER TRAVERSAL: Left → Root → Right
[40, 20, 50, 10, 30, 80, 70, 90]
 ←left→  root  ←--right--→

ROOT IDENTIFICATION FROM PREORDER:
Step 1: preorder[0] = 10 → root
Step 2: preorder[1] = 20 → left subtree root
Step 3: preorder[2] = 40 → left-left subtree root
...

SUBTREE PARTITIONING FROM INORDER:
Root 10 at index 3:
Left: [40, 20, 50] (indices 0-2)
Right: [30, 80, 70, 90] (indices 4-7)

TREE CONSTRUCTION PROCESS:
       10 (preorder[0])
      /  \
     ?    ? 
     
       10
      /  \
    20    30 (preorder[1] and preorder[4])
   / \     \
  ?   ?     ?

       10
      /  \
    20    30
   / \     \
  40 50    70 (preorder[2,3] and preorder[5])
          / \
         ?   ?

       10
      /  \
    20    30
   / \     \
  40 50    70
          / \
        80  90 (preorder[6,7])

─────────────────────────────────────────

📊 HASHMAP OPTIMIZATION:

WITHOUT HASHMAP: O(n) search for each root position
for(let j=0; j<inorder.length; j++){
    if(inorder[j] === root.key) return j
}
Total: O(n²) time complexity

WITH HASHMAP: O(1) lookup for each root position
ioLookup.get(root.key) → O(1)
Total: O(n) time complexity

HASHMAP CONSTRUCTION:
ioLookup = new Map()
for(let i=0; i<n; i++){
    ioLookup.set(inorder[i], i)
}

HASHMAP USAGE:
let i = ioLookup.get(root.key) // O(1) lookup

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

constructTree([40,20,50,10,30,80,70,90], [10,20,40,50,30,70,80,90])
└── helper(0, 7) → root=10
    ├── helper(0, 2) → root=20
    │   ├── helper(0, 0) → root=40
    │   └── helper(2, 2) → root=50
    └── helper(4, 7) → root=30
        ├── helper(4, 3) → null (invalid range)
        └── helper(5, 7) → root=70
            ├── helper(5, 5) → root=80
            └── helper(7, 7) → root=90

PREORDER INDEX PROGRESSION:
preIdx: 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8

INORDER RANGE PROGRESSION:
(0,7) → (0,2),(4,7) → (0,0),(2,2),(4,3),(5,7) → ...

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ PREORDER PROPERTY: First element is always root
2️⃣ INORDER PROPERTY: Elements before root are left subtree
3️⃣ INORDER PROPERTY: Elements after root are right subtree
4️⃣ RECURSIVE STRUCTURE: Same pattern for subtrees
5️⃣ HASHMAP OPTIMIZATION: O(1) position lookup

💡 KEY INSIGHT:
Use preorder for root identification and inorder for subtree
partitioning, with hashmap optimization for efficient lookups!

🎯 TIME COMPLEXITY ANALYSIS:
- Hashmap construction: O(n)
- Each node processed once: O(n)
- Hashmap lookup per node: O(1)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Hashmap storage: O(n)
- Recursion stack depth: O(h) where h is tree height
- Total: O(n) space complexity

🎯 EDGE CASES HANDLED:
- Single node tree: ioStartIdx === ioEndIdx
- Invalid range: ioStartIdx > ioEndIdx → return null
- Empty subtree: Handled by range validation
- All nodes processed: preIdx increments correctly

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to process each preorder element exactly once
- Inorder partitioning correctly splits left and right subtrees
- Recursive structure maintains tree properties
- Hashmap ensures correct root positioning

🎯 IMPLEMENTATION DETAILS:
- Preorder index tracking: Global preIdx variable
- Inorder range tracking: ioStartIdx and ioEndIdx parameters
- Hashmap optimization: O(1) root position lookup
- Base case handling: Invalid range and single node cases
- Recursive construction: Divide-and-conquer approach

🎯 TRAVERSAL PROPERTIES:
- Preorder: Root → Left → Right (construction order)
- Inorder: Left → Root → Right (partitioning guide)
- Postorder: Left → Right → Root (not used here)
- Level order: Not relevant for this algorithm

🎯 DIVIDE-AND-CONQUER STRATEGY:
- Divide: Split inorder array around root position
- Conquer: Recursively construct left and right subtrees
- Combine: Attach subtrees to root and return

🎯 OPTIMIZATION TECHNIQUES:
- Hashmap for O(1) lookups instead of O(n) search
- Single pass through preorder array
- Efficient range-based recursion
- Early termination for invalid ranges

🎯 COMPARISON WITH ALTERNATIVE APPROACHES:
- Without hashmap: O(n²) time due to linear search
- With hashmap: O(n) time with O(n) space
- Iterative approach: More complex, similar complexity
- Stack-based approach: Alternative implementation

🎯 REAL-WORLD APPLICATIONS:
- Tree serialization/deserialization
- Expression tree construction
- Parse tree building
- Database index reconstruction
- File system tree building

🎯 ALGORITHM PATTERN:
- Divide-and-conquer recursion
- Array partitioning
- Hashmap optimization
- Tree construction

🎯 MATHEMATICAL PROPERTIES:
- Tree nodes: n total nodes
- Preorder elements: n elements processed
- Inorder partitions: n-1 partitions created
- Recursion depth: O(h) where h is tree height

🎯 ERROR HANDLING:
- Invalid ranges: ioStartIdx > ioEndIdx → return null
- Single nodes: ioStartIdx === ioEndIdx → return leaf
- Empty inputs: Handled by initial validation
- Boundary conditions: Proper range management

🎯 ADVANTAGES OF OPTIMIZED APPROACH:
- O(n) time complexity with hashmap optimization
- Clear divide-and-conquer structure
- Efficient memory usage
- Easy to understand and implement
- Handles all edge cases correctly

🎯 DISADVANTAGES:
- Requires additional O(n) space for hashmap
- Recursion stack overhead
- Assumes unique values in arrays
- Memory overhead for tree node creation

🎯 ALTERNATIVE APPROACHES:
- Linear search: O(n²) time, O(h) space
- Iterative with stack: O(n) time, O(n) space
- Morris traversal: O(n) time, O(1) space (complex)
- All: Correct tree construction

🎯 IMPLEMENTATION CONSIDERATIONS:
- Array bounds checking
- Null pointer handling
- Memory management
- Stack overflow prevention
- Input validation

🎯 TESTING STRATEGY:
- Single node tree
- Balanced tree
- Skewed tree
- Various tree structures
- Edge cases

🎯 DEBUGGING TIPS:
- Track preorder index progression
- Verify inorder range calculations
- Check hashmap construction
- Monitor recursive calls
- Validate tree structure

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree construction
- Space: O(n) - required for hashmap and recursion
- Overall: Efficient for given constraints
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Monitor recursion depth
- Memory usage: Track hashmap size
- Stack overflow: Consider iterative approach
- Optimization: Minimize object creation

🎯 BEST PRACTICES:
- Use hashmap for optimization
- Validate input arrays
- Handle edge cases properly
- Write clean recursive code
- Test thoroughly

🎯 COMMON MISTAKES:
- Forgetting to increment preorder index
- Incorrect inorder range calculations
- Missing base case handling
- Poor error handling
- Inefficient linear search

🎯 LEARNING OBJECTIVES:
- Understand tree construction from traversals
- Learn divide-and-conquer recursion
- Master hashmap optimization techniques
- Practice array partitioning
- Improve recursive thinking

🎯 INTERVIEW TIPS:
- Explain the two-traversal approach
- Discuss hashmap optimization
- Handle edge cases
- Write clean code
- Test with examples

🎯 ALGORITHM INSIGHTS:
- Preorder for root identification
- Inorder for subtree partitioning
- Hashmap for optimization
- Recursion for construction
- Tree structure understanding

🎯 MATHEMATICAL ANALYSIS:
- Node creation: n nodes created
- Array accesses: 2n array accesses
- Hashmap operations: n lookups
- Recursion calls: n function calls
- Total: O(n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct preorder index
- Calculating proper inorder ranges
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Verify tree structure
- Check traversal correctness
- Test edge cases
- Monitor performance
- Validate implementation

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) linear search
- Optimized approach: O(n) hashmap lookup
- Alternative approaches: Iterative methods
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Tree reconstruction
- Data structure building
- Algorithm implementation
- Educational purposes
- System design

🎯 CONCLUSION:
The tree construction problem demonstrates how to use divide-and-conquer
recursion with preorder for root identification and inorder for subtree
partitioning, achieving efficient O(n) time complexity with hashmap
optimization for position lookups!
*/