class Solution {
    // Function to return a list containing the preorder traversal of the tree.
    inorder(root) {
        // your code here
        if(!root) return []
        
        // Instead of consol logging, to return whole result as array
        return [...this.preorder(root.left), root.data,  ...this.preorder(root.right)]
    }
    preorder(root) {
        // your code here
        if(!root) return []
        
        // Instead of consol logging, to return whole result as array
        return [root.data, ...this.preorder(root.left), ...this.preorder(root.right)]
    }
    postOrder(root) {
        // your code here
        if(!root) return []
        
        return [...this.postOrder(root.left), ...this.postOrder(root.right), root.data]
    }
}
// Output: [1, 4, 4, 2]