/*
Problem: Given an unsorted array, find the peak element in it in O(log n) time.
*/

/*
✅ Approach (Assume array is unsorted):

1. **Binary Search on Unsorted Array**: Even though the array is unsorted, we can still use binary search because we're looking for a peak element, not a specific value.

2. **Peak Definition**: A peak element is one that is greater than or equal to its neighbors (or is at the boundary).

3. **Key Insight**: Every array has at least one peak element. This allows us to eliminate half of the search space in each iteration.

4. **Algorithm Steps**:
   - Start with binary search boundaries (st=0, end=n-1)
   - Calculate mid point
   - Check if mid is a peak:
     - If mid is at boundary (0 or n-1), only check one neighbor
     - If mid is in middle, check both neighbors
   - If mid is peak, return it
   - If left neighbor is greater than mid, peak must be in left half (eliminate right half)
   - If right neighbor is greater than mid, peak must be in right half (eliminate left half)

5. **Why it works**: Since every array has at least one peak, we can always eliminate one half of the array based on the comparison with neighbors.

6. **Time Complexity**: O(log n) - binary search
7. **Space Complexity**: O(1) - constant extra space

*/

// ✅ TC= O(log n)
// ✅ SC = O(1)
function findPeak(arr){
    let n = arr.length
    let st = 0, end = n-1
    
    while(st <= end){
        let mid = Math.floor((st+end)/2)

        if((mid ===0 || arr[mid-1] <= arr[mid]) && (mid ===n-1 || arr[mid+1] <= arr[mid])){
            // mid is the index of peak element
            return mid
        }else if(mid > 0 && arr[mid-1] >= arr[mid]){
            // peak can either be in the left part or the right part.
            // But the arr[mid-1] >= arr[mid], so we can ignore the right part.
            // since, Every independent array will have atleast one peak element.
            end = mid-1
        }else{
            // peak can either be in the left part or the right part.
            // But the arr[mid+1] >= arr[mid], so we can ignore the left part.
            // since, Every independent array will have atleast one peak element.
            st = mid+1
        }
    }

    return -1
}