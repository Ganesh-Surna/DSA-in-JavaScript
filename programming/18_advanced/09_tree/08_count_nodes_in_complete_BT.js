/* Problem: ✅✅✅✅ Count Nodes in Complete Binary Tree ✅✅✅✅

Given the root of a complete binary tree, return the number of nodes in the tree. A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.

You are given the root of a complete binary tree. The task is to count the total number of nodes efficiently, taking advantage of the complete binary tree properties to avoid visiting every node individually.

Example 1:
Input: 
       10
      /  \
     20   30
    / \  /
   40 50 60

Output: 6
Explanation: The complete binary tree has 6 nodes total. All levels except the last are completely filled.

Example 2:
Input:
       10
      /  \
     20   21
    / \  / \
   30 32 33 34
  / \ / \
 40 41 42 43

Output: 11
Explanation: The complete binary tree has 11 nodes. The last level is partially filled from left to right.

Example 3:
Input:
       10
      /
     20

Output: 2
Explanation: Simple complete binary tree with 2 nodes.

Example 4:
Input: null

Output: 0
Explanation: Empty tree has 0 nodes.

Constraints:
- The number of nodes in the tree is in the range [0, 5 * 10^4]
- 0 <= Node.val <= 5 * 10^4
- The tree is guaranteed to be a complete binary tree

Expected Complexities:
Time Complexity: O(log n * log n) for efficient approach, O(n) for naive approach
Auxiliary Space: O(1) for efficient approach, O(h) for naive approach
*/

class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// 1. Efficient Approach (Using Perfect Binary Tree Property)
// ✅ TC = O(logn * logn)
// ✅ SC = O(1)
function countNodesInCompleteBT(root) {
    if (!root) return 0;

    let ld = 0; // Depth of leftmost node/leaf
    for (let curr = root; curr !== null; curr = curr.left) {
        ld++;
    }

    let rd = 0; // Depth of rightmost node/leaf
    for (let curr = root; curr !== null; curr = curr.right) {
        rd++;
    }

    if (ld === rd) {
        // If left and right depths are equal, it means the tree is perfect
        // ✅ Perfect Binary Tree (All nodes have 2 children)
        // count of nodes of perfect binary tree is ✅ (2^d - 1) ✅ (where d is depth of perfect tree)

        return (1 << ld) - 1; // means 2^ld - 1
        // retrun calcPow(2, ld) - 1
    }

    // If left and right depths are not equal, it means the tree is not perfect
    // So we need to count the nodes in the left and right subtrees (in Naive Approach)
    return 1 + countNodesInCompleteBT(root.left) + countNodesInCompleteBT(root.right);
}

// 2. Naive Approach (Using Recursion)
// ✅ TC = O(n)
// ✅ SC = O(h)
function countNodesInCompleteBT(root) {
    if (!root) return 0;
    
    return 1 + countNodesInCompleteBT(root.left) + countNodesInCompleteBT(root.right);
}

let root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(50);
root.right.left = new TreeNode(60);
// Output: 6

root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(21);
root.left.left = new TreeNode(30);
root.left.right = new TreeNode(32);
root.left.left.left = new TreeNode(40);
root.left.left.right = new TreeNode(41);
root.left.right.left = new TreeNode(42);
root.left.right.right = new TreeNode(43);
root.right.left = new TreeNode(33);
root.right.right = new TreeNode(34);
// Output: 11

root = new TreeNode(10);
root.left = new TreeNode(20);
// Output: 2

root = null;
// Output: 0

console.log(countNodesInCompleteBT(root));

/*🎯 CORE IDEA: Use the complete binary tree property to optimize node counting. Check if subtrees are perfect binary trees by comparing left and right depths. If perfect, use formula 2^depth - 1. If not perfect, recursively count left and right subtrees. This avoids visiting every node individually.

📋 STEP-BY-STEP FLOW:

1️⃣ DEPTH CALCULATION:
   - Calculate leftmost depth by going left from root
   - Calculate rightmost depth by going right from root
   - Compare depths to check if tree is perfect

2️⃣ PERFECT TREE CHECK:
   - If left depth equals right depth: tree is perfect
   - Use formula: 2^depth - 1 for instant node count
   - Return result without visiting all nodes

3️⃣ RECURSIVE COUNTING:
   - If depths differ: tree is not perfect
   - Recursively count nodes in left subtree
   - Recursively count nodes in right subtree
   - Return 1 + left_count + right_count

4️⃣ OPTIMIZATION:
   - Perfect subtrees calculated in O(1) using formula
   - Only non-perfect subtrees require recursion
   - Significantly faster than naive O(n) approach

🧠 WHY THIS APPROACH?
- Complete binary tree has specific structure properties
- Perfect subtrees can be counted using mathematical formula
- Reduces time complexity from O(n) to O(log²n)
- Leverages binary tree depth calculations efficiently

💡 KEY INSIGHTS:
- Perfect binary tree: all levels completely filled
- Complete binary tree: last level filled left-to-right
- Depth comparison determines if subtree is perfect
- Formula 2^depth - 1 gives perfect tree node count
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Complete Binary Tree with 6 nodes

INPUT: Binary Tree
       10
      /  \
     20   30
    / \  /
   40 50 60

OUTPUT: 6
EXPLANATION: Tree is complete but not perfect. Left subtree is perfect with 3 nodes, right subtree needs recursive counting.

🎯 GOAL: Count nodes efficiently using complete binary tree properties!

🔍 EFFICIENT ALGORITHM - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: countNodesInCompleteBT(10)

📋 DEPTH CALCULATIONS:

STEP 1: Calculate Left Depth (ld)
curr = 10 → curr.left = 20 → ld = 1
curr = 20 → curr.left = 40 → ld = 2  
curr = 40 → curr.left = null → ld = 3
Final: ld = 3

STEP 2: Calculate Right Depth (rd)
curr = 10 → curr.right = 30 → rd = 1
curr = 30 → curr.right = null → rd = 2
Final: rd = 2

STEP 3: Compare Depths
ld = 3, rd = 2
3 ≠ 2 → Tree is NOT perfect

STEP 4: Recursive Counting
Since tree is not perfect:
return 1 + countNodesInCompleteBT(20) + countNodesInCompleteBT(30)

📋 LEFT SUBTREE RECURSION:

CALL 1: countNodesInCompleteBT(20) - LEFT SUBTREE
Calculate depths for node 20:
ld: 20 → 40 → null (ld = 2)
rd: 20 → 50 → null (rd = 2)
ld === rd → Perfect tree!
Node count = 2^2 - 1 = 4 - 1 = 3

📋 RIGHT SUBTREE RECURSION:

CALL 2: countNodesInCompleteBT(30) - RIGHT SUBTREE
Calculate depths for node 30:
ld: 30 → 60 → null (ld = 2)
rd: 30 → null (rd = 1)
ld ≠ rd → Not perfect
return 1 + countNodesInCompleteBT(60) + countNodesInCompleteBT(null)

CALL 3: countNodesInCompleteBT(60) - LEAF NODE
Calculate depths for node 60:
ld: 60 → null (ld = 1)
rd: 60 → null (rd = 1)
ld === rd → Perfect tree!
Node count = 2^1 - 1 = 2 - 1 = 1

CALL 4: countNodesInCompleteBT(null)
Base case: return 0

📋 FINAL CALCULATION:
countNodesInCompleteBT(30) = 1 + 1 + 0 = 2
countNodesInCompleteBT(10) = 1 + 3 + 2 = 6

🏆 RESULT: 6

─────────────────────────────────────────

📊 EXAMPLE: Perfect Binary Tree

INPUT: Binary Tree
       10
      /  \
     20   30
    / \  / \
   40 50 60 70

OUTPUT: 7
EXPLANATION: Tree is perfect, so use formula directly.

🔍 Process:

STEP 1: Calculate Depths
ld: 10 → 20 → 40 → null (ld = 3)
rd: 10 → 30 → 70 → null (rd = 3)

STEP 2: Compare Depths
ld = 3, rd = 3
3 === 3 → Tree is perfect!

STEP 3: Apply Formula
Node count = 2^3 - 1 = 8 - 1 = 7

🏆 RESULT: 7 (calculated in O(log n) time!)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DEPTH CALCULATION VISUALIZATION:

LEFT DEPTH CALCULATION:
       10 (level 1)
      /  
     20   (level 2)
    /     
   40     (level 3)
  /
null      (ld = 3)

RIGHT DEPTH CALCULATION:
       10 (level 1)
         \
          30 (level 2)
           \
           null (rd = 2)

COMPARISON: ld (3) ≠ rd (2) → NOT PERFECT

RECURSIVE BREAKDOWN:
       10 (not perfect → recurse)
      /  \
     20   30
(perfect) (not perfect)
count=3   recurse

FINAL CALCULATION:
10: 1 + left_count(3) + right_count(2) = 6

─────────────────────────────────────────

📊 PERFECT vs COMPLETE TREE ANALYSIS:

PERFECT BINARY TREE:
- All levels completely filled
- Left depth = Right depth
- Node count = 2^depth - 1
- Can be calculated instantly

COMPLETE BINARY TREE:
- All levels filled except possibly last
- Last level filled left-to-right
- Left depth ≥ Right depth
- May require recursive counting

OPTIMIZATION BENEFIT:
- Perfect subtrees: O(1) calculation
- Non-perfect subtrees: O(log n) recursion
- Overall: O(log²n) instead of O(n)

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

countNodesInCompleteBT(10) → 6
├── countNodesInCompleteBT(20) → 3 (perfect)
└── countNodesInCompleteBT(30) → 2
    ├── countNodesInCompleteBT(60) → 1 (perfect)
    └── countNodesInCompleteBT(null) → 0

DEPTH CALCULATIONS: 4 times (each recursive call)
PERFECT TREE OPTIMIZATIONS: 2 times (nodes 20 and 60)
RECURSIVE CALLS: 4 times total

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ COMPLETE TREE PROPERTY: Structure is predictable and organized
2️⃣ PERFECT SUBTREE DETECTION: Depth comparison identifies optimization opportunities  
3️⃣ MATHEMATICAL FORMULA: 2^depth - 1 gives instant node count for perfect trees
4️⃣ SELECTIVE RECURSION: Only non-perfect subtrees require detailed counting
5️⃣ LOGARITHMIC COMPLEXITY: Much faster than visiting every node

💡 KEY INSIGHT:
Use complete binary tree structure to identify perfect subtrees and apply
mathematical formula for instant counting, falling back to recursion only
when necessary for non-perfect subtrees!

🎯 TIME COMPLEXITY ANALYSIS:
- Depth calculation: O(log n) per call
- Number of recursive calls: O(log n) in worst case
- Total: O(log n × log n) = O(log²n)
- Much better than naive O(n) approach

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(log n) maximum
- No extra data structures needed
- Total: O(log n) space complexity

🎯 EDGE CASES HANDLED:
- Empty tree: return 0
- Single node: perfect tree with count 1
- Perfect tree: use formula directly
- Complete but not perfect: selective recursion

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to identify perfect subtrees correctly
- Mathematical formula is mathematically proven
- Recursive counting handles non-perfect cases
- Complete coverage of all tree structures

🎯 IMPLEMENTATION DETAILS:
- Left/right depth calculation using iterative traversal
- Bit shifting (1 << ld) for efficient 2^ld calculation
- Recursive calls only for non-perfect subtrees
- Base case handling for null nodes

🎯 COMPLETE BINARY TREE PROPERTIES:
- All levels filled except possibly the last
- Last level nodes are as far left as possible
- Height difference between left and right paths ≤ 1
- Perfect subtrees can be identified by depth comparison

🎯 PERFECT BINARY TREE FORMULA:
- All levels completely filled
- Node count = 2^0 + 2^1 + ... + 2^(d-1) = 2^d - 1
- Can be calculated instantly without traversal
- Key optimization for the algorithm

🎯 OPTIMIZATION TECHNIQUES:
- Depth-based perfect tree detection
- Mathematical formula for instant counting
- Selective recursion for non-perfect subtrees
- Bit operations for efficient power calculation

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: Visit every node, O(n) time complexity
- Optimized: Use structure properties, O(log²n) time
- Space: Both use O(log n) for recursion stack
- Performance: Significant improvement for large trees

🎯 REAL-WORLD APPLICATIONS:
- Tree structure analysis
- Memory usage calculation
- Database index optimization
- Complete tree validation
- Performance optimization

🎯 ALGORITHM PATTERN:
- Divide and conquer with optimization
- Structure property exploitation
- Mathematical formula application
- Selective recursion

🎯 MATHEMATICAL PROPERTIES:
- Complete tree height: ⌊log₂(n)⌋ + 1
- Perfect tree nodes: 2^depth - 1
- Depth calculation: O(log n)
- Power calculation: O(1) with bit shifting

🎯 ERROR HANDLING:
- Null root: Return 0
- Invalid structure: Algorithm still works
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF OPTIMIZED APPROACH:
- Logarithmic time complexity: O(log²n)
- Efficient space usage: O(log n)
- Leverages tree structure properties
- Mathematical optimization opportunities
- Significant performance improvement

🎯 DISADVANTAGES:
- More complex logic than naive approach
- Requires understanding of complete tree properties
- Additional depth calculations needed
- Less intuitive for some developers

🎯 ALTERNATIVE APPROACHES:
- Naive recursion: O(n) time, simple logic
- Iterative level-order: O(n) time, O(n) space
- Binary search based: Complex implementation
- All: Correct node counting

🎯 IMPLEMENTATION CONSIDERATIONS:
- Bit shifting vs Math.pow for efficiency
- Recursion depth monitoring
- Complete tree property validation
- Edge case handling
- Performance optimization

🎯 TESTING STRATEGY:
- Perfect binary trees
- Complete but not perfect trees
- Single node trees
- Empty trees
- Various tree sizes and structures

🎯 DEBUGGING TIPS:
- Verify depth calculations
- Check perfect tree detection logic
- Monitor recursive call patterns
- Validate formula applications
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(log²n) - optimal for complete trees
- Space: O(log n) - optimal for recursive approach
- Overall: Significant improvement over O(n)
- Scalable: Works efficiently for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Logarithmic performance benefit
- Deep trees: Recursion stack management
- Memory usage: Efficient space utilization
- Optimization: Structure property exploitation

🎯 BEST PRACTICES:
- Use bit operations for power calculations
- Validate complete tree assumptions
- Handle edge cases properly
- Optimize recursive calls
- Test with various tree structures

🎯 COMMON MISTAKES:
- Incorrect depth calculation
- Missing perfect tree optimization
- Poor edge case handling
- Inefficient power computation
- Unnecessary recursive calls

🎯 LEARNING OBJECTIVES:
- Understand complete binary tree properties
- Learn structure-based optimizations
- Master divide and conquer with shortcuts
- Practice mathematical formula applications
- Improve algorithmic thinking

🎯 INTERVIEW TIPS:
- Explain complete vs perfect tree differences
- Discuss optimization opportunities
- Handle edge cases systematically
- Write clean recursive code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Structure property exploitation
- Mathematical formula optimization
- Selective recursion patterns
- Logarithmic complexity achievement
- Complete tree analysis

🎯 MATHEMATICAL ANALYSIS:
- Depth calculations: 2×log n per call
- Recursive calls: At most log n calls
- Formula applications: O(1) each
- Bit operations: O(1) for power calculation
- Total: O(log²n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Correct depth calculation logic
- Perfect tree detection accuracy
- Efficient recursion structure
- Proper formula application
- Edge case comprehensive handling

🎯 SOLUTION VALIDATION:
- Test perfect tree scenarios
- Verify complete tree counting
- Check edge case handling
- Monitor performance improvements
- Validate correctness thoroughly

🎯 ALGORITHM EVOLUTION:
- Naive approach: Simple O(n) traversal
- Optimized approach: Structure-aware O(log²n)
- Alternative approaches: Various optimization techniques
- Future improvements: Further optimization possibilities

🎯 PRACTICAL APPLICATIONS:
- Tree structure analysis tools
- Memory management systems
- Database optimization
- Algorithm performance improvement
- Data structure validation

🎯 CONCLUSION:
The count nodes in complete binary tree problem demonstrates how to
leverage tree structure properties for optimization, achieving O(log²n)
time complexity by identifying perfect subtrees and applying mathematical
formulas while using selective recursion for non-perfect portions!
*/
