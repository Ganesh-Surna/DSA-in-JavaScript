/* Problem:
Given two sorted arrays, check if they are overlapping.
*/

// WAY 1: Left Max <= Right of another array
// ✅ TC = O(1)
// ✅ SC = O(1)
function areOverlapping(arr1, arr2){
    // return true If leftMax(say arr1[0]) is <= another array's right element (arr[1])
    if(arr1[0] >= arr2[0]){
        // arr1[0] is leftMax
        return arr1[0] <= arr2[1]
        
    }else{
        // arr2[0] is leftMax
        return arr2[0] <= arr1[1]
    }
}

// WAY 2: Right Min >= Left of another array
function areOverlapping(arr1, arr2){
    // return true If rightMin(say arr1[1]) is >= another array's left element (arr[0])
    if(arr1[1] >= arr2[1]){
        // arr1[1] is rightMin
        return arr1[1] >= arr2[0]
    }else{
        // arr2[1] is rightMin
        return arr2[1] >= arr1[0]
    }
}
let arr1 = [0, 2], arr2 = [1, 3]; // true
arr1 = [1, 3], arr2 = [0, 2]; // true
arr1 = [0, 3], arr2 = [0, 5]; // true
arr1 = [0, 2], arr2 = [3, 5]; // false
arr1 = [0, 5], arr2 = [2, 4]; // true
console.log(areOverlapping(arr1, arr2))

// ✅ TC = O(1)
// ✅ SC = O(1)
function mergeOverlapping(arr1, arr2){
    if(areOverlapping(arr1, arr2)){
        let leftMin = Math.min(arr1[0], arr2[0])
        let rightMax = Math.max(arr1[1], arr2[1])
        return [leftMin, rightMax]
    }
    
    return -1
}

arr1 = [0, 2], arr2 = [1, 3]; // [0, 3]
arr1 = [1, 3], arr2 = [0, 2]; // [0, 3]
arr1 = [0, 2], arr2 = [3, 5]; // -1
arr1 = [0, 5], arr2 = [2, 4]; // [0, 5]
arr1 = [0, 3], arr2 = [0, 5]; // [0, 5]
console.log(mergeOverlapping(arr1, arr2))