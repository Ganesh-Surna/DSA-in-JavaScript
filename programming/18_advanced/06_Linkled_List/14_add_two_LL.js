/* Problem: ✅✅✅✅ Add Two Numbers Represented as Linked Lists ✅✅✅✅

You are given the head of two singly linked lists head1 and head2 representing two non-negative integers. 
You have to return the head of the linked list representing the sum of these two numbers.

Note: There can be leading zeros in the input lists, but there should not be any leading zeros in the output list.

Example 1:
Input: head1 = [1, 2, 3], head2 = [9, 9, 9]
Output: [1, 1, 2, 2]
Explanation: 123 + 999 = 1122

Example 1:
Input: head1 = [0,0,6, 3], head2 = [0, 7]
Output: [7, 0]
Explanation: 63 + 7 = 70

Constraints:
1 ≤ Number of nodes in head1, head2 ≤ 105
0 ≤ node.data ≤ 9

Expected Time Complexity: O(n+m)
Expected Auxiliary Space: O(1) for iterative solution, O(n+m) for recursive solution
*/

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

function reverse(head) {
    let curr = head, prev = null;
    while (curr) {
        let nxt = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nxt;
    }
    return prev;
}

// I. Iterative Solution (Optimized):
// ✅ TC = O(n+m) --> Three passes through lists
// ✅ SC = O(1) --> Only pointers used
function addTwoLists(head1, head2) {
    // 1. Reverse the lists
    let rev1 = reverse(head1);
    let rev2 = reverse(head2);

    // 2. Create a dummy node to store the result
    let dummy = new Node(0);
    let tail = dummy;
    let carry = 0; // Initial carry is 0

    // 3. Add the lists (while loop will run until both lists are exhausted and carry is 0)
    while (rev1 || rev2 || carry > 0) {
        let sum = (rev1?.data || 0) + (rev2?.data || 0) + carry;
        carry = Math.floor(sum / 10); // 0 or 1
        let rem = sum % 10; // 0 to 9

        tail.next = new Node(rem); // adding the new node to the result list

        tail = tail.next; // setting tail to recently added node
        rev1 = rev1?.next || null; // moving to next node of rev1
        rev2 = rev2?.next || null; // moving to next node of rev2
    }

    // 4. Reverse the result
    let finalHead = reverse(dummy.next);

    // 5. Remove leading zeros
    while (finalHead && finalHead.data === 0) {
        finalHead = finalHead.next;
    }

    // 6. Return the result
    return finalHead || new Node(0);
}

/*🎯 CORE IDEA: Use REVERSE-ADD-REVERSE approach to align digits for proper addition.

📋 STEP-BY-STEP FLOW:

1️⃣ REVERSE BOTH LISTS:
   - Reverse head1 → rev1 (aligns digits for addition)
   - Reverse head2 → rev2 (aligns digits for addition)

2️⃣ DUMMY NODE SETUP:
   - Create dummy node with value 0
   - Set tail = dummy, carry = 0

3️⃣ ADDITION LOOP:
   - While (rev1 || rev2 || carry > 0):
     * sum = digit1 + digit2 + carry
     * carry = sum / 10, remainder = sum % 10
     * Create new node with remainder
     * Attach to result, move pointers

4️⃣ REVERSE RESULT:
   - Reverse the result list to restore original format

5️⃣ REMOVE LEADING ZEROS:
   - Skip leading zeros in final result

🧠 WHY THIS APPROACH?
- Aligns digits for proper addition
- Handles carry propagation correctly
- Maintains original list structure
- Works with different length lists

💡 KEY INSIGHTS:
- Reverse lists to align digits by position
- Carry propagates to next position
- Dummy node simplifies result construction
- Leading zero removal cleans up result
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT: head1 = [1,2,3], head2 = [9,9,9] (represents 123 + 999)

🔍 PROCESS:
1️⃣ REVERSE: rev1 = [3,2,1], rev2 = [9,9,9]
2️⃣ ADDITION:
   - 3+9=12 → carry=1, rem=2 → result: [2]
   - 2+9+1=12 → carry=1, rem=2 → result: [2,2]
   - 1+9+1=11 → carry=1, rem=1 → result: [2,2,1]
   - 0+0+1=1 → carry=0, rem=1 → result: [2,2,1,1]
3️⃣ REVERSE RESULT: [1,1,2,2]
4️⃣ REMOVE LEADING ZEROS: [1,1,2,2] (no leading zeros)

🏆 RESULT: [1,1,2,2] (represents 1122)
*/

/*🎯 DETAILED ITERATION WALKTHROUGH:
📊 INPUT: head1 = [1,2,3], head2 = [9,9,9] (represents 123 + 999)

🎯 GOAL: Add two numbers represented as linked lists!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1: REVERSE BOTH LISTS
head1 = [1,2,3] → rev1 = [3,2,1]
head2 = [9,9,9] → rev2 = [9,9,9]

📋 STEP 2: DUMMY NODE SETUP
dummy = Node(0)
tail = dummy
carry = 0

📋 STEP 3: ADDITION LOOP ITERATIONS

ITERATION 1: rev1=3, rev2=9, carry=0
sum = 3 + 9 + 0 = 12
carry = 12 / 10 = 1
rem = 12 % 10 = 2
tail.next = Node(2)
tail = Node(2)
rev1 = rev1.next = 2
rev2 = rev2.next = 9
result: dummy -> 2

ITERATION 2: rev1=2, rev2=9, carry=1
sum = 2 + 9 + 1 = 12
carry = 12 / 10 = 1
rem = 12 % 10 = 2
tail.next = Node(2)
tail = Node(2)
rev1 = rev1.next = 1
rev2 = rev2.next = 9
result: dummy -> 2 -> 2

ITERATION 3: rev1=1, rev2=9, carry=1
sum = 1 + 9 + 1 = 11
carry = 11 / 10 = 1
rem = 11 % 10 = 1
tail.next = Node(1)
tail = Node(1)
rev1 = rev1.next = null
rev2 = rev2.next = null
result: dummy -> 2 -> 2 -> 1

ITERATION 4: rev1=null, rev2=null, carry=1
sum = 0 + 0 + 1 = 1
carry = 1 / 10 = 0
rem = 1 % 10 = 1
tail.next = Node(1)
tail = Node(1)
rev1 = null
rev2 = null
result: dummy -> 2 -> 2 -> 1 -> 1

📋 STEP 4: REVERSE RESULT
result = [2,2,1,1] → finalHead = [1,1,2,2]

📋 STEP 5: REMOVE LEADING ZEROS
finalHead = [1,1,2,2] (no leading zeros)

🏆 FINAL RESULT: [1,1,2,2] (represents 1122)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL LISTS:
head1: 1 -> 2 -> 3 (represents 123)
head2: 9 -> 9 -> 9 (represents 999)

AFTER REVERSAL:
rev1:  3 -> 2 -> 1
rev2:  9 -> 9 -> 9

ADDITION PROCESS:
┌─────┐    ┌─────┐    ┌─────┐
│  3  │ +  │  9  │ =  │ 12  │ → carry=1, rem=2
└─────┘    └─────┘    └─────┘

┌─────┐    ┌─────┐    ┌─────┐
│  2  │ +  │  9  │ +  │  1  │ = 12 → carry=1, rem=2
└─────┘    └─────┘    └─────┘

┌─────┐    ┌─────┐    ┌─────┐
│  1  │ +  │  9  │ +  │  1  │ = 11 → carry=1, rem=1
└─────┘    └─────┘    └─────┘

┌─────┐    ┌─────┐    ┌─────┐
│  0  │ +  │  0  │ +  │  1  │ = 1 → carry=0, rem=1
└─────┘    └─────┘    └─────┘

RESULT CONSTRUCTION:
dummy -> 2 -> 2 -> 1 -> 1

AFTER REVERSAL:
finalHead: 1 -> 1 -> 2 -> 2 (represents 1122)

─────────────────────────────────────────

📊 SECOND EXAMPLE: head1 = [0,0,6,3], head2 = [0,7]

🔍 PROCESS:

STEP 1: REVERSE
head1 = [0,0,6,3] → rev1 = [3,6,0,0]
head2 = [0,7] → rev2 = [7,0]

STEP 2: ADDITION LOOP

ITERATION 1: rev1=3, rev2=7, carry=0
sum = 3 + 7 + 0 = 10
carry = 1, rem = 0
result: dummy -> 0

ITERATION 2: rev1=6, rev2=0, carry=1
sum = 6 + 0 + 1 = 7
carry = 0, rem = 7
result: dummy -> 0 -> 7

ITERATION 3: rev1=0, rev2=null, carry=0
sum = 0 + 0 + 0 = 0
carry = 0, rem = 0
result: dummy -> 0 -> 7 -> 0

ITERATION 4: rev1=0, rev2=null, carry=0
sum = 0 + 0 + 0 = 0
carry = 0, rem = 0
result: dummy -> 0 -> 7 -> 0 -> 0

STEP 3: REVERSE RESULT
[0,7,0,0] → [0,0,7,0]

STEP 4: REMOVE LEADING ZEROS
[0,0,7,0] → [7,0]

🏆 FINAL RESULT: [7,0] (represents 70)

🔍 WHY THIS WORKS:
1️⃣ REVERSE aligns digits for proper addition
2️⃣ DUMMY NODE simplifies result construction
3️⃣ CARRY PROPAGATION handles overflow correctly
4️⃣ REVERSE RESULT restores original format
5️⃣ LEADING ZERO REMOVAL cleans up output

💡 KEY INSIGHT:
The algorithm mimics manual addition by aligning digits,
handling carry propagation, and maintaining proper order!

🎯 TIME COMPLEXITY ANALYSIS:
- Reverse head1: O(n)
- Reverse head2: O(m)
- Addition loop: O(max(n,m))
- Reverse result: O(max(n,m))
- Remove leading zeros: O(max(n,m))
- Total: O(n + m)

🎯 SPACE COMPLEXITY ANALYSIS:
- Only pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Different length lists
- Leading zeros in input
- Leading zeros in result
- Empty lists
- Single digit numbers

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to add numbers correctly
- Handles carry propagation properly
- Maintains digit alignment
- Removes leading zeros appropriately
*/