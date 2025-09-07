// ✅✅✅✅✅ NOTE: ONLY IF arr can be modified ✅✅✅✅✅

// ✅ TC = O(n)
// ✅ SC = O(1)
function oneRepeated(arr) {
    let n = arr.length
    
    for(let i=0; i<n; i++){
        let idx = Math.abs(arr[i])
        
        if(arr[idx] > 0){
            arr[idx] = -arr[idx]
        }else{
            return idx
        }
    }
}

/*
You are given an integer array arr of size n+2. 
All elements of the array are in the range from 1 to n. 
Also, all elements occur once except two numbers which occur twice. 
Find the two repeating numbers.

Note: Return the numbers in their order of appearing twice. 
So, if x and y are repeating numbers, 
and x's second appearance comes before the second appearance of y, 
then the order should be (x, y).
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function twoRepeated(arr) {
    let n = arr.length
    let res = []
    
    for(let i=0; i<n; i++){
        let idx = Math.abs(arr[i])
        
        if(arr[idx] > 0){
            arr[idx] = -arr[idx]
        }else{
            res.push(idx)
            if(res.length === 2) return res
        }
    }
}

// Input: n = 4, arr[] = [1, 2, 1, 3, 4, 3]
// Output: [1, 3]

// Input: n = 4, arr[] = [1, 3, 2, 3, 4, 1]
// Output: [3, 1]