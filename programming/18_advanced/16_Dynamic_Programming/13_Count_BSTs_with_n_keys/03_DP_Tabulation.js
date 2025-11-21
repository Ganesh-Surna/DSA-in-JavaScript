/* Problem: ✅✅✅✅ Count BSTs with n Keys (DP Tabulation) ✅✅✅✅

Given `n` distinct keys, find the number of structurally unique Binary Search
Trees (BSTs) that can be formed using these keys.

🎯 Goal: Count the number of unique BSTs that can be formed with n distinct keys.

Example 1:
Input: n = 0
Output: 1
Explanation: There is only one way to construct a BST with 0 nodes (empty tree).

Example 2:
Input: n = 1
Output: 1
Explanation: With 1 key, there is only one BST structure:
    1

Example 3:
Input: n = 2
Output: 2
Explanation: With 2 keys (say 1, 2), we can form 2 unique BSTs:
    1         2
     \       /
      2     1

Example 4:
Input: n = 3
Output: 5
Explanation: With 3 keys (say 1, 2, 3), we can form 5 unique BSTs:
    1         1         2         3         3
     \         \       / \       /         /
      2         3     1   3     1         2
       \       /                   \     /
        3     2                     2   1

Constraints:
- 0 ≤ n ≤ 19

Expected Complexities:
Time Complexity: O(n²) - nested loops
Space Complexity: O(n) for the DP array

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i] = number of unique BSTs that can be formed with i distinct keys
- For each root position, count left and right subtrees
- Total = sum over all possible root positions
- This is the Catalan number problem: C(n) = (2n)! / ((n+1)! * n!)

📈 Recurrence Relation:
  Base case:
      dp[0] = 1  // Empty tree (one way)
  
  For i nodes, try each node as root (j = 0 to i-1):
      left_subtree = j nodes        // Nodes smaller than root
      right_subtree = i-j-1 nodes   // Nodes larger than root
      dp[i] += dp[j] * dp[i-j-1]    // Multiply: left ways × right ways
  
  Answer = dp[n]

Base Cases:
- dp[0] = 1 (empty tree, one way)

🎯 Why This Approach?
- Optimal substructure: Number of BSTs with i nodes depends on number of BSTs
  with smaller numbers of nodes (left and right subtrees).
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution from smaller to larger problems.
- Guarantees correct count by considering all root positions.

💡 Key Insights:
- dp[i] = number of unique BSTs with i distinct keys
- For each root, left subtree has j nodes, right subtree has i-j-1 nodes
- Total nodes: j (left) + 1 (root) + (i-j-1) (right) = i ✓
- Multiply left and right ways (independent choices)
- Sum over all possible root positions

⚠️ WHY dp[0] = 1?

This is CRITICAL to understand:

dp[0] = 1 represents the empty tree (tree with 0 nodes).

Why is this 1 and not 0?
- When we have a root and one subtree is empty, we still have 1 way to arrange it
- Example: Root with only left subtree (right is empty)
  - Left subtree: dp[j] ways
  - Right subtree: dp[0] = 1 way (empty tree)
  - Total: dp[j] × 1 = dp[j] ways

If dp[0] = 0, we would get 0 ways when one subtree is empty, which is wrong!

Example: n=1
- Root = 1
- Left subtree: 0 nodes → dp[0] = 1 way (empty)
- Right subtree: 0 nodes → dp[0] = 1 way (empty)
- Total: dp[0] × dp[0] = 1 × 1 = 1 ✓

⭐ WHY Multiply dp[j] × dp[i-j-1]?

We multiply because left and right subtrees are INDEPENDENT choices.

For a BST with i nodes:
- Choose root: 1 node
- Left subtree: j nodes (any j from 0 to i-1)
- Right subtree: i-j-1 nodes (remaining nodes)

Number of ways:
- Left subtree: dp[j] ways to arrange j nodes
- Right subtree: dp[i-j-1] ways to arrange i-j-1 nodes
- Total: dp[j] × dp[i-j-1] (multiply because independent)

Example: n=3, root=2
- Left subtree: 1 node → dp[1] = 1 way
- Right subtree: 1 node → dp[1] = 1 way
- Total: 1 × 1 = 1 way

But if we had:
- Left subtree: 2 nodes → dp[2] = 2 ways
- Right subtree: 0 nodes → dp[0] = 1 way
- Total: 2 × 1 = 2 ways

⭐ WHY i-j-1 for Right Subtree?

Total nodes = i
- Root = 1 node
- Left subtree = j nodes
- Right subtree = i - j - 1 nodes

Verification: 1 + j + (i-j-1) = i ✓

Example: n=5, root at position 2 (j=2 nodes in left)
- Total: 5 nodes
- Root: 1 node
- Left: 2 nodes (j=2)
- Right: 5 - 2 - 1 = 2 nodes ✓
*/

// ✅ TC = O(n²) - nested loops: outer loop n iterations, inner loop up to n iterations
// ✅ SC = O(n) for 1D DP array
function countBSTs(n) {
    // Initialize DP array: dp[i] = number of unique BSTs with i distinct keys
    let dp = new Array(n+1).fill(0)
    
    // Base Case: 
    // dp[0] = 1: There is only one way to construct a BST with 0 nodes (empty tree)
    // This is crucial for the recurrence relation to work correctly
    dp[0] = 1
    
    // Build DP array: for each number of nodes from 1 to n
    for(let i=1; i<n+1; i++){
        // Try each possible number of nodes in the left subtree
        // j can range from 0 (empty left) to i-1 (all nodes except root in left)
        for(let j=0; j<i; j++){ // j = number of nodes in left subtree
            // dp[j] = number of ways to construct left subtree with j nodes
            // dp[i-j-1] = number of ways to construct right subtree with i-j-1 nodes
            // We multiply because left and right subtrees are independent choices
            // dp[i] = total number of ways to construct BST with i nodes
            dp[i] = dp[i] + dp[j]*dp[i-j-1]
        }
    }
    
    // dp[n] contains the number of unique BSTs with n distinct keys
    return dp[n]
}

console.log(countBSTs(0)); // 1
console.log(countBSTs(1)); // 1
console.log(countBSTs(2)); // 2
console.log(countBSTs(3)); // 5
console.log(countBSTs(4)); // 14
console.log(countBSTs(5)); // 42
console.log(countBSTs(6)); // 132

/*🎯 STEP-BY-STEP WALKTHROUGH (n = 4)

We'll build a DP array where dp[i] represents the number of unique BSTs
that can be formed with i distinct keys.

Initialization:
n = 4

Step 1: Base Case
dp[0] = 1 (empty tree, one way)

Current DP array:
dp = [1, 0, 0, 0, 0]

Step 2: Compute dp[1] (1 node)

Try root = 1:
  Left subtree: 0 nodes → dp[0] = 1 way
  Right subtree: 0 nodes → dp[0] = 1 way
  Total: dp[0] × dp[0] = 1 × 1 = 1

dp[1] = 1

Current DP array:
dp = [1, 1, 0, 0, 0]

Step 3: Compute dp[2] (2 nodes)

Try root = 1 (j=0 nodes in left):
  Left subtree: 0 nodes → dp[0] = 1 way
  Right subtree: 1 node → dp[1] = 1 way
  Total: dp[0] × dp[1] = 1 × 1 = 1

Try root = 2 (j=1 node in left):
  Left subtree: 1 node → dp[1] = 1 way
  Right subtree: 0 nodes → dp[0] = 1 way
  Total: dp[1] × dp[0] = 1 × 1 = 1

dp[2] = 1 + 1 = 2

Current DP array:
dp = [1, 1, 2, 0, 0]

Step 4: Compute dp[3] (3 nodes)

Try root = 1 (j=0 nodes in left):
  Left subtree: 0 nodes → dp[0] = 1 way
  Right subtree: 2 nodes → dp[2] = 2 ways
  Total: dp[0] × dp[2] = 1 × 2 = 2

Try root = 2 (j=1 node in left):
  Left subtree: 1 node → dp[1] = 1 way
  Right subtree: 1 node → dp[1] = 1 way
  Total: dp[1] × dp[1] = 1 × 1 = 1

Try root = 3 (j=2 nodes in left):
  Left subtree: 2 nodes → dp[2] = 2 ways
  Right subtree: 0 nodes → dp[0] = 1 way
  Total: dp[2] × dp[0] = 2 × 1 = 2

dp[3] = 2 + 1 + 2 = 5

Current DP array:
dp = [1, 1, 2, 5, 0]

Step 5: Compute dp[4] (4 nodes)

Try root = 1 (j=0 nodes in left):
  Left subtree: 0 nodes → dp[0] = 1 way
  Right subtree: 3 nodes → dp[3] = 5 ways
  Total: dp[0] × dp[3] = 1 × 5 = 5

Try root = 2 (j=1 node in left):
  Left subtree: 1 node → dp[1] = 1 way
  Right subtree: 2 nodes → dp[2] = 2 ways
  Total: dp[1] × dp[2] = 1 × 2 = 2

Try root = 3 (j=2 nodes in left):
  Left subtree: 2 nodes → dp[2] = 2 ways
  Right subtree: 1 node → dp[1] = 1 way
  Total: dp[2] × dp[1] = 2 × 1 = 2

Try root = 4 (j=3 nodes in left):
  Left subtree: 3 nodes → dp[3] = 5 ways
  Right subtree: 0 nodes → dp[0] = 1 way
  Total: dp[3] × dp[0] = 5 × 1 = 5

dp[4] = 5 + 2 + 2 + 5 = 14

Final DP array:
dp = [1, 1, 2, 5, 14]

🏆 Result: dp[4] = 14

✅ Number of unique BSTs with 4 distinct keys = 14

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Catalan Numbers
- This problem is equivalent to finding the nth Catalan number
- Catalan numbers: C(n) = (2n)! / ((n+1)! * n!)
- Sequence: 1, 1, 2, 5, 14, 42, 132, 429, ...

Why Catalan Numbers?
- For each root, we split nodes into left and right subtrees
- Number of ways = product of left and right ways
- Sum over all possible root positions
- This matches the Catalan number recurrence

Algorithm Steps:
1. Initialize dp[0] = 1 (base case: empty tree)
2. For each i from 1 to n:
   a. For each j from 0 to i-1 (left subtree size):
      - Left subtree: j nodes → dp[j] ways
      - Right subtree: i-j-1 nodes → dp[i-j-1] ways
      - Add dp[j] × dp[i-j-1] to dp[i]
3. Return dp[n]

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: n iterations (i from 1 to n)
- Inner loop: up to n iterations (j from 0 to i-1)
- Each iteration: O(1) operations
- Total: O(n²)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP array: O(n)
- No additional space needed
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Zero Nodes
Input: n = 0
dp[0] = 1 ✓ (empty tree, one way)

CASE 2: One Node
Input: n = 1
dp[1] = dp[0] × dp[0] = 1 × 1 = 1 ✓

CASE 3: Two Nodes
Input: n = 2
dp[2] = dp[0]×dp[1] + dp[1]×dp[0] = 1×1 + 1×1 = 2 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Number of BSTs with i nodes depends on number of BSTs with
     smaller numbers of nodes (left and right subtrees)
   - Optimal solution contains optimal solutions to subproblems

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP array
   - No recalculation needed

3️⃣ MULTIPLICATION PRINCIPLE:
   - Left and right subtrees are independent
   - Total ways = left ways × right ways
   - Sum over all root positions

4️⃣ CORRECTNESS:
   - Base case handles empty tree correctly
   - All root positions are considered
   - Recurrence relation is correct

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Considers all possible root positions: ✓
- Handles empty subtrees correctly: ✓
- Multiplies independent choices: ✓
- Sums over all possibilities: ✓
- Base case is correct: ✓
- Guarantees correct count: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2: Initialize DP array
  - Create array of size n+1
  - Fill with 0 initially

Line 6: Set base case
  - dp[0] = 1 (empty tree)

Line 8: Outer loop
  - For each i from 1 to n (number of nodes)

Line 9: Inner loop
  - For each j from 0 to i-1 (left subtree size)

Line 13: Update DP
  - dp[i] += dp[j] × dp[i-j-1]
  - Multiply because independent choices
  - Sum over all root positions

Line 17: Return result
  - dp[n] contains number of unique BSTs

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Combinatorial problems
- Tree structure counting
- Algorithm design
- Mathematical sequences
- Data structure analysis

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Count BSTs with n Keys (this problem)
- Unique Binary Search Trees (LeetCode)
- Catalan Numbers
- Count Binary Trees
- Count Full Binary Trees

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ CATALAN NUMBERS:
   - This problem is the Catalan number sequence
   - C(n) = (2n)! / ((n+1)! * n!)
   - Appears in many combinatorial problems

2️⃣ MULTIPLICATION PRINCIPLE:
   - Left and right subtrees are independent
   - Total ways = left ways × right ways
   - This is why we multiply

3️⃣ ROOT POSITION:
   - Try each node as root
   - Split remaining nodes into left and right
   - Sum over all root positions

4️⃣ BASE CASE:
   - dp[0] = 1 (empty tree)
   - Critical for recurrence to work
   - Represents one way to have empty subtree

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `n`: Number of distinct keys (nodes)
- `dp[i]`: Number of unique BSTs with i distinct keys
- `i`: Current number of nodes we're computing
- `j`: Number of nodes in left subtree (0 to i-1)

─────────────────────────────────────────

🎯 CONCLUSION:
Count BSTs with n Keys using DP Tabulation efficiently finds the number of
unique BSTs by building a DP array bottom-up, trying each node as root,
splitting into left and right subtrees, multiplying independent choices, and
summing over all root positions. This achieves O(n²) time complexity and
O(n) space complexity. The result is the nth Catalan number!
*/