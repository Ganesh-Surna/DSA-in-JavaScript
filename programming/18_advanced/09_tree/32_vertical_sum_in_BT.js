/* Problem: ✅✅✅✅ Vertical Sum in Binary Tree ✅✅✅✅

Given a binary tree, find the vertical sum of the nodes that are in the same vertical line. 
For each node at position (row, col), its left and right children will be
 at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. 
The root of the tree is at (0, 0).

Return the vertical sum for each vertical line from left to right.

Horizontal Distance (HD):
- Root has HD = 0
- Left child has HD = parent's HD - 1
- Right child has HD = parent's HD + 1
- Nodes with same HD are in same vertical line
- Sum all node values at each HD

Example 1:
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7
Output: [4, 2, 12, 3, 7]
Explanation:
- HD = -2: sum = 4
- HD = -1: sum = 2
- HD = 0: sum = 1 + 5 + 6 = 12
- HD = 1: sum = 3
- HD = 2: sum = 7

Example 2:
Input:
       1
      /
     2
    /
   3
Output: [3, 2, 1]
Explanation:
- HD = -2: sum = 3
- HD = -1: sum = 2
- HD = 0: sum = 1

Example 3:
Input:
     1
      \
       2
        \
         3
Output: [1, 2, 3]
Explanation:
- HD = 0: sum = 1
- HD = 1: sum = 2
- HD = 2: sum = 3

Example 4:
Input:
       3
      / \
     9   20
        / \
       15  7
Output: [9, 18, 20, 7]
Explanation:
- HD = -1: sum = 9
- HD = 0: sum = 3 + 15 = 18
- HD = 1: sum = 20
- HD = 2: sum = 7

Example 5:
Input: null
Output: []
Explanation: Empty tree has no vertical lines.

Constraints:
- The number of nodes in the tree is in the range [0, 1000]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(n) - map storage + recursion stack
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/* ✅✅✅✅ INORDER WORKS HERE:
   - Unlike vertical order traversal, we only need SUMS
   - Don't care about node order within vertical line
   - Just accumulate values at each HD */
   
// ✅ TC: O(n) - visit each node once in inorder traversal
// ✅ SC: O(n) - map storage + recursion stack O(h)
function verticalOrderSum(root) {
    if(!root) return []
    
    let res = []
    let map = new Map() // to store (hd : sum of nodes of same hd) pairs

    inorderHDSum(root, 0)
    
    // In JS map preserves insertion order (Here the insertion order is inorder traversal of the tree)
    for(let [hd, sum] of map){
        res.push(sum)
    }
    return res
    

    // Helper Function
    function inorderHDSum(root, hd=0){
        if(!root) return
        
        // 1. Traverse the left subtree
        inorderHDSum(root.left, hd-1)
        
        // 2. Update the sum of the current horizontal distance
        if(map.has(hd)){
            map.set(hd, map.get(hd)+root.data)
        }else{
            map.set(hd, root.data)
        }
        
        // 3. Traverse the right subtree
        inorderHDSum(root.right, hd+1)
    }
    
}

// Test cases
let root1 = new TreeNode(1);
root1.left = new TreeNode(2);
root1.right = new TreeNode(3);
root1.left.left = new TreeNode(4);
root1.left.right = new TreeNode(5);
root1.right.left = new TreeNode(6);
root1.right.right = new TreeNode(7);
console.log("Test 1:", verticalOrderSum(root1)); // [4, 2, 12, 3, 7]

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
console.log("Test 2:", verticalOrderSum(root2)); // [3, 2, 1]

let root3 = new TreeNode(1);
root3.right = new TreeNode(2);
root3.right.right = new TreeNode(3);
console.log("Test 3:", verticalOrderSum(root3)); // [1, 2, 3]

let root4 = new TreeNode(3);
root4.left = new TreeNode(9);
root4.right = new TreeNode(20);
root4.right.left = new TreeNode(15);
root4.right.right = new TreeNode(7);
console.log("Test 4:", verticalOrderSum(root4)); // [9, 18, 20, 7]

console.log("Test 5:", verticalOrderSum(null)); // []

/*🎯 CORE IDEA: Use INORDER TRAVERSAL (DFS) with HORIZONTAL DISTANCE tracking to compute sum at each vertical line. Unlike vertical order traversal which needs level order, vertical sum works with inorder because we only care about the SUM, not the order of individual nodes. JavaScript Map preserves insertion order, and inorder traversal naturally visits leftmost HDs first, giving left-to-right result order.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Check if root is null, return []
   - Create result array
   - Create map to store (HD → sum) pairs
   - Start inorder traversal from root with HD = 0

2️⃣ INORDER TRAVERSAL:
   - Base case: if node is null, return
   - Recurse left subtree with HD - 1
   - Process current node: update sum at HD
   - Recurse right subtree with HD + 1

3️⃣ HD ASSIGNMENT:
   - Root: HD = 0
   - Left child: HD = parent's HD - 1
   - Right child: HD = parent's HD + 1
   - Same as vertical order traversal

4️⃣ SUM UPDATE:
   - If HD exists in map: add current node value
   - If HD doesn't exist: create entry with node value
   - Accumulate sum for each HD

5️⃣ BUILD RESULT:
   - Iterate through map entries
   - Map preserves insertion order (inorder)
   - Push each sum to result
   - Result is left-to-right vertical sums

6️⃣ RETURN RESULT:
   - Result contains sums from left to right
   - Each sum represents one vertical line

🧠 WHY THIS APPROACH?

1️⃣ INORDER WORKS HERE:
   - Unlike vertical order traversal, we only need SUMS
   - Don't care about node order within vertical line
   - Just accumulate values at each HD
   - Inorder is simpler than level order

2️⃣ MAP INSERTION ORDER:
   - JavaScript Map preserves insertion order
   - Inorder visits leftmost nodes first
   - Left-to-right HD discovery
   - Natural left-to-right result order

3️⃣ SIMPLE ACCUMULATION:
   - Single pass through tree
   - Add each node to its HD sum
   - No need for arrays or sorting
   - Direct sum computation

4️⃣ SPACE EFFICIENT:
   - Only store sums, not node lists
   - Map size = number of vertical lines
   - Typically much smaller than n nodes
   - O(w) where w = tree width

💡 KEY INSIGHTS:

1️⃣ INORDER vs LEVEL ORDER:
   - Vertical order traversal: needs level order (node ordering matters)
   - Vertical sum: inorder works (only sum matters)
   - Simpler solution for sum problem
   - No queue needed

2️⃣ MAP INSERTION ORDER:
   - Inorder: left → root → right
   - Leftmost HD (-k) discovered first
   - Rightmost HD (+k) discovered last
   - Map iteration gives left-to-right order

3️⃣ SUM ACCUMULATION:
   - Multiple nodes at same HD
   - Just add values together
   - No need to store individual nodes
   - More space efficient

4️⃣ HD CALCULATION:
   - Same as vertical order traversal
   - Root = 0, left = -1, right = +1
   - Consistent coordinate system
   - Easy to track

🎯 ALGORITHM COMPARISON:

VS VERTICAL ORDER TRAVERSAL:
- Vertical Order: needs level order (BFS) for node ordering
- Vertical Sum: inorder (DFS) sufficient for sum
- Vertical Order: stores arrays of nodes
- Vertical Sum: stores single sum per HD
- Both: O(n) time, but sum uses less space

VS LEVEL ORDER APPROACH:
- Could use level order for sum too
- Would give same result
- But inorder is simpler
- No queue management needed
- DFS is more natural for sum
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Standard Binary Tree

INPUT:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [4, 2, 12, 3, 7]

🎯 GOAL: Compute vertical sum at each HD from left to right!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
map = {}
Start: inorderHDSum(1, 0)

─────────────────────────────────────────

📋 INORDER TRAVERSAL (DFS):

CALL STACK TRACE:

inorderHDSum(1, 0)
├─ inorderHDSum(2, -1)
│  ├─ inorderHDSum(4, -2)
│  │  ├─ inorderHDSum(null, -3) → return
│  │  ├─ Process 4 at HD=-2: map[-2] = 4
│  │  └─ inorderHDSum(null, -1) → return
│  ├─ Process 2 at HD=-1: map[-1] = 2
│  └─ inorderHDSum(5, 0)
│     ├─ inorderHDSum(null, -1) → return
│     ├─ Process 5 at HD=0: map[0] = 5
│     └─ inorderHDSum(null, 1) → return
├─ Process 1 at HD=0: map[0] = 5 + 1 = 6
└─ inorderHDSum(3, 1)
   ├─ inorderHDSum(6, 0)
   │  ├─ inorderHDSum(null, -1) → return
   │  ├─ Process 6 at HD=0: map[0] = 6 + 6 = 12
   │  └─ inorderHDSum(null, 1) → return
   ├─ Process 3 at HD=1: map[1] = 3
   └─ inorderHDSum(7, 2)
      ├─ inorderHDSum(null, 1) → return
      ├─ Process 7 at HD=2: map[2] = 7
      └─ inorderHDSum(null, 3) → return

─────────────────────────────────────────

📋 DETAILED STEP-BY-STEP:

STEP 1: Process node 4 (HD = -2)
First node at HD=-2
map[-2] = 4
Map: {-2: 4}

STEP 2: Process node 2 (HD = -1)
First node at HD=-1
map[-1] = 2
Map: {-2: 4, -1: 2}

STEP 3: Process node 5 (HD = 0)
First node at HD=0
map[0] = 5
Map: {-2: 4, -1: 2, 0: 5}

STEP 4: Process node 1 (HD = 0)
HD=0 exists, add to existing sum
map[0] = 5 + 1 = 6
Map: {-2: 4, -1: 2, 0: 6}

STEP 5: Process node 6 (HD = 0)
HD=0 exists, add to existing sum
map[0] = 6 + 6 = 12
Map: {-2: 4, -1: 2, 0: 12}

STEP 6: Process node 3 (HD = 1)
First node at HD=1
map[1] = 3
Map: {-2: 4, -1: 2, 0: 12, 1: 3}

STEP 7: Process node 7 (HD = 2)
First node at HD=2
map[2] = 7
Map: {-2: 4, -1: 2, 0: 12, 1: 3, 2: 7}

─────────────────────────────────────────

📋 FINAL MAP STATE:
map = {
  -2: 4,
  -1: 2,
   0: 12,  ← Sum of 1, 5, 6
   1: 3,
   2: 7
}

─────────────────────────────────────────

📋 BUILD RESULT:
Iterate through map (insertion order preserved):

HD = -2: sum = 4 → res.push(4)
HD = -1: sum = 2 → res.push(2)
HD = 0: sum = 12 → res.push(12)
HD = 1: sum = 3 → res.push(3)
HD = 2: sum = 7 → res.push(7)

res = [4, 2, 12, 3, 7]

🏆 FINAL RESULT: [4, 2, 12, 3, 7]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: HD and Sums

       1 (HD=0)
      / \
(HD=-1)2   3(HD=1)
    / \ / \
   4  5 6  7
(HD=-2)(HD=0)(HD=0)(HD=2)

VERTICAL SUMS:
HD = -2: 4
HD = -1: 2
HD = 0: 1 + 5 + 6 = 12
HD = 1: 3
HD = 2: 7

Result: [4, 2, 12, 3, 7]

─────────────────────────────────────────

📊 INORDER TRAVERSAL ORDER:

Nodes visited in order: 4, 2, 5, 1, 6, 3, 7

Node 4 (HD=-2): First time seeing HD=-2 → map[-2] = 4
Node 2 (HD=-1): First time seeing HD=-1 → map[-1] = 2
Node 5 (HD=0): First time seeing HD=0 → map[0] = 5
Node 1 (HD=0): Already have HD=0 → map[0] += 1 → 6
Node 6 (HD=0): Already have HD=0 → map[0] += 6 → 12
Node 3 (HD=1): First time seeing HD=1 → map[1] = 3
Node 7 (HD=2): First time seeing HD=2 → map[2] = 7

MAP INSERTION ORDER: -2, -1, 0, 1, 2 (left to right!)

─────────────────────────────────────────

📊 EXAMPLE 2: Multiple Nodes at Same HD

INPUT:
       3
      / \
     9   20
        / \
       15  7

HD ASSIGNMENT:
     3 (HD=0)
    / \
   9   20 (HD=1)
(HD=-1) / \
      15  7 (HD=2)
   (HD=0)

INORDER TRAVERSAL: 9, 3, 15, 20, 7

STEP 1: Node 9 (HD=-1)
map[-1] = 9

STEP 2: Node 3 (HD=0)
map[0] = 3

STEP 3: Node 15 (HD=0)
map[0] = 3 + 15 = 18 ✓

STEP 4: Node 20 (HD=1)
map[1] = 20

STEP 5: Node 7 (HD=2)
map[2] = 7

FINAL MAP: {-1: 9, 0: 18, 1: 20, 2: 7}

Result: [9, 18, 20, 7]

🏆 OUTPUT: [9, 18, 20, 7]

─────────────────────────────────────────

📊 WHY INORDER GIVES LEFT-TO-RIGHT ORDER:

INORDER: Left → Root → Right

For any subtree:
1. Process entire left subtree first (negative HDs)
2. Process root (current HD)
3. Process entire right subtree (positive HDs)

This means:
- Leftmost nodes (most negative HD) processed first
- Rightmost nodes (most positive HD) processed last
- Map insertion order = left-to-right HD order

EXAMPLE:
       1 (HD=0)
      / \
(HD=-1)2   3(HD=1)

Inorder: 2, 1, 3
Process order: HD=-1, HD=0, HD=1 ✓

Map order matches HD order!

─────────────────────────────────────────

🔍 COMPARISON WITH LEVEL ORDER APPROACH:

LEVEL ORDER SOLUTION:
```javascript
function verticalOrderSum(root) {
    if(!root) return []
    let map = new Map()
    let minHD = 0, maxHD = 0
    let q = [[root, 0]]
    
    while(q.length > 0) {
        let [node, hd] = q.shift()
        map.set(hd, (map.get(hd) || 0) + node.data)
        minHD = Math.min(minHD, hd)
        maxHD = Math.max(maxHD, hd)
        if(node.left) q.push([node.left, hd-1])
        if(node.right) q.push([node.right, hd+1])
    }
    
    let res = []
    for(let i = minHD; i <= maxHD; i++) {
        res.push(map.get(i))
    }
    return res
}
```

COMPARISON:
- Level order: needs queue, minHD/maxHD tracking
- Inorder: simpler, no queue needed
- Both: O(n) time, O(n) space
- Inorder: leverages map insertion order
- Level order: needs explicit iteration

For vertical sum, inorder is simpler!

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(n)
- Inorder traversal: visit each node once = O(n)
- Map operations (get, set, has): O(1) each
- Iterate through map: O(number of HDs) ≤ O(n)
- Total: O(n)

SPACE COMPLEXITY: O(n)
- Map: stores O(w) entries, w = tree width ≤ n
- Recursion stack: O(h) where h = tree height ≤ n
- Result array: O(w) entries
- Total: O(n) worst case

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 65: if(!root) return []
Output: []

CASE 2: Single Node
Input: TreeNode(5)
Inorder: process 5 at HD=0
map = {0: 5}
Output: [5]

CASE 3: Only Left Children
Input:
  3
 /
2
/
1
Inorder: 1, 2, 3
map = {-2: 1, -1: 2, 0: 3}
Output: [1, 2, 3]

CASE 4: Only Right Children
Input:
1
 \
  2
   \
    3
Inorder: 1, 2, 3
map = {0: 1, 1: 2, 2: 3}
Output: [1, 2, 3]

CASE 5: All Same HD
Input:
  1
 / \
2   3
Inorder: 2, 1, 3
But wait, they have different HDs:
HD=-1: 2
HD=0: 1
HD=1: 3
Not all same HD.

CASE 6: Negative Values
Input:
  -5
 / \
3   -2
map = {-1: 3, 0: -5, 1: -2}
Output: [3, -5, -2]

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ INORDER SUFFICIENCY:
   - Vertical order traversal: needs level order
   - Vertical sum: inorder sufficient
   - Order of nodes doesn't matter for sum
   - Simpler algorithm possible

2️⃣ MAP INSERTION ORDER:
   - JavaScript Map preserves insertion order
   - Inorder visits left-to-right
   - No need for min/max HD tracking
   - Direct iteration works

3️⃣ ACCUMULATION PATTERN:
   - Check if HD exists
   - If yes: add to existing sum
   - If no: create new entry
   - Simple sum accumulation

4️⃣ SPACE OPTIMIZATION:
   - Store sums, not node lists
   - Map size = number of vertical lines
   - Much smaller than n for wide trees
   - More space efficient

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Correct HD calculation: ✓
- Proper sum accumulation: ✓
- Left-to-right result: ✓
- Optimal complexity: ✓

🎯 COMMON MISTAKES:

MISTAKE 1: Using Level Order (Overcomplicated)
Problem: Level order works but more complex
Solution: Inorder is simpler for sum

MISTAKE 2: Not Handling Existing HD
Problem: Overwriting instead of adding
Solution: Check if map.has(hd)

MISTAKE 3: Iterating Map Wrong Way
Problem: Manual HD iteration like vertical order
Solution: Use for..of on map (insertion order)

MISTAKE 4: Not Handling Empty Tree
Problem: Null root causes errors
Solution: Check if(!root) return []

MISTAKE 5: Wrong HD Calculation
Problem: Left = hd+1, right = hd-1 (reversed)
Solution: Left = hd-1, right = hd+1

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Balanced tree
- Skewed left
- Skewed right
- Multiple nodes at same HD
- Negative values
- Wide tree

🎯 DEBUGGING TIPS:
- Print map after inorder traversal
- Verify HD calculations
- Check sum accumulation
- Trace inorder sequence
- Visualize vertical lines

🎯 INTERVIEW TIPS:
- Explain why inorder works here
- Contrast with vertical order traversal
- Draw tree with HD labels
- Show sum accumulation
- Discuss map insertion order
- Analyze complexity

🎯 REAL-WORLD APPLICATIONS:
- Column-wise aggregation
- Vertical data summarization
- Hierarchical sum reporting
- Coordinate-based totals
- Tree-based analytics

🎯 RELATED PROBLEMS:
- Vertical Order Traversal (needs level order)
- Vertical Sum (this problem - inorder works)
- Bottom View (needs level order)
- Top View (needs level order)
- Diagonal Sum

🎯 OPTIMIZATION NOTES:
- Already optimal O(n) time
- Cannot do better (must visit all nodes)
- Space is optimal for this approach
- Inorder is simpler than level order
- No unnecessary structures

🎯 WHEN TO USE INORDER vs LEVEL ORDER:

USE INORDER:
- Only need sums/aggregates
- Order of nodes doesn't matter
- Simpler implementation
- This problem (vertical sum)

USE LEVEL ORDER:
- Need node ordering (top-to-bottom)
- Order matters for output
- More complex but necessary
- Vertical order traversal

🎯 CONCLUSION:
Vertical sum in binary tree can be efficiently computed using inorder traversal with horizontal distance tracking, where nodes are processed left-to-right (HD=-k to HD=+k), sums are accumulated in a map, and JavaScript Map's insertion order preservation gives us left-to-right result order automatically, achieving O(n) time and O(n) space. Unlike vertical order traversal which requires level order, vertical sum works with simpler inorder traversal since we only need sums, not individual node ordering!
*/
