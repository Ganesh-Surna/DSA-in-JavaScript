/* Problem: ✅✅✅✅ Right View of Binary Tree ✅✅✅✅

Given the root of a binary tree, return the right view of the tree. The right view of a binary tree is the set of nodes visible when the tree is viewed from the right side. In other words, it consists of the rightmost node at each level of the tree.

Right view definition:
- For each level of the tree, only the rightmost node is visible
- Nodes are ordered from top to bottom (root to leaves)
- If a level has only left nodes, the leftmost visible becomes part of right view

You are given the root of a binary tree. The task is to return the right view as an array of node values from top to bottom.

Example 1:
Input: 
       1
      / \
     2   3
    / \ / \
   4  5 6  7

Output: [1, 3, 7]
Explanation: 
Level 0: 1 (rightmost)
Level 1: 3 (rightmost between 2 and 3)
Level 2: 7 (rightmost among 4, 5, 6, 7)

Example 2:
Input:
       1
      /
     2
      \
       3

Output: [1, 2, 3]
Explanation:
Level 0: 1 (only node)
Level 1: 2 (only node)
Level 2: 3 (only node)

Example 3:
Input:
       1
        \
         3

Output: [1, 3]
Explanation: Only right children exist, both are rightmost at their levels.

Example 4:
Input: null

Output: []
Explanation: Empty tree has no right view.

Constraints:
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(w) for iterative (width), O(h) for recursive (height)
*/

class TreeNode {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
    }
  }
  
// 1. Iterative Solution (using BFS or Level Order Traversal)
// ✅ TC = O(n)
// ✅ SC = O(w) or O(n)
function printRightViewIterative(root) {
    let res = [];
    if (!root) return res;
  
    let q = []; // new Queue()
    q.push(root);
  
    while (q.length > 0) { // !q.isEmpty()
      let size = q.length; // q.size()
      for (let i = 0; i < size; i++) {
        let curr = q.shift(); // q.deque()
  
        if (i === size - 1) { // Print last node of each level
          res.push(curr.key);
        }
  
        if (curr.left) q.push(curr.left); // q.enque(curr.left)
        if (curr.right) q.push(curr.right); // q.enque(curr.right)
      }
    }
  
    return res;
  }


// 2. Recursive Solution
// ✅ TC = O(n)
// ✅ SC = O(h)
function printRightViewRecursive(root) {
    let res = [];
    let maxLevel = 0; // Global variable for level tracking. Changes only when 1st node of new level comes into picture.

    helper(root);
    
    return res;
    
    function helper(node, level = 1) {
        if (!node) return;

        // First node of this level
        if (level > maxLevel) {
            res.push(node.key);
            maxLevel = level;
        }

        // 🔁 Just reverse the order: right first, then left
        helper(node.right, level + 1); // ✅✅✅✅
        helper(node.left, level + 1);
    }
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)

console.log(printRightViewRecursive(root)) // [1, 3, 7]

/*🎯 CORE IDEA: Two approaches to find right view: 
(1) Iterative BFS using queue to process level by level, 
    capturing the last node of each level as the rightmost visible node. 
(2) Recursive DFS traversing right subtree first with level tracking, 
    adding first node encountered at each new level (which is rightmost due to right-first traversal).

📋 STEP-BY-STEP FLOW:

1️⃣ ITERATIVE APPROACH (BFS):
   - Use queue for level-order traversal
   - Process each level completely
   - Capture last node of each level
   - Add to result array

2️⃣ RECURSIVE APPROACH (DFS):
   - Track maximum level reached
   - Traverse right subtree first, then left
   - Add node when visiting new level for first time
   - Right-first ensures rightmost node captured

3️⃣ LEVEL TRACKING:
   - Each level has one rightmost visible node
   - Track levels to identify first visit
   - Maintain order from top to bottom

4️⃣ RIGHTMOST SELECTION:
   - Iterative: Last node processed at each level
   - Recursive: First node visited at each level (right-first)
   - Both identify the same rightmost nodes

🧠 WHY THESE APPROACHES?
- Iterative: Natural level-by-level processing with queue
- Recursive: Elegant right-first DFS with level tracking
- Both achieve O(n) time complexity
- Different space tradeoffs: O(w) vs O(h)
- Clear logic for identifying rightmost nodes

💡 KEY INSIGHTS:
- Iterative: Last node in level-order is rightmost
- Recursive: Right-first traversal ensures rightmost first
- Level tracking critical for both approaches
- Only one node per level in result
- Right children prioritized over left
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Right View of Binary Tree

INPUT: Binary Tree
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [1, 3, 7]
EXPLANATION: Rightmost nodes at each level - 1 at level 0, 3 at level 1, 7 at level 2.

🎯 GOAL: Find the rightmost visible node at each level of the tree!

🔍 ITERATIVE APPROACH (BFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
q = [1]

📋 LEVEL-BY-LEVEL PROCESSING:

LEVEL 0:
q = [1], size = 1

ITERATION 1:
Step 1: Dequeue node
curr = q.shift() → curr = 1, q = []

Step 2: Check if last node of level
i = 0, size - 1 = 0 → i === size - 1 → TRUE
res.push(1) → res = [1]

Step 3: Enqueue children
curr.left = 2 → q.push(2) → q = [2]
curr.right = 3 → q.push(3) → q = [2, 3]

STATE AFTER LEVEL 0:
res = [1]
q = [2, 3]

─────────────────────────────────────────

LEVEL 1:
q = [2, 3], size = 2

ITERATION 1:
Step 1: Dequeue node
curr = q.shift() → curr = 2, q = [3]

Step 2: Check if last node of level
i = 0, size - 1 = 1 → i !== size - 1 → FALSE (not last)

Step 3: Enqueue children
curr.left = 4 → q.push(4) → q = [3, 4]
curr.right = 5 → q.push(5) → q = [3, 4, 5]

ITERATION 2:
Step 1: Dequeue node
curr = q.shift() → curr = 3, q = [4, 5]

Step 2: Check if last node of level
i = 1, size - 1 = 1 → i === size - 1 → TRUE
res.push(3) → res = [1, 3]

Step 3: Enqueue children
curr.left = 6 → q.push(6) → q = [4, 5, 6]
curr.right = 7 → q.push(7) → q = [4, 5, 6, 7]

STATE AFTER LEVEL 1:
res = [1, 3]
q = [4, 5, 6, 7]

─────────────────────────────────────────

LEVEL 2:
q = [4, 5, 6, 7], size = 4

ITERATION 1: Process node 4 (not last)
ITERATION 2: Process node 5 (not last)
ITERATION 3: Process node 6 (not last)
ITERATION 4:
Step 1: Dequeue node
curr = q.shift() → curr = 7, q = []

Step 2: Check if last node of level
i = 3, size - 1 = 3 → i === size - 1 → TRUE
res.push(7) → res = [1, 3, 7]

Step 3: No children to enqueue

STATE AFTER LEVEL 2:
res = [1, 3, 7]
q = []

─────────────────────────────────────────

TERMINATION:
q.length = 0 → exit while loop

🏆 ITERATIVE RESULT: [1, 3, 7]

─────────────────────────────────────────

🔍 RECURSIVE APPROACH (DFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
maxLevel = 0

📋 RECURSIVE TRAVERSAL (RIGHT-FIRST):

CALL 1: helper(1, level=1)
Step 1: Check if null
node = 1 (not null) → continue

Step 2: Check if first node at this level
level = 1, maxLevel = 0 → level > maxLevel → TRUE
res.push(1) → res = [1]
maxLevel = 1

Step 3: Traverse right first
helper(3, level=2)

CALL 2: helper(3, level=2)
Step 1: Check if null
node = 3 (not null) → continue

Step 2: Check if first node at this level
level = 2, maxLevel = 1 → level > maxLevel → TRUE
res.push(3) → res = [1, 3]
maxLevel = 2

Step 3: Traverse right first
helper(7, level=3)

CALL 3: helper(7, level=3)
Step 1: Check if null
node = 7 (not null) → continue

Step 2: Check if first node at this level
level = 3, maxLevel = 2 → level > maxLevel → TRUE
res.push(7) → res = [1, 3, 7]
maxLevel = 3

Step 3: Traverse right first
helper(null, level=4) → returns immediately

Step 4: Traverse left
helper(null, level=4) → returns immediately

BACK TO CALL 2:
Step 4: Traverse left
helper(6, level=3)

CALL 4: helper(6, level=3)
Step 1: Check if null
node = 6 (not null) → continue

Step 2: Check if first node at this level
level = 3, maxLevel = 3 → level > maxLevel → FALSE
Do not add to result (7 already added at level 3)

Step 3: Traverse right and left (both null)

BACK TO CALL 1:
Step 4: Traverse left
helper(2, level=2)

CALL 5: helper(2, level=2)
Step 1: Check if null
node = 2 (not null) → continue

Step 2: Check if first node at this level
level = 2, maxLevel = 3 → level > maxLevel → FALSE
Do not add to result (3 already added at level 2)

Step 3: Traverse right and left
helper(5, level=3) → level 3 already has 7, won't add
helper(4, level=3) → level 3 already has 7, won't add

🏆 RECURSIVE RESULT: [1, 3, 7]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE STRUCTURE:
       1 ← Level 0 (rightmost: 1)
      / \
     2   3 ← Level 1 (rightmost: 3)
    / \ / \
   4  5 6  7 ← Level 2 (rightmost: 7)

ITERATIVE APPROACH - QUEUE STATES:

Initial: q = [1]

After Level 0: q = [2, 3]
               Process: 1 (last of 1 nodes)

After Level 1: q = [4, 5, 6, 7]
               Process: 2, 3 (3 is last of 2 nodes)

After Level 2: q = []
               Process: 4, 5, 6, 7 (7 is last of 4 nodes)

RECURSIVE APPROACH - TRAVERSAL ORDER:

Right-First DFS:
1 (level 1, new level, add) →
  3 (level 2, new level, add) →
    7 (level 3, new level, add) →
      null
      null
    6 (level 3, already visited, skip) →
      null
      null
  2 (level 2, already visited, skip) →
    5 (level 3, already visited, skip)
    4 (level 3, already visited, skip)

─────────────────────────────────────────

📊 LEVEL-BY-LEVEL VIEW:

LEVEL 0: [1]
         Visible: 1 ✓

LEVEL 1: [2, 3]
         Visible from right: 3 ✓

LEVEL 2: [4, 5, 6, 7]
         Visible from right: 7 ✓

RIGHT VIEW: [1, 3, 7]

─────────────────────────────────────────

📊 EXAMPLE: Left-Skewed Tree

INPUT:
       1
      /
     2
      \
       3

ITERATIVE APPROACH:
Level 0: q = [1], last = 1 → res = [1]
Level 1: q = [2], last = 2 → res = [1, 2]
Level 2: q = [3], last = 3 → res = [1, 2, 3]

RECURSIVE APPROACH:
Visit 1 (level 1, new) → res = [1]
Visit null (right of 1)
Visit 2 (level 2, new) → res = [1, 2]
  Visit null (left of 2)
  Visit 3 (level 3, new) → res = [1, 2, 3]

RESULT: [1, 2, 3]

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree
Input: null
Iterative: q = [], returns []
Recursive: helper not called, returns []
Result: []

CASE 2: Single Node
Input: TreeNode(1)
Iterative: Level 0 has 1 node, last = 1
Recursive: Level 1 new, add 1
Result: [1]

CASE 3: Right-Skewed Tree
Input: 1 → 3 → 7 (all right)
Iterative: Each level has 1 node (last)
Recursive: Each level visited first (right-first)
Result: [1, 3, 7]

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:
1️⃣ ITERATIVE BFS: Processes levels completely, last node is rightmost
2️⃣ RECURSIVE DFS: Right-first traversal ensures rightmost seen first
3️⃣ LEVEL TRACKING: Identifies when new level is reached
4️⃣ ONE NODE PER LEVEL: Only rightmost node added to result
5️⃣ COMPLETE TRAVERSAL: Both visit all nodes but select rightmost

💡 KEY INSIGHT:
Iterative BFS naturally identifies last node per level as rightmost, while
recursive DFS with right-first traversal and level tracking ensures the
first node visited at each level is the rightmost visible node!

🎯 TIME COMPLEXITY ANALYSIS:
- Iterative: O(n) - visit each node once in level-order
- Recursive: O(n) - visit each node once in DFS
- Both: O(n) time complexity
- Level tracking: O(1) per node

🎯 SPACE COMPLEXITY ANALYSIS:
- Iterative: O(w) - queue stores maximum width
- Recursive: O(h) - recursion stack depth
- Iterative worst case: O(n) for complete tree
- Recursive worst case: O(n) for skewed tree

🎯 EDGE CASES HANDLED:
- Empty tree: Returns empty array
- Single node: Returns single element
- Left-skewed: Captures leftmost as rightmost
- Right-skewed: Captures all nodes
- Complete tree: Captures rightmost at each level

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to capture rightmost at each level
- Iterative: Last node in level-order is rightmost
- Recursive: Right-first ensures rightmost first
- Complete coverage of all levels
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Iterative: Use queue, track level size, check if last
- Recursive: Track maxLevel, traverse right first
- Both maintain top-to-bottom order
- Clear logic for rightmost identification
- Efficient with single traversal

🎯 ITERATIVE APPROACH PRINCIPLES:
- Level-order traversal with queue
- Process entire level before next
- Last node of level is rightmost
- Natural fit for level-based problems
- Explicit level boundaries

🎯 RECURSIVE APPROACH PRINCIPLES:
- Right-first DFS traversal
- Level tracking with maxLevel variable
- First node at new level is rightmost
- Implicit stack through recursion
- Elegant and concise

🎯 COMPARISON OF APPROACHES:
- Iterative: More intuitive for level problems
- Recursive: More elegant, less code
- Iterative: O(w) space
- Recursive: O(h) space
- Both: O(n) time, correct results

🎯 ITERATIVE ADVANTAGES:
- Easy to understand level processing
- Natural queue-based implementation
- Clear level boundaries
- Explicit size tracking

🎯 RECURSIVE ADVANTAGES:
- Less code, more elegant
- Natural DFS traversal
- Better space for tall narrow trees
- Implicit level tracking

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization from side view
- UI rendering of hierarchical data
- Building boundary detection
- Skyline problems
- View analysis

🎯 ALGORITHM PATTERN:
- Iterative: BFS level-order traversal
- Recursive: DFS with level tracking
- Both: Level-based selection
- Single node per level output

🎯 MATHEMATICAL PROPERTIES:
- Result size: h+1 where h is height
- Nodes per level: varies by structure
- Maximum width: 2^h for complete tree
- Total nodes: n processed once

🎯 ERROR HANDLING:
- Null root: Returns empty array
- Missing children: Checked before processing
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF ITERATIVE:
- Intuitive level processing
- Clear queue operations
- Easy to debug and understand
- Natural fit for level problems

🎯 ADVANTAGES OF RECURSIVE:
- Elegant and concise
- Less code to maintain
- Natural tree traversal
- Better for tall narrow trees

🎯 DISADVANTAGES:
- Iterative: More code, explicit queue
- Recursive: Harder to trace execution
- Both: Visit nodes not in result
- Iterative: O(w) space for wide trees

🎯 ALTERNATIVE APPROACHES:
- Morris traversal: O(1) space but complex
- Iterative with explicit stack: Similar to recursive
- Reverse inorder: Right-root-left traversal
- All: Correct but different tradeoffs

🎯 IMPLEMENTATION CONSIDERATIONS:
- Choose iterative for clarity
- Choose recursive for elegance
- Consider tree shape for space
- Handle edge cases properly
- Test thoroughly

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Left-skewed tree
- Right-skewed tree
- Complete tree
- Various structures

🎯 DEBUGGING TIPS:
- Iterative: Print queue state
- Recursive: Track maxLevel value
- Verify level boundaries
- Check rightmost selection
- Test edge cases

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for traversal
- Space: O(w) or O(h) - depends on approach
- Overall: Efficient and practical
- Scalable: Works well for typical trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Wide trees: Iterative uses more space
- Tall trees: Recursive uses more space
- Performance: Both efficient

🎯 BEST PRACTICES:
- Choose appropriate approach
- Handle edge cases
- Clear variable naming
- Test thoroughly
- Consider space constraints

🎯 COMMON MISTAKES:
- Wrong last node detection
- Incorrect level tracking
- Missing null checks
- Wrong traversal order (recursive)
- Not processing entire level (iterative)

🎯 LEARNING OBJECTIVES:
- Understand right view concept
- Learn level-order traversal
- Master DFS with level tracking
- Practice queue operations
- Improve tree traversal skills

🎯 INTERVIEW TIPS:
- Explain both approaches
- Discuss space-time tradeoffs
- Handle edge cases systematically
- Write clean code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Level-based node selection
- Different traversal strategies
- Space-time tradeoffs
- Rightmost identification
- Tree view problems

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n total
- Result size: h+1 nodes
- Queue operations: n enqueue/dequeue
- Space usage: O(w) or O(h)
- Total: O(n) time, O(w/h) space

🎯 IMPLEMENTATION CHALLENGES:
- Correct last node detection
- Proper level tracking
- Edge case handling
- Choosing right approach
- Efficient implementation

🎯 SOLUTION VALIDATION:
- Test with various structures
- Verify rightmost selection
- Check edge cases
- Monitor space usage
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Basic level-order: Process all nodes
- Optimized: Select rightmost only
- Recursive variant: Right-first DFS
- Both: Efficient and correct

🎯 PRACTICAL APPLICATIONS:
- Building view from side
- UI tree visualization
- Hierarchical data display
- Boundary detection
- View analysis systems

🎯 OPTIMIZATION OPPORTUNITIES:
- Morris traversal for O(1) space
- Early termination if only first few needed
- Parallel processing for independent subtrees
- Cache results for repeated queries
- Iterative with explicit stack

🎯 RELATED PROBLEMS:
- Left view of binary tree
- Top view of binary tree
- Bottom view of binary tree
- Boundary traversal
- Vertical order traversal

🎯 PROBLEM VARIATIONS:
- Right view from specific level
- Right view with node count
- Right view with level sums
- K rightmost nodes per level
- Right view with conditions

🎯 CONCLUSION:
The right view of binary tree problem demonstrates two efficient approaches:
iterative BFS capturing last node per level and recursive DFS with right-first
traversal and level tracking, both achieving O(n) time complexity with
different space tradeoffs (O(w) vs O(h)) for identifying rightmost visible
nodes at each level!
*/