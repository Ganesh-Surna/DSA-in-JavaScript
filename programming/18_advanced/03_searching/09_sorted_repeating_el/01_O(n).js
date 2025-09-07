// ✅ TC = O(n)
// ✅ SC = O(1)
function findRepeating(arr) {
    let n = arr.length
    
    let freq = 1;
    let num = null;
    
    for(let i=1; i<n; i++){
        if(arr[i] === arr[i-1]){
            num = arr[i]
            freq++
        }else if(num){
            return [num, freq]
        }else{
            freq = 1
        }
    }
    
    return [-1, -1]
}