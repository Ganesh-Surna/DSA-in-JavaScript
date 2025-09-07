class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// ✅ TC = O(n), SC = O(h)
function buildBSTFromPostorder(postorder) {
  // 1. Initialize index to the last element of the postorder array
  let index = postorder.length - 1;

  function helper(lowerBound, upperBound) {
    // 2. If we have processed all elements, return null
    if (index < 0) return null;

    let val = postorder[index];

    // 3. If value not in bounds, return null (i.e., not a valid BST)
    if (val < lowerBound || val > upperBound) return null;

    // 4. Move to next element
    index--;

    // 5. Create a new node with the current value
    const root = new TreeNode(val);

    // 6. Build right subtree first, then left
    root.right = helper(val, upperBound);
    root.left = helper(lowerBound, val);

    // 7. Return the root
    return root;
  }

  return helper(-Infinity, Infinity);
}

// ********** USAGE: **********
const postorder = [1, 7, 5, 50, 40, 10];
const root = buildBSTFromPostorder(postorder);
// output tree:
// 
// Postorder: [1, 7, 5, 50, 40, 10]
// 
// Tree Structure:
//       10
//      /  \
//     5    40
//    / \    \
//   1   7    50
// 
// Explanation of Construction:
// - Postorder traversal: Left → Right → Root
// - We process from right to left (reverse order)
// - 10 becomes root (last element)
// - 40 becomes right child of 10 (40 > 10)
// - 50 becomes right child of 40 (50 > 40)
// - 5 becomes left child of 10 (5 < 10)
// - 7 becomes right child of 5 (7 > 5)
// - 1 becomes left child of 5 (1 < 5)
// 
// Inorder traversal: [1, 5, 7, 10, 40, 50] ✓ (sorted)


function inorderTraversal(node) {
  if (!node) return [];
  return [
    ...inorderTraversal(node.left),
    node.val,
    ...inorderTraversal(node.right),
  ];
}

console.log(inorderTraversal(root)); // Should print sorted [1, 5, 7, 10, 40, 50]
