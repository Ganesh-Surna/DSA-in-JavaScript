// 99. Recover Binary Search Tree

// You are given the root of a binary search tree (BST), 
// where the values of exactly two nodes of the tree were swapped by mistake. 
// Recover the tree without changing its structure.

var recoverTree = function(root) {
    let first = null, second = null, prev = null; // Nodes not values

    function inOrder(node) {
        if (!node) return;

        inOrder(node.left);

        if (prev !== null && prev.val > node.val) {
            if (first === null) {
                // first node to be swapped will be catched only once (when first=null)
                first = prev;
            }
            second = node;
        }
        prev = node;

        inOrder(node.right);
    }

    inOrder(root);

    if (first && second) {
        [first.val, second.val] = [second.val, first.val];
    }

    return root;
};

// Algorithm:
// 
// STEP-BY-STEP ALGORITHM:
// 
// Step 1: Initialize Variables
//    - first = null (first node to swap)
//    - second = null (second node to swap) 
//    - prev = null (previous node in inorder traversal)
// 
// Step 2: Define Inorder Traversal Function
//    - Function inOrder(node) performs inorder traversal
//    - Base case: if node is null, return
//    - Recursively visit left subtree: inOrder(node.left)
//    - Process current node (check for violations)
//    - Recursively visit right subtree: inOrder(node.right)
// 
// Step 3: Violation Detection Logic
//    - Check if prev.val > node.val (violation found)
//    - If violation and first is null: first = prev
//    - If violation: second = node (always update)
//    - Update prev = node for next iteration
// 
// Step 4: Handle Two Violation Scenarios
//    Scenario 1: Adjacent nodes swapped
//    - Only one violation found during traversal
//    - Example: [1, 3, 2, 4] → violation at 3 > 2
//    - first = 3, second = 2
// 
//    Scenario 2: Non-adjacent nodes swapped  
//    - Two violations found during traversal
//    - Example: [3, 1, 4, 2] → violations at 3 > 1 and 4 > 2
//    - first = 3 (from first violation), second = 2 (from second violation)
// 
// Step 5: Execute the Swap
//    - After complete traversal, check if first and second exist
//    - If both exist: swap their values
//    - [first.val, second.val] = [second.val, first.val]
// 
// Step 6: Return Result
//    - Return the modified root
//    - BST property is now restored
// 
// ALGORITHM COMPLEXITY:
// - Time Complexity: O(n) - single inorder traversal
// - Space Complexity: O(h) - recursion stack height (h = tree height)
// 
// KEY INSIGHTS:
// - Inorder traversal naturally detects BST violations
// - First violation always identifies one swapped node
// - Second violation (if exists) identifies the other
// - Algorithm handles both adjacent and non-adjacent swaps

// Flow:
// 
// RECURSIVE EXECUTION TRACE:
// 
// Example: BST with 2 swapped nodes
//       3
//      / \
//     1   4
//        /
//       2
// 
// Expected inorder: [1, 3, 2, 4] (should be [1, 2, 3, 4])
// Swapped nodes: 3 and 2
// 
// 1. recoverTree(3) - ROOT CALL
//    - first = null, second = null, prev = null
//    - Call inOrder(3)
// 
// 2. inOrder(3) - ROOT NODE
//    - node.val = 3, prev = null
//    - Recursive call: inOrder(1) - LEFT SUBTREE
// 
// 3. inOrder(1) - LEFT SUBTREE
//    - node.val = 1, prev = null
//    - Recursive call: inOrder(null) - LEFT-LEFT (base case)
//    - Check: prev !== null && prev.val > node.val → null !== null && null > 1 → false ✓
//    - prev = 1 (first node visited)
//    - Recursive call: inOrder(null) - LEFT-RIGHT (base case)
//    - Return to inOrder(3)
// 
// 4. Back to inOrder(3) - ROOT NODE
//    - node.val = 3, prev = 1
//    - Check: prev !== null && prev.val > node.val → 1 !== null && 1 > 3 → false ✓
//    - prev = 3 (second node visited)
//    - Recursive call: inOrder(4) - RIGHT SUBTREE
// 
// 5. inOrder(4) - RIGHT SUBTREE
//    - node.val = 4, prev = 3
//    - Recursive call: inOrder(2) - RIGHT-LEFT SUBTREE
// 
// 6. inOrder(2) - RIGHT-LEFT SUBTREE
//    - node.val = 2, prev = 3
//    - Recursive call: inOrder(null) - LEFT (base case)
//    - Check: prev !== null && prev.val > node.val → 3 !== null && 3 > 2 → true ❌
//    - first === null → first = prev = 3 (first violation found)
//    - second = node = 2 (second violation found)
//    - prev = 2 (third node visited)
//    - Recursive call: inOrder(null) - RIGHT (base case)
//    - Return to inOrder(4)
// 
// 7. Back to inOrder(4) - RIGHT SUBTREE
//    - node.val = 4, prev = 2
//    - Check: prev !== null && prev.val > node.val → 2 !== null && 2 > 4 → false ✓
//    - prev = 4 (fourth node visited)
//    - Recursive call: inOrder(null) - RIGHT-RIGHT (base case)
//    - Return to recoverTree
// 
// 8. Back to recoverTree - SWAP NODES
//    - first = 3, second = 2
//    - Swap: [first.val, second.val] = [second.val, first.val]
//    - 3.val = 2, 2.val = 3
// 
// Final Result: 
//       2
//      / \
//     1   4
//        /
//       3
// 
// Inorder traversal: [1, 2, 3, 4] ✓ (now correct)
// 
// KEY POINTS:
// 1. Inorder traversal visits nodes in ascending order in a BST
// 2. When we find prev.val > current.val, we have a violation
// 3. First violation: prev becomes first node to swap
// 4. Second violation: current becomes second node to swap
// 5. If only one violation: adjacent nodes were swapped
// 6. If two violations: non-adjacent nodes were swapped
// 
// WHY THIS WORKS:
// - In a valid BST, inorder traversal gives sorted sequence
// - When 2 nodes are swapped, we get 1 or 2 violations
// - First violation: larger value appears before smaller value
// - Second violation: confirms the swap pair
// - Swapping these nodes restores the BST property

// ❌⛔ Wrong Code
var recoverTreeWrongCode = function(root, minNode=null, maxNode=null) {
    if(!root) return

    recoverTree(root.left, minNode, root)
    if(minNode !== null && minNode.val > root.val){
        [root.val, minNode.val]=[minNode.val, root.val];
    }
    if(maxNode !== null && maxNode.val < root.val){
        [root.val, maxNode.val]=[maxNode.val, root.val];
    }
    recoverTree(root.right, root, maxNode)

    return root
};