/* Problem: ✅✅✅✅ Check if Two Binary Trees are Identical ✅✅✅✅

Given the roots of two binary trees, check if they are identical. Two binary trees are considered identical if they have the same structure and the same node values at corresponding positions.

Two binary trees are identical if:
1. Both trees have the same structure (shape)
2. Corresponding nodes have the same values
3. This property holds for all nodes in both trees

You are given the roots of two binary trees r1 and r2. The task is to determine if they are structurally and value-wise identical.

Example 1:
Input: 
r1:        1           r2:        1
          / \                    / \
         2   3                  2   3
        /                      /
       4                      4

Output: true
Explanation: Both trees have identical structure and values at all corresponding nodes.

Example 2:
Input:
r1:        1           r2:        1
          / \                    / \
         2   3                  2   3
        /                        \
       4                          4

Output: false
Explanation: Trees have different structures. Node 4 is left child in r1 but right child in r2.

Example 3:
Input:
r1:        1           r2:        1
          / \                    / \
         2   3                  2   5

Output: false
Explanation: Same structure but different values (3 vs 5).

Example 4:
Input:
r1: null            r2: null

Output: true
Explanation: Both trees are empty, so they are identical.

Example 5:
Input:
r1:        1           r2: null

Output: false
Explanation: One tree exists, the other doesn't.

Constraints:
- The number of nodes in both trees is in the range [0, 10^4]
- -1000 <= Node.val <= 1000

Expected Complexities:
Time Complexity: O(n) - where n is the number of nodes in the smaller tree
Auxiliary Space: O(h) - for recursion stack, where h is the height
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n), ✅ SC = O(h)
function isIdentical(r1, r2) {
    // If both are null → identical
    if (!r1 && !r2) return true;

    // If one is null and the other isn’t → not identical (from above condition we know that either r1 or r2 is not null, or both r1 & r2 are not null)
    if (!r1 || !r2) return false;

    // If data doesn’t match → not identical
    if (r1.data !== r2.data) return false;

    // Recurse for both left and right subtrees
    return this.isIdentical(r1.left, r2.left) && this.isIdentical(r1.right, r2.right);
}

let r1 = new TreeNode(1)
r1.left = new TreeNode(2)
r1.right = new TreeNode(3)
r1.left.left = new TreeNode(4)

let r2 = new TreeNode(1)
r2.left = new TreeNode(2)
r2.right = new TreeNode(3)
r2.left.left = new TreeNode(4)

console.log(isIdentical(r1, r2)) // true

/*🎯 CORE IDEA: Use recursive comparison to check if two binary trees are identical. Compare roots for null cases and value equality, then recursively check if left and right subtrees are identical. Return true only if current nodes match AND both left and right subtrees are identical.

📋 STEP-BY-STEP FLOW:

1️⃣ BASE CASES:
   - If both nodes are null: return true (both empty)
   - If one is null and other isn't: return false (different structure)
   - If values don't match: return false (different values)

2️⃣ RECURSIVE COMPARISON:
   - Check if left subtrees are identical
   - Check if right subtrees are identical
   - Return true only if both subtrees are identical

3️⃣ STRUCTURE CHECK:
   - Same structure means same shape
   - Corresponding nodes must exist in both trees
   - Null positions must match

4️⃣ VALUE CHECK:
   - Corresponding nodes must have same values
   - All nodes must match, not just some
   - Complete tree-wide comparison

🧠 WHY THIS APPROACH?
- Recursion naturally handles tree structure comparison
- Base cases handle null nodes and mismatches efficiently
- Early termination on first mismatch
- O(n) time complexity with single traversal
- Simple and intuitive logic

💡 KEY INSIGHTS:
- Both null means identical subtrees
- One null means different structure
- Value mismatch means not identical
- Both subtrees must be identical for trees to be identical
- Early termination on any mismatch
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Check if Two Trees are Identical

INPUT: Two Binary Trees
r1:        1           r2:        1
          / \                    / \
         2   3                  2   3
        /                      /
       4                      4

OUTPUT: true
EXPLANATION: Both trees have identical structure and node values.

🎯 GOAL: Check if two binary trees are structurally and value-wise identical!

🔍 RECURSIVE ALGORITHM - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: isIdentical(r1, r2) where r1 and r2 are roots (both with value 1)

📋 RECURSIVE COMPARISON:

CALL 1: isIdentical(1, 1) - Compare Roots
Step 1: Check if both null
r1 = 1, r2 = 1 → neither is null → continue

Step 2: Check if one is null
r1 = 1, r2 = 1 → both exist → continue

Step 3: Check if values match
r1.data = 1, r2.data = 1 → match → continue

Step 4: Recurse on left subtrees
left_identical = isIdentical(2, 2)

CALL 2: isIdentical(2, 2) - Compare Left Children
Step 1: Check if both null
r1 = 2, r2 = 2 → neither is null → continue

Step 2: Check if one is null
r1 = 2, r2 = 2 → both exist → continue

Step 3: Check if values match
r1.data = 2, r2.data = 2 → match → continue

Step 4: Recurse on left subtrees
left_identical = isIdentical(4, 4)

CALL 3: isIdentical(4, 4) - Compare Leaf Nodes
Step 1: Check if both null
r1 = 4, r2 = 4 → neither is null → continue

Step 2: Check if one is null
r1 = 4, r2 = 4 → both exist → continue

Step 3: Check if values match
r1.data = 4, r2.data = 4 → match → continue

Step 4: Recurse on left subtrees
left_identical = isIdentical(null, null)

CALL 4: isIdentical(null, null) - Both Null
Step 1: Check if both null
r1 = null, r2 = null → BOTH NULL!
return true

BACK TO CALL 3:
left_identical = true

Step 5: Recurse on right subtrees
right_identical = isIdentical(null, null) → true

Step 6: Return combined result
return true && true = true

BACK TO CALL 2:
left_identical = true

Step 5: Recurse on right subtrees
right_identical = isIdentical(null, null) → true

Step 6: Return combined result
return true && true = true

BACK TO CALL 1:
left_identical = true

Step 5: Recurse on right subtrees
right_identical = isIdentical(3, 3)

CALL 5: isIdentical(3, 3) - Compare Right Children
Step 1: Check if both null
r1 = 3, r2 = 3 → neither is null → continue

Step 2: Check if one is null
r1 = 3, r2 = 3 → both exist → continue

Step 3: Check if values match
r1.data = 3, r2.data = 3 → match → continue

Step 4: Recurse on left subtrees
left_identical = isIdentical(null, null) → true

Step 5: Recurse on right subtrees
right_identical = isIdentical(null, null) → true

Step 6: Return combined result
return true && true = true

BACK TO CALL 1:
right_identical = true

Step 6: Return combined result
return true && true = true

🏆 RESULT: true (Trees are identical)

─────────────────────────────────────────

📊 EXAMPLE: Different Structure

INPUT: Two Binary Trees
r1:        1           r2:        1
          / \                    / \
         2   3                  2   3
        /                        \
       4                          4

OUTPUT: false
EXPLANATION: Node 4 is left child in r1 but right child in r2.

🔍 RECURSIVE PROCESS:

CALL 1: isIdentical(1, 1) - Roots match
left_identical = isIdentical(2, 2)

CALL 2: isIdentical(2, 2) - Values match
left_identical = isIdentical(4, null)

CALL 3: isIdentical(4, null) - Different structure!
Step 1: Check if both null
r1 = 4, r2 = null → NOT both null

Step 2: Check if one is null
r1 = 4 (exists), r2 = null (doesn't exist)
One is null, the other isn't → MISMATCH!
return false

BACK TO CALL 2:
left_identical = false
return false && right_identical = false (early termination)

BACK TO CALL 1:
left_identical = false
return false && right_identical = false

🏆 RESULT: false (Different structure)

─────────────────────────────────────────

📊 EXAMPLE: Different Values

INPUT: Two Binary Trees
r1:        1           r2:        1
          / \                    / \
         2   3                  2   5

OUTPUT: false
EXPLANATION: Node values differ (3 vs 5).

🔍 RECURSIVE PROCESS:

CALL 1: isIdentical(1, 1) - Roots match
left_identical = isIdentical(2, 2) → true
right_identical = isIdentical(3, 5)

CALL 2: isIdentical(3, 5) - Values differ!
Step 1: Check if both null
r1 = 3, r2 = 5 → neither is null → continue

Step 2: Check if one is null
r1 = 3, r2 = 5 → both exist → continue

Step 3: Check if values match
r1.data = 3, r2.data = 5 → MISMATCH!
return false

BACK TO CALL 1:
right_identical = false
return true && false = false

🏆 RESULT: false (Different values)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

COMPARISON PROCESS:

r1:        1           r2:        1
          / \                    / \
         2   3                  2   3
        /                      /
       4                      4

RECURSIVE CALLS:
1. Compare (1, 1) ✓
   ├── Compare (2, 2) ✓
   │   ├── Compare (4, 4) ✓
   │   │   ├── Compare (null, null) ✓
   │   │   └── Compare (null, null) ✓
   │   └── Compare (null, null) ✓
   └── Compare (3, 3) ✓
       ├── Compare (null, null) ✓
       └── Compare (null, null) ✓

ALL CHECKS PASSED → IDENTICAL

EARLY TERMINATION EXAMPLE:

r1:        1           r2:        1
          / \                    / \
         2   3                  2   5

RECURSIVE CALLS:
1. Compare (1, 1) ✓
   ├── Compare (2, 2) ✓
   └── Compare (3, 5) ✗ VALUE MISMATCH!
       STOP HERE → NOT IDENTICAL

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

IDENTICAL TREES:
isIdentical(1,1)
├── isIdentical(2,2)
│   ├── isIdentical(4,4)
│   │   ├── isIdentical(null,null) → true
│   │   └── isIdentical(null,null) → true
│   │   return true
│   └── isIdentical(null,null) → true
│   return true
└── isIdentical(3,3)
    ├── isIdentical(null,null) → true
    └── isIdentical(null,null) → true
    return true
return true

TOTAL CALLS: 7
RESULT: true (all nodes match)

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Both Trees Empty
Input: r1 = null, r2 = null
Check: Both null → return true immediately
Result: true

CASE 2: One Tree Empty
Input: r1 = TreeNode(1), r2 = null
Check: One is null → return false immediately
Result: false

CASE 3: Single Node Trees - Same Value
Input: r1 = TreeNode(1), r2 = TreeNode(1)
Process: Values match, both children null
Result: true

CASE 4: Single Node Trees - Different Values
Input: r1 = TreeNode(1), r2 = TreeNode(2)
Process: Values don't match
Result: false

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RECURSIVE STRUCTURE: Naturally handles tree structure comparison
2️⃣ BASE CASES: Efficiently handle null nodes and mismatches
3️⃣ EARLY TERMINATION: Returns false on first mismatch found
4️⃣ COMPLETE COMPARISON: Checks all nodes and structure
5️⃣ SIMPLE LOGIC: Easy to understand and implement

💡 KEY INSIGHT:
Use recursive comparison with proper base cases to check both structure
and values simultaneously, returning true only when all corresponding
nodes match in both value and structure!

🎯 TIME COMPLEXITY ANALYSIS:
- Best case: O(1) - immediate mismatch at root
- Average case: O(n) - depends on mismatch location
- Worst case: O(n) - all nodes checked (identical trees)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h) where h is tree height
- No extra data structures needed
- Total: O(h) space complexity
- Worst case (skewed tree): O(n)
- Best case (balanced tree): O(log n)

🎯 EDGE CASES HANDLED:
- Both trees empty: Returns true
- One tree empty: Returns false
- Single node trees: Compares values correctly
- Different structures: Returns false immediately
- Different values: Returns false immediately

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to detect any difference
- Checks both structure and values
- Early termination on mismatch
- Complete comparison when identical
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Check both null first (identical empty subtrees)
- Check one null next (structure mismatch)
- Check values before recursion (value mismatch)
- Use AND operator for both subtrees
- Short-circuit evaluation for efficiency

🎯 BASE CASE HANDLING:
- Both null: Identical empty subtrees
- One null: Different structure
- Value mismatch: Different values
- All cases covered properly
- Efficient termination

🎯 RECURSIVE PATTERN:
- Check current nodes first
- Then recurse on children
- Combine results with AND
- Return true only if all match
- Early exit on any mismatch

🎯 COMPARISON STRATEGY:
- Structure comparison via null checks
- Value comparison via data field
- Recursive comparison for subtrees
- Complete tree-wide verification
- Efficient with early termination

🎯 RECURSIVE ADVANTAGES:
- Natural tree structure handling
- Clean and readable code
- Easy to understand logic
- Efficient with short-circuiting
- Handles any tree size

🎯 COMPARISON WITH ALTERNATIVES:
- Iterative approach: More complex with explicit stack
- Level-order: Requires queue, more space
- Serialization: Extra space for strings
- This approach: Optimal simplicity and efficiency

🎯 REAL-WORLD APPLICATIONS:
- File system comparison
- Version control (comparing commits)
- Database structure validation
- Configuration verification
- Data structure testing

🎯 ALGORITHM PATTERN:
- Recursive tree traversal
- Simultaneous comparison
- Early termination
- Base case handling

🎯 MATHEMATICAL PROPERTIES:
- Node comparisons: at most n
- Recursion depth: at most h
- Early termination: fewer comparisons
- Space usage: O(h) for recursion

🎯 ERROR HANDLING:
- Null roots: Handled by base cases
- Invalid structure: Returns false
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF THIS APPROACH:
- Simple and intuitive
- Efficient with early termination
- Optimal space complexity O(h)
- Clean recursive implementation
- Easy to understand and debug

🎯 DISADVANTAGES:
- Recursion stack overhead
- Potential stack overflow for very deep trees
- Not optimal for iterative preference
- Recursion may be harder to debug for beginners

🎯 ALTERNATIVE APPROACHES:
- Iterative with stack: More complex
- Level-order traversal: Extra space
- Serialization comparison: String overhead
- All: Correct but different tradeoffs

🎯 IMPLEMENTATION CONSIDERATIONS:
- Handle null roots explicitly
- Check both null before one null
- Compare values before recursion
- Use AND for combining results
- Short-circuit evaluation

🎯 TESTING STRATEGY:
- Empty trees
- Single node trees
- Identical trees
- Different structures
- Different values
- Various tree sizes

🎯 DEBUGGING TIPS:
- Track recursive calls
- Monitor return values
- Verify base case handling
- Check comparison logic
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for comparison
- Space: O(h) - optimal for recursive approach
- Overall: Efficient and practical
- Scalable: Works well for typical trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Deep trees: Stack depth management
- Memory usage: Proportional to height
- Performance: Efficient with early termination

🎯 BEST PRACTICES:
- Check base cases first
- Compare values before recursion
- Use AND operator correctly
- Write clear readable code
- Test thoroughly

🎯 COMMON MISTAKES:
- Wrong base case order
- Incorrect null handling
- Missing value comparison
- Wrong boolean operator
- Not using short-circuit evaluation

🎯 LEARNING OBJECTIVES:
- Understand tree comparison
- Learn recursive patterns
- Master base case handling
- Practice tree traversal
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain base cases clearly
- Discuss space-time tradeoffs
- Handle edge cases systematically
- Write clean recursive code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Recursive comparison pattern
- Simultaneous structure and value check
- Early termination optimization
- Efficient tree traversal
- Clean problem decomposition

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n in worst case
- Comparisons: n maximum
- Early termination: fewer operations
- Space usage: O(h) for recursion
- Total: O(n) time, O(h) space

🎯 IMPLEMENTATION CHALLENGES:
- Correct base case order
- Proper null handling
- Value comparison logic
- Edge case comprehensive coverage
- Clear recursive structure

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify comparison correctness
- Check edge case handling
- Monitor space usage
- Validate algorithm correctness

🎯 ALGORITHM EVOLUTION:
- Basic approach: Recursive comparison
- Optimized: Early termination
- Alternative: Iterative with stack
- Future: Parallel comparison for large trees

🎯 PRACTICAL APPLICATIONS:
- File system comparison tools
- Version control systems
- Database schema validation
- Configuration management
- Data structure testing frameworks

🎯 OPTIMIZATION OPPORTUNITIES:
- Parallel comparison for large trees
- Iterative version for very deep trees
- Memoization for repeated comparisons
- Early termination on size mismatch
- Cache comparison results

🎯 RELATED PROBLEMS:
- Check if tree is symmetric
- Check if subtree exists
- Compare tree structures only
- Find differences between trees
- Merge two trees

🎯 PROBLEM VARIATIONS:
- Check if trees are mirrors
- Check structural equivalence only
- Check value equivalence only
- Compare with tolerance
- Fuzzy tree matching

🎯 CONCLUSION:
The check identical trees problem demonstrates how to use recursive
comparison with proper base case handling to efficiently verify if two
binary trees are structurally and value-wise identical, achieving O(n)
time complexity and O(h) space complexity with simple and clean
implementation using early termination!
*/
