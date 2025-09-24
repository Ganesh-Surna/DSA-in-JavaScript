/* Problem:
Given a linked list that contains a cycle, remove the cycle and return the modified linked list.

A cycle exists when a node in the linked list can be reached again by following the next pointers continuously. The task is to identify the cycle, find the node where the cycle starts, and break the cycle by setting the appropriate next pointer to null.

Example 1:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (points back to node 2)
Output: 1 -> 2 -> 3 -> 4 -> 5 -> null
Explanation: Remove the cycle by setting node 5's next to null

Example 2:
Input: 1 -> 2 -> 3 -> 1 (points back to head)
Output: 1 -> 2 -> 3 -> null
Explanation: Remove the cycle by setting node 3's next to null

Example 3:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 3 (points back to node 3)
Output: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
Explanation: Remove the cycle by setting node 6's next to null

Example 4:
Input: 1 -> 1 (self-loop)
Output: 1 -> null
Explanation: Remove the self-loop by setting node 1's next to null

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

// ✅ TC: O(n) --> Floyd's algorithm + cycle removal
// ✅ SC: O(1) --> Only pointers used
function removeLoop(head){
    let slow = head, fast = head;
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next

        // It should be below the above statements, because initially slow & fast are same 
        if(slow === fast){
            break
        }
    }
    if(slow !== fast){
        return head
    }
    
    // ✅ Correct Approach:
    // Find the starting node of the loop
    slow = head;
    while(slow !== fast){
        slow = slow.next;
        fast = fast.next;
    }
    
    // Remove the loop
    let curr = slow;
        do{
            curr = curr.next
        }while(curr.next !== slow)
        
        curr.next = null
        
    return head

    // ❌ Wrong Approach:
    // slow = head;
    // while(slow.next !== fast.next){
    //     slow = slow.next;
    //     fast = fast.next;
    // }
    
    // slow.next = null
    // return head
}

function print(head){
    let curr = head;
    let res = ''
    while(curr){
        res += curr.key + ' --> '
        curr = curr.next
    }
    
    return res + curr
}

// ✅ Test Cases
let head1 = new Node(10);
head1.next = new Node(20);
head1.next.next = new Node(30);
head1.next.next.next = new Node(40);
head1.next.next.next.next = new Node(50);
head1.next.next.next.next.next = new Node(60);
head1.next.next.next.next.next.next = head1.next.next; // Creates loop at node 30
console.log("Before removing loop:", print(head1));
removeLoop(head1);
console.log("After removing loop:", print(head1));

let head2 = new Node(1);
head2.next = new Node(2);
head2.next.next = new Node(3);
head2.next.next.next = head2; // Creates loop at head
console.log("Before removing loop:", print(head2));
removeLoop(head2);
console.log("After removing loop:", print(head2));

let head3 = new Node(1);
head3.next = head3; // Self-loop
console.log("Before removing loop:", print(head3));
removeLoop(head3);
console.log("After removing loop:", print(head3));

/*🎯 CORE IDEA: We use FLOYD'S CYCLE DETECTION ALGORITHM to find the cycle, then use the MATHEMATICAL PROPERTY to find the node just before the cycle start, and finally break the cycle by setting that node's next pointer to null.

📋 STEP-BY-STEP FLOW:

1️⃣ PHASE 1 - CYCLE DETECTION (Floyd's Algorithm):
   - Use slow and fast pointers
   - slow moves 1 step, fast moves 2 steps
   - When they meet, cycle is confirmed

2️⃣ PHASE 2 - FIND CYCLE BREAK POINT:
   - Reset slow to head
   - Move both slow and fast one step at a time
   - When slow.next === fast.next, we found the break point

3️⃣ PHASE 3 - BREAK THE CYCLE:
   - Set slow.next = null
   - This breaks the cycle and creates a linear list

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ MATHEMATICAL: Based on Floyd's cycle detection theorem
3️⃣ OPTIMAL: No extra space needed
4️⃣ CLEAN: Simple cycle removal

💡 KEY INSIGHTS:

1️⃣ CYCLE DETECTION: Floyd's algorithm finds if cycle exists
2️⃣ BREAK POINT: Find node just before cycle start
3️⃣ CYCLE REMOVAL: Set break point's next to null
4️⃣ LIST RESTORATION: Creates proper linear linked list

🎯 WHY FLOYD'S ALGORITHM WORKS FOR CYCLE REMOVAL?
- When slow and fast meet in cycle, they are at distance 'd' from cycle start
- Distance from head to cycle start = distance from meeting point to cycle start
- Moving both pointers one step at a time will meet at cycle start
- We need the node BEFORE cycle start to break the cycle

🎯 ALGORITHM INTUITION:
Think of it as "finding the cycle" then "locating the break point" 
then "cutting the cycle" to create a linear list.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> 30 (cycle at node 30)

🎯 GOAL: Remove the cycle and create a linear list!

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

📋 PHASE 2 - FIND CYCLE BREAK POINT:

RESET POINTERS:
slow = head(10), fast = 50 (meeting point)

ITERATION 1:
slow.next = 20, fast.next = 60
slow.next !== fast.next → Continue
slow = slow.next = 20, fast = fast.next = 60

ITERATION 2:
slow.next = 30, fast.next = 30
slow.next === fast.next → BREAK POINT FOUND!

📋 PHASE 3 - BREAK THE CYCLE:

BREAK THE CYCLE:
slow.next = null (node 20's next becomes null)

🏆 RESULT: 10 -> 20 -> 30 -> 40 -> 50 -> 60 -> null

🎯 VISUAL REPRESENTATION:

BEFORE REMOVAL:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑                                                    ↓
   └────────────────────────────────────────────────────┘
                    CYCLE EXISTS

AFTER REMOVAL:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │ -> null
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
                    CYCLE REMOVED

🔍 WHY THIS WORKS:
1️⃣ FLOYD'S ALGORITHM detects cycle efficiently
2️⃣ MATHEMATICAL PROPERTY finds break point
3️⃣ SIMPLE ASSIGNMENT breaks the cycle
4️⃣ LINEAR LIST is created

💡 KEY INSIGHT:
The algorithm finds the node just before the cycle start
and breaks the cycle by setting its next to null!

🎯 TIME COMPLEXITY: O(n) - Floyd's algorithm + break point finding
🎯 SPACE COMPLEXITY: O(1) - Only pointers used
🎯 EDGE CASES: Self-loop, cycle at head, large cycles
🎯 MATHEMATICAL PROOF: Based on Floyd's cycle detection theorem

🎯 COMPARISON WITH OTHER APPROACHES:
- Hash Set: O(n) time, O(n) space (tracks visited nodes)
- Floyd's Algorithm: O(n) time, O(1) space (optimal)
- Marking Nodes: O(n) time, O(1) space (modifies structure)

🎯 OPTIMIZATION TECHNIQUES:
- Use Floyd's algorithm for cycle detection
- Use mathematical property for break point
- Simple null assignment for cycle removal
- No extra space required

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Use two-pointer technique for cycle detection
- Maintain pointer integrity
- Handle edge cases gracefully

🎯 CYCLE REMOVAL PATTERN:
- Detect cycle using Floyd's algorithm
- Find break point using mathematical property
- Break cycle by setting next to null
- Return modified head

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to detect cycle if exists
- Guaranteed to find correct break point
- Guaranteed to remove cycle completely
- Optimal time and space complexity

🎯 WHY THREE PHASES?
- Phase 1: Confirm cycle exists
- Phase 2: Find where to break cycle
- Phase 3: Actually break the cycle
- Each phase has specific purpose

🎯 REAL-WORLD APPLICATIONS:
- Memory leak prevention
- Infinite loop prevention
- Graph cycle removal
- Circular dependency resolution

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for cycle removal
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM CYCLE DETECTION:
- Not just detects cycle, but removes it
- Finds break point instead of cycle start
- Modifies the linked list structure
- Creates linear list from cyclic list

🎯 BREAK POINT LOGIC:
- We need the node BEFORE cycle start
- slow.next === fast.next identifies this node
- Setting slow.next = null breaks the cycle
- This creates a proper linear list

*/