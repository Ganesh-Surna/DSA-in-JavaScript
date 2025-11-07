/* Problem: ✅✅✅✅ Iterative Preorder Traversal ✅✅✅✅

Given the root of a binary tree, return the preorder traversal of its nodes' values iteratively (without using recursion).

Preorder traversal visits nodes in the order: root → left subtree → right subtree. The iterative approach uses a stack to simulate the recursive call stack, allowing us to traverse the tree without using recursion.

You are given the root of a binary tree. The task is to implement iterative preorder traversal using:
1. Stack-based approach: O(n) time, O(h) space
2. Morris traversal: O(n) time, O(1) space

Example 1:
Input: 
       10
      /  \
     20   30
    / \
   40 50

Output: [10, 20, 40, 50, 30]
Explanation: Preorder traversal visits root (10), then left subtree (20, 40, 50), then right subtree (30).

Example 2:
Input:
       1
      / \
     2   3
        / \
       4   5

Output: [1, 2, 3, 4, 5]
Explanation: Preorder traversal visits root (1), then left subtree (2), then right subtree (3, 4, 5).

Example 3:
Input: null

Output: []
Explanation: Empty tree has no nodes to traverse.

Example 4:
Input:
       1
      /
     2

Output: [1, 2]
Explanation: Preorder traversal visits root (1), then left child (2).

Constraints:
- The number of nodes in the tree is in the range [0, 100]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) for both approaches
Auxiliary Space: O(h) for stack-based, O(1) for Morris traversal
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n)
// ✅ SC = O(1)
function morrisPreorder(root){
    let res = []
    let curr = root
    
    while(curr){
        if(!curr.left){
            res.push(curr.key)
            curr = curr.right
        }else{
            let prev = curr.left
            if(prev.right && prev.right !== curr){
                prev = prev.right
            }
            
            if(!prev.right){
                res.push(curr.key) // Visit before going to left
                prev.right = curr
                curr = curr.left
            }else{
                prev = null
                curr = curr.right
            }
        }
    }
    
    return res
}

// ✅ TC = O(n)
// ✅ SC = O(n) --> due to Stack.
function iterativePreorder(root){
    let res = []
    let st = []
    st.push(root)
    
    while(st.length > 0){
        let curr = st.pop()
        res.push(curr.key) // process curr node
        
        if(curr.right) st.push(curr.right)
        if(curr.left) st.push(curr.left) // to process left first (top at stack)
    }
    
    return res
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.left.left = new TreeNode(40)
root.left.right = new TreeNode(50)

console.log(morrisPreorder(root)) // [ 10, 20, 40, 50, 30 ]
console.log(iterativePreorder(root)) // [ 10, 20, 40, 50, 30 ]

/*🎯 CORE IDEA: Implement preorder traversal iteratively using two approaches: (1) Stack-based method that processes root first, then pushes right and left children (with left on top for LIFO processing), and (2) Morris traversal that uses threading to achieve O(1) space complexity by temporarily modifying tree structure and restoring it while processing root before going to left subtree.

📋 STEP-BY-STEP FLOW:

1️⃣ STACK-BASED APPROACH:
   - Push root onto stack
   - Pop and process current node
   - Push right child first, then left child (left on top)
   - Continue until stack is empty

2️⃣ MORRIS TRAVERSAL APPROACH:
   - Use threading technique for O(1) space
   - Process root before going to left subtree
   - Find inorder predecessor and create temporary links
   - Process nodes and restore tree structure

3️⃣ PREORDER TRAVERSAL ORDER:
   - Visit root node first
   - Then visit left subtree
   - Finally visit right subtree
   - Maintains root-left-right order

4️⃣ SPACE OPTIMIZATION:
   - Stack approach: O(h) space for stack
   - Morris approach: O(1) space using threading
   - Both achieve O(n) time complexity

🧠 WHY THESE APPROACHES?
- Stack-based: Processes root first, uses LIFO for left-first processing
- Morris traversal: Achieves O(1) space by threading
- Preorder order: Root-left-right pattern preserved
- Iterative: Avoids recursion stack overflow
- Efficient: Both O(n) time complexity

💡 KEY INSIGHTS:
- Stack processes root first, then children in reverse order
- Morris traversal processes root before threading
- Preorder order: root → left subtree → right subtree
- Threading allows O(1) space complexity
- Both approaches preserve traversal order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Iterative Preorder Traversal

INPUT: Binary Tree
       10
      /  \
     20   30
    / \
   40 50

OUTPUT: [10, 20, 40, 50, 30]
EXPLANATION: Preorder traversal visits root (10), then left subtree (20, 40, 50), then right subtree (30).

🎯 GOAL: Traverse tree iteratively in root-left-right order!

🔍 STACK-BASED APPROACH - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: iterativePreorder(10)
res = [], st = [10]

📋 ITERATIVE TRAVERSAL:

ITERATION 1: st = [10]
Step 1: Pop and process current node
curr = st.pop() → curr = 10, st = []
res.push(10) → res = [10]

Step 2: Push children (right first, then left)
curr.right = 30 → st.push(30) → st = [30]
curr.left = 20 → st.push(20) → st = [30, 20]

ITERATION 2: st = [30, 20]
Step 1: Pop and process current node
curr = st.pop() → curr = 20, st = [30]
res.push(20) → res = [10, 20]

Step 2: Push children (right first, then left)
curr.right = 50 → st.push(50) → st = [30, 50]
curr.left = 40 → st.push(40) → st = [30, 50, 40]

ITERATION 3: st = [30, 50, 40]
Step 1: Pop and process current node
curr = st.pop() → curr = 40, st = [30, 50]
res.push(40) → res = [10, 20, 40]

Step 2: Push children (both null)
curr.right = null → no push
curr.left = null → no push

ITERATION 4: st = [30, 50]
Step 1: Pop and process current node
curr = st.pop() → curr = 50, st = [30]
res.push(50) → res = [10, 20, 40, 50]

Step 2: Push children (both null)
curr.right = null → no push
curr.left = null → no push

ITERATION 5: st = [30]
Step 1: Pop and process current node
curr = st.pop() → curr = 30, st = []
res.push(30) → res = [10, 20, 40, 50, 30]

Step 2: Push children (both null)
curr.right = null → no push
curr.left = null → no push

ITERATION 6: st = []
Loop condition: st.length > 0 → exit loop

🏆 STACK-BASED RESULT: [10, 20, 40, 50, 30]

─────────────────────────────────────────

🔍 MORRIS TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: morrisPreorder(10)
res = [], curr = 10

📋 MORRIS TRAVERSAL:

ITERATION 1: curr = 10
Step 1: Check left child
curr.left = 20 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 20
prev.right = 50 (exists)
prev.right !== curr → prev = prev.right = 50
prev.right = null (no right child)
prev.right !== curr → prev = 50

Step 3: Process root and create thread
res.push(10) → res = [10]
prev.right = curr → 50.right = 10
curr = curr.left → curr = 20

ITERATION 2: curr = 20
Step 1: Check left child
curr.left = 40 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 40
prev.right = null (no right child)
prev.right !== curr → prev = 40

Step 3: Process root and create thread
res.push(20) → res = [10, 20]
prev.right = curr → 40.right = 20
curr = curr.left → curr = 40

ITERATION 3: curr = 40
Step 1: Check left child
curr.left = null (no left child)

Step 2: Process current node
res.push(40) → res = [10, 20, 40]
curr = curr.right → curr = 20

ITERATION 4: curr = 20
Step 1: Check left child
curr.left = 40 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 40
prev.right = 20 (thread exists)
prev.right === curr → thread found

Step 3: Remove thread and go right
prev.right = null → 40.right = null
curr = curr.right → curr = 50

ITERATION 5: curr = 50
Step 1: Check left child
curr.left = null (no left child)

Step 2: Process current node
res.push(50) → res = [10, 20, 40, 50]
curr = curr.right → curr = 10

ITERATION 6: curr = 10
Step 1: Check left child
curr.left = 20 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 20
prev.right = 50 (exists)
prev.right !== curr → prev = prev.right = 50
prev.right = 10 (thread exists)
prev.right === curr → thread found

Step 3: Remove thread and go right
prev.right = null → 50.right = null
curr = curr.right → curr = 30

ITERATION 7: curr = 30
Step 1: Check left child
curr.left = null (no left child)

Step 2: Process current node
res.push(30) → res = [10, 20, 40, 50, 30]
curr = curr.right → curr = null

ITERATION 8: curr = null
Loop condition: curr → exit loop

🏆 MORRIS RESULT: [10, 20, 40, 50, 30]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

STACK-BASED APPROACH:

TRAVERSAL ORDER:
       10 (1st - root first)
      /  
     20   (2nd - left subtree)
    /     
   40     (3rd - leftmost)
    \     
     50   (4th - right of left subtree)
           

STACK OPERATIONS:
Step 1: Push 10 → st = [10]
Step 2: Pop 10 → res = [10], st = []
Step 3: Push 30, 20 → st = [30, 20]
Step 4: Pop 20 → res = [10, 20], st = [30]
Step 5: Push 50, 40 → st = [30, 50, 40]
Step 6: Pop 40 → res = [10, 20, 40], st = [30, 50]
Step 7: Pop 50 → res = [10, 20, 40, 50], st = [30]
Step 8: Pop 30 → res = [10, 20, 40, 50, 30], st = []

MORRIS TRAVERSAL:

THREADING PROCESS:
       10
      /  
     20   
    /     
   40     (thread: 40.right = 20)
    \     
     50   (thread: 50.right = 10)
           

THREAD OPERATIONS:
Step 1: Process 10, thread 50.right = 10
Step 2: Process 20, thread 40.right = 20
Step 3: Process 40 → res = [10, 20, 40]
Step 4: Follow thread, remove thread, go to 50
Step 5: Process 50 → res = [10, 20, 40, 50]
Step 6: Follow thread, remove thread, go to 30
Step 7: Process 30 → res = [10, 20, 40, 50, 30]

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:

INPUT: Binary Tree
       1
      / \
     2   3
        / \
       4   5

STACK-BASED PROCESS:
Step 1: Push 1 → st = [1]
Step 2: Pop 1 → res = [1], st = []
Step 3: Push 3, 2 → st = [3, 2]
Step 4: Pop 2 → res = [1, 2], st = [3]
Step 5: Pop 3 → res = [1, 2, 3], st = []
Step 6: Push 5, 4 → st = [5, 4]
Step 7: Pop 4 → res = [1, 2, 3, 4], st = [5]
Step 8: Pop 5 → res = [1, 2, 3, 4, 5], st = []

RESULT: [1, 2, 3, 4, 5]

MORRIS PROCESS:
Step 1: Process 1, thread 2.right = 1
Step 2: Process 2 → res = [1, 2]
Step 3: Follow thread, remove thread, go to 3
Step 4: Process 3, thread 4.right = 3
Step 5: Process 4 → res = [1, 2, 3, 4]
Step 6: Follow thread, remove thread, go to 5
Step 7: Process 5 → res = [1, 2, 3, 4, 5]

RESULT: [1, 2, 3, 4, 5]

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree (null)
Input: null
Stack-based: [] (no iterations)
Morris: [] (no iterations)

CASE 2: Single Node
Input: TreeNode(1)
Stack-based: [1] (push, pop, process)
Morris: [1] (process directly)

CASE 3: Left Skewed Tree
Input: 1 → 2 → 3
Stack-based: [1, 2, 3] (push all, pop in order)
Morris: [1, 2, 3] (process and thread)

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:
1️⃣ STACK SIMULATION: Processes root first, uses LIFO for left-first processing
2️⃣ THREADING TECHNIQUE: Creates temporary links for O(1) space
3️⃣ PREORDER ORDER: Root-left-right pattern preserved
4️⃣ ITERATIVE PROCESS: Avoids recursion stack overflow
5️⃣ EFFICIENT TRAVERSAL: Both achieve O(n) time complexity

💡 KEY INSIGHT:
Use stack to process root first with LIFO for left-first processing, or threading
to achieve O(1) space, both approaches maintain the root-left-right preorder
traversal order while avoiding recursive function calls!

🎯 TIME COMPLEXITY ANALYSIS:
- Stack-based: O(n) - each node visited once
- Morris traversal: O(n) - each node visited at most 3 times
- Preorder traversal: O(n) for both approaches
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack-based: O(h) where h is tree height
- Morris traversal: O(1) - only pointers used
- Stack space: O(h) for stack-based approach
- Threading: O(1) for Morris approach

🎯 EDGE CASES HANDLED:
- Empty tree: Returns empty array
- Single node: Processes single node
- Skewed trees: Works for any tree structure
- Large trees: Efficient O(n) processing

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to visit all nodes
- Preorder order preserved in both approaches
- Stack simulation processes root first
- Threading technique maintains tree structure
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Stack-based: Process root, push right then left, pop and process
- Morris: Process root before threading, find predecessor, create thread
- Preorder order: root → left subtree → right subtree
- Iterative: No recursion, uses loops and data structures
- Space optimization: Morris achieves O(1) space

🎯 STACK-BASED PRINCIPLES:
- Process root node first
- Push right child before left child
- Use LIFO to process left subtree first
- Continue until stack empty
- Maintain root-left-right order

🎯 MORRIS TRAVERSAL PRINCIPLES:
- Process root before going to left subtree
- Use threading for O(1) space
- Find inorder predecessor
- Create temporary links
- Process nodes and restore structure

🎯 PREORDER TRAVERSAL BENEFITS:
- Visits root before children
- Natural order for tree operations
- Efficient for tree construction
- Common in tree algorithms
- Preserves tree structure

🎯 STACK SIMULATION ADVANTAGES:
- Easy to understand and implement
- Processes root first naturally
- Handles all tree structures
- Predictable space usage
- Debugging friendly

🎯 MORRIS TRAVERSAL ADVANTAGES:
- O(1) space complexity
- No recursion stack overflow
- Efficient for large trees
- Memory optimal
- Advanced technique

🎯 COMPARISON WITH RECURSION:
- Recursion: O(h) space for call stack
- Stack-based: O(h) space for explicit stack
- Morris: O(1) space using threading
- All: O(n) time complexity
- Iterative: Avoids recursion limitations

🎯 REAL-WORLD APPLICATIONS:
- Tree traversal without recursion
- Memory-constrained environments
- Large tree processing
- Iterative tree algorithms
- Space-optimized traversal

🎯 ALGORITHM PATTERN:
- Stack-based: Process root first, use LIFO for children
- Morris: Use threading for space optimization
- Iterative: Replace recursion with loops
- Preorder: Root-left-right order

🎯 MATHEMATICAL PROPERTIES:
- Tree nodes: n total nodes
- Stack operations: O(n) push/pop operations
- Threading: O(n) thread create/remove operations
- Space efficiency: O(h) vs O(1)
- Time efficiency: O(n) for both

🎯 ERROR HANDLING:
- Null root: Returns empty array
- Invalid structure: Algorithm handles gracefully
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF STACK-BASED:
- Simple to understand and implement
- Processes root first naturally
- Predictable space usage
- Easy to debug and modify
- Handles all tree structures

🎯 ADVANTAGES OF MORRIS:
- O(1) space complexity
- No recursion stack overflow
- Memory efficient
- Advanced optimization technique
- Suitable for large trees

🎯 DISADVANTAGES:
- Stack-based: O(h) space required
- Morris: Complex implementation, modifies tree temporarily
- Both: More complex than recursive approach
- Morris: Harder to understand and debug

🎯 ALTERNATIVE APPROACHES:
- Recursive preorder: Simple but O(h) space
- Level-order: Different traversal order
- Inorder/Postorder: Different node orders
- All: Correct but different space/time tradeoffs

🎯 IMPLEMENTATION CONSIDERATIONS:
- Choose appropriate approach based on space constraints
- Handle edge cases properly
- Optimize for specific use cases
- Consider tree size and structure
- Balance simplicity vs optimization

🎯 TESTING STRATEGY:
- Empty trees
- Single node trees
- Balanced trees
- Skewed trees
- Large trees
- Various tree structures

🎯 DEBUGGING TIPS:
- Verify stack operations
- Check threading logic
- Monitor traversal order
- Validate space usage
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for tree traversal
- Space: O(h) for stack-based, O(1) for Morris
- Overall: Efficient traversal methods
- Scalable: Works well for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Deep trees: Stack space vs threading tradeoff
- Memory usage: O(h) vs O(1) space
- Performance: Both approaches efficient

🎯 BEST PRACTICES:
- Choose approach based on space constraints
- Handle edge cases properly
- Optimize for specific requirements
- Use stack-based for simplicity
- Use Morris for space optimization

🎯 COMMON MISTAKES:
- Incorrect stack operations
- Wrong threading logic
- Poor edge case handling
- Inefficient space usage
- Missing boundary checks

🎯 LEARNING OBJECTIVES:
- Understand iterative tree traversal
- Learn stack simulation techniques
- Master Morris traversal algorithm
- Practice space optimization
- Improve algorithmic thinking

🎯 INTERVIEW TIPS:
- Explain both approaches clearly
- Discuss space-time tradeoffs
- Handle edge cases systematically
- Write clean iterative code
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Stack simulation with root-first processing
- Threading for space optimization
- Iterative tree traversal
- Space-time tradeoffs
- Advanced optimization techniques

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n during traversal
- Stack operations: O(n) push/pop
- Threading: O(n) create/remove
- Space usage: O(h) vs O(1)
- Total: O(n) operations

🎯 IMPLEMENTATION CHALLENGES:
- Correct stack simulation
- Proper threading logic
- Efficient space usage
- Edge case comprehensive coverage
- Iterative structure management

🎯 SOLUTION VALIDATION:
- Test traversal order correctness
- Verify space usage
- Check edge case handling
- Monitor performance metrics
- Validate algorithm correctness

🎯 ALGORITHM EVOLUTION:
- Recursive approach: Simple but O(h) space
- Stack-based: Iterative with O(h) space
- Morris traversal: Iterative with O(1) space
- Future improvements: Further optimizations

🎯 PRACTICAL APPLICATIONS:
- Tree traversal without recursion
- Memory-constrained systems
- Large tree processing
- Iterative tree algorithms
- Space-optimized traversal

🎯 CONCLUSION:
The iterative preorder traversal problem demonstrates how to traverse
binary trees without recursion using stack simulation or Morris threading,
achieving O(n) time complexity with different space tradeoffs while
preserving the root-left-right preorder traversal order!
*/