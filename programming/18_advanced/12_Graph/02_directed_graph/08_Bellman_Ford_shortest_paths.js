/* Problem: ✅✅✅✅ Shortest Paths using Bellman-Ford Algorithm ✅✅✅✅

Given a directed weighted graph with possible negative edge weights and a source vertex, find
shortest paths from source to all vertices using Bellman-Ford algorithm. The algorithm can also
detect negative weight cycles.

The problem requires:
- Find shortest paths from source to all vertices
- Use Bellman-Ford algorithm (relax all edges V-1 times)
- Handle negative edge weights
- Detect negative weight cycles
- Return distances or report negative cycle

Example 1 (from image):
Input: Graph with edges: A→B(1), A→C(4), B→C(-3), B→D(2), C→D(3), source = A
Output: [0, 1, -2, 1]
Explanation:
- dist[A] = 0 (source)
- dist[B] = 1 (edge A→B)
- dist[C] = -2 (path A→B→C: 1+(-3)=-2)
- dist[D] = 1 (path A→B→C→D: 1+(-3)+3=1)

Example 2:
Input: Graph with negative cycle
Output: "Negative cycle detected!"

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- -10^5 ≤ edge weight ≤ 10^5
- Graph can have cycles
- Edge weights can be negative

Expected Complexities:
Time Complexity: O(V * E) - V-1 iterations × E edges
Auxiliary Space: O(V) - for distance array
*/

class DirectedWeightedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.edges = []; // Store all edges as [u, v, weight]
    }

    // ✅ TC = O(1)
    addEdge(from, to, weight){
        this.edges.push([from, to, weight]);
    }

    // ✅ TC = O(V * E)
    // ✅ SC = O(V)
    bellmanFord(source){
        // Step 1: Initialize distances to Infinity
        const dist = new Array(this.V).fill(Number.POSITIVE_INFINITY);
        dist[source] = 0;

        // Step 2: Relax all edges V-1 times
        for(let i = 0; i < this.V - 1; i++){
            for(let [u, v, weight] of this.edges){
                // Relaxation step: if we found a shorter path to v through u
                if(dist[u] !== Number.POSITIVE_INFINITY && dist[v] > dist[u] + weight){
                    dist[v] = dist[u] + weight;
                }
            }
        }

        // Step 3: Check for negative weight cycles
        for(let [u, v, weight] of this.edges){
            // If we can still relax an edge after V-1 iterations, negative cycle exists
            if(dist[u] !== Number.POSITIVE_INFINITY && 
               dist[v] > dist[u] + weight){
                return {
                    hasNegativeCycle: true,
                    message: "Negative weight cycle detected!"
                };
            }
        }

        return {
            hasNegativeCycle: false,
            distances: dist
        };
    }

    // ✅ TC = O(V + E)
    printGraph(){
        console.log("Graph (edge list):");
        this.edges.forEach(([u, v, w]) => {
            console.log(`  ${u} → ${v} (weight: ${w})`);
        });
    }
}

/*🎯 CORE IDEA: Bellman-Ford uses dynamic programming approach:
   - Relax all edges V-1 times
   - Each iteration may improve distances
   - After V-1 iterations, shortest paths should be found
   - If any edge can still be relaxed, negative cycle exists
   
   Key insight: Shortest path in a graph without negative cycles
   has at most V-1 edges. So V-1 relaxations are sufficient!
*/

// Test cases
console.log("=".repeat(70));
console.log("BELLMAN-FORD SHORTEST PATH ALGORITHM");
console.log("=".repeat(70));

// Example 1 from image: A(0)→B(1)→C(2)→D(3)
let g1 = new DirectedWeightedGraph(4);
g1.addEdge(0, 1, 1);   // A → B
g1.addEdge(0, 2, 4);   // A → C
g1.addEdge(1, 2, -3);  // B → C (negative weight!)
g1.addEdge(1, 3, 2);   // B → D
g1.addEdge(2, 3, 3);   // C → D

console.log("\nGraph 1 (with negative edge):");
g1.printGraph();
console.log("\nBellman-Ford from source 0:");
let result1 = g1.bellmanFord(0);
if(result1.hasNegativeCycle){
    console.log(result1.message);
} else {
    console.log("Distances:", result1.distances);
    console.log("Expected: [0, 1, -2, 1]");
}

// Example 2: Graph with negative cycle
let g2 = new DirectedWeightedGraph(4);
g2.addEdge(0, 1, 1);
g2.addEdge(1, 2, 2);
g2.addEdge(2, 3, 3);
g2.addEdge(3, 0, -7);  // Negative cycle: 0→1→2→3→0 = 1+2+3+(-7) = -1

console.log("\n\nGraph 2 (with negative cycle):");
g2.printGraph();
console.log("\nBellman-Ford from source 0:");
let result2 = g2.bellmanFord(0);
if(result2.hasNegativeCycle){
    console.log(result2.message);
    console.log("Expected: Negative cycle detected!");
} else {
    console.log("Distances:", result2.distances);
}

// Example 3: Simple graph without negative edges
let g3 = new DirectedWeightedGraph(5);
g3.addEdge(0, 1, 10);
g3.addEdge(0, 2, 3);
g3.addEdge(1, 2, 1);
g3.addEdge(1, 3, 2);
g3.addEdge(2, 1, 4);
g3.addEdge(2, 3, 8);
g3.addEdge(2, 4, 2);
g3.addEdge(3, 4, 7);
g3.addEdge(4, 3, 9);

console.log("\n\nGraph 3 (no negative edges, similar to Dijkstra):");
g3.printGraph();
console.log("\nBellman-Ford from source 0:");
let result3 = g3.bellmanFord(0);
if(result3.hasNegativeCycle){
    console.log(result3.message);
} else {
    console.log("Distances:", result3.distances);
}

/*🎯 BELLMAN-FORD VS DIJKSTRA COMPARISON:

════════════════════════════════════════════════════════════════════
                    BELLMAN-FORD       │       DIJKSTRA
════════════════════════════════════════════════════════════════════
TIME COMPLEXITY    O(V * E)            │  O(V²) or O(E log V)
───────────────────────────────────────────────────────────────────
SPACE COMPLEXITY   O(V)                │  O(V) or O(V + E)
───────────────────────────────────────────────────────────────────
NEGATIVE WEIGHTS   ✅ YES (works!)     │  ❌ NO (may fail)
───────────────────────────────────────────────────────────────────
NEGATIVE CYCLES    ✅ YES (detects)    │  ⚠️  May hang/infinite loop
───────────────────────────────────────────────────────────────────
GRAPH TYPE         Directed graphs     │  Any graph (directed/undirected)
───────────────────────────────────────────────────────────────────
APPROACH           Dynamic Programming │  Greedy Algorithm
───────────────────────────────────────────────────────────────────
GUARANTEE          Correct if no       │  Always correct for non-negative
                   negative cycles     │  weights
───────────────────────────────────────────────────────────────────
ITERATIONS         Exactly V-1 times   │  Until all vertices processed
───────────────────────────────────────────────────────────────────
EDGE PROCESSING    All edges every     │  Each vertex once
                   iteration           │
───────────────────────────────────────────────────────────────────
BEST FOR           Sparse graphs       │  Dense graphs without negative
                   with negative       │  weights
                   edges               │
────────────────────────────────═══════════════════════════════════

KEY DIFFERENCES:

1️⃣ HANDLING NEGATIVE WEIGHTS:
   Bellman-Ford: ✅ Handles negative weights correctly
   Dijkstra:     ❌ May give incorrect results with negative weights
   
   Example: Graph A→B(5), A→C(4), B→C(-3)
   - Dijkstra from A: dist[C] = 4 (incorrect, optimal is 5+(-3)=2)
   - Bellman-Ford from A: dist[C] = 2 (correct)

2️⃣ NEGATIVE CYCLE DETECTION:
   Bellman-Ford: ✅ Can detect negative cycles
   Dijkstra:     ❌ Cannot detect, may hang
   
   Bellman-Ford detects by checking if any edge can still
   be relaxed after V-1 iterations.

3️⃣ TIME COMPLEXITY:
   Bellman-Ford: O(V * E) - always, regardless of graph structure
   Dijkstra:     
   - O(V²) with arrays (dense graphs)
   - O(E log V) with priority queue (sparse graphs)
   
   For dense graphs (E ≈ V²), both are O(V³)
   For sparse graphs (E << V²), Dijkstra is faster

4️⃣ ITERATIONS:
   Bellman-Ford: Exactly V-1 iterations over all edges
   Dijkstra:     V iterations, but each vertex processed once
   
   Bellman-Ford: More redundant work but guarantees correctness
   Dijkstra:     More efficient but limited to non-negative weights

5️⃣ APPLICATIONS:
   Bellman-Ford:
   - Routing algorithms with negative costs
   - Currency exchange rate calculations
   - Detecting arbitrage opportunities
   - Distance-vector routing protocols
   
   Dijkstra:
   - GPS navigation systems
   - Network routing (with positive weights)
   - Social network shortest paths
   - Game development pathfinding

6️⃣ WHEN TO USE:
   Use Bellman-Ford when:
   - Graph has negative edge weights
   - Need to detect negative cycles
   - Graph is sparse (E << V²)
   
   Use Dijkstra when:
   - All edge weights are non-negative
   - Performance is critical
   - Graph is dense (E ≈ V²)
   - Working with directed or undirected graphs

───────────────────────────────────────────────────────────────────

🔍 DETAILED OPERATION: BELLMAN-FORD ALGORITHM

STEP-BY-STEP FOR EXAMPLE 1:
Graph: A(0)→B(1, 1), A(0)→C(2, 4), B(1)→C(2, -3), B(1)→D(3, 2), C(2)→D(3, 3)
Source: A (vertex 0)

INITIALIZATION:
dist = [0, ∞, ∞, ∞]

ITERATION 1 (V-1 = 3):
Process edges: A→B(1), A→C(4), B→C(-3), B→D(2), C→D(3)
  A→B: dist[0] != ∞, dist[1] > 0+1 → dist[1] = 1 ✓
  A→C: dist[0] != ∞, dist[2] > 0+4 → dist[2] = 4 ✓
  B→C: dist[1] != ∞, dist[2] > 1+(-3) = -2 → dist[2] = -2 ✓ (update!)
  B→D: dist[1] != ∞, dist[3] > 1+2 → dist[3] = 3 ✓
  C→D: dist[2] != ∞, dist[3] > -2+3 = 1 → dist[3] = 1 ✓ (update!)

After iteration 1: dist = [0, 1, -2, 1]

ITERATION 2:
  A→B: dist[1] already optimal
  A→C: dist[2] = -2 < 4, no update
  B→C: dist[2] already optimal
  B→D: dist[3] = 1 < 3, no update
  C→D: dist[3] already optimal

After iteration 2: dist = [0, 1, -2, 1] (unchanged)

ITERATION 3:
  No updates

Final: dist = [0, 1, -2, 1]
No negative cycle detected!

───────────────────────────────────────────────────────────────────

🔍 NEGATIVE CYCLE DETECTION:

A negative cycle is a cycle where sum of edge weights < 0.

After V-1 iterations, if we can still relax an edge, it means:
- We found a path with V or more edges that's shorter
- This violates the "shortest path has ≤ V-1 edges" property
- Therefore, a negative cycle must exist in the graph!

Example with negative cycle: 0→1(1), 1→2(2), 2→3(3), 3→0(-7)
Cycle weight: 1+2+3+(-7) = -1 (negative!)

After V-1 iterations, algorithm detects edge 3→0 can still be relaxed.
Result: "Negative cycle detected!"

───────────────────────────────────────────────────────────────────

🎯 OPTIMIZATION: EARLY TERMINATION

We can optimize Bellman-Ford by detecting when no updates occur:

for(let i = 0; i < this.V - 1; i++){
    let updated = false;
    for(let [u, v, weight] of this.edges){
        if(dist[u] !== Number.POSITIVE_INFINITY && 
           dist[v] > dist[u] + weight){
            dist[v] = dist[u] + weight;
            updated = true;
        }
    }
    if(!updated) break; // No changes, can stop early!
}

Worst case: Still O(V * E)
Best case: O(E) if no updates after first iteration
Average case: Better than V-1 iterations in practice

───────────────────────────────────────────────────────────────────

🎯 PRACTICAL COMPARISON:

Example Graph (sparse, with negative edges):
V = 1000, E = 2000

Bellman-Ford: 
- Time: O(1000 × 2000) = O(2M)
- Correct for any weights
- Can detect negative cycles

Dijkstra (with PQ):
- Time: O(2000 × log(1000)) ≈ O(20K)
- 100x faster!
- But WRONG if negative edges exist

If graph has only non-negative weights → Use Dijkstra!
If graph has negative weights → Must use Bellman-Ford!

───────────────────────────────────────────────────────────────────

🎯 REAL-WORLD EXAMPLES:

BELLMAN-FORD USE CASES:
1. Network routing with negative link costs
2. Currency arbitrage detection (negative cycle = infinite profit!)
3. Subsequence problems with negative weights
4. Distance-vector routing (RIP protocol)

DIJKSTRA USE CASES:
1. GPS navigation (all distances positive)
2. Web crawler priority queue (distances = priority)
3. Social media shortest connection paths
4. Game pathfinding (A* is based on Dijkstra)
5. Network shortest path routing

───────────────────────────────────────────────────────────────────

💡 MEMORY TRICK:
- Bellman-Ford: "Forgiving" algorithm - handles all edge types
- Dijkstra: "Strict" algorithm - perfect but limited scope
- Choose based on whether negative weights exist!

🎯 CONCLUSION:
Bellman-Ford and Dijkstra serve different purposes. Use Bellman-Ford
for graphs with negative weights or when negative cycle detection is
needed. Use Dijkstra for non-negative weights when performance matters.
Both are fundamental algorithms with different strengths!
*/

