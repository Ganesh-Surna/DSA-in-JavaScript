/*
========================================================
FIBONACCI: PLAIN RECURSION VS MEMOIZATION (DP)
========================================================

1) WHY PLAIN RECURSION IS EXPONENTIAL
   function fib(n) {
     if (n === 0 || n === 1) return n;
     return fib(n - 1) + fib(n - 2);
   }

   - Recursion tree branches twice at each non-base level.
   - Number of nodes in the fib(n) recursion tree grows ~ φ^n (φ = (1 + √5)/2).
   - Example with fib(5):
       fib(5)
        ├─ fib(4)
        │   ├─ fib(3)
        │   │   ├─ fib(2)
        │   │   │   ├─ fib(1)
        │   │   │   └─ fib(0)
        │   │   └─ fib(1)
        │   └─ fib(2)
        │       ├─ fib(1)
        │       └─ fib(0)
        └─ fib(3)
           ├─ fib(2)
           ├─ fib(1)
           └─ ...
   - Subproblems are recomputed many times (fib(3) twice, fib(2) three times, etc.).
   - Time complexity: O(φ^n). Space complexity: O(n) recursion stack.

2) HOW DYNAMIC PROGRAMMING REDUCES IT
   - Key observation: the recursion tree has overlapping subproblems.
   - If we cache results, every fib(k) is computed exactly once and reused.
   - With memoization, total distinct states = n + 1 (0..n).
   - Time complexity becomes O(n); each call now constant work.
   - Space: O(n) for memo + O(n) stack (or O(1) stack with iterative DP).

3) MEMOIZATION IMPLEMENTATION (TOP-DOWN DP)

   const memo = new Array(N + 1).fill(null);
   function fib(n) {
     if (memo[n] !== null) return memo[n];
     if (n === 0 || n === 1) return n;
     memo[n] = fib(n - 1) + fib(n - 2);
     return memo[n];
   }

   - Before any calls: memo = [null, null, null, ...].
   - After fib(5): memo becomes [0, 1, 1, 2, 3, 5, null, ...].
   - Recursion tree now reuses answers; each subtree executes once.
   - Total calls ≈ 2n - 1 (linear), matching image annotation.

4) DRAWBACKS / LIMITATIONS OF MEMOIZATION
   - Extra memory for memo array/hash (O(n)); may be large for big n.
   - Still uses recursion ⇒ risk stack overflow for huge n.
   - Requires initialization and cache check overhead (small constant factor).
   - If state space is huge/sparse, memo table can be large with rarely used entries.
   - Not ideal when we need iterative order/iterative DP to avoid recursion overhead.

5) TAKEAWAY
   - Plain recursion is elegant but exponential; unsuitable for large n.
   - Memoization (top-down DP) keeps recursive structure, removes redundant work.
   - For even better control, convert to bottom-up DP iteratively with O(1) space.
*/

