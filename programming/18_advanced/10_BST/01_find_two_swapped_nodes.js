// 99. Find Two Swapped Nodes in a Binary Search Tree

// You are given the ✅✅ INORDER TRAVERSAL of a binary search tree (BST),
// where the values of exactly two nodes of the tree were swapped by mistake. 
// Find the two nodes that were swapped by mistake.

// 1. Iterative Approach
// ✅ TC: O(n)
// ✅ SC: O(1)
function findTwoSwappedNodes(inorder) {
    let first = null, second = null;

    for(let i = 1; i < inorder.length; i++){
        if(inorder[i] < inorder[i-1]){
            if(first === null){
                first = inorder[i-1]; // first node to be swapped will be catched only once (when first=null)
            }
            second = inorder[i]; // to catch closest violation (so not breaking immidiately after finding second node to swap, we will continue to find the second node to swap)
        }
    }

    return [first, second];
}


// 2. Recursive Approach
// ✅ TC: O(n)
// ✅ SC: O(n)
function findTwoSwappedNodes(root) {
    let first = null, second = null, prev = null; // Nodes not values

    inOrder(root);

    return [first, second];

    // Helper Function
    function inOrder(node) {
        if (!node) return;

        inOrder(node.left);

        if (prev !== null && prev.val > node.val) { // if left node > curr node (i.e., violation)
            // In inorder traversal of BST (SORTED), we should have prev.val < node.val. But here it is not. So its a violation
            if (first === null) {
                // first node to be swapped will be catched only once (when first=null)
                first = prev;
            }
            second = node; // to catch closest violation (so not breaking immidiately after finding second node to swap, we will continue to find the second node to swap)
        }
        prev = node; // Will be the left node of curr node(i.e., inorder traversal)

        inOrder(node.right);
    }

};

// Example 1:
// Input: inorder = [1, 3, 2, 4]
// Output: [3, 2]
// Explanation: 
//              first violation is 2(i) < 3(i-1). Then we update first = 3(i-1), and second = 2(i)
//              No second violation found, so we return [3, 2]

// Example 2:
// Input: inorder = [100, 500, 300, 400, 200]
// Output: [500, 200]
// Explanation: 
//              first violation is 300(i) < 500(i-1). Then we update first = 500(i-1), and second = 300(i)
//              second violation is 200(i) < 400(i-1). Then we just update second = 200(i)
//              so we return [500, 200]