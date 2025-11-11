/*
====================================
GREEDY ALGORITHM - BASICS
====================================

1) DEFINITION
   - Greedy algorithms build solutions step-by-step, making each choice locally optimal.
   - Once a choice is made, it is never reconsidered (no backtracking).
   - Works when a global optimum can be reached via locally optimal decisions.

2) KEY PRINCIPLES
   - Greedy-choice property: An optimal solution can be constructed by making local optimal choices.
   - Optimal substructure: Optimal solution contains optimal solutions to subproblems.
   - If both properties fail, greedy may not produce optimum (consider DP or backtracking).

3) COMPARISON WITH OTHER STRATEGIES
   - Greedy vs Dynamic Programming (DP): Greedy picks local best without looking ahead; DP considers all subproblems.
   - Greedy vs Divide & Conquer: D&C breaks problems and combines; greedy moves forward linearly.
   - Greedy vs Backtracking: Greedy never revisits decisions; backtracking explores alternatives.

4) COMMON PATTERNS
   a) Interval scheduling: Sort by earliest finishing time, select non-overlapping intervals.
   b) Huffman coding: Build optimal prefix codes via priority queue of frequencies.
   c) Minimum spanning tree: Prim’s and Kruskal’s algorithms.
   d) Dijkstra’s shortest path (non-negative weights).
   e) Fractional knapsack: Items sorted by value/weight ratio (works because fractional allowed).
   f) Activity/meeting selection: Pick next compatible meeting by earliest finish.
   g) Coin change (canonical denominations): Use largest denomination first (fails for some sets).
   h) Job sequencing with deadlines: Schedule job giving highest profit before its deadline.

5) STEPS TO DESIGN GREEDY
   - Define the objective function (maximize profit, minimize cost, etc.).
   - Identify candidate set (choices available at each step).
   - Determine selection function (how to choose next element).
   - Establish feasibility function (check if choice keeps solution valid).
   - Decide when to stop (solution complete).

6) WHEN GREEDY WORKS / FAILS
   - Works when greedy-choice property + optimal substructure hold.
   - Validations:
     * Exchange argument: Show that any optimal solution can be transformed to greedy solution.
     * Matroid theory: Many greedy problems fall into matroids.
   - Fails when choices cause future constraints (e.g., 0/1 knapsack requires DP).

7) ANALYSIS
   - Time: Depends on data structures (sorting O(n log n), heap operations, etc.).
   - Space: Usually O(1) or O(n) for sorting/auxiliary structures.
   - Proof of correctness is crucial—empirical success is not enough.

8) REAL-WORLD USE CASES
   - Networking: Routing, bandwidth allocation.
   - Scheduling: CPU, tasks, meetings.
   - Compression: Huffman encoding.
   - Operating systems: Resource allocation, cache replacement (LRU approximation).
   - Finance: Portfolio selection heuristics.
   - AI/Robotics: Local planning heuristics.

9) TIPS AND PITFALLS
   - Always prove correctness (greedy-choice + optimal substructure).
   - Check counterexamples; if one exists, algorithm is not universally correct.
   - Sorting the candidate list is common before greedy iteration.
   - When greedy fails, consider DP/branch and bound.
*/

