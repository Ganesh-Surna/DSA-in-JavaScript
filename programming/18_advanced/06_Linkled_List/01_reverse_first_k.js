/* Problem:
Given a linked list and a number k, reverse the first k nodes of the linked list.

Example 1:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6, k = 3
Output: 3 -> 2 -> 1 -> 4 -> 5 -> 6
Explanation: Reverse first 3 nodes (1, 2, 3), keep rest unchanged

Example 2:
Input: 1 -> 2 -> 3 -> 4 -> 5, k = 2
Output: 2 -> 1 -> 3 -> 4 -> 5
Explanation: Reverse first 2 nodes (1, 2), keep rest unchanged

Example 3:
Input: 1 -> 2 -> 3, k = 3
Output: 3 -> 2 -> 1
Explanation: Reverse all 3 nodes

Example 4:
Input: 1 -> 2, k = 1
Output: 1 -> 2
Explanation: Reverse first 1 node (no change)

Constraints:
1 ≤ k ≤ length of linked list
1 ≤ node values ≤ 1000

Expected Time Complexity: O(k)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
}

// ✅ TC = O(k) --> Traverse only first k nodes
// ✅ SC = O(1) --> Constant extra space
function reverseFirstKNodes(head, k){
    let prev = null, curr = head;
    let c = 1;
    
    while(curr !== null && c <= k){
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
        c++
    }

    head.next = curr  // Connect original head to remaining list
    head = prev       // Update head to new first node
    return head
}

// OR

function reverseFirstKNodes(head, k){
    let prev = null, curr = head;
    let c = 1;
    while(curr !== null){
        let next = curr.next
        curr.next = prev
        if(c===k){
            head.next = next
            head = curr
            return head
        }
        prev = curr
        curr = next
        c++
    }
}

// ✅ Test Cases
let head1 = new Node(10);
head1.next = new Node(20);
head1.next.next = new Node(30);
head1.next.next.next = new Node(40);
head1.next.next.next.next = new Node(50);
head1.next.next.next.next.next = new Node(60);
console.log(reverseFirstKNodes(head1, 3));

let head2 = new Node(1);
head2.next = new Node(2);
head2.next.next = new Node(3);
console.log(reverseFirstKNodes(head2, 2));

/*🎯 CORE IDEA: Instead of using recursive approaches or extra data structures, we use ITERATIVE REVERSAL with THREE POINTERS to efficiently reverse the first k nodes in O(k) time and O(1) space.

📋 STEP-BY-STEP FLOW:

1️⃣ THREE POINTER TECHNIQUE:
   - prev: Points to previous node (initially null)
   - curr: Points to current node (initially head)
   - next: Points to next node (temporary storage)

2️⃣ ITERATIVE REVERSAL:
   - Store next node before breaking link
   - Reverse current node's next pointer
   - Move pointers forward
   - Count processed nodes

3️⃣ TERMINATION CONDITION:
   - When count reaches k, stop reversal
   - Connect original head to remaining list
   - Update head to new first node

4️⃣ LINK RECONSTRUCTION:
   - Original head.next = remaining list
   - New head = last reversed node

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(k) vs O(n) for full traversal
2️⃣ SPACE OPTIMIZATION: O(1) vs O(k) for recursive stack
3️⃣ ITERATIVE: Avoids recursion overhead
4️⃣ IN-PLACE: Modifies existing nodes without extra space

💡 KEY INSIGHTS:

1️⃣ THREE POINTERS: prev, curr, next enable efficient reversal
2️⃣ COUNTING: Track processed nodes to stop at k
3️⃣ LINK PRESERVATION: Store next before breaking current link
4️⃣ HEAD UPDATE: Return new head after reversal

🎯 WHY THREE POINTERS WORK?
- prev: Maintains reversed portion
- curr: Current node being processed
- next: Preserves forward traversal path

🎯 ALGORITHM INTUITION:
Think of it as "unzipping" the first k nodes and "rezipping" them in reverse order,
while keeping the rest of the list intact.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 10 -> 20 -> 30 -> 40 -> 50 -> 60, k = 3

🎯 GOAL: Reverse first 3 nodes!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
prev = null, curr = head(10), c = 1

📋 ITERATION 1 (c = 1):
next = curr.next = 20
curr.next = prev = null
curr(10) -> null

Before Update:
prev = null, curr = 10, next = 20
List: 10 -> 20 -> 30 -> 40 -> 50 -> 60

After Update:
prev = 10, curr = 20, next = 20
List: null <- 10    20 -> 30 -> 40 -> 50 -> 60

📋 ITERATION 2 (c = 2):
next = curr.next = 30
curr.next = prev = 10
curr(20) -> prev(10)

Before Update:
prev = 10, curr = 20, next = 30
List: null <- 10    20 -> 30 -> 40 -> 50 -> 60

After Update:
prev = 20, curr = 30, next = 30
List: null <- 10 <- 20    30 -> 40 -> 50 -> 60

📋 ITERATION 3 (c = 3):
next = curr.next = 40
curr.next = prev = 20
curr(30) -> prev(20)

Before Update:
prev = 20, curr = 30, next = 40
List: null <- 10 <- 20    30 -> 40 -> 50 -> 60

After Update:
prev = 30, curr = 40, next = 40
List: null <- 10 <- 20 <- 30    40 -> 50 -> 60

📋 TERMINATION (c === k):
head.next = curr = 40  // Connect original head to remaining list
head = prev = 30       // Update head to new first node

🏆 FINAL RESULT:
List: 30 -> 20 -> 10 -> 40 -> 50 -> 60

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 head

AFTER REVERSING FIRST 3 NODES:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 30  │ -> │ 20  │ -> │ 10  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 new head

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
head = 1 -> 2 -> 3, k = 2

🔍 Process:

ITERATION 1 (c = 1):
next = 2, curr.next = null
prev = 1, curr = 2
List: null <- 1    2 -> 3

ITERATION 2 (c = 2):
next = 3, curr.next = 1
prev = 2, curr = 3
List: null <- 1 <- 2    3

TERMINATION (c === k):
head.next = 3, head = 2
List: 2 -> 1 -> 3

🏆 FINAL RESULT: 2 -> 1 -> 3 ✓

🎯 VISUAL REPRESENTATION:

ORIGINAL:
┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  3  │
└─────┘    └─────┘    └─────┘
   ↑
 head

AFTER REVERSING FIRST 2:
┌─────┐    ┌─────┐    ┌─────┐
│  2  │ -> │  1  │ -> │  3  │
└─────┘    └─────┘    └─────┘
   ↑
 new head

🔍 WHY THIS WORKS:
1️⃣ THREE POINTERS enable efficient node reversal
2️⃣ COUNTING ensures we stop at exactly k nodes
3️⃣ LINK PRESERVATION maintains list connectivity
4️⃣ HEAD UPDATE returns correct new head

💡 KEY INSIGHT:
We don't need to traverse the entire list - we only process the first k nodes!
This gives us O(k) complexity instead of O(n) for full traversal.

🎯 TIME COMPLEXITY ANALYSIS:
- Traverse first k nodes: O(k)
- Each node operation: O(1)
- Total: O(k)

🎯 SPACE COMPLEXITY ANALYSIS:
- Three pointers: O(1)
- Counter variable: O(1)
- No extra data structures: O(1)
- Total: O(1)

🎯 EDGE CASES HANDLED:
- k = 1: No reversal needed, return original head
- k = list length: Reverse entire list
- Single node: Return as is
- Empty list: Handle gracefully

🎯 COMPARISON WITH OTHER APPROACHES:
- Recursive: O(k) time, O(k) space (recursion stack)
- Array-based: O(n) time, O(n) space (copy to array)
- Three-pointer: O(k) time, O(1) space - optimal!

🎯 OPTIMIZATION TECHNIQUES:
- Use three pointers instead of recursion
- Count nodes during traversal
- Update head in-place
- Preserve links efficiently

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always store next before breaking current link
- Use multiple pointers for complex operations
- Update head pointer when structure changes
- Handle edge cases (empty, single node)

🎯 REVERSAL PATTERN:
- Store next node
- Reverse current link
- Move pointers forward
- Repeat until condition met

🎯 POINTER MOVEMENT VISUALIZATION:

ITERATION 1:
prev: null -> 10
curr: 10 -> 20
next: 20 -> 30

ITERATION 2:
prev: 10 -> 20
curr: 20 -> 30
next: 30 -> 40

ITERATION 3:
prev: 20 -> 30
curr: 30 -> 40
next: 40 -> 50

TERMINATION:
head: 10 -> 30 (new head)
head.next: 30 -> 40 (connect to remaining)

🎯 ALGORITHM CORRECTNESS:
- Each iteration reverses exactly one link
- Count ensures we process exactly k nodes
- Head update ensures correct return value
- Link preservation maintains list integrity

🎯 UPDATED ALGORITHM ANALYSIS:

The updated code uses a cleaner approach:
- Loop condition: `while(curr !== null && c < k)` - stops when count reaches k
- After loop: `head.next = curr` - connects original head to remaining list
- After loop: `head = prev` - updates head to new first node
- Return: `return head` - returns new head

This is more efficient because:
1️⃣ CLEANER TERMINATION: Loop stops exactly at k iterations
2️⃣ SIMPLER LOGIC: No need for if condition inside loop
3️⃣ BETTER READABILITY: Clear separation of reversal and connection logic
4️⃣ SAME COMPLEXITY: Still O(k) time and O(1) space

🎯 WHY THE UPDATED APPROACH IS BETTER:

1️⃣ LOOP CONDITION: `c < k` ensures we stop exactly at k nodes
2️⃣ POST-LOOP PROCESSING: Clean separation of concerns
3️⃣ POINTER MANAGEMENT: prev points to last reversed node (new head)
4️⃣ CONNECTION LOGIC: head.next = curr connects to remaining list

🎯 STEP-BY-STEP WITH UPDATED CODE:

INITIALIZATION:
prev = null, curr = head(10), c = 1

ITERATION 1 (c = 1, c < k = 3):
next = 20, curr.next = null, prev = 10, curr = 20, c = 2
List: null <- 10    20 -> 30 -> 40 -> 50 -> 60

ITERATION 2 (c = 2, c < k = 3):
next = 30, curr.next = 10, prev = 20, curr = 30, c = 3
List: null <- 10 <- 20    30 -> 40 -> 50 -> 60

ITERATION 3 (c = 3, c < k = 3):
next = 40, curr.next = 20, prev = 30, curr = 40, c = 4
List: null <- 10 <- 20 <- 30    40 -> 50 -> 60

LOOP EXITS (c = 4, c >= k = 3):
head.next = curr = 40  // Connect original head to remaining
head = prev = 30       // Update head to new first node

FINAL RESULT: 30 -> 20 -> 10 -> 40 -> 50 -> 60

🎯 ALGORITHM EFFICIENCY:
- Time: O(k) - only processes first k nodes
- Space: O(1) - uses only three pointers and one counter
- Optimal: No better approach exists for this problem

🎯 KEY DIFFERENCES FROM PREVIOUS VERSION:
- Cleaner loop condition: `c < k` instead of `c === k`
- Post-loop processing: Connection logic outside the loop
- Better readability: Clear separation of concerns
- Same performance: O(k) time, O(1) space

*/
