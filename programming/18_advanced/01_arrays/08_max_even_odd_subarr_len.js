// Problem: Find the length of the longest subarray with alternating even and odd numbers.

// Same as below solutions but helper(areDifferent) function is added.
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxEvenOddSubArrLen(arr) {
  let n = arr.length;
  let max_len = 1, len = 1
  
  for(let i=1; i<n; i++){
      if(areDifferent(arr[i], arr[i-1])){
        // One is even & another is odd
        len++
        max_len = Math.max(max_len, len)
      }else{
          // both are even (OR) both are add
          len = 1
      }
  }
  console.log(max_len)
}
function areDifferent(a, b){
    return (a%2===0 && b%2 !== 0) || (a%2 !==0 && b%2 === 0)  // simply a%2 !== b%2
}


// Note: This is same as below code but Simplified version :
// ✅ TC = O(n)
// ✅ SC = O(1)
function maxEvenOddSubArrLen1(arr) {
    let n = arr.length;
    let max_len = 1, len = 1
    
    for(let i=1; i<n; i++){
        let is_curr_even = (arr[i]%2 === 0)
        let is_prev_even = (arr[i-1]%2 === 0)
        
        if(is_prev_even !== is_curr_even){
          // One is even & another is odd
          len++
          max_len = Math.max(max_len, len)
        }else{
            // both are even (OR) both are add
            len = 1
        }
    }
    console.log(max_len)
}

  // Note: This is same as above code, but above is simplified.
  // ✅ TC = O(n)
  // ✅ SC = O(1)
  function maxEvenOddSubArrLen2(arr) {
    let n = arr.length;
    let max_len = 1, len = 1;
  
    let is_prev_even = arr[0] % 2 === 0;
  
    for (let i = 1; i < n; i++) {
      let is_curr_even = arr[i] % 2 === 0;
  
      if (is_prev_even !== is_curr_even) {
        // One is even & another is odd (i.e., we can extend current subarray)
        len++;
        max_len = Math.max(max_len, len);
        is_prev_even = is_curr_even;
      } else {
        // both are even (OR) both are add (i.e., we should start new subarray)
        len = 1;
        is_prev_even = is_curr_even;
      }
    }
  
    console.log(max_len);
  }

let arr = [10, 12, 14, 7, 8]; // 3 = [14, 7, 8]
arr = [7, 10, 13, 14]; // 4 = [7, 10, 13, 14]
arr = [12, 8, 10]; // 1
maxEvenOddSubArrLen(arr);
