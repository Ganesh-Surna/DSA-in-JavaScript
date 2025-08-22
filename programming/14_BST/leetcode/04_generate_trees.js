// 95. Unique Binary Search Trees II

// Given an integer n, 
// return all the structurally unique BST's (binary search trees), 
// which has exactly n nodes of unique values from 1 to n. 
// Return the answer in any order.


/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number} n
 * @return {TreeNode[]}
 */ 
var generateTrees = function(n) {
    if(n===0) return []

    return generate(1, n)
};

function generate(start, end){
    let trees = []
    if(start > end){
        trees.push(null)
        return trees
    }

    for(let i=start; i<=end; i++){
        let leftTrees = generate(start, i-1)
        let rightTrees = generate(i+1, end)

        for(let left of leftTrees){
            for(let right of rightTrees){
                let root = new TreeNode(i)
                root.left = left
                root.right = right

                trees.push(root)
            }
        }
    }

    return trees
}

// Flow (How it works with example):
// 
// Example: n = 3 (values: 1, 2, 3)
// 
// RECURSIVE EXECUTION TRACE:
// 
// 1. generateTrees(3) calls generate(1, 3)
// 
// 2. generate(1, 3) - MAIN CALL
//    trees = []
//    Loop: i = 1, 2, 3
//    
//    When i = 1 (root = 1):
//      leftTrees = generate(1, 0)  // Recursive call #1
//      rightTrees = generate(2, 3) // Recursive call #2
//      
//      Recursive call #1: generate(1, 0)
//        - start(1) > end(0) → return [null]
//        - leftTrees = [null]
//      
//      Recursive call #2: generate(2, 3)
//        - Loop: i = 2, 3
//        - When i = 2: leftTrees = generate(2, 1) = [null], rightTrees = generate(3, 3) = [3]
//          - generate(2, 1): start(2) > end(1) → return [null]
//          - generate(3, 3): Loop i = 3, leftTrees = generate(3, 2) = [null], rightTrees = generate(4, 3) = [null]
//            - generate(3, 2): start(3) > end(2) → return [null]
//            - generate(4, 3): start(4) > end(3) → return [null]
//            - Result: [3] (single node with null children)
//          - Result: [2->3] (root=2, left=null, right=3)
//        - When i = 3: leftTrees = generate(2, 2) = [2], rightTrees = generate(4, 3) = [null]
//          - generate(2, 2): Loop i = 2, leftTrees = generate(2, 1) = [null], rightTrees = generate(3, 2) = [null]
//            - Result: [2] (single node with null children)
//          - generate(4, 3): start(4) > end(3) → return [null]
//          - Result: [3->2] (root=3, left=2, right=null)
//        - rightTrees = [2->3, 3->2]
//      
//      Now combine leftTrees=[null] with rightTrees=[2->3, 3->2]:
//      - left=null, right=2->3 → create root=1, left=null, right=2->3 → [1->2->3]
//      - left=null, right=3->2 → create root=1, left=null, right=3->2 → [1->3->2]
//      - Result for root=1: [1->2->3, 1->3->2]
//    
//    When i = 2 (root = 2):
//      leftTrees = generate(1, 1)  // Recursive call #3
//      rightTrees = generate(3, 3) // Recursive call #4
//      
//      Recursive call #3: generate(1, 1)
//        - Loop: i = 1, leftTrees = generate(1, 0) = [null], rightTrees = generate(2, 1) = [null]
//        - Result: [1] (single node with null children)
//      
//      Recursive call #4: generate(3, 3)
//        - Loop: i = 3, leftTrees = generate(3, 2) = [null], rightTrees = generate(4, 3) = [null]
//        - Result: [3] (single node with null children)
//      
//      Now combine leftTrees=[1] with rightTrees=[3]:
//      - left=1, right=3 → create root=2, left=1, right=3 → [2->1, 2->3]
//      - Result for root=2: [2->1, 2->3]
//    
//    When i = 3 (root = 3):
//      leftTrees = generate(1, 2)  // Recursive call #5
//      rightTrees = generate(4, 3) // Recursive call #6
//      
//      Recursive call #5: generate(1, 2)
//        - Loop: i = 1, 2
//        - When i = 1: leftTrees = generate(1, 0) = [null], rightTrees = generate(2, 2) = [2]
//          - generate(2, 2): Loop i = 2, leftTrees = generate(2, 1) = [null], rightTrees = generate(3, 2) = [null]
//          - Result: [2] (single node with null children)
//          - Result: [1->2] (root=1, left=null, right=2)
//        - When i = 2: leftTrees = generate(1, 1) = [1], rightTrees = generate(3, 2) = [null]
//          - generate(1, 1): Loop i = 1, leftTrees = generate(1, 0) = [null], rightTrees = generate(2, 1) = [null]
//          - Result: [1] (single node with null children)
//          - Result: [2->1] (root=2, left=1, right=null)
//        - leftTrees = [1->2, 2->1]
//      
//      Recursive call #6: generate(4, 3)
//        - start(4) > end(3) → return [null]
//        - rightTrees = [null]
//      
//      Now combine leftTrees=[1->2, 2->1] with rightTrees=[null]:
//      - left=1->2, right=null → create root=3, left=1->2, right=null → [3->1->2]
//      - left=2->1, right=null → create root=3, left=2->1, right=null → [3->2->1]
//      - Result for root=3: [3->1->2, 3->2->1]
//    
//    Final result from generate(1, 3): [1->2->3, 1->3->2, 2->1, 2->3, 3->1->2, 3->2->1]
//    ==> [ [1,null,2,null,3],
//          [1,null,3,2], [2,1,3], 
//          [3,1,null,null,2], [3,2,null,1] 
//       ]

// VISUAL REPRESENTATION OF THE 5 UNIQUE BSTs:
// 
// Tree 1:    1          Tree 2:    1          Tree 3:    2
//             \                     \                   / \
//              2                      3                1   3
//               \                    /
//                3                  2
// 
// Tree 4:    3          Tree 5:    3
//           /                     /
//          1                      2
//           \                    /
//            2                  1
// 
// KEY POINTS:
// 1. Each recursive call generates ALL possible BSTs for a given range
// 2. Base case: when start > end, return [null] (empty subtree)
// 3. For each value in range, make it root and recursively get left/right subtrees
// 4. Combine all left subtree possibilities with all right subtree possibilities
// 5. This ensures we get ALL possible structural combinations