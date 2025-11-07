class Solution {
  // Function to find the minimum element in the given BST.
  // ✅ TC = O(h), SC = O(1)
  minValue(root) {
    // your code here
    if (!root) return -1;

    let curr = root;
    // left most node is the minimum node
    while (curr.left) {
      curr = curr.left;
    }

    return curr.data;
  }

  // ✅ TC = O(h), SC = O(1)
  maxValue(root) {
    // your code here
    if (!root) return -1;

    let curr = root;
    // right most node is the maximum node
    while (curr.right) {
      curr = curr.right;
    }

    return curr.data;
  }
}
