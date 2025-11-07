/* Problem: ✅✅✅✅ Maximum Sum of Non-Adjacent Nodes ✅✅✅✅

Given a binary tree, find the maximum sum of nodes such that 
no two selected nodes are directly connected (parent-child relationship). 
In other words, if you include a node, you cannot include its immediate children (but you can include its grandchildren).

Non-adjacent constraint:
- If a node is included, its direct children cannot be included
- Grandchildren can be included (they're not adjacent to grandparent)
- Goal: Select nodes to maximize sum without selecting adjacent nodes
- Similar to "House Robber on Tree" problem

You are given the root of a binary tree. Return the maximum sum of non-adjacent nodes.

Example 1:
Input:
      10
     /  \
    1    1

Output: 10
Explanation:
Option 1: Include 10 (exclude children 1, 1) → sum = 10
Option 2: Exclude 10 (include children 1, 1) → sum = 1 + 1 = 2
Maximum: 10

Example 2:
Input:
      1
     / \
    2   3

Output: 5
Explanation:
Option 1: Include 1 (exclude 2, 3) → sum = 1
Option 2: Exclude 1 (include 2, 3) → sum = 2 + 3 = 5
Maximum: 5

Example 3:
Input:
       1
      / \
     2   3
    / \   \
   1   4   5

Output: 11
Explanation:
Option 1: Include 1, exclude 2,3, include grandchildren 1,4,5 → sum = 1 + 1 + 4 + 5 = 11
Option 2: Exclude 1, include 2,3, exclude their children → sum = 2 + 3 = 5
Option 3: Exclude 1, exclude 2, include 1,4, include 3, exclude 5 → sum = 1 + 4 + 3 = 8
Maximum: 11

Constraints:
- 1 ≤ number of nodes ≤ 10^4
- 1 ≤ node.data ≤ 10^5

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(n) - recursion stack + return arrays
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n)
// ✅ SC = O(n)
function getMaxSum(root) {
    // helper returns [include, exclude]
    function helper(node) {
      if (!node) return [0, 0];
  
      let [leftInclude, leftExclude] = helper(node.left); // [value if left node is included, value if left node is excluded]
      let [rightInclude, rightExclude] = helper(node.right); // [value if right node is included, value if right node is excluded]
  
      // If we include this node, then we can't include its direct left and right children
      let include = node.data + leftExclude + rightExclude;
  
      // If we exclude this node , we can include(or exclude. we include if it increases the max sum, otherwise we exclude) its direct left and right children
      let exclude = Math.max(leftInclude, leftExclude) + Math.max(rightInclude, rightExclude); 
  
      return [include, exclude]; // [value if curr node is included, value if curr node is excluded]
    }
  
    let [includeRoot, excludeRoot] = helper(root); // [value if root node is included, value if root node is excluded]
    return Math.max(includeRoot, excludeRoot); // return the max of the two
  }

// Test cases
let root1 = new TreeNode(10);
root1.left = new TreeNode(1);
root1.right = new TreeNode(1);
console.log("Test 1:", getMaxSum(root1)); // 10 (include root, exclude children)

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
root2.left.left = new TreeNode(1);
root2.left.right = new TreeNode(4);
root2.right.right = new TreeNode(5);
console.log("Test 2:", getMaxSum(root2)); // 11 (include 1, exclude 2,3, include 1,4,5)

let root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.right = new TreeNode(3);
console.log("Test 3:", getMaxSum(root3)); // 5 (exclude root, include 2 and 3)

/*🎯 CORE IDEA: Use dynamic programming on tree with post-order DFS. 
For each node, compute TWO values: 
(1) Maximum sum if current node is INCLUDED (add node value + exclude children)
(2) Maximum sum if current node is EXCLUDED (take max of include/exclude for each child)
Return both values as [include, exclude] array. Final answer is max of including or excluding root.

📋 STEP-BY-STEP FLOW:

1️⃣ HELPER FUNCTION RETURNS [INCLUDE, EXCLUDE]:
   - Include: max sum if current node is selected
   - Exclude: max sum if current node is not selected
   - Both values computed at each node
   - Enables parent to make optimal choice

2️⃣ BASE CASE:
   - Null node returns [0, 0]
   - No contribution to sum
   - Neutral for both include and exclude cases

3️⃣ INCLUDE CURRENT NODE:
   - Add node value
   - MUST exclude direct children
   - Use children's exclude values
   - include = node + leftExclude + rightExclude

4️⃣ EXCLUDE CURRENT NODE:
   - Don't add node value
   - CAN include or exclude children (choose max)
   - Use max of children's include/exclude
   - exclude = max(leftInclude, leftExclude) + max(rightInclude, rightExclude)

5️⃣ FINAL ANSWER:
   - Get [includeRoot, excludeRoot] from root
   - Return max of the two
   - Root can be included or excluded

🧠 WHY THIS APPROACH?
- DP on tree structure
- Post-order ensures children computed first
- Two states per node capture all possibilities
- Optimal substructure property
- O(n) time with single traversal

💡 KEY INSIGHTS:
- Include node → must exclude children
- Exclude node → can include OR exclude children (take max)
- Return array [include, exclude] for parent's calculation
- Final answer: max(includeRoot, excludeRoot)
- Similar to House Robber but on tree
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Maximum Non-Adjacent Sum

INPUT:
      10
     /  \
    1    1

OUTPUT: 10
EXPLANATION: Include root (10), exclude children. Sum = 10.

🎯 GOAL: Find maximum sum without selecting adjacent nodes!

🔍 STEP-BY-STEP PROCESS:

POST-ORDER TRAVERSAL:

CALL 1: helper(1) [left child]
leftSum = helper(null) = [0, 0]
[leftInclude, leftExclude] = [0, 0]

rightSum = helper(null) = [0, 0]
[rightInclude, rightExclude] = [0, 0]

include = 1 + leftExclude + rightExclude = 1 + 0 + 0 = 1
exclude = max(0, 0) + max(0, 0) = 0 + 0 = 0

return [1, 0]
Meaning: 
- If we include this node: max sum = 1
- If we exclude this node: max sum = 0

CALL 2: helper(1) [right child]
Same as left child
return [1, 0]

CALL 3: helper(10) [root]
leftSum = helper(1) = [1, 0]
[leftInclude, leftExclude] = [1, 0]

rightSum = helper(1) = [1, 0]
[rightInclude, rightExclude] = [1, 0]

include = 10 + leftExclude + rightExclude
include = 10 + 0 + 0 = 10 ✓
(Include root, must exclude children)

exclude = max(leftInclude, leftExclude) + max(rightInclude, rightExclude)
exclude = max(1, 0) + max(1, 0)
exclude = 1 + 1 = 2
(Exclude root, include both children)

return [10, 2]

─────────────────────────────────────────

FINAL CALCULATION:
[includeRoot, excludeRoot] = [10, 2]
return max(10, 2) = 10

🏆 FINAL RESULT: 10
Optimal: Include root (10), exclude children (1, 1)

─────────────────────────────────────────

📊 EXAMPLE 2: Exclude Root Better

INPUT:
      1
     / \
    2   3

OUTPUT: 5

PROCESS:

helper(2):
  leftSum = [0, 0], rightSum = [0, 0]
  include = 2 + 0 + 0 = 2
  exclude = 0 + 0 = 0
  return [2, 0]

helper(3):
  leftSum = [0, 0], rightSum = [0, 0]
  include = 3 + 0 + 0 = 3
  exclude = 0 + 0 = 0
  return [3, 0]

helper(1):
  leftSum = [2, 0], rightSum = [3, 0]
  include = 1 + 0 + 0 = 1 (exclude children)
  exclude = max(2, 0) + max(3, 0) = 2 + 3 = 5 (include children)
  return [1, 5]

Result: max(1, 5) = 5

🏆 RESULT: 5 (exclude root, include 2 and 3)

─────────────────────────────────────────

📊 EXAMPLE 3: Complex Tree

INPUT:
       1
      / \
     2   3
    / \   \
   1   4   5

OUTPUT: 11

PROCESS (Post-order):

helper(1) [leaf under 2]:
  return [1, 0]

helper(4):
  return [4, 0]

helper(2):
  leftSum = [1, 0], rightSum = [4, 0]
  include = 2 + 0 + 0 = 2
  exclude = max(1, 0) + max(4, 0) = 1 + 4 = 5
  return [2, 5]

helper(5):
  return [5, 0]

helper(3):
  leftSum = [0, 0], rightSum = [5, 0]
  include = 3 + 0 + 0 = 3
  exclude = 0 + max(5, 0) = 5
  return [3, 5]

helper(1) [root]:
  leftSum = [2, 5], rightSum = [3, 5]
  include = 1 + 5 + 5 = 11 ✓ (exclude 2,3, take their exclude values)
  exclude = max(2, 5) + max(3, 5) = 5 + 5 = 10 (best from each subtree)
  return [11, 10]

Result: max(11, 10) = 11

🏆 RESULT: 11
Optimal: Include root 1, exclude 2,3, which allows including grandchildren 1,4,5
Path: 1 + 1 + 4 + 5 = 11

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

STATE ARRAY MEANING:
[include, exclude]
- include: max sum if THIS node is selected
- exclude: max sum if THIS node is NOT selected

EXAMPLE TREE WITH STATES:
       1 [11, 10]
      / \
     2   3 [3, 5]
[2,5]/ \   \
   1   4   5 [5, 0]
[1,0] [4,0]

Bottom-up calculation:
Leaves: [value, 0]
Internal nodes: Calculated from children
Root: Final decision

─────────────────────────────────────────

📊 INCLUDE VS EXCLUDE LOGIC:

AT NODE 10:
     10
    /  \
   1    1
[1,0] [1,0]

INCLUDE 10:
  Can't include children
  Use children's EXCLUDE values
  include = 10 + 0 + 0 = 10

EXCLUDE 10:
  Can include OR exclude children
  Use MAX of children's include/exclude
  exclude = max(1,0) + max(1,0) = 2

Return [10, 2]
Final: max(10, 2) = 10

─────────────────────────────────────────

📊 WHY [INCLUDE, EXCLUDE] PATTERN:

Each node has TWO choices:
1. Include in sum (can't include children)
2. Exclude from sum (children can be included or excluded)

Parent needs BOTH options to make its decision:
- If parent includes itself: uses child's exclude
- If parent excludes itself: uses max(child's include, exclude)

Returning both enables optimal parent calculation!

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DYNAMIC PROGRAMMING ON TREE:
   - Each node has two states
   - State depends on children's states
   - Optimal substructure property
   - Bottom-up computation

2️⃣ POST-ORDER TRAVERSAL:
   - Children processed before parent
   - Parent uses children's results
   - Natural DP on tree
   - Ensures dependencies met

3️⃣ INCLUDE LOGIC:
   - Add node value
   - Must use children's exclude values
   - No choice for children (must exclude)
   - Deterministic calculation

4️⃣ EXCLUDE LOGIC:
   - Don't add node value
   - Can use children's include OR exclude
   - Take maximum for each child
   - Optimal choice

5️⃣ FINAL DECISION:
   - Root can be included or excluded
   - Take maximum of both options
   - Global optimum

💡 KEY INSIGHT:
Using DP on tree with [include, exclude] states at each node, where including a
node requires excluding children (use their exclude values) and excluding a node
allows optimal choice for children (use max of their include/exclude), with final
answer being max of root's two states!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once
- Post-order DFS traversal
- Each node: O(1) computation
- Total nodes: n
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h)
- Return arrays [include, exclude]: O(1) per call
- Total stack frames: O(h)
- Space: O(h) or O(n) for skewed tree
- More accurately: O(n) considering return arrays

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 119: if (!node) return [0, 0]
Result: [0, 0], max(0, 0) = 0
Output: 0

CASE 2: Single Node
Input: TreeNode(10)
include = 10 + 0 + 0 = 10
exclude = 0 + 0 = 0
return [10, 0]
Output: max(10, 0) = 10

CASE 3: Two Nodes (Include Root Better)
Input:
  10
  /
 1

helper(1): return [1, 0]
helper(10):
  include = 10 + 0 = 10
  exclude = max(1, 0) = 1
  return [10, 1]
Output: max(10, 1) = 10

CASE 4: Two Nodes (Include Child Better)
Input:
  1
  /
 10

helper(10): return [10, 0]
helper(1):
  include = 1 + 0 = 1
  exclude = max(10, 0) = 10
  return [1, 10]
Output: max(1, 10) = 10

🎯 ALGORITHM CORRECTNESS:
- Considers all valid selections: ✓
- No adjacent nodes selected: ✓
- Optimal at each subproblem: ✓
- Global optimum achieved: ✓
- Handles all tree structures: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 119: Base case returns [0, 0]
- Line 121-122: Get states from children
- Line 125: Calculate include state
- Line 128: Calculate exclude state
- Line 130: Return both states
- Line 133: Get root states
- Line 134: Return maximum

🎯 WHY EXCLUDE USES MAX:
- Excluding node gives flexibility
- Can include child (better sum)
- Can exclude child (if negative or children better)
- Take maximum for optimal choice
- Example: max(childInclude, childExclude)

🎯 STATE TRANSITIONS:
INCLUDE current node:
  - children MUST be excluded
  - include = node + leftExclude + rightExclude

EXCLUDE current node:
  - children CAN be included or excluded
  - exclude = max(leftInclude, leftExclude) + max(rightInclude, rightExclude)

🎯 ADVANTAGES:
- Optimal O(n) time
- DP ensures optimal solution
- Clean recursive structure
- Handles all cases correctly
- No greedy assumptions

🎯 DISADVANTAGES:
- Needs understanding of DP
- Two-state tracking per node
- Return array slightly complex
- O(n) space for recursion

🎯 REAL-WORLD APPLICATIONS:
- Maximum independent set in trees
- Resource selection with constraints
- Non-conflicting task scheduling
- Organizational decision making
- Optimization with adjacency constraints

🎯 RELATED PROBLEMS:
- House Robber (array version)
- House Robber II (circular)
- House Robber III (tree version)
- Maximum independent set
- Vertex cover problems

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Include root better
- Exclude root better
- Balanced tree
- Skewed tree
- Large values at leaves

🎯 DEBUGGING TIPS:
- Print [include, exclude] at each node
- Trace bottom-up calculation
- Verify state transitions
- Check base cases
- Visualize choices

🎯 COMMON MISTAKES:
- Wrong include calculation (using include instead of exclude)
- Wrong exclude calculation (not taking max)
- Not returning both states
- Wrong base case
- Not taking max at final answer

🎯 BEST PRACTICES:
- Return [include, exclude] clearly
- Handle null base case
- Use descriptive names
- Test with various trees
- Verify non-adjacency constraint

🎯 INTERVIEW TIPS:
- Explain DP on tree concept
- Discuss two states clearly
- Show state transitions
- Walk through example
- Analyze complexity
- Relate to House Robber problem

🎯 DP ON TREE PATTERN:
- Define states per node
- Compute states from children
- Return states to parent
- Final answer from root states
- Standard tree DP approach

🎯 STATE DEPENDENCY:
include(node) depends on: exclude(children)
exclude(node) depends on: max(include(children), exclude(children))

These dependencies ensure no adjacent nodes selected!

🎯 COMPARISON WITH HOUSE ROBBER:
HOUSE ROBBER (Array):
- Linear DP
- States: include[i], exclude[i]
- Transitions similar

TREE VERSION:
- Tree DP
- States: [include, exclude] per node
- Children replace array neighbors
- Same core idea

🎯 CONCLUSION:
Finding maximum sum of non-adjacent nodes is efficiently achieved using DP on
tree with post-order DFS, computing two states per node [include, exclude], where
including a node requires excluding children and excluding a node allows optimal
choice for children, achieving O(n) time and O(n) space complexity!
*/
  