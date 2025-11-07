/* Problem: ✅✅✅✅ Shortest Paths in Directed Acyclic Graph (DAG) ✅✅✅✅

Given a weighted Directed Acyclic Graph (DAG) and a source vertex, find shortest paths from
the source to all other vertices. Since the graph is acyclic, we can use topological sorting
to process vertices in dependency order and relax edges efficiently in O(V + E) time.

The problem requires:
- Find shortest paths from source to all vertices in DAG
- Use topological sorting + dynamic programming
- Relax edges in topological order
- Handle weighted edges
- O(V + E) time complexity

You are given a weighted directed acyclic graph with V vertices and E edges, and a source
vertex. Find the shortest distances from the source to all other vertices. If a vertex is
unreachable, its distance should be Infinity.

Example 1:
Input: Graph with edges: 0→1(1), 1→2(3), 2→3(4), 1→3(2), source = 0
Output: [0, 1, 4, 3]
Explanation:
- dist[0] = 0 (source)
- dist[1] = 1 (edge 0→1)
- dist[2] = 4 (path 0→1→2: 1+3=4)
- dist[3] = 3 (path 0→1→3: 1+2=3, shorter than 0→1→2→3: 8)

Example 2:
Input: Same graph, source = 1
Output: [Infinity, 0, 3, 2]
Explanation:
- dist[0] = Infinity (unreachable from 1)
- dist[1] = 0 (source)
- dist[2] = 3 (edge 1→2)
- dist[3] = 2 (edge 1→3, shorter than 1→2→3: 7)

Example 3:
Input: Graph with edges: 0→1(5), 0→2(3), 1→3(2), 2→3(1), source = 0
Output: [0, 5, 3, 4]
Explanation:
- dist[0] = 0 (source)
- dist[1] = 5 (edge 0→1)
- dist[2] = 3 (edge 0→2)
- dist[3] = 4 (path 0→2→3: 3+1=4, shorter than 0→1→3: 5+2=7)

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- -10^5 ≤ edge weight ≤ 10^5
- Graph is acyclic (DAG)

Expected Complexities:
Time Complexity: O(V + E) - topological sort + edge relaxation
Auxiliary Space: O(V) - for distance array and topological sort
*/

class DirectedWeightedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Adjacency list: each element is array of [vertex, weight] pairs
        for(let i = 0; i < V; i++){
            this.adj[i] = [];
        }
    }

    // ✅ TC = O(1)
    addEdge(from, to, weight){
        this.adj[from].push([to, weight]); // Store edge as [destination, weight] pair
    }

    // ✅ TC = O(V + E) - DFS-based topological sort
    topologicalSort(){
        const visited = new Array(this.V).fill(false);
        const stack = [];

        // Helper function for DFS
        const dfsHelper = (u) => {
            visited[u] = true;
            
            // Process all neighbors first
            for(let [v, weight] of this.adj[u]){
                if(!visited[v]){
                    dfsHelper(v);
                }
            }
            
            // Push vertex after processing all neighbors (post-order)
            stack.push(u);
        };

        // Perform DFS for all unvisited vertices
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){
                dfsHelper(i);
            }
        }

        // Reverse stack to get topological order
        return stack.reverse();
        // OR while(stack.length > 0){
        //     result.push(stack.pop());
        // }
        // return result;
    }

    // ✅ TC = O(V + E)
    // Using Topological Sorting
    shortestPathsOfEveryVertexFromSource(source){
        // 1. Initialize distances to Infinity
        let dist = new Array(this.V).fill(Infinity);
        dist[source] = 0; // Distance to source is 0

        // 2. ✅ Find topological sort of the graph
        const topoOrder = this.topologicalSort();

        // 3. ✅ Process vertices in topological order
        for(let u of topoOrder){
            // If distance to u is still Infinity, skip (unreachable from source)
            if(dist[u] !== Infinity){
                // Relax all edges from u
                for(let [v, weight] of this.adj[u]){
                    // ✅ Relaxation: if we found a shorter path to v through u
                    if(dist[v] > dist[u] + weight){
                        dist[v] = dist[u] + weight;
                    }
                }
            }
        }

        return dist;
    }
}

// Test cases
let g1 = new DirectedWeightedGraph(4);
g1.addEdge(0, 1, 1);
g1.addEdge(1, 2, 3);
g1.addEdge(2, 3, 4);
g1.addEdge(1, 3, 2);
console.log("Test 1:", g1.shortestPathsOfEveryVertexFromSource(0)); // [0, 1, 4, 3]
console.log("Test 2:", g1.shortestPathsOfEveryVertexFromSource(1)); // [Infinity, 0, 3, 2]

let g2 = new DirectedWeightedGraph(6);
g2.addEdge(0, 1, 2);
g2.addEdge(0, 4, 1);
g2.addEdge(1, 2, 3);
g2.addEdge(4, 2, 2);
g2.addEdge(4, 5, 4);
g2.addEdge(2, 3, 6);
g2.addEdge(5, 3, 1);
console.log("Test 3:", g2.shortestPathsOfEveryVertexFromSource(0)); // [0, 2, 3, 8, 1, 5]

/*🎯 CORE IDEA: Use topological sorting + dynamic programming to find shortest paths in DAG.
First, find topological order of vertices. Then, process vertices in topological order and
relax all outgoing edges. Since we process vertices in dependency order, when we relax edges
from a vertex, all paths to that vertex have already been considered, giving us shortest paths.

📋 STEP-BY-STEP FLOW:

1️⃣ DISTANCE INITIALIZATION:
   - Initialize distance array with Infinity
   - Set source distance to 0
   - Prepare for shortest path calculation
   - All vertices initially unreachable

2️⃣ TOPOLOGICAL SORTING:
   - Find topological order of graph
   - Ensures vertices processed in dependency order
   - No cycles, so ordering is valid
   - Use DFS-based topological sort

3️⃣ EDGE RELAXATION:
   - Process vertices in topological order
   - For each vertex, relax all outgoing edges
   - Update distances if shorter path found
   - Skip unreachable vertices (dist == Infinity)

4️⃣ RELAXATION LOGIC:
   - For edge u → v with weight w
   - If dist[v] > dist[u] + w, update dist[v]
   - This finds shortest path to v through u
   - Process in topological order ensures correctness

5️⃣ RESULT:
   - Distance array contains shortest distances
   - Infinity for unreachable vertices
   - Optimal shortest paths found
   - Return distance array

🧠 WHY THIS APPROACH?
- Topological order ensures dependencies processed first
- When processing vertex u, all paths to u already considered
- Edge relaxation finds shortest paths efficiently
- O(V + E) time complexity
- Optimal for DAG

💡 KEY INSIGHTS:
- Process vertices in topological order
- Relax edges only from reachable vertices
- Topological order ensures correct DP
- Each edge relaxed exactly once
- Optimal shortest paths guaranteed
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Shortest Paths in DAG

INPUT: Graph with edges: 0→1(1), 1→2(3), 2→3(4), 1→3(2), source = 0
EXPECTED OUTPUT: [0, 1, 4, 3]

Graph representation:
    0 --1--> 1 --2--> 3
              |        ^
              3        |
              |        4
              v        |
              2 -------|
              
Weight: 0→1=1, 1→2=3, 2→3=4, 1→3=2

🎯 GOAL: Find shortest paths from source 0!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Initialize Distances
dist = [0, Infinity, Infinity, Infinity]
- Source vertex 0 has distance 0
- All other vertices initially unreachable

STEP 2: Topological Sort
Topo order: [0, 1, 2, 3] (one valid ordering)

STEP 3: Process Vertices in Topological Order

Process vertex 0 (dist[0] = 0):
  Relax edges from 0:
    - 0 → 1 (weight 1): dist[1] = min(Infinity, 0+1) = 1
  dist = [0, 1, Infinity, Infinity]

Process vertex 1 (dist[1] = 1):
  Relax edges from 1:
    - 1 → 2 (weight 3): dist[2] = min(Infinity, 1+3) = 4
    - 1 → 3 (weight 2): dist[3] = min(Infinity, 1+2) = 3
  dist = [0, 1, 4, 3]

Process vertex 2 (dist[2] = 4):
  Relax edges from 2:
    - 2 → 3 (weight 4): dist[3] = min(3, 4+4) = 3 (no update)
  dist = [0, 1, 4, 3]

Process vertex 3 (dist[3] = 3):
  No outgoing edges
  dist = [0, 1, 4, 3]

🏆 FINAL RESULT: [0, 1, 4, 3]

Explanation:
- dist[0] = 0 (source)
- dist[1] = 1 (path 0→1)
- dist[2] = 4 (path 0→1→2: 1+3=4)
- dist[3] = 3 (path 0→1→3: 1+2=3, shorter than 0→1→2→3: 8)

─────────────────────────────────────────

📊 EXAMPLE 2: Different Source

INPUT: Same graph, source = 1
EXPECTED OUTPUT: [Infinity, 0, 3, 2]

PROCESS:

STEP 1: Initialize Distances
dist = [Infinity, 0, Infinity, Infinity]

STEP 2: Topological Sort
Topo order: [0, 1, 2, 3]

STEP 3: Process Vertices

Process vertex 0 (dist[0] = Infinity):
  Skip (unreachable from source 1)

Process vertex 1 (dist[1] = 0):
  Relax edges from 1:
    - 1 → 2 (weight 3): dist[2] = 3
    - 1 → 3 (weight 2): dist[3] = 2
  dist = [Infinity, 0, 3, 2]

Process vertex 2 (dist[2] = 3):
  Relax edges from 2:
    - 2 → 3 (weight 4): dist[3] = min(2, 3+4) = 2 (no update)

Process vertex 3 (dist[3] = 2):
  No outgoing edges

🏆 RESULT: [Infinity, 0, 3, 2]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

TOPOLOGICAL ORDER PROCESSING:

Graph: 0→1(1), 1→2(3), 2→3(4), 1→3(2)
Source: 0

Topo order: [0, 1, 2, 3]

Initial: [0, ∞, ∞, ∞]

After processing 0:
  Relax 0→1: [0, 1, ∞, ∞]

After processing 1:
  Relax 1→2: [0, 1, 4, ∞]
  Relax 1→3: [0, 1, 4, 3]

After processing 2:
  Relax 2→3: [0, 1, 4, 3] (no update)

After processing 3:
  No edges: [0, 1, 4, 3]

Final: [0, 1, 4, 3]

─────────────────────────────────────────

📊 WHY TOPOLOGICAL ORDER MATTERS:

PROPERTY:
- In topological order, if u comes before v, all paths to v go through vertices before v
- When processing vertex u, all paths to u have been considered
- Relaxing edges from u updates distances correctly
- Ensures optimal shortest paths

EXAMPLE:
Topo order: [0, 1, 2, 3]
- When processing 1, all paths to 1 (via 0) already considered
- When processing 2, all paths to 2 (via 1) already considered
- When processing 3, all paths to 3 (via 1 or 2) already considered

This ensures correctness!

─────────────────────────────────────────

📊 EDGE RELAXATION:

RELAXATION OPERATION:
For edge u → v with weight w:
  if dist[v] > dist[u] + w:
    dist[v] = dist[u] + w

MEANING:
- dist[u] is shortest distance to u (already computed)
- dist[u] + w is distance to v through u
- If this is shorter, update dist[v]
- Process in topological order ensures dist[u] is optimal

EXAMPLE:
Edge 1 → 3 with weight 2
- dist[1] = 1 (already computed)
- dist[1] + 2 = 3
- dist[3] = min(Infinity, 3) = 3

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Topological sort: O(V + E)
- Process vertices: O(V)
- Relax edges: O(E)
- Total: O(V + E)

SPACE COMPLEXITY:
- Distance array: O(V)
- Topological order: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ TOPOLOGICAL ORDER:
   - Ensures vertices processed in dependency order
   - When processing u, all paths to u considered
   - dist[u] is optimal when we relax edges from u
   - Critical for correctness

2️⃣ DYNAMIC PROGRAMMING:
   - dist[u] stores shortest distance to u
   - Relaxation updates distances optimally
   - Optimal substructure property
   - Correct shortest paths

3️⃣ EDGE RELAXATION:
   - Update distance if shorter path found
   - Process in topological order
   - Each edge relaxed exactly once
   - Efficient computation

4️⃣ INITIALIZATION:
   - Source distance = 0
   - Other distances = Infinity
   - Unreachable vertices remain Infinity
   - Correct base case

5️⃣ OPTIMALITY:
   - Topological order ensures optimality
   - All paths considered before relaxation
   - Shortest paths guaranteed
   - Optimal solution

💡 KEY INSIGHT:
Using topological sorting to process vertices in dependency order, then relaxing edges from
each vertex. Since we process vertices in topological order, when we relax edges from vertex u,
all paths to u have already been considered, ensuring dist[u] is optimal. This allows us to
find shortest paths in O(V + E) time!

🎯 TIME COMPLEXITY ANALYSIS:
- Topological sort: O(V + E)
- Process vertices: O(V)
- Relax edges: O(E)
- Total: O(V + E)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Distance array: O(V)
- Topological order: O(V)
- Adjacency list: O(V + E)
- Total: O(V + E)
- Linear in graph size

🎯 EDGE CASES:

CASE 1: Source with no outgoing edges
Input: Single vertex 0, source = 0
Process: dist[0] = 0, no edges to relax
Output: [0]

CASE 2: Vertex unreachable from source
Input: 0→1, 2→3, source = 0
Process: Vertices 2 and 3 unreachable
Output: [0, weight, Infinity, Infinity]

CASE 3: Multiple paths to same vertex
Input: 0→1(5), 0→2(3), 2→1(1), source = 0
Process: Relax both paths to 1, choose minimum
Output: [0, 4, 3, ...] (path 0→2→1 is shorter)

CASE 4: Linear graph
Input: 0→1(2), 1→2(3), 2→3(4), source = 0
Process: Process vertices in order, relax edges
Output: [0, 2, 5, 9]

CASE 5: Single edge
Input: 0→1(5), source = 0
Process: Relax edge 0→1
Output: [0, 5]

🎯 ALGORITHM CORRECTNESS:
- Finds shortest paths correctly: ✓
- Handles unreachable vertices: ✓
- Works for all DAG structures: ✓
- Optimal time complexity: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 108: Initialize distances
- Line 111: Get topological order
- Line 113-127: Process vertices in order
- Line 119: Skip unreachable vertices
- Line 123-127: Relax edges

🎯 EDGE RELAXATION OPERATION:

FOR EDGE U → V WITH WEIGHT W:
  if dist[v] > dist[u] + w:
    dist[v] = dist[u] + w

MEANING:
- dist[u]: shortest distance to u (already computed)
- dist[u] + w: distance to v through u
- Update if this is shorter
- Ensures optimal distances

This finds shortest paths!

🎯 TOPOLOGICAL ORDER REQUIREMENT:

WHY TOPOLOGICAL ORDER?

- Ensures dependencies processed first
- When processing u, dist[u] is optimal
- All paths to u already considered
- Relaxation from u is correct
- Optimal shortest paths

Without topological order:
- Might relax edges before paths computed
- Incorrect distances possible
- Need multiple passes

With topological order:
- Single pass sufficient
- Optimal distances guaranteed
- O(V + E) complexity

This ensures correctness!

🎯 ADVANTAGES:
- O(V + E) time complexity
- O(V + E) space complexity
- Optimal for DAG
- Single pass algorithm
- Handles negative weights

🎯 DISADVANTAGES:
- Only works for DAG
- Requires topological sort
- Cannot detect negative cycles
- Not suitable for cyclic graphs

🎯 REAL-WORLD APPLICATIONS:
- Project scheduling (critical path)
- Task dependencies
- Resource allocation
- Network routing
- Build system optimization
- Workflow management

🎯 RELATED PROBLEMS:
- Longest path in DAG
- Critical path method
- Topological sorting
- Shortest path (general graphs)
- Bellman-Ford algorithm
- Dijkstra's algorithm

🎯 TESTING STRATEGY:
- Single vertex
- Linear graphs
- Tree structures
- Complex DAGs
- Unreachable vertices
- Multiple paths
- Edge cases

🎯 DEBUGGING TIPS:
- Print topological order
- Trace distance updates
- Monitor edge relaxations
- Check distance array after each vertex
- Verify unreachable vertices

🎯 COMMON MISTAKES:
- Not using topological order
- Relaxing edges before distances computed
- Not initializing source distance
- Skipping unreachable vertices incorrectly
- Wrong relaxation condition

🎯 BEST PRACTICES:
- Always use topological order
- Initialize distances correctly
- Skip unreachable vertices
- Relax edges properly
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain topological order importance
- Walk through example step by step
- Discuss edge relaxation
- Analyze time/space complexity
- Compare with Dijkstra/Bellman-Ford
- Mention applications

🎯 TOPOLOGICAL ORDER RATIONALE:

PROPERTY:
If u appears before v in topological order, then:
- All paths to v go through vertices before v (including u)
- When processing v, all paths to v have been considered
- dist[v] can be computed optimally
- Edge relaxation from v updates correctly

This ensures optimal shortest paths!

🎯 RELAXATION LOGIC:

WHY RELAX IN TOPOLOGICAL ORDER?

When processing vertex u in topological order:
- All vertices before u have been processed
- All paths to u have been considered
- dist[u] is optimal
- Relaxing edges from u updates distances correctly
- Optimal shortest paths guaranteed

Example:
Topo order: [0, 1, 2, 3]
When processing 2:
- All paths to 2 (via 0, 1) considered
- dist[2] is optimal
- Relaxing 2→3 updates dist[3] correctly

This ensures correctness!

🎯 COMPARISON WITH ALTERNATIVES:

BELLMAN-FORD:
- Works for any graph (with negative weights)
- Time: O(VE)
- Detects negative cycles
- More general but slower

DIJKSTRA:
- Works for non-negative weights
- Time: O((V+E)log V)
- Greedy approach
- Faster but limited

DAG SHORTEST PATH:
- Works only for DAG
- Time: O(V + E)
- Uses topological order
- Fastest for DAG

🎯 NEGATIVE WEIGHTS:

HANDLING NEGATIVE WEIGHTS:
- Algorithm works with negative weights
- Topological order ensures correctness
- Relaxation handles negative weights
- No negative cycles possible (DAG)
- Optimal shortest paths

Example:
Edge 1 → 2 with weight -5
- dist[1] = 10
- Relax: dist[2] = min(Infinity, 10-5) = 5
- Negative weight handled correctly

🎯 CONCLUSION:
Finding shortest paths in DAG is efficiently achieved using topological sorting followed by
edge relaxation. Processing vertices in topological order ensures all paths to a vertex are
considered before relaxing its edges, guaranteeing optimal shortest paths. This provides
O(V + E) time complexity and O(V + E) space complexity, making it the optimal algorithm for
shortest paths in directed acyclic graphs!
*/
