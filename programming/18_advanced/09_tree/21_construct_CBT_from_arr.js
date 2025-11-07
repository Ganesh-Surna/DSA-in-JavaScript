// Tree node definition
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

// 1. Iterative Solution(Using Queue, Level Order Traversal)
// ✅ TC = O(n), ✅ SC = O(n)
function constructCBTFromArr(arr) {
    if (!arr || arr.length === 0) return null;

    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1; // start from the second element in arr

    while (i < arr.length) {
        const current = queue.shift();

        // assign left child
        if (i < arr.length) {
            let leftChild = new TreeNode(arr[i]); // create left child
            current.left = leftChild; // assign left child to parent node
            queue.push(leftChild); // push left child to queue
            i++; // increment index (move to next element in arr)
        }

        // assign right child
        if (i < arr.length) {
            let rightChild = new TreeNode(arr[i]); // create right child
            current.right = rightChild; // assign right child to parent node
            queue.push(rightChild); // push right child to queue
            i++; // increment index (move to next element in arr)
        }
    }

    return root;
}

// 2. Recursive Solution(Using Complete Binary Tree Property)
// ✅ TC = O(n), ✅ SC = O(n)
function constructCBTFromArr(arr) {
    if (!arr || arr.length === 0) return null;

    let root = buildNode(arr, 0); // root at index 0
    return root;

    // Helper function to build node at given index
    function buildNode(arr, index=0) {
        if (index >= arr.length) return null;

        const node = new TreeNode(arr[index]);

        node.left = buildNode(arr, 2 * index + 1); // left child at index 2*i+1 (Complete Binary Tree Property)
        node.right = buildNode(arr, 2 * index + 2); // right child at index 2*i+2 (Complete Binary Tree Property)

        return node;
    }
}

// Example usage:
const arr = [1, 2, 3, 4, 5, 6];
const root = constructCBTFromArr(arr);

function levelOrder(root) {
    if (!root) return [];
    const result = [];
    const queue = [root];
    while (queue.length) {
        const node = queue.shift();
        result.push(node.val);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return result;
}

console.log(levelOrder(root)); // [1, 2, 3, 4, 5, 6]
