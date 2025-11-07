// 1. Recursive Approach (Preorder Traversal)
// ✅ TC: O(n) - visit each node once
// ✅ SC: O(h) - recursion stack, h = height of tree
function isValidBST(root, min=-Infinity, max=Infinity) {
    if(!root) return true

    return ((min < root.val && max > root.val) && isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max))
};

// OR
function isValidBST(root, min=-Infinity, max=Infinity) {
    if(!root) return true

    if(min >= root.val || max <= root.val){
        return false
    }

    return (isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max))
};


// 2. Recursive Approach (Inorder Traversal)
// ✅ TC: O(n)
// ✅ SC: O(h)
function isValidBST(root) {
    let prev = null;
    return inorder(root);

    // Helper Function
    function inorder(node) {
        if(!node) return true;

        // Traverse the left subtree
        if(!inorder(node.left)) return false; // if left subtree is not a BST, then return false

        if(prev !== null && node.val <= prev.val) return false; // if current node <= previous node, then return false

        prev = node;

        // Traverse the right subtree
        return inorder(node.right);
    }
};

// 3. Iterative Approach (Inorder Traversal)
// ✅ TC: O(n)
// ✅ SC: O(h)
function isValidBST(root) {
    if(!root) return true;

    const stack = [];
    let prev = null;
    let curr = root;

    while(curr || stack.length > 0) {
        // Traverse to the leftmost node
        while(curr) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();

        if(prev !== null && curr.val <= prev.val) return false; // if current node <= previous node, then return false
        
        prev = curr;

        // Traverse the right subtree
        curr = curr.right;
    }
};