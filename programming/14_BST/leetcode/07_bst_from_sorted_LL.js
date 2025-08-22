/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
    if (!head) return null;
    if (!head.next) return new TreeNode(head.val);
    
    let slow = head; // mid
    let fast = head;
    let prev = null; // to make LL half
    
    while (fast && fast.next) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }
    
    // just before slow(i.e., not including mid)
    prev.next = null; // Split the list into two halves
    
    // Slow is the mid
    const root = new TreeNode(slow.val);
    root.left = sortedListToBST(head); // left side LL of mid/Slow (cut by prev.next = null)
    root.right = sortedListToBST(slow.next); // // right side LL of mid/Slow
    
    return root;
};

// Approaches
// 1. Find the Middle Element: 
//  Use the slow and fast pointer technique to find the middle element of the linked list. 
//  The slow pointer moves one step at a time, while the fast pointer moves two steps at a time. 
//  When the fast pointer reaches the end,
//  the slow pointer will be at the middle.

// 2. Construct the Root: 
// The middle element becomes the root of the BST.

// 3. Recursive Construction:
//  The left half of the list (before the middle element) is used to construct the left subtree,
//  and the right half (after the middle element) is used to construct the right subtree.
//  This process is repeated recursively until the entire list is processed.