class QNode {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  // Queue implementation using Linked List
  class Queue {
    constructor() {
      this.front = null;
      this.rear = null;
      this.len = 0;
    }
    // Adding at rear
    // ✅ TC: O(1)
    enque(x) {
      const newNode = new QNode(x);
      if (this.len === 0) {
        this.rear = this.front = newNode;
      } else {
        this.rear.next = newNode;
        this.rear = newNode;
      }
      this.len++;
    }
  
    // Removing front
    // ✅ TC: O(1)
    deque() {
      if (this.len === 0) return null;
  
      let front = this.front;
  
      if (this.len === 1) {
        this.rear = this.front = null;
      } else {
        this.front = this.front.next;
      }
      this.len--;
  
      // Removed value
      return front.data;
    }
  
    // ✅ TC: O(1)
    getFront() {
      if (!this.front) return null;
      return this.front.data;
    }
  
    // ✅ TC: O(1)
    getRear() {
      if (!this.rear) return null;
      return this.rear.data;
    }
  
    // ✅ TC: O(1)
    size() {
      return this.len;
    }
  
    // ✅ TC: O(1)
    isEmpty() {
      return this.len === 0;
    }
  }



class Node {
    constructor(data) {
      this.key = data; // or this.data
      this.left = null;
      this.right = null;
    }
  }
  class BinaryTree {
    constructor() {
      this.root = null;
    }
    // ✅TC=O(n) 
    // ✅ SC=theta(h)
    // Best for Balanced Tree
    // No Queue needed
    findMax(node=this.root){
        if(!node){
            return -Infinity
        }
        let lMax = this.findMax(node.left)
        let rMax = this.findMax(node.right)
        return Math.max(node.key, lMax, rMax)
    }
    // Initially i did like below:
    // findMax(node=this.root, key=-Infinity){
    //     if(!node){
    //         return key
    //     }
    //     let lMax = this.findMax(node.left, node.key)
    //     let rMax = this.findMax(node.right, node.key)
    //     return Math.max(lMax, rMax)
    // }

    // ✅TC=O(n) 
    // ✅ SC=theta(w)
    // Best for Skewed tree
    
    levelOrderFindMax(){
        let max = -Infinity
        if(!this.root) return max
        
        let q = new Queue()
        q.enque(this.root)
        
        while(!q.isEmpty()){
            let count = q.size()
            for(let i=0; i<count; i++){
                const processedNode = q.deque()
                max = Math.max(max, processedNode.key)
                
                if(processedNode.left){
                    q.enque(processedNode.left)
                }
                if(processedNode.right){
                    q.enque(processedNode.right)
                }
            }
        }
        
        return max
    }
  }
  
  const bTree = new BinaryTree();
  bTree.root = new Node(10);
  bTree.root.left = new Node(20);
  bTree.root.right = new Node(21);
  bTree.root.right.left = new Node(30);
  bTree.root.right.right = new Node(31);
  bTree.root.left.left = new Node(32);
  bTree.root.left.right = new Node(33);
  bTree.root.left.right.left = new Node(40);
  console.log("Max:" );
  console.log(bTree.findMax())
  console.log("Max using Level Order traversal:" );
  console.log(bTree.levelOrderFindMax())

// Output
// Max: 40
// Max using Level Order traversal: 40