/* Problem: ✅✅✅✅ Print Nodes in Range ✅✅✅✅

Given a Binary Search Tree (BST) and a range [low, high], print all nodes 
that fall within the given range in sorted order.

The BST property ensures that:
- Left subtree contains nodes < current node
- Right subtree contains nodes > current node
- Inorder traversal gives sorted order

You are given the root of a BST and two integers low and high. 
Return an array of all node values in the range [low, high] in sorted order.

Example 1:
Input:
      4
     / \
    2   6
   / \ / \
  1  3 5  7
low = 3, high = 6

Output: [3, 4, 5, 6]
Explanation: Nodes with values 3, 4, 5, 6 are in range [3, 6]

Example 2:
Input:
      8
     / \
    4   12
   / \  / \
  2  6 10 14
low = 5, high = 10

Output: [6, 8, 10]
Explanation: Nodes with values 6, 8, 10 are in range [5, 10]

Example 3:
Input:
      5
     / \
    3   7
   / \   \
  2  4    8
low = 1, high = 3

Output: [2, 3]
Explanation: Nodes with values 2, 3 are in range [1, 3]

Constraints:
- 1 ≤ number of nodes ≤ 10^4
- 1 ≤ node.data ≤ 10^5
- low ≤ high

Expected Complexities:
Time Complexity: O(n) - visit each node once in worst case
Auxiliary Space: O(h) - stack space for recursion/iteration
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// ✅ TC = O(n) - visit each node once
// ✅ SC = O(h) - stack space for iteration
function printNearNodes(root, low, high) {
    let res = []
    let st = []
    let curr = root
    while(curr || st.length > 0){
        while(curr){
            st.push(curr)
            curr = curr.left
        }
        
        curr = st.pop()
        if(curr.data >= low && curr.data <=high){
            res.push(curr.data)
        }
        
        if(curr.data < high){
            // If curr node < high, move to right subtree
            curr = curr.right  // ⭐⭐ MOVE TO RIGHT SUBTREE
        }else{
            /* Otherwise skip the right subtree. 
               But don't break the loop immidiately after encountering node >= high, 
              that's not safe, because there might still be smaller nodes (<= high) in the left subtrees of nodes still in the stack.
            */
              curr = null  // ⭐⭐ SKIP RIGHT SUBTREE
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
console.log("Test 1:", printNearNodes(root1, 3, 6)); // [3, 4, 5, 6]

let root2 = new Node(8);
root2.left = new Node(4);
root2.right = new Node(12);
root2.left.left = new Node(2);
root2.left.right = new Node(6);
root2.right.left = new Node(10);
root2.right.right = new Node(14);
console.log("Test 2:", printNearNodes(root2, 5, 10)); // [6, 8, 10]

let root3 = new Node(5);
root3.left = new Node(3);
root3.right = new Node(7);
root3.left.left = new Node(2);
root3.left.right = new Node(4);
root3.right.right = new Node(8);
console.log("Test 3:", printNearNodes(root3, 1, 3)); // [2, 3]

/*🎯 CORE IDEA: Use iterative inorder traversal with early termination optimization.
Traverse BST in sorted order (inorder) and collect nodes within range [low, high].
Optimize by skipping right subtree when current node >= high, since all nodes
in right subtree will be >= current node (BST property).

📋 STEP-BY-STEP FLOW:

1️⃣ ITERATIVE INORDER SETUP:
   - Use stack for iterative traversal
   - Start with root node
   - Initialize result array
   - Process nodes in sorted order

2️⃣ LEFT SUBTREE TRAVERSAL:
   - Go as left as possible
   - Push all left nodes to stack
   - Build path to leftmost node
   - Maintain inorder property

3️⃣ PROCESS CURRENT NODE:
   - Pop node from stack
   - Check if node.data in range [low, high]
   - Add to result if within range
   - Node processed in sorted order

4️⃣ RIGHT SUBTREE DECISION:
   - If node.data < high: explore right subtree
   - If node.data >= high: skip right subtree
   - Early termination optimization
   - Prevents unnecessary traversal

5️⃣ CONTINUE TRAVERSAL:
   - Move to right child if needed
   - Continue until stack empty
   - All nodes processed in order
   - Return sorted result array

🧠 WHY THIS APPROACH?
- BST inorder gives sorted order
- Iterative avoids recursion overhead
- Early termination saves time
- Range check filters nodes
- O(n) time with optimization

💡 KEY INSIGHTS:
- Inorder traversal = sorted order
- Skip right subtree when node >= high
- Stack maintains traversal state
- Range check: low <= data <= high
- Early termination optimization
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Print Nodes in Range [3, 6]

INPUT BST:
      4
     / \
    2   6
   / \ / \
  1  3 5  7

RANGE: [3, 6]
EXPECTED OUTPUT: [3, 4, 5, 6]

🎯 GOAL: Find all nodes with values between 3 and 6 inclusive!

🔍 STEP-BY-STEP PROCESS:

ITERATIVE INORDER TRAVERSAL:

STEP 1: Go left from root (4)
Stack: [4]
Current: 2

STEP 2: Go left from 2
Stack: [4, 2]
Current: 1

STEP 3: 1 has no left child
Stack: [4, 2]
Current: 1

STEP 4: Process 1
Pop: 1
Check: 1 >= 3? No (1 < 3)
Skip: Don't add to result
Right subtree: 1 < 6? Yes, explore right
Current: null (1 has no right child)

STEP 5: Process 2
Pop: 2
Check: 2 >= 3? No (2 < 3)
Skip: Don't add to result
Right subtree: 2 < 6? Yes, explore right
Current: 3

STEP 6: Process 3
Pop: 3
Check: 3 >= 3? Yes, 3 <= 6? Yes ✓
Add: 3 to result
Result: [3]
Right subtree: 3 < 6? Yes, explore right
Current: null (3 has no right child)

STEP 7: Process 4
Pop: 4
Check: 4 >= 3? Yes, 4 <= 6? Yes ✓
Add: 4 to result
Result: [3, 4]
Right subtree: 4 < 6? Yes, explore right
Current: 6

STEP 8: Go left from 6
Stack: [6]
Current: 5

STEP 9: Process 5
Pop: 5
Check: 5 >= 3? Yes, 5 <= 6? Yes ✓
Add: 5 to result
Result: [3, 4, 5]
Right subtree: 5 < 6? Yes, explore right
Current: null (5 has no right child)

STEP 10: Process 6
Pop: 6
Check: 6 >= 3? Yes, 6 <= 6? Yes ✓
Add: 6 to result
Result: [3, 4, 5, 6]
Right subtree: 6 < 6? No (6 >= 6)
Skip: Don't explore right subtree
Current: null

STEP 11: Stack empty, traversal complete

🏆 FINAL RESULT: [3, 4, 5, 6]

─────────────────────────────────────────

📊 EXAMPLE 2: Early Termination Optimization

INPUT BST:
      8
     / \
    4   12
   / \  / \
  2  6 10 14

RANGE: [5, 10]
EXPECTED OUTPUT: [6, 8, 10]

PROCESS:

Process nodes in inorder: 2, 4, 6, 8, 10, 12, 14

STEP 1: Process 2
Check: 2 >= 5? No
Skip: Don't add
Right: 2 < 10? Yes, explore right

STEP 2: Process 4
Check: 4 >= 5? No
Skip: Don't add
Right: 4 < 10? Yes, explore right

STEP 3: Process 6
Check: 6 >= 5? Yes, 6 <= 10? Yes ✓
Add: 6 to result
Result: [6]
Right: 6 < 10? Yes, explore right

STEP 4: Process 8
Check: 8 >= 5? Yes, 8 <= 10? Yes ✓
Add: 8 to result
Result: [6, 8]
Right: 8 < 10? Yes, explore right

STEP 5: Process 10
Check: 10 >= 5? Yes, 10 <= 10? Yes ✓
Add: 10 to result
Result: [6, 8, 10]
Right: 10 < 10? No (10 >= 10)
Skip: Don't explore right subtree (12, 14)
Early termination!

🏆 RESULT: [6, 8, 10]

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
Result: [6, 8, 10]

─────────────────────────────────────────

📊 OPTIMIZATION ANALYSIS:

WITHOUT OPTIMIZATION:
- Process all nodes: 2, 4, 6, 8, 10, 12, 14
- Check range for each: 7 operations
- Time: O(n)

WITH EARLY TERMINATION:
- Process until node >= high: 2, 4, 6, 8, 10
- Skip right subtree of 10: Skip 12, 14
- Time: O(k) where k = nodes processed
- Better when range is small!

─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

INITIAL:
Stack: []
Current: 8

GO LEFT:
Stack: [8]
Current: 4

GO LEFT:
Stack: [8, 4]
Current: 2

GO LEFT:
Stack: [8, 4, 2]
Current: null

PROCESS 2:
Pop: 2
Stack: [8, 4]
Current: null (no right child)

PROCESS 4:
Pop: 4
Stack: [8]
Current: 6

PROCESS 6:
Pop: 6
Stack: [8]
Current: null (no right child)

PROCESS 8:
Pop: 8
Stack: []
Current: 12

GO LEFT FROM 12:
Stack: [12]
Current: 10

PROCESS 10:
Pop: 10
Stack: [12]
Current: null (no right child)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ BST INORDER PROPERTY:
   - Left < Root < Right
   - Inorder gives sorted order
   - Natural for range queries
   - Efficient traversal

2️⃣ ITERATIVE IMPLEMENTATION:
   - Stack maintains state
   - No recursion overhead
   - Easy to optimize
   - Clear control flow

3️⃣ EARLY TERMINATION:
   - Skip right when node >= high
   - BST property: right subtree >= node
   - Saves unnecessary work
   - Improves performance

4️⃣ RANGE CHECKING:
   - Simple comparison: low <= data <= high
   - Add to result if in range
   - Filter unwanted nodes
   - Maintain sorted order

5️⃣ STACK MANAGEMENT:
   - Push when going left
   - Pop when processing
   - Maintain traversal order
   - Handle backtracking

💡 KEY INSIGHT:
Using iterative inorder traversal with early termination optimization, where we
skip right subtrees when current node >= high (since all right descendants will
be >= current node due to BST property), achieving O(n) time with practical
optimization for small ranges!

🎯 TIME COMPLEXITY ANALYSIS:
- Worst case: O(n) - visit all nodes
- Best case: O(k) - visit k nodes until range end
- Average: O(k + log n) - depends on range size
- k = number of nodes in range
- Early termination helps for small ranges

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack space: O(h) where h = height
- Result array: O(k) where k = nodes in range
- Total: O(h + k)
- For balanced BST: O(log n + k)

🎯 EDGE CASES:

CASE 1: Empty Tree
Input: null, low=1, high=5
Result: []
Output: []

CASE 2: Single Node in Range
Input: Node(3), low=1, high=5
Process: 3 >= 1? Yes, 3 <= 5? Yes
Result: [3]
Output: [3]

CASE 3: Single Node Outside Range
Input: Node(3), low=5, high=10
Process: 3 >= 5? No
Result: []
Output: []

CASE 4: All Nodes in Range
Input: Complete BST 1-7, low=1, high=7
Process: All nodes processed
Result: [1, 2, 3, 4, 5, 6, 7]
Output: [1, 2, 3, 4, 5, 6, 7]

CASE 5: No Nodes in Range
Input: BST 1-7, low=10, high=15
Process: Early termination at first node
Result: []
Output: []

CASE 6: Range at Tree Boundaries
Input: BST 1-7, low=1, high=1
Process: Only process 1
Result: [1]
Output: [1]

🎯 ALGORITHM CORRECTNESS:
- Processes nodes in sorted order: ✓
- Includes all nodes in range: ✓
- Excludes all nodes outside range: ✓
- Maintains sorted output: ✓
- Handles all tree structures: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 3: Initialize result array
- Line 4: Initialize stack
- Line 5: Main traversal loop
- Line 6-9: Go left (build stack)
- Line 11: Pop and process node
- Line 12: Range check
- Line 13: Add to result if in range
- Line 16-25: Right subtree decision
- Line 28: Return sorted result

🎯 EARLY TERMINATION LOGIC:
if (curr.data < high) {
    curr = curr.right;  // Explore right subtree
} else {
    curr = null;       // Skip right subtree
}

Why skip when curr.data >= high?
- BST property: right subtree >= current node
- If current >= high, all right descendants >= high
- No nodes in right subtree can be <= high
- Safe to skip entire right subtree

🎯 STACK OPERATIONS:
PUSH: When going left (build path)
POP: When processing node (inorder)
EMPTY: When traversal complete

Stack maintains inorder traversal state!

🎯 ADVANTAGES:
- O(n) time complexity
- Early termination optimization
- No recursion overhead
- Clear and readable code
- Handles all edge cases
- Maintains sorted order

🎯 DISADVANTAGES:
- Still O(n) in worst case
- Stack space overhead
- More complex than recursive
- Requires BST property

🎯 REAL-WORLD APPLICATIONS:
- Database range queries
- Sorted data filtering
- Time-series data analysis
- Geographic range searches
- Price range filtering
- Date range queries

🎯 RELATED PROBLEMS:
- Range Sum Query
- Count nodes in range
- Delete nodes in range
- Merge two BSTs
- Convert BST to sorted array
- Find kth smallest element

🎯 TESTING STRATEGY:
- Empty tree
- Single node (in/out range)
- All nodes in range
- No nodes in range
- Range at boundaries
- Skewed trees
- Large ranges vs small ranges

🎯 DEBUGGING TIPS:
- Print stack state
- Trace node processing
- Verify range checks
- Check early termination
- Validate sorted output

🎯 COMMON MISTAKES:
- Wrong range check (missing =)
- Not handling empty tree
- Incorrect early termination
- Stack underflow
- Not maintaining sorted order

🎯 BEST PRACTICES:
- Use iterative inorder
- Implement early termination
- Handle edge cases
- Clear variable names
- Test with various ranges
- Verify BST property usage

🎯 INTERVIEW TIPS:
- Explain BST inorder property
- Discuss early termination
- Show stack operations
- Walk through example
- Analyze complexity
- Compare with recursive approach

🎯 INORDER TRAVERSAL PATTERN:
1. Go left as far as possible
2. Process current node
3. Go right
4. Repeat until done

This gives sorted order in BST!

🎯 RANGE QUERY OPTIMIZATION:
- Use BST properties
- Early termination
- Skip unnecessary subtrees
- Maintain sorted order
- Efficient filtering

🎯 COMPARISON WITH RECURSIVE:

RECURSIVE APPROACH:
function printNearNodes(root, low, high) {
    let result = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        if (node.data >= low && node.data <= high) {
            result.push(node.data);
        }
        inorder(node.right);
    }
    inorder(root);
    return result;
}

ITERATIVE APPROACH:
- No recursion overhead
- Early termination possible
- Stack control
- Better for large trees
- More complex implementation

🎯 CONCLUSION:
Printing nodes in range is efficiently achieved using iterative inorder traversal
with early termination optimization, leveraging BST properties to skip unnecessary
subtrees when current node >= high, achieving O(n) time with practical optimization
for small ranges and O(h) space complexity!
*/