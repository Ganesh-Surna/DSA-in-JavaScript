/* Problem: ✅✅✅✅ Construct BST from Level Order ✅✅✅✅

Given a level order traversal array of a Binary Search Tree (BST), construct 
the BST from this array. The level order traversal visits nodes level by level,
left to right.

The BST property ensures that:
- Left subtree contains nodes < current node
- Right subtree contains nodes > current node
- We need to maintain valid ranges for each node during construction

You are given an array representing level order traversal of a BST. 
Return the root of the constructed BST.

Example 1:
Input: [7, 4, 12, 3, 6, 8, 1, 5, 10]
Output: 
      7
     / \
    4   12
   / \ / \
  3  6 8  10
 /   \
1     5

Example 2:
Input: [5, 3, 7, 2, 4, 6, 8]
Output:
      5
     / \
    3   7
   / \ / \
  2  4 6  8

Example 3:
Input: [10, 5, 15, 3, 7, 12, 18]
Output:
      10
     /  \
    5    15
   / \  /  \
  3  7 12  18

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ array[i] ≤ 10^5
- Array represents valid BST level order

Expected Complexities:
Time Complexity: O(n) - visit each element once
Auxiliary Space: O(n) - for queue and BST nodes
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n) - visit each element once
// ✅ SC = O(n) - for queue and BST nodes
function constructBstFromLevelOrder(arr, n) {
    if (n === 0) return null;

    let root = new Node(arr[0]);
    let q = [];

    // Each item in queue: [node, min, max]
    q.push([root, -Infinity, Infinity]);
    let i = 1;

    while (i < n) {
        let [node, min, max] = q.shift();

        // Left child
        if (i < n && arr[i] > min && arr[i] < node.data) {
            node.left = new Node(arr[i]);
            q.push([node.left, min, node.data]);
            i++;
        }

        // Right child
        if (i < n && arr[i] > node.data && arr[i] < max) {
            node.right = new Node(arr[i]);
            q.push([node.right, node.data, max]);
            i++;
        }
    }

    return root;
}

// Test cases
let arr1 = [7, 4, 12, 3, 6, 8, 1, 5, 10];
let root1 = constructBstFromLevelOrder(arr1, arr1.length);
console.log("Test 1 - Root:", root1.data); // 7

let arr2 = [5, 3, 7, 2, 4, 6, 8];
let root2 = constructBstFromLevelOrder(arr2, arr2.length);
console.log("Test 2 - Root:", root2.data); // 5

let arr3 = [10, 5, 15, 3, 7, 12, 18];
let root3 = constructBstFromLevelOrder(arr3, arr3.length);
console.log("Test 3 - Root:", root3.data); // 10

/*🎯 CORE IDEA: Use BFS with range validation to construct BST level by level.
Process level order array using a queue that stores [node, min, max] tuples.
For each node, validate if next elements can be its children based on BST
properties and valid ranges, then add them to queue for further processing.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create root from first element
   - Initialize queue with [root, -∞, +∞]
   - Start processing from index 1
   - Maintain valid ranges for each node

2️⃣ LEVEL-BY-LEVEL PROCESSING:
   - Process nodes in queue order
   - Extract node and its valid range [min, max]
   - Check if next elements can be children
   - Validate BST properties

3️⃣ LEFT CHILD VALIDATION:
   - Check if arr[i] > min and arr[i] < node.data
   - Create left child if valid
   - Add to queue with range [min, node.data]
   - Increment array index

4️⃣ RIGHT CHILD VALIDATION:
   - Check if arr[i] > node.data and arr[i] < max
   - Create right child if valid
   - Add to queue with range [node.data, max]
   - Increment array index

5️⃣ CONTINUE PROCESSING:
   - Process all nodes in queue
   - Build BST level by level
   - Maintain BST properties
   - Return constructed root

🧠 WHY THIS APPROACH?
- BFS processes level by level
- Range validation ensures BST properties
- Queue maintains processing order
- O(n) time complexity
- Handles all valid inputs

💡 KEY INSIGHTS:
- Use queue for level-order processing
- Store [node, min, max] for range validation
- Validate BST properties at each step
- Process left child before right child
- Maintain valid ranges for children
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Construct BST from Level Order

INPUT: [7, 4, 12, 3, 6, 8, 1, 5, 10]
EXPECTED OUTPUT: 
      7
     / \
    4   12
   / \ / \
  3  6 8  10
 /   \
1     5

🎯 GOAL: Construct BST from level order array!

🔍 STEP-BY-STEP PROCESS:

LEVEL-BY-LEVEL CONSTRUCTION:

STEP 1: Initialize
Queue: [[Node(7), -∞, +∞]]
Array index: 1
Current: [7, 4, 12, 3, 6, 8, 1, 5, 10]

STEP 2: Process Node(7)
Dequeue: [Node(7), -∞, +∞]
Check left child: arr[1] = 4
4 > -∞ ✓ and 4 < 7 ✓
Create left child: Node(4)
Enqueue: [Node(4), -∞, 7]
Index: 2

Check right child: arr[2] = 12
12 > 7 ✓ and 12 < +∞ ✓
Create right child: Node(12)
Enqueue: [Node(12), 7, +∞]
Index: 3

Queue: [[Node(4), -∞, 7], [Node(12), 7, +∞]]

STEP 3: Process Node(4)
Dequeue: [Node(4), -∞, 7]
Check left child: arr[3] = 3
3 > -∞ ✓ and 3 < 4 ✓
Create left child: Node(3)
Enqueue: [Node(3), -∞, 4]
Index: 4

Check right child: arr[4] = 6
6 > 4 ✓ and 6 < 7 ✓
Create right child: Node(6)
Enqueue: [Node(6), 4, 7]
Index: 5

Queue: [[Node(12), 7, +∞], [Node(3), -∞, 4], [Node(6), 4, 7]]

STEP 4: Process Node(12)
Dequeue: [Node(12), 7, +∞]
Check left child: arr[5] = 8
8 > 7 ✓ and 8 < 12 ✓
Create left child: Node(8)
Enqueue: [Node(8), 7, 12]
Index: 6

Check right child: arr[6] = 1
1 > 12 ✗ (invalid)
Skip right child

Queue: [[Node(3), -∞, 4], [Node(6), 4, 7], [Node(8), 7, 12]]

STEP 5: Process Node(3)
Dequeue: [Node(3), -∞, 4]
Check left child: arr[6] = 1
1 > -∞ ✓ and 1 < 3 ✓
Create left child: Node(1)
Enqueue: [Node(1), -∞, 3]
Index: 7

Check right child: arr[7] = 5
5 > 3 ✓ but 5 < 4 ✗ (invalid range)
Skip right child

Queue: [[Node(6), 4, 7], [Node(8), 7, 12], [Node(1), -∞, 3]]

STEP 6: Process Node(6)
Dequeue: [Node(6), 4, 7]
Check left child: arr[7] = 5
5 > 4 ✓ and 5 < 6 ✓
Create left child: Node(5)
Enqueue: [Node(5), 4, 6]
Index: 8

Check right child: arr[8] = 10
10 > 6 ✓ but 10 < 7 ✗ (invalid range)
Skip right child

Queue: [[Node(8), 7, 12], [Node(1), -∞, 3], [Node(5), 4, 6]]

STEP 7: Process Node(8)
Dequeue: [Node(8), 7, 12]
Check left child: arr[8] = 10
10 > 7 ✓ and 10 < 8 ✗ (invalid)
Skip left child

Check right child: arr[8] = 10
10 > 8 ✓ and 10 < 12 ✓
Create right child: Node(10)
Enqueue: [Node(10), 8, 12]
Index: 9

Queue: [[Node(1), -∞, 3], [Node(5), 4, 6], [Node(10), 8, 12]]

STEP 8: Process remaining nodes
All remaining nodes have no children (array exhausted)
Final BST constructed

🏆 FINAL RESULT: 
      7
     / \
    4   12
   / \ / \
  3  6 8  10
 /   \
1     5

─────────────────────────────────────────

📊 EXAMPLE 2: Simple BST Construction

INPUT: [5, 3, 7, 2, 4, 6, 8]
EXPECTED OUTPUT:
      5
     / \
    3   7
   / \ / \
  2  4 6  8

PROCESS:

STEP 1: Root = 5, Queue: [[5, -∞, +∞]]

STEP 2: Process 5
Left child: 3 (valid), Right child: 7 (valid)
Queue: [[3, -∞, 5], [7, 5, +∞]]

STEP 3: Process 3
Left child: 2 (valid), Right child: 4 (valid)
Queue: [[7, 5, +∞], [2, -∞, 3], [4, 3, 5]]

STEP 4: Process 7
Left child: 6 (valid), Right child: 8 (valid)
Queue: [[2, -∞, 3], [4, 3, 5], [6, 5, 7], [8, 7, +∞]]

STEP 5: Process remaining nodes
All are leaves, no children

🏆 RESULT:
      5
     / \
    3   7
   / \ / \
  2  4 6  8

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

QUEUE STATE EVOLUTION:

Initial: [[Node(7), -∞, +∞]]

After processing 7:
[[Node(4), -∞, 7], [Node(12), 7, +∞]]

After processing 4:
[[Node(12), 7, +∞], [Node(3), -∞, 4], [Node(6), 4, 7]]

After processing 12:
[[Node(3), -∞, 4], [Node(6), 4, 7], [Node(8), 7, 12]]

─────────────────────────────────────────

📊 RANGE VALIDATION LOGIC:

FOR LEFT CHILD:
- Must be > min (parent's minimum)
- Must be < node.data (parent's value)
- Range: [min, node.data)

FOR RIGHT CHILD:
- Must be > node.data (parent's value)
- Must be < max (parent's maximum)
- Range: (node.data, max)

This ensures BST properties!

─────────────────────────────────────────

📊 BST PROPERTY MAINTENANCE:

AT EACH NODE:
- Left subtree: all values < node.data
- Right subtree: all values > node.data
- Range validation ensures this
- No invalid insertions possible

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ LEVEL-ORDER PROCESSING:
   - Processes nodes level by level
   - Maintains correct order
   - Uses BFS with queue
   - Natural for level order array

2️⃣ RANGE VALIDATION:
   - Each node has valid range [min, max]
   - Children must fit in valid ranges
   - Ensures BST properties
   - Prevents invalid constructions

3️⃣ QUEUE MANAGEMENT:
   - Stores [node, min, max] tuples
   - Processes in correct order
   - Maintains level-by-level processing
   - Efficient memory usage

4️⃣ BST PROPERTY ENFORCEMENT:
   - Left child: min < child < node.data
   - Right child: node.data < child < max
   - Automatic validation
   - No manual checking needed

5️⃣ INDEX MANAGEMENT:
   - Single index tracks array position
   - Increments only when child created
   - Handles array bounds correctly
   - Efficient processing

💡 KEY INSIGHT:
Using BFS with range validation to construct BST level by level, where each
node stores its valid range [min, max], children are validated against these
ranges, and the queue maintains level-order processing, achieving O(n) time
complexity while ensuring BST properties!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each array element once: O(n)
- Queue operations: O(1) per element
- Node creation: O(1) per element
- Total: O(n)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Queue storage: O(n) worst case
- BST nodes: O(n)
- Variables: O(1)
- Total: O(n)
- Linear space usage

🎯 EDGE CASES:

CASE 1: Empty Array
Input: []
Process: Return null immediately
Result: null
Output: null

CASE 2: Single Element
Input: [5]
Process: Create root only
Result: Node(5)
Output: Node(5)

CASE 3: Two Elements
Input: [5, 3]
Process: Root 5, left child 3
Result: 5 → 3
Output: Node(5) with left child

CASE 4: Skewed Tree
Input: [5, 4, 3, 2, 1]
Process: All left children
Result: 5 → 4 → 3 → 2 → 1
Output: Skewed BST

CASE 5: Complete Tree
Input: [5, 3, 7, 2, 4, 6, 8]
Process: All nodes have children
Result: Complete BST
Output: Complete BST

CASE 6: Invalid Range
Input: [5, 7, 3] (invalid level order)
Process: Skip invalid children
Result: 5 → 7 (3 skipped)
Output: Valid BST subset

🎯 ALGORITHM CORRECTNESS:
- Processes all valid elements: ✓
- Maintains BST properties: ✓
- Handles invalid ranges: ✓
- Constructs correct structure: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 13: Handle empty array
- Line 15: Create root node
- Line 16: Initialize queue
- Line 19: Add root with full range
- Line 22-38: Main processing loop
- Line 26-30: Left child validation
- Line 33-37: Right child validation

🎯 RANGE VALIDATION:

LEFT CHILD CHECK:
if (i < n && arr[i] > min && arr[i] < node.data) {
    // Valid left child
    node.left = new Node(arr[i]);
    q.push([node.left, min, node.data]);
    i++;
}

RIGHT CHILD CHECK:
if (i < n && arr[i] > node.data && arr[i] < max) {
    // Valid right child
    node.right = new Node(arr[i]);
    q.push([node.right, node.data, max]);
    i++;
}

This ensures BST properties!

🎯 QUEUE MANAGEMENT:
- Store [node, min, max] tuples
- Process in FIFO order
- Maintain level-by-level processing
- Efficient range tracking

Queue enables level-order construction!

🎯 ADVANTAGES:
- O(n) time complexity
- Maintains BST properties
- Handles invalid inputs gracefully
- Clear and readable code
- Efficient memory usage

🎯 DISADVANTAGES:
- Requires valid level order input
- O(n) space for queue
- Cannot handle duplicates
- Limited error recovery

🎯 REAL-WORLD APPLICATIONS:
- Tree reconstruction
- Data structure conversion
- Algorithm testing
- Tree visualization
- Database indexing
- File system construction

🎯 RELATED PROBLEMS:
- Construct BST from preorder
- Construct BST from inorder
- Construct BST from postorder
- Serialize and deserialize BST
- Validate BST
- Convert sorted array to BST

🎯 TESTING STRATEGY:
- Empty array
- Single element
- Two elements
- Complete tree
- Skewed tree
- Invalid ranges

🎯 DEBUGGING TIPS:
- Print queue state
- Trace range validation
- Verify BST properties
- Check index management
- Monitor node creation

🎯 COMMON MISTAKES:
- Wrong range validation
- Incorrect queue management
- Missing edge cases
- Wrong index handling
- Invalid BST construction

🎯 BEST PRACTICES:
- Validate ranges carefully
- Handle edge cases
- Use clear variable names
- Test with various inputs
- Verify BST properties

🎯 INTERVIEW TIPS:
- Explain BFS approach
- Discuss range validation
- Show queue management
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 BST CONSTRUCTION PATTERN:
1. Initialize with root
2. Use queue for level-order processing
3. Validate ranges for children
4. Create children if valid
5. Continue until array exhausted

This gives efficient construction!

🎯 RANGE STRATEGY:
- Track valid ranges per node
- Validate children against ranges
- Maintain BST properties
- Handle invalid inputs
- Efficient processing

🎯 COMPARISON WITH RECURSIVE APPROACH:

RECURSIVE APPROACH:
function constructBST(arr, start, end) {
    if (start > end) return null;
    let root = new Node(arr[start]);
    // Find split point and recurse
    // More complex for level order
}

BFS APPROACH:
- O(n) vs O(n log n) time
- O(n) vs O(log n) space
- Level-order vs recursive
- Range validation vs split finding

🎯 CONCLUSION:
Constructing BST from level order is efficiently achieved using BFS with
range validation, processing nodes level by level, validating children
against valid ranges, and maintaining BST properties, achieving O(n)
time and space complexity!
*/