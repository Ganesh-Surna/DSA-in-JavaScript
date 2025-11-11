/* Problem: ✅✅✅✅ Minimum Spanning Tree using Kruskal's Algorithm ✅✅✅✅

Given an undirected, connected, weighted graph with V vertices and E edges, find
a spanning tree (subset of edges connecting all vertices) with minimum possible
total weight. Kruskal's algorithm is a greedy approach that sorts edges by weight
and adds them one by one, skipping any edge that would create a cycle. A Disjoint
Set Union (Union-Find) data structure is used to detect cycles efficiently.

Key Requirements:
- Graph must be undirected and connected (if disconnected, Kruskal returns a minimum spanning forest).
- No self-loops or parallel edges required, but algorithm can handle them (if present, treat duplicates separately).
- MST contains exactly V - 1 edges when the graph is connected.
- Use Union-Find with path compression and union by rank for near O(α(V)) amortized operations.

Example:
Input: V = 5, edges = {(0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4)}
Output: MST edges = {(2,3,4), (0,3,5), (0,1,10)}; Total weight = 19
Explanation: Sorted edges: 4,5,6,10,15. We include 4 (connects 2-3), include 5 (connects 0-3), skip 6 (would form cycle 0-2-3-0), include 10 (connects 0-1). MST complete with 3 edges (V-1).

Constraints:
- 1 ≤ V ≤ 10^5 (or larger, depending on memory)
- 0 ≤ E ≤ 10^6
- Edge weights can be positive, zero, or negative (Kruskal works with any real weights)

Expected Complexities:
- Sorting edges: O(E log E)
- Union-Find operations: O(E α(V)) ≈ O(E)
- Overall: O(E log E)
- Space: O(E) for edge list + O(V) for DSU structures
*/

class DisjointSet {
    constructor(size) {
        this.parent = new Array(size);
        this.rank = new Array(size).fill(0);
        for (let i = 0; i < size; i++) this.parent[i] = i;
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // ✅ Path Compression
        }
        return this.parent[x];
    }

    union(x, y) { // ✅ Union by Rank
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX === rootY) return false; // ✅ already connected → adding causes cycle --> Return false

        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++; // rank changes only when ranks are equal
        }
        return true; // ✅ Return true if union is successful
    }
}

/**
 * Kruskal's MST algorithm (undirected, weighted graph)
 * @param {number} V - number of vertices labelled 0..V-1
 * @param {Array<{u:number,v:number,weight:number}>} edges - edge list
 * @returns {{mst:Array<{u:number,v:number,weight:number}>, totalWeight:number}}
 */

// ✅ TC = O(E log E) - Sorting edges
// ✅ SC = O(E+V) - Edge list + DSU structures
function kruskalMST(V, edges) {
    if (V <= 0) return { mst: [], totalWeight: 0 };

    // Step 1: sort edges by weight (ascending)
    const sortedEdges = edges.slice().sort((a, b) => a.weight - b.weight);

    // Step 2: initialise
    const dsu = new DisjointSet(V);
    const mst = [];
    let totalWeight = 0;

    // Step 3: iterate edges
    for (const edge of sortedEdges) {
        if (mst.length === V - 1) break; // MST complete
        const { u, v, weight } = edge;
        if (dsu.union(u, v)) { // ✅ If union is successful(i.e. no cycle), add the edge to the MST
            mst.push(edge);
            totalWeight += weight;
        }
    }

    return { mst, totalWeight };
}

// Testcases:
const vertices = 5;
const graphEdges = [
    { u: 0, v: 1, weight: 10 },
    { u: 0, v: 2, weight: 6 },
    { u: 0, v: 3, weight: 5 },
    { u: 1, v: 3, weight: 15 },
    { u: 2, v: 3, weight: 4 }
];

const { mst, totalWeight } = kruskalMST(vertices, graphEdges);
console.log("Kruskal's MST edges:", mst);
console.log("Total weight:", totalWeight);

/*🎯 CORE IDEA: Kruskal's algorithm builds the MST by considering edges in order of
their weight, adding edges that connect two different components and discarding
those that would form a cycle. It relies on the greedy choice that the globally
optimal MST can be built from locally optimal edge selections.

📋 STEP-BY-STEP FLOW:

1️⃣ SORT EDGES:
   - Arrange all edges by non-decreasing weight.

2️⃣ INITIALIZE DISJOINT SETS:
   - Each vertex starts in its own component.

3️⃣ ITERATE THROUGH EDGES:
   - For each edge (u, v):
     - If u and v are already in the same component, skip (would create a cycle).
     - Otherwise, add edge to MST and union the components.

4️⃣ STOP CONDITION:
   - Once MST contains V - 1 edges, terminate; MST complete.

🧠 WHY GREEDY WORKS:
- Cycle Property: For any cycle, the heaviest edge cannot be part of an MST; removing it yields a lighter spanning tree.
- Cut Property: For any cut in the graph, the lightest edge crossing the cut is part of some MST.
- Kruskal effectively chooses the lightest edge crossing currently disconnected components (cuts), ensuring optimality.

💡 KEY INSIGHTS:
- Sorting edges ensures we always consider the smallest available edge.
- Union-Find allows fast cycle detection; without it, cycle checks would be expensive.
- Works for sparse and dense graphs, though Prim's may outperform in dense graphs when using adjacency structures.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH (Sample Graph):

Graph:
Vertices: 0, 1, 2, 3, 4
Edges (u, v, w):
  (0,1,10), (0,2,6), (0,3,5), (1,3,15), (2,3,4)

STEP 1: Sort edges by weight:
  (2,3,4), (0,3,5), (0,2,6), (0,1,10), (1,3,15)

STEP 2: Initialize DSU: components = {0}, {1}, {2}, {3}, {4}

STEP 3: Process edges:
  - (2,3,4): find(2)=2, find(3)=3 → different → add edge, union(2,3)
  - (0,3,5): find(0)=0, find(3)=component of 3 (after union -> 2) → add edge, union(0,3)
  - (0,2,6): find(0)=component of 0 (after union -> 2), find(2)=component of 2 → same → skip (forms cycle)
  - (0,1,10): find(0)=component of 2, find(1)=1 → different → add edge, union(0,1)
  - MST has 3 edges (V-1) → stop

STEP 4: Result:
  MST edges: {(2,3,4), (0,3,5), (0,1,10)}
  Total weight: 4 + 5 + 10 = 19

📊 DSU STATE EVOLUTION:
  Initial: parent = [0,1,2,3,4]
  After (2,3): parent = [0,1,2,2,4]
  After (0,3): parent = [2,1,2,2,4]
  After (0,1): parent = [2,2,2,2,4]

Each union reduces the number of components until MST connects all vertices.
*/

/*🎯 COMPARISON: KRUSKAL vs PRIM's MST

KRUSKAL:
- Works with edge lists; ideal for sparse graphs.
- Sorting edges O(E log E) dominates.
- Uses DSU to ensure no cycles.
- Naturally handles disconnected graphs (returns minimum spanning forest).
- Simple to implement with global edge sorting.

PRIM:
- Works with adjacency structures; ideal for dense graphs when using binary heaps or Fibonacci heaps.
- Starts from a vertex and grows MST like Dijkstra's algorithm.
- Complexity O(E log V) with binary heap.
- Requires graph connectivity (or run per component).

When to choose which:
- Sparse graphs (E ≈ V): Kruskal often simpler and efficient.
- Dense graphs (E ≈ V^2): Prim can be faster due to adjacency/heap operations.
- Need MST forest for disconnected graph: Kruskal directly provides.
*/

/*🎯 TIME COMPLEXITY ANALYSIS:
- Sort edges: O(E log E)
- Union-Find operations: O(E α(V)) ≈ O(E) (α = inverse Ackermann)
- Total: O(E log E)

🎯 SPACE COMPLEXITY ANALYSIS:
- Edge storage: O(E)
- DSU arrays: O(V)
- MST storage: O(V)
*/

/*🎯 EDGE CASES:
- V = 0 or edges empty → MST empty
- Graph disconnected: returns minimum spanning forest (fewer than V-1 edges)
- Multiple edges between same vertices: algorithm picks smallest weight naturally
- Negative edge weights: handled without modification (still sort by weight)
- Self-loops: union finds same parent → skipped automatically
*/

/*🎯 ADVANTAGES:
- Simple greedy approach
- Works with any edge weight (including negative)
- Efficient with DSU
- Easily extended to produce MST forest

🎯 DISADVANTAGES:
- Requires sorting all edges (memory/time heavy for extremely dense graphs)
- DSU implementation needs careful optimization for large inputs

🎯 REAL-WORLD APPLICATIONS:
- Network design (minimum wiring cost)
- Electrical grid planning
- Clustering algorithms (Hierarchical clustering using MST)
- Image segmentation and computer vision (minimum spanning forest)
- Approximation algorithms (e.g., traveling salesman approximation)

🎯 RELATED PROBLEMS:
- Prim's MST algorithm
- Borůvka's algorithm
- Minimum spanning forest in disconnected graphs
- Cycle detection using DSU
- Union-Find applications (dynamic connectivity)
*/

/*🎯 TESTING STRATEGY:
- Small graphs with known MST
- Graph with multiple equal-weight MSTs
- Disconnected graph to ensure algorithm returns forest
- Graph with negative/zero weights
- Large random graphs for stress testing
*/

/*🎯 DEBUGGING TIPS:
- Print sorted edges to validate order
- Trace DSU parents during execution
- Verify MST size equals V-1 when graph is connected
- Ensure union returns false when cycle would form
*/

/*🎯 COMMON MISTAKES:
- Forgetting to copy edges before sorting (mutating original input unintentionally)
- Incorrect DSU implementation (missing path compression/union by rank)
- Not handling disconnected graphs (assuming MST has V-1 edges without checking)
- Adding edge weights without verifying union success
*/

/*🎯 BEST PRACTICES:
- Use `edges.slice()` to keep original edge list intact
- Implement DSU with both path compression and union by rank/size
- Break early when MST size reaches V-1
- Return both MST edges and total weight for flexibility
*/

/*🎯 INTERVIEW TIPS:
- Explain greedy reasoning (cut/cycle properties)
- Discuss DSU optimizations
- Compare with Prim's algorithm
- Walk through example graph
- Analyze complexities
- Mention handling of negative/disconnected graphs
*/

/*🎯 MST PATTERN SUMMARY (Kruskal):
1. Sort edges by weight.
2. Initialize DSU with each vertex as its own set.
3. Iterate edges; for each edge connecting different sets, add to MST and union sets.
4. Stop when MST has V-1 edges or when all edges processed.
*/
