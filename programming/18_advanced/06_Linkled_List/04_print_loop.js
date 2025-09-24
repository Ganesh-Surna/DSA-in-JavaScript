/* Problem:
Given a linked list that contains a cycle, find and print all nodes in the cycle.

A cycle exists when a node in the linked list can be reached again by following the next pointers continuously. The task is to identify the cycle and print all nodes that are part of the cycle.

Example 1:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (points back to node 2)
Output: "2 --> 3 --> 4 --> 5 --> 2"
Explanation: The cycle contains nodes 2, 3, 4, 5

Example 2:
Input: 1 -> 2 -> 3 -> 1 (points back to head)
Output: "1 --> 2 --> 3 --> 1"
Explanation: The cycle contains nodes 1, 2, 3

Example 3:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 3 (points back to node 3)
Output: "3 --> 4 --> 5 --> 6 --> 3"
Explanation: The cycle contains nodes 3, 4, 5, 6

Example 4:
Input: 1 -> 1 (self-loop)
Output: "1 --> 1"
Explanation: The cycle contains only node 1

Constraints:
- The linked list is guaranteed to have a cycle
- The number of nodes in the list is in the range [1, 10^4]
- -10^5 <= Node.val <= 10^5

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
}

// ✅ TC: O(n) --> Floyd's algorithm + cycle traversal
// ✅ SC: O(1) --> Only pointers used
function detectLoop(head){
    let slow = head, fast = head;
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast){
            break
        }
    }
    if(slow !== fast){
        return null
    }
    
    slow = head
    while(slow !== fast){
        slow = slow.next
        fast = fast.next
    }
    
    let loop = printLoop(slow)
    return loop
}

// ✅ TC: O(k) --> k = cycle length
// ✅ SC: O(1) --> Only one pointer used
function printLoop(node){
    let curr = node;
    let res = ''
    do{
        res += curr.key + ' --> '
        curr = curr.next
    }
    while(curr !== node)
    
    return res + curr.key
}

// ✅ Test Cases
let head1 = new Node(10);
head1.next = new Node(20);
head1.next.next = new Node(30);
head1.next.next.next = new Node(40);
head1.next.next.next.next = new Node(50);
head1.next.next.next.next.next = new Node(60);
head1.next.next.next.next.next.next = head1.next.next; // Creates loop at node 30
console.log("Cycle nodes:", detectLoop(head1)); // "30 --> 40 --> 50 --> 60 --> 30"

let head2 = new Node(1);
head2.next = new Node(2);
head2.next.next = new Node(3);
head2.next.next.next = head2; // Creates loop at head
console.log("Cycle nodes:", detectLoop(head2)); // "1 --> 2 --> 3 --> 1"

let head3 = new Node(1);
head3.next = head3; // Self-loop
console.log("Cycle nodes:", detectLoop(head3)); // "1 --> 1"

/*🎯 CORE IDEA: We use FLOYD'S CYCLE DETECTION ALGORITHM to find the cycle, then use the MATHEMATICAL PROPERTY that the meeting point of slow and fast pointers is equidistant from the cycle start and head, allowing us to find the cycle start and print all cycle nodes.

📋 STEP-BY-STEP FLOW:

1️⃣ PHASE 1 - CYCLE DETECTION (Floyd's Algorithm):
   - Use slow and fast pointers
   - slow moves 1 step, fast moves 2 steps
   - When they meet, cycle is confirmed

2️⃣ PHASE 2 - CYCLE START DETECTION:
   - Reset slow to head
   - Move both slow and fast one step at a time
   - When they meet again, that's the cycle start

3️⃣ PHASE 3 - CYCLE PRINTING:
   - Start from cycle start node
   - Traverse the cycle using do-while loop
   - Print all nodes until we return to start

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ MATHEMATICAL: Based on Floyd's cycle detection theorem
3️⃣ OPTIMAL: No extra space needed
4️⃣ COMPLETE: Finds and prints entire cycle

💡 KEY INSIGHTS:

1️⃣ CYCLE DETECTION: Floyd's algorithm finds if cycle exists
2️⃣ CYCLE START: Mathematical property finds cycle start
3️⃣ CYCLE TRAVERSAL: Do-while loop prints all cycle nodes
4️⃣ TERMINATION: Loop ends when we return to start node

🎯 WHY FLOYD'S ALGORITHM WORKS FOR CYCLE START?
- When slow and fast meet in cycle, they are at distance 'd' from cycle start
- Distance from head to cycle start = distance from meeting point to cycle start
- Moving both pointers one step at a time will meet at cycle start

🎯 ALGORITHM INTUITION:
Think of it as "finding the cycle" then "locating the cycle start" 
then "traversing the cycle to print all nodes".
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 30 (cycle at node 30)

🎯 GOAL: Find cycle start and print all cycle nodes!

🔍 STEP-BY-STEP PROCESS:

📋 PHASE 1 - CYCLE DETECTION:

INITIALIZATION:
slow = head(10), fast = head(10)

ITERATION 1:
slow = slow.next = 20
fast = fast.next.next = 30
slow = 20, fast = 30
slow !== fast → Continue

ITERATION 2:
slow = slow.next = 30
fast = fast.next.next = 50
slow = 30, fast = 50
slow !== fast → Continue

ITERATION 3:
slow = slow.next = 40
fast = fast.next.next = 30
slow = 40, fast = 30
slow !== fast → Continue

ITERATION 4:
slow = slow.next = 50
fast = fast.next.next = 50
slow = 50, fast = 50
slow === fast → CYCLE DETECTED!

📋 PHASE 2 - CYCLE START DETECTION:

RESET POINTERS:
slow = head(10), fast = 50 (meeting point)

ITERATION 1:
slow = slow.next = 20
fast = fast.next = 60
slow = 20, fast = 60
slow !== fast → Continue

ITERATION 2:
slow = slow.next = 30
fast = fast.next = 30
slow = 30, fast = 30
slow === fast → CYCLE START FOUND!

📋 PHASE 3 - CYCLE PRINTING:

START FROM CYCLE START:
curr = 30 (cycle start node)
res = ''

ITERATION 1:
res += '30 --> '
curr = curr.next = 40
curr !== 30 → Continue

ITERATION 2:
res += '40 --> '
curr = curr.next = 50
curr !== 30 → Continue

ITERATION 3:
res += '50 --> '
curr = curr.next = 60
curr !== 30 → Continue

ITERATION 4:
res += '60 --> '
curr = curr.next = 30
curr === 30 → Loop ends

FINAL RESULT:
res + curr.key = '30 --> 40 --> 50 --> 60 --> 30'

🏆 OUTPUT: "30 --> 40 --> 50 --> 60 --> 30"

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
head = 1 -> 2 -> 3 -> 1 (cycle at head)

🔍 Process:

PHASE 1 - CYCLE DETECTION:
slow = 1, fast = 1
slow = 2, fast = 1 (fast.next.next = 1)
slow = 3, fast = 3 (fast.next.next = 3)
slow === fast → CYCLE DETECTED!

PHASE 2 - CYCLE START DETECTION:
slow = 1 (head), fast = 3 (meeting point)
slow = 2, fast = 1
slow = 3, fast = 2
slow = 1, fast = 3
slow = 2, fast = 1
slow = 3, fast = 2
slow = 1, fast = 3
slow === fast → CYCLE START FOUND!

PHASE 3 - CYCLE PRINTING:
curr = 1, res = ''
res += '1 --> ', curr = 2
res += '2 --> ', curr = 3
res += '3 --> ', curr = 1
curr === 1 → Loop ends

🏆 OUTPUT: "1 --> 2 --> 3 --> 1"

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST WITH CYCLE:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑                                                    ↓
   └────────────────────────────────────────────────────┘
                    CYCLE DETECTED!

CYCLE START DETECTION:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑                                                    ↓
   └────────────────────────────────────────────────────┘
                    CYCLE START = 30

CYCLE PRINTING:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘
   ↑                                    ↓
   └────────────────────────────────────┘
                    CYCLE NODES

🔍 WHY THIS WORKS:
1️⃣ FLOYD'S ALGORITHM detects cycle efficiently
2️⃣ MATHEMATICAL PROPERTY finds cycle start
3️⃣ DO-WHILE LOOP traverses entire cycle
4️⃣ TERMINATION when we return to start

💡 KEY INSIGHT:
The algorithm combines cycle detection with cycle start finding
to print all nodes in the cycle!

🎯 TIME COMPLEXITY ANALYSIS:
- Phase 1 (Cycle Detection): O(n) - Floyd's algorithm
- Phase 2 (Cycle Start): O(n) - At most n steps
- Phase 3 (Cycle Printing): O(k) - k = cycle length
- Total: O(n) + O(n) + O(k) = O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Only pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Self-loop: Single node cycle
- Cycle at head: Head is part of cycle
- Large cycles: Handled efficiently
- No cycle: Returns null

🎯 MATHEMATICAL PROOF:
- When slow and fast meet, they are at distance 'd' from cycle start
- Distance from head to cycle start = distance from meeting point to cycle start
- Moving both pointers one step at a time will meet at cycle start
- This is guaranteed by Floyd's cycle detection theorem

🎯 COMPARISON WITH OTHER APPROACHES:
- Hash Set: O(n) time, O(n) space (tracks visited nodes)
- Floyd's Algorithm: O(n) time, O(1) space (optimal)
- Marking Nodes: O(n) time, O(1) space (modifies structure)

🎯 OPTIMIZATION TECHNIQUES:
- Use Floyd's algorithm for cycle detection
- Use mathematical property for cycle start
- Use do-while loop for cycle traversal
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
- Use meeting point to find cycle start

🎯 CYCLE PRINTING PATTERN:
- Start from cycle start node
- Use do-while loop for traversal
- Print each node value
- Terminate when returning to start

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to detect cycle if exists
- Guaranteed to find cycle start
- Guaranteed to print all cycle nodes
- Optimal time and space complexity

🎯 WHY THREE PHASES?
- Phase 1: Confirm cycle exists
- Phase 2: Find where cycle starts
- Phase 3: Print all cycle nodes
- Each phase has specific purpose

🎯 REAL-WORLD APPLICATIONS:
- Memory leak detection
- Infinite loop detection
- Graph cycle detection
- Circular dependency detection

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for cycle detection and printing
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM CYCLE DETECTION:
- Not just detects cycle, but finds cycle start
- Prints all nodes in the cycle
- Uses mathematical property for cycle start
- Complete cycle information

🎯 DO-WHILE LOOP ADVANTAGE:
- Executes at least once (handles single node cycle)
- Natural termination condition
- Simple to implement
- Handles all cycle sizes

*/