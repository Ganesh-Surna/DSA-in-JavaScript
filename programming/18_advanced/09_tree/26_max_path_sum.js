/* Problem: ✅✅✅✅ Maximum Path Sum in Binary Tree ✅✅✅✅

Given a binary tree, find the maximum path sum. 
A path is defined as any sequence of nodes from some starting node to any node 
in the tree along the parent-child connections. 
The path must contain at least one node and does not need to go through the root.

Path sum definition:
- Sum of all node values in the path
- Path can start and end at any nodes
- Path follows parent-child connections (no jumping)
- Can include negative values (ignore negative subtrees by taking max with 0)
- Must contain at least one node

You are given the root of a binary tree. Return the maximum path sum of any non-empty path.

Example 1:
Input:
    1
   / \
  2   3

Output: 6
Explanation: Optimal path is 2 → 1 → 3 with sum 2+1+3 = 6

Example 2:
Input:
     -10
     /  \
    9   20
       /  \
      15   7

Output: 42
Explanation: Optimal path is 15 → 20 → 7 with sum 15+20+7 = 42

Example 3:
Input:
    1
   / \
  2   3
 /
4

Output: 10
Explanation: Optimal path is 4 → 2 → 1 → 3 with sum 4+2+1+3 = 10

Example 4:
Input:
     2
    / \
  -1   3

Output: 5
Explanation: Optimal path is 2 → 3 with sum 2+3 = 5 (ignore negative left subtree)

Example 5:
Input:
    -3

Output: -3
Explanation: Single node with negative value, must include at least one node

Constraints:
- 1 ≤ number of nodes ≤ 3 × 10^4
- -1000 ≤ node.data ≤ 1000

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(h) - recursion stack depth
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n)
// ✅ SC = O(h)
function findMaxPathSum(root) {
    if(!root) return 0
    
    let maxSum = -Infinity
    helper(root)
    return maxSum
    
    function helper(root){
        if(!root) return 0
        
        // 1. Compute maximum gain from left and right subtrees
        let leftGain = Math.max(helper(root.left), 0) // Ignore if it is -ve
        let rightGain = Math.max(helper(root.right), 0)
        
        // 2. Possible max path including both left & right through current node
        let currMax = root.data + leftGain + rightGain
        
        // 3. Update global max path sum
        maxSum = Math.max(maxSum, currMax)
        
        // 4. Return max path that can be extended to parent
        return root.data + Math.max(leftGain, rightGain)
    }
}

// Test cases
let root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
console.log("Test 1:", findMaxPathSum(root1)); // 6 (path: 2→1→3)

let root2 = new TreeNode(-10);
root2.left = new TreeNode(9);
root2.right = new TreeNode(20);
root2.right.left = new TreeNode(15);
root2.right.right = new TreeNode(7);
console.log("Test 2:", findMaxPathSum(root2)); // 42 (path: 15→20→7)

let root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);
root3.left.left = new TreeNode(4);
console.log("Test 3:", findMaxPathSum(root3)); // 10 (path: 4→2→1→3)

let root4 = new TreeNode(2);
root4.left = new TreeNode(-1);
root4.right = new TreeNode(3);
console.log("Test 4:", findMaxPathSum(root4)); // 5 (path: 2→3, ignore negative)

let root5 = new TreeNode(-3);
console.log("Test 5:", findMaxPathSum(root5)); // -3 (single negative node)

/*🎯 CORE IDEA: Use post-order DFS traversal to calculate maximum path sum. 
For each node, calculate the maximum gain from left and right subtrees (ignoring negative gains). 
Update global maxSum with the path through current node (node + leftGain + rightGain). 
Return to parent the maximum extendable path (node + max(leftGain, rightGain)).

📋 STEP-BY-STEP FLOW:

1️⃣ GLOBAL MAX TRACKING:
   - Initialize maxSum = -Infinity
   - Track maximum path sum found so far
   - Updated at each node
   - Returned at the end

2️⃣ HELPER FUNCTION (POST-ORDER):
   - Base case: null node returns 0
   - Recursively get left subtree gain
   - Recursively get right subtree gain
   - Ignore negative gains (max with 0)

3️⃣ PATH SUM CALCULATION:
   - At each node: currMax = node + leftGain + rightGain
   - This represents path through current node
   - Update maxSum if currMax is greater
   - This path includes both subtrees (cannot extend to parent)

4️⃣ RETURN VALUE:
   - Return node + max(leftGain, rightGain)
   - This is max path that can extend to parent
   - Parent can only use ONE subtree (left OR right)
   - Cannot use both (would create invalid path)

🧠 WHY THIS APPROACH?
- Post-order ensures children processed first
- Negative gains ignored (max with 0)
- Global max tracks best path found
- Return value enables parent calculation
- O(n) time - each node visited once

💡 KEY INSIGHTS:
- Path through node: node + left + right (cannot extend)
- Path to parent: node + max(left, right) (can extend)
- Ignore negative gains: max(gain, 0)
- Global variable tracks overall maximum
- Each node considers both local max and extendable max
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Simple Tree

INPUT:
    1
   / \
  2   3

OUTPUT: 6
EXPLANATION: Path 2 → 1 → 3 gives maximum sum of 6.

🎯 GOAL: Find the path with maximum sum in the tree!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
maxSum = -Infinity
Call helper(root=1)

─────────────────────────────────────────

CALL 1: helper(1)
if (!root) → FALSE, continue

Step 1: Compute left gain
leftGain = Math.max(helper(1.left), 0)
leftGain = Math.max(helper(2), 0)

CALL 2: helper(2)
if (!root) → FALSE, continue

Step 1: Compute left gain for node 2
leftGain = Math.max(helper(2.left), 0)
leftGain = Math.max(helper(null), 0)

CALL 3: helper(null)
return 0

BACK TO CALL 2:
leftGain = Math.max(0, 0) = 0

Step 2: Compute right gain for node 2
rightGain = Math.max(helper(2.right), 0)
rightGain = Math.max(helper(null), 0)

CALL 4: helper(null)
return 0

BACK TO CALL 2:
rightGain = Math.max(0, 0) = 0

Step 3: Calculate current max path through node 2
currMax = 2 + leftGain + rightGain
currMax = 2 + 0 + 0 = 2

Step 4: Update global maxSum
maxSum = Math.max(-Infinity, 2) = 2

Step 5: Return max extendable path to parent
return 2 + Math.max(0, 0) = 2 + 0 = 2

BACK TO CALL 1:
leftGain = Math.max(2, 0) = 2

─────────────────────────────────────────

Step 2: Compute right gain for node 1
rightGain = Math.max(helper(1.right), 0)
rightGain = Math.max(helper(3), 0)

CALL 5: helper(3)
if (!root) → FALSE, continue

Step 1: Compute left gain
leftGain = Math.max(helper(null), 0) = 0

Step 2: Compute right gain
rightGain = Math.max(helper(null), 0) = 0

Step 3: Calculate current max
currMax = 3 + 0 + 0 = 3

Step 4: Update global maxSum
maxSum = Math.max(2, 3) = 3

Step 5: Return to parent
return 3 + Math.max(0, 0) = 3

BACK TO CALL 1:
rightGain = Math.max(3, 0) = 3

─────────────────────────────────────────

Step 3: Calculate current max path through node 1
currMax = 1 + leftGain + rightGain
currMax = 1 + 2 + 3 = 6

Step 4: Update global maxSum
maxSum = Math.max(3, 6) = 6 ✓

Step 5: Return (not used as root's parent doesn't exist)
return 1 + Math.max(2, 3) = 1 + 3 = 4

─────────────────────────────────────────

Return maxSum = 6

🏆 FINAL RESULT: 6
Maximum path: 2 → 1 → 3 (sum = 2+1+3 = 6)

─────────────────────────────────────────

📊 EXAMPLE 2: Tree with Negative Root

INPUT:
     -10
     /  \
    9   20
       /  \
      15   7

OUTPUT: 42

🔍 STEP-BY-STEP PROCESS:

Process leaves first (post-order):

helper(9):
  leftGain = 0, rightGain = 0
  currMax = 9 + 0 + 0 = 9
  maxSum = 9
  return 9

helper(15):
  leftGain = 0, rightGain = 0
  currMax = 15 + 0 + 0 = 15
  maxSum = Math.max(9, 15) = 15
  return 15

helper(7):
  leftGain = 0, rightGain = 0
  currMax = 7 + 0 + 0 = 7
  maxSum = Math.max(15, 7) = 15
  return 7

helper(20):
  leftGain = Math.max(15, 0) = 15
  rightGain = Math.max(7, 0) = 7
  currMax = 20 + 15 + 7 = 42 ✓
  maxSum = Math.max(15, 42) = 42
  return 20 + Math.max(15, 7) = 20 + 15 = 35

helper(-10):
  leftGain = Math.max(9, 0) = 9
  rightGain = Math.max(35, 0) = 35
  currMax = -10 + 9 + 35 = 34
  maxSum = Math.max(42, 34) = 42
  return -10 + Math.max(9, 35) = -10 + 35 = 25

Return maxSum = 42

🏆 FINAL RESULT: 42
Maximum path: 15 → 20 → 7 (sum = 15+20+7 = 42)

Note: Root (-10) is not included in max path!

─────────────────────────────────────────

📊 EXAMPLE 3: Ignoring Negative Subtree

INPUT:
     2
    / \
  -1   3

OUTPUT: 5

PROCESS:

helper(-1):
  currMax = -1
  maxSum = -1
  return -1

helper(3):
  currMax = 3
  maxSum = Math.max(-1, 3) = 3
  return 3

helper(2):
  leftGain = Math.max(-1, 0) = 0 (ignore negative!)
  rightGain = Math.max(3, 0) = 3
  currMax = 2 + 0 + 3 = 5 ✓
  maxSum = Math.max(3, 5) = 5
  return 2 + max(0, 3) = 5

Return maxSum = 5

🏆 RESULT: 5 (path: 2 → 3, left subtree ignored)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TWO TYPES OF PATHS AT EACH NODE:

1. PATH THROUGH NODE (uses both subtrees):
   - Cannot extend to parent
   - Represents: leftGain + node + rightGain
   - Used to update maxSum
   - Example at node 1:
        1
       / \
      2   3
   Path: 2 → 1 → 3 (sum = 6)

2. PATH TO PARENT (uses one subtree):
   - Can extend to parent
   - Represents: node + max(leftGain, rightGain)
   - Returned to parent for its calculation
   - Example at node 1:
        1
       / \
      2   3
   Return: 1 + 3 = 4 (choosing right, larger gain)

─────────────────────────────────────────

📊 WHY IGNORE NEGATIVE GAINS:

Example:
     5
    / \
  -3   2

At node 5:
leftGain = max(-3, 0) = 0 (ignore negative!)
rightGain = max(2, 0) = 2

currMax = 5 + 0 + 2 = 7
(Path: 5 → 2, excluding negative left)

If we didn't ignore negative:
currMax = 5 + (-3) + 2 = 4 (worse!)

Ignoring negative improves path sum!

─────────────────────────────────────────

📊 MAXSUM UPDATE PATTERN:

maxSum tracks the best path found so far.
At each node, we check if path through current node is better.

Example traversal order (post-order):
Node 2: maxSum = 2
Node 3: maxSum = max(2, 3) = 3
Node 1: currMax = 6, maxSum = max(3, 6) = 6 ✓

Final: maxSum = 6

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ POST-ORDER TRAVERSAL:
   - Process children before parent
   - Parent needs children's results
   - Bottom-up calculation
   - Natural recursion pattern

2️⃣ TWO TYPES OF PATHS:
   - Through node: left + node + right (for maxSum)
   - To parent: node + max(left, right) (for return)
   - Different purposes, both needed
   - Through node cannot extend upward

3️⃣ NEGATIVE HANDLING:
   - max(gain, 0) ignores negative subtrees
   - Improves overall path sum
   - Optional inclusion of negative paths
   - Critical for optimal solution

4️⃣ GLOBAL MAXIMUM:
   - maxSum tracks best across all nodes
   - Updated at each node
   - Ensures no path missed
   - Final answer

5️⃣ RETURN VALUE MEANING:
   - Maximum sum extending UP to parent
   - Parent can only use ONE child path
   - Enables proper parent calculation
   - Key to algorithm correctness

💡 KEY INSIGHT:
At each node, we compute TWO things: (1) max path THROUGH node using both
subtrees (cannot extend to parent, used to update global max), and (2) max path
TO parent using one subtree (can extend upward, returned to parent), with
negative gains ignored to optimize the path sum!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once
- Post-order DFS traversal
- Each node: O(1) computation
- Total nodes: n
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h)
- No additional data structures
- Worst case: O(n) for skewed tree
- Best case: O(log n) for balanced tree
- Space: O(h)

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 92: if (!root) return 0
Output: 0

CASE 2: Single Node (Positive)
Input: TreeNode(5)
leftGain = 0, rightGain = 0
currMax = 5
maxSum = 5
Output: 5

CASE 3: Single Node (Negative)
Input: TreeNode(-3)
leftGain = 0, rightGain = 0
currMax = -3
maxSum = -3
Output: -3

CASE 4: All Negative Values
Input:
    -2
   /  \
 -3   -1

leftGain = max(-3, 0) = 0
rightGain = max(-1, 0) = 0
currMax = -2 + 0 + 0 = -2
But node -1 has currMax = -1
maxSum = -1 (best among all negative nodes)

CASE 5: Mixed Values
Input:
     5
    / \
  -3   2

leftGain = 0 (ignore negative)
rightGain = 2
currMax = 5 + 0 + 2 = 7
Output: 7

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Considers all possible paths: ✓
- Handles negative values: ✓
- Updates global maximum: ✓
- Returns correct result: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 93: maxSum initialized to -Infinity
- Line 94: Call helper on root
- Line 95: Return final maxSum
- Line 98: Base case for null
- Line 101-102: Compute gains (ignore negatives)
- Line 105: Calculate path through node
- Line 108: Update global max
- Line 111: Return extendable path

🎯 WHY MAX WITH 0 FOR GAINS:
- Line 101-102: Math.max(helper(...), 0)
- Ignores negative contributions
- Example: If left subtree sum is -5, use 0 instead
- Improves overall path sum
- Optional inclusion strategy

🎯 TWO DIFFERENT CALCULATIONS:
1. currMax = node + leftGain + rightGain
   - Path THROUGH current node
   - Uses BOTH subtrees
   - Cannot extend to parent (dead end)
   - Used to update maxSum

2. return node + max(leftGain, rightGain)
   - Path TO parent
   - Uses ONE subtree
   - Can extend upward
   - Used by parent's calculation

🎯 WHY SEPARATE CALCULATIONS:
Example at node 1:
    1
   / \
  2   3

Through node 1: 2 + 1 + 3 = 6 (uses both)
To parent: 1 + max(2, 3) = 4 (uses one)

If parent existed:
   parent
      |
      1
     / \
    2   3

Parent can only use ONE path from 1:
- Either parent → 1 → 2 (gain from 1 is 3)
- Or parent → 1 → 3 (gain from 1 is 4)
- NOT parent → 1 → 2 AND 3 (would need branching)

🎯 ADVANTAGES:
- Optimal O(n) time
- Handles negative values elegantly
- Single traversal
- Clean recursive solution
- Global max tracking

🎯 DISADVANTAGES:
- Uses global variable (maxSum)
- Recursion stack O(h)
- Needs careful understanding of two calculations
- Stack overflow for very deep trees

🎯 REAL-WORLD APPLICATIONS:
- Finding optimal routes in networks
- Maximum profit paths
- Resource optimization in hierarchies
- Game tree evaluation
- Decision tree analysis

🎯 RELATED PROBLEMS:
- Diameter of binary tree (similar pattern)
- Binary tree maximum path
- Longest path in tree
- Tree DP problems
- Path sum variations

🎯 TESTING STRATEGY:
- Empty tree
- Single node (positive/negative)
- All positive values
- All negative values
- Mixed values
- Deep trees
- Wide trees

🎯 DEBUGGING TIPS:
- Trace maxSum updates
- Print gains at each node
- Verify return values
- Check negative handling
- Visualize path construction

🎯 COMMON MISTAKES:
- Not initializing maxSum to -Infinity
- Forgetting max with 0 for gains
- Confusing through-node vs to-parent calculations
- Not handling negative values
- Using local instead of global max

🎯 BEST PRACTICES:
- Initialize maxSum to -Infinity (handles all negatives)
- Always max gains with 0
- Clear variable naming
- Understand two calculation types
- Test with negative values

🎯 INTERVIEW TIPS:
- Explain two types of paths clearly
- Show post-order traversal
- Discuss negative handling
- Walk through example
- Analyze complexity
- Handle edge cases

🎯 WHY -INFINITY INITIALIZATION:
- Handles all-negative tree correctly
- Example: Tree with only -5
  - maxSum = -Infinity
  - currMax = -5
  - maxSum = max(-Infinity, -5) = -5 ✓
- If initialized to 0: would return 0 (wrong!)

🎯 ALGORITHM PATTERN:
- Tree DP problem
- Post-order traversal
- Global maximum tracking
- Return value for parent
- Negative value handling

🎯 CONCLUSION:
Finding maximum path sum in a binary tree is efficiently achieved using post-order
DFS traversal that computes two values at each node: path through node (left + node + right)
to update global maximum, and path to parent (node + max(left, right)) to enable
parent calculations, with negative gains ignored via max(gain, 0), achieving O(n)
time and O(h) space complexity!
*/