/* Problem:
Given the head of a singly linked list, return true if it is a palindrome or false otherwise.

A palindrome is a sequence that reads the same forwards and backwards. For a linked list, this means the sequence of values from head to tail should be the same as from tail to head.

Example 1:
Input: head = [1,2,2,1]
Output: true
Explanation: The linked list reads 1->2->2->1 forwards and backwards

Example 2:
Input: head = [1,2]
Output: false
Explanation: The linked list reads 1->2 forwards but 2->1 backwards

Example 3:
Input: head = [1,2,3,2,1]
Output: true
Explanation: The linked list reads 1->2->3->2->1 forwards and backwards

Example 4:
Input: head = [1]
Output: true
Explanation: Single node is always a palindrome

Constraints:
- The number of nodes in the list is in the range [1, 10^5]
- 0 <= Node.val <= 9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1)
*/

class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

// ✅ TC: O(n) --> Find middle + reverse + compare
// ✅ SC: O(1) --> Only pointers used
function isPalindrome(head){
    // 1. find the middle of the list
    let slow = head, fast = head
    while(fast !== null && fast.next !== null){
        slow = slow.next
        fast = fast.next.next
    }

    // 2. reverse the second half
    let prev = null, curr = slow
    while(curr !== null){
        let next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }

    // 3. compare the two halves
    let first = head, second = prev
    while(second !== null){
        if(first.data !== second.data){
            return false
        }
        first = first.next
        second = second.next
    }
    return true
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
let head1 = new Node(1);
head1.next = new Node(2);
head1.next.next = new Node(2);
head1.next.next.next = new Node(1);
console.log("List:", print(head1));
console.log("Is palindrome:", isPalindrome(head1)); // true

let head2 = new Node(1);
head2.next = new Node(2);
console.log("List:", print(head2));
console.log("Is palindrome:", isPalindrome(head2)); // false

let head3 = new Node(1);
head3.next = new Node(2);
head3.next.next = new Node(3);
head3.next.next.next = new Node(2);
head3.next.next.next.next = new Node(1);
console.log("List:", print(head3));
console.log("Is palindrome:", isPalindrome(head3)); // true

let head4 = new Node(1);
console.log("List:", print(head4));
console.log("Is palindrome:", isPalindrome(head4)); // true

/*🎯 CORE IDEA: We use THREE-PHASE APPROACH with TWO-POINTER TECHNIQUE to check if a linked list is a palindrome. We find the middle, reverse the second half, and then compare both halves element by element.

📋 STEP-BY-STEP FLOW:

1️⃣ PHASE 1 - FIND MIDDLE (Tortoise and Hare):
   - Use slow and fast pointers
   - slow moves 1 step, fast moves 2 steps
   - When fast reaches end, slow is at middle

2️⃣ PHASE 2 - REVERSE SECOND HALF:
   - Start from middle node (slow)
   - Use three-pointer technique to reverse
   - prev, curr, next pointers for reversal

3️⃣ PHASE 3 - COMPARE HALVES:
   - Start from head (first half)
   - Start from reversed second half
   - Compare elements one by one

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ OPTIMAL: No extra space for storing values
3️⃣ ELEGANT: Uses linked list properties
4️⃣ COMPLETE: Handles all cases including odd/even lengths

💡 KEY INSIGHTS:

1️⃣ MIDDLE FINDING: Tortoise and hare finds middle efficiently
2️⃣ REVERSAL: Three-pointer technique reverses second half
3️⃣ COMPARISON: Element-wise comparison of both halves
4️⃣ TERMINATION: Stop when second half is exhausted

🎯 WHY TORTOISE AND HARE WORKS FOR MIDDLE?
- Fast pointer moves twice as fast as slow pointer
- When fast reaches end, slow is exactly at middle
- Works for both odd and even length lists
- No need to count total nodes

🎯 ALGORITHM INTUITION:
Think of it as "finding the middle" then "reversing the second half" 
then "comparing both halves" to check palindrome property.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 1 -> 2 -> 2 -> 1

🎯 GOAL: Check if this linked list is a palindrome!

🔍 STEP-BY-STEP PROCESS:

📋 PHASE 1 - FIND MIDDLE:

INITIALIZATION:
slow = head(1), fast = head(1)

ITERATION 1:
slow = slow.next = 2
fast = fast.next.next = 2
slow = 2, fast = 2
fast.next !== null → Continue

ITERATION 2:
slow = slow.next = 2
fast = fast.next.next = null
slow = 2, fast = null
fast === null → MIDDLE FOUND!

📋 PHASE 2 - REVERSE SECOND HALF:

START FROM MIDDLE:
prev = null, curr = slow(2)

ITERATION 1:
next = curr.next = 1
curr.next = prev = null
prev = curr = 2
curr = next = 1
List: 1 -> 2 -> 2 <- 1

ITERATION 2:
next = curr.next = null
curr.next = prev = 2
prev = curr = 1
curr = next = null
List: 1 -> 2 -> 2 <- 1

ITERATION 3:
curr === null → REVERSAL COMPLETE!

📋 PHASE 3 - COMPARE HALVES:

INITIALIZATION:
first = head(1), second = prev(1)

ITERATION 1:
first.data = 1, second.data = 1
1 === 1 → Continue
first = first.next = 2, second = second.next = 2

ITERATION 2:
first.data = 2, second.data = 2
2 === 2 → Continue
first = first.next = 2, second = second.next = 2

ITERATION 3:
first.data = 2, second.data = 2
2 === 2 → Continue
first = first.next = 1, second = second.next = null

ITERATION 4:
second === null → COMPARISON COMPLETE!

🏆 RESULT: true (all elements matched)

─────────────────────────────────────────

📊 NON-PALINDROME EXAMPLE:
head = 1 -> 2

🔍 Process:

PHASE 1 - FIND MIDDLE:
slow = 1, fast = 1
slow = 2, fast = null
fast === null → MIDDLE FOUND!

PHASE 2 - REVERSE SECOND HALF:
prev = null, curr = 2
next = null, curr.next = null, prev = 2, curr = null
REVERSAL COMPLETE!

PHASE 3 - COMPARE HALVES:
first = 1, second = 2
first.data = 1, second.data = 2
1 !== 2 → NOT PALINDROME!

🏆 RESULT: false

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  2  │ -> │  1  │
└─────┘    └─────┘    └─────┘    └─────┘

AFTER FINDING MIDDLE:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  2  │ -> │  1  │
└─────┘    └─────┘    └─────┘    └─────┘
   ↑                    ↑
 first                middle

AFTER REVERSING SECOND HALF:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  2  │ <- │  1  │
└─────┘    └─────┘    └─────┘    └─────┘
   ↑                    ↑
 first               second

COMPARISON:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  1  │ -> │  2  │ -> │  2  │ <- │  1  │
└─────┘    └─────┘    └─────┘    └─────┘
   ↑                    ↑
 first               second
   1  ===  1 ✓         2  ===  2 ✓

🔍 WHY THIS WORKS:
1️⃣ TORTOISE AND HARE finds middle efficiently
2️⃣ THREE-POINTER REVERSAL reverses second half
3️⃣ ELEMENT-WISE COMPARISON checks palindrome property
4️⃣ TERMINATION when second half is exhausted

💡 KEY INSIGHT:
The algorithm transforms the palindrome check into a simple
element-wise comparison by reversing the second half!

🎯 TIME COMPLEXITY ANALYSIS:
- Phase 1 (Find Middle): O(n/2) = O(n)
- Phase 2 (Reverse): O(n/2) = O(n)
- Phase 3 (Compare): O(n/2) = O(n)
- Total: O(n) + O(n) + O(n) = O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Only pointers used: O(1)
- No extra data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Single node: Always palindrome
- Two nodes: Check if equal
- Odd length: Middle element ignored in comparison
- Even length: Both halves compared

🎯 MATHEMATICAL PROOF:
- Tortoise and hare guarantees middle finding
- Three-pointer reversal is mathematically correct
- Element-wise comparison is sufficient for palindrome check
- Algorithm terminates in finite steps

🎯 COMPARISON WITH OTHER APPROACHES:
- Array-based: O(n) time, O(n) space (copy to array)
- Stack-based: O(n) time, O(n) space (use stack)
- Recursive: O(n) time, O(n) space (recursion stack)
- Optimal: O(n) time, O(1) space (current approach)

🎯 OPTIMIZATION TECHNIQUES:
- Use tortoise and hare for middle finding
- Use three-pointer technique for reversal
- Compare elements directly without extra space
- Early termination on mismatch

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Use two-pointer technique for middle finding
- Use three-pointer technique for reversal
- Maintain pointer integrity

🎯 PALINDROME CHECKING PATTERN:
- Find middle using tortoise and hare
- Reverse second half using three pointers
- Compare both halves element by element
- Return result based on comparison

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find correct middle
- Guaranteed to reverse second half correctly
- Guaranteed to compare all relevant elements
- Optimal time and space complexity

🎯 WHY THREE PHASES?
- Phase 1: Locate the middle point
- Phase 2: Prepare second half for comparison
- Phase 3: Perform element-wise comparison
- Each phase has specific purpose

🎯 REAL-WORLD APPLICATIONS:
- String palindrome checking
- Number palindrome verification
- Data validation
- Pattern matching

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for palindrome checking
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM ARRAY APPROACH:
- No extra space needed
- No copying of data
- Uses linked list properties
- More elegant solution

🎯 MIDDLE FINDING LOGIC:
- Fast pointer moves twice as fast as slow
- When fast reaches end, slow is at middle
- Works for both odd and even lengths
- No need to count total nodes

🎯 REVERSAL LOGIC:
- Use three pointers: prev, curr, next
- Store next before breaking link
- Reverse current link
- Move pointers forward

🎯 COMPARISON LOGIC:
- Start from head and reversed second half
- Compare elements one by one
- Stop when second half is exhausted
- Return false on any mismatch

*/