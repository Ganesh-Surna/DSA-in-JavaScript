/* Problem: Chocolate Distribution Problem

Given an array of n packets where each packet has a certain number of chocolates. 
There are m students, the task is to distribute chocolate packets such that:

1. Each student gets exactly one packet
2. The difference between the number of chocolates given to the student who gets 
   the maximum number of chocolates and the student who gets the minimum number 
   of chocolates is minimum.

Example 1:
Input:
N = 8, M = 5
A[] = {3, 4, 1, 9, 56, 7, 9, 12}
Output: 6
Explanation: The minimum difference between maximum chocolates and minimum chocolates 
is 9 - 3 = 6 by choosing following M packets: {3, 4, 7, 9, 9}.

Example 2:
Input:
N = 7, M = 3
A[] = {7, 3, 2, 4, 9, 12, 56}
Output: 2
Explanation: The minimum difference between maximum chocolates and minimum chocolates 
is 4 - 2 = 2 by choosing following M packets: {2, 3, 4}.

Constraints:
1 ≤ N ≤ 10^5
1 ≤ M ≤ N
1 ≤ A[i] ≤ 10^9

Expected Time Complexity: O(N*log(N))
Expected Auxiliary Space: O(1)
*/

// ✅ TC = O(nlogn) --> For Sorting
// ✅ SC = O(1) 
// ✅✅✅ (NOTE: If we are not allowed to modify the array, then we need to create a copy of the array, in that case SC = O(n))
function chocolateDistribution(arr, m){
    let n = arr.length

    if(m===0) return 0

    if(n < m) return -1
    
    // 1. Sort the array
    arr.sort((a, b)=>a-b)

    let res = Number.POSITIVE_INFINITY
    
    // 2. Find the minimum difference
    for(let i=m-1; i<n; i++){
        res = Math.min(res, arr[i]-arr[i-(m-1)]) // arr[i] -> max chocolate packet & arr[i-(m-1)] -> min chocolate packet
    }
    
    return res
}

let arr = [7, 3, 2, 4, 9, 12, 56], m=3; // 2 --> [2, 3, 4] --> 4-2 = 2
arr = [7, 3, 2, 4, 9, 12, 56], m=4; // 5 
console.log(chocolateDistribution(arr, m))