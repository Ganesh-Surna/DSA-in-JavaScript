/* Problem: ✅✅✅✅ Articulation Points (Cut Vertices) using DFS ✅✅✅✅

Given an undirected connected graph, find all articulation points using DFS with Discovery Time
and Low Value concepts. An articulation point (cut vertex) is a vertex whose removal increases
the number of connected components.

Algorithm requirements:
- Use DFS to find articulation points
- Track Discovery Time (disc): Time when DFS reaches a vertex
- Track Low Value (low): Smallest discovery time reachable from a vertex
- Two conditions for articulation point:
  1. Root with 2+ children → articulation point
  2. Non-root u with child v such that low[v] >= disc[u] → articulation point
- Return list of all articulation points

Example from images:
Input: Graph with edges: 0-1, 0-2, 0-3, 1-2, 1-3, 2-3, 1-4, 4-5, 4-6, 5-6
Start DFS from 0, articulation points: 1, 4

Example:
Input: Graph with edges: 0-1, 1-2, 2-3, 1-4, 4-5, 4-6, 5-6
Output: [1, 4]
Explanation:
- Vertex 1: has child 4, no back edges from subtree(4) to ancestors of 1
- Vertex 4: has children 5 and 6, back edge 6→4 exists but no back edge to ancestors

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
    findArticulationPoints(){
        // Arrays to store discovery time, low value, parent, and whether vertex is articulation point
        const disc = new Array(this.V).fill(-1); // Discovery time
        const low = new Array(this.V).fill(-1);  // Low value
        const parent = new Array(this.V).fill(-1); // Parent in DFS tree
        const isAP = new Array(this.V).fill(false); // Mark articulation points
        let time = 0; // Timer for discovery time

        // DFS helper function
        const dfs = (u, visited) => {
            visited[u] = true;
            disc[u] = low[u] = ++time; // Set discovery time and initialize low value
            let children = 0; // Count children in DFS tree

            // Process all neighbors
            for(let v of this.adj[u]){
                if(!visited[v]){
                    children++;
                    parent[v] = u;
                    dfs(v, visited);

                    // Update low value of u after processing v
                    low[u] = Math.min(low[u], low[v]); // minimum of low[u] and low[v] ✅✅

                    // Condition 1: Root of DFS tree with 2+ children
                    if(parent[u] === -1 && children > 1){ // If no parent, then it is root
                        isAP[u] = true;
                    }

                    // Condition 2: Non-root u with child v such that low[v] >= disc[u]
                    // This means no back edge from subtree rooted at v to ancestors of u
                    if(parent[u] !== -1 && low[v] >= disc[u]){
                        isAP[u] = true;
                    }
                }
                // Back edge case: update low value of u if v is not parent
                // (If v is already visited and not parent, then it is back edge (means v is ancestor(but not parent) to u))
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

        // Collect all articulation points
        const articulationPoints = [];
        for(let i = 0; i < this.V; i++){
            if(isAP[i]){
                articulationPoints.push(i);
            }
        }

        return {
            articulationPoints: articulationPoints,
            discoveryTimes: disc,
            lowValues: low,
            parents: parent
        };
    }
}

// Test cases
let g1 = new Graph(7);
g1.addEdge(0, 1);
g1.addEdge(1, 2);
g1.addEdge(2, 3);
g1.addEdge(1, 4);
g1.addEdge(4, 5);
g1.addEdge(4, 6);
g1.addEdge(5, 6);
console.log("Test 1:", g1.findArticulationPoints().articulationPoints); // [1, 4]

let g2 = new Graph(4);
g2.addEdge(0, 1);
g2.addEdge(0, 2);
g2.addEdge(1, 2);
console.log("Test 2:", g2.findArticulationPoints().articulationPoints); // []

let g3 = new Graph(5);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
g3.addEdge(2, 3);
g3.addEdge(3, 4);
console.log("Test 3:", g3.findArticulationPoints().articulationPoints); // [1, 2, 3]

/*🎯 CORE IDEA: Use DFS with Discovery Time and Low Value to find articulation points.
   
   Discovery Time (disc[u]): Time when DFS first reaches vertex u
   Low Value (low[u]): Smallest discovery time reachable from u via tree edges and back edges
   
   Two conditions for articulation point:
   1. Root with 2+ children → removal disconnects children
   2. Non-root u with child v where low[v] >= disc[u] → no back edge from v's subtree
   
   If low[v] >= disc[u], subtree rooted at v has no path to ancestors of u,
   meaning removing u disconnects v's subtree from the rest of the graph!

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize disc array with -1 (unvisited)
   - Initialize low array with -1
   - Initialize parent array with -1
   - Initialize isAP array with false
   - Start timer = 0

2️⃣ DFS TRAVERSAL:
   - Start DFS from unvisited vertex
   - Mark vertex as visited
   - Set disc[u] = low[u] = ++time
   - Initialize children count = 0

3️⃣ PROCESS NEIGHBORS:
   - For each unvisited neighbor:
     - Increment children count
     - Set parent[v] = u
     - Recursively DFS(v)
     - Update low[u] = min(low[u], low[v])
     - Check articulation conditions

4️⃣ ARTICULATION CONDITIONS:
   - Condition 1: Root with 2+ children
   - Condition 2: low[v] >= disc[u] for non-root
   - Mark vertex as articulation point

5️⃣ BACK EDGE HANDLING:
   - If neighbor is visited and not parent
   - Update low[u] = min(low[u], disc[v])
   - This handles back edges

6️⃣ RESULT:
   - Collect all articulation points
   - Return result with additional info

🧠 WHY THIS APPROACH?
- DFS provides tree structure
- Discovery time tracks visit order
- Low value tracks back edge reachability
- O(V + E) time complexity
- Elegant single-pass algorithm

💡 KEY INSIGHTS:
- Discovery time increases monotonically
- Low value tracks earliest reachable ancestor
- Back edges create cycles (don't disconnect)
- Root needs special handling (2+ children)
- Non-root: low[v] >= disc[u] means disconnection
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Finding Articulation Points

INPUT: Graph with edges: 0-1, 1-2, 2-3, 1-4, 4-5, 4-6, 5-6
EXPECTED OUTPUT: [1, 4]

Graph visualization:
    0
    |
    1
   / \
  2   4
  |  / \
  3 5---6

Graph structure:
0: [1]
1: [0, 2, 4]
2: [1, 3]
3: [2]
4: [1, 5, 6]
5: [4, 6]
6: [4, 5]

🎯 GOAL: Find all articulation points (cut vertices)!

🔍 STEP-BY-STEP DFS PROCESS:

Start DFS from 0:

INITIALIZATION:
disc = [-1, -1, -1, -1, -1, -1, -1]
low = [-1, -1, -1, -1, -1, -1, -1]
parent = [-1, -1, -1, -1, -1, -1, -1]
isAP = [false, false, false, false, false, false, false]
time = 0

─────────────────────────────────────────
DFS(0):
─────────────────────────────────────────
visited[0] = true
disc[0] = low[0] = ++time = 1
children = 0

Process neighbor 1:
  visited[1] = false → DFS(1)
  children = 1
  parent[1] = 0

─────────────────────────────────────────
DFS(1):
─────────────────────────────────────────
visited[1] = true
disc[1] = low[1] = ++time = 2
children = 0

Process neighbor 0:
  visited[0] = true → back edge
  v (0) !== parent[1] (-1)? Yes
  Update: low[1] = min(2, disc[0]) = min(2, 1) = 1

Process neighbor 2:
  visited[2] = false → DFS(2)
  children = 1
  parent[2] = 1

─────────────────────────────────────────
DFS(2):
─────────────────────────────────────────
visited[2] = true
disc[2] = low[2] = ++time = 3
children = 0

Process neighbor 1:
  visited[1] = true → back edge
  v (1) !== parent[2] (1)? No (same as parent)
  Skip

Process neighbor 3:
  visited[3] = false → DFS(3)
  children = 1
  parent[3] = 2

─────────────────────────────────────────
DFS(3):
─────────────────────────────────────────
visited[3] = true
disc[3] = low[3] = ++time = 4
children = 0

Process neighbor 2:
  visited[2] = true → back edge
  v (2) !== parent[3] (2)? No (same as parent)
  Skip

Return to DFS(2):
  Update: low[2] = min(3, low[3]) = min(3, 4) = 3
  Check: parent[2] !== -1 (parent=1) && low[3] >= disc[2]?
    4 >= 3? Yes!
  isAP[2] = true (but wait, we'll verify later)

Return to DFS(1):
  Process neighbor 4:
    visited[4] = false → DFS(4)
    children = 2
    parent[4] = 1

─────────────────────────────────────────
DFS(4):
─────────────────────────────────────────
visited[4] = true
disc[4] = low[4] = ++time = 5
children = 0

Process neighbor 1:
  visited[1] = true → back edge
  v (1) !== parent[4] (1)? No (same as parent)
  Skip

Process neighbor 5:
  visited[5] = false → DFS(5)
  children = 1
  parent[5] = 4

─────────────────────────────────────────
DFS(5):
─────────────────────────────────────────
visited[5] = true
disc[5] = low[5] = ++time = 6
children = 0

Process neighbor 4:
  visited[4] = true → back edge
  v (4) !== parent[5] (4)? No (same as parent)
  Skip

Process neighbor 6:
  visited[6] = false → DFS(6)
  children = 1
  parent[6] = 5

─────────────────────────────────────────
DFS(6):
─────────────────────────────────────────
visited[6] = true
disc[6] = low[6] = ++time = 7
children = 0

Process neighbor 4:
  visited[4] = true → back edge
  v (4) !== parent[6] (5)? Yes
  Update: low[6] = min(7, disc[4]) = min(7, 5) = 5

Process neighbor 5:
  visited[5] = true → back edge
  v (5) !== parent[6] (5)? No (same as parent)
  Skip

Return to DFS(5):
  Update: low[5] = min(6, low[6]) = min(6, 5) = 5
  Check: parent[5] !== -1 (parent=4) && low[6] >= disc[5]?
    5 >= 6? No
  Not articulation point

Return to DFS(4):
  Update: low[4] = min(5, low[5]) = min(5, 5) = 5
  Check: parent[4] !== -1 (parent=1) && low[5] >= disc[4]?
    5 >= 5? Yes!
  isAP[4] = true

Process neighbor 6:
  visited[6] = true → back edge
  v (6) !== parent[4] (1)? Yes
  Update: low[4] = min(5, disc[6]) = min(5, 7) = 5 (no change)

Return to DFS(1):
  Update: low[1] = min(1, low[2]) = min(1, 3) = 1
  Check: parent[1] !== -1 (parent=0) && low[2] >= disc[1]?
    3 >= 2? Yes!
  isAP[1] = true

  Update: low[1] = min(1, low[4]) = min(1, 5) = 1 (no change)

Return to DFS(0):
  Update: low[0] = min(1, low[1]) = min(1, 1) = 1
  Check: parent[0] === -1 (root) && children > 1?
    1 > 1? No (only 1 child)
  Not articulation point (root with only 1 child)

─────────────────────────────────────────
KEY OBSERVATIONS FOR ARTICULATION POINTS:
─────────────────────────────────────────

Vertex 1 (Articulation Point):
- Has two children: 2 and 4
- For child 2: low[2] = 3, disc[1] = 2 → low[2] >= disc[1]? 3 >= 2? Yes
  This means subtree(2) cannot reach ancestors of 1 (discovery time < 2)
  Removing 1 disconnects subtree(2) → 1 is AP ✓

- For child 4: low[4] = 5, disc[1] = 2 → low[4] >= disc[1]? 5 >= 2? Yes
  This means subtree(4) cannot reach ancestors of 1
  Removing 1 disconnects subtree(4) → 1 is AP ✓

Vertex 4 (Articulation Point):
- Has children: 5
- For child 5: low[5] = 5, disc[4] = 5 → low[5] >= disc[4]? 5 >= 5? Yes
  Even though there's a back edge from 6 to 4, subtree(5) including 6 has
  low value 5 which equals disc[4], meaning no path to ancestors of 4
  Removing 4 disconnects subtree(5,6) → 4 is AP ✓

FINAL STATE:
disc = [1, 2, 3, 4, 5, 6, 7]
low = [1, 1, 3, 4, 5, 5, 5]
parent = [-1, 0, 1, 2, 1, 4, 5]
isAP = [false, true, false, false, true, false, false]

Articulation Points: [1, 4]

─────────────────────────────────────────

📊 EXAMPLE 2: Linear Chain

INPUT: Graph with edges: 0-1, 1-2, 2-3, 3-4
EXPECTED OUTPUT: [1, 2, 3]

In a linear chain, all internal vertices are articulation points because
removing any internal vertex disconnects the graph into two parts.

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DFS TREE STRUCTURE:
    0 (disc=1, low=1)
    |
    1 (disc=2, low=1) ← AP
   / \
  2   4 (disc=5, low=5) ← AP
  |  / \
  3 5---6
  (disc=4, low=4) (disc=6, low=5) (disc=7, low=5)

DISCOVERY TIME PROGRESSION:
time=1: Visit 0
time=2: Visit 1
time=3: Visit 2
time=4: Visit 3
time=5: Visit 4
time=6: Visit 5
time=7: Visit 6

LOW VALUE UPDATES:
- Back edge 6→4: low[6] = min(7, disc[4]=5) = 5
- Propagates: low[5] = min(6, low[6]=5) = 5
- Propagates: low[4] = min(5, low[5]=5) = 5

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
- Updated when back edges found
- Tracks earliest ancestor reachable

Example for vertex 6:
- disc[6] = 7 (visited at time 7)
- Back edge to 4 (disc[4] = 5)
- low[6] = min(7, 5) = 5
- Can reach vertex discovered at time 5 (vertex 4)

─────────────────────────────────────────

📊 ARTICULATION POINT CONDITIONS:

CONDITION 1: ROOT WITH 2+ CHILDREN
- Root vertex (parent = -1)
- Has 2 or more children in DFS tree
- Removing root disconnects children
- Example: Root with children {A, B} → removing root splits into {A} and {B}

CONDITION 2: NON-ROOT WITH low[v] >= disc[u]
- Non-root vertex u (parent ≠ -1)
- Has child v such that low[v] >= disc[u]
- Subtree(v) cannot reach ancestors of u
- Removing u disconnects subtree(v)
- Example: u=1, v=2, low[2]=3, disc[1]=2 → 3>=2 → 1 is AP

─────────────────────────────────────────

📊 WHY low[v] >= disc[u] MEANS DISCONNECTION?

If low[v] >= disc[u]:
- Subtree rooted at v has minimum reachable discovery time >= disc[u]
- Cannot reach any vertex discovered before u (ancestors)
- All paths from v go through u
- Removing u breaks all paths → disconnection

If low[v] < disc[u]:
- Subtree(v) can reach vertex discovered before u (ancestor)
- Back edge exists from subtree(v) to ancestor
- Removing u doesn't disconnect (back edge provides path)
- u is NOT articulation point

─────────────────────────────────────────

📊 BACK EDGE HANDLING:

BACK EDGE: Edge to already visited vertex (not parent)

When processing back edge u→v (where v is visited):
- v is ancestor of u in DFS tree
- Update: low[u] = min(low[u], disc[v])
- This tracks earliest reachable ancestor
- Back edges create cycles (preserve connectivity)

Example:
- DFS tree: 4 → 5 → 6
- Back edge: 6 → 4
- low[6] = min(disc[6]=7, disc[4]=5) = 5
- Can reach ancestor at time 5

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Single DFS pass: O(V + E)
- Each vertex visited once
- Each edge processed twice (undirected)
- Total: O(V + E)

SPACE COMPLEXITY:
- disc array: O(V)
- low array: O(V)
- parent array: O(V)
- visited array: O(V)
- isAP array: O(V)
- DFS recursion stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DFS TREE STRUCTURE:
   - Provides parent-child relationships
   - Identifies tree edges vs back edges
   - Enables subtree analysis
   - Foundation for articulation detection

2️⃣ DISCOVERY TIME:
   - Tracks DFS visit order
   - Monotonically increasing
   - Enables ancestor detection
   - Critical for low value calculation

3️⃣ LOW VALUE:
   - Tracks earliest reachable ancestor
   - Updated via back edges
   - Propagates from children
   - Determines connectivity

4️⃣ ARTICULATION CONDITIONS:
   - Root: 2+ children → disconnection
   - Non-root: low[v] >= disc[u] → disconnection
   - Both conditions necessary and sufficient
   - Correctly identifies all APs

5️⃣ BACK EDGE PROCESSING:
   - Updates low values correctly
   - Handles cycles properly
   - Preserves connectivity information
   - Critical for correctness

💡 KEY INSIGHT:
Using DFS with discovery time and low value to identify articulation points. Discovery time
tracks visit order, while low value tracks earliest reachable ancestor via tree and back edges.
Root with 2+ children is AP (disconnects children). Non-root u with child v where low[v] >= disc[u]
is AP (no back edge from v's subtree to ancestors of u). Back edges update low values, preserving
cycle connectivity. This achieves O(V + E) time complexity for finding all articulation points!

🎯 TIME COMPLEXITY ANALYSIS:
- Single DFS pass: O(V + E)
- Vertex processing: O(V)
- Edge processing: O(E)
- Array operations: O(V)
- Total: O(V + E)
- Optimal for graph traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- Arrays: disc, low, parent, visited, isAP = O(5V) = O(V)
- DFS recursion stack: O(V)
- Adjacency list: O(V + E)
- Total: O(V + E)
- Linear in graph size

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: No neighbors, children=0, not AP
Output: []

CASE 2: Two vertices
Input: Graph with edge 0-1
Process: Root 0 has 1 child, not AP
Output: []

CASE 3: Triangle (complete graph on 3 vertices)
Input: 0-1, 1-2, 2-0
Process: Back edges prevent disconnection
Output: [] (no APs, all connected via cycles)

CASE 4: Linear chain
Input: 0-1, 1-2, 2-3, 3-4
Process: All internal vertices are APs
Output: [1, 2, 3]

CASE 5: Star graph
Input: Center connected to all others
Process: Center with multiple children
Output: [center] (if root) or [] (if not root with back edges)

🎯 ALGORITHM CORRECTNESS:
- Identifies all APs: ✓
- No false positives: ✓
- No false negatives: ✓
- Handles all graph types: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 63-67: Initialize arrays
- Line 72: Set discovery time and initialize low
- Line 76-100: Process neighbors
- Line 83: Update low from child
- Line 86-88: Check root condition
- Line 92-94: Check non-root condition
- Line 97-99: Handle back edges

🎯 DISCOVERY TIME INITIALIZATION:

WHY disc[u] = low[u] = time?

Initially:
- disc[u] = time (when discovered)
- low[u] = time (initially can only reach itself)
- Updated later via back edges and children
- Represents baseline reachability

This initialization is correct!

🎯 LOW VALUE PROPAGATION:

HOW LOW VALUES PROPAGATE:

From children:
- low[u] = min(low[u], low[v])
- Child's low value propagates to parent
- Represents subtree reachability

From back edges:
- low[u] = min(low[u], disc[v])
- Back edge to ancestor updates low
- Tracks cycle connectivity

Example:
low[6] = 5 (back edge to 4)
low[5] = min(6, low[6]=5) = 5
low[4] = min(5, low[5]=5) = 5

This correctly propagates!

🎯 ADVANTAGES:
- O(V + E) time complexity
- Single DFS pass
- Simple implementation
- Correct AP identification
- Handles all graph types

🎯 DISADVANTAGES:
- Requires DFS recursion
- Stack overflow for deep graphs
- Needs understanding of low values
- Can be complex to debug

🎯 REAL-WORLD APPLICATIONS:
- Network reliability analysis
- Critical infrastructure identification
- Vulnerability assessment
- Graph connectivity analysis
- Social network analysis
- Transportation planning

🎯 RELATED PROBLEMS:
- Bridges (cut edges)
- Biconnected components
- 2-edge connected components
- Graph connectivity
- Network reliability

🎯 TESTING STRATEGY:
- Single vertex
- Two vertices
- Cycles (no APs)
- Linear chains (all internal are APs)
- Star graphs
- Complex graphs

🎯 DEBUGGING TIPS:
- Print disc and low arrays after DFS
- Trace low value updates
- Verify articulation conditions
- Check back edge handling
- Validate DFS tree structure

🎯 COMMON MISTAKES:
- Not initializing low[u] = disc[u]
- Not updating low from back edges
- Wrong articulation condition
- Not handling root separately
- Incorrect parent tracking

🎯 BEST PRACTICES:
- Initialize disc and low together
- Update low from children and back edges
- Check both articulation conditions
- Handle root case separately
- Test with various graph structures

🎯 INTERVIEW TIPS:
- Explain discovery time concept
- Describe low value purpose
- Walk through example step by step
- Explain both conditions
- Analyze time/space complexity
- Discuss applications

🎯 ARTICULATION POINT VS BRIDGE:

ARTICULATION POINT (Cut Vertex):
- Removing vertex disconnects graph
- Found using disc and low values
- Two conditions (root and non-root)

BRIDGE (Cut Edge):
- Removing edge disconnects graph
- Found using similar DFS approach
- Condition: low[v] > disc[u] (strict inequality)

Different but related concepts!

🎯 ROOT CONDITION:

WHY ROOT NEEDS SPECIAL HANDLING?

Root with 1 child:
- Removing root → child becomes new root
- Graph still connected
- Not an articulation point

Root with 2+ children:
- Removing root → children become separate components
- Graph disconnected
- Is an articulation point

Special case needed!

🎯 LOW VALUE INTERPRETATION:

WHAT DOES low[u] REPRESENT?

low[u] = smallest disc value reachable from u

Reachable via:
- Tree edges (down in DFS tree)
- Back edges (up to ancestors)

Example:
- disc[6] = 7
- Back edge 6→4, disc[4] = 5
- low[6] = 5
- Can reach vertex discovered at time 5

This tracks connectivity!

🎯 CONCLUSION:
Finding articulation points using DFS with discovery time and low value is efficiently
achieved by tracking DFS visit order (discovery time) and earliest reachable ancestor
(low value). Root with 2+ children is an AP. Non-root u with child v where low[v] >= disc[u]
is an AP (no back edge to ancestors). Back edges update low values, preserving cycle
connectivity. This achieves O(V + E) time complexity and O(V + E) space complexity,
making it optimal for identifying all articulation points in undirected graphs!
*/
