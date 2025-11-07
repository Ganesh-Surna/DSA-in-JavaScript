class TreeNode{
    constructor(key){
        this.key = key
        this.left = null
        this.right = null
    }
}

// 1. Iterative Solution (using BFS or Level Order Traversal)
// ✅ TC = O(n) or to be precise theta(n) --> every node is processed exactly once
// ✅ SC = O(w) or O(n) or to be precise theta(w)
function maxWidth(root) {
    if(!root) return 0
    
    let res = 0
    
    let q = [] // new Queue()
    q.push(root) // q.enque(root)
    
    while(q.length > 0){ // !q.isEmpty()
        let count = q.length // q.size()
        
        res = Math.max(res, count)
        
        for(let i=0; i<count; i++){
            let curr = q.shift() // q.deque()
        
            if(curr.left) q.push(curr.left) // q.enque(curr.left)
            if(curr.right) q.push(curr.right) // q.enque(curr.right)
        }
    }
    
    return res
}

let root = new TreeNode(20)
root.left = new TreeNode(8)
root.right = new TreeNode(12)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(5)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
// Output: 4


root = new TreeNode(10)
root.left = new TreeNode(8)
root.right = new TreeNode(12)
root.left.left = new TreeNode(3)
root.left.left.left = new TreeNode(4)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(7)
// Output: 3


root = new TreeNode(3)
root.left = new TreeNode(2)
root.left.left = new TreeNode(1)
// Output: 1

root = new TreeNode(5)
// Output: 1

root = null
// Output: 0

console.log(maxWidth(root)) 