// ✅ TC = O(n) / O(n) / O(n²) (Best / Average / Worst)
// ✅ SC = O(1)
function findKthSmallest(arr, k){
    let l=0, h=arr.length-1;
    
    while(l <= h){
        let p = lomutoPartition(arr, l , h) // Only lomuto partition (not hoare's partition), because the p should be fixed at its correct position
        
        if(p===k-1){ // if 1st smallest means 0th in sorted arr. so k-1 index is kth smallest element
            return arr[p]
        }else if(p < k-1){
            l = p + 1
        }else{
            h = p - 1
        }
    }
    
    return -1
}

function lomutoPartition(arr, l=0, h=arr.length-1){
    let pivot = arr[h]
    let i=l-1
    
    for(let j=l; j<h; j++){
        if(arr[j] < pivot){
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]]
        }else{
            // if arr[i] >= pivot
            continue
        }
    }
    
    [arr[i+1], arr[h]] = [arr[h], arr[i+1]]
    
    return i+1
    
}

let arr = [10, 8, 2, 4, 7, 5, 1], k=4; // 5
console.log(findKthSmallest(arr, k))

/* isn't it O(nlogn) on best & avg ?

No, the algorithm for finding the k-th smallest element using
 quickselect (as implemented) has O(n) average time complexity, not O(n log n). Let me explain why.

Quicksort (Full Sorting):
    1. Recursively sorts both left and right partitions.
    2. Time Complexity:
        Best/Average: O(n log n)
        Worst: O(n²)

Quickselect (Finding k-th element):
    1. Only recurses (or iterates) on the partition that contains the k-th element.
    2. Time Complexity:
        Best/Average: O(n)
        Worst: O(n²)


📊 TIME COMPLEXITY ANALYSIS:

🔍 BEST CASE: O(n)
- Pivot always divides array roughly in half
- T(n) = T(n/2) + O(n) = O(n)

📈 AVERAGE CASE: O(n)  
- Expected number of comparisons: O(n)
- Mathematical proof: E[T(n)] = O(n)

❌ WORST CASE: O(n²)
- Pivot is always smallest/largest element
- Problem size reduces by only 1 each time
- T(n) = T(n-1) + O(n) = O(n²)

📋 WORST CASE CALCULATION:
n + (n-1) + (n-2) + ... + 1 = n(n+1)/2 = O(n²)

💡 KEY INSIGHT:
QuickSelect is O(n) average because we only recurse on ONE partition 
(unlike QuickSort which recurses on BOTH partitions)
*/