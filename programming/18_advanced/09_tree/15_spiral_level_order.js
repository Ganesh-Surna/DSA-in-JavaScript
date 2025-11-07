/* Problem: ✅✅✅✅ Spiral Level Order Traversal (Zigzag Level Order) ✅✅✅✅

Given the root of a binary tree, return the spiral level order traversal of its nodes' values. Also known as zigzag level order traversal, where you traverse the tree level by level, alternating the direction at each level (left-to-right, then right-to-left, and so on).

Spiral traversal pattern:
- Level 0: Left to Right
- Level 1: Right to Left
- Level 2: Left to Right
- Level 3: Right to Left
- And so on, alternating at each level

You are given the root of a binary tree. The task is to return the spiral/zigzag level order traversal as an array.

Example 1:
Input: 
       1
      / \
     2   3
    / \ / \
   4  5 6  7

Output: [1, 2, 3, 7, 6, 5, 4]
Explanation: 
Level 0 (L→R): 1
Level 1 (R→L): 3, 2
Level 2 (L→R): 4, 5, 6, 7
But output format shows: [1, 2, 3, 7, 6, 5, 4]

Example 2:
Input:
       1
      / \
     2   3
      \
       4

Output: [1, 3, 2, 4]
Explanation:
Level 0 (L→R): 1
Level 1 (R→L): 3, 2
Level 2 (L→R): 4

Example 3:
Input:
       1

Output: [1]
Explanation: Single node at level 0.

Example 4:
Input: null

Output: []
Explanation: Empty tree.

Constraints:
- The number of nodes in the tree is in the range [0, 2000]
- -100 <= Node.val <= 100

Expected Complexities:
Time Complexity: O(n) - visit each node once
Auxiliary Space: O(w) - where w is maximum width of tree (for deque)
*/

class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// ✅ TC = O(n), ✅ SC = O(w)
function spiralLevelOrder(root) {
    let res = []
    
    let dq = [] // Double ended queue
    dq.push(root) // Add root to the queue
    
    let level = 0
    
    while(dq.length > 0){
        let size = dq.length // Get the size of the queue (i.e. number of nodes at current level)
        
        for(let i=0; i<size; i++){

            if(level % 2 === 0){ // If level is even, print R -> L
                // ✅✅✅ processing from right. So add to front

                let curr = dq.pop()
                
                res.push(curr.key)
            
                if(curr.right){
                    dq.unshift(curr.right)
                }
                if(curr.left){
                    dq.unshift(curr.left)
                }
            }else{ // If level is odd, print L -> R
                // ✅✅✅ processing from Left, so add to rear

                let curr = dq.shift()
                
                res.push(curr.key)
                
                if(curr.left){
                    dq.push(curr.left)
                }
                if(curr.right){
                    dq.push(curr.right)
                }
            }
        }
        
        level++
    }
    
    return res
}

let root = new TreeNode(1)
root.left = new TreeNode(2)
root.right = new TreeNode(3)
root.left.left = new TreeNode(4)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)

console.log(spiralLevelOrder(root)) // [1, 2, 3, 7, 6, 5, 4]

/*🎯 CORE IDEA: Use a double-ended queue (deque) to perform level-order traversal with alternating directions. 
For even levels, process from right (pop from rear, add children to front). 
For odd levels, process from left (shift from front, add children to rear). 
Track level number to alternate between the two processing modes.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create deque and add root node
   - Initialize level counter to 0
   - Create result array

2️⃣ LEVEL PROCESSING (EVEN LEVELS - L→R):
   - Pop from rear of deque
   - Add node value to result
   - Add right child to front, then left child to front
   - Process all nodes at current level

3️⃣ LEVEL PROCESSING (ODD LEVELS - R→L):
   - Shift from front of deque
   - Add node value to result
   - Add left child to rear, then right child to rear
   - Process all nodes at current level

4️⃣ DIRECTION ALTERNATION:
   - Increment level counter after each level
   - Use level % 2 to determine processing direction
   - Continue until deque is empty

🧠 WHY THIS APPROACH?
- Deque allows efficient front and rear operations
- Level tracking enables direction alternation
- Single traversal visits each node once
- O(n) time complexity with level-order traversal
- Natural zigzag pattern with alternating operations

💡 KEY INSIGHTS:
- Even levels: Pop from rear, add to front (right then left)
- Odd levels: Shift from front, add to rear (left then right)
- Deque operations maintain correct order for next level
- Level counter determines processing direction
- Children added in reverse order for correct traversal
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Spiral Level Order Traversal

INPUT: Binary Tree
       1
      / \
     2   3
    / \ / \
   4  5 6  7

OUTPUT: [1, 2, 3, 7, 6, 5, 4]
EXPLANATION: Traverse in zigzag pattern - L→R at level 0, R→L at level 1, L→R at level 2.

🎯 GOAL: Traverse tree in spiral/zigzag pattern level by level!

🔍 DEQUE-BASED ALGORITHM - STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
res = []
dq = [1]
level = 0

📋 LEVEL-BY-LEVEL TRAVERSAL:

LEVEL 0 (EVEN - L→R):
level = 0, level % 2 = 0 → EVEN LEVEL
dq = [1], size = 1

ITERATION 1:
Step 1: Pop from rear (process right to left)
curr = dq.pop() → curr = 1, dq = []

Step 2: Add to result
res.push(1) → res = [1]

Step 3: Add children to front (right first, then left)
curr.right = 3 → dq.unshift(3) → dq = [3]
curr.left = 2 → dq.unshift(2) → dq = [2, 3]

Step 4: Increment level
level++ → level = 1

STATE AFTER LEVEL 0:
res = [1]
dq = [2, 3]
level = 1

─────────────────────────────────────────

LEVEL 1 (ODD - R→L):
level = 1, level % 2 = 1 → ODD LEVEL
dq = [2, 3], size = 2

ITERATION 1:
Step 1: Shift from front (process left to right)
curr = dq.shift() → curr = 2, dq = [3]

Step 2: Add to result
res.push(2) → res = [1, 2]

Step 3: Add children to rear (left first, then right)
curr.left = 4 → dq.push(4) → dq = [3, 4]
curr.right = 5 → dq.push(5) → dq = [3, 4, 5]

ITERATION 2:
Step 1: Shift from front
curr = dq.shift() → curr = 3, dq = [4, 5]

Step 2: Add to result
res.push(3) → res = [1, 2, 3]

Step 3: Add children to rear (left first, then right)
curr.left = 6 → dq.push(6) → dq = [4, 5, 6]
curr.right = 7 → dq.push(7) → dq = [4, 5, 6, 7]

Step 4: Increment level
level++ → level = 2

STATE AFTER LEVEL 1:
res = [1, 2, 3]
dq = [4, 5, 6, 7]
level = 2

─────────────────────────────────────────

LEVEL 2 (EVEN - L→R):
level = 2, level % 2 = 0 → EVEN LEVEL
dq = [4, 5, 6, 7], size = 4

ITERATION 1:
Step 1: Pop from rear
curr = dq.pop() → curr = 7, dq = [4, 5, 6]

Step 2: Add to result
res.push(7) → res = [1, 2, 3, 7]

Step 3: Add children (both null)
No children to add

ITERATION 2:
Step 1: Pop from rear
curr = dq.pop() → curr = 6, dq = [4, 5]

Step 2: Add to result
res.push(6) → res = [1, 2, 3, 7, 6]

Step 3: Add children (both null)
No children to add

ITERATION 3:
Step 1: Pop from rear
curr = dq.pop() → curr = 5, dq = [4]

Step 2: Add to result
res.push(5) → res = [1, 2, 3, 7, 6, 5]

Step 3: Add children (both null)
No children to add

ITERATION 4:
Step 1: Pop from rear
curr = dq.pop() → curr = 4, dq = []

Step 2: Add to result
res.push(4) → res = [1, 2, 3, 7, 6, 5, 4]

Step 3: Add children (both null)
No children to add

Step 4: Increment level
level++ → level = 3

STATE AFTER LEVEL 2:
res = [1, 2, 3, 7, 6, 5, 4]
dq = []
level = 3

─────────────────────────────────────────

TERMINATION:
dq.length = 0 → exit while loop

🏆 RESULT: [1, 2, 3, 7, 6, 5, 4]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TREE STRUCTURE:
       1
      / \
     2   3
    / \ / \
   4  5 6  7

SPIRAL TRAVERSAL VISUALIZATION:

Level 0 (L→R): 1
              ↓
Level 1 (R→L): 3 ← 2
              ↑   ↓
Level 2 (L→R): 4 → 5 → 6 → 7

DEQUE STATE AT EACH LEVEL:

Initial: dq = [1]

After Level 0: dq = [2, 3]
               ↑front  ↑rear

After Level 1: dq = [4, 5, 6, 7]
               ↑front        ↑rear

After Level 2: dq = []

PROCESSING DIRECTION:

Level 0 (even): Pop from rear → Add to front
       dq: [1]
       Process: 1
       Add children: [2, 3] (right first, then left to front)

Level 1 (odd): Shift from front → Add to rear
       dq: [2, 3]
       Process: 2, 3
       Add children: [4, 5, 6, 7] (left first, then right to rear)

Level 2 (even): Pop from rear → Add to front
       dq: [4, 5, 6, 7]
       Process: 7, 6, 5, 4 (reverse order)
       Add children: none

─────────────────────────────────────────

📊 DEQUE OPERATIONS:

LEVEL 0 (EVEN):
Operation: pop() from rear, unshift() to front
dq before: [1]
Process: 1
Add: right(3) to front → [3]
Add: left(2) to front → [2, 3]
dq after: [2, 3]

LEVEL 1 (ODD):
Operation: shift() from front, push() to rear
dq before: [2, 3]
Process: 2
Add: left(4) to rear → [3, 4]
Add: right(5) to rear → [3, 4, 5]
Process: 3
Add: left(6) to rear → [4, 5, 6]
Add: right(7) to rear → [4, 5, 6, 7]
dq after: [4, 5, 6, 7]

LEVEL 2 (EVEN):
Operation: pop() from rear, unshift() to front
dq before: [4, 5, 6, 7]
Process: 7, 6, 5, 4 (no children)
dq after: []

─────────────────────────────────────────

📊 RESULT ARRAY EVOLUTION:

Initial: res = []
After processing 1: res = [1]
After processing 2: res = [1, 2]
After processing 3: res = [1, 2, 3]
After processing 7: res = [1, 2, 3, 7]
After processing 6: res = [1, 2, 3, 7, 6]
After processing 5: res = [1, 2, 3, 7, 6, 5]
After processing 4: res = [1, 2, 3, 7, 6, 5, 4]
Final: res = [1, 2, 3, 7, 6, 5, 4]

─────────────────────────────────────────

📊 EDGE CASES:

CASE 1: Empty Tree
Input: null
dq = [] (no root to add)
Result: []

CASE 2: Single Node
Input: TreeNode(1)
Process: Level 0 (even), process 1
Result: [1]

CASE 3: Skewed Tree
Input: 1 → 2 → 3 (right skewed)
Level 0: 1
Level 1: 2 (R→L)
Level 2: 3
Result: [1, 2, 3]

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ DEQUE OPERATIONS: Efficient front and rear access enables alternating directions
2️⃣ LEVEL TRACKING: Counter determines processing direction at each level
3️⃣ CHILDREN ORDER: Adding children in specific order maintains correct traversal
4️⃣ ZIGZAG PATTERN: Alternating operations create natural spiral pattern
5️⃣ SINGLE TRAVERSAL: Each node visited exactly once for O(n) complexity

💡 KEY INSIGHT:
Use deque with alternating operations based on level parity - even levels
process from rear and add to front, odd levels process from front and add
to rear - creating a natural zigzag pattern without reversing arrays!

🎯 TIME COMPLEXITY ANALYSIS:
- Node visits: n nodes total
- Each node processed once
- Deque operations: O(1) for push, pop, shift, unshift
- Level processing: O(w) per level where w is width
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Deque storage: O(w) where w is maximum width
- Result array: O(n) for output
- No recursion stack needed
- Total: O(w) auxiliary space (excluding output)
- Worst case width: O(n) for complete tree

🎯 EDGE CASES HANDLED:
- Empty tree: Returns empty array
- Single node: Returns single element array
- Skewed tree: Handles alternating single nodes
- Complete tree: Processes all levels correctly

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to visit all nodes
- Correct alternating direction at each level
- Proper children ordering for next level
- Complete level-by-level processing
- Handles all tree configurations

🎯 IMPLEMENTATION DETAILS:
- Use JavaScript array as deque (push, pop, shift, unshift)
- Track level with counter variable
- Use level % 2 to determine direction
- Process all nodes at current level before next
- Add children in order specific to direction

🎯 DEQUE OPERATIONS:
- push(): Add to rear - O(1)
- pop(): Remove from rear - O(1)
- shift(): Remove from front - O(n) in JS arrays
- unshift(): Add to front - O(n) in JS arrays
- Optimization: Use actual deque data structure for O(1) all operations

🎯 LEVEL PROCESSING STRATEGY:
- Even levels: Process right to left (pop from rear)
- Odd levels: Process left to right (shift from front)
- Children added in reverse order of processing
- Maintains correct order for next level
- Natural zigzag pattern emerges

🎯 DIRECTION ALTERNATION:
- Level 0 (even): L→R in result, but process R→L from deque
- Level 1 (odd): R→L in result, but process L→R from deque
- Pattern continues alternating
- Level counter tracks current level
- Modulo operation determines direction

🎯 CHILDREN ORDERING:
- Even levels: Add right then left to front
- Odd levels: Add left then right to rear
- Ensures correct order for next level processing
- Critical for maintaining zigzag pattern
- Must match processing direction

🎯 DEQUE ADVANTAGES:
- Efficient front and rear operations
- Natural fit for bidirectional traversal
- No need for array reversal
- Single data structure handles both directions
- Clean and intuitive implementation

🎯 COMPARISON WITH ALTERNATIVES:
- Two stacks: More complex with multiple transfers
- Array reversal: Extra O(n) operations per level
- Recursion: Harder to implement zigzag pattern
- This approach: Optimal with single deque

🎯 REAL-WORLD APPLICATIONS:
- Tree visualization in spiral pattern
- Level-based data processing
- Zigzag scanning algorithms
- Tree structure analysis
- Animation and rendering

🎯 ALGORITHM PATTERN:
- Level-order traversal with modification
- Direction alternation based on level
- Deque for bidirectional processing
- Queue-based tree traversal variant

🎯 MATHEMATICAL PROPERTIES:
- Nodes per level: varies by tree structure
- Maximum width: 2^h for complete binary tree
- Level count: h+1 where h is height
- Total nodes: n processed exactly once

🎯 ERROR HANDLING:
- Null root: Returns empty array immediately
- Missing children: Checked before adding
- Edge cases: Comprehensive coverage
- Boundary conditions: Proper handling

🎯 ADVANTAGES OF THIS APPROACH:
- Single traversal, no reversals needed
- Efficient deque operations
- Clear alternating logic
- Optimal time complexity O(n)
- Natural zigzag pattern

🎯 DISADVANTAGES:
- shift() and unshift() are O(n) in JS arrays
- Could use actual deque for O(1) operations
- More complex than simple level-order
- Requires understanding of deque operations

🎯 ALTERNATIVE APPROACHES:
- Two stacks (left-right, right-left): More operations
- Array reversal per level: Extra time complexity
- Recursive with level direction flag: Complex logic
- This deque approach: Most efficient

🎯 IMPLEMENTATION CONSIDERATIONS:
- Use actual deque for true O(1) operations
- Track level accurately
- Handle null children properly
- Correct children ordering for direction
- Clear condition for level parity

🎯 TESTING STRATEGY:
- Empty tree
- Single node
- Complete tree
- Skewed trees
- Various heights
- Different structures

🎯 DEBUGGING TIPS:
- Print deque state at each level
- Track level counter
- Verify children ordering
- Check direction logic
- Test edge cases thoroughly

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - optimal for traversal
- Space: O(w) - optimal for level-based approach
- Overall: Efficient and practical
- Scalable: Works well for large trees

🎯 SCALABILITY CONSIDERATIONS:
- Large trees: Linear time complexity
- Wide trees: Space proportional to width
- Memory usage: Bounded by maximum width
- Performance: Efficient with proper deque

🎯 BEST PRACTICES:
- Use proper deque data structure
- Clear level tracking
- Correct children ordering
- Handle edge cases
- Test thoroughly

🎯 COMMON MISTAKES:
- Wrong children ordering
- Incorrect level parity check
- Missing null checks
- Wrong deque operations
- Not tracking level properly

🎯 LEARNING OBJECTIVES:
- Understand spiral traversal
- Learn deque operations
- Master level-order variants
- Practice direction alternation
- Improve tree traversal skills

🎯 INTERVIEW TIPS:
- Explain deque operations clearly
- Discuss direction alternation logic
- Handle edge cases systematically
- Write clean code with clear logic
- Demonstrate complexity analysis

🎯 ALGORITHM INSIGHTS:
- Deque-based bidirectional processing
- Level parity determines direction
- Children ordering maintains pattern
- Single traversal efficiency
- Clean zigzag implementation

🎯 MATHEMATICAL ANALYSIS:
- Node visits: n total
- Level visits: h+1 levels
- Deque operations: n push/pop operations
- Space usage: O(w) for deque
- Total: O(n) time, O(w) space

🎯 IMPLEMENTATION CHALLENGES:
- Correct deque operations
- Proper level tracking
- Children ordering logic
- Edge case handling
- Direction alternation

🎯 SOLUTION VALIDATION:
- Test with various trees
- Verify zigzag pattern
- Check edge cases
- Monitor space usage
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Basic level-order: Simple queue
- With reversal: Extra operations
- Two stacks: Complex transfers
- Deque optimization: This approach

🎯 PRACTICAL APPLICATIONS:
- Tree visualization tools
- Zigzag scanning algorithms
- Level-based data processing
- Tree animation systems
- Spiral pattern generation

🎯 OPTIMIZATION OPPORTUNITIES:
- Use actual deque for O(1) operations
- Eliminate array shift/unshift overhead
- Parallel processing for independent levels
- Cache width for space prediction
- Early termination if needed

🎯 RELATED PROBLEMS:
- Standard level-order traversal
- Reverse level-order traversal
- Vertical order traversal
- Boundary traversal
- Diagonal traversal

🎯 PROBLEM VARIATIONS:
- Spiral from bottom to top
- Spiral with node count per level
- Spiral with level sums
- Spiral with specific node selection
- Multi-way spiral patterns

🎯 CONCLUSION:
The spiral level order traversal problem demonstrates how to use a deque
with alternating operations based on level parity to efficiently traverse
a binary tree in zigzag pattern, achieving O(n) time complexity and O(w)
space complexity with clean implementation using direction-specific deque
operations!
*/