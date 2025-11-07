/* Problem: ✅✅✅✅ Bridges (Cut Edges) in a Graph using DFS ✅✅✅✅

Given an undirected connected graph, find all bridges using DFS with Discovery Time and Low Value
concepts. A bridge (cut edge) is an edge whose removal increases the number of connected components.

Algorithm requirements (from images):
- Use DFS to find bridges
- Track Discovery Time (disc): Time when DFS reaches a vertex
- Track Low Value (low): Smallest discovery time reachable from a vertex
- Condition for bridge: For edge (u, v) in DFS tree, if low[v] > disc[u], then (u, v) is a bridge
- This means no back edge from v's subtree to ancestors of u
- Return list of all bridges

Example from images:
First image: Graph A-B, A-C, B-C, B-D, D-E
DFS starting from A: disc/low values shown
Bridges found: Based on low[v] > disc[u] condition

Second image: Graph A-B, A-C, B-C, C-D, D-E, D-F, E-F
DFS starting from C: disc/low values shown
Bridges found: C-D (low[D] = 4 > disc[C] = 2)

Key difference from Articulation Points:
- Bridges: low[v] > disc[u] (strictly greater)
- Articulation Points: low[v] >= disc[u] (greater than or equal)

Constraints:
- 1 ≤ V ≤ 10^4
- Graph is connected and undirected
- May have cycles

Expected Complexities:
Time Complexity: O(V + E) - single DFS pass
Auxiliary Space: O(V) - for disc, low, parent, and visited arrays
*/

class Graph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Adjacency list
        for(let i = 0; i < V; i++){
            this.adj[i] = [];
        }
    }

    // ✅ TC = O(1)
    addEdge(u, v){
        this.adj[u].push(v);
        this.adj[v].push(u); // Undirected graph
    }

    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" "));
        }
    }

    // ✅ TC = O(V + E) - Single DFS pass
    // ✅ SC = O(V) - disc, low, parent, visited arrays
    findBridges(){
        // Arrays to store discovery time, low value, and parent
        const disc = new Array(this.V).fill(-1); // Discovery time
        const low = new Array(this.V).fill(-1);  // Low value
        const parent = new Array(this.V).fill(-1); // Parent in DFS tree
        const bridges = []; // Store bridges as [u, v] pairs
        let time = 0; // Timer for discovery time

        // DFS helper function
        const dfs = (u, visited) => {
            visited[u] = true;
            disc[u] = low[u] = ++time; // Set discovery time and initialize low value

            // Process all neighbors
            for(let v of this.adj[u]){
                if(!visited[v]){
                    parent[v] = u;
                    dfs(v, visited);

                    // Update low value of u after processing v
                    low[u] = Math.min(low[u], low[v]);

                    // Bridge condition: low[v] > disc[u]
                    /* If low[v] > disc[u], then there's no back edge from v's subtree 
                    to any ancestor of u, making (u, v) a bridge */
                    if(low[v] > disc[u]){
                        // Edge (u, v) is a bridge
                        bridges.push([u, v]);
                    }
                }
                // Back edge case: update low value of u if v is not parent
                // (If v is already visited and not parent, then it is back edge)
                else if(v !== parent[u]){
                    low[u] = Math.min(low[u], disc[v]); // minimum of low[u] and disc[v] ✅✅ Here disc[v] is used because we are updating low[u] based on the discovery time of v
                }
            }
        };

        // Perform DFS for all connected components
        const visited = new Array(this.V).fill(false);
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){
                dfs(i, visited);
            }
        }

        return {
            bridges: bridges,
            discoveryTimes: disc,
            lowValues: low,
            parents: parent
        };
    }
}

/*🎯 CORE IDEA: Use DFS with Discovery Time and Low Value to find bridges.

   Discovery Time (disc[u]): Time when DFS first reaches vertex u
   Low Value (low[u]): Smallest discovery time reachable from u via tree edges and back edges
   
   Bridge Condition (from images): For edge (u, v) in DFS tree, 
   if low[v] > disc[u], then (u, v) is a bridge.
   
   Why? If low[v] > disc[u], it means:
   - No back edge from v's subtree reaches u or any ancestor of u
   - Removing edge (u, v) disconnects v's subtree from the rest of the graph
   - Therefore, (u, v) is a critical edge (bridge)
*/

// Test cases
console.log("=".repeat(70));
console.log("BRIDGES (CUT EDGES) IN A GRAPH USING DFS");
console.log("=".repeat(70));

// Example from first image: Graph with A(0), B(1), C(2), D(3), E(4)
// Edges: A-B, A-C, B-C, B-D, D-E
let g1 = new Graph(5);
g1.addEdge(0, 1); // A-B
g1.addEdge(0, 2); // A-C
g1.addEdge(1, 2); // B-C
g1.addEdge(1, 3); // B-D
g1.addEdge(3, 4); // D-E

console.log("\nGraph 1 (from first image):");
g1.printGraph();

console.log("\nFinding Bridges:");
let result1 = g1.findBridges();
console.log("\nDiscovery Times:", result1.discoveryTimes);
console.log("Low Values:     ", result1.lowValues);
console.log("Parents:        ", result1.parents);
console.log("\nBridges:", result1.bridges);
console.log("Expected: [[1, 3], [3, 4]] or [[3, 1], [4, 3]] (B-D and D-E are bridges)");

// Example from second image: Graph with A(0), B(1), C(2), D(3), E(4), F(5)
// Edges: A-B, A-C, B-C, C-D, D-E, D-F, E-F
let g2 = new Graph(6);
g2.addEdge(0, 1); // A-B
g2.addEdge(0, 2); // A-C
g2.addEdge(1, 2); // B-C
g2.addEdge(2, 3); // C-D (this is a bridge according to image!)
g2.addEdge(3, 4); // D-E
g2.addEdge(3, 5); // D-F
g2.addEdge(4, 5); // E-F

console.log("\n\n" + "=".repeat(70));
console.log("Graph 2 (from second image):");
g2.printGraph();

console.log("\nFinding Bridges:");
let result2 = g2.findBridges();
console.log("\nDiscovery Times:", result2.discoveryTimes);
console.log("Low Values:     ", result2.lowValues);
console.log("Parents:        ", result2.parents);
console.log("\nBridges:", result2.bridges);
console.log("Expected: [[2, 3]] (C-D is a bridge based on image: low[D]=4 > disc[C]=2)");

// Example: Graph without bridges (all edges are in cycles)
let g3 = new Graph(4);
g3.addEdge(0, 1);
g3.addEdge(0, 2);
g3.addEdge(0, 3);
g3.addEdge(1, 2);
g3.addEdge(1, 3);
g3.addEdge(2, 3);

console.log("\n\n" + "=".repeat(70));
console.log("Graph 3 (Complete graph - no bridges):");
g3.printGraph();

console.log("\nFinding Bridges:");
let result3 = g3.findBridges();
console.log("\nDiscovery Times:", result3.discoveryTimes);
console.log("Low Values:     ", result3.lowValues);
console.log("\nBridges:", result3.bridges);
console.log("Expected: [] (no bridges, all edges are in cycles)");

// Example: Tree (all edges are bridges)
let g4 = new Graph(5);
g4.addEdge(0, 1);
g4.addEdge(1, 2);
g4.addEdge(1, 3);
g4.addEdge(0, 4);

console.log("\n\n" + "=".repeat(70));
console.log("Graph 4 (Tree structure - all edges are bridges):");
g4.printGraph();

console.log("\nFinding Bridges:");
let result4 = g4.findBridges();
console.log("\nDiscovery Times:", result4.discoveryTimes);
console.log("Low Values:     ", result4.lowValues);
console.log("Parents:        ", result4.parents);
console.log("\nBridges:", result4.bridges);
console.log("Expected: [[0, 1], [1, 2], [1, 3], [0, 4]] (all edges are bridges in a tree)");

// Example: Linear chain
let g5 = new Graph(4);
g5.addEdge(0, 1);
g5.addEdge(1, 2);
g5.addEdge(2, 3);

console.log("\n\n" + "=".repeat(70));
console.log("Graph 5 (Linear chain):");
g5.printGraph();

console.log("\nFinding Bridges:");
let result5 = g5.findBridges();
console.log("\nDiscovery Times:", result5.discoveryTimes);
console.log("Low Values:     ", result5.lowValues);
console.log("\nBridges:", result5.bridges);
console.log("Expected: All edges are bridges [[0, 1], [1, 2], [2, 3]]");

/*🎯 DETAILED ALGORITHM EXPLANATION:

📋 BRIDGE CONDITION: low[v] > disc[u]

For an edge (u, v) in the DFS tree:
- If low[v] > disc[u]: Edge (u, v) is a BRIDGE
- If low[v] <= disc[u]: Edge (u, v) is NOT a bridge (back edge provides alternative path)

Why low[v] > disc[u] means bridge?
- low[v] > disc[u] means v's subtree cannot reach u or any ancestor of u
- Removing (u, v) disconnects v's subtree from rest of graph
- No alternative path exists

Why low[v] <= disc[u] means NOT a bridge?
- low[v] <= disc[u] means there's a back edge from v's subtree to u or earlier
- Alternative path exists, so removing (u, v) doesn't disconnect graph

───────────────────────────────────────────────────────────────────

🔍 STEP-BY-STEP EXAMPLE (Graph 2 from second image):

Graph: A(0)-B(1), A(0)-C(2), B(1)-C(2), C(2)-D(3), D(3)-E(4), D(3)-F(5), E(4)-F(5)
Start DFS from C (vertex 2)

DFS Traversal from C:
C(2) → A(0) → B(1) → (back edge B→C)
C(2) → D(3) → E(4) → F(5) → (back edge F→D)

Discovery Times:
disc[C] = 1, disc[A] = 2, disc[B] = 3, disc[D] = 4, disc[E] = 5, disc[F] = 6

Low Values (propagating from leaves):
- F: no children, back edge to D (disc[D]=4) → low[F] = min(disc[F]=6, disc[D]=4) = 4
- E: child F, back edge from F to D → low[E] = min(low[F]=4, disc[E]=5) = 4
- D: children E, F, back edge from F → low[D] = min(low[E]=4, low[F]=4, disc[D]=4) = 4
- B: no children, back edge to C (disc[C]=1) → low[B] = min(disc[B]=3, disc[C]=1) = 1
- A: child B → low[A] = min(low[B]=1, disc[A]=2) = 1
- C: children A, D
  * For child A: low[A] = 1 <= disc[C] = 1 → NOT a bridge
  * For child D: low[D] = 4 > disc[C] = 1 → BRIDGE! ✓

Bridges: [[C, D]] or [[2, 3]]

This matches the second image where C-D is marked as a bridge!

───────────────────────────────────────────────────────────────────

🔍 COMPARISON: BRIDGES VS ARTICULATION POINTS:

CONDITION:
- Bridges:     low[v] > disc[u]  (strictly greater)
- Articulation: low[v] >= disc[u] (greater than or equal)

WHY THE DIFFERENCE?

For a vertex u:
- If low[v] >= disc[u]: Removing u disconnects v's subtree
- Equals case: u might still connect via another path, but vertex removal matters

For an edge (u, v):
- If low[v] > disc[u]: Removing edge disconnects v's subtree
- Equals case: low[v] == disc[u] means v can reach u via back edge
  * Edge (u, v) has alternative path → NOT a bridge
  * But vertex u removal still disconnects → u IS articulation point

Example: 
- Edge where low[v] == disc[u]: v can reach u, so edge is NOT a bridge
- But removing vertex u still disconnects graph, so u IS an articulation point

───────────────────────────────────────────────────────────────────

💡 KEY INSIGHTS:

1. Bridges are edges that disconnect the graph
2. low[v] > disc[u] means no path from v to u's ancestors
3. One DFS pass is sufficient: O(V + E) time
4. Algorithm similar to articulation points, but with > instead of >=
5. All tree edges in a spanning tree are bridges
6. Edges in cycles are NOT bridges

───────────────────────────────────────────────────────────────────

🎯 COMPLEXITY ANALYSIS:

TIME COMPLEXITY: O(V + E)
- Single DFS traversal: O(V + E)
- Each edge processed once
- Each vertex visited once

SPACE COMPLEXITY: O(V)
- disc array: O(V)
- low array: O(V)
- parent array: O(V)
- visited array: O(V)
- Recursion stack: O(V) worst case
- bridges array: O(E) in worst case (tree has V-1 bridges)
- Total: O(V + E) space

───────────────────────────────────────────────────────────────────

🎯 APPLICATIONS:

1. Network design: Identify critical links
2. Connectivity analysis: Find vulnerable connections
3. Transportation: Identify critical routes
4. Social networks: Find weak connections
5. Graph decomposition: Find 2-edge-connected components

───────────────────────────────────────────────────────────────────

🎯 RELATED CONCEPTS:

Bridge (Cut Edge):
- Edge whose removal increases number of components
- Condition: low[v] > disc[u] for tree edge (u, v)

Articulation Point (Cut Vertex):
- Vertex whose removal increases number of components
- Condition: low[v] >= disc[u] for child v of u

2-Edge-Connected Component:
- Maximal set of edges where no edge is a bridge
- Graph without bridges is 2-edge-connected

2-Vertex-Connected Component:
- Maximal set of vertices where no vertex is an articulation point
- Graph without articulation points is 2-vertex-connected (biconnected)

───────────────────────────────────────────────────────────────────

🎯 EDGE CASES:

1. Single edge: That edge is a bridge
2. Tree: All edges are bridges
3. Cycle: No bridges (all edges in cycle)
4. Complete graph: No bridges (all edges in triangles)
5. Disconnected: Find bridges in each component separately

───────────────────────────────────────────────────────────────────

🎯 TESTING STRATEGY:

Test with:
- Small graphs (3-7 vertices)
- Different DFS starting points (bridges are independent of start)
- Graphs with cycles
- Trees (all edges should be bridges)
- Complete graphs (no bridges)
- Graphs with back edges in various positions

───────────────────────────────────────────────────────────────────

🎯 COMMON MISTAKES:

1. Using >= instead of > for bridge condition
2. Not updating low correctly for back edges
3. Confusing tree edges with back edges
4. Including back edges as bridges
5. Missing bridges due to wrong low calculation

───────────────────────────────────────────────────────────────────

💡 DEBUGGING TIPS:

1. Print disc, low, and parent arrays
2. Visualize DFS tree structure
3. Trace low value propagation
4. Check back edges carefully
5. Verify bridge condition: low[v] > disc[u]
6. Use small examples to trace execution

───────────────────────────────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Lines 69-103: Main DFS logic
Line 72: Update disc and low when discovered
Line 81: Update low from child
Line 84-86: Bridge condition check (low[v] > disc[u])
Line 90-92: Back edge processing

Key insight: Only check bridge condition for tree edges (when !visited[v])!

───────────────────────────────────────────────────────────────────

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE: For each edge, remove it and count components
- Time: O(E * (V + E)) - O(V + E) per edge
- Simple but inefficient

DFS APPROACH: One pass with disc and low values
- Time: O(V + E) - optimal!
- More complex but efficient

For large graphs, DFS approach is much faster!

───────────────────────────────────────────────────────────────────

🎯 VISUALIZATION FROM IMAGES:

First Image (Graph A-B, A-C, B-C, B-D, D-E):
- DFS tree shows disc/low values
- Condition: low[V] > disc[U] identifies bridges
- Bridges marked with checkmarks

Second Image (Graph with C-D bridge):
- C has disc=2, low=1
- D has disc=4, low=4
- C-D: low[D]=4 > disc[C]=2 → BRIDGE ✓
- Marked with checkmark

───────────────────────────────────────────────────────────────────

🎯 CONCLUSION:

Finding bridges using DFS with Discovery Time and Low Value is an elegant
algorithm that takes O(V + E) time. The key condition low[v] > disc[u] 
identifies edges whose removal disconnects the graph. This is similar to
finding articulation points but uses strict inequality instead of >=,
reflecting that edges need alternative paths to not be bridges!
*/

