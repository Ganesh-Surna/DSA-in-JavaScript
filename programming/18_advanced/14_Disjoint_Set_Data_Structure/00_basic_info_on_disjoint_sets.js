/*
====================================
DISJOINT SET (UNION-FIND) - BASICS
====================================

1) DEFINITION
   - Disjoint Set Union (DSU), also called Union-Find, maintains a collection of non-overlapping sets.
   - Supports two core operations efficiently:
     * find(x): return representative (parent) of the set containing element x.
     * union(x, y): merge sets containing x and y.
   - Often tracks extra metadata per set (size, min, max, rank, etc.).

2) DATA STRUCTURE COMPONENTS
   - parent[]: parent[i] stores parent pointer; root nodes are their own parent.
   - rank[] / size[]: heuristic to keep tree shallow (union by rank/size).
   - Path compression (during find): flatten tree to ensure near-constant time.

3) TIME COMPLEXITY
   - With both union by rank/size and path compression: O(α(n)) amortized per operation.
   - α(n) = inverse Ackermann function; grows extremely slow (< 5 for practical n).
   - Equivalent to almost constant time performance.

4) BASIC IMPLEMENTATION
   class DSU {
     constructor(n) {
       this.parent = Array.from({ length: n }, (_, i) => i);
       this.rank = Array(n).fill(0); // or size = Array(n).fill(1)
     }

     find(x) {
       if (this.parent[x] !== x) {
         this.parent[x] = this.find(this.parent[x]); // path compression
       }
       return this.parent[x];
     }

     union(x, y) {
       const rx = this.find(x);
       const ry = this.find(y);
       if (rx === ry) return false; // already connected
       if (this.rank[rx] < this.rank[ry]) {
         this.parent[rx] = ry;
       } else if (this.rank[rx] > this.rank[ry]) {
         this.parent[ry] = rx;
       } else {
         this.parent[ry] = rx;
         this.rank[rx]++;
       }
       return true;
     }
   }

5) USE CASES
   - Kruskal’s Minimum Spanning Tree algorithm (check connectivity, avoid cycles).
   - Connected Components detection (undirected graphs).
   - Cycle detection in undirected graphs.
   - Dynamic connectivity queries (online union operations).
   - Network/cluster merging (social networks, friend groups).
   - Image processing (connected-component labeling).
   - Percolation theory simulations.
   - Offline queries (e.g., union-find for answering queries backwards).
   - Grid/maze problems (detect connectivity, build spanning forest).

6) OPTIMIZATIONS / VARIANTS
   - Union by Rank vs Union by Size (rank approximates tree height).
   - Path compression (make each node point directly to root).
   - DSU with rollback (for backtracking, e.g., divide-and-conquer on queries).
   - Weighted DSU (store additional info per set like sum, min, max).
   - Persistent DSU (immutable set tracking—more complex).

7) PITFALLS
   - Must initialize parent[i] = i for all nodes.
   - Always call find() before union to ensure merging roots.
  - Avoid performing path compression if DSU with rollback.
   - For 1-indexed inputs, allocate arrays of size n+1.
   - DSU is typically for undirected problems; directed problems usually need other structures.

8) COMPLEXITY NOTES
   - m union/find operations on n elements cost O(m α(n)).
   - For n ≤ 10^18 (practical), α(n) ≤ 5 ⇒ treat as constant.
   - Without optimizations, worst-case can degrade to O(n) per operation.

9) REAL-WORLD USES
   - Networking (detecting loops, merging networks).
   - Version control systems (connected changesets).
   - Game development (grouping players/objects).
   - Physics simulations (percolation, cluster formation).
   - Machine learning (clustering heuristics).

10) WHEN NOT TO USE
   - When detailed structure of sets is required (e.g., sorted elements); DSU only tracks representative.
   - When deletions (splitting sets) are needed—standard DSU cannot split.

11) TESTING/DEBUGGING TIPS
   - Print parent array after operations to visualize structure.
   - Verify path compression by checking depth after repeated finds.
   - In contest problems, double-check 0-index vs 1-index.
*/

