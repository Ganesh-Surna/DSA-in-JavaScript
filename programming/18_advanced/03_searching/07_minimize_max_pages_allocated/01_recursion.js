/*
Problem: Allocate Minimum Number of Pages
=========================================

Given an array of N books where arr[i] represents the number of pages in the i-th book, 
and a number K representing the number of students.

Task: Allocate books to K students such that:
1. Each student gets at least one book
2. All books must be allocated
3. Only contiguous books can be allocated to a student
4. Minimize the maximum number of pages allocated to any student

Objective: Find the minimum possible maximum number of pages that can be allocated 
to any student.

Examples:
---------
Example 1:
Input: arr[] = {10, 20, 30, 40}, K = 2
Output: 60
Explanation: 
- Student 1 gets books with pages: 10 + 20 + 30 = 60
- Student 2 gets books with pages: 40
- Maximum pages allocated = max(60, 40) = 60

Example 2:
Input: arr[] = {10, 20, 30}, K = 1
Output: 60
Explanation: 
- Only 1 student, so they get all books: 10 + 20 + 30 = 60

Example 3:
Input: arr[] = {10, 5, 30, 1, 2, 5, 10, 10}, K = 3
Output: 30
Explanation: 
- Student 1 gets: 10 + 5 = 15
- Student 2 gets: 30 
- Student 3 gets: 1 + 2 + 5 + 10 + 10 = 28
- Maximum pages allocated = max(15, 30, 28) = 30

Constraints:
- 1 ≤ N ≤ 10^5
- 1 ≤ K ≤ N
- 1 ≤ arr[i] ≤ 10^6

Approach: Recursive Partitioning
===============================

**Core Idea:** Try all possible ways to split the books among students and pick the best one.

**Simple Logic:**
1. Try every possible partition point in the array
2. For each partition:
   - Give left part to (k-1) students (recursive call)
   - Give right part to 1 student (sum of remaining pages)
   - Take maximum of both parts
3. Return the minimum of all possible maximums

**Why it works:** We explore ALL possible allocations and choose the one that minimizes the maximum pages any student gets.
*/

// ✅ TC = O(n^k) - Exponential time complexity
//   - For each recursive call, we try all possible partition points (n-1 choices)
//   - We make k-1 recursive calls (one for each student)
//   - Total combinations: n^(k-1) ≈ n^k
// ✅ SC = O(k) - Recursion call stack depth
//   - Maximum depth is k (number of students)
//   - Each recursive call uses O(1) extra space
function minPages(arr, n, k) {
    if(k===1){
        return sum(arr, 0, n-1)
    }
    if(n===1){
        return arr[0]
    }
    
    let res = Infinity
    for(let i=1; i<n; i++){ 
        res = Math.min(res, Math.max(minPages(arr, i, k-1), sum(arr, i, n-1)))
    }
    
    return res
}

function sum(arr, st, end){
    let s = 0
    for(let i=st; i<=end; i++){
        s += arr[i]
    }
    return s
}

let arr = [10, 5, 30, 1, 2, 5, 10, 10], k = 3; // 30
arr = [10, 20, 30, 40], k=2; // 60
arr = [10, 20, 30], k=1; // 60

console.log(minPages(arr, arr.length, k))

// ✅ Recursion Call Stack Tree:
/*
Example: arr = [10, 20, 30], k = 2

minPages([10,20,30], 3, 2)
├── Try partition at i=1: [10] | [20,30]
│   ├── minPages([10,20,30], 1, 1)
│   │   └── Base case: k=1, return sum([10]) = 10
│   └── sum([20,30], 1, 2) = 50
│   └── max(10, 50) = 50
│
└── Try partition at i=2: [10,20] | [30]
    ├── minPages([10,20,30], 2, 1)
    │   └── Base case: k=1, return sum([10,20]) = 30
    └── sum([30], 2, 2) = 30
    └── max(30, 30) = 30

Result: min(50, 30) = 30

Detailed Flow:
==============
Step 1: minPages([10,20,30], 3, 2)
  - Try i=1: partition at index 1
    - Left part: [10] → minPages([10,20,30], 1, 1) = 10 <----(Step 2)
    - Right part: [20,30] → sum = 50
    - Current result: max(10, 50) = 50

Step 2: minPages([10,20,30], 1, 1)
  - Base case: k=1, return sum([10]) = 10

Step 3: Back to Step 1, try i=2: partition at index 2
  - Left part: [10,20] → minPages([10,20,30], 2, 1) = 30 <----(Step 4)
  - Right part: [30] → sum = 30
  - Current result: max(30, 30) = 30

Step 4: minPages([10,20,30], 2, 1)
  - Base case: k=1, return sum([10,20]) = 30

Step 5: Final result
  - min(50, 30) = 30

Visual Representation:
====================
arr = [10, 20, 30], k = 2

Option 1: [10] | [20, 30]
         Student1: 10
         Student2: 20+30 = 50
         Max = 50

Option 2: [10, 20] | [30]
         Student1: 10+20 = 30
         Student2: 30
         Max = 30

Choose minimum: min(50, 30) = 30
*/
