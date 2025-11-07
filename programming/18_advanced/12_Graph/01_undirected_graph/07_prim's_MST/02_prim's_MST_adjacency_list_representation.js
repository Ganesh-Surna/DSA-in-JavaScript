/* Problem: ✅✅✅✅ Minimum Spanning Tree using Prim's Algorithm (Adjacency List + Min Heap) ✅✅✅✅

Given a connected, undirected, weighted graph represented as an adjacency list, find the 
Minimum Spanning Tree (MST) using Prim's algorithm with min heap optimization.
A Minimum Spanning Tree connects all vertices with minimum total edge weight.

The problem requires:
- Find MST of a weighted undirected graph
- Graph represented as adjacency list
- Use Prim's algorithm with min heap
- Optimize for sparse graphs
- Return total weight and edges in MST

You are given a weighted undirected graph represented as an adjacency list. Find the MST
using Prim's algorithm with min heap to efficiently select the vertex with minimum edge weight.

Example 1:
Input: Graph with edges: 0-1(5), 0-2(8), 1-2(10), 1-3(15), 2-3(20)
Output: MST Weight: 28, Edges: [(0,1,5), (0,2,8), (1,3,15)]
Explanation: 
- Start with 0 in MST
- Add 1 (edge 0-1 with weight 5)
- Add 2 (edge 0-2 with weight 8)
- Add 3 (edge 1-3 with weight 15)
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

Expected Complexities:
Time Complexity: O((V + E) log V) - using min heap with adjacency list
Auxiliary Space: O(V + E) - for adjacency list, plus O(V) for key, parent, mstSet, heap
*/

// Customized MinHeap to store [vertex, weight] pairs, comparing based on weight (second element)
class MinHeap{
    constructor(){
        this.harr = []
        this.size = 0
    }
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    minHeapify(i){
        let n=this.size, arr=this.harr
        
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            let min = i
            
            if(l < n && arr[l][1] < arr[min][1]){
                min = l
            }
            if(r < n && arr[r][1] < arr[min][1]){
                min = r
            }
            
            if(min===i) break;
            
            [arr[i], arr[min]]=[arr[min], arr[i]];
            i=min;
        }
    }
    insert(k){
        let i=this.size, arr=this.harr;
        
        arr[i]=k
        
        while(i>0 && arr[this.parent(i)][1] > arr[i][1]){
            let p = this.parent(i);
            [arr[p], arr[i]]=[arr[i], arr[p]];
            i=p;
        }
        
        this.size++
    }
    extractMin(){
        if(this.size === 0) return null
        
        let n = this.size, arr= this.harr;
        
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        
        let min = arr.pop();
        this.size--
        this.minHeapify(0)
        return min
    }
    
}

// ✅ Sol_1: Just inserting (Allows duplicate vertex's with different weights, works fine, but redundant)
// ✅ TC = O((V + E) log V) - heap operations for each vertex and edge
// ✅ SC = O(V + E) --> for adjacency list + heap + arrays
function primsMST(adj){
    // adj = adjacency list like: adj[u] = [ [v, w], [v2, w2], ... ]

    // 1. Initialize arrays
    let V = adj.length
    let key = new Array(V).fill(Number.POSITIVE_INFINITY) // Minimum edge weight to each vertex
    let mstSet = new Array(V).fill(false) // Track vertices in MST
    let parent = new Array(V).fill(-1) // Store MST structure
    
    // 2. Initialize min heap and start with vertex 0
    let h = new MinHeap() // Min heap to efficiently find minimum key vertex
    key[0] = 0
    h.insert([0, 0]) // [vertex, weight] - start with vertex 0

    // 3. Process vertices until heap is empty
    while(h.size > 0){
        // Extract vertex with minimum key (edge weight)
        let [u, w] = h.extractMin() // w is the weight (not directly used, already in key[u])
        
        // Skip if already in MST (may have duplicates in heap)
        if(!mstSet[u]){
            mstSet[u] = true // Add vertex u to MST

            // Update keys of all adjacent vertices
            for(let [v, weight] of adj[u]){
                // If v not in MST and found better edge weight
                // ✅ Relaxation Operation:
                if(!mstSet[v] && key[v] > weight){
                    key[v] = weight
                    parent[v] = u
                    // Insert into heap for future processing
                    h.insert([v, key[v]]) // Must push updated weight (here key[v] is same as weight even after update)
                }
            }
        }
    }

    // 4. Construct MST edges from parent array
    const mstEdges = []
    let totalWeight = 0

    for(let i=1; i<V; i++){ // Start from 1, as parent[0] = -1
        if(parent[i] !== -1){
            mstEdges.push([parent[i], i, key[i]])
            totalWeight += key[i]
        }
    }

    return {
        edges : mstEdges,
        totalWeight
    }
}

// ✅ Sol_2: Dijkstra with proper decreaseKey (EFFICIENT Than above, But need vertex-index mapping in Heap to find its position in heap, to perform decreaseKey)
// ✅✅ Using the Customized MinHeap with position mapping (to get position of vertex in Heap efficiently).
class MinHeap {
    constructor() {
        this.harr = [];
        this.size = 0;
        this.pos = {}; // maps vertex -> index in heap
    }

    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    parent(i) { return Math.floor((i - 1) / 2); }

    swap(i, j) {
        [this.harr[i], this.harr[j]] = [this.harr[j], this.harr[i]];
        this.pos[this.harr[i][0]] = i;
        this.pos[this.harr[j][0]] = j;
    }

    minHeapify(i) {
        let n = this.size, arr = this.harr;

        while (true) {
            let l = this.left(i);
            let r = this.right(i);
            let min = i;

            if (l < n && arr[l][1] < arr[min][1]) min = l;
            if (r < n && arr[r][1] < arr[min][1]) min = r;

            if (min === i) break;

            this.swap(i, min);
            i = min;
        }
    }

    insert(k) {
        let i = this.size, arr = this.harr;
        arr[i] = k;
        this.pos[k[0]] = i; // track vertex position

        while (i > 0 && arr[this.parent(i)][1] > arr[i][1]) {
            let p = this.parent(i);
            this.swap(i, p);
            i = p;
        }

        this.size++;
    }

    extractMin() {
        if (this.size === 0) return null;

        let n = this.size, arr = this.harr;
        this.swap(0, n - 1);

        let min = arr.pop();
        delete this.pos[min[0]];

        this.size--;
        if (this.size > 0) this.minHeapify(0);

        return min;
    }

    decreaseKey(v, newKey) {
        let i = this.pos[v];
        this.harr[i][1] = newKey;

        while (i > 0 && this.harr[this.parent(i)][1] > this.harr[i][1]) {
            let p = this.parent(i);
            this.swap(i, p);
            i = p;
        }
    }

    isInHeap(v) {
        return this.pos.hasOwnProperty(v);
    }
}

function primsMST(adj) {
    let V = adj.length;
    let key = new Array(V).fill(Number.POSITIVE_INFINITY);
    let mstSet = new Array(V).fill(false);
    let parent = new Array(V).fill(-1);

    let h = new MinHeap();

    // Start with vertex 0
    key[0] = 0;
    h.insert([0, 0]); // [vertex, key]

    while (h.size > 0) {
        let [u, _] = h.extractMin();
        mstSet[u] = true;

        // Traverse adjacent vertices
        for (let [v, weight] of adj[u]) {
            if (!mstSet[v] && weight < key[v]) {
                key[v] = weight;
                parent[v] = u;

                if (h.isInHeap(v)) {
                    h.decreaseKey(v, key[v]);
                } else {
                    h.insert([v, key[v]]);
                }
            }
        }
    }

    // Build MST result
    const mstEdges = [];
    let totalWeight = 0;

    for (let i = 1; i < V; i++) {
        if (parent[i] !== -1) {
            mstEdges.push([parent[i], i, key[i]]);
            totalWeight += key[i];
        }
    }

    return { edges: mstEdges, totalWeight };
}



class UndirectedWeightedGraph{
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
        this.adj[to].push([from, weight]); // ✅ (Undirected Graph) both directions
    }
}

// Test cases
let adj1 = [
    [[1, 5], [2, 8]],      // Vertex 0: edges to 1(5), 2(8)
    [[0, 5], [2, 10], [3, 15]], // Vertex 1: edges to 0(5), 2(10), 3(15)
    [[0, 8], [1, 10], [3, 20]], // Vertex 2: edges to 0(8), 1(10), 3(20)
    [[1, 15], [2, 20]]     // Vertex 3: edges to 1(15), 2(20)
];
console.log("Test 1:", primsMST(adj1)); // {edges: [[0,1,5], [0,2,8], [1,3,15]], totalWeight: 28}

let g1 = new UndirectedWeightedGraph(4);
g1.addEdge(0, 1, 5);
g1.addEdge(0, 2, 8);
g1.addEdge(1, 2, 10);
g1.addEdge(1, 3, 15);
g1.addEdge(2, 3, 20);
console.log("Test 2:", primsMST(g1.adj)); // {edges: [[0,1,5], [0,2,8], [1,3,15]], totalWeight: 28}

let g2 = new UndirectedWeightedGraph(3);
g2.addEdge(0, 1, 10);
g2.addEdge(1, 2, 20);
g2.addEdge(0, 2, 30);
console.log("Test 3:", primsMST(g2.adj)); // {edges: [[0,1,10], [1,2,20]], totalWeight: 30}

/*🎯 CORE IDEA: Use Prim's algorithm with min heap optimization and adjacency list representation
to find MST efficiently. Maintain key array, MST set, and use min heap to efficiently select
vertex with minimum edge weight. Process vertices by extracting minimum from heap, updating
keys of neighbors, and inserting them into heap. This optimizes for sparse graphs with
O((V + E) log V) time complexity.

📋 STEP-BY-STEP FLOW:

1️⃣ ARRAY INITIALIZATION:
   - Initialize key array with Infinity (except source = 0)
   - Initialize mstSet array with false
   - Initialize parent array to store MST
   - Prepare for heap-based selection

2️⃣ HEAP INITIALIZATION:
   - Create min heap
   - Insert source vertex [0, 0] into heap
   - Start greedy selection process
   - Heap stores [vertex, weight] pairs

3️⃣ HEAP-BASED PROCESSING:
   - Extract minimum vertex from heap
   - Check if already in MST (handle duplicates)
   - Add vertex to MST
   - Process all neighbors

4️⃣ KEY UPDATES:
   - For each neighbor v of u
   - If v not in MST and edge(u,v) < key[v]:
     - Update key[v] = edge(u,v)
     - Update parent[v] = u
     - Insert [v, weight] into heap
   - Heap may contain duplicates (acceptable)

5️⃣ RESULT CONSTRUCTION:
   - Build MST edges from parent array
   - Calculate total weight from keys
   - Return MST edges and total weight
   - Optimal MST found

🧠 WHY THIS APPROACH?
- Min heap optimizes vertex selection
- O(log V) extraction vs O(V) linear search
- Adjacency list efficient for sparse graphs
- O((V + E) log V) time complexity
- Better than matrix for sparse graphs

💡 KEY INSIGHTS:
- Use min heap to find minimum key vertex
- Heap stores [vertex, weight] pairs
- Duplicates in heap are acceptable (skip if in MST)
- Update keys and insert into heap when better edge found
- Adjacency list allows efficient neighbor iteration
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Prim's MST with Min Heap

INPUT: Graph with edges: 0-1(5), 0-2(8), 1-2(10), 1-3(15), 2-3(20)
EXPECTED OUTPUT: Total Weight: 28, Edges: [(0,1,5), (0,2,8), (1,3,15)]

Graph representation (adjacency list):
0: [[1,5], [2,8]]
1: [[0,5], [2,10], [3,15]]
2: [[0,8], [1,10], [3,20]]
3: [[1,15], [2,20]]

🎯 GOAL: Find Minimum Spanning Tree using min heap!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
key = [0, Infinity, Infinity, Infinity]
mstSet = [false, false, false, false]
parent = [-1, -1, -1, -1]
Heap: [[0, 0]]

ITERATION 1:
Extract min: [0, 0]
u = 0, not in MST → Add to MST
mstSet[0] = true
Process neighbors of 0:
  - [1, 5]: key[1] = min(Infinity, 5) = 5, parent[1] = 0, insert [1, 5]
  - [2, 8]: key[2] = min(Infinity, 8) = 8, parent[2] = 0, insert [2, 8]
key = [0, 5, 8, Infinity]
Heap: [[1, 5], [2, 8]]

ITERATION 2:
Extract min: [1, 5]
u = 1, not in MST → Add to MST
mstSet[1] = true
Process neighbors of 1:
  - [0, 5]: mstSet[0] = true, skip
  - [2, 10]: key[2] = min(8, 10) = 8, no update (8 < 10)
  - [3, 15]: key[3] = min(Infinity, 15) = 15, parent[3] = 1, insert [3, 15]
key = [0, 5, 8, 15]
Heap: [[2, 8], [3, 15]]

ITERATION 3:
Extract min: [2, 8]
u = 2, not in MST → Add to MST
mstSet[2] = true
Process neighbors of 2:
  - [0, 8]: mstSet[0] = true, skip
  - [1, 10]: mstSet[1] = true, skip
  - [3, 20]: key[3] = min(15, 20) = 15, no update (15 < 20)
key = [0, 5, 8, 15]
Heap: [[3, 15]]

ITERATION 4:
Extract min: [3, 15]
u = 3, not in MST → Add to MST
mstSet[3] = true
Process neighbors of 3:
  - [1, 15]: mstSet[1] = true, skip
  - [2, 20]: mstSet[2] = true, skip
key = [0, 5, 8, 15]
Heap: []

CONSTRUCT MST:
parent = [-1, 0, 0, 1]
MST edges:
  - [0, 1, 5]
  - [0, 2, 8]
  - [1, 3, 15]
Total weight = 5 + 8 + 15 = 28

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
Heap: [[0, 0]]

ITERATION 1:
Extract: [0, 0]
mstSet[0] = true
Process neighbors:
  - [1, 10]: key[1] = 10, parent[1] = 0, insert [1, 10]
  - [2, 30]: key[2] = 30, parent[2] = 0, insert [2, 30]
Heap: [[1, 10], [2, 30]]

ITERATION 2:
Extract: [1, 10]
mstSet[1] = true
Process neighbors:
  - [0, 10]: skip (in MST)
  - [2, 20]: key[2] = min(30, 20) = 20, parent[2] = 1, insert [2, 20]
Heap: [[2, 30], [2, 20]] (duplicates acceptable)

ITERATION 3:
Extract: [2, 20]
mstSet[2] = false → Add to MST
mstSet[2] = true
Process neighbors: (all in MST, skip)
Heap: [[2, 30]]

ITERATION 4:
Extract: [2, 30]
mstSet[2] = true → Skip (already in MST)
Heap: []

MST: [(0,1,10), (1,2,20)]
Total: 30

🏆 RESULT: Total Weight = 30

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION:

Initial: [[0, 0]]

After processing 0:
  Heap: [[1, 5], [2, 8]]
  Inserted neighbors of 0

After processing 1:
  Heap: [[2, 8], [3, 15]]
  Inserted neighbor 3

After processing 2:
  Heap: [[3, 15]]
  No new insertions

After processing 3:
  Heap: []
  MST complete

─────────────────────────────────────────

📊 MIN HEAP CUSTOMIZATION:

STORE: [vertex, weight] pairs
COMPARE: Based on weight (second element)

Example heap:
[[1, 5], [2, 8], [3, 15]]
- Root: [1, 5] (minimum weight)
- Extract gives vertex with minimum key
- Efficient O(log V) extraction

This optimizes vertex selection!

─────────────────────────────────────────

📊 WHY DUPLICATES IN HEAP?

CASE: Multiple edges to same vertex
- Insert [v, 10] when edge 0→v has weight 10
- Later insert [v, 5] when edge 1→v has weight 5
- Heap contains: [[v, 5], [v, 10]]
- Extract [v, 5] first (minimum)
- When extract [v, 10], v already in MST → skip

This is acceptable and correct!

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- V extractMin operations: O(V log V)
- E insert operations: O(E log V)
- Total: O((V + E) log V)

SPACE COMPLEXITY:
- Adjacency list: O(V + E)
- Key array: O(V)
- MST set: O(V)
- Parent array: O(V)
- Heap: O(V)
- Total: O(V + E)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MIN HEAP OPTIMIZATION:
   - Extract minimum in O(log V) time
   - Better than O(V) linear search
   - Optimizes vertex selection
   - Efficient for sparse graphs

2️⃣ ADJACENCY LIST:
   - Iterate only actual neighbors
   - O(degree) instead of O(V)
   - Efficient for sparse graphs
   - Better space utilization

3️⃣ KEY UPDATES:
   - Update key when better edge found
   - Insert into heap for processing
   - Duplicates handled by MST check
   - Correct minimum key selection

4️⃣ MST SET CHECK:
   - Skip vertices already in MST
   - Handles heap duplicates correctly
   - Prevents cycles
   - Ensures tree property

5️⃣ OPTIMALITY:
   - Greedy algorithm ensures optimal MST
   - Min heap ensures correct selection
   - Adjacency list ensures efficiency
   - Optimal solution guaranteed

💡 KEY INSIGHT:
Using min heap with adjacency list representation to optimize Prim's algorithm, extracting
minimum key vertex in O(log V) time instead of O(V), and iterating only actual neighbors
using adjacency list. This achieves O((V + E) log V) time complexity, optimal for sparse
graphs, with heap storing [vertex, weight] pairs and handling duplicates correctly!

🎯 TIME COMPLEXITY ANALYSIS:
- V extractMin operations: O(V log V)
- E insert operations: O(E log V)
- Neighbor iteration: O(E)
- Total: O((V + E) log V)
- Optimal for sparse graphs

🎯 SPACE COMPLEXITY ANALYSIS:
- Adjacency list: O(V + E)
- Key array: O(V)
- MST set: O(V)
- Parent array: O(V)
- Heap: O(V)
- Total: O(V + E)
- Linear in graph size

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex
Process: Extract [0, 0], no neighbors
Output: Total Weight = 0

CASE 2: Two vertices
Input: Graph with edge 0-1(5)
Process: Extract [0,0], insert [1,5], extract [1,5]
Output: Total Weight = 5, Edge: (0,1,5)

CASE 3: Linear graph
Input: 0-1(2), 1-2(3), 2-3(4)
Process: Extract in order, update keys
Output: Total Weight = 9, Edges: all edges

CASE 4: Complete graph (dense)
Input: All pairs connected
Process: Heap may have many duplicates
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
- Line 114-117: Initialize arrays
- Line 120-122: Initialize heap with source
- Line 125-143: Heap-based processing
- Line 127: Extract minimum vertex
- Line 130: Check if in MST (handle duplicates)
- Line 134-140: Update keys and insert into heap

🎯 HEAP OPERATIONS:

INSERT:
- Add [vertex, weight] at end
- Bubble up based on weight
- Time: O(log V)

EXTRACT MIN:
- Remove root [vertex, weight]
- Replace with last, heapify down
- Time: O(log V)

This ensures efficient operations!

🎯 DUPLICATE HANDLING:

WHY DUPLICATES OCCUR:
- Multiple edges may update same vertex
- Each update inserts into heap
- Heap may contain [v, w1], [v, w2]
- Extract minimum first (better edge)

HOW TO HANDLE:
- Check mstSet[u] after extraction
- If already in MST, skip
- Prevents processing duplicates
- Correct and efficient

This ensures correctness!

🎯 ADVANTAGES:
- O((V + E) log V) time complexity
- O(V + E) space complexity
- Efficient for sparse graphs
- Better than matrix representation
- Handles negative weights

🎯 DISADVANTAGES:
- More complex than matrix version
- Heap overhead
- Duplicate handling needed
- Slightly more code
- Not optimal for very dense graphs

🎯 REAL-WORLD APPLICATIONS:
- Network design
- Circuit design
- Transportation planning
- Cluster analysis
- Image segmentation
- Approximation algorithms

🎯 RELATED PROBLEMS:
- MST using Kruskal's algorithm
- MST using Prim's (matrix representation)
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
- Print heap state after each extraction
- Trace key array updates
- Monitor MST set changes
- Check parent array
- Verify heap operations

🎯 COMMON MISTAKES:
- Not checking mstSet after extraction
- Wrong heap comparison (should compare weight)
- Not handling duplicates
- Wrong key update condition
- Missing parent update

🎯 BEST PRACTICES:
- Always check mstSet after extraction
- Update keys correctly
- Insert into heap when key updated
- Handle duplicates properly
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain min heap optimization
- Discuss adjacency list benefits
- Walk through example step by step
- Explain duplicate handling
- Analyze time/space complexity
- Compare with matrix version

🎯 HEAP CUSTOMIZATION RATIONALE:

WHY [VERTEX, WEIGHT] PAIRS?

- Need both vertex and weight
- Compare based on weight
- Extract vertex with minimum weight
- Efficient storage and comparison

Example:
h.harr[i] = [v, w]
Comparison: h.harr[i][1] < h.harr[j][1]
Extract: [u, weight]

This enables efficient selection!

🎯 ADJACENCY LIST BENEFITS:

VS MATRIX REPRESENTATION:

ADJACENCY LIST:
- Space: O(V + E)
- Iterate neighbors: O(degree)
- Good for: sparse graphs
- Time: O((V + E) log V)

MATRIX:
- Space: O(V²)
- Iterate neighbors: O(V)
- Good for: dense graphs
- Time: O(V²)

Choose based on graph density!

🎯 DUPLICATE HANDLING LOGIC:

WHY SKIP IF IN MST?

After extraction:
- Check if vertex already in MST
- If yes, skip (duplicate in heap)
- If no, process and add to MST
- Prevents reprocessing

Example:
Extract [2, 20] → mstSet[2] = false → Process ✓
Extract [2, 30] → mstSet[2] = true → Skip ✓

This handles duplicates correctly!

🎯 COMPARISON WITH ALTERNATIVES:

KRUSKAL'S ALGORITHM:
- Sort all edges
- Union-Find for cycles
- Time: O(E log E)
- Space: O(V + E)
- Different approach

PRIM'S (MATRIX):
- Linear search for minimum
- Matrix representation
- Time: O(V²)
- Space: O(V²)
- Good for dense graphs

PRIM'S (LIST + HEAP):
- Heap for minimum selection
- List representation
- Time: O((V + E) log V)
- Space: O(V + E)
- Good for sparse graphs

🎯 HEAP VS LINEAR SEARCH:

LINEAR SEARCH (Matrix):
- Find minimum: O(V)
- V iterations: O(V²)
- Simple but slow

MIN HEAP (List):
- Find minimum: O(log V)
- V iterations: O(V log V)
- Insert E times: O(E log V)
- Total: O((V + E) log V)
- Better for sparse graphs

Heap is more efficient!

🎯 CONCLUSION:
Finding Minimum Spanning Tree using Prim's algorithm with adjacency list and min heap
optimization is efficiently achieved using heap to select minimum key vertex in O(log V)
time, iterating only actual neighbors using adjacency list, updating keys when better
edges found, and handling duplicates by checking MST set, ensuring O((V + E) log V) time
complexity and O(V + E) space complexity, making it optimal for sparse graphs!
*/