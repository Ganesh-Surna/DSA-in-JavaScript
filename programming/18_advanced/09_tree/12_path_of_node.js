/* Problem: ✅✅✅✅ Find Path from Root to Node ✅✅✅✅

Given the root of a binary tree and a target node value, return the path from the root to the target node. If the target node does not exist, return null.

The path should be represented as an array of node values from root to target, including both root and target. The algorithm should use recursion with backtracking to find the path efficiently.

You are given the root of a binary tree and a target value x. The task is to find the path from root to the node with value x, returning the path as an array of node values.

Example 1:
Input: 
       10
      /  \
     20   30
         / \
        40  50
Target: 40

Output: [10, 30, 40]
Explanation: Path from root (10) to target (40) is 10 → 30 → 40.

Example 2:
Input:
       1
      / \
     2   3
    / \
   4   5
Target: 5

Output: [1, 2, 5]
Explanation: Path from root (1) to target (5) is 1 → 2 → 5.

Example 3:
Input:
       10
      /  \
     20   30
Target: 100

Output: null
Explanation: Target node 100 does not exist in the tree.

Example 4:
Input:
       10
Target: 10

Output: [10]
Explanation: Target is the root itself.

Constraints:
- The number of nodes in the tree is in the range [0, 10^4]
- -1000 <= Node.val <= 1000
- All node values are unique

Expected Complexities:
Time Complexity: O(n) - may visit all nodes in worst case
Auxiliary Space: O(h) - recursion stack depth
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n), ✅ SC = O(h)
function findPath(root, x){
    let path = [] // to store the path of the node

    if(!findPathHelper(root, path, x)){
        return null
    }
    return path

    // Helper function
    function findPathHelper(root, path, x){
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
        if((root.left && findPathHelper(root.left, path, x)) || (root.right && findPathHelper(root.right, path, x))){
            return true
        }
        
        // 5. If the node does not exist, then remove it from path, and return false
        path.pop()
        return false
    }
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.right.left = new TreeNode(40)
root.right.right = new TreeNode(50)

let x = 40;
console.log(findPath(root, x)) // [ 10, 30, 40 ]

/*🎯 CORE IDEA: Use recursive DFS traversal with backtracking to find the path from root to target node. Add each node to the path array during traversal. If target is found in current subtree, keep the node in path and return true. If target is not found in either subtree, backtrack by removing the node from path and return false.

📋 STEP-BY-STEP FLOW:

1️⃣ RECURSIVE SEARCH:
   - Add current node to path array
   - Check if current node is the target
   - Recursively search in left and right subtrees
   - Use backtracking to maintain correct path

2️⃣ BASE CASES:
   - If root is null: return false
   - If current node is target: return true
   - Path already contains current node at this point

3️⃣ BACKTRACKING:
   - If target found in either subtree: return true
   - If target not found in both subtrees: remove node from path
   - Return false to indicate target not in this subtree

4️⃣ PATH CONSTRUCTION:
   - Path array contains nodes from root to current
   - Only nodes on successful path remain in array
   - Backtracking removes nodes not on path to target

🧠 WHY THIS APPROACH?
- Recursion naturally explores all paths in the tree
- Backtracking removes unsuccessful paths efficiently
- Path array maintains current exploration path
- Early termination when target is found
- O(n) time complexity with efficient path tracking

💡 KEY INSIGHTS:
- Add node to path before checking if it's the target
- Return true immediately when target is found
- Backtrack by removing node if target not in subtree
- Path array automatically contains correct path
- Recursion handles tree structure naturally
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Find Path from Root to Node

INPUT: Binary Tree
       10
      /  \
     20   30
         / \
        40  50
Target: 40

OUTPUT: [10, 30, 40]
EXPLANATION: Path from root (10) to target (40) is 10 → 30 → 40.

🎯 GOAL: Find the path from root to target node using recursive DFS with backtracking!

🔍 RECURSIVE ALGORITHM - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: findPath(10, 40)
path = []

📋 RECURSIVE TRAVERSAL:

CALL 1: findPathHelper(10, path, 40)
Step 1: Check if root is null
root = 10 (not null) → continue

Step 2: Add node to path
path.push(10) → path = [10]

Step 3: Check if current node is target
root.key = 10, x = 40 → 10 ≠ 40 → not target

Step 4: Search in left subtree
root.left = 20 (exists) → call findPathHelper(20, path, 40)

CALL 2: findPathHelper(20, path, 40)
Step 1: Check if root is null
root = 20 (not null) → continue

Step 2: Add node to path
path.push(20) → path = [10, 20]

Step 3: Check if current node is target
root.key = 20, x = 40 → 20 ≠ 40 → not target

Step 4: Search in left subtree
root.left = null → condition false

Step 5: Search in right subtree
root.right = null → condition false

Step 6: Both subtrees returned false → backtrack
path.pop() → path = [10]
return false

BACK TO CALL 1: findPathHelper(10, path, 40)
Step 5: Left subtree returned false → search in right subtree
root.right = 30 (exists) → call findPathHelper(30, path, 40)

CALL 3: findPathHelper(30, path, 40)
Step 1: Check if root is null
root = 30 (not null) → continue

Step 2: Add node to path
path.push(30) → path = [10, 30]

Step 3: Check if current node is target
root.key = 30, x = 40 → 30 ≠ 40 → not target

Step 4: Search in left subtree
root.left = 40 (exists) → call findPathHelper(40, path, 40)

CALL 4: findPathHelper(40, path, 40)
Step 1: Check if root is null
root = 40 (not null) → continue

Step 2: Add node to path
path.push(40) → path = [10, 30, 40]

Step 3: Check if current node is target
root.key = 40, x = 40 → 40 === 40 → TARGET FOUND!
return true

BACK TO CALL 3: findPathHelper(30, path, 40)
Step 5: Left subtree returned true → target found!
return true (keep 30 in path)

BACK TO CALL 1: findPathHelper(10, path, 40)
Step 6: Right subtree returned true → target found!
return true (keep 10 in path)

BACK TO MAIN: findPath(10, 40)
Helper returned true → return path

🏆 RESULT: [10, 30, 40]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

PATH EXPLORATION:

EXPLORATION TREE:
       10 [add] → path = [10]
      /  \
     20   30 [add] → path = [10, 30]
[add]     / \
          40  50
      [found!]

BACKTRACKING VISUALIZATION:
Step 1: [10] → explore left
Step 2: [10, 20] → explore left (null) and right (null)
Step 3: [10] → backtrack, remove 20
Step 4: [10, 30] → explore right, add 30
Step 5: [10, 30, 40] → target found!

PATH CONSTRUCTION:
Initial: []
Add 10: [10]
Add 20: [10, 20]
Remove 20: [10] ← backtrack
Add 30: [10, 30]
Add 40: [10, 30, 40] ← target found!
Final: [10, 30, 40]

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

findPathHelper(10) → path=[10]
├── findPathHelper(20) → path=[10,20]
│   ├── findPathHelper(null) → return false
│   └── findPathHelper(null) → return false
│   └── backtrack: path=[10], return false
└── findPathHelper(30) → path=[10,30]
    ├── findPathHelper(40) → path=[10,30,40]
    │   └── TARGET FOUND! return true
    └── return true (keep 30)
└── return true (keep 10)

RECURSIVE CALLS: 4 total (10, 20, 30, 40)
BACKTRACKING: 1 time (node 20)
TARGET FOUND: At depth 3

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:

INPUT: Binary Tree
       1
      / \
     2   3
    / \
   4   5
Target: 5

STEP-BY-STEP PROCESS:

CALL 1: findPathHelper(1, path, 5)
path.push(1) → path = [1]
1 ≠ 5 → explore subtrees

CALL 2: findPathHelper(2, path, 5)
path.push(2) → path = [1, 2]
2 ≠ 5 → explore subtrees

CALL 3: findPathHelper(4, path, 5)
path.push(4) → path = [1, 2, 4]
4 ≠ 5 → explore subtrees
Both null → backtrack
path.pop() → path = [1, 2]
return false

BACK TO CALL 2: Right subtree search
CALL 4: findPathHelper(5, path, 5)
path.push(5) → path = [1, 2, 5]
5 === 5 → TARGET FOUND!
return true

BACK TO CALL 2: Right subtree returned true
return true (keep 2)

BACK TO CALL 1: Left subtree returned true
return true (keep 1)

🏆 RESULT: [1, 2, 5]

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Target is Root
Input: root = TreeNode(10), target = 10
Process:
- path.push(10) → path = [10]
- 10 === 10 → return true
Result: [10]

CASE 2: Target Not Found
Input: root = TreeNode(10), target = 100
Process:
- Explore entire tree
- All paths backtrack
- Return null
Result: null

CASE 3: Target is Leaf
Input: root with leaf = 5, target = 5
Process:
- Explore path to leaf
- Find target at leaf
- Keep all ancestors in path
Result: [root, ..., 5]

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RECURSIVE EXPLORATION: Naturally explores all paths in the tree
2️⃣ BACKTRACKING: Removes unsuccessful paths efficiently
3️⃣ PATH MAINTENANCE: Path array tracks current exploration path
4️⃣ EARLY TERMINATION: Returns immediately when target is found
5️⃣ EFFICIENT TRACKING: O(h) space for path, O(n) time for search

💡 KEY INSIGHT:
Use recursive DFS with backtracking to explore paths and maintain the
correct path by removing nodes when target is not found in their subtrees,
ensuring the path array contains only nodes from root to target!

🎯 TIME COMPLEXITY ANALYSIS:
- Worst case: O(n) - visit all nodes when target is last or not present
- Best case: O(log n) - target found quickly in balanced tree
- Average case: O(n) - depends on tree structure and target location
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h) where h is tree height
- Path array: O(h) to store path from root to target
- Total: O(h) space complexity
- Worst case (skewed tree): O(n)
- Best case (balanced tree): O(log n)

🎯 EDGE CASES HANDLED:
- Empty tree: Returns null (root is null)
- Target is root: Returns [root.key]
- Target not found: Returns null
- Target is leaf: Returns complete path to leaf

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find target if it exists
- Path array contains correct sequence
- Backtracking removes incorrect paths
- Early termination when target found
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Add node to path before checking if it's target
- Check left subtree first, then right subtree
- Return true if target found in either subtree
- Backtrack by removing node if target not found
- Use short-circuit evaluation for efficiency

🎯 BACKTRACKING PRINCIPLES:
- Add node optimistically to path
- Explore all subtrees recursively
- Remove node if target not in any subtree
- Keep node if target found in any subtree
- Maintain path integrity through recursion

🎯 PATH CONSTRUCTION STRATEGY:
- Path builds during forward traversal
- Successful nodes remain in path
- Unsuccessful nodes removed during backtracking
- Final path contains only root-to-target nodes
- No post-processing needed

🎯 RECURSIVE PATTERN BENEFITS:
- Natural tree structure exploration
- Automatic path maintenance
- Easy to understand and implement
- Handles complex tree structures
- Efficient with early termination

🎯 BACKTRACKING ADVANTAGES:
- Efficient path correction
- Automatic cleanup of wrong paths
- No need for separate path validation
- Memory efficient
- Clean implementation

🎯 COMPARISON WITH ALTERNATIVES:
- Iterative approach: More complex with explicit stack
- BFS approach: Requires storing paths for all nodes
- Parent pointer: Needs extra space for parent references
- This approach: Optimal balance of simplicity and efficiency

🎯 REAL-WORLD APPLICATIONS:
- File system path finding
- Network routing
- Dependency resolution
- Tree navigation systems
- Hierarchical data traversal

🎯 ALGORITHM PATTERN:
- Recursive DFS with backtracking
- Path construction during traversal
- Early termination on target found
- Automatic path cleanup

🎯 MATHEMATICAL PROPERTIES:
- Path length: At most h (tree height)
- Node visits: At most n (all nodes)
- Backtracking: At most h times
- Space usage: O(h) for recursion and path

🎯 ERROR HANDLING:
- Null root: Returns null immediately
- Invalid target: Returns null after full search
- Edge cases: Proper handling for all scenarios
- Boundary conditions: Correct behavior

🎯 ADVANTAGES OF THIS APPROACH:
- Simple and intuitive implementation
- Efficient with early termination
- Optimal space complexity O(h)
- Natural tree structure handling
- Clean backtracking logic

🎯 DISADVANTAGES:
- Recursion stack overhead
- Potential stack overflow for very deep trees
- Not optimal for repeated queries
- Cannot find all paths efficiently

🎯 ALTERNATIVE APPROACHES:
- Iterative DFS: Explicit stack, more complex
- BFS with parent tracking: O(n) space
- Parent pointers: Extra space per node
- All: Correct but different tradeoffs

🎯 IMPLEMENTATION CONSIDERATIONS:
- Handle null root explicitly
- Add node before checking if it's target
- Use short-circuit evaluation for efficiency
- Proper backtracking on failure
- Clear base case handling

🎯 TESTING STRATEGY:
- Empty tree
- Single node tree
- Target is root
- Target is leaf
- Target not found
- Various tree structures

🎯 DEBUGGING TIPS:
- Track path array changes
- Monitor recursive calls
- Verify backtracking logic
- Check base case handling
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for single path finding
- Space: O(h) - optimal for recursive approach
- Overall: Efficient and practical
- Scalable: Works well for typical trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Deep trees: Stack depth management
- Memory usage: Proportional to height
- Performance: Efficient with early termination

🎯 BEST PRACTICES:
- Check null before recursing
- Add node before target check
- Use short-circuit evaluation
- Proper backtracking on failure
- Clear and readable code

🎯 COMMON MISTAKES:
- Forgetting to add node to path
- Not backtracking on failure
- Wrong base case handling
- Incorrect subtree exploration
- Missing null checks

🎯 LEARNING OBJECTIVES:
- Understand recursive DFS
- Learn backtracking technique
- Master path construction
- Practice tree traversal
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain backtracking clearly
- Discuss space-time tradeoffs
- Handle edge cases systematically
- Write clean recursive code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Recursive exploration with backtracking
- Path maintenance through recursion
- Early termination optimization
- Efficient tree traversal
- Clean problem decomposition

🎯 MATHEMATICAL ANALYSIS:
- Maximum path length: h (height)
- Node visits: n in worst case
- Backtracking operations: h maximum
- Space usage: O(h) for recursion + path
- Total: O(n) time, O(h) space

🎯 IMPLEMENTATION CHALLENGES:
- Correct backtracking logic
- Proper path maintenance
- Efficient subtree exploration
- Edge case comprehensive coverage
- Clear base case handling

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify path correctness
- Check edge case handling
- Monitor space usage
- Validate algorithm correctness

🎯 ALGORITHM EVOLUTION:
- Basic DFS: Finds node but not path
- With path tracking: This approach
- With parent pointers: Different technique
- Iterative version: More complex

🎯 PRACTICAL APPLICATIONS:
- File path finding
- Network routing algorithms
- Dependency resolution
- Tree navigation
- Hierarchical data queries

🎯 OPTIMIZATION OPPORTUNITIES:
- Cache paths for repeated queries
- Use parent pointers if available
- Optimize for specific tree structures
- Consider iterative for very deep trees
- Use BFS for level-based queries

🎯 RELATED PROBLEMS:
- Lowest Common Ancestor
- All paths from root to leaves
- Path sum problems
- Longest path in tree
- Distance between nodes

🎯 PROBLEM VARIATIONS:
- Find all paths to target
- Find path with maximum sum
- Find shortest path (in general graph)
- Find path with specific properties
- Find multiple target paths

🎯 CONCLUSION:
The find path from root to node problem demonstrates how to use recursive
DFS with backtracking to efficiently find and maintain the path from root
to a target node, achieving O(n) time complexity and O(h) space complexity
with clean and intuitive implementation!
*/