// ✅✅✅ Dutch National Flag Algorithm 

// ✅ Case 1: When asked to partition the array into three types:
// TC = O(n)
// SC = O(1)
function sortThreeTypes(arr){
    // No Pivot here
    let low = 0, mid = 0, high = arr.length-1;
    
    while(mid <= high){
        if(arr[mid] < 1){ // arr[mid]===0
            [arr[low], arr[mid]]=[arr[mid], arr[low]];
            low++
            mid++
        }else if(arr[mid]===1){
            mid++
        }else{
            [arr[high], arr[mid]]=[arr[mid], arr[high]];
            high--
        }
    }
    
    return arr
}

let arr = [0, 1, 2, 1, 1, 2, 0, 1, 0, 2]; // [0, 0, 0, 1, 1, 1, 1, 2, 2, 2]
console.log(sortThreeTypes(arr))



// ✅ Case 2: When asked to partition the around the range [a, b]
function threeWayPartition(arr, a, b) {
    let n = arr.length;
    // low: marks the end of the region with elements < a
    // mid: current index being checked
    // high: marks the start of the region with elements > b
    let low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
      if (arr[mid] < a) {
        // arr[mid] belongs to the < a region, so swap it to the front (low region)
        // After swapping, both arr[low] and arr[mid] are correctly placed, so increment both
        [arr[low], arr[mid]] = [arr[mid], arr[low]];
        low++; // Move low forward, as the < a region has grown by one
        mid++; // Move mid forward, as the swapped-in value at mid is already checked
      } else if (arr[mid] > b) {
        // arr[mid] belongs to the > b region, so swap it to the end (high region)
        // After swapping, arr[high] is now in its correct region, but the new arr[mid] could be any value
        // So, only decrement high, and re-check the new arr[mid] in the next iteration
        [arr[mid], arr[high]] = [arr[high], arr[mid]];
        high--; // Move high backward, as the > b region has grown by one
        // Do NOT increment mid here, as the swapped-in value at mid needs to be checked
      } else {
        // arr[mid] is in [a, b], so it's already in the correct region
        // Just move mid forward to check the next element
        mid++;
      }
    }
    return true;
  }