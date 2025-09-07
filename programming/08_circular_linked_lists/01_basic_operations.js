class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}
class CLL{
    constructor(){
        this.head = null
    }
    append(x){
        const newNode = new Node(x)

        if(!this.head){
            this.head = newNode
            newNode.next = this.head
            return
        }

        let curr = this.head
        while(curr.next !== this.head){
            curr = curr.next
        }

        curr.next = newNode
        newNode.next = this.head
    }
    appendAtConstantTime(x){
        const newNode = new Node(x)
        if(!this.head){
            newNode.next = newNode
            this.head = newNode
            return
        }
        
        newNode.next = this.head.next
        this.head.next = newNode;
        [this.head.data, newNode.data]=[newNode.data, this.head.data]
        this.head = newNode
    }
    prepend(x){
        const newNode = new Node(x)
        if(!this.head){
            this.head = newNode
            this.head.next = this.head
            return
        }
        
        let curr = this.head
        while(curr.next !== this.head){
            curr = curr.next
        }
        
        curr.next = newNode
        newNode.next = this.head
        this.head = newNode
    }
    prependAtConstantTime(x){
        const newNode = new Node(x)
        if(!this.head){
            newNode.next = newNode
            this.head = newNode
            return
        }
        
        newNode.next = this.head.next
        this.head.next = newNode;
        [this.head.data, newNode.data]=[newNode.data, this.head.data]
    }
    deleteHead(){
        if(!this.head || this.head.next === this.head){
            this.head = null
            return
        }
        
        let curr = this.head
        while(curr.next !== this.head){
            curr = curr.next
        }
        curr.next = this.head.next
        this.head = this.head.next
    }
    deleteTail() {
        if(!this.head || this.head.next === this.head){
            this.head = null
            return
        }
        // code here
        let curr = this.head
        while(curr.next.next !== this.head){
            curr = curr.next
        }
        
        curr.next = curr.next.next
        return this.head
    }
    deleteAt(pos){
        if(!this.head) return
        
        if(pos===1){
            if(this.head.next === this.head){
                this.head = null
                return
            }
            let curr = this.head
            while(curr.next !== this.head){
                curr = curr.next
            }
            curr.next = this.head.next
            this.head = this.head.next
            return
        }
        
        let curr = this.head, c=1
        while(curr.next !== this.head && c<pos-1){
            curr=curr.next
            c++

            // Because we need to be at prev node of the desired node to delete it.
            // If the curr(prev of disired) is the last node. So the next node is head so we don't do anything
            if(curr.next === this.head){
                return
            }
        }
        
        curr.next = curr.next.next
    }
    reverse(){
        if(!this.head || this.head === this.head.next){
            return
        }
        
        let prev = this.head, curr = this.head.next
        do{
            let next = curr.next
            curr.next = prev
            prev = curr
            curr = next
        }while(curr !== this.head)
        this.head = curr.next
        
    }
    print(){
        if(!this.head) return

        if(this.head === this.head.next){
            console.log(this.head.data)
            return
        }

        // // WAY 1:
        // let curr = this.head
        // while(curr.next !== this.head){
        //     console.log(curr.data)
        //     curr = curr.next
        // }
        // console.log(curr.data)
        
        // WAY 2:
        let curr = this.head
        do{
            console.log(curr.data)
            curr = curr.next
        }
        while(curr !== this.head)
    }
}

const l = new CLL()
l.append(1)
l.append(2)
l.append(3)
l.append(4)
l.prepend(0)
l.prependAtConstantTime(-1)
l.deleteHead()
l.appendAtConstantTime(100)
l.deleteAt(6)
// l.reverse()
l.print()