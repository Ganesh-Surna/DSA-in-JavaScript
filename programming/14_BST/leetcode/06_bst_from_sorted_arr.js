// 108. Convert Sorted Array to Binary Search Tree

// Given an integer array nums 
// where the elements are sorted in ascending order, 
// convert it to a "height-balanced" BST.

var sortedArrayToBST = function(nums) {
    if (nums.length === 0) return null; // if the array is empty, then return null
    
    const mid = Math.floor(nums.length / 2); // mid = middle element of the array (which will be the root of the BST)
    const root = new TreeNode(nums[mid]); // create a new node with the middle element of the array
    
    root.left = sortedArrayToBST(nums.slice(0, mid)); // left side of the array (before mid)
    root.right = sortedArrayToBST(nums.slice(mid + 1)); // right side of the array (after mid)
    
    return root;
};