class Solution {
    // function to check whether the given linked list is circular or not.
    isCircular(head) {
        // your code here
        let curr = head
        while(true){
            if(!curr.next) return false
            if(curr.next === head) return true
            curr = curr.next
        }
    }
}