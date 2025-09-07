// Question:
// A singly linked list and an integer of k are given.
// You need to swap the kth node from the beginning and
// the kth node from the end of the linked list.
// Swap the nodes through the links. ⭐⭐⭐
// Do not change the content of the nodes. ⭐⭐⭐

// Note: The driver code will output "true" if you successfully swap the nodes.
class Solution {
  // ✅ TC: O(N)
  // ✅ SC: O(1)
  swapKthNode(head, k) {
    if (!head || !head.next || k <= 0) return head;

    let prev1 = null, prev2 = null;
    let node1 = head, node2 = head;

    // START OF --> Find kth node from beginning
    let first = head;
    for (let i = 1; i < k && first; i++) {
      prev1 = first;
      first = first.next;
    }
    if (!first) return head; // ❌
    node1 = first;
    // END OF --> Find kth node from beginning

    // START OF --> Find kth node from end
    let second = head;
    // No need to do this again, we already have first pointer
    // first = head;
    // for (let i = 0; i < k && first; i++) {
    //   first = first.next;
    // }
    // if (!first) return head; // ❌
    while (first.next) {
      prev2 = second;
      second = second.next;
      first = first.next;
    }
    node2 = second;
    // END OF --> Find kth node from end

    if (node1 === node2) return head; // ❌

    // Swap the nodes

    // If node1 is not the head, link its previous node to node2
    if (prev1) {
      prev1.next = node2;
    } else {
      // If node1 is the head, after swap node2 becomes the new head
      head = node2;
    }

    // If node2 is not the head, link its previous node to node1
    if (prev2) {
      prev2.next = node1;
    } else {
      // If node2 is the head, after swap node1 becomes the new head
      head = node1;
    }

    // Determine if nodes are adjacent and their order
    const node1NextIsNode2 = node1.next === node2;
    const node2NextIsNode1 = node2.next === node1;

    // Handle next pointers based on adjacency
    if (node1NextIsNode2) {
      // Case: node1 -> node2
      node1.next = node2.next;
      node2.next = node1;
    } else if (node2NextIsNode1) {
      // Case: node2 -> node1
      node2.next = node1.next;
      node1.next = node2;
    } else {
      // Nodes are not adjacent
      const temp = node1.next;
      node1.next = node2.next;
      node2.next = temp;
    }

    return head;
  }
}