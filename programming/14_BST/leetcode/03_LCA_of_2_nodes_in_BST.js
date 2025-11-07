/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    let curr = root
    while(curr){
        if(p.val < curr.val && q.val < curr.val){
            // Both nodes are in the left subtree
            curr = curr.left
        }else if(p.val > curr.val && q.val > curr.val){
            // Both nodes are in the right subtree
            curr = curr.right
        }
        else {
            // We have found the LCA.
            // Either:
            // 1. One is on left and one is on right
            // 2. One is the current node and other is its child
            return curr;
        }
    }
    return null // In case the tree is empty
};


// Approach
// Step1: Start from the Root: Begin traversing the tree starting from the root node.

// Step2: Compare Values: At each node, compare the values of p and q with the current node's value.

//      case1: If both p and q are greater than the current node's value, then the LCA must be in the right subtree.

//      case2: If both p and q are less than the current node's value, then the LCA must be in the left subtree.

//      case3: If one of p or q is equal to the current node's value, or if p and q are on different sides of the current node, then the current node is the LCA.

// Step6: Recursive or Iterative Traversal: This logic can be implemented either recursively or iteratively. The iterative approach is often preferred for its constant space complexity.
