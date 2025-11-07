/* Problem: ✅✅✅✅ Convert Binary Tree to Circular Doubly Linked List ✅✅✅✅

Given a binary tree, convert it to a circular doubly linked list in-place. The left and right pointers in nodes are to be used as previous and next pointers respectively in the converted doubly linked list. The order of nodes in the doubly linked list must be the same as the inorder traversal of the binary tree.

Conversion requirements:
- Convert binary tree to circular doubly linked list
- Use left pointer as previous pointer
- Use right pointer as next pointer
- Order should match inorder traversal (Left → Root → Right)
- List should be circular (last node points to first, first points to last)
- Conversion should be in-place

You are given the root of a binary tree. Return the head of the converted circular doubly linked list.

Example 1:
Input:
      10
     /  \
    12   15
   / \
  25  30

Output: Circular DLL: 25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15 (circular)
Explanation: 
Inorder traversal: 25, 12, 30, 10, 15
Circular DLL maintains this order with bidirectional links

Example 2:
Input:
    1
   / \
  2   3

Output: Circular DLL: 2 ⇄ 1 ⇄ 3 (circular)
Explanation:
Inorder: 2, 1, 3
First node (2) ← connects → Last node (3)

Example 3:
Input:
    5
   /
  3
 /
1

Output: Circular DLL: 1 ⇄ 3 ⇄ 5 (circular)
Explanation:
Inorder: 1, 3, 5
Left skewed tree becomes circular DLL

Example 4:
Input:
    1

Output: Circular DLL: 1 (points to itself)
Explanation:
Single node: 1.left = 1, 1.right = 1

Constraints:
- 1 ≤ number of nodes ≤ 10^5
- 0 ≤ node.data ≤ 10^5

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(h) - recursion stack depth
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n)
// ✅ SC = O(h)
function bTreeToClist(root) {
    if (!root) return null;
  
    let head = null;
    let prev = null;
  
    function inorder(node) {
      if (!node) return;
  
      inorder(node.left);
  
      // Connect the DLL links
      if (!head) {
        head = node; // first node in inorder → head
      } else {
        prev.right = node; // right = next
        node.left = prev;  // left = prev
      }
  
      prev = node; // move prev forward
  
      inorder(node.right);
    }
  
    inorder(root);
  
    // Make it circular
    head.left = prev;
    prev.right = head;
  
    return head;
}

// Helper function to print circular DLL
function printCircularDLL(head) {
    if (!head) return "Empty list";
    
    let result = [];
    let current = head;
    do {
        result.push(current.data);
        current = current.right;
    } while (current !== head);
    
    return result.join(" ⇄ ") + " (circular)";
}

// Helper function to verify circular property
function verifyCircular(head) {
    if (!head) return true;
    
    // Check if last node points back to head
    let current = head;
    while (current.right !== head) {
        current = current.right;
    }
    
    return current.right === head && head.left === current;
}

// Test cases
let root1 = new TreeNode(10);
root1.left = new TreeNode(12);
root1.right = new TreeNode(15);
root1.left.left = new TreeNode(25);
root1.left.right = new TreeNode(30);
let dll1 = bTreeToClist(root1);
console.log("Test 1:", printCircularDLL(dll1)); // 25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15 (circular)
console.log("Is Circular:", verifyCircular(dll1)); // true

let root2 = new TreeNode(1);
root2.left = new TreeNode(2);
root2.right = new TreeNode(3);
let dll2 = bTreeToClist(root2);
console.log("Test 2:", printCircularDLL(dll2)); // 2 ⇄ 1 ⇄ 3 (circular)
console.log("Is Circular:", verifyCircular(dll2)); // true

let root3 = new TreeNode(5);
root3.left = new TreeNode(3);
root3.left.left = new TreeNode(1);
let dll3 = bTreeToClist(root3);
console.log("Test 3:", printCircularDLL(dll3)); // 1 ⇄ 3 ⇄ 5 (circular)
console.log("Is Circular:", verifyCircular(dll3)); // true

let root4 = new TreeNode(1);
let dll4 = bTreeToClist(root4);
console.log("Test 4:", printCircularDLL(dll4)); // 1 (circular)
console.log("Is Circular:", verifyCircular(dll4)); // true

/*🎯 CORE IDEA: Perform inorder traversal to visit nodes in sorted order (left → root → right). 
During traversal, convert tree nodes to DLL nodes by linking current node with previous node 
(prev.right = current, current.left = prev). Track head (first node) and prev (last node). 
After traversal, connect head and prev to make it circular.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - head = null (will be first node in inorder)
   - prev = null (tracks previous node in DLL)
   - Handle empty tree case

2️⃣ INORDER TRAVERSAL:
   - Recursively traverse left subtree
   - Process current node (link with prev)
   - Recursively traverse right subtree
   - This ensures sorted order (left → root → right)

3️⃣ LINKING NODES:
   - If head is null: current node is first → set head
   - Otherwise: link prev and current
     - prev.right = current (forward link)
     - current.left = prev (backward link)
   - Update prev = current

4️⃣ MAKE CIRCULAR:
   - After inorder completes, prev points to last node
   - Connect last to first: prev.right = head
   - Connect first to last: head.left = prev
   - Return head

🧠 WHY THIS APPROACH?

1️⃣ INORDER TRAVERSAL:
   - Visits nodes in sorted order (left → root → right)
   - Natural ordering for DLL
   - Single pass conversion

2️⃣ IN-PLACE CONVERSION:
   - Reuse tree node pointers (left/right)
   - No extra nodes created
   - Space efficient

3️⃣ PREV POINTER TRACKING:
   - Links consecutive nodes in inorder
   - Maintains DLL structure
   - Enables bidirectional links

💡 KEY INSIGHTS:

1️⃣ POINTER REUSE:
   - node.left becomes previous pointer
   - node.right becomes next pointer
   - Tree structure transformed to DLL structure

2️⃣ HEAD IDENTIFICATION:
   - First node visited in inorder is head
   - One-time assignment when head is null
   - Returned at end

3️⃣ CIRCULAR CONNECTION:
   - Done after complete inorder traversal
   - Links head and last node (prev)
   - Creates circular doubly linked list

4️⃣ PREV TRACKING:
   - Updated after processing each node
   - Points to last processed node
   - Used to link with next node
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Convert Binary Tree to Circular DLL

INPUT:
      10
     /  \
    12   15
   / \
  25  30

OUTPUT: 25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15 (circular)

🎯 GOAL: Convert tree to circular doubly linked list in inorder!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
head = null
prev = null
Call inorder(root=10)

─────────────────────────────────────────

INORDER TRAVERSAL SEQUENCE:

CALL 1: inorder(10)
Not null, continue
Recurse left: inorder(12)

CALL 2: inorder(12)
Not null, continue
Recurse left: inorder(25)

CALL 3: inorder(25)
Not null, continue
Recurse left: inorder(null) → return

PROCESS NODE 25:
if (!head) → TRUE
  head = node(25) ✓
prev = node(25)

Recurse right: inorder(null) → return

BACK TO CALL 2 (node 12):
PROCESS NODE 12:
if (!head) → FALSE
  prev.right = node(12) → 25.right = 12
  node.left = prev → 12.left = 25
prev = node(12)

Recurse right: inorder(30)

CALL 4: inorder(30)
Not null, continue
Recurse left: inorder(null) → return

PROCESS NODE 30:
if (!head) → FALSE
  prev.right = node(30) → 12.right = 30
  node.left = prev → 30.left = 12
prev = node(30)

Recurse right: inorder(null) → return

BACK TO CALL 1 (node 10):
PROCESS NODE 10:
if (!head) → FALSE
  prev.right = node(10) → 30.right = 10
  node.left = prev → 10.left = 30
prev = node(10)

Recurse right: inorder(15)

CALL 5: inorder(15)
Not null, continue
Recurse left: inorder(null) → return

PROCESS NODE 15:
if (!head) → FALSE
  prev.right = node(15) → 10.right = 15
  node.left = prev → 15.left = 10
prev = node(15)

Recurse right: inorder(null) → return

─────────────────────────────────────────

AFTER INORDER TRAVERSAL:
head = node(25)
prev = node(15)

DLL (not yet circular):
25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15
↑                    ↑
head                prev

MAKE IT CIRCULAR:
head.left = prev → 25.left = 15
prev.right = head → 15.right = 25

FINAL CIRCULAR DLL:
25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15
↑___________________↑
    circular link

Return head = node(25)

🏆 FINAL RESULT: 25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15 (circular)

─────────────────────────────────────────

📊 EXAMPLE 2: Simple Tree

INPUT:
    1
   / \
  2   3

OUTPUT: 2 ⇄ 1 ⇄ 3 (circular)

INORDER SEQUENCE:

inorder(1):
  inorder(2):
    inorder(null) → return
    
    PROCESS 2:
    head = 2
    prev = 2
    
    inorder(null) → return
  
  PROCESS 1:
  prev.right = 1 → 2.right = 1
  1.left = 2
  prev = 1
  
  inorder(3):
    inorder(null) → return
    
    PROCESS 3:
    prev.right = 3 → 1.right = 3
    3.left = 1
    prev = 3
    
    inorder(null) → return

AFTER TRAVERSAL:
head = 2, prev = 3
DLL: 2 ⇄ 1 ⇄ 3

MAKE CIRCULAR:
head.left = prev → 2.left = 3
prev.right = head → 3.right = 2

RESULT: 2 ⇄ 1 ⇄ 3 (circular)

─────────────────────────────────────────

📊 EXAMPLE 3: Left Skewed Tree

INPUT:
    5
   /
  3
 /
1

OUTPUT: 1 ⇄ 3 ⇄ 5 (circular)

INORDER SEQUENCE:

inorder(5):
  inorder(3):
    inorder(1):
      inorder(null) → return
      
      PROCESS 1:
      head = 1
      prev = 1
      
      inorder(null) → return
    
    PROCESS 3:
    1.right = 3, 3.left = 1
    prev = 3
    
    inorder(null) → return
  
  PROCESS 5:
  3.right = 5, 5.left = 3
  prev = 5
  
  inorder(null) → return

MAKE CIRCULAR:
1.left = 5, 5.right = 1

RESULT: 1 ⇄ 3 ⇄ 5 (circular)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: TRANSFORMATION

ORIGINAL TREE:
      10
     /  \
    12   15
   / \
  25  30

INORDER TRAVERSAL ORDER:
25 → 12 → 30 → 10 → 15

STEP-BY-STEP LINKING:

Step 1: Process 25
head = 25, prev = 25
[25]

Step 2: Process 12
25 ⇄ 12
prev = 12

Step 3: Process 30
25 ⇄ 12 ⇄ 30
prev = 30

Step 4: Process 10
25 ⇄ 12 ⇄ 30 ⇄ 10
prev = 10

Step 5: Process 15
25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15
prev = 15

Step 6: Make Circular
25 ⇄ 12 ⇄ 30 ⇄ 10 ⇄ 15
↑_______________________↑

─────────────────────────────────────────

📊 POINTER TRANSFORMATION:

TREE NODE:
node.left → left child
node.right → right child

DLL NODE:
node.left → previous node
node.right → next node

Example at node 12 (in tree):
12.left = 25 (child)
12.right = 30 (child)

After conversion (in DLL):
12.left = 25 (previous)
12.right = 30 (next)

─────────────────────────────────────────

📊 HEAD AND PREV TRACKING:

INITIAL:
head = null
prev = null

AFTER 1ST NODE (25):
head = 25 (set once)
prev = 25

AFTER 2ND NODE (12):
head = 25 (unchanged)
prev = 12

AFTER 3RD NODE (30):
head = 25 (unchanged)
prev = 30

AFTER LAST NODE (15):
head = 25 (unchanged)
prev = 15 (last node)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ INORDER TRAVERSAL:
   - Visits nodes in sorted order
   - Natural ordering for DLL
   - Left → Root → Right sequence
   - Single pass through tree

2️⃣ PREV POINTER:
   - Links consecutive inorder nodes
   - Maintains DLL structure
   - Updated after each node processed
   - Points to last node at end

3️⃣ HEAD TRACKING:
   - Identifies first inorder node
   - Set only once (when head is null)
   - Used for circular connection
   - Returned as DLL head

4️⃣ CIRCULAR CONNECTION:
   - Done after complete traversal
   - Links first and last nodes
   - Bidirectional connection
   - Completes circular structure

💡 KEY INSIGHT:
Inorder traversal naturally visits nodes in sorted order, allowing in-place
conversion to DLL by linking each node with the previous node using tree pointers
(left=prev, right=next), then connecting first and last nodes to form circular DLL!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Each node: O(1) processing
- Circular connection: O(1)
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h)
- No extra data structures
- In-place conversion
- Worst case (skewed): O(n)
- Best case (balanced): O(log n)
- Space: O(h)

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Line 53: if (!root) return null
Output: null

CASE 2: Single Node
Input: TreeNode(1)
PROCESS 1:
  head = 1, prev = 1
MAKE CIRCULAR:
  1.left = 1, 1.right = 1
Output: 1 (points to itself)

CASE 3: Two Nodes (Left Child)
Input:
  2
 /
1

Inorder: 1, 2
head = 1, prev = 2
Circular: 1 ⇄ 2

CASE 4: Two Nodes (Right Child)
Input:
  1
   \
    2

Inorder: 1, 2
head = 1, prev = 2
Circular: 1 ⇄ 2

CASE 5: Complete Binary Tree
Input:
    1
   / \
  2   3

Inorder: 2, 1, 3
Circular: 2 ⇄ 1 ⇄ 3

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Maintains inorder sequence: ✓
- Creates bidirectional links: ✓
- Makes list circular: ✓
- In-place conversion: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 53: Handle empty tree
- Line 55-56: Initialize head and prev
- Line 58-74: Inorder helper function
- Line 60: Base case for null
- Line 62: Recurse left subtree
- Line 65-71: Process current node and link
- Line 73: Update prev
- Line 75: Recurse right subtree
- Line 79-80: Make circular
- Line 82: Return head

🎯 LINKING LOGIC:

AT EACH NODE:
if (!head) {
  head = node; // First node
} else {
  prev.right = node; // Forward link
  node.left = prev;  // Backward link
}
prev = node; // Update for next iteration

CIRCULAR CONNECTION:
head.left = prev;  // First ← Last
prev.right = head; // Last → First

🎯 WHY INORDER:
- Gives sorted order (for BST)
- Natural left-to-right sequence
- Visits all nodes systematically
- Matches DLL traversal order
- Standard tree-to-list conversion

🎯 ADVANTAGES:
- Optimal O(n) time
- In-place conversion
- No extra nodes created
- Simple recursive solution
- Maintains sorted order (for BST)

🎯 DISADVANTAGES:
- Recursion stack O(h)
- Modifies original tree
- Cannot preserve tree structure
- Stack overflow for deep trees

🎯 REAL-WORLD APPLICATIONS:
- Tree to sorted list conversion
- Memory optimization (reuse pointers)
- Data structure transformation
- Iterative tree traversal preparation
- Circular buffer from tree

🎯 RELATED PROBLEMS:
- Flatten binary tree to linked list
- BST to sorted DLL
- Tree to array conversion
- Inorder traversal variations
- DLL insertion and deletion

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Two nodes (left/right)
- Left skewed tree
- Right skewed tree
- Complete binary tree
- Large tree

🎯 DEBUGGING TIPS:
- Print inorder sequence
- Verify head assignment
- Check prev updates
- Verify circular links
- Test forward/backward traversal
- Check edge cases

🎯 COMMON MISTAKES:
- Not initializing head correctly
- Forgetting to update prev
- Wrong circular connection
- Not handling null cases
- Incorrect pointer assignments
- Missing base case

🎯 BEST PRACTICES:
- Handle empty tree first
- Use clear variable names (head, prev)
- Separate traversal and circular connection
- Test circular property
- Verify bidirectional links
- Check edge cases

🎯 INTERVIEW TIPS:
- Explain inorder traversal order
- Show pointer reuse (left=prev, right=next)
- Discuss prev tracking mechanism
- Draw linking process
- Verify circular connection
- Analyze complexity
- Handle edge cases

🎯 VERIFICATION:

FORWARD TRAVERSAL:
Start at head, follow right pointers
Should return to head

BACKWARD TRAVERSAL:
Start at head, follow left pointers
Should return to head

CIRCULAR CHECK:
head.left should be last node
last.right should be head

🎯 ALGORITHM PATTERN:
- Tree traversal (inorder)
- In-place transformation
- Pointer manipulation
- Two-pointer technique (head, prev)
- Circular linking

🎯 COMPARISON WITH FLATTEN TO LINKED LIST:

FLATTEN (PREORDER):
- Uses right pointers only
- Not doubly linked
- Preorder sequence
- Not circular

THIS (INORDER CIRCULAR DLL):
- Uses both left and right pointers
- Doubly linked
- Inorder sequence
- Circular

🎯 ALTERNATIVE APPROACHES:

APPROACH 1: Using Array
- Inorder traversal → store in array
- Convert array to circular DLL
- Time: O(n), Space: O(n)

APPROACH 2: Morris Traversal
- Threaded binary tree
- No recursion stack
- Time: O(n), Space: O(1)
- More complex implementation

CURRENT APPROACH (RECURSIVE INORDER):
- Simple and intuitive
- Time: O(n), Space: O(h)
- Standard solution

🎯 CONCLUSION:
Converting binary tree to circular doubly linked list is efficiently achieved using
inorder traversal that visits nodes in sorted order, linking each node with previous
node by reusing tree pointers (left=prev, right=next), tracking head (first node) and
prev (last node), then connecting them to form circular structure, achieving O(n)
time and O(h) space complexity with in-place transformation!
*/
