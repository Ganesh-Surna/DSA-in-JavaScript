/* Problem: ✅✅✅✅ Mirror/Invert Binary Tree ✅✅✅✅

Given the root of a binary tree, invert/mirror the tree and return its root. Mirroring a binary tree means swapping the left and right children of all nodes in the tree.

Mirror/Invert definition:
- For every node, swap its left and right children
- Recursively apply this swap to all nodes
- The mirrored tree is the horizontal reflection of the original tree
- Left subtree becomes right subtree and vice versa

You are given the root of a binary tree. The task is to mirror the entire tree and return the modified root.

Example 1:
Input: 
       4
      / \
     2   7
    / \ / \
   1  3 6  9

Output (After Mirroring):
       4
      / \
     7   2
    / \ / \
   9  6 3  1

Explanation: 
Every node's children are swapped. The tree is horizontally flipped.

Example 2:
Input:
       1
      / \
     2   3
        / \
       4   5

Output (After Mirroring):
       1
      / \
     3   2
    / \
   5   4

Explanation: At every level, left and right children are swapped.

Example 3:
Input:
       1
      /
     2
    /
   3

Output (After Mirroring):
       1
        \
         2
          \
           3

Explanation: Left-skewed tree becomes right-skewed tree.

Example 4:
Input: null

Output: null
Explanation: Empty tree remains empty.

Constraints:
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once to swap
Auxiliary Space: O(h) for recursive, O(w) for iterative
*/

class TreeNode {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 1. Recursive Solution
// ✅ TC = O(n)
// ✅ SC = O(h)
function mirror(root) {
    if(!root) return null;
    
    [root.left, root.right] = [root.right, root.left]; // swap left and right children
    
    mirror(root.left)
    mirror(root.right)
    
    return root
}


// 2. Iterative Solution
// ✅ TC = O(n)
// ✅ SC = O(w)
function mirrorIterative(root) {
    if(!root) return null;
    
    let queue = [root];
    
    while(queue.length) {
        let curr = queue.shift();

        [curr.left, curr.right] = [curr.right, curr.left]; // swap left and right children

        if(curr.left) queue.push(curr.left);
        if(curr.right) queue.push(curr.right);
    }
    return root;
}

let root = new TreeNode(4)
root.left = new TreeNode(2)
root.right = new TreeNode(7)
root.left.left = new TreeNode(1)
root.left.right = new TreeNode(3)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(9)

console.log("Before Mirror:", root)
mirror(root)
console.log("After Mirror:", root)

/*🎯 CORE IDEA: Two approaches to mirror a binary tree: 
(1) Recursive DFS that swaps left and right children at each node, 
    then recursively mirrors left and right subtrees. 
(2) Iterative BFS using queue to process nodes level by level, 
    swapping children of each node during traversal.

📋 STEP-BY-STEP FLOW:

1️⃣ MIRRORING CONCEPT:
   - Swap left and right children for every node
   - Horizontal reflection of the tree
   - Left subtree becomes right, right becomes left
   - Recursively apply to all nodes

2️⃣ RECURSIVE APPROACH:
   - Base case: If node is null, return null
   - Swap current node's children
   - Recursively mirror left subtree
   - Recursively mirror right subtree
   - Return modified root

3️⃣ ITERATIVE APPROACH:
   - Use queue for level-order traversal
   - For each node, swap its children
   - Add children to queue for processing
   - Continue until queue is empty
   - Return modified root

4️⃣ SWAP OPERATION:
   - Destructuring assignment: [left, right] = [right, left]
   - Temporarily stores references
   - Atomic swap operation
   - Works for both null and non-null children

🧠 WHY THESE APPROACHES?
- Both visit each node exactly once: O(n) time
- Recursive: Natural tree traversal with DFS
- Iterative: Avoids recursion stack with BFS
- Different space tradeoffs: O(h) vs O(w)
- Simple swap operation at each node

💡 KEY INSIGHTS:
- Mirroring is recursive in nature (subtrees mirrored)
- Swap operation is O(1) per node
- Both approaches modify tree in-place
- No additional data structures needed beyond stack/queue
- Left-skewed becomes right-skewed and vice versa
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Mirror Binary Tree

INPUT: Binary Tree
       4
      / \
     2   7
    / \ / \
   1  3 6  9

OUTPUT: Mirrored Tree
       4
      / \
     7   2
    / \ / \
   9  6 3  1

EXPLANATION: Every node's left and right children are swapped.

🎯 GOAL: Horizontally flip the entire binary tree by swapping children!

🔍 RECURSIVE APPROACH - STEP-BY-STEP PROCESS:

📋 RECURSIVE CALL TREE:

CALL 1: mirror(4)
Step 1: Check if null
root = 4 (not null) → continue

Step 2: Swap children
Before: 4.left = 2, 4.right = 7
[4.left, 4.right] = [4.right, 4.left]
After: 4.left = 7, 4.right = 2

Step 3: Recursively mirror subtrees
mirror(7) // originally right, now left
mirror(2) // originally left, now right

Current State:
       4
      / \
     7   2
    (swapped, but children not yet processed)

─────────────────────────────────────────

CALL 2: mirror(7)
Step 1: Check if null
root = 7 (not null) → continue

Step 2: Swap children
Before: 7.left = 6, 7.right = 9
[7.left, 7.right] = [7.right, 7.left]
After: 7.left = 9, 7.right = 6

Step 3: Recursively mirror subtrees
mirror(9) // originally right, now left
mirror(6) // originally left, now right

Current State:
       4
      / \
     7   2
    / \
   9   6
  (swapped)

─────────────────────────────────────────

CALL 3: mirror(9)
Step 1: Check if null
root = 9 (not null) → continue

Step 2: Swap children
Before: 9.left = null, 9.right = null
[9.left, 9.right] = [9.right, 9.left]
After: 9.left = null, 9.right = null (no change)

Step 3: Recursively mirror subtrees
mirror(null) → returns null
mirror(null) → returns null

Step 4: Return 9
(leaf node, mirroring complete)

─────────────────────────────────────────

CALL 4: mirror(6)
Step 1: Check if null
root = 6 (not null) → continue

Step 2: Swap children
Before: 6.left = null, 6.right = null
After: 6.left = null, 6.right = null (no change)

Step 3: Recursively mirror subtrees
mirror(null) → returns null
mirror(null) → returns null

Step 4: Return 6
(leaf node, mirroring complete)

BACK TO CALL 2: mirror(7) completes
Current State:
       4
      / \
     7   2
    / \
   9   6
  (fully mirrored)

─────────────────────────────────────────

CALL 5: mirror(2)
Step 1: Check if null
root = 2 (not null) → continue

Step 2: Swap children
Before: 2.left = 1, 2.right = 3
[2.left, 2.right] = [2.right, 2.left]
After: 2.left = 3, 2.right = 1

Step 3: Recursively mirror subtrees
mirror(3) // originally right, now left
mirror(1) // originally left, now right

Current State:
       4
      / \
     7   2
    / \ / \
   9  6 3  1
  (partially processed)

─────────────────────────────────────────

CALL 6: mirror(3)
Step 1: Check if null
root = 3 (not null) → continue

Step 2: Swap children
Before: 3.left = null, 3.right = null
After: 3.left = null, 3.right = null (no change)

Step 3: Recursively mirror subtrees
mirror(null) → returns null
mirror(null) → returns null

Step 4: Return 3
(leaf node, mirroring complete)

─────────────────────────────────────────

CALL 7: mirror(1)
Step 1: Check if null
root = 1 (not null) → continue

Step 2: Swap children
Before: 1.left = null, 1.right = null
After: 1.left = null, 1.right = null (no change)

Step 3: Recursively mirror subtrees
mirror(null) → returns null
mirror(null) → returns null

Step 4: Return 1
(leaf node, mirroring complete)

BACK TO CALL 5: mirror(2) completes
BACK TO CALL 1: mirror(4) completes

🏆 FINAL MIRRORED TREE:
       4
      / \
     7   2
    / \ / \
   9  6 3  1

─────────────────────────────────────────

🔍 ITERATIVE APPROACH (BFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
queue = [4]

📋 LEVEL-ORDER TRAVERSAL WITH SWAPPING:

ITERATION 1:
Step 1: Dequeue node
curr = queue.shift() → curr = 4
queue = []

Step 2: Swap children
Before: 4.left = 2, 4.right = 7
[4.left, 4.right] = [4.right, 4.left]
After: 4.left = 7, 4.right = 2

Step 3: Enqueue children (swapped positions)
4.left = 7 → queue.push(7)
4.right = 2 → queue.push(2)
queue = [7, 2]

Current State:
       4
      / \
     7   2
    / \ / \
   6  9 1  3
  (4's children swapped, subtrees not yet processed)

─────────────────────────────────────────

ITERATION 2:
Step 1: Dequeue node
curr = queue.shift() → curr = 7
queue = [2]

Step 2: Swap children
Before: 7.left = 6, 7.right = 9
[7.left, 7.right] = [7.right, 7.left]
After: 7.left = 9, 7.right = 6

Step 3: Enqueue children (swapped positions)
7.left = 9 → queue.push(9)
7.right = 6 → queue.push(6)
queue = [2, 9, 6]

Current State:
       4
      / \
     7   2
    / \ / \
   9  6 1  3
  (7's children swapped)

─────────────────────────────────────────

ITERATION 3:
Step 1: Dequeue node
curr = queue.shift() → curr = 2
queue = [9, 6]

Step 2: Swap children
Before: 2.left = 1, 2.right = 3
[2.left, 2.right] = [2.right, 2.left]
After: 2.left = 3, 2.right = 1

Step 3: Enqueue children (swapped positions)
2.left = 3 → queue.push(3)
2.right = 1 → queue.push(1)
queue = [9, 6, 3, 1]

Current State:
       4
      / \
     7   2
    / \ / \
   9  6 3  1
  (2's children swapped)

─────────────────────────────────────────

ITERATION 4:
curr = 9 (leaf node)
9.left = null, 9.right = null
No children to swap or enqueue
queue = [6, 3, 1]

─────────────────────────────────────────

ITERATION 5:
curr = 6 (leaf node)
6.left = null, 6.right = null
No children to swap or enqueue
queue = [3, 1]

─────────────────────────────────────────

ITERATION 6:
curr = 3 (leaf node)
3.left = null, 3.right = null
No children to swap or enqueue
queue = [1]

─────────────────────────────────────────

ITERATION 7:
curr = 1 (leaf node)
1.left = null, 1.right = null
No children to swap or enqueue
queue = []

─────────────────────────────────────────

TERMINATION:
queue.length = 0 → exit while loop

🏆 FINAL MIRRORED TREE:
       4
      / \
     7   2
    / \ / \
   9  6 3  1

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
       4
      / \
     2   7
    / \ / \
   1  3 6  9

MIRRORING PROCESS (Step-by-step):

STEP 1: Swap at node 4
       4
      / \
     7   2
    / \ / \
   6  9 1  3

STEP 2: Swap at node 7
       4
      / \
     7   2
    / \ / \
   9  6 1  3

STEP 3: Swap at node 2
       4
      / \
     7   2
    / \ / \
   9  6 3  1

FINAL MIRRORED TREE:
       4
      / \
     7   2
    / \ / \
   9  6 3  1

─────────────────────────────────────────

📊 HORIZONTAL REFLECTION VISUALIZATION:

ORIGINAL:                MIRRORED:
    4                        4
   / \                      / \
  2   7        MIRROR      7   2
 / \ / \      ──────►     / \ / \
1  3 6  9                9  6 3  1

VERTICAL LINE OF SYMMETRY:
         |
    4    |    4
   / \   |   / \
  2   7  |  7   2
 / \ / \ | / \ / \
1  3 6  9|9  6 3  1
         |

─────────────────────────────────────────

📊 EXAMPLE: Left-Skewed Tree

INPUT:
       1
      /
     2
    /
   3

RECURSIVE PROCESS:
mirror(1): Swap → 1.left=null, 1.right=2
mirror(null): Return null
mirror(2): Swap → 2.left=null, 2.right=3
  mirror(null): Return null
  mirror(3): Swap → 3.left=null, 3.right=null

OUTPUT:
       1
        \
         2
          \
           3

Left-skewed becomes right-skewed!

─────────────────────────────────────────

📊 EXAMPLE: Partial Tree

INPUT:
       1
      / \
     2   3
        / \
       4   5

MIRRORING STEPS:
Step 1: mirror(1) → Swap: 1.left=3, 1.right=2
Step 2: mirror(3) → Swap: 3.left=5, 3.right=4
Step 3: mirror(2) → Swap: 2.left=null, 2.right=null
Step 4: mirror(5) → Swap: 5.left=null, 5.right=null
Step 5: mirror(4) → Swap: 4.left=null, 4.right=null

OUTPUT:
       1
      / \
     3   2
    / \
   5   4

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree
Input: null
Recursive: Base case returns null
Iterative: Queue empty, returns null
Output: null

CASE 2: Single Node
Input: TreeNode(1)
Recursive: Swap null children, mirror nulls
Iterative: Swap null children, no enqueue
Output: TreeNode(1) (unchanged)

CASE 3: Two Nodes (Left Child)
Input: 1 → 2 (left)
After Mirror: 1 → 2 (right)

CASE 4: Two Nodes (Right Child)
Input: 1 → 3 (right)
After Mirror: 1 → 3 (left)

CASE 5: Complete Binary Tree
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

Output:
       1
      / \
     3   2
    / \ / \
   7  6 5  4

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:

1️⃣ RECURSIVE NATURE: 
   - Tree mirroring is naturally recursive
   - Mirror subtrees independently
   - Swap at each node propagates throughout

2️⃣ SWAP OPERATION: 
   - Atomic swap using destructuring
   - O(1) time per node
   - Works for null and non-null children

3️⃣ RECURSIVE DFS: 
   - Top-down approach
   - Swap then recurse
   - O(h) space for call stack

4️⃣ ITERATIVE BFS: 
   - Level-order processing
   - Swap at each level
   - O(w) space for queue

5️⃣ IN-PLACE MODIFICATION:
   - No extra tree created
   - Direct pointer manipulation
   - Memory efficient

💡 KEY INSIGHT:
Mirroring a binary tree is achieved by swapping left and right children
at every node, either recursively (DFS with O(h) space) or iteratively
(BFS with O(w) space), both taking O(n) time to visit all nodes!

🎯 TIME COMPLEXITY ANALYSIS:
- Recursive: O(n) - visit each node once for swap
- Iterative: O(n) - visit each node once in BFS
- Swap operation: O(1) per node
- Total nodes: n
- Both: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursive: O(h) - recursion call stack depth
- Iterative: O(w) - queue stores maximum width
- Recursive worst case: O(n) for skewed tree
- Iterative worst case: O(n) for complete tree
- Both: No extra tree storage needed

🎯 EDGE CASES HANDLED:
- Empty tree: Returns null
- Single node: Returns same node (no swap effect)
- Left-skewed: Becomes right-skewed
- Right-skewed: Becomes left-skewed
- Complete tree: Full horizontal reflection

🎯 ALGORITHM CORRECTNESS:
- Every node visited exactly once
- Every node's children swapped
- Subtrees mirrored recursively/iteratively
- Original structure preserved (only reflected)
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Recursive: Swap, then recurse on subtrees
- Iterative: BFS with queue, swap at each node
- Swap: Destructuring assignment [a, b] = [b, a]
- Both: Modify tree in-place
- Return modified root

🎯 RECURSIVE APPROACH PRINCIPLES:
- Base case: null node returns null
- Swap current node's children
- Recursively mirror left subtree
- Recursively mirror right subtree
- Return modified root

🎯 ITERATIVE APPROACH PRINCIPLES:
- Use queue for level-order traversal
- Dequeue node, swap its children
- Enqueue swapped children for processing
- Continue until queue empty
- No recursion stack needed

🎯 COMPARISON OF APPROACHES:

RECURSIVE:
✅ Pros: Elegant, concise code
✅ Pros: Natural for tree problems
✅ Pros: Easy to understand logic
❌ Cons: O(h) call stack space
❌ Cons: Stack overflow for deep trees

ITERATIVE:
✅ Pros: No recursion stack
✅ Pros: Explicit queue control
✅ Pros: Better for very deep trees
❌ Cons: More code than recursive
❌ Cons: O(w) queue space for wide trees

🎯 BEST APPROACH SELECTION:
- For elegance: Recursive
- For deep trees: Iterative (avoids stack overflow)
- For wide trees: Recursive (less space than queue)
- For clarity: Recursive (simpler logic)
- Performance: Both O(n) time

🎯 REAL-WORLD APPLICATIONS:
- Image horizontal flipping
- UI layout mirroring (RTL ↔ LTR)
- Tree visualization transformations
- Symmetry detection preprocessing
- Game scene reflections

🎯 ALGORITHM PATTERN:
- Tree transformation problem
- In-place modification
- DFS or BFS traversal
- Simple swap at each node
- Recursive or iterative solution

🎯 MATHEMATICAL PROPERTIES:
- Mirroring is involution: mirror(mirror(T)) = T
- Preserves tree structure (height, node count)
- Symmetric trees remain symmetric
- Only changes left/right relationships
- Idempotent when applied twice

🎯 SWAP OPERATION ANALYSIS:
- Destructuring: [a, b] = [b, a]
- Creates temporary references
- Atomic operation
- Works with null values
- O(1) time and space

🎯 ERROR HANDLING:
- Null root: Check at function start
- Null children: Swap handles gracefully
- Leaf nodes: Swap nulls (no effect)
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF RECURSIVE:
- Concise and elegant code
- Natural tree recursion
- Easy to understand
- Minimal lines of code

🎯 ADVANTAGES OF ITERATIVE:
- No call stack space
- Explicit control flow
- Better for deep trees
- Avoids stack overflow

🎯 DISADVANTAGES:
- Recursive: Stack space O(h)
- Iterative: Queue space O(w)
- Both: In-place modification (may not want original)
- Both: Must visit all nodes

🎯 OPTIMIZATION OPPORTUNITIES:
- Already optimal O(n) time
- Can't skip nodes (must mirror all)
- No early termination possible
- Morris traversal not beneficial here

🎯 RELATED PROBLEMS:
- Check if tree is symmetric
- Check if two trees are mirrors
- Flip tree vertically (by levels)
- Rotate tree left/right
- Tree isomorphism

🎯 PROBLEM VARIATIONS:
- Mirror only subtree from given node
- Mirror alternate levels
- Check if mirror without modification
- Count swaps needed for specific structure
- Mirror based on conditions

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Two nodes (left/right)
- Left-skewed tree
- Right-skewed tree
- Complete binary tree
- Partial trees

🎯 DEBUGGING TIPS:
- Print tree before and after
- Visualize each swap operation
- Check leaf nodes handled correctly
- Verify null children swaps
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal (must visit all)
- Space: O(h) or O(w) - depends on approach
- Swap: O(1) per node
- Overall: Efficient and practical
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time acceptable
- Deep trees: Iterative better (no stack overflow)
- Wide trees: Recursive better (less queue space)
- Performance: Both scale well

🎯 BEST PRACTICES:
- Choose approach based on tree shape
- Handle null checks properly
- Use clear swap syntax
- Test edge cases thoroughly
- Document modification behavior

🎯 COMMON MISTAKES:
- Forgetting to swap at current node
- Wrong recursion order
- Not handling null children
- Creating new tree instead of in-place
- Missing base case (null check)

🎯 LEARNING OBJECTIVES:
- Understand tree mirroring concept
- Master in-place tree modification
- Practice both DFS and BFS
- Learn swap techniques
- Improve tree manipulation skills

🎯 INTERVIEW TIPS:
- Explain mirror concept clearly
- Discuss both approaches
- Compare space-time tradeoffs
- Handle edge cases systematically
- Write clean, bug-free code
- Mention involution property

🎯 ALGORITHM INSIGHTS:
- Mirroring is horizontal reflection
- Swap operation at each node
- Recursive or iterative both work
- In-place modification efficient
- Preserves tree structure

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n total
- Swap operations: n
- Each swap: O(1)
- Total time: O(n)
- Involution: f(f(x)) = x

🎯 IMPLEMENTATION CHALLENGES:
- Correct swap syntax
- Proper null handling
- Edge case coverage
- Choosing right approach
- Clean code structure

🎯 SOLUTION VALIDATION:
- Test with various structures
- Verify all children swapped
- Check edge cases work
- Validate original structure preserved
- Apply mirror twice to get original

🎯 ALGORITHM EVOLUTION:
- Basic: Swap at each node
- Recursive: Natural DFS solution
- Iterative: BFS alternative
- Both: Optimal and correct

🎯 PRACTICAL APPLICATIONS:
- UI layout direction (LTR ↔ RTL)
- Image processing (horizontal flip)
- Game graphics (scene reflection)
- Tree visualization tools
- Symmetry detection

🎯 INVOLUTION PROPERTY:
- mirror(mirror(tree)) = tree
- Applying twice returns original
- Useful for validation
- Fundamental property of mirroring
- Self-inverse transformation

🎯 SYMMETRY RELATIONSHIP:
- Symmetric tree: mirror(T) = T
- Non-symmetric: mirror(T) ≠ T
- Mirroring creates mirror image
- Useful for symmetry checking
- Preserves symmetry property

🎯 CONCLUSION:
The mirror/invert binary tree problem demonstrates two elegant approaches:
recursive DFS swapping children then recursing (O(h) space) and iterative
BFS swapping children during level-order traversal (O(w) space), both
achieving O(n) time complexity with simple in-place swaps to create a
horizontal reflection of the tree with the involution property that
mirroring twice restores the original tree!
*/