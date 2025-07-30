// Min of subarrays of size K

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
function minOfSubarrays(arr, k){
    let res = []
    let deq = new Deque(k) // to store indices of min elements in current window
    
    for(let i=0; i<arr.length; i++){
        
        while(!deq.isEmpty() && deq.getFront()<=i-k){
            deq.deleteFront()
        }
        
        while(!deq.isEmpty() && arr[deq.getRear()] > arr[i]){
            deq.deleteRear()
        }
        
        deq.insertRear(i)
        
        if(i>=k-1){
            let currWindowMin = arr[deq.getFront()]
            res.push(currWindowMin)
        }
    }
    
    return res
    
}

// Test Cases
const arr1 = [1, 2, 3, 1, 4, 5, 2, 3, 6];
const K1 = 3;
console.log(minOfSubarrays(arr1, K1).join(' ')); 
// Output: 1 1 1 1 2 2 2

const arr2 = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13];
const K2 = 4;
console.log(minOfSubarrays(arr2, K2).join(' ')); 
// Output: 5 5 4 4 4 4 12