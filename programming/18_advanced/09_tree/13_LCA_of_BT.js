/* Problem: ✅✅✅✅ Lowest Common Ancestor (LCA) of Binary Tree ✅✅✅✅

Given the root of a binary tree and two nodes p and q, 
find the lowest common ancestor (LCA) of the two nodes. 
The LCA is defined as the lowest node in the tree that has both p and q as descendants (where we allow a node to be a descendant of itself).

The lowest common ancestor is the deepest node that is an ancestor of both nodes. 
A node can be its own ancestor. 
The problem can be solved using two approaches: efficient one-traversal method and a three-traversal method using path finding.

You are given the root of a binary tree and two node values p and q. The task is to find the LCA of p and q.

Example 1:
Input: 
       10
      /  \
     20   30
         / \
        40  50
p = 20, q = 50

Output: 10
Explanation: LCA of 20 and 50 is 10. Paths: [10, 20] and [10, 30, 50].

Example 2:
Input:
       10
      /  \
     20   30
         / \
        40  50
p = 30, q = 50

Output: 30
Explanation: LCA of 30 and 50 is 30 (a node can be its own ancestor). Paths: [10, 30] and [10, 30, 50].

Example 3:
Input:
       1
      / \
     2   3
    / \
   4   5
p = 4, q = 5

Output: 2
Explanation: LCA of 4 and 5 is 2. Paths: [1, 2, 4] and [1, 2, 5].

Example 4:
Input:
       10
      /  \
     20   30
p = 10, q = 60

Output: null
Explanation: Node 60 does not exist, so no LCA.

Constraints:
- The number of nodes in the tree is in the range [0, 10^4]
- -1000 <= Node.val <= 1000
- All node values are unique
- p and q are different values

Expected Complexities:
Time Complexity: O(n) for both approaches
Auxiliary Space: O(h) for recursion stack
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// 1. Efficient (One Traversal)
// ✅✅✅ Efficient approach assumes both nodes exist in the tree.
// Does not give correct result if one of the node does not exist in the tree. ✅✅✅✅✅✅✅

// ✅ TC = O(n), ✅ SC = O(h)
function findLCA(root, p, q) {
    if(!root) return null

    if(root.key === p || root.key === q) return root // If curr node is p or q, then it is the LCA (the another node will definitely be its child)

    let left = findLCA(root.left, p, q)
    let right = findLCA(root.right, p, q)

    if(left && right) return root // if one node found in left subtree, and another node found in right subtree, then "root" is the LCA
    
    return left || right // if only one node found in either of subtrees, then that node is the LCA. ( (null or Valid) OR (Valid or null) OR (null || null) )
}



// 2. Better (Three Traversals)
// ✅ TC = O(n), ✅ SC = O(h)
function findLCA(root, p, q) {
    let path1 = [], path2 = []
    
    // If p or q does not exist in the tree, then return null (Can find LCA only if both nodes exist in the tree)
    if(!findPath(root, path1, p) || !findPath(root, path2, q)){
        return null
    }
    
    // console.log(path1, path2)
    
    let i=0;
    for( ; i<path1.length && path2.length; i++){
        if(path1[i] !== path2[i]){
            return path1[i-1] // path2[i-1] LCA
        }
    }
    
    /* If one of the node's path is smaller but its path is matched with larger path. 
     But still larger path has more nodes. Then the LCA not be returned in above for loop. 
     The LCA will be (i-1)th node of either of the path */

    /* Which means i-1 no.of nodes matched in both paths. 
    and if (i) is exceding one of the path, then (i-1)th node(last node which mathed) is the LCA
    */
    return path1[i-1] // path2[i-1]
}
function findPath(root, path, x){
    // 1. If root itslef is null
    if(!root) return false
    
    // 2. At first, Add node to path (because we don't know this may come into the path or not)
    path.push(root.key)
    
    // 3. If this is the node we are looking, then just return true (because it is already added to path in above step)
    if(root.key === x){
        return true
    }
    
    /* 4. If this is not the node we are looking , 
    then recursively do findPath in left subtree and rightsubtree. 
    If the node found in either of subtrees then return true. 
    the path will be like [...all its ancestors, and itself]
    */
    if((root.left && findPath(root.left, path, x)) || (root.right && findPath(root.right, path, x))){
        return true
    }
    
    // 5. If the node does not exist, then remove it from path, and return false
    path.pop()
    return false
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.right.left = new TreeNode(40)
root.right.right = new TreeNode(50)

let p = 20, q = 50; // 10 --> ([ 10, 20 ] & [ 10, 30, 50 ])
// p = 30, q=50 // 30 --> ([ 10, 30 ] & [ 10, 30, 50 ])
// // p = 50, q=30 // 30 --> ([ 10, 30, 50 ] & [ 10, 30 ])
// // p = 10, q=50 // 10 --> ([ 10 ] & [ 10, 30, 50 ])
p = 50, q=10 // 10 --> ([ 10, 30, 50 ]& [ 10 ])
p = 10, q=60 // null in Approach 2. But it will give 10 in Approach 1. ✅✅✅✅✅✅✅
console.log(findLCA(root, p, q))

/*🎯 CORE IDEA: Two approaches to find LCA: 
(1) Efficient one-traversal method that returns node if it matches p or q, 
    recurses on left and right subtrees,
    and returns root if both subtrees return non-null (indicating p and q are in different subtrees), 
    or returns the non-null subtree result. 
(2) Three-traversal method that finds paths from root to p and q separately, 
    then compares paths to find the last common node.

📋 STEP-BY-STEP FLOW:

1️⃣ EFFICIENT APPROACH (ONE TRAVERSAL):
   - If root is p or q, return root
   - Recursively search in left and right subtrees
   - If both subtrees return non-null, root is LCA
   - Otherwise, return the non-null subtree result

2️⃣ PATH-BASED APPROACH (THREE TRAVERSALS):
   - Find path from root to p
   - Find path from root to q
   - Compare paths to find last common node
   - Return the last matching node

3️⃣ LCA DEFINITION:
   - Lowest node that has both p and q as descendants
   - A node can be its own ancestor
   - Deepest common node in both paths

4️⃣ KEY OBSERVATIONS:
   - If p and q are in different subtrees, root is LCA
   - If one is ancestor of other, that ancestor is LCA
   - Efficient approach assumes both nodes exist in the tree. ✅✅✅✅✅✅✅
        Does not give correct result if one of the node does not exist in the tree. ✅✅✅✅✅✅✅

🧠 WHY THESE APPROACHES?
- Efficient approach: Single traversal with clever recursive logic
- Path-based approach: Validates node existence, clearer logic
- Both achieve O(n) time complexity
- Efficient approach better when nodes guaranteed to exist
- Path-based approach better when need to validate existence

💡 KEY INSIGHTS:
- Efficient: Return node immediately when found
- If both subtrees return non-null, current node is LCA
- Path-based: Compare paths to find divergence point
- LCA is last common node in both paths
- Node can be its own ancestor
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Lowest Common Ancestor

INPUT: Binary Tree
       10
      /  \
     20   30
         / \
        40  50
p = 20, q = 50

OUTPUT: 10
EXPLANATION: LCA of 20 and 50 is 10. Node 20 is in left subtree, 50 is in right subtree.

🎯 GOAL: Find the lowest common ancestor of two nodes!

🔍 EFFICIENT APPROACH - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: findLCA(10, 20, 50)

📋 RECURSIVE TRAVERSAL:

CALL 1: findLCA(10, 20, 50)
Step 1: Check if root is null
root = 10 (not null) → continue

Step 2: Check if root is p or q
root.key = 10, p = 20, q = 50 → 10 ≠ 20 and 10 ≠ 50 → continue

Step 3: Search in left subtree
left = findLCA(20, 20, 50)

CALL 2: findLCA(20, 20, 50)
Step 1: Check if root is null
root = 20 (not null) → continue

Step 2: Check if root is p or q
root.key = 20, p = 20 → 20 === 20 → FOUND!
return root (20)

BACK TO CALL 1:
left = 20

Step 4: Search in right subtree
right = findLCA(30, 20, 50)

CALL 3: findLCA(30, 20, 50)
Step 1: Check if root is null
root = 30 (not null) → continue

Step 2: Check if root is p or q
root.key = 30, p = 20, q = 50 → 30 ≠ 20 and 30 ≠ 50 → continue

Step 3: Search in left subtree
left = findLCA(40, 20, 50)

CALL 4: findLCA(40, 20, 50)
Step 1: Check if root is null
root = 40 (not null) → continue

Step 2: Check if root is p or q
root.key = 40, p = 20, q = 50 → 40 ≠ 20 and 40 ≠ 50 → continue

Step 3: Search in left subtree
left = findLCA(null, 20, 50) → null

Step 4: Search in right subtree
right = findLCA(null, 20, 50) → null

Step 5: Check if both non-null
left = null, right = null → both null

Step 6: Return left || right
return null

BACK TO CALL 3:
left = null

Step 4: Search in right subtree
right = findLCA(50, 20, 50)

CALL 5: findLCA(50, 20, 50)
Step 1: Check if root is null
root = 50 (not null) → continue

Step 2: Check if root is p or q
root.key = 50, q = 50 → 50 === 50 → FOUND!
return root (50)

BACK TO CALL 3:
right = 50

Step 5: Check if both non-null
left = null, right = 50 → only right is non-null

Step 6: Return left || right
return 50

BACK TO CALL 1:
right = 50

Step 5: Check if both non-null
left = 20, right = 50 → BOTH NON-NULL!
This means one node found in left subtree, another in right subtree
return root (10) → LCA FOUND!

🏆 EFFICIENT RESULT: 10

─────────────────────────────────────────

🔍 PATH-BASED APPROACH - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: findLCA(10, 20, 50)
path1 = [], path2 = []

STEP 1: Find path to p (20)
Call: findPath(10, path1, 20)
Process: [10] → [10, 20] → found!
path1 = [10, 20]

STEP 2: Find path to q (50)
Call: findPath(10, path2, 50)
Process: [10] → [10, 30] → [10, 30, 50] → found!
path2 = [10, 30, 50]

STEP 3: Check if both nodes exist
path1 exists and path2 exists → continue

STEP 4: Compare paths to find divergence
i = 0: path1[0] = 10, path2[0] = 10 → match, continue
i = 1: path1[1] = 20, path2[1] = 30 → NO MATCH!
Divergence at index 1, so LCA is at index (i-1) = 0
return path1[0] = 10

🏆 PATH-BASED RESULT: 10

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EFFICIENT APPROACH:

RECURSIVE EXPLORATION:
       10 (check: not p or q)
      /  \
     20   30 (check: not p or q)
 [FOUND]  / \
         40  50
      [null] [FOUND]

RETURN VALUES:
Node 20: returns 20 (found p)
Node 40: returns null (not found)
Node 50: returns 50 (found q)
Node 30: returns 50 (only right non-null)
Node 10: left=20, right=50 → BOTH NON-NULL → returns 10 (LCA)

PATH-BASED APPROACH:

PATH TO 20:
       10 ← [10]
      /  
     20 ← [10, 20] FOUND!

PATH TO 50:
       10 ← [10]
         \
          30 ← [10, 30]
            \
             50 ← [10, 30, 50] FOUND!

COMPARISON:
path1: [10, 20]
path2: [10, 30, 50]
       ↑   ↑
     match diverge
LCA = 10 (last matching node)

─────────────────────────────────────────

📊 COMPLEX EXAMPLE: Node is Ancestor of Other

INPUT: Binary Tree
       10
      /  \
     20   30
         / \
        40  50
p = 30, q = 50

EFFICIENT APPROACH:

CALL 1: findLCA(10, 30, 50)
left = findLCA(20, 30, 50) → null
right = findLCA(30, 30, 50) → ?

CALL 2: findLCA(30, 30, 50)
root.key = 30, p = 30 → MATCH!
return 30 immediately (don't need to search subtrees)

BACK TO CALL 1:
left = null, right = 30
return null || 30 = 30

🏆 RESULT: 30 (ancestor of itself)

PATH-BASED APPROACH:

path1 to 30: [10, 30]
path2 to 50: [10, 30, 50]

COMPARISON:
i = 0: path1[0] = 10, path2[0] = 10 → match
i = 1: path1[1] = 30, path2[1] = 30 → match
i = 2: path1[2] = undefined (path1 ended)
Loop exits, return path1[i-1] = path1[1] = 30

🏆 RESULT: 30

─────────────────────────────────────────

📊 EXAMPLE: Nodes in Same Subtree

INPUT: Binary Tree
       1
      / \
     2   3
    / \
   4   5
p = 4, q = 5

EFFICIENT APPROACH:

CALL 1: findLCA(1, 4, 5)
left = findLCA(2, 4, 5) → ?
right = findLCA(3, 4, 5) → null

CALL 2: findLCA(2, 4, 5)
left = findLCA(4, 4, 5) → 4 (found p)
right = findLCA(5, 4, 5) → 5 (found q)
Both non-null → return 2

BACK TO CALL 1:
left = 2, right = null
return 2 || null = 2

🏆 RESULT: 2

PATH-BASED APPROACH:

path1 to 4: [1, 2, 4]
path2 to 5: [1, 2, 5]

COMPARISON:
i = 0: path1[0] = 1, path2[0] = 1 → match
i = 1: path1[1] = 2, path2[1] = 2 → match
i = 2: path1[2] = 4, path2[2] = 5 → NO MATCH!
return path1[i-1] = path1[1] = 2

🏆 RESULT: 2

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: One Node is Root
Input: root = 10, p = 10, q = 50
Efficient: Returns 10 immediately (root matches p)
Path-based: paths [10] and [10, 30, 50], LCA = 10

CASE 2: Node Not Found
Input: root = 10, p = 10, q = 60
Efficient: May return incorrect result (assumes both exist)
Path-based: findPath returns false for q, returns null

CASE 3: Both Nodes are Leaves
Input: p = 40, q = 50
Efficient: Finds both in subtrees, returns parent
Path-based: Compares paths, finds last common node

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:
1️⃣ EFFICIENT: Returns node when found, combines results from subtrees
2️⃣ SUBTREE LOGIC: If both subtrees return non-null, current is LCA
3️⃣ PATH-BASED: Finds paths independently, compares to find divergence
4️⃣ VALIDATION: Path-based approach validates node existence
5️⃣ EFFICIENCY: Both O(n) time, but efficient uses single traversal

💡 KEY INSIGHT:
Efficient approach uses clever recursive logic where finding nodes in different
subtrees indicates current node is LCA, while path-based approach explicitly
finds paths and compares them to identify the lowest common ancestor!

🎯 TIME COMPLEXITY ANALYSIS:
- Efficient approach: O(n) - single traversal
- Path-based approach: O(n) - three traversals (two for paths, one for comparison)
- Both: O(n) overall time complexity
- Efficient is faster with better constant factor

🎯 SPACE COMPLEXITY ANALYSIS:
- Efficient approach: O(h) - recursion stack only
- Path-based approach: O(h) - recursion stack + two path arrays
- Both: O(h) space complexity
- Efficient uses less space (no path arrays)

🎯 EDGE CASES HANDLED:
- Empty tree: Both return null
- One node is ancestor of other: Both handle correctly
- Nodes in different subtrees: Both find LCA correctly
- Node not found: Path-based handles, efficient assumes both exist

🎯 ALGORITHM CORRECTNESS:
- Efficient: Guaranteed to find LCA if both nodes exist
- Path-based: Validates existence, finds LCA correctly
- Both handle node being its own ancestor
- Correct for all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Efficient: Early return when node found, combine subtree results
- Path-based: Use findPath helper, compare paths element by element
- Both use recursion for tree traversal
- Clear base case handling

🎯 EFFICIENT APPROACH PRINCIPLES:
- Return immediately when current node matches p or q
- Recursively search both subtrees
- If both subtrees return non-null, current is LCA
- Otherwise, return the non-null subtree result
- Assumes both nodes exist in tree

🎯 PATH-BASED APPROACH PRINCIPLES:
- Find complete path from root to each node
- Validate that both nodes exist
- Compare paths to find last common node
- Handle case where one path is prefix of other
- More defensive, validates existence

🎯 LCA DEFINITION:
- Lowest node that has both p and q as descendants
- A node is considered descendant of itself
- Deepest node common to both paths
- First node where paths diverge (from bottom up)

🎯 EFFICIENT APPROACH ADVANTAGES:
- Single traversal, faster
- Less space (no path arrays)
- Cleaner code
- More elegant solution

🎯 PATH-BASED APPROACH ADVANTAGES:
- Validates node existence
- Easier to understand logic
- More defensive programming
- Explicit path comparison

🎯 COMPARISON OF APPROACHES:
- Efficient: Better when both nodes guaranteed to exist
- Path-based: Better when need to validate existence
- Both: O(n) time, O(h) space
- Efficient: Fewer constants, faster in practice
- Path-based: More robust, handles non-existence

🎯 REAL-WORLD APPLICATIONS:
- Version control systems (common commit ancestor)
- File system hierarchy (common parent directory)
- Organization charts (common manager)
- Taxonomies and ontologies
- Network routing

🎯 ALGORITHM PATTERN:
- Efficient: Bottom-up recursive aggregation
- Path-based: Find paths, then compare
- Both: Divide and conquer strategy
- Tree traversal with information propagation

🎯 MATHEMATICAL PROPERTIES:
- LCA exists if both nodes exist
- LCA depth: min(depth(p), depth(q))
- Path length: at most h for each node
- Comparison: at most h steps

🎯 ERROR HANDLING:
- Null root: Both return null
- Node not found: Path-based returns null
- Invalid inputs: Handled gracefully
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF EFFICIENT:
- Single traversal
- Less memory usage
- Cleaner implementation
- Faster execution

🎯 ADVANTAGES OF PATH-BASED:
- Validates existence
- Clearer logic
- More defensive
- Easier to debug

🎯 DISADVANTAGES:
- Efficient: Assumes both nodes exist
- Path-based: Multiple traversals, more space
- Both: Recursion stack overhead
- Efficient: Less intuitive initially

🎯 ALTERNATIVE APPROACHES:
- Parent pointers: O(1) space but requires extra node field
- Level-order with parent tracking: O(n) space
- Path compression: Optimization for repeated queries
- All: Different space-time tradeoffs

🎯 IMPLEMENTATION CONSIDERATIONS:
- Choose efficient when nodes guaranteed to exist
- Choose path-based when need validation
- Handle null root explicitly
- Consider tree size and structure
- Balance simplicity vs robustness

🎯 TESTING STRATEGY:
- Empty tree
- Single node tree
- Both nodes in different subtrees
- One node is ancestor of other
- Both nodes are leaves
- One or both nodes not found
- Various tree structures

🎯 DEBUGGING TIPS:
- Track recursive calls and returns
- Monitor left and right subtree results
- Verify path construction (path-based)
- Check base case handling
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for LCA finding
- Space: O(h) - optimal for recursive approach
- Overall: Efficient and practical
- Scalable: Works well for typical trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Deep trees: Stack depth management
- Memory usage: Proportional to height
- Performance: Efficient with early termination

🎯 BEST PRACTICES:
- Validate inputs before processing
- Handle edge cases explicitly
- Choose appropriate approach based on requirements
- Write clear and readable code
- Test thoroughly

🎯 COMMON MISTAKES:
- Not handling null nodes
- Wrong subtree result combination
- Incorrect path comparison
- Missing base cases
- Not validating node existence

🎯 LEARNING OBJECTIVES:
- Understand LCA concept
- Learn bottom-up recursion
- Master path-based algorithms
- Practice tree traversal
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain both approaches clearly
- Discuss space-time tradeoffs
- Handle edge cases systematically
- Write clean recursive code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Bottom-up result propagation
- Subtree result combination
- Path comparison technique
- Recursive tree traversal
- Efficient information gathering

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n in worst case
- Recursive calls: n maximum
- Path comparison: h maximum
- Space usage: O(h) for recursion
- Total: O(n) time, O(h) space

🎯 IMPLEMENTATION CHALLENGES:
- Correct subtree result handling
- Proper path comparison logic
- Edge case comprehensive coverage
- Clear base case handling
- Efficient recursion structure

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify LCA correctness
- Check edge case handling
- Monitor space usage
- Validate algorithm correctness

🎯 ALGORITHM EVOLUTION:
- Basic approach: Two passes to find paths
- Optimized: Single pass with result propagation
- With parent pointers: Different technique
- For BST: Can use value comparison

🎯 PRACTICAL APPLICATIONS:
- Version control (Git merge base)
- File system operations
- Organization hierarchy queries
- Network routing decisions
- Taxonomy navigation

🎯 OPTIMIZATION OPPORTUNITIES:
- Cache LCA for repeated queries
- Use parent pointers if available
- Optimize for specific tree structures
- Consider iterative for very deep trees
- Use path compression for repeated queries

🎯 RELATED PROBLEMS:
- LCA in BST (can use values)
- Distance between two nodes
- Path between two nodes
- Kth ancestor of node
- All ancestors of node

🎯 PROBLEM VARIATIONS:
- LCA of multiple nodes
- LCA in directed acyclic graph
- LCA with weighted edges
- LCA in forest (multiple trees)
- Online LCA queries

🎯 CONCLUSION:
The Lowest Common Ancestor problem demonstrates two powerful approaches:
efficient single-traversal with bottom-up result propagation achieving O(n)
time and O(h) space, and path-based three-traversal method with explicit
path comparison for validation, both correctly finding the deepest common
ancestor of two nodes in a binary tree!
*/