class Solution {
    areIdentical(head1, head2) {
        let curr1 = head1, curr2 = head2;
        while(curr1 && curr2){
            if(curr1.data !== curr2.data){
                return false;
            }
            curr1 = curr1.next;
            curr2 = curr2.next;
        }
        
        // Only return true if BOTH reached the end (both are null)
        return curr1 === null && curr2 === null;
    }
}