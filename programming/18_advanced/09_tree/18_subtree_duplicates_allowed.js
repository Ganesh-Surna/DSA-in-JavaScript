/* Problem: ✅✅✅✅ Check if Subtree (Duplicate values allowed) ✅✅✅✅

Given two binary trees T (main tree) and S (subtree candidate), check if S is a subtree of T. 
A subtree of a tree T is a tree S that consists of a node in T and all of its descendants. 
Tree T could also be considered as a subtree of itself.

Subtree definition:
- S is a subtree of T if there exists a node n in T such that the subtree rooted at n is identical to S
- "Identical" means same structure and same node values
- Empty tree is a subtree of any tree
- A tree is always a subtree of itself

You are given the roots of two binary trees T and S. Return true if S is a subtree of T, false otherwise.

Example 1:
Input: 
T:       3              S:     4
        / \                   / \
       4   5                 1   2
      / \
     1   2

Output: true
Explanation: The subtree rooted at node 4 in T is identical to S.

Example 2:
Input:
T:       3              S:     4
        / \                   / \
       4   5                 1   2
      / \
     1   2
        /
       0

Output: false
Explanation: The subtree rooted at 4 in T has an extra child (0 in left of 2), so not identical to S.

Example 3:
Input:
T:       1              S:     2
        / \                   / \
       2   3                 4   5
      / \
     4   5

Output: true
Explanation: The subtree rooted at node 2 in T is identical to S.

Example 4:
Input:
T:       1              S:     1
        /                     /
       2                     2

Output: true
Explanation: T and S are identical, so S is a subtree of T.

Note: The nodes can have duplicate values.

Constraints:
- 1 <= Number of nodes in T <= 10^3
- 1 <= Number of nodes in S <= 10^3
- 1 <= Node values <= 10^4

Expected Complexities:
Time Complexity: O(M*N) for approach 1&2, O(M+N) for approach 3
Auxiliary Space: O(h) for recursion stack
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 1. Using Separate isSubTree and isIdentical Functions (Two Helper Functions Approach)
// ✅ TC = O(M*N), ✅ SC = O(h)
function isSubTree(T, S) {
    if(!T && !S) return true // both are null
    if(!T || !S) return false // one is null , another is not null
    
    if(isIdentical(T, S)) return true // Checking with current root of T
    
    return (isSubTree(T.left, S) || isSubTree(T.right, S)) // If leftSide subtree or rightSide subtree. So ||
}
function isIdentical(a, b){
    if(!a && !b) return true // both are null
    if(!a || !b) return false // one is null , another is not null
    
    if(a.data !== b.data) return false
    
    return isIdentical(a.left, b.left) && isIdentical(a.right, b.right) // Checking for subtree idetical or not. So &&
}


// 2. Using Single Recursive Function with isRootMatched Flag (Search & Match Mode Approach)
// ✅ TC = O(M*N), ✅ SC = O(h)
function isSubTree(T, S) {
    return helper(T, S);

    function helper(T, S, isRootMatched = false) {
        if (!S && !T) return true; // both are null
        if (!S || !T) return false; // one is null , another is not null

        if (isRootMatched && T.data !== S.data) return false; // if root matched and data is not same

        if (T.data === S.data) {
            // try matching subtree
            const left = helper(T.left, S.left, true);
            const right = helper(T.right, S.right, true);
            if (left && right) return true; // if left and right subtree matched
        }

        // try searching in left/right if not already matched
        return helper(T.left, S, false) || helper(T.right, S, false);
    }
}

// 3. Using Preorder Traversal String Serialization with Substring Matching (String Matching Approach)
// ✅ TC = O(M+N) --> O(M) for traversing T + O(N) for traversing S + O(M) for string includes check
// ✅ SC = O(M+N) --> O(M) for storing T's preorder string + O(N) for storing S's preorder string
function isSubTree(T, S) {
    let preT = preorder(T, "");
    let preS = preorder(S, "");

    return preT.includes(preS);
}
function preorder(root, str) {
    if (!root) return str + "N ";
    return str + root.data + " " + preorder(root.left, str) + preorder(root.right, str);
}


let T = new TreeNode(1)
T.left = new TreeNode(2)
T.right = new TreeNode(3)
T.left.left = new TreeNode(4)
T.left.right = new TreeNode(5)

let S = new TreeNode(2)
S.left = new TreeNode(4)
S.right = new TreeNode(5)
// Output: true

console.log(isSubTree(T, S))

/*🎯 CORE IDEA: Three approaches to check if S is a subtree of T: 
(1) For each node in T, check if the subtree rooted at that node is identical to S 
    using separate isIdentical helper function. 
(2) Single recursive function with isRootMatched parameter to track if we're in 
    matching mode or searching mode. 
(3) Convert both trees to preorder traversal strings (with null markers), 
    then check if S's string is a substring of T's string.

📋 STEP-BY-STEP FLOW:

1️⃣ SUBTREE CONCEPT:
   - S is subtree of T if any node in T has identical subtree to S
   - Identical means: same structure + same values
   - Need to search all nodes in T for potential match
   - Once match found, verify complete identity

2️⃣ APPROACH 1 (Separate Functions):
   - Traverse T to find node matching S's root
   - At each node, check if subtree is identical to S
   - Use isIdentical helper to compare two trees
   - Return true if any node matches, false otherwise

3️⃣ APPROACH 2 (Single Function with Flag):
   - Use isRootMatched flag to track matching state
   - When false: search mode (find matching root)
   - When true: match mode (verify complete identity)
   - More efficient with single recursive function

4️⃣ APPROACH 3 (String Matching):
   - Generate preorder strings for both trees
   - Include null markers ("N") for structure
   - Check if S's string is substring of T's string
   - O(M+N) time, faster for multiple queries

🧠 WHY THESE APPROACHES?
- Approach 1: Clear separation of concerns (search vs compare)
- Approach 2: More elegant with single function
- Approach 3: Leverages string matching, optimal time
- All handle duplicate values correctly
- All verify complete structural identity

💡 KEY INSIGHTS:
- Must check all nodes in T as potential subtree roots
- Identity check requires matching structure and values
- Null markers in strings preserve tree structure
- String approach converts tree problem to string problem
- Early termination when match found
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Check if Subtree

INPUT: 
T (Main Tree):          S (Subtree):
       1                     2
      / \                   / \
     2   3                 4   5
    / \
   4   5

OUTPUT: true
EXPLANATION: The subtree rooted at node 2 in T is identical to S.

🎯 GOAL: Find if there exists a node in T whose subtree is identical to S!

🔍 APPROACH 1 (Separate Functions) - STEP-BY-STEP PROCESS:

📋 MAIN FUNCTION: isSubTree(T, S)

CALL 1: isSubTree(1, 2)
Step 1: Check null conditions
T = 1, S = 2 (both not null) → continue

Step 2: Check if current node's subtree is identical to S
isIdentical(1, 2)?
  1.data = 1, 2.data = 2 → NOT EQUAL
  Return false

Step 3: Search in left and right subtrees
return isSubTree(T.left, S) || isSubTree(T.right, S)
return isSubTree(2, 2) || isSubTree(3, 2)

─────────────────────────────────────────

CALL 2: isSubTree(2, 2) [LEFT SUBTREE]
Step 1: Check null conditions
T = 2, S = 2 (both not null) → continue

Step 2: Check if current node's subtree is identical to S
isIdentical(2, 2)?

📋 IDENTITY CHECK: isIdentical(2, 2)

CALL 1: isIdentical(2, 2)
Step 1: Check null
Both not null → continue

Step 2: Check data
2.data === 2.data → TRUE

Step 3: Check left and right subtrees
return isIdentical(2.left, 2.left) && isIdentical(2.right, 2.right)
return isIdentical(4, 4) && isIdentical(5, 5)

CALL 2: isIdentical(4, 4)
4.data === 4.data → TRUE
4.left = null, 4.left = null → TRUE
4.right = null, 4.right = null → TRUE
Return TRUE

CALL 3: isIdentical(5, 5)
5.data === 5.data → TRUE
5.left = null, 5.left = null → TRUE
5.right = null, 5.right = null → TRUE
Return TRUE

BACK TO CALL 1: isIdentical(2, 2)
Left: TRUE, Right: TRUE
Return TRUE && TRUE = TRUE

BACK TO isSubTree(2, 2):
isIdentical returned TRUE
🏆 MATCH FOUND! Return TRUE

─────────────────────────────────────────

🏆 APPROACH 1 RESULT: true
(Found matching subtree at node 2 in T)

─────────────────────────────────────────

🔍 APPROACH 2 (Single Function with Flag) - STEP-BY-STEP PROCESS:

📋 RECURSIVE CALLS WITH isRootMatched FLAG:

CALL 1: helper(1, 2, isRootMatched=false) [SEARCH MODE]
Step 1: Check null
Both not null → continue

Step 2: Check if root already matched
isRootMatched = false → skip this check

Step 3: Check if data matches
1.data === 2.data? → FALSE (1 ≠ 2)

Step 4: Data doesn't match, search in subtrees
return helper(1.left, 2, false) || helper(1.right, 2, false)
return helper(2, 2, false) || helper(3, 2, false)

─────────────────────────────────────────

CALL 2: helper(2, 2, isRootMatched=false) [SEARCH MODE]
Step 1: Check null
Both not null → continue

Step 2: Check if root already matched
isRootMatched = false → skip

Step 3: Check if data matches
2.data === 2.data? → TRUE ✓

Step 4: Data matches! Try matching entire subtree
const left = helper(2.left, 2.left, true)  // MATCH MODE
const right = helper(2.right, 2.right, true)  // MATCH MODE

CALL 3: helper(4, 4, isRootMatched=true) [MATCH MODE]
Step 1: Check null
Both not null → continue

Step 2: Check if root matched and data differs
isRootMatched = true, 4.data === 4.data → OK

Step 3: Check if data matches
4.data === 4.data? → TRUE ✓

Step 4: Try matching subtrees
const left = helper(null, null, true) → TRUE
const right = helper(null, null, true) → TRUE
if (left && right) return TRUE ✓

CALL 4: helper(5, 5, isRootMatched=true) [MATCH MODE]
Step 1: Check null
Both not null → continue

Step 2: Check if root matched and data differs
isRootMatched = true, 5.data === 5.data → OK

Step 3: Check if data matches
5.data === 5.data? → TRUE ✓

Step 4: Try matching subtrees
const left = helper(null, null, true) → TRUE
const right = helper(null, null, true) → TRUE
if (left && right) return TRUE ✓

BACK TO CALL 2:
left = TRUE, right = TRUE
if (left && right) return TRUE
🏆 COMPLETE MATCH! Return TRUE

─────────────────────────────────────────

🏆 APPROACH 2 RESULT: true

─────────────────────────────────────────

🔍 APPROACH 3 (String Matching) - STEP-BY-STEP PROCESS:

📋 STEP 1: Generate Preorder String for T

PREORDER TRAVERSAL OF T:
Visit 1: str = "1 "
  Visit 2: str = "1 2 "
    Visit 4: str = "1 2 4 "
      Visit null: str = "1 2 4 N "
      Visit null: str = "1 2 4 N N "
    Visit 5: str = "1 2 4 N N 5 "
      Visit null: str = "1 2 4 N N 5 N "
      Visit null: str = "1 2 4 N N 5 N N "
  Visit 3: str = "1 2 4 N N 5 N N 3 "
    Visit null: str = "1 2 4 N N 5 N N 3 N "
    Visit null: str = "1 2 4 N N 5 N N 3 N N "

preT = "1 2 4 N N 5 N N 3 N N "

─────────────────────────────────────────

📋 STEP 2: Generate Preorder String for S

PREORDER TRAVERSAL OF S:
Visit 2: str = "2 "
  Visit 4: str = "2 4 "
    Visit null: str = "2 4 N "
    Visit null: str = "2 4 N N "
  Visit 5: str = "2 4 N N 5 "
    Visit null: str = "2 4 N N 5 N "
    Visit null: str = "2 4 N N 5 N N "

preS = "2 4 N N 5 N N "

─────────────────────────────────────────

📋 STEP 3: Check if preS is substring of preT

preT = "1 2 4 N N 5 N N 3 N N "
preS = "2 4 N N 5 N N "

preT.includes(preS)?
Search for "2 4 N N 5 N N " in "1 2 4 N N 5 N N 3 N N "

Position: Found at index 2 ✓
        "1 2 4 N N 5 N N 3 N N "
           └─────────────┘
           "2 4 N N 5 N N "

Return TRUE

─────────────────────────────────────────

🏆 APPROACH 3 RESULT: true

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE T:
       1
      / \
     2   3
    / \
   4   5

TREE S:
     2
    / \
   4   5

SUBTREE SEARCH IN T:
Check at node 1:
       1 ≠ 2 (root doesn't match)
      / \
     2   3

Check at node 2: ✓ MATCH!
     2 = 2 (root matches)
    / \
   4   5 → Identical to S!

Check at node 3:
     3 ≠ 2 (root doesn't match)

Check at node 4:
     4 ≠ 2 (root doesn't match, also structure different)

Check at node 5:
     5 ≠ 2 (root doesn't match, also structure different)

RESULT: Node 2 in T has subtree identical to S → TRUE

─────────────────────────────────────────

📊 EXAMPLE: Non-Matching Subtree

INPUT:
T:       3              S:     4
        / \                   / \
       4   5                 1   2
      / \
     1   2
        /
       0

Check at node 4 in T:
     4
    / \
   1   2
      /
     0

Compare with S:
     4
    / \
   1   2

Structure differs:
T's subtree has extra child (0) under 2
S does not have this child
NOT IDENTICAL → FALSE

─────────────────────────────────────────

📊 STRING REPRESENTATION COMPARISON:

WHY STRINGS WORK:
T's preorder: "3 4 1 N N 2 0 N N N 5 N N "
S's preorder: "4 1 N N 2 N N "

Substring search:
"4 1 N N 2 N N " in "3 4 1 N N 2 0 N N N 5 N N "?
                      └─────────┘
                 "4 1 N N 2 0..." (has extra 0)
NOT A SUBSTRING → FALSE ✓

NULL MARKERS PRESERVE STRUCTURE:
Without null markers: "4 1 2" could match "4 1 2 0" (wrong!)
With null markers: "4 1 N N 2 N N" ≠ "4 1 N N 2 0 N N N" (correct!)

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Both Trees Empty
T = null, S = null
Approach 1: Both null → return TRUE
Approach 2: Both null → return TRUE
Approach 3: "N " includes "N " → TRUE
Result: TRUE

CASE 2: S Empty, T Non-Empty
T = 1, S = null
Approach 1: !S → return FALSE
Approach 2: !S, T exists → return FALSE
Approach 3: "1 N N " includes "N "? → TRUE (any tree contains empty tree)
Result: TRUE (empty tree is subtree of any tree)

CASE 3: T Empty, S Non-Empty
T = null, S = 1
Approach 1: !T, S exists → return FALSE
Approach 2: T null, S exists → return FALSE
Approach 3: "N " includes "1 N N "? → FALSE
Result: FALSE

CASE 4: T and S Identical
T = S (same structure and values)
All approaches: Root check succeeds immediately
Result: TRUE

CASE 5: S is Leaf, T is Large Tree
T: complex tree with leaf matching S
All approaches: Will find matching leaf node
Result: TRUE

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:

1️⃣ APPROACH 1 (SEPARATE FUNCTIONS):
   - Clear separation: search vs identity check
   - isSubTree: searches for potential match in T
   - isIdentical: verifies complete structural match
   - Recursive on both functions

2️⃣ APPROACH 2 (SINGLE FUNCTION):
   - More elegant with single recursive function
   - isRootMatched flag switches between modes
   - false: search mode (find matching root)
   - true: match mode (verify identity)
   - Reduces function call overhead

3️⃣ APPROACH 3 (STRING MATCHING):
   - Converts tree problem to string problem
   - Preorder with nulls uniquely represents structure
   - String matching handles comparison
   - O(M+N) time optimal for large trees

4️⃣ NULL MARKERS CRITICAL:
   - Without nulls: structure information lost
   - Example: "1 2" could be 1→2 or 1→null,2
   - With nulls: "1 2 N N N" uniquely identifies structure
   - Prevents false positive matches

5️⃣ DUPLICATE VALUES HANDLED:
   - All approaches check complete structure
   - Not just value matching, but position too
   - Duplicate values correctly distinguished by position

💡 KEY INSIGHT:
Checking if S is a subtree of T requires searching for a node in T where
the rooted subtree is structurally identical to S, which can be done by
checking each node with helper function (O(M*N)), or by converting to
preorder strings with null markers and using substring matching (O(M+N))!

🎯 TIME COMPLEXITY ANALYSIS:
- Approach 1: O(M*N)
  - For each of M nodes in T, potentially check N nodes in S
  - isSubTree: O(M) nodes visited
  - isIdentical: O(N) per call
  - Total: O(M*N)

- Approach 2: O(M*N)
  - Similar to Approach 1, single function doesn't change complexity
  - Still checks N nodes for each of M potential matches
  - Total: O(M*N)

- Approach 3: O(M+N)
  - Preorder T: O(M)
  - Preorder S: O(N)
  - String includes: O(M) (using efficient string matching)
  - Total: O(M + N + M) = O(M+N)
  - Most efficient approach!

🎯 SPACE COMPLEXITY ANALYSIS:
- Approach 1: O(h) - recursion stack for height of T
- Approach 2: O(h) - recursion stack for height of T
- Approach 3: O(M+N) - storing preorder strings for both trees
- Approach 1&2: Better space for large trees
- Approach 3: Better time but uses more space

🎯 COMPLEXITY CORRECTIONS:
✅ Approach 1: TC = O(M*N), SC = O(h) - CORRECT
✅ Approach 2: TC = O(M*N), SC = O(h) - CORRECT
✅ Approach 3: TC = O(M+N), SC = O(M+N) - CORRECTED (was missing)

🎯 EDGE CASES HANDLED:
- Both trees empty: TRUE
- S empty: TRUE (empty is subtree of any)
- T empty, S non-empty: FALSE
- T and S identical: TRUE
- S is single leaf in T: TRUE
- Duplicate values: Correctly distinguished

🎯 ALGORITHM CORRECTNESS:
- All approaches verify complete structural identity
- Not just root value matching
- Check all descendants match
- Null markers preserve structure info
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Approach 1: Two separate functions for clarity
- Approach 2: Single function with mode flag
- Approach 3: String generation then substring check
- All use recursion (except string matching part)
- Early termination when match found

🎯 APPROACH 1 PRINCIPLES:
- isSubTree: Search function
- isIdentical: Comparison function
- Clear separation of concerns
- Easy to understand and debug
- Standard pattern for tree problems

🎯 APPROACH 2 PRINCIPLES:
- Single recursive function
- isRootMatched flag for mode switching
- false: searching for match
- true: verifying complete identity
- More elegant, less function overhead

🎯 APPROACH 3 PRINCIPLES:
- Tree → String conversion
- Preorder traversal with null markers
- String includes for substring check
- Leverages efficient string algorithms
- Best time complexity

🎯 COMPARISON OF APPROACHES:

APPROACH 1 (Separate Functions):
✅ Pros: Clear and intuitive
✅ Pros: Easy to understand
✅ Pros: Standard pattern
❌ Cons: Two functions, more overhead
❌ Cons: O(M*N) time complexity

APPROACH 2 (Single Function):
✅ Pros: More elegant
✅ Pros: Single function, less overhead
✅ Pros: Flexible with flag
❌ Cons: Slightly harder to understand
❌ Cons: Still O(M*N) time

APPROACH 3 (String Matching):
✅ Pros: Best time complexity O(M+N)
✅ Pros: Simple logic after string generation
✅ Pros: Efficient for large trees
❌ Cons: Extra space for strings O(M+N)
❌ Cons: String generation overhead

🎯 BEST APPROACH SELECTION:
- For clarity: Approach 1
- For elegance: Approach 2
- For efficiency: Approach 3 (large trees)
- For space: Approach 1 or 2 (O(h))
- For time: Approach 3 (O(M+N))

🎯 REAL-WORLD APPLICATIONS:
- Code plagiarism detection
- Pattern matching in XML/HTML trees
- Detecting common substructures
- Tree comparison in version control
- Finding duplicate code patterns

🎯 ALGORITHM PATTERN:
- Tree search problem
- Identity verification
- Recursive tree traversal
- String matching alternative
- Multiple solution approaches

🎯 MATHEMATICAL PROPERTIES:
- Subtree relation is transitive
- Every tree is its own subtree
- Empty tree is subtree of all trees
- Subtree preserves structure completely
- Not just value matching

🎯 IDENTITY VS SUBTREE:
- Identity: Two trees exactly same
- Subtree: One tree contains another
- Subtree check: Search + Identity
- Identity check: Pure comparison
- Related but different problems

🎯 NULL MARKER IMPORTANCE:
- Preserves tree structure in string
- Prevents false positives
- Example: "1 2" ambiguous, "1 2 N N N" clear
- Critical for correctness
- Standard technique in tree serialization

🎯 ERROR HANDLING:
- Null tree checks at function start
- Both null: TRUE (or special case)
- One null: FALSE (or TRUE if S null)
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF APPROACH 1:
- Very clear logic
- Easy to debug
- Standard pattern
- Good for learning

🎯 ADVANTAGES OF APPROACH 2:
- Elegant single function
- Flexible with flag
- Less function call overhead
- Professional style

🎯 ADVANTAGES OF APPROACH 3:
- Best time complexity
- Simple after string generation
- Efficient for repeated queries
- Leverages string algorithms

🎯 DISADVANTAGES:
- Approach 1&2: O(M*N) time
- Approach 3: O(M+N) space for strings
- All: Must check multiple nodes
- String approach: Generation overhead

🎯 OPTIMIZATION OPPORTUNITIES:
- Approach 3 already optimal time
- Can optimize string matching (KMP)
- Early termination in Approach 1&2
- Hash-based comparison possible
- Parallel processing for large trees

🎯 RELATED PROBLEMS:
- Check if trees are identical
- Mirror tree checking
- Tree isomorphism
- Lowest common ancestor
- Serialize/deserialize tree

🎯 PROBLEM VARIATIONS:
- Find all subtree occurrences
- Count subtree matches
- Find largest common subtree
- Check if subtree with modifications
- Fuzzy subtree matching

🎯 TESTING STRATEGY:
- Both trees empty
- S empty, T non-empty
- T empty, S non-empty
- Identical trees
- S is leaf in T
- No match exists
- Multiple potential matches

🎯 DEBUGGING TIPS:
- Print tree structures visually
- Trace recursive calls
- Check null handling
- Verify identity logic
- Test with duplicate values

🎯 PERFORMANCE ANALYSIS:
- Approach 1&2: O(M*N) time, O(h) space
- Approach 3: O(M+N) time, O(M+N) space
- Trade-off: Time vs Space
- Choose based on constraints
- All correct and practical

🎯 SCALABILITY CONSIDERATIONS:
- Large T, small S: Approach 3 best
- Small T, large S: All similar
- Very deep trees: Watch stack space
- Wide trees: Approach 3 better
- Performance: Approach 3 scales best

🎯 BEST PRACTICES:
- Choose approach based on constraints
- Handle null cases properly
- Use null markers in strings
- Test with duplicate values
- Consider time-space tradeoffs

🎯 COMMON MISTAKES:
- Forgetting null checks
- Not checking complete structure
- Missing null markers in strings
- Only checking root values
- Wrong base case logic

🎯 LEARNING OBJECTIVES:
- Understand subtree concept
- Master tree search patterns
- Learn identity checking
- Practice string conversion
- Improve complexity analysis

🎯 INTERVIEW TIPS:
- Explain subtree vs identity clearly
- Discuss all three approaches
- Compare time-space tradeoffs
- Handle edge cases systematically
- Write clean, bug-free code
- Mention null marker importance

🎯 ALGORITHM INSIGHTS:
- Subtree = search + identity
- String approach converts problem domain
- Null markers preserve structure
- Multiple valid solutions
- Different complexity tradeoffs

🎯 MATHEMATICAL ANALYSIS:
- Subtree checks: O(M) in worst case
- Identity checks: O(N) each
- Total: O(M*N) for Approach 1&2
- String approach: O(M+N) linear
- Optimal complexity achieved

🎯 IMPLEMENTATION CHALLENGES:
- Correct identity logic
- Proper null handling
- String generation with nulls
- Edge case coverage
- Choosing right approach

🎯 SOLUTION VALIDATION:
- Test with various structures
- Verify identity checking
- Check edge cases work
- Validate with duplicate values
- Compare approach outputs

🎯 ALGORITHM EVOLUTION:
- Basic: Check all nodes (Approach 1)
- Refined: Single function (Approach 2)
- Optimized: String matching (Approach 3)
- All: Correct with different tradeoffs

🎯 PRACTICAL APPLICATIONS:
- Pattern detection in data structures
- Code structure comparison
- XML/HTML template matching
- Version control tree diffing
- Duplicate detection systems

🎯 CONCLUSION:
The check if subtree problem demonstrates three approaches: separate search
and identity functions (O(M*N) time, O(h) space), single function with mode
flag (O(M*N) time, O(h) space), and preorder string conversion with substring
matching (O(M+N) time, O(M+N) space), all correctly verifying if S is a
complete structural subtree of T with the string approach being most
time-efficient using null markers to preserve structure!
*/