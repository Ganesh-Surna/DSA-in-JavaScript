/* Problem: ✅✅✅✅ Strongly Connected Components using Kosaraju's Algorithm ✅✅✅✅

Given a directed graph, find all Strongly Connected Components (SCCs) using Kosaraju's algorithm.
A strongly connected component is a set of vertices such that for any two vertices u and v in the 
component, there is a path from u to v and from v to u.

The algorithm requires:
- Find all SCCs in a directed graph
- Use Kosaraju's algorithm (two-pass DFS)
- Step 1: Order vertices by decreasing finish times (DFS on original graph)
- Step 2: Reverse all edges to create transpose graph
- Step 3: DFS on reversed graph in order from Step 1
- Return all SCCs

Example 1 (from first image):
Input: Graph with edges: 0→1, 1→2, 1→3, 2→0, 3→4
Output: [[1, 0, 2], [3], [4]]
Explanation:
- Step 1: DFS finish times: 1(10), 3(9), 4(8), 2(5), 0(4)
- Step 2: Reverse all edges
- Step 3: DFS on reversed graph in order [1,3,4,2,0]
  * From 1: reaches 0 and 2 → SCC: {1, 0, 2}
  * From 3: only itself → SCC: {3}
  * From 4: only itself → SCC: {4}

Example 2 (from second image):
Input: Graph with edges: 0→1, 1→2, 2→3, 3→0, 3→4, 4→5, 5→4
Output: [[0, 3, 2, 1], [4, 5]]
Explanation:
- Two cycles: 0→1→2→3→0 and 4→5→4
- These form two separate SCCs

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- Graph can have cycles
- All edges are directed

Expected Complexities:
Time Complexity: O(V + E) - two passes of DFS
Auxiliary Space: O(V + E) - for adjacency lists, visited array, and transpose graph
*/

class DirectedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Adjacency list
        for(let i = 0; i < V; i++){
            this.adj[i] = [];
        }
    }

    // ✅ TC = O(1)
    addEdge(from, to){
        this.adj[from].push(to); // Only add one direction for directed graph
    }
    
    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" "));
        }
    }
}

/*🎯 CORE IDEA: Kosaraju's algorithm uses two-pass DFS:
   Step 1: DFS on original graph, push vertices to stack after processing (post-order OR Topological Sorting)
   Step 2: Reverse all edges to create transpose graph
   Step 3: Pop vertices from stack, DFS on transpose graph
   
   Each DFS tree in Step 3 is an SCC because:
   - Finish time ordering ensures we start DFS from "sink" components
   - Reversed edges prevent exploration beyond SCC boundaries
   - All vertices reachable in reversed graph form one SCC
*/

// ✅ TC = O(V + E) - Two DFS passes
// ✅ SC = O(V + E) - Visited arrays, stack, transpose graph
function kosarajuSCC(graph){
    const V = graph.V;
    const adj = graph.adj;
    
    // Step 1: DFS on original graph, get vertices ordered by decreasing finish times
    const visited = new Array(V).fill(false);
    const stack = [];
    
    // First DFS pass: push vertices in post-order (after processing all neighbors) OR Topological Sorting
    const dfs1 = (u) => {
        visited[u] = true;
        for(let v of adj[u]){
            if(!visited[v]){
                dfs1(v);
            }
        }
        // Push after processing all neighbors (post-order)
        stack.push(u);
    };
    
    // Perform DFS for all unvisited vertices
    for(let i = 0; i < V; i++){
        if(!visited[i]){
            dfs1(i);
        }
    }
    
    // Step 2: Create transpose graph (reverse all edges)
    const transposeAdj = new Array(V);
    for(let i = 0; i < V; i++){
        transposeAdj[i] = [];
    }
    for(let u = 0; u < V; u++){
        for(let v of adj[u]){
            // Reverse edge: v → u (original was u → v). Because it is a Directed Graph.
            transposeAdj[v].push(u);
        }
    }
    
    // Step 3: DFS on transpose graph in order from stack
    const visited2 = new Array(V).fill(false);
    const sccs = [];
    
    const dfs2 = (u, currentSCC) => {
        visited2[u] = true;
        currentSCC.push(u);
        for(let v of transposeAdj[u]){
            if(!visited2[v]){
                dfs2(v, currentSCC);
            }
        }
    };
    
    // Process vertices in decreasing order of finish times (pop from stack)
    while(stack.length > 0){
        const u = stack.pop();
        if(!visited2[u]){
            const currentSCC = [];
            dfs2(u, currentSCC);
            sccs.push(currentSCC);
        }
    }
    
    return sccs;
}

// Test cases
let g1 = new DirectedGraph(5);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(1, 3);
g1.addEdge(2, 0);
g1.addEdge(3, 4);
console.log("Test 1:", kosarajuSCC(g1)); // [[1, 0, 2], [3], [4]]

let g2 = new DirectedGraph(6);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
g2.addEdge(2, 3);
g2.addEdge(3, 0);
g2.addEdge(3, 4);
g2.addEdge(4, 5);
g2.addEdge(5, 4);
console.log("Test 2:", kosarajuSCC(g2)); // [[0, 3, 2, 1], [4, 5]]

/*🎯 CORE IDEA: Kosaraju's algorithm uses two-pass DFS:
   Step 1: DFS on original graph, push vertices to stack after processing (post-order OR Topological Sorting)
   Step 2: Reverse all edges to create transpose graph
   Step 3: Pop vertices from stack, DFS on transpose graph
   
   Each DFS tree in Step 3 is an SCC because:
   - Finish time ordering ensures we start DFS from "sink" components
   - Reversed edges prevent exploration beyond SCC boundaries
   - All vertices reachable in reversed graph form one SCC

📋 STEP-BY-STEP FLOW:

1️⃣ FIRST DFS PASS:
   - Perform DFS on original graph
   - Mark vertices as visited
   - Push vertex to stack after processing all neighbors (post-order)
   - Stack contains vertices ordered by decreasing finish times
   - This ordering identifies "sink" components

2️⃣ CREATE TRANSPOSE GRAPH:
   - Reverse all edges (u → v becomes v → u)
   - Create new adjacency list with reversed edges
   - Transpose graph has same SCCs as original
   - Edges between SCCs are reversed

3️⃣ SECOND DFS PASS:
   - Initialize new visited array
   - Pop vertices from stack one by one
   - If vertex not visited, start DFS on transpose graph
   - Each DFS tree found is one SCC
   - Collect all SCCs

4️⃣ RESULT:
   - Return array of SCCs
   - Each SCC is array of vertices
   - All SCCs found correctly

🧠 WHY THIS APPROACH?
- Two-pass DFS ensures correct SCC identification
- Finish time ordering starts from sink components
- Reversed edges prevent crossing SCC boundaries
- O(V + E) time complexity
- Simple and elegant algorithm

💡 KEY INSIGHTS:
- Post-order push ensures finish time ordering
- Transpose graph reverses inter-SCC edges
- DFS on transpose isolates each SCC
- Stack ordering is critical
- Each DFS tree = one SCC
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Kosaraju's Algorithm

INPUT: Graph with edges: 0→1, 1→2, 1→3, 2→0, 3→4
EXPECTED OUTPUT: [[1, 0, 2], [3], [4]]

Graph visualization:
    0 ←→ 1 → 3 → 4
    ↑  ↙ |
    └─── 2

Original graph:
0: [1]
1: [2, 3]
2: [0]
3: [4]
4: []

🎯 GOAL: Find all Strongly Connected Components!

🔍 STEP-BY-STEP PROCESS:

─────────────────────────────────────────
STEP 1: FIRST DFS PASS (Order by finish times)
─────────────────────────────────────────

visited = [false, false, false, false, false]
stack = []

DFS from 0:
  Visit 0
  DFS from 1 (neighbor):
    Visit 1
    DFS from 2 (neighbor):
      Visit 2
      DFS from 0 (neighbor): already visited, return
      Push 2 to stack: stack = [2]
    DFS from 3 (neighbor):
      Visit 3
      DFS from 4 (neighbor):
        Visit 4
        Push 4 to stack: stack = [2, 4]
      Push 3 to stack: stack = [2, 4, 3]
    Push 1 to stack: stack = [2, 4, 3, 1]
  Push 0 to stack: stack = [2, 4, 3, 1, 0]

Stack (top to bottom): [1, 0, 2, 3, 4]
Order by decreasing finish times: 1, 0, 2, 3, 4

─────────────────────────────────────────
STEP 2: CREATE TRANSPOSE GRAPH
─────────────────────────────────────────

Original edges: 0→1, 1→2, 1→3, 2→0, 3→4

Transpose (reverse all edges):
1→0, 2→1, 3→1, 0→2, 4→3

Transpose adjacency list:
0: [2] (from 2→0 reversed)
1: [0] (from 0→1 reversed)
2: [1] (from 1→2 reversed)
3: [1] (from 1→3 reversed)
4: [3] (from 3→4 reversed)

─────────────────────────────────────────
STEP 3: SECOND DFS PASS (on transpose graph)
─────────────────────────────────────────

visited2 = [false, false, false, false, false]
sccs = []

Process vertices from stack in order: 1, 0, 2, 3, 4

Pop 1:
  visited2[1] = false → Start DFS
  DFS from 1 (transpose):
    Visit 1, add to SCC: [1]
    From transpose[1] = [0] (original edge 0→1 reversed)
    DFS to 0 (not visited):
      Visit 0, add to SCC: [1, 0]
      From transpose[0] = [2] (original edge 2→0 reversed)
      DFS to 2 (not visited):
        Visit 2, add to SCC: [1, 0, 2]
        From transpose[2] = [1] (original edge 1→2 reversed, already visited)
        Return
      Return
    Return
  Found SCC: [1, 0, 2] (cycle 0-1-2-0)

Pop 3:
  visited2[3] = false → Start DFS
  DFS from 3 (transpose):
    Visit 3, add to SCC: [3]
    From 3: neighbor [1] (already visited in previous SCC)
    Return
  Found SCC: [3]

Pop 4:
  visited2[4] = false → Start DFS
  DFS from 4 (transpose):
    Visit 4, add to SCC: [4]
    From 4: neighbor [3] (already visited)
    Return
  Found SCC: [4]

🏆 FINAL RESULT: [[1, 0, 2], [3], [4]]
- SCC 1: {1, 0, 2} (cycle)
- SCC 2: {3} (singleton)
- SCC 3: {4} (singleton)

─────────────────────────────────────────

📊 EXAMPLE 2: Different Graph

INPUT: Graph with edges: 0→1, 1→2, 2→3, 3→0, 3→4, 4→5, 5→4
EXPECTED OUTPUT: [[0, 3, 2, 1], [4, 5]]

Graph visualization:
    0 → 1 → 2 → 3 → 4 ↔ 5
    ↑              ↓     ↑
    └──────────────┘     └─────┘

PROCESS:

STEP 1: First DFS
  DFS from 0: visits 0,1,2,3,4,5
  Stack order: [0,1,2,3,4,5] (or similar)

STEP 2: Transpose
  Original: 0→1, 1→2, 2→3, 3→0, 3→4, 4→5, 5→4
  Transpose: 1→0, 2→1, 3→2, 0→3, 4→3, 5→4, 4→5

STEP 3: Second DFS
  From stack top (0 or 5 depending on finish order):
    Process cycle: 0→3→2→1→0
    Process cycle: 4→5→4

🏆 RESULT: [[0, 3, 2, 1], [4, 5]]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

STEP 1: ORIGINAL GRAPH DFS

DFS Tree:
0 → 1 → 2
    ↓
    3 → 4

Finish times (later finish = pushed later = on top of stack):
- 2 finishes first (no outgoing unvisited)
- 4 finishes
- 3 finishes
- 1 finishes (after 2, 3, 4)
- 0 finishes last

Stack: [0, 1, 3, 4, 2] (top to bottom)

─────────────────────────────────────────

STEP 2: TRANSPOSE GRAPH

Original edges reversed:
- 0→1 becomes 1→0
- 1→2 becomes 2→1
- 1→3 becomes 3→1
- 2→0 becomes 0→2
- 3→4 becomes 4→3

Transpose structure:
1 → 0 → 2 → 1 (cycle preserved)
3 → 1 (connection to cycle)
4 → 3 (connection from cycle)

─────────────────────────────────────────

STEP 3: DFS ON TRANSPOSE

Process vertices from stack:
1. Process 0 (from stack top):
   DFS reaches: 0, 2, 1 (all connected in transpose)
   SCC: {0, 1, 2}

2. Process 3:
   DFS reaches: 3 (1 already visited)
   SCC: {3}

3. Process 4:
   DFS reaches: 4 (3 already visited)
   SCC: {4}

─────────────────────────────────────────

📊 FINISH TIME ORDERING CONCEPT:

WHY POST-ORDER PUSH?

Post-order means push AFTER processing all children:
```
dfs1(u):
  visited[u] = true
  for each child v:
    if not visited: dfs1(v)
  push u  // After all children processed
```

This ensures:
- Vertices that finish later are pushed later
- Stack top has latest finishing vertices
- "Sink" components finish first
- "Source" components finish last

In transpose graph:
- We want to start from sink components
- Sink = finish first = bottom of stack
- Pop from top = process sink first ✓

This ordering is critical!

─────────────────────────────────────────

📊 WHY TRANSPOSE GRAPH?

ORIGINAL GRAPH:
- Edges between SCCs go from source to sink
- Example: SCC_A → SCC_B
- DFS might explore across boundaries

TRANSPOSE GRAPH:
- Reverses inter-SCC edges
- SCC_B → SCC_A (reversed)
- DFS cannot explore beyond SCC boundaries
- Each DFS tree = one SCC

Example:
Original: 3 → 4 (3 and 4 in different SCCs)
Transpose: 4 → 3
DFS from 3 in transpose: cannot reach 4
DFS from 4 in transpose: reaches 3 only if 3→4 is part of cycle

This isolates SCCs!

─────────────────────────────────────────

📊 SCC IDENTIFICATION:

WHAT IS AN SCC?
- Set of vertices where every vertex can reach every other vertex
- Maximal set (cannot add more vertices)
- Formed by cycles

Example:
Cycle 0→1→2→0 forms SCC {0,1,2}
- 0 can reach 1, 2
- 1 can reach 2, 0
- 2 can reach 0, 1
All pairs reachable!

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- First DFS: O(V + E)
- Transpose creation: O(V + E)
- Second DFS: O(V + E)
- Total: O(V + E)

SPACE COMPLEXITY:
- Original adjacency list: O(V + E)
- Transpose adjacency list: O(V + E)
- Visited arrays: O(V)
- Stack: O(V)
- Total: O(V + E)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ FINISH TIME ORDERING:
   - Post-order push ensures correct ordering
   - Sink components finish first
   - Stack ordering enables correct processing
   - Critical for algorithm correctness

2️⃣ TRANSPOSE GRAPH:
   - Reverses inter-SCC edges
   - Prevents exploration beyond boundaries
   - Preserves intra-SCC connectivity
   - Isolates each SCC

3️⃣ SECOND DFS:
   - Processes vertices in finish time order
   - Each DFS tree = one SCC
   - Cannot explore beyond SCC boundaries
   - Correctly identifies all SCCs

4️⃣ POST-ORDER PUSH:
   - Push after processing children
   - Ensures topological-like ordering
   - Latest finish = top of stack
   - Enables sink-first processing

5️⃣ CORRECTNESS:
   - Mathematical proof guarantees correctness
   - Each SCC identified exactly once
   - No vertex missed
   - Optimal algorithm

💡 KEY INSIGHT:
Using two-pass DFS with finish time ordering and graph transpose. First DFS orders vertices by finish
times (post-order push to stack). Transpose graph reverses edges, preventing inter-SCC exploration.
Second DFS on transpose graph processes vertices from stack, where each DFS tree identifies one SCC.
The finish time ordering ensures we start from sink components, and reversed edges isolate SCCs!

🎯 TIME COMPLEXITY ANALYSIS:
- First DFS pass: O(V + E)
- Transpose graph creation: O(V + E)
- Second DFS pass: O(V + E)
- Stack operations: O(V)
- Total: O(V + E)
- Optimal for graph algorithms

🎯 SPACE COMPLEXITY ANALYSIS:
- Original adjacency list: O(V + E)
- Transpose adjacency list: O(V + E)
- Visited arrays: O(V)
- Stack: O(V)
- SCC result: O(V)
- Total: O(V + E)

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: Push 0, transpose empty, DFS finds [0]
Output: [[0]]

CASE 2: No edges
Input: Graph with 3 vertices, no edges
Process: Each vertex is separate SCC
Output: [[0], [1], [2]]

CASE 3: All vertices in one cycle
Input: 0→1, 1→2, 2→0
Process: All reachable from each other
Output: [[0, 1, 2]]

CASE 4: Linear chain
Input: 0→1, 1→2, 2→3
Process: No cycles, each vertex separate
Output: [[0], [1], [2], [3]]

CASE 5: Complete graph
Input: All pairs connected
Process: All vertices in one SCC
Output: [[0, 1, 2, ..., n-1]]

🎯 ALGORITHM CORRECTNESS:
- Identifies all SCCs: ✓
- Each SCC exactly once: ✓
- Correct vertex grouping: ✓
- Handles all graph types: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 84-85: Initialize visited and stack
- Line 88-97: First DFS with post-order push
- Line 100-104: DFS for all unvisited vertices
- Line 107-117: Create transpose graph
- Line 120-131: Second DFS on transpose
- Line 134-141: Process vertices from stack

🎯 POST-ORDER PUSH:

WHY AFTER PROCESSING CHILDREN?

```
dfs1(u):
  visited[u] = true
  for each child v:
    dfs1(v)  // Process children first
  stack.push(u)  // Push after children
```

This ensures:
- Children pushed before parent
- Stack has children on top
- Latest finish = top of stack
- Correct ordering

Example:
DFS tree: 0 → 1 → 2
Push order: 2, 1, 0
Stack: [0, 1, 2] (top to bottom)
Process: 2, 1, 0

This is correct!

🎯 TRANSPOSE GRAPH CREATION:

HOW TO REVERSE EDGES?

Original: u → v means adj[u] contains v
Transpose: v → u means transposeAdj[v] contains u

Code:
for each vertex u:
  for each neighbor v in adj[u]:
    transposeAdj[v].push(u)  // Reverse edge

This creates transpose in O(V + E) time!

🎯 ADVANTAGES:
- O(V + E) time complexity
- Simple two-pass DFS
- Easy to understand
- Correct SCC identification
- Handles all graph types

🎯 DISADVANTAGES:
- Requires two DFS passes
- Creates transpose graph (extra space)
- Not the fastest SCC algorithm
- Requires understanding of finish times

🎯 REAL-WORLD APPLICATIONS:
- Social network analysis
- Web page ranking
- Compiler optimizations
- Dependency resolution
- Circuit analysis
- Recommendation systems

🎯 RELATED PROBLEMS:
- Connected components (undirected graph)
- Tarjan's SCC algorithm (one-pass)
- Gabow's SCC algorithm
- Path-based strong component algorithm
- Articulation points and bridges

🎯 TESTING STRATEGY:
- Single vertex
- No edges
- Single cycle
- Multiple cycles
- Linear chains
- Complete graphs
- Complex graphs

🎯 DEBUGGING TIPS:
- Print stack after first DFS
- Print transpose graph
- Trace second DFS
- Verify finish time ordering
- Check SCC boundaries

🎯 COMMON MISTAKES:
- Pushing before processing children (wrong order)
- Not creating transpose correctly
- Using same visited array for both passes
- Wrong stack processing order
- Missing vertices in DFS

🎯 BEST PRACTICES:
- Always push in post-order
- Create transpose correctly
- Use separate visited arrays
- Process stack in correct order
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain finish time ordering
- Describe transpose graph purpose
- Walk through example step by step
- Compare with Tarjan's algorithm
- Analyze time/space complexity
- Discuss applications

🎯 KOSARAJU VS TARJAN'S:

KOSARAJU:
- Two DFS passes
- Requires transpose graph
- O(V + E) time
- O(V + E) space
- Easier to understand

TARJAN'S:
- Single DFS pass
- Uses low-link values
- O(V + E) time
- O(V) space
- More complex

Both are optimal!

🎯 FINISH TIME CONCEPT:

WHAT IS FINISH TIME?
- Time when vertex processing completes
- After all children processed
- Used in topological sort
- Critical for Kosaraju's

In DFS:
- Start time: when vertex discovered
- Finish time: when vertex processing done
- Post-order: process after children
- Stack order: finish time ordering

This enables correct SCC identification!

🎯 CONCLUSION:
Finding Strongly Connected Components using Kosaraju's algorithm is efficiently achieved using
two-pass DFS with finish time ordering. First DFS orders vertices by finish times (post-order push
to stack). Transpose graph reverses edges, preventing inter-SCC exploration. Second DFS on transpose
graph processes vertices from stack, where each DFS tree identifies one SCC. This achieves O(V + E)
time complexity and O(V + E) space complexity, making it optimal for identifying SCCs in directed graphs!
*/