/*
====================================
DYNAMIC PROGRAMMING (DP) - BASICS
====================================

1) DEFINITION
   - Dynamic Programming solves problems by combining solutions of overlapping subproblems.
   - Uses optimal substructure: optimal solution composed of optimal subsolutions.
   - Typically involves recursion + memoization (top-down) or tabulation (bottom-up).

2) CORE COMPONENTS
   - States: Parameters identifying unique subproblems.
   - Recurrence relation: How to express solution via smaller states.
   - Base cases: Terminating conditions for smallest subproblems.
   - Transition order: Order of computing states (dependencies must be ready).
   - Memory structure: Table/array/hash storing computed values.

3) APPROACHES
   a) Top-Down (Memoization)
      - Write recursive function, cache results (e.g., map/array).
      - Easier to derive from plain recursion; automatically handles necessary states.
   b) Bottom-Up (Tabulation)
      - Iteratively fill table following dependency order.
      - Eliminates recursion overhead; can optimize space by compressing dimensions.
   c) Space Optimization
      - Use rolling arrays / last-row/column when only few previous states needed.

4) DP IDENTIFICATION CHECKLIST
   - Problem asks for optimal/maximum/minimum count or ways.
   - Choices at each step with overlapping subproblems.
   - Naive recursion repeats same computations.
   - Greedy fails due to future dependencies; backtracking exponential.

5) CLASSIC PROBLEM PATTERNS
   - Linear DP: Fibonacci, stair climb, house robber, LIS, Kadane.
   - Knapsack-type DP: 0/1, unbounded, subset sum, coin change.
   - Interval DP: Matrix chain multiplication, palindromic partitions.
   - String DP: LCS, edit distance, palindrome subsequences.
   - Tree DP: DP on rooted trees, subtree properties.
   - Bitmask DP: Traveling salesman, assignment problems.
   - DP on grids: Unique paths, minimum path sum, obstacle grids.
   - DP with monotonic queues/convex hull trick for optimizations.

6) TIME & SPACE
   - Time ≈ (# states) × (time per state transition).
   - Space: O(# states); often reducible with optimization.
   - Complexity gauged by loops/dimensions in table.

7) TOP-DOWN VS BOTTOM-UP
   - Top-Down advantages: natural recursive definition, avoids computing unused states.
   - Bottom-Up advantages: predictable memory usage, no recursion limit, easier to iterate.
   - Choose based on convenience; convert between for optimization.

8) COMMON MISTAKES
   - Incorrect recurrence or missing base case.
   - Forgetting modulo operations (for counting problems).
   - Not handling large input sizes (need O(n^2) vs O(n^3)).
   - Improper loop order causing use of uninitialized states.
   - Overcounting due to forgetting to reset DP arrays.
   - Stack overflow (deep recursion without memoization).

9) OPTIMIZATION TECHNIQUES
   - Dimension reduction (1D vs 2D).
   - Prefix sums, difference arrays.
   - Monotonic queue optimization (sliding window DP).
   - Divide & Conquer DP optimization (quadrangle inequality).
   - Convex hull trick (linear DP with convex cost).
   - Bitmask compression for states.

10) REAL-WORLD APPLICATIONS
    - Bioinformatics (sequence alignment).
    - Machine learning (HMMs, Viterbi algorithm).
    - Operations research (resource allocation).
    - Robotics/path planning (grid DP).
    - Financial modeling (investment decisions).
    - NLP (dynamic programming for parsing).

11) DP DESIGN TEMPLATE
    // Example: memoized recursion
    function solve(state) {
      if (memo[state] !== undefined) return memo[state];
      if (base-case) return base-value;
      let ans = combine( child transitions );
      memo[state] = ans;
      return ans;
    }

    // Example: tabulation
    const dp = Array(n+1).fill(0);
    dp[0] = base;
    for (let i = 1; i <= n; i++) {
      dp[i] = min/max/sum over transitions using dp[.. < i];
    }

12) PROCESS FOR NEW PROBLEM
    - Define state variables (indices, remaining capacity, etc.).
    - Write pure recursion ignoring efficiency.
    - Identify overlapping subproblems; add memoization.
    - Determine iteration order for bottom-up version.
    - Optimize space/time if needed.

13) RELATED CONCEPTS
    - Memoization vs caching vs tabulation differences.
    - Relation to recursion tree pruning.
    - DP vs greedy vs divide-and-conquer distinctions.
    - DP on DAGs: topological order ensures dependencies resolved once.

14) BEST PRACTICES
    - Always confirm base cases and transitions with small examples.
    - Validate with brute force for small inputs.
    - Consider constraints to decide DP dimensions and complexity.
    - Keep states minimal (avoid redundant dimensions).
*/

