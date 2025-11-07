/* Problem: ✅✅✅✅ Topological Sorting using Kahn's Algorithm ✅✅✅✅

Given a Directed Acyclic Graph (DAG), find a topological ordering of its vertices.
A topological sort is a linear ordering of vertices such that for every directed edge (u, v),
vertex u comes before vertex v in the ordering. This algorithm can also detect cycles in the graph.

The problem requires:
- Find topological order of vertices in a DAG
- Use Kahn's algorithm (BFS-based approach)
- Detect cycles (if count < V, cycle exists)
- Handle all vertices efficiently
- Return ordering or null if cycle detected

You are given a directed graph with V vertices and E edges. Find a topological ordering
of vertices using Kahn's algorithm. If the graph contains a cycle, return null.

Example 1:
Input: Graph with edges: 0→1, 0→2, 1→3, 2→3
Output: [0, 1, 2, 3] or [0, 2, 1, 3]
Explanation: 
- 0 has no incoming edges (indegree 0), so it comes first
- After processing 0, 1 and 2 become available (indegree 0)
- After processing 1 and 2, 3 becomes available
- All vertices processed, valid topological order

Example 2:
Input: Graph with edges: 0→1, 1→2, 2→0 (cycle)
Output: null
Explanation:
- Initial: only vertices with indegree 0 can start
- But all vertices have indegree 1 (cycle)
- No vertex can be processed, count < V
- Cycle detected, return null

Example 3:
Input: Graph with edges: 0→1, 0→3, 1→2, 3→2
Output: [0, 1, 3, 2] or [0, 3, 1, 2]
Explanation:
- 0 has indegree 0, process first
- After 0: 1 and 3 have indegree 0
- After 1 and 3: 2 has indegree 0
- All vertices processed, valid order

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
    
    // ✅ Kahn's Algorithm - BFS based topological sorting
    // ✅ This algorithm is used to find the topological order of a Directed Acyclic Graph (DAG). not for directed cyclic graph.
    // ✅ TC = O(V + E)
    // ✅ SC = O(V)
    topologicalSort(){
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
        let result = [];
        let count = 0; // Count of processed vertices

        // 4. Process vertices until queue is empty
        while(q.length > 0){
            // a. Dequeue a vertex with indegree 0
            let u = q.shift();
            result.push(u);
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
            console.log("Cycle detected! Cannot perform topological sort.");
            return null;
        }

        return result;
    }
    
    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" ") + ` (indegree: ${this.indegree[i]})`);
        }
    }
}

// Test cases
let g1 = new DirectedGraph(4);
g1.addEdge(0, 1);
g1.addEdge(0, 2);
g1.addEdge(1, 3);
g1.addEdge(2, 3);
console.log("Test 1:", g1.topologicalSort()); // [0, 1, 2, 3] or [0, 2, 1, 3]

let g2 = new DirectedGraph(3);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
g2.addEdge(2, 0); // Creates cycle
console.log("Test 2:", g2.topologicalSort()); // null (cycle detected)

let g3 = new DirectedGraph(4);
g3.addEdge(0, 1);
g3.addEdge(0, 3);
g3.addEdge(1, 2);
g3.addEdge(3, 2);
console.log("Test 3:", g3.topologicalSort()); // [0, 1, 3, 2] or [0, 3, 1, 2]

/*🎯 CORE IDEA: Use Kahn's algorithm (BFS-based) to find topological ordering of a DAG.
Start with all vertices having indegree 0, process them level by level, and reduce indegree
of their neighbors. When a vertex's indegree becomes 0, add it to queue. If count < V after
processing, cycle exists. This ensures vertices with no dependencies come first.

📋 STEP-BY-STEP FLOW:

1️⃣ INDEGREE TRACKING:
   - Maintain indegree array (incoming edges count)
   - Updated when edges are added
   - Used to find starting vertices
   - Critical for algorithm correctness

2️⃣ INITIALIZATION:
   - Create working copy of indegree array
   - Find all vertices with indegree 0
   - Add them to queue
   - Start BFS traversal

3️⃣ BFS PROCESSING:
   - Dequeue vertex with indegree 0
   - Add to result array
   - Process all its neighbors
   - Reduce their indegree by 1
   - Add neighbors with indegree 0 to queue

4️⃣ CYCLE DETECTION:
   - Count processed vertices
   - If count < V, cycle exists
   - Return null if cycle detected
   - Otherwise return topological order

5️⃣ RESULT GENERATION:
   - Result array contains topological order
   - Vertices appear in dependency order
   - Valid for DAG only
   - Return ordering or null

🧠 WHY THIS APPROACH?
- BFS-based level-by-level processing
- Efficient O(V + E) time complexity
- Natural dependency resolution
- Cycle detection built-in
- Optimal for topological sorting

💡 KEY INSIGHTS:
- Start with vertices having no dependencies (indegree 0)
- Process level by level using queue
- Reduce indegree of neighbors after processing
- Add vertices to queue when indegree becomes 0
- Count processed vertices to detect cycles
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Topological Sort of DAG

INPUT: Graph with edges: 0→1, 0→2, 1→3, 2→3
EXPECTED OUTPUT: [0, 1, 2, 3] or [0, 2, 1, 3]

Graph representation:
    0
   / \
  1   2
   \ /
    3

🎯 GOAL: Find topological ordering!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Calculate Initial Indegrees
indegree = [0, 1, 1, 2]
- Vertex 0: indegree 0 (no incoming edges)
- Vertex 1: indegree 1 (edge from 0)
- Vertex 2: indegree 1 (edge from 0)
- Vertex 3: indegree 2 (edges from 1 and 2)

STEP 2: Initialize Queue
Queue: [0] (only vertex with indegree 0)
Result: []
Count: 0

STEP 3: Process Vertex 0
Dequeue: 0
Result: [0]
Count: 1
Process neighbors of 0: [1, 2]
- For vertex 1: indegree[1] = 1 - 1 = 0 → Add to queue
- For vertex 2: indegree[2] = 1 - 1 = 0 → Add to queue
Queue: [1, 2]
indegree = [0, 0, 0, 2]

STEP 4: Process Vertex 1
Dequeue: 1
Result: [0, 1]
Count: 2
Process neighbors of 1: [3]
- For vertex 3: indegree[3] = 2 - 1 = 1
Queue: [2]
indegree = [0, 0, 0, 1]

STEP 5: Process Vertex 2
Dequeue: 2
Result: [0, 1, 2]
Count: 3
Process neighbors of 2: [3]
- For vertex 3: indegree[3] = 1 - 1 = 0 → Add to queue
Queue: [3]
indegree = [0, 0, 0, 0]

STEP 6: Process Vertex 3
Dequeue: 3
Result: [0, 1, 2, 3]
Count: 4
Process neighbors of 3: [] (no neighbors)
Queue: []
indegree = [0, 0, 0, 0]

STEP 7: Check Result
Count (4) === V (4) ✓
No cycle detected
Return: [0, 1, 2, 3]

🏆 FINAL RESULT: [0, 1, 2, 3]
Alternative: [0, 2, 1, 3] (vertices 1 and 2 can be interchanged)

─────────────────────────────────────────

📊 EXAMPLE 2: Cycle Detection

INPUT: Graph with edges: 0→1, 1→2, 2→0 (cycle)
EXPECTED OUTPUT: null

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
Result: []
Count: 0

STEP 3: Check Result
Queue is empty, but count (0) < V (3) ✗
Cycle detected!
Return: null

🏆 RESULT: null (cycle detected)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

KAHN'S ALGORITHM EXECUTION:

Graph: 0→1, 0→2, 1→3, 2→3

Initial State:
Queue: [0]
indegree: [0, 1, 1, 2]
Result: []

After processing 0:
Queue: [1, 2]
indegree: [0, 0, 0, 2]
Result: [0]

After processing 1:
Queue: [2]
indegree: [0, 0, 0, 1]
Result: [0, 1]

After processing 2:
Queue: [3]
indegree: [0, 0, 0, 0]
Result: [0, 1, 2]

After processing 3:
Queue: []
indegree: [0, 0, 0, 0]
Result: [0, 1, 2, 3]

Final: [0, 1, 2, 3]

─────────────────────────────────────────

📊 INDEGREE CONCEPT:

INDEGREE: Number of incoming edges to a vertex

For edge u → v:
- u has outgoing edge
- v has incoming edge
- indegree[v] increases

Example:
Graph: 0→1, 0→2, 1→3
- Vertex 0: 0 incoming edges → indegree 0
- Vertex 1: 1 incoming edge (from 0) → indegree 1
- Vertex 2: 1 incoming edge (from 0) → indegree 1
- Vertex 3: 1 incoming edge (from 1) → indegree 1

─────────────────────────────────────────

📊 WHY INDEGREE 0 FIRST?

- Vertices with indegree 0 have no dependencies
- They can be processed immediately
- Processing them reduces dependencies of neighbors
- Creates valid topological order
- Natural dependency resolution

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
- Result array: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ INDEGREE TRACKING:
   - Tracks dependencies for each vertex
   - Updated during edge addition
   - Used to find starting vertices
   - Critical for algorithm

2️⃣ BFS PROCESSING:
   - Level-by-level traversal
   - Process vertices with no dependencies first
   - Natural dependency resolution
   - Efficient queue-based approach

3️⃣ INDEGREE REDUCTION:
   - After processing vertex, reduce neighbors' indegree
   - When indegree becomes 0, vertex becomes available
   - Ensures correct ordering
   - Maintains dependency constraints

4️⃣ CYCLE DETECTION:
   - If count < V, some vertices not processed
   - These vertices form cycles
   - They never get indegree 0
   - Cycle detected correctly

5️⃣ RESULT VALIDATION:
   - All vertices processed → valid DAG
   - Result is topological order
   - Satisfies all dependency constraints
   - Optimal ordering

💡 KEY INSIGHT:
Using BFS-based approach starting with vertices having indegree 0, processing them level by level,
reducing indegree of neighbors, and adding vertices to queue when their indegree becomes 0,
ensuring correct topological ordering with O(V + E) time complexity, while detecting cycles
when count < V!

🎯 TIME COMPLEXITY ANALYSIS:
- Initialize indegree: O(V)
- Find starting vertices: O(V)
- BFS traversal: O(V + E)
- Total: O(V + E)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Indegree array: O(V)
- Queue: O(V)
- Result array: O(V)
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: Vertex has indegree 0, process immediately
Result: [0]
Output: [0]

CASE 2: No edges (disconnected vertices)
Input: Graph with 3 vertices, no edges
Process: All vertices have indegree 0
Result: [0, 1, 2] (or any permutation)
Output: [0, 1, 2]

CASE 3: Linear graph (chain)
Input: Graph with edges: 0→1→2→3
Process: Process vertices in order
Result: [0, 1, 2, 3]
Output: [0, 1, 2, 3]

CASE 4: Self-loop
Input: Graph with edge: 0→0
Process: Vertex has indegree 1 (from itself)
Queue: [] (no indegree 0)
Result: null
Output: null (cycle detected)

CASE 5: Multiple valid orders
Input: Graph with edges: 0→1, 0→2
Process: Both 1 and 2 can be processed after 0
Result: [0, 1, 2] or [0, 2, 1]
Output: [0, 1, 2] (implementation dependent)

🎯 ALGORITHM CORRECTNESS:
- Maintains topological order: ✓
- Processes all dependencies first: ✓
- Detects cycles correctly: ✓
- Handles all edge cases: ✓
- Optimal time complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 27-28: Create working copy of indegree
- Line 30-36: Initialize queue with indegree 0 vertices
- Line 38-40: Initialize result and count
- Line 42-58: BFS processing loop
- Line 60-64: Cycle detection and validation

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
- Ensures correct ordering

🎯 INDEGREE UPDATES:

WHEN PROCESSING VERTEX U:
for each neighbor v of u:
  indegree[v]--
  if indegree[v] == 0:
    enqueue(v)

This ensures correct dependency resolution!

🎯 ADVANTAGES:
- O(V + E) time complexity
- O(V) space complexity
- Simple implementation
- Cycle detection built-in
- Natural BFS approach

🎯 DISADVANTAGES:
- Only works for directed graphs
- Requires indegree calculation
- Multiple valid orders possible
- Not optimal for dense graphs

🎯 REAL-WORLD APPLICATIONS:
- Task scheduling
- Build system dependencies
- Course prerequisites
- Package management
- Event ordering
- Project management

🎯 RELATED PROBLEMS:
- Topological sort (DFS-based)
- Cycle detection in directed graph
- Longest path in DAG
- Critical path method
- Dependency resolution
- Course schedule problems

🎯 TESTING STRATEGY:
- Single vertex
- Linear graph
- Tree structure
- Complex DAG
- Cycle detection
- Multiple valid orders

🎯 DEBUGGING TIPS:
- Print indegree array after initialization
- Trace queue operations
- Monitor indegree updates
- Check count vs V
- Verify result ordering

🎯 COMMON MISTAKES:
- Not creating copy of indegree array
- Forgetting to update indegree
- Wrong cycle detection logic
- Queue not initialized correctly
- Missing edge cases

🎯 BEST PRACTICES:
- Always copy indegree array
- Initialize queue properly
- Track count accurately
- Handle cycle detection
- Validate result ordering

🎯 INTERVIEW TIPS:
- Explain indegree concept clearly
- Walk through example step by step
- Discuss cycle detection
- Analyze time/space complexity
- Compare with DFS approach
- Mention applications

🎯 INDEGREE RATIONALE:
- Indegree = number of dependencies
- Vertices with indegree 0 have no dependencies
- They can be processed first
- Processing reduces dependencies
- Creates valid ordering

This ensures correctness!

🎯 BFS VS DFS APPROACH:

KAHN'S (BFS):
- Start with indegree 0 vertices
- Process level by level
- Natural dependency resolution
- Cycle detection via count
- O(V + E) time

DFS APPROACH:
- Use DFS with stack
- Push vertex after processing neighbors
- Reverse stack for ordering
- Cycle detection via recursion stack
- O(V + E) time

Both valid, Kahn's more intuitive!

🎯 CYCLE DETECTION LOGIC:

IF count < V:
  Some vertices not processed
  These vertices have indegree > 0
  They form cycles
  Return null

ELSE:
  All vertices processed
  Valid DAG
  Return topological order

This correctly detects cycles!

🎯 COMPARISON WITH ALTERNATIVES:

NAIVE APPROACH:
- Try all permutations
- Check validity
- Time: O(V! * E)
- Space: O(V)
- Very inefficient

DFS APPROACH:
- Use DFS with stack
- Time: O(V + E)
- Space: O(V)
- Similar complexity
- Different approach

KAHN'S ALGORITHM:
- BFS-based
- Time: O(V + E)
- Space: O(V)
- Intuitive and efficient
- Optimal solution

🎯 CONCLUSION:
Topological sorting using Kahn's algorithm is efficiently achieved using BFS-based approach,
starting with vertices having indegree 0, processing them level by level, reducing indegree
of neighbors, and adding vertices to queue when their indegree becomes 0, ensuring correct
topological ordering with O(V + E) time complexity and O(V) space complexity, while detecting
cycles when count < V, providing optimal solution for dependency ordering in directed graphs!
*/
