/* Problem: ✅✅✅✅ Left View of Binary Tree ✅✅✅✅

Given a binary tree, print the left view of the tree. The left view of a binary tree is the set of nodes visible when the tree is viewed from the left side.

You are given the root of a binary tree. The task is to return the left view of the tree, which consists of the leftmost nodes at each level when viewed from the left side.

Example 1:
Input: 
       10
      /  \
     20   30
       \  / \
       40 50 60
Output: [10, 20, 40]
Explanation: When viewed from left, we can see nodes 10 (level 1), 20 (level 2), and 40 (level 3).

Example 2:
Input:
       10
      /  \
     50   60
         /  \
        70   20
            /
           8
Output: [10, 50, 70, 8]
Explanation: Left view shows nodes 10 (level 1), 50 (level 2), 70 (level 3), and 8 (level 4).

Example 3:
Input:
       30
      /
     50
      \
       60
      /
     70
Output: [30, 50, 60, 70]
Explanation: All nodes are visible from the left side as they form a left-skewed tree.

Constraints:
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(h) for recursive, O(w) for iterative where h is height and w is width
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
function printLeftViewIterative(root) {
  let res = [];
  if (!root) return res;

  let q = []; // new Queue()
  q.push(root);

  while (q.length > 0) { // !q.isEmpty()
    let size = q.length; // q.size()
    for (let i = 0; i < size; i++) {
      let curr = q.shift(); // q.deque()

      if (i === 0) { // Print first node of each level
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
function printLeftViewRecursive(root){
    let res = []
    let maxLevel = 0 // Global variable for level tracking. Changes only when 1st node of new level comes into picture.
    helper(root)
    function helper(root, level=1){
        if(!root) return
        
        if(level > maxLevel){
            res.push(root.key) // Push First node of every level.
            maxLevel = level
        }
        helper(root.left, level+1)
        helper(root.right, level+1)
    }
    return res
}

const root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.right = new TreeNode(40);
root.right.left = new TreeNode(50);
root.right.right = new TreeNode(60);
// Output: [ 10, 20, 40 ]

const root = new TreeNode(10);
root.left = new TreeNode(50);
root.right = new TreeNode(60);
root.right.left = new TreeNode(70);
root.right.right = new TreeNode(20);
root.right.right.left = new TreeNode(8);
// Output: [ 10, 50, 70, 8 ]

const root = new TreeNode(30);
root.left = new TreeNode(50);
root.left.right = new TreeNode(60);
root.left.right.left = new TreeNode(70);
// Output: [ 30, 50, 60, 70 ]

const root = new TreeNode(10);
// Output: [ 10 ]

console.log(printLeftView(root));

/*🎯 CORE IDEA: Use level-order traversal (BFS) to find the leftmost node at each level. For each level, the first node processed is the leftmost node visible from the left side. Alternatively, use recursive approach with level tracking to identify the first node encountered at each level.

📋 STEP-BY-STEP FLOW:

1️⃣ ITERATIVE APPROACH (BFS):
   - Use queue for level-order traversal
   - For each level, process all nodes at that level
   - Add the first node of each level to result
   - Enqueue children for next level

2️⃣ RECURSIVE APPROACH (DFS):
   - Use preorder traversal with level tracking
   - Track maximum level reached so far
   - Add first node encountered at each new level
   - Recursively traverse left then right subtrees

🧠 WHY THIS APPROACH?
- Level-order traversal naturally processes leftmost nodes first
- BFS ensures we visit nodes level by level
- Recursive approach uses DFS with level tracking
- Both methods guarantee leftmost node at each level

💡 KEY INSIGHTS:
- Left view = leftmost node at each level
- BFS processes nodes level by level
- First node at each level is the leftmost
- Recursive approach uses level tracking
- Both achieve O(n) time complexity
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Tree with nodes [10, 20, 30, 40, 50, 60]

INPUT: Binary Tree
       10
      /  \
     20   30
       \  / \
       40 50 60

OUTPUT: [10, 20, 40]
EXPLANATION: Left view shows leftmost nodes at each level: 10 (level 1), 20 (level 2), 40 (level 3)

🎯 GOAL: Find leftmost nodes at each level!

🔍 ITERATIVE APPROACH (BFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
queue = [10] (root node)
res = []
level = 1

📋 LEVEL 1 PROCESSING:
count = 1 (queue size)
i = 0: curr = 10
i === 0 → res.push(10) → res = [10]
Enqueue children: queue = [20, 30]

📋 LEVEL 2 PROCESSING:
count = 2 (queue size)
i = 0: curr = 20
i === 0 → res.push(20) → res = [10, 20]
Enqueue children: queue = [30, 40]
i = 1: curr = 30
i !== 0 → no addition to res
Enqueue children: queue = [40, 50, 60]

📋 LEVEL 3 PROCESSING:
count = 3 (queue size)
i = 0: curr = 40
i === 0 → res.push(40) → res = [10, 20, 40]
Enqueue children: queue = [50, 60] (40 has no children)
i = 1: curr = 50
i !== 0 → no addition to res
Enqueue children: queue = [60] (50 has no children)
i = 2: curr = 60
i !== 0 → no addition to res
Enqueue children: queue = [] (60 has no children)

📋 TERMINATION:
queue.length === 0 → exit loop

🏆 RESULT: [10, 20, 40]

─────────────────────────────────────────

📊 RECURSIVE APPROACH - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
maxLevel = 0
level = 1

📋 RECURSIVE TRAVERSAL:

CALL 1: helper(10, level=1)
root = 10, level = 1
level > maxLevel (1 > 0) → res.push(10) → res = [10]
maxLevel = 1
CALL 2: helper(20, level=2)
CALL 3: helper(30, level=2)

CALL 2: helper(20, level=2)
root = 20, level = 2
level > maxLevel (2 > 1) → res.push(20) → res = [10, 20]
maxLevel = 2
CALL 4: helper(null, level=3) → return (no left child)
CALL 5: helper(40, level=3)

CALL 5: helper(40, level=3)
root = 40, level = 3
level > maxLevel (3 > 2) → res.push(40) → res = [10, 20, 40]
maxLevel = 3
CALL 6: helper(null, level=4) → return (no left child)
CALL 7: helper(null, level=4) → return (no right child)

CALL 3: helper(30, level=2)
root = 30, level = 2
level <= maxLevel (2 <= 2) → no addition to res
CALL 8: helper(50, level=3)
CALL 9: helper(60, level=3)

CALL 8: helper(50, level=3)
root = 50, level = 3
level <= maxLevel (3 <= 3) → no addition to res
CALL 10: helper(null, level=4) → return (no left child)
CALL 11: helper(null, level=4) → return (no right child)

CALL 9: helper(60, level=3)
root = 60, level = 3
level <= maxLevel (3 <= 3) → no addition to res
CALL 12: helper(null, level=4) → return (no left child)
CALL 13: helper(null, level=4) → return (no right child)

🏆 RESULT: [10, 20, 40]

─────────────────────────────────────────

📊 EXAMPLE: Tree with nodes [10, 50, 60, 70, 20, 8]

INPUT: Binary Tree
       10
      /  \
     50   60
         /  \
        70   20
            /
           8

OUTPUT: [10, 50, 70, 8]
EXPLANATION: Left view shows leftmost nodes at each level: 10 (level 1), 50 (level 2), 70 (level 3), 8 (level 4)

🔍 ITERATIVE PROCESS:

LEVEL 1: queue = [10], res = [10]
LEVEL 2: queue = [50, 60], res = [10, 50]
LEVEL 3: queue = [70, 20], res = [10, 50, 70]
LEVEL 4: queue = [8], res = [10, 50, 70, 8]

🏆 RESULT: [10, 50, 70, 8]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
       10
      /  \
     20   30
       \  / \
       40 50 60

LEFT VIEW PERSPECTIVE:
       10 ← Level 1 (leftmost)
      /
     20 ← Level 2 (leftmost)
       \
       40 ← Level 3 (leftmost)

VISIBLE NODES FROM LEFT: [10, 20, 40]

─────────────────────────────────────────

📊 LEVEL-BY-LEVEL PROCESSING:

LEVEL 1: [10] → Leftmost: 10
LEVEL 2: [20, 30] → Leftmost: 20
LEVEL 3: [40, 50, 60] → Leftmost: 40

RESULT: [10, 20, 40]

─────────────────────────────────────────

📊 QUEUE OPERATIONS VISUALIZATION:

INITIAL: queue = [10]
LEVEL 1: Process 10 → queue = [20, 30]
LEVEL 2: Process 20, 30 → queue = [40, 50, 60]
LEVEL 3: Process 40, 50, 60 → queue = []

RESULT COLLECTION:
Level 1: res = [10]
Level 2: res = [10, 20]
Level 3: res = [10, 20, 40]

─────────────────────────────────────────

📊 RECURSIVE TRAVERSAL VISUALIZATION:

PREORDER TRAVERSAL: Root → Left → Right
10 (level 1) → 20 (level 2) → 40 (level 3) → 30 (level 2) → 50 (level 3) → 60 (level 3)

LEVEL TRACKING:
maxLevel = 0
Visit 10 (level 1): 1 > 0 → add 10, maxLevel = 1
Visit 20 (level 2): 2 > 1 → add 20, maxLevel = 2
Visit 40 (level 3): 3 > 2 → add 40, maxLevel = 3
Visit 30 (level 2): 2 <= 2 → skip
Visit 50 (level 3): 3 <= 3 → skip
Visit 60 (level 3): 3 <= 3 → skip

RESULT: [10, 20, 40]

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ LEVEL-ORDER TRAVERSAL: Processes nodes level by level
2️⃣ FIRST NODE AT EACH LEVEL: Naturally the leftmost node
3️⃣ BFS PROPERTY: Ensures leftmost nodes are processed first
4️⃣ RECURSIVE LEVEL TRACKING: Identifies first node at each level
5️⃣ CORRECT RESULTS: Guaranteed to find leftmost nodes

💡 KEY INSIGHT:
Use level-order traversal to find the first (leftmost) node
at each level, or use recursive approach with level tracking!

🎯 TIME COMPLEXITY ANALYSIS:
- Iterative: O(n) - visit each node once
- Recursive: O(n) - visit each node once
- Both approaches: Linear time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Iterative: O(w) where w is maximum width (queue size)
- Recursive: O(h) where h is height (recursion stack)
- Worst case: O(n) for both approaches

🎯 EDGE CASES HANDLED:
- Empty tree: Return empty array
- Single node: Return [root.val]
- Left-skewed tree: All nodes visible
- Right-skewed tree: Only root and leftmost path
- Balanced tree: Leftmost nodes at each level

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find leftmost node at each level
- Level-order traversal ensures correct order
- Recursive approach uses level tracking
- Both methods produce correct results

🎯 IMPLEMENTATION DETAILS:
- Iterative: Queue-based BFS with level processing
- Recursive: DFS with level parameter and maxLevel tracking
- Both: O(n) time complexity
- Space: O(w) for iterative, O(h) for recursive

🎯 BFS APPROACH:
- Use queue for level-order traversal
- Process all nodes at current level
- Add first node of each level to result
- Enqueue children for next level
- Natural leftmost node identification

🎯 DFS APPROACH:
- Use preorder traversal (root, left, right)
- Track current level and maximum level reached
- Add first node encountered at each new level
- Recursively traverse left then right subtrees
- Level tracking ensures correct identification

🎯 COMPARISON OF APPROACHES:
- Iterative: O(n) time, O(w) space, uses queue
- Recursive: O(n) time, O(h) space, uses recursion
- Both: Correct results, different space usage
- Choice depends on tree structure and constraints

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization
- UI rendering
- Game development
- Data structure analysis
- Algorithm design

🎯 OPTIMIZATION TECHNIQUES:
- Use iterative approach for wide trees
- Use recursive approach for deep trees
- Early termination if possible
- Efficient queue operations
- Optimal space usage

🎯 ALGORITHM PATTERN:
- Level-order traversal (BFS)
- Depth-first traversal (DFS)
- Level tracking
- First node identification

🎯 MATHEMATICAL PROPERTIES:
- Tree height: h = log(n) for balanced trees
- Tree width: w = n for skewed trees
- Level count: h levels in tree
- Node count: n nodes total

🎯 ERROR HANDLING:
- Null root: Return empty array
- Single node: Return [root.val]
- Invalid input: Robust handling
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF BFS APPROACH:
- Natural level-by-level processing
- Easy to understand and implement
- Guaranteed leftmost node identification
- Efficient for wide trees
- Clear level separation

🎯 ADVANTAGES OF DFS APPROACH:
- Lower space complexity for deep trees
- Natural recursive structure
- Level tracking mechanism
- Efficient for deep trees
- Elegant implementation

🎯 DISADVANTAGES:
- BFS: Higher space complexity for wide trees
- DFS: Higher space complexity for deep trees
- Both: O(n) time complexity (optimal)
- Memory usage: Depends on tree structure

🎯 ALTERNATIVE APPROACHES:
- Morris traversal: O(1) space
- Iterative DFS: O(h) space
- Level-order with markers: O(n) space
- All: Correct left view results

🎯 IMPLEMENTATION CONSIDERATIONS:
- Tree structure: Balanced vs skewed
- Space constraints: Memory limitations
- Performance requirements: Time vs space
- Code maintainability: Readability
- Testing: Edge case coverage

🎯 TESTING STRATEGY:
- Test empty tree
- Test single node
- Test left-skewed tree
- Test right-skewed tree
- Test balanced tree
- Test various tree sizes

🎯 DEBUGGING TIPS:
- Check queue state after each level
- Verify level tracking in recursive approach
- Monitor result array construction
- Validate leftmost node identification
- Check edge case handling

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree traversal
- Space: O(w) or O(h) - depends on approach
- Overall: Efficient for given constraints
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Consider space usage
- Deep trees: Use iterative approach
- Wide trees: Use recursive approach
- Memory usage: Monitor space consumption

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to handle null root
- Incorrect level tracking
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand tree traversal
- Learn BFS and DFS techniques
- Master level tracking
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain both approaches
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Level-order traversal for BFS
- Preorder traversal for DFS
- Level tracking mechanism
- First node identification
- Tree structure understanding

🎯 MATHEMATICAL ANALYSIS:
- Node visits: Each node visited once
- Level processing: O(1) per level
- Queue operations: O(1) per node
- Recursion depth: O(h) maximum
- Total: O(n) time complexity

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct level order
- Efficient space usage
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify leftmost node identification
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) time
- Optimized approach: O(n) time
- Alternative approaches: Morris traversal
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Tree visualization
- UI rendering
- Game development
- Data structure analysis
- Educational purposes

🎯 CONCLUSION:
The left view problem demonstrates how to use level-order traversal
(BFS) or recursive traversal (DFS) with level tracking to identify
the leftmost nodes at each level, achieving efficient O(n) time
complexity with optimal space usage!
*/
