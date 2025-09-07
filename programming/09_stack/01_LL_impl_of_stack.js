class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}

// Push & Pop from head side only. (stack open from left, closed from right)
class Stack{
    constructor(){
        this.head = null
        this._size = 0
    }
    // ✅ TC: O(1), SC: O(1)
    push(x){
        const newNode = new Node(x)
        newNode.next = this.head
        this.head = newNode
        this._size++
    }

    // ✅ TC: O(1), SC: O(1)
    pop(){
        if(!this.head) return null
        let peak = this.peak()
        this.head = this.head.next
        this._size--
        return peak
    }

    // ✅ TC: O(1), SC: O(1)
    peak(){
        if(!this.head) return null
        return this.head.data
    }
    
    // ✅ TC: O(1), SC: O(1)
    size(){
        return this._size
    }
    
    // ✅ TC: O(1), SC: O(1)
    isEmpty(){
        return this._size === 0
    }
}

const st = new Stack()
console.log(st.size())
console.log(st.peak())
console.log(st.isEmpty())
console.log(st.pop(), "......")
st.push(100)
st.push(200)
st.push(300)
console.log(st.size())
console.log(st.peak())
console.log(st.isEmpty())
console.log(st.pop(), "......")
console.log(st.size())
console.log(st.peak())
console.log(st.isEmpty())
