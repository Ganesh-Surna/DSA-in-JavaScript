/*
Given an array of distinct elements which was initially sorted. 
This array may be rotated at some unknown point. 
The task is to find the minimum element in the given sorted and rotated array. 

Note: Expected time complexity is O(log n).
*/

// ✅ TC = O(log n)
// ✅ SC = O(1)
function minNumber(arr, low, high) {
    while(low < high){
        // Check if the current segment is sorted
        if(arr[low] <= arr[high]){
            return arr[low]
        }

        let mid = Math.floor((low+high)/2)
        
        if(arr[mid] >= arr[low]){
            // Left part is sorted, so min is in right part
            low = mid+1
        }else{
            // Right part is sorted, so min is in left part (including mid)
            high = mid
        }
    }
    
    return arr[low]
}


function minNumber(arr, low, high) {
    let min = arr[low]

    while(low <= high){
        let mid = Math.floor((low+high)/2)
        
        min = Math.min(min, arr[mid])
        
        if(mid > low && arr[mid] < arr[low]){ // Means left part is not sorted (so the min is in left part)
            high = mid - 1 // so move left
        }else if(mid < high && arr[mid] > arr[high]){ // Means right part is not sorted (so the min is in right part)
            low = mid + 1 // so move right
        }else{ // Means both parts are sorted (so the low is the min)
            min = Math.min(min, arr[low])
            return min
        }
    }
    
    return min
}