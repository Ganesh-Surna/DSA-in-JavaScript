/* Problem: ✅✅✅✅ Allocate Minimum Number of Pages (Plain Recursion) ✅✅✅✅

Given `n` books (array `arr`) where each book has a number of pages, and
`k` students — allocate the books in contiguous segments so that every student
gets at least one segment and the maximum pages assigned to any student is as
small as possible. Return that minimized “maximum pages” value.

🎯 Goal: Distribute the books so the busiest student reads the fewest pages.

Example 1:
Input: arr = [10, 20, 30, 40], k = 2
Output: 60
Explanation: Best split is Student 1 → [10, 20, 30], Student 2 → [40].
The busiest student reads 60 pages, and no other split gives a smaller max.

Example 2:
Input: arr = [10, 20, 30], k = 1
Output: 60
Explanation: Only one student, so they read all pages.

Example 3:
Input: arr = [10, 5, 30, 1, 2, 5, 10, 10], k = 3
Output: 30
Explanation: Split as [10, 5], [30], [1, 2, 5, 10, 10]; busiest student reads 30.

Constraints:
- 1 ≤ arr.length, k ≤ 50 (or as given for larger inputs)
- Pages are positive integers.

Expected Complexities:
Time Complexity: O(n^k) exponential (plain recursion exploring all splits).
Space Complexity: O(k) recursion depth + O(1) extra work per call.

⚠️ Note: This is the naive recursive version. For a fast solution, see
`03_DP_Tabulation.js` (DP tabulation avoids re-computation).

🧠 Core Idea:
- At each recursive call we decide where to split the current prefix of books
  between the first `k-1` students and the last student.
- For every split point `i`, we:
     1. Recursively solve for the first `i` books with `k-1` students.
     2. Assign books `[i...n-1]` to the last student and compute their pages.
     3. Combine both results and keep the minimum over all splits.

📈 Recurrence Relation:
    allocateMinPages(arr, k, n):
    - If k === 0 || n === 0: return 0 (no students or books).
    - If k === 1: return sum(arr[0...n-1]) (one student reads everything).
    - If n === 1: return arr[0] (only one book remains).

    For each split i ∈ [1, n-1]:
        left = allocateMinPages(arr, k-1, i) // best for first (k-1) students
        right = sum(arr[i...n-1])              // pages for last student
        ans = min(ans, max(left, right))

Base Cases:
- No students/books → 0.
- One student → sum of current prefix.
- One book left → that book’s pages (can't split further).

Why min(max(left, right))?
- Each split produces the busiest student load (max of the two sides).
- We minimize this worst-case load over all splits so the final answer
  represents the fairest distribution.

💡 Key Insights:
- Recursion branches on the partition point between books, not within them.
- The helper `sum()` re-calculates pages for the “last student” portion,
  which makes this brute-force approach slow but straightforward to reason about.
- The recursion depth is controlled by `k` because each recursive call
  assigns one student fewer books.

Step-by-step view for [10, 20, 30, 40], k=2:
- Try split at i=1: first student handles [10], second handles [20, 30, 40].
  → left = allocateMinPages([10], 1) = 10, right = sum([20, 30, 40]) = 90.
  → Current answer = min(∞, max(10, 90)) = 90.
- Try split at i=2: [10, 20] | [30, 40] → left = 30, right = 70 → ans = 70.
- Try split at i=3: [10, 20, 30] | [40] → left = 60, right = 40 → ans = 60.
Final answer is 60 (split at i=3).

⚠️ This recursion is exponential because it tries all partition points for every
call. DP tabulation removes redundant work by storing results for each prefix
and student count.
*/
// ✅ TC = O(n^k) exponential (pure recursion)
// ✅ SC = O(k) recursion stack
function allocateMinPages(arr, k, n=arr.length){
    if(k===0 || n===0) return 0
    if(k===1){
        return sum(arr, 0, n-1)
    }
    // If k > 1 & n=1: only one book left, so return that book’s pages
    if(n===1) return arr[0] 
    
    let res = Infinity
    
    // Try all possible last partitions for the current call
    for (let i = 1; i < n; i++) {
        // First k-1 students get books [0...i-1]
        // Last student gets books [i...n-1]
        const left = allocateMinPages(arr, k - 1, i); // recuse on smaller prefix
        const right = sum(arr, i, n - 1); // pages assigned to the last student

        // We are interested in minimizing the maximum pages any student has to read.
        res = Math.min(res, Math.max(left, right));
    }
    return res
    
    function sum(arr, l, r){
        let s=0
        for(let i=l; i<=r; i++){
            s += arr[i]
        }
        
        return s
    }
}

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [10, 20, 30, 40], k = 2)

Initial call: allocateMinPages([10, 20, 30, 40], 2, 4)
  - Not a base case because k=2, n=4.
  - We iterate partition point i from 1 to 3.

Partition i=1:
  - left = allocateMinPages([10, 20, 30, 40], 1, 1) → Only one student reads [10] = 10.
  - right = sum([10,20,30,40], 1, 3) → sum of [20, 30, 40] = 90.
  - res = min(∞, max(10, 90)) = 90.

Partition i=2:
  - left = allocateMinPages(arr, 1, 2) → student 1 reads [10, 20] = 30.
  - right = sum(arr, 2, 3) → [30, 40] = 70.
  - res = min(90, max(30, 70)) = 70.

Partition i=3:
  - left = allocateMinPages(arr, 1, 3) → [10, 20, 30] = 60.
  - right = sum(arr, 3, 3) → [40] = 40.
  - res = min(70, max(60, 40)) = 60 ← final answer.

Every partition tries to balance the load between the recursive prefix (first k−1 students)
and the current last student. We always compare the “worst student load” (`max(left,right)`)
and keep the best possible of those worst loads (`Math.min` over all splits).

⚠️ WHY `min(max(left, right))`?
  - `max(left, right)` tells us the busiest student’s pages for the current split.
  - `min(...)` picks the split that leads to the smallest busiest load across all splits.
  - We are minimizing the maximum workload — exactly the problem requirement.

🔁 KEY INSIGHTS
  1. The recursion reduces `k` by 1 with each split so the stack depth is bounded by `k`.
  2. Helper `sum()` recomputes page totals for the right side, which is the main bottleneck.
  3. This plain recursion re-explores the same prefixes, so the DP/tabulation version caches
     these results to avoid exponential blow-up.
*/

console.log(allocateMinPages([10, 20, 30, 40], 2)); // 60 --> Student 1: [10, 20, 30] , Student 2: [40]
console.log(allocateMinPages([10, 20, 30], 1)); // 60
console.log(allocateMinPages([10, 5, 30, 1, 2, 5, 10, 10], 3)); // 30 --> Student 1: [10, 5] , Student 2: [30] , Student 3: [1, 2, 5, 10, 10]