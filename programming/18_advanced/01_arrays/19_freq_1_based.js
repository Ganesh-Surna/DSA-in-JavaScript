// Problem: You are given an array arr[] containing positive integers. 
// The elements in the array arr[] range from  1 to n (where n is the size of the array),
// and some numbers may be repeated or absent. 
// Your have to count the frequency of all numbers in the range 1 to n 
// and return an array of size n 
// such that result[i] represents the frequency of the number i (1-based indexing).

// ✅ TC = O(n)
// ✅ SC = O(n)
function frequencyCount(arr) {
    let n = arr.length
    let res = new Array(n).fill(0)
    
    for(let i=0; i<n; i++){
        let num = arr[i]
        
        res[num-1]++  // Increment the frequency of the number at index num-1 (1-based indexing)
    }
    
    return res
}