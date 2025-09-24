/* Problem:
Given a linked list and a number k, reverse every k nodes of the linked list.
If k >= length of linked list, reverse the entire list.

Example 1:
Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6, k = 3
Output: 3 -> 2 -> 1 -> 6 -> 5 -> 4
Explanation: Reverse first 3 nodes (1,2,3), then reverse next 3 nodes (4,5,6)

Example 2:
Input: 1 -> 2 -> 3 -> 4 -> 5, k = 2
Output: 2 -> 1 -> 4 -> 3 -> 5
Explanation: Reverse first 2 nodes (1,2), then reverse next 2 nodes (3,4), keep last node (5)

Example 3:
Input: 1 -> 2 -> 3 -> 4, k = 2
Output: 2 -> 1 -> 4 -> 3
Explanation: Reverse first 2 nodes (1,2), then reverse next 2 nodes (3,4)

Example 4:
Input: 1 -> 2 -> 3, k = 1
Output: 1 -> 2 -> 3
Explanation: Reverse every 1 node (no change)

Constraints:
1 ≤ k ≤ length of linked list
1 ≤ node values ≤ 1000

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n/k) - recursion stack depth
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
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

// ✅ TC = O(n) --> Visit each node exactly once
// ✅ SC = O(1) --> No extra space used
function reverseInGroupsIterative(head, k){
    let curr = head, prevFirst = null;
    let isFirstPass = true
    
    while(curr !== null){
        let first = curr, prev = null;
        let c=1;
        while(curr !== null && c <= k){
            let next = curr.next
            curr.next = prev
            prev = curr
            curr = next
            c++
        }
        
        if(isFirstPass){
            head = prev // in first pass the prev(after the above loop) should be the new head
            isFirstPass = false
        }else{
            prevFirst.next = prev
        }
        prevFirst = first
    }
    
    return head
}

// ✅ TC = O(n) --> Visit each node exactly once
// ✅ SC = O(n/k) --> Recursion stack depth (n/k groups)
// ✅ Recurence Relation: T(n) = T(n-k) + O(k)
function reverseInGroupsRecursive(head, k){
    
    let prev = null, curr = head;
    let c = 1;
    while(curr !== null && c <= k){
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
        c++
    }
    
    // Curr is the next node
    if(curr !== null){
        let remaining_head = reverseInGroupsRecursive(curr, k)
        head.next = remaining_head
    }
    
    return prev // Prev should be the new Head
}

// ✅ Test Cases
let head1 = new Node(10);
head1.next = new Node(20);
head1.next.next = new Node(30);
head1.next.next.next = new Node(40);
head1.next.next.next.next = new Node(50);
head1.next.next.next.next.next = new Node(60);
let modifiedHead1 = reverseInGroupsIterative(head1, 3);
console.log(print(modifiedHead1));
// 30 --> 20 --> 10 --> 60 --> 50 --> 40 --> null

let head2 = new Node(1);
head2.next = new Node(2);
head2.next.next = new Node(3);
head2.next.next.next = new Node(4);
head2.next.next.next.next = new Node(5);
let modifiedHead2 = reverseInGroupsIterative(head2, 2);
console.log(print(modifiedHead2));

/*🎯 CORE IDEA: We have TWO approaches to reverse every k nodes in groups - RECURSIVE and ITERATIVE. Both use THREE POINTERS for efficient reversal but differ in how they handle group connections.

📋 TWO SOLUTION APPROACHES:

🔄 RECURSIVE APPROACH:
- Uses recursion to naturally handle remaining groups
- Clean separation of concerns
- Space: O(n/k) due to recursion stack

🔄 ITERATIVE APPROACH:
- Uses loops to process all groups
- Constant space complexity O(1)
- More complex connection logic

📋 STEP-BY-STEP FLOW:

1️⃣ THREE POINTER TECHNIQUE (Both Approaches):
   - prev: Points to previous node (initially null)
   - curr: Points to current node (initially head)
   - next: Points to next node (temporary storage)

2️⃣ ITERATIVE REVERSAL (for current group):
   - Store next node before breaking link
   - Reverse current node's next pointer
   - Move pointers forward
   - Count processed nodes

3️⃣ GROUP CONNECTION DIFFERENCES:

🔄 RECURSIVE CONNECTION:
   - When count reaches k, stop reversal for current group
   - Recursively process remaining list
   - Original head becomes tail of current group
   - Recursive call returns head of next group
   - Connect tail to next group's head

🔄 ITERATIVE CONNECTION:
   - When count reaches k, stop reversal for current group
   - Store first node of current group (becomes tail after reversal)
   - Connect previous group's tail to current group's head
   - Update head pointer only on first pass
   - Continue with next group

🧠 WHY THESE APPROACHES?

🔄 RECURSIVE BENEFITS:
1️⃣ NATURAL: Recursion handles remaining groups naturally
2️⃣ CLEAN: Clear separation of reversal and connection
3️⃣ MODULAR: Each group is independent
4️⃣ READABLE: Easy to understand and implement

🔄 ITERATIVE BENEFITS:
1️⃣ SPACE EFFICIENT: O(1) space vs O(n/k) for recursive
2️⃣ PERFORMANCE: No function call overhead
3️⃣ CONTROL: More control over the process
4️⃣ SCALABLE: Better for very large lists

💡 KEY INSIGHTS:

🔄 COMMON INSIGHTS:
1️⃣ THREE POINTERS: prev, curr, next enable efficient reversal
2️⃣ COUNTING: Track processed nodes to stop at k
3️⃣ GROUP INDEPENDENCE: Each group is reversed independently
4️⃣ CONNECTION: Link groups together properly

🔄 RECURSIVE SPECIFIC:
- Recursion naturally handles remaining list
- Clean separation of concerns
- Handles variable group sizes elegantly

🔄 ITERATIVE SPECIFIC:
- prevFirst tracks tail of previous group
- isFirstPass handles head update
- first tracks original head of current group

🎯 WHY RECURSION WORKS?
- Each group is independent
- Natural way to process remaining list
- Clean separation of reversal and connection
- Handles variable group sizes

🎯 WHY ITERATION WORKS?
- Direct control over group processing
- No recursion stack overhead
- Constant space complexity
- Better performance for large lists

🎯 ALGORITHM INTUITION:

🔄 RECURSIVE INTUITION:
Think of it as "reversing each group independently" and then "connecting them together"
using recursion to handle the remaining groups.

🔄 ITERATIVE INTUITION:
Think of it as "processing groups sequentially" while "maintaining connections"
between groups using pointers and flags.

🎯 COMPLEXITY COMPARISON:

🔄 RECURSIVE:
- Time: O(n) - each node visited exactly once
- Space: O(n/k) - recursion stack depth
- Recurrence: T(n) = T(n-k) + O(k)

🔄 ITERATIVE:
- Time: O(n) - each node visited exactly once
- Space: O(1) - constant extra space
- No recursion overhead

🎯 WHEN TO USE WHICH?

🔄 USE RECURSIVE WHEN:
- Code readability is important
- List size is moderate
- Clean separation of concerns desired
- Learning/teaching purposes

🔄 USE ITERATIVE WHEN:
- Space efficiency is critical
- List size is very large
- Performance is important
- Production environment
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 10 -> 20 -> 30 -> 40 -> 50 -> 60, k = 3

🎯 GOAL: Reverse every 3 nodes in groups!

🔍 STEP-BY-STEP PROCESS:

📋 GROUP 1 REVERSAL (10 -> 20 -> 30):

INITIALIZATION:
prev = null, curr = head(10), c = 1

ITERATION 1 (c = 1, c <= k = 3):
next = 20, curr.next = null, prev = 10, curr = 20, c = 2
List: null <- 10    20 -> 30 -> 40 -> 50 -> 60

ITERATION 2 (c = 2, c <= k = 3):
next = 30, curr.next = 10, prev = 20, curr = 30, c = 3
List: null <- 10 <- 20    30 -> 40 -> 50 -> 60

ITERATION 3 (c = 3, c <= k = 3):
next = 40, curr.next = 20, prev = 30, curr = 40, c = 4
List: null <- 10 <- 20 <- 30    40 -> 50 -> 60

GROUP 1 COMPLETE (c = 4, c > k = 3):
prev = 30 (new head of group 1)
curr = 40 (head of remaining list)

🔄 RECURSIVE APPROACH (GROUP 2):
remaining_head = reverseInGroupsRecursive(40, 3)

GROUP 2 REVERSAL (40 -> 50 -> 60):

INITIALIZATION:
prev = null, curr = 40, c = 1

ITERATION 1 (c = 1, c <= k = 3):
next = 50, curr.next = null, prev = 40, curr = 50, c = 2
List: null <- 40    50 -> 60

ITERATION 2 (c = 2, c <= k = 3):
next = 60, curr.next = 40, prev = 50, curr = 60, c = 3
List: null <- 40 <- 50    60

ITERATION 3 (c = 3, c <= k = 3):
next = null, curr.next = 50, prev = 60, curr = null, c = 4
List: null <- 40 <- 50 <- 60

GROUP 2 COMPLETE (c = 4, c > k = 3):
prev = 60 (new head of group 2)
curr = null (no more nodes)

RECURSIVE CALL RETURNS: 60 (head of group 2)

📋 RECURSIVE CONNECTION:
head.next = remaining_head = 60
head = 10 (original head becomes tail of group 1)

✅✅✅✅ ITERATIVE APPROACH (GROUP 2):

INITIALIZATION:
curr = 40, prevFirst = 10 (tail of group 1), isFirstPass = false

GROUP 2 REVERSAL (40 -> 50 -> 60):

first = 40, prev = null, c = 1

ITERATION 1 (c = 1, c <= k = 3):
next = 50, curr.next = null, prev = 40, curr = 50, c = 2
List: null <- 40    50 -> 60

ITERATION 2 (c = 2, c <= k = 3):
next = 60, curr.next = 40, prev = 50, curr = 60, c = 3
List: null <- 40 <- 50    60

ITERATION 3 (c = 3, c <= k = 3):
next = null, curr.next = 50, prev = 60, curr = null, c = 4
List: null <- 40 <- 50 <- 60

GROUP 2 COMPLETE (c = 4, c > k = 3):
prev = 60 (new head of group 2)
curr = null (no more nodes)

📋 ITERATIVE CONNECTION:
prevFirst.next = prev = 60 (connect group 1 tail to group 2 head)
prevFirst = first = 40 (update tail for next group)

🏆 FINAL RESULT (Both Approaches):
List: 30 -> 20 -> 10 -> 60 -> 50 -> 40

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │ -> │ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 head

AFTER REVERSING IN GROUPS OF 3:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 30  │ -> │ 20  │ -> │ 10  │ -> │ 60  │ -> │ 50  │ -> │ 40  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 new head

─────────────────────────────────────────

📊 SIMPLE EXAMPLE:
head = 1 -> 2 -> 3 -> 4 -> 5, k = 2

🔍 Process:

GROUP 1 REVERSAL (1 -> 2):

ITERATION 1 (c = 1, c <= k = 2):
next = 2, curr.next = null, prev = 1, curr = 2, c = 2
List: null <- 1    2 -> 3 -> 4 -> 5

ITERATION 2 (c = 2, c <= k = 2):
next = 3, curr.next = 1, prev = 2, curr = 3, c = 3
List: null <- 1 <- 2    3 -> 4 -> 5

GROUP 1 COMPLETE (c = 3, c > k = 2):
prev = 2 (new head of group 1)
curr = 3 (head of remaining list)

RECURSIVE CALL (GROUP 2):
remaining_head = reverseInGroups(3, 2)

GROUP 2 REVERSAL (3 -> 4):

ITERATION 1 (c = 1, c <= k = 2):
next = 4, curr.next = null, prev = 3, curr = 4, c = 2
List: null <- 3    4 -> 5

ITERATION 2 (c = 2, c <= k = 2):
next = 5, curr.next = 3, prev = 4, curr = 5, c = 3
List: null <- 3 <- 4    5

GROUP 2 COMPLETE (c = 3, c > k = 2):
prev = 4 (new head of group 2)
curr = 5 (head of remaining list)

RECURSIVE CALL (GROUP 3):
remaining_head = reverseInGroups(5, 2)

GROUP 3 REVERSAL (5):

ITERATION 1 (c = 1, c <= k = 2):
next = null, curr.next = null, prev = 5, curr = null, c = 2
List: null <- 5

GROUP 3 COMPLETE (c = 2, c <= k = 2):
prev = 5 (new head of group 3)
curr = null (no more nodes)

RECURSIVE CALL RETURNS: 5 (head of group 3)

CONNECTION:
head.next = remaining_head = 5
head = 3 (original head becomes tail of group 2)

FINAL RESULT: 2 -> 1 -> 4 -> 3 -> 5

🏆 FINAL RESULT: 2 -> 1 -> 4 -> 3 -> 5 ✓

🎯 VISUAL REPRESENTATION:

ORIGINAL:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  3  │ -> │  4  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 head

AFTER REVERSING IN GROUPS OF 2:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  2  │ -> │  1  │ -> │  4  │ -> │  3  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑
 new head

🔍 WHY THIS WORKS:
1️⃣ THREE POINTERS enable efficient node reversal
2️⃣ COUNTING ensures we stop at exactly k nodes per group
3️⃣ RECURSION handles remaining groups naturally
4️⃣ CONNECTION links groups together properly

💡 KEY INSIGHT:
We process each group independently and then connect them together!
This gives us O(n) complexity with clean recursive structure.

🎯 TIME COMPLEXITY ANALYSIS:
- Visit each node exactly once: O(n)
- Each node operation: O(1)
- Recursion depth: O(n/k) groups
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n/k) groups
- Three pointers per call: O(1)
- Total: O(n/k)

🎯 EDGE CASES HANDLED:
- k = 1: No reversal needed, return original head
- k = list length: Reverse entire list
- Single node: Return as is
- Empty list: Handle gracefully

🎯 COMPARISON BETWEEN APPROACHES:

🔄 RECURSIVE vs ITERATIVE:

RECURSIVE APPROACH:
✅ PROS:
- Clean and readable code
- Natural handling of remaining groups
- Easy to understand and implement
- Clear separation of concerns
- Handles edge cases elegantly

❌ CONS:
- Uses O(n/k) space for recursion stack
- Function call overhead
- May cause stack overflow for very large lists
- Less control over the process

ITERATIVE APPROACH:
✅ PROS:
- O(1) space complexity
- No recursion stack overhead
- Better performance for large lists
- More control over the process
- No risk of stack overflow

❌ CONS:
- More complex connection logic
- Requires careful pointer management
- Harder to understand initially
- More prone to bugs

🎯 COMPARISON WITH OTHER APPROACHES:
- Array-based: O(n) time, O(n) space (copy to array)
- Stack-based: O(n) time, O(k) space (use stack for each group)
- Two-pass: O(n) time, O(1) space (count first, reverse second)

🎯 OPTIMIZATION TECHNIQUES:
- Use three pointers for efficient reversal
- Count nodes during traversal
- Recursive connection for clean code
- Handle edge cases gracefully

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always store next before breaking current link
- Use recursion for natural group processing
- Update head pointer when structure changes
- Handle edge cases (empty, single node)

🎯 REVERSAL PATTERN:
- Store next node
- Reverse current link
- Move pointers forward
- Repeat until condition met

🎯 RECURSIVE PATTERN:
- Process current group
- Recursively process remaining list
- Connect groups together
- Return new head

🎯 GROUP PROCESSING VISUALIZATION:

GROUP 1 (10 -> 20 -> 30):
┌─────┐    ┌─────┐    ┌─────┐
│ 10  │ -> │ 20  │ -> │ 30  │
└─────┘    └─────┘    └─────┘

AFTER REVERSAL:
┌─────┐    ┌─────┐    ┌─────┐
│ 30  │ -> │ 20  │ -> │ 10  │
└─────┘    └─────┘    └─────┘

GROUP 2 (40 -> 50 -> 60):
┌─────┐    ┌─────┐    ┌─────┐
│ 40  │ -> │ 50  │ -> │ 60  │
└─────┘    └─────┘    └─────┘

AFTER REVERSAL:
┌─────┐    ┌─────┐    ┌─────┐
│ 60  │ -> │ 50  │ -> │ 40  │
└─────┘    └─────┘    └─────┘

CONNECTION:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 30  │ -> │ 20  │ -> │ 10  │ -> │ 60  │ -> │ 50  │ -> │ 40  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘

🎯 ALGORITHM CORRECTNESS:
- Each group is reversed independently
- Groups are connected properly
- Recursion handles remaining list
- Head update ensures correct return value

🎯 RECURSION STACK VISUALIZATION:

CALL 1: reverseInGroups(10, 3)
- Reverses group: 10 -> 20 -> 30
- Calls: reverseInGroups(40, 3)

CALL 2: reverseInGroups(40, 3)
- Reverses group: 40 -> 50 -> 60
- Calls: reverseInGroups(null, 3)

CALL 3: reverseInGroups(null, 3)
- Base case: returns null

RETURN CHAIN:
- CALL 3 returns: null
- CALL 2 returns: 60 (head of group 2)
- CALL 1 returns: 30 (head of group 1)

🎯 WHY RECURSION IS NATURAL:
- Each group is independent
- Natural way to process remaining list
- Clean separation of concerns
- Handles variable group sizes

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - each node visited exactly once
- Space: O(n/k) - recursion stack depth
- Optimal: Clean recursive solution

🎯 KEY DIFFERENCES FROM SINGLE REVERSAL:
- Processes multiple groups
- Uses recursion/iteration for remaining list
- Connects groups together
- Handles variable group sizes

🎯 ITERATIVE APPROACH DETAILED WALKTHROUGH:

📊 INPUT: head = 1 -> 2 -> 3 -> 4 -> 5, k = 2

🔍 ITERATIVE PROCESS:

INITIALIZATION:
curr = head(1), prevFirst = null, isFirstPass = true

─────────────────────────────────────────

GROUP 1 PROCESSING:

first = 1, prev = null, c = 1

ITERATION 1 (c = 1, c <= k = 2):
next = 2, curr.next = null, prev = 1, curr = 2, c = 2
List: null <- 1    2 -> 3 -> 4 -> 5

ITERATION 2 (c = 2, c <= k = 2):
next = 3, curr.next = 1, prev = 2, curr = 3, c = 3
List: null <- 1 <- 2    3 -> 4 -> 5

GROUP 1 COMPLETE (c = 3, c > k = 2):
prev = 2 (new head of group 1)
curr = 3 (head of remaining list)

CONNECTION LOGIC:
isFirstPass = true → head = prev = 2 (update head)
isFirstPass = false (for next groups)
prevFirst = first = 1 (tail of group 1)

─────────────────────────────────────────

GROUP 2 PROCESSING:

first = 3, prev = null, c = 1

ITERATION 1 (c = 1, c <= k = 2):
next = 4, curr.next = null, prev = 3, curr = 4, c = 2
List: null <- 3    4 -> 5

ITERATION 2 (c = 2, c <= k = 2):
next = 5, curr.next = 3, prev = 4, curr = 5, c = 3
List: null <- 3 <- 4    5

GROUP 2 COMPLETE (c = 3, c > k = 2):
prev = 4 (new head of group 2)
curr = 5 (head of remaining list)

CONNECTION LOGIC:
isFirstPass = false → prevFirst.next = prev = 4
prevFirst = first = 3 (tail of group 2)

─────────────────────────────────────────

GROUP 3 PROCESSING:

first = 5, prev = null, c = 1

ITERATION 1 (c = 1, c <= k = 2):
next = null, curr.next = null, prev = 5, curr = null, c = 2
List: null <- 5

GROUP 3 COMPLETE (c = 2, c <= k = 2):
prev = 5 (new head of group 3)
curr = null (no more nodes)

CONNECTION LOGIC:
isFirstPass = false → prevFirst.next = prev = 5
prevFirst = first = 5 (tail of group 3)

─────────────────────────────────────────

🏆 FINAL RESULT: 2 -> 1 -> 4 -> 3 -> 5

🎯 ITERATIVE KEY POINTERS:

🔄 prevFirst:
- Tracks the tail of the previous group
- Used to connect previous group to current group
- Updated after each group processing

🔄 isFirstPass:
- Boolean flag to handle head update
- Only true for the first group
- Ensures head is updated only once

🔄 first:
- Stores the original head of current group
- Becomes the tail after reversal
- Used to update prevFirst for next iteration

🔄 prev:
- After reversal loop, points to new head of current group
- Used for connection logic
- Returned as result for recursive approach

🎯 ITERATIVE CONNECTION PATTERN:

GROUP 1: head = prev (update head pointer)
GROUP 2+: prevFirst.next = prev (connect previous tail to current head)

🎯 ITERATIVE ADVANTAGES:
- No recursion stack
- Constant space O(1)
- Better for large lists
- No function call overhead
- More control over process

🎯 ITERATIVE CHALLENGES:
- Complex pointer management
- Careful connection logic
- More prone to bugs
- Harder to debug

*/