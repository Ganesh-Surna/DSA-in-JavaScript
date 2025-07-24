class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}
class Stack{
    constructor(){
        this.head = null
        this._size = 0
    }
    
    push(x){
        const newNode = new Node(x)
        newNode.next = this.head
        this.head = newNode
        this._size++
    }
    pop(){
        if(!this.head) return null
        let peak = this.peak()
        this.head = this.head.next
        this._size--
        return peak
    }
    peak(){
        if(!this.head) return null
        return this.head.data
    }
    size(){
        return this._size
    }
    isEmpty(){
        return this._size === 0
    }
}

// ✅ TC: O(n), SC: O(n)
function isBalanced(str){
    const st = new Stack()

    for(let i=0; i<str.length; i++){
        const x = str[i]

        if(x==='(' || x==='{' ||  x==='['){
            st.push(x)
        }else{
            // No opening bracket found, so it's not balanced
            if(st.isEmpty()) return false

            const popped = st.pop()

            // Check if the popped element is matching with the current element:
            // WAY 1:
            // if((x===')' && popped!=='(')||(x==='}' && popped!=='{')||(x===']' && popped!=='[')){
            //     return false
            // }

            // WAY 2:
            function isMatching(a,b){
                return ( a==='(' && b===')' ) || ( a==='{' && b==='}' ) || ( a==='[' && b===']' )
            }
            if(!isMatching(popped, x)){
                return false
            }
        }
    }
    // If the stack is empty, then it's balanced
    return st.isEmpty()
}
let res = isBalanced('([{[()]}])[{}()])') // false
console.log(res)