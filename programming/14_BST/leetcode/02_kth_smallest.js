/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
    let count = 0, curr = root, st = []

    while (curr || st.length > 0) {
        // In-order traversal (pushing head first, and going to its left)
        while (curr) {
            st.push(curr)
            curr = curr.left
        }

        curr = st.pop()
        count++

        if (count === k) return curr.val

        // Going to right (after completing left tree of root, i.e., inorder traversal)
        curr = curr.right
    }

    return -1
};

// Approach
// Step1: 
//      In-order Traversal: Perform an in-order traversal of the BST.
//      This traversal processes nodes in the left subtree first, then the current node, and finally the right subtree. 
//      As a result, the nodes are processed in ascending order.
//Step2: 
//      Tracking the kth Element: During the traversal, keep track of the number of nodes visited.
//       When the count reaches k, return the value of the current node.