/*
NOTE: ONLY IF ✅✅✅✅ each adjacent pair differs by exactly 1 when no repetition is present ✅✅✅✅

Given a sorted array arr[] of positive integers where the elements are consecutive, 
meaning each adjacent pair differs by exactly 1 when no repetition is present. 
In this array, exactly one element may appear more than once, 
while all other elements appear exactly once. 
Now, the task is to find the element which is repeated and number of times it is repeated.

Note: If there's no repeating element, Return [-1,-1].
*/

// ✅ TC = O(log n)
// ✅ SC = O(1)
function findRepeating(arr) {
    let low = 0, high = arr.length - 1
    let dup = -1
    
    while(low <= high){
        let mid = Math.floor((low+high)/2)
        
        let expected = arr[0] + mid // since the adjacent difference is 1
        
        if(arr[mid] < expected){ // Violating, but this may or may not be duplicate.
            if(mid > 0 && arr[mid] === arr[mid-1]){ // This is Duplicate
                dup = arr[mid] 
                break
            }else{
                high = mid - 1  // Not duplicate, So going left
            }
        }else{
            low = mid + 1 // It is not violated, so no dup in left part of it, so going right
        }
    }
    
    if(dup === -1) return [-1, -1]
    
    let freq = lastOccurance(arr, dup) - firstOccurance(arr, dup) + 1
    
    return [dup, freq]
}

function firstOccurance(arr, dup){
    let n=arr.length
    let low = 0, high = n-1
    
    while(low <= high){
        let mid = Math.floor((low+high)/2)
        if(arr[mid]===dup){
            if(mid===0 || arr[mid] !==arr[mid-1]){
                return mid
            }
            high = mid - 1
        }else if(arr[mid] < dup){
            low = mid + 1
        }else{
            high = mid - 1
        }
    }
}

function lastOccurance(arr, dup){
    let n=arr.length
    let low = 0, high = n-1
    
    while(low <= high){
        let mid = Math.floor((low+high)/2)
        if(arr[mid]===dup){
            if(mid===n-1 || arr[mid] !==arr[mid+1]){
                return mid
            }
            low = mid + 1
        }else if(arr[mid] < dup){
            low = mid + 1
        }else{
            high = mid - 1
        }
    }
}