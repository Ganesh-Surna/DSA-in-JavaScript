/*Given an array of distinct integers, 
find all the pairs having both negative and positive values of a number in the array.

Input: n = 8, arr[] = [1,3,6,-2,-1,-3,2,7]
Output: [-1, 1, -3, 3, -2, 2]
Explanation: 1, 3 and 2 are present pairwise positive and negative. 6 and 7 have no pair.

Input: n = 3, arr[] = [3,2,1]
Output: 0
Explanation: No such pair exists.

*/

// ✅ TC = O(n)
// ✅ SC = O(n)
function findPairs(arr, n) {
    let seen = new Set()
    let res = []
    
    for(let i=0; i<n; i++){
        let num = arr[i]
        let opposite = -num
        if(seen.has(opposite)){
            res.push(-Math.abs(num), Math.abs(num))
            seen.delete(num) // to avoid duplicate pairs
        }else{
            seen.add(num)
        }
    }
    
    return res
}