// Floyd's Cycle Detection (Tortoise and Hare)

// JavaScript program to count number of nodes
// in loop in a linked list if loop is present

class Node {
  constructor(x) {
    this.data = x;
    this.next = null;
  }
}

// Returns count of nodes present in loop.
function countNodes(node) {
  let res = 1;
  let curr = node;
  while (curr.next !== node) {
    res++;
    curr = curr.next;
  }
  return res;
}

// This function detects and counts loop
//  nodes in the list. If loop is not there
//  then returns 0
// ✅ TC: O(N) (Best/Average/Worst Case)
// ✅ SC: O(1)
function countNodesinLoop(head) {
  let slow = head,
    fast = head;

  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    // If slow and fast meet at
    // some point then there is a loop
    if (slow === fast) return countNodes(slow);  // we're comparing whether these two variables point to the exact same object in memory.
  }

  // Return 0 to indicate that
  //   there is no loop
  return 0;
}

let head = new Node(1);
head.next = new Node(2);
head.next.next = new Node(3);
head.next.next.next = new Node(4);
head.next.next.next.next = new Node(5);

// Loop from 5 to 2
head.next.next.next.next.next = head.next;
console.log(countNodesinLoop(head));

// Explantion: (How it works for different cases)
//
// 1. No Loop:
//    Example: 1 -> 2 -> 3 -> 4 -> 5 -> null
//    - 'slow' and 'fast' start at 1.
//    - Iteration 1: slow=2, fast=3
//    - Iteration 2: slow=3, fast=5
//    - Iteration 3: slow=4, fast=null (end)
//    - No meeting point, returns 0 (no loop).
//
// 2. Loop Exists (General Case):
//    Example: 1 -> 2 -> 3 -> 4 -> 5 -> 3 (loop of 3-4-5)
//    (5 points to 3, loop of 3-4-5)
//    - 'slow' and 'fast' start at 1.
//    - Iteration 1: slow=2, fast=3
//    - Iteration 2: slow=3, fast=5
//    - Iteration 3: slow=4, fast=4 (they meet)
//    - Loop detected. 'countNodes' starts at 4:
//        - 4 -> 5 (count=2)
//        - 5 -> 3 (count=3)
//        - 3 -> 4 (back to start, count=3)
//    - Returns 3 (loop length).
//
// 3. Loop at Head:
//    Example: 1 -> 2 -> 3 -> 4 -> 5 -> 1 (loop of all nodes)
//    (5 points to 1, loop of all nodes)
//    Step-by-step:
//      - Initialization: slow=1, fast=1
//      - Iteration 1: slow=2, fast=3
//      - Iteration 2: slow=3, fast=5
//      - Iteration 3: slow=4, fast=2
//      - Iteration 4: slow=5, fast=4
//      - Iteration 5: slow=1, fast=1 (meet at 1, loop detected)
//    - Counting loop nodes starting at 1:
//      - 1 -> 2 (count=2)
//      - 2 -> 3 (count=3)
//      - 3 -> 4 (count=4)
//      - 4 -> 5 (count=5)
//      - 5 -> 1 (back to start, stop)
//    - Returns 5 (number of nodes in the loop: 1, 2, 3, 4, 5)
//
// 4. Loop in the Middle:
//    Example: 1 -> 2 -> 3 -> 4 -> 5 -> 2 (loop starts at 2)
//    - Nodes before loop: 1
//    - Loop nodes: 2, 3, 4, 5
//    Step-by-step:
//      - Initialization: slow=1, fast=1
//      - Iteration 1: slow=2, fast=3
//      - Iteration 2: slow=3, fast=5
//      - Iteration 3: slow=4, fast=3
//      - Iteration 4: slow=5, fast=5 (meet at 5, loop detected)
//    - Counting loop nodes starting at 5:
//      - 5 -> 2 (count=2)
//      - 2 -> 3 (count=3)
//      - 3 -> 4 (count=4)
//      - 4 -> 5 (back to start, stop)
//    - Returns 4 (number of nodes in the loop: 2, 3, 4, 5)
//
// 5. Single Node Loop:
//    Example: 1 -> 1 (node points to itself)
//    Step-by-step:
//      - Initialization: slow=1, fast=1
//      - Iteration 1: slow=1, fast=1 (since next is itself, both pointers stay at 1)
//      - They meet immediately at node 1 (loop detected)
//    - Counting loop nodes starting at 1:
//      - 1 -> 1 (back to start, count=1, stop)
//    - Returns 1 (number of nodes in the loop: 1)
//
// Summary:
// - The algorithm efficiently detects if a loop exists using Floyd's Cycle Detection (Tortoise and Hare).
// - If a loop is found, it counts the number of nodes in the loop.
// - If no loop is found, it returns 0.

// TC :
// The slow and fast pointers traverse the list at most O(N) times before either finding a loop or reaching the end.
// If a loop exists, after entering the loop, the pointers will meet in at most O(K) steps, where K is the length of the loop (K ≤ N).
// Counting the nodes in the loop also takes O(K) time.
// So, the total is O(N) + O(K) = O(N).



// ✅ How Node Comparison Works in This Code ?

// 1. Same Object Reference:

// When we do slow === fast, we're comparing whether these two variables point to the exact same object in memory.
// In a properly constructed linked list with cycles (like your example), the next pointers will reference the exact same node objects, not copies.

// 2. Your Example Works Because:

// ⭐⭐⭐ head.next.next.next.next.next = head.next; // 5 → 2
// This makes Node5's next point to the exact same Node2 object that exists in the list
// Not a new Node with the same data, but the original Node2

// ✅ When This Could Be Problematic ?
// This implementation would fail if:

// i. You created new nodes with the same data to form the cycle:

//  ⭐⭐⭐head.next.next.next.next.next = new Node(2); // Different object!
//    Now the cycle wouldn't be detected because even though the data matches, they're different objects

// ii. If nodes were being reused or copied in unexpected ways

function countNodesinLoop2(head) {
    let slow = head, fast = head;

    while (slow !== null && fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;

        // More robust check
        if (slow === fast || (slow && fast && slow.data === fast.data)) {
            return countNodes(slow);
        }
    }
    return 0;
}