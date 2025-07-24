class Solution {
    getLength(head) {
        // code here
        let len = 0, curr = head
        do{
            len += 1
            curr=curr.next
        }while(curr !== head)
        
        return len
    }
}