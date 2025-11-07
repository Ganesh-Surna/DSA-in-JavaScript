/* Problem: ✅✅✅✅ Check if Subtree (Unique Values Only) ✅✅✅✅

Given two binary trees T (main tree) and S (subtree candidate) where all node values are unique, check if S is a subtree of T. This is an optimized approach that leverages the uniqueness constraint.

Subtree definition:
- S is a subtree of T if there exists a node n in T such that the subtree rooted at n is identical to S
- "Identical" means same structure and same node values
- CONSTRAINT: All node values are UNIQUE (no duplicates)

Optimization with unique values:
- Since values are unique, finding S's root value in T gives us the ONLY potential subtree location
- No need to check multiple nodes - just find the matching root and verify identity
- This reduces unnecessary comparisons compared to duplicate-allowed version

You are given the roots of two binary trees T and S where all values are unique. Return true if S is a subtree of T, false otherwise.

Example 1:
Input: 
T:       1              S:     2
        / \                   / \
       2   3                 4   5
      / \
     4   5

Output: true
Explanation: Find node with value 2 in T, then verify subtree is identical to S.

Example 2:
Input:
T:       1              S:     2
        /                     / \
       2                     4   5
      /
     4

Output: false
Explanation: Node 2 found in T, but its subtree structure differs from S.

Example 3:
Input:
T:       1              S:     6
        / \
       2   3

Output: false
Explanation: Value 6 not found in T, so S cannot be a subtree.

Example 4:
Input:
T:       5              S:     5
        / \                   / \
       3   8                 3   8
      / \                   / \
     1   4                 1   4

Output: true
Explanation: T and S are identical, so S is a subtree of T.

⚠️ IMPORTANT LIMITATION:
This approach ONLY works when all node values are UNIQUE.
If duplicates exist, it will give INCORRECT results because it stops at the first matching node.

Example of FAILURE with duplicates:
T:       1
        / \
       2   3
      /   / \
     4   2   4  ← Second node with value 2
        / \
       4   5  ← This subtree matches S!

S:       2
        / \
       4   5

Output: false (WRONG!)
Explanation: Finds first node 2 (left child of 1), but that subtree doesn't match.
The algorithm stops there and never checks the second node 2 (under node 3).
Expected: true (because second node 2 has matching subtree)

Constraints:
- 1 <= Number of nodes in T <= 10^3
- 1 <= Number of nodes in S <= 10^3
- 1 <= Node values <= 10^4
- ALL NODE VALUES ARE UNIQUE (critical constraint)

Expected Complexities:
Time Complexity: O(M+N) - O(M) to find node + O(N) to verify identity
Auxiliary Space: O(h) - recursion stack depth
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// Optimized Approach for Unique Values (Find Root Once + Verify Identity)
// ✅ TC = O(M+N) --> O(M) to find S's root in T + O(N) to verify identity
// ✅ SC = O(h) --> O(h) for recursion stack (both findNode and isIdentical)
function isSubTreeUnique(T, S) {
    if (!T || !S) return false;

    // Step 1: Find the node in T with same value as S.root
    const target = findNode(T, S.data);
    if (!target) return false;

    // Step 2: Compare the subtrees starting from there
    return isIdentical(target, S);
}

// Helper function
function findNode(root, value) {
    if (!root) return null;
    if (root.data === value) return root;
    return findNode(root.left, value) || findNode(root.right, value);
}
// Helper function
function isIdentical(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.data !== b.data) return false;
    return isIdentical(a.left, b.left) && isIdentical(a.right, b.right);
}

// ✅ TEST CASE 1: Unique values - Works correctly
let T1 = new TreeNode(1)
T1.left = new TreeNode(2)
T1.right = new TreeNode(3)
T1.left.left = new TreeNode(4)
T1.left.right = new TreeNode(5)

let S1 = new TreeNode(2)
S1.left = new TreeNode(4)
S1.right = new TreeNode(5)

console.log("Test 1 (Unique values):", isSubTreeUnique(T1, S1)) // Output: true ✓

// ❌ TEST CASE 2: Duplicate values - FAILS (demonstrates limitation)
// ⚠️ This test shows why this approach ONLY works with unique values
let T2 = new TreeNode(1);
T2.left = new TreeNode(2);
T2.right = new TreeNode(3);
T2.left.left = new TreeNode(4);
T2.right.left = new TreeNode(2);  // ← Duplicate value 2
T2.right.right = new TreeNode(7);
T2.right.left.left = new TreeNode(6);
T2.right.left.right = new TreeNode(8);

let S2 = new TreeNode(2);
S2.left = new TreeNode(6);
S2.right = new TreeNode(8);

console.log("Test 2 (Duplicate values):", isSubTreeUnique(T2, S2)) 
// Output: false ❌ (WRONG! Finds first node 2, doesn't check second node 2)
// Expected: true (second node 2 has matching subtree)

/*🎯 CORE IDEA: Optimized subtree check for trees with unique values. 
Since all values are unique, S's root value appears at MOST ONCE in T, 
so we can find that single node and directly verify if its subtree is identical to S, 
avoiding the need to check multiple nodes like in the duplicate-allowed version.

📋 STEP-BY-STEP FLOW:

1️⃣ UNIQUENESS OPTIMIZATION:
   - All node values are unique (guaranteed)
   - S's root value exists at most once in T
   - Find that single node and verify identity
   - No need to search multiple potential matches

2️⃣ ALGORITHM STEPS:
   - Step 1: Find node in T with S's root value
   - Step 2: If not found, return false
   - Step 3: If found, verify subtree is identical to S
   - Step 4: Return identity check result

3️⃣ FIND NODE OPERATION:
   - DFS traversal of T
   - Search for node with specific value
   - Return first matching node (only one exists)
   - O(M) time worst case

4️⃣ IDENTITY VERIFICATION:
   - Compare two trees node by node
   - Check structure and values match
   - Recursive comparison
   - O(N) time where N is size of S

🧠 WHY THIS APPROACH?
- Uniqueness allows single search
- More efficient than checking all nodes
- O(M+N) time vs O(M*N) for duplicates
- Simple two-phase algorithm
- Leverages problem constraint

💡 KEY INSIGHTS:
- Uniqueness constraint enables optimization
- Single findNode call sufficient
- No need to check multiple candidates
- Faster than general subtree check
- CRITICAL: Only works with unique values

⚠️ LIMITATION:
- ONLY works when values are unique
- FAILS with duplicate values
- Stops at first matching value
- Doesn't check other occurrences
- Use duplicate-allowed version for general case
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Successful Subtree Match (Unique Values)

INPUT:
T:       1              S:     2
        / \                   / \
       2   3                 4   5
      / \
     4   5

OUTPUT: true

🎯 GOAL: Find node with value 2 in T, then verify its subtree matches S!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Check null conditions
T = 1 (not null), S = 2 (not null) → continue

─────────────────────────────────────────

STEP 2: Find node in T with S's root value (2)
Call: findNode(T, 2)

FIND NODE TRAVERSAL:

Visit node 1:
1.data = 1, looking for 2 → NOT MATCH
Continue search: findNode(1.left, 2) || findNode(1.right, 2)

Visit node 2 (left of 1):
2.data = 2, looking for 2 → MATCH! ✓
Return node 2

target = node 2 (found!)

─────────────────────────────────────────

STEP 3: Verify if target found
target = node 2 (not null) → continue

─────────────────────────────────────────

STEP 4: Check if subtree rooted at target is identical to S
Call: isIdentical(target, S)
Call: isIdentical(node 2 from T, node 2 from S)

IDENTITY CHECK:

CHECK 1: Compare root nodes
a = 2, b = 2
a.data === b.data → 2 === 2 → TRUE ✓

CHECK 2: Compare left subtrees
isIdentical(4 from T, 4 from S)
  4.data === 4.data → TRUE ✓
  4.left = null, 4.left = null → TRUE ✓
  4.right = null, 4.right = null → TRUE ✓
  Return TRUE

CHECK 3: Compare right subtrees
isIdentical(5 from T, 5 from S)
  5.data === 5.data → TRUE ✓
  5.left = null, 5.left = null → TRUE ✓
  5.right = null, 5.right = null → TRUE ✓
  Return TRUE

BACK TO CHECK 1:
Left subtree: TRUE
Right subtree: TRUE
Return TRUE && TRUE = TRUE

─────────────────────────────────────────

🏆 FINAL RESULT: true
S is a subtree of T (subtree rooted at node 2 in T matches S)

─────────────────────────────────────────

📊 EXAMPLE 2: Non-Matching Subtree (Unique Values)

INPUT:
T:       1              S:     2
        /                     / \
       2                     4   5
      /
     4

OUTPUT: false

🔍 STEP-BY-STEP PROCESS:

STEP 1: Check null conditions
T = 1, S = 2 → continue

STEP 2: Find node in T with value 2
findNode(T, 2):
  Visit 1 → not match
  Visit 2 (left) → MATCH!
  Return node 2

target = node 2

STEP 3: Verify identity
isIdentical(node 2 from T, node 2 from S):
  2.data === 2.data → TRUE ✓
  
  Left subtrees:
  isIdentical(4 from T, 4 from S):
    4.data === 4.data → TRUE ✓
    4.left = null, 4.left = null → TRUE ✓
    4.right = null, 4.right = null → TRUE ✓
    Return TRUE
  
  Right subtrees:
  isIdentical(null from T, 5 from S):
    a = null, b = 5 (not null)
    One is null, another is not → FALSE ❌

  Return TRUE && FALSE = FALSE

🏆 FINAL RESULT: false
Structure mismatch: T's node 2 has no right child, S's node 2 has right child 5

─────────────────────────────────────────

📊 EXAMPLE 3: Value Not Found (Unique Values)

INPUT:
T:       1              S:     6
        / \
       2   3

OUTPUT: false

🔍 STEP-BY-STEP PROCESS:

STEP 1: Check null conditions
T = 1, S = 6 → continue

STEP 2: Find node in T with value 6
findNode(T, 6):
  Visit 1 → 1 ≠ 6
  Visit 2 → 2 ≠ 6
  Visit 3 → 3 ≠ 6
  All nodes checked, value 6 not found
  Return null

target = null

STEP 3: Check if target found
target = null → return false immediately

🏆 FINAL RESULT: false
S's root value (6) doesn't exist in T, so S cannot be subtree

─────────────────────────────────────────

📊 EXAMPLE 4: FAILURE with Duplicate Values ❌

INPUT:
T:       1
        / \
       2   3
      /   / \
     4   2   7  ← Second node with value 2
        / \
       6   8    ← This subtree matches S!

S:       2
        / \
       6   8

EXPECTED OUTPUT: true
ACTUAL OUTPUT: false ❌

🔍 WHY IT FAILS:

STEP 1: Find node with value 2
findNode(T, 2):
  Visit 1 → not match
  Visit 2 (left of 1) → MATCH! ✓
  Return node 2 (STOPS HERE)

target = first node 2 (left child of 1)

⚠️ PROBLEM: findNode returns the FIRST matching node
The second node 2 (under node 3) is NEVER checked!

STEP 2: Verify identity of FIRST node 2
isIdentical(first node 2, S):
  Structure comparison:
  T's first node 2:     S:
       2                2
      /                / \
     4                6   8
  
  Right child mismatch:
  T's node 2 has null right child
  S's node 2 has right child 8
  Return FALSE

🏆 RESULT: false (WRONG!)

✅ CORRECT ANSWER: true (second node 2 has matching subtree)

💡 ROOT CAUSE:
The algorithm stops at the FIRST matching value.
It never checks if OTHER occurrences of the value have matching subtrees.
This is why it ONLY works with UNIQUE values!

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

SUCCESSFUL CASE (Unique Values):
T:       1              S:     2
        / \                   / \
       2   3                 4   5
      / \
     4   5

Step 1: Search for value 2 in T
       1
      / \
   →[2]  3  ← Found node 2!
    / \
   4   5

Step 2: Compare subtree rooted at 2 with S
   T's subtree:    S:
       2            2
      / \          / \
     4   5        4   5
   ✓ IDENTICAL!

Result: TRUE ✓

─────────────────────────────────────────

FAILURE CASE (Duplicate Values):
T:       1
        / \
       2   3
      /   / \
     4  [2]  7  ← This node 2 matches S!
        / \
       6   8

S:       2
        / \
       6   8

Algorithm behavior:
       1
      / \
   →[2]  3    ← Finds FIRST node 2, checks it
    /   / \
   4   2   7  ← NEVER checks second node 2!
      / \
     6   8

First node 2's subtree:    S:
       2                    2
      /                    / \
     4                    6   8
   ✗ NOT IDENTICAL

Result: FALSE ❌ (WRONG! Should be TRUE)

─────────────────────────────────────────

📊 COMPARISON: Unique vs Duplicate Approaches

UNIQUE VALUES APPROACH (This implementation):
- Find S's root value once in T
- Verify identity at that single location
- TC: O(M+N) - efficient
- SC: O(h) - optimal
- ✅ Works: Unique values guaranteed
- ❌ Fails: Duplicate values present

DUPLICATE VALUES APPROACH (General solution):
- Check EVERY node in T as potential match
- For each node, verify if subtree is identical to S
- TC: O(M*N) - slower
- SC: O(h) - same space
- ✅ Works: All cases (unique or duplicate)
- ✅ Robust: No constraint required

─────────────────────────────────────────

🔍 WHY UNIQUENESS MATTERS:

WITH UNIQUE VALUES:
- Each value appears AT MOST ONCE
- Finding value → unique location
- Single check sufficient
- Optimization is SAFE

Example:
T: 1→2→4, 1→3→5 (all unique)
S: 2→4
Search for 2: Only ONE node 2
Check that ONE location: Efficient ✓

WITH DUPLICATE VALUES:
- Same value can appear MULTIPLE times
- Finding value → returns FIRST occurrence
- Other occurrences IGNORED
- Optimization is UNSAFE

Example:
T: 1→2→4, 1→3→2→5 (two nodes with value 2)
S: 2→5
Search for 2: Returns FIRST node 2 (left)
Checks first 2: Structure doesn't match
NEVER checks second 2: Would have matched!
Result: FALSE (should be TRUE) ❌

─────────────────────────────────────────

📊 ALGORITHM TRACE:

FUNCTION CALLS for Example 1:

isSubTreeUnique(T=1, S=2):
  ├─ findNode(T=1, value=2):
  │   ├─ Visit node 1: 1 ≠ 2
  │   ├─ findNode(T.left=2, value=2):
  │   │   └─ Visit node 2: 2 === 2 ✓ Return node 2
  │   └─ Return node 2
  │
  ├─ target = node 2
  │
  └─ isIdentical(target=2, S=2):
      ├─ 2.data === 2.data ✓
      ├─ isIdentical(left=4, left=4):
      │   ├─ 4.data === 4.data ✓
      │   ├─ isIdentical(null, null): TRUE
      │   └─ isIdentical(null, null): TRUE
      │   └─ Return TRUE
      ├─ isIdentical(right=5, right=5):
      │   ├─ 5.data === 5.data ✓
      │   ├─ isIdentical(null, null): TRUE
      │   └─ isIdentical(null, null): TRUE
      │   └─ Return TRUE
      └─ Return TRUE

Result: TRUE

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: T is null
Input: T = null, S = 2→4→5
Output: false
Explanation: Null check at start returns false

CASE 2: S is null
Input: T = 1→2→3, S = null
Output: false
Explanation: Null check at start returns false

CASE 3: Both null
Input: T = null, S = null
Output: false
Explanation: Null check returns false
Note: Could argue empty tree is subtree of empty tree (true)

CASE 4: T and S identical
Input: T = S = 1→2→3
findNode: Finds root (value 1)
isIdentical: Returns true (identical trees)
Output: true

CASE 5: S's root not in T
Input: T = 1→2→3, S = 5→6
findNode: Returns null (value 5 not found)
Output: false

CASE 6: Value found but structure differs
Input: T = 1→2, S = 2→4→5
findNode: Finds node 2
isIdentical: Structure mismatch
Output: false

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS (FOR UNIQUE VALUES):

1️⃣ UNIQUENESS GUARANTEE:
   - Each value exists at most once in T
   - Finding S's root → unique location
   - No other locations to check
   - Single verification sufficient

2️⃣ TWO-PHASE ALGORITHM:
   - Phase 1: Find potential root (O(M))
   - Phase 2: Verify identity (O(N))
   - Total: O(M+N) - optimal

3️⃣ EARLY TERMINATION:
   - If value not found → immediate false
   - If value found but structure differs → false
   - Only true when perfect match exists

4️⃣ CORRECTNESS:
   - Finds correct node (only one exists)
   - Verifies complete structural match
   - Handles all edge cases
   - Returns correct result (for unique values)

5️⃣ EFFICIENCY:
   - Single search for root: O(M)
   - Single identity check: O(N)
   - No redundant comparisons
   - Better than O(M*N) general approach

💡 KEY INSIGHT:
For trees with unique values, finding S's root value in T gives us the
ONLY location where S could be a subtree, allowing us to skip checking
all other nodes and directly verify identity at that single location,
achieving O(M+N) time complexity instead of O(M*N)!

🎯 TIME COMPLEXITY ANALYSIS:
- findNode: O(M) - traverse entire T in worst case
- isIdentical: O(N) - compare all nodes in S
- Total: O(M) + O(N) = O(M+N)
- Comparison: O(M+N) vs O(M*N) for duplicate approach
- Significant improvement for large trees

🎯 SPACE COMPLEXITY ANALYSIS:
- findNode recursion: O(h) where h is height of T
- isIdentical recursion: O(h) where h is height of S
- Both use call stack, but not simultaneously
- Total: O(h) for recursion stack
- No additional data structures needed

🎯 COMPLEXITY SUMMARY:
✅ TC = O(M+N) - linear time
✅ SC = O(h) - logarithmic space for balanced trees
✅ Better than general O(M*N) approach
❌ Only works with unique values

🎯 EDGE CASES HANDLED:
- Null trees: Checked at start
- Value not found: findNode returns null
- Structure mismatch: isIdentical catches
- Identical trees: Works correctly
- Single node trees: Handled properly

🎯 ALGORITHM CORRECTNESS (FOR UNIQUE VALUES):
- Finds correct node (uniqueness ensures only one)
- Verifies complete identity (structure + values)
- Returns true only for exact subtree match
- Handles all edge cases properly
- Optimal time complexity O(M+N)

🎯 IMPLEMENTATION DETAILS:
- findNode: DFS to find specific value
- isIdentical: Recursive structure comparison
- Two-phase approach: find then verify
- Clear separation of concerns
- Easy to understand and debug

🎯 WHY SEPARATE FUNCTIONS:
- findNode: Single responsibility (search)
- isIdentical: Single responsibility (compare)
- Reusable helper functions
- Clear logic flow
- Easy to test independently

🎯 OPTIMIZATION RATIONALE:
- Uniqueness constraint enables optimization
- No need to check multiple locations
- Single search sufficient
- Avoids redundant comparisons
- Achieves better time complexity

🎯 LIMITATION ANALYSIS:
- CRITICAL: Only works with unique values
- Fails silently with duplicates
- No error indication
- Returns wrong answer (false negative)
- Must use general approach for duplicates

🎯 WHEN TO USE THIS APPROACH:
✅ Use when: Values guaranteed unique
✅ Use when: Need optimal O(M+N) time
✅ Use when: Simple two-phase logic preferred
❌ Don't use: Duplicates possible
❌ Don't use: No uniqueness guarantee
❌ Don't use: General solution needed

🎯 ALTERNATIVE APPROACHES:
1. General O(M*N): Works with duplicates
2. String matching O(M+N): Works with duplicates
3. Hash-based: Can optimize further
4. This approach: Best for unique values only

🎯 REAL-WORLD APPLICATIONS:
- Trees with unique IDs (databases)
- File systems with unique paths
- Organization charts with unique employee IDs
- Network topologies with unique node IDs
- Any hierarchical data with unique identifiers

🎯 COMPARISON WITH GENERAL APPROACH:

GENERAL APPROACH (Duplicates Allowed):
- Check EVERY node in T
- For each node, verify identity
- TC: O(M*N)
- SC: O(h)
- Works: All cases

THIS APPROACH (Unique Values):
- Find S's root value ONCE
- Verify identity at that location
- TC: O(M+N)
- SC: O(h)
- Works: Only unique values

🎯 PERFORMANCE DIFFERENCE:
Example: M=1000, N=100
General: 1000 × 100 = 100,000 operations
This: 1000 + 100 = 1,100 operations
Speedup: ~90x faster!

🎯 TESTING STRATEGY:
- Test with unique values (should pass)
- Test with duplicates (will fail - document)
- Test value not found
- Test structure mismatch
- Test identical trees
- Test null cases

🎯 DEBUGGING TIPS:
- Print found node location
- Trace findNode path
- Verify identity check logic
- Check for duplicate values
- Confirm uniqueness constraint

🎯 COMMON MISTAKES:
- Using with duplicate values (wrong results)
- Not checking null cases
- Incorrect identity verification
- Missing edge case handling
- Assuming works for all cases

🎯 BEST PRACTICES:
- Document uniqueness requirement clearly
- Add assertion for uniqueness if possible
- Use general approach when in doubt
- Test thoroughly with unique values
- Warn about duplicate limitation

🎯 INTERVIEW TIPS:
- Explain uniqueness constraint first
- Discuss why optimization works
- Show O(M+N) vs O(M*N) comparison
- Mention limitation with duplicates
- Code both approaches if time allows

🎯 CONCLUSION:
The optimized subtree check for unique values leverages the uniqueness
constraint to find S's root value once in T and verify identity at that
single location, achieving O(M+N) time complexity instead of O(M*N), but
this optimization ONLY works when all node values are guaranteed unique
and will give incorrect results if duplicate values exist!
*/