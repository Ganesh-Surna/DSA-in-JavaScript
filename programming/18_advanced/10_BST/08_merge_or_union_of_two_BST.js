/* Problem: ✅✅✅✅ Merge Two BSTs ✅✅✅✅

Given two Binary Search Trees (BSTs), merge them into a single sorted array.
The merged array should contain all elements from both BSTs in sorted order.

The BST property ensures that:
- Left subtree contains nodes < current node
- Right subtree contains nodes > current node
- Inorder traversal gives sorted order

You are given the roots of two BSTs. Return a merged sorted array containing
all elements from both BSTs.

Example 1:
Input:
BST1:    4        BST2:    8
        / \              / \
       2   6            6   12
      / \ / \          / \  / \
     1  3 5  7        4  7 10 14

Output: [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]
Explanation: All elements from both BSTs merged in sorted order.

Example 2:
Input:
BST1:    5        BST2:    3
        / \              / \
       3   7            1   5
      / \   \          / \   \
     2  4    8        0  2    6

Output: [0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8]
Explanation: All elements merged with duplicates included.

Example 3:
Input:
BST1:    2        BST2:    1
        / \              / \
       1   3            0   2

Output: [0, 1, 1, 2, 2, 3]
Explanation: Elements from both BSTs merged in sorted order.

Constraints:
- 1 ≤ number of nodes in each BST ≤ 10^4
- 1 ≤ node.data ≤ 10^5

Expected Complexities:
Time Complexity: O(m + n) - where m, n are sizes of BSTs
Auxiliary Space: O(m + n) - for stacks and result array
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(m + n) - where m, n are sizes of BSTs
// ✅ SC = O(m + n) - for stacks and result array
function mergeBSTs(root1, root2) {
    // in BST , SORTED means INORDER
    let res = []
    
    let st1 = [], st2 = []
    let curr1 = root1, curr2 = root2
    
    while((curr1 || st1.length > 0) || (curr2 || st2.length > 0)){
        // Traverse leftmost of curr1
        while(curr1){
            st1.push(curr1)
            curr1 = curr1.left
        }
        // Traverse leftmost of curr2
        while(curr2){
            st2.push(curr2)
            curr2 = curr2.left
        }
        
        // One or none may be empty. (in outer while loop, even if one tree is exist we come into here)
        // So need to Handle the other empty subtree
        if(st1.length === 0){
            curr2 = st2.pop() // pop the other
            res.push(curr2.data)
            curr2 = curr2.right
            continue
        }
        if(st2.length === 0){
            curr1 = st1.pop() // pop the other
            res.push(curr1.data)
            curr1 = curr1.right
            continue
        }
        
        // Just get tops/peeks (DON'T pop here)
        let top1 = st1[st1.length - 1]
        let top2 = st2[st2.length - 1]
        
        if(top1.data < top2.data){
            st1.pop() // pop smaller one
            res.push(top1.data)
            curr1 = top1.right // And move to right subtree
        }else if(top1.data > top2.data){
            st2.pop() // pop smaller one
            res.push(top2.data)
            curr2 = top2.right // And move to right subtree
        }else{
            // Means both are same, so pop both & move both to their right subtree
            st1.pop()
            res.push(top1.data)
            curr1 = top1.right // And move to right subtree
            
            st2.pop()
            res.push(top2.data)
            curr2 = top2.right // And move to right subtree
        }
    }
    
    return res
}

// Test cases
let root1 = new Node(4);
root1.left = new Node(2);
root1.right = new Node(6);
root1.left.left = new Node(1);
root1.left.right = new Node(3);
root1.right.left = new Node(5);
root1.right.right = new Node(7);

let root2 = new Node(8);
root2.left = new Node(6);
root2.right = new Node(12);
root2.left.left = new Node(4);
root2.left.right = new Node(7);
root2.right.left = new Node(10);
root2.right.right = new Node(14);

console.log("Test 1:", mergeBSTs(root1, root2)); // [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]

let root3 = new Node(5);
root3.left = new Node(3);
root3.right = new Node(7);
root3.left.left = new Node(2);
root3.left.right = new Node(4);
root3.right.right = new Node(8);

let root4 = new Node(3);
root4.left = new Node(1);
root4.right = new Node(5);
root4.left.left = new Node(0);
root4.left.right = new Node(2);
root4.right.right = new Node(6);

console.log("Test 2:", mergeBSTs(root3, root4)); // [0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8]

let root5 = new Node(2);
root5.left = new Node(1);
root5.right = new Node(3);

let root6 = new Node(1);
root6.left = new Node(0);
root6.right = new Node(2);

console.log("Test 3:", mergeBSTs(root5, root6)); // [0, 1, 1, 2, 2, 3]

/*🎯 CORE IDEA: Use simultaneous iterative inorder traversal with merge logic.
Traverse both BSTs simultaneously using stacks, comparing elements at each step
and merging them in sorted order, similar to merging two sorted arrays.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize result array
   - Create stacks for both BSTs
   - Set current pointers to roots
   - Prepare for simultaneous traversal

2️⃣ LEFT SUBTREE TRAVERSAL:
   - Go left as far as possible in both trees
   - Push all left nodes to respective stacks
   - Build paths to leftmost nodes
   - Maintain inorder property

3️⃣ EMPTY STACK HANDLING:
   - If one stack is empty, process remaining tree
   - Pop from non-empty stack
   - Add to result and move to right subtree
   - Continue until both stacks empty

4️⃣ ELEMENT COMPARISON:
   - Peek at top elements from both stacks
   - Compare values to determine order
   - Pop smaller element and add to result
   - Move to right subtree of popped element

5️⃣ DUPLICATE HANDLING:
   - If elements are equal, pop both
   - Add both to result (preserving duplicates)
   - Move both to right subtrees
   - Maintain sorted order

🧠 WHY THIS APPROACH?
- Simultaneous inorder traversal
- Merge-like comparison logic
- Handles duplicates correctly
- O(m + n) time complexity
- Efficient space usage

💡 KEY INSIGHTS:
- BST inorder gives sorted order
- Merge two sorted sequences
- Use stacks for iterative traversal
- Handle empty stacks gracefully
- Preserve duplicate elements
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Merge Two BSTs

INPUT BSTs:
BST1:    4        BST2:    8
        / \              / \
       2   6            6   12
      / \ / \          / \  / \
     1  3 5  7        4  7 10 14

EXPECTED OUTPUT: [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]

🎯 GOAL: Merge both BSTs into a single sorted array!

🔍 STEP-BY-STEP PROCESS:

SIMULTANEOUS INORDER TRAVERSAL:

STEP 1: Initialize
Stack1: [], Stack2: []
Current1: 4, Current2: 8
Result: []

STEP 2: Go left in both trees
Stack1: [4, 2, 1], Stack2: [8, 6, 4]
Current1: null, Current2: null

STEP 3: Compare tops
Top1: 1, Top2: 4
1 < 4, so pop 1 from Stack1
Result: [1]
Current1: null (1 has no right child)

STEP 4: Go left in BST1 (already done)
Stack1: [4, 2], Stack2: [8, 6, 4]
Current1: null, Current2: null

STEP 5: Compare tops
Top1: 2, Top2: 4
2 < 4, so pop 2 from Stack1
Result: [1, 2]
Current1: 3 (2's right child)

STEP 6: Go left from 3
Stack1: [4, 3], Stack2: [8, 6, 4]
Current1: null, Current2: null

STEP 7: Compare tops
Top1: 3, Top2: 4
3 < 4, so pop 3 from Stack1
Result: [1, 2, 3]
Current1: null (3 has no right child)

STEP 8: Go left in BST1 (already done)
Stack1: [4], Stack2: [8, 6, 4]
Current1: null, Current2: null

STEP 9: Compare tops
Top1: 4, Top2: 4
4 = 4, so pop both
Result: [1, 2, 3, 4, 4]
Current1: 6 (4's right child), Current2: 7 (4's right child)

STEP 10: Go left from 6 and 7
Stack1: [6, 5], Stack2: [8, 6, 7]
Current1: null, Current2: null

STEP 11: Compare tops
Top1: 5, Top2: 7
5 < 7, so pop 5 from Stack1
Result: [1, 2, 3, 4, 4, 5]
Current1: null (5 has no right child)

STEP 12: Continue process...
Final result: [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]

🏆 FINAL RESULT: [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]

─────────────────────────────────────────

📊 EXAMPLE 2: Handling Empty Stacks

INPUT BSTs:
BST1:    5        BST2:    3
        / \              / \
       3   7            1   5
      / \   \          / \   \
     2  4    8        0  2    6

PROCESS:

STEP 1: Go left in both
Stack1: [5, 3, 2], Stack2: [3, 1, 0]
Current1: null, Current2: null

STEP 2: Compare tops
Top1: 2, Top2: 0
0 < 2, so pop 0 from Stack2
Result: [0]
Current2: null (0 has no right child)

STEP 3: Go left in BST2 (already done)
Stack1: [5, 3, 2], Stack2: [3, 1]
Current1: null, Current2: null

STEP 4: Compare tops
Top1: 2, Top2: 1
1 < 2, so pop 1 from Stack2
Result: [0, 1]
Current2: 2 (1's right child)

STEP 5: Continue merging...
Final result: [0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8]

🏆 RESULT: [0, 1, 2, 2, 3, 3, 4, 5, 5, 6, 7, 8]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

MERGE PROCESS VISUALIZATION:
BST1 inorder: 1, 2, 3, 4, 5, 6, 7
BST2 inorder: 4, 6, 7, 8, 10, 12, 14

Merge comparison:
1 < 4 → add 1
2 < 4 → add 2
3 < 4 → add 3
4 = 4 → add 4, 4
5 < 6 → add 5
6 = 6 → add 6, 6
7 = 7 → add 7, 7
8 > 7 → add 8
10 > 8 → add 10
12 > 10 → add 12
14 > 12 → add 14

Result: [1, 2, 3, 4, 4, 5, 6, 6, 7, 7, 8, 10, 12, 14]

─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

INITIAL:
Stack1: [], Stack2: []
Current1: 4, Current2: 8

GO LEFT:
Stack1: [4, 2, 1], Stack2: [8, 6, 4]
Current1: null, Current2: null

FIRST COMPARISON:
Top1: 1, Top2: 4
1 < 4, pop 1
Stack1: [4, 2], Stack2: [8, 6, 4]
Result: [1]

SECOND COMPARISON:
Top1: 2, Top2: 4
2 < 4, pop 2
Stack1: [4], Stack2: [8, 6, 4]
Result: [1, 2]

THIRD COMPARISON:
Top1: 3, Top2: 4
3 < 4, pop 3
Stack1: [4], Stack2: [8, 6, 4]
Result: [1, 2, 3]

FOURTH COMPARISON:
Top1: 4, Top2: 4
4 = 4, pop both
Stack1: [], Stack2: [8, 6]
Result: [1, 2, 3, 4, 4]

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ SIMULTANEOUS INORDER TRAVERSAL:
   - Both BSTs processed in sorted order
   - Stacks maintain traversal state
   - Leftmost elements always at stack tops
   - Natural merge comparison points

2️⃣ MERGE LOGIC:
   - Compare elements at stack tops
   - Pop smaller element
   - Add to result array
   - Move to right subtree
   - Similar to merging sorted arrays

3️⃣ EMPTY STACK HANDLING:
   - When one stack empty, process remaining tree
   - Ensures all elements included
   - Maintains sorted order
   - Handles unbalanced trees

4️⃣ DUPLICATE PRESERVATION:
   - When elements equal, pop both
   - Add both to result
   - Preserves all duplicates
   - Maintains stability

5️⃣ ITERATIVE IMPLEMENTATION:
   - No recursion overhead
   - Clear control flow
   - Easy to understand
   - Efficient memory usage

💡 KEY INSIGHT:
Using simultaneous iterative inorder traversal with merge logic, where we
maintain stacks for both BSTs, compare elements at stack tops, pop smaller
elements, and move to right subtrees, achieving O(m + n) time complexity
while preserving duplicates and maintaining sorted order!

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(m + n)
- Stack operations: O(1) per node
- Comparison operations: O(1) per node
- Total: O(m + n) where m, n are BST sizes
- Optimal for merging two sorted sequences

🎯 SPACE COMPLEXITY ANALYSIS:
- Stacks: O(h1 + h2) where h1, h2 are heights
- Result array: O(m + n)
- Total: O(m + n)
- For balanced BSTs: O(log m + log n + m + n)

🎯 EDGE CASES:

CASE 1: Empty BSTs
Input: null, null
Result: []
Output: []

CASE 2: One Empty BST
Input: BST1, null
Process: Traverse BST1 only
Result: Inorder of BST1
Output: [1, 2, 3, 4, 5]

CASE 3: Single Node BSTs
Input: Node(5), Node(3)
Process: Compare 5 and 3
Result: [3, 5]
Output: [3, 5]

CASE 4: Identical BSTs
Input: Same BST twice
Process: Duplicate all elements
Result: [1, 1, 2, 2, 3, 3]
Output: [1, 1, 2, 2, 3, 3]

CASE 5: No Overlapping Elements
Input: BST1: [1,2,3], BST2: [4,5,6]
Process: Simple concatenation
Result: [1, 2, 3, 4, 5, 6]
Output: [1, 2, 3, 4, 5, 6]

CASE 6: All Elements Same
Input: BST1: [5,5,5], BST2: [5,5,5]
Process: All duplicates preserved
Result: [5, 5, 5, 5, 5, 5]
Output: [5, 5, 5, 5, 5, 5]

🎯 ALGORITHM CORRECTNESS:
- Processes all elements from both BSTs: ✓
- Maintains sorted order: ✓
- Preserves duplicates: ✓
- Handles empty BSTs: ✓
- Handles unbalanced trees: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 3: Initialize result array
- Line 5-6: Initialize stacks and current pointers
- Line 8: Main merge loop
- Line 10-13: Go left in BST1
- Line 15-18: Go left in BST2
- Line 22-33: Handle empty stacks
- Line 36-37: Peek at stack tops
- Line 39-56: Compare and merge logic

🎯 MERGE LOGIC:

WHEN top1.data < top2.data:
- Pop from Stack1
- Add top1.data to result
- Move to right subtree of top1
- Continue with BST1 traversal

WHEN top1.data > top2.data:
- Pop from Stack2
- Add top2.data to result
- Move to right subtree of top2
- Continue with BST2 traversal

WHEN top1.data === top2.data:
- Pop from both stacks
- Add both elements to result
- Move both to right subtrees
- Preserve duplicates

This ensures correct merging!

🎯 STACK MANAGEMENT:
- Push when going left
- Pop when processing element
- Peek for comparison
- Maintain inorder state

Stacks enable iterative inorder traversal!

🎯 ADVANTAGES:
- O(m + n) time complexity
- Handles duplicates correctly
- No recursion overhead
- Clear merge logic
- Handles all edge cases

🎯 DISADVANTAGES:
- O(m + n) space for result
- Requires BST property
- Not in-place merging
- Stack space overhead

🎯 REAL-WORLD APPLICATIONS:
- Database query result merging
- Sorted data consolidation
- Multi-source data integration
- Time-series data merging
- Log file consolidation
- Distributed system data merging

🎯 RELATED PROBLEMS:
- Merge two sorted arrays
- Merge k sorted lists
- Union of two BSTs
- Intersection of two BSTs
- Merge sort implementation
- External sorting

🎯 TESTING STRATEGY:
- Empty BSTs
- Single node BSTs
- Identical BSTs
- No overlapping elements
- All elements same
- Balanced vs unbalanced trees

🎯 DEBUGGING TIPS:
- Print stack states
- Trace comparison decisions
- Verify element order
- Check duplicate handling
- Monitor stack operations

🎯 COMMON MISTAKES:
- Not handling empty stacks
- Wrong comparison logic
- Not preserving duplicates
- Incorrect stack management
- Missing edge cases

🎯 BEST PRACTICES:
- Use clear variable names
- Handle all edge cases
- Preserve duplicates
- Test with various inputs
- Verify sorted order

🎯 INTERVIEW TIPS:
- Explain merge logic
- Discuss time complexity
- Show stack operations
- Walk through example
- Analyze space complexity
- Compare with recursive approach

🎯 MERGE ALGORITHM PATTERN:
1. Initialize stacks and pointers
2. Go left in both trees
3. Compare stack tops
4. Pop smaller element
5. Add to result
6. Move to right subtree
7. Repeat until both empty

This gives optimal merging!

🎯 SIMULTANEOUS TRAVERSAL:
- Use two stacks
- Maintain inorder state
- Compare at each step
- Merge efficiently
- Handle all cases

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH:
function mergeBSTs(root1, root2) {
    let arr1 = [], arr2 = [];
    function inorder(node, arr) {
        if (!node) return;
        inorder(node.left, arr);
        arr.push(node.data);
        inorder(node.right, arr);
    }
    inorder(root1, arr1);
    inorder(root2, arr2);
    return merge(arr1, arr2);
}

OPTIMIZED APPROACH:
- O(m + n) vs O(m + n) time
- O(m + n) vs O(m + n) space
- Simultaneous vs separate traversal
- Stack-based vs recursive

🎯 CONCLUSION:
Merging two BSTs is efficiently achieved using simultaneous iterative inorder
traversal with merge logic, maintaining stacks for both trees, comparing elements
at stack tops, and merging them in sorted order while preserving duplicates,
achieving O(m + n) time and space complexity!
*/