/*
You are given an array arr[] of integers. Find all the numbers in the array whose digits consist only of [1, 2, 3].Return an array containing only those numbers from arr[]. The order of the numbers in the output array should be the same as their order in the input array.
If there is no such element in arr[]. Return [-1].


Input: arr[] = [4, 6, 7]
Output: [-1]
Explanation: No elements are there in the array which contains digits 1, 2 or 3.

Input: arr[] = [1, 2, 13, 4, 14] 
Output: [1, 2, 13]
Explanation: 1, 2 and 13 are the only elements in the array which contains digits as 1, 2 or 3.

Constraints:
1 <= arr.size <= 105
1 <= arr[i] <= 106

Expected Complexities
Time Complexity: O(n)
Auxiliary Space: O(n)
*/
function findNumbers(arr) {
    const result = [];
    
    for (const num of arr) {
        const numStr = num.toString();
        let valid = true;
        
        for (const digit of numStr) {
            if (digit !== '1' && digit !== '2' && digit !== '3') {
                valid = false;
                break;
            }
        }
        
        if (valid) {
            result.push(num);
        }
    }
    
    return result.length > 0 ? result : [-1];
}