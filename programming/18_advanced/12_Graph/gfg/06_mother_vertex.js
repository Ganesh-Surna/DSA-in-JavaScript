/* Problem: ✅✅✅✅ Find Mother Vertex in Directed Graph ✅✅✅✅

Given a Directed Graph, find a Mother Vertex in the Graph (if present).
A Mother Vertex is a vertex through which we can reach all the other vertices
of the Graph. In other words, if we perform DFS starting from a mother vertex,
we can visit all vertices in the graph.

Key Requirements:
- A mother vertex must be able to reach all other vertices
- If there are multiple mother vertices, return the one with minimum value
- If no mother vertex exists, return -1
- The graph may be disconnected (no mother vertex)
- The graph may have cycles

You are given the number of vertices V and an adjacency list representation of
a directed graph. Find and return a mother vertex if it exists.

Example 1:
Input: V = 5, adj = [[2, 3], [0], [1], [4], []]
Graph:
    0 → 2 → 1 → 0 (cycle)
    ↓
    3 → 4

Output: 0
Explanation:
- Vertex 0 can reach: 0, 2, 1, 3, 4 (all vertices)
- DFS from 0 visits all vertices
- 0 is the mother vertex

Example 2:
Input: V = 4, adj = [[1], [2], [3], []]
Graph:
    0 → 1 → 2 → 3

Output: 0
Explanation:
- Vertex 0 can reach all vertices: 0, 1, 2, 3
- 0 is the mother vertex

Example 3:
Input: V = 3, adj = [[1], [2], []]
Graph:
    0 → 1 → 2

Output: 0
Explanation:
- Vertex 0 can reach 0, 1, 2 (all vertices)
- 0 is the mother vertex

Example 4:
Input: V = 4, adj = [[1], [0], [3], [2]]
Graph:
    0 ↔ 1   2 ↔ 3
(Disconnected components)

Output: -1
Explanation:
- Component 1: {0, 1}
- Component 2: {2, 3}
- No single vertex can reach all vertices
- No mother vertex exists

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ number of edges ≤ 10^5
- Graph may be disconnected
- Graph may have cycles

Expected Complexities:
Time Complexity: O(V + E) - Two DFS passes
Auxiliary Space: O(V) - for visited array and recursion stack
*/

// ✅ TC = O(V + E) - Two DFS passes
// ✅ SC = O(V) - visited array and recursion stack
function findMotherVertex(V, adj) {
    // Array to track visited vertices
    let visited = new Array(V).fill(false);
    let lastV = -1; // Last finished vertex (potential mother vertex)
    
    // Step 1: Perform DFS to find last finished vertex
    // Key insight: If a mother vertex exists, it will be the last vertex
    // to finish in the first DFS pass (based on finish times)
    for(let i = 0; i < V; i++){
        if(!visited[i]){
            dfs(i);
            lastV = i; // Update last finished vertex
        }
    }
    
    // Step 2: Verify if lastV is a mother vertex
    // Reset visited array and perform DFS from lastV
    visited = new Array(V).fill(false);
    dfs(lastV);
    
    // Step 3: Check if all vertices were visited
    // If all vertices are reachable from lastV, it's a mother vertex
    for(let i = 0; i < V; i++){
        if(!visited[i]){
            return -1; // lastV cannot reach all vertices
        }
    }
    
    return lastV; // lastV is a mother vertex
    
    // Helper function to perform DFS
    function dfs(u){
        visited[u] = true;
        // Visit all neighbors
        for(let v of adj[u]){
            if(!visited[v]){
                dfs(v); // Recursively visit unvisited neighbors
            }
        }
    }
}

// Test cases
let adj1 = [[2, 3], [0], [1], [4], []];
console.log("Test 1:", findMotherVertex(5, adj1)); // 0 (mother vertex)

let adj2 = [[1], [2], [3], []];
console.log("Test 2:", findMotherVertex(4, adj2)); // 0 (mother vertex)

let adj3 = [[1], [2], []];
console.log("Test 3:", findMotherVertex(3, adj3)); // 0 (mother vertex)

let adj4 = [[1], [0], [3], [2]];
console.log("Test 4:", findMotherVertex(4, adj4)); // -1 (no mother vertex - disconnected)

let adj5 = [[1, 2], [3], [3], []];
console.log("Test 5:", findMotherVertex(4, adj5)); // 0 (mother vertex: 0→1→3, 0→2→3)

/*🎯 CORE IDEA: Use two-pass DFS algorithm. First pass finds the last finished vertex
(based on DFS finish times), which is the candidate mother vertex. The key insight is that
if a mother vertex exists, it will finish last in the first DFS pass. Second pass verifies
if this candidate can reach all vertices. If yes, it's the mother vertex; otherwise, no
mother vertex exists.

📋 STEP-BY-STEP FLOW:

1️⃣ FIRST DFS PASS - FIND CANDIDATE:
   - Perform DFS from each unvisited vertex
   - Track the last vertex that finishes DFS
   - This vertex is the candidate mother vertex
   - Based on finish times in DFS

2️⃣ SECOND DFS PASS - VERIFY CANDIDATE:
   - Reset visited array
   - Perform DFS starting from candidate vertex
   - Check if all vertices are reachable

3️⃣ VALIDATION:
   - Check if all vertices were visited in second pass
   - If yes → candidate is mother vertex
   - If no → no mother vertex exists

4️⃣ RESULT:
   - Return candidate vertex if valid
   - Return -1 if no mother vertex

🧠 WHY THIS APPROACH?
- Mother vertex finishes last in DFS (finish time property)
- Two-pass DFS efficiently finds and verifies
- O(V + E) time complexity
- Handles disconnected graphs correctly

💡 KEY INSIGHTS:
- Mother vertex must be in source SCC (if graph has SCCs)
- Last finished vertex in first DFS is the candidate
- Verification ensures correctness
- Disconnected graphs have no mother vertex
- Multiple mother vertices possible (return minimum)
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find Mother Vertex

INPUT: V = 5, adj = [[2, 3], [0], [1], [4], []]
Graph structure:
  0 → 2 → 1 → 0 (cycle)
  ↓
  3 → 4

Adjacency list:
0: [2, 3]
1: [0]
2: [1]
3: [4]
4: []

EXPECTED OUTPUT: 0

🎯 GOAL: Find mother vertex (vertex that can reach all others)!

🔍 STEP-BY-STEP PROCESS:

─────────────────────────────────────────
STEP 1: FIRST DFS PASS - FIND CANDIDATE
─────────────────────────────────────────

Initialize:
visited = [false, false, false, false, false]
lastV = -1

Iterate through vertices:

i = 0:
  visited[0]? No → Start DFS from 0
  
  DFS(0):
    visited[0] = true
    visited = [true, false, false, false, false]
    
    Process neighbors of 0: [2, 3]
    
    Visit 2:
      visited[2]? No → DFS(2)
      DFS(2):
        visited[2] = true
        visited = [true, false, true, false, false]
        
        Process neighbors of 2: [1]
        
        Visit 1:
          visited[1]? No → DFS(1)
          DFS(1):
            visited[1] = true
            visited = [true, true, true, false, false]
            
            Process neighbors of 1: [0]
            
            Visit 0:
              visited[0]? Yes → Skip
            
            DFS(1) finishes
          DFS(1) returns
        
        DFS(2) finishes
      DFS(2) returns
    
    Visit 3:
      visited[3]? No → DFS(3)
      DFS(3):
        visited[3] = true
        visited = [true, true, true, true, false]
        
        Process neighbors of 3: [4]
        
        Visit 4:
          visited[4]? No → DFS(4)
          DFS(4):
            visited[4] = true
            visited = [true, true, true, true, true]
            
            Process neighbors of 4: []
            DFS(4) finishes
          DFS(4) returns
        
        DFS(3) finishes
      DFS(3) returns
    
    DFS(0) finishes
  
  lastV = 0 (last vertex that finished DFS)

i = 1:
  visited[1]? Yes → Skip

i = 2:
  visited[2]? Yes → Skip

i = 3:
  visited[3]? Yes → Skip

i = 4:
  visited[4]? Yes → Skip

After first pass:
visited = [true, true, true, true, true]
lastV = 0 (candidate mother vertex)

─────────────────────────────────────────
STEP 2: SECOND DFS PASS - VERIFY CANDIDATE
─────────────────────────────────────────

Reset:
visited = [false, false, false, false, false]

Start DFS from lastV = 0:

DFS(0):
  visited[0] = true
  visited = [true, false, false, false, false]
  
  Process neighbors of 0: [2, 3]
  
  Visit 2:
    visited[2]? No → DFS(2)
    DFS(2):
      visited[2] = true
      visited = [true, false, true, false, false]
      
      Process neighbors of 2: [1]
      
      Visit 1:
        visited[1]? No → DFS(1)
        DFS(1):
          visited[1] = true
          visited = [true, true, true, false, false]
          
          Process neighbors of 1: [0]
          visited[0]? Yes → Skip
          
          DFS(1) finishes
        DFS(1) returns
      
      DFS(2) finishes
    DFS(2) returns
  
  Visit 3:
    visited[3]? No → DFS(3)
    DFS(3):
      visited[3] = true
      visited = [true, true, true, true, false]
      
      Process neighbors of 3: [4]
      
      Visit 4:
        visited[4]? No → DFS(4)
        DFS(4):
          visited[4] = true
          visited = [true, true, true, true, true]
          
          Process neighbors of 4: []
          DFS(4) finishes
        DFS(4) returns
      
      DFS(3) finishes
    DFS(3) returns
  
  DFS(0) finishes

After second pass:
visited = [true, true, true, true, true]
All vertices visited!

─────────────────────────────────────────
STEP 3: VALIDATION
─────────────────────────────────────────

Check all vertices:
visited[0]? Yes ✓
visited[1]? Yes ✓
visited[2]? Yes ✓
visited[3]? Yes ✓
visited[4]? Yes ✓

All vertices are reachable from 0!

🏆 FINAL RESULT: 0
Vertex 0 is the mother vertex!

─────────────────────────────────────────

📊 EXAMPLE 2: Disconnected Graph (No Mother Vertex)

INPUT: V = 4, adj = [[1], [0], [3], [2]]
Graph structure:
  0 ↔ 1   2 ↔ 3
(Disconnected components)

EXPECTED OUTPUT: -1

PROCESS:

STEP 1: First DFS Pass

i = 0:
  visited[0]? No → DFS(0)
  DFS(0):
    visited[0] = true
    Visit 1:
      visited[1]? No → DFS(1)
      DFS(1):
        visited[1] = true
        Visit 0:
          visited[0]? Yes → Skip
        DFS(1) finishes
      DFS(1) returns
    DFS(0) finishes
  lastV = 0

i = 1:
  visited[1]? Yes → Skip

i = 2:
  visited[2]? No → DFS(2)
  DFS(2):
    visited[2] = true
    Visit 3:
      visited[3]? No → DFS(3)
      DFS(3):
        visited[3] = true
        Visit 2:
          visited[2]? Yes → Skip
        DFS(3) finishes
      DFS(3) returns
    DFS(2) finishes
  lastV = 2 (updated)

i = 3:
  visited[3]? Yes → Skip

After first pass:
lastV = 2 (candidate)

STEP 2: Verify candidate 2

DFS(2):
  visited[2] = true
  Visit 3:
    visited[3]? No → DFS(3)
    DFS(3):
      visited[3] = true
      Visit 2:
        visited[2]? Yes → Skip
      DFS(3) finishes
    DFS(3) returns
  DFS(2) finishes

After second pass:
visited = [false, false, true, true]
Vertices 0 and 1 NOT visited!

STEP 3: Validation

visited[0]? No ✗
visited[1]? No ✗
visited[2]? Yes ✓
visited[3]? Yes ✓

Not all vertices reachable!

🏆 FINAL RESULT: -1
No mother vertex exists (graph is disconnected)

─────────────────────────────────────────

📊 EXAMPLE 3: Simple Chain

INPUT: V = 4, adj = [[1], [2], [3], []]
Graph structure:
  0 → 1 → 2 → 3

EXPECTED OUTPUT: 0

PROCESS:

STEP 1: First DFS Pass

i = 0:
  visited[0]? No → DFS(0)
  DFS(0):
    visited[0] = true
    Visit 1:
      visited[1]? No → DFS(1)
      DFS(1):
        visited[1] = true
        Visit 2:
          visited[2]? No → DFS(2)
          DFS(2):
            visited[2] = true
            Visit 3:
              visited[3]? No → DFS(3)
              DFS(3):
                visited[3] = true
                Process neighbors: []
                DFS(3) finishes
              DFS(3) returns
            DFS(2) finishes
          DFS(2) returns
        DFS(1) finishes
      DFS(1) returns
    DFS(0) finishes
  lastV = 0

After first pass:
lastV = 0

STEP 2: Verify candidate 0

DFS(0):
  Visits 0, 1, 2, 3 (all vertices)

After second pass:
visited = [true, true, true, true]
All vertices visited!

STEP 3: Validation

All vertices reachable!

🏆 FINAL RESULT: 0
Vertex 0 is the mother vertex!

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DFS FINISH TIMES (First Pass):

For graph: 0 → 2 → 1 → 0 (cycle), and 0 → 3 → 4

DFS traversal order:
- Start DFS from 0
- Visit: 0 → 2 → 1 → 3 → 4

Finish times (when DFS returns):
- 4 finishes first (no neighbors)
- 3 finishes second (only 4 visited)
- 1 finishes third (only 0 visited)
- 2 finishes fourth (only 1 visited)
- 0 finishes last (all descendants visited)

Last to finish: 0
This is the candidate mother vertex!

─────────────────────────────────────────

📊 WHY LAST FINISHED VERTEX?

KEY INSIGHT: DFS Finish Time Property

If vertex u can reach vertex v:
- u's DFS starts before v's DFS
- v's DFS finishes before u's DFS
- Therefore, u finishes after v

If u is a mother vertex:
- u can reach ALL vertices
- u's DFS starts before all other DFS
- All other vertices finish before u
- Therefore, u finishes LAST

Conclusion:
- Mother vertex (if exists) finishes last in DFS
- Last finished vertex is the candidate
- Verification ensures correctness

─────────────────────────────────────────

📊 MOTHER VERTEX PROPERTIES:

PROPERTY 1: Uniqueness
- At most one mother vertex per connected component
- Multiple components → no mother vertex
- Multiple mother vertices possible (return minimum)

PROPERTY 2: Reachability
- Mother vertex can reach all vertices
- All vertices reachable from mother vertex
- DFS from mother visits entire graph

PROPERTY 3: SCC Relationship
- Mother vertex must be in source SCC
- Source SCC: no incoming edges from other SCCs
- If graph has SCCs, mother vertex is in source SCC

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- First DFS pass: O(V + E)
- Second DFS pass: O(V + E)
- Validation: O(V)
- Total: O(V + E)

SPACE COMPLEXITY:
- visited array: O(V)
- DFS recursion stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ FINISH TIME PROPERTY:
   - Mother vertex finishes last in DFS
   - Last finished vertex is candidate
   - Based on DFS finish time ordering
   - Mathematical property of DFS

2️⃣ TWO-PASS VERIFICATION:
   - First pass finds candidate
   - Second pass verifies reachability
   - Ensures correctness
   - Handles edge cases

3️⃣ DISCONNECTED GRAPH HANDLING:
   - First pass may find vertex from one component
   - Second pass fails if components disconnected
   - Returns -1 correctly
   - Handles all cases

4️⃣ EFFICIENCY:
   - Only two DFS passes needed
   - O(V + E) time complexity
   - Optimal for this problem
   - No unnecessary traversals

5️⃣ CORRECTNESS:
   - Finds mother vertex if exists
   - Returns -1 if doesn't exist
   - Handles cycles correctly
   - Handles disconnected graphs

💡 KEY INSIGHT:
Using two-pass DFS to find mother vertex. First pass identifies the last finished vertex
(based on DFS finish times), which is the candidate mother vertex. Second pass verifies
if this candidate can reach all vertices. If yes, it's the mother vertex; otherwise, no
mother vertex exists. This achieves O(V + E) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- First DFS pass: O(V + E)
- Second DFS pass: O(V + E)
- Validation loop: O(V)
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
Input: V = 1, adj = [[]]
Process: 
  First pass: lastV = 0
  Second pass: DFS(0) visits 0
  All vertices visited
Output: 0 (vertex 0 is mother vertex)

CASE 2: Two vertices (chain)
Input: V = 2, adj = [[1], []]
Process:
  First pass: lastV = 0
  Second pass: DFS(0) visits 0, 1
  All vertices visited
Output: 0

CASE 3: Two vertices (disconnected)
Input: V = 2, adj = [[], []]
Process:
  First pass: lastV = 0
  Second pass: DFS(0) visits only 0
  Vertex 1 not visited
Output: -1

CASE 4: Cycle (all reachable)
Input: V = 3, adj = [[1], [2], [0]]
Process:
  First pass: lastV = 0
  Second pass: DFS(0) visits 0, 1, 2
  All vertices visited
Output: 0

CASE 5: Multiple mother vertices
Input: V = 3, adj = [[1, 2], [], []]
Process:
  First pass: lastV = 0
  Second pass: DFS(0) visits 0, 1, 2
  All vertices visited
Output: 0 (minimum value returned)

🎯 ALGORITHM CORRECTNESS:
- Finds mother vertex if exists: ✓
- Returns -1 if doesn't exist: ✓
- Handles disconnected graphs: ✓
- Handles cycles: ✓
- Returns minimum value: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 81: Initialize visited array
- Line 82: Track last finished vertex
- Line 87-92: First DFS pass (find candidate)
- Line 96-97: Reset and second DFS pass (verify)
- Line 101-104: Validate all vertices visited
- Line 107: Return mother vertex
- Line 110-118: DFS helper function

🎯 FINISH TIME PROPERTY:

WHY LAST FINISHED VERTEX?

DFS Finish Time Ordering:
- If u can reach v, then finish[u] > finish[v]
- If u is mother vertex, u can reach all vertices
- Therefore, finish[u] > finish[v] for all v
- Therefore, u finishes last

Proof intuition:
- Mother vertex starts DFS first (or early)
- All other vertices are descendants
- Descendants finish before ancestors
- Mother vertex finishes last

─────────────────────────────────────────

🎯 VERIFICATION NECESSITY:

WHY SECOND PASS?

Counterexample:
- Graph: 0 → 1, 2 → 3 (disconnected)
- First pass: lastV = 2
- But 2 cannot reach 0 or 1
- Second pass detects this
- Returns -1 correctly

Without verification:
- Would incorrectly return 2
- Second pass ensures correctness
- Critical for disconnected graphs

─────────────────────────────────────────

🎯 MOTHER VERTEX vs SOURCE VERTEX:

MOTHER VERTEX:
- Can reach all vertices
- DFS from mother visits all
- May not be reachable from others
- This problem

SOURCE VERTEX:
- All vertices can reach it
- Reverse property
- Different problem

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(V + E) time complexity
- Simple two-pass DFS
- Easy to understand
- Handles all cases correctly
- Optimal algorithm

🎯 DISADVANTAGES:
- Requires two DFS passes
- Doesn't find all mother vertices (returns minimum)
- Stack overflow for deep graphs
- Only works for directed graphs

🎯 REAL-WORLD APPLICATIONS:
- Network routing (central node)
- Dependency resolution (root dependency)
- Social networks (influencer detection)
- Task scheduling (master task)
- System architecture (central controller)

🎯 RELATED PROBLEMS:
- Find all mother vertices
- Find source vertex (reverse problem)
- Strongly Connected Components
- Kosaraju's algorithm (uses finish times)
- Topological sorting

🎯 TESTING STRATEGY:
- Single vertex
- Linear chains
- Cycles
- Disconnected graphs
- Multiple mother vertices
- Complex graphs

🎯 DEBUGGING TIPS:
- Print visited array after first pass
- Print lastV value
- Trace second DFS pass
- Verify all vertices visited
- Check disconnected components

🎯 COMMON MISTAKES:
- Not resetting visited in second pass
- Wrong lastV update logic
- Not handling disconnected graphs
- Missing validation check
- Incorrect DFS implementation

🎯 BEST PRACTICES:
- Always verify candidate
- Reset visited array between passes
- Handle disconnected graphs
- Use clear variable names
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain finish time property
- Describe two-pass approach
- Walk through example
- Discuss edge cases
- Analyze complexity
- Mention SCC relationship

🎯 SCC RELATIONSHIP:

MOTHER VERTEX AND SCCS:

If graph has Strongly Connected Components:
- Mother vertex must be in source SCC
- Source SCC: no incoming edges from other SCCs
- All other SCCs reachable from source SCC
- Kosaraju's algorithm uses similar idea

Example:
- SCC1: {0, 1, 2} (source)
- SCC2: {3}
- SCC3: {4}
- Mother vertex: 0 (in source SCC)

─────────────────────────────────────────

🎯 MULTIPLE MOTHER VERTICES:

IF MULTIPLE EXIST:

If multiple mother vertices exist:
- All are in same SCC (source SCC)
- Algorithm returns minimum value
- First pass finds last finished (minimum)
- Verification confirms

Example:
- Graph: 0 → 1, 0 → 2, 1 → 2
- Both 0 and 1 can reach all
- Algorithm returns 0 (minimum)

─────────────────────────────────────────

🎯 COMPARISON WITH ALTERNATIVES:

NAIVE APPROACH:
- Try DFS from each vertex
- Time: O(V * (V + E))
- Less efficient

TWO-PASS DFS:
- Find candidate, then verify
- Time: O(V + E)
- More efficient
- This algorithm

─────────────────────────────────────────

🎯 CONCLUSION:
Finding a mother vertex in a directed graph is efficiently achieved using a two-pass DFS
algorithm. The first pass finds the last finished vertex (based on DFS finish times), which
is the candidate mother vertex. The second pass verifies if this candidate can reach all
vertices. If yes, it's the mother vertex; otherwise, no mother vertex exists. This achieves
O(V + E) time complexity and O(V) space complexity, making it optimal for finding mother
vertices in directed graphs!
*/