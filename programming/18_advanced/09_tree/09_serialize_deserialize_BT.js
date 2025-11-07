/* Problem: ✅✅✅✅ Serialize and Deserialize Binary Tree ✅✅✅✅

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

You are given the root of a binary tree. The task is to implement two functions:
1. serialize(root): Convert the binary tree into a string representation
2. deserialize(data): Convert the string back to the original binary tree structure

Example 1:
Input: 
       10
      /  \
     20   30
      \
       40

Output (serialize): [10, 20, -1, 40, -1, -1, 30, -1, -1]
Output (deserialize): Original tree structure restored

Example 2:
Input:
       1
      / \
     2   3
        / \
       4   5

Output (serialize): [1, 2, -1, -1, 3, 4, -1, -1, 5, -1, -1]
Output (deserialize): Original tree structure restored

Example 3:
Input: null

Output (serialize): [-1]
Output (deserialize): null

Example 4:
Input:
       1
      /
     2

Output (serialize): [1, 2, -1, -1, -1]
Output (deserialize): Original tree structure restored

Constraints:
- The number of nodes in the tree is in the range [0, 10^4]
- -1000 <= Node.val <= 1000

Expected Complexities:
Time Complexity: O(n) for both serialize and deserialize
Auxiliary Space: O(n) for recursion stack and result array
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}
// 1. ✅✅✅✅ Serialize ✅✅✅✅
// 1.1:  Preorder Traversal Approach
// ✅ TC = O(n)
// ✅ SC = O(n)
function serialize(root){
    let res = []
    
    preorder(root)
    
    return res
    
    
    // Helper
    function preorder(root){
        if(!root){
            res.push(-1)
            return
        }
        
        res.push(root.key)
        preorder(root.left)
        preorder(root.right)
    }
    
}
// 1.2:  BFS Approach(Level Order Traversal)
// ✅ TC = O(n)
// ✅ SC = O(n)
function serializeIterative(root) {
    // code here
    let arr = []
    if(!root) return arr
    
    let q=[root]
    while(q.length > 0){
        let curr = q.shift()
        arr.push(curr ? curr.data : -1) // add to arr
            
        if(curr){ // If curr !== null
            q.push(curr.left) // left might be node or null (pushing into queue)
            q.push(curr.right) // right might be node or null (pushing into queue)
        }
                
    }
    
    return arr
}


// 2. ✅✅✅✅ Deserialize ✅✅✅✅
// 2.1:  Preorder Traversal Approach 
// ✅ TC = O(n) 
// ✅ SC = O(n)
function deserialize(arr){
    let idx = 0
    
    let root = preorder(arr)
    return root
    
    // Helper
    function preorder(arr){
        if(idx === arr.length){
            return null
        }
        
        let val = arr[idx]
        idx++
        
        if(val === -1){
            return null
        }
        
        let root = new TreeNode(val)
        root.left = preorder(arr)
        root.right = preorder(arr)
        
        return root
    }
}
// 2.2:  BFS Approach(Level Order Traversal) 
// ✅ TC = O(n)
// ✅ SC = O(n)
function deSerializeIterative(arr) {
    let n = arr.length
    let root = null
    if(n === 0) return root
    
    root = new Node(arr[0])
    
    let q = [root]
    let i = 1
    while(q.length > 0){ // while(i < n)
        let parentNode = q.shift()
        
        // Left Child
        if(i< n && arr[i] !== -1){
            let leftChild = new Node(arr[i])
            parentNode.left = leftChild
            q.push(leftChild)
        }
        i++ // Move to next element in arr
        
        // Right Child
        if(i < n && arr[i] !== -1){
            let rightChild = new Node(arr[i])
            parentNode.right = rightChild
            q.push(rightChild)
        }
        i++ // Move to next element in arr
    }
    
    return root
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.left.right = new TreeNode(40)

let arr = serialize(root)
console.log(arr) // [10, 20, -1, 40, -1, -1, 30, -1, -1]

console.log(deserialize(arr))
/* Output:
TreeNode {
  key: 10,
  left: TreeNode {
    key: 20,
    left: null,
    right: TreeNode { key: 40, left: null, right: null }
  },
  right: TreeNode { key: 30, left: null, right: null }
}
*/

/*🎯 CORE IDEA: Use preorder traversal for both serialization and deserialization. During serialization, traverse the tree in preorder (root, left, right) and store node values in an array, using -1 to represent null nodes. During deserialization, use the same preorder traversal to reconstruct the tree by reading values from the array in the same order.

📋 STEP-BY-STEP FLOW:

1️⃣ SERIALIZATION PROCESS:
   - Use preorder traversal (root → left → right)
   - Store node values in result array
   - Use -1 to represent null nodes
   - Maintain traversal order for reconstruction

2️⃣ DESERIALIZATION PROCESS:
   - Use same preorder traversal order
   - Read values from array sequentially
   - Create nodes when value is not -1
   - Return null when value is -1
   - Reconstruct tree structure exactly

3️⃣ PREORDER TRAVERSAL:
   - Visit root node first
   - Then traverse left subtree
   - Finally traverse right subtree
   - Consistent order for both operations

4️⃣ NULL HANDLING:
   - Serialize: Push -1 for null nodes
   - Deserialize: Return null when encountering -1
   - Preserves tree structure accurately

🧠 WHY THIS APPROACH?
- Preorder traversal maintains parent-child relationships
- Sequential array representation is simple and efficient
- -1 marker clearly distinguishes null nodes
- Same traversal order ensures perfect reconstruction
- O(n) time complexity for both operations

💡 KEY INSIGHTS:
- Preorder traversal preserves tree structure
- Array representation is compact and efficient
- Null markers (-1) maintain tree integrity
- Sequential reading matches traversal order
- Perfect reconstruction guaranteed
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Binary Tree Serialization and Deserialization

INPUT: Binary Tree
       10
      /  \
     20   30
      \
       40

OUTPUT (serialize): [10, 20, -1, 40, -1, -1, 30, -1, -1]
OUTPUT (deserialize): Original tree structure restored

🎯 GOAL: Convert tree to array and back to tree using preorder traversal!

🔍 SERIALIZATION - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: serialize(10)
res = []

📋 PREORDER TRAVERSAL:

STEP 1: Visit Root (10)
res.push(10) → res = [10]
Call preorder(20) for left subtree

STEP 2: Visit Left Child (20)
res.push(20) → res = [10, 20]
Call preorder(null) for left child of 20

STEP 3: Visit Left Child of 20 (null)
res.push(-1) → res = [10, 20, -1]
Call preorder(40) for right child of 20

STEP 4: Visit Right Child of 20 (40)
res.push(40) → res = [10, 20, -1, 40]
Call preorder(null) for left child of 40

STEP 5: Visit Left Child of 40 (null)
res.push(-1) → res = [10, 20, -1, 40, -1]
Call preorder(null) for right child of 40

STEP 6: Visit Right Child of 40 (null)
res.push(-1) → res = [10, 20, -1, 40, -1, -1]
Return to root (10), call preorder(30) for right subtree

STEP 7: Visit Right Child (30)
res.push(30) → res = [10, 20, -1, 40, -1, -1, 30]
Call preorder(null) for left child of 30

STEP 8: Visit Left Child of 30 (null)
res.push(-1) → res = [10, 20, -1, 40, -1, -1, 30, -1]
Call preorder(null) for right child of 30

STEP 9: Visit Right Child of 30 (null)
res.push(-1) → res = [10, 20, -1, 40, -1, -1, 30, -1, -1]

🏆 SERIALIZATION RESULT: [10, 20, -1, 40, -1, -1, 30, -1, -1]

─────────────────────────────────────────

🔍 DESERIALIZATION - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: deserialize([10, 20, -1, 40, -1, -1, 30, -1, -1])
idx = 0

📋 PREORDER RECONSTRUCTION:

STEP 1: Create Root (10)
val = arr[0] = 10, idx = 1
Create TreeNode(10)
Call preorder() for left subtree

STEP 2: Create Left Child (20)
val = arr[1] = 20, idx = 2
Create TreeNode(20)
root.left = TreeNode(20)
Call preorder() for left child of 20

STEP 3: Handle Left Child of 20 (null)
val = arr[2] = -1, idx = 3
Return null
root.left.left = null
Call preorder() for right child of 20

STEP 4: Create Right Child of 20 (40)
val = arr[3] = 40, idx = 4
Create TreeNode(40)
root.left.right = TreeNode(40)
Call preorder() for left child of 40

STEP 5: Handle Left Child of 40 (null)
val = arr[4] = -1, idx = 5
Return null
root.left.right.left = null
Call preorder() for right child of 40

STEP 6: Handle Right Child of 40 (null)
val = arr[5] = -1, idx = 6
Return null
root.left.right.right = null
Return to root (10), call preorder() for right subtree

STEP 7: Create Right Child (30)
val = arr[6] = 30, idx = 7
Create TreeNode(30)
root.right = TreeNode(30)
Call preorder() for left child of 30

STEP 8: Handle Left Child of 30 (null)
val = arr[7] = -1, idx = 8
Return null
root.right.left = null
Call preorder() for right child of 30

STEP 9: Handle Right Child of 30 (null)
val = arr[8] = -1, idx = 9
Return null
root.right.right = null

🏆 DESERIALIZATION RESULT: Original tree structure restored!

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

SERIALIZATION PROCESS:

PREORDER TRAVERSAL ORDER:
       10 (1st)
      /  
     20   (2nd)
      \   
       40 (4th)
           

ARRAY BUILDING:
Step 1: [10]           ← Visit 10
Step 2: [10, 20]       ← Visit 20
Step 3: [10, 20, -1]   ← Visit null (left of 20)
Step 4: [10, 20, -1, 40] ← Visit 40
Step 5: [10, 20, -1, 40, -1] ← Visit null (left of 40)
Step 6: [10, 20, -1, 40, -1, -1] ← Visit null (right of 40)
Step 7: [10, 20, -1, 40, -1, -1, 30] ← Visit 30
Step 8: [10, 20, -1, 40, -1, -1, 30, -1] ← Visit null (left of 30)
Step 9: [10, 20, -1, 40, -1, -1, 30, -1, -1] ← Visit null (right of 30)

DESERIALIZATION PROCESS:

ARRAY READING ORDER:
[10, 20, -1, 40, -1, -1, 30, -1, -1]
 ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑   ↑
 1st 2nd 3rd 4th 5th 6th 7th 8th 9th

TREE RECONSTRUCTION:
Step 1: Create 10 (root)
Step 2: Create 20 (left child of 10)
Step 3: Set null (left child of 20)
Step 4: Create 40 (right child of 20)
Step 5: Set null (left child of 40)
Step 6: Set null (right child of 40)
Step 7: Create 30 (right child of 10)
Step 8: Set null (left child of 30)
Step 9: Set null (right child of 30)

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:

INPUT: Binary Tree
       1
      / \
     2   3
        / \
       4   5

SERIALIZATION PROCESS:
Step 1: [1]           ← Visit 1
Step 2: [1, 2]        ← Visit 2
Step 3: [1, 2, -1]    ← Visit null (left of 2)
Step 4: [1, 2, -1, -1] ← Visit null (right of 2)
Step 5: [1, 2, -1, -1, 3] ← Visit 3
Step 6: [1, 2, -1, -1, 3, 4] ← Visit 4
Step 7: [1, 2, -1, -1, 3, 4, -1] ← Visit null (left of 4)
Step 8: [1, 2, -1, -1, 3, 4, -1, -1] ← Visit null (right of 4)
Step 9: [1, 2, -1, -1, 3, 4, -1, -1, 5] ← Visit 5
Step 10: [1, 2, -1, -1, 3, 4, -1, -1, 5, -1] ← Visit null (left of 5)
Step 11: [1, 2, -1, -1, 3, 4, -1, -1, 5, -1, -1] ← Visit null (right of 5)

RESULT: [1, 2, -1, -1, 3, 4, -1, -1, 5, -1, -1]

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree (null)
Input: null
Serialization: [-1]
Deserialization: null

CASE 2: Single Node
Input: TreeNode(1)
Serialization: [1, -1, -1]
Deserialization: TreeNode(1)

CASE 3: Left Skewed Tree
Input: 1 → 2 → 3
Serialization: [1, 2, 3, -1, -1, -1, -1]
Deserialization: Original structure

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ PREORDER TRAVERSAL: Maintains parent-child relationships perfectly
2️⃣ SEQUENTIAL STORAGE: Array order matches traversal order exactly
3️⃣ NULL MARKERS: -1 clearly identifies null nodes in structure
4️⃣ CONSISTENT ORDER: Same traversal for both serialize and deserialize
5️⃣ PERFECT RECONSTRUCTION: Guaranteed to restore original tree

💡 KEY INSIGHT:
Use preorder traversal for both operations because it visits root before
children, allowing perfect reconstruction of the tree structure from
the sequential array representation!

🎯 TIME COMPLEXITY ANALYSIS:
- Serialization: O(n) - visit each node once
- Deserialization: O(n) - process each array element once
- Preorder traversal: O(n) for both operations
- Total: O(n) for complete serialize-deserialize cycle

🎯 SPACE COMPLEXITY ANALYSIS:
- Result array: O(n) space for storing node values
- Recursion stack: O(h) where h is tree height
- Total: O(n) space complexity
- Optimal for tree representation

🎯 EDGE CASES HANDLED:
- Empty tree: Returns [-1] and reconstructs to null
- Single node: Properly handles leaf nodes
- Skewed trees: Works for any tree structure
- Large trees: Efficient O(n) processing

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to preserve tree structure
- Preorder traversal maintains relationships
- Null markers preserve tree integrity
- Perfect reconstruction from serialized data
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Preorder traversal: root → left → right
- Array storage: sequential node values
- Null representation: -1 marker
- Index tracking: sequential reading for deserialization
- Recursive structure: matches tree structure

🎯 SERIALIZATION PRINCIPLES:
- Choose traversal order that preserves structure
- Use consistent markers for null nodes
- Store data in sequential format
- Ensure efficient reconstruction possible
- Handle edge cases properly

🎯 DESERIALIZATION PRINCIPLES:
- Use same traversal order as serialization
- Read data sequentially from array
- Create nodes when encountering valid values
- Return null when encountering null markers
- Maintain proper parent-child relationships

🎯 PREORDER TRAVERSAL BENEFITS:
- Visits root before children
- Maintains parent-child relationships
- Easy to implement recursively
- Natural order for reconstruction
- Efficient for tree operations

🎯 ARRAY REPRESENTATION ADVANTAGES:
- Compact storage format
- Easy to transmit over network
- Simple to parse and reconstruct
- Efficient memory usage
- Platform independent

🎯 NULL HANDLING STRATEGY:
- Use special marker (-1) for null nodes
- Consistent representation across operations
- Preserves tree structure integrity
- Easy to identify during reconstruction
- Handles all null scenarios

🎯 COMPARISON WITH OTHER TRAVERSALS:
- Inorder: Would not preserve structure (ambiguous)
- Postorder: Would require stack for reconstruction
- Level-order: Would require queue and more complex logic
- Preorder: Simplest and most efficient for this problem

🎯 REAL-WORLD APPLICATIONS:
- Tree persistence in databases
- Network transmission of tree structures
- File system representation
- Memory management systems
- Data structure serialization

🎯 ALGORITHM PATTERN:
- Serialization: Traversal with data collection
- Deserialization: Traversal with data consumption
- Consistent order for both operations
- Recursive structure matching

🎯 MATHEMATICAL PROPERTIES:
- Tree nodes: n total nodes
- Array elements: 2n+1 (including null markers)
- Traversal visits: n nodes + 2n+1 null positions
- Space efficiency: O(n) representation

🎯 ERROR HANDLING:
- Null root: Properly handled with [-1]
- Invalid data: Algorithm assumes valid input
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF PREORDER APPROACH:
- Simple implementation
- Efficient reconstruction
- Preserves tree structure
- Easy to understand and debug
- Optimal time and space complexity

🎯 DISADVANTAGES:
- Requires null markers (extra space)
- Not human-readable format
- Specific to binary trees
- Requires consistent traversal order

🎯 ALTERNATIVE APPROACHES:
- Level-order serialization: More complex reconstruction
- Inorder serialization: Ambiguous reconstruction
- Postorder serialization: Requires stack for reconstruction
- All: Correct but less efficient than preorder

🎯 IMPLEMENTATION CONSIDERATIONS:
- Choose appropriate null marker value
- Ensure consistent traversal order
- Handle edge cases properly
- Optimize for space and time
- Test with various tree structures

🎯 TESTING STRATEGY:
- Empty trees
- Single node trees
- Balanced trees
- Skewed trees
- Large trees
- Various node values

🎯 DEBUGGING TIPS:
- Verify traversal order consistency
- Check null marker handling
- Monitor array index progression
- Validate tree structure reconstruction
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree operations
- Space: O(n) - optimal for representation
- Overall: Efficient serialize-deserialize cycle
- Scalable: Works well for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Deep trees: Recursion stack management
- Memory usage: Efficient array representation
- Network transmission: Compact format

🎯 BEST PRACTICES:
- Use consistent traversal order
- Choose appropriate null markers
- Handle edge cases properly
- Optimize for space efficiency
- Test with various tree structures

🎯 COMMON MISTAKES:
- Inconsistent traversal order
- Incorrect null marker handling
- Poor edge case handling
- Inefficient array operations
- Missing boundary checks

🎯 LEARNING OBJECTIVES:
- Understand tree serialization concepts
- Learn preorder traversal applications
- Master recursive tree operations
- Practice data structure persistence
- Improve algorithmic thinking

🎯 INTERVIEW TIPS:
- Explain preorder traversal choice
- Discuss null marker strategy
- Handle edge cases systematically
- Write clean recursive code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Traversal order consistency
- Null marker representation
- Recursive structure matching
- Sequential data processing
- Tree reconstruction techniques

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n during serialization
- Array elements: 2n+1 total elements
- Reconstruction: n node creations
- Null handling: 2n+1 null checks
- Total: O(n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Consistent traversal order
- Proper null marker handling
- Efficient array operations
- Edge case comprehensive coverage
- Recursive structure management

🎯 SOLUTION VALIDATION:
- Test serialization accuracy
- Verify deserialization correctness
- Check edge case handling
- Monitor performance metrics
- Validate structure preservation

🎯 ALGORITHM EVOLUTION:
- Basic serialization: Simple traversal
- Optimized serialization: Efficient representation
- Alternative approaches: Various traversal methods
- Future improvements: Compression techniques

🎯 PRACTICAL APPLICATIONS:
- Database tree storage
- Network tree transmission
- File system representation
- Memory management
- Data persistence systems

🎯 CONCLUSION:
The serialize and deserialize binary tree problem demonstrates how to
convert tree structures to and from sequential representations using
preorder traversal, achieving O(n) time complexity while preserving
the complete tree structure with proper null handling!
*/