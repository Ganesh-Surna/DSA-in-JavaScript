/*
Problem:
Given only a reference to a node to be deleted in a singly linked list (not the head of the list), delete the given node from the linked list. You may assume the node to be deleted is not the tail node.

Example:
Input: The node with value 5 in the list 4 -> 5 -> 1 -> 9
Output: The list becomes 4 -> 1 -> 9

Constraints:
- The node to be deleted is not the last node of the list.
- Atleast 2 nodes in the linked list.
- You do not have access to the head of the list.
*/

function deleteNode(node){
    if(node === null || node.next === null){
        return
    }
    node.data = node.next.data
    node.next = node.next.next
}