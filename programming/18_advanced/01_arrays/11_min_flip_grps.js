// Problem: Find the minimum number of flips to make all groups of 1's and 0's equal.

// ✅ TC = O(n)
// ✅ SC = O(1)
function minFlipGroups(arr){
    let n = arr.length
    let first = arr[0] // which is never flipped (i.e, if arr[0] is 0 then 1 should be flipped. Because 0 groups will be >= 1 groups)
    
    let res = ''
    
    for(let i=1; i<n; i++){
        // If curr el is differ from prev el, then only we care, other wise le the i move
        if(arr[i] !== arr[i-1]){
            if(arr[i] !== first){
                // If the curr el is diff from first (also diff from prev), then start the flip-group
                res += `From ${i} to `
            }else{
                // If curr el is same as first (but diff from prev), then end the flip-group
                res += `${i-1}\n`
            }
        }
    }
    
    // To handle if last el is diff from first 
    // (for last index if it is diff from first then, 
    // only the "From Last_idx to" will be added and no end_idx will be added to the res inside the loop. 
    // To handle that we need this below code)
    if(arr[n-1] !== first){
        res += `${n-1}`
    }
    
    return res
}

let arr = [0, 0, 1, 1, 0, 0, 1, 1, 0, 1] // From 2 to 3, From 6 to 7, From 9 to 9
// The above is the best case scenario for why the if(arr[n-1] !== first) is needed

arr = [0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0] // From 2 to 3, From 6 to 7, From 9 to 9

arr = [0, 0, 0] // '' <--(1's groups = 0, 0's groups = 1)
arr = [0, 1] // From 1 to 1 <--(1's groups = 1, 0's groups = 1)
arr = [1, 0] // From 1 to 1 <--(1's groups = 1, 0's groups = 1)
arr = [1, 0, 0] // From 1 to 2 <--(1's groups = 1, 0's groups = 1)
console.log(minFlipGroups(arr))