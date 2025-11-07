/* Problem: ✅✅✅✅ Count Nodes in Range ✅✅✅✅

Given a Binary Search Tree (BST) and a range [low, high], count the number of nodes 
that fall within the given range.

The BST property ensures that:
- Left subtree contains nodes < current node
- Right subtree contains nodes > current node
- We can optimize traversal by skipping subtrees outside the range

You are given the root of a BST and two integers low and high. 
Return the count of all node values in the range [low, high].

Example 1:
Input:
      4
     / \
    2   6
   / \ / \
  1  3 5  7
low = 3, high = 6

Output: 4
Explanation: Nodes with values 3, 4, 5, 6 are in range [3, 6]. Count = 4.

Example 2:
Input:
      8
     / \
    4   12
   / \  / \
  2  6 10 14
low = 5, high = 10

Output: 3
Explanation: Nodes with values 6, 8, 10 are in range [5, 10]. Count = 3.

Example 3:
Input:
      5
     / \
    3   7
   / \   \
  2  4    8
low = 1, high = 3

Output: 2
Explanation: Nodes with values 2, 3 are in range [1, 3]. Count = 2.

Constraints:
- 1 ≤ number of nodes ≤ 10^4
- 1 ≤ node.data ≤ 10^5
- low ≤ high

Expected Complexities:
Time Complexity: O(n) - visit each node once in worst case
Auxiliary Space: O(h) - recursion stack space
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// NOTE: Just count, so order doesn't matter.

// ✅ TC = O(n) - visit each node once
// ✅ SC = O(h) - recursion stack space
// 1. Inorder traversal
function countNodesInRange(root, l, h) {
    let c = 0
    inorder(root)
    return c
    
    function inorder(root){
        if(!root) return
        
        if(root.data > l){
            inorder(root.left)
        }
        
        if(root.data >= l && root.data <= h) c++
        
        if(root.data < h){
            inorder(root.right)
        }
    }
}

// 2. Preorder traversal
function countNodesInRange(root, l, h) {
    let c = 0
    preorder(root)
    return c
    
    function preorder(root){
        if(!root) return
        
        if(root.data >= l && root.data <= h) c++
        
        if(root.data > l){
            preorder(root.left)
        }
        
        if(root.data < h){
            preorder(root.right)
        }
    }
}

// 3. Postorder traversal
function countNodesInRange(root, l, h) {
    let c = 0
    postorder(root)
    return c
    
    function postorder(root){
        if(!root) return
        
        if(root.data > l){
            postorder(root.left)
        }
    }
    
    if(root.data < h){
        postorder(root.right)
    }
}

// 4. Iterative approach (Inorder)
function countNodesInRange(root, l, h) {
    let c = 0
    let st = []
    let curr = root
    
    while(curr || st.length > 0){
        while(curr){
            st.push(curr)
            curr = curr.left
        }
    }
    
    curr = st.pop()
    
    if(curr.data >= l && curr.data <= h) c++
    
    if(curr.data < h){
        curr = curr.right
    }
    
    return c
}

// 5. Iterative approach (Preorder)
function countNodesInRange(root, l, h) {
    let c = 0
    let st = [root]
    
    while(st.length > 0){
        let curr = st.pop()
        
        if(curr.data >= l && curr.data <= h) c++
        
        if(curr.right && curr.data < h){
            st.push(curr.right)
        }
        
        if(curr.left && curr.data > l){
            st.push(curr.left)
        }
    }
    
    return c
}

// Test cases
let root1 = new Node(4);
root1.left = new Node(2);
root1.right = new Node(6);
root1.left.left = new Node(1);
root1.left.right = new Node(3);
root1.right.left = new Node(5);
root1.right.right = new Node(7);
console.log("Test 1:", countNodesInRange(root1, 3, 6)); // 4

let root2 = new Node(8);
root2.left = new Node(4);
root2.right = new Node(12);
root2.left.left = new Node(2);
root2.left.right = new Node(6);
root2.right.left = new Node(10);
root2.right.right = new Node(14);
console.log("Test 2:", countNodesInRange(root2, 5, 10)); // 3

let root3 = new Node(5);
root3.left = new Node(3);
root3.right = new Node(7);
root3.left.left = new Node(2);
root3.left.right = new Node(4);
root3.right.right = new Node(8);
console.log("Test 3:", countNodesInRange(root3, 1, 3)); // 2

/*🎯 CORE IDEA: Use optimized inorder traversal with early termination.
Traverse BST and count nodes within range [low, high]. Optimize by skipping
subtrees that cannot contain nodes in the range using BST properties.

📋 STEP-BY-STEP FLOW:

1️⃣ INORDER TRAVERSAL SETUP:
   - Use recursive inorder traversal
   - Initialize counter to 0
   - Process nodes in sorted order
   - Apply range optimizations

2️⃣ LEFT SUBTREE OPTIMIZATION:
   - If node.data > low: explore left subtree
   - If node.data <= low: skip left subtree
   - Left subtree contains smaller values
   - May still have nodes >= low

3️⃣ PROCESS CURRENT NODE:
   - Check if node.data in range [low, high]
   - Increment counter if within range
   - Node processed in sorted order
   - Count maintained globally

4️⃣ RIGHT SUBTREE OPTIMIZATION:
   - If node.data < high: explore right subtree
   - If node.data >= high: skip right subtree
   - Right subtree contains larger values
   - May still have nodes <= high

5️⃣ RETURN COUNT:
   - Return total count of nodes in range
   - Counter accumulated during traversal
   - Efficient with optimizations

🧠 WHY THIS APPROACH?
- BST properties enable optimizations
- Inorder gives sorted processing
- Skip subtrees outside range
- Simple counting logic
- O(n) time with practical optimization

💡 KEY INSIGHTS:
- Skip left subtree when node <= low
- Skip right subtree when node >= high
- Count nodes in range during traversal
- BST properties enable early termination
- Simple and efficient approach
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Count Nodes in Range [3, 6]

INPUT BST:
      4
     / \
    2   6
   / \ / \
  1  3 5  7

RANGE: [3, 6]
EXPECTED OUTPUT: 4

🎯 GOAL: Count all nodes with values between 3 and 6 inclusive!

🔍 STEP-BY-STEP PROCESS:

OPTIMIZED INORDER TRAVERSAL:

STEP 1: Start at root (4)
Check: 4 > 3? Yes, explore left subtree
Go to left child: 2

STEP 2: At node 2
Check: 2 > 3? No, skip left subtree
Process: 2 >= 3? No, don't count
Check: 2 < 6? Yes, explore right subtree
Go to right child: 3

STEP 3: At node 3
Check: 3 > 3? No, skip left subtree
Process: 3 >= 3? Yes, 3 <= 6? Yes ✓
Count: c = 1
Check: 3 < 6? Yes, explore right subtree
Go to right child: null

STEP 4: Back to node 2
Check: 2 < 6? Yes, explore right subtree
Already processed, go back to root

STEP 5: At root (4)
Check: 4 > 3? Yes, explore left subtree
Already processed
Process: 4 >= 3? Yes, 4 <= 6? Yes ✓
Count: c = 2
Check: 4 < 6? Yes, explore right subtree
Go to right child: 6

STEP 6: At node 6
Check: 6 > 3? Yes, explore left subtree
Go to left child: 5

STEP 7: At node 5
Check: 5 > 3? Yes, explore left subtree
Go to left child: null
Process: 5 >= 3? Yes, 5 <= 6? Yes ✓
Count: c = 3
Check: 5 < 6? Yes, explore right subtree
Go to right child: null

STEP 8: Back to node 6
Process: 6 >= 3? Yes, 6 <= 6? Yes ✓
Count: c = 4
Check: 6 < 6? No, skip right subtree
Go to right child: null

STEP 9: Back to root
Check: 4 < 6? Yes, explore right subtree
Already processed

🏆 FINAL RESULT: 4

─────────────────────────────────────────

📊 EXAMPLE 2: Early Termination Optimization

INPUT BST:
      8
     / \
    4   12
   / \  / \
  2  6 10 14

RANGE: [5, 10]
EXPECTED OUTPUT: 3

PROCESS:

STEP 1: At root (8)
Check: 8 > 5? Yes, explore left subtree
Go to left child: 4

STEP 2: At node 4
Check: 4 > 5? No, skip left subtree
Process: 4 >= 5? No, don't count
Check: 4 < 10? Yes, explore right subtree
Go to right child: 6

STEP 3: At node 6
Check: 6 > 5? Yes, explore left subtree
Go to left child: null
Process: 6 >= 5? Yes, 6 <= 10? Yes ✓
Count: c = 1
Check: 6 < 10? Yes, explore right subtree
Go to right child: null

STEP 4: Back to node 4
Check: 4 < 10? Yes, explore right subtree
Already processed, go back to root

STEP 5: At root (8)
Check: 8 > 5? Yes, explore left subtree
Already processed
Process: 8 >= 5? Yes, 8 <= 10? Yes ✓
Count: c = 2
Check: 8 < 10? Yes, explore right subtree
Go to right child: 12

STEP 6: At node 12
Check: 12 > 5? Yes, explore left subtree
Go to left child: 10

STEP 7: At node 10
Check: 10 > 5? Yes, explore left subtree
Go to left child: null
Process: 10 >= 5? Yes, 10 <= 10? Yes ✓
Count: c = 3
Check: 10 < 10? No, skip right subtree
Go to right child: null

STEP 8: Back to node 12
Process: 12 >= 5? Yes, 12 <= 10? No, don't count
Check: 12 < 10? No, skip right subtree
Early termination!

🏆 RESULT: 3

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

BST PROPERTY VISUALIZATION:
      8
     / \
    4   12
   / \  / \
  2  6 10 14

Inorder traversal: 2, 4, 6, 8, 10, 12, 14
Range [5, 10]:     ✗, ✗, ✓, ✓, ✓, ✗, ✗
Count: 3

─────────────────────────────────────────

📊 OPTIMIZATION ANALYSIS:

WITHOUT OPTIMIZATION:
- Process all nodes: 2, 4, 6, 8, 10, 12, 14
- Check range for each: 7 operations
- Time: O(n)

WITH EARLY TERMINATION:
- Skip left when node <= low
- Skip right when node >= high
- Process only relevant nodes
- Time: O(k) where k = relevant nodes

─────────────────────────────────────────

📊 TRAVERSAL ORDER VISUALIZATION:

INORDER TRAVERSAL PATH:
      4
     / \
    2   6
   / \ / \
  1  3 5  7

Traversal order: 1, 2, 3, 4, 5, 6, 7
Range [3, 6]:    ✗, ✗, ✓, ✓, ✓, ✓, ✗
Count: 4

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ BST PROPERTY UTILIZATION:
   - Left subtree < current node
   - Right subtree > current node
   - Enables range-based pruning
   - Efficient subtree skipping

2️⃣ INORDER TRAVERSAL:
   - Processes nodes in sorted order
   - Natural for range queries
   - Easy to optimize
   - Maintains BST properties

3️⃣ EARLY TERMINATION:
   - Skip left when node <= low
   - Skip right when node >= high
   - Reduces unnecessary work
   - Improves performance

4️⃣ SIMPLE COUNTING:
   - Global counter variable
   - Increment when in range
   - No complex data structures
   - Easy to understand

5️⃣ RECURSIVE STRUCTURE:
   - Clean and readable
   - Easy to implement
   - Natural tree traversal
   - Handles all cases

💡 KEY INSIGHT:
Using optimized inorder traversal with early termination, where we skip left
subtrees when current node <= low (since all left descendants will be <= low)
and skip right subtrees when current node >= high (since all right descendants
will be >= high), achieving O(n) time with practical optimization!

🎯 TIME COMPLEXITY ANALYSIS:
- Worst case: O(n) - visit all nodes
- Best case: O(k) - visit k relevant nodes
- Average: O(k + log n) - depends on range size
- k = number of nodes in range
- Early termination helps for small ranges

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack: O(h) where h = height
- Counter variable: O(1)
- Total: O(h)
- For balanced BST: O(log n)

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null, low=1, high=5
Result: 0
Output: 0

CASE 2: Single Node in Range
Input: Node(3), low=1, high=5
Process: 3 >= 1? Yes, 3 <= 5? Yes
Result: 1
Output: 1

CASE 3: Single Node Outside Range
Input: Node(3), low=5, high=10
Process: 3 >= 5? No
Result: 0
Output: 0

CASE 4: All Nodes in Range
Input: Complete BST 1-7, low=1, high=7
Process: All nodes processed
Result: 7
Output: 7

CASE 5: No Nodes in Range
Input: BST 1-7, low=10, high=15
Process: Early termination
Result: 0
Output: 0

CASE 6: Range at Tree Boundaries
Input: BST 1-7, low=1, high=1
Process: Only process 1
Result: 1
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Processes all relevant nodes: ✓
- Counts all nodes in range: ✓
- Skips irrelevant subtrees: ✓
- Handles all tree structures: ✓
- Maintains BST properties: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 5: Initialize counter
- Line 6: Start inorder traversal
- Line 7: Return count
- Line 9-21: Recursive inorder function
- Line 10: Base case
- Line 12-14: Left subtree optimization
- Line 16: Range check and count
- Line 18-20: Right subtree optimization

🎯 OPTIMIZATION LOGIC:

LEFT SUBTREE SKIP:
if (root.data > l) {
    inorder(root.left);
}

Why skip when root.data <= l?
- BST property: left subtree < current node
- If current <= low, all left descendants <= low
- No nodes in left subtree can be >= low
- Safe to skip entire left subtree

RIGHT SUBTREE SKIP:
if (root.data < h) {
    inorder(root.right);
}

Why skip when root.data >= h?
- BST property: right subtree > current node
- If current >= high, all right descendants >= high
- No nodes in right subtree can be <= high
- Safe to skip entire right subtree

🎯 TRAVERSAL PATTERN:
1. Check if left subtree relevant
2. Process current node
3. Check if right subtree relevant
4. Recursively traverse relevant subtrees

This ensures efficient range counting!

🎯 ADVANTAGES:
- O(n) time complexity
- Early termination optimization
- Simple and readable code
- Handles all edge cases
- Uses BST properties effectively

🎯 DISADVANTAGES:
- Still O(n) in worst case
- Recursion stack overhead
- Requires BST property
- No parallel processing

🎯 REAL-WORLD APPLICATIONS:
- Database range count queries
- Statistical analysis
- Data filtering and aggregation
- Time-series data counting
- Geographic range queries
- Price range analysis

🎯 RELATED PROBLEMS:
- Print nodes in range
- Range sum query
- Delete nodes in range
- Count BST nodes
- Range minimum query
- Kth smallest element

🎯 TESTING STRATEGY:
- Empty tree
- Single node (in/out range)
- All nodes in range
- No nodes in range
- Range at boundaries
- Skewed trees
- Large ranges vs small ranges

🎯 DEBUGGING TIPS:
- Print node values during traversal
- Trace optimization decisions
- Verify range checks
- Check counter increments
- Validate BST properties

🎯 COMMON MISTAKES:
- Wrong range check (missing =)
- Not handling empty tree
- Incorrect optimization logic
- Counter not initialized
- Wrong traversal order

🎯 BEST PRACTICES:
- Use BST properties for optimization
- Handle edge cases properly
- Clear variable names
- Test with various ranges
- Verify optimization correctness

🎯 INTERVIEW TIPS:
- Explain BST properties
- Discuss optimization strategy
- Show traversal order
- Walk through example
- Analyze complexity
- Compare with naive approach

🎯 INORDER TRAVERSAL PATTERN:
1. Go left (if relevant)
2. Process current node
3. Go right (if relevant)
4. Repeat recursively

This gives sorted order in BST!

🎯 RANGE QUERY OPTIMIZATION:
- Use BST properties
- Early termination
- Skip irrelevant subtrees
- Efficient counting
- Practical performance gains

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH:
function countNodesInRange(root, low, high) {
    let count = 0;
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        if (node.data >= low && node.data <= high) {
            count++;
        }
        inorder(node.right);
    }
    inorder(root);
    return count;
}

OPTIMIZED APPROACH:
- Skip left when node <= low
- Skip right when node >= high
- Same time complexity but better constants
- More efficient for small ranges

🎯 CONCLUSION:
Counting nodes in range is efficiently achieved using optimized inorder traversal
with early termination, leveraging BST properties to skip irrelevant subtrees
when current node <= low (skip left) or >= high (skip right), achieving O(n)
time with practical optimization and O(h) space complexity!
*/
