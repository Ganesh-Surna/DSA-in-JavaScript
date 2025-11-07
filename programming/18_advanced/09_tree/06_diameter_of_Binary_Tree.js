/* Problem: ✅✅✅✅ Diameter of Binary Tree ✅✅✅✅

Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.

You are given the root of a binary tree. The task is to find the diameter of the tree, which is the maximum number of nodes in any path between two leaf nodes (or any two nodes).

Example 1:
Input: 
       10
      /  \
     20   30
        /  \
       40   50
      /
     60

Output: 5
Explanation: The diameter is the path [60, 40, 30, 50] which has 4 edges (5 nodes). This is the longest path between any two nodes.

Example 2:
Input:
       10
      /  \
     20   60
    /
   30
  /  \
 50   80
/      \
60      90
         \
          18

Output: 7
Explanation: The diameter is the path [60, 50, 30, 20, 80, 90, 18] which has 6 edges (7 nodes).

Example 3:
Input:
       10
      /
     20
    /
   60

Output: 3
Explanation: The diameter is the path [60, 20, 10] which has 2 edges (3 nodes).

Constraints:
- The number of nodes in the tree is in the range [1, 10^4]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(h) where h is the height of the tree
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n)
// ✅ SC = O(h)
function diameterOfBinaryTree(root){
    let res = 0
    
    height(root)
    return res
    
    function height(root){
        if(!root) return 0
        
        let lh = height(root.left) 
        let rh = height(root.right)
        
        // Only new thing in height function is diameter calculation
        res = Math.max(res, 1+lh+rh) // ⭐⭐⭐⭐⭐ Diameter Calculation (✅✅✅✅ NOTE: If dia in terms of edges, then it is --> lh + rh)
        
        return 1 + Math.max(lh, rh) // return height
    }
}

root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.right.left = new TreeNode(40)
root.right.right = new TreeNode(50)
root.right.left.left = new TreeNode(60)
// Output: 5

root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(60)
root.left.left = new TreeNode(30)
root.left.left.left = new TreeNode(50)
root.left.left.left.left = new TreeNode(60)
root.left.left.right = new TreeNode(50)
root.left.right = new TreeNode(80)
root.left.right.right = new TreeNode(90)
root.left.right.right.right = new TreeNode(18)
// Output: 7

root = new TreeNode(10)
root.left = new TreeNode(20)
root.left.left = new TreeNode(60)
// Output: 3

console.log(diameterOfBinaryTree(root))

/*🎯 CORE IDEA: Use recursive traversal to calculate diameter by considering each node as a potential "bridge" in the longest path. For each node, the diameter passing through it is 1 + left_height + right_height. Track the maximum diameter found across all nodes while simultaneously calculating heights in a single DFS traversal.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize global result variable to track maximum diameter
   - Start recursive height function from root
   - Each node calculates both height and potential diameter

2️⃣ HEIGHT CALCULATION:
   - Base case: null node returns height 0
   - Recursively calculate left subtree height
   - Recursively calculate right subtree height
   - Return 1 + max(left_height, right_height)

3️⃣ DIAMETER CALCULATION:
   - For current node: diameter = 1 + left_height + right_height
   - Update global maximum with current diameter
   - This represents longest path passing through current node

4️⃣ OPTIMIZATION:
   - Single DFS traversal calculates both height and diameter
   - Each node visited once: O(n) time complexity
   - Height calculation and diameter update in same pass

🧠 WHY THIS APPROACH?
- Each node could be the "bridge" of the longest path
- Diameter through a node = 1 + left_height + right_height
- Single traversal combines height calculation with diameter tracking
- Efficient O(n) time and O(h) space complexity

💡 KEY INSIGHTS:
- Diameter = longest path between any two nodes
- Path can pass through any node (not necessarily root)
- Height calculation enables diameter computation
- Global variable tracks maximum diameter found
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Tree with diameter 5

INPUT: Binary Tree
       10
      /  \
     20   30
        /  \
       40   50
      /
     60

OUTPUT: 5
EXPLANATION: The longest path is [60, 40, 30, 50] with 4 edges (5 nodes).

🎯 GOAL: Find the diameter (longest path) of the binary tree!

🔍 RECURSIVE TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = 0 (global maximum diameter)
Start: height(10)

📋 RECURSIVE CALLS:

CALL 1: height(10) - ROOT NODE
node = 10, has children (20, 30)
lh = height(20) → need to calculate
rh = height(30) → need to calculate

CALL 2: height(20) - LEFT SUBTREE
node = 20, no children
lh = height(null) = 0
rh = height(null) = 0
Current diameter = 1 + 0 + 0 = 1
res = max(0, 1) = 1
return 1 + max(0, 0) = 1

CALL 3: height(30) - RIGHT SUBTREE
node = 30, has children (40, 50)
lh = height(40) → need to calculate
rh = height(50) → need to calculate

CALL 4: height(40) - LEFT CHILD OF 30
node = 40, has left child (60)
lh = height(60) → need to calculate
rh = height(null) = 0

CALL 5: height(60) - LEAF NODE
node = 60, no children
lh = height(null) = 0
rh = height(null) = 0
Current diameter = 1 + 0 + 0 = 1
res = max(1, 1) = 1
return 1 + max(0, 0) = 1

📋 BACK TO CALL 4: height(40)
lh = 1 (from height(60))
rh = 0 (from height(null))
Current diameter = 1 + 1 + 0 = 2
res = max(1, 2) = 2
return 1 + max(1, 0) = 2

CALL 6: height(50) - RIGHT CHILD OF 30
node = 50, no children
lh = height(null) = 0
rh = height(null) = 0
Current diameter = 1 + 0 + 0 = 1
res = max(2, 1) = 2
return 1 + max(0, 0) = 1

📋 BACK TO CALL 3: height(30)
lh = 2 (from height(40))
rh = 1 (from height(50))
Current diameter = 1 + 2 + 1 = 4
res = max(2, 4) = 4
return 1 + max(2, 1) = 3

📋 BACK TO CALL 1: height(10)
lh = 1 (from height(20))
rh = 3 (from height(30))
Current diameter = 1 + 1 + 3 = 5
res = max(4, 5) = 5
return 1 + max(1, 3) = 4

📋 FINAL RESULT:
res = 5 → diameterOfBinaryTree(10) = 5

🏆 RESULT: 5

─────────────────────────────────────────

📊 EXAMPLE: Simple Tree with diameter 3

INPUT: Binary Tree
       10
      /
     20
    /
   60

OUTPUT: 3
EXPLANATION: The longest path is [60, 20, 10] with 2 edges (3 nodes).

🔍 Process:

INITIALIZATION:
res = 0
Start: height(10)

CALL 1: height(10)
lh = height(20) → need to calculate
rh = height(null) = 0

CALL 2: height(20)
lh = height(60) → need to calculate
rh = height(null) = 0

CALL 3: height(60)
lh = height(null) = 0
rh = height(null) = 0
Current diameter = 1 + 0 + 0 = 1
res = max(0, 1) = 1
return 1

📋 BACK TO CALL 2: height(20)
lh = 1 (from height(60))
rh = 0
Current diameter = 1 + 1 + 0 = 2
res = max(1, 2) = 2
return 1 + max(1, 0) = 2

📋 BACK TO CALL 1: height(10)
lh = 2 (from height(20))
rh = 0
Current diameter = 1 + 2 + 0 = 3
res = max(2, 3) = 3
return 1 + max(2, 0) = 3

📋 FINAL RESULT:
res = 3 → diameterOfBinaryTree(10) = 3

🏆 RESULT: 3

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
       10
      /  \
     20   30
        /  \
       40   50
      /
     60

DIAMETER CALCULATION FOR EACH NODE:

NODE 60: diameter = 1 + 0 + 0 = 1 (leaf node)
NODE 20: diameter = 1 + 0 + 0 = 1 (leaf node)
NODE 50: diameter = 1 + 0 + 0 = 1 (leaf node)
NODE 40: diameter = 1 + 1 + 0 = 2 (has one child)
NODE 30: diameter = 1 + 2 + 1 = 4 (bridge between subtrees)
NODE 10: diameter = 1 + 1 + 3 = 5 (root bridge)

MAXIMUM DIAMETER = 5

LONGEST PATH VISUALIZATION:
     60
      ↑
     40
      ↑
     30 ← (bridge node)
      ↓
     50

Path: 60 → 40 → 30 → 50
Length: 4 edges (5 nodes)

─────────────────────────────────────────

📊 HEIGHT VS DIAMETER CALCULATION:

For each node:
HEIGHT = 1 + max(left_height, right_height)
DIAMETER = 1 + left_height + right_height

HEIGHTS (bottom-up):
Node 60: height = 1
Node 20: height = 1
Node 50: height = 1
Node 40: height = 1 + max(1, 0) = 2
Node 30: height = 1 + max(2, 1) = 3
Node 10: height = 1 + max(1, 3) = 4

DIAMETERS (calculated during traversal):
Node 60: 1 + 0 + 0 = 1
Node 20: 1 + 0 + 0 = 1
Node 50: 1 + 0 + 0 = 1
Node 40: 1 + 1 + 0 = 2
Node 30: 1 + 2 + 1 = 4
Node 10: 1 + 1 + 3 = 5

MAXIMUM = 5

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

diameterOfBinaryTree(10)
└── height(10) → height=4, diameter=5
    ├── height(20) → height=1, diameter=1
    │   ├── height(null) → 0
    │   └── height(null) → 0
    └── height(30) → height=3, diameter=4
        ├── height(40) → height=2, diameter=2
        │   ├── height(60) → height=1, diameter=1
        │   │   ├── height(null) → 0
        │   │   └── height(null) → 0
        │   └── height(null) → 0
        └── height(50) → height=1, diameter=1
            ├── height(null) → 0
            └── height(null) → 0

RES PROGRESSION: 0 → 1 → 1 → 1 → 2 → 4 → 5

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ SINGLE TRAVERSAL: Each node visited exactly once
2️⃣ HEIGHT CALCULATION: Enables diameter computation
3️⃣ DIAMETER TRACKING: Global variable tracks maximum
4️⃣ BRIDGE CONCEPT: Each node considered as path bridge
5️⃣ OPTIMIZATION: Combined height and diameter calculation

💡 KEY INSIGHT:
Use single DFS traversal to calculate height while tracking
maximum diameter by considering each node as a potential bridge!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Height calculation per node: O(1)
- Diameter update per node: O(1)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(h) where h is tree height
- No extra data structures used
- Total: O(h) space complexity

🎯 EDGE CASES HANDLED:
- Single node tree: diameter = 1
- Linear tree: diameter = number of nodes
- Balanced tree: diameter through root or subtree
- Empty tree: handled by base case

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to visit every node
- Height calculation is correct
- Diameter calculation considers all paths
- Global maximum tracks best result
- All possible bridges examined

🎯 IMPLEMENTATION DETAILS:
- Recursive DFS traversal
- Global variable for maximum diameter
- Height calculation with max function
- Diameter update with addition
- Single pass optimization

🎯 DIAMETER DEFINITION:
- Longest path between any two nodes
- Path length = number of edges
- Node count = edge count + 1
- Can pass through any node (not just root)

🎯 BRIDGE CONCEPT:
- Each node can be a bridge in longest path
- Diameter through node = 1 + left_height + right_height
- Left and right subtrees contribute heights
- Bridge node adds 1 to total path length

🎯 OPTIMIZATION TECHNIQUES:
- Single DFS traversal instead of multiple passes
- Combined height and diameter calculation
- Global variable avoids return value complexity
- Early computation prevents redundant work

🎯 COMPARISON WITH ALTERNATIVE APPROACHES:
- Naive approach: O(n²) time (height for each node)
- Optimized approach: O(n) time (single traversal)
- Both: Correct diameter calculation
- Optimized: More efficient and practical

🎯 REAL-WORLD APPLICATIONS:
- Network diameter calculation
- Tree analysis and optimization
- Path finding algorithms
- Data structure analysis
- Graph theory applications

🎯 ALGORITHM PATTERN:
- Recursive tree traversal
- Global variable tracking
- Height calculation
- Maximum value updates

🎯 MATHEMATICAL PROPERTIES:
- Tree height: h = log(n) for balanced trees
- Diameter: maximum of all node diameters
- Path length: edges between nodes
- Node relationships: parent-child connections

🎯 ERROR HANDLING:
- Null nodes: Return 0 height
- Single nodes: Return 1 height, 1 diameter
- Empty tree: Base case handling
- All cases: Comprehensive coverage

🎯 ADVANTAGES OF OPTIMIZED APPROACH:
- Single traversal: O(n) time complexity
- Space efficient: O(h) space complexity
- Simple to understand and implement
- Correct and reliable results
- Optimal for given constraints

🎯 DISADVANTAGES:
- Global variable usage
- Recursion stack overhead
- Potential stack overflow for deep trees
- Less intuitive for some developers

🎯 ALTERNATIVE APPROACHES:
- Two-pass approach: First pass for heights, second for diameters
- Iterative approach with stack: O(n) time, O(n) space
- Bottom-up approach: Similar to current solution
- All: Correct diameter calculation

🎯 IMPLEMENTATION CONSIDERATIONS:
- Tree structure: Balanced vs skewed
- Stack depth: Monitor recursion limits
- Memory usage: Track variable storage
- Performance: Single pass optimization

🎯 TESTING STRATEGY:
- Single node tree
- Linear tree (linked list)
- Balanced tree
- Skewed tree
- Various tree structures

🎯 DEBUGGING TIPS:
- Track global variable updates
- Verify height calculations
- Monitor diameter computations
- Check base cases
- Validate recursive calls

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree traversal
- Space: O(h) - optimal for recursive approach
- Overall: Efficient for given constraints
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Monitor stack depth
- Deep trees: Consider iterative approach
- Memory usage: Track recursion stack
- Optimization: Single traversal benefit

🎯 BEST PRACTICES:
- Use single traversal for efficiency
- Handle base cases properly
- Write clean recursive code
- Track global variables carefully
- Test thoroughly

🎯 COMMON MISTAKES:
- Forgetting to update global maximum
- Incorrect height calculation
- Missing base case handling
- Poor diameter formula
- Multiple traversal inefficiency

🎯 LEARNING OBJECTIVES:
- Understand tree diameter concept
- Learn recursive traversal patterns
- Master height calculation
- Practice optimization techniques
- Improve algorithm design skills

🎯 INTERVIEW TIPS:
- Explain the bridge concept clearly
- Discuss single traversal optimization
- Handle edge cases properly
- Write clean code
- Test with examples

🎯 ALGORITHM INSIGHTS:
- Recursive tree traversal
- Height and diameter relationship
- Global variable optimization
- Bridge node concept
- Single pass efficiency

🎯 MATHEMATICAL ANALYSIS:
- Node visits: Each node visited once
- Height calculations: n calculations
- Diameter updates: n updates
- Maximum operations: n comparisons
- Total: O(n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct height calculation
- Updating global maximum properly
- Handling edge cases correctly
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify height calculations
- Check diameter updates
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: Multiple passes
- Optimized approach: Single pass
- Alternative approaches: Iterative methods
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Tree analysis
- Network diameter
- Path optimization
- Data structure design
- Algorithm optimization

🎯 CONCLUSION:
The diameter of binary tree problem demonstrates how to use
recursive DFS traversal to calculate both height and diameter
in a single pass, achieving efficient O(n) time complexity by
considering each node as a potential bridge in the longest path!
*/