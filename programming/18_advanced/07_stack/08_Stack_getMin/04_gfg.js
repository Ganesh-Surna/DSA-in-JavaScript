/* Problem: ✅✅✅✅ Get min at pop ✅✅✅✅

You are given an integer array arr[]. You need to first push the elements of the array into a stack 
and then print minimum in the stack at each pop until stack becomes empty.

Examples:
___________________________

Input: arr[] = [1, 6, 43, 1, 2, 0, 5]
Output: [0, 0, 1, 1, 1, 1, 1]

Explanation: 
After pushing the elements to the stack, 
the stack will be 5->0->2->1->43->6->1. 
Now, poping the elements from the stack:
popping 5: min in the stack is 0. popped 5
popping 0: min in the stack is 0. popped 0
popping 2: min in the stack is 1. popped 2
popping 1: min in the stack is 1. popped 1
popping 43: min in the stack is 1. popped 43
popping 6: min in the stack is 1. popped 6
popping 1: min in the stack is 1. popped 1.

*/

// ⭐⭐⭐⭐ 
// NOTE: Here we don't see how the stack is implemented. 
// But we can see by printing the stack in the function where the stack is passed as parameter. 
// But still stack does not have the "min" field, but we are setting it externally.
// ⭐⭐⭐⭐

// ✅ TC = O(n)
// ✅ SC = O(n)
class Solution {

    /**
     * @param {number} arr
     * @param {number} n
     * @returns {Stack}
     */
    _push(arr, n) {
        let st = new Stack()
        for(let i=0; i<n; i++){
            if(st.arr.length === 0){
                st.arr.push(arr[i])
                st.min = arr[i] // ⭐⭐⭐⭐
            }else if(arr[i] <= st.min){
                st.arr.push(2*arr[i] - st.min)
                st.min = arr[i]
            }else{
                st.arr.push(arr[i])
            }
        }
        return st
    }

    /**
     * @param {Stack} s
     */
    _getMinAtPop(s) {
        let res = []
        while(s.arr.length > 0){
            let t = s.arr.pop()
            let curr = s.min
            if(t <= s.min){
                s.min = 2*s.min - t
            }
            res.push(curr)
        }
        
        console.log(...res)
    }
}