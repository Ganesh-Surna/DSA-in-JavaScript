/* Problem: ✅✅✅✅ Minimum Absolute Difference in BST ✅✅✅✅

Given a Binary Search Tree (BST) and a target value k, find the minimum absolute 
difference between the target value and any node value in the BST.

The BST property ensures that:
- Left subtree contains nodes < current node
- Right subtree contains nodes > current node
- We can optimize search by eliminating subtrees that cannot contain better candidates

You are given the root of a BST and a target value k. 
Return the minimum absolute difference between k and any node value in the BST.

Example 1:
Input:
      4
     / \
    2   6
   / \ / \
  1  3 5  7
k = 3

Output: 0
Explanation: Node with value 3 exists in BST. Minimum difference = |3 - 3| = 0.

Example 2:
Input:
      8
     / \
    4   12
   / \  / \
  2  6 10 14
k = 5

Output: 1
Explanation: Closest nodes are 4 and 6. Minimum difference = min(|5-4|, |5-6|) = min(1, 1) = 1.

Example 3:
Input:
      5
     / \
    3   7
   / \   \
  2  4    8
k = 9

Output: 1
Explanation: Closest node is 8. Minimum difference = |9 - 8| = 1.

Constraints:
- 1 ≤ number of nodes ≤ 10^4
- 1 ≤ node.data ≤ 10^5
- 1 ≤ k ≤ 10^5

Expected Complexities:
Time Complexity: O(h) - height of BST
Auxiliary Space: O(1) - constant space
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(h) - height of BST
// ✅ SC = O(1) - constant space
function findMinDiff(root, k) {
  let res = Infinity;
  let curr = root;

  while (curr) {
    if (curr.data === k) return 0; // ✅ Exact match → minimum difference is 0.

    res = Math.min(res, Math.abs(k - curr.data)); // ✅ Keep track of closest difference.

    if (curr.data < k){
        /* curr is already considered & it is < k. 
            And nodes left to curr are < curr. 
            The diff will be more with those nodes. 
            So we search for closer/larger node i.e., we move to right 
        */
        curr = curr.right; // ✅ Look for closer/larger values.
    }
    else{ 
        // i.e., (curr.data > k)
        curr = curr.left; // ✅ Look for closer/smaller values.
    }
  }

  return res;
}

// Test cases
let root1 = new Node(4);
root1.left = new Node(2);
root1.right = new Node(6);
root1.left.left = new Node(1);
root1.left.right = new Node(3);
root1.right.left = new Node(5);
root1.right.right = new Node(7);
console.log("Test 1:", findMinDiff(root1, 3)); // 0

let root2 = new Node(8);
root2.left = new Node(4);
root2.right = new Node(12);
root2.left.left = new Node(2);
root2.left.right = new Node(6);
root2.right.left = new Node(10);
root2.right.right = new Node(14);
console.log("Test 2:", findMinDiff(root2, 5)); // 1

let root3 = new Node(5);
root3.left = new Node(3);
root3.right = new Node(7);
root3.left.left = new Node(2);
root3.left.right = new Node(4);
root3.right.right = new Node(8);
console.log("Test 3:", findMinDiff(root3, 9)); // 1

/*🎯 CORE IDEA: Use optimized BST search with pruning.
Traverse BST from root to leaf, tracking minimum difference encountered.
At each node, eliminate subtrees that cannot contain better candidates
using BST properties, achieving O(h) time complexity.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Set result to Infinity (worst case)
   - Start from root node
   - Track current minimum difference

2️⃣ EXACT MATCH CHECK:
   - If current node equals target k
   - Return 0 immediately (best possible)
   - No need to search further

3️⃣ UPDATE MINIMUM DIFFERENCE:
   - Calculate absolute difference |k - curr.data|
   - Update result with minimum seen so far
   - Track closest value encountered

4️⃣ BST PRUNING DECISION:
   - If curr.data < k: go right (look for larger values)
   - If curr.data > k: go left (look for smaller values)
   - Eliminate subtrees that cannot improve result

5️⃣ CONTINUE SEARCH:
   - Move to chosen subtree
   - Repeat until leaf reached
   - Return minimum difference found

🧠 WHY THIS APPROACH?
- BST properties enable pruning
- Eliminates impossible subtrees
- O(h) time complexity
- Constant space usage
- Optimal for BST structure

💡 KEY INSIGHTS:
- Exact match gives optimal result (0)
- BST properties enable subtree elimination
- Track minimum difference globally
- Search path follows BST structure
- Efficient pruning strategy
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Exact Match Found

INPUT BST:
      4
     / \
    2   6
   / \ / \
  1  3 5  7

TARGET: k = 3
EXPECTED OUTPUT: 0

🎯 GOAL: Find minimum absolute difference between 3 and any node!

🔍 STEP-BY-STEP PROCESS:

OPTIMIZED BST SEARCH:

STEP 1: Start at root (4)
Current: 4, Target: 3
Check: 4 === 3? No
Difference: |3 - 4| = 1
Result: min(∞, 1) = 1
Decision: 4 > 3, go left (look for smaller values)

STEP 2: At node 2
Current: 2, Target: 3
Check: 2 === 3? No
Difference: |3 - 2| = 1
Result: min(1, 1) = 1
Decision: 2 < 3, go right (look for larger values)

STEP 3: At node 3
Current: 3, Target: 3
Check: 3 === 3? Yes ✓
Return: 0 (exact match found!)

🏆 FINAL RESULT: 0

─────────────────────────────────────────

📊 EXAMPLE 2: No Exact Match

INPUT BST:
      8
     / \
    4   12
   / \  / \
  2  6 10 14

TARGET: k = 5
EXPECTED OUTPUT: 1

PROCESS:

STEP 1: At root (8)
Current: 8, Target: 5
Check: 8 === 5? No
Difference: |5 - 8| = 3
Result: min(∞, 3) = 3
Decision: 8 > 5, go left

STEP 2: At node 4
Current: 4, Target: 5
Check: 4 === 5? No
Difference: |5 - 4| = 1
Result: min(3, 1) = 1
Decision: 4 < 5, go right

STEP 3: At node 6
Current: 6, Target: 5
Check: 6 === 5? No
Difference: |5 - 6| = 1
Result: min(1, 1) = 1
Decision: 6 > 5, go left

STEP 4: At node null
Search complete, return result: 1

🏆 RESULT: 1

─────────────────────────────────────────

📊 EXAMPLE 3: Target Outside Range

INPUT BST:
      5
     / \
    3   7
   / \   \
  2  4    8

TARGET: k = 9
EXPECTED OUTPUT: 1

PROCESS:

STEP 1: At root (5)
Current: 5, Target: 9
Check: 5 === 9? No
Difference: |9 - 5| = 4
Result: min(∞, 4) = 4
Decision: 5 < 9, go right

STEP 2: At node 7
Current: 7, Target: 9
Check: 7 === 9? No
Difference: |9 - 7| = 2
Result: min(4, 2) = 2
Decision: 7 < 9, go right

STEP 3: At node 8
Current: 8, Target: 9
Check: 8 === 9? No
Difference: |9 - 8| = 1
Result: min(2, 1) = 1
Decision: 8 < 9, go right

STEP 4: At node null
Search complete, return result: 1

🏆 RESULT: 1

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

BST SEARCH PATH VISUALIZATION:
      8
     / \
    4   12
   / \  / \
  2  6 10 14

Target k = 5:
Path: 8 → 4 → 6 → null
Differences: |5-8|=3, |5-4|=1, |5-6|=1
Minimum: 1

─────────────────────────────────────────

📊 PRUNING ANALYSIS:

WHY PRUNING WORKS:

At node 4 with target 5:
- Current difference: |5-4| = 1
- All left subtree nodes < 4
- Their differences: |5-x| where x < 4
- Minimum left difference: |5-4| = 1 (already considered)
- No left subtree node can be better than current
- Safe to skip left subtree!

At node 6 with target 5:
- Current difference: |5-6| = 1
- All right subtree nodes > 6
- Their differences: |5-x| where x > 6
- Minimum right difference: |5-6| = 1 (already considered)
- No right subtree node can be better than current
- Safe to skip right subtree!

─────────────────────────────────────────

📊 SEARCH PATH VISUALIZATION:

EXAMPLE BST:
      4
     / \
    2   6
   / \ / \
  1  3 5  7

Target k = 3:
Path: 4 → 2 → 3 (exact match)
Differences: |3-4|=1, |3-2|=1, |3-3|=0
Result: 0

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ BST PROPERTY UTILIZATION:
   - Left subtree < current node
   - Right subtree > current node
   - Enables intelligent pruning
   - Eliminates impossible candidates

2️⃣ OPTIMAL SEARCH PATH:
   - Follows BST structure
   - Visits at most h nodes
   - No unnecessary exploration
   - Efficient path to solution

3️⃣ EXACT MATCH OPTIMIZATION:
   - Early termination when found
   - Best possible result (0)
   - No need to continue search
   - Optimal performance

4️⃣ GLOBAL MINIMUM TRACKING:
   - Track best difference seen
   - Update at each node
   - No need to revisit nodes
   - Efficient memory usage

5️⃣ PRUNING STRATEGY:
   - Eliminate subtrees that cannot improve
   - Use BST properties for decision
   - Reduce search space significantly
   - Optimal pruning logic

💡 KEY INSIGHT:
Using BST properties to prune subtrees that cannot contain better candidates,
where if current node < target, all left descendants will have larger differences
than current, and if current node > target, all right descendants will have
larger differences than current, achieving O(h) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Worst case: O(h) where h = height of BST
- Best case: O(1) if exact match at root
- Average: O(log n) for balanced BST
- Visits at most h nodes
- No redundant exploration

🎯 SPACE COMPLEXITY ANALYSIS:
- Constant space: O(1)
- Only variables: res, curr
- No recursion stack
- No additional data structures
- Optimal space usage

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null, k=5
Result: Infinity
Output: Infinity

CASE 2: Single Node Exact Match
Input: Node(5), k=5
Process: 5 === 5? Yes
Result: 0
Output: 0

CASE 3: Single Node No Match
Input: Node(5), k=3
Process: 5 === 3? No, |3-5|=2
Result: 2
Output: 2

CASE 4: Target at Root
Input: BST with root=5, k=5
Process: Exact match at root
Result: 0
Output: 0

CASE 5: Target Outside Range
Input: BST 1-7, k=10
Process: Search to rightmost node
Result: |10-7| = 3
Output: 3

CASE 6: Target Between Nodes
Input: BST 1,3,5,7, k=4
Process: Search path finds closest
Result: min(|4-3|, |4-5|) = 1
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Visits all relevant nodes: ✓
- Finds minimum difference: ✓
- Handles exact matches: ✓
- Prunes correctly: ✓
- Handles all tree structures: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 2: Initialize result to Infinity
- Line 3: Start from root
- Line 5: Main search loop
- Line 6: Check for exact match
- Line 8: Update minimum difference
- Line 10-21: BST pruning logic
- Line 24: Return final result

🎯 PRUNING LOGIC:

WHEN curr.data < k:
- Current node already considered
- All left descendants < current node
- Their differences > current difference
- Go right to find larger values

WHEN curr.data > k:
- Current node already considered
- All right descendants > current node
- Their differences > current difference
- Go left to find smaller values

This ensures optimal pruning!

🎯 SEARCH STRATEGY:
1. Start at root
2. Check for exact match
3. Update minimum difference
4. Choose subtree based on BST properties
5. Continue until leaf reached
6. Return minimum found

This gives optimal O(h) performance!

🎯 ADVANTAGES:
- O(h) time complexity
- O(1) space complexity
- Optimal pruning strategy
- Handles exact matches efficiently
- Simple and readable code

🎯 DISADVANTAGES:
- Requires BST property
- Not applicable to general trees
- Single target per search
- No parallel processing

🎯 REAL-WORLD APPLICATIONS:
- Database nearest neighbor queries
- Geographic proximity searches
- Price comparison systems
- Time-series data analysis
- Recommendation systems
- Closest value lookups

🎯 RELATED PROBLEMS:
- Closest Binary Search Tree Value
- Search in BST
- Insert into BST
- Delete from BST
- Kth smallest element
- Range sum queries

🎯 TESTING STRATEGY:
- Empty tree
- Single node (exact/no match)
- Target at root
- Target outside range
- Target between nodes
- Balanced vs skewed trees

🎯 DEBUGGING TIPS:
- Print current node and difference
- Trace search path
- Verify pruning decisions
- Check exact match handling
- Validate BST properties

🎯 COMMON MISTAKES:
- Not handling exact match
- Wrong pruning logic
- Not initializing result properly
- Missing null checks
- Incorrect difference calculation

🎯 BEST PRACTICES:
- Use BST properties for pruning
- Handle exact matches early
- Initialize result to Infinity
- Clear variable names
- Test with various targets

🎯 INTERVIEW TIPS:
- Explain BST pruning strategy
- Discuss time complexity
- Show search path example
- Walk through pruning logic
- Analyze space complexity
- Compare with naive approach

🎯 BST SEARCH PATTERN:
1. Start at root
2. Compare with target
3. Choose subtree based on comparison
4. Repeat until leaf
5. Return result

This gives optimal BST search!

🎯 PRUNING STRATEGY:
- Use BST properties
- Eliminate impossible subtrees
- Reduce search space
- Maintain optimality
- Efficient exploration

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH:
function findMinDiff(root, k) {
    let minDiff = Infinity;
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        minDiff = Math.min(minDiff, Math.abs(k - node.data));
        inorder(node.right);
    }
    inorder(root);
    return minDiff;
}

OPTIMIZED APPROACH:
- O(h) vs O(n) time
- O(1) vs O(h) space
- Pruning vs full traversal
- Optimal vs exhaustive search

🎯 CONCLUSION:
Finding minimum absolute difference in BST is efficiently achieved using
optimized search with pruning, leveraging BST properties to eliminate
subtrees that cannot contain better candidates, achieving O(h) time and
O(1) space complexity!
*/