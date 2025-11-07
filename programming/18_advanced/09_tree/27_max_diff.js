/* Problem: ✅✅✅✅ Maximum Difference Between Node and Its Ancestor ✅✅✅✅

Given a binary tree, find the maximum value which you can get by subtracting the value of node B from the value of node A, where A and B are two nodes of the binary tree and A is an ancestor of B.

Maximum difference definition:
- A is an ancestor of B (A is somewhere above B in the tree)
- Difference = A.data - B.data (ancestor - descendant)
- Find maximum such difference across all ancestor-descendant pairs
- Ancestor can be immediate parent or any node above in the path to root

You are given the root of a binary tree. Return the maximum difference between any ancestor and its descendant.

Example 1:
Input:
      8
     / \
    3   10
   / \    \
  1   6   14
     / \  /
    4  7 13

Output: 7
Explanation: 
Maximum difference is 8 - 1 = 7
(8 is ancestor of 1, difference is maximum)

Example 2:
Input:
     5
    / \
   2   1

Output: 4
Explanation:
Maximum difference is 5 - 1 = 4
(5 is ancestor of 1)

Example 3:
Input:
      2
     / \
    1   3

Output: 1
Explanation:
Possible differences: 2-1=1, 2-3=-1
Maximum is 2 - 1 = 1

Example 4:
Input:
     1
    /
   2
  /
 3

Output: -1
Explanation:
All differences are negative (ascending tree):
- 1 - 2 = -1 (1 is ancestor of 2)
- 1 - 3 = -2 (1 is ancestor of 3)
- 2 - 3 = -1 (2 is ancestor of 3)
Maximum among these: -1

Constraints:
- 2 ≤ number of nodes ≤ 10^5
- 1 ≤ node.data ≤ 10^5

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
function maxDiff(root) {
    let maxDifference = -Infinity; // global max difference ✅✅✅✅(-Infinity -> base for max)
    findMin(root); // call the helper function
    return maxDifference;
  
    // helper function
    function findMin(node) {
        // 1. base: min value identity
      if (!node) return Infinity; // ✅✅✅✅(Infinity -> base for min)
  
      // 2. leaf node returns its own value
      if (!node.left && !node.right) return node.data;
  
      // 3. get min from left and right subtrees
      let leftMin = findMin(node.left);
      let rightMin = findMin(node.right);
  
      // 4. min descendant value
      let minDescendant = Math.min(leftMin, rightMin);
  
      // 5. update global max diff
      maxDifference = Math.max(maxDifference, node.data - minDescendant);
  
      // 6. return min value in (currNode & its subtrees) 
      return Math.min(node.data, minDescendant);
    }
  }

// Test cases
let root1 = new TreeNode(8);
root1.left = new TreeNode(3);
root1.right = new TreeNode(10);
root1.left.left = new TreeNode(1);
root1.left.right = new TreeNode(6);
root1.right.right = new TreeNode(14);
root1.left.right.left = new TreeNode(4);
root1.left.right.right = new TreeNode(7);
root1.right.right.left = new TreeNode(13);
console.log("Test 1:", maxDiff(root1)); // 7 (8 - 1 = 7)

let root2 = new TreeNode(5);
root2.left = new TreeNode(2);
root2.right = new TreeNode(1);
console.log("Test 2:", maxDiff(root2)); // 4 (5 - 1 = 4)

let root3 = new TreeNode(2);
root3.left = new TreeNode(1);
root3.right = new TreeNode(3);
console.log("Test 3:", maxDiff(root3)); // 1 (2 - 1 = 1)

/*🎯 CORE IDEA: Use post-order DFS to find minimum value in each subtree. 
At each node, calculate difference between current node and minimum descendant value.
Update global maxDifference with this value. 
Return minimum value in subtree rooted at current node (min of node and its descendants) 
so ancestor nodes can use it for their difference calculation.

📋 STEP-BY-STEP FLOW:

1️⃣ GLOBAL MAX DIFFERENCE TRACKING:
   - Initialize maxDifference = -Infinity
   - Track maximum (ancestor - descendant) found
   - Updated at each non-leaf node
   - Returned at the end

2️⃣ HELPER FUNCTION (POST-ORDER):
   - Base case: null returns Infinity (neutral for min)
   - Leaf node: returns its own value
   - Non-leaf: get min from left and right subtrees
   - Calculate diff: current - minDescendant
   - Update maxDifference

3️⃣ RETURN VALUE:
   - Return min(current node, minDescendant)
   - This is minimum in entire subtree
   - Ancestor uses this for its difference calculation
   - Propagates minimum upward

4️⃣ DIFFERENCE CALCULATION:
   - At each node: node.data - minDescendant
   - minDescendant is minimum in node's subtree
   - Maximum difference when current is large, descendant is small
   - Update global max if this difference is larger

🧠 WHY THIS APPROACH?
- Post-order ensures descendants processed first
- Each node knows minimum in its subtree
- Ancestor - minimum descendant gives max difference
- O(n) time - each node visited once
- Clean recursive solution

💡 KEY INSIGHTS:
- Maximum difference = current node - minimum descendant
- Return minimum in subtree for ancestor's calculation
- Leaf node returns itself (base case)
- Null returns Infinity (neutral for min operation)
- Global tracking ensures we find overall maximum
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Tree with Maximum Difference

INPUT:
      8
     / \
    3   10
   / \    \
  1   6   14
     / \  /
    4  7 13

OUTPUT: 7
EXPLANATION: Maximum difference is 8 - 1 = 7

🎯 GOAL: Find maximum (ancestor - descendant) difference!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
maxDifference = -Infinity
Call findMin(root=8)

─────────────────────────────────────────

POST-ORDER TRAVERSAL (Process leaves first):

CALL 1: findMin(1)
Base: not null, continue
Leaf check: no left, no right → TRUE
return 1

CALL 2: findMin(4)
Leaf node → return 4

CALL 3: findMin(7)
Leaf node → return 7

CALL 4: findMin(6)
Not null, not leaf
leftMin = findMin(6.left) = 4
rightMin = findMin(6.right) = 7
minDescendant = Math.min(4, 7) = 4
maxDifference = Math.max(-Infinity, 6 - 4) = 2
return Math.min(6, 4) = 4

CALL 5: findMin(3)
Not null, not leaf
leftMin = findMin(3.left) = 1
rightMin = findMin(3.right) = 4 (from node 6's subtree)
minDescendant = Math.min(1, 4) = 1
maxDifference = Math.max(2, 3 - 1) = 2
return Math.min(3, 1) = 1

CALL 6: findMin(13)
Leaf node → return 13

CALL 7: findMin(14)
Not null, not leaf
leftMin = findMin(14.left) = 13
rightMin = findMin(14.right) = Infinity (null)
minDescendant = Math.min(13, Infinity) = 13
maxDifference = Math.max(2, 14 - 13) = 2
return Math.min(14, 13) = 13

CALL 8: findMin(10)
Not null, not leaf
leftMin = findMin(10.left) = Infinity (null)
rightMin = findMin(10.right) = 13
minDescendant = Math.min(Infinity, 13) = 13
maxDifference = Math.max(2, 10 - 13) = 2 (10-13=-3, not better)
return Math.min(10, 13) = 10

CALL 9: findMin(8) [ROOT]
Not null, not leaf
leftMin = findMin(8.left) = 1
rightMin = findMin(8.right) = 10
minDescendant = Math.min(1, 10) = 1
maxDifference = Math.max(2, 8 - 1) = 7 ✓
return Math.min(8, 1) = 1

─────────────────────────────────────────

Return maxDifference = 7

🏆 FINAL RESULT: 7
Maximum difference: 8 - 1 = 7 (8 is ancestor, 1 is descendant)

─────────────────────────────────────────

📊 EXAMPLE 2: Simple Tree

INPUT:
     5
    / \
   2   1

OUTPUT: 4

🔍 STEP-BY-STEP PROCESS:

findMin(2):
  Leaf → return 2

findMin(1):
  Leaf → return 1

findMin(5):
  leftMin = 2
  rightMin = 1
  minDescendant = Math.min(2, 1) = 1
  maxDifference = Math.max(-Infinity, 5 - 1) = 4 ✓
  return Math.min(5, 1) = 1

Return maxDifference = 4

🏆 RESULT: 4 (difference: 5 - 1 = 4)

─────────────────────────────────────────

📊 EXAMPLE 3: Mixed Differences

INPUT:
      2
     / \
    1   3

OUTPUT: 1

PROCESS:

findMin(1):
  Leaf → return 1

findMin(3):
  Leaf → return 3

findMin(2):
  leftMin = 1
  rightMin = 3
  minDescendant = Math.min(1, 3) = 1
  maxDifference = Math.max(-Infinity, 2 - 1) = 1 ✓
  return Math.min(2, 1) = 1

Return maxDifference = 1

🏆 RESULT: 1 (difference: 2 - 1 = 1)

Note: 2 - 3 = -1 is smaller, so 2 - 1 = 1 is maximum

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE WITH ANCESTOR-DESCENDANT PAIRS:

      8 (ancestor)
     / \
    3   10
   / \    \
  1   6   14
 (descendant)

Possible differences where 8 is ancestor:
- 8 - 3 = 5
- 8 - 1 = 7 ✓ (maximum)
- 8 - 6 = 2
- 8 - 4 = 4
- 8 - 7 = 1
- 8 - 10 = -2
- 8 - 14 = -6
- 8 - 13 = -5

Maximum: 8 - 1 = 7

─────────────────────────────────────────

📊 MIN VALUE PROPAGATION:

Tree:
      8
     / \
    3   10
   /
  1

Post-order processing:

findMin(1): returns 1
findMin(3): 
  minDescendant = 1
  diff = 3 - 1 = 2
  returns min(3, 1) = 1

findMin(10): returns 10
findMin(8):
  minDescendant = min(1, 10) = 1
  diff = 8 - 1 = 7 ✓
  returns min(8, 1) = 1

Minimum value (1) propagates upward!

─────────────────────────────────────────

📊 WHY RETURN MIN OF SUBTREE:

At node 8:
  Left subtree min = 1
  Right subtree min = 10
  
To calculate max difference at 8:
  Need minimum descendant in entire tree rooted at 8
  minDescendant = min(1, 10) = 1
  
Difference = 8 - 1 = 7

The min value bubbles up from descendants to ancestors!

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ POST-ORDER TRAVERSAL:
   - Process children before parent
   - Parent needs minimum from descendants
   - Bottom-up calculation
   - Natural recursion pattern

2️⃣ MINIMUM TRACKING:
   - Each node returns minimum in its subtree
   - Ancestor subtracts this minimum
   - Maximizes the difference
   - Efficient one-pass solution

3️⃣ BASE CASES:
   - Null: returns Infinity (neutral for min)
   - Leaf: returns its own value
   - Clear termination conditions

4️⃣ GLOBAL MAXIMUM:
   - maxDifference tracks best found
   - Updated at each non-leaf node
   - Ensures no pair missed
   - Final answer

5️⃣ RETURN VALUE:
   - Returns min(node, minDescendant)
   - Enables ancestor calculation
   - Propagates minimum upward
   - Key to algorithm correctness

💡 KEY INSIGHT:
For maximum difference (ancestor - descendant), we want to maximize ancestor value
and minimize descendant value, achieved by computing minimum in each subtree and
subtracting it from current node, returning the minimum upward for ancestor nodes!

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

CASE 1: Single Leaf Node
Input: TreeNode(5)
Not null, is leaf → return 5
No descendant to compare
maxDifference remains -Infinity
Output: -Infinity (or handle separately)

CASE 2: Two Nodes (Parent-Child)
Input:
   5
  /
 3

findMin(3): return 3
findMin(5):
  leftMin = 3
  rightMin = Infinity
  minDescendant = 3
  diff = 5 - 3 = 2
  maxDifference = 2
Output: 2

CASE 3: Descending Values
Input:
   5
  /
 4
/
3

findMin(3): return 3
findMin(4):
  minDescendant = 3
  diff = 4 - 3 = 1
  return min(4, 3) = 3
  
findMin(5):
  minDescendant = 3
  diff = 5 - 3 = 2
  maxDifference = 2
Output: 2

CASE 4: Ascending Values
Input:
   3
  /
 4
/
5

findMin(5): return 5
findMin(4):
  minDescendant = 5
  diff = 4 - 5 = -1
  maxDifference = -1
  return min(4, 5) = 4
  
findMin(3):
  minDescendant = 4
  diff = 3 - 4 = -1
  maxDifference = -1
Output: -1 (all negative differences)

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Considers all ancestor-descendant pairs: ✓
- Finds minimum in each subtree: ✓
- Updates global maximum: ✓
- Returns correct result: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 98: maxDifference initialized to -Infinity
- Line 99: Call findMin on root
- Line 100: Return final maxDifference
- Line 104: Base case for null (returns Infinity)
- Line 107: Leaf node returns its value
- Line 110-111: Get min from subtrees
- Line 114: Calculate min descendant
- Line 117: Update global max difference
- Line 120: Return min in current subtree

🎯 WHY INFINITY FOR NULL:
- Line 104: return Infinity
- Neutral element for min operation
- min(5, Infinity) = 5
- Doesn't affect min calculation
- Clean base case handling

🎯 WHY -INFINITY FOR MAXDIFFERENCE:
- Handles negative differences correctly
- Example: All descending values
  - Differences all negative
  - maxDifference = -Infinity
  - Updated to best negative value
- If initialized to 0: wrong for negative results

🎯 TWO CALCULATIONS AT EACH NODE:
1. Difference calculation:
   - node.data - minDescendant
   - Used to update maxDifference
   - Represents best difference at this node

2. Return value:
   - min(node.data, minDescendant)
   - Minimum in entire subtree
   - Used by ancestor for its calculation
   - Propagates minimum upward

🎯 WHY MIN OF NODE AND DESCENDANTS:
Example:
      10
     /
    5
   /
  8

At node 5:
  minDescendant = 8
  But node 5 < 8
  Return min(5, 8) = 5 (5 is actual minimum)

At node 10:
  minDescendant = 5 (from left subtree)
  diff = 10 - 5 = 5

🎯 ADVANTAGES:
- Optimal O(n) time
- Single traversal
- Clean recursive solution
- Handles negative differences
- Global max tracking

🎯 DISADVANTAGES:
- Uses global variable
- Recursion stack O(h)
- Needs understanding of min propagation
- Stack overflow for deep trees

🎯 REAL-WORLD APPLICATIONS:
- Stock price analysis (buy low, sell high)
- Finding maximum profit in hierarchies
- Optimization problems
- Ancestor-descendant relationships
- Tree-based calculations

🎯 RELATED PROBLEMS:
- Maximum path sum
- Minimum difference in BST
- Ancestor-descendant problems
- Tree DP problems
- Buy-sell stock variations

🎯 TESTING STRATEGY:
- Single node
- Two nodes
- All ascending values
- All descending values
- Mixed values
- Deep trees
- Wide trees

🎯 DEBUGGING TIPS:
- Trace minimum propagation
- Print differences at each node
- Verify return values
- Check base cases
- Visualize min flow

🎯 COMMON MISTAKES:
- Wrong base case (returning 0 instead of Infinity)
- Not handling leaf nodes separately
- Wrong maxDifference initialization
- Calculating max - min instead of current - min
- Forgetting to return min of subtree

🎯 BEST PRACTICES:
- Initialize maxDifference to -Infinity
- Return Infinity for null (neutral)
- Handle leaf nodes explicitly
- Clear variable naming
- Test with negative differences

🎯 INTERVIEW TIPS:
- Explain ancestor-descendant concept
- Show post-order traversal
- Discuss min propagation
- Walk through example
- Analyze complexity
- Handle edge cases

🎯 ALGORITHM PATTERN:
- Tree DP problem
- Post-order traversal
- Global maximum tracking
- Return value for ancestors
- Min/max optimization

🎯 COMPARISON WITH MAX PATH SUM:
MAX PATH SUM:
- Uses max(gain, 0) to ignore negatives
- Returns node + max(left, right)
- Tracks maximum path sum

MAX DIFF:
- Returns min(node, descendants)
- Tracks maximum difference
- Uses min for difference maximization

Similar patterns, different calculations!

🎯 CONCLUSION:
Finding maximum difference between ancestor and descendant is efficiently achieved
using post-order DFS that computes minimum value in each subtree, calculates
difference (current - minimum descendant) to update global maximum, and returns
minimum in subtree for ancestor calculations, achieving O(n) time and O(h) space!
*/
  