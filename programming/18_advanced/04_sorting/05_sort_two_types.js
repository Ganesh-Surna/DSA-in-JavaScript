/* Problem:
Given an array of integers, sort the array such that all negative numbers appear before all positive numbers.
*/

// ✅ TC = O(n)
// ✅ SC = O(1)
function sortTwoTypes(arr){ // Similar to Lomuto Partition
    let n = arr.length
    
    let negative_count = 0; // count for the type of elements to appear first
    
    for(let i=0; i<n; i++){
        if(arr[i] < 0){
            [arr[i], arr[negative_count]]=[arr[negative_count], arr[i]]
            negative_count++
        }
    }
    
    return arr
}

function lomutoPartition(arr){
    // No Pivot here
    let i=-1
    for(let j=0; j<arr.length; j++){
        if(arr[j] < 0){ // -ve numbers to left of i
            i++
            [arr[i], arr[j]]=[arr[j], arr[i]]
        }
        // if arr[j] >= 0, do nothing and continue
    }
    
    return arr // [-3, -2, -1, -22, -5, 10, 18, 15]
}

function hoaresPartition(arr){
    // No Pivot here
    let i=-1
    let j = arr.length
    
    while(true){
        
        do{i++}while(arr[i]<0) // -ve numbers to left
        do{j--}while(arr[j]>=0) // 0 or +ve numbers to right (✅ >=)
        
        if(i >= j) break;
        
        [arr[i], arr[j]]=[arr[j], arr[i]];
    }
    
    return arr
    // Input : [15, -3, -2, 18, 0, -1, 10, 0, -22, -5]
   // Output: [-5, -3, -2, -22, -1, 0, 10, 0, 18,  15]
}

let arr = [15, -3, -2, 18, -1, 10, -22, -5]; // [-3, -2, -1, -22, -5, 10, 18, 15]
console.log(sortTwoTypes(arr))