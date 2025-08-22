// Problem: Find the maximum number of consecutive 1s in the array.

// Efficient Sol:
// ✅ TC = O(n)
// ✅ SC = O(1)
// No need to compute max_c after for loop, just update it in for loop
function maxConsecOnes1(arr){
    let n = arr.length
    let max_c = 0
    let c = 0
    for(let i=0; i<n; i++){
        if(arr[i]===1){
            c++
            max_c = Math.max(max_c, c) // update max_c whenever c is changes
        }else{
            c = 0
        }
    }
    console.log(max_c)
    
}

function maxConsecOnes2(arr){
    let n = arr.length
    let max_c = 0
    let c = 0
    for(let i=0; i<n; i++){
        if(arr[i]===1){
            c++
            // for last element just counted, max_c not updated, so added after for loop
        }else{
            max_c = Math.max(max_c, c)
            c = 0
        }
    }
    max_c = Math.max(max_c, c)
    console.log(max_c)
    
}

// While(whole arr) inside while(freq of 1s)
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxConsecOnes3(arr){
    let n = arr.length
    let max_c = 0
    
    let i=0
    while(i<n){
        let j=i+1, freq = 0
        
        if(arr[i]===1){
            freq = 1
        }
        
        while(j < n){
            if(arr[j] === 1){
                freq++
                j++
            }else{
                break
            }
        }
        
        max_c = Math.max(max_c, freq)
        i = j
    }
    
    console.log(max_c)
}

let arr = [1, 0, 1, 1, 1, 1, 0, 1, 1] // 4
arr = [0, 0, 0, 1] // 1
arr = [0, 0, 0, 0] // 0
maxConsecOnes1(arr)