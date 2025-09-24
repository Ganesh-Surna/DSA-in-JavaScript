// ✅ TC: O(n)
// ✅ SC: O(n)
function pairWithSum(arr, x){
    let seen = new Set()
    for(let num of arr){
        let req = x - num
        if(seen.has(req)){
            return true
        }
        seen.add(num)
    }
    
    return false
}

let arr = [3, 2, 8, 15, -8], x=17; // true
// arr = [2, 1, 6, 3], x=6; // false
// arr = [5, 8, -3, 6], x=3; // true

console.log(pairWithSum(arr, x))