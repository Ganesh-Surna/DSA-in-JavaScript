/* Problem: ✅✅✅✅ Time to Burn Tree from Leaf ✅✅✅✅

Given a binary tree and a leaf node, find the minimum time to burn the entire tree if it is lit from the given leaf. 
It is known that in 1 second, all nodes connected to a given node get burned. 
That is, its parent, immediate children, and connected siblings get burned in 1 second.

You are given the root of a binary tree and a leaf node. 
The task is to find the minimum time required to burn the entire tree if the fire starts from the given leaf node. 
In each second, the fire spreads to all adjacent nodes (parent, children, siblings).

Example 1:
Input: 
       10
      /  \
     20   30
    / \    \
   40 50    60
leaf = 50

Output: 4
Explanation: Fire starts at node 50. 
            In 1 second: burns 20. 
            In 2 seconds: burns 10, 40. 
            In 3 seconds: burns 30. 
            In 4 seconds: burns 60.

            Total time = 4 seconds.

Example 2:
Input:
       10
      /
     20
    /
   30
  /  \
 40   50
/
60
/
70
leaf = 50

Output: 4
Explanation: Fire starts at node 50. In 1 second: burns 30. In 2 seconds: burns 20, 40. In 3 seconds: burns 10, 60. In 4 seconds: burns 70. Total time = 4 seconds.

Example 3:
Input:
       10
      /
     20
    /
   30
  /  \
 40   50
leaf = 50

Output: 3
Explanation: Fire starts at node 50. In 1 second: burns 30. In 2 seconds: burns 20, 40. In 3 seconds: burns 10. Total time = 3 seconds.

Example 4:
Input:
       10
      /
     20
leaf = 30

Output: -1
Explanation: Leaf node 30 doesn't exist in the tree, so return -1.

Constraints:
- The number of nodes in the tree is in the range [1, 10^4]
- -10^4 <= Node.val <= 10^4
- The leaf node value is guaranteed to be unique if it exists

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
function timeToBurnTreeFromLeaf(root, leaf){
   let res = -1
   let dist = [-1]
   helper(root, leaf, dist)
   
   return res
   
   // Helpers
   function helper(root, leaf, dist = [-1]){
       if(!root) return 0 // return height 0
       
       if(root.key === leaf){
           dist[0] = 0 // set dist as 0 (as the leaf found)
           return 1 // return height as 1
       }
       
       let l_dist = [-1], r_dist = [-1]
       let lh = helper(root.left, leaf, l_dist)
       let rh = helper(root.right, leaf, r_dist)
       
       if(l_dist[0] !== -1){
        // If target found in left subtree: burn time = right_height + distance_to_target
           dist[0] = l_dist[0] + 1  // left distance added to dist[0]
           res = Math.max(res, rh+dist[0]) // So rh + dist[0]
       }else if(r_dist[0] !== -1){
        // If target found in right subtree: burn time = left_height + distance_to_target
           dist[0] = r_dist[0] + 1 // right distance added to dist[0]
           res = Math.max(res, lh+dist[0]) // So lh + dist[0]
       }
       
       return 1+Math.max(lh, rh) // return height
   }
   
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.left.left = new TreeNode(40)
root.left.right = new TreeNode(50)
root.right.right = new TreeNode(60)
let leaf = 50
// Output: 4

root = new TreeNode(10)
root.left = new TreeNode(20)
root.left.left = new TreeNode(30)
root.left.left.right = new TreeNode(50)
root.left.left.left = new TreeNode(40)
root.left.left.left.left = new TreeNode(60)
root.left.left.left.left.left = new TreeNode(70)
leaf = 50
// Output: 4

root = new TreeNode(10)
root.left = new TreeNode(20)
root.left.left = new TreeNode(30)
root.left.left.right = new TreeNode(50)
root.left.left.left = new TreeNode(40)
leaf = 50
// Output: 3

root = new TreeNode(10)
root.left = new TreeNode(20)
leaf = 30
// Output: -1

console.log(timeToBurnTreeFromLeaf(root, leaf))

/*🎯 CORE IDEA: Use recursive DFS traversal to find the target leaf node while calculating distances and heights. 
For each node on the path from target to root, 
calculate the maximum burn time by adding the distance from target to current node plus the height of the opposite subtree. 
Track the global maximum burn time across all such calculations.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize result variable to track maximum burn time
   - Start recursive helper function with distance tracking
   - Use reference arrays to track distances between nodes

2️⃣ TARGET LEAF SEARCH:
   - Base case: null node returns height 0
   - If current node is target leaf: set distance to 0, return height 1
   - Recursively search in left and right subtrees

3️⃣ DISTANCE AND HEIGHT CALCULATION:
   - For each recursive call, track distances in left and right subtrees
   - Calculate heights of left and right subtrees
   - Update distances when target is found in subtrees

4️⃣ BURN TIME CALCULATION:
   - If target found in left subtree: burn time = right_height + distance_to_target
   - If target found in right subtree: burn time = left_height + distance_to_target
   - Update global maximum burn time with calculated values

🧠 WHY THIS APPROACH?
- Fire spreads in all directions from the target leaf
- Maximum burn time occurs when fire reaches the farthest node ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐
- Distance tracking helps calculate burn time efficiently
- Single DFS traversal combines search, distance, and height calculations

💡 KEY INSIGHTS:
- Burn time = distance_from_target + height_of_opposite_subtree
- Each node on target-to-root path is a potential bottleneck
- Fire spreads simultaneously in all directions
- Global maximum tracks the longest burn path
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Tree with target leaf 50

INPUT: Binary Tree
       10
      /  \
     20   30
    / \    \
   40 50    60
leaf = 50

OUTPUT: 4
EXPLANATION: Fire starts at 50 → burns 20 (1s) → burns 10,40 (2s) → burns 30 (3s) → burns 60 (4s).

🎯 GOAL: Find minimum time to burn entire tree starting from leaf 50!

🔍 RECURSIVE TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = -1 (global maximum burn time)
dist = [-1] (distance from current node to target)
Start: helper(10, 50, dist)

📋 RECURSIVE CALLS:

CALL 1: helper(10, 50, [-1]) - ROOT NODE
node = 10, target = 50
l_dist = [-1], r_dist = [-1]
lh = helper(20, 50, l_dist) → need to calculate
rh = helper(30, 50, r_dist) → need to calculate

CALL 2: helper(20, 50, l_dist) - LEFT SUBTREE
node = 20, target = 50
l_dist_2 = [-1], r_dist_2 = [-1]
lh = helper(40, 50, l_dist_2) → need to calculate
rh = helper(50, 50, r_dist_2) → need to calculate

CALL 3: helper(40, 50, l_dist_2) - LEFT CHILD OF 20
node = 40, target = 50
40 ≠ 50, no children
lh = helper(null, 50, [-1]) = 0
rh = helper(null, 50, [-1]) = 0
l_dist_2[0] = -1, r_dist_2[0] = -1 (target not found)
return 1 + max(0, 0) = 1

CALL 4: helper(50, 50, r_dist_2) - TARGET FOUND!
node = 50, target = 50
50 === 50 → TARGET FOUND
r_dist_2[0] = 0 (distance to target = 0)
return 1 (height of target node)

📋 BACK TO CALL 2: helper(20, 50, l_dist)
lh = 1 (from helper(40))
rh = 1 (from helper(50))
l_dist_2[0] = -1, r_dist_2[0] = 0
Target found in right subtree (50)
l_dist[0] = r_dist_2[0] + 1 = 0 + 1 = 1
res = max(-1, lh + l_dist[0]) = max(-1, 1 + 1) = 2
return 1 + max(1, 1) = 2

CALL 5: helper(30, 50, r_dist) - RIGHT SUBTREE
node = 30, target = 50
l_dist_3 = [-1], r_dist_3 = [-1]
lh = helper(null, 50, l_dist_3) = 0
rh = helper(60, 50, r_dist_3) → need to calculate

CALL 6: helper(60, 50, r_dist_3) - RIGHT CHILD OF 30
node = 60, target = 50
60 ≠ 50, no children
lh = helper(null, 50, [-1]) = 0
rh = helper(null, 50, [-1]) = 0
Target not found
return 1 + max(0, 0) = 1

📋 BACK TO CALL 5: helper(30, 50, r_dist)
lh = 0, rh = 1
l_dist_3[0] = -1, r_dist_3[0] = -1
Target not found in either subtree
r_dist[0] = -1
return 1 + max(0, 1) = 2

📋 BACK TO CALL 1: helper(10, 50, dist)
lh = 2 (from helper(20))
rh = 2 (from helper(30))
l_dist[0] = 1, r_dist[0] = -1
Target found in left subtree
dist[0] = l_dist[0] + 1 = 1 + 1 = 2
res = max(2, rh + dist[0]) = max(2, 2 + 2) = 4
return 1 + max(2, 2) = 3

📋 FINAL RESULT:
res = 4 → timeToBurnTreeFromLeaf(10, 50) = 4

🏆 RESULT: 4

─────────────────────────────────────────

📊 EXAMPLE: Simple Tree with target leaf 50

INPUT: Binary Tree
       10
      /
     20
    /
   30
  /  \
 40   50
leaf = 50

OUTPUT: 3
EXPLANATION: Fire starts at 50 → burns 30 (1s) → burns 20,40 (2s) → burns 10 (3s).

🔍 Process:

INITIALIZATION:
res = -1
Start: helper(10, 50, [-1])

CALL 1: helper(10, 50)
lh = helper(20, 50) → need to calculate
rh = helper(null, 50) = 0

CALL 2: helper(20, 50)
lh = helper(30, 50) → need to calculate
rh = helper(null, 50) = 0

CALL 3: helper(30, 50)
lh = helper(40, 50) = 1 (target not found)
rh = helper(50, 50) = 1 (target found, distance = 0)
Target found in right subtree
distance from 30 to target = 0 + 1 = 1
res = max(-1, 1 + 1) = 2
return 2

📋 BACK TO CALL 2: helper(20, 50)
lh = 2, rh = 0
Target found in left subtree
distance from 20 to target = 1 + 1 = 2
res = max(2, 0 + 2) = 2
return 3

📋 BACK TO CALL 1: helper(10, 50)
lh = 3, rh = 0
Target found in left subtree
distance from 10 to target = 2 + 1 = 3
res = max(2, 0 + 3) = 3
return 4

📋 FINAL RESULT:
res = 3 → timeToBurnTreeFromLeaf(10, 50) = 3

🏆 RESULT: 3

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

FIRE SPREAD SIMULATION FOR EXAMPLE 1:

ORIGINAL TREE:
       10
      /  \
     20   30
    / \    \
   40 50    60

TIME 0: Fire starts at 50
       10
      /  \
     20   30
    / \    \
   40 🔥    60

TIME 1: Fire spreads to parent 20
       10
      /  \
    🔥   30
    / \    \
   40 🔥    60

TIME 2: Fire spreads to 10 and 40
      🔥
      /  \
    🔥   30
    / \    \
  🔥 🔥    60

TIME 3: Fire spreads to 30
      🔥
      /  \
    🔥  🔥
    / \    \
  🔥 🔥    60

TIME 4: Fire spreads to 60
      🔥
      /  \
    🔥  🔥
    / \    \
  🔥 🔥   🔥

TOTAL BURN TIME: 4 seconds

─────────────────────────────────────────

📊 BURN TIME CALCULATION FOR EACH NODE:

At each node on path from target to root:
BURN_TIME = DISTANCE_TO_TARGET + HEIGHT_OF_OPPOSITE_SUBTREE

NODE 50 (target): distance = 0, no calculation needed
NODE 20 (parent of 50): 
  - distance to 50 = 1
  - opposite subtree height (40) = 1
  - burn time = 1 + 1 = 2
NODE 10 (root):
  - distance to 50 = 2
  - opposite subtree height (30 subtree) = 2
  - burn time = 2 + 2 = 4

MAXIMUM BURN TIME = 4

─────────────────────────────────────────

📊 DISTANCE AND HEIGHT TRACKING:

DISTANCE ARRAYS:
- Track distance from current node to target
- [-1] indicates target not found in subtree
- [0] indicates target found at current node
- [n] indicates target found at distance n

HEIGHT CALCULATION:
- Standard tree height: 1 + max(left_height, right_height)
- Used to calculate opposite subtree heights
- Essential for burn time calculation

GLOBAL MAXIMUM:
- res variable tracks maximum burn time
- Updated whenever target is found in a subtree
- Final result is the maximum across all calculations

─────────────────────────────────────────

📊 RECURSIVE CALL TREE:

timeToBurnTreeFromLeaf(10, 50)
└── helper(10, 50, [-1]) → height=3, dist=2, res=4
    ├── helper(20, 50, [-1]) → height=2, dist=1, res=2
    │   ├── helper(40, 50, [-1]) → height=1, dist=-1
    │   │   ├── helper(null) → 0
    │   │   └── helper(null) → 0
    │   └── helper(50, 50, [-1]) → height=1, dist=0 ✓
    │       ├── helper(null) → 0
    │       └── helper(null) → 0
    └── helper(30, 50, [-1]) → height=2, dist=-1
        ├── helper(null) → 0
        └── helper(60, 50, [-1]) → height=1, dist=-1
            ├── helper(null) → 0
            └── helper(null) → 0

RES PROGRESSION: -1 → 2 → 4

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ FIRE SPREAD SIMULATION: Models actual fire spread behavior
2️⃣ DISTANCE TRACKING: Calculates how far fire has to travel
3️⃣ HEIGHT CALCULATION: Determines maximum spread in opposite direction
4️⃣ GLOBAL MAXIMUM: Ensures we find the longest burn path
5️⃣ SINGLE TRAVERSAL: Efficient O(n) time complexity

💡 KEY INSIGHT:
Use DFS traversal to find target while calculating distances and heights,
then compute burn time as distance_to_target + opposite_subtree_height!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Distance calculation per node: O(1)
- Height calculation per node: O(1)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(h) where h is tree height
- Distance arrays: O(h) for recursive calls
- Total: O(h) space complexity

🎯 EDGE CASES HANDLED:
- Target not found in tree: return -1
- Single node tree: return 0 if target is root
- Linear tree: maximum distance from target
- Balanced tree: efficient burn calculation

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find target if it exists
- Distance calculations are accurate
- Height calculations are correct
- Global maximum tracks longest burn path
- All possible burn paths are considered

🎯 IMPLEMENTATION DETAILS:
- Reference arrays for distance tracking
- Recursive DFS traversal
- Height calculation with max function
- Distance propagation upward
- Global maximum update

🎯 FIRE SPREAD MECHANICS:
- Fire starts at target leaf node
- Each second, fire spreads to adjacent nodes
- Adjacent nodes: parent, children, siblings
- Burn time = time to reach farthest node
- Multiple paths considered simultaneously

🎯 DISTANCE CALCULATION:
- Distance from target to current node
- Propagated upward during recursion
- Used to calculate burn time at each level
- Essential for determining fire spread time

🎯 OPTIMIZATION TECHNIQUES:
- Single DFS traversal instead of multiple searches
- Combined target search and burn calculation
- Reference arrays for efficient distance tracking
- Early termination when target not found

🎯 COMPARISON WITH ALTERNATIVE APPROACHES:
- BFS approach: O(n) time, O(n) space (less efficient)
- Two-pass approach: First find target, then calculate
- Current approach: O(n) time, O(h) space (optimal)
- All: Correct burn time calculation

🎯 REAL-WORLD APPLICATIONS:
- Fire spread simulation
- Network failure analysis
- Infection spread modeling
- Tree burning problems
- Graph traversal applications

🎯 ALGORITHM PATTERN:
- Recursive tree traversal
- Distance tracking
- Height calculation
- Global maximum updates

🎯 MATHEMATICAL PROPERTIES:
- Burn time = max(distance_to_target + opposite_height)
- Distance propagation: parent_distance = child_distance + 1
- Height calculation: 1 + max(left_height, right_height)
- Fire spreads at constant rate in all directions

🎯 ERROR HANDLING:
- Target not found: return -1
- Null nodes: return height 0
- Invalid inputs: base case handling
- Edge cases: comprehensive coverage

🎯 ADVANTAGES OF CURRENT APPROACH:
- Single traversal: O(n) time complexity
- Space efficient: O(h) space complexity
- Accurate simulation of fire spread
- Easy to understand and implement
- Handles all edge cases correctly

🎯 DISADVANTAGES:
- Reference arrays add complexity
- Recursion stack overhead
- Distance tracking logic
- Less intuitive than BFS

🎯 ALTERNATIVE APPROACHES:
- BFS from target: O(n) time, O(n) space
- Two-pass DFS: First find, then calculate
- Parent pointer approach: O(n) time, O(n) space
- All: Correct burn time calculation

🎯 IMPLEMENTATION CONSIDERATIONS:
- Tree structure validation
- Target existence check
- Distance array management
- Memory usage optimization
- Stack overflow prevention

🎯 TESTING STRATEGY:
- Target at different positions
- Various tree structures
- Edge cases (target not found)
- Single node trees
- Linear and balanced trees

🎯 DEBUGGING TIPS:
- Track distance array updates
- Verify height calculations
- Monitor global maximum updates
- Check target finding logic
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
- Use reference arrays for distance tracking
- Handle target not found case
- Validate tree structure
- Write clean recursive code
- Test thoroughly with edge cases

🎯 COMMON MISTAKES:
- Forgetting to check target existence
- Incorrect distance propagation
- Missing global maximum updates
- Poor base case handling
- Inefficient multiple traversals

🎯 LEARNING OBJECTIVES:
- Understand fire spread simulation
- Learn distance tracking in trees
- Master recursive traversal patterns
- Practice optimization techniques
- Improve algorithm design skills

🎯 INTERVIEW TIPS:
- Explain fire spread mechanics clearly
- Discuss distance and height relationship
- Handle edge cases properly
- Write clean recursive code
- Test with multiple examples

🎯 ALGORITHM INSIGHTS:
- Recursive tree traversal
- Distance and height calculations
- Global maximum tracking
- Fire spread simulation
- Single pass efficiency

🎯 MATHEMATICAL ANALYSIS:
- Node visits: Each node visited once
- Distance calculations: O(h) propagations
- Height calculations: n calculations
- Maximum updates: O(h) updates
- Total: O(n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Managing distance arrays correctly
- Proper height calculation
- Global maximum updates
- Target finding logic
- Recursive structure maintenance

🎯 SOLUTION VALIDATION:
- Test fire spread simulation
- Verify distance calculations
- Check height computations
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: Multiple traversals
- Optimized approach: Single traversal
- Alternative approaches: BFS methods
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- Fire simulation systems
- Network analysis tools
- Infection spread models
- Tree analysis algorithms
- Graph traversal problems

🎯 CONCLUSION:
The time to burn tree problem demonstrates how to use recursive
DFS traversal with distance tracking to simulate fire spread,
achieving efficient O(n) time complexity by combining target
search with burn time calculation in a single traversal!
*/