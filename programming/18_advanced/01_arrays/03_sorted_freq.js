// Problem: Print the frequency of each element in a sorted array.

// ✅ TC = O(n)
// ✅ SC = O(1)
function sortedFreq(arr){
    let n = arr.length
    
    let i=0

    while(i<n){
        let freq = 1, j = i+1;

        while(j < n){
            if(arr[j] === arr[i]){
                freq++
                j++
            }else{
                break
            }
        }
        
        console.log(arr[i], freq)
        i = j // OR i = i + freq (This will skip the outer loop freq times of each diff item, so ensures each item processed only once i.e., O(n) time)
    }
}

// ✅ TC = O(n)
// ✅ SC = O(1)
function sortedFreq(arr){
    let n = arr.length
    let curr_item = arr[0]
    let curr_item_count = 1
    
    for(let i=1; i<n; i++){
        if(arr[i] === curr_item){
            curr_item_count++
        }
        // New item arised
        else{
            console.log(curr_item, curr_item_count)
            curr_item = arr[i]
            curr_item_count = 1
        }
    }
    
    // last element of arr is just counted in above loop, not printed
    console.log(curr_item, curr_item_count)
}

let arr = [10, 10, 10, 25, 30, 30] // [10, 3] [25, 1] [30, 2]
arr = [10, 10, 10, 10] // [10, 4]
arr = [30, 20, 10] // [30, 1] [20, 1] [10, 1]
sortedFreq(arr)