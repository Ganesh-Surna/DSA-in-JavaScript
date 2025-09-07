/*
Problem: Given a sorted and rotated array, find the index of the target element.
*/

// ✅ TC= O(log n)
// ✅ SC = O(1)
function searchRotated(arr, x) {
    let st = 0, end = arr.length - 1;
    
    while (st <= end) {
        let mid = Math.floor((st + end) / 2);
        
        if (arr[mid] === x) {
            return mid;
        }
        
        if (arr[mid] >= arr[st]) {
            // Left half is sorted
            if (x < arr[mid] && x >= arr[st]) {
                end = mid - 1;
            } else {
                st = mid + 1;
            }
        } else {
            // Right half is sorted
            if (x > arr[mid] && x <= arr[end]) {
                st = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    
    return -1;
}


function searchRotated(arr, x){
    let st = 0, end = arr.length-1
    
    while(st <= end){
        let mid = Math.floor((st+end)/2)
        
        if(arr[mid] === x){
            return mid
        }else if(arr[mid] < x){
            if(arr[end] > x){ // Means right part is sorted
                st = mid + 1
            }else{
                end = mid - 1
            }
        }else{
            if(arr[st] < x){ // Means left part is sorted
                end = mid - 1
            }else{
                st = mid + 1
            }
        }
    }
    
    return -1
}

let arr = [10, 100, 200, 300, 500, 2, 5], x = 100; // 1
arr = [100, 500, 10, 20, 30, 40, 50], x = 40; // 5
arr = [100, 200, 300, 400, 20, 30, 40], x = 50; // -1

console.log(searchRotated(arr, x))