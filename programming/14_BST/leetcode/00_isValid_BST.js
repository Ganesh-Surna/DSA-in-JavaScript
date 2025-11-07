//       5
//      / \
//     4   6
//        / \
//       3  7
// false

//       5
//      / \
//     4   6
//    /     \
//   3       7
// True

// ✅ Correct Code
function isValidBST(root, min=-Infinity, max=Infinity) {
    if(!root) return true

    return ((min < root.val && max > root.val) && isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max))
};

// OR
function isValidBST(root, min=-Infinity, max=Infinity) {
    if(!root) return true

    if(min >= root.val || max <= root.val){
        return false
    }

    return (isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max))
};

// OR
var isValidBST = function(root, min=null, max=null) {
    if(!root) return true

    // ✅ min !== null &&   ❌ min &&   --> because if min=0/max=0, then it will not go into if condition
    if((min !== null && min >= root.val) || (max !== null && max <= root.val)){
        return false
    }

    return (isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max))
};

// Flow:
// 
// RECURSIVE EXECUTION TRACE:
// 
// Example 1: Valid BST
//       5
//      / \
//     4   6
//    /     \
//   3       7
// 
// 1. isValidBST(5, null, null) - ROOT CALL
//    - root.val = 5, min = null, max = null
//    - Check: (null !== null && null >= 5) || (null !== null && null <= 5) → false || false → false ✓
//    - Recursive calls: isValidBST(4, null, 5) && isValidBST(6, 5, null)
// 
// 2. isValidBST(4, null, 5) - LEFT SUBTREE
//    - root.val = 4, min = null, max = 5
//    - Check: (null !== null && null >= 4) || (5 !== null && 5 <= 4) → false || false → false ✓
//    - Recursive calls: isValidBST(3, null, 4) && isValidBST(null, 4, 5)
// 
// 3. isValidBST(3, null, 4) - LEFT-LEFT SUBTREE
//    - root.val = 3, min = null, max = 4
//    - Check: (null !== null && null >= 3) || (4 !== null && 4 <= 3) → false || false → false ✓
//    - Recursive calls: isValidBST(null, null, 3) && isValidBST(null, 3, 4)
//    - Both return true (base case)
//    - Result: true && true = true
// 
// 4. isValidBST(null, 4, 5) - LEFT-RIGHT SUBTREE
//    - root = null → return true (base case)
// 
// 5. isValidBST(6, 5, null) - RIGHT SUBTREE
//    - root.val = 6, min = 5, max = null
//    - Check: (5 !== null && 5 >= 6) || (null !== null && null <= 6) → false || false → false ✓
//    - Recursive calls: isValidBST(null, 5, 6) && isValidBST(7, 6, null)
// 
// 6. isValidBST(null, 5, 6) - RIGHT-LEFT SUBTREE
//    - root = null → return true (base case)
// 
// 7. isValidBST(7, 6, null) - RIGHT-RIGHT SUBTREE
//    - root.val = 7, min = 6, max = null
//    - Check: (6 !== null && 6 >= 7) || (null !== null && null <= 7) → false || false → false ✓
//    - Recursive calls: isValidBST(null, 6, 7) && isValidBST(null, 7, null)
//    - Both return true (base case)
//    - Result: true && true = true
// 
// Final Result: true (Valid BST)
// 
// Example 2: Invalid BST
//       5
//      / \
//     4   6
//        / \
//       3  7
// 
// 1. isValidBST(5, null, null) - ROOT CALL
//    - root.val = 5, min = null, max = null
//    - Check: (null !== null && null >= 5) || (null !== null && null <= 5) → false || false → false ✓
//    - Recursive calls: isValidBST(4, null, 5) && isValidBST(6, 5, null)
// 
// 2. isValidBST(4, null, 5) - LEFT SUBTREE
//    - root.val = 4, min = null, max = 5
//    - Check: (null !== null && null >= 4) || (5 !== null && 5 <= 4) → false || false → false ✓
//    - Recursive calls: isValidBST(null, null, 4) && isValidBST(null, 4, 5)
//    - Both return true (base case)
//    - Result: true && true = true
// 
// 3. isValidBST(6, 5, null) - RIGHT SUBTREE
//    - root.val = 6, min = 5, max = null
//    - Check: (5 !== null && 5 >= 6) || (null !== null && null <= 6) → false || false → false ✓
//    - Recursive calls: isValidBST(3, 5, 6) && isValidBST(7, 6, null)
// 
// 4. isValidBST(3, 5, 6) - RIGHT-LEFT SUBTREE ❌ INVALID!
//    - root.val = 3, min = 5, max = 6
//    - Check: (5 !== null && 5 >= 3) || (6 !== null && 6 <= 3) → true || false → true ❌
//    - Return false immediately
// 
// Final Result: false (Invalid BST - 3 is less than 5)
// 
// KEY POINTS:
// 1. Each node must be within the range (min, max) passed from parent
// 2. For left child: range becomes (min, parent.val)
// 3. For right child: range becomes (parent.val, max)
// 4. Base case: null nodes are always valid
// 5. The range constraints ensure BST property is maintained at every level
// 
// WHY THE WRONG CODE FAILS:
// The wrong code only checks immediate parent-child relationships but doesn't
// maintain the global BST property. For example, in the invalid tree:
// - It checks 6 > 3 ✓ (immediate parent-child)
// - But doesn't check that 3 should be > 5 (global constraint from root)
// - This is why we need to pass min/max bounds down the recursion






// ❌⛔ Wrong Code
var isValidBSTWrongCode = function(root) {
    if(!root) return true

    if(!root.left && !root.right) return true

    let leftValid = true
    let rightValid = true

    if(root.left){
        if(root.val <= root.left.val) return false
        leftValid = isValidBST(root.left)
    }
    if(root.right){
        if(root.val >= root.right.val) return false
        rightValid = isValidBST(root.right)
    }

    return leftValid && rightValid
};