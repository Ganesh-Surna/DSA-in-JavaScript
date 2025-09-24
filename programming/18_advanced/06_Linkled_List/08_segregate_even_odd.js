/* Problem:
Given a linked list, segregate even and odd nodes such that all even nodes come before all odd nodes. The relative order of even and odd nodes should be preserved.

You are given the head of a singly linked list. The task is to rearrange the linked list such that all even-valued nodes come before all odd-valued nodes, while maintaining the relative order of even and odd nodes.

Example 1:
Input: head = [17, 15, 8, 12, 5]
Output: [8, 12, 17, 15, 5]
Explanation: All even nodes (8, 12) come before all odd nodes (17, 15, 5), and relative order is preserved.

Example 2:
Input: head = [1, 3, 5, 7]
Output: [1, 3, 5, 7]
Explanation: All nodes are odd, so no rearrangement needed.

Example 3:
Input: head = [2, 4, 6, 8]
Output: [2, 4, 6, 8]
Explanation: All nodes are even, so no rearrangement needed.

Example 4:
Input: head = [1, 2, 3, 4, 5, 6]
Output: [2, 4, 6, 1, 3, 5]
Explanation: Even nodes (2, 4, 6) come before odd nodes (1, 3, 5).

Constraints:
- The number of nodes in the list is in the range [0, 10^4]
- -10^6 <= Node.val <= 10^6

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
    }
}

// I. Optimized Solution (1 traversal):
// ✅ TC = O(n) --> Single pass through the list
// ✅ SC = O(1) --> Only pointers used
function segregateOptimized(head){
    let even_st = null, even_end=null;
    let odd_st = null, odd_end=null;
    
    for(let curr = head; curr !== null; curr = curr.next){
        if(curr.key % 2 === 0){
            if(even_st === null){
                even_st = even_end = curr
            }else{
                even_end.next = curr
                even_end = curr
            }
        }else{
            if(odd_st === null){
                odd_st = odd_end = curr
            }else{
                odd_end.next = curr
                odd_end = curr
            }
        }
    }
    
    if(even_st === null || odd_st === null){
        return head
    }
    
    even_end.next = odd_st
    odd_end.next = null
    return even_st
}


// II. Naive Sol(2 traversals):
// ✅ TC = O(n)
// ✅ SC = O(1)
function segregateNaive(head) {
    if (!head) return null;
  
    // Step 1: find last node
    let end = head;
    while (end.next) {
      end = end.next;
    }
    let newEnd = end;
  
    let curr = head;
    let prev = null;
  
    // Step 2: process nodes until original end
    while (curr !== end) {
      if (curr.key % 2 === 1) { // odd
        // Remove curr
        if (prev) {
            // Means curr is not head(since prev exist)
          prev.next = curr.next;
        } else {
            // curr is head(since prev does not exist)
          head = curr.next; // update head if first node was odd
        }
  
        // Append curr to newEnd
        newEnd.next = curr;
        newEnd = curr;
        curr = curr.next;
        newEnd.next = null;
      } else {
        prev = curr;
        curr = curr.next;
      }
    }
  
    // Step 3: handle the last node (original end)
    // if newEnd same as original end of list, that means nothing is appended to original end. So it's already fine answer. Else it will handled by below condition.
    if (end.key % 2 === 1 && newEnd !== end) {
      if (prev) prev.next = end.next;
      newEnd.next = end;
      newEnd = end;
      newEnd.next = null;
    }
  
    return head;
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
let finalHead1 = segregateOptimized(head1)
console.log("Segregated:", print(finalHead1)); // 8 --> 12 --> 17 --> 15 --> 5 --> null

let head2 = new Node(1)
head2.next = new Node(3)
head2.next.next = new Node(5)
head2.next.next.next = new Node(7)
console.log("Original:", print(head2));
let finalHead2 = segregateOptimized(head2)
console.log("Segregated:", print(finalHead2)); // 1 --> 3 --> 5 --> 7 --> null

let head3 = new Node(2)
head3.next = new Node(4)
head3.next.next = new Node(6)
head3.next.next.next = new Node(8)
console.log("Original:", print(head3));
let finalHead3 = segregateOptimized(head3)
console.log("Segregated:", print(finalHead3)); // 2 --> 4 --> 6 --> 8 --> null

let head4 = new Node(1)
head4.next = new Node(2)
head4.next.next = new Node(3)
head4.next.next.next = new Node(4)
head4.next.next.next.next = new Node(5)
head4.next.next.next.next.next = new Node(6)
console.log("Original:", print(head4));
let finalHead4 = segregateOptimized(head4)
console.log("Segregated:", print(finalHead4)); // 2 --> 4 --> 6 --> 1 --> 3 --> 5 --> null

/*🎯 CORE IDEA: We use a TWO-LIST APPROACH to segregate even and odd nodes. We maintain separate lists for even and odd nodes, then connect them together. This approach preserves relative order and requires only one traversal.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create four pointers: even_st, even_end, odd_st, odd_end
   - All pointers start as null
   - even_st/even_end track even nodes list
   - odd_st/odd_end track odd nodes list

2️⃣ SINGLE TRAVERSAL:
   - Iterate through each node in the original list
   - For each node, check if it's even or odd
   - Add even nodes to even list, odd nodes to odd list
   - Maintain head and tail pointers for each list

3️⃣ LIST CONSTRUCTION:
   - For even nodes: Update even_end.next and move even_end
   - For odd nodes: Update odd_end.next and move odd_end
   - This preserves the relative order within each group

4️⃣ CONNECTION:
   - Connect even list to odd list: even_end.next = odd_st
   - Set odd list end to null: odd_end.next = null
   - Return even_st as new head

5️⃣ EDGE CASE HANDLING:
   - If only even nodes: return original head
   - If only odd nodes: return original head
   - If both exist: return even_st

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ SINGLE PASS: Only one traversal needed
3️⃣ ORDER PRESERVATION: Relative order maintained
4️⃣ SIMPLE: Easy to understand and implement

💡 KEY INSIGHTS:

1️⃣ TWO-LIST TECHNIQUE: Separate even and odd nodes
2️⃣ HEAD/TAIL TRACKING: Maintain start and end of each list
3️⃣ SINGLE TRAVERSAL: Process all nodes in one pass
4️⃣ CONNECTION: Link even list to odd list

🎯 WHY TWO-LIST APPROACH?
- Maintains relative order within each group
- Single traversal is sufficient
- No need to modify existing nodes
- Clean separation of even and odd nodes

🎯 ALGORITHM INTUITION:
Think of it as "building two separate lists" (even and odd) 
then "connecting them together" to form the final result.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 17 -> 15 -> 8 -> 12 -> 5

🎯 GOAL: Segregate even and odd nodes with even nodes first!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
even_st = null, even_end = null
odd_st = null, odd_end = null

📋 TRAVERSAL PROCESS:

ITERATION 1: curr = 17 (odd)
odd_st === null → odd_st = odd_end = 17
even_st = null, even_end = null
odd_st = 17, odd_end = 17

ITERATION 2: curr = 15 (odd)
odd_st !== null → odd_end.next = 15, odd_end = 15
even_st = null, even_end = null
odd_st = 17, odd_end = 15

ITERATION 3: curr = 8 (even)
even_st === null → even_st = even_end = 8
even_st = 8, even_end = 8
odd_st = 17, odd_end = 15

ITERATION 4: curr = 12 (even)
even_st !== null → even_end.next = 12, even_end = 12
even_st = 8, even_end = 12
odd_st = 17, odd_end = 15

ITERATION 5: curr = 5 (odd)
odd_st !== null → odd_end.next = 5, odd_end = 5
even_st = 8, even_end = 12
odd_st = 17, odd_end = 5

📋 CONNECTION:
even_end.next = odd_st → 12.next = 17
odd_end.next = null → 5.next = null

🏆 RESULT: 8 -> 12 -> 17 -> 15 -> 5

─────────────────────────────────────────

📊 MIXED EXAMPLE:
head = 1 -> 2 -> 3 -> 4 -> 5 -> 6

🔍 Process:

ITERATION 1: curr = 1 (odd)
odd_st = 1, odd_end = 1

ITERATION 2: curr = 2 (even)
even_st = 2, even_end = 2

ITERATION 3: curr = 3 (odd)
odd_st = 1, odd_end = 3

ITERATION 4: curr = 4 (even)
even_st = 2, even_end = 4

ITERATION 5: curr = 5 (odd)
odd_st = 1, odd_end = 5

ITERATION 6: curr = 6 (even)
even_st = 2, even_end = 6

CONNECTION:
even_end.next = odd_st → 6.next = 1
odd_end.next = null → 5.next = null

🏆 RESULT: 2 -> 4 -> 6 -> 1 -> 3 -> 5

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 17  │ -> │ 15  │ -> │  8  │ -> │ 12  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  odd       odd      even      even      odd

DURING TRAVERSAL:
Even List: 8 -> 12
Odd List:  17 -> 15 -> 5

FINAL CONNECTION:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  8  │ -> │ 12  │ -> │ 17  │ -> │ 15  │ -> │  5  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
 even      even       odd       odd       odd

🔍 WHY THIS WORKS:
1️⃣ TWO-LIST TECHNIQUE separates even and odd nodes
2️⃣ HEAD/TAIL TRACKING maintains order within each group
3️⃣ SINGLE TRAVERSAL processes all nodes efficiently
4️⃣ CONNECTION links the two lists together

💡 KEY INSIGHT:
The algorithm builds two separate lists (even and odd) 
then connects them together, preserving relative order!

🎯 TIME COMPLEXITY ANALYSIS:
- Single traversal: O(n)
- Each node processed once
- Constant time operations per node
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Only four pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- All even nodes: return original head
- All odd nodes: return original head
- Single node: return original head
- Empty list: return null

🎯 MATHEMATICAL PROOF:
- Each node visited exactly once
- Relative order preserved within each group
- Connection operation is O(1)
- Algorithm terminates in finite steps

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n) time, O(1) space (2 traversals)
- Optimized: O(n) time, O(1) space (1 traversal)
- Both preserve relative order
- Optimized is more efficient

🎯 OPTIMIZATION TECHNIQUES:
- Use two-list technique for separation
- Maintain head and tail pointers
- Single traversal instead of multiple
- Direct connection of lists

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Maintain head and tail pointers
- Connect lists properly
- Handle edge cases

🎯 SEGREGATION PATTERN:
- Separate nodes into two groups
- Maintain relative order within groups
- Connect groups in desired order
- Return new head

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to separate even and odd nodes
- Guaranteed to preserve relative order
- Guaranteed to handle all edge cases
- Optimal time and space complexity

🎯 WHY TWO-LIST TECHNIQUE?
- Clean separation of even and odd nodes
- Preserves relative order within each group
- Single traversal is sufficient
- Easy to understand and implement

🎯 REAL-WORLD APPLICATIONS:
- Data partitioning
- List filtering
- Order preservation
- Efficient sorting

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for segregation
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM SORTING:
- No comparison needed
- Only even/odd check required
- Preserves relative order
- More efficient than sorting

🎯 LIST CONSTRUCTION LOGIC:
- Check if node is even or odd
- Add to appropriate list
- Update head and tail pointers
- Maintain relative order

🎯 CONNECTION LOGIC:
- Connect even list to odd list
- Set odd list end to null
- Return even list head
- Handle edge cases

*/