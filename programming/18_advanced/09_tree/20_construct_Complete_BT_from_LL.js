/* Problem: ✅✅✅✅ Construct Complete Binary Tree from Linked List ✅✅✅✅

Given a singly linked list, construct a Complete Binary Tree (CBT) from it. 
The task is to convert the linked list into a complete binary tree 
where elements are filled from left to right level by level.

Complete Binary Tree definition:
- All levels are completely filled except possibly the last level
- Last level has all nodes as left as possible
- In linked list to CBT conversion, nodes are filled level-wise from left to right

You are given the head of a singly linked list. 
The task is to construct and return the root of the complete binary tree built from the list.

Example 1:
Input: Linked List: 1 → 2 → 3 → 4 → 5
Output: Complete Binary Tree
         1
        / \
       2   3
      / \
     4   5

Example 2:
Input: Linked List: 1 → 2 → 3 → 4 → 5 → 6 → 7
Output: Perfect Binary Tree
         1
        / \
       2   3
      / \ / \
     4  5 6  7

Constraints:
- 0 <= Number of nodes in linked list <= 10^4
- 1 <= Node.data <= 10^4

Expected Complexities:
Time Complexity: O(n) - visit each linked list node once
Auxiliary Space: O(n) - queue/recursion stack + array storage
*/
class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }

class TreeNode{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}

// 1. Iterative Solution(Using Queue, Level Order Traversal)
// ✅ TC = O(n), ✅ SC = O(n)
function linkedListToCBT(head) {
    if(!head) return null
    
    // Step 1: Create root node
    let root = new TreeNode(head.data)
    
    // Step 2: Use queue to build level-wise
    let q = [root]
    
    let currHead = head.next
    
    while(currHead){
        // 1. Parent node (shift from queue)
        let parentNode = q.shift()
        
        // 2. Left child
        let leftChild = new TreeNode(currHead.data) // create left child
        parentNode.left = leftChild // assign left child to parent node
        q.push(leftChild) // push left child to queue
        currHead = currHead.next // move to next List-node
        
        // 3. Right child (if available)
        if (currHead) {
            const rightChild = new TreeNode(currHead.data);
            parentNode.right = rightChild; // Fixed: was 'parent', should be 'parentNode'
            q.push(rightChild);
            currHead = currHead.next;
        }
    }
    
    return root
}

// 2. Recursive Solution(Using Complete Binary Tree Property)
// ✅ TC = O(n), ✅ SC = O(n)
function linkedListToCBT(head) {
    // Step 1: Convert linked list to array
    const arr = linkedListToArray(head);

    // Step 2: Build tree recursively
    let root = buildTreeRec(arr, 0);
    
    return root;

    // Helper function to convert linked list to array
    function linkedListToArray(head) {
        const arr = [];
        let curr = head;
        while(curr) {
            arr.push(curr.data);
            curr = curr.next;
        }
        return arr;
    }

    // Helper function to build tree recursively
    function buildTreeRec(arr, index=0) {
        if (index >= arr.length) return null;

        const node = new TreeNode(arr[index]);

        node.left = buildTreeRec(arr, 2 * index + 1);
        node.right = buildTreeRec(arr, 2 * index + 2);

        return node;
    }
}

let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(4);
head.next.next.next.next = new ListNode(5);

let root = linkedListToCBT(head);

// Expected Output: [1, 2, 3, 4, 5]


// Function to print level order
function levelOrder(root) {
    if (!root) return [];
    let res = [];
    let q = [root];
    while (q.length) {
      let node = q.shift();
      res.push(node.data);
      if (node.left) q.push(node.left);
      if (node.right) q.push(node.right);
    }
    return res;
}
  
console.log(levelOrder(root));

/*🎯 CORE IDEA: Two approaches to construct complete binary tree from linked list:
(1) Iterative BFS using queue - process LL sequentially, assign nodes as left/right children 
    to parents dequeued from queue, maintaining level-order filling.
(2) Recursive approach - convert LL to array first, then use array indices to recursively build tree 
    where node at index i has left child at 2i+1 and right child at 2i+2 (CBT index property).

📋 STEP-BY-STEP FLOW:

1️⃣ APPROACH 1 (ITERATIVE BFS):
   - Create root from first LL node
   - Use queue to track parent nodes
   - For each parent: assign next 2 LL nodes as left/right children
   - Enqueue children for future processing
   - Continue until LL exhausted

2️⃣ APPROACH 2 (RECURSIVE WITH ARRAY):
   - Convert LL to array (O(n))
   - Use CBT index property recursively
   - Base case: index >= array length
   - Recursive case: build left (2i+1) and right (2i+2) subtrees
   - Return constructed node

🧠 WHY THESE APPROACHES?
- Approach 1: Natural BFS, intuitive level-order filling
- Approach 2: Leverages CBT array property, elegant recursion
- Both: O(n) time, different space usage patterns
- Approach 1: Queue-based, no extra array
- Approach 2: Array conversion + recursion stack

💡 KEY INSIGHTS:
- CBT fills level by level from left to right
- Queue maintains parent order for iterative approach
- Array indices naturally represent CBT structure
- Both approaches guarantee CBT property
- Mid-iteration check crucial for odd number of nodes (Approach 1)
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Construct CBT from Linked List

INPUT: Linked List
1 → 2 → 3 → 4 → 5 → null

OUTPUT: Complete Binary Tree
         1
        / \
       2   3
      / \
     4   5

🎯 GOAL: Build complete binary tree from linked list using two different approaches!

─────────────────────────────────────────

🔍 APPROACH 1 (ITERATIVE BFS) - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
head = 1 → 2 → 3 → 4 → 5
if (!head) return null → FALSE, continue

Step 1: Create root
root = TreeNode(1)
root.data = 1, root.left = null, root.right = null

Step 2: Initialize queue
q = [root] // q = [TreeNode(1)]

Step 3: Move LL pointer to second node
currHead = head.next
currHead = 2 → 3 → 4 → 5

Initial State:
Tree: 1          Queue: [1]          LL: 2 → 3 → 4 → 5

─────────────────────────────────────────

ITERATION 1: Process parent node 1

Step 1: Dequeue parent
parentNode = q.shift()
parentNode = TreeNode(1)
q = []

Step 2: Create left child
currHead = 2
leftChild = TreeNode(2)
parentNode.left = leftChild // 1.left = 2
q.push(leftChild)
q = [TreeNode(2)]
currHead = currHead.next
currHead = 3 → 4 → 5

Step 3: Check if currHead exists
if (currHead) → TRUE (currHead = 3)

Step 4: Create right child
rightChild = TreeNode(3)
parentNode.right = rightChild // 1.right = 3
q.push(rightChild)
q = [TreeNode(2), TreeNode(3)]
currHead = currHead.next
currHead = 4 → 5

Current Tree:
     1
    / \
   2   3

Queue: [2, 3]
LL: 4 → 5

─────────────────────────────────────────

ITERATION 2: Process parent node 2

Step 1: Dequeue parent
parentNode = q.shift()
parentNode = TreeNode(2)
q = [TreeNode(3)]

Step 2: Create left child
currHead = 4
leftChild = TreeNode(4)
parentNode.left = leftChild // 2.left = 4
q.push(leftChild)
q = [TreeNode(3), TreeNode(4)]
currHead = currHead.next
currHead = 5 → null

Step 3: Check if currHead exists
if (currHead) → TRUE (currHead = 5)

Step 4: Create right child
rightChild = TreeNode(5)
parentNode.right = rightChild // 2.right = 5
q.push(rightChild)
q = [TreeNode(3), TreeNode(4), TreeNode(5)]
currHead = currHead.next
currHead = null

Current Tree:
     1
    / \
   2   3
  / \
 4   5

Queue: [3, 4, 5]
LL: null

─────────────────────────────────────────

ITERATION 3: Check while condition
while (currHead) → FALSE (currHead = null)
Exit while loop

🏆 APPROACH 1 RESULT:
     1
    / \
   2   3
  / \
 4   5

─────────────────────────────────────────

🔍 APPROACH 2 (RECURSIVE) - STEP-BY-STEP PROCESS:

📋 PHASE 1: Convert LL to Array

linkedListToArray(head):
  arr = []
  curr = head = 1 → 2 → 3 → 4 → 5
  
  Iteration 1: arr.push(1), arr = [1], curr = 2 → 3 → 4 → 5
  Iteration 2: arr.push(2), arr = [1, 2], curr = 3 → 4 → 5
  Iteration 3: arr.push(3), arr = [1, 2, 3], curr = 4 → 5
  Iteration 4: arr.push(4), arr = [1, 2, 3, 4], curr = 5
  Iteration 5: arr.push(5), arr = [1, 2, 3, 4, 5], curr = null
  
  return arr = [1, 2, 3, 4, 5]

arr = [1, 2, 3, 4, 5]
Array indices:  0  1  2  3  4

─────────────────────────────────────────

📋 PHASE 2: Build Tree Recursively

CBT Index Property:
- Node at index i
- Left child at index 2*i + 1
- Right child at index 2*i + 2

CALL 1: buildTreeRec(arr, index=0)
index = 0 < 5 → continue
node = TreeNode(arr[0]) = TreeNode(1)

node.left = buildTreeRec(arr, 2*0+1 = 1)
node.right = buildTreeRec(arr, 2*0+2 = 2)

CALL 2: buildTreeRec(arr, index=1)
index = 1 < 5 → continue
node = TreeNode(arr[1]) = TreeNode(2)

node.left = buildTreeRec(arr, 2*1+1 = 3)
node.right = buildTreeRec(arr, 2*1+2 = 4)

CALL 3: buildTreeRec(arr, index=3)
index = 3 < 5 → continue
node = TreeNode(arr[3]) = TreeNode(4)

node.left = buildTreeRec(arr, 2*3+1 = 7)
node.right = buildTreeRec(arr, 2*3+2 = 8)

CALL 4: buildTreeRec(arr, index=7)
index = 7 >= 5 → return null

CALL 5: buildTreeRec(arr, index=8)
index = 8 >= 5 → return null

BACK TO CALL 3:
node(4).left = null
node(4).right = null
return TreeNode(4)

CALL 6: buildTreeRec(arr, index=4)
index = 4 < 5 → continue
node = TreeNode(arr[4]) = TreeNode(5)

node.left = buildTreeRec(arr, 2*4+1 = 9) → index 9 >= 5 → null
node.right = buildTreeRec(arr, 2*4+2 = 10) → index 10 >= 5 → null

return TreeNode(5)

BACK TO CALL 2:
node(2).left = TreeNode(4)
node(2).right = TreeNode(5)
return TreeNode(2)

CALL 7: buildTreeRec(arr, index=2)
index = 2 < 5 → continue
node = TreeNode(arr[2]) = TreeNode(3)

node.left = buildTreeRec(arr, 2*2+1 = 5) → index 5 >= 5 → null
node.right = buildTreeRec(arr, 2*2+2 = 6) → index 6 >= 5 → null

return TreeNode(3)

BACK TO CALL 1:
node(1).left = TreeNode(2) with children 4, 5
node(1).right = TreeNode(3) with no children
return TreeNode(1)

🏆 APPROACH 2 RESULT:
     1
    / \
   2   3
  / \
 4   5

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

APPROACH 1 (ITERATIVE BFS):

LL: 1 → 2 → 3 → 4 → 5

Step-by-step construction:

Step 1: Create root, q = [1]
  1

Step 2: Process 1, add 2, 3, q = [2, 3]
  1
 / \
2   3

Step 3: Process 2, add 4, 5, q = [3, 4, 5]
  1
 / \
2   3
/ \
4   5

Done! (LL exhausted)

─────────────────────────────────────────

APPROACH 2 (RECURSIVE):

Step 1: Convert LL to Array
LL: 1 → 2 → 3 → 4 → 5
Array: [1, 2, 3, 4, 5]
Index:  0  1  2  3  4

Step 2: Build using CBT indices

Index 0 (1):
  left = 2*0+1 = 1
  right = 2*0+2 = 2

Index 1 (2):
  left = 2*1+1 = 3
  right = 2*1+2 = 4

Index 2 (3):
  left = 2*2+1 = 5 (out of bounds)
  right = 2*2+2 = 6 (out of bounds)

Index 3 (4):
  left = 2*3+1 = 7 (out of bounds)
  right = 2*3+2 = 8 (out of bounds)

Index 4 (5):
  left = 2*4+1 = 9 (out of bounds)
  right = 2*4+2 = 10 (out of bounds)

Resulting Tree:
  1
 / \
2   3
/ \
4   5

─────────────────────────────────────────

📊 COMPARISON OF APPROACHES:

APPROACH 1 (ITERATIVE BFS):
Process: LL → Tree directly
Data structures: Queue
Space: O(w) for queue (w = tree width)
Pros: No intermediate array, intuitive
Cons: Needs mid-iteration check

APPROACH 2 (RECURSIVE):
Process: LL → Array → Tree
Data structures: Array + Recursion stack
Space: O(n) for array + O(h) for recursion
Pros: Clean recursion, leverages CBT property
Cons: Extra array space, two-phase

─────────────────────────────────────────

📊 CBT ARRAY INDEX PROPERTY:

For a node at index i:
- Parent: (i-1)/2
- Left child: 2*i + 1
- Right child: 2*i + 2

Example Array: [1, 2, 3, 4, 5]

Index 0 (value 1): left = 1, right = 2
Index 1 (value 2): left = 3, right = 4
Index 2 (value 3): left = 5 (none), right = 6 (none)
Index 3 (value 4): left = 7 (none), right = 8 (none)
Index 4 (value 5): left = 9 (none), right = 10 (none)

This naturally creates CBT structure!

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:

1️⃣ APPROACH 1 (ITERATIVE BFS):
   - Queue maintains level-order parent sequence
   - Sequential LL processing fills tree left-to-right
   - FIFO ensures parents processed before children
   - Mid-check prevents null access for odd nodes
   - Direct construction without intermediate storage

2️⃣ APPROACH 2 (RECURSIVE):
   - Array indices naturally represent CBT structure
   - Recursive formula 2i+1, 2i+2 maintains CBT property
   - Base case (index >= length) stops recursion
   - No need to track parent-child relationships manually
   - Clean and elegant recursive solution

3️⃣ COMPLETE BINARY TREE PROPERTY:
   - Both approaches fill level by level
   - All levels except last are completely filled
   - Last level filled from left to right
   - No gaps in tree structure
   - Guaranteed by construction logic

💡 KEY INSIGHT:
Approach 1 directly constructs tree using queue-based BFS to maintain level-order,
while Approach 2 leverages CBT's array index property (left=2i+1, right=2i+2) with
recursion, both achieving O(n) time with different space tradeoffs!

🎯 TIME COMPLEXITY ANALYSIS:

APPROACH 1:
- Create root: O(1)
- While loop: Process n-1 nodes
- Each iteration: O(1) operations
- Total: O(n)

APPROACH 2:
- LL to array: O(n) traversal
- Recursive build: Visit each index once, O(n)
- Total: O(n) + O(n) = O(n)

Both: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:

APPROACH 1:
- Queue: O(w) where w is width
- Worst case: O(n/2) = O(n) for last level
- No extra array needed
- Space: O(n)

APPROACH 2:
- Array: O(n) to store all values
- Recursion stack: O(h) where h is height
- For balanced CBT: h = log(n)
- Total: O(n) + O(log n) = O(n)

Both: O(n) space complexity

🎯 COMPLEXITY SUMMARY:
✅ Approach 1: TC = O(n), SC = O(n) queue
✅ Approach 2: TC = O(n), SC = O(n) array + O(log n) stack
✅ Both: Linear time, linear space
✅ Approach 2 has extra array overhead

🎯 BUG FIX:
Line 79 had bug: `parent.right = rightChild`
Fixed to: `parentNode.right = rightChild`
Variable name mismatch caused ReferenceError

🎯 MID-ITERATION CHECK (APPROACH 1):
- Line 77: if (currHead) before creating right child
- Critical for odd number of nodes
- Prevents accessing null.data
- Example: LL has 1 node left after left child
- Without check: Would try currHead.data on null
- With check: Safely exits loop

🎯 EDGE CASES:

CASE 1: Empty LL
Approach 1: if (!head) return null → Line 56
Approach 2: arr = [] → buildTreeRec([], 0) → return null
Output: null

CASE 2: Single Node (1)
Approach 1: root = 1, currHead = null, loop doesn't run
Approach 2: arr = [1], buildTreeRec creates node 1, children null
Output: Single node tree

CASE 3: Two Nodes (1 → 2)
Approach 1: root = 1, creates left child 2, currHead = null, no right
Approach 2: arr = [1, 2], node 1 has left at index 1, right at index 2 (none)
Output: 1 with left child 2

CASE 4: Three Nodes (1 → 2 → 3)
Approach 1: root = 1, left = 2, right = 3
Approach 2: arr = [1, 2, 3], complete level 1
Output: Complete tree with root and 2 children

🎯 APPROACH 1 ADVANTAGES:
- No intermediate array
- Direct LL to tree conversion
- Intuitive BFS logic
- Space efficient (no array)

🎯 APPROACH 2 ADVANTAGES:
- Clean recursive solution
- Leverages CBT array property
- Elegant index formula
- Easy to understand

🎯 APPROACH 1 DISADVANTAGES:
- Needs mid-iteration check
- More complex logic
- Queue management

🎯 APPROACH 2 DISADVANTAGES:
- Extra array space
- Two-phase process
- Array conversion overhead

🎯 WHEN TO USE EACH:

APPROACH 1:
✅ When space is critical (no array)
✅ When streaming data
✅ When prefer iterative over recursive

APPROACH 2:
✅ When prefer clean recursion
✅ When CBT array property is familiar
✅ When two-phase is acceptable

🎯 REAL-WORLD APPLICATIONS:
- Deserializing trees from sequential data
- Building heap from sequential input
- Level-order tree construction
- Converting streams to trees
- Data structure transformations

🎯 RELATED PROBLEMS:
- Array to complete binary tree
- Build heap from array
- Serialize/deserialize tree
- Level-order traversal
- Tree construction problems

🎯 TESTING STRATEGY:
- Empty LL
- Single node
- Two nodes
- Three nodes (complete level)
- Odd nodes (5, 7, 9...)
- Even nodes (4, 6, 8...)
- Perfect binary tree (2^k - 1 nodes)

🎯 DEBUGGING TIPS:
- Approach 1: Print queue state, currHead value
- Approach 2: Print array, trace recursive calls
- Visualize tree after each step
- Check base cases
- Verify CBT property

🎯 COMMON MISTAKES:
- Approach 1: Variable name mismatch (parent vs parentNode)
- Approach 1: Forgetting mid-check
- Approach 2: Wrong index formula
- Both: Not handling empty LL

🎯 BEST PRACTICES:
- Consistent variable naming
- Clear comments
- Handle edge cases
- Test thoroughly
- Choose approach based on constraints

🎯 INTERVIEW TIPS:
- Explain both approaches
- Discuss tradeoffs
- Show CBT property
- Handle edge cases
- Analyze complexity
- Write bug-free code

🎯 CONCLUSION:
Constructing a complete binary tree from linked list can be done iteratively
using BFS queue (O(n) time, O(n) queue space) or recursively by first converting
to array then using CBT index property (O(n) time, O(n) array + O(log n) stack),
both maintaining CBT property with different implementation tradeoffs!
*/