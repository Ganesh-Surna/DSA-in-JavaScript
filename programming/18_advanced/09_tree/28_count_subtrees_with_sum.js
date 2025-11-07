/* Problem: ✅✅✅✅ Count Subtrees with Given Sum X ✅✅✅✅

Given a binary tree and an integer X, count the number of subtrees whose sum of all nodes equals X. A subtree is defined as a node and all of its descendants.

Subtree sum definition:
- Sum of all nodes in the subtree
- Subtree includes the node and all its descendants
- Every node is root of a subtree (including leaves)
- Single node subtree has sum equal to node's value

You are given the root of a binary tree and an integer X. Return the count of subtrees whose sum equals X.

Example 1:
Input: 
      5
     / \
    2   7
   / \
  1   4

X = 7

Output: 2
Explanation: 
Subtree at node 2: sum = 2 + 1 + 4 = 7 ✓
Subtree at node 7: sum = 7 ✓
Subtree at node 1: sum = 1 ✗
Subtree at node 4: sum = 4 ✗
Subtree at node 5 (root): sum = 5 + 2 + 7 + 1 + 4 = 19 ✗
Count: 2

Example 2:
Input:
      3
     / \
    0   0

X = 3

Output: 1
Explanation:
Subtree at node 0 (left): sum = 0 ✗
Subtree at node 0 (right): sum = 0 ✗
Subtree at node 3 (root): sum = 3 + 0 + 0 = 3 ✓
Count: 1

Example 3:
Input:
      3
     / \
    1   2

X = 1

Output: 1
Explanation:
Subtree at node 1: sum = 1 ✓
Subtree at node 2: sum = 2 ✗
Subtree at node 3 (root): sum = 3 + 1 + 2 = 6 ✗
Count: 1

Constraints:
- 1 ≤ number of nodes ≤ 10^5
- -10^5 ≤ node.data ≤ 10^5
- -10^9 ≤ X ≤ 10^9

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
function countSubtreesWithSumX(root, x) {
    let count = 0;
    findSubtreesSums(root);
    return count;
  
    function findSubtreesSums(node) {
      if (!node) return 0;
  
      let leftSum = findSubtreesSums(node.left);
      let rightSum = findSubtreesSums(node.right);
  
      let total = node.data + leftSum + rightSum;
  
      if (total === x) count++;
  
      return total;
    }
  }

// Test cases
let root1 = new TreeNode(5);
root1.left = new TreeNode(2);
root1.right = new TreeNode(7);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(4);
console.log("Test 1 (X=7):", countSubtreesWithSumX(root1, 7)); // 2 (subtrees at nodes 2 and 7)

let root2 = new TreeNode(3);
root2.left = new TreeNode(0);
root2.right = new TreeNode(0);
console.log("Test 2 (X=3):", countSubtreesWithSumX(root2, 3)); // 1 (subtree at root)

let root3 = new TreeNode(5);
root3.left = new TreeNode(3);
root3.right = new TreeNode(2);
root3.left.left = new TreeNode(1);
root3.left.right = new TreeNode(2);
console.log("Test 3 (X=5):", countSubtreesWithSumX(root3, 5)); // 2 (subtree at node 5 (right leaf) and root)

/*🎯 CORE IDEA: Use post-order DFS to calculate sum of each subtree. 
At each node, compute sum as node.data + leftSum + rightSum. 
If this sum equals X, increment global count. 
Return the sum to parent so it can calculate its subtree sum.

📋 STEP-BY-STEP FLOW:

1️⃣ GLOBAL COUNT TRACKING:
   - Initialize count = 0
   - Track number of subtrees with sum X
   - Incremented when subtree sum equals X
   - Returned at the end

2️⃣ HELPER FUNCTION (POST-ORDER):
   - Base case: null returns 0
   - Recursively get left subtree sum
   - Recursively get right subtree sum
   - Calculate total: node + leftSum + rightSum

3️⃣ COUNT CHECK:
   - If total equals X: increment count
   - Every node's subtree is checked
   - All matching subtrees counted

4️⃣ RETURN VALUE:
   - Return total sum of current subtree
   - Parent uses this for its own sum calculation
   - Enables bottom-up sum computation

🧠 WHY THIS APPROACH?
- Post-order ensures children processed first
- Each node calculates its subtree sum
- Simple comparison with X
- O(n) time - each node visited once
- Clean recursive solution

💡 KEY INSIGHTS:
- Every node is root of a subtree
- Subtree sum = node + left sum + right sum
- Return sum for parent's calculation
- Global count tracks matches
- Post-order DFS natural for bottom-up sums
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Count Subtrees with Sum 7

INPUT:
      5
     / \
    2   7
   / \
  1   4

X = 7

OUTPUT: 2
EXPLANATION: Subtrees at nodes 2 and 7 have sum 7.

🎯 GOAL: Count how many subtrees have sum equal to 7!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
count = 0
Call findSubtreesSums(root=5)

─────────────────────────────────────────

POST-ORDER TRAVERSAL (Process leaves first):

CALL 1: findSubtreesSums(1)
Base: not null, continue
leftSum = findSubtreesSums(null) = 0
rightSum = findSubtreesSums(null) = 0
total = 1 + 0 + 0 = 1
if (1 === 7) → FALSE
return 1

CALL 2: findSubtreesSums(4)
leftSum = 0
rightSum = 0
total = 4 + 0 + 0 = 4
if (4 === 7) → FALSE
return 4

CALL 3: findSubtreesSums(2)
leftSum = findSubtreesSums(2.left) = 1
rightSum = findSubtreesSums(2.right) = 4
total = 2 + 1 + 4 = 7
if (7 === 7) → TRUE ✓
count++ → count = 1
return 7

CALL 4: findSubtreesSums(7)
leftSum = findSubtreesSums(null) = 0
rightSum = findSubtreesSums(null) = 0
total = 7 + 0 + 0 = 7
if (7 === 7) → TRUE ✓
count++ → count = 2
return 7

CALL 5: findSubtreesSums(5) [ROOT]
leftSum = findSubtreesSums(5.left) = 7
rightSum = findSubtreesSums(5.right) = 7
total = 5 + 7 + 7 = 19
if (19 === 7) → FALSE
return 19

─────────────────────────────────────────

Return count = 2

🏆 FINAL RESULT: 2
Two subtrees have sum 7:
1. Subtree at node 2: 2 + 1 + 4 = 7
2. Subtree at node 7: 7

─────────────────────────────────────────

📊 EXAMPLE 2: Single Match

INPUT:
      3
     / \
    0   0

X = 3

🔍 PROCESS:

findSubtreesSums(0) [left]:
  total = 0
  if (0 === 3) → FALSE
  return 0

findSubtreesSums(0) [right]:
  total = 0
  if (0 === 3) → FALSE
  return 0

findSubtreesSums(3):
  leftSum = 0
  rightSum = 0
  total = 3 + 0 + 0 = 3
  if (3 === 3) → TRUE ✓
  count++ → count = 1
  return 3

Return count = 1

🏆 RESULT: 1 (only root subtree has sum 3)

─────────────────────────────────────────

📊 EXAMPLE 3: Single Match

INPUT:
      3
     / \
    1   2

X = 1

PROCESS:

findSubtreesSums(1):
  leftSum = 0
  rightSum = 0
  total = 1 + 0 + 0 = 1
  if (1 === 1) → TRUE ✓
  count++ → count = 1
  return 1

findSubtreesSums(2):
  leftSum = 0
  rightSum = 0
  total = 2 + 0 + 0 = 2
  if (2 === 1) → FALSE
  return 2

findSubtreesSums(3):
  leftSum = 1
  rightSum = 2
  total = 3 + 1 + 2 = 6
  if (6 === 1) → FALSE
  return 6

Return count = 1

🏆 RESULT: 1 (only subtree at node 1 has sum 1)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE WITH SUBTREE SUMS:

      5 (subtree sum: 19)
     / \
    2   7 (subtree sum: 7) ✓
   / \
  1   4 (subtree sum: 4)
 (sum:1) (subtree sum: 2+1+4 = 7) ✓

Subtrees with sum 7:
1. Rooted at node 2
2. Rooted at node 7

─────────────────────────────────────────

📊 SUM PROPAGATION:

Post-order traversal calculates sums bottom-up:

Leaves return their values:
  findSubtreesSums(1) → 1
  findSubtreesSums(4) → 4
  findSubtreesSums(7) → 7

Internal nodes sum children:
  findSubtreesSums(2) → 2 + 1 + 4 = 7
  findSubtreesSums(5) → 5 + 7 + 7 = 19

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ POST-ORDER TRAVERSAL:
   - Process children before parent
   - Parent needs children's sums
   - Bottom-up calculation
   - Natural recursion pattern

2️⃣ SUBTREE SUM CALCULATION:
   - node + leftSum + rightSum
   - Represents total of all nodes in subtree
   - Each node calculates once
   - Efficient computation

3️⃣ COUNT INCREMENT:
   - When total equals X
   - Tracks all matching subtrees
   - Global variable for accumulation
   - Simple comparison

4️⃣ RETURN VALUE:
   - Returns subtree sum
   - Parent uses for its calculation
   - Enables bottom-up computation
   - Key to algorithm

💡 KEY INSIGHT:
Using post-order DFS to calculate subtree sums bottom-up, checking each sum
against X and incrementing count when match found, with returned sum enabling
parent nodes to calculate their subtree sums!

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
Input: null, X = 5
Line 128: if (!node) return 0
count = 0
Output: 0

CASE 2: Single Node Matches
Input: TreeNode(7), X = 7
total = 7, if (7 === 7) → count = 1
Output: 1

CASE 3: Single Node Doesn't Match
Input: TreeNode(5), X = 7
total = 5, if (5 === 7) → FALSE
Output: 0

CASE 4: All Subtrees Match
Input:
   7
  / \
 0   0

X = 7

Subtree at 0: 0 ✗
Subtree at 0: 0 ✗
Subtree at 7: 7 + 0 + 0 = 7 ✓
Count: 1

CASE 5: No Matches
Input:
   5
  / \
 1   2

X = 10

All sums: 1, 2, 8 (none equal 10)
Output: 0

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Calculates all subtree sums: ✓
- Checks each sum against X: ✓
- Counts all matches: ✓
- Returns correct count: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 128: count initialized to 0
- Line 129: Call helper on root
- Line 130: Return final count
- Line 133: Base case returns 0
- Line 135-136: Get sums from children
- Line 138: Calculate total sum
- Line 140: Check and increment count
- Line 142: Return sum to parent

🎯 WHY RETURN TOTAL:
- Parent needs subtree sums from children
- Parent calculates: parent + leftSum + rightSum
- Return value propagates sum upward
- Enables all ancestor calculations
- Key to bottom-up approach

🎯 ADVANTAGES:
- Optimal O(n) time
- Single traversal
- Clean recursive solution
- Simple count tracking
- No complex data structures

🎯 DISADVANTAGES:
- Uses global variable (count)
- Recursion stack O(h)
- Stack overflow for deep trees
- Must visit all nodes (no early termination)

🎯 REAL-WORLD APPLICATIONS:
- Finding components with target total
- Resource allocation with constraints
- Sum-based filtering in hierarchies
- Budget matching in org structures
- Subset sum in trees

🎯 RELATED PROBLEMS:
- Path sum equal to K
- Count paths with sum
- Subtree sum variations
- Tree DP problems
- Sum-based tree queries

🎯 TESTING STRATEGY:
- Empty tree
- Single node (match/no match)
- Multiple matches
- No matches
- Negative values
- Zero values

🎯 DEBUGGING TIPS:
- Trace sum calculations
- Print sums at each node
- Verify count increments
- Check return values
- Visualize sum propagation

🎯 COMMON MISTAKES:
- Not initializing count to 0
- Wrong subtree sum calculation
- Forgetting to return sum
- Not handling null base case
- Using local instead of global count

🎯 BEST PRACTICES:
- Initialize count to 0
- Handle null base case
- Return sum for parent
- Clear variable naming
- Test with various X values

🎯 INTERVIEW TIPS:
- Explain subtree sum concept
- Show post-order traversal
- Discuss sum propagation
- Walk through example
- Analyze complexity
- Handle edge cases

🎯 ALGORITHM PATTERN:
- Tree DP problem
- Post-order traversal
- Global counting
- Return value for parent
- Sum calculation

🎯 CONCLUSION:
Counting subtrees with sum equal to X is efficiently achieved using post-order
DFS that calculates each subtree's sum (node + left sum + right sum), increments
count when sum equals X, and returns sum to parent for its calculation, achieving
O(n) time and O(h) space complexity!
*/
  