/* Problem:
Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

You are given the head of a singly linked list. The task is to swap every two adjacent nodes and return the head of the modified list.

Example 1:
Input: head = [1, 2, 3, 4]
Output: [2, 1, 4, 3]
Explanation: Swap 1 and 2, then swap 3 and 4.

Example 2:
Input: head = [1, 2, 3, 4, 5]
Output: [2, 1, 4, 3, 5]
Explanation: Swap 1 and 2, then swap 3 and 4. Node 5 remains unchanged.

Example 3:
Input: head = [1]
Output: [1]
Explanation: Only one node, no swapping needed.

Example 4:
Input: head = [1, 2]
Output: [2, 1]
Explanation: Swap the two nodes.

Example 5:
Input: head = [17, 15, 8, 12, 5]
Output: [15, 17, 12, 8, 5]
Explanation: Swap 17 and 15, then swap 8 and 12. Node 5 remains unchanged.

Constraints:
- The number of nodes in the list is in the range [0, 100]
- 0 <= Node.val <= 100

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
}

// I. Optimized Solution (Pointer Manipulation):
// ✅ TC = O(n) --> Single pass through the list
// ✅ SC = O(1) --> Only pointers used
function swapPair(head) {
    if (head === null || head.next === null){
        return head;   
    }  
  
    let curr = head.next.next; // to get hold of this(next of head's next), while swapping head & its next
    let prev = head;
    
    // Swapping head & its next
    head = head.next;
    head.next = prev
    
    // 1 node gap between prev & curr
    while(curr !== null && curr.next !== null){
        prev.next = curr.next;
        prev = curr; // prev skipping one node
        let next = curr.next.next;
        curr.next.next = curr
        curr = next // curr skipping one node
    }
    prev.next = curr // since prev is the last node of last pair (in odd len list --> curr will be last node of list. And in even len list curr will be null)
    return head
}

// II. Reverse in groups of 2 (i.e., k=2) (Also optimized solution):
function reverseInGroupsIterative(head, k=2){
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
            prevFirst = first // Storing the first node(since it is the last node of the group after reveresing) of each group
        }else{
            prevFirst.next = prev // connecting the last node(after reversing) of each group to the first node(after reversing) of the next group
            prevFirst = first // Storing the first node of each group
        }
    }
    
    return head
}

// III. Naive Solution (Swapping data of nodes):
// ✅ TC = O(n)
// ✅ SC = O(1)
function swapPairNaive(head) {
    if (!head) return null;
  
    let curr = head
    while(curr !== null && curr.next !== null){
        [curr.key, curr.next.key] = [curr.next.key, curr.key] // swapping curr & next of curr data
        curr = curr.next.next // skipping next of curr
    }
    
    return head
}

function print(head){
    let curr = head;
    let res = ''
    while(curr){
        res += curr.key + ' --> '
        curr = curr.next
    }
    
    return res + 'null'
}

// ✅ Test Cases
let head1 = new Node(17)
head1.next = new Node(15)
head1.next.next = new Node(8)
head1.next.next.next = new Node(12)
head1.next.next.next.next = new Node(5)
console.log("Original:", print(head1));
let finalHead1 = swapPair(head1)
console.log("Pairwise Swapped:", print(finalHead1)); // 15 --> 17 --> 12 --> 8 --> 5 --> null

let head2 = new Node(1)
head2.next = new Node(2)
head2.next.next = new Node(3)
head2.next.next.next = new Node(4)
console.log("Original:", print(head2));
let finalHead2 = swapPair(head2)
console.log("Pairwise Swapped:", print(finalHead2)); // 2 --> 1 --> 4 --> 3 --> null

let head3 = new Node(1)
head3.next = new Node(2)
head3.next.next = new Node(3)
head3.next.next.next = new Node(4)
head3.next.next.next.next = new Node(5)
console.log("Original:", print(head3));
let finalHead3 = swapPair(head3)
console.log("Pairwise Swapped:", print(finalHead3)); // 2 --> 1 --> 4 --> 3 --> 5 --> null

let head4 = new Node(1)
console.log("Original:", print(head4));
let finalHead4 = swapPair(head4)
console.log("Pairwise Swapped:", print(finalHead4)); // 1 --> null

let head5 = new Node(1)
head5.next = new Node(2)
console.log("Original:", print(head5));
let finalHead5 = swapPair(head5)
console.log("Pairwise Swapped:", print(finalHead5)); // 2 --> 1 --> null

/*🎯 CORE IDEA: We use a POINTER MANIPULATION approach to swap adjacent nodes. We handle the first pair separately, then use a loop to process remaining pairs. This approach modifies the structure without changing node values.

📋 STEP-BY-STEP FLOW:

1️⃣ EDGE CASE HANDLING:
   - If head is null or has only one node, return head
   - No swapping needed for single node or empty list

2️⃣ FIRST PAIR HANDLING:
   - Store reference to third node: curr = head.next.next
   - Store reference to first node: prev = head
   - Swap first two nodes: head = head.next, head.next = prev
   - This makes the second node the new head

3️⃣ REMAINING PAIRS PROCESSING:
   - Use while loop to process pairs: curr !== null && curr.next !== null
   - For each pair: prev.next = curr.next (connect previous pair to current pair)
   - Update prev = curr (move prev to first node of current pair)
   - Store next pair: next = curr.next.next
   - Swap current pair: curr.next.next = curr
   - Move curr to next pair: curr = next

4️⃣ FINAL CONNECTION:
   - Connect last processed pair to remaining nodes: prev.next = curr
   - Handle both even and odd length lists

5️⃣ RETURN RESULT:
   - Return the new head (second node of original list)

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ SINGLE PASS: Only one traversal needed
3️⃣ STRUCTURE MODIFICATION: Changes pointers, not values
4️⃣ EDGE CASE HANDLING: Handles all edge cases properly

💡 KEY INSIGHTS:

1️⃣ POINTER MANIPULATION: Swap nodes by changing pointers
2️⃣ FIRST PAIR SPECIAL: Handle first pair separately
3️⃣ LOOP PROCESSING: Process remaining pairs in loop
4️⃣ CONNECTION LOGIC: Connect pairs properly

🎯 WHY POINTER MANIPULATION?
- More efficient than data swapping
- Preserves original node objects
- Handles complex pointer relationships
- Required by problem constraints

🎯 ALGORITHM INTUITION:
Think of it as "swapping pairs of nodes" by "rearranging their connections"
while maintaining the overall list structure.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 17 -> 15 -> 8 -> 12 -> 5

🎯 GOAL: Swap every two adjacent nodes!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
head = 17, curr = 8 (head.next.next), prev = 17

📋 FIRST PAIR SWAPPING:
head = 15 (head.next)
head.next = 17 (prev)
Result: 15 -> 17

📋 LOOP ITERATION 1: curr = 8, prev = 17
prev.next = 12 (curr.next) → 17.next = 12
prev = 8 (curr)
next = 5 (curr.next.next)
curr.next.next = 8 → 12.next = 8
curr = 5 (next)
Result: 15 -> 17 -> 12 -> 8

📋 LOOP ITERATION 2: curr = 5, prev = 8
curr.next === null → loop ends

📋 FINAL CONNECTION:
prev.next = curr → 8.next = 5

🏆 RESULT: 15 -> 17 -> 12 -> 8 -> 5

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 17  │ -> │ 15  │ -> │  8  │ -> │ 12  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  pair1     pair1     pair2     pair2     odd

AFTER FIRST PAIR SWAP:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 15  │ -> │ 17  │ -> │  8  │ -> │ 12  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  new      prev       curr      curr.next  next
  head

AFTER SECOND PAIR SWAP:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 15  │ -> │ 17  │ -> │ 12  │ -> │  8  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  new      prev       prev      prev      curr
  head

🔍 WHY THIS WORKS:
1️⃣ FIRST PAIR SPECIAL: Handle head change separately
2️⃣ LOOP PROCESSING: Process remaining pairs efficiently
3️⃣ POINTER MANIPULATION: Swap by changing connections
4️⃣ CONNECTION LOGIC: Connect pairs properly

💡 KEY INSIGHT:
The algorithm swaps pairs by rearranging pointers,
not by changing node values!

🎯 TIME COMPLEXITY: O(n) - Single pass through list
🎯 SPACE COMPLEXITY: O(1) - Only pointers used
🎯 EDGE CASES: Handles empty, single, and odd length lists
*/