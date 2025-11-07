/* Problem: ✅✅✅✅ Find Common Nodes in Two BSTs (In Sorted Order) ✅✅✅✅

Given two Binary Search Trees (BST), find all common nodes (nodes with same value present in both trees) and return them in sorted order.

A Binary Search Tree is a binary tree where:
- All nodes in the left subtree have values less than the node's value
- All nodes in the right subtree have values greater than the node's value

Key Insight: Inorder traversal of BST gives sorted order. We can use simultaneous inorder traversal of both trees to find common elements, similar to merging two sorted arrays.

Example 1:
Input:
BST1:       5               BST2:       3
           / \                         / \
          3   7                       2   5
         / \                           \   \
        2   4                           3   6

Output: [3, 5]
Explanation: Nodes 3 and 5 are present in both BSTs.

Example 2:
Input:
BST1:       10              BST2:       15
           /  \                        /  \
          5    15                     10   20
         / \                         /
        3   7                       5

Output: [5, 10]
Explanation: Nodes 5 and 10 are common.

Example 3:
Input:
BST1:       1               BST2:       5
           / \                         / \
          2   3                       6   7

Output: []
Explanation: No common nodes.

Example 4:
Input:
BST1:       5               BST2:       5
           / \                         / \
          3   7                       3   7
         / \                         / \
        1   4                       1   4

Output: [1, 3, 4, 5, 7]
Explanation: All nodes are common (identical trees).

Example 5:
Input:
BST1: null, BST2: any tree
Output: []
Explanation: If either tree is empty, no common nodes exist.

Constraints:
- 0 ≤ Number of nodes in each tree ≤ 10^4
- -10^5 ≤ Node.val ≤ 10^5
- All values in each BST are unique

Expected Complexities:
Time Complexity: O(m + n) - where m, n are number of nodes in the two trees
Auxiliary Space: O(h1 + h2) - where h1, h2 are heights of the two trees (stack space)
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC: O(m + n) - visit each node at most once across both trees
// ✅ SC: O(h1 + h2) - stack space for both trees
function findCommon(r1, r2) {
    let res = []
    
    // Use Iterative Inorder Traversal (gives SORTED order for BST)
    
    let st1 = [], st2 = [];
    let curr1 = r1, curr2 = r2;
    
    while((curr1 || st1.length > 0) && (curr2 || st2.length > 0)){
        // 1. Traverse leftmost of tree1
        while(curr1){
            st1.push(curr1)
            curr1 = curr1.left
        }
        // 2. Traverse leftmost of tree2
        while(curr2){
            st2.push(curr2)
            curr2 = curr2.left
        }
        
        // Get Tops/Peeks (Don't pop now itself)
        let top1 = st1[st1.length - 1]
        let top2 = st2[st2.length - 1]
        
        if(top1.data === top2.data){
            res.push(top1.data) // Inorder traversal pushes in sorted order only
            
            // Pop both now
            st1.pop()
            st2.pop()
            curr1 = top1.right // Go to right subtree of tree1
            curr2 = top2.right // Go to right subtree of tree2
        }else if(top1.data < top2.data){
            // Means the curr1(leftmost/min in 1) is < (leftmost/min in 2). 
            // So go to right subtree of curr1 (coz, greater nodes needed to match curr2)
            st1.pop()
            curr1 = top1.right // Go to right subtree of tree1
        }else{
            // Means the curr2(leftmost/min in 2) is < (leftmost/min in 1).
            // So go to right subtree of curr2 (coz, greater nodes needed to match curr1)
            st2.pop()
            curr2 = top2.right // Go to right subtree of tree2
        }
    }
    
    return res
}

// Test cases
let root1 = new Node(5);
root1.left = new Node(3);
root1.right = new Node(7);
root1.left.left = new Node(2);
root1.left.right = new Node(4);

let root2 = new Node(3);
root2.left = new Node(2);
root2.right = new Node(5);
root2.left.right = new Node(3);
root2.right.right = new Node(6);

console.log("Test 1:", findCommon(root1, root2)); // [2, 3, 5]

let root3 = new Node(10);
root3.left = new Node(5);
root3.right = new Node(15);
root3.left.left = new Node(3);
root3.left.right = new Node(7);

let root4 = new Node(15);
root4.left = new Node(10);
root4.right = new Node(20);
root4.left.left = new Node(5);

console.log("Test 2:", findCommon(root3, root4)); // [5, 10, 15]

let root5 = new Node(1);
root5.left = new Node(2);
root5.right = new Node(3);

let root6 = new Node(5);
root6.left = new Node(6);
root6.right = new Node(7);

console.log("Test 3:", findCommon(root5, root6)); // []

/*🎯 CORE IDEA: Use SIMULTANEOUS ITERATIVE INORDER TRAVERSAL of both BSTs. Since inorder traversal of BST gives sorted sequence, this is equivalent to finding common elements in two sorted arrays. Maintain two stacks for both trees, compare top elements: if equal, it's a common node; if one is smaller, advance that tree to find larger values. This achieves O(m+n) time with O(h1+h2) space.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create result array
   - Create two stacks (st1, st2) for both trees
   - Initialize curr1 = r1, curr2 = r2
   - Both pointers start at roots

2️⃣ SIMULTANEOUS INORDER:
   - While both trees have nodes to process:
     * Push leftmost path of tree1 to st1
     * Push leftmost path of tree2 to st2
     * Compare stack tops (current smallest in each tree)
     * Take action based on comparison

3️⃣ COMPARISON LOGIC:
   - If top1.data === top2.data: Common node found!
     * Add to result
     * Pop both stacks
     * Move to right subtrees of both
   - If top1.data < top2.data: Advance tree1
     * Pop st1
     * Move curr1 to right (find larger values)
   - If top1.data > top2.data: Advance tree2
     * Pop st2
     * Move curr2 to right (find larger values)

4️⃣ LEFTMOST TRAVERSAL:
   - For each tree, push all left nodes to stack
   - This gives us the next smallest element
   - Stack top = current smallest unprocessed node
   - Simulates inorder traversal

5️⃣ TERMINATION:
   - Stop when either tree is exhausted
   - If tree1 exhausted: no more elements to compare
   - If tree2 exhausted: no more elements to compare
   - Remaining nodes in one tree can't have matches

6️⃣ RETURN RESULT:
   - Result contains common nodes in sorted order
   - Sorted because both inorder traversals are sorted
   - Natural merge-like comparison

🧠 WHY THIS APPROACH?

1️⃣ BST INORDER = SORTED:
   - Inorder traversal of BST gives sorted sequence
   - BST1 inorder: sorted array 1
   - BST2 inorder: sorted array 2
   - Problem becomes: find common in two sorted arrays

2️⃣ MERGE-LIKE COMPARISON:
   - Two pointers on two sorted arrays
   - Compare current elements
   - Advance smaller pointer
   - Classic merge technique

3️⃣ ITERATIVE INORDER:
   - Use stacks instead of recursion
   - More control over traversal
   - Can pause, compare, and resume
   - Essential for simultaneous traversal

4️⃣ SPACE EFFICIENCY:
   - Don't need to store full inorder arrays
   - Process on-the-fly
   - O(h) space per tree (stack)
   - Better than O(n) for array storage

💡 KEY INSIGHTS:

1️⃣ SIMULTANEOUS TRAVERSAL:
   - Both trees traversed in parallel
   - Not one after the other
   - Compare as we go
   - More efficient than separate traversals

2️⃣ STACK TOP = CURRENT MIN:
   - After pushing leftmost path
   - Stack top = smallest unprocessed node
   - Perfect for comparison
   - Mimics sorted array pointer

3️⃣ ADVANCE LOGIC:
   - If top1 < top2: advance tree1 (need larger)
   - If top1 > top2: advance tree2 (need larger)
   - If top1 == top2: advance both (found match)
   - Similar to merge operation

4️⃣ WHY PEEK BEFORE POP:
   - Need to compare before deciding
   - If equal: pop both and add to result
   - If not equal: pop only the smaller one
   - Peeking (top) allows conditional popping

🎯 ALGORITHM ANALOGY:

Think of it as MERGING TWO SORTED ARRAYS:
- Array1: Inorder of BST1 (sorted)
- Array2: Inorder of BST2 (sorted)
- Find common: compare pointers, advance smaller

But instead of arrays, use stacks + traversal!
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Finding Common Nodes

INPUT:
BST1:       5               BST2:       3
           / \                         / \
          3   7                       2   5
         / \                           \   \
        2   4                           3   6

Inorder BST1: [2, 3, 4, 5, 7]
Inorder BST2: [2, 3, 5, 6]
Common: [2, 3, 5]

OUTPUT: [2, 3, 5]

🎯 GOAL: Find common nodes using simultaneous inorder traversal!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
st1 = [], st2 = []
curr1 = root1 (node 5)
curr2 = root2 (node 3)

─────────────────────────────────────────

ITERATION 1:

Step 1: Push leftmost path of BST1
curr1 = 5 → push 5, curr1 = 3
curr1 = 3 → push 3, curr1 = 2
curr1 = 2 → push 2, curr1 = null
st1 = [5, 3, 2]

Step 2: Push leftmost path of BST2
curr2 = 3 → push 3, curr2 = 2
curr2 = 2 → push 2, curr2 = null
st2 = [3, 2]

Step 3: Compare tops
top1 = 2, top2 = 2
2 === 2? YES! ✓

Step 4: Equal case
res.push(2) → res = [2]
st1.pop() → st1 = [5, 3]
st2.pop() → st2 = [3]
curr1 = 2.right = null
curr2 = 2.right = 3 (node with value 3, right child of 2)

─────────────────────────────────────────

ITERATION 2:

Step 1: Push leftmost of BST1
curr1 = null → skip (already null)
st1 = [5, 3] (unchanged)

Step 2: Push leftmost of BST2
curr2 = 3 → push 3, curr2 = null
st2 = [3, 3]

Step 3: Compare tops
top1 = 3, top2 = 3
3 === 3? YES! ✓

Step 4: Equal case
res.push(3) → res = [2, 3]
st1.pop() → st1 = [5]
st2.pop() → st2 = [3]
curr1 = 3.right = 4
curr2 = 3.right = null

─────────────────────────────────────────

ITERATION 3:

Step 1: Push leftmost of BST1
curr1 = 4 → push 4, curr1 = null
st1 = [5, 4]

Step 2: Push leftmost of BST2
curr2 = null → skip
st2 = [3] (unchanged)

Step 3: Compare tops
top1 = 4, top2 = 3
4 === 3? NO
4 > 3? YES

Step 4: top1 > top2 case
st2.pop() → st2 = []
curr2 = 3.right = 5

─────────────────────────────────────────

ITERATION 4:

Step 1: Push leftmost of BST1
curr1 = null → skip
st1 = [5, 4] (unchanged)

Step 2: Push leftmost of BST2
curr2 = 5 → push 5, curr2 = null
st2 = [5]

Step 3: Compare tops
top1 = 4, top2 = 5
4 === 5? NO
4 < 5? YES

Step 4: top1 < top2 case
st1.pop() → st1 = [5]
curr1 = 4.right = null

─────────────────────────────────────────

ITERATION 5:

Step 1: Push leftmost of BST1
curr1 = null → skip
st1 = [5] (unchanged)

Step 2: Push leftmost of BST2
curr2 = null → skip
st2 = [5] (unchanged)

Step 3: Compare tops
top1 = 5, top2 = 5
5 === 5? YES! ✓

Step 4: Equal case
res.push(5) → res = [2, 3, 5]
st1.pop() → st1 = []
st2.pop() → st2 = []
curr1 = 5.right = 7
curr2 = 5.right = 6

─────────────────────────────────────────

ITERATION 6:

Step 1: Push leftmost of BST1
curr1 = 7 → push 7, curr1 = null
st1 = [7]

Step 2: Push leftmost of BST2
curr2 = 6 → push 6, curr2 = null
st2 = [6]

Step 3: Compare tops
top1 = 7, top2 = 6
7 === 6? NO
7 > 6? YES

Step 4: top1 > top2 case
st2.pop() → st2 = []
curr2 = 6.right = null

─────────────────────────────────────────

ITERATION 7:

Condition check: (curr1 || st1.length > 0) && (curr2 || st2.length > 0)
(null || true) && (null || false)
true && false = FALSE

Loop terminates!

─────────────────────────────────────────

FINAL RESULT: res = [2, 3, 5]

🏆 Common nodes in sorted order: [2, 3, 5]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: Simultaneous Inorder

BST1 Inorder: 2 → 3 → 4 → 5 → 7
BST2 Inorder: 2 → 3 → 5 → 6

MERGE COMPARISON:

Position:  BST1    BST2    Action
   1:       2       2      MATCH → add 2, advance both
   2:       3       3      MATCH → add 3, advance both
   3:       4       5      4 < 5 → advance BST1
   4:       5       5      MATCH → add 5, advance both
   5:       7       6      7 > 6 → advance BST2
   6:       7      (end)   BST2 exhausted → STOP

Result: [2, 3, 5]

─────────────────────────────────────────

📊 EXAMPLE 2: No Common Nodes

INPUT:
BST1:       1               BST2:       5
           / \                         / \
          2   3                       6   7

BST1 Inorder: [2, 1, 3] → Actually: [1, 2, 3] (wait, that's wrong)
Let me recalculate:
     1
    / \
   2   3
Inorder (Left-Root-Right): 2, 1, 3

Actually, this violates BST property! Left child 2 > root 1.
Let me use a valid example.

BST1:       3               BST2:       8
           / \                         / \
          1   5                       6   10

BST1 Inorder: [1, 3, 5]
BST2 Inorder: [6, 8, 10]

COMPARISON:
1 vs 6: 1 < 6 → advance BST1
3 vs 6: 3 < 6 → advance BST1
5 vs 6: 5 < 6 → advance BST1
(BST1 exhausted)

Result: [] (no common nodes)

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(m + n)
- m = nodes in BST1
- n = nodes in BST2
- Each node visited at most once
- Stack push/pop: O(1) per node
- Total: O(m) + O(n) = O(m + n)

SPACE COMPLEXITY: O(h1 + h2)
- h1 = height of BST1
- h2 = height of BST2
- Stack st1: O(h1) space
- Stack st2: O(h2) space
- Result array: O(min(m, n)) worst case
- Total auxiliary: O(h1 + h2)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Empty BST1
Input: null, BST2
Condition: (null || false) && (curr2 || st2.length > 0)
false && ... = false
Output: []

CASE 2: Empty BST2
Input: BST1, null
Similar to case 1
Output: []

CASE 3: Both Empty
Input: null, null
Output: []

CASE 4: Identical Trees
All nodes common
BST1 = BST2
Output: All nodes in sorted order

CASE 5: Disjoint Trees
No common values
Example: BST1 = [1,2,3], BST2 = [4,5,6]
Output: []

CASE 6: One Node Each
BST1 = [5], BST2 = [5]
Output: [5]
BST1 = [5], BST2 = [3]
Output: []

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ STACK SIMULATES INORDER:
   - Push leftmost path
   - Stack top = next smallest
   - Pop and go right
   - Standard iterative inorder

2️⃣ SIMULTANEOUS = EFFICIENT:
   - Don't traverse trees separately
   - Compare on-the-fly
   - Stop early if one exhausted
   - More efficient than storing arrays

3️⃣ MERGE TECHNIQUE:
   - Two sorted sequences
   - Two pointers (stack tops)
   - Compare and advance
   - Find intersection

4️⃣ WHY NOT HASH SET:
   - Could traverse BST1, store in set
   - Then traverse BST2, check set
   - But loses sorted order
   - This approach gives sorted result

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓ (or stops when necessary)
- Finds all common nodes: ✓
- Returns in sorted order: ✓
- Optimal complexity: ✓
- Handles edge cases: ✓

🎯 COMMON MISTAKES:

MISTAKE 1: Popping Before Comparing
Problem: Pop first, then compare → lose node
Solution: Peek (st[st.length-1]), then pop

MISTAKE 2: Not Advancing Smaller
Problem: Advance both when not equal
Solution: Only advance the smaller one

MISTAKE 3: Wrong Right Child Assignment
Problem: curr1 = top2.right (wrong tree)
Solution: curr1 = top1.right, curr2 = top2.right

MISTAKE 4: Not Pushing Leftmost
Problem: Only push root, not full leftmost path
Solution: While loop to push all left nodes

MISTAKE 5: Wrong Loop Condition
Problem: Only check one tree in while loop
Solution: Both trees must have nodes (AND condition)

🎯 TESTING STRATEGY:
- Empty tree(s)
- Single node trees
- Identical trees
- Disjoint trees
- Partial overlap
- All common nodes
- One tree larger
- Balanced vs skewed

🎯 DEBUGGING TIPS:
- Print stack contents at each iteration
- Trace which nodes are being compared
- Verify leftmost path pushing
- Check stack top values
- Trace curr1, curr2 movements

🎯 INTERVIEW TIPS:
- Explain BST inorder = sorted
- Draw parallel to merging sorted arrays
- Show stack-based inorder traversal
- Discuss why simultaneous is efficient
- Handle edge cases
- Analyze complexity
- Compare with alternative approaches

🎯 ALTERNATIVE APPROACHES:

APPROACH 1: Store Inorder Arrays
- Traverse BST1, store inorder in array1
- Traverse BST2, store inorder in array2
- Merge two sorted arrays to find common
- Time: O(m + n), Space: O(m + n)
- More space, same time

APPROACH 2: Hash Set
- Traverse BST1, store values in set
- Traverse BST2, check if in set
- Time: O(m + n), Space: O(m)
- Doesn't guarantee sorted order

APPROACH 3: This Approach (Simultaneous Inorder)
- Iterative inorder with stacks
- Compare on-the-fly
- Time: O(m + n), Space: O(h1 + h2)
- Optimal space, sorted order

🎯 REAL-WORLD APPLICATIONS:
- Database query intersection
- Finding common elements in sorted datasets
- Merge operations on sorted data
- Tree-based data comparison
- Common substring/subarray problems

🎯 RELATED PROBLEMS:
- Intersection of two sorted arrays
- Merge two sorted arrays
- Union of two BSTs
- Common elements in multiple arrays
- Two-pointer technique problems

🎯 OPTIMIZATION NOTES:
- Already optimal O(m + n) time
- Space is O(h) instead of O(n)
- Cannot do better than visiting all nodes
- Iterative better than recursive here
- Early termination when one tree exhausted

🎯 WHY ITERATIVE OVER RECURSIVE:

RECURSIVE INORDER:
- Would need to store all elements first
- Then compare arrays
- More space: O(m + n)

ITERATIVE INORDER:
- Process on-the-fly
- No need to store all elements
- Less space: O(h1 + h2)
- More control over traversal

🎯 CONCLUSION:
Finding common nodes in two BSTs is efficiently solved using simultaneous iterative inorder traversal with two stacks. Since inorder of BST gives sorted order, the problem reduces to finding intersection of two sorted sequences using a merge-like two-pointer technique. By comparing stack tops (current smallest in each tree) and advancing the smaller one, we find all common nodes in O(m+n) time with optimal O(h1+h2) space, naturally producing sorted output!
*/
