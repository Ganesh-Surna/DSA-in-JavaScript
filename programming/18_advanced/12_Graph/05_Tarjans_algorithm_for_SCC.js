/* Problem: ✅✅✅✅ Strongly Connected Components using Tarjan's Algorithm ✅✅✅✅

Given a directed graph, find all Strongly Connected Components (SCCs) using Tarjan's algorithm.
A strongly connected component is a set of vertices such that for any two vertices u and v in the
component, there is a path from u to v and from v to u.

Algorithm requirements (from images):
- Use single DFS pass with discovery time and low-link value
- Track Discovery Time (disc): Time when DFS reaches a vertex
- Track Low Value (low): Smallest discovery time reachable from a vertex
- Use stack to track vertices in current SCC
- Key condition: When disc[u] == low[u], u is root of SCC, pop stack until u
- IMPORTANT: Cross edges are NOT considered when updating low values (only back edges)

Example from first image:
Input: Graph with edges: A→B, B→C, C→A (cycle), B→D, D→E, E→D (cycle)
Output: [[A, B, C], [D, E]]
DFS Tree: A(root, 1/2), B(2/2), C(3/1), D(4/4), E(5/5)
- Back edge C→A updates low[C] to 1, propagates to low[B]=2, low[A]=2
- When processing A: all adjacent done, disc[A]=1 != low[A]=2 → not root yet
- Back edge E→D updates low[E] to 4
- When processing D: all adjacent done, disc[D]=4 == low[D]=4 → root! Pop stack

Example from second image:
Input: Graph with edges: A→C, A→B, C→D, C→B, C→E, D→E
DFS Tree: A→B, A→C→D→E
- Back edge: E→C (cross edge from image, but handled as back edge if in stack)
- Cross edge: C→B (not in stack, IGNORED for low calculation)

Key difference from Kosaraju:
- Tarjan: Single DFS pass, uses disc/low and stack
- Kosaraju: Two DFS passes, uses finish times and transpose graph

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- Graph can have cycles
- All edges are directed

Expected Complexities:
Time Complexity: O(V + E) - single DFS pass
Auxiliary Space: O(V) - for disc, low, stack, and inStack arrays
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

    // ✅ TC = O(V + E) - Single DFS pass
    // ✅ SC = O(V) - disc, low, stack, inStack arrays
    tarjanSCC(){
        // Arrays to store discovery time, low value
        const disc = new Array(this.V).fill(-1); // Discovery time
        const low = new Array(this.V).fill(-1);  // Low value
        const stack = []; // Stack to track vertices in current SCC
        const inStack = new Array(this.V).fill(false); // Track if vertex is in stack
        const sccs = []; // Store all SCCs
        let time = 0; // Timer for discovery time

        // DFS helper function
        const dfs = (u) => {
            // Initialize discovery time and low value
            disc[u] = low[u] = ++time;
            stack.push(u);
            inStack[u] = true;

            // Process all neighbors
            for(let v of this.adj[u]){
                // Case 1: v is not visited yet (tree edge)
                if(disc[v] === -1){
                    dfs(v);
                    // Update low value of u from child v (✅ Tree edge)
                    low[u] = Math.min(low[u], low[v]);
                }
                // Case 2: v is already visited and in stack (back edge)
                // IMPORTANT: Only update if v is in stack (back edge), 
                // NOT if v is out of stack (cross edge - IGNORED)
                else if(inStack[v]){
                    // Back edge: update low value using disc[v] (not low[v]) (✅ Back edge)
                    low[u] = Math.min(low[u], disc[v]);
                }
                // Case 3: v is visited but not in stack (cross edge) (❌ Cross edge)
                // DO NOTHING - cross edges are ignored for low calculation
            }

            // If u is root of SCC (disc[u] == low[u])
            // This means u and all vertices above u in stack form one SCC
            if(disc[u] === low[u]){
                let currentSCC = [];
                let w;
                // Pop stack until we reach u (u is the root of this SCC)
                do{
                    w = stack.pop();
                    inStack[w] = false;
                    currentSCC.push(w);
                } while(w !== u);
                
                sccs.push(currentSCC);
            }
        };

        // Perform DFS for all unvisited vertices
        for(let i = 0; i < this.V; i++){
            if(disc[i] === -1){
                dfs(i);
            }
        }

        return {
            sccs: sccs,
            discoveryTimes: disc,
            lowValues: low
        };
    }
}

// Test cases
let g1 = new DirectedGraph(5);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 0);
g1.addEdge(1, 3);
g1.addEdge(3, 4);
g1.addEdge(4, 3);
console.log("Test 1:", g1.tarjanSCC().sccs); // [[0, 2, 1], [3, 4]]

let g2 = new DirectedGraph(6);
g2.addEdge(0, 1);
g2.addEdge(1, 2);
g2.addEdge(2, 3);
g2.addEdge(3, 0);
g2.addEdge(3, 4);
g2.addEdge(4, 5);
g2.addEdge(5, 4);
console.log("Test 2:", g2.tarjanSCC().sccs); // [[0, 3, 2, 1], [4, 5]]

let g3 = new DirectedGraph(3);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
g3.addEdge(2, 0);
console.log("Test 3:", g3.tarjanSCC().sccs); // [[0, 2, 1]]

/*🎯 CORE IDEA: Tarjan's algorithm uses single DFS with discovery time and low-link value.

   Discovery Time (disc[u]): Time when DFS first reaches vertex u
   Low Value (low[u]): Smallest discovery time reachable from u
   
   Key Conditions:
   1. When processing edge (u, v):
      - Tree edge (v not visited): Update low[u] from low[v]
      - Back edge (v visited AND in stack): Update low[u] from disc[v]
      - Cross edge (v visited but NOT in stack): IGNORE (don't update low)
   
   2. When all adjacent vertices of u are processed:
      - If disc[u] == low[u]: u is root of SCC
      - Pop stack until u to get complete SCC
   
   Why ignore cross edges?
   - Cross edges connect different SCCs or parts already processed
   - Including them would incorrectly update low values
   - Only back edges (to vertices in same DFS tree path) indicate cycles

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize disc array with -1 (unvisited)
   - Initialize low array with -1
   - Initialize empty stack
   - Initialize inStack array with false
   - Start timer = 0

2️⃣ DFS TRAVERSAL:
   - Start DFS from unvisited vertex
   - Set disc[u] = low[u] = ++time
   - Push u to stack, mark inStack[u] = true

3️⃣ PROCESS NEIGHBORS:
   - Tree edge (v not visited): DFS(v), update low[u] = min(low[u], low[v])
   - Back edge (v visited AND in stack): update low[u] = min(low[u], disc[v])
   - Cross edge (v visited but NOT in stack): IGNORE

4️⃣ SCC DETECTION:
   - After processing all neighbors
   - If disc[u] == low[u]: u is root of SCC
   - Pop stack until u to collect SCC

5️⃣ RESULT:
   - Return all SCCs
   - Each SCC is array of vertices
   - All SCCs found correctly

🧠 WHY THIS APPROACH?
- Single DFS pass (more efficient)
- Uses stack to track current SCC
- Disc and low values identify SCC roots
- O(V + E) time complexity
- Elegant and efficient algorithm

💡 KEY INSIGHTS:
- Discovery time tracks visit order
- Low value tracks earliest reachable ancestor
- Stack tracks vertices in current DFS path
- disc[u] == low[u] means no back edge to ancestor
- Cross edges ignored (connect different SCCs)
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Tarjan's Algorithm

INPUT: Graph with edges: 0→1, 1→2, 2→0, 1→3, 3→4, 4→3
EXPECTED OUTPUT: [[0, 2, 1], [3, 4]]

Graph visualization:
    0 ←→ 1 → 3 ↔ 4
    ↑  ↙ |
    └─── 2

Graph structure:
0: [1]
1: [2, 3]
2: [0]
3: [4]
4: [3]

🎯 GOAL: Find all Strongly Connected Components!

🔍 STEP-BY-STEP DFS PROCESS:

Start DFS from 0:

INITIALIZATION:
disc = [-1, -1, -1, -1, -1]
low = [-1, -1, -1, -1, -1]
stack = []
inStack = [false, false, false, false, false]
time = 0

─────────────────────────────────────────
DFS(0):
─────────────────────────────────────────
disc[0] = low[0] = ++time = 1
stack.push(0) → stack = [0]
inStack[0] = true

Process neighbor 1:
  disc[1] === -1? Yes → Tree edge
  DFS(1)

─────────────────────────────────────────
DFS(1):
─────────────────────────────────────────
disc[1] = low[1] = ++time = 2
stack.push(1) → stack = [0, 1]
inStack[1] = true

Process neighbor 2:
  disc[2] === -1? Yes → Tree edge
  DFS(2)

─────────────────────────────────────────
DFS(2):
─────────────────────────────────────────
disc[2] = low[2] = ++time = 3
stack.push(2) → stack = [0, 1, 2]
inStack[2] = true

Process neighbor 0:
  disc[0] === -1? No (disc[0] = 1)
  inStack[0]? Yes → Back edge
  Update: low[2] = min(3, disc[0]) = min(3, 1) = 1

Return to DFS(1):
  Update: low[1] = min(2, low[2]) = min(2, 1) = 1

Process neighbor 3:
  disc[3] === -1? Yes → Tree edge
  DFS(3)

─────────────────────────────────────────
DFS(3):
─────────────────────────────────────────
disc[3] = low[3] = ++time = 4
stack.push(3) → stack = [0, 1, 2, 3]
inStack[3] = true

Process neighbor 4:
  disc[4] === -1? Yes → Tree edge
  DFS(4)

─────────────────────────────────────────
DFS(4):
─────────────────────────────────────────
disc[4] = low[4] = ++time = 5
stack.push(4) → stack = [0, 1, 2, 3, 4]
inStack[4] = true

Process neighbor 3:
  disc[3] === -1? No (disc[3] = 4)
  inStack[3]? Yes → Back edge
  Update: low[4] = min(5, disc[3]) = min(5, 4) = 4

Check: disc[4] === low[4]? 5 === 4? No
Continue

Return to DFS(3):
  Update: low[3] = min(4, low[4]) = min(4, 4) = 4
  
  Check: disc[3] === low[3]? 4 === 4? Yes! → Root of SCC
  Pop stack until 3:
    w = 4, inStack[4] = false, SCC: [4]
    w = 3, inStack[3] = false, SCC: [4, 3]
  stack = [0, 1, 2]
  Push SCC: [[3, 4]]

Return to DFS(1):
  Check: disc[1] === low[1]? 2 === 1? No
  Continue

Return to DFS(0):
  Update: low[0] = min(1, low[1]) = min(1, 1) = 1
  
  Check: disc[0] === low[0]? 1 === 1? Yes! → Root of SCC
  Pop stack until 0:
    w = 2, inStack[2] = false, SCC: [2]
    w = 1, inStack[1] = false, SCC: [2, 1]
    w = 0, inStack[0] = false, SCC: [2, 1, 0]
  stack = []
  Push SCC: [[3, 4], [0, 1, 2]]

🏆 FINAL RESULT: [[0, 1, 2], [3, 4]]
- SCC 1: {0, 1, 2} (cycle 0→1→2→0)
- SCC 2: {3, 4} (cycle 3→4→3)

─────────────────────────────────────────

📊 EXAMPLE 2: Cross Edge Handling

INPUT: Graph with edges: 0→1, 0→2, 1→3, 3→4, 4→1, 2→3
EXPECTED OUTPUT: [[0], [1, 3, 4], [2]]

Graph structure:
0: [1, 2]
1: [3]
2: [3]
3: [4]
4: [1]

DFS Tree: 0 → 1 → 3 → 4
           ↓
           2 → 3 (cross edge, 3 already visited and in stack)

PROCESS:
- DFS visits 0, 1, 3, 4
- Back edge 4→1 updates low values
- When processing 2: edge 2→3
  - disc[3] !== -1? No (already visited)
  - inStack[3]? Yes → Treat as back edge
  - Update low[2] from disc[3]
- Cross edges are edges to vertices not in stack (already processed SCCs)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DFS TREE STRUCTURE:
0 (disc=1, low=1) ← Root of SCC {0}
|
1 (disc=2, low=1) ← Part of SCC {0,1,2}
|
2 (disc=3, low=1) ← Part of SCC {0,1,2}
|
3 (disc=4, low=4) ← Root of SCC {3,4}
|
4 (disc=5, low=4) ← Part of SCC {3,4}

STACK EVOLUTION:
After DFS(0): [0]
After DFS(1): [0, 1]
After DFS(2): [0, 1, 2]
After DFS(3): [0, 1, 2, 3]
After DFS(4): [0, 1, 2, 3, 4]
After popping SCC {3,4}: [0, 1, 2]
After popping SCC {0,1,2}: []

─────────────────────────────────────────

📊 DISCOVERY TIME vs LOW VALUE:

DISCOVERY TIME (disc[u]):
- Time when DFS first reaches vertex u
- Monotonically increasing
- Unique for each vertex
- Represents DFS visit order

LOW VALUE (low[u]):
- Smallest discovery time reachable from u
- Via tree edges (down) and back edges (up)
- Updated from children and back edges
- Tracks earliest ancestor reachable

Example for vertex 2:
- disc[2] = 3 (visited at time 3)
- Back edge to 0 (disc[0] = 1)
- low[2] = min(3, 1) = 1
- Propagates to low[1] = 1, low[0] = 1
- Can reach vertex discovered at time 1 (vertex 0)

─────────────────────────────────────────

📊 SCC ROOT DETECTION:

WHY disc[u] == low[u] MEANS ROOT?

If disc[u] == low[u]:
- Vertex u can reach itself (disc[u])
- Cannot reach any vertex discovered earlier (low[u] = disc[u])
- No back edge from u's subtree to ancestors
- u is the earliest discovered vertex in its SCC
- u is root of SCC!

When we pop stack:
- All vertices above u in stack are descendants
- They form one SCC with u
- Pop until u to get complete SCC

Example:
- disc[3] = 4, low[3] = 4 → 3 is root
- Stack: [0, 1, 2, 3, 4]
- Pop 4, then 3 → SCC: {3, 4}

─────────────────────────────────────────

📊 BACK EDGE vs CROSS EDGE:

BACK EDGE (v visited AND in stack):
- v is ancestor of u in DFS tree
- Part of same DFS path
- Indicates cycle
- Update: low[u] = min(low[u], disc[v])
- Important for SCC detection

CROSS EDGE (v visited but NOT in stack):
- v is in different SCC (already processed)
- Not in current DFS path
- Does NOT indicate cycle in current component
- IGNORE: Don't update low[u]
- Critical for correctness!

Example:
- DFS path: 0 → 1 → 3 → 4
- Edge 4→1: 1 is in stack → Back edge ✓
- Edge 2→3: 3 is in stack → Back edge ✓
- Edge from processed SCC: Cross edge → Ignore ✓

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Single DFS pass: O(V + E)
- Each vertex visited once
- Each edge processed once
- Stack operations: O(V)
- Total: O(V + E)

SPACE COMPLEXITY:
- disc array: O(V)
- low array: O(V)
- stack: O(V)
- inStack array: O(V)
- DFS recursion stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DFS STRUCTURE:
   - Provides tree edges and identifies back/cross edges
   - Stack tracks current DFS path
   - Enables SCC boundary detection

2️⃣ DISCOVERY TIME:
   - Tracks DFS visit order
   - Monotonically increasing
   - Enables ancestor detection

3️⃣ LOW VALUE:
   - Tracks earliest reachable ancestor
   - Updated from children (tree edges)
   - Updated from back edges
   - NOT updated from cross edges

4️⃣ STACK TRACKING:
   - Tracks vertices in current DFS path
   - Enables back edge detection
   - Used to collect SCC when root found

5️⃣ ROOT DETECTION:
   - disc[u] == low[u] identifies root
   - Root has no back edge to ancestor
   - Pop stack to get complete SCC

💡 KEY INSIGHT:
Using single DFS with discovery time and low value to identify SCC roots. Discovery time tracks
visit order, while low value tracks earliest reachable ancestor via tree and back edges. Stack
tracks current DFS path, enabling back edge detection. Cross edges are ignored (connect different
SCCs). When disc[u] == low[u], u is root of SCC - pop stack until u to collect complete SCC.
This achieves O(V + E) time complexity with single DFS pass!

🎯 TARJAN'S vs KOSARAJU'S:

─────────────────────────────────────────
EFFICIENCY COMPARISON:

1️⃣ TIME COMPLEXITY:
   Tarjan's: O(V + E) - Single DFS pass
   Kosaraju's: O(V + E) - Two DFS passes
   
   Both are O(V + E), but:
   - Tarjan's: One traversal
   - Kosaraju's: Two traversals
   - Tarjan's has better constant factors

2️⃣ SPACE COMPLEXITY:
   Tarjan's: O(V) - disc, low, stack, inStack arrays
   Kosaraju's: O(V + E) - Requires transpose graph
   
   Tarjan's is more space-efficient:
   - No transpose graph needed
   - O(V) vs O(V + E) space
   - Significant difference for sparse graphs

3️⃣ NUMBER OF PASSES:
   Tarjan's: 1 pass - Single DFS
   Kosaraju's: 2 passes - First DFS + Second DFS on transpose
   
   Tarjan's is more efficient:
   - Half the number of traversals
   - Less overhead
   - Faster in practice

4️⃣ IMPLEMENTATION COMPLEXITY:
   Tarjan's: More complex - requires understanding of disc/low
   Kosaraju's: Simpler - straightforward two-pass DFS
   
   Trade-off:
   - Tarjan's: More efficient but complex
   - Kosaraju's: Easier to understand but less efficient

5️⃣ PRACTICAL PERFORMANCE:
   Tarjan's: Better constant factors, single pass
   Kosaraju's: Two passes, transpose overhead
   
   Tarjan's advantages:
   - Fewer memory accesses
   - Better cache locality
   - Single traversal overhead
   - More efficient in practice

─────────────────────────────────────────
WHY TARJAN'S IS MORE EFFICIENT:

1️⃣ SINGLE PASS:
   - One DFS traversal vs two
   - Less overhead
   - Better cache performance
   - Fewer function calls

2️⃣ NO TRANSPOSE GRAPH:
   - Saves O(V + E) space
   - No graph reversal needed
   - Less memory allocation
   - Better for large graphs

3️⃣ IN-PLACE PROCESSING:
   - Processes SCCs as found
   - No need to store finish times
   - Immediate SCC identification
   - Lower memory footprint

4️⃣ STACK-BASED:
   - Efficient stack operations
   - Natural DFS structure
   - No additional data structures
   - Optimal space usage

5️⃣ CONSTANT FACTORS:
   - Fewer array accesses
   - Better CPU cache usage
   - Less memory overhead
   - More efficient in practice

─────────────────────────────────────────
COMPARISON SUMMARY:

CHARACTERISTIC         TARJAN'S      KOSARAJU'S
────────────────────────────────────────────────
Time Complexity        O(V + E)      O(V + E)
Passes                 1             2
Space Complexity       O(V)          O(V + E)
Transpose Graph        No            Yes
Implementation         Complex       Simpler
Constant Factors       Better        Worse
Cache Performance      Better        Worse
Practical Speed        Faster        Slower

CONCLUSION: Tarjan's is more efficient due to single pass,
            no transpose graph, and better constant factors!

🎯 TIME COMPLEXITY ANALYSIS:
- Single DFS pass: O(V + E)
- Vertex processing: O(V)
- Edge processing: O(E)
- Stack operations: O(V)
- Total: O(V + E)
- Optimal for graph algorithms

🎯 SPACE COMPLEXITY ANALYSIS:
- disc array: O(V)
- low array: O(V)
- stack: O(V)
- inStack array: O(V)
- DFS recursion stack: O(V)
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: disc[0]=1, low[0]=1, disc==low → root
Output: [[0]]

CASE 2: No edges
Input: Graph with 3 vertices, no edges
Process: Each vertex is separate SCC
Output: [[0], [1], [2]]

CASE 3: All vertices in one cycle
Input: 0→1, 1→2, 2→0
Process: All connected in cycle
Output: [[0, 1, 2]]

CASE 4: Linear chain (no cycles)
Input: 0→1, 1→2, 2→3
Process: No cycles, each vertex separate SCC
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
- Line 70-75: Initialize arrays
- Line 80-82: Set discovery time and push to stack
- Line 85-101: Process neighbors (tree/back/cross edges)
- Line 90: Update low from child
- Line 97: Update low from back edge
- Line 105-116: Detect SCC root and pop stack

🎯 BACK EDGE DETECTION:

HOW TO DETECT BACK EDGE?

When processing edge u→v:
- If disc[v] !== -1 (v is visited)
  - If inStack[v] === true → Back edge
  - If inStack[v] === false → Cross edge

Back edge indicates:
- v is ancestor of u
- Cycle exists
- Same SCC component

Cross edge indicates:
- v is in different SCC
- Already processed
- Ignore for low calculation

─────────────────────────────────────────

🎯 WHY disc[v] NOT low[v] FOR BACK EDGES?

When updating from back edge u→v:
- Use disc[v], NOT low[v]
- disc[v] represents when v was discovered
- low[v] might have been updated from descendants
- We want earliest reachable ancestor
- disc[v] is the ancestor's discovery time

Example:
- v discovered at time 2 (disc[v] = 2)
- v's subtree has low[v] = 1 (can reach time 1)
- Back edge from u to v should use disc[v] = 2
- Because we're reaching v itself, not its descendants

─────────────────────────────────────────

🎯 STACK PURPOSE:

WHY USE STACK?

Stack tracks:
- Vertices in current DFS path
- Enables back edge detection
- Collects SCC when root found
- Maintains DFS traversal order

When root detected:
- Pop stack until root
- All popped vertices form one SCC
- Efficient SCC collection

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(V + E) time complexity
- O(V) space complexity
- Single DFS pass
- No transpose graph needed
- More efficient than Kosaraju's

🎯 DISADVANTAGES:
- More complex to understand
- Requires understanding of disc/low
- Cross edge handling critical
- Stack management needed

🎯 REAL-WORLD APPLICATIONS:
- Social network analysis
- Web page ranking
- Compiler optimizations
- Dependency resolution
- Circuit analysis
- Recommendation systems

🎯 RELATED PROBLEMS:
- Kosaraju's SCC algorithm
- Connected components (undirected)
- Articulation points
- Bridges
- 2-SAT problem

🎯 TESTING STRATEGY:
- Single vertex
- No edges
- Single cycle
- Multiple cycles
- Linear chains
- Complex graphs

🎯 DEBUGGING TIPS:
- Print disc and low arrays after DFS
- Trace stack evolution
- Monitor back edge detection
- Verify cross edge handling
- Check SCC root detection

🎯 COMMON MISTAKES:
- Not initializing low[u] = disc[u]
- Updating low from cross edges
- Wrong back edge detection
- Not handling stack correctly
- Using low[v] instead of disc[v] for back edges

🎯 BEST PRACTICES:
- Initialize disc and low together
- Only update low from back edges (inStack check)
- Ignore cross edges completely
- Use disc[v] for back edge updates
- Handle stack correctly when popping SCC

🎯 INTERVIEW TIPS:
- Explain discovery time and low value
- Describe back edge vs cross edge
- Walk through example step by step
- Explain why disc[u]==low[u] means root
- Analyze time/space complexity
- Compare with Kosaraju's algorithm

🎯 CROSS EDGE HANDLING:

WHY IGNORE CROSS EDGES?

Cross edges connect:
- Different SCCs
- Already processed components
- Vertices not in current DFS path

Including them would:
- Incorrectly update low values
- Merge different SCCs
- Produce wrong results

Only back edges (in stack) indicate:
- Cycles in current component
- Same SCC membership
- Correct low value updates

─────────────────────────────────────────

🎯 LOW VALUE PROPAGATION:

HOW LOW VALUES PROPAGATE:

From children (tree edges):
- low[u] = min(low[u], low[v])
- Child's low value propagates to parent
- Represents subtree reachability

From back edges:
- low[u] = min(low[u], disc[v])
- Back edge to ancestor updates low
- Tracks cycle connectivity

NOT from cross edges:
- Cross edges ignored
- Don't affect low values
- Different SCCs stay separate

Example:
- DFS: 0 → 1 → 2
- Back edge 2→0: low[2] = min(disc[2], disc[0])
- Propagates: low[1] = min(low[1], low[2])
- Propagates: low[0] = min(low[0], low[1])

─────────────────────────────────────────

🎯 CONCLUSION:
Finding Strongly Connected Components using Tarjan's algorithm is efficiently achieved
using single DFS pass with discovery time and low value. Discovery time tracks visit
order, while low value tracks earliest reachable ancestor via tree and back edges.
Stack tracks current DFS path, enabling back edge detection. Cross edges are ignored
(connect different SCCs). When disc[u] == low[u], u is root of SCC - pop stack until
u to collect complete SCC. This achieves O(V + E) time complexity and O(V) space
complexity, making it more efficient than Kosaraju's algorithm due to single pass and
no transpose graph requirement!
*/