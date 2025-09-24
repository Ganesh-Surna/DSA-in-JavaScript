/* Problem: ✅✅✅✅ Two Stacks in an Array ✅✅✅✅

Your task is to implement  2 stacks in one array efficiently. You need to implement 4 methods.

twoStacks : Initialize the data structures and variables to be used to implement  2 stacks in one array.
push1 : pushes element into the first stack.
push2 : pushes element into the second stack.
pop1 : pops an element from the first stack and returns the popped element. If the first stack is empty, it should return -1.
pop2 : pops an element from the second stack and returns the popped element. If the second stack is empty, it should return -1.

Constraints:
1 ≤ number of queries ≤ 104
1 ≤ number of elements in the stack ≤ 100 ⭐⭐⭐⭐⭐
The sum of the count of elements in both the stacks < size of the given array ⭐⭐⭐⭐⭐
*/

// ✅ TC = O(1) for all operations
// ✅ SC = O(1) for all operations
class TwoStacks {
    // constructor for twoStacks()
    constructor() {
        this.cap = 100*2 // as per constraints ⭐⭐⭐⭐⭐
        this.arr = new Array(this.cap)
        this.top1 = -1
        this.top2 = this.cap
    }

    // Function to push an integer into the stack1.
    push1(x) { // ✅ TC = O(1)
        if(this.top1 < this.top2 - 1){
            this.top1++
            this.arr[this.top1] = x
        }
        
    }

    // Function to push an integer into the stack2.
    push2(x) { // ✅ TC = O(1)
        if(this.top1 < this.top2 - 1){
            this.top2--
            this.arr[this.top2] = x
        }
    }

    // Function to remove an element from top of the stack1.
        
    pop1() { // ✅ TC = O(1)
        if(this.top1 === -1) return -1
        let res = this.arr[this.top1]
        this.top1--
        return res
    }

        
    // Function to remove an element from top of the stack2.
    pop2() { // ✅ TC = O(1)
        if(this.top2 === this.cap) return -1
        let res = this.arr[this.top2]
        this.top2++
        return res
    }
}