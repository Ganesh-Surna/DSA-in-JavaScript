/*
You are given a number x and array arr[]. 
Your task is to rearrange the elements of the array according to the absolute difference with x, 
i.e., an element having minimum difference comes first, and so on.
Note: If two or more elements are at equal distances arrange them in the same sequence as in the given array.

Input: x = 7, arr[] = [10, 5, 3, 9, 2]
Output: [5, 9, 10, 3, 2]
Explanation: Sorting the numbers according to the absolute difference with 7, we have array elements as 5, 9, 10, 3, 2.

Input: x = 6, arr[] = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
Explanation: Sorting the numbers according to the absolute difference with 6, we have array elements as 5, 4, 3, 2, 1.

Expected Time Complexity: O(n log n)
Expected Auxiliary Space: O(1)
*/
// ✅✅✅✅✅✅✅ SOL 1: Merge Sort ✅✅✅✅✅✅✅
// ✅ TC: O(n log n)
// ✅ SC: O(n) //(because of slices) (For slices → O(n) extra space. & For recursion → only O(log n), relatively small.)
// ✅ Merge Sort
// ✅ Stable Sorting (means if two elements have same absolute difference, they will maintain their original order)
function absDiffSort(arr, x) {
    mergeSort(arr, 0, arr.length-1, x)
    
    console.log(arr)
}

function mergeSort(arr, st=0, end=arr.length-1, x){
        if(st < end){
            let mid = Math.floor((st+end)/2);
            mergeSort(arr, st, mid, x)
            mergeSort(arr, mid+1, end, x)
            merge(arr, st, mid, end, x)
        }
}

function merge(arr, st, mid, end, x){
    let left=arr.slice(st, mid+1)
    let right=arr.slice(mid+1, end+1)
    
    let i=0, j=0, k=st;
    while(i<left.length && j<right.length){
        let leftDiff = Math.abs(x-left[i])
        let rightDiff = Math.abs(x-right[j])
        
        if(leftDiff<=rightDiff){
            arr[k++] = left[i++]
        }else{
            arr[k++] = right[j++]
        }
    }
    while(i<left.length){
        arr[k++] = left[i++]
    }
    while(j<right.length){
        arr[k++] = right[j++]
    }
}

// ✅✅✅✅✅✅✅ SOL 2: Insertion Sort ✅✅✅✅✅✅✅
// ✅ TC: O(n^2)
// ✅ SC: O(1)
// ✅ Insertion Sort
// ✅ Stable Sorting (means if two elements have same absolute difference, they will maintain their original order)
function absDiffSort(arr, x) {
    let n= arr.length;
    
    for(let i=1; i<n; i++){
        let key = arr[i]
        let keyDiff = Math.abs(x-key)
        
        let j=i-1;
        while(j>=0 && Math.abs(x-arr[j]) > keyDiff){
            arr[j+1] = arr[j]
            j--
        }
        
        arr[j+1] = key
    }
    
    console.log(arr)
}


// ✅✅✅✅✅✅✅ SOL 3: Bubble Sort ✅✅✅✅✅✅✅
// ✅ TC: O(n^2)
// ✅ SC: O(1)
// ✅ Bubble Sort
// ✅ Stable Sorting (means if two elements have same absolute difference, they will maintain their original order)
function absDiffSort(arr, x) {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            let diff1 = Math.abs(arr[j] - x);
            let diff2 = Math.abs(arr[j + 1] - x);

            if (diff1 > diff2) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
            // if diff1 == diff2 → do nothing (keeps stability)
        }

        // If no swaps happened → array is sorted
        if (!swapped) break;
    }

    console.log(arr)
}

let arr = [10, 5, 3, 9, 2], x = 7; // [5, 9, 10, 3, 2]
// arr = [1, 2, 3, 4, 5, 6, 8, 7], x = 7; // [7, 6, 8, 5, 4, 3, 2, 1]
absDiffSort(arr, x)


// ⛔⛔⛔⛔⛔ Below one is WRONG Sol ⛔⛔⛔⛔⛔
// ⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔
function absDiffSort(arr, x) {
    arr.sort((a, b)=>a-b)
    
    let n = arr.length;
    
    let low = 0, mid=0, high=n-1;
    let minDiff=0;
    
    while(mid < high){
        let currDiff = x-arr[mid];
        
        if(currDiff < minDiff){
            [arr[low], arr[mid]]=[arr[mid], arr[low]];
            low++
            mid++
        }else if(currDiff === minDiff){
            mid++
        }else{
            [arr[high], arr[mid]]=[arr[mid], arr[high]];
            high--
        }
        
        minDiff = Math.min(minDiff, currDiff)
    }
}