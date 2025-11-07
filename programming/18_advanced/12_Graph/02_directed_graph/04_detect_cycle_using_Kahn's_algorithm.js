/* Problem: ✅✅✅✅ Detect Cycle in Directed Graph using Kahn's Algorithm ✅✅✅✅

Given a directed graph, determine if it contains a cycle using Kahn's algorithm.
Kahn's algorithm is used for topological sorting. If we cannot process all vertices
(count < V), it means the graph contains a cycle.

The problem requires:
- Detect cycle in directed graph
- Use Kahn's algorithm (BFS-based approach)
- Return true if cycle exists, false otherwise
- Handle all vertices efficiently
- O(V + E) time complexity

You are given a directed graph with V vertices and E edges. Detect if the graph
contains a cycle using Kahn's algorithm. Return true if cycle exists, false otherwise.

Example 1:
Input: Graph with edges: 0→1, 1→2, 2→0 (cycle)
Output: true
Explanation:
- Initial indegrees: [1, 1, 1]
- No vertex has indegree 0
- Queue is empty, count = 0
- count (0) < V (3) → Cycle detected

Example 2:
Input: Graph with edges: 0→1, 0→2, 1→3, 2→3 (DAG)
Output: false
Explanation:
- Initial indegrees: [0, 1, 1, 2]
- Vertex 0 has indegree 0, start processing
- All vertices processed, count = 4
- count (4) == V (4) → No cycle

Example 3:
Input: Graph with edges: 0→1, 1→2, 2→1 (cycle)
Output: true
Explanation:
- Initial indegrees: [0, 2, 1]
- Vertex 0 has indegree 0, process it
- After processing 0: indegrees: [0, 1, 1]
- Queue becomes empty, count = 1
- count (1) < V (3) → Cycle detected

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- Graph may contain cycles

Expected Complexities:
Time Complexity: O(V + E) - using BFS-based approach
Auxiliary Space: O(V) - for queue and indegree array
*/

class DirectedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        this.indegree = new Array(V).fill(0); // Track in-degree of each vertex
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(1)
    addEdge(from, to){
        this.adj[from].push(to); // Only add one direction for directed graph
        this.indegree[to]++; // Increment in-degree of destination vertex
    }
    
    // ✅ TC = O(V)
    getIndegree(vertex){
        return this.indegree[vertex];
    }
    
    // ✅ Kahn's Algorithm - BFS based cycle detection
    // ✅ This algorithm is used to detect cycle in a Directed Acyclic Graph (DAG). not for directed cyclic graph.
    // ✅ TC = O(V + E)
    // ✅ SC = O(V)
    detectCycle(){
        // 1. Create a working copy of indegree array
        let indegree = [...this.indegree];
        
        // 2. Create a queue and add all vertices with indegree 0
        let q = [];
        for(let i = 0; i < this.V; i++){
            if(indegree[i] === 0){
                q.push(i);
            }
        }

        // 3. Result array to store topological order
        let count = 0; // Count of processed vertices

        // 4. Process vertices until queue is empty
        while(q.length > 0){
            // a. Deque a vertex with indegree 0
            let u = q.shift();
            count++;

            // b. Reduce indegree of all adjacent vertices
            for(let v of this.adj[u]){
                indegree[v]--;
                // c. If indegree becomes 0, add it to queue
                if(indegree[v] === 0){
                    q.push(v);
                }
            }
        }

        // 5. Check if all vertices were processed (graph is DAG)
        if(count !== this.V){
            // If not all vertices were processed, then there is a cycle. 
            return true; 
        }
        
        // If all vertices were processed, then there is no cycle.
        return false;
    }
    
    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" ") + ` (indegree: ${this.indegree[i]})`);
        }
    }
}

// Test cases
let g1 = new DirectedGraph(3);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 0); // Creates cycle
console.log("Test 1:", g1.detectCycle()); // true (cycle detected)

let g2 = new DirectedGraph(4);
g2.addEdge(0, 1);
g2.addEdge(0, 2);
g2.addEdge(1, 3);
g2.addEdge(2, 3);
console.log("Test 2:", g2.detectCycle()); // false (no cycle, DAG)

let g3 = new DirectedGraph(3);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
g3.addEdge(2, 1); // Creates cycle between 1 and 2
console.log("Test 3:", g3.detectCycle()); // true (cycle detected)

let g4 = new DirectedGraph(1);
console.log("Test 4:", g4.detectCycle()); // false (single vertex, no cycle)

/*🎯 CORE IDEA: Use Kahn's algorithm to detect cycles in directed graph by attempting topological sort.
If we cannot process all vertices (count < V), it means some vertices form cycles and never get
indegree 0. This indicates the graph contains a cycle. Return true if cycle exists, false otherwise.

📋 STEP-BY-STEP FLOW:

1️⃣ INDEGREE TRACKING:
   - Maintain indegree array (incoming edges count)
   - Updated when edges are added
   - Used to find starting vertices
   - Critical for cycle detection

2️⃣ INITIALIZATION:
   - Create working copy of indegree array
   - Find all vertices with indegree 0
   - Add them to queue
   - Initialize count to 0

3️⃣ BFS PROCESSING:
   - Dequeue vertex with indegree 0
   - Increment count
   - Process all its neighbors
   - Reduce their indegree by 1
   - Add neighbors with indegree 0 to queue

4️⃣ CYCLE DETECTION:
   - Count processed vertices
   - If count < V, cycle exists
   - Return true if cycle detected
   - Return false if no cycle (DAG)

5️⃣ RESULT:
   - true: Cycle exists (count < V)
   - false: No cycle (count == V)
   - Simple boolean return

🧠 WHY THIS APPROACH?
- Uses Kahn's algorithm logic
- Efficient O(V + E) time complexity
- Natural cycle detection
- No additional DFS/coloring needed
- Optimal for cycle detection

💡 KEY INSIGHTS:
- If all vertices processed (count == V), no cycle
- If some vertices not processed (count < V), cycle exists
- Vertices in cycles never get indegree 0
- Queue becomes empty while vertices remain
- Simple count comparison detects cycle
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Cycle Detected

INPUT: Graph with edges: 0→1, 1→2, 2→0 (cycle)
EXPECTED OUTPUT: true

Graph representation:
0 → 1 → 2 → 0 (cycle)

🎯 GOAL: Detect cycle!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Calculate Initial Indegrees
indegree = [1, 1, 1]
- Vertex 0: indegree 1 (edge from 2)
- Vertex 1: indegree 1 (edge from 0)
- Vertex 2: indegree 1 (edge from 1)

STEP 2: Initialize Queue
Queue: [] (no vertex with indegree 0!)
Count: 0

STEP 3: Processing
Queue is empty immediately
Count remains 0

STEP 4: Check Result
Count (0) < V (3) ✗
Cycle detected!
Return: true

🏆 RESULT: true (cycle detected)

─────────────────────────────────────────

📊 EXAMPLE 2: No Cycle (DAG)

INPUT: Graph with edges: 0→1, 0→2, 1→3, 2→3
EXPECTED OUTPUT: false

Graph representation:
    0
   / \
  1   2
   \ /
    3

🎯 GOAL: Verify no cycle!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Calculate Initial Indegrees
indegree = [0, 1, 1, 2]
- Vertex 0: indegree 0 (no incoming edges)
- Vertex 1: indegree 1 (edge from 0)
- Vertex 2: indegree 1 (edge from 0)
- Vertex 3: indegree 2 (edges from 1 and 2)

STEP 2: Initialize Queue
Queue: [0] (vertex with indegree 0)
Count: 0

STEP 3: Process Vertex 0
Dequeue: 0
Count: 1
Process neighbors of 0: [1, 2]
- For vertex 1: indegree[1] = 1 - 1 = 0 → Add to queue
- For vertex 2: indegree[2] = 1 - 1 = 0 → Add to queue
Queue: [1, 2]
indegree = [0, 0, 0, 2]

STEP 4: Process Vertex 1
Dequeue: 1
Count: 2
Process neighbors of 1: [3]
- For vertex 3: indegree[3] = 2 - 1 = 1
Queue: [2]
indegree = [0, 0, 0, 1]

STEP 5: Process Vertex 2
Dequeue: 2
Count: 3
Process neighbors of 2: [3]
- For vertex 3: indegree[3] = 1 - 1 = 0 → Add to queue
Queue: [3]
indegree = [0, 0, 0, 0]

STEP 6: Process Vertex 3
Dequeue: 3
Count: 4
Process neighbors of 3: [] (no neighbors)
Queue: []
indegree = [0, 0, 0, 0]

STEP 7: Check Result
Count (4) == V (4) ✓
No cycle detected
Return: false

🏆 RESULT: false (no cycle)

─────────────────────────────────────────

📊 EXAMPLE 3: Partial Cycle

INPUT: Graph with edges: 0→1, 1→2, 2→1 (cycle between 1 and 2)
EXPECTED OUTPUT: true

Graph representation:
0 → 1 ↔ 2 (cycle between 1 and 2)

🎯 GOAL: Detect cycle!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Calculate Initial Indegrees
indegree = [0, 2, 1]
- Vertex 0: indegree 0 (no incoming edges)
- Vertex 1: indegree 2 (edges from 0 and 2)
- Vertex 2: indegree 1 (edge from 1)

STEP 2: Initialize Queue
Queue: [0] (vertex with indegree 0)
Count: 0

STEP 3: Process Vertex 0
Dequeue: 0
Count: 1
Process neighbors of 0: [1]
- For vertex 1: indegree[1] = 2 - 1 = 1
Queue: []
indegree = [0, 1, 1]

STEP 4: Check Result
Queue is empty, but count (1) < V (3) ✗
Cycle detected!
Return: true

🏆 RESULT: true (cycle detected between 1 and 2)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

CYCLE DETECTION EXECUTION:

Graph with cycle: 0→1, 1→2, 2→0

Initial State:
Queue: [] (no indegree 0 vertices)
indegree: [1, 1, 1]
Count: 0

Result: Queue empty, count < V
Cycle detected: true

─────────────────────────────────────────

Graph without cycle: 0→1, 0→2, 1→3, 2→3

Initial State:
Queue: [0]
indegree: [0, 1, 1, 2]
Count: 0

After processing 0:
Queue: [1, 2]
indegree: [0, 0, 0, 2]
Count: 1

After processing 1:
Queue: [2]
indegree: [0, 0, 0, 1]
Count: 2

After processing 2:
Queue: [3]
indegree: [0, 0, 0, 0]
Count: 3

After processing 3:
Queue: []
indegree: [0, 0, 0, 0]
Count: 4

Result: count == V
No cycle: false

─────────────────────────────────────────

📊 WHY COUNT < V MEANS CYCLE?

INDEGREE CONCEPT:
- Vertices in cycles have dependencies on each other
- They can never reach indegree 0
- They never get added to queue
- They never get processed

EXAMPLE:
Graph: 0→1, 1→2, 2→0
- All vertices have indegree 1
- No vertex can be processed
- Count remains 0
- 0 < 3 → Cycle exists

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initialize indegree: O(V)
- Find vertices with indegree 0: O(V)
- BFS traversal: O(V + E)
- Total: O(V + E)

SPACE COMPLEXITY:
- Indegree array: O(V)
- Queue: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ INDEGREE TRACKING:
   - Tracks dependencies for each vertex
   - Vertices in cycles maintain indegree > 0
   - They never become available for processing
   - Cycle detection through count comparison

2️⃣ BFS PROCESSING:
   - Process vertices with no dependencies first
   - Reduce indegree of neighbors
   - Only vertices outside cycles get processed
   - Count tracks processed vertices

3️⃣ CYCLE DETECTION LOGIC:
   - If count == V: all vertices processed, no cycle
   - If count < V: some vertices not processed
   - Unprocessed vertices form cycles
   - Simple and efficient detection

4️⃣ NO NEED FOR DFS:
   - Kahn's algorithm naturally detects cycles
   - No recursion stack or coloring needed
   - Queue-based approach is efficient
   - Simpler implementation

5️⃣ CORRECTNESS:
   - All vertices in DAG can be processed
   - Vertices in cycles cannot be processed
   - Count comparison is sufficient
   - Optimal solution

💡 KEY INSIGHT:
Using Kahn's algorithm to attempt topological sort, if count of processed vertices is less than
total vertices (count < V), it means some vertices form cycles and never get indegree 0, indicating
the graph contains a cycle. This provides efficient O(V + E) cycle detection without additional
DFS traversal or coloring!

🎯 TIME COMPLEXITY ANALYSIS:
- Initialize indegree: O(V)
- Find starting vertices: O(V)
- BFS traversal: O(V + E)
- Total: O(V + E)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Indegree array: O(V)
- Queue: O(V)
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single vertex, no edges
Input: Graph with 1 vertex, no edges
Process: Vertex has indegree 0, process it
Count: 1, V: 1
Result: false (no cycle)

CASE 2: Single vertex, self-loop
Input: Graph with edge: 0→0
Process: Vertex has indegree 1, cannot process
Count: 0, V: 1
Result: true (cycle detected)

CASE 3: Disconnected graph with cycle
Input: Graph with edges: 0→1, 1→0, 2→3, 3→4
Process: First component has cycle
Count: 0, V: 5
Result: true (cycle detected)

CASE 4: Linear graph (chain)
Input: Graph with edges: 0→1→2→3
Process: All vertices processed in order
Count: 4, V: 4
Result: false (no cycle)

CASE 5: Multiple cycles
Input: Graph with edges: 0→1, 1→0, 2→3, 3→2
Process: Multiple cycles, none can be processed
Count: 0, V: 4
Result: true (cycles detected)

🎯 ALGORITHM CORRECTNESS:
- Detects cycles correctly: ✓
- Handles DAG correctly: ✓
- Works for all graph structures: ✓
- Handles all edge cases: ✓
- Optimal time complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 27-28: Create working copy of indegree
- Line 30-36: Initialize queue with indegree 0 vertices
- Line 38-39: Initialize count
- Line 41-56: BFS processing loop
- Line 58-65: Cycle detection and return

🎯 QUEUE OPERATIONS:

ENQUEUE:
- Add vertex to end of queue
- Time: O(1)

DEQUEUE:
- Remove vertex from front of queue
- Time: O(1)

BFS TRAVERSAL:
- Process vertices level by level
- Time: O(V + E)
- Counts processed vertices

🎯 INDEGREE UPDATES:

WHEN PROCESSING VERTEX U:
for each neighbor v of u:
  indegree[v]--
  if indegree[v] == 0:
    enqueue(v)
count++

This tracks processed vertices correctly!

🎯 ADVANTAGES:
- O(V + E) time complexity
- O(V) space complexity
- Simple implementation
- No DFS/coloring needed
- Natural cycle detection

🎯 DISADVANTAGES:
- Only works for directed graphs
- Requires indegree calculation
- Cannot identify which vertices form cycle
- Not optimal for undirected graphs

🎯 REAL-WORLD APPLICATIONS:
- Dependency checking in build systems
- Deadlock detection
- Task scheduling validation
- Package dependency resolution
- Circular reference detection
- System dependency analysis

🎯 RELATED PROBLEMS:
- Detect cycle using DFS
- Detect cycle using coloring
- Topological sorting
- Strongly connected components
- Cycle detection in undirected graph
- Dependency resolution

🎯 TESTING STRATEGY:
- Single vertex
- Self-loops
- Simple cycles
- Multiple cycles
- Complex DAGs
- Disconnected graphs

🎯 DEBUGGING TIPS:
- Print indegree array after initialization
- Trace queue operations
- Monitor count updates
- Check count vs V comparison
- Verify indegree reductions

🎯 COMMON MISTAKES:
- Not creating copy of indegree array
- Forgetting to increment count
- Wrong cycle detection logic (count > V instead of < V)
- Queue not initialized correctly
- Missing edge cases

🎯 BEST PRACTICES:
- Always copy indegree array
- Initialize queue properly
- Track count accurately
- Compare count with V correctly
- Handle all edge cases

🎯 INTERVIEW TIPS:
- Explain Kahn's algorithm logic
- Discuss why count < V indicates cycle
- Walk through example step by step
- Analyze time/space complexity
- Compare with DFS approach
- Mention applications

🎯 CYCLE DETECTION RATIONALE:

IF count == V:
  All vertices processed
  No vertices in cycles
  Graph is DAG
  Return false

ELSE (count < V):
  Some vertices not processed
  These vertices have indegree > 0
  They form cycles
  Return true

This correctly detects cycles!

🎯 WHY VERTICES IN CYCLES CAN'T BE PROCESSED:

CYCLE PROPERTY:
- Vertices in cycles depend on each other
- Each vertex has indegree from another in cycle
- They never reach indegree 0
- They never get added to queue
- They never get processed

EXAMPLE:
Cycle: 0→1, 1→2, 2→0
- Each vertex has indegree 1
- No vertex can be processed first
- Count remains 0
- Cycle detected

This explains why count < V indicates cycle!

🎯 BFS VS DFS FOR CYCLE DETECTION:

KAHN'S (BFS):
- Attempt topological sort
- Count processed vertices
- If count < V, cycle exists
- O(V + E) time
- O(V) space

DFS WITH COLORING:
- Use three colors (white, gray, black)
- Gray vertex → back edge → cycle
- O(V + E) time
- O(V) space
- More complex

KAHN'S SIMPLER for this purpose!

🎯 COMPARISON WITH ALTERNATIVES:

DFS APPROACH:
function detectCycleDFS(graph) {
  // Use recursion stack or coloring
  // Detect back edges
  // More complex logic
}
- Time: O(V + E)
- Space: O(V)
- More complex

KAHN'S ALGORITHM:
- Attempt topological sort
- Count processed vertices
- Simple count comparison
- Time: O(V + E)
- Space: O(V)
- Simpler and intuitive

🎯 CONCLUSION:
Detecting cycle in directed graph using Kahn's algorithm is efficiently achieved by attempting
topological sort, counting processed vertices, and comparing count with total vertices. If count
< V, some vertices form cycles and never get indegree 0, indicating cycle existence. This provides
O(V + E) time complexity and O(V) space complexity, offering a simple and efficient solution for
cycle detection in directed graphs!
*/
