/* Problem: ✅✅✅✅ Bottom View of Binary Tree ✅✅✅✅

Given a binary tree, return the bottom view of the tree. 
The bottom view of a binary tree is the set of nodes visible when the tree is viewed from the bottom.

When looking at the tree from below, nodes that are vertically aligned form a vertical line. 
For each vertical line, only the bottommost (last encountered in level order) node is visible from the bottom.

Horizontal Distance (HD):
- Root has HD = 0
- Left child has HD = parent's HD - 1
- Right child has HD = parent's HD + 1
- Nodes with same HD are in same vertical line
- Only the LAST node at each HD (bottom node) is visible

Important: Use LEVEL ORDER traversal (BFS) and OVERWRITE the node at each HD. 
            The last node encountered at each HD during level order is the bottom view node.

Example 1:
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7
Output: [4, 2, 6, 3, 7]
Explanation:
Bottom view from left to right:
- HD = -2: Node 4 (bottommost)
- HD = -1: Node 2 (bottommost, no nodes below)
- HD = 0: Node 6 (bottommost, 1 and 5 are above)
- HD = 1: Node 3 (bottommost, no nodes below)
- HD = 2: Node 7 (bottommost)

Example 2:
Input:
       1
      / \
     2   3
      \
       4
        \
         5
         
Output: [2, 4, 5]
Explanation:
- HD = -1: Node 2 (no nodes below)
- HD = 0: Node 4 (bottommost at HD=0, node 1 is above)
- HD = 1: Node 5 (bottommost at HD=1, node 3 is above)

Example 3:
Input:
     1
    /
   2
  /
 3
Output: [3, 2, 1]
Explanation: All nodes visible from bottom (no overlapping).

Example 4:
Input:
       20
      / \
     8   22
    / \    \
   5   3   25
      / \
     10  14
Output: [5, 10, 3, 14, 25]
Explanation:
- HD = -2: Node 5
- HD = -1: Node 10 (bottommost, node 8 is above)
- HD = 0: Node 3 (bottommost, node 20 is above)
- HD = 1: Node 14 (bottommost, node 22 is above)
- HD = 2: Node 25

Example 5:
Input: null
Output: []
Explanation: Empty tree has no bottom view.

Constraints:
- The number of nodes in the tree is in the range [0, 10^4]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once in level order
Auxiliary Space: O(n) - queue + map storage
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC: O(n) - visit each node once
// ✅ SC: O(n) - queue + map storage
function bottomView(root) {
    if(!root) return [];
    
    let res = []
    
    let map = new Map() // to store (hd : last node at that hd)
    let minHD = 0, maxHD = 0; // To traverse through the map in the order of HD (horizontal distance)

    let q = [[root, 0]] // ✅✅✅✅ [node, hd]
    
    while(q.length > 0){
        let [node, hd] = q.shift() // ✅✅✅✅ [node, hd]
        
        /* ⭐⭐⭐⭐⭐
            Always overwrite the node at this HD.
            The last node processed at each HD will be the bottommost node.
            Level order ensures we process top-to-bottom, so last = bottom.
        ⭐⭐⭐⭐⭐ */
        map.set(hd, node.data) // Always update (overwrite previous)
    
        minHD = Math.min(minHD, hd)
        maxHD = Math.max(maxHD, hd)
    
        if(node.left) q.push([node.left, hd-1])
        if(node.right) q.push([node.right, hd+1])
    }
    
    // Iterate from minHD to maxHD
    for(let hd = minHD; hd <= maxHD; hd++ ){
        if(map.has(hd)){
            // Take the last node (bottommost) at each HD
            res.push(map.get(hd))
        }
    }
    
    return res
}

// Test cases
let root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);
root1.right.left = new TreeNode(6);
root1.right.right = new TreeNode(7);
console.log("Test 1:", bottomView(root1)); // [4, 2, 6, 3, 7]

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.left.right.right = new TreeNode(5);
console.log("Test 2:", bottomView(root2)); // [2, 4, 5]

let root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(3);
console.log("Test 3:", bottomView(root3)); // [3, 2, 1]

let root4 = new TreeNode(20);
root4.left = new TreeNode(8);
root4.right = new TreeNode(22);
root4.left.left = new TreeNode(5);
root4.left.right = new TreeNode(3);
root4.right.right = new TreeNode(25);
root4.left.right.left = new TreeNode(10);
root4.left.right.right = new TreeNode(14);
console.log("Test 4:", bottomView(root4)); // [5, 10, 3, 14, 25]

console.log("Test 5:", bottomView(null)); // []

/*🎯 CORE IDEA: Use LEVEL ORDER TRAVERSAL (BFS) with HORIZONTAL DISTANCE tracking. For each HD, ALWAYS OVERWRITE the stored node. Level order processes top-to-bottom, so the last node at each HD is the bottommost. Unlike top view (store only first), bottom view overwrites continuously, keeping the last encountered node at each HD.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Check if root is null, return []
   - Create result array
   - Create map to store last node at each HD
   - Initialize minHD = 0, maxHD = 0
   - Create queue with [root, 0]

2️⃣ LEVEL ORDER TRAVERSAL:
   - While queue is not empty:
     * Dequeue [node, hd]
     * ALWAYS set map[hd] = node (overwrite)
     * Update minHD and maxHD
     * Enqueue left child with hd-1
     * Enqueue right child with hd+1

3️⃣ BOTTOM NODE CAPTURE:
   - Always overwrite node at each HD
   - Level order processes top-to-bottom
   - Last overwrite = bottommost node
   - Simple continuous update

4️⃣ HD ASSIGNMENT:
   - Root: HD = 0
   - Left child: HD = parent's HD - 1
   - Right child: HD = parent's HD + 1
   - Track min and max HD values

5️⃣ BUILD RESULT:
   - Iterate from minHD to maxHD
   - For each HD, get last node from map
   - Push to result
   - Ensures left-to-right order

6️⃣ RETURN RESULT:
   - Result contains bottom view from left to right
   - Each element is the bottommost node at that HD

🧠 WHY THIS APPROACH?

1️⃣ LEVEL ORDER = TOP-TO-BOTTOM:
   - BFS processes nodes level by level
   - Later levels overwrite earlier levels
   - Last update at HD = bottommost node
   - Natural bottom-to-top overwriting

2️⃣ OVERWRITE STRATEGY:
   - Top view: store only first (if !map.has(hd))
   - Bottom view: always overwrite (map.set(hd, node))
   - Simple difference in logic
   - Both use level order

3️⃣ NO CONDITIONAL CHECK:
   - No need for if(!map.has(hd))
   - Always update: map.set(hd, node.data)
   - Simpler than top view
   - Last write wins

4️⃣ MIN/MAX HD TRACKING:
   - Determines range of vertical lines
   - Ensures left-to-right result order
   - Same as top view and vertical order
   - Efficient range iteration

💡 KEY INSIGHTS:

1️⃣ OVERWRITE = BOTTOM VIEW:
   - Always update map at each HD
   - Level order ensures deeper nodes processed later
   - Last update = bottommost node
   - Elegant and simple

2️⃣ COMPARISON WITH TOP VIEW:
   - Top view: if(!map.has(hd)) → store first
   - Bottom view: always → store last
   - Both use level order BFS
   - Only difference: conditional vs unconditional

3️⃣ LEVEL ORDER ESSENTIAL:
   - Must process top-to-bottom
   - Ensures last update is deepest node
   - Inorder would give wrong order
   - Same reason as top view

4️⃣ SIMPLER THAN TOP VIEW:
   - No conditional check needed
   - Just always overwrite
   - Slightly simpler logic
   - Same complexity

🎯 KEY DIFFERENCE FROM TOP VIEW:

TOP VIEW:
```javascript
if(!map.has(hd)){
    map.set(hd, node.data) // Store FIRST (topmost)
}
```

BOTTOM VIEW:
```javascript
map.set(hd, node.data) // Always overwrite, keep LAST (bottommost)
```
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Standard Binary Tree

INPUT:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [4, 2, 6, 3, 7]

🎯 GOAL: Get nodes visible from bottom at each HD!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
map = {}
minHD = 0, maxHD = 0
q = [[1, 0]]

─────────────────────────────────────────

📋 LEVEL ORDER TRAVERSAL WITH OVERWRITING:

ITERATION 1: Process node 1, HD = 0, Level = 0
Dequeue: [1, 0]
map.set(0, 1) → map[0] = 1 (first update)
minHD = 0, maxHD = 0
Enqueue: [2, -1], [3, 1]
Queue: [[2, -1], [3, 1]]

ITERATION 2: Process node 2, HD = -1, Level = 1
Dequeue: [2, -1]
map.set(-1, 2) → map[-1] = 2 (first update)
minHD = -1, maxHD = 0
Enqueue: [4, -2], [5, 0]
Queue: [[3, 1], [4, -2], [5, 0]]

ITERATION 3: Process node 3, HD = 1, Level = 1
Dequeue: [3, 1]
map.set(1, 3) → map[1] = 3 (first update)
minHD = -1, maxHD = 1
Enqueue: [6, 0], [7, 2]
Queue: [[4, -2], [5, 0], [6, 0], [7, 2]]

ITERATION 4: Process node 4, HD = -2, Level = 2
Dequeue: [4, -2]
map.set(-2, 4) → map[-2] = 4 (first update)
minHD = -2, maxHD = 1
Queue: [[5, 0], [6, 0], [7, 2]]

ITERATION 5: Process node 5, HD = 0, Level = 2
Dequeue: [5, 0]
map.set(0, 5) → map[0] = 5 (overwrite 1 with 5)
Queue: [[6, 0], [7, 2]]

ITERATION 6: Process node 6, HD = 0, Level = 2
Dequeue: [6, 0]
map.set(0, 6) → map[0] = 6 (overwrite 5 with 6) ✓
Queue: [[7, 2]]

ITERATION 7: Process node 7, HD = 2, Level = 2
Dequeue: [7, 2]
map.set(2, 7) → map[2] = 7 (first update)
minHD = -2, maxHD = 2
Queue: []

─────────────────────────────────────────

📋 FINAL MAP STATE:
map = {
  -2: 4,  ← Bottom view node at HD=-2
  -1: 2,  ← Bottom view node at HD=-1
   0: 6,  ← Bottom view node at HD=0 (1→5→6, last is 6)
   1: 3,  ← Bottom view node at HD=1
   2: 7   ← Bottom view node at HD=2
}

minHD = -2, maxHD = 2

─────────────────────────────────────────

📋 BUILD RESULT:
Iterate from -2 to 2:

HD = -2: map[-2] = 4 → res.push(4)
HD = -1: map[-1] = 2 → res.push(2)
HD = 0: map[0] = 6 → res.push(6)
HD = 1: map[1] = 3 → res.push(3)
HD = 2: map[2] = 7 → res.push(7)

res = [4, 2, 6, 3, 7]

🏆 FINAL RESULT: [4, 2, 6, 3, 7]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: Bottom View

       1 (HD=0, L=0)
      / \
(L=1) 2   3 (L=1)
    / \ / \
   4  5 6  7 (L=2)
  ↑   ↑ ↑  ↑
BOTTOM BOTTOM BOTTOM

Looking from bottom:
HD = -2: See 4 ✓ (bottommost)
HD = -1: See 2 ✓ (no nodes below)
HD = 0: See 6 ✓ (1 and 5 are above)
HD = 1: See 3 ✓ (no nodes below)
HD = 2: See 7 ✓ (bottommost)

Bottom view: [4, 2, 6, 3, 7]

─────────────────────────────────────────

📊 OVERWRITE SEQUENCE AT HD = 0:

VERTICAL LINE at HD = 0:
Level 0: Node 1 (first)
Level 2: Node 5 (middle)
Level 2: Node 6 (last)

Processing order:
1. Node 1 at HD=0, Level 0
   → map[0] = 1
2. Node 5 at HD=0, Level 2
   → map[0] = 5 (overwrite 1)
3. Node 6 at HD=0, Level 2
   → map[0] = 6 (overwrite 5) ✓

Final: map[0] = 6 (bottommost)

─────────────────────────────────────────

📊 EXAMPLE 2: Complex Tree

INPUT:
       20
      / \
     8   22
    / \    \
   5   3   25
      / \
     10  14

HD ASSIGNMENT:
      20 (HD=0, L=0)
     / \
    8   22 (HD=1, L=1)
(HD=-1) \
   5   3 25 (HD=2, L=2)
(HD=-2)(HD=0)
      / \
    10  14 (HD=-1,1, L=3)

LEVEL ORDER PROCESSING:

L0: [20, 0] → map[0] = 20
L1: [8, -1] → map[-1] = 8
L1: [22, 1] → map[1] = 22
L2: [5, -2] → map[-2] = 5
L2: [3, 0] → map[0] = 3 (overwrite 20)
L2: [25, 2] → map[2] = 25
L3: [10, -1] → map[-1] = 10 (overwrite 8)
L3: [14, 1] → map[1] = 14 (overwrite 22)

MAP: {-2: 5, -1: 10, 0: 3, 1: 14, 2: 25}

Result: [5, 10, 3, 14, 25]

🏆 OUTPUT: [5, 10, 3, 14, 25]

KEY OBSERVATIONS:
- HD=-1: 8 → 10 (overwritten, 10 is bottommost)
- HD=0: 20 → 3 (overwritten, 3 is bottommost)
- HD=1: 22 → 14 (overwritten, 14 is bottommost)

─────────────────────────────────────────

📊 COMPARISON: TOP VIEW vs BOTTOM VIEW

SAME TREE:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

TOP VIEW LOGIC:
HD=0: Node 1 (first) → if(!map.has(0)) map[0]=1 ✓
HD=0: Node 5 (later) → if(!map.has(0)) skip ✗
HD=0: Node 6 (later) → if(!map.has(0)) skip ✗
Result at HD=0: 1

BOTTOM VIEW LOGIC:
HD=0: Node 1 (first) → map[0]=1
HD=0: Node 5 (later) → map[0]=5 (overwrite)
HD=0: Node 6 (later) → map[0]=6 (overwrite)
Result at HD=0: 6

TOP VIEW: [4, 2, 1, 3, 7] (topmost at each HD)
BOTTOM VIEW: [4, 2, 6, 3, 7] (bottommost at each HD)

Only HD=0 differs: top=1, bottom=6

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(n)
- Level order traversal: visit each node once = O(n)
- Map operations (get, set): O(1) each
- Building result: O(maxHD - minHD) ≤ O(n)
- Total: O(n)

SPACE COMPLEXITY: O(n)
- Queue: O(w) where w = max width ≤ n
- Map: O(w) entries (one per HD) ≤ n
- Result: O(w) entries
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 79: if(!root) return []
Output: []

CASE 2: Single Node
Input: TreeNode(1)
Queue: [[1, 0]]
map = {0: 1}
Output: [1]

CASE 3: Only Left Children
Input:
  3
 /
2
/
1
Level order: 3, 2, 1
map = {-2: 1, -1: 2, 0: 3}
Output: [1, 2, 3] (all bottommost)

CASE 4: Only Right Children
Input:
1
 \
  2
   \
    3
Level order: 1, 2, 3
map = {0: 1, 1: 2, 2: 3}
Output: [1, 2, 3] (all bottommost)

CASE 5: No Overlapping Nodes
All nodes at unique HDs
All nodes visible from bottom
Output: All nodes

CASE 6: Many Nodes at Same HD
Only last (deepest) node visible
Earlier nodes overwritten
Output: Last node at each HD

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ OVERWRITE = SIMPLICITY:
   - No conditional check needed
   - Always update map
   - Last update = bottom view
   - Simpler than top view

2️⃣ LEVEL ORDER GUARANTEE:
   - Processes top-to-bottom
   - Deeper nodes processed later
   - Later updates overwrite earlier
   - Natural bottom view capture

3️⃣ TOP vs BOTTOM:
   - Both use level order BFS
   - Top: conditional (first only)
   - Bottom: unconditional (always)
   - Minimal code difference

4️⃣ PRACTICAL DIFFERENCE:
   - Top view: what you see from above
   - Bottom view: what you see from below
   - Same HD, opposite ends
   - Mirror concepts

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Captures bottommost at each HD: ✓
- Handles all edge cases: ✓
- Optimal complexity: ✓
- Left-to-right order: ✓

🎯 COMMON MISTAKES:

MISTAKE 1: Using Conditional Check
Problem: if(!map.has(hd)) → gives top view
Solution: Always overwrite for bottom view

MISTAKE 2: Using Inorder Traversal
Problem: Doesn't guarantee top-to-bottom
Solution: Use level order (BFS)

MISTAKE 3: Taking First Instead of Last
Problem: map.get(hd)[0] → gives top view
Solution: Just map.get(hd) after overwriting

MISTAKE 4: Not Tracking Min/Max HD
Problem: Don't know iteration range
Solution: Update minHD/maxHD during traversal

MISTAKE 5: Wrong HD Calculation
Problem: Left/right HD updates reversed
Solution: Left = hd-1, right = hd+1

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Balanced tree
- Skewed left/right
- Nodes hidden above others
- Multiple nodes at same HD
- Wide tree
- Deep tree

🎯 DEBUGGING TIPS:
- Print map updates during traversal
- Verify overwrite sequence
- Check level order processing
- Trace which nodes are overwritten
- Visualize tree from bottom

🎯 INTERVIEW TIPS:
- Explain overwrite strategy
- Compare with top view
- Draw tree and show bottom view
- Highlight the single difference
- Discuss why level order is essential
- Handle edge cases
- Analyze complexity

🎯 CODE DIFFERENCE FROM TOP VIEW:

TOP VIEW:
```javascript
if(!map.has(hd)){
    map.set(hd, node.data) // Only first
}
```

BOTTOM VIEW:
```javascript
map.set(hd, node.data) // Always (overwrite)
```

That's it! Single line difference!

🎯 RELATED PROBLEMS:
- Bottom View (this problem)
- Top View (first node at each HD)
- Left View (leftmost at each level)
- Right View (rightmost at each level)
- Vertical Order Traversal

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization (bottom perspective)
- Architectural blueprints (bottom view)
- Game development (camera angles)
- Hierarchical data display
- Shadow/projection calculations

🎯 OPTIMIZATION NOTES:
- Already optimal O(n) time
- Cannot do better (must visit all nodes)
- Space is optimal for this approach
- Simpler than top view
- No unnecessary conditionals

🎯 WHEN TO USE TOP vs BOTTOM VIEW:

TOP VIEW:
- Need first/topmost nodes
- Hide lower levels
- Conditional check: if(!map.has(hd))

BOTTOM VIEW:
- Need last/bottommost nodes
- Hide upper levels
- Always overwrite: map.set(hd, node)

Both need level order traversal!

🎯 CONCLUSION:
Bottom view of a binary tree requires level order traversal (BFS) with a simple ALWAYS OVERWRITE strategy. Unlike top view which stores only the first node at each HD, bottom view continuously overwrites the node at each HD, so the last update (processed deepest) becomes the bottom view node. This elegant approach differs from top view by just one line: unconditional `map.set()` instead of conditional check, achieving O(n) time and O(n) space complexity!
*/
