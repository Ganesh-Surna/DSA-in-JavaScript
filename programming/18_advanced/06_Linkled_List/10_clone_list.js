/* Problem:
Given a linked list where each node contains an additional random pointer, 
which could point to any node in the list or null, construct a deep copy of the list. 
The deep copy should consist of exactly n brand new nodes, 
where each new node has its value set to the value of its corresponding original node. 
Both the next and random pointer of the new nodes should point to new nodes in the copied list such that
the pointers in the original list and copied list represent the same list state.

You are given the head of a singly linked list with random pointers. 
The task is to create a deep copy of this list where each node has both next and random pointers.

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]
Explanation: The linked list is shown above. The random pointers are shown in red.

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]
Explanation: Both nodes point to each other randomly.

Example 3:
Input: head = [[3,null],[3,0],[3,null]]
Output: [[3,null],[3,0],[3,null]]
Explanation: All nodes have the same value but different random pointers.

Example 4:
Input: head = []
Output: []
Explanation: Empty list.

Constraints:
- 0 <= n <= 1000
- -10^4 <= Node.val <= 10^4
- Node.random is null or is pointing to some node in the linked list.

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(1) for optimized solution, O(n) for hash map solution
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
        this.random = null
    }
}

// I. Optimized Solution (Three-Pass Algorithm):
// ✅ TC = O(n) --> Three passes through the list
// ✅ SC = O(1) --> Only pointers used, no extra space
function cloneLinkedList(head1){
    if (!head1) return null;
    
    // STEP 1: Insert clone nodes next to originals
    // (Example: A -> B -> C becomes A -> A' -> B -> B' -> C -> C'.)
    let curr = head1;
    while(curr !== null){
        let next = curr.next // storing next original node
        curr.next = new Node(curr.key) // curr -> curr's clone
        curr.next.next = next // curr's clone -> next original node
        curr = next // moving to next original node
    }
    
    // STEP 2. Connect "random" links (like "next" links) of clones
    // If curr.random = R, then curr.next.random = R.next (the clone of R).
    // curr.next is guaranteed to exist because every original has a clone beside it.
    curr = head1;
    while(curr !== null){
        curr.next.random = (curr.random === null) ? null : curr.random.next // justing connecting the clone nodes only. But with help of original nodes(since they are besides their original nodes).
        curr = curr.next.next // But we are not checking curr.next !== null in condition of loop.(No need to check because there will definitely a clone node besides the original node)
    }
    
    // STEP 3. Seperate Clone Nodes & Original Nodes
    let head2 = head1.next //  head1's next will be the clone of it. So it is the clone head.
    curr = head1;
    let clone = head2; // "clone" is Just like curr variable initializing with head
    while(curr !== null){
        curr.next = curr.next.next // linked next original node to curr
        clone.next = clone.next === null ? null : clone.next.next // ✅✅✅ just seprate next pointers, No problem with random pointers
        curr = curr.next // moving to next original node (we linked just above, that's why curr.next is not clone node, it is original node)
        clone = clone.next // moving to next clone node 
    }
    
    return head2
}

// II. Hash Map Solution:
// ✅ TC = O(n) --> Two passes through the list
// ✅ SC = O(n) --> Hash map to store original -> clone mapping
function cloneLinkedListHashMap(head){
    if (!head) return null;
    
    const m = new Map()
    m.set(null, null)
    
    let curr = head;
    while(curr !== null){
        // Create new node and store mapping
        m.set(curr, new Node(curr.key))
        curr = curr.next
    }
    
    curr = head;
    while(curr !== null){
        let cloneNode = m.get(curr)
        cloneNode.next = m.get(curr.next)
        cloneNode.random = m.get(curr.random)
        curr = curr.next
    }
    
    return m.get(head) // return the clone head
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
let head1 = new Node(7)
head1.next = new Node(13)
head1.next.next = new Node(11)
head1.next.next.next = new Node(10)
head1.next.next.next.next = new Node(1)

// Set random pointers
head1.random = null
head1.next.random = head1
head1.next.next.random = head1.next.next.next.next
head1.next.next.next.random = head1.next.next
head1.next.next.next.next.random = head1

console.log("Original:", print(head1));
let clonedHead1 = cloneLinkedList(head1)
console.log("Cloned:", print(clonedHead1)); // 7 --> 13 --> 11 --> 10 --> 1 --> null

let head2 = new Node(1)
head2.next = new Node(2)
head2.random = head2.next
head2.next.random = head2

console.log("Original:", print(head2));
let clonedHead2 = cloneLinkedList(head2)
console.log("Cloned:", print(clonedHead2)); // 1 --> 2 --> null

let head3 = new Node(3)
head3.next = new Node(3)
head3.next.next = new Node(3)
head3.random = null
head3.next.random = head3
head3.next.next.random = null

console.log("Original:", print(head3));
let clonedHead3 = cloneLinkedList(head3)
console.log("Cloned:", print(clonedHead3)); // 3 --> 3 --> 3 --> null

/*🎯 CORE IDEA: We use a THREE-PASS ALGORITHM to clone a linked list with random pointers. The key insight is to insert clone nodes next to original nodes, use the original nodes to set random pointers of clones, then separate the two lists.

📋 STEP-BY-STEP FLOW:

1️⃣ FIRST PASS - INSERT CLONE NODES:
   - Traverse the original list
   - For each original node, create a clone node
   - Insert clone node right after original node
   - Example: A -> B -> C becomes A -> A' -> B -> B' -> C -> C'

2️⃣ SECOND PASS - SET RANDOM POINTERS:
   - Traverse the original list (skipping clone nodes)
   - For each original node, set its clone's random pointer
   - If original.random = R, then clone.random = R.next (clone of R)
   - This works because clones are adjacent to originals

3️⃣ THIRD PASS - SEPARATE LISTS:
   - Extract the clone list starting from head.next
   - Restore original list by connecting original nodes
   - Connect clone nodes to form the clone list
   - Return the head of clone list

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ NO EXTRA SPACE: Uses only the existing structure
3️⃣ CLEVER TRICK: Adjacent positioning enables random pointer setting
4️⃣ THREE PASSES: Each pass handles one aspect of cloning

💡 KEY INSIGHTS:

1️⃣ ADJACENT POSITIONING: Clone nodes next to originals
2️⃣ RANDOM POINTER TRICK: Use original.random.next for clone.random
3️⃣ SEPARATION TECHNIQUE: Extract clone list while restoring original
4️⃣ THREE-PASS ALGORITHM: Each pass has a specific purpose

🎯 WHY THREE-PASS ALGORITHM?
- First pass: Create clone nodes
- Second pass: Set random pointers
- Third pass: Separate the lists
- Each pass is necessary and efficient

🎯 ALGORITHM INTUITION:
Think of it as "inserting clones between originals",
"using originals to set clone random pointers",
then "extracting the clone list".
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
head = 7 -> 13 -> 11 -> 10 -> 1
Random pointers: 7→null, 13→7, 11→1, 10→11, 1→7

🎯 GOAL: Create a deep copy with same structure!

🔍 STEP-BY-STEP PROCESS:

📋 PASS 1 - INSERT CLONE NODES:
Original: 7 -> 13 -> 11 -> 10 -> 1
After:   7 -> 7' -> 13 -> 13' -> 11 -> 11' -> 10 -> 10' -> 1 -> 1'

Process:
- curr = 7: next = 13, 7.next = 7', 7'.next = 13, curr = 13
- curr = 13: next = 11, 13.next = 13', 13'.next = 11, curr = 11
- curr = 11: next = 10, 11.next = 11', 11'.next = 10, curr = 10
- curr = 10: next = 1, 10.next = 10', 10'.next = 1, curr = 1
- curr = 1: next = null, 1.next = 1', 1'.next = null, curr = null

📋 PASS 2 - SET RANDOM POINTERS:
For each original node, set its clone's random pointer:

- curr = 7: 7.random = null → 7'.random = null
- curr = 13: 13.random = 7 → 13'.random = 7.next = 7'
- curr = 11: 11.random = 1 → 11'.random = 1.next = 1'
- curr = 10: 10.random = 11 → 10'.random = 11.next = 11'
- curr = 1: 1.random = 7 → 1'.random = 7.next = 7'

📋 PASS 3 - SEPARATE LISTS:
head2 = 7' (head.next)
curr = 7, clone = 7'

- curr.next = 13 (7.next.next), clone.next = 13' (7'.next.next)
- curr = 13, clone = 13'
- curr.next = 11 (13.next.next), clone.next = 11' (13'.next.next)
- curr = 11, clone = 11'
- curr.next = 10 (11.next.next), clone.next = 10' (11'.next.next)
- curr = 10, clone = 10'
- curr.next = 1 (10.next.next), clone.next = 1' (10'.next.next)
- curr = 1, clone = 1'
- curr.next = null (1.next.next), clone.next = null (1'.next.next)

🏆 RESULT: Clone list = 7' -> 13' -> 11' -> 10' -> 1'
Random pointers: 7'→null, 13'→7', 11'→1', 10'→11', 1'→7'

🎯 VISUAL REPRESENTATION:

ORIGINAL LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  7  │ -> │ 13  │ -> │ 11  │ -> │ 10  │ -> │  1  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  null      7         1         11        7

AFTER PASS 1:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  7  │ -> │ 7'  │ -> │ 13  │ -> │ 13' │ -> │ 11  │ -> │ 11' │ -> │ 10  │ -> │ 10' │ -> │  1  │ -> │ 1'  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘

AFTER PASS 2 (Random pointers set):
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│  7  │ -> │ 7'  │ -> │ 13  │ -> │ 13' │ -> │ 11  │ -> │ 11' │ -> │ 10  │ -> │ 10' │ -> │  1  │ -> │ 1'  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑         ↑         ↑         ↑         ↑         ↑
  null      null      7         7'        1         1'        11        11'       7         7'

FINAL CLONE LIST:
┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐    ┌─────┐
│ 7'  │ -> │ 13' │ -> │ 11' │ -> │ 10' │ -> │ 1'  │
└─────┘    └─────┘    └─────┘    └─────┘    └─────┘
   ↑         ↑         ↑         ↑         ↑
  null      7'        1'        11'       7'

🔍 WHY THIS WORKS:
1️⃣ ADJACENT POSITIONING: Clones are next to originals
2️⃣ RANDOM POINTER TRICK: Use original.random.next for clone.random
3️⃣ SEPARATION TECHNIQUE: Extract clone list while restoring original
4️⃣ THREE-PASS ALGORITHM: Each pass handles one aspect

💡 KEY INSIGHT:
The algorithm uses the original list structure to set random pointers
of clones, then extracts the clone list!

🎯 TIME COMPLEXITY: O(n) - Three passes through list
🎯 SPACE COMPLEXITY: O(1) - Only pointers used
🎯 EDGE CASES: Handles empty list and null random pointers
*/