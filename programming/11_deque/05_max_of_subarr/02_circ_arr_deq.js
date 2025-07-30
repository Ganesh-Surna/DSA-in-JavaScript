// Circular Array implementation of Deque
// ✅ All operations TC = O(1)
class Deque{
    constructor(cap){
        this.cap = cap
        this.arr = new Array(cap)
        this.sz = 0
        this.front = 0
    }
    insertFront(x){
        if(this.isFull()) return
        
        // Going back direction for front
        // front = (front-1)%this.cap
        // it may go -ve so we also adding this.cap 
        // front = (front-1 + this.cap)%this.cap
        // 
        this.front = (this.front-1+this.cap)%this.cap
        this.arr[this.front] = x
        this.sz++
    }
    insertRear(x){
        if(this.isFull()) return
        let rear = (this.front+this.sz-1)%this.cap
        
        // going forward direction for rear
        rear = (rear+1)%this.cap
        this.arr[rear] = x
        this.sz++
    }
    deleteFront(){
        if(this.sz===0) return
        let res = this.arr[this.front]
        // for setting new front , we increasing front because (for insert we decreased)
        this.front = (this.front+1)%this.cap
        this.sz--
        return res
    }
    deleteRear(){
        if(this.sz===0) return
        
        let rear = (this.front+this.sz-1)%this.cap
        let res = this.arr[rear]
        // No need to change anything, just decrease this.sz. 
        //Because we are getting rear using this.sz & this.front anyway
        this.sz--
        return res
    }
    getFront(){
        if(this.sz===0){
            return null
        }
        return this.arr[this.front]
    }
    getRear(){
        if(this.sz===0){
            return null
        }
        let rear = (this.front+this.sz-1)%this.cap
        return this.arr[rear]
    }
    size(){
        return this.sz
    }
    isFull(){
        return this.sz===this.cap
    }
    isEmpty(){
        return this.sz===0
    }
}

// Sliding window + Deque
function maxOfSubarrays(arr, k){
    let res = []
    let deq = new Deque(k) // to store indices of max ele's in curr window
    
    for(let i=0; i<arr.length; i++){
        
        // Remove indices from front that are outside the curr window
        // deq.getFront() returns an index, 
        //      so we check if it's <= i-k (out of window)
        while(!deq.isEmpty() && deq.getFront()<=i-k){
            deq.deleteFront()
        }
        
        // Remove indices from rear whose corresponding elements
        //      are smaller than current element
        // These smaller elements can never be maximum in
        //      any future window
        while(!deq.isEmpty() && arr[deq.getRear()] < arr[i]){
            deq.deleteRear()
        }
        
        // Add current element's index to the deque
        deq.insertRear(i)
        
        // If we have processed at least k elements,
        //  we can start collecting results
        if(i>=k-1){
            let currWindowMax = arr[deq.getFront()]
            res.push(currWindowMax)
        }
    }
    
    return res
}

// Test Cases
const arr1 = [1, 2, 3, 1, 4, 5, 2, 3, 6];
const K1 = 3;
console.log(maxOfSubarrays(arr1, K1).join(' ')); 
// Output: 3 3 4 5 5 5 6

const arr2 = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13];
const K2 = 4;
console.log(maxOfSubarrays(arr2, K2).join(' ')); 
// Output: 10 10 10 15 15 90 90