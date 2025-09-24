/* Problem: ✅✅✅✅ Merge Two Sorted Linked Lists ✅✅✅✅

Given two sorted linked lists, merge them into a single sorted linked list. The result should be a new linked list that contains all the nodes from both input lists in sorted order.

You are given the heads of two sorted singly linked lists. The task is to merge them into a single sorted linked list by splicing together the nodes of the first two lists.

Example 1:
Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]
Explanation: Merge the two sorted lists into one sorted list.

Example 2:
Input: list1 = [], list2 = []
Output: []
Explanation: Both lists are empty, so the merged list is also empty.

Example 3:
Input: list1 = [], list2 = [0]
Output: [0]
Explanation: One list is empty, so the merged list is just the non-empty list.

Example 4:
Input: list1 = [1,3,5,7], list2 = [2,4,6,8]
Output: [1,2,3,4,5,6,7,8]
Explanation: Merge two sorted lists into one sorted list.

Example 5:
Input: list1 = [1,2,3], list2 = [4,5,6]
Output: [1,2,3,4,5,6]
Explanation: Append second list to first list.

Constraints:
- The number of nodes in both lists is in the range [0, 50].
- -100 <= Node.val <= 100
- Both list1 and list2 are sorted in non-decreasing order.

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
// ✅ TC = O(n+m) --> Single pass through both lists
// ✅ SC = O(1) --> Only pointers used
function sortedMerge(head1, head2) {
    if (!head1) return head2;
    if (!head2) return head1;

    // Dummy node to simplify merge logic
    let dummy = new Node(-1);
    let tail = dummy;

    let a = head1, b = head2;

    while (a !== null && b !== null) {
        if (a.data <= b.data) {
            tail.next = a;
            a = a.next;
        } else {
            tail.next = b;
            b = b.next;
        }
        tail = tail.next;
    }

    // Attach remaining part (No need of while loop, because we are attaching the remaining part itself)
    if (a !== null) tail.next = a;
    if (b !== null) tail.next = b;

    return dummy.next;
}


// II. Recursive Solution:
// ✅ TC = O(n+m) --> Recursive calls for each node
// ✅ SC = O(n+m) --> Stack space for recursion
function sortedMergeRecursive(head1, head2) {
    if (!head1) return head2;
    if (!head2) return head1;

    if (head1.data <= head2.data) {
        head1.next = sortedMergeRecursive(head1.next, head2);
        return head1;
    } else {
        head2.next = sortedMergeRecursive(head1, head2.next);
        return head2;
    }
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
// Test Case 1: Both lists have elements
let head1 = new Node(1)
head1.next = new Node(2)
head1.next.next = new Node(4)

let head2 = new Node(1)
head2.next = new Node(3)
head2.next.next = new Node(4)

console.log("List1:", print(head1));
console.log("List2:", print(head2));
let merged1 = sortedMerge(head1, head2)
console.log("Merged (Iterative):", print(merged1)); // 1 --> 1 --> 2 --> 3 --> 4 --> 4 --> null

// Test Case 2: One list is empty
let head3 = new Node(0)
let head4 = null

console.log("List3:", print(head3));
console.log("List4:", print(head4));
let merged2 = sortedMerge(head3, head4)
console.log("Merged (Iterative):", print(merged2)); // 0 --> null

// Test Case 3: Both lists are empty
let head5 = null
let head6 = null

console.log("List5:", print(head5));
console.log("List6:", print(head6));
let merged3 = sortedMerge(head5, head6)
console.log("Merged (Iterative):", print(merged3)); // null

// Test Case 4: Alternating merge
let head7 = new Node(1)
head7.next = new Node(3)
head7.next.next = new Node(5)
head7.next.next.next = new Node(7)

let head8 = new Node(2)
head8.next = new Node(4)
head8.next.next = new Node(6)
head8.next.next.next = new Node(8)

console.log("List7:", print(head7));
console.log("List8:", print(head8));
let merged4 = sortedMerge(head7, head8)
console.log("Merged (Iterative):", print(merged4)); // 1 --> 2 --> 3 --> 4 --> 5 --> 6 --> 7 --> 8 --> null

/*🎯 CORE IDEA: We use a DUMMY NODE approach to merge two sorted linked lists. The key insight is to use a dummy node as the starting point, then compare nodes from both lists and attach the smaller one to the result list. This approach simplifies the merge logic and handles edge cases elegantly.

📋 STEP-BY-STEP FLOW:

1️⃣ EDGE CASE HANDLING:
   - If head1 is null, return head2
   - If head2 is null, return head1
   - Handle empty lists gracefully

2️⃣ DUMMY NODE SETUP:
   - Create a dummy node with value -1
   - Set tail pointer to dummy node
   - This simplifies the merge logic

3️⃣ COMPARISON LOOP:
   - While both lists have nodes, compare current nodes
   - Attach the smaller node to the result list
   - Move the pointer of the list from which we took the node
   - Move tail pointer to the newly attached node

4️⃣ ATTACH REMAINING NODES:
   - If list1 has remaining nodes, attach them to result
   - If list2 has remaining nodes, attach them to result
   - No need for loops since we attach the entire remaining part

5️⃣ RETURN RESULT:
   - Return dummy.next (skip the dummy node)
   - This gives us the head of the merged list

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n+m) time, O(1) space
2️⃣ SIMPLE LOGIC: Dummy node simplifies merge logic
3️⃣ EDGE CASE HANDLING: Handles empty lists gracefully
4️⃣ IN-PLACE MERGE: No extra space for new nodes

💡 KEY INSIGHTS:

1️⃣ DUMMY NODE TECHNIQUE: Simplifies merge logic
2️⃣ COMPARISON STRATEGY: Always choose smaller node
3️⃣ REMAINING NODES: Attach entire remaining part
4️⃣ POINTER MANAGEMENT: Move pointers correctly

🎯 WHY DUMMY NODE APPROACH?
- Simplifies the merge logic
- Handles edge cases elegantly
- No need to check if result list is empty
- Cleaner code structure

🎯 ALGORITHM INTUITION:
Think of it as "building a new list" by "comparing and choosing"
the smaller node from each list, then "attaching remaining parts".
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
List1: 1 -> 2 -> 4
List2: 1 -> 3 -> 4

🎯 GOAL: Merge into single sorted list!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
dummy = -1, tail = dummy
a = 1 (head1), b = 1 (head2)

📋 ITERATION 1: a = 1, b = 1
a.data <= b.data (1 <= 1) → TRUE
tail.next = a (1)
a = a.next = 2
tail = tail.next = 1
Result: -1 -> 1

📋 ITERATION 2: a = 2, b = 1
a.data <= b.data (2 <= 1) → FALSE
tail.next = b (1)
b = b.next = 3
tail = tail.next = 1
Result: -1 -> 1 -> 1

📋 ITERATION 3: a = 2, b = 3
a.data <= b.data (2 <= 3) → TRUE
tail.next = a (2)
a = a.next = 4
tail = tail.next = 2
Result: -1 -> 1 -> 1 -> 2

📋 ITERATION 4: a = 4, b = 3
a.data <= b.data (4 <= 3) → FALSE
tail.next = b (3)
b = b.next = 4
tail = tail.next = 3
Result: -1 -> 1 -> 1 -> 2 -> 3

📋 ITERATION 5: a = 4, b = 4
a.data <= b.data (4 <= 4) → TRUE
tail.next = a (4)
a = a.next = null
tail = tail.next = 4
Result: -1 -> 1 -> 1 -> 2 -> 3 -> 4

📋 LOOP ENDS: a = null, b = 4
a === null → attach remaining part
tail.next = b (4)
Result: -1 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4

📋 RETURN: dummy.next = 1 -> 1 -> 2 -> 3 -> 4 -> 4

🏆 RESULT: 1 -> 1 -> 2 -> 3 -> 4 -> 4

🎯 VISUAL REPRESENTATION:

ORIGINAL LISTS:
List1: 1 -> 2 -> 4
List2: 1 -> 3 -> 4

DUMMY NODE SETUP:
dummy -> -1
tail -> -1

MERGE PROCESS:
dummy -> -1 -> 1 -> 1 -> 2 -> 3 -> 4 -> 4
           ↑
         tail moves

FINAL RESULT:
1 -> 1 -> 2 -> 3 -> 4 -> 4

🔍 WHY THIS WORKS:
1️⃣ DUMMY NODE: Simplifies merge logic
2️⃣ COMPARISON: Always choose smaller node
3️⃣ POINTER MANAGEMENT: Move pointers correctly
4️⃣ REMAINING NODES: Attach entire remaining part

💡 KEY INSIGHT:
The algorithm uses a dummy node to simplify the merge logic,
then compares nodes and attaches the smaller one to the result!

🎯 TIME COMPLEXITY: O(n+m) - Single pass through both lists
🎯 SPACE COMPLEXITY: O(1) - Only pointers used
🎯 EDGE CASES: Handles empty lists and single nodes

🎯 COMPARISON WITH RECURSIVE APPROACH:
- Iterative: O(n+m) time, O(1) space
- Recursive: O(n+m) time, O(n+m) space
- Both produce correct results
- Iterative is more space efficient

🎯 WHY DUMMY NODE TECHNIQUE?
- Simplifies the merge logic
- No need to check if result list is empty
- Handles edge cases elegantly
- Cleaner code structure

🎯 MERGE STRATEGY:
- Compare current nodes from both lists
- Choose the smaller node
- Attach it to the result list
- Move the pointer of the chosen list

🎯 REMAINING NODES HANDLING:
- If one list is exhausted, attach the entire remaining part
- No need for loops since we attach the whole remaining part
- This is more efficient than node-by-node attachment

🎯 POINTER MANAGEMENT:
- Always move the pointer of the list from which we took a node
- Always move the tail pointer to the newly attached node
- This ensures we don't lose any nodes

🎯 EDGE CASES HANDLED:
- Empty lists: Return the non-empty list
- Both empty: Return null
- Single node lists: Handled correctly
- Different length lists: Handled correctly

🎯 OPTIMIZATION TECHNIQUES:
- Dummy node for simplified logic
- Direct attachment of remaining parts
- Efficient pointer management
- No extra space for new nodes

🎯 REAL-WORLD APPLICATIONS:
- Merging sorted data streams
- Combining sorted arrays
- Database merge operations
- File merging algorithms

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to produce sorted result
- Handles all edge cases correctly
- Optimal time and space complexity
- Simple and efficient implementation

🎯 WHY THIS APPROACH IS OPTIMAL:
- Time: O(n+m) - cannot do better than linear
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM RECURSIVE APPROACH:
- No stack space required
- More efficient for large lists
- Iterative approach is more space efficient
- Better for production code

🎯 ALGORITHM EFFICIENCY:
- Time: O(n+m) - optimal for this problem
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Use dummy nodes for simplified logic
- Manage pointers correctly
- Handle edge cases properly

🎯 MERGE PATTERN:
- Compare nodes from both lists
- Choose smaller node
- Attach to result list
- Move pointers appropriately

🎯 ALGORITHM INSIGHTS:
- Dummy node simplifies merge logic
- Comparison strategy is key
- Remaining nodes can be attached directly
- Pointer management is crucial

🎯 WHY COMPARISON STRATEGY WORKS:
- Both lists are already sorted
- Comparing current nodes gives us the next smallest
- This ensures the result is also sorted
- Greedy approach is optimal here

🎯 MATHEMATICAL INSIGHT:
- If both lists are sorted, comparing current nodes
- gives us the next smallest element
- This ensures the result is also sorted
- The algorithm is optimal

🎯 ALGORITHM BEAUTY:
- Simple yet powerful
- Uses dummy node technique
- Optimal complexity
- Handles all cases

🎯 WHY THIS IS THE BEST APPROACH:
- Optimal time complexity: O(n+m)
- Optimal space complexity: O(1)
- Simple to understand and implement
- Handles all edge cases correctly

🎯 FINAL INSIGHT:
The algorithm uses the dummy node technique to simplify
the merge logic, then compares nodes and attaches the
smaller one to the result, ensuring a sorted output!
*/