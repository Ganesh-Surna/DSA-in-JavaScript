// Function to delete a node without any reference to head pointer.
class Solution {
  deleteNode(node) {
    if (node === null || node.next === null) {
      // Cannot delete if node is null or it's the last node
      return;
    }

    // Copy data from next node
    node.data = node.next.data;

    // Bypass the next node
    node.next = node.next.next;
  }
}
