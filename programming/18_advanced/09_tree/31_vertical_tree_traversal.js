/* Problem: ✅✅✅✅ Vertical Order Traversal of Binary Tree ✅✅✅✅

Given a binary tree, return the vertical order traversal of its nodes' values. For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0).

The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Important: If there are multiple nodes passing through a vertical line, they should be printed as they appear in LEVEL ORDER traversal of the tree (top to bottom).

Horizontal Distance (HD):
- Root has HD = 0
- Left child has HD = parent's HD - 1
- Right child has HD = parent's HD + 1
- Nodes with same HD are in same vertical line

Example 1:
Input:
       1
      / \
     2   3
    / \ / \
   4  5 6  7
Output: [[4], [2], [1, 5, 6], [3], [7]]
Explanation:
- HD = -2: [4]
- HD = -1: [2]
- HD = 0: [1, 5, 6] (in level order)
- HD = 1: [3]
- HD = 2: [7]

Example 2:
Input:
       1
      /
     2
    /
   3
Output: [[3], [2], [1]]
Explanation:
- HD = -2: [3]
- HD = -1: [2]
- HD = 0: [1]

Example 3:
Input:
     1
      \
       2
        \
         3
Output: [[1], [2], [3]]
Explanation:
- HD = 0: [1]
- HD = 1: [2]
- HD = 2: [3]

Example 4:
Input:
       3
      / \
     9   20
        / \
       15  7
Output: [[9], [3, 15], [20], [7]]
Explanation:
- HD = -1: [9]
- HD = 0: [3, 15] (in level order: 3 comes before 15)
- HD = 1: [20]
- HD = 2: [7]

Example 5:
Input: null
Output: []
Explanation: Empty tree has no vertical lines.

Constraints:
- The number of nodes in the tree is in the range [0, 100]
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
function verticalOrder(root) {
    if(!root) return [];
    
    let res = []
    
    let map = new Map() // to store (hd : list of nodes of same hd) pairs
    let minHD = 0, maxHD = 0; // To traverse through the map in the order of HD (horizontal distance)
    
    /* ✅ Note: If there are multiple nodes passing through a vertical line, 
     then they should be printed as they appear in level order traversal of the tree.

     1. If we choose inorder traversal, we will not get the correct result. Because 
         inorder doesn't guarantee top-to-bottom order for same HD.

     2. If we choose level order traversal, we will get the correct result.
         Level order naturally processes nodes top-to-bottom, left-to-right.
    */

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
    
    // Iterate from minHD to maxHD (Not directly iterating through map, because it will be in level order, not in inorder)
    for(let hd = minHD; hd <= maxHD; hd++ ){
        if(map.has(hd)){
            // If the hd is present in the map, then push the array of nodes at that hd to the result
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
console.log("Test 1:", verticalOrder(root1)); // [[4], [2], [1, 5, 6], [3], [7]]

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.left.left = new TreeNode(3);
console.log("Test 2:", verticalOrder(root2)); // [[3], [2], [1]]

let root3 = new TreeNode(1);
root3.right = new TreeNode(2);
root3.right.right = new TreeNode(3);
console.log("Test 3:", verticalOrder(root3)); // [[1], [2], [3]]

let root4 = new TreeNode(3);
root4.left = new TreeNode(9);
root4.right = new TreeNode(20);
root4.right.left = new TreeNode(15);
root4.right.right = new TreeNode(7);
console.log("Test 4:", verticalOrder(root4)); // [[9], [3, 15], [20], [7]]

console.log("Test 5:", verticalOrder(null)); // []

/*🎯 CORE IDEA: Use LEVEL ORDER TRAVERSAL (BFS) with HORIZONTAL DISTANCE tracking. Assign each node an HD value: root = 0, left child = parent - 1, right child = parent + 1. Store nodes in a map grouped by HD. Process queue in level order to ensure top-to-bottom ordering for same HD. Finally, iterate from minHD to maxHD to build result in left-to-right vertical order.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create result array
   - Create map to store nodes by HD
   - Initialize minHD = 0, maxHD = 0
   - Create queue with [root, 0]

2️⃣ LEVEL ORDER TRAVERSAL:
   - While queue is not empty:
     * Dequeue [node, hd]
     * Add node to map at hd
     * Update minHD and maxHD
     * Enqueue left child with hd-1
     * Enqueue right child with hd+1

3️⃣ HORIZONTAL DISTANCE ASSIGNMENT:
   - Root: HD = 0
   - Left child: HD = parent's HD - 1
   - Right child: HD = parent's HD + 1
   - Track min and max HD values

4️⃣ MAP STORAGE:
   - Key: HD value
   - Value: Array of nodes at that HD
   - Nodes added in level order (top to bottom)
   - Multiple nodes at same HD maintained in order

5️⃣ BUILD RESULT:
   - Iterate from minHD to maxHD
   - For each HD, get array from map
   - Push array to result
   - Ensures left-to-right vertical order

6️⃣ RETURN RESULT:
   - Result contains vertical lines from left to right
   - Each vertical line has nodes in top-to-bottom order

🧠 WHY THIS APPROACH?

1️⃣ LEVEL ORDER = TOP-TO-BOTTOM:
   - BFS naturally processes nodes level by level
   - Nodes at same HD added in top-to-bottom order
   - Correct ordering guaranteed

2️⃣ INORDER FAILS:
   - Inorder: left → root → right
   - Doesn't guarantee top-to-bottom for same HD
   - Example: nodes at HD=0 might be added out of order
   - Level order is essential

3️⃣ HD TRACKING:
   - Simple arithmetic: left = parent - 1, right = parent + 1
   - Uniquely identifies vertical lines
   - Easy to track with min/max bounds

4️⃣ MAP FOR GROUPING:
   - O(1) access to nodes at each HD
   - Preserves insertion order (level order)
   - Efficient storage and retrieval

💡 KEY INSIGHTS:

1️⃣ WHY LEVEL ORDER NOT INORDER:
   - Same HD nodes must be top-to-bottom
   - Inorder doesn't preserve vertical position
   - Level order naturally gives correct order
   - Critical for correct output

2️⃣ HD CALCULATION:
   - Root starts at HD = 0
   - Left decreases HD (go left on number line)
   - Right increases HD (go right on number line)
   - Creates vertical lines

3️⃣ MIN/MAX HD TRACKING:
   - Determines range of vertical lines
   - Avoids sparse iteration over map
   - Ensures left-to-right order in result

4️⃣ ARRAY PUSH PITFALL:
   - arr.push(value) returns NEW LENGTH, not array!
   - WRONG: map.set(hd, arr.push(node.data))
   - RIGHT: arr.push(node.data); map.set(hd, arr)
   - Common JavaScript gotcha

🎯 ALGORITHM DETAILS:

HORIZONTAL DISTANCE:
- Measures horizontal position from root
- Root = 0, left = -1, right = +1
- Negative = left of root
- Positive = right of root
- Same HD = same vertical line

LEVEL ORDER PROCESSING:
- Queue: [[node, hd], ...]
- Dequeue front, process, enqueue children
- Children inherit parent's HD ± 1
- Natural top-to-bottom ordering

MAP STRUCTURE:
- Key: HD value (integer)
- Value: Array of node values
- Insertion order preserved
- JavaScript Map maintains order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Standard Binary Tree

INPUT:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [[4], [2], [1, 5, 6], [3], [7]]

🎯 GOAL: Get vertical order traversal from left to right!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
map = {}
minHD = 0, maxHD = 0
q = [[1, 0]]

─────────────────────────────────────────

📋 LEVEL ORDER TRAVERSAL:

ITERATION 1: Process node 1, HD = 0
Dequeue: [1, 0]
map[0] = [1]
minHD = min(0, 0) = 0
maxHD = max(0, 0) = 0
Enqueue left: [2, -1]
Enqueue right: [3, 1]
Queue: [[2, -1], [3, 1]]

ITERATION 2: Process node 2, HD = -1
Dequeue: [2, -1]
map[-1] = [2]
minHD = min(0, -1) = -1
maxHD = max(0, -1) = 0
Enqueue left: [4, -2]
Enqueue right: [5, 0]
Queue: [[3, 1], [4, -2], [5, 0]]

ITERATION 3: Process node 3, HD = 1
Dequeue: [3, 1]
map[1] = [3]
minHD = min(-1, 1) = -1
maxHD = max(0, 1) = 1
Enqueue left: [6, 0]
Enqueue right: [7, 2]
Queue: [[4, -2], [5, 0], [6, 0], [7, 2]]

ITERATION 4: Process node 4, HD = -2
Dequeue: [4, -2]
map[-2] = [4]
minHD = min(-1, -2) = -2
maxHD = max(1, -2) = 1
No children
Queue: [[5, 0], [6, 0], [7, 2]]

ITERATION 5: Process node 5, HD = 0
Dequeue: [5, 0]
map[0] = [1, 5] (append to existing)
minHD = min(-2, 0) = -2
maxHD = max(1, 0) = 1
No children
Queue: [[6, 0], [7, 2]]

ITERATION 6: Process node 6, HD = 0
Dequeue: [6, 0]
map[0] = [1, 5, 6] (append to existing)
minHD = min(-2, 0) = -2
maxHD = max(1, 0) = 1
No children
Queue: [[7, 2]]

ITERATION 7: Process node 7, HD = 2
Dequeue: [7, 2]
map[2] = [7]
minHD = min(-2, 2) = -2
maxHD = max(1, 2) = 2
No children
Queue: []

─────────────────────────────────────────

📋 FINAL MAP STATE:
map = {
  -2: [4],
  -1: [2],
   0: [1, 5, 6],
   1: [3],
   2: [7]
}

minHD = -2, maxHD = 2

─────────────────────────────────────────

📋 BUILD RESULT:
Iterate from -2 to 2:

HD = -2: map.has(-2)? YES → res.push([4])
HD = -1: map.has(-1)? YES → res.push([2])
HD = 0: map.has(0)? YES → res.push([1, 5, 6])
HD = 1: map.has(1)? YES → res.push([3])
HD = 2: map.has(2)? YES → res.push([7])

res = [[4], [2], [1, 5, 6], [3], [7]]

🏆 FINAL RESULT: [[4], [2], [1, 5, 6], [3], [7]]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: HD Assignment

       1 (HD=0)
      / \
(HD=-1)2   3(HD=1)
    / \ / \
   4  5 6  7
(HD=-2)(HD=0)(HD=0)(HD=2)

VERTICAL LINES:
HD = -2: |4|
HD = -1:  |2|
HD = 0:    |1|
           |5|
           |6|
HD = 1:      |3|
HD = 2:        |7|

Reading top-to-bottom at each HD:
-2: [4]
-1: [2]
 0: [1, 5, 6] (top to bottom: 1, then 5 and 6)
 1: [3]
 2: [7]

─────────────────────────────────────────

📊 EXAMPLE 2: Skewed Left

INPUT:
       1
      /
     2
    /
   3

PROCESS:

Queue processing:
1. [1, 0] → map[0] = [1], enqueue [2, -1]
2. [2, -1] → map[-1] = [2], enqueue [3, -2]
3. [3, -2] → map[-2] = [3]

MAP:
{
  -2: [3],
  -1: [2],
   0: [1]
}

Result: [[3], [2], [1]]

🏆 OUTPUT: [[3], [2], [1]]

─────────────────────────────────────────

📊 EXAMPLE 3: Multiple Nodes at Same HD

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

LEVEL ORDER PROCESSING:
1. [3, 0] → map[0] = [3]
2. [9, -1] → map[-1] = [9]
3. [20, 1] → map[1] = [20]
4. [15, 0] → map[0] = [3, 15] (15 added after 3)
5. [7, 2] → map[2] = [7]

MAP:
{
  -1: [9],
   0: [3, 15],  ← Multiple nodes, level order preserved
   1: [20],
   2: [7]
}

Result: [[9], [3, 15], [20], [7]]

KEY POINT: 15 comes after 3 because level order processes 3 first (level 0), then 15 (level 2).

🏆 OUTPUT: [[9], [3, 15], [20], [7]]

─────────────────────────────────────────

📊 WHY LEVEL ORDER NOT INORDER?

TREE:
       1
      / \
     2   3
    / \
   4   5

INORDER TRAVERSAL: 4, 2, 5, 1, 3
- Visits 4 (HD=-2)
- Visits 2 (HD=-1)
- Visits 5 (HD=0)
- Visits 1 (HD=0)
- Visits 3 (HD=1)

At HD=0: Would get [5, 1] (5 before 1)
But 1 is above 5 in the tree!

LEVEL ORDER TRAVERSAL: 1, 2, 3, 4, 5
- Visits 1 (HD=0)
- Visits 2 (HD=-1)
- Visits 3 (HD=1)
- Visits 4 (HD=-2)
- Visits 5 (HD=0)

At HD=0: Gets [1, 5] (1 before 5) ✓
Correct top-to-bottom order!

CONCLUSION: Level order ensures top-to-bottom ordering for same HD.

─────────────────────────────────────────

🔍 COMMON MISTAKE: arr.push() Return Value

WRONG CODE:
let arr = map.has(hd) ? map.get(hd) : []
map.set(hd, arr.push(node.data)) ❌

PROBLEM:
arr.push(node.data) returns the NEW LENGTH, not the array!
Example: [1, 2].push(3) returns 3 (length), not [1, 2, 3]
map.set(hd, 3) stores NUMBER 3, not array!

CORRECT CODE:
let arr = map.has(hd) ? map.get(hd) : []
arr.push(node.data)
map.set(hd, arr) ✓

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(n)
- Level order traversal: visit each node once = O(n)
- Map operations (get, set, has): O(1) each
- Building result: O(maxHD - minHD) ≤ O(n)
- Total: O(n)

SPACE COMPLEXITY: O(n)
- Queue: O(w) where w = max width = O(n)
- Map: stores all n nodes = O(n)
- Result: all n nodes = O(n)
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 73: if(!root) return []
Output: []

CASE 2: Single Node
Input: TreeNode(1)
Queue: [[1, 0]]
map[0] = [1]
minHD = 0, maxHD = 0
Output: [[1]]

CASE 3: Only Left Children
Input:
  1
 /
2
Queue: [[1, 0], [2, -1]]
map = {0: [1], -1: [2]}
Output: [[2], [1]]

CASE 4: Only Right Children
Input:
1
 \
  2
Queue: [[1, 0], [2, 1]]
map = {0: [1], 1: [2]}
Output: [[1], [2]]

CASE 5: All Same HD (Vertical Line)
Input:
  1
 /
2
 \
  3
Node 1: HD = 0
Node 2: HD = -1
Node 3: HD = 0
map = {-1: [2], 0: [1, 3]}
Output: [[2], [1, 3]]

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ LEVEL ORDER ESSENTIAL:
   - Ensures top-to-bottom ordering
   - Inorder/preorder/postorder don't work
   - BFS is the only correct traversal
   - Queue maintains level order

2️⃣ HD AS VERTICAL COORDINATE:
   - Root = origin (0)
   - Left = negative direction
   - Right = positive direction
   - Natural number line mapping

3️⃣ MIN/MAX HD OPTIMIZATION:
   - Avoids iterating entire integer range
   - Only iterate existing HDs
   - Ensures left-to-right result order
   - O(maxHD - minHD) iteration

4️⃣ MAP PRESERVES ORDER:
   - JavaScript Map maintains insertion order
   - Level order = insertion order
   - Top-to-bottom guaranteed
   - No extra sorting needed

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Correct vertical grouping: ✓
- Top-to-bottom ordering: ✓
- Left-to-right result: ✓
- Optimal complexity: ✓

🎯 COMMON MISTAKES:

MISTAKE 1: Using Inorder Traversal
Problem: Doesn't give top-to-bottom order for same HD
Solution: Use level order (BFS)

MISTAKE 2: arr.push() Return Value
Problem: push() returns length, not array
Solution: Push first, then set in map

MISTAKE 3: Iterating Map Directly
Problem: Map order might not be HD sorted
Solution: Iterate from minHD to maxHD

MISTAKE 4: Not Handling Empty Tree
Problem: Null root causes errors
Solution: Check if(!root) return []

MISTAKE 5: Not Tracking Min/Max HD
Problem: Don't know iteration range
Solution: Update minHD/maxHD during traversal

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Balanced tree
- Skewed left
- Skewed right
- Multiple nodes at same HD
- Wide tree (large HD range)

🎯 DEBUGGING TIPS:
- Print map after each iteration
- Verify HD calculations
- Check queue contents
- Trace level order processing
- Visualize vertical lines

🎯 INTERVIEW TIPS:
- Explain why level order is crucial
- Draw tree with HD labels
- Show map state evolution
- Discuss alternative approaches
- Handle edge cases
- Analyze complexity

🎯 ALTERNATIVE APPROACHES:

APPROACH 1: DFS with Sorting
- DFS with (node, hd, level) tuples
- Sort by (hd, level, value)
- More complex, same complexity
- Level order is simpler

APPROACH 2: Recursive with Global Map
- Recursive DFS tracking HD
- Store with level information
- Needs sorting at end
- Not optimal

APPROACH 3: This Approach (BFS)
- Level order with HD tracking
- Direct grouping by HD
- Natural top-to-bottom order
- Optimal and simplest

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization
- Hierarchical data display
- Column-wise reporting
- Vertical alignment layouts
- Coordinate-based grouping

🎯 RELATED PROBLEMS:
- Vertical Order Traversal
- Vertical Sum in Binary Tree
- Bottom View of Binary Tree
- Top View of Binary Tree
- Diagonal Traversal

🎯 OPTIMIZATION NOTES:
- Already optimal O(n) time
- Cannot do better (must visit all nodes)
- Space is optimal for this approach
- No unnecessary data structures
- Clean and efficient

🎯 CONCLUSION:
Vertical order traversal requires grouping nodes by horizontal distance (HD) where root=0, left=-1, right=+1. Using level order traversal (BFS) with a queue ensures nodes at the same HD are ordered top-to-bottom. Store nodes in a map by HD, track min/max HD, then iterate from minHD to maxHD to build the result in left-to-right vertical order, achieving O(n) time and O(n) space!
*/
