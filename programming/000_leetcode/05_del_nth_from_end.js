// Approach:

// 1. Dummy Node: Use a dummy node to handle edge cases where the head needs to be removed.
// 2. Two Pointers: Use two pointers, fast and slow, initialized at the dummy node. 
//      Move fast n+1 steps ahead first, then move both fast and slow until fast reaches the end. 
//      This ensures slow is just before the node to be removed.
// 3. Remove Node: Adjust the next pointer of slow to skip the nth node from the end.

// TC = O(n)
// SC = O(1)
var removeNthFromEnd = function(head, n) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;

    // Move fast n+1 steps ahead
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the nth node from the end
    slow.next = slow.next.next;

    return dummy.next;
};

/*

Ex: head [1, 2], n = 2
output: [1]

Ex: head [1, 2, 3, 4, 5], n = 2
output: [1, 2, 3, 5]

Ex: head [1], n = 1
output: []

*/