/*
Problem: Given a sorted array and a sum, find if there is a pair with given sum.
*/

/*
✅ Approach:
1. **Two Pointers**: Use two pointers at start and end of sorted array
2. **Compare Sum**: Calculate sum of elements at both pointers
3. **Adjust Pointers with Reasoning**: 
   - If sum = target → found pair
   - If sum > target → move end pointer left (decrease sum)
     * **Why?** Since array is sorted, all elements to the right of current start are ≥ current start
     * Moving start to right would only increase sum further, so we must move end to left
   - If sum < target → move start pointer right (increase sum)
     * **Why?** Since array is sorted, all elements to the left of current end are ≤ current end
     * Moving end to left would only decrease sum further, so we must move start to right
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function pairWithSum(arr, x){
    let st = 0, end = arr.length-1
    
    while(st < end){
        let sum = arr[st] + arr[end];
        
        if(sum === x){
            return true
        }else if(sum > x){
            end = end - 1
        }else{
            st = st + 1
        }
    }
    
    return false
}

let arr = [2, 5, 8, 12, 30], x = 17; // true
arr = [3, 8, 13, 18], x = 14; // false

console.log(pairWithSum(arr, x))