/* Problem: ✅✅✅✅ Shortest Paths from Source using Dijkstra's Algorithm (Adjacency List + Min Heap) ✅✅✅✅

Given a weighted, undirected or directed graph represented as an adjacency list, find the shortest
paths from a source vertex to all other vertices using Dijkstra's algorithm with min heap optimization.
Dijkstra's algorithm finds shortest paths in graphs with non-negative edge weights.

The problem requires:
- Find shortest paths from source vertex to all vertices
- Graph represented as adjacency list
- Use Dijkstra's algorithm with min heap
- Handle non-negative edge weights only
- Return array of shortest distances

You are given a weighted graph represented as an adjacency list. Find the shortest distance from
source vertex (0) to all other vertices using Dijkstra's algorithm with min heap to efficiently
select the vertex with minimum distance.

Example 1:
Input: Graph with edges: 0-1(4), 0-2(1), 1-2(2), 1-3(5), 2-3(1)
Output: [0, 3, 1, 2]
Explanation: 
- Shortest distance to 0: 0 (source)
- Shortest distance to 1: 3 (via 0→2→1, 1+2=3)
- Shortest distance to 2: 1 (direct from 0)
- Shortest distance to 3: 2 (via 0→2→3, 1+1=2)

Example 2:
Input: Graph with edges: 0-1(10), 1-2(20), 0-2(50)
Output: [0, 10, 30]
Explanation:
- Shortest distance to 1: 10 (direct)
- Shortest distance to 2: 30 (via 0→1→2, 10+20=30, not 50 direct)

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- 0 ≤ edge weights ≤ 10^5 (non-negative)
- Graph may be directed or undirected

Expected Complexities:
Time Complexity: O((V + E) log V) - using min heap with adjacency list
Auxiliary Space: O(V + E) - for adjacency list, plus O(V) for dist, visited, heap
*/

// Customized MinHeap to store [vertex, distance] pairs, comparing based on distance (second element)
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
function dijkstra(adj){
    // adj = adjacency list like: adj[u] = [ [v, w], [v2, w2], ... ]

    // 1. Initialize arrays
    let V = adj.length
    let dist = new Array(V).fill(Number.POSITIVE_INFINITY) // Shortest distance from source to each vertex
    let visited = new Array(V).fill(false) // Track vertices whose shortest distance is finalized
    
    // 2. Initialize min heap and start with source vertex 0
    let h = new MinHeap() // Min heap to efficiently find vertex with minimum distance
    dist[0] = 0 // Distance from source to itself is 0
    h.insert([0, 0]) // [vertex, distance] - start with source vertex 0

    // 3. Process vertices until heap is empty
    while(h.size > 0){
        // Extract vertex with minimum distance (not yet finalized)
        let [u, d] = h.extractMin() // d is the distance stored in heap
        
        // Skip if already finalized (may have duplicates in heap with larger distances)
        if(!visited[u]){
            visited[u] = true // Mark vertex u as finalized (shortest distance found)

            // Relax all edges from vertex u to its neighbors
            for(let [v, weight] of adj[u]){
                // Relaxation: If found shorter path to v through u
                // ✅ Relaxation Operation: dist[v] > dist[u] + weight
                if(!visited[v] && dist[v] > dist[u] + weight){
                    dist[v] = dist[u] + weight // Update shortest distance to v
                    // Insert into heap for future processing with updated distance
                    h.insert([v, dist[v]]) // ✅ Must push the updated distance (dist[v])
                }
            }
        }
    }

    return dist // Return array of shortest distances from source to all vertices
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

    decreaseKey(v, newDist) {
        let i = this.pos[v];
        this.harr[i][1] = newDist;
        
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

function dijkstra(adj) {
    let V = adj.length;
    let dist = new Array(V).fill(Infinity);
    let visited = new Array(V).fill(false);
    let h = new MinHeap();

    dist[0] = 0;
    h.insert([0, 0]); // [vertex, distance]

    while (h.size > 0) {
        let [u, d] = h.extractMin();
        visited[u] = true;

        for (let [v, weight] of adj[u]) {
            if (!visited[v] && dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                if (h.isInHeap(v)) { // // ⭐⭐⭐⭐
                    h.decreaseKey(v, dist[v]); // ⭐⭐⭐⭐
                } else {
                    h.insert([v, dist[v]]); // // ⭐⭐⭐⭐
                }
            }
        }
    }

    return dist;
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
    [[1, 4], [2, 1]],      // Vertex 0: edges to 1(4), 2(1)
    [[0, 4], [2, 2], [3, 5]], // Vertex 1: edges to 0(4), 2(2), 3(5)
    [[0, 1], [1, 2], [3, 1]], // Vertex 2: edges to 0(1), 1(2), 3(1)
    [[1, 5], [2, 1]]      // Vertex 3: edges to 1(5), 2(1)
];
console.log("Test 1:", dijkstra(adj1)); // [0, 3, 1, 2]

let g1 = new UndirectedWeightedGraph(4);
g1.addEdge(0, 1, 4);
g1.addEdge(0, 2, 1);
g1.addEdge(1, 2, 2);
g1.addEdge(1, 3, 5);
g1.addEdge(2, 3, 1);
console.log("Test 2:", dijkstra(g1.adj)); // [0, 3, 1, 2]

let g2 = new UndirectedWeightedGraph(3);
g2.addEdge(0, 1, 10);
g2.addEdge(1, 2, 20);
g2.addEdge(0, 2, 50);
console.log("Test 3:", dijkstra(g2.adj)); // [0, 10, 30]

/*🎯 CORE IDEA: Use Dijkstra's algorithm with min heap optimization and adjacency list representation
to find shortest paths from source vertex to all vertices. Maintain distance array, visited set, and
use min heap to efficiently select vertex with minimum distance. Process vertices by extracting
minimum from heap, relaxing edges to neighbors, and inserting updated distances into heap. This
optimizes for sparse graphs with O((V + E) log V) time complexity.

📋 STEP-BY-STEP FLOW:

1️⃣ ARRAY INITIALIZATION:
   - Initialize dist array with Infinity (except source = 0)
   - Initialize visited array with false (no vertices finalized)
   - Prepare for heap-based shortest path finding

2️⃣ HEAP INITIALIZATION:
   - Create min heap
   - Insert source vertex [0, 0] into heap
   - Start greedy selection process
   - Heap stores [vertex, distance] pairs

3️⃣ HEAP-BASED PROCESSING:
   - Extract vertex with minimum distance from heap
   - Check if already finalized (handle duplicates)
   - Mark vertex as finalized
   - Relax all edges from this vertex

4️⃣ RELAXATION OPERATION:
   - For each neighbor v of u
   - If v not finalized and dist[v] > dist[u] + weight:
     - Update dist[v] = dist[u] + weight (relaxation)
     - Insert [v, dist[v]] into heap
   - Heap may contain duplicates (acceptable)

5️⃣ RESULT:
   - Return dist array with shortest distances
   - All vertices processed or unreachable
   - Shortest paths found

🧠 WHY THIS APPROACH?
- Min heap optimizes vertex selection
- O(log V) extraction vs O(V) linear search
- Adjacency list efficient for sparse graphs
- O((V + E) log V) time complexity
- Greedy algorithm ensures shortest paths

💡 KEY INSIGHTS:
- Use min heap to find vertex with minimum distance
- Heap stores [vertex, distance] pairs
- Relaxation: dist[v] = min(dist[v], dist[u] + weight)
- Duplicates in heap are acceptable (skip if finalized)
- Insert updated distance after relaxation
- Adjacency list allows efficient neighbor iteration
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Dijkstra's Shortest Path Algorithm

INPUT: Graph with edges: 0-1(4), 0-2(1), 1-2(2), 1-3(5), 2-3(1)
EXPECTED OUTPUT: [0, 3, 1, 2]

Graph representation (adjacency list):
0: [[1,4], [2,1]]
1: [[0,4], [2,2], [3,5]]
2: [[0,1], [1,2], [3,1]]
3: [[1,5], [2,1]]

Graph visualization:
    0 ---4--- 1
    |        / \
    1       2   5
    |      /     \
    2 ---1--- 3
        1

🎯 GOAL: Find shortest paths from vertex 0 to all vertices!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
dist = [0, Infinity, Infinity, Infinity]
visited = [false, false, false, false]
Heap: [[0, 0]]

ITERATION 1:
Extract min: [0, 0]
u = 0, not finalized → Finalize it
visited[0] = true
Relax edges from 0:
  - [1, 4]: dist[1] = min(Infinity, 0 + 4) = 4, insert [1, 4]
  - [2, 1]: dist[2] = min(Infinity, 0 + 1) = 1, insert [2, 1]
dist = [0, 4, 1, Infinity]
Heap: [[2, 1], [1, 4]]

ITERATION 2:
Extract min: [2, 1]
u = 2, not finalized → Finalize it
visited[2] = true
Relax edges from 2:
  - [0, 1]: visited[0] = true, skip
  - [1, 2]: dist[1] = min(4, 1 + 2) = 3, insert [1, 3]
  - [3, 1]: dist[3] = min(Infinity, 1 + 1) = 2, insert [3, 2]
dist = [0, 3, 1, 2]
Heap: [[1, 3], [1, 4], [3, 2]] (duplicates acceptable)

ITERATION 3:
Extract min: [1, 3]
u = 1, not finalized → Finalize it
visited[1] = true
Relax edges from 1:
  - [0, 4]: visited[0] = true, skip
  - [2, 2]: visited[2] = true, skip
  - [3, 5]: dist[3] = min(2, 3 + 5) = 2, no update (2 < 8)
dist = [0, 3, 1, 2]
Heap: [[1, 4], [3, 2]]

ITERATION 4:
Extract min: [3, 2]
u = 3, not finalized → Finalize it
visited[3] = true
Relax edges from 3:
  - [1, 5]: visited[1] = true, skip
  - [2, 1]: visited[2] = true, skip
dist = [0, 3, 1, 2]
Heap: [[1, 4]]

ITERATION 5:
Extract min: [1, 4]
u = 1, visited[1] = true → Skip (duplicate)
Heap: []

🏆 FINAL RESULT: [0, 3, 1, 2]
- Shortest distance to 0: 0 (source)
- Shortest distance to 1: 3 (via 0→2→1, 1+2=3)
- Shortest distance to 2: 1 (direct from 0)
- Shortest distance to 3: 2 (via 0→2→3, 1+1=2)

─────────────────────────────────────────

📊 EXAMPLE 2: Different Graph

INPUT: Graph with edges: 0-1(10), 1-2(20), 0-2(50)
EXPECTED OUTPUT: [0, 10, 30]

PROCESS:

INITIALIZATION:
dist = [0, Infinity, Infinity]
visited = [false, false, false]
Heap: [[0, 0]]

ITERATION 1:
Extract: [0, 0]
visited[0] = true
Relax edges:
  - [1, 10]: dist[1] = 10, insert [1, 10]
  - [2, 50]: dist[2] = 50, insert [2, 50]
Heap: [[1, 10], [2, 50]]

ITERATION 2:
Extract: [1, 10]
visited[1] = true
Relax edges:
  - [0, 10]: skip (visited)
  - [2, 20]: dist[2] = min(50, 10 + 20) = 30, insert [2, 30]
Heap: [[2, 30], [2, 50]]

ITERATION 3:
Extract: [2, 30]
visited[2] = true
Relax edges: (all visited, skip)
Heap: [[2, 50]]

ITERATION 4:
Extract: [2, 50]
visited[2] = true → Skip
Heap: []

🏆 RESULT: [0, 10, 30]
- Shortest distance to 1: 10 (direct)
- Shortest distance to 2: 30 (via 0→1→2, 10+20=30, better than direct 50)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DIST ARRAY EVOLUTION:

Initial: [0, ∞, ∞, ∞]

After iteration 1 (u=0):
  dist = [0, 4, 1, ∞]
  Relaxed edges from 0

After iteration 2 (u=2):
  dist = [0, 3, 1, 2]
  Found shorter path to 1 and 3 via 2

After iteration 3 (u=1):
  dist = [0, 3, 1, 2]
  No updates (3→3 path longer)

After iteration 4 (u=3):
  dist = [0, 3, 1, 2]
  All distances finalized

─────────────────────────────────────────

📊 HEAP EVOLUTION:

Initial: [[0, 0]]

After processing 0:
  Heap: [[2, 1], [1, 4]]
  Inserted neighbors

After processing 2:
  Heap: [[1, 3], [1, 4], [3, 2]]
  Inserted updated distances (1 and 3)

After processing 1:
  Heap: [[1, 4], [3, 2]]
  No new insertions

After processing 3:
  Heap: [[1, 4]]
  All neighbors visited

─────────────────────────────────────────

📊 RELAXATION OPERATION:

RELAXATION: dist[v] > dist[u] + weight

When processing vertex u with distance dist[u]:
- For each neighbor v with edge weight w
- If dist[u] + w < dist[v]:
  - Update: dist[v] = dist[u] + w
  - Insert [v, dist[v]] into heap

Example:
Processing vertex 2 (dist[2] = 1):
  - Neighbor 1: dist[1] = min(4, 1 + 2) = 3
  - Neighbor 3: dist[3] = min(∞, 1 + 1) = 2

This finds shortest paths!

─────────────────────────────────────────

📊 WHY DUPLICATES IN HEAP?

CASE: Multiple paths update same vertex
- Initially insert [v, 50] when dist[v] = 50
- Later insert [v, 30] when dist[v] = 30 (better path found)
- Heap contains: [[v, 30], [v, 50]]
- Extract [v, 30] first (minimum)
- When extract [v, 50], v already finalized → skip

This is acceptable and correct!

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- V extractMin operations: O(V log V)
- E insert operations: O(E log V)
- Total: O((V + E) log V)

SPACE COMPLEXITY:
- Adjacency list: O(V + E)
- Dist array: O(V)
- Visited array: O(V)
- Heap: O(V)
- Total: O(V + E)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GREEDY CHOICE:
   - Always pick vertex with minimum distance
   - This distance is final (shortest path found)
   - Greedy choice is optimal
   - Ensures shortest paths

2️⃣ RELAXATION:
   - Update distances when shorter path found
   - dist[v] = min(dist[v], dist[u] + weight)
   - Correct shortest path calculation
   - Fundamental operation

3️⃣ MIN HEAP OPTIMIZATION:
   - Extract minimum in O(log V) time
   - Better than O(V) linear search
   - Optimizes vertex selection
   - Efficient for sparse graphs

4️⃣ VISITED SET:
   - Track finalized vertices
   - Prevents reprocessing
   - Handles heap duplicates correctly
   - Ensures correctness

5️⃣ ADJACENCY LIST:
   - Iterate only actual neighbors
   - O(degree) instead of O(V)
   - Efficient for sparse graphs
   - Better space utilization

💡 KEY INSIGHT:
Using min heap with adjacency list to optimize Dijkstra's algorithm, extracting vertex with minimum
distance in O(log V) time, relaxing edges to find shorter paths, and handling duplicates by checking
visited set. This achieves O((V + E) log V) time complexity, optimal for sparse graphs, with heap
storing [vertex, distance] pairs and relaxation ensuring shortest paths!

🎯 TIME COMPLEXITY ANALYSIS:
- V extractMin operations: O(V log V)
- E insert operations: O(E log V)
- Neighbor iteration: O(E)
- Total: O((V + E) log V)
- Optimal for sparse graphs

🎯 SPACE COMPLEXITY ANALYSIS:
- Adjacency list: O(V + E)
- Dist array: O(V)
- Visited array: O(V)
- Heap: O(V)
- Total: O(V + E)
- Linear in graph size

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex
Process: Extract [0, 0], no neighbors
Output: [0]

CASE 2: Two vertices
Input: Graph with edge 0-1(5)
Process: Extract [0,0], insert [1,5], extract [1,5]
Output: [0, 5]

CASE 3: Disconnected vertex
Input: Vertex 2 not reachable from 0
Process: dist[2] stays Infinity
Output: [0, 10, Infinity]

CASE 4: Multiple paths
Input: 0-1(10), 0-2(5), 2-1(2)
Process: Finds shortest via 0→2→1 (5+2=7)
Output: [0, 7, 5]

CASE 5: Self-loops
Input: Edge 0-0(5)
Process: dist[0] = min(0, 0+5) = 0, no change
Output: Correct handling

🎯 ALGORITHM CORRECTNESS:
- Finds shortest paths: ✓
- Optimal distances: ✓
- Handles all paths: ✓
- No negative cycles (non-negative weights): ✓
- Correct relaxation: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 115-117: Initialize arrays
- Line 120-122: Initialize heap with source
- Line 125-144: Heap-based processing
- Line 127: Extract minimum vertex
- Line 130: Check if finalized (handle duplicates)
- Line 134-142: Relax edges and insert into heap

🎯 RELAXATION OPERATION:

RELAXATION: dist[v] > dist[u] + weight

This checks if path through u is shorter:
- Current distance to v: dist[v]
- Distance via u: dist[u] + weight
- If via u is shorter: update dist[v]
- Insert into heap for processing

Example:
dist[1] = 4, dist[2] = 1, edge 2→1 with weight 2
dist[1] > dist[2] + 2? 4 > 1 + 2? 4 > 3? Yes!
Update: dist[1] = 3

This ensures shortest paths!

🎯 DUPLICATE HANDLING:

WHY DUPLICATES OCCUR:
- Multiple paths may update same vertex
- Each update inserts into heap
- Heap may contain [v, d1], [v, d2]
- Extract minimum first (better distance)

HOW TO HANDLE:
- Check visited[u] after extraction
- If already finalized, skip
- Prevents reprocessing duplicates
- Correct and efficient

This ensures correctness!

🎯 ADVANTAGES:
- O((V + E) log V) time complexity
- O(V + E) space complexity
- Efficient for sparse graphs
- Better than matrix representation
- Optimal shortest paths

🎯 DISADVANTAGES:
- Requires non-negative edge weights
- More complex than matrix version
- Heap overhead
- Duplicate handling needed
- Not for negative cycles

🎯 REAL-WORLD APPLICATIONS:
- GPS navigation systems
- Network routing protocols
- Social network analysis
- Game pathfinding
- Resource allocation
- Traffic optimization

🎯 RELATED PROBLEMS:
- Shortest path in unweighted graph (BFS)
- Shortest paths in DAG (topological sort)
- All-pairs shortest paths (Floyd-Warshall)
- Bellman-Ford (handles negative weights)
- A* algorithm (heuristic search)

🎯 TESTING STRATEGY:
- Single vertex
- Two vertices
- Linear graphs
- Dense graphs
- Sparse graphs
- Disconnected vertices
- Multiple paths

🎯 DEBUGGING TIPS:
- Print heap state after each extraction
- Trace dist array updates
- Monitor visited array changes
- Check relaxation conditions
- Verify shortest paths manually

🎯 COMMON MISTAKES:
- Not checking visited after extraction
- Wrong relaxation condition
- Inserting wrong distance into heap
- Not handling duplicates
- Negative edge weights (algorithm fails)

🎯 BEST PRACTICES:
- Always check visited after extraction
- Use correct relaxation condition
- Insert updated distance into heap
- Handle duplicates properly
- Verify non-negative weights

🎯 INTERVIEW TIPS:
- Explain min heap optimization
- Discuss relaxation operation
- Walk through example step by step
- Explain duplicate handling
- Analyze time/space complexity
- Compare with BFS and Bellman-Ford

🎯 DIJKSTRA VS PRIM'S:

DIJKSTRA:
- Finds shortest paths
- Uses dist array
- Relaxation: dist[v] > dist[u] + weight
- Returns distance array
- Source vertex

PRIM'S:
- Finds MST
- Uses key array
- Update: key[v] > weight
- Returns MST edges
- Any starting vertex

Different goals!

🎯 DIJKSTRA VS BFS:

BFS:
- Unweighted graphs
- O(V + E) time
- Queue-based
- Shortest path = minimum edges

DIJKSTRA:
- Weighted graphs (non-negative)
- O((V + E) log V) time
- Heap-based
- Shortest path = minimum weight

BFS is special case!

🎯 DIJKSTRA VS BELLMAN-FORD:

DIJKSTRA:
- Non-negative weights only
- O((V + E) log V) time
- Greedy approach
- Cannot handle negative cycles

BELLMAN-FORD:
- Handles negative weights
- O(VE) time
- Dynamic programming
- Can detect negative cycles

Choose based on weights!

🎯 HEAP CUSTOMIZATION:

STORE: [vertex, distance] pairs
COMPARE: Based on distance (second element)

Example heap:
[[2, 1], [1, 4], [3, 2]]
- Root: [2, 1] (minimum distance)
- Extract gives vertex with minimum distance
- Efficient O(log V) extraction

This optimizes vertex selection!

🎯 RELAXATION RATIONALE:

WHY RELAXATION?

- Explores paths incrementally
- Updates when shorter path found
- Ensures optimal distances
- Fundamental to shortest paths

Formula:
dist[v] = min(dist[v], dist[u] + weight)

This finds shortest paths!

🎯 CONCLUSION:
Finding shortest paths from source using Dijkstra's algorithm with adjacency list and min heap
optimization is efficiently achieved using heap to select vertex with minimum distance in O(log V)
time, relaxing edges to find shorter paths, updating distances when better paths found, and handling
duplicates by checking visited set, ensuring O((V + E) log V) time complexity and O(V + E) space
complexity, making it optimal for sparse graphs with non-negative edge weights!
*/