/* Problem: ✅✅✅✅ Minimum Spanning Tree using Prim's Algorithm (Matrix Representation) ✅✅✅✅

Given a connected, undirected, weighted graph represented as an adjacency matrix, find the 
Minimum Spanning Tree (MST) using Prim's algorithm.
A Minimum Spanning Tree connects all vertices with minimum total edge weight.

The problem requires:
- Find MST of a weighted undirected graph
- Graph represented as adjacency matrix
- Use Prim's algorithm (greedy approach)
- Two-set approach: "In MST" and "Not Yet in MST"
- Return total weight and edges in MST

Example 1 (from image):
Input: Graph matrix representation with edges: A-B(5), A-C(8), B-C(10), B-D(15), C-D(20)
Output: MST Weight: 28, Edges: [(A,B,5), (A,C,8), (B,D,15)]
Explanation: 
- Start with A in MST
- Add B (edge A-B with weight 5)
- Add C (edge A-C with weight 8)
- Add D (edge B-D with weight 15)
- Total weight: 5 + 8 + 15 = 28

Example 2:
Input: Graph with 3 vertices, edges: 0-1(10), 1-2(20), 0-2(30)
Output: MST Weight: 30, Edges: [(0,1,10), (1,2,20)]
Explanation:
- MST connects all vertices with minimum total weight

Constraints:
- 1 ≤ V ≤ 10^4
- V-1 ≤ E ≤ 10^5
- Graph is connected and undirected
- Edge weights can be negative, zero, or positive
- Matrix representation: graph[i][j] = weight if edge exists, 0 or Infinity otherwise

Expected Complexities:
Time Complexity: O(V²) - using arrays with matrix representation
Auxiliary Space: O(V²) - for adjacency matrix, plus O(V) for key, parent, mstSet arrays
*/

/*🎯 Simple function-based approach (as per image)
   
   This version matches the pseudocode in the image exactly:
   1. Initialize key array with Infinity, mSet with false
   2. Start with vertex 0 (key[0] = 0)
   3. For each iteration:
      - Find minimum key vertex not in MST
      - Add it to MST
      - Update keys of adjacent vertices
   4. Return total MST weight

   Trace from image for graph: 0-1(5), 0-2(8), 1-2(10), 1-3(15), 2-3(20)
   
   count=0: u=0, key=[0,5,8,∞], mSet=[T,F,F,F], res=0
   count=1: u=1, key=[0,5,8,15], mSet=[T,T,F,F], res=5
   count=2: u=2, key=[0,5,8,15], mSet=[T,T,T,F], res=13
   count=3: u=3, key=[0,5,8,15], mSet=[T,T,T,T], res=28
   
   Final result: 28
*/
// ✅ TC = O(V²)
// ✅ SC = O(V)
function primMST(graph){
    let V = graph.length;
    
    // 1. Initialize arrays
    let key = new Array(V).fill(Number.POSITIVE_INFINITY); // Key values for minimum edge weight
    let mSet = new Array(V).fill(false); // Track vertices in MST
    const parent = new Array(V).fill(-1); // Array to store MST
    
    // 2. Start with vertex 0
    key[0] = 0;
    parent[0] = -1;
    let res = 0; // Total MST weight
    
    // 3. Find MST
    for(let count = 0; count < V; count++){
        // Find the minimum key vertex from vertices not in MST
        let u = -1;
        for(let i = 0; i < V; i++){
            if(mSet[i] === false && (u === -1 || key[i] < key[u])){
                u = i;
            }
        }
        
        // Add u to MST
        mSet[u] = true;
        res += key[u]; // Add edge weight to result
        
        // Update keys of adjacent vertices
        for(let v = 0; v < V; v++){
            // If v is not in MST and edge exists (g[u][v] != 0) and weight is smaller
            if(mSet[v] === false && graph[u][v] !== 0 && graph[u][v] < key[v]){
                key[v] = graph[u][v];
                parent[v] = u
            }
        }
    }

    // 4. Construct and return MST
    const mstEdges = [];
    let totalWeight = 0;

    for(let i = 1; i < V; i++){ // Start from 1, as parent[0] = -1
        mstEdges.push([parent[i], i, key[i]]); // [V1, V2, Weight(V1, V2)]
        totalWeight += key[i];
    }

    return {
        edges: mstEdges,
        totalWeight: totalWeight
    };
}



class WeightedUndirectedGraphMatrix2{
    constructor(V){
        this.V = V; // Number of vertices
        // Initialize adjacency matrix with Infinity (no edge) or 0 (no self-loops)
        this.graph = new Array(V);
        for(let i = 0; i < V; i++){
            this.graph[i] = new Array(V).fill(Infinity);
            this.graph[i][i] = 0; // Self-loops have weight 0 (optional)
        }
    }

    // ✅ TC = O(1)
    addEdge(u, v, weight){
        // Add edge in both directions for undirected graph (symmetric matrix)
        this.graph[u][v] = weight;
        this.graph[v][u] = weight;
    }

    // ✅ TC = O(V²) - Matrix-based approach
    // ✅ SC = O(V²) - Matrix, plus O(V) for key, parent, mstSet arrays
    primsMST(){
        // 1. Initialize arrays
        const key = new Array(this.V).fill(Infinity); // Key values used to pick minimum weight edge
        const parent = new Array(this.V).fill(-1); // Array to store MST
        const mstSet = new Array(this.V).fill(false); // Track vertices included in MST

        // 2. Start with vertex 0
        key[0] = 0; // Make key 0 so that this vertex is picked first
        parent[0] = -1; // First node is always root of MST

        // 3. Find MST
        for(let count = 0; count < this.V - 1; count++){
            // Pick the minimum key vertex from the set of vertices not yet included in MST
            let u = this.minKey(key, mstSet);

            // Add the picked vertex to the MST Set
            mstSet[u] = true;

            // Update key value and parent index of adjacent vertices
            // Consider only those vertices which are not yet included in MST
            // Iterate through all vertices (matrix representation)
            for(let v = 0; v < this.V; v++){
                // Check if edge exists (graph[u][v] != Infinity) and v is not in MST
                // and weight(u,v) is smaller than current key[v]
                if(!mstSet[v] && 
                   this.graph[u][v] !== Infinity && 
                   this.graph[u][v] !== 0 && 
                   this.graph[u][v] < key[v]){
                    parent[v] = u;
                    key[v] = this.graph[u][v];
                }
            }
        }

        // 4. Construct and return MST
        const mstEdges = [];
        let totalWeight = 0;

        for(let i = 1; i < this.V; i++){ // Start from 1, as parent[0] = -1
            mstEdges.push([parent[i], i, key[i]]);
            totalWeight += key[i];
        }

        return {
            edges: mstEdges,
            totalWeight: totalWeight
        };
    }

    // Helper function to find vertex with minimum key value from vertices not yet included in MST
    // ✅ TC = O(V)
    minKey(key, mstSet){
        let min = Infinity;
        let minIndex = -1;

        for(let v = 0; v < this.V; v++){
            if(!mstSet[v] && key[v] < min){
                min = key[v];
                minIndex = v;
            }
        }

        return minIndex;
    }

    // ✅ TC = O(V²)
    printMatrix(){
        console.log("Adjacency Matrix:");
        // Print header
        let header = "   ";
        for(let i = 0; i < this.V; i++){
            header += `${i.toString().padStart(3)} `;
        }
        console.log(header);
        
        // Print rows
        for(let i = 0; i < this.V; i++){
            let row = `${i}: `;
            for(let j = 0; j < this.V; j++){
                if(this.graph[i][j] === Infinity){
                    row += "∞  ";
                } else {
                    row += `${this.graph[i][j].toString().padStart(2)} `;
                }
            }
            console.log(row);
        }
    }

    // ✅ TC = O(V²)
    printGraph(){
        console.log("Graph Representation:");
        for(let i = 0; i < this.V; i++){
            let edges = [];
            for(let j = 0; j < this.V; j++){
                if(this.graph[i][j] !== Infinity && this.graph[i][j] !== 0 && i < j){
                    // Only print once for undirected graph (i < j to avoid duplicates)
                    edges.push(`${i}-${j}(${this.graph[i][j]})`);
                }
            }
            if(edges.length > 0){
                console.log(`Vertex ${i}: ${edges.join(", ")}`);
            }
        }
    }
}

// Test cases
let graph1 = [
    [0, 5, 8, 0],
    [5, 0, 10, 15],
    [8, 10, 0, 20],
    [0, 15, 20, 0]
];
console.log("Test 1:", primMST(graph1)); // {edges: [[0,1,5], [0,2,8], [1,3,15]], totalWeight: 28}

let g1 = new WeightedUndirectedGraphMatrix2(4);
g1.addEdge(0, 1, 5);
g1.addEdge(0, 2, 8);
g1.addEdge(1, 2, 10);
g1.addEdge(1, 3, 15);
g1.addEdge(2, 3, 20);
console.log("Test 2:", g1.primsMST()); // {edges: [[0,1,5], [0,2,8], [1,3,15]], totalWeight: 28}

let g2 = new WeightedUndirectedGraphMatrix2(3);
g2.addEdge(0, 1, 10);
g2.addEdge(1, 2, 20);
g2.addEdge(0, 2, 30);
console.log("Test 3:", g2.primsMST()); // {edges: [[0,1,10], [1,2,20]], totalWeight: 30}

/*🎯 CORE IDEA: Use Prim's algorithm (greedy approach) with matrix representation to find MST.
Maintain two sets: vertices in MST and vertices not yet in MST. Start with vertex 0, and at
each step, find the vertex with minimum key value (minimum edge weight) not in MST, add it
to MST, and update keys of adjacent vertices. The key array stores minimum edge weight to
reach each vertex from the current MST.

📋 STEP-BY-STEP FLOW:

1️⃣ ARRAY INITIALIZATION:
   - Initialize key array with Infinity (except source = 0)
   - Initialize mstSet array with false (no vertices in MST)
   - Initialize parent array to store MST edges
   - Prepare for greedy selection

2️⃣ GREEDY SELECTION:
   - Start with vertex 0 (key[0] = 0)
   - For V-1 iterations (need V-1 edges):
     - Find vertex with minimum key not in MST
     - Add it to MST (mstSet[u] = true)
     - Add its key to total weight

3️⃣ KEY UPDATES:
   - For newly added vertex u
   - Check all adjacent vertices v
   - If v not in MST and edge(u,v) < key[v]:
     - Update key[v] = edge(u,v)
     - Update parent[v] = u
   - Maintain minimum edge weights

4️⃣ MST CONSTRUCTION:
   - After V-1 iterations, MST is complete
   - Use parent array to construct MST edges
   - Calculate total weight from keys
   - Return MST edges and total weight

5️⃣ RESULT:
   - MST edges: [parent, vertex, weight] for each edge
   - Total weight: sum of all edge weights
   - Optimal MST found
   - Return result

🧠 WHY THIS APPROACH?
- Greedy algorithm ensures optimal MST
- Matrix representation for dense graphs
- O(V²) time complexity
- Simple implementation
- Handles all graph types

💡 KEY INSIGHTS:
- Key array stores minimum edge weight to each vertex
- Always pick vertex with minimum key (greedy choice)
- Update keys when adding new vertex to MST
- Matrix representation allows O(1) edge access
- V-1 iterations for V-1 edges in MST
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Prim's MST Algorithm

INPUT: Graph matrix with edges: 0-1(5), 0-2(8), 1-2(10), 1-3(15), 2-3(20)
EXPECTED OUTPUT: Total Weight: 28, Edges: [(0,1,5), (0,2,8), (1,3,15)]

Graph representation:
    0 --5-- 1
    |      / \
    8    10  15
    |   /     \
    2 -------- 3
        20

🎯 GOAL: Find Minimum Spanning Tree!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
key = [0, Infinity, Infinity, Infinity]
mstSet = [false, false, false, false]
parent = [-1, -1, -1, -1]
totalWeight = 0

ITERATION 1 (count = 0):
Find min key: u = 0 (key[0] = 0)
Add to MST: mstSet[0] = true
totalWeight += key[0] = 0
Update keys from vertex 0:
  - 0 → 1: key[1] = min(Infinity, 5) = 5, parent[1] = 0
  - 0 → 2: key[2] = min(Infinity, 8) = 8, parent[2] = 0
key = [0, 5, 8, Infinity]
mstSet = [true, false, false, false]

ITERATION 2 (count = 1):
Find min key: u = 1 (key[1] = 5, minimum)
Add to MST: mstSet[1] = true
totalWeight += key[1] = 5
Update keys from vertex 1:
  - 1 → 2: key[2] = min(8, 10) = 8 (no update, 8 < 10)
  - 1 → 3: key[3] = min(Infinity, 15) = 15, parent[3] = 1
key = [0, 5, 8, 15]
mstSet = [true, true, false, false]

ITERATION 3 (count = 2):
Find min key: u = 2 (key[2] = 8, minimum)
Add to MST: mstSet[2] = true
totalWeight += key[2] = 13
Update keys from vertex 2:
  - 2 → 3: key[3] = min(15, 20) = 15 (no update, 15 < 20)
key = [0, 5, 8, 15]
mstSet = [true, true, true, false]

ITERATION 4 (count = 3):
Find min key: u = 3 (key[3] = 15, minimum)
Add to MST: mstSet[3] = true
totalWeight += key[3] = 28
Update keys from vertex 3: (no adjacent vertices not in MST)
key = [0, 5, 8, 15]
mstSet = [true, true, true, true]

CONSTRUCT MST:
parent = [-1, 0, 0, 1]
MST edges:
  - [0, 1, 5] (parent[1]=0, key[1]=5)
  - [0, 2, 8] (parent[2]=0, key[2]=8)
  - [1, 3, 15] (parent[3]=1, key[3]=15)

🏆 FINAL RESULT: Total Weight = 28
MST Edges: [(0,1,5), (0,2,8), (1,3,15)]

─────────────────────────────────────────

📊 EXAMPLE 2: Different Graph

INPUT: Graph with edges: 0-1(10), 1-2(20), 0-2(30)
EXPECTED OUTPUT: Total Weight: 30

PROCESS:

INITIALIZATION:
key = [0, Infinity, Infinity]
mstSet = [false, false, false]

ITERATION 1:
u = 0
totalWeight = 0
Update: key[1] = 10, key[2] = 30
key = [0, 10, 30]

ITERATION 2:
u = 1 (key[1] = 10)
totalWeight = 10
Update: key[2] = min(30, 20) = 20
key = [0, 10, 20]

ITERATION 3:
u = 2 (key[2] = 20)
totalWeight = 30
key = [0, 10, 20]

MST: [(0,1,10), (1,2,20)]
Total: 30

🏆 RESULT: Total Weight = 30

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

KEY ARRAY EVOLUTION:

Initial: [0, ∞, ∞, ∞]

After iteration 1 (u=0):
  key = [0, 5, 8, ∞]
  Updated from vertex 0

After iteration 2 (u=1):
  key = [0, 5, 8, 15]
  Updated from vertex 1

After iteration 3 (u=2):
  key = [0, 5, 8, 15]
  Updated from vertex 2 (no change)

After iteration 4 (u=3):
  key = [0, 5, 8, 15]
  MST complete

─────────────────────────────────────────

📊 MST SET EVOLUTION:

Iteration 0: [T, F, F, F] → u=0
Iteration 1: [T, T, F, F] → u=1
Iteration 2: [T, T, T, F] → u=2
Iteration 3: [T, T, T, T] → u=3
MST Complete!

─────────────────────────────────────────

📊 KEY ARRAY CONCEPT:

KEY[V]: Minimum edge weight to reach vertex v from current MST

Initially:
- key[0] = 0 (source, already in MST)
- key[i] = Infinity (not reachable)

When adding vertex u to MST:
- For each adjacent vertex v:
  - If edge(u,v) < key[v]:
    - key[v] = edge(u,v)
    - This represents minimum edge to v from current MST

Example:
When adding vertex 0:
  - key[1] = 5 (edge 0→1)
  - key[2] = 8 (edge 0→2)

When adding vertex 1:
  - key[3] = 15 (edge 1→3)
  - key[2] stays 8 (5→2 via 0 is better than 10)

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Find minimum key: O(V) per iteration
- V-1 iterations: O(V²)
- Update keys: O(V) per iteration
- Total: O(V²)

SPACE COMPLEXITY:
- Adjacency matrix: O(V²)
- Key array: O(V)
- MST set: O(V)
- Parent array: O(V)
- Total: O(V²)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GREEDY CHOICE:
   - Always pick vertex with minimum key
   - This vertex has minimum edge weight to MST
   - Greedy choice is optimal for MST
   - Ensures minimum total weight

2️⃣ KEY ARRAY:
   - Stores minimum edge weight to each vertex
   - Updated when new vertex added to MST
   - Represents minimum connection cost
   - Critical for greedy selection

3️⃣ MST SET:
   - Tracks vertices already in MST
   - Prevents cycles
   - Ensures tree property
   - Grows by one vertex per iteration

4️⃣ PARENT ARRAY:
   - Stores MST structure
   - parent[v] = vertex that connects v to MST
   - Used to construct MST edges
   - Maintains tree structure

5️⃣ OPTIMALITY:
   - Greedy algorithm ensures optimal MST
   - Each step adds minimum weight edge
   - Total weight is minimum
   - Correct MST guaranteed

💡 KEY INSIGHT:
Using greedy approach with key array to always select vertex with minimum edge weight connection
to current MST. The key array maintains minimum edge weights to all vertices, updated when new
vertices join MST. This ensures optimal minimum spanning tree with O(V²) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Find minimum key: O(V) per iteration
- V-1 iterations: O(V²)
- Update keys: O(V) per iteration
- Matrix access: O(1)
- Total: O(V²)
- Optimal for dense graphs (matrix representation)

🎯 SPACE COMPLEXITY ANALYSIS:
- Adjacency matrix: O(V²)
- Key array: O(V)
- MST set: O(V)
- Parent array: O(V)
- Total: O(V²)
- Quadratic due to matrix

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex
Process: No iterations needed
Output: Total Weight = 0

CASE 2: Two vertices
Input: Graph with edge 0-1(5)
Process: One iteration, add vertex 1
Output: Total Weight = 5, Edge: (0,1,5)

CASE 3: Linear graph
Input: 0-1(2), 1-2(3), 2-3(4)
Process: Add vertices in order
Output: Total Weight = 9, Edges: all edges

CASE 4: Complete graph
Input: All pairs connected
Process: Prim's selects minimum edges
Output: MST with V-1 edges

CASE 5: Negative weights
Input: Edge 0-1(-5)
Process: Algorithm handles negative weights
Output: Negative weight included if minimum

🎯 ALGORITHM CORRECTNESS:
- Finds valid MST: ✓
- Optimal total weight: ✓
- Connects all vertices: ✓
- No cycles: ✓
- Tree structure: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 68-70: Initialize arrays
- Line 73-74: Set source vertex
- Line 78-99: Greedy MST construction
- Line 81-85: Find minimum key vertex
- Line 88: Add to MST
- Line 92-98: Update keys of neighbors

🎯 KEY UPDATES:

WHEN ADDING VERTEX U TO MST:
for each adjacent vertex v:
  if v not in MST and edge(u,v) exists:
    if edge(u,v) < key[v]:
      key[v] = edge(u,v)
      parent[v] = u

This maintains minimum edge weights!

🎯 MINIMUM KEY SELECTION:

FIND MINIMUM KEY VERTEX:
minKey = Infinity
minVertex = -1
for each vertex v:
  if v not in MST and key[v] < minKey:
    minKey = key[v]
    minVertex = v
return minVertex

This selects greedy choice!

🎯 ADVANTAGES:
- O(V²) time complexity
- Simple implementation
- Works for dense graphs
- Handles negative weights
- Guarantees optimal MST

🎯 DISADVANTAGES:
- O(V²) space for matrix
- Not optimal for sparse graphs
- Slower than list-based for sparse graphs
- Matrix initialization overhead

🎯 REAL-WORLD APPLICATIONS:
- Network design
- Circuit design
- Transportation planning
- Cluster analysis
- Image segmentation
- Approximation algorithms

🎯 RELATED PROBLEMS:
- MST using Kruskal's algorithm
- MST using Prim's (list representation)
- Maximum spanning tree
- Steiner tree
- Minimum bottleneck spanning tree
- Traveling salesman problem

🎯 TESTING STRATEGY:
- Single vertex
- Two vertices
- Linear graphs
- Complete graphs
- Sparse graphs
- Dense graphs
- Edge cases

🎯 DEBUGGING TIPS:
- Print key array after each iteration
- Trace MST set updates
- Monitor parent array
- Check minimum key selection
- Verify edge weights

🎯 COMMON MISTAKES:
- Wrong key initialization
- Not updating keys correctly
- Wrong minimum key selection
- Incorrect MST set tracking
- Missing edge existence check

🎯 BEST PRACTICES:
- Initialize keys correctly
- Update keys properly
- Track MST set accurately
- Handle edge existence
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain greedy approach
- Walk through example step by step
- Discuss key array concept
- Analyze time/space complexity
- Compare with Kruskal's
- Mention optimizations

🎯 KEY ARRAY RATIONALE:

WHY KEY ARRAY?

- Key[v] = minimum edge weight to reach v from current MST
- Initially: Infinity (unreachable) or 0 (source)
- Updated when: new vertex added to MST
- Used for: greedy selection (minimum key)
- Ensures: optimal edge selection

This enables greedy algorithm!

🎯 GREEDY SELECTION LOGIC:

WHY MINIMUM KEY?

- Minimum key vertex has minimum edge to MST
- Adding it adds minimum weight edge
- Greedy choice is optimal for MST
- Ensures minimum total weight
- Correct MST guaranteed

This ensures optimality!

🎯 MATRIX VS LIST REPRESENTATION:

MATRIX REPRESENTATION:
- Space: O(V²)
- Edge check: O(1)
- Update keys: O(V)
- Good for: dense graphs
- Time: O(V²)

LIST REPRESENTATION:
- Space: O(V + E)
- Edge check: O(degree)
- Update keys: O(degree)
- Good for: sparse graphs
- Time: O((V+E)log V) with heap

Choose based on graph density!

🎯 COMPARISON WITH ALTERNATIVES:

KRUSKAL'S ALGORITHM:
- Sort all edges
- Add edges in order if no cycle
- Time: O(E log E)
- Space: O(V + E)
- Good for sparse graphs

PRIM'S (MATRIX):
- Greedy vertex selection
- Matrix representation
- Time: O(V²)
- Space: O(V²)
- Good for dense graphs

PRIM'S (LIST + HEAP):
- Greedy vertex selection
- List representation + heap
- Time: O((V+E)log V)
- Space: O(V + E)
- Good for sparse graphs

🎯 CONCLUSION:
Finding Minimum Spanning Tree using Prim's algorithm with matrix representation is efficiently
achieved using greedy approach with key array, always selecting vertex with minimum edge weight
connection to current MST, updating keys when new vertices join MST, ensuring optimal MST with
O(V²) time complexity and O(V²) space complexity, making it suitable for dense graphs!
*/
