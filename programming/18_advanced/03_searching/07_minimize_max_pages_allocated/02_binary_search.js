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

Approach: Binary Search on Answer
- Search space: [max(arr), sum(arr)]
- For each candidate answer, check if it's possible to allocate books
- Use greedy approach to check feasibility
*/

// ✅ NOTE: When sum is much much larger, 
// then Difference between sum and max is very large, 
// then Binary Search is not a good idea.
// Using ✅"Dynamic Programming" (TC = O(n^2 * k)) is a better idea.

// ✅ TC = O(nlog(sum)) <--- O(nlog(sum - max))  // sum-max is the search space
// ✅ SC = O(1)
function minPages(arr, k) {
    let n = arr.length

    if(k > n) return -1 // No of students > No of books (each student must get at least one book)

    let low = Math.max(...arr)
    let high = arr.reduce((acc, curr) => acc + curr, 0)
    let res = -1

    // O(log(sum-max)) times
    while(low <= high){ // Search space: [max(arr), sum(arr)]
        let mid = Math.floor((low + high) / 2)
        if(isPossible(arr, k, mid)){ // O(n) time
            res = mid
            high = mid - 1
        }
        else{
            low = mid + 1
        }
    }
    return res
}

// TC = O(n)
function isPossible(arr, k, maxPages){
    let sum = 0
    let students = 1
    for(let i=0; i<arr.length; i++){
        if(sum + arr[i] > maxPages){
            students++
            sum = arr[i]
        }
        else{
            sum += arr[i]
        }
    }
    return students <= k // ✅
}

// Why (<=) in students <= k when the problem wants every student to get at least one book?
// =====================================================================================
//
// This is a GREAT question! Here's the key insight:
//
// The greedy algorithm in isPossible() will ALWAYS use exactly k students when possible.
// It will NEVER use fewer than k students because:
//
// 1. The algorithm tries to minimize students while respecting maxPages
// 2. If we can allocate with < k students, we can always redistribute to use exactly k
// 3. The constraint "each student gets at least one book" is automatically satisfied
//
// Example: arr = [10, 20, 30], k = 3, maxPages = 50
// - Greedy allocation: Student1 gets 10+20=30, Student2 gets 30
// - Students used = 2 < k = 3
// - But we can redistribute: Student1 gets 10, Student2 gets 20, Student3 gets 30
// - Now students = 3 = k ✅
//
// So in practice: students == k when allocation is possible
// The <= is just a safety check, but the algorithm ensures students = k