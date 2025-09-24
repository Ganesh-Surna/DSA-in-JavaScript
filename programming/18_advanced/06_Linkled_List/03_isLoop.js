/* Problem:
Given a linked list, determine if it has a cycle (loop) in it.

A cycle exists when a node in the linked list can be reached again by following the next pointers continuously.

Example 1:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (points back to node 2)
Output: true
Explanation: The linked list has a cycle starting at node 2

Example 2:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
Output: false
Explanation: The linked list has no cycle

Example 3:
Input: 1 -> 2 -> 3 -> 1 (points back to head)
Output: true
Explanation: The linked list has a cycle starting at node 1

Example 4:
Input: 1 -> null
Output: false
Explanation: Single node with no cycle

Constraints:
- The number of nodes in the list is in the range [0, 10^4]
- -10^5 <= Node.val <= 10^5
- pos is -1 or a valid index in the linked-list

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
}

// ✅ TC: O(n) --> At most n iterations before cycle detection
// ✅ SC: O(1) --> Only two pointers used
function isLoopExist(head){
    let slow = head, fast = head;
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast){
            return true
        }
    }
    return false
}

// ✅ Test Cases
let head1 = new Node(10);
head1.next = new Node(20);
head1.next.next = new Node(30);
head1.next.next.next = new Node(40);
head1.next.next.next.next = new Node(50);
head1.next.next.next.next.next = new Node(60);
head1.next.next.next.next.next.next = head1.next.next; // Creates loop at node 30
console.log("Loop exists:", isLoopExist(head1)); // true

let head2 = new Node(1);
head2.next = new Node(2);
head2.next.next = new Node(3);
head2.next.next.next = new Node(4);
head2.next.next.next.next = new Node(5);
console.log("Loop exists:", isLoopExist(head2)); // false

let head3 = new Node(1);
head3.next = head3; // Self-loop
console.log("Loop exists:", isLoopExist(head3)); // true

/*🎯 CORE IDEA: Instead of using extra space to track visited nodes, we use FLOYD'S CYCLE DETECTION ALGORITHM (Tortoise and Hare) with TWO POINTERS moving at different speeds to detect cycles in O(n) time and O(1) space.

📋 STEP-BY-STEP FLOW:

1️⃣ TWO POINTER TECHNIQUE:
   - slow: Moves one step at a time (tortoise)
   - fast: Moves two steps at a time (hare)
   - Both start from head

2️⃣ MOVEMENT PATTERN:
   - slow = slow.next (one step)
   - fast = fast.next.next (two steps)
   - Check if slow === fast (meeting point)

3️⃣ TERMINATION CONDITIONS:
   - fast === null: End of list reached (no cycle)
   - fast.next === null: End of list reached (no cycle)
   - slow === fast: Cycle detected (pointers met)

4️⃣ CYCLE DETECTION:
   - If cycle exists, fast will eventually catch up to slow
   - If no cycle, fast will reach null first

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ MATHEMATICAL: Based on cycle detection theorem
3️⃣ OPTIMAL: No extra space needed
4️⃣ ELEGANT: Simple two-pointer technique

💡 KEY INSIGHTS:

1️⃣ SPEED DIFFERENCE: Fast pointer moves twice as fast as slow
2️⃣ CYCLE GUARANTEE: If cycle exists, they will meet
3️⃣ NO CYCLE GUARANTEE: If no cycle, fast reaches null
4️⃣ MEETING POINT: When they meet, cycle is confirmed

🎯 WHY FLOYD'S ALGORITHM WORKS?
- If cycle exists, fast pointer will eventually lap slow pointer
- Speed difference ensures they will meet within cycle
- Mathematical proof guarantees detection in O(n) time

🎯 ALGORITHM INTUITION:
Think of it as "two runners on a circular track" - the faster runner will
eventually catch up to the slower runner if they're on the same track.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT WITH CYCLE:
head = 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 30 (cycle at node 30)

🎯 GOAL: Detect if cycle exists using Floyd's algorithm!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
slow = head(10), fast = head(10)

─────────────────────────────────────────

ITERATION 1:
slow = slow.next = 20
fast = fast.next.next = 30
slow = 20, fast = 30
slow !== fast → Continue

─────────────────────────────────────────

ITERATION 2:
slow = slow.next = 30
fast = fast.next.next = 50
slow = 30, fast = 50
slow !== fast → Continue

─────────────────────────────────────────

ITERATION 3:
slow = slow.next = 40
fast = fast.next.next = 30
slow = 40, fast = 30
slow !== fast → Continue

─────────────────────────────────────────

ITERATION 4:
slow = slow.next = 50
fast = fast.next.next = 50
slow = 50, fast = 50
slow === fast → CYCLE DETECTED!

🏆 RESULT: true (cycle exists)

─────────────────────────────────────────

📊 INPUT WITHOUT CYCLE:
head = 1 -> 2 -> 3 -> 4 -> 5 -> null

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
slow = head(1), fast = head(1)

─────────────────────────────────────────

ITERATION 1:
slow = slow.next = 2
fast = fast.next.next = 3
slow = 2, fast = 3
slow !== fast → Continue

─────────────────────────────────────────

ITERATION 2:
slow = slow.next = 3
fast = fast.next.next = 5
slow = 3, fast = 5
slow !== fast → Continue

─────────────────────────────────────────

ITERATION 3:
slow = slow.next = 4
fast = fast.next.next = null
slow = 4, fast = null
fast === null → NO CYCLE!

🏆 RESULT: false (no cycle)

🎯 VISUAL REPRESENTATION:

WITH CYCLE:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑                                                    ↓
   └────────────────────────────────────────────────────┘
                    CYCLE DETECTED!

WITHOUT CYCLE:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  3  │ -> │  4  │ -> │  5  │ -> null
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
                    NO CYCLE

🔍 WHY THIS WORKS:
1️⃣ SPEED DIFFERENCE ensures fast pointer will catch slow pointer in cycle
2️⃣ TERMINATION CONDITIONS handle both cycle and non-cycle cases
3️⃣ MATHEMATICAL PROOF guarantees detection in O(n) time
4️⃣ CONSTANT SPACE makes it optimal

💡 KEY INSIGHT:
The algorithm is like two runners on a track - if there's a loop,
the faster runner will eventually catch the slower runner!

🎯 TIME COMPLEXITY ANALYSIS:
- Worst case: O(n) when cycle exists
- Best case: O(1) when no cycle and list is short
- Average case: O(n) for most inputs

🎯 SPACE COMPLEXITY ANALYSIS:
- Only two pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Empty list: Returns false
- Single node: Returns false (unless self-loop)
- Self-loop: Returns true
- Large cycles: Handled efficiently

🎯 MATHEMATICAL PROOF:
- If cycle exists, fast pointer will meet slow pointer
- Meeting happens within cycle length
- Maximum iterations: n (number of nodes)
- Guaranteed termination

🎯 COMPARISON WITH OTHER APPROACHES:
- Hash Set: O(n) time, O(n) space (tracks visited nodes)
- Floyd's Algorithm: O(n) time, O(1) space (optimal)
- Marking Nodes: O(n) time, O(1) space (modifies structure)

🎯 OPTIMIZATION TECHNIQUES:
- Use two pointers with speed ratio 2:1
- Check fast.next !== null to avoid null pointer
- Early termination when cycle detected
- No extra space required

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Use two-pointer technique for cycle detection
- Maintain pointer integrity
- Handle edge cases gracefully

🎯 CYCLE DETECTION PATTERN:
- Initialize both pointers at head
- Move pointers at different speeds
- Check for meeting point
- Handle termination conditions

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to detect cycle if exists
- Guaranteed to terminate if no cycle
- Optimal time and space complexity
- Handles all edge cases

🎯 WHY SPEED RATIO 2:1?
- Ensures fast pointer will catch slow pointer
- Optimal for cycle detection
- Simple to implement
- Mathematically proven

🎯 REAL-WORLD APPLICATIONS:
- Memory leak detection
- Infinite loop detection
- Graph cycle detection
- Circular dependency detection

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for cycle detection
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM OTHER METHODS:
- No extra space needed
- No structure modification
- Optimal complexity
- Elegant solution

*/