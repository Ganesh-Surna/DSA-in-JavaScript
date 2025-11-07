/* Problem: ✅✅✅✅ Children Sum Property ✅✅✅✅

Given a binary tree, check if the tree satisfies the children sum property. 
The children sum property states that for every node in the tree, 
the value of the node should be equal to the sum of values of its children.

You are given the root of a binary tree. 
The task is to determine if the tree satisfies the children sum property, 
where for every node, node.value = left_child.value + right_child.value (if children exist).

Example 1:
Input: 
       20
      /  \
     8    12
    / \
   3   5
Output: true
Explanation: 20 = 8 + 12, 8 = 3 + 5, and leaf nodes (3, 5, 12) satisfy the property.

Example 2:
Input:
       10
      /  \
     8    2
         /
        2
Output: true
Explanation: 10 = 8 + 2, 8 is leaf (satisfies), 2 = 2 (single child), and leaf node 2 satisfies.

Example 3:
Input:
       3
      / \
     1   2
        / \
       1   2
Output: false
Explanation: 2 ≠ 1 + 2 (should be 2), so the property is violated.

Constraints:
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(h) where h is the height of the tree
*/

class TreeNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

// ✅ TC = O(n)
// ✅ SC = O(h)
function childrenSumProperty(root){
    if(!root || (!root.left && !root.right)) return true
    
    let sum = 0;
    if(root.left !== null){
        sum += root.left.key
    }
    if(root.right !== null){
        sum += root.right.key
    }
    
    return (root.key === sum) && childrenSumProperty(root.left) && childrenSumProperty(root.right)
}

// OR

function childrenSumProperty2(root) {
  if (!root || (!root.left && !root.right)) return true;

  if (root.key !== (root.left?.key || 0) + (root.right?.key || 0)) {
    return false;
  }

  return childrenSumProperty2(root.left) && childrenSumProperty2(root.right);
}

let root = new TreeNode(20);
root.left = new TreeNode(8);
root.right = new TreeNode(12);
root.left.left = new TreeNode(3);
root.left.right = new TreeNode(5);
// Output: true

root = new TreeNode(10);
root.left = new TreeNode(8);
root.right = new TreeNode(2);
root.right.left = new TreeNode(2);
// Output: true

root = new TreeNode(3);
root.left = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(1);
root.right.right = new TreeNode(2);
// Output: false

root = new TreeNode(5);
// Output: true

root = null;
// Output: true

console.log(childrenSumProperty(root));

/*🎯 CORE IDEA: Use recursive traversal to check if every node satisfies the children sum property. For each node, calculate the sum of its children and compare with the node's value. If any node violates the property, return false; otherwise, recursively check left and right subtrees.

📋 STEP-BY-STEP FLOW:

1️⃣ BASE CASE HANDLING:
   - If root is null: return true (empty tree satisfies property)
   - If node is leaf (no children): return true (leaf nodes satisfy property)

2️⃣ CHILDREN SUM CALCULATION:
   - Calculate sum of left child value (if exists)
   - Calculate sum of right child value (if exists)
   - Compare node value with children sum

3️⃣ RECURSIVE VALIDATION:
   - If current node satisfies property: recursively check left and right subtrees
   - If current node violates property: return false immediately
   - Return true only if all nodes satisfy the property

🧠 WHY THIS APPROACH?
- Recursive traversal naturally checks every node
- Base cases handle edge conditions properly
- Early termination on property violation
- Efficient O(n) time and O(h) space complexity

💡 KEY INSIGHTS:
- Children sum property: node.value = left_child.value + right_child.value
- Leaf nodes automatically satisfy the property
- Recursive approach checks all nodes systematically
- Early termination optimizes performance
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Tree with nodes [20, 8, 12, 3, 5]

INPUT: Binary Tree
       20
      /  \
     8    12
    / \
   3   5

OUTPUT: true
EXPLANATION: 20 = 8 + 12, 8 = 3 + 5, and leaf nodes (3, 5, 12) satisfy the property

🎯 GOAL: Check if every node satisfies children sum property!

🔍 RECURSIVE TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
root = 20
Check children sum property for entire tree

📋 RECURSIVE CALLS:

CALL 1: childrenSumProperty(20)
root = 20, has children (8, 12)
sum = 8 + 12 = 20
root.key === sum (20 === 20) → true
Recursively check: childrenSumProperty(8) && childrenSumProperty(12)

CALL 2: childrenSumProperty(8)
root = 8, has children (3, 5)
sum = 3 + 5 = 8
root.key === sum (8 === 8) → true
Recursively check: childrenSumProperty(3) && childrenSumProperty(5)

CALL 3: childrenSumProperty(3)
root = 3, no children (leaf node)
Base case: (!root.left && !root.right) → return true

CALL 4: childrenSumProperty(5)
root = 5, no children (leaf node)
Base case: (!root.left && !root.right) → return true

CALL 5: childrenSumProperty(12)
root = 12, no children (leaf node)
Base case: (!root.left && !root.right) → return true

📋 RESULT CALCULATION:
CALL 2: childrenSumProperty(8) = true && true = true
CALL 1: childrenSumProperty(20) = true && true = true

🏆 RESULT: true

─────────────────────────────────────────

📊 EXAMPLE: Tree with nodes [3, 1, 2, 1, 2]

INPUT: Binary Tree
       3
      / \
     1   2
        / \
       1   2

OUTPUT: false
EXPLANATION: 2 ≠ 1 + 2 (should be 2), so the property is violated

🔍 Process:

CALL 1: childrenSumProperty(3)
root = 3, has children (1, 2)
sum = 1 + 2 = 3
root.key === sum (3 === 3) → true
Recursively check: childrenSumProperty(1) && childrenSumProperty(2)

CALL 2: childrenSumProperty(1)
root = 1, no children (leaf node)
Base case: return true

CALL 3: childrenSumProperty(2)
root = 2, has children (1, 2)
sum = 1 + 2 = 3
root.key === sum (2 === 3) → false
Return false immediately

🏆 RESULT: false

─────────────────────────────────────────

📊 EXAMPLE: Tree with nodes [10, 8, 2, 2]

INPUT: Binary Tree
       10
      /  \
     8    2
         /
        2

OUTPUT: true
EXPLANATION: 10 = 8 + 2, 8 is leaf (satisfies), 2 = 2 (single child), and leaf node 2 satisfies

🔍 Process:

CALL 1: childrenSumProperty(10)
root = 10, has children (8, 2)
sum = 8 + 2 = 10
root.key === sum (10 === 10) → true
Recursively check: childrenSumProperty(8) && childrenSumProperty(2)

CALL 2: childrenSumProperty(8)
root = 8, no children (leaf node)
Base case: return true

CALL 3: childrenSumProperty(2)
root = 2, has children (null, 2)
sum = 0 + 2 = 2
root.key === sum (2 === 2) → true
Recursively check: childrenSumProperty(null) && childrenSumProperty(2)

CALL 4: childrenSumProperty(null)
root = null
Base case: return true

CALL 5: childrenSumProperty(2)
root = 2, no children (leaf node)
Base case: return true

🏆 RESULT: true

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
       20
      /  \
     8    12
    / \
   3   5

PROPERTY CHECK:
Level 1: 20 = 8 + 12 ✓ (20 = 20)
Level 2: 8 = 3 + 5 ✓ (8 = 8)
Level 3: 3, 5, 12 are leaves ✓ (automatically satisfy)

RESULT: true

─────────────────────────────────────────

📊 PROPERTY VIOLATION EXAMPLE:

ORIGINAL TREE:
       3
      / \
     1   2
        / \
       1   2

PROPERTY CHECK:
Level 1: 3 = 1 + 2 ✓ (3 = 3)
Level 2: 1 is leaf ✓, 2 = 1 + 2 ✗ (2 ≠ 3)

RESULT: false

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

childrenSumProperty(20)
├── childrenSumProperty(8)
│   ├── childrenSumProperty(3) → true (leaf)
│   └── childrenSumProperty(5) → true (leaf)
└── childrenSumProperty(12) → true (leaf)

FINAL: true && true && true = true

─────────────────────────────────────────

📊 PROPERTY VALIDATION PROCESS:

NODE 20: sum = 8 + 12 = 20, 20 === 20 ✓
NODE 8: sum = 3 + 5 = 8, 8 === 8 ✓
NODE 3: leaf node ✓
NODE 5: leaf node ✓
NODE 12: leaf node ✓

ALL NODES SATISFY PROPERTY: true

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RECURSIVE TRAVERSAL: Checks every node systematically
2️⃣ BASE CASE HANDLING: Properly handles null and leaf nodes
3️⃣ PROPERTY VALIDATION: Compares node value with children sum
4️⃣ EARLY TERMINATION: Returns false immediately on violation
5️⃣ CORRECT RESULTS: Guaranteed to check all nodes

💡 KEY INSIGHT:
Use recursive traversal to check if every node satisfies
the children sum property, with proper base case handling!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Property check per node: O(1)
- Recursive calls: O(n) total
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(h) where h is tree height
- No extra data structures used
- Total: O(h) space complexity

🎯 EDGE CASES HANDLED:
- Empty tree (null root): Return true
- Single node (leaf): Return true
- Nodes with one child: Handle null child as 0
- Nodes with two children: Check sum property
- Property violation: Return false immediately

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to check every node
- Base cases handle edge conditions
- Property validation is correct
- Early termination optimizes performance
- All nodes must satisfy property for true result

🎯 IMPLEMENTATION DETAILS:
- Recursive approach with base case handling
- Children sum calculation with null checks
- Boolean AND operation for recursive results
- Early termination on property violation
- Optimal O(n) time and O(h) space complexity

🎯 BASE CASE HANDLING:
- Null root: Return true (empty tree satisfies)
- Leaf nodes: Return true (no children to check)
- Single child: Handle null child as 0
- Two children: Check sum property

🎯 PROPERTY VALIDATION:
- Calculate sum of children values
- Compare with node value
- Return true if equal, false otherwise
- Handle null children as 0

🎯 RECURSIVE STRUCTURE:
- Check current node property
- Recursively check left subtree
- Recursively check right subtree
- Return AND of all results

🎯 COMPARISON WITH ALTERNATIVE APPROACHES:
- Iterative approach: O(n) time, O(n) space (queue)
- Recursive approach: O(n) time, O(h) space (stack)
- Both: Correct results, different space usage
- Recursive: More elegant and space-efficient

🎯 REAL-WORLD APPLICATIONS:
- Tree validation
- Data structure integrity
- Algorithm verification
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Early termination on property violation
- Efficient null checks
- Minimal space usage
- Optimal recursive structure
- Clean base case handling

🎯 ALGORITHM PATTERN:
- Recursive tree traversal
- Property validation
- Base case handling
- Early termination

🎯 MATHEMATICAL PROPERTIES:
- Tree height: h = log(n) for balanced trees
- Node count: n nodes total
- Property check: O(1) per node
- Total operations: O(n)

🎯 ERROR HANDLING:
- Null root: Return true
- Leaf nodes: Return true
- Single child: Handle null as 0
- Property violation: Return false
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF RECURSIVE APPROACH:
- Natural tree structure handling
- Elegant implementation
- Space-efficient (O(h) space)
- Easy to understand
- Proper base case handling

🎯 DISADVANTAGES:
- Recursion stack overhead
- Potential stack overflow for deep trees
- Less intuitive for some developers
- Debugging complexity

🎯 ALTERNATIVE APPROACHES:
- Iterative BFS: O(n) time, O(n) space
- Iterative DFS: O(n) time, O(h) space
- Recursive approach: O(n) time, O(h) space
- All: Correct property validation

🎯 IMPLEMENTATION CONSIDERATIONS:
- Tree structure: Balanced vs skewed
- Space constraints: Memory limitations
- Performance requirements: Time vs space
- Code maintainability: Readability
- Testing: Edge case coverage

🎯 TESTING STRATEGY:
- Test empty tree
- Test single node
- Test tree with property satisfied
- Test tree with property violated
- Test various tree structures

🎯 DEBUGGING TIPS:
- Check base case handling
- Verify property calculation
- Monitor recursive calls
- Validate edge cases
- Check return values

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree traversal
- Space: O(h) - optimal for recursive approach
- Overall: Efficient for given constraints
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Consider recursion depth
- Deep trees: Monitor stack usage
- Memory usage: Track recursion stack
- Optimization: Consider iterative approach

🎯 BEST PRACTICES:
- Clear base case handling
- Proper null checks
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to handle null children
- Incorrect base case logic
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand recursive tree traversal
- Learn property validation
- Master base case handling
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain the recursive approach
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Recursive tree traversal
- Property validation
- Base case handling
- Early termination
- Tree structure understanding

🎯 MATHEMATICAL ANALYSIS:
- Node visits: Each node visited once
- Property check: O(1) per node
- Recursion depth: O(h) maximum
- Total: O(n) time complexity
- Space: O(h) for recursion stack

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct property logic
- Efficient base case handling
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify property validation
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) time
- Optimized approach: O(n) time
- Alternative approaches: Iterative traversal
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Tree validation
- Data structure integrity
- Algorithm verification
- Educational purposes
- System design

🎯 CONCLUSION:
The children sum property problem demonstrates how to use recursive
tree traversal with proper base case handling to validate a specific
property for every node, achieving efficient O(n) time and O(h) space
complexity with elegant implementation!
*/
