function zigZagTraversal(root) {
    if (!root) return []; // Handle empty tree case

    const res = []; // Stores final traversal res
    const deque = [root]; // Double-ended queue for level processing
    let level = 1; // Tracks current level (1-based)

    while (deque.length > 0) {
      const levelSize = deque.length; // Nodes in current level
      const levelNodes = []; // Stores nodes at current level

      for (let i = 0; i < levelSize; i++) {
        let curr;

        if (level % 2 === 1) {
          // Odd level (left-to-right)
          curr = deque.shift(); // Process from front
          // Add children to back (left first)
          if (curr.left) deque.push(curr.left);
          if (curr.right) deque.push(curr.right);
        } else {
          // Even level (right-to-left)
          curr = deque.pop(); // Process from back
          // Add children to front (right first)
          if (curr.right) deque.unshift(curr.right);
          if (curr.left) deque.unshift(curr.left);
        }

        levelNodes.push(curr.data); // Add to current level
      }

      res.push(...levelNodes); // Add level nodes to res
      level++; // Move to next level
    }

    return res;
}

// Driver Code

// Representation of input binary tree:
//         1
//        / \
//       2   3
//      / \   \
//     4   5   6

let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.right = new Node(6);

console.log('Zigzag Level Order Traversal:');
console.log(zigZagTraversal(root));

/* 
EXAMPLE FLOW FOR TREE:
        1
       / \
      2   3
     / \   \
    4   5   6

Initial State:
- deque: [1]
- level: 1
- res: []

Level 1 (Odd, left-to-right):
1. Process 1 (shift from front)
   - Add to levelNodes: [1]
   - Add children: deque becomes [2, 3]
- res: [1]

Level 2 (Even, right-to-left):
1. Process 3 (pop from back)
   - Add to levelNodes: [3]
   - Add children: deque becomes [6, 2]
2. Process 2 (pop from back)
   - Add to levelNodes: [3, 2]
   - Add children: deque becomes [6, 4, 5]
- res: [1, 3, 2]

Level 3 (Odd, left-to-right):
1. Process 6 (shift from front)
   - Add to levelNodes: [6]
   - No children to add
2. Process 4 (shift from front)
   - Add to levelNodes: [6, 4]
   - No children to add
3. Process 5 (shift from front)
   - Add to levelNodes: [6, 4, 5]
   - No children to add
- res: [1, 3, 2, 6, 4, 5]

Final Output: [1, 3, 2, 6, 4, 5]

COMPLEXITY ANALYSIS:
- Time: O(n) - Each node processed exactly once
- Space: O(n) - Queue stores at most one level of nodes
*/
