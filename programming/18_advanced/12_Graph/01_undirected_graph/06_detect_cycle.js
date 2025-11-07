/* Problem: ✅✅✅✅ Detect Cycle in Undirected Graph using DFS ✅✅✅✅

Given an undirected graph, determine if it contains a cycle using DFS.
A cycle exists if there's a back edge - an edge connecting a vertex to an already
visited vertex that is not its parent in the DFS tree.

The algorithm requires:
- Use DFS to detect cycles
- Track visited vertices
- Track parent vertex to distinguish back edges
- Back edge detection: visited neighbor that is not parent
- Return true if cycle exists, false otherwise

You are given an undirected graph. Detect if the graph contains any cycle using DFS
by checking for back edges (edges to visited vertices that are not the parent).

Example 1:
Input: Graph with edges: 0-1, 1-2, 2-0
Output: true
Explanation: 
- Cycle exists: 0→1→2→0
- Back edge detected: 2→0 (0 is visited but not parent of 2)

Example 2:
Input: Graph with edges: 0-1, 1-2
Output: false
Explanation:
- No cycle exists
- Tree structure: 0→1→2
- No back edges found

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- Graph may be disconnected
- Graph is undirected

Expected Complexities:
Time Complexity: O(V + E) - single DFS pass
Auxiliary Space: O(V) - for visited array and recursion stack
*/

class Graph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(1)
    addEdge(u, v){
        this.adj[u].push(v); // Add v to u's adjacency list
        this.adj[v].push(u); // Add u to v's adjacency list (undirected graph)
    }

    // ✅ TC = O(V + E) - Single DFS pass
    // ✅ SC = O(V) - visited array and recursion stack
    detectCycle(){
        // Array to track visited vertices
        let visited = new Array(this.V).fill(false);
        const adj = this.adj; // Store reference to avoid 'this' context issues

        // Helper function to detect cycle using DFS
        const DFSHelper = (u, parent) => {
            visited[u] = true;
            
            // Process all neighbors
            for(let i = 0; i < adj[u].length; i++){
                let v = adj[u][i];

                // Case 1: v is not visited yet (tree edge)
                if(!visited[v]){
                    // Recursively check subtree rooted at v
                    if(DFSHelper(v, u)){ // u is the parent of v
                        return true; // Cycle found in subtree
                    }
                }
                // Case 2: v is visited and v is not parent (back edge)
                else if(v !== parent){
                    // Back edge detected: v is already visited and not the parent
                    // This means we found a cycle!
                    return true;
                }
                // Case 3: v is visited and v is parent
                // This is the edge we came from, ignore it
            }
            return false; // No cycle found from this vertex
        };

        // Traverse all connected components
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){
                // Start DFS from unvisited vertex (each connected component)
                if(DFSHelper(i, -1)){ // -1 means no parent (root of DFS tree)
                    return true; // Cycle detected
                }
            }
        }
        return false; // No cycle found in entire graph
    }
}

// Test cases
let g1 = new Graph(3);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 0);
console.log("Test 1:", g1.detectCycle()); // true (cycle: 0-1-2-0)

let g2 = new Graph(3);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
console.log("Test 2:", g2.detectCycle()); // false (tree: no cycle)

let g3 = new Graph(4);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
g3.addEdge(2, 3);
g3.addEdge(3, 1);
console.log("Test 3:", g3.detectCycle()); // true (cycle: 1-2-3-1)

/*🎯 CORE IDEA: Use DFS to detect cycles in undirected graph by checking for back edges.
A back edge is an edge connecting a vertex to an already visited vertex that is not its
parent. If such an edge exists, a cycle is present. DFS tree edges (parent-child) are not
cycles, but back edges indicate cycles.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize visited array with false
   - Start DFS from each unvisited vertex
   - Handle disconnected components

2️⃣ DFS TRAVERSAL:
   - Mark current vertex as visited
   - Process all neighbors
   - Track parent to distinguish edges

3️⃣ EDGE CLASSIFICATION:
   - Tree edge (v not visited): Recurse DFS(v)
   - Back edge (v visited and v ≠ parent): Cycle detected!
   - Parent edge (v visited and v = parent): Ignore (edge we came from)

4️⃣ CYCLE DETECTION:
   - Back edge means cycle exists
   - Return true immediately
   - Continue for all components

5️⃣ RESULT:
   - Return true if cycle found
   - Return false if no cycle

🧠 WHY THIS APPROACH?
- DFS provides tree structure
- Parent tracking distinguishes edges
- Back edge detection is straightforward
- O(V + E) time complexity
- Simple and efficient algorithm

💡 KEY INSIGHTS:
- Undirected graph: each edge is bidirectional
- DFS creates tree (or forest for disconnected graphs)
- Tree edges (parent-child) don't create cycles
- Back edges (to visited non-parent) indicate cycles
- Must check all connected components
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Cycle Detection

INPUT: Graph with edges: 0-1, 1-2, 2-0
EXPECTED OUTPUT: true

Graph visualization:
    0 ←→ 1
    ↑   ↙
    └── 2

Graph structure:
0: [1, 2]
1: [0, 2]
2: [0, 1]

🎯 GOAL: Detect if cycle exists!

🔍 STEP-BY-STEP DFS PROCESS:

Start DFS from 0:

INITIALIZATION:
visited = [false, false, false]
parent = -1 (root)

─────────────────────────────────────────
DFSHelper(0, -1):
─────────────────────────────────────────
visited[0] = true
visited = [true, false, false]

Process neighbor 1:
  visited[1]? No → Tree edge
  DFSHelper(1, 0) (0 is parent of 1)

─────────────────────────────────────────
DFSHelper(1, 0):
─────────────────────────────────────────
visited[1] = true
visited = [true, true, false]

Process neighbor 0:
  visited[0]? Yes
  v (0) !== parent (0)? No (same as parent)
  Ignore (this is the edge we came from)

Process neighbor 2:
  visited[2]? No → Tree edge
  DFSHelper(2, 1) (1 is parent of 2)

─────────────────────────────────────────
DFSHelper(2, 1):
─────────────────────────────────────────
visited[2] = true
visited = [true, true, true]

Process neighbor 0:
  visited[0]? Yes
  v (0) !== parent (1)? Yes! (0 is not parent)
  Back edge detected! → return true

Return to DFSHelper(1, 0):
  Received true from child → return true

Return to DFSHelper(0, -1):
  Received true from child → return true

🏆 FINAL RESULT: true
Cycle detected: 0→1→2→0

─────────────────────────────────────────

📊 EXAMPLE 2: No Cycle

INPUT: Graph with edges: 0-1, 1-2
EXPECTED OUTPUT: false

Graph visualization:
    0 → 1 → 2

Graph structure:
0: [1]
1: [0, 2]
2: [1]

PROCESS:

DFSHelper(0, -1):
  visited[0] = true
  Process neighbor 1:
    visited[1]? No → DFSHelper(1, 0)

DFSHelper(1, 0):
  visited[1] = true
  Process neighbor 0:
    visited[0]? Yes, v (0) !== parent (0)? No → Ignore
  Process neighbor 2:
    visited[2]? No → DFSHelper(2, 1)

DFSHelper(2, 1):
  visited[2] = true
  Process neighbor 1:
    visited[1]? Yes, v (1) !== parent (1)? No → Ignore
  return false

Return to DFSHelper(1, 0):
  Received false from child → return false

Return to DFSHelper(0, -1):
  Received false from child → return false

🏆 FINAL RESULT: false
No cycle detected (tree structure)

─────────────────────────────────────────

📊 EXAMPLE 3: Cycle in Complex Graph

INPUT: Graph with edges: 0-1, 1-2, 2-3, 3-1
EXPECTED OUTPUT: true

Graph visualization:
    0
    |
    1 ←→ 2
    ↑   ↓
    └── 3

PROCESS:

DFSHelper(0, -1):
  visited[0] = true
  Process neighbor 1:
    visited[1]? No → DFSHelper(1, 0)

DFSHelper(1, 0):
  visited[1] = true
  Process neighbor 0:
    visited[0]? Yes, v (0) !== parent (0)? No → Ignore
  Process neighbor 2:
    visited[2]? No → DFSHelper(2, 1)

DFSHelper(2, 1):
  visited[2] = true
  Process neighbor 1:
    visited[1]? Yes, v (1) !== parent (1)? No → Ignore
  Process neighbor 3:
    visited[3]? No → DFSHelper(3, 2)

DFSHelper(3, 2):
  visited[3] = true
  Process neighbor 2:
    visited[2]? Yes, v (2) !== parent (2)? No → Ignore
  Process neighbor 1:
    visited[1]? Yes, v (1) !== parent (2)? Yes!
    Back edge detected! → return true

Return to DFSHelper(2, 1):
  Received true → return true

Return to DFSHelper(1, 0):
  Received true → return true

Return to DFSHelper(0, -1):
  Received true → return true

🏆 FINAL RESULT: true
Cycle detected: 1→2→3→1

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DFS TREE STRUCTURE (Example 1):
    0 (parent=-1)
    |
    1 (parent=0)
    |
    2 (parent=1)
    ↙
   0 (back edge - visited but not parent)

EDGE TYPES:
- 0→1: Tree edge (1 not visited)
- 1→2: Tree edge (2 not visited)
- 2→0: Back edge (0 visited, 0 ≠ parent 1) ✓

─────────────────────────────────────────

📊 BACK EDGE DETECTION:

WHAT IS A BACK EDGE?

Back edge = Edge to visited vertex that is NOT parent

Conditions:
- v is already visited (visited[v] = true)
- v is not the parent (v !== parent)
- This indicates a cycle exists

Example:
- DFS path: 0 → 1 → 2
- Processing 2's neighbors
- Edge 2→0 found
- 0 is visited? Yes
- 0 is parent of 2? No (parent is 1)
- Back edge detected! → Cycle exists

─────────────────────────────────────────

📊 WHY PARENT CHECK IS CRITICAL?

WITHOUT PARENT CHECK:
- Edge 2→1 would be detected as back edge
- But 1 IS the parent of 2
- This is not a cycle, just the edge we came from
- False positive!

WITH PARENT CHECK:
- Edge 2→1: 1 is visited BUT 1 = parent → Ignore ✓
- Edge 2→0: 0 is visited AND 0 ≠ parent → Back edge ✓

Parent check prevents false positives!

─────────────────────────────────────────

📊 EDGE CLASSIFICATION:

UNDIRECTED GRAPH EDGES IN DFS:

1. TREE EDGE (v not visited):
   - First time visiting vertex v
   - Creates new edge in DFS tree
   - Parent-child relationship
   - Recurse: DFSHelper(v, u)

2. BACK EDGE (v visited AND v ≠ parent):
   - Edge to already visited vertex
   - Not the parent (edge we came from)
   - Indicates cycle exists
   - Return true immediately

3. PARENT EDGE (v visited AND v = parent):
   - Edge to parent (where we came from)
   - Not a cycle, just bidirectional edge
   - Ignore this edge

Example DFS tree:
0 → 1 → 2
    |   |
    └── 0 (back edge)

─────────────────────────────────────────

📊 DISCONNECTED COMPONENTS:

HANDLING MULTIPLE COMPONENTS:

Graph with disconnected components:
Component 1: 0-1-2 (cycle)
Component 2: 3-4 (no cycle)

Process:
1. Start DFS from 0:
   - Visits 0, 1, 2
   - Detects cycle → return true

2. If no cycle in component 1:
   - Continue to component 2
   - Start DFS from 3
   - Check for cycles

Must check ALL components!

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Single DFS pass: O(V + E)
- Each vertex visited once
- Each edge processed twice (undirected)
- Total: O(V + E)

SPACE COMPLEXITY:
- visited array: O(V)
- DFS recursion stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DFS TREE STRUCTURE:
   - DFS creates spanning tree/forest
   - Tree edges don't create cycles
   - Back edges indicate cycles
   - Parent tracking essential

2️⃣ PARENT TRACKING:
   - Distinguishes tree edges from back edges
   - Prevents false positives
   - Critical for correctness
   - Simple but effective

3️⃣ BACK EDGE DETECTION:
   - Visited + not parent = back edge
   - Immediate cycle detection
   - Efficient early termination
   - Correct identification

4️⃣ COMPONENT HANDLING:
   - Checks all connected components
   - Ensures complete graph coverage
   - Handles disconnected graphs
   - Robust implementation

5️⃣ CORRECTNESS:
   - All cycles have back edges
   - All back edges indicate cycles
   - No false positives
   - No false negatives

💡 KEY INSIGHT:
Using DFS with parent tracking to detect cycles in undirected graphs. DFS creates a tree
structure where tree edges (parent-child) don't create cycles, but back edges (to visited
non-parent vertices) indicate cycles. Parent tracking prevents false positives from the
bidirectional edges in undirected graphs. This achieves O(V + E) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Single DFS pass: O(V + E)
- Vertex processing: O(V)
- Edge processing: O(E)
- Parent checking: O(1) per edge
- Total: O(V + E)
- Optimal for graph traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- visited array: O(V)
- DFS recursion stack: O(V)
- No additional data structures
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: No neighbors, no cycle
Output: false

CASE 2: Two vertices
Input: Graph with edge 0-1
Process: Tree edge, no back edge
Output: false

CASE 3: Triangle (cycle of 3)
Input: 0-1, 1-2, 2-0
Process: Back edge 2→0 detected
Output: true

CASE 4: Linear chain (no cycle)
Input: 0-1, 1-2, 2-3
Process: All tree edges, no back edges
Output: false

CASE 5: Self-loop (if allowed)
Input: Edge 0-0
Process: Back edge to itself
Output: true (self-loop is cycle)

🎯 ALGORITHM CORRECTNESS:
- Detects all cycles: ✓
- No false positives: ✓
- No false negatives: ✓
- Handles disconnected graphs: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 62: Initialize visited array
- Line 63: Store adj reference for nested function
- Line 66-90: DFSHelper function
- Line 74-78: Handle tree edges (recurse)
- Line 81-84: Detect back edges (cycle found)
- Line 86-87: Ignore parent edges

🎯 PARENT TRACKING:

WHY TRACK PARENT?

In undirected graph:
- Each edge is bidirectional
- When traversing edge u→v, we'll see v→u later
- Parent tracking distinguishes:
  - Tree edge: new vertex
  - Back edge: visited non-parent (cycle)
  - Parent edge: edge we came from (ignore)

Without parent tracking:
- Would detect false cycles
- Every visited neighbor = cycle (wrong!)
- Parent check fixes this

─────────────────────────────────────────

🎯 BACK EDGE CRITERIA:

WHEN IS EDGE u→v A BACK EDGE?

Conditions:
1. v is already visited (visited[v] = true)
2. v is not the parent (v !== parent)
3. Edge u→v exists

If all true → Back edge → Cycle exists!

Example:
- DFS path: 0 → 1 → 2
- At vertex 2: checking edge 2→0
- visited[0]? Yes
- parent of 2? 1
- 0 !== 1? Yes
- Back edge! → Cycle detected

─────────────────────────────────────────

🎯 UNDIRECTED vs DIRECTED:

UNDIRECTED GRAPH:
- Use parent tracking
- Back edge: visited + not parent
- Simple and efficient
- This algorithm

DIRECTED GRAPH:
- Use recursion stack tracking
- Back edge: in recursion stack
- Cross edge: not in recursion stack
- Different algorithm needed

Key difference: Parent concept only works for undirected!

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(V + E) time complexity
- Simple implementation
- Easy to understand
- Efficient cycle detection
- Handles disconnected graphs

🎯 DISADVANTAGES:
- Requires DFS recursion
- Stack overflow for deep graphs
- Only works for undirected graphs
- Doesn't find cycle path (just existence)

🎯 REAL-WORLD APPLICATIONS:
- Network topology validation
- Dependency graph analysis
- Circuit design verification
- Social network analysis
- Data structure validation

🎯 RELATED PROBLEMS:
- Find cycle in directed graph
- Find all cycles in graph
- Detect cycle using Union-Find
- Minimum Spanning Tree (ensures no cycles)
- Topological sort (requires DAG, no cycles)

🎯 TESTING STRATEGY:
- Single vertex
- Two vertices
- Linear chains (no cycle)
- Triangles (cycles)
- Complex cycles
- Disconnected graphs

🎯 DEBUGGING TIPS:
- Print visited array after each DFS call
- Trace parent values
- Monitor back edge detection
- Verify edge classification
- Check disconnected components

🎯 COMMON MISTAKES:
- Not tracking parent
- Treating parent edge as back edge
- Not handling disconnected components
- Wrong visited check
- Forgetting bidirectional edges

🎯 BEST PRACTICES:
- Always track parent
- Check visited before parent
- Handle all components
- Use clear edge classification
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain parent tracking importance
- Describe back edge detection
- Walk through example step by step
- Explain undirected vs directed difference
- Analyze time/space complexity
- Discuss edge cases

🎯 CYCLE DEFINITION:

WHAT IS A CYCLE?

Cycle: Path that starts and ends at same vertex
- Path: v₁ → v₂ → ... → vₖ → v₁
- All vertices distinct (except start/end)
- At least 3 vertices (or self-loop)

Example:
- Cycle: 0 → 1 → 2 → 0
- Not cycle: 0 → 1 → 0 (just bidirectional edge)
- Wait, 0→1→0 is a cycle if it's a path

Actually, in undirected graph:
- Cycle of length 2: 0-1 (edge 0-1, then 1-0)
- This IS a cycle if we consider it as path
- But with parent tracking, we ignore the return edge
- So we detect cycles of length ≥ 3

─────────────────────────────────────────

🎯 DFS TREE PROPERTIES:

TREE EDGES:
- Create DFS spanning tree
- Parent-child relationships
- Don't form cycles
- Forward traversal only

BACK EDGES:
- Connect to ancestors
- Create cycles
- Skip parent edge
- Detect cycles

DFS tree with back edge:
    0
    |
    1
    |
    2
    ↙
   0 (back edge)

─────────────────────────────────────────

🎯 WHY DFS FOR CYCLE DETECTION?

DFS advantages:
- Natural tree structure
- Easy parent tracking
- Efficient traversal
- Back edge identification
- O(V + E) complexity

Alternative: Union-Find
- Also O(V + E)
- Different approach
- Good for multiple queries
- This DFS approach is simpler for single query

─────────────────────────────────────────

🎯 DISCONNECTED GRAPH HANDLING:

MULTIPLE COMPONENTS:

Graph with 2 components:
Component 1: 0-1-2 (has cycle)
Component 2: 3-4 (no cycle)

Algorithm:
1. Start DFS from 0:
   - Visits 0, 1, 2
   - Detects cycle in component 1
   - Returns true (early termination)

2. If modified to check all:
   - After component 1 (no cycle)
   - Start DFS from 3 (unvisited)
   - Check component 2
   - Return true if ANY cycle found

Current implementation:
- Returns true on first cycle found
- Efficient early termination
- Correct behavior

─────────────────────────────────────────

🎯 CONCLUSION:
Detecting cycles in undirected graphs using DFS is efficiently achieved by tracking visited
vertices and parent relationships. DFS creates a tree structure where tree edges don't create
cycles, but back edges (edges to visited non-parent vertices) indicate cycles. Parent tracking
prevents false positives from bidirectional edges. This achieves O(V + E) time complexity and
O(V) space complexity, making it optimal for cycle detection in undirected graphs!
*/