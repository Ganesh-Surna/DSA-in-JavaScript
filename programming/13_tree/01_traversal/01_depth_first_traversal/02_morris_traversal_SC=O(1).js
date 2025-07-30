// Javascript code to print Inorder Traversal
// of Binary Tree using "Morris Traversal"
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Function for inorder traversal using
// Morris Traversal
// ✅ TC = O(n) (if we take a closer look, we can notice that every edge of the tree is traversed at most three times.)
// ✅ SC = O(1)
function inOrder(root) {
  let res = [];
  let curr = root;

  while (curr) {
    if (!curr.left) {
      // If no left child, visit this
      // node and go right
      res.push(curr.data);
      curr = curr.right;
    } else {
      // Find the inorder predecessor of curr
      let prev = curr.left;
      while (prev.right && prev.right !== curr) {
        prev = prev.right;
      }

      // Make curr as the right child of its
      // inorder predecessor
      if (!prev.right) {
        prev.right = curr;
        curr = curr.left;
      } else {
        // Revert the changes made in the
        // tree structure
        prev.right = null;
        res.push(curr.data);
        curr = curr.right;
      }
    }
  }

  return res;
}

// ✅ TC = O(n) (if we take a closer look, we can notice that every edge of the tree is traversed at most three times.)
// ✅ SC = O(1)
function preorder(root) {
    const result = [];
    let current = root;
    while (current) {
        if (!current.left) {
            result.push(current.data);
            current = current.right;
        } else {
            let prev = current.left;
            while (prev.right && prev.right !== current) {
                prev = prev.right;
            }
            if (!prev.right) {
                result.push(current.data); // Visit before going left
                prev.right = current;
                current = current.left;
            } else {
                prev.right = null;
                current = current.right;
            }
        }
    }
    return result;
}

// Driver Code

// Representation of input binary tree:
//           1
//          / \
//         2   3
//        / \
//       4   5
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

let res = inOrder(root);

console.log(res.join(" "));
