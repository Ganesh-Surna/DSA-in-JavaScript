/*
Given a number n. The task is to generate all binary numbers with decimal values from 1 to n.

Examples:
_________________
Input: n = 4
Output: ["1", "10", "11", "100"]
Explanation: Binary numbers from 1 to 4 are 1, 10, 11 and 100.

Input: n = 6
Output: ["1", "10", "11", "100", "101", "110"]
Explanation: Binary numbers from 1 to 6 are 1, 10, 11, 100, 101 and 110.



Constraints:
1 ≤ n ≤ 106

Expected Complexities
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

// 1. More Efficient Solution(reduces elements in queue)
// ✅ TC = O(n)
// ✅ SC = O(n)
function generateBinary(n) {
    let q = [] // new Queue()
    let res = []
    
    // start with "1"
    q.push("1") // enque()
    
    let i=0
    for(; (i+q.length) < n; i++){
        let x = q.shift() // deque
        res.push(x) // save it
        
        // enqueue next numbers
        q.push(x+"0")
        q.push(x+"1")
    }
    
    // if queue has more elements(upto n), then dequeue them and save them in res
    for(;i < n;i++){
        res.push(q.shift()) // deque
    }
    
    return res
}


// 2. Efficient Solution
// ✅ TC = O(n)
// ✅ SC = O(n)
function generateBinary(n) {
    let q = []
    let res = []
  
    // start with "1"
    q.push("1")
  
    for (let i = 0; i < n; i++) {
      let x = q.shift()   // dequeue
      res.push(x)         // save it
  
      // enqueue next numbers
      q.push(x + "0")
      q.push(x + "1")
    }
  
    return res
  }
  
  // Example
  console.log(generateBinary(4)) // ["1","10","11","100"]
  