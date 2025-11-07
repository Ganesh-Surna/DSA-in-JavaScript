/* Problem: ✅✅✅✅ Dijkstra's Shortest Path Algorithm (Matrix Representation) ✅✅✅✅

Given a weighted undirected graph represented as an adjacency matrix and a source
vertex, find the shortest distances from the source to all other vertices using
Dijkstra's algorithm. The graph contains non-negative edge weights.

Dijkstra's Algorithm:
- Greedy algorithm for finding shortest paths from a single source
- Works for graphs with non-negative edge weights
- Uses a "finalized set" to track vertices with confirmed shortest distances
- At each step, selects the vertex with minimum distance that hasn't been finalized
- Relaxes edges from the selected vertex to update distances

Key Requirements:
- Find shortest paths from source to all vertices
- Non-negative edge weights only
- Matrix representation (adjacency matrix)
- Return array of shortest distances

Example:
Input: graph = [[0, 4, 0, 0, 0, 0, 0, 8, 0],
                [4, 0, 8, 0, 0, 0, 0, 11, 0],
                [0, 8, 0, 7, 0, 4, 0, 0, 2],
                [0, 0, 7, 0, 9, 14, 0, 0, 0],
                [0, 0, 0, 9, 0, 10, 0, 0, 0],
                [0, 0, 4, 14, 10, 0, 2, 0, 0],
                [0, 0, 0, 0, 0, 2, 0, 1, 6],
                [8, 11, 0, 0, 0, 0, 1, 0, 7],
                [0, 0, 2, 0, 0, 0, 6, 7, 0]]
       source = 0

Output: [0, 4, 12, 19, 21, 11, 9, 8, 14]

Explanation:
Shortest distances from vertex 0:
- 0 → 0: 0
- 0 → 1: 4
- 0 → 2: 12 (via 0→1→2)
- 0 → 3: 19 (via 0→1→2→3)
- 0 → 4: 21 (via 0→7→6→5→4)
- 0 → 5: 11 (via 0→7→6→5)
- 0 → 6: 9 (via 0→7→6)
- 0 → 7: 8
- 0 → 8: 14 (via 0→7→8)

Constraints:
- 1 ≤ V ≤ 10^3
- Edge weights are non-negative
- graph[i][j] = 0 means no edge (or self-loop)
- graph[i][j] > 0 means edge weight

Expected Complexities:
Time Complexity: O(V²) - for each vertex, find minimum (O(V)) and relax edges (O(V))
Auxiliary Space: O(V) - for dist and finalizedSet arrays
*/

// Dijkstra's Algorithm - Matrix Representation (Naive Implementation)
// ✅ TC = O(V²) - for each vertex, linear search for minimum (O(V)) and relax edges (O(V))
// ✅ SC = O(V) - for dist and finalizedSet arrays
// ⚠️ Note: This is the naive implementation. For better performance with sparse graphs,
//          use adjacency list with min-heap (O(E log V))
function dijkstra(graph, source) {
  let V = graph.length; // Number of vertices

  // 1. Initialize distances: all infinite except source
  let dist = new Array(V).fill(Number.POSITIVE_INFINITY);
  dist[source] = 0; // Distance from source to itself is 0

  // 2. Track vertices with finalized shortest distances
  let finalisedSet = new Array(V).fill(false);

  // 3. Process all vertices (Need to run V times)
  for (let count = 0; count < V; count++) {
    // 4. Find vertex with minimum distance that hasn't been finalized
    let u = -1;
    for (let i = 0; i < V; i++) {
      if (!finalisedSet[i] && (u === -1 || dist[i] < dist[u])) {
        u = i; // Select vertex with minimum distance
      }
    }

    // 5. Finalize vertex u (shortest distance to u is confirmed)
    if(u !== -1) break; // No more reachable vertices
    finalisedSet[u] = true;

    // 6. Relax all edges from u to its neighbors
    for (let v = 0; v < V; v++) {
      // 7. If v is not finalized, there's an edge (u,v), and we found a shorter path
      if (!finalisedSet[v] && graph[u][v] !== 0 && dist[v] > dist[u] + graph[u][v]) {
            dist[v] = dist[u] + graph[u][v]; // Update shortest distance to v
      }
    }
  }

  return dist; // Return array of shortest distances from source
}

// Test cases
let graph1 = [
  [0, 4, 0, 0, 0, 0, 0, 8, 0],
  [4, 0, 8, 0, 0, 0, 0, 11, 0],
  [0, 8, 0, 7, 0, 4, 0, 0, 2],
  [0, 0, 7, 0, 9, 14, 0, 0, 0],
  [0, 0, 0, 9, 0, 10, 0, 0, 0],
  [0, 0, 4, 14, 10, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 2, 0, 1, 6],
  [8, 11, 0, 0, 0, 0, 1, 0, 7],
  [0, 0, 2, 0, 0, 0, 6, 7, 0]
];
console.log("Test 1:", dijkstra(graph1, 0)); 
// [0, 4, 12, 19, 21, 11, 9, 8, 14]

let graph2 = [
  [0, 1, 4, 0],
  [1, 0, 2, 5],
  [4, 2, 0, 1],
  [0, 5, 1, 0]
];
console.log("Test 2:", dijkstra(graph2, 0)); 
// [0, 1, 3, 4]

let graph3 = [
  [0, 2, 0],
  [2, 0, 3],
  [0, 3, 0]
];
console.log("Test 3:", dijkstra(graph3, 0)); 
// [0, 2, 5]

/*🎯 CORE IDEA: Use Dijkstra's greedy algorithm to find shortest paths from a source
vertex to all other vertices. At each step, select the vertex with minimum distance
that hasn't been finalized, finalize it, and relax all edges from it to update
distances. The algorithm guarantees shortest paths for graphs with non-negative
edge weights.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize dist array: all infinite except source (0)
   - Initialize finalizedSet: all false (no vertices finalized yet)

2️⃣ MAIN LOOP (V-1 iterations):
   - Find vertex u with minimum dist that isn't finalized
   - Finalize vertex u (shortest distance to u is confirmed)
   - Relax all edges from u:
     - For each neighbor v of u:
       - If dist[v] > dist[u] + weight(u,v):
         - Update dist[v] = dist[u] + weight(u,v)

3️⃣ RESULT:
   - Return dist array with shortest distances from source

🧠 WHY THIS APPROACH?
- Greedy algorithm: always selects vertex with minimum distance
- Finalized set ensures we don't revisit vertices
- Edge relaxation finds shorter paths
- Guarantees shortest paths for non-negative weights
- O(V²) time complexity for matrix representation

💡 KEY INSIGHTS:
- Greedy selection: minimum distance vertex
- Finalized set: tracks confirmed shortest distances
- Edge relaxation: updates distances when shorter path found
- Matrix representation: O(V²) time, simple implementation
- Non-negative weights: required for correctness
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Dijkstra's Algorithm

INPUT: graph = [[0, 4, 0, 0],
                [4, 0, 2, 5],
                [0, 2, 0, 1],
                [0, 5, 1, 0]]
       source = 0

EXPECTED OUTPUT: [0, 4, 6, 7]

🎯 GOAL: Find shortest distances from vertex 0 to all vertices!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
- dist = [0, ∞, ∞, ∞]
- finalizedSet = [false, false, false, false]
- V = 4

─────────────────────────────────────────

ITERATION 1 (count = 0):

Find minimum dist vertex (not finalized):
  u = 0 (dist[0] = 0 is minimum)

Finalize u = 0:
  finalizedSet[0] = true

Relax edges from 0:
  - graph[0][1] = 4 ≠ 0
    dist[1] = ∞ > 0 + 4 = 4
    → dist[1] = 4
  - graph[0][2] = 0 (no edge)
  - graph[0][3] = 0 (no edge)

After iteration 1:
  dist = [0, 4, ∞, ∞]
  finalizedSet = [true, false, false, false]

─────────────────────────────────────────

ITERATION 2 (count = 1):

Find minimum dist vertex (not finalized):
  dist[1] = 4, dist[2] = ∞, dist[3] = ∞
  u = 1 (dist[1] = 4 is minimum)

Finalize u = 1:
  finalizedSet[1] = true

Relax edges from 1:
  - graph[1][0] = 4, but finalized → Skip
  - graph[1][2] = 2 ≠ 0
    dist[2] = ∞ > 4 + 2 = 6
    → dist[2] = 6
  - graph[1][3] = 5 ≠ 0
    dist[3] = ∞ > 4 + 5 = 9
    → dist[3] = 9

After iteration 2:
  dist = [0, 4, 6, 9]
  finalizedSet = [true, true, false, false]

─────────────────────────────────────────

ITERATION 3 (count = 2):

Find minimum dist vertex (not finalized):
  dist[2] = 6, dist[3] = 9
  u = 2 (dist[2] = 6 is minimum)

Finalize u = 2:
  finalizedSet[2] = true

Relax edges from 2:
  - graph[2][0] = 0 → Skip
  - graph[2][1] = 2, but finalized → Skip
  - graph[2][3] = 1 ≠ 0
    dist[3] = 9 > 6 + 1 = 7
    → dist[3] = 7

After iteration 3:
  dist = [0, 4, 6, 7]
  finalizedSet = [true, true, true, false]

─────────────────────────────────────────

ITERATION 4 (count = 3):

Find minimum dist vertex (not finalized):
  dist[3] = 7
  u = 3

Finalize u = 3:
  finalizedSet[3] = true

Relax edges from 3:
  - All neighbors already finalized or no edge

After iteration 4:
  dist = [0, 4, 6, 7]
  finalizedSet = [true, true, true, true]

🏆 FINAL RESULT: [0, 4, 6, 7]
Shortest distances from vertex 0:
- 0 → 0: 0
- 0 → 1: 4 (direct edge)
- 0 → 2: 6 (via 0→1→2)
- 0 → 3: 7 (via 0→1→2→3)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DIJKSTRA'S ALGORITHM PROCESS:

Initial State:
  dist = [0, ∞, ∞, ∞]
  finalizedSet = [false, false, false, false]

After Iteration 1 (Finalize 0):
  dist = [0, 4, ∞, ∞]
  finalizedSet = [true, false, false, false]

After Iteration 2 (Finalize 1):
  dist = [0, 4, 6, 9]
  finalizedSet = [true, true, false, false]

After Iteration 3 (Finalize 2):
  dist = [0, 4, 6, 7]
  finalizedSet = [true, true, true, false]

After Iteration 4 (Finalize 3):
  dist = [0, 4, 6, 7]
  finalizedSet = [true, true, true, true]

─────────────────────────────────────────

📊 GREEDY SELECTION:

At each iteration, select vertex with minimum distance:
- Iteration 1: u = 0 (dist = 0)
- Iteration 2: u = 1 (dist = 4)
- Iteration 3: u = 2 (dist = 6)
- Iteration 4: u = 3 (dist = 7)

This greedy choice ensures shortest path!

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GREEDY CHOICE PROPERTY:
   - Always select vertex with minimum distance
   - Once finalized, distance is guaranteed shortest
   - Non-negative weights ensure correctness
   - Optimal substructure property

2️⃣ FINALIZED SET:
   - Tracks vertices with confirmed shortest distances
   - Once finalized, never updated again
   - Ensures we don't revisit vertices
   - Critical for correctness

3️⃣ EDGE RELAXATION:
   - Updates distances when shorter path found
   - Checks: dist[v] > dist[u] + weight(u,v)
   - Only relaxes edges from finalized vertices
   - Finds optimal paths

4️⃣ MATRIX REPRESENTATION:
   - Simple implementation
   - O(V²) time complexity
   - Linear search for minimum: O(V)
   - Relax all edges: O(V)
   - Good for dense graphs

5️⃣ CORRECTNESS:
   - Guarantees shortest paths for non-negative weights
   - Processes each vertex exactly once
   - Optimal distance calculation
   - Correct algorithm

💡 KEY INSIGHT:
Using Dijkstra's greedy algorithm where at each step we select the vertex with
minimum distance that hasn't been finalized, finalize it, and relax all edges
from it. The finalized set ensures we don't revisit vertices, and the greedy
choice guarantees shortest paths for graphs with non-negative edge weights.
Matrix representation gives O(V²) time complexity, making it suitable for
dense graphs!

🎯 TIME COMPLEXITY ANALYSIS:
- Main loop: V-1 iterations
- Find minimum: O(V) linear search per iteration
- Relax edges: O(V) check all vertices per iteration
- Total: O(V) × O(V) = O(V²)
- Optimal for dense graphs (E ≈ V²)

🎯 SPACE COMPLEXITY ANALYSIS:
- dist array: O(V)
- finalizedSet array: O(V)
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single Vertex
Input: graph = [[0]], source = 0
Process: No iterations needed
Output: [0]

CASE 2: Disconnected Graph
Input: graph = [[0, 0], [0, 0]], source = 0
Process: Only vertex 0 reachable
Output: [0, ∞]

CASE 3: Direct Edges Only
Input: graph = [[0, 1], [1, 0]], source = 0
Process: Direct edge to vertex 1
Output: [0, 1]

CASE 4: Multiple Paths
Input: graph with multiple paths to same vertex
Process: Algorithm finds shortest path
Output: Minimum distance

CASE 5: Self-Loops
Input: graph with self-loops (weight 0)
Process: Self-loops ignored (weight 0)
Output: Correct shortest distances

🎯 ALGORITHM CORRECTNESS:
- Finds shortest paths: ✓ (greedy property)
- Handles non-negative weights: ✓
- Processes all vertices: ✓
- Correct distance updates: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 66: Initialize dist array with infinity
- Line 67: Set source distance to 0
- Line 70: Initialize finalizedSet
- Line 73: Main loop (V-1 iterations)
- Line 76-80: Find minimum distance vertex
- Line 83: Finalize vertex
- Line 86-91: Relax edges from finalized vertex
- Line 94: Return shortest distances

🎯 DIJKSTRA'S ALGORITHM PROPERTIES:

GREEDY ALGORITHM:
- Makes locally optimal choice at each step
- Selects vertex with minimum distance
- Greedy choice leads to global optimum
- Works for non-negative weights

FINALIZED SET:
- Once finalized, distance is shortest
- Never updated again
- Ensures correctness
- Prevents revisiting

EDGE RELAXATION:
- Updates distances when shorter path found
- Condition: dist[v] > dist[u] + weight(u,v)
- Only from finalized vertices
- Finds optimal paths

─────────────────────────────────────────

🎯 MATRIX vs ADJACENCY LIST:

MATRIX REPRESENTATION (This Implementation):
- Time: O(V²)
- Space: O(V²) for matrix
- Find minimum: O(V) linear search
- Relax edges: O(V) check all vertices
- Good for: Dense graphs (E ≈ V²)

ADJACENCY LIST WITH HEAP:
- Time: O(E log V)
- Space: O(V + E)
- Find minimum: O(log V) heap extract
- Relax edges: O(E) total
- Good for: Sparse graphs (E << V²)

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(V²) time complexity
- Simple implementation
- Guarantees shortest paths
- Works for dense graphs
- Easy to understand

🎯 DISADVANTAGES:
- O(V²) time even for sparse graphs
- Linear search for minimum is slow
- Not optimal for sparse graphs
- Matrix representation uses more space

🎯 REAL-WORLD APPLICATIONS:
- GPS navigation (shortest routes)
- Network routing (shortest paths)
- Social networks (shortest connections)
- Game development (pathfinding)
- Transportation systems

🎯 RELATED PROBLEMS:
- Bellman-Ford (negative weights)
- Floyd-Warshall (all pairs)
- A* search (heuristic)
- Shortest path in DAG
- Minimum spanning tree

🎯 TESTING STRATEGY:
- Single vertex
- Disconnected graph
- Direct edges
- Multiple paths
- Self-loops
- Large graphs

🎯 DEBUGGING TIPS:
- Print dist array after each iteration
- Track finalized vertices
- Verify edge relaxation
- Check boundary conditions
- Monitor distance updates

🎯 COMMON MISTAKES:
- Not checking finalizedSet
- Wrong condition for edge relaxation
- Forgetting to initialize dist
- Incorrect minimum finding
- Not handling disconnected vertices

🎯 BEST PRACTICES:
- Always check finalizedSet
- Verify edge existence (weight ≠ 0)
- Initialize dist correctly
- Use clear variable names
- Handle edge cases

🎯 INTERVIEW TIPS:
- Explain greedy algorithm
- Describe finalized set
- Walk through example
- Discuss time/space complexity
- Mention matrix vs list trade-offs

🎯 DIJKSTRA'S ALGORITHM PATTERN:

INITIALIZATION:
  - Initialize dist: all ∞, source = 0
  - Initialize finalizedSet: all false

MAIN LOOP:
  - Find minimum dist vertex (not finalized)
  - Finalize vertex
  - Relax edges from finalized vertex

TERMINATION:
  - Process V-1 vertices
  - Return dist array

─────────────────────────────────────────

🎯 NON-NEGATIVE WEIGHTS REQUIREMENT:

WHY REQUIRED?
- Greedy choice assumes non-negative weights
- Negative weights can create cycles
- Algorithm may not terminate correctly
- Use Bellman-Ford for negative weights

EXAMPLE:
  Graph with negative cycle:
  0 → 1 (weight: 1)
  1 → 2 (weight: -2)
  2 → 0 (weight: 1)
  Cycle: 0→1→2→0 with total weight 0
  Dijkstra may not handle this correctly

─────────────────────────────────────────

🎯 CONCLUSION:
Dijkstra's algorithm using matrix representation finds shortest paths from a
source to all vertices using a greedy approach. At each step, it selects the
vertex with minimum distance that hasn't been finalized, finalizes it, and
relaxes all edges from it. The finalized set ensures correctness, and the
greedy choice guarantees shortest paths for graphs with non-negative edge
weights. This achieves O(V²) time and O(V) space complexity, making it suitable
for dense graphs!
*/
