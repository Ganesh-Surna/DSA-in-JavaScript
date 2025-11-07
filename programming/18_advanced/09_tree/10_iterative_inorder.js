/* Problem: ✅✅✅✅ Iterative Inorder Traversal ✅✅✅✅

Given the root of a binary tree, return the inorder traversal of its nodes' values iteratively (without using recursion).

Inorder traversal visits nodes in the order: left subtree → root → right subtree. The iterative approach uses a stack to simulate the recursive call stack, allowing us to traverse the tree without using recursion.

You are given the root of a binary tree. The task is to implement iterative inorder traversal using:
1. Stack-based approach: O(n) time, O(h) space
2. Morris traversal: O(n) time, O(1) space

Example 1:
Input: 
       10
      /  \
     20   30
      \
       40

Output: [20, 40, 10, 30]
Explanation: Inorder traversal visits left subtree (20, 40), then root (10), then right subtree (30).

Example 2:
Input:
       1
      / \
     2   3
        / \
       4   5

Output: [2, 1, 4, 3, 5]
Explanation: Inorder traversal visits left subtree (2), root (1), then right subtree (4, 3, 5).

Example 3:
Input: null

Output: []
Explanation: Empty tree has no nodes to traverse.

Example 4:
Input:
       1
      /
     2

Output: [2, 1]
Explanation: Inorder traversal visits left child (2), then root (1).

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
function morrisInorder(root){
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
                prev.right = curr
                curr = curr.left
            }else{
                prev = null
                res.push(curr.key)
                curr = curr.right
            }
        }
    }
    
    return res
}

// ✅ TC = O(n)
// ✅ SC = O(h) --> due to Stack.
//              --> Worst Case(Skewed Tree, h=n): O(n)
//              --> Best Case(Balanced Tree, h=logn): O(logn)
function iterativeInorder(root){
    let res = []
    let st = []
    let curr = root
    
    while(curr || st.length > 0){
        // traverse the leftmost of the tree/subtree
        while(curr){
            st.push(curr)
            curr = curr.left
        }
        
        curr = st.pop() // processed
        res.push(curr.key)
        curr = curr.right // go to right subtree
    }
    
    return res
}

let root = new TreeNode(10)
root.left = new TreeNode(20)
root.right = new TreeNode(30)
root.left.right = new TreeNode(40)

console.log(iterativeInorder(root)) // [ 20, 40, 10, 30 ]
console.log(morrisInorder(root)) // [ 20, 40, 10, 30 ]

/*🎯 CORE IDEA: Implement inorder traversal iteratively using two approaches: (1) Stack-based method that simulates recursive call stack by pushing nodes and processing them in left-root-right order, and (2) Morris traversal that uses threading to achieve O(1) space complexity by temporarily modifying tree structure and restoring it.

📋 STEP-BY-STEP FLOW:

1️⃣ STACK-BASED APPROACH:
   - Use stack to simulate recursive call stack
   - Push nodes while going left until null
   - Pop and process node, then go right
   - Continue until stack is empty and curr is null

2️⃣ MORRIS TRAVERSAL APPROACH:
   - Use threading technique for O(1) space
   - Find inorder predecessor and create temporary links
   - Process nodes and restore tree structure
   - No stack or recursion needed

3️⃣ INORDER TRAVERSAL ORDER:
   - Visit left subtree first
   - Then visit root node
   - Finally visit right subtree
   - Maintains left-root-right order

4️⃣ SPACE OPTIMIZATION:
   - Stack approach: O(h) space for stack
   - Morris approach: O(1) space using threading
   - Both achieve O(n) time complexity

🧠 WHY THESE APPROACHES?
- Stack-based: Simulates recursion without function calls
- Morris traversal: Achieves O(1) space by threading
- Inorder order: Left-root-right pattern preserved
- Iterative: Avoids recursion stack overflow
- Efficient: Both O(n) time complexity

💡 KEY INSIGHTS:
- Stack simulates recursive call stack perfectly
- Morris traversal uses temporary threading
- Inorder order: left subtree → root → right subtree
- Threading allows O(1) space complexity
- Both approaches preserve traversal order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Iterative Inorder Traversal

INPUT: Binary Tree
       10
      /  \
     20   30
      \
       40

OUTPUT: [20, 40, 10, 30]
EXPLANATION: Inorder traversal visits left subtree (20, 40), then root (10), then right subtree (30).

🎯 GOAL: Traverse tree iteratively in left-root-right order!

🔍 STACK-BASED APPROACH - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: iterativeInorder(10)
res = [], st = [], curr = 10

📋 ITERATIVE TRAVERSAL:

ITERATION 1: curr = 10, st = []
Step 1: Go left while possible
curr = 10 → curr.left = 20 → st.push(20) → st = [20]
curr = 20 → curr.left = null → stop

Step 2: Process current node
curr = st.pop() → curr = 20, st = []
res.push(20) → res = [20]

Step 3: Go to right subtree
curr = curr.right → curr = 40

ITERATION 2: curr = 40, st = []
Step 1: Go left while possible
curr = 40 → curr.left = null → stop

Step 2: Process current node
curr = st.pop() → curr = 40, st = []
res.push(40) → res = [20, 40]

Step 3: Go to right subtree
curr = curr.right → curr = null

ITERATION 3: curr = null, st = []
Step 1: Go left while possible
curr = null → stop

Step 2: Process current node
st.length = 0 → no pop possible
Continue to next iteration

ITERATION 4: curr = null, st = []
Loop condition: curr || st.length > 0
curr = null AND st.length = 0 → exit loop

🏆 STACK-BASED RESULT: [20, 40, 10, 30]

─────────────────────────────────────────

🔍 MORRIS TRAVERSAL - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
Start: morrisInorder(10)
res = [], curr = 10

📋 MORRIS TRAVERSAL:

ITERATION 1: curr = 10
Step 1: Check left child
curr.left = 20 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 20
prev.right = null (no right child)
prev.right !== curr → prev = 20

Step 3: Create thread
prev.right = curr → 20.right = 10
curr = curr.left → curr = 20

ITERATION 2: curr = 20
Step 1: Check left child
curr.left = null (no left child)

Step 2: Process current node
res.push(20) → res = [20]
curr = curr.right → curr = 10

ITERATION 3: curr = 10
Step 1: Check left child
curr.left = 20 (exists)

Step 2: Find inorder predecessor
prev = curr.left = 20
prev.right = 10 (thread exists)
prev.right === curr → thread found

Step 3: Remove thread and process
prev.right = null → 20.right = null
res.push(10) → res = [20, 10]
curr = curr.right → curr = 30

ITERATION 4: curr = 30
Step 1: Check left child
curr.left = null (no left child)

Step 2: Process current node
res.push(30) → res = [20, 10, 30]
curr = curr.right → curr = null

ITERATION 5: curr = null
Loop condition: curr → exit loop

🏆 MORRIS RESULT: [20, 10, 30]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

STACK-BASED APPROACH:

TRAVERSAL ORDER:
       10
      /  
     20   (1st - leftmost)
      \   
       40 (2nd - leftmost of right subtree)
           

STACK OPERATIONS:
Step 1: Push 20 → st = [20]
Step 2: Pop 20 → res = [20], st = []
Step 3: Push 40 → st = [40]
Step 4: Pop 40 → res = [20, 40], st = []
Step 5: Push 10 → st = [10]
Step 6: Pop 10 → res = [20, 40, 10], st = []
Step 7: Push 30 → st = [30]
Step 8: Pop 30 → res = [20, 40, 10, 30], st = []

MORRIS TRAVERSAL:

THREADING PROCESS:
       10
      /  
     20   (thread: 20.right = 10)
      \   
       40
           

THREAD OPERATIONS:
Step 1: Create thread 20.right = 10
Step 2: Process 20 → res = [20]
Step 3: Follow thread back to 10
Step 4: Remove thread 20.right = null
Step 5: Process 10 → res = [20, 10]
Step 6: Process 30 → res = [20, 10, 30]

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:

INPUT: Binary Tree
       1
      / \
     2   3
        / \
       4   5

STACK-BASED PROCESS:
Step 1: Push 2 → st = [2]
Step 2: Pop 2 → res = [2], st = []
Step 3: Push 1 → st = [1]
Step 4: Pop 1 → res = [2, 1], st = []
Step 5: Push 4 → st = [4]
Step 6: Pop 4 → res = [2, 1, 4], st = []
Step 7: Push 3 → st = [3]
Step 8: Pop 3 → res = [2, 1, 4, 3], st = []
Step 9: Push 5 → st = [5]
Step 10: Pop 5 → res = [2, 1, 4, 3, 5], st = []

RESULT: [2, 1, 4, 3, 5]

MORRIS PROCESS:
Step 1: Thread 2.right = 1, process 2 → res = [2]
Step 2: Follow thread, remove thread, process 1 → res = [2, 1]
Step 3: Thread 4.right = 3, process 4 → res = [2, 1, 4]
Step 4: Follow thread, remove thread, process 3 → res = [2, 1, 4, 3]
Step 5: Process 5 → res = [2, 1, 4, 3, 5]

RESULT: [2, 1, 4, 3, 5]

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
Stack-based: [3, 2, 1] (push all, pop in order)
Morris: [3, 2, 1] (thread and process)

─────────────────────────────────────────

🔍 WHY THESE APPROACHES WORK:
1️⃣ STACK SIMULATION: Mimics recursive call stack perfectly
2️⃣ THREADING TECHNIQUE: Creates temporary links for O(1) space
3️⃣ INORDER ORDER: Left-root-right pattern preserved
4️⃣ ITERATIVE PROCESS: Avoids recursion stack overflow
5️⃣ EFFICIENT TRAVERSAL: Both achieve O(n) time complexity

💡 KEY INSIGHT:
Use stack to simulate recursion or threading to achieve O(1) space,
both approaches maintain the left-root-right inorder traversal order
while avoiding recursive function calls!

🎯 TIME COMPLEXITY ANALYSIS:
- Stack-based: O(n) - each node visited once
- Morris traversal: O(n) - each node visited at most 3 times
- Inorder traversal: O(n) for both approaches
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
- Inorder order preserved in both approaches
- Stack simulation matches recursion exactly
- Threading technique maintains tree structure
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Stack-based: Push nodes, pop and process, go right
- Morris: Find predecessor, create thread, process, restore
- Inorder order: left subtree → root → right subtree
- Iterative: No recursion, uses loops and data structures
- Space optimization: Morris achieves O(1) space

🎯 STACK-BASED PRINCIPLES:
- Simulate recursive call stack
- Push nodes while going left
- Pop and process nodes
- Go to right subtree
- Continue until stack empty

🎯 MORRIS TRAVERSAL PRINCIPLES:
- Use threading for O(1) space
- Find inorder predecessor
- Create temporary links
- Process nodes and restore structure
- No stack or recursion needed

🎯 INORDER TRAVERSAL BENEFITS:
- Visits nodes in sorted order for BST
- Natural order for binary trees
- Efficient for tree operations
- Common in tree algorithms
- Preserves tree structure

🎯 STACK SIMULATION ADVANTAGES:
- Easy to understand and implement
- Matches recursive behavior exactly
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
- Stack-based: Simulate recursion with explicit stack
- Morris: Use threading for space optimization
- Iterative: Replace recursion with loops
- Inorder: Left-root-right order

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
- Matches recursive behavior exactly
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
- Recursive inorder: Simple but O(h) space
- Level-order: Different traversal order
- Preorder/Postorder: Different node orders
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
- Stack simulation of recursion
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
The iterative inorder traversal problem demonstrates how to traverse
binary trees without recursion using stack simulation or Morris threading,
achieving O(n) time complexity with different space tradeoffs while
preserving the left-root-right inorder traversal order!
*/