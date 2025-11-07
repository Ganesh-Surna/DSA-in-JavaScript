/* Problem: ✅✅✅✅ Find Pair with Given Sum in BST ✅✅✅✅

Given a Binary Search Tree (BST) and a target sum X, check if there exists a pair of nodes in the BST whose values add up to X.

A Binary Search Tree is a binary tree where for each node:
- All nodes in the left subtree have values less than the node's value
- All nodes in the right subtree have values greater than the node's value

You need to return true if such a pair exists, otherwise return false.

Example 1:
Input: 
BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18
X = 17
Output: true
Explanation: Nodes 7 and 10 sum to 17 (7 + 10 = 17).

Example 2:
Input: 
BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18
X = 23
Output: true
Explanation: Nodes 5 and 18 sum to 23 (5 + 18 = 23).

Example 3:
Input: 
BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18
X = 100
Output: false
Explanation: No pair of nodes sum to 100.

Example 4:
Input: 
BST:    5
       / \
      3   7
X = 10
Output: true
Explanation: Nodes 3 and 7 sum to 10 (3 + 7 = 10).

Example 5:
Input: 
BST:    5
X = 10
Output: false
Explanation: Only one node exists, cannot form a pair.

Constraints:
- The number of nodes in the BST is in the range [1, 10^4]
- -10^4 <= Node.val <= 10^4
- -10^5 <= X <= 10^5
- All Node.val are unique

Expected Complexities:
Time Complexity: O(n) - traverse all nodes once
Auxiliary Space: O(n) - for storing visited nodes in set + recursion/stack space
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

// 1. Iterative Inorder Traversal with Set (Iterative Approach Using Stack)
// ✅ TC: O(n) - visit each node once
// ✅ SC: O(n) - stack space O(h) + set space O(n) = O(n)
function findPair(root, X) {
    let st = []
    let seen = new Set()
    
    let curr = root
    while(curr || st.length>0){

        // Traverse the left subtree
        while(curr){
            st.push(curr)
            curr = curr.left
        }
        
        curr = st.pop()

        // Check if the pair exists
        if(seen.has(X-curr.data)){
            return true // if pair exists, then return true
        }
        
        // Add the current node's value to the set
        seen.add(curr.data)
        
        // Move to the right child
        curr = curr.right
    }
    
    return false // if pair does not exist, then return false
}

// 2. Recursive Inorder Traversal with Set and Flag (Recursive Approach with Early Exit)
// ✅ TC: O(n) - visit each node once in worst case
// ✅ SC: O(n) - recursion stack O(h) + set space O(n) = O(n)
function findPair(root, X) {
    const seen = new Set();
    let found = false;

    inorder(root);
    return found;

    // Helper function to perform inorder traversal
    function inorder(node) {
        if (!node || found) return; // if node is null or found is true, then return

        // Traverse left subtree
        inorder(node.left);

        // Check for pair
        if (seen.has(X - node.data)) {
            found = true;
            return;
        }

        // Add current node's value
        seen.add(node.data);

        // Traverse right subtree
        inorder(node.right);
    }
}

// 3. Recursive Inorder Traversal with Set and Return (Recursive Approach with Boolean Return)
// ✅ TC: O(n) - visit each node once in worst case
// ✅ SC: O(n) - recursion stack O(h) + set space O(n) = O(n)
function findPair(root, X) {
    const seen = new Set();
    return inorder(root);

    function inorder(node) {
        if(!node) return false; // if node is null, then return false

        // Traverse the left subtree
        if(inorder(node.left)) return true; // if pair exists in left subtree, then return true

        // Check if the pair exists
        if(seen.has(X - node.data)) return true; // if pair exist with current node, then return true

        // Add the current node's value to the set
        seen.add(node.data);

        // Traverse the right subtree
        return inorder(node.right); // return the result of right subtree
    }
}

// Test cases
let root1 = new Node(10);
root1.left = new Node(5);
root1.right = new Node(15);
root1.left.left = new Node(3);
root1.left.right = new Node(7);
root1.right.left = new Node(13);
root1.right.right = new Node(18);
console.log("Test 1:", findPair(root1, 17)); // true (7 + 10 = 17)
console.log("Test 2:", findPair(root1, 23)); // true (5 + 18 = 23)
console.log("Test 3:", findPair(root1, 100)); // false

let root2 = new Node(5);
root2.left = new Node(3);
root2.right = new Node(7);
console.log("Test 4:", findPair(root2, 10)); // true (3 + 7 = 10)

let root3 = new Node(5);
console.log("Test 5:", findPair(root3, 10)); // false

/*🎯 CORE IDEA: Use INORDER TRAVERSAL to visit BST nodes in sorted order, maintaining a SET of visited nodes. For each node, check if (X - node.data) exists in the set. If yes, we found a pair that sums to X. This leverages the BST's sorted property through inorder traversal while using the "Two Sum" hash set technique for O(1) complement lookups.

📋 STEP-BY-STEP FLOW:

1️⃣ APPROACH SELECTION:
   - Three implementations provided:
     * Iterative using stack
     * Recursive with flag variable
     * Recursive with boolean return
   - All use same core logic: inorder + set

2️⃣ INITIALIZATION:
   - Create empty set to store visited values
   - For iterative: initialize stack and curr pointer
   - For recursive: set up helper function

3️⃣ INORDER TRAVERSAL:
   - Visit nodes in sorted order (left → root → right)
   - Process each node exactly once
   - This gives us sorted sequence of values

4️⃣ PAIR CHECKING:
   - At each node, calculate complement: X - node.data
   - Check if complement exists in seen set
   - If yes: pair found, return true
   - If no: add current value to set, continue

5️⃣ TRAVERSAL COMPLETION:
   - If traversal completes without finding pair
   - Return false (no pair exists)

6️⃣ OPTIMIZATION:
   - Early exit when pair found (recursive approaches)
   - O(1) lookup using set
   - O(n) single pass traversal

🧠 WHY THIS APPROACH?

1️⃣ BST PROPERTY:
   - Inorder traversal gives sorted sequence
   - Don't need to explicitly sort
   - Natural ordering from BST structure

2️⃣ TWO SUM TECHNIQUE:
   - Use set for O(1) complement lookup
   - For each value, check if (X - value) seen before
   - Classic hash set pattern

3️⃣ SINGLE TRAVERSAL:
   - Process each node once: O(n)
   - No need for nested loops
   - Efficient linear solution

4️⃣ SPACE-TIME TRADEOFF:
   - Use O(n) space for set
   - Achieve O(n) time complexity
   - Optimal for this problem

💡 KEY INSIGHTS:

1️⃣ INORDER = SORTED:
   - BST inorder traversal visits nodes in ascending order
   - Equivalent to having sorted array
   - Leverage this for pair finding

2️⃣ SET FOR LOOKUP:
   - Store visited values in set
   - Check complement in O(1) time
   - No need to search back through tree

3️⃣ THREE IMPLEMENTATIONS:
   - Iterative: explicit stack control
   - Recursive Flag: uses outer variable
   - Recursive Return: propagates result through returns
   - Choose based on preference/constraints

4️⃣ EARLY EXIT:
   - Stop traversal once pair found
   - Saves unnecessary node visits
   - Improves average case performance

🎯 ALGORITHM COMPARISON:

APPROACH 1: Iterative (Lines 71-103)
- Uses explicit stack for traversal control
- Clear separation of phases (go left, process, go right)
- More control over execution flow
- Easier to debug step-by-step

APPROACH 2: Recursive Flag (Lines 106-133)
- Uses outer 'found' flag for early exit
- Cleaner code structure
- Recursion handles stack automatically
- Flag checked in every recursive call

APPROACH 3: Recursive Return (Lines 136-157)
- Returns boolean directly up the call stack
- Most concise implementation
- Propagates result through return values
- Functional programming style
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Standard BST

INPUT: 
BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18
X = 17

OUTPUT: true
EXPLANATION: Nodes 7 and 10 sum to 17.

🎯 GOAL: Find if any two nodes sum to X = 17!

🔍 STEP-BY-STEP PROCESS (ITERATIVE APPROACH):

📋 INITIALIZATION:
st = [] (empty stack)
seen = {} (empty set)
curr = root (node 10)
X = 17

─────────────────────────────────────────

📋 INORDER TRAVERSAL:

STEP 1: Go to leftmost node
curr = 10 → push 10, curr = 5
curr = 5 → push 5, curr = 3
curr = 3 → push 3, curr = null
Stack: [10, 5, 3]
seen = {}

STEP 2: Process node 3
curr = pop() = 3
Check: seen.has(17 - 3)? seen.has(14)? NO
Add: seen.add(3)
curr = 3.right = null
Stack: [10, 5]
seen = {3}

STEP 3: Process node 5
curr = pop() = 5
Check: seen.has(17 - 5)? seen.has(12)? NO
Add: seen.add(5)
curr = 5.right = 7
Stack: [10]
seen = {3, 5}

STEP 4: Go to node 7
curr = 7 → push 7, curr = null
Stack: [10, 7]
seen = {3, 5}

STEP 5: Process node 7
curr = pop() = 7
Check: seen.has(17 - 7)? seen.has(10)? NO
Add: seen.add(7)
curr = 7.right = null
Stack: [10]
seen = {3, 5, 7}

STEP 6: Process node 10
curr = pop() = 10
Check: seen.has(17 - 10)? seen.has(7)? YES! ✓
FOUND PAIR: (7, 10)
Return true

🏆 RESULT: true (pair found: 7 + 10 = 17)

─────────────────────────────────────────

📊 EXAMPLE 2: No Pair Case

INPUT: 
BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18
X = 100

PROCESS:
Visit nodes in order: 3, 5, 7, 10, 13, 15, 18

Node 3: seen.has(97)? NO → seen = {3}
Node 5: seen.has(95)? NO → seen = {3, 5}
Node 7: seen.has(93)? NO → seen = {3, 5, 7}
Node 10: seen.has(90)? NO → seen = {3, 5, 7, 10}
Node 13: seen.has(87)? NO → seen = {3, 5, 7, 10, 13}
Node 15: seen.has(85)? NO → seen = {3, 5, 7, 10, 13, 15}
Node 18: seen.has(82)? NO → seen = {3, 5, 7, 10, 13, 15, 18}

Traversal complete, no pair found.

🏆 RESULT: false

─────────────────────────────────────────

📊 EXAMPLE 3: Simple Tree

INPUT: 
BST:    5
       / \
      3   7
X = 10

PROCESS:
Visit nodes in order: 3, 5, 7

Node 3: seen.has(10 - 3)? seen.has(7)? NO → seen = {3}
Node 5: seen.has(10 - 5)? seen.has(5)? NO → seen = {3, 5}
Node 7: seen.has(10 - 7)? seen.has(3)? YES! ✓

FOUND PAIR: (3, 7)

🏆 RESULT: true (3 + 7 = 10)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION: Iterative Traversal

BST:        10
          /    \
         5      15
        / \     / \
       3   7   13  18

INORDER SEQUENCE: 3 → 5 → 7 → 10 → 13 → 15 → 18

PAIR CHECKING FOR X = 23:

Visit 3:  Need 20? seen = {} → NO
          seen = {3}

Visit 5:  Need 18? seen = {3} → NO
          seen = {3, 5}

Visit 7:  Need 16? seen = {3, 5} → NO
          seen = {3, 5, 7}

Visit 10: Need 13? seen = {3, 5, 7} → NO
          seen = {3, 5, 7, 10}

Visit 13: Need 10? seen = {3, 5, 7, 10} → YES! ✓

PAIR FOUND: (10, 13) where 10 + 13 = 23 ✓

🏆 RESULT: true

─────────────────────────────────────────

📊 RECURSIVE APPROACH CALL STACK:

BST:    5
       / \
      3   7
X = 10

CALL STACK VISUALIZATION:

inorder(5)
├─ inorder(3)
│  ├─ inorder(null) → false
│  ├─ Check: seen.has(7)? NO
│  ├─ seen.add(3)
│  └─ inorder(null) → false
├─ Check: seen.has(5)? NO
├─ seen.add(5)
└─ inorder(7)
   ├─ inorder(null) → false
   ├─ Check: seen.has(3)? YES! → return true ✓
   └─ [propagate true up]

RESULT: true

─────────────────────────────────────────

🔍 WHY INORDER TRAVERSAL?

BST:     10
        /  \
       5    15

PREORDER (Root-Left-Right): 10, 5, 15
INORDER (Left-Root-Right): 5, 10, 15 ← SORTED!
POSTORDER (Left-Right-Root): 5, 15, 10

Inorder gives sorted sequence, making it natural to track visited values and check for complements.

─────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(n)
- Visit each node exactly once
- Set operations (has, add): O(1)
- n nodes × O(1) per node = O(n)

SPACE COMPLEXITY: O(n)
- Set stores up to n values: O(n)
- Stack/Recursion depth: O(h) where h = tree height
- Total: O(n) + O(h) = O(n)
- In worst case (skewed tree): O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Single Node
BST: 5, X = 10
No pair possible (need two nodes)
Output: false

CASE 2: Two Nodes (Pair Exists)
BST: 3 → 7, X = 10
Output: true (3 + 7 = 10)

CASE 3: Two Nodes (No Pair)
BST: 3 → 7, X = 5
Output: false

CASE 4: All Same Values? (Constraint says unique)
Not applicable (problem states unique values)

CASE 5: Negative Values
BST: -5, 0, 5, X = 0
Visit: -5, 0, 5
Node 5: seen.has(0 - 5)? seen.has(-5)? YES! ✓
Output: true

CASE 6: Target is Node Value
BST: 5, 10, 15, X = 10
Cannot use same node twice
Node 10: seen.has(0)? NO
Output: depends on if 0 exists (NO in this case)

─────────────────────────────────────────

💡 KEY INSIGHTS:

1️⃣ TWO SUM ON BST:
   - Classic two sum problem adapted for BST
   - Use inorder to get sorted sequence
   - Use set for O(1) complement lookup
   - No need to convert to array first

2️⃣ EARLY EXIT OPTIMIZATION:
   - Recursive approaches can exit immediately
   - Don't need to visit remaining nodes
   - Improves average case performance
   - Worst case still O(n) if no pair exists

3️⃣ BST ADVANTAGE:
   - Inorder gives sorted order
   - Could use two-pointer on sorted array
   - But set approach is simpler and equally efficient
   - Works for any tree (not just BST)

4️⃣ ITERATIVE VS RECURSIVE:
   - Iterative: more control, explicit stack
   - Recursive: cleaner code, implicit stack
   - Both have same complexity
   - Choose based on preference

🎯 ALGORITHM CORRECTNESS:
- Visits all nodes: ✓
- Checks all possible pairs: ✓
- Uses correct complement calculation: ✓
- Handles edge cases: ✓
- Optimal complexity: ✓

🎯 COMPARISON WITH ALTERNATIVES:

APPROACH 1: Brute Force (Check All Pairs)
- Two nested loops
- Time: O(n²)
- Space: O(1)
- Inefficient

APPROACH 2: Convert to Array + Two Pointers
- Inorder to array: O(n)
- Two pointers on sorted array: O(n)
- Time: O(n), Space: O(n)
- Efficient but extra step

APPROACH 3: Inorder + Set (THIS APPROACH)
- Single traversal with set
- Time: O(n), Space: O(n)
- Most direct solution
- No array conversion needed

🎯 WHEN TO USE EACH IMPLEMENTATION:

USE ITERATIVE:
- Need explicit control over traversal
- Debugging complex scenarios
- Avoiding recursion limits
- Converting existing iterative code

USE RECURSIVE FLAG:
- Need early exit with shared state
- Multiple exit conditions
- Tracking additional information
- Cleaner than passing values up

USE RECURSIVE RETURN:
- Simplest and most elegant
- Pure functional style
- Result propagation through returns
- Most readable code

🎯 REAL-WORLD APPLICATIONS:
- Database query optimization
- Finding complementary items
- Transaction matching
- Resource pairing
- Network routing pairs

🎯 RELATED PROBLEMS:
- Two Sum (array version)
- Three Sum in BST
- Pair with difference K
- Count pairs with sum X
- Closest pair to target

🎯 OPTIMIZATION TECHNIQUES:
- Early exit when pair found
- Set for O(1) lookup
- Single traversal approach
- Leverage BST sorted property

🎯 COMMON MISTAKES:
- Using same node twice
- Not handling single node
- Wrong complement calculation
- Forgetting to add to set
- Infinite loops in traversal

🎯 TESTING STRATEGY:
- Single node
- Two nodes (pair exists/not)
- Larger trees
- Negative values
- Target equal to node value
- No pair exists
- Multiple possible pairs

🎯 INTERVIEW TIPS:
- Explain inorder gives sorted sequence
- Mention two sum pattern
- Discuss tradeoffs (brute force vs set)
- Show both iterative and recursive
- Analyze complexity
- Handle edge cases
- Test with examples

🎯 CONCLUSION:
The Find Pair with Sum in BST problem is efficiently solved by combining inorder traversal (which gives sorted sequence) with the two sum set technique (O(1) complement lookup), achieving optimal O(n) time and O(n) space complexity. Three implementations are provided: iterative with explicit stack, recursive with flag variable, and recursive with boolean return, all sharing the same core logic and complexity!
*/
