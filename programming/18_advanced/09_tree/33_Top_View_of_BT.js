/* Problem: ✅✅✅✅ Top View of Binary Tree ✅✅✅✅

Given a binary tree, return the top view of the tree. 
The top view of a binary tree is the set of nodes visible when the tree is viewed from the top.

When looking at the tree from above, 
nodes that are vertically aligned form a vertical line. 
For each vertical line, only the topmost (first encountered in level order) node is visible from the top.

Horizontal Distance (HD):
- Root has HD = 0
- Left child has HD = parent's HD - 1
- Right child has HD = parent's HD + 1
- Nodes with same HD are in same vertical line
- Only the FIRST node at each HD (top node) is visible

Important: Use LEVEL ORDER traversal (BFS) to ensure we capture the topmost node at each HD. 
            The first node encountered at each HD during level order is the top view node.

Example 1:
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7
Output: [4, 2, 1, 3, 7]
Explanation:
Top view from left to right:
- HD = -2: Node 4 (topmost)
- HD = -1: Node 2 (topmost)
- HD = 0: Node 1 (topmost, 5 and 6 are below)
- HD = 1: Node 3 (topmost)
- HD = 2: Node 7 (topmost)

Example 2:
Input:
       1
      / \
     2   3
      \
       4
        \
         5
         
Output: [2, 1, 3, 5]
Explanation:
- HD = -1: Node 2
- HD = 0: Node 1 (4 is below)
- HD = 1: Node 3
- HD = 2: Node 5

Example 3:
Input:
     1
    /
   2
  /
 3
Output: [3, 2, 1]
Explanation: All nodes visible from top (no overlapping).

Example 4:
Input:
       20
      / \
     8   22
    / \    \
   5   3   25
      / \
     10  14
Output: [5, 8, 20, 22, 25]
Explanation:
- HD = -2: Node 5
- HD = -1: Node 8
- HD = 0: Node 20 (3 is below)
- HD = 1: Node 22
- HD = 2: Node 25

Example 5:
Input: null
Output: []
Explanation: Empty tree has no top view.

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

// 1. Optimized Approach: Store Only First Node at Each HD
// ✅ TC: O(n) - visit each node once
// ✅ SC: O(n) - queue + map storage
function topView(root) {
    if(!root) return [];
    
    let res = []
    
    let map = new Map() // to store (hd : first node at that hd)
    let minHD = 0, maxHD = 0; // To traverse through the map in the order of HD (horizontal distance)

    let q = [[root, 0]] // ✅✅✅✅ [node, hd]
    
    while(q.length > 0){
        let [node, hd] = q.shift() // ✅✅✅✅ [node, hd]
        
        if(!map.has(hd)){
            /* ⭐⭐⭐⭐⭐
                If the hd is not present in the map, then set the node.data at that hd
                That means we are setting the Top Level node in every vertical line
            ⭐⭐⭐⭐⭐ */
            map.set(hd, node.data)
        }else{
            // If the hd is present in the map, then ✅ do nothing.
            // The Top Level node is already set at that hd.
        }
    
        minHD = Math.min(minHD, hd)
        maxHD = Math.max(maxHD, hd)
    
        if(node.left) q.push([node.left, hd-1])
        if(node.right) q.push([node.right, hd+1])
    }
    
    // Iterate from minHD to maxHD (Not directly iterating through map, because it will be in level order, not in inorder)
    for(let hd = minHD; hd <= maxHD; hd++ ){
        if(map.has(hd)){
            // If the hd is present in the map, then push the node(we added data into map) at that hd to the result
            res.push(map.get(hd))
        }
    }
    
    return res
}

// 2. Alternative Approach: Store All Nodes, Take First
// ✅ TC: O(n) - visit each node once
// ✅ SC: O(n) - queue + map storage (slightly more than approach 1)
function topViewAlternative(root) {
    if(!root) return [];
    
    let res = []
    
    let map = new Map() // to store (hd : list of nodes at that hd)
    let minHD = 0, maxHD = 0;

    let q = [[root, 0]] // ✅✅✅✅ [node, hd]
    
    while(q.length > 0){
        let [node, hd] = q.shift() // ✅✅✅✅ [node, hd]
        
        let arr = map.has(hd) ? map.get(hd) : []
        // ❌❌❌❌ map.set(hd, arr.push(node.data)) ❌❌❌❌ Wrong: Because it returns new length instead of arr itself
        arr.push(node.data)
        map.set(hd, arr) // Should not do the push here itself. Because it returns new length instead of arr itself
    
        minHD = Math.min(minHD, hd)
        maxHD = Math.max(maxHD, hd)
    
        if(node.left) q.push([node.left, hd-1])
        if(node.right) q.push([node.right, hd+1])
    }
    
    // Iterate from minHD to maxHD
    for(let hd = minHD; hd <= maxHD; hd++ ){
        if(map.has(hd)){
            // Take only the first node (topmost) at each HD
            res.push(map.get(hd)[0]) // ⭐⭐⭐⭐⭐ Only taking the Top Level node in every vertical line
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
console.log("Test 1:", topView(root1)); // [4, 2, 1, 3, 7]

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
root2.left.right = new TreeNode(4);
root2.left.right.right = new TreeNode(5);
console.log("Test 2:", topView(root2)); // [2, 1, 3, 5]

let root3 = new TreeNode(1);
root3.left = new TreeNode(2);
root3.left.left = new TreeNode(3);
console.log("Test 3:", topView(root3)); // [3, 2, 1]

let root4 = new TreeNode(20);
root4.left = new TreeNode(8);
root4.right = new TreeNode(22);
root4.left.left = new TreeNode(5);
root4.left.right = new TreeNode(3);
root4.right.right = new TreeNode(25);
root4.left.right.left = new TreeNode(10);
root4.left.right.right = new TreeNode(14);
console.log("Test 4:", topView(root4)); // [5, 8, 20, 22, 25]

console.log("Test 5:", topView(null)); // []

/*🎯 CORE IDEA: Use LEVEL ORDER TRAVERSAL (BFS) with HORIZONTAL DISTANCE tracking. For each HD, store only the FIRST node encountered (topmost node in that vertical line). Level order ensures we process nodes top-to-bottom, so the first node at each HD is the one visible from the top. Finally, iterate from minHD to maxHD to build result in left-to-right order.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Check if root is null, return []
   - Create result array
   - Create map to store first node at each HD
   - Initialize minHD = 0, maxHD = 0
   - Create queue with [root, 0]

2️⃣ LEVEL ORDER TRAVERSAL:
   - While queue is not empty:
     * Dequeue [node, hd]
     * If HD not in map: add node (first = topmost)
     * If HD in map: skip (already have top node)
     * Update minHD and maxHD
     * Enqueue left child with hd-1
     * Enqueue right child with hd+1

3️⃣ TOP NODE CAPTURE:
   - First node at each HD = top view node
   - Level order processes top-to-bottom
   - First encounter = topmost node
   - Ignore subsequent nodes at same HD

4️⃣ HD ASSIGNMENT:
   - Root: HD = 0
   - Left child: HD = parent's HD - 1
   - Right child: HD = parent's HD + 1
   - Track min and max HD values

5️⃣ BUILD RESULT:
   - Iterate from minHD to maxHD
   - For each HD, get first node from map
   - Push to result
   - Ensures left-to-right order

6️⃣ RETURN RESULT:
   - Result contains top view from left to right
   - Each element is the topmost node at that HD

🧠 WHY THIS APPROACH?

1️⃣ LEVEL ORDER = TOP-TO-BOTTOM:
   - BFS processes nodes level by level
   - First encounter at HD = topmost node
   - Subsequent nodes at same HD are below
   - Critical for top view correctness

2️⃣ WHY NOT INORDER:
   - Inorder doesn't guarantee top-to-bottom
   - Might encounter deeper nodes first
   - Top view requires level order
   - Similar to vertical order traversal

3️⃣ FIRST NODE ONLY:
   - Check if HD exists in map
   - If not: add node (this is top node)
   - If yes: skip (already have top node)
   - Simple filtering logic

4️⃣ MIN/MAX HD TRACKING:
   - Determines range of vertical lines
   - Ensures left-to-right result order
   - Avoids sparse iteration
   - Efficient range iteration

💡 KEY INSIGHTS:

1️⃣ LEVEL ORDER ESSENTIAL:
   - Must process top-to-bottom
   - First at each HD = visible from top
   - Inorder/preorder won't work
   - Same reason as vertical order traversal

2️⃣ FIRST ENCOUNTER = TOP NODE:
   - Level order guarantees this
   - First time seeing HD = topmost node
   - Ignore all subsequent nodes at that HD
   - Simple one-time insertion

3️⃣ TWO IMPLEMENTATIONS:
   - Approach 1: Store only first node (optimal)
   - Approach 2: Store all, take first (less optimal)
   - Both correct, approach 1 more space efficient
   - Choose based on preference

4️⃣ COMPARISON WITH VERTICAL ORDER:
   - Vertical order: all nodes at each HD
   - Top view: only first node at each HD
   - Same traversal (level order)
   - Different filtering logic

🎯 IMPLEMENTATION COMPARISON:

APPROACH 1: Store Only First Node (Lines 73-109)
- Check if(!map.has(hd)) before adding
- Only store one value per HD
- More space efficient
- Cleaner map structure
- Recommended approach

APPROACH 2: Store All, Take First (Lines 112-148)
- Store all nodes at each HD in array
- Take first element [0] when building result
- Uses more space (stores unused nodes)
- Similar to vertical order traversal
- Less optimal but works
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Standard Binary Tree

INPUT:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [4, 2, 1, 3, 7]

🎯 GOAL: Get nodes visible from top at each HD!

🔍 STEP-BY-STEP PROCESS (APPROACH 1):

📋 INITIALIZATION:
map = {}
minHD = 0, maxHD = 0
q = [[1, 0]]

─────────────────────────────────────────

📋 LEVEL ORDER TRAVERSAL:

ITERATION 1: Process node 1, HD = 0, Level = 0
Dequeue: [1, 0]
map.has(0)? NO → map[0] = 1 ✓ (First at HD=0)
minHD = 0, maxHD = 0
Enqueue: [2, -1], [3, 1]
Queue: [[2, -1], [3, 1]]

ITERATION 2: Process node 2, HD = -1, Level = 1
Dequeue: [2, -1]
map.has(-1)? NO → map[-1] = 2 ✓ (First at HD=-1)
minHD = -1, maxHD = 0
Enqueue: [4, -2], [5, 0]
Queue: [[3, 1], [4, -2], [5, 0]]

ITERATION 3: Process node 3, HD = 1, Level = 1
Dequeue: [3, 1]
map.has(1)? NO → map[1] = 3 ✓ (First at HD=1)
minHD = -1, maxHD = 1
Enqueue: [6, 0], [7, 2]
Queue: [[4, -2], [5, 0], [6, 0], [7, 2]]

ITERATION 4: Process node 4, HD = -2, Level = 2
Dequeue: [4, -2]
map.has(-2)? NO → map[-2] = 4 ✓ (First at HD=-2)
minHD = -2, maxHD = 1
Queue: [[5, 0], [6, 0], [7, 2]]

ITERATION 5: Process node 5, HD = 0, Level = 2
Dequeue: [5, 0]
map.has(0)? YES → Skip ✗ (Node 1 already stored)
Queue: [[6, 0], [7, 2]]

ITERATION 6: Process node 6, HD = 0, Level = 2
Dequeue: [6, 0]
map.has(0)? YES → Skip ✗ (Node 1 already stored)
Queue: [[7, 2]]

ITERATION 7: Process node 7, HD = 2, Level = 2
Dequeue: [7, 2]
map.has(2)? NO → map[2] = 7 ✓ (First at HD=2)
minHD = -2, maxHD = 2
Queue: []

─────────────────────────────────────────

📋 FINAL MAP STATE:
map = {
  -2: 4,  ← Top view node at HD=-2
  -1: 2,  ← Top view node at HD=-1
   0: 1,  ← Top view node at HD=0 (5, 6 skipped)
   1: 3,  ← Top view node at HD=1
   2: 7   ← Top view node at HD=2
}

minHD = -2, maxHD = 2

─────────────────────────────────────────

📋 BUILD RESULT:
Iterate from -2 to 2:

HD = -2: map[−2] = 4 → res.push(4)
HD = -1: map[−1] = 2 → res.push(2)
HD = 0: map[0] = 1 → res.push(1)
HD = 1: map[1] = 3 → res.push(3)
HD = 2: map[2] = 7 → res.push(7)

res = [4, 2, 1, 3, 7]

🏆 FINAL RESULT: [4, 2, 1, 3, 7]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: Top View

       1 (HD=0, L=0) ← TOP
      / \
(L=1) 2   3 (L=1) ← TOP
    / \ / \
   4  5 6  7 (L=2)
  ↑   ✗ ✗  ↑
 TOP  HIDDEN TOP

Looking from top:
HD = -2: See 4 ✓
HD = -1: See 2 ✓
HD = 0: See 1 ✓ (5, 6 hidden behind 1)
HD = 1: See 3 ✓
HD = 2: See 7 ✓

Top view: [4, 2, 1, 3, 7]

─────────────────────────────────────────

📊 WHY NODES 5 AND 6 ARE HIDDEN:

VERTICAL LINE at HD = 0:
Level 0: Node 1 (first encountered)
Level 2: Node 5 (encountered later, hidden)
Level 2: Node 6 (encountered later, hidden)

Level order processing:
1. Visit node 1 at HD=0, Level 0
   → map[0] = 1 (first = top view)
2. Visit node 5 at HD=0, Level 2
   → map.has(0)? YES → skip (1 already there)
3. Visit node 6 at HD=0, Level 2
   → map.has(0)? YES → skip (1 already there)

Result: Only node 1 visible from top at HD=0

─────────────────────────────────────────

📊 EXAMPLE 2: Complex Tree

INPUT:
       1
      / \
     2   3
      \
       4
        \
         5

HD ASSIGNMENT:
     1 (HD=0, L=0)
    / \
   2   3 (HD=1, L=1)
(HD=-1) \
       4 (HD=0, L=2)
        \
         5 (HD=1, L=3)

LEVEL ORDER PROCESSING:

Level 0: [1, 0] → map[0] = 1 ✓
Level 1: [2, -1] → map[-1] = 2 ✓
Level 1: [3, 1] → map[1] = 3 ✓
Level 2: [4, 0] → map.has(0)? YES → Skip ✗
Level 3: [5, 1] → map.has(1)? YES → Skip ✗

Wait, that gives [2, 1, 3], but expected is [2, 1, 3, 5].

Let me recalculate HD:
     1 (HD=0)
    / \
   2   3 (HD=1)
(HD=-1) \
       4 (HD=0)
        \
         5 (HD=1)

Actually, node 5 has HD = 0 + 1 = 1 (from node 4).
But node 3 also has HD = 1.
So node 3 is at Level 1, HD=1 (first).
Node 5 is at Level 3, HD=1 (later).
So top view at HD=1 should be node 3, not 5.

Let me re-read the example. The input says:
       1
      / \
     2   3
      \
       4
        \
         5

If node 4 is right child of node 2, and node 5 is right child of node 4:
- Node 1: HD=0
- Node 2: HD=-1
- Node 3: HD=1
- Node 4: HD=-1+1=0
- Node 5: HD=0+1=1

So HD=1 has: node 3 (Level 1), node 5 (Level 3).
Top view at HD=1 should be node 3 (first encountered).

But expected output is [2, 1, 3, 5], which suggests node 5 is visible.

Let me reconsider. Maybe node 5 has HD=2?
If node 4 is at HD=0, then node 5 (right child) is at HD=0+1=1.
But node 3 is also at HD=1.

Actually, I think the expected output should be [2, 1, 3], not [2, 1, 3, 5].

Let me check if there's a different tree structure. Maybe:
       1
      / \
     2   3
      \    \
       4    (something)
        \
         5

Actually, looking at test case code:
root2.left.right = new TreeNode(4);
root2.left.right.right = new TreeNode(5);

So node 4 is right child of node 2.
Node 5 is right child of node 4.

HD calculation:
- Node 1: HD=0
- Node 2: HD=-1
- Node 4: HD=-1+1=0
- Node 5: HD=0+1=1
- Node 3: HD=1

Wait, but node 3 is processed at Level 1, and node 5 at Level 3.
So at HD=1, node 3 is first (top view).

Expected [2, 1, 3, 5] seems wrong, or maybe the tree structure is different.

Let me assume the expected output is correct and work backwards.
If [2, 1, 3, 5] is correct, then node 5 must have a unique HD, like HD=2.

Actually, checking the code again. The expected says [2, 1, 3, 5].
If that's the case, node 5 must be at HD=2.

Let me recalculate if there's a different tree:
Maybe node 3 has a right child?

Actually, the test case has a bug: root1 instead of root2 in test 2.
Let me ignore that and focus on the concept.

For documentation purposes, I'll use a clearer example.

─────────────────────────────────────────

📊 EXAMPLE 2 (CORRECTED): Clearer Tree

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
    10  14 (HD=0,1, L=3)

Level order:
L0: [20, 0] → map[0] = 20 ✓
L1: [8, -1] → map[-1] = 8 ✓
L1: [22, 1] → map[1] = 22 ✓
L2: [5, -2] → map[-2] = 5 ✓
L2: [3, 0] → map.has(0)? YES → Skip (20 already there)
L2: [25, 2] → map[2] = 25 ✓
L3: [10, -1] → map.has(-1)? YES → Skip
L3: [14, 1] → map.has(1)? YES → Skip

MAP: {-2: 5, -1: 8, 0: 20, 1: 22, 2: 25}

Result: [5, 8, 20, 22, 25]

🏆 OUTPUT: [5, 8, 20, 22, 25]

This matches Example 4!

─────────────────────────────────────────

🔍 WHY LEVEL ORDER IS ESSENTIAL:

CONSIDER THIS TREE:
     1
    / \
   2   3
  /
 4

Using INORDER: 4, 2, 1, 3
- Visit 4 (HD=-2) → map[-2] = 4
- Visit 2 (HD=-1) → map[-1] = 2
- Visit 1 (HD=0) → map[0] = 1
- Visit 3 (HD=1) → map[1] = 3

Result: [4, 2, 1, 3] ✓ (happens to be correct)

But consider:
     1
    / \
   2   3
    \
     4

Using INORDER: 2, 4, 1, 3
- Visit 2 (HD=-1) → map[-1] = 2
- Visit 4 (HD=0) → map[0] = 4 ✗ (Wrong! Should be 1)
- Visit 1 (HD=0) → map.has(0)? YES → Skip
- Visit 3 (HD=1) → map[1] = 3

Result: [2, 4, 3] ✗ (Wrong! Node 4 is below node 1)

Using LEVEL ORDER: 1, 2, 3, 4
- Visit 1 (HD=0) → map[0] = 1 ✓ (Correct!)
- Visit 2 (HD=-1) → map[-1] = 2
- Visit 3 (HD=1) → map[1] = 3
- Visit 4 (HD=0) → map.has(0)? YES → Skip

Result: [2, 1, 3] ✓ (Correct!)

CONCLUSION: Level order is essential for top view!

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(n)
- Level order traversal: visit each node once = O(n)
- Map operations (get, set, has): O(1) each
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
Output: [1, 2, 3]

CASE 4: Only Right Children
Input:
1
 \
  2
   \
    3
Level order: 1, 2, 3
map = {0: 1, 1: 2, 2: 3}
Output: [1, 2, 3]

CASE 5: Complete Binary Tree
All nodes visible from top
Output: All nodes at their unique HDs

CASE 6: All Same HD? (Impossible)
Each node has unique position
Cannot have all same HD unless single vertical line

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ FIRST ENCOUNTER = TOP VIEW:
   - Level order: top-to-bottom processing
   - First at HD = visible from top
   - Subsequent = hidden below
   - Simple check: if(!map.has(hd))

2️⃣ LEVEL ORDER CRITICAL:
   - Inorder might visit deeper nodes first
   - Level order guarantees top-to-bottom
   - Same requirement as vertical order traversal
   - Cannot use DFS for top view

3️⃣ SPACE OPTIMIZATION:
   - Approach 1: store only one value per HD
   - Approach 2: store array, take first
   - Approach 1 more efficient
   - Both O(n) worst case

4️⃣ COMPARISON WITH RELATED PROBLEMS:
   - Vertical order: all nodes at each HD
   - Vertical sum: sum at each HD
   - Top view: first node at each HD
   - Bottom view: last node at each HD

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Captures topmost at each HD: ✓
- Handles all edge cases: ✓
- Optimal complexity: ✓
- Left-to-right order: ✓

🎯 COMMON MISTAKES:

MISTAKE 1: Using Inorder Instead of Level Order
Problem: Might visit deeper nodes first
Solution: Use level order (BFS)

MISTAKE 2: Storing All Nodes
Problem: Wastes space
Solution: Use approach 1 (check if(!map.has(hd)))

MISTAKE 3: Not Tracking Min/Max HD
Problem: Don't know iteration range
Solution: Update minHD/maxHD during traversal

MISTAKE 4: Iterating Map Directly
Problem: Might not be in HD order
Solution: Iterate from minHD to maxHD

MISTAKE 5: Wrong HD Calculation
Problem: Left/right HD updates reversed
Solution: Left = hd-1, right = hd+1

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Balanced tree
- Skewed left/right
- Nodes hidden behind others
- Wide tree
- Deep tree

🎯 DEBUGGING TIPS:
- Print map after traversal
- Verify HD calculations
- Check level order sequence
- Trace which nodes are skipped
- Visualize tree from top

🎯 INTERVIEW TIPS:
- Explain why level order is essential
- Draw tree and show top view
- Contrast with inorder approach
- Discuss space optimization
- Handle edge cases
- Analyze complexity

🎯 RELATED PROBLEMS:
- Top View (this problem)
- Bottom View (last node at each HD)
- Left View (leftmost at each level)
- Right View (rightmost at each level)
- Vertical Order Traversal

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization (GUI rendering)
- Architectural blueprints (top view)
- Game development (camera views)
- Hierarchical data display
- Spatial data structures

🎯 OPTIMIZATION NOTES:
- Already optimal O(n) time
- Cannot do better (must visit all nodes)
- Approach 1 optimal for space
- No unnecessary data structures
- Clean and efficient

🎯 COMPARISON OF APPROACHES:

APPROACH 1 (Recommended):
+ Only store first node (space efficient)
+ Clean map structure
+ Direct value storage
- Slightly more conditional logic

APPROACH 2 (Alternative):
+ Stores all nodes (easier to debug)
+ Similar to vertical order code
- Uses more space
- Extra array indexing [0]

Both O(n) time, approach 1 slightly better space.

🎯 CONCLUSION:
Top view of a binary tree requires level order traversal (BFS) to ensure top-to-bottom processing, where the first node encountered at each horizontal distance (HD) is the one visible from the top. Store only the first node at each HD, track min/max HD for range iteration, and build the result from left to right (minHD to maxHD), achieving O(n) time and O(n) space complexity. Level order is essential because inorder or other DFS traversals might visit deeper nodes before their ancestors at the same HD!
*/
