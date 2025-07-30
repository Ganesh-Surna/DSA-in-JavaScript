// Advantages:
// No Recursion:
//      Avoids stack overflow for deep trees.
// Efficient Memory:
//      Uses a single stack and builds the result array incrementally,
//      avoiding unnecessary array creations.

class Node {
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }

// ✅ TC = O(n)
// ✅ SC = O(h) ==> Worst Case(Skewed Tree, h=n): O(n)
//              ==> Best Case(Balanced Tree, h=logn): O(logn)
function preorder(root) {
  if (!root) return [];
  const stack = [root];
  const result = [];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.data);
    if (node.right) stack.push(node.right); // Push right first so left is processed first
    if (node.left) stack.push(node.left);
  }
  return result;
}

function inorder(root) {
  const result = [];
  const stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    // Traverse to the leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Visit the peak of the stack
    current = stack.pop();
    result.push(current.data);

    // Move to the right subtree
    current = current.right;
  }

  return result;
}

function postorder(root) {
  const result = [];
  const stack = [];
  let current = root;
  let lastVisited = null; // To track the last visited node

  while (current || stack.length > 0) {
    // Traverse to the leftmost node
    while (current) {
      stack.push(current);
      current = current.left;
    }

    // Peek the top node without popping
    const peekNode = stack[stack.length - 1];

    // If right child exists and hasn't been visited yet
    if (peekNode.right && peekNode.right !== lastVisited) {
      current = peekNode.right; // Move to the right subtree (and this will again traverses to the leftmost node of this subtree)
    } else {
      // Visit the node (post-order position)
      result.push(peekNode.data);
      lastVisited = stack.pop(); // Mark as visited
    }
  }

  return result;
}

function postorder2(root) {
  const result = [];
  const stack = [];
  let lastVisited = null;
  let current = root;

  while (current || stack.length > 0) {
    // Traverse to the leftmost node
    if (current) {
      stack.push(current);
      current = current.left;
    } else {
      // Check the top node without popping
      const peekNode = stack[stack.length - 1];

      // If right child exists and hasn't been visited yet
      if (peekNode.right && peekNode.right !== lastVisited) {
        current = peekNode.right;
      } else {
        // Visit the node
        result.push(peekNode.data);
        lastVisited = stack.pop();
      }
    }
  }

  return result;
}

function postorder3(root) {
    if (!root) return [];
    const stack1 = [root];
    const stack2 = [];
    const result = [];

    while (stack1.length > 0) {
        const node = stack1.pop();
        stack2.push(node);
        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    while (stack2.length > 0) {
        result.push(stack2.pop().data);
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

console.log(inorder(root)); // [ 4, 2, 5, 1, 3 ]
console.log(preorder(root)); // [ 1, 2, 4, 5, 3 ]
console.log(postorder(root)); // [ 4, 5, 2, 3, 1 ]
