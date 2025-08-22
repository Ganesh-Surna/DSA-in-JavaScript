// Problem: Print all leaders in an array.
// Leaders in an array are the elements that are greater than all the elements to their right.
// Note: The rightmost element is always a leader.


// ✅ TC = O(n)
// ✅ SC = O(n)
function leaders(arr){
    let n = arr.length
    let curr_max = arr[n-1]
    let res = [curr_max] // use queue for better performance
    
    for(let i=n-2; i>=0; i--){
        if(arr[i] >= curr_max){
            curr_max = arr[i]
            res.unshift(curr_max) // now it takes O(n), but queue will do it in O(1) time
        }
    }
    
    console.log(...res)
}

function leaders(arr){
    let n = arr.length
    let curr_max = arr[n-1]
    let res = [curr_max]
    
    for(let i=n-2; i>=0; i--){
        if(arr[i] >= curr_max){
            curr_max = arr[i]
            res.push(curr_max)
        }
    }
    
    while(res.length > 0){
        let popped = res.pop()
        console.log(popped)
    }
}

let arr = [7, 10, 4, 3, 6, 5, 2] // 10 6 5 2
arr = [10, 20, 30] // 30
arr = [30, 20, 10]  // 30 20 10
leaders(arr)