/* Problem: ✅✅✅✅ Vertical Width of Binary Tree ✅✅✅✅

Given the root of a binary tree, find the vertical width of the tree. 
The vertical width is the number of distinct vertical lines that pass through 
the tree nodes when the tree is viewed from top.

Vertical width definition:
- Assign each node a horizontal distance (HD) from the root
- Root has HD = 0
- Left child has HD = parent's HD - 1
- Right child has HD = parent's HD + 1
- Vertical width = count of distinct horizontal distances = (maxHD - minHD + 1)

You are given the root of a binary tree. The task is to find the total number of vertical lines that pass through at least one node.

Example 1:
Input: 
       1 (HD=0)
      / \
     2   3 (HD=-1, HD=+1)
    / \ / \
   4  5 6  7 (HD=-2, HD=0, HD=0, HD=+2)

Output: 5
Explanation: 
Vertical lines at HD: -2, -1, 0, 1, 2
Total distinct HDs = 5
Vertical width = maxHD(2) - minHD(-2) + 1 = 5

Example 2:
Input:
       1
      /
     2
    /
   3

Output: 3
Explanation: 
HD values: 1(0), 2(-1), 3(-2)
Vertical width = 0 - (-2) + 1 = 3

Example 3:
Input:
       1
        \
         3
          \
           7

Output: 3
Explanation:
HD values: 1(0), 3(1), 7(2)
Vertical width = 2 - 0 + 1 = 3

Example 4:
Input: null

Output: 0
Explanation: Empty tree has no vertical lines.

Constraints:
- The number of nodes in the tree is in the range [0, 10^4]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(h) for recursive, O(w) for iterative, O(n) for Set approach
*/

class TreeNode {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}

// 1. Recursive Solution (Using Max and Min Horizontal Distance tracking)
// ✅ TC = O(n)
// ✅ SC = O(h)
function verticalWidth(root) {
    if(!root) return 0 // if tree is empty, no vertical lines
    
    let maxHd = 0, minHd = 0;
    
    helper(root)
    
    return (maxHd - minHd) + 1 // No.of vertical lines = maxHd - minHd + 1
    
    // Helper function to find the maximum and minimum horizontal distance
    function helper(root, hd = 0){
        if(!root) return
        
        maxHd = Math.max(maxHd, hd)
        minHd = Math.min(minHd, hd)
        
        helper(root.left, hd-1)
        helper(root.right, hd+1)
    }
}

// 2. Recursive Solution (Using Set)
// ✅ TC = O(n)
// ✅ SC = O(n) --> O(h) for recursion stack + O(w) for Set storing distinct HDs (worst case O(n) for skewed tree)
function verticalWidth(root) {
    let s = new Set() // Using Set to store unique horizontal distances
    
    helper(root)
    
    return s.size // No.of vertical lines = size of Set
    
    function helper(root, hd = 0){
        if(!root) return
        
        s.add(hd)

        helper(root.left, hd-1)
        helper(root.right, hd+1)
    }
}


// 3. Iterative Solution (Using Queues for nodes & also parallel queue to store HD values)
// ✅ TC = O(n)
// ✅ SC = O(w)
function verticalWidthIterative(root) {
    if (!root) return 0;
  
    let queue = [root];
    let hdQueue = [0]; // parallel queue to store HD values
  
    let minHD = 0, maxHD = 0;
  
    while (queue.length) {
      let node = queue.shift();
      let hd = hdQueue.shift();
  
      minHD = Math.min(minHD, hd);
      maxHD = Math.max(maxHD, hd);
  
      if (node.left) {
        queue.push(node.left);
        hdQueue.push(hd - 1);
      }
  
      if (node.right) {
        queue.push(node.right);
        hdQueue.push(hd + 1);
      }
    }
  
    return maxHD - minHD + 1;
  }
  


let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
// Output: 5

console.log(verticalWidth(root))

/*🎯 CORE IDEA: Three approaches to find vertical width: 
(1) Recursive DFS tracking max and min horizontal distances (HD), 
    calculating width as (maxHD - minHD + 1). 
(2) Recursive DFS storing all distinct HDs in a Set, 
    returning Set size as vertical width. 
(3) Iterative BFS using two parallel queues (one for nodes, one for HDs), 
    tracking max and min HDs during level-order traversal.

📋 STEP-BY-STEP FLOW:

1️⃣ HORIZONTAL DISTANCE CONCEPT:
   - Root has HD = 0
   - Left child: HD = parent's HD - 1
   - Right child: HD = parent's HD + 1
   - Each vertical line has unique HD value

2️⃣ APPROACH 1 (Max-Min HD Tracking):
   - Track maximum HD (rightmost vertical line)
   - Track minimum HD (leftmost vertical line)
   - Width = maxHD - minHD + 1
   - Uses O(h) space for recursion

3️⃣ APPROACH 2 (Set-Based):
   - Store all distinct HDs in Set
   - Set automatically handles uniqueness
   - Width = Set size
   - Uses O(n) space for Set + recursion

4️⃣ APPROACH 3 (Iterative BFS):
   - Use parallel queues for nodes and HDs
   - Track max and min HDs during traversal
   - Width = maxHD - minHD + 1
   - Uses O(w) space for queues

🧠 WHY THESE APPROACHES?
- All visit each node exactly once: O(n) time
- Different space tradeoffs: O(h), O(n), O(w)
- Max-Min approach: Most space efficient
- Set approach: Intuitive counting of distinct HDs
- Iterative approach: Level-order processing

💡 KEY INSIGHTS:
- Vertical width = count of distinct horizontal distances
- Formula: maxHD - minHD + 1
- Left moves decrease HD, right moves increase HD
- All approaches guarantee correct count
- HD assignment is consistent across methods
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Vertical Width of Binary Tree

INPUT: Binary Tree
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: 5
EXPLANATION: Vertical lines at HD = -2, -1, 0, 1, 2. Total = 5 distinct HDs.

🎯 GOAL: Find the number of distinct vertical lines passing through the tree!

🔍 APPROACH 1 (Max-Min HD Tracking) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
maxHd = 0
minHd = 0

📋 RECURSIVE TRAVERSAL:

CALL 1: helper(1, hd=0)
Step 1: Check if null
node = 1 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(0, 0) = 0
minHd = Math.min(0, 0) = 0

Step 3: Traverse left and right
helper(2, hd=-1)
helper(3, hd=1)

─────────────────────────────────────────

CALL 2: helper(2, hd=-1)
Step 1: Check if null
node = 2 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(0, -1) = 0
minHd = Math.min(0, -1) = -1 ✓ (updated)

Step 3: Traverse left and right
helper(4, hd=-2)
helper(5, hd=0)

─────────────────────────────────────────

CALL 3: helper(4, hd=-2)
Step 1: Check if null
node = 4 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(0, -2) = 0
minHd = Math.min(-1, -2) = -2 ✓ (updated)

Step 3: Traverse left and right (both null)

BACK TO CALL 2:

─────────────────────────────────────────

CALL 4: helper(5, hd=0)
Step 1: Check if null
node = 5 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(0, 0) = 0
minHd = Math.min(-2, 0) = -2

Step 3: Traverse left and right (both null)

BACK TO CALL 1:

─────────────────────────────────────────

CALL 5: helper(3, hd=1)
Step 1: Check if null
node = 3 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(0, 1) = 1 ✓ (updated)
minHd = Math.min(-2, 1) = -2

Step 3: Traverse left and right
helper(6, hd=0)
helper(7, hd=2)

─────────────────────────────────────────

CALL 6: helper(6, hd=0)
Step 1: Check if null
node = 6 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(1, 0) = 1
minHd = Math.min(-2, 0) = -2

Step 3: Traverse left and right (both null)

─────────────────────────────────────────

CALL 7: helper(7, hd=2)
Step 1: Check if null
node = 7 (not null) → continue

Step 2: Update max and min HD
maxHd = Math.max(1, 2) = 2 ✓ (updated)
minHd = Math.min(-2, 2) = -2

Step 3: Traverse left and right (both null)

─────────────────────────────────────────

FINAL CALCULATION:
maxHd = 2
minHd = -2
Vertical Width = maxHd - minHd + 1 = 2 - (-2) + 1 = 5

🏆 APPROACH 1 RESULT: 5

─────────────────────────────────────────

🔍 APPROACH 2 (Set-Based) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Set s = {}

📋 RECURSIVE TRAVERSAL:

CALL 1: helper(1, hd=0)
s.add(0) → s = {0}
helper(2, hd=-1)
helper(3, hd=1)

CALL 2: helper(2, hd=-1)
s.add(-1) → s = {0, -1}
helper(4, hd=-2)
helper(5, hd=0)

CALL 3: helper(4, hd=-2)
s.add(-2) → s = {0, -1, -2}
helper(null), helper(null)

CALL 4: helper(5, hd=0)
s.add(0) → s = {0, -1, -2} (0 already exists, no change)
helper(null), helper(null)

CALL 5: helper(3, hd=1)
s.add(1) → s = {0, -1, -2, 1}
helper(6, hd=0)
helper(7, hd=2)

CALL 6: helper(6, hd=0)
s.add(0) → s = {0, -1, -2, 1} (0 already exists)
helper(null), helper(null)

CALL 7: helper(7, hd=2)
s.add(2) → s = {0, -1, -2, 1, 2}
helper(null), helper(null)

─────────────────────────────────────────

FINAL CALCULATION:
Set s = {0, -1, -2, 1, 2}
Set size = 5
Vertical Width = 5

🏆 APPROACH 2 RESULT: 5

─────────────────────────────────────────

🔍 APPROACH 3 (Iterative BFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
queue = [1]
hdQueue = [0]
minHD = 0
maxHD = 0

📋 LEVEL-ORDER TRAVERSAL:

ITERATION 1:
Step 1: Dequeue node and HD
node = 1, hd = 0
queue = [], hdQueue = []

Step 2: Update max and min HD
minHD = Math.min(0, 0) = 0
maxHD = Math.max(0, 0) = 0

Step 3: Enqueue children with their HDs
node.left = 2 → queue.push(2), hdQueue.push(-1)
node.right = 3 → queue.push(3), hdQueue.push(1)
queue = [2, 3], hdQueue = [-1, 1]

─────────────────────────────────────────

ITERATION 2:
Step 1: Dequeue node and HD
node = 2, hd = -1
queue = [3], hdQueue = [1]

Step 2: Update max and min HD
minHD = Math.min(0, -1) = -1 ✓
maxHD = Math.max(0, -1) = 0

Step 3: Enqueue children with their HDs
node.left = 4 → queue.push(4), hdQueue.push(-2)
node.right = 5 → queue.push(5), hdQueue.push(0)
queue = [3, 4, 5], hdQueue = [1, -2, 0]

─────────────────────────────────────────

ITERATION 3:
Step 1: Dequeue node and HD
node = 3, hd = 1
queue = [4, 5], hdQueue = [-2, 0]

Step 2: Update max and min HD
minHD = Math.min(-1, 1) = -1
maxHD = Math.max(0, 1) = 1 ✓

Step 3: Enqueue children with their HDs
node.left = 6 → queue.push(6), hdQueue.push(0)
node.right = 7 → queue.push(7), hdQueue.push(2)
queue = [4, 5, 6, 7], hdQueue = [-2, 0, 0, 2]

─────────────────────────────────────────

ITERATION 4:
node = 4, hd = -2
minHD = Math.min(-1, -2) = -2 ✓
maxHD = Math.max(1, -2) = 1
No children to enqueue

─────────────────────────────────────────

ITERATION 5:
node = 5, hd = 0
minHD = Math.min(-2, 0) = -2
maxHD = Math.max(1, 0) = 1
No children to enqueue

─────────────────────────────────────────

ITERATION 6:
node = 6, hd = 0
minHD = Math.min(-2, 0) = -2
maxHD = Math.max(1, 0) = 1
No children to enqueue

─────────────────────────────────────────

ITERATION 7:
node = 7, hd = 2
minHD = Math.min(-2, 2) = -2
maxHD = Math.max(1, 2) = 2 ✓
No children to enqueue

─────────────────────────────────────────

FINAL CALCULATION:
maxHD = 2
minHD = -2
Vertical Width = maxHD - minHD + 1 = 2 - (-2) + 1 = 5

🏆 APPROACH 3 RESULT: 5

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE WITH HORIZONTAL DISTANCES:

       1 (HD = 0)
      / \
     2   3 (HD = -1, HD = 1)
    / \ / \
   4  5 6  7 (HD = -2, HD = 0, HD = 0, HD = 2)

VERTICAL LINES:

HD = -2: Node 4
HD = -1: Node 2
HD = 0:  Nodes 1, 5, 6
HD = 1:  Node 3
HD = 2:  Node 7

VERTICAL VIEW (from top):

  -2  -1   0   1   2
   |   |   |   |   |
   4   2   1   3   7
           5
           6

Total Vertical Lines = 5

─────────────────────────────────────────

📊 HD ASSIGNMENT PATTERN:

Starting from Root (HD = 0):
- Move left: HD decreases by 1
- Move right: HD increases by 1

Traversal Path to Node 4:
1 (HD=0) → 2 (HD=0-1=-1) → 4 (HD=-1-1=-2)

Traversal Path to Node 7:
1 (HD=0) → 3 (HD=0+1=1) → 7 (HD=1+1=2)

Traversal Path to Node 5:
1 (HD=0) → 2 (HD=0-1=-1) → 5 (HD=-1+1=0)

─────────────────────────────────────────

📊 EXAMPLE: Left-Skewed Tree

INPUT:
       1
      /
     2
    /
   3

HD ASSIGNMENTS:
1: HD = 0
2: HD = -1
3: HD = -2

APPROACH 1:
maxHd = 0, minHd = -2
Width = 0 - (-2) + 1 = 3

APPROACH 2:
Set = {0, -1, -2}
Width = Set.size = 3

APPROACH 3:
maxHD = 0, minHD = -2
Width = 0 - (-2) + 1 = 3

RESULT: 3

─────────────────────────────────────────

📊 EXAMPLE: Right-Skewed Tree

INPUT:
       1
        \
         3
          \
           7

HD ASSIGNMENTS:
1: HD = 0
3: HD = 1
7: HD = 2

APPROACH 1:
maxHd = 2, minHd = 0
Width = 2 - 0 + 1 = 3

APPROACH 2:
Set = {0, 1, 2}
Width = Set.size = 3

APPROACH 3:
maxHD = 2, minHD = 0
Width = 2 - 0 + 1 = 3

RESULT: 3

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree
Input: null
All approaches return: 0

CASE 2: Single Node
Input: TreeNode(1)
HD = 0
maxHD = 0, minHD = 0
Width = 0 - 0 + 1 = 1

CASE 3: Complete Binary Tree (3 levels)
       1
      / \
     2   3
    / \ / \
   4  5 6  7

HD range: -2 to 2
Width = 5

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:

1️⃣ CONSISTENT HD ASSIGNMENT: 
   - Every node gets unique HD based on path from root
   - Left moves always decrease by 1
   - Right moves always increase by 1

2️⃣ APPROACH 1 (Max-Min): 
   - Tracks extreme HDs (leftmost and rightmost)
   - Width formula: maxHD - minHD + 1 covers all HDs in range
   - Most space efficient: O(h) for recursion only

3️⃣ APPROACH 2 (Set): 
   - Explicitly stores all distinct HDs
   - Set size directly gives vertical width
   - More space: O(n) for Set + O(h) for recursion

4️⃣ APPROACH 3 (Iterative BFS): 
   - Level-order traversal with parallel HD queue
   - Tracks max and min HDs during traversal
   - Space: O(w) for queues

5️⃣ ALL METHODS CORRECT:
   - Visit each node exactly once
   - Consistent HD calculation
   - Different space-time tradeoffs

💡 KEY INSIGHT:
Vertical width equals the count of distinct horizontal distances in the tree,
which can be calculated as (maxHD - minHD + 1) by tracking extreme values
or by counting distinct HDs in a Set!

🎯 TIME COMPLEXITY ANALYSIS:
- Approach 1: O(n) - visit each node once
- Approach 2: O(n) - visit each node once, Set operations O(1)
- Approach 3: O(n) - level-order traversal visits each node once
- All approaches: O(n) time complexity
- HD calculation: O(1) per node

🎯 SPACE COMPLEXITY ANALYSIS:
- Approach 1: O(h) - recursion stack depth
- Approach 2: O(n) - O(h) recursion + O(w) Set (worst case O(n) total)
- Approach 3: O(w) - parallel queues store maximum width nodes
- Approach 1 is most space efficient
- Approach 2 uses most space (Set + recursion)
- Approach 3 trades recursion stack for queue space

🎯 COMPLEXITY CORRECTIONS:
✅ Approach 1: TC = O(n), SC = O(h) - CORRECT
✅ Approach 2: TC = O(n), SC = O(n) - CORRECTED (was missing)
✅ Approach 3: TC = O(n), SC = O(w) - CORRECT

🎯 EDGE CASES HANDLED:
- Empty tree: Returns 0
- Single node: Returns 1
- Left-skewed: Negative HDs only
- Right-skewed: Positive HDs only
- Balanced tree: HDs range from negative to positive

🎯 ALGORITHM CORRECTNESS:
- HD assignment is deterministic
- Every node gets exactly one HD
- Width formula accounts for all distinct HDs
- Set approach explicitly counts unique HDs
- All methods produce same result

🎯 IMPLEMENTATION DETAILS:
- Approach 1: Track maxHd and minHd during traversal
- Approach 2: Add HD to Set during traversal
- Approach 3: Use parallel queues for nodes and HDs
- All: Use same HD calculation (left: -1, right: +1)
- Formula: width = maxHD - minHD + 1

🎯 RECURSIVE APPROACH PRINCIPLES:
- DFS traversal visits all nodes
- HD passed as parameter (0 for root)
- Left child: hd - 1
- Right child: hd + 1
- Track extremes or store all HDs

🎯 ITERATIVE APPROACH PRINCIPLES:
- BFS level-order traversal
- Parallel queue for HD values
- Update max and min during traversal
- No recursion stack needed

🎯 COMPARISON OF APPROACHES:

APPROACH 1 (Max-Min HD):
✅ Pros: Most space efficient O(h)
✅ Pros: Simple logic, track two variables
❌ Cons: Recursive (stack space)

APPROACH 2 (Set):
✅ Pros: Intuitive counting of distinct HDs
✅ Pros: Direct Set size gives answer
❌ Cons: Most space usage O(n)
❌ Cons: Recursive (stack space)

APPROACH 3 (Iterative BFS):
✅ Pros: No recursion stack
✅ Pros: Level-order traversal natural
❌ Cons: Parallel queue overhead
❌ Cons: O(w) space for wide trees

🎯 BEST APPROACH SELECTION:
- For space efficiency: Approach 1 (O(h))
- For clarity: Approach 2 (Set intuitive)
- For iterative: Approach 3 (no recursion)
- For balanced trees: All work well
- For skewed trees: Approach 1 or 3 better

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization layouts
- UI component positioning
- Hierarchical data column assignment
- Grid-based tree rendering
- Vertical alignment calculations

🎯 ALGORITHM PATTERN:
- HD assignment: Left -1, Right +1
- Width calculation: Range of HDs
- DFS or BFS traversal
- Track extremes or count unique values

🎯 MATHEMATICAL PROPERTIES:
- HD range: [minHD, maxHD]
- Width = maxHD - minHD + 1
- Number of distinct HDs = vertical lines
- Complete tree height h: width ≤ 2^h
- Skewed tree height h: width = h + 1

🎯 HD CALCULATION RULES:
- Root: HD = 0
- Left child: HD = parent_HD - 1
- Right child: HD = parent_HD + 1
- Path determines HD value
- Consistent across all methods

🎯 FORMULA DERIVATION:
If minHD = -2 and maxHD = 2:
HDs in range: -2, -1, 0, 1, 2 (5 values)
Count = 2 - (-2) + 1 = 5 ✓
General: maxHD - minHD + 1

🎯 ERROR HANDLING:
- Null root: Check at function start
- Empty tree: Return 0
- Missing children: Checked before recursion/enqueue
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF APPROACH 1:
- Minimal space overhead
- Simple tracking of two variables
- Efficient for all tree types
- Easy to understand and implement

🎯 ADVANTAGES OF APPROACH 2:
- Explicit distinct HD counting
- Intuitive Set-based solution
- Direct answer from Set size
- Clear logic for beginners

🎯 ADVANTAGES OF APPROACH 3:
- No recursion stack needed
- Iterative approach preferred by some
- Level-order natural for width problems
- Good for very deep trees

🎯 DISADVANTAGES:
- Approach 1: Recursive (stack space)
- Approach 2: Extra space for Set
- Approach 3: Parallel queue overhead
- All: Visit every node (optimal)

🎯 OPTIMIZATION OPPORTUNITIES:
- Approach 1 is already optimal for space
- Early termination not applicable (need all nodes)
- Morris traversal possible but complex
- Parallel processing for large trees

🎯 RELATED PROBLEMS:
- Vertical order traversal
- Top view of binary tree
- Bottom view of binary tree
- Vertical sum of binary tree
- Print nodes at vertical distance k

🎯 PROBLEM VARIATIONS:
- Find nodes at specific HD
- Maximum width of tree (nodes per level)
- Count nodes at each vertical line
- Print vertical order traversal
- Find widest vertical line

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Left-skewed tree
- Right-skewed tree
- Complete binary tree
- Random structures

🎯 DEBUGGING TIPS:
- Print HD values during traversal
- Verify HD assignment rules
- Check max and min updates
- Validate formula calculation
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal (must visit all)
- Space: O(h) to O(n) - depends on approach
- Overall: All approaches efficient
- Scalable: Works for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time acceptable
- Deep trees: Recursive may stack overflow
- Wide trees: Iterative uses more queue space
- Performance: All methods scale well

🎯 BEST PRACTICES:
- Choose appropriate approach for constraints
- Handle null checks properly
- Use clear variable names
- Test edge cases thoroughly
- Document HD calculation logic

🎯 COMMON MISTAKES:
- Wrong HD calculation (off by one)
- Forgetting +1 in formula
- Not handling empty tree
- Incorrect max/min initialization
- Missing null checks

🎯 LEARNING OBJECTIVES:
- Understand horizontal distance concept
- Learn vertical width calculation
- Master different traversal approaches
- Practice space-time tradeoff analysis
- Improve tree manipulation skills

🎯 INTERVIEW TIPS:
- Explain HD assignment first
- Discuss all three approaches
- Compare space-time tradeoffs
- Handle edge cases systematically
- Write clean, bug-free code

🎯 ALGORITHM INSIGHTS:
- Vertical width = HD range size
- Formula: maxHD - minHD + 1
- Multiple approaches possible
- Different space tradeoffs
- All achieve O(n) time

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n total
- HD calculations: n operations
- Max/Min updates: O(1) each
- Formula evaluation: O(1)
- Total: O(n) time

🎯 IMPLEMENTATION CHALLENGES:
- Correct HD assignment logic
- Proper max/min tracking
- Edge case handling
- Choosing right approach
- Efficient implementation

🎯 SOLUTION VALIDATION:
- Test with various tree structures
- Verify HD assignments manually
- Check formula calculation
- Monitor space usage
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Basic: Count distinct HDs with Set
- Optimized: Track only max and min
- Iterative: BFS with parallel queues
- All: Correct and efficient

🎯 PRACTICAL APPLICATIONS:
- Tree layout algorithms
- Visual hierarchy rendering
- Column-based organization
- Grid positioning systems
- UI component spacing

🎯 CONCLUSION:
The vertical width of binary tree problem demonstrates three efficient approaches:
recursive DFS tracking max and min HDs (O(h) space), recursive DFS with Set
storing distinct HDs (O(n) space), and iterative BFS with parallel queues
(O(w) space), all achieving O(n) time complexity with the formula
(maxHD - minHD + 1) to count distinct vertical lines!
*/