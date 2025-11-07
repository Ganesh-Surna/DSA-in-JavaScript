/* Problem: ✅✅✅✅ Connect Nodes at Same Level ✅✅✅✅

Given a binary tree, connect the nodes that are at the same level. The structure of the tree Node contains an additional nextRight pointer for this purpose.

Initially, all the nextRight pointers point to garbage values. Your task is to set these pointers to point to the next right node for each node at the same level.

Connection logic:
- For each level, connect nodes from left to right
- Each node's nextRight points to the node immediately to its right at the same level
- Last node of each level points to null

Example 1:
Input: root = [3, 1, 2]
     3
   /  \
  1    2
  
Output: [3, 1, 2] (level order), [1, 3, 2] (inorder)
Connected tree:
       3 ------> NULL
     /   \
    1---> 2 -----> NULL

Example 2:
Input: root = [10, 20, 30, 40, 60]
      10
    /   \
   20   30
  /  \
 40  60
 
Output: [10, 20, 30, 40, 60] (level order), [40, 20, 60, 10, 30] (inorder)
Connected tree:
        10 ---> NULL
       /   \
     20---> 30 ---> NULL
   /   \
 40---> 60 ---> NULL

Example 3:
Input:
       10
      / \
     3   5
    / \   \
   4   1   2
   
Connected tree:
       10 ------> NULL
      / \
     3 ----> 5 ------> NULL
    / \       \
   4 --> 1 ---> 2 ----> NULL

Constraints:
- 1 ≤ number of nodes ≤ 10^5
- 0 ≤ node.data ≤ 10^5

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
        this.nextRight = null;
    }
}

// ✅ TC = O(n), ✅ SC = O(n)
function connectSameLevelNodes(root) {
    if (!root) return null;
    
    let q = [root];
    
    while (q.length > 0) {
        let size = q.length;
        let prev = null;
        
        for (let i = 0; i < size; i++) {
            let curr = q.shift();
            
            if (prev) prev.nextRight = curr;
            prev = curr;
            
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
        }
        
        // last node of each level
        if (prev) prev.nextRight = null;
    }
    
    return root;
}

// Example usage:
const root = new TreeNode(10);
root.left = new TreeNode(20);
root.right = new TreeNode(30);
root.left.left = new TreeNode(40);
root.left.right = new TreeNode(60);
console.log(connectSameLevelNodes(root));
// Output: Tree structure will be like this:
//         10 ---> NULL
//        /   \
//      20---> 30 ---> NULL
//    /   \
//  40---> 60 ---> NULL

/*🎯 CORE IDEA: Use level-order traversal (BFS) with queue to connect nodes at the same level. 
Process nodes level by level, maintaining a `prev` pointer to track the previous node at current level. 
For each node, if prev exists, connect prev.nextRight to current node, then update prev = curr. 
After processing all nodes in a level, set the last node's nextRight to null.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Check if root is null, return null
   - Initialize queue with root
   - Start level-order traversal

2️⃣ LEVEL-BY-LEVEL PROCESSING:
   - Capture size of current level (number of nodes)
   - Initialize prev as null for this level
   - Process exactly size nodes at current level
   - Connect each node to its right neighbor

3️⃣ CONNECTION LOGIC (FOR EACH NODE):
   - Dequeue current node
   - If prev exists: prev.nextRight = curr
   - Update prev = curr
   - Add children to queue for next level

4️⃣ LEVEL TERMINATION:
   - After processing all nodes in level
   - Set last node's nextRight to null (prev points to it)
   - Move to next level

🧠 WHY THIS APPROACH?
- Level-order ensures nodes processed left to right
- Prev pointer naturally connects adjacent nodes
- Queue maintains level boundaries via size
- O(n) time - each node visited once
- Simple and intuitive logic

💡 KEY INSIGHTS:
- Prev tracks previous node in current level
- Level size determines exact iteration count
- Last node of level always points to null
- Children added to queue for next level
- In-place modification of tree structure
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Connect Nodes at Same Level

INPUT: Binary Tree
      10
    /   \
   20   30
  /  \
 40  60

OUTPUT: Connected Tree
        10 ------> NULL
       /  \
     20---> 30 ----> NULL
    /  \
  40---> 60 -----> NULL

🎯 GOAL: Connect all nodes at the same level from left to right!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
root = 10
if (!root) return null → FALSE, continue

q = [10]

Initial State:
Queue: [10]
Tree: 10 (no connections yet)

─────────────────────────────────────────

LEVEL 0: Process root level

Step 1: Get level size
size = q.length = 1

Step 2: Initialize prev for this level
prev = null

Step 3: Process level nodes (for i = 0 to size-1)

ITERATION 1 (i=0):
Step 1: Dequeue node
curr = q.shift() → curr = 10
q = []

Step 2: Connect previous to current
if (prev) → FALSE (prev is null, first node of level)
Skip connection

Step 3: Update prev
prev = curr → prev = 10

Step 4: Add children to queue
if (curr.left) → 10.left = 20 → q.push(20) → q = [20]
if (curr.right) → 10.right = 30 → q.push(30) → q = [20, 30]

Step 5: After for loop, set last node's nextRight to null
if (prev) → TRUE (prev = 10)
prev.nextRight = null
10.nextRight = null ✓

State after Level 0:
Tree: 10 → NULL
Queue: [20, 30]

─────────────────────────────────────────

LEVEL 1: Process second level

Step 1: Get level size
size = q.length = 2

Step 2: Initialize prev for this level
prev = null

Step 3: Process level nodes (for i = 0 to 1)

ITERATION 1 (i=0):
Step 1: Dequeue node
curr = q.shift() → curr = 20
q = [30]

Step 2: Connect previous to current
if (prev) → FALSE (prev is null, first node of level)
Skip connection

Step 3: Update prev
prev = curr → prev = 20

Step 4: Add children to queue
if (curr.left) → 20.left = 40 → q.push(40) → q = [30, 40]
if (curr.right) → 20.right = 60 → q.push(60) → q = [30, 40, 60]

ITERATION 2 (i=1):
Step 1: Dequeue node
curr = q.shift() → curr = 30
q = [40, 60]

Step 2: Connect previous to current
if (prev) → TRUE (prev = 20)
prev.nextRight = curr
20.nextRight = 30 ✓

Step 3: Update prev
prev = curr → prev = 30

Step 4: Add children to queue
if (curr.left) → 30.left = null → skip
if (curr.right) → 30.right = null → skip
q remains [40, 60]

Step 5: After for loop, set last node's nextRight to null
if (prev) → TRUE (prev = 30)
prev.nextRight = null
30.nextRight = null ✓

State after Level 1:
Tree: 
        10 → NULL
       /  \
     20 → 30 → NULL
    /  \
  40  60

Queue: [40, 60]

─────────────────────────────────────────

LEVEL 2: Process third level

Step 1: Get level size
size = q.length = 2

Step 2: Initialize prev for this level
prev = null

Step 3: Process level nodes (for i = 0 to 1)

ITERATION 1 (i=0):
Step 1: Dequeue node
curr = q.shift() → curr = 40
q = [60]

Step 2: Connect previous to current
if (prev) → FALSE (prev is null, first node of level)
Skip connection

Step 3: Update prev
prev = curr → prev = 40

Step 4: Add children to queue
if (curr.left) → 40.left = null → skip
if (curr.right) → 40.right = null → skip
q remains [60]

ITERATION 2 (i=1):
Step 1: Dequeue node
curr = q.shift() → curr = 60
q = []

Step 2: Connect previous to current
if (prev) → TRUE (prev = 40)
prev.nextRight = curr
40.nextRight = 60 ✓

Step 3: Update prev
prev = curr → prev = 60

Step 4: Add children to queue
if (curr.left) → 60.left = null → skip
if (curr.right) → 60.right = null → skip
q remains []

Step 5: After for loop, set last node's nextRight to null
if (prev) → TRUE (prev = 60)
prev.nextRight = null
60.nextRight = null ✓

State after Level 2:
Tree: 
        10 → NULL
       /  \
     20 → 30 → NULL
    /  \
  40 → 60 → NULL

Queue: []

─────────────────────────────────────────

TERMINATION:
while (q.length > 0) → FALSE (q is empty)
Exit while loop

Return root

🏆 FINAL CONNECTED TREE:
        10 ------> NULL
       /  \
     20---> 30 ----> NULL
    /  \
  40---> 60 -----> NULL

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL TREE:
      10
    /   \
   20   30
  /  \
 40  60

CONNECTION PROCESS:

After Level 0:
      10 → NULL

After Level 1:
      10 → NULL
     /  \
   20 → 30 → NULL

After Level 2:
      10 → NULL
     /  \
   20 → 30 → NULL
  /  \
40 → 60 → NULL

─────────────────────────────────────────

📊 QUEUE AND PREV STATES:

LEVEL 0:
Initial queue: [10]
size = 1
Prev evolution: null → 10
After loop: 10.nextRight = null
Queue after: [20, 30]

LEVEL 1:
Initial queue: [20, 30]
size = 2
Iteration 1: curr = 20, prev: null → 20
Iteration 2: curr = 30, prev: 20 → 30, Connect: 20.nextRight = 30
After loop: 30.nextRight = null
Queue after: [40, 60]

LEVEL 2:
Initial queue: [40, 60]
size = 2
Iteration 1: curr = 40, prev: null → 40
Iteration 2: curr = 60, prev: 40 → 60, Connect: 40.nextRight = 60
After loop: 60.nextRight = null
Queue after: []

─────────────────────────────────────────

📊 EXAMPLE 2: Unbalanced Tree

INPUT:
       10
      /  \
     3    5
    / \    \
   4   1    2

LEVEL-BY-LEVEL PROCESSING:

Level 0: 
Queue: [10], size = 1
prev: null → 10
Connection: 10 → NULL
Queue after: [3, 5]

Level 1:
Queue: [3, 5], size = 2
Iteration 1: curr = 3, prev: null → 3
Iteration 2: curr = 5, prev: 3 → 5
Connection: 3.nextRight = 5, then 5.nextRight = null
Result: 3 → 5 → NULL
Queue after: [4, 1, 2]

Level 2:
Queue: [4, 1, 2], size = 3
Iteration 1: curr = 4, prev: null → 4
Iteration 2: curr = 1, prev: 4 → 1
Connection: 4.nextRight = 1
Iteration 3: curr = 2, prev: 1 → 2
Connection: 1.nextRight = 2, then 2.nextRight = null
Result: 4 → 1 → 2 → NULL
Queue after: []

FINAL RESULT:
       10 ------> NULL
      /  \
     3 ----> 5 ------> NULL
    / \       \
   4 --> 1 ---> 2 ----> NULL

─────────────────────────────────────────

📊 PREV POINTER EVOLUTION (LEVEL 1 Detailed):

Initial state: prev = null

Process node 20:
  if (prev) → FALSE (prev is null)
  prev = 20
  State: 20 (isolated, not connected yet)

Process node 30:
  if (prev) → TRUE (prev = 20)
  20.nextRight = 30  ✓
  prev = 30
  State: 20 → 30

After for loop:
  prev.nextRight = null
  30.nextRight = null  ✓
  Final state: 20 → 30 → NULL

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ LEVEL-ORDER TRAVERSAL:
   - Queue ensures BFS processing
   - Nodes processed left to right at each level
   - Level boundaries maintained by size
   - Natural ordering for connections

2️⃣ PREV POINTER TECHNIQUE:
   - Tracks previous node in current level
   - Enables connection to next node
   - Reset to null for each new level
   - Simple state management

3️⃣ SIZE-BASED ITERATION:
   - Level size captured before processing
   - For loop iterates exactly size times
   - Clear level boundaries
   - Prevents mixing nodes from different levels

4️⃣ LAST NODE HANDLING:
   - After processing all nodes in level
   - prev points to last node of level
   - Set prev.nextRight = null
   - Marks end of level connection chain

5️⃣ QUEUE DYNAMICS:
   - Dequeue nodes from front
   - Enqueue children at back
   - Natural level-order property (FIFO)
   - Each level's children become next level

💡 KEY INSIGHT:
Using level-order traversal with a prev pointer naturally connects nodes at the
same level by linking each node to the next as they're processed left to right,
with queue size determining level boundaries and ensuring last node points to null!

🎯 TIME COMPLEXITY ANALYSIS:
- Outer while loop: Runs for each level
- Inner for loop: Processes each node once
- Total nodes processed: n
- Each node:
  - Dequeued once: O(1)
  - Connection check: O(1)
  - Prev update: O(1)
  - Children enqueued: O(1)
- Total: O(n) - each node processed exactly once

🎯 SPACE COMPLEXITY ANALYSIS:
- Queue stores nodes at current level
- Maximum queue size: widest level of tree
- For complete binary tree: last level has ~n/2 nodes
- Worst case: O(n/2) = O(n)
- More precisely: O(w) where w is maximum width
- Space: O(n) for queue

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 75: if (!root) return null
Output: null

CASE 2: Single Node
Input: TreeNode(10)
Level 0: size = 1, prev = null → 10
10.nextRight = null
Output: 10 → NULL

CASE 3: Only Left Children
Input:
    10
   /
  20
 /
40

Level 0: 10 → NULL
Level 1: 20 → NULL (single node)
Level 2: 40 → NULL (single node)
Each level has single node, all point to NULL

CASE 4: Only Right Children
Input:
10
  \
   20
    \
     40

Level 0: 10 → NULL
Level 1: 20 → NULL
Level 2: 40 → NULL
Similar to Case 3

CASE 5: Perfect Binary Tree
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

Level 0: 1 → NULL
Level 1: 2 → 3 → NULL
Level 2: 4 → 5 → 6 → 7 → NULL
All levels fully connected

─────────────────────────────────────────

🔍 ALGORITHM CORRECTNESS:
- Processes all nodes: ✓
- Maintains level order: ✓
- Connects adjacent nodes: ✓
- Last node points to null: ✓
- No cross-level connections: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 75: Null check for empty tree
- Line 77: Initialize queue with root
- Line 79: While queue not empty
- Line 80: Capture level size (critical!)
- Line 81: Initialize prev for current level
- Line 83-88: Process all nodes at current level
- Line 86: Connect prev to current
- Line 87: Update prev
- Line 89-90: Enqueue children
- Line 94: Set last node to null

🎯 WHY SIZE CAPTURE IS CRITICAL:
- Without size: Can't determine level boundary
- With size: Know exactly how many nodes in current level
- Prevents processing next level's nodes prematurely
- Enables clean level separation
- Example: Queue = [20, 30, 40, 60]
  - If size = 2, process only 20, 30 (Level 1)
  - 40, 60 remain in queue for Level 2

🎯 PREV RESET PER LEVEL:
- Line 81: prev = null for EACH level
- Critical for correct connections
- Each level starts fresh
- No cross-level connections
- Example: Level 1's prev doesn't affect Level 2

🎯 CONNECTION PATTERN:
For each level with nodes [A, B, C, D]:
1. Process A: prev = null, no connection, prev = A
2. Process B: prev = A, A.nextRight = B, prev = B
3. Process C: prev = B, B.nextRight = C, prev = C
4. Process D: prev = C, C.nextRight = D, prev = D
5. After loop: D.nextRight = null
Result: A → B → C → D → NULL

🎯 ADVANTAGES:
- Simple and intuitive logic
- Single traversal of tree
- In-place modification (no extra tree)
- Clear level boundaries
- Standard BFS pattern

🎯 DISADVANTAGES:
- Requires O(n) queue space
- Modifies original tree structure
- Needs nextRight pointer in TreeNode
- Can't easily undo connections

🎯 REAL-WORLD APPLICATIONS:
- Tree serialization with level information
- Building linked lists per level
- Level-wise tree processing
- Tree visualization with connections
- Sibling node navigation

🎯 RELATED PROBLEMS:
- Level order traversal
- Right view of binary tree
- Print nodes at each level
- Zigzag level order traversal
- Connect nodes in perfect binary tree (O(1) space)

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Two nodes (left/right only)
- Complete binary tree
- Left-skewed tree
- Right-skewed tree
- Unbalanced tree

🎯 DEBUGGING TIPS:
- Print queue state at each level
- Trace prev pointer changes
- Verify connections after each level
- Check last node points to null
- Visualize tree with connections

🎯 COMMON MISTAKES:
- Not resetting prev for each level (cross-level connections!)
- Forgetting to set last node to null
- Not capturing level size (processes too many nodes)
- Wrong queue initialization
- Connecting nodes from different levels

🎯 BEST PRACTICES:
- Always capture level size before processing
- Reset prev to null for each level
- Set last node's nextRight to null explicitly
- Use clear variable names (prev, curr, size)
- Handle null checks properly

🎯 INTERVIEW TIPS:
- Explain level-order traversal concept first
- Discuss prev pointer's role in connecting
- Show how size determines level boundary
- Walk through example with queue states
- Analyze time and space complexity
- Handle edge cases systematically

🎯 OPTIMIZATION OPPORTUNITIES:
- Already optimal O(n) time
- Space optimal for general binary tree
- Can't reduce below O(w) with this approach
- For perfect binary tree: O(1) space possible using parent's nextRight
- Current implementation works for all tree types

🎯 ALTERNATIVE APPROACH (PERFECT BINARY TREE):
- If tree is perfect (all levels completely filled)
- Can use parent's nextRight to traverse
- Achieve O(1) space complexity
- Not applicable for general trees
- Our approach works for all cases

🎯 CONCLUSION:
Connecting nodes at the same level is efficiently achieved using level-order
traversal with a queue and prev pointer, processing nodes level by level from
left to right, connecting each node to its right neighbor with the last node
pointing to null, achieving O(n) time and O(n) space complexity!
*/