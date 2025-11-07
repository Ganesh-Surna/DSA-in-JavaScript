/* Problem: ✅✅✅✅ Balanced Binary Tree ✅✅✅✅

Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

You are given the root of a binary tree. The task is to determine if the tree is height-balanced, where for every node, the absolute difference between the heights of its left and right subtrees is at most 1.

Example 1:
Input: 
       20
      /  \
     8    12
    / \
   3   5
Output: true
Explanation: Heights of subtrees: left=2, right=1, difference=1 ≤ 1. All nodes satisfy the balance condition.

Example 2:
Input:
       10
      /  \
     8    2
    /     \
   18     4
          /
         5
Output: false
Explanation: At root node 10, left subtree height=2, right subtree height=3, difference=1 ≤ 1. But at node 2, left=0, right=2, difference=2 > 1.

Example 3:
Input:
       3
      /
     2
    /
   1
Output: false
Explanation: At root node 3, left subtree height=2, right subtree height=0, difference=2 > 1.

Constraints:
- The number of nodes in the tree is in the range [0, 5000]
- -10^4 <= Node.val <= 10^4

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(h) where h is the height of the tree
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n)
// ✅ SC = O(h)
function isBalancedTree(root) {
    return check(root) !== -1;
    
    // Helper
    function check(node) {
    if (!node) return 0; // height = 0
    
    let lh = check(node.left);
    if (lh === -1) return -1; // left not balanced
    
    let rh = check(node.right);
    if (rh === -1) return -1; // right not balanced
    
    if (Math.abs(lh - rh) > 1) return -1; // not balanced
    
    return 1 + Math.max(lh, rh); // return height if balanced
  }
}

let root = new TreeNode(20)
root.left = new TreeNode(8)
root.right = new TreeNode(12)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(5)
// Output: true


root = new TreeNode(10)
root.left = new TreeNode(8)
root.left.left = new TreeNode(18)
root.left.right = new TreeNode(3)
root.right = new TreeNode(2)
root.right.right = new TreeNode(4)
root.right.right.left = new TreeNode(5)
// Output: false

root = new TreeNode(10)
root.left = new TreeNode(8)
root.left.left = new TreeNode(18)
root.left.right = new TreeNode(3)
root.left.right.left = new TreeNode(31)
root.left.right.right = new TreeNode(32)
root.right = new TreeNode(2)
root.right.left = new TreeNode(4)
// Output: true

root = new TreeNode(3)
root.left = new TreeNode(2)
root.left.left = new TreeNode(1)
// Output: false

root = new TreeNode(5)
// Output: true

root = null
// Output: true

console.log(isBalancedTree(root))

/*🎯 CORE IDEA: Use recursive traversal to check if every node satisfies the height balance condition. For each node, calculate the heights of left and right subtrees, check if their difference is ≤ 1, and return -1 if unbalanced or the height if balanced. This allows early termination when any subtree is unbalanced.

📋 STEP-BY-STEP FLOW:

1️⃣ BASE CASE HANDLING:
   - If node is null: return 0 (height of empty tree)
   - This handles leaf nodes and null children

2️⃣ LEFT SUBTREE CHECK:
   - Recursively check left subtree height
   - If left subtree is unbalanced (returns -1): return -1 immediately
   - Early termination prevents unnecessary calculations

3️⃣ RIGHT SUBTREE CHECK:
   - Recursively check right subtree height
   - If right subtree is unbalanced (returns -1): return -1 immediately
   - Early termination optimizes performance

4️⃣ BALANCE VALIDATION:
   - Calculate absolute difference: |left_height - right_height|
   - If difference > 1: return -1 (unbalanced)
   - If difference ≤ 1: return 1 + max(left_height, right_height) (balanced)

🧠 WHY THIS APPROACH?
- Recursive traversal checks every node systematically
- Early termination on imbalance detection
- Single pass calculates height and checks balance
- Efficient O(n) time and O(h) space complexity

💡 KEY INSIGHTS:
- Height-balanced: |left_height - right_height| ≤ 1
- Return -1 for unbalanced, height for balanced
- Early termination prevents unnecessary calculations
- Single traversal for both height calculation and balance check
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Tree with nodes [20, 8, 12, 3, 5]

INPUT: Binary Tree
       20
      /  \
     8    12
    / \
   3   5

OUTPUT: true
EXPLANATION: Heights of subtrees: left=2, right=1, difference=1 ≤ 1. All nodes satisfy the balance condition.

🎯 GOAL: Check if every node satisfies height balance condition!

🔍 RECURSIVE TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
root = 20
Check height balance for entire tree

📋 RECURSIVE CALLS:

CALL 1: check(20)
node = 20, has children (8, 12)
lh = check(8) → need to calculate
rh = check(12) → need to calculate

CALL 2: check(8)
node = 8, has children (3, 5)
lh = check(3) → need to calculate
rh = check(5) → need to calculate

CALL 3: check(3)
node = 3, no children (leaf node)
lh = check(null) = 0
rh = check(null) = 0
|0 - 0| = 0 ≤ 1 → balanced
return 1 + max(0, 0) = 1

CALL 4: check(5)
node = 5, no children (leaf node)
lh = check(null) = 0
rh = check(null) = 0
|0 - 0| = 0 ≤ 1 → balanced
return 1 + max(0, 0) = 1

CALL 5: check(12)
node = 12, no children (leaf node)
lh = check(null) = 0
rh = check(null) = 0
|0 - 0| = 0 ≤ 1 → balanced
return 1 + max(0, 0) = 1

📋 BACK TO CALL 2: check(8)
lh = 1 (from check(3))
rh = 1 (from check(5))
|1 - 1| = 0 ≤ 1 → balanced
return 1 + max(1, 1) = 2

📋 BACK TO CALL 1: check(20)
lh = 2 (from check(8))
rh = 1 (from check(12))
|2 - 1| = 1 ≤ 1 → balanced
return 1 + max(2, 1) = 3

📋 FINAL RESULT:
check(20) = 3 ≠ -1 → isBalancedTree(20) = true

🏆 RESULT: true

─────────────────────────────────────────

📊 EXAMPLE: Tree with nodes [3, 2, 1]

INPUT: Binary Tree
       3
      /
     2
    /
   1

OUTPUT: false
EXPLANATION: At root node 3, left subtree height=2, right subtree height=0, difference=2 > 1.

🔍 Process:

CALL 1: check(3)
node = 3, has children (2, null)
lh = check(2) → need to calculate
rh = check(null) = 0

CALL 2: check(2)
node = 2, has children (1, null)
lh = check(1) → need to calculate
rh = check(null) = 0

CALL 3: check(1)
node = 1, no children (leaf node)
lh = check(null) = 0
rh = check(null) = 0
|0 - 0| = 0 ≤ 1 → balanced
return 1 + max(0, 0) = 1

📋 BACK TO CALL 2: check(2)
lh = 1 (from check(1))
rh = 0 (from check(null))
|1 - 0| = 1 ≤ 1 → balanced
return 1 + max(1, 0) = 2

📋 BACK TO CALL 1: check(3)
lh = 2 (from check(2))
rh = 0 (from check(null))
|2 - 0| = 2 > 1 → unbalanced
return -1

📋 FINAL RESULT:
check(3) = -1 → isBalancedTree(3) = false

🏆 RESULT: false

─────────────────────────────────────────

📊 EXAMPLE: Tree with nodes [10, 8, 2, 18, 4, 5]

INPUT: Binary Tree
       10
      /  \
     8    2
    /     \
   18     4
          /
         5

OUTPUT: false
EXPLANATION: At root node 10, left subtree height=2, right subtree height=3, difference=1 ≤ 1. But at node 2, left=0, right=2, difference=2 > 1.

🔍 Process:

CALL 1: check(10)
lh = check(8) = 2
rh = check(2) → need to calculate

CALL 2: check(2)
lh = check(null) = 0
rh = check(4) → need to calculate

CALL 3: check(4)
lh = check(5) = 1
rh = check(null) = 0
|1 - 0| = 1 ≤ 1 → balanced
return 1 + max(1, 0) = 2

📋 BACK TO CALL 2: check(2)
lh = 0 (from check(null))
rh = 2 (from check(4))
|0 - 2| = 2 > 1 → unbalanced
return -1

📋 BACK TO CALL 1: check(10)
lh = 2 (from check(8))
rh = -1 (from check(2)) → unbalanced
return -1

📋 FINAL RESULT:
check(10) = -1 → isBalancedTree(10) = false

🏆 RESULT: false

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
       20
      /  \
     8    12
    / \
   3   5

HEIGHT CALCULATION:
Level 3: 3, 5, 12 → height = 1
Level 2: 8 → height = 2 (max of children + 1)
Level 1: 20 → height = 3 (max of children + 1)

BALANCE CHECK:
Node 20: |2 - 1| = 1 ≤ 1 ✓
Node 8: |1 - 1| = 0 ≤ 1 ✓
Node 3: |0 - 0| = 0 ≤ 1 ✓
Node 5: |0 - 0| = 0 ≤ 1 ✓
Node 12: |0 - 0| = 0 ≤ 1 ✓

RESULT: true

─────────────────────────────────────────

📊 UNBALANCED TREE EXAMPLE:

ORIGINAL TREE:
       3
      /
     2
    /
   1

HEIGHT CALCULATION:
Level 3: 1 → height = 1
Level 2: 2 → height = 2
Level 1: 3 → height = 3

BALANCE CHECK:
Node 3: |2 - 0| = 2 > 1 ✗

RESULT: false

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

check(20)
├── check(8)
│   ├── check(3) → 1 (balanced)
│   └── check(5) → 1 (balanced)
└── check(12) → 1 (balanced)

FINAL: check(8) = 2, check(12) = 1
|2 - 1| = 1 ≤ 1 → balanced
return 3

─────────────────────────────────────────

📊 HEIGHT CALCULATION PROCESS:

NODE 3: height = 1 (leaf)
NODE 5: height = 1 (leaf)
NODE 12: height = 1 (leaf)
NODE 8: height = 1 + max(1, 1) = 2
NODE 20: height = 1 + max(2, 1) = 3

BALANCE VALIDATION:
All nodes satisfy |left_height - right_height| ≤ 1

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RECURSIVE TRAVERSAL: Checks every node systematically
2️⃣ HEIGHT CALCULATION: Calculates height while checking balance
3️⃣ EARLY TERMINATION: Returns -1 immediately on imbalance
4️⃣ SINGLE PASS: Combines height calculation and balance check
5️⃣ CORRECT RESULTS: Guaranteed to check all nodes

💡 KEY INSIGHT:
Use recursive traversal to calculate height and check balance
simultaneously, with early termination on imbalance detection!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Height calculation per node: O(1)
- Balance check per node: O(1)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(h) where h is tree height
- No extra data structures used
- Total: O(h) space complexity

🎯 EDGE CASES HANDLED:
- Empty tree (null root): Return true
- Single node (leaf): Return true
- Left-skewed tree: Check height difference
- Right-skewed tree: Check height difference
- Balanced tree: All nodes satisfy condition

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to check every node
- Height calculation is correct
- Balance validation is accurate
- Early termination optimizes performance
- All nodes must satisfy condition for true result

🎯 IMPLEMENTATION DETAILS:
- Recursive approach with height calculation
- Early termination on imbalance detection
- Return -1 for unbalanced, height for balanced
- Single traversal for both height and balance
- Optimal O(n) time and O(h) space complexity

🎯 HEIGHT CALCULATION:
- Base case: null node returns 0
- Recursive case: 1 + max(left_height, right_height)
- Height of leaf node: 1
- Height of internal node: max of children + 1

🎯 BALANCE VALIDATION:
- Calculate absolute difference: |left_height - right_height|
- If difference > 1: return -1 (unbalanced)
- If difference ≤ 1: return height (balanced)
- Early termination prevents unnecessary calculations

🎯 EARLY TERMINATION:
- If left subtree unbalanced: return -1 immediately
- If right subtree unbalanced: return -1 immediately
- If current node unbalanced: return -1 immediately
- Optimizes performance by avoiding unnecessary calculations

🎯 COMPARISON WITH ALTERNATIVE APPROACHES:
- Naive approach: O(n²) time (calculate height for each node)
- Optimized approach: O(n) time (single traversal)
- Both: Correct results, different time complexity
- Optimized: More efficient and practical

🎯 REAL-WORLD APPLICATIONS:
- Tree validation
- Data structure integrity
- Algorithm optimization
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Early termination on imbalance
- Single traversal for height and balance
- Efficient recursive structure
- Minimal space usage
- Optimal time complexity

🎯 ALGORITHM PATTERN:
- Recursive tree traversal
- Height calculation
- Balance validation
- Early termination

🎯 MATHEMATICAL PROPERTIES:
- Tree height: h = log(n) for balanced trees
- Node count: n nodes total
- Height calculation: O(1) per node
- Balance check: O(1) per node

🎯 ERROR HANDLING:
- Null root: Return true
- Leaf nodes: Return height 1
- Single child: Handle null as height 0
- Imbalance: Return -1 immediately
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF OPTIMIZED APPROACH:
- Single traversal: O(n) time complexity
- Early termination: Optimizes performance
- Space efficient: O(h) space complexity
- Easy to understand and implement
- Correct and reliable results

🎯 DISADVANTAGES:
- Recursion stack overhead
- Potential stack overflow for deep trees
- Less intuitive for some developers
- Debugging complexity

🎯 ALTERNATIVE APPROACHES:
- Naive approach: O(n²) time, O(h) space
- Optimized approach: O(n) time, O(h) space
- Iterative approach: O(n) time, O(n) space
- All: Correct balance validation

🎯 IMPLEMENTATION CONSIDERATIONS:
- Tree structure: Balanced vs skewed
- Space constraints: Memory limitations
- Performance requirements: Time vs space
- Code maintainability: Readability
- Testing: Edge case coverage

🎯 TESTING STRATEGY:
- Test empty tree
- Test single node
- Test balanced tree
- Test unbalanced tree
- Test various tree structures

🎯 DEBUGGING TIPS:
- Check height calculation
- Verify balance validation
- Monitor early termination
- Validate edge cases
- Check return values

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree traversal
- Space: O(h) - optimal for recursive approach
- Overall: Efficient for given constraints
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Consider recursion depth
- Deep trees: Monitor stack usage
- Memory usage: Track recursion stack
- Optimization: Consider iterative approach

🎯 BEST PRACTICES:
- Clear base case handling
- Proper height calculation
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to handle null nodes
- Incorrect height calculation
- Missing early termination
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand recursive tree traversal
- Learn height calculation
- Master balance validation
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain the optimized approach
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Recursive tree traversal
- Height calculation
- Balance validation
- Early termination
- Tree structure understanding

🎯 MATHEMATICAL ANALYSIS:
- Node visits: Each node visited once
- Height calculation: O(1) per node
- Balance check: O(1) per node
- Recursion depth: O(h) maximum
- Total: O(n) time complexity

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct height calculation
- Efficient balance validation
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify height calculation
- Check balance validation
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) time
- Optimized approach: O(n) time
- Alternative approaches: Iterative traversal
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Tree validation
- Data structure integrity
- Algorithm optimization
- Educational purposes
- System design

🎯 CONCLUSION:
The balanced binary tree problem demonstrates how to use recursive
tree traversal with height calculation and balance validation to
check if every node satisfies the height balance condition, achieving
efficient O(n) time and O(h) space complexity with early termination!
*/ 