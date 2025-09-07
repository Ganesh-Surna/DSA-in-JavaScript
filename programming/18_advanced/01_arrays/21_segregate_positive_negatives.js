// Problem1 : Segregate +ve to left & -ve to right (inline)
// ✅ TC= O(n)
// ✅ SC = O(1)
function segregate(arr){
    let n = arr.length
    
    let positiveCount = 0
    for(let i=0; i<n; i++){
        if(arr[i] > 0){
            [arr[i], arr[positiveCount]]=[arr[positiveCount], arr[i]];
            positiveCount++
        }
    }
    
    console.log(arr)
}

segregate([-1, -2, 1, 10, -7, 20, 3, -9]) // [1, 10, 20,  3, -7, -1, -2, -9] (but original order of -ves changed)

// Problem2 : Segregate by preserving original order of all -ves & all +ves
// ✅ TC= O(n^2)
// ✅ SC = O(1)
function segregate(arr) {
    let n = arr.length;
    let i = 0;
    let j = 0;
    
    while (j < n) {
        if (arr[j] > 0) {
            // Found a positive, shift it to the left without disturbing order
            let temp = arr[j];
            // Shift all negatives between i and j to the right by one
            for (let k = j; k > i; k--) {
                arr[k] = arr[k-1];
            }
            arr[i] = temp;
            i++;
        }
        j++;
    }
    
    console.log(arr);
}

segregate([-1, -2, 1, 10, -7, 20, 3, -9]);
// Output: [1, 10, 20, 3, -1, -2, -7, -9]