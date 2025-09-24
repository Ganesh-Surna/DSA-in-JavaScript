/* Problem: ✅✅✅✅ Add Two Numbers Represented as Linked Lists ✅✅✅✅

You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order, and each of their nodes contains a single digit. 
Add the two numbers and return the sum as a linked list.

✅ You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]
Explanation: 0 + 0 = 0

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
Explanation: 9999999 + 9999 = 10009998

Example 4:
Input: l1 = [1,2,3], l2 = [4,5,6]
Output: [5,7,9]
Explanation: 321 + 654 = 975

Example 5:
Input: l1 = [5], l2 = [5]
Output: [0,1]
Explanation: 5 + 5 = 10

Constraints:
- The number of nodes in each linked list is in the range [1, 100].
- 0 <= Node.val <= 9
- It is guaranteed that the list represents a number that does not have leading zeros.

Expected Time Complexity: O(n+m)
Expected Auxiliary Space: O(1) for iterative solution, O(n+m) for recursive solution
*/

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

// I. Iterative Solution (Optimized):
// ✅ TC = O(Max(M,N))
// ✅ SC = O(1) --> Only pointers used
function addTwoReverseSortedLL(l1, l2) {
    let carry = 0;
    let dummyHead = new ListNode(0);
    let curr = dummyHead;
    
    let first = l1, second = l2;
    while (first || second || carry) {
        let sum = carry;
        if (first) {
            sum += first.data;
            first = first.next;
        }
        if (second) {
            sum += second.data;
            second = second.next;
        }
        
        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }
    
    return dummyHead.next;
};

// II. Recursive Solution (Direct Addition):
// ✅ TC = O(n+m) --> Recursive calls for each node
// ✅ SC = O(n+m) --> Stack space for recursion
function addTwoListsRecursive(head1, head2) {
    return addTwoListsHelper(head1, head2, 0);
}

function addTwoListsHelper(l1, l2, carry) {
    if (!l1 && !l2 && carry === 0) {
        return null;
    }
    
    let sum = carry;
    if (l1) sum += l1.data;
    if (l2) sum += l2.data;
    
    let newNode = new Node(sum % 10);
    newNode.next = addTwoListsHelper(
        l1 ? l1.next : null,
        l2 ? l2.next : null,
        Math.floor(sum / 10)
    );
    
    return newNode;
}

function print(head){
    let curr = head;
    let res = ''
    while(curr){
        res += curr.data + ' --> '
        curr = curr.next
    }
    
    return res + 'null'
}

// ✅ Test Cases
// Test Case 1: Basic addition
let head1 = new Node(2)
head1.next = new Node(4)
head1.next.next = new Node(3)

let head2 = new Node(5)
head2.next = new Node(6)
head2.next.next = new Node(4)

console.log("List1:", print(head1)); // 2 --> 4 --> 3 (represents 342)
console.log("List2:", print(head2)); // 5 --> 6 --> 4 (represents 465)
let result1 = addTwoLists(head1, head2)
console.log("Sum (Iterative):", print(result1)); // 7 --> 0 --> 8 (represents 807)

// Test Case 2: Single digits
let head3 = new Node(0)
let head4 = new Node(0)

console.log("List3:", print(head3)); // 0 (represents 0)
console.log("List4:", print(head4)); // 0 (represents 0)
let result2 = addTwoLists(head3, head4)
console.log("Sum (Iterative):", print(result2)); // 0 (represents 0)

// Test Case 3: Large numbers with carry
let head5 = new Node(9)
head5.next = new Node(9)
head5.next.next = new Node(9)
head5.next.next.next = new Node(9)
head5.next.next.next.next = new Node(9)
head5.next.next.next.next.next = new Node(9)
head5.next.next.next.next.next.next = new Node(9)

let head6 = new Node(9)
head6.next = new Node(9)
head6.next.next = new Node(9)
head6.next.next.next = new Node(9)

console.log("List5:", print(head5)); // 9 --> 9 --> 9 --> 9 --> 9 --> 9 --> 9 (represents 9999999)
console.log("List6:", print(head6)); // 9 --> 9 --> 9 --> 9 (represents 9999)
let result3 = addTwoLists(head5, head6)
console.log("Sum (Iterative):", print(result3)); // 8 --> 9 --> 9 --> 9 --> 0 --> 0 --> 0 --> 1 (represents 10009998)

// Test Case 4: Different lengths
let head7 = new Node(1)
head7.next = new Node(2)
head7.next.next = new Node(3)

let head8 = new Node(4)
head8.next = new Node(5)
head8.next.next = new Node(6)

console.log("List7:", print(head7)); // 1 --> 2 --> 3 (represents 321)
console.log("List8:", print(head8)); // 4 --> 5 --> 6 (represents 654)
let result4 = addTwoLists(head7, head8)
console.log("Sum (Iterative):", print(result4)); // 5 --> 7 --> 9 (represents 975)

/*🎯 CORE IDEA: Use DIRECT ADDITION approach since digits are already in reverse order (least significant digit first). No reversal needed - we can add directly from left to right with carry propagation.

📋 STEP-BY-STEP FLOW:

1️⃣ DUMMY NODE SETUP:
   - Create dummy node with value 0
   - Set curr = dummy, carry = 0

2️⃣ SIMULTANEOUS TRAVERSAL:
   - While (l1 || l2 || carry > 0):
     * sum = carry + l1.data + l2.data
     * carry = sum / 10, remainder = sum % 10
     * Create new node with remainder
     * Attach to result, move pointers

3️⃣ RETURN RESULT:
   - Return dummy.next as the head of result list

🧠 WHY THIS APPROACH?
- Digits already in reverse order (LSB first)
- No reversal needed - direct addition possible
- Handles carry propagation correctly
- Works with different length lists

💡 KEY INSIGHTS:
- Reverse order makes addition straightforward
- Carry propagates to next position
- Dummy node simplifies result construction
- Simultaneous traversal handles different lengths
*/

/*🎯 DETAILED ITERATION WALKTHROUGH:
📊 INPUT: l1 = [2,4,3], l2 = [5,6,4] (represents 342 + 465)

🎯 GOAL: Add two numbers represented as reverse-ordered linked lists!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: DUMMY NODE SETUP
dummy = Node(0)
curr = dummy
carry = 0

📋 STEP 2: ADDITION LOOP ITERATIONS

ITERATION 1: l1=2, l2=5, carry=0
sum = 0 + 2 + 5 = 7
carry = 7 / 10 = 0
rem = 7 % 10 = 7
curr.next = Node(7)
curr = Node(7)
l1 = l1.next = 4
l2 = l2.next = 6
result: dummy -> 7

ITERATION 2: l1=4, l2=6, carry=0
sum = 0 + 4 + 6 = 10
carry = 10 / 10 = 1
rem = 10 % 10 = 0
curr.next = Node(0)
curr = Node(0)
l1 = l1.next = 3
l2 = l2.next = 4
result: dummy -> 7 -> 0

ITERATION 3: l1=3, l2=4, carry=1
sum = 1 + 3 + 4 = 8
carry = 8 / 10 = 0
rem = 8 % 10 = 8
curr.next = Node(8)
curr = Node(8)
l1 = l1.next = null
l2 = l2.next = null
result: dummy -> 7 -> 0 -> 8

ITERATION 4: l1=null, l2=null, carry=0
Loop ends (no more nodes and no carry)

🏆 FINAL RESULT: [7,0,8] (represents 807)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL LISTS (Reverse Order):
l1: 2 -> 4 -> 3 (represents 342)
l2: 5 -> 6 -> 4 (represents 465)

ADDITION PROCESS:
┌─────┐    ┌─────┐    ┌─────┐
│  2  │ +  │  5  │ =  │  7  │ → carry=0, rem=7
└─────┘    └─────┘    └─────┘

┌─────┐    ┌─────┐    ┌─────┐
│  4  │ +  │  6  │ =  │ 10  │ → carry=1, rem=0
└─────┘    └─────┘    └─────┘

┌─────┐    ┌─────┐    ┌─────┐
│  3  │ +  │  4  │ +  │  1  │ = 8 → carry=0, rem=8
└─────┘    └─────┘    └─────┘

RESULT CONSTRUCTION:
dummy -> 7 -> 0 -> 8

FINAL RESULT:
result: 7 -> 0 -> 8 (represents 807)

─────────────────────────────────────────

📊 SECOND EXAMPLE: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]

🔍 PROCESS:

ITERATION 1: l1=9, l2=9, carry=0
sum = 0 + 9 + 9 = 18
carry = 1, rem = 8
result: dummy -> 8

ITERATION 2: l1=9, l2=9, carry=1
sum = 1 + 9 + 9 = 19
carry = 1, rem = 9
result: dummy -> 8 -> 9

ITERATION 3: l1=9, l2=9, carry=1
sum = 1 + 9 + 9 = 19
carry = 1, rem = 9
result: dummy -> 8 -> 9 -> 9

ITERATION 4: l1=9, l2=9, carry=1
sum = 1 + 9 + 9 = 19
carry = 1, rem = 9
result: dummy -> 8 -> 9 -> 9 -> 9

ITERATION 5: l1=9, l2=null, carry=1
sum = 1 + 9 + 0 = 10
carry = 1, rem = 0
result: dummy -> 8 -> 9 -> 9 -> 9 -> 0

ITERATION 6: l1=9, l2=null, carry=1
sum = 1 + 9 + 0 = 10
carry = 1, rem = 0
result: dummy -> 8 -> 9 -> 9 -> 9 -> 0 -> 0

ITERATION 7: l1=9, l2=null, carry=1
sum = 1 + 9 + 0 = 10
carry = 1, rem = 0
result: dummy -> 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0

ITERATION 8: l1=null, l2=null, carry=1
sum = 1 + 0 + 0 = 1
carry = 0, rem = 1
result: dummy -> 8 -> 9 -> 9 -> 9 -> 0 -> 0 -> 0 -> 1

🏆 FINAL RESULT: [8,9,9,9,0,0,0,1] (represents 10009998)

─────────────────────────────────────────

📊 THIRD EXAMPLE: l1 = [5], l2 = [5]

🔍 PROCESS:

ITERATION 1: l1=5, l2=5, carry=0
sum = 0 + 5 + 5 = 10
carry = 1, rem = 0
result: dummy -> 0

ITERATION 2: l1=null, l2=null, carry=1
sum = 1 + 0 + 0 = 1
carry = 0, rem = 1
result: dummy -> 0 -> 1

🏆 FINAL RESULT: [0,1] (represents 10)

🔍 WHY THIS WORKS:
1️⃣ REVERSE ORDER makes addition straightforward
2️⃣ DUMMY NODE simplifies result construction
3️⃣ CARRY PROPAGATION handles overflow correctly
4️⃣ SIMULTANEOUS TRAVERSAL handles different lengths
5️⃣ NO REVERSAL needed - direct addition possible

💡 KEY INSIGHT:
The reverse order (LSB first) makes this problem much simpler
than forward order - we can add directly without any reversal!

🎯 TIME COMPLEXITY ANALYSIS:
- Single traversal: O(max(n,m))
- Each node processed once
- Constant time operations per node
- Total: O(max(n,m))

🎯 SPACE COMPLEXITY ANALYSIS:
- Only pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Different length lists
- Single digit numbers
- Large numbers with carry
- Zero values
- Maximum carry propagation

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to add numbers correctly
- Handles carry propagation properly
- Maintains digit alignment
- Works with all input sizes

🎯 COMPARISON WITH FORWARD ORDER:
- Forward order: Need reversal (3 passes)
- Reverse order: Direct addition (1 pass)
- Reverse order is more efficient
- Simpler implementation

🎯 RECURSIVE VS ITERATIVE:
- Iterative: O(1) space, O(n) time
- Recursive: O(n) space, O(n) time
- Iterative preferred for space efficiency
- Both handle same logic correctly
*/