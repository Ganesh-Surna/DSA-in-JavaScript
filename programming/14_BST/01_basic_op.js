class Node {
    constructor(key) {
      this.key = key;
      this.left = null;
      this.right = null;
    }
  }
  
  class BST {
    constructor() {
      this.root = null;
    }
  
    // ✅ TC = O(h), SC = O(1)
    // Insertion in BST is always done in leaf node(bottom)
    insert(key, root = this.root) {
      const newNode = new Node(key);
  
      if (!root) {
        this.root = newNode;
        return;
      }
  
      let curr = root;
      while (curr) {
        // do not insert if it is already exist
        if (key === curr.key) return;
        else if (key < curr.key) {
          if (!curr.left) {
            curr.left = newNode;
            return;
          }
          curr = curr.left;
        } else {
          if (!curr.right) {
            curr.right = newNode;
            return;
          }
          curr = curr.right;
        }
      }
    }
  
    // ✅ TC = O(h), SC = O(h)
    insertRecursive(key, root=this.root){
        if(!root){
            // just returning new node
            return new Node(key)
        }
        
        if(key === root.key) return root
        else if(key < root.key){
            // setting new node(which is returned) as its left
            root.left = this.insertRecursive(key, root.left)
        }else{
            // setting new node as its right
            root.right = this.insertRecursive(key, root.right)
        }
        
        return root
    }
  
    print(root = this.root) {
      if (!root) {
        return;
      }
  
      console.log(root);
      this.print(root.left);
      this.print(root.right);
    }
  
    // ✅ TC = O(h), SC = O(1)
    searchIterative(key) {
      let curr = this.root;
      while (curr) {
        if (curr.key === key) {
          return true;
        }
        if (key < curr.key) {
          curr = curr.left;
        } else {
          curr = curr.right;
        }
      }
  
      return false;
    }
  
    // ✅ TC = O(h), SC = O(h)
    searchRecursive(key, root = this.root) {
      if (!root) {
        return false;
      }
  
      if (key === root.key) {
        return true;
      } else if (key < root.key) {
        // Need to return
        return this.searchRecursive(key, root.left);
      } else {
        return this.searchRecursive(key, root.right);
      }
    }
    
    // ✅ TC = O(h) ----> (O(h) for search + O(h) for getInorderSuccessor + O(h) for delete inorder successor)
    // ✅ SC = O(h)
    deleteNode(key, root=this.root){
        if(!root){
            return null
        }
        
        if(key < root.key){
            root.left = this.deleteNode(key, root.left)
        }else if(key > root.key){
            root.right = this.deleteNode(key, root.right)
        }else{
            if(!root.left) return root.right
            else if(!root.right) return root.left
            else{
                // ✅ Inorder traversal of a BST outputs data in sorted order. 
                // ✅ Following rule of Closest Greater Node to deleting node to replace it.(inorder successor)
                const inorderSuccKey = this.getInorderSuccessor(root.right)
                // Putting inorder succ value in deleting node (i.e., replacing)
                root.key = inorderSuccKey
                // now delete the inorder successor (repeating recursion, because the inorder successor already a leaf(or node with no left child) so it won't have left child)
                root.right = this.deleteNode(inorderSuccKey, root.right)
            }
        }
        
        // Return root is very important
        return root
    }

    // ✅ TC = O(h) ----> (O(h) for search + O(h) for getInorderSuccessor + O(h) for delete inorder successor)
    // ✅ SC = O(1)
    deleteNodeIterative(key) {
      let current = this.root;
      let parent = null;
      let isLeftChild = false;
  
      // Step 1: Find the node to delete and its parent
      while (current !== null && current.key !== key) {
          parent = current;
          if (key < current.key) {
              current = current.left;
              isLeftChild = true;
          } else {
              current = current.right;
              isLeftChild = false;
          }
      }
  
      // Node not found
      if (current === null) return this.root;
  
      // Step 2: Handle deletion based on node's children
      if (current.left === null && current.right === null) {
          // Case 1: Node is a leaf
          if (parent === null) return null; // Deleting root
          if (isLeftChild) parent.left = null;
          else parent.right = null;
      } else if (current.left === null) {
          // Case 2: Node has only right child
          if (parent === null) return current.right; // New root
          if (isLeftChild) parent.left = current.right;
          else parent.right = current.right;
      } else if (current.right === null) {
          // Case 3: Node has only left child
          if (parent === null) return current.left; // New root
          if (isLeftChild) parent.left = current.left;
          else parent.right = current.left;
      } else {
          // Case 4: Node has both children
          // Find inorder successor (leftmost in right subtree)
          let successorParent = current;
          let successor = current.right;
          while (successor.left !== null) {
              successorParent = successor;
              successor = successor.left;
          }
  
          // Replace current node's key with successor's key
          current.key = successor.key;
  
          // Delete the successor (which is either a leaf or has only right child)
          if (successorParent === current) {
              successorParent.right = successor.right;
          } else {
              successorParent.left = successor.right;
          }
      }
  
      return this.root;
  }
    
    // Using in deleteNode(), to get left most node of deleting node's right subtree
    // Left most of the tree
    getInorderSuccessor(curr){
        while(curr.left){
            curr = curr.left
        }
        
        return curr.key
    }

    // ✅ TC = O(h), SC = O(1)
    floor(key, root=this.root){
        let res = null
        let curr = root
        while(curr){
            if(curr.key === key){
                return key
            }else if(curr.key < key){
                res = curr.key
                curr = curr.right
            }else{
                curr = curr.left
            }
        }
        
        return res
    }
    
    // ✅ TC = O(h), SC = O(1)
    ceil(key, root=this.root){
        let res = null
        let curr = root
        
        while(curr){
            if(curr.key === key){
                return key
            }else if(curr.key < key){
                curr = curr.right
            }else{
                res = curr.key
                curr = curr.left
            }
        }
        
        return res
    }
  }
  
  const bst = new BST();
  bst.insert(10);
  bst.insert(20);
  bst.insert(5);
  bst.insert(30);
  bst.insert(15);
  bst.insert(2);
  bst.insertRecursive(4)
//   bst.deleteNode(10)
  bst.print()
  console.log(bst.searchIterative(25)); // false
  console.log(bst.searchRecursive(25)); // false
  console.log(bst.floor(55)) // 30
  console.log(bst.floor(16)) // 15
  console.log(bst.floor(1)) // null
  
  console.log(bst.ceil(55)) // null
  console.log(bst.ceil(16)) // 20
  console.log(bst.ceil(1)) // 2
  