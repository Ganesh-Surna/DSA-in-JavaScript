class Node{
    constructor(data){
        this.data = data
        this.next = null
        this.prev = null
    }
}

// Circular Doubly Linked List
class CDLL{
    constructor(){
        this.head = null
    }

    // ✅ TC: O(1), SC: O(1)
    append(x){
        const newNode = new Node(x)
        if(!this.head) {
            newNode.next = newNode.prev = newNode
            this.head = newNode
            return
        }
        
        let lastNode = this.head.prev
        lastNode.next = newNode
        newNode.prev = lastNode
        newNode.next = this.head
        this.head.prev = newNode
    }

    // ✅ TC: O(1), SC: O(1)
    prepend(x){
        const newNode = new Node(x)
        if(!this.head){
            newNode.next = newNode.prev = newNode;
            this.head = newNode
            return
        }
        let lastNode = this.head.prev
        newNode.next = this.head
        this.head.prev = newNode
        newNode.prev = lastNode
        lastNode.next = newNode
        this.head = newNode
    }

    // ✅ TC: O(n), SC: O(1)
    print(){
        if(!this.head) return
        
        let curr=this.head
        do{
            console.log(curr.data)
            curr=curr.next
        }while(curr !== this.head)
    }
    
}

const l = new CDLL()
l.append(1)
l.append(2)
l.prepend(0)
l.print()