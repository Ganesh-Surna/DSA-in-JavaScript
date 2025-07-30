class Node{
    constructor(data){
        this.key = data // or this.data
        this.left = null
        this.right = null
    }
}
class BinaryTree{
    constructor(){
        this.root = null
    }

    // Left -> Root -> Right
    // ✅ TC = O(n), ✅ SC = O(h)
    inorder(node=this.root){
        if(!node){
            return
        }
        this.inorder(node.left)
        console.log(node.key)
        this.inorder(node.right)
    }

    //  Root -> Left -> Right
    // ✅ TC = O(n), ✅ SC = O(h)
    preorder(node=this.root){
        if(!node){
            return
        }
        console.log(node.key)
        this.preorder(node.left)
        this.preorder(node.right)
    }

    //  Left -> Right -> Root
    // ✅ TC = O(n), ✅ SC = O(h)
    postorder(node=this.root){
        if(!node){
            return
        }
        this.postorder(node.left)
        this.postorder(node.right)
        console.log(node.key)
    }
    height(node=this.root){
    }
}

const bTree = new BinaryTree()
bTree.root = new Node(10)
bTree.root.left=new Node(20)
bTree.root.right=new Node(30)
bTree.root.right.left=new Node(40)
bTree.root.right.right=new Node(50)
console.log("Inorder Traversal:")
bTree.inorder()
console.log("Preorder Traversal:")
bTree.preorder()
console.log("Postorder Traversal:")
bTree.postorder()

// Output:
// Inorder Traversal:
// 20
// 10
// 40
// 30
// 50
// Preorder Traversal:
// 10
// 20
// 30
// 40
// 50
// Postorder Traversal:
// 20
// 40
// 50
// 30
// 10