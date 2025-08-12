class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// ✅ TC = O(n), SC = O(h)
function buildBSTFromPostorder(postorder) {
  let index = postorder.length - 1;

  function helper(lowerBound, upperBound) {
    if (index < 0) return null;

    let val = postorder[index];

    // Value must be within bounds to be valid
    if (val < lowerBound || val > upperBound) return null;

    index--; // move to next element
    const root = new TreeNode(val);

    // Build right subtree first, then left
    root.right = helper(val, upperBound);
    root.left = helper(lowerBound, val);

    return root;
  }

  return helper(-Infinity, Infinity);
}

// ********** USAGE: **********
const postorder = [1, 7, 5, 50, 40, 10];
const root = buildBSTFromPostorder(postorder);

function inorderTraversal(node) {
  if (!node) return [];
  return [
    ...inorderTraversal(node.left),
    node.val,
    ...inorderTraversal(node.right),
  ];
}

console.log(inorderTraversal(root)); // Should print sorted [1, 5, 7, 10, 40, 50]
