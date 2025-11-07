/* Problem: ✅✅✅✅ Check if Binary Tree is Foldable ✅✅✅✅

Given a binary tree, check if it is foldable. 
A tree is foldable if its left and right subtrees are structurally mirror images of each other (values don't matter, only structure).

Foldable definition:
- Left subtree and right subtree are structurally mirror images
- Structure means: positions of nodes, not their values
- If you "fold" the tree along the vertical line through root, left and right subtrees overlap perfectly
- Empty tree is foldable
- Single node tree is foldable

You are given the root of a binary tree. Return true if the tree is foldable, false otherwise.

Example 1:
Input:
       10
      /  \
     7    15
      \   /
      9  11

Output: true
Explanation: 
Left subtree:  7    Right subtree: 15
                \                  /
                 9                11
Structure: 7 with right child mirrors 15 with left child. Foldable!

Example 2:
Input:
       10
      /  \
     7    15
    /      \
   5        11

Output: true
Explanation:
Left subtree: 7 with left child (5)
Right subtree: 15 with right child (11)
Structure DOES mirror (opposite sides)! Foldable!

Example 3:
Input:
       10
      /  \
     7    15
    /     /
   5     11

Output: false
Explanation:
Left subtree: 7 with left child (5)
Right subtree: 15 with left child (11)
Both children on SAME side (left)! Structure doesn't mirror. Not foldable!

Example 4:
Input:
   10

Output: true
Explanation: Single node tree is foldable.

Example 5:
Input: null
Output: true
Explanation: Empty tree is foldable.

Constraints:
- 0 ≤ number of nodes ≤ 10^5
- -10^4 ≤ node.val ≤ 10^4

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(h) - recursion stack depth
*/

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// Approach 1: Using Mirror(Structurally mirror images, not values wise) Function
// ✅ TC = O(n)
// ✅ SC = O(h)
function isFoldable(root) {
    if(!root) return true
    
    return isMirror(root.left, root.right) // root's LEFT should be mirror of root's RIGHT
    
    // Helper Function
    function isMirror(a, b){
        if(!a && !b) return true // both are null
        
        if(!a || !b) return false // one is null, another is not null
        
        return isMirror(a.left, b.right) && isMirror(a.right, b.left) // a's LEFT should be mirror of b's RIGHT & a's RIGHT should be mirror of b's LEFT
    }
}



// Approach 2: Using Horizontal Distances
// ✅ TC = O(n)
// ✅ SC = O(h)
function isFoldable(root) {
    if(!root) return true
    
    let hds = [] // Horizontal Distances
    
    findHDs(root, 0)
    
    let allDescendentsCount = hds.length - 1 // excluding root
    
    // If the descendent nodes count is odd then it is not foldable (means left & right subtrees are not mirror images.)
    if(allDescendentsCount%2 !== 0) return false
    
    let sum = 0
    for(let i=0; i<hds.length; i++){
        sum += hds[i]
    }
    
    // If descendent nodes count is even & sum of hd's is 0 --> Left & Right subtrees are mirror images. So tree can be foldable
    return sum === 0
    


    // Helper function
    function findHDs(root, hd=0){ // Horizontal Distances
        if(!root) return
        
        hds.push(hd)
        
        findHDs(root.left, hd-1)
        findHDs(root.right, hd+1)
    }
}

// Test cases
let root1 = new TreeNode(10);
root1.left = new TreeNode(7);
root1.right = new TreeNode(15);
root1.left.right = new TreeNode(9);
root1.right.left = new TreeNode(11);
console.log("Test 1 (Foldable):", isFoldable(root1)); // true

let root2 = new TreeNode(10);
root2.left = new TreeNode(7);
root2.right = new TreeNode(15);
root2.left.left = new TreeNode(5);
root2.right.left = new TreeNode(11); // Both on left side - not foldable!
console.log("Test 2 (Not foldable):", isFoldable(root2)); // false

let root3 = new TreeNode(10);
root3.left = new TreeNode(7);
root3.right = new TreeNode(15);
root3.left.left = new TreeNode(5);
root3.left.right = new TreeNode(9);
root3.right.left = new TreeNode(11);
root3.right.right = new TreeNode(20);
console.log("Test 3 (Foldable):", isFoldable(root3)); // true

/*🎯 CORE IDEA: Two approaches to check if tree is foldable:
(1) Check if left and right subtrees are structurally mirror images (ignore values, only structure).
(2) Use horizontal distances (HD) - if descendant count is even and sum of all HDs is 0, 
    then left and right subtrees are structurally mirrored (foldable).

📋 STEP-BY-STEP FLOW:

1️⃣ APPROACH 1 (STRUCTURAL MIRROR CHECK):
   - Check if root is null (foldable)
   - Check if left and right subtrees are structural mirrors
   - Use isMirror helper that compares structure only
   - Ignore node values, only check positions

2️⃣ APPROACH 2 (HORIZONTAL DISTANCE):
   - Calculate HD for all nodes (root=0, left=-1, right=+1)
   - Count descendant nodes (excluding root)
   - If count is odd: not foldable (uneven subtrees)
   - If count is even and sum of HDs = 0: foldable
   - Sum=0 means left and right subtrees balance out

🧠 WHY THESE APPROACHES?
- Approach 1: Direct structural comparison
- Approach 2: Mathematical property of mirrored structures
- Both: O(n) time complexity
- Approach 1: More intuitive
- Approach 2: Clever HD-based verification

💡 KEY INSIGHTS:
- Foldable means left and right subtrees are structural mirrors
- VALUES DON'T MATTER - only structure/positions
- Approach 1: Direct mirror check
- Approach 2: HDs sum to 0 for balanced mirror
- Both approaches ignore root in comparison
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Foldable Tree

INPUT:
       10
      /  \
     7    15
      \   /
      9  11

OUTPUT: true

🎯 GOAL: Check if left and right subtrees are structural mirrors!

─────────────────────────────────────────

🔍 APPROACH 1 (STRUCTURAL MIRROR) - STEP-BY-STEP:

CALL 1: isFoldable(root=10)
Step 1: Check if null
root = 10 (not null) → continue

Step 2: Check if left and right subtrees are mirrors
return isMirror(root.left, root.right)
return isMirror(7, 15)

CALL 2: isMirror(a=7, b=15)
Step 1: Check if both null
a = 7, b = 15 (both not null) → continue

Step 2: Check if one null
Both exist → continue

Step 3: Recursive mirror checks
return isMirror(a.left, b.right) && isMirror(a.right, b.left)
return isMirror(7.left, 15.right) && isMirror(7.right, 15.left)
return isMirror(null, null) && isMirror(9, 11)

CALL 3: isMirror(null, null)
Both null → return TRUE

CALL 4: isMirror(9, 11)
Step 1: Both not null → continue
Step 2: Both exist → continue
Step 3: return isMirror(9.left, 11.right) && isMirror(9.right, 11.left)
return isMirror(null, null) && isMirror(null, null)

CALL 5: isMirror(null, null) → TRUE
CALL 6: isMirror(null, null) → TRUE

BACK TO CALL 4:
return TRUE && TRUE = TRUE

BACK TO CALL 2:
return TRUE && TRUE = TRUE

BACK TO CALL 1:
return TRUE

🏆 APPROACH 1 RESULT: true (Tree is foldable!)

─────────────────────────────────────────

🔍 APPROACH 2 (HORIZONTAL DISTANCE) - STEP-BY-STEP:

CALL 1: isFoldable(root=10)
Step 1: Check if null
root = 10 (not null) → continue

Step 2: Initialize HDs array
hds = []

Step 3: Find all horizontal distances
findHDs(root=10, hd=0)

RECURSIVE HD CALCULATION:

CALL 1: findHDs(10, hd=0)
hds.push(0) → hds = [0]
findHDs(10.left=7, hd=-1)
findHDs(10.right=15, hd=1)

CALL 2: findHDs(7, hd=-1)
hds.push(-1) → hds = [0, -1]
findHDs(7.left=null, hd=-2) → return
findHDs(7.right=9, hd=0)

CALL 3: findHDs(9, hd=0)
hds.push(0) → hds = [0, -1, 0]
findHDs(9.left=null) → return
findHDs(9.right=null) → return

CALL 4: findHDs(15, hd=1)
hds.push(1) → hds = [0, -1, 0, 1]
findHDs(15.left=11, hd=0)
findHDs(15.right=null) → return

CALL 5: findHDs(11, hd=0)
hds.push(0) → hds = [0, -1, 0, 1, 0]
findHDs(11.left=null) → return
findHDs(11.right=null) → return

After HD calculation:
hds = [0, -1, 0, 1, 0]
      ↑   └───┬───┘  ↑
    root  descendants

Step 4: Count descendants
allDescendentsCount = hds.length - 1 = 5 - 1 = 4

Step 5: Check if count is odd
if (4 % 2 !== 0) → FALSE (4 is even)
Continue

Step 6: Calculate sum of HDs
sum = 0 + (-1) + 0 + 1 + 0 = 0

Step 7: Check if sum is 0
return sum === 0 → return 0 === 0 → TRUE

🏆 APPROACH 2 RESULT: true (Tree is foldable!)

─────────────────────────────────────────

📊 EXAMPLE 2: Foldable Tree (Opposite Sides)

INPUT:
       10
      /  \
     7    15
    /      \
   5        11

OUTPUT: true ✓

🔍 APPROACH 1 (STRUCTURAL MIRROR):

isFoldable(10):
  return isMirror(7, 15)

isMirror(7, 15):
  return isMirror(7.left, 15.right) && isMirror(7.right, 15.left)
  return isMirror(5, 11) && isMirror(null, null)

isMirror(5, 11):
  Both are leaf nodes
  return isMirror(null, null) && isMirror(null, null) = TRUE

isMirror(null, null) = TRUE

BACK: TRUE && TRUE = TRUE

Result: TRUE ✓

EXPLANATION:
Left subtree (7):     Right subtree (15):
   7                      15
  /                         \
 5                          11

7's LEFT child (5) mirrors 15's RIGHT child (11) - opposite sides!
This IS a mirror structure!

When folded along vertical line:
     7       15
    /   ←→    \
   5           11

Perfect structural mirror! ✓

─────────────────────────────────────────

🔍 APPROACH 2 (HORIZONTAL DISTANCE):

INPUT:
       10
      /  \
     7    15
    /      \
   5        11

HD Calculation:
Node 10: HD = 0
Node 7: HD = -1
Node 15: HD = 1
Node 5: HD = -2
Node 11: HD = 2

hds = [0, -1, 1, -2, 2]
Descendants count = 4 (even) ✓
Sum = 0 + (-1) + 1 + (-2) + 2 = 0 ✓

Result: TRUE (foldable) ✓

─────────────────────────────────────────

📊 EXAMPLE 3: NON-FOLDABLE TREE (Same Side)

INPUT:
       10
      /  \
     7    15
    /     /
   5     11

OUTPUT: false

Left subtree: 7 with left child (5)
Right subtree: 15 with left child (11) - SAME side!

APPROACH 1:
isMirror(7, 15):
  return isMirror(7.left, 15.right) && isMirror(7.right, 15.left)
  return isMirror(5, null) && isMirror(null, 11)

isMirror(5, null):
  One is null, other is not → FALSE ✗

Result: FALSE

APPROACH 2:
HD Calculation:
Node 10: HD = 0
Node 7: HD = -1
Node 15: HD = 1
Node 5: HD = -2
Node 11: HD = 0 (15's left child: 1 + (-1) = 0)

hds = [0, -1, 1, -2, 0]
Count = 4 (even)
Sum = 0 + (-1) + 1 + (-2) + 0 = -2 ≠ 0

Result: FALSE

EXPLANATION:
When folded:
     7       15
    /   ←→  /
   5       11

Both children on LEFT side - doesn't mirror! ✗

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

FOLDABLE TREE (Example 1):
       10
      /  \
     7    15
      \   /
      9  11

Fold along vertical line:
   7   |   15
    \  |  /
     9 | 11

Structures mirror! ✓ (Opposite sides)

FOLDABLE TREE (Example 2):
       10
      /  \
     7    15
    /      \
   5        11

Fold along vertical line:
   7   |   15
  /    |    \
 5     |     11

Structures mirror! ✓ (Opposite sides: left ↔ right)

NON-FOLDABLE TREE (Example 3):
       10
      /  \
     7    15
    /     /
   5     11

Fold along vertical line:
   7   |   15
  /    |  /
 5     | 11

Structures DON'T mirror! ✗
(Both children on SAME side - both left)

─────────────────────────────────────────

📊 APPROACH 2 EXPLANATION:

HORIZONTAL DISTANCE PROPERTY:
- Root: HD = 0
- Left children: HD decreases by 1
- Right children: HD increases by 1

For FOLDABLE tree:
- Left subtree has negative HDs
- Right subtree has positive HDs
- Mirror structure means HDs balance out
- Sum of all HDs = 0

Example:
       10 (HD=0)
      /  \
     7    15 (HD=-1, HD=1)
      \   /
      9  11 (HD=0, HD=0)

HDs: [0, -1, 1, 0, 0]
Sum: 0 + (-1) + 1 + 0 + 0 = 0 ✓
Descendants: 4 (even) ✓
Foldable!

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:

1️⃣ APPROACH 1 (STRUCTURAL MIRROR):
   - Directly checks if left mirrors right
   - Uses same logic as mirror tree problem
   - Clear and intuitive
   - Standard tree recursion pattern

2️⃣ APPROACH 2 (HORIZONTAL DISTANCE):
   - Mathematical property of mirrored structures
   - Even node count ensures pairs exist
   - Sum=0 ensures balance (left negatives cancel right positives)
   - Clever alternative verification

3️⃣ STRUCTURAL MIRROR PROPERTY:
   - a.left position mirrors b.right position
   - a.right position mirrors b.left position
   - Recursive check propagates through tree
   - Values ignored, only structure checked

4️⃣ HD BALANCE PROPERTY:
   - Mirrored nodes have opposite-sign HDs
   - Example: HD=-2 mirrors HD=+2
   - Sum of opposite values = 0
   - Even count ensures all nodes paired

💡 KEY INSIGHT:
A tree is foldable if its left and right subtrees are structural mirrors,
which can be verified directly by comparing positions (Approach 1) or
mathematically by checking if descendant count is even and HD sum is 0 (Approach 2)!

🎯 TIME COMPLEXITY ANALYSIS:

APPROACH 1:
- isMirror visits each node once
- Total nodes: n
- Time: O(n)

APPROACH 2:
- findHDs visits each node once: O(n)
- Calculate sum: O(n)
- Total: O(n) + O(n) = O(n)

Both: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:

APPROACH 1:
- Recursion stack: O(h)
- No additional data structures
- Space: O(h)

APPROACH 2:
- hds array: O(n)
- Recursion stack: O(h)
- Total: O(n) + O(h) = O(n)

Approach 1 better space: O(h) vs O(n)

🎯 COMPLEXITY SUMMARY:
✅ Approach 1: TC = O(n), SC = O(h) - Better space
✅ Approach 2: TC = O(n), SC = O(n) - Uses array
✅ Both: Linear time
✅ Approach 1: More space efficient

🎯 WHY VALUES DON'T MATTER:
- Foldable is about STRUCTURE
- Node values irrelevant
- Only positions checked
- Example: Any values work if structure mirrors
  Tree:  10        Tree:  99
        /  \              /  \
       1    2            5    8
        \   /             \   /
         3 4               7 6
  Both foldable regardless of values!

🎯 APPROACH 1 VS APPROACH 2:

APPROACH 1:
✅ Pros: Intuitive, direct check
✅ Pros: Better space O(h)
✅ Pros: Clear logic
❌ Cons: None significant

APPROACH 2:
✅ Pros: Clever mathematical approach
✅ Pros: Alternative verification
❌ Cons: Extra array space O(n)
❌ Cons: Less intuitive

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null
Approach 1: Line 87, return true
Approach 2: Line 96, return true
Output: true

CASE 2: Single Node
Input: TreeNode(10)
Approach 1: isMirror(null, null) → true
Approach 2: count=0 (even), sum=0 → true
Output: true

CASE 3: Two Nodes (Left Only)
Input:
   10
  /
 7

Approach 1: isMirror(7, null) → false
Approach 2: count=1 (odd) → false
Output: false

CASE 4: Two Nodes (Both Children)
Input:
   10
  /  \
 7   15

Approach 1: isMirror(7, 15):
  isMirror(null, null) && isMirror(null, null) → true
Approach 2: HDs=[0,-1,1], count=2 (even), sum=0 → true
Output: true

🎯 ALGORITHM CORRECTNESS:
- Both approaches check structural mirroring
- Both ignore values (structure only)
- Both handle null cases
- Both return correct results
- Approach 1 more efficient (space)

🎯 IMPLEMENTATION DETAILS:
- Approach 1: Uses isMirror helper (structural)
- Approach 2: Uses findHDs + sum calculation
- Both: Clear separation of concerns
- Both: Proper null handling

🎯 WHY DESCENDANT COUNT MUST BE EVEN:
- Left and right subtrees must mirror
- Each node in left pairs with node in right
- Unpaired node means no mirror
- Example: 3 descendants → can't pair evenly
- Even count necessary but not sufficient

🎯 WHY HD SUM MUST BE 0:
- Left subtree: negative HDs
- Right subtree: positive HDs
- Mirror means symmetric distribution
- Opposite HDs cancel: (-2, +2), (-1, +1)
- Sum = 0 indicates perfect balance

🎯 ADVANTAGES OF APPROACH 1:
- Direct and intuitive
- Better space complexity
- Standard pattern
- Easy to understand

🎯 ADVANTAGES OF APPROACH 2:
- Mathematical elegance
- Alternative verification method
- Interesting HD property
- Good for learning

🎯 REAL-WORLD APPLICATIONS:
- Tree symmetry detection
- Pattern matching in trees
- Validating balanced structures
- UI layout verification
- Structural analysis

🎯 RELATED PROBLEMS:
- Check if tree is symmetric
- Mirror binary tree
- Check if two trees are mirrors
- Vertical symmetry
- Balanced tree problems

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Foldable trees
- Non-foldable trees
- Unbalanced structures
- Perfect symmetry

🎯 COMMON MISTAKES:
- Checking values instead of structure
- Not handling null cases
- Wrong mirror check logic
- Approach 2: Wrong sum calculation
- Forgetting root in HD calculation

🎯 BEST PRACTICES:
- Use Approach 1 for clarity
- Understand both approaches
- Test with various structures
- Handle edge cases
- Document structure-only check

🎯 INTERVIEW TIPS:
- Explain foldable concept clearly
- Show both approaches
- Emphasize structure over values
- Draw folding visualization
- Analyze complexity
- Prefer Approach 1 for implementation

🎯 CONCLUSION:
Checking if a binary tree is foldable can be done by verifying if left and right
subtrees are structural mirrors using direct comparison (O(n) time, O(h) space)
or by calculating horizontal distances and checking if descendant count is even
and HD sum is 0 (O(n) time, O(n) space), both ignoring node values and focusing
only on structural symmetry!
*/