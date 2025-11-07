/* Problem: ✅✅✅✅ Construct Binary Tree from Inorder and Postorder Traversal ✅✅✅✅

Given two arrays representing inorder and postorder traversal of a binary tree, construct and return the binary tree.

Traversal definitions:
- Inorder: Left → Root → Right
- Postorder: Left → Right → Root
- All node values are unique
- Both arrays have the same length

You are given two integer arrays inorder and postorder where:
- inorder is the inorder traversal of the tree
- postorder is the postorder traversal of the tree
Construct and return the binary tree.

Example 1:
Input: 
inorder = [9, 3, 15, 20, 7]
postorder = [9, 15, 7, 20, 3]

Output:
    3
   / \
  9  20
    /  \
   15   7

Explanation: 
- Last element in postorder (3) is root
- In inorder, 9 is left of 3, [15,20,7] is right of 3
- Recursively build subtrees

Example 2:
Input:
inorder = [1, 2, 3]
postorder = [1, 3, 2]

Output:
    2
   / \
  1   3

Explanation:
- Last element (2) is root
- 1 is left subtree, 3 is right subtree

Example 3:
Input:
inorder = [1]
postorder = [1]

Output:
    1

Explanation: Single node tree

Constraints:
- 1 ≤ inorder.length ≤ 3000
- postorder.length == inorder.length
- -3000 ≤ inorder[i], postorder[i] ≤ 3000
- All values are unique
- postorder and inorder consist of unique values
- Each value of postorder also appears in inorder

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(n) - hashmap for inorder indices + recursion stack O(h)
*/

class TreeNode {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n)
// ✅ SC = O(n)
function buildTree(inorder, postorder) {
    let n = postorder.length // or inorder.length
    
    // 1. Initialize the postorder index (last index of postorder)
    let postIdx = n-1 // to track the current root in the postorder array (i.e. the last element of postorder is the root)
    
    // 2. Initialize the inorder lookup map (to get index of any element of inorder arr in TC = O(1))
    let ioLookup = new Map() // to get index of any element of inorder arr in TC = O(1)
    for(let i=0; i<n; i++){
        ioLookup.set(inorder[i], i)
    }
    
    // 3. Construct the tree
    let root = helper(inorder, postorder, 0, n-1)
    return root
    
    
    // Helper Function
    function helper(inorder, postorder, ioStart=0, ioEnd=n-1){
        // 1. If the inorder start index is greater than the inorder end index, then return null
        if(ioStart > ioEnd) return null
        
        // 2. Create a new node with the last element of postorder (i.e., the root)
        let node = new TreeNode(postorder[postIdx]) // the last element of postorder is the root
        // 3. Decrement the postorder index
        postIdx--
        
        // 4. If there is only one element in the inorder array, then return the root (i.e., leaf node)
        if(ioStart === ioEnd) return node 
        
        // 5. Get index of curr root in inorder arr
        let i = ioLookup.get(node.data)
        
        // 6. Construct the right subtree 1st (coz postorder is left-right-root, i.e., in postorder From R->L root comes 1st & then right & then left)
        node.right = helper(inorder, postorder, i+1, ioEnd)
        // 7. Construct the left subtree 2nd (coz postorder is left-right-root, i.e., in postorder From R->L root comes 1st & then right & then left)
        node.left = helper(inorder, postorder, ioStart, i-1)
        
        // 8. Return the root
        return node
    }
}

// Helper function to print tree (inorder)
function printInorder(root) {
    if (!root) return [];
    return [...printInorder(root.left), root.data, ...printInorder(root.right)];
}

// Helper function to print tree (postorder)
function printPostorder(root) {
    if (!root) return [];
    return [...printPostorder(root.left), ...printPostorder(root.right), root.data];
}

// Test cases
let root1 = buildTree([9, 3, 15, 20, 7], [9, 15, 7, 20, 3]);
console.log("Test 1 Inorder:", printInorder(root1)); // [9, 3, 15, 20, 7]
console.log("Test 1 Postorder:", printPostorder(root1)); // [9, 15, 7, 20, 3]

let root2 = buildTree([1, 2, 3], [1, 3, 2]);
console.log("Test 2 Inorder:", printInorder(root2)); // [1, 2, 3]
console.log("Test 2 Postorder:", printPostorder(root2)); // [1, 3, 2]

let root3 = buildTree([1], [1]);
console.log("Test 3 Inorder:", printInorder(root3)); // [1]
console.log("Test 3 Postorder:", printPostorder(root3)); // [1]

/*🎯 CORE IDEA: Use postorder traversal (reading right-to-left) to identify roots and inorder traversal to identify left/right subtrees. 
In postorder, the LAST element is always the root. In inorder, elements left of root belong to left subtree, elements right of root belong to right subtree.
KEY DIFFERENCE from preorder: Process RIGHT subtree FIRST (because postorder is left-right-root, so reading backwards gives root-right-left).

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create postIdx = n-1 (tracks current root in postorder, starts from end)
   - Create ioLookup map (value → index in inorder for O(1) lookup)
   - Populate map with all inorder elements and indices
   - Call helper with full inorder range [0, n-1]

2️⃣ HELPER FUNCTION - RECURSIVE CONSTRUCTION:
   - Base case: if ioStart > ioEnd, return null
   - Pick current root: postorder[postIdx]
   - Create new node with this value
   - Decrement postIdx (move to next root in postorder)
   - If single element (ioStart === ioEnd), return leaf node

3️⃣ FINDING ROOT POSITION IN INORDER:
   - Use ioLookup to get root's index in inorder: i
   - Elements [ioStart, i-1] belong to left subtree
   - Elements [i+1, ioEnd] belong to right subtree
   - Root is at position i

4️⃣ BUILDING RIGHT SUBTREE FIRST:
   - ⭐ KEY POINT: Build RIGHT before LEFT
   - Why? Postorder is L-R-Root, reading backwards is Root-R-L
   - Recursively build right: helper(i+1, ioEnd)
   - This processes all right subtree nodes

5️⃣ BUILDING LEFT SUBTREE SECOND:
   - After right subtree is built
   - Recursively build left: helper(ioStart, i-1)
   - This processes all left subtree nodes
   - Return completed node

🧠 WHY THIS APPROACH?

1️⃣ POSTORDER PROPERTY:
   - Last element is always root
   - Reading backwards: Root → Right → Left
   - Process right subtree before left

2️⃣ INORDER PROPERTY:
   - Root splits array into left and right subtrees
   - Left subtree: all elements before root
   - Right subtree: all elements after root

3️⃣ HASHMAP OPTIMIZATION:
   - Finding root position in O(1) instead of O(n)
   - Overall time complexity: O(n)

💡 KEY INSIGHTS:

1️⃣ POSTORDER vs PREORDER DIFFERENCE:
   - Preorder: Root-Left-Right → Process left first
   - Postorder: Left-Right-Root → Reading backwards Root-Right-Left → Process right first

2️⃣ POSTIDX MANAGEMENT:
   - Starts at n-1 (last element = root)
   - Decrements after each node creation
   - Shared across all recursive calls

3️⃣ RIGHT BEFORE LEFT:
   - Critical for postorder construction
   - Ensures correct node processing order
   - Matches backwards traversal of postorder array

4️⃣ INORDER SPLITTING:
   - Root position divides subtrees
   - [ioStart, i-1]: left subtree
   - [i+1, ioEnd]: right subtree
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Construct Tree from Inorder and Postorder

INPUT:
inorder = [9, 3, 15, 20, 7]
postorder = [9, 15, 7, 20, 3]

OUTPUT:
    3
   / \
  9  20
    /  \
   15   7

🎯 GOAL: Build binary tree from traversals!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
n = 5
postIdx = 4 (last index)
ioLookup = {9→0, 3→1, 15→2, 20→3, 7→4}

Call helper(inorder, postorder, 0, 4)

─────────────────────────────────────────

CALL 1: helper(0, 4) - Build entire tree

Step 1: Base check
ioStart(0) > ioEnd(4)? NO

Step 2: Pick root from postorder
node = new TreeNode(postorder[4]) = TreeNode(3)
postIdx-- → postIdx = 3

Step 3: Single element check
ioStart(0) === ioEnd(4)? NO

Step 4: Find root position in inorder
i = ioLookup.get(3) = 1

Step 5: Build RIGHT subtree first
node.right = helper(1+1, 4) = helper(2, 4)

─────────────────────────────────────────

CALL 2: helper(2, 4) - Build right subtree of 3

Step 1: Base check → NO

Step 2: Pick root
node = new TreeNode(postorder[3]) = TreeNode(20)
postIdx-- → postIdx = 2

Step 3: Single element?
ioStart(2) === ioEnd(4)? NO

Step 4: Find position
i = ioLookup.get(20) = 3

Step 5: Build RIGHT first
node.right = helper(3+1, 4) = helper(4, 4)

─────────────────────────────────────────

CALL 3: helper(4, 4) - Build right child of 20

Step 1: Base check → NO

Step 2: Pick root
node = new TreeNode(postorder[2]) = TreeNode(7)
postIdx-- → postIdx = 1

Step 3: Single element?
ioStart(4) === ioEnd(4)? YES
return TreeNode(7) ✓

─────────────────────────────────────────

BACK TO CALL 2:
node(20).right = TreeNode(7) ✓

Step 6: Build LEFT
node.left = helper(2, 3-1) = helper(2, 2)

─────────────────────────────────────────

CALL 4: helper(2, 2) - Build left child of 20

Step 1: Base check → NO

Step 2: Pick root
node = new TreeNode(postorder[1]) = TreeNode(15)
postIdx-- → postIdx = 0

Step 3: Single element?
ioStart(2) === ioEnd(2)? YES
return TreeNode(15) ✓

─────────────────────────────────────────

BACK TO CALL 2:
node(20).left = TreeNode(15) ✓

Return TreeNode(20) with left=15, right=7

─────────────────────────────────────────

BACK TO CALL 1:
node(3).right = TreeNode(20) with subtree ✓

Step 6: Build LEFT
node.left = helper(0, 1-1) = helper(0, 0)

─────────────────────────────────────────

CALL 5: helper(0, 0) - Build left child of 3

Step 1: Base check → NO

Step 2: Pick root
node = new TreeNode(postorder[0]) = TreeNode(9)
postIdx-- → postIdx = -1

Step 3: Single element?
ioStart(0) === ioEnd(0)? YES
return TreeNode(9) ✓

─────────────────────────────────────────

BACK TO CALL 1:
node(3).left = TreeNode(9) ✓

Return TreeNode(3) as root!

🏆 FINAL TREE:
    3
   / \
  9  20
    /  \
   15   7

─────────────────────────────────────────

📊 EXAMPLE 2: Simpler Tree

INPUT:
inorder = [1, 2, 3]
postorder = [1, 3, 2]

OUTPUT:
    2
   / \
  1   3

PROCESS:

INITIALIZATION:
postIdx = 2
ioLookup = {1→0, 2→1, 3→2}

CALL 1: helper(0, 2)
node = TreeNode(postorder[2]) = TreeNode(2)
postIdx = 1
i = ioLookup.get(2) = 1

Build RIGHT first:
node.right = helper(2, 2)
  → TreeNode(postorder[1]) = TreeNode(3)
  → postIdx = 0
  → return TreeNode(3) ✓

Build LEFT:
node.left = helper(0, 0)
  → TreeNode(postorder[0]) = TreeNode(1)
  → postIdx = -1
  → return TreeNode(1) ✓

Return TreeNode(2) with left=1, right=3

🏆 RESULT:
    2
   / \
  1   3

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: ORDER OF PROCESSING

POSTORDER ARRAY (read right-to-left):
[9, 15, 7, 20, 3]
 ↑   ↑   ↑   ↑   ↑
 5th 4th 3rd 2nd 1st (processing order)

INORDER ARRAY (splits subtrees):
[9, 3, 15, 20, 7]
 ↑  ↑  ↑   ↑   ↑
left root  right subtree

PROCESSING ORDER:
1. postorder[4] = 3 (root)
2. postorder[3] = 20 (right subtree root)
3. postorder[2] = 7 (right-right child)
4. postorder[1] = 15 (right-left child)
5. postorder[0] = 9 (left child)

─────────────────────────────────────────

📊 POSTIDX EVOLUTION:

Initial: postIdx = 4 → postorder[4] = 3
After root: postIdx = 3 → postorder[3] = 20
After 20: postIdx = 2 → postorder[2] = 7
After 7: postIdx = 1 → postorder[1] = 15
After 15: postIdx = 0 → postorder[0] = 9
After 9: postIdx = -1 (done)

─────────────────────────────────────────

📊 RIGHT-THEN-LEFT PATTERN:

At node 3:
  1. Build right(20) first → Uses postIdx 3,2,1
  2. Build left(9) second → Uses postIdx 0

At node 20:
  1. Build right(7) first → Uses postIdx 2
  2. Build left(15) second → Uses postIdx 1

This matches postorder backwards traversal!

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ POSTORDER BACKWARDS = ROOT-RIGHT-LEFT:
   - Start from end of postorder array
   - Process root, then right, then left
   - Matches recursive right-first construction

2️⃣ INORDER PROVIDES BOUNDARIES:
   - Root position splits left/right
   - [ioStart, i-1]: left subtree indices
   - [i+1, ioEnd]: right subtree indices
   - Clear separation of subtrees

3️⃣ HASHMAP EFFICIENCY:
   - O(1) lookup for root position
   - Avoids O(n) linear search
   - Overall O(n) time complexity

4️⃣ POSTIDX SYNCHRONIZATION:
   - Shared across all calls
   - Decrements after each node
   - Ensures correct node picking

💡 KEY INSIGHT:
Postorder's last element is root. Reading postorder backwards (root→right→left)
guides tree construction by building right subtree before left, with inorder
providing subtree boundaries at each step!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node once: O(n)
- HashMap lookup: O(1) per node
- HashMap creation: O(n)
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- HashMap: O(n)
- Recursion stack: O(h)
  - Best case (balanced): O(log n)
  - Worst case (skewed): O(n)
- Total: O(n)

🎯 EDGE CASES:

CASE 1: Single Node
Input: inorder=[1], postorder=[1]
postIdx=0, pick postorder[0]=1
Single element, return TreeNode(1)
Output: TreeNode(1)

CASE 2: Left Skewed Tree
Input: inorder=[3,2,1], postorder=[3,2,1]
postorder[2]=1 (root)
postorder[1]=2 (left of 1)
postorder[0]=3 (left of 2)
Output: 1→2→3 (left chain)

CASE 3: Right Skewed Tree
Input: inorder=[1,2,3], postorder=[3,2,1]
postorder[2]=1 (root)
postorder[1]=2 (right of 1)
postorder[0]=3 (right of 2)
Output: 1→2→3 (right chain)

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Constructs correct structure: ✓
- Handles all tree shapes: ✓
- Efficient lookup: ✓
- Correct subtree separation: ✓

🎯 COMPARISON WITH INORDER+PREORDER:

PREORDER CONSTRUCTION:
- Start from beginning of preorder
- Root at preorder[preIdx]
- Build LEFT first, then RIGHT
- preIdx increments

POSTORDER CONSTRUCTION:
- Start from end of postorder
- Root at postorder[postIdx]
- Build RIGHT first, then LEFT
- postIdx decrements

Both use inorder for subtree boundaries!

🎯 KEY DIFFERENCES:

| Aspect | Preorder | Postorder |
|--------|----------|-----------|
| Start | preorder[0] | postorder[n-1] |
| Direction | Forward (++) | Backward (--) |
| Build order | Left then Right | Right then Left |
| Index init | 0 | n-1 |

🎯 IMPLEMENTATION DETAILS:
- Line 73: Initialize postIdx to last index
- Line 76-79: Create hashmap for O(1) lookup
- Line 82: Start recursive construction
- Line 88: Base case - invalid range
- Line 91-93: Pick root and decrement postIdx
- Line 96: Leaf node optimization
- Line 99: Find root position in inorder
- Line 102: Build right subtree FIRST
- Line 104: Build left subtree SECOND
- Line 107: Return constructed node

🎯 WHY DECREMENT POSTIDX:
- Postorder: left-right-root
- Reading backwards: root-right-left
- Each node processed, move to previous element
- Ensures correct root selection

🎯 ADVANTAGES:
- Optimal O(n) time complexity
- O(1) root position lookup
- Clean recursive solution
- Handles all tree structures

🎯 DISADVANTAGES:
- Requires all values unique
- Needs O(n) extra space for hashmap
- Recursion stack depth O(h)
- Cannot handle duplicate values

🎯 REAL-WORLD APPLICATIONS:
- Reconstructing trees from traversals
- Tree serialization/deserialization
- Compiler AST reconstruction
- Database query tree rebuilding
- Expression tree construction

🎯 RELATED PROBLEMS:
- Construct tree from inorder + preorder
- Construct tree from preorder + postorder (needs additional info)
- Serialize and deserialize tree
- Tree traversal problems

🎯 COMMON MISTAKES:
- Building left before right (wrong order for postorder!)
- Using preIdx++ instead of postIdx--
- Not handling single element case
- Linear search instead of hashmap
- Wrong subtree boundary calculation

🎯 BEST PRACTICES:
- Use hashmap for O(1) lookup
- Build RIGHT before LEFT for postorder
- Handle leaf node case early
- Clear variable naming
- Test with various tree shapes

🎯 DEBUGGING TIPS:
- Trace postIdx evolution
- Verify right-then-left order
- Check inorder boundaries
- Print tree structure
- Verify traversal outputs

🎯 INTERVIEW TIPS:
- Explain postorder property (last = root)
- Show right-before-left construction
- Discuss hashmap optimization
- Compare with preorder approach
- Handle edge cases
- Analyze complexity

🎯 ALGORITHM PATTERN:
- Divide and conquer
- Recursive tree construction
- Hashmap optimization
- Two-pointer (inorder boundaries)
- Right-first processing (postorder-specific)

🎯 CONCLUSION:
Constructing a binary tree from inorder and postorder traversals is efficiently
achieved by reading postorder backwards (last element = root), using hashmap for
O(1) root position lookup in inorder, building RIGHT subtree before LEFT (due to
postorder's left-right-root property read backwards), and recursively constructing
subtrees using inorder boundaries, achieving O(n) time and O(n) space complexity!
*/
