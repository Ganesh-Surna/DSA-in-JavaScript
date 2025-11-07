/* Problem: ✅✅✅✅ Level of Node in Undirected Acyclic Graph ✅✅✅✅

Given an integer x and an undirected acyclic graph with v nodes, labeled from 0 to v-1,
and e edges, return the level of node labeled as x.

Level Definition:
- Level is the minimum number of edges you must travel from node 0 to reach the target node x
- Node 0 is at level 0
- Nodes directly connected to 0 are at level 1
- Nodes reachable in k edges from 0 are at level k

Key Requirements:
- Find the level of node x starting from node 0
- Graph is undirected and acyclic (tree structure)
- If node x doesn't exist or is unreachable, return -1
- Use BFS or DFS to traverse and track levels

You are given an adjacency list representation of an undirected acyclic graph and a target
node x. Return the level of node x (minimum edges from node 0).

Example 1:
Input: adj = [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]], x = 4

Graph structure:
    0
   / \
  1   2
 /|    \
3 4     5

Levels:
- Level 0: {0}
- Level 1: {1, 2}
- Level 2: {3, 4, 5}

Output: 2
Explanation:
- Node 4 is at level 2 (0 → 1 → 4, 2 edges)

Example 2:
Input: adj = [[1], [0, 2], [1, 3], [2]], x = 3

Graph structure:
0 → 1 → 2 → 3

Levels:
- Level 0: {0}
- Level 1: {1}
- Level 2: {2}
- Level 3: {3}

Output: 3
Explanation:
- Node 3 is at level 3 (0 → 1 → 2 → 3, 3 edges)

Example 3:
Input: adj = [[1, 2], [0], [0]], x = 0

Graph structure:
  0
 / \
1   2

Output: 0
Explanation:
- Node 0 is at level 0 (starting node)

Constraints:
- 2 ≤ v ≤ 10^4
- 1 ≤ e ≤ 10^4
- 0 ≤ adj[i][j] < v
- 1 ≤ x < v (x cannot be 0, or can be 0?)
- Graph is undirected and acyclic (tree)
- No multiple edges or self loops

Expected Complexities:
Time Complexity: O(V + E) - single traversal
Auxiliary Space: O(V) - for visited array and recursion stack/queue
*/

// 1. DFS Based - Recursive Approach
// ✅ TC = O(V + E) - single DFS traversal
// ✅ SC = O(V) - visited array and recursion stack
function nodeLevel(adj, X) {
    let V = adj.length; // Number of vertices
    let visited = new Array(V).fill(false); // Track visited vertices
    let res = -1; // Result: level of node X (default -1 if not found)
    
    // Start DFS from node 0 with level 0
    dfs(0, 0);
    return res;
    
    
    // Helper function to perform DFS and track level
    function dfs(u, level){
        visited[u] = true; // Mark current vertex as visited
        
        // If current vertex is target X, store its level
        if(u === X){
            res = level;
            return;
        }
        
        // Explore all neighbors
        for(let v of adj[u]){
            // If neighbor is unvisited, recursively explore with level+1
            if(!visited[v]){
                dfs(v, level + 1); // Increment level for child
            }
        }
    }
}

// 2. BFS Based - Iterative Approach (More Natural for Level Finding)
// ✅ TC = O(V + E) - single BFS traversal
// ✅ SC = O(V) - visited array and queue
function nodeLevel_BFS(adj, X) {
    let V = adj.length; // Number of vertices
    let visited = new Array(V).fill(false); // Track visited vertices
    
    // BFS queue: store [vertex, level] pairs
    let queue = [];
    queue.push([0, 0]); // Start from node 0 at level 0
    visited[0] = true;
    
    // BFS traversal
    while(queue.length > 0){
        let [u, level] = queue.shift();
        
        // If current vertex is target X, return its level
        if(u === X){
            return level;
        }
        
        // Explore all neighbors
        for(let v of adj[u]){
            // If neighbor is unvisited, add to queue with level+1
            if(!visited[v]){
                visited[v] = true;
                queue.push([v, level + 1]); // Increment level for child
            }
        }
    }
    
    return -1; // Node X not found
}

// Test cases
let adj1 = [
    [1, 2],    // 0 connected to 1,2
    [0, 3, 4], // 1 connected to 0,3,4
    [0, 5],    // 2 connected to 0,5
    [1],       // 3 connected to 1
    [1],       // 4 connected to 1
    [2]        // 5 connected to 2
];
console.log("Test 1 (DFS):", nodeLevel(adj1, 4)); // 2
console.log("Test 1 (BFS):", nodeLevel_BFS(adj1, 4)); // 2

let adj2 = [
    [1],       // 0 connected to 1
    [0, 2],    // 1 connected to 0,2
    [1, 3],    // 2 connected to 1,3
    [2]        // 3 connected to 2
];
console.log("Test 2 (DFS):", nodeLevel(adj2, 3)); // 3
console.log("Test 2 (BFS):", nodeLevel_BFS(adj2, 3)); // 3

let adj3 = [
    [1, 2],    // 0 connected to 1,2
    [0],       // 1 connected to 0
    [0]        // 2 connected to 0
];
console.log("Test 3 (DFS):", nodeLevel(adj3, 0)); // 0
console.log("Test 3 (BFS):", nodeLevel_BFS(adj3, 0)); // 0

let adj4 = [
    [1, 2],    // 0 connected to 1,2
    [0, 3],    // 1 connected to 0,3
    [0, 4],    // 2 connected to 0,4
    [1],       // 3 connected to 1
    [2, 5],    // 4 connected to 2,5
    [4]        // 5 connected to 4
];
console.log("Test 4 (DFS):", nodeLevel(adj4, 5)); // 3
console.log("Test 4 (BFS):", nodeLevel_BFS(adj4, 5)); // 3

/*🎯 CORE IDEA: Use graph traversal (BFS or DFS) to find the level of a target node x
starting from node 0. Level represents the minimum number of edges from node 0 to node x.
Node 0 is at level 0, its direct neighbors are at level 1, and so on. Since the graph is
acyclic (tree), there's exactly one path from 0 to any node, making level well-defined.
BFS naturally processes nodes level by level, while DFS tracks level through recursion depth.

📋 STEP-BY-STEP FLOW (DFS):

1️⃣ INITIALIZATION:
   - Create visited array
   - Initialize result to -1
   - Start DFS from node 0 at level 0

2️⃣ DFS TRAVERSAL:
   - Mark current vertex as visited
   - If current vertex is target X:
     - Store level in result
     - Return (early termination)
   - For each unvisited neighbor:
     - Recursively call DFS with level+1

3️⃣ RESULT:
   - Return stored level (or -1 if not found)

📋 STEP-BY-STEP FLOW (BFS):

1️⃣ INITIALIZATION:
   - Create visited array
   - Initialize queue with [0, 0] (node 0 at level 0)
   - Mark node 0 as visited

2️⃣ BFS TRAVERSAL:
   - Dequeue vertex and its level
   - If vertex is target X:
     - Return level immediately
   - For each unvisited neighbor:
     - Enqueue [neighbor, level+1]
     - Mark neighbor as visited

3️⃣ RESULT:
   - Return level if found, -1 otherwise

🧠 WHY THIS APPROACH?
- Level = minimum edges from source
- BFS naturally processes by level
- DFS works for acyclic graphs
- O(V + E) time complexity
- Simple level tracking

💡 KEY INSIGHTS:
- Level 0: starting node (0)
- Level k: nodes k edges away from 0
- Acyclic graph: unique path from 0 to any node
- BFS processes level by level (more natural)
- DFS tracks level through recursion depth
- Early termination when target found
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Find Level Using DFS

INPUT: adj = [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]], X = 4

Graph structure:
    0
   / \
  1   2
 /|\   \
3 4 5   5

EXPECTED OUTPUT: 2

🎯 GOAL: Find level of node 4 (minimum edges from node 0)!

🔍 STEP-BY-STEP DFS PROCESS:

INITIALIZATION:
visited = [false, false, false, false, false, false]
res = -1

DFS(0, 0):
  visited[0] = true
  visited = [true, false, false, false, false, false]
  
  Check: 0 === 4? No
  Explore neighbors: [1, 2]
  
  DFS(1, 1):
    visited[1] = true
    visited = [true, true, false, false, false, false]
    
    Check: 1 === 4? No
    Explore neighbors: [0, 3, 4]
    
    DFS(0, 2):
      visited[0]? Yes → Skip (already visited)
    
    DFS(3, 2):
      visited[3] = true
      visited = [true, true, false, true, false, false]
      
      Check: 3 === 4? No
      Explore neighbors: [1]
      visited[1]? Yes → Skip
      DFS(3, 2) returns
    
    DFS(4, 2):
      visited[4] = true
      visited = [true, true, false, true, true, false]
      
      Check: 4 === 4? Yes! ✓
      res = 2
      return (early termination)
    
    DFS(1, 1) returns (target found)
  
  DFS(0, 0) returns (target found)

🏆 FINAL RESULT: 2
Node 4 is at level 2 (0 → 1 → 4, 2 edges)

─────────────────────────────────────────

📊 EXAMPLE 1: Find Level Using BFS

INPUT: adj = [[1, 2], [0, 3, 4], [0, 5], [1], [1], [2]], X = 4

EXPECTED OUTPUT: 2

🔍 STEP-BY-STEP BFS PROCESS:

INITIALIZATION:
visited = [false, false, false, false, false, false]
queue = [[0, 0]]
visited[0] = true

BFS ITERATION:

Level 0:
  Dequeue: [0, 0]
  Check: 0 === 4? No
  Explore neighbors: [1, 2]
  Enqueue: [1, 1], [2, 1]
  queue = [[1, 1], [2, 1]]
  visited[1] = true, visited[2] = true

Level 1:
  Dequeue: [1, 1]
  Check: 1 === 4? No
  Explore neighbors: [0, 3, 4]
  - 0: visited → Skip
  - 3: unvisited → Enqueue [3, 2]
  - 4: unvisited → Enqueue [4, 2]
  queue = [[2, 1], [3, 2], [4, 2]]
  visited[3] = true, visited[4] = true

  Dequeue: [2, 1]
  Check: 2 === 4? No
  Explore neighbors: [0, 5]
  - 0: visited → Skip
  - 5: unvisited → Enqueue [5, 2]
  queue = [[3, 2], [4, 2], [5, 2]]
  visited[5] = true

Level 2:
  Dequeue: [3, 2]
  Check: 3 === 4? No
  Explore neighbors: [1]
  - 1: visited → Skip

  Dequeue: [4, 2]
  Check: 4 === 4? Yes! ✓
  Return 2 immediately

🏆 FINAL RESULT: 2
Node 4 is at level 2

─────────────────────────────────────────

📊 EXAMPLE 2: Linear Graph

INPUT: adj = [[1], [0, 2], [1, 3], [2]], X = 3

Graph structure:
0 → 1 → 2 → 3

EXPECTED OUTPUT: 3

BFS PROCESS:

Level 0: queue = [[0, 0]]
  Dequeue: [0, 0], X? No
  Enqueue: [1, 1]

Level 1: queue = [[1, 1]]
  Dequeue: [1, 1], X? No
  Enqueue: [2, 2]

Level 2: queue = [[2, 2]]
  Dequeue: [2, 2], X? No
  Enqueue: [3, 3]

Level 3: queue = [[3, 3]]
  Dequeue: [3, 3], X? Yes!
  Return 3

🏆 FINAL RESULT: 3
Node 3 is at level 3 (0 → 1 → 2 → 3, 3 edges)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

LEVEL STRUCTURE:

Graph:
    0
   / \
  1   2
 /|\   \
3 4 5   5

Levels:
Level 0: {0}
Level 1: {1, 2}
Level 2: {3, 4, 5}

Level represents distance from node 0:
- Level 0: 0 edges (starting node)
- Level 1: 1 edge away
- Level 2: 2 edges away

─────────────────────────────────────────

📊 BFS LEVEL-BY-LEVEL PROCESSING:

BFS naturally processes nodes by level:

Queue contents:
Level 0: [0]
Level 1: [1, 2]
Level 2: [3, 4, 5]

BFS processes all nodes at level k before level k+1.
This makes BFS ideal for level finding!

─────────────────────────────────────────

📊 DFS vs BFS FOR LEVEL FINDING:

BFS APPROACH:
- Processes nodes level by level
- Natural for level finding
- First encounter = minimum level
- More intuitive

DFS APPROACH:
- Explores depth first
- Must track level through recursion
- Works for acyclic graphs
- Early termination possible

For acyclic graphs:
- Both approaches work
- BFS more natural
- DFS simpler implementation

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Single traversal: O(V + E)
- Each vertex visited once
- Each edge processed once
- Total: O(V + E)

SPACE COMPLEXITY:
- visited array: O(V)
- BFS queue / DFS stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ LEVEL DEFINITION:
   - Level = minimum edges from source
   - Node 0 at level 0
   - Direct neighbors at level 1
   - Well-defined for acyclic graphs

2️⃣ BFS NATURAL FIT:
   - Processes level by level
   - First encounter = minimum level
   - Perfect for level finding
   - Guaranteed correctness

3️⃣ DFS APPROACH:
   - Tracks level through recursion
   - Works for acyclic graphs
   - Early termination when found
   - Simpler implementation

4️⃣ ACYCLIC GRAPH:
   - Unique path from 0 to any node
   - Level is well-defined
   - No ambiguity
   - Both approaches correct

5️⃣ CORRECTNESS:
   - Finds level if node exists
   - Returns -1 if not found
   - Handles all cases
   - Optimal complexity

💡 KEY INSIGHT:
Finding the level of a node in an undirected acyclic graph by using BFS or DFS to
traverse from node 0, tracking the level (distance) as we explore. BFS naturally
processes nodes level by level, making it ideal for this problem. DFS works by
tracking level through recursion depth. Since the graph is acyclic, there's exactly
one path from 0 to any node, ensuring level is well-defined. This achieves O(V + E)
time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Graph traversal: O(V + E)
- Each vertex visited once
- Each edge processed once
- Total: O(V + E)
- Optimal for graph traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- visited array: O(V)
- BFS queue: O(V) worst case
- DFS recursion stack: O(V) worst case
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Target is source
Input: adj = [[1, 2], [0], [0]], X = 0
Process: Check immediately, level 0
Output: 0

CASE 2: Target is direct neighbor
Input: adj = [[1], [0]], X = 1
Process: BFS finds at level 1
Output: 1

CASE 3: Target is unreachable (shouldn't happen in acyclic connected graph)
Input: Disconnected graph, X in different component
Process: Never found, returns -1
Output: -1

CASE 4: Large graph
Input: Linear chain of 100 nodes, X = 99
Process: BFS finds at level 99
Output: 99

CASE 5: Star graph
Input: adj = [[1,2,3,4], [0], [0], [0], [0]], X = 4
Process: All neighbors at level 1
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Finds level if node exists: ✓
- Returns -1 if not found: ✓
- Correct level calculation: ✓
- Handles all edge cases: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 88-92: Initialize and start DFS
- Line 97-113: DFS helper function
- Line 125-147: BFS implementation
- Level tracking in both approaches
- Early termination when target found

🎯 LEVEL TRACKING:

DFS LEVEL TRACKING:
- Pass level as parameter
- Increment level for each child
- Store level when target found
- Simple recursive approach

BFS LEVEL TRACKING:
- Store [vertex, level] in queue
- Increment level when enqueuing
- Return level when target found
- Natural level-by-level processing

─────────────────────────────────────────

🎯 WHY ACYCLIC GRAPH MATTERS:

UNIQUE PATH:
- Acyclic graph = tree (if connected)
- Exactly one path from 0 to any node
- Level is well-defined
- No ambiguity

If graph had cycles:
- Multiple paths possible
- Different path lengths
- Level would be minimum
- Still solvable with BFS

─────────────────────────────────────────

🎯 BFS ADVANTAGE FOR LEVELS:

LEVEL-BY-LEVEL PROCESSING:

BFS processes:
Level 0: All nodes 0 edges away
Level 1: All nodes 1 edge away
Level 2: All nodes 2 edges away
...

This natural ordering makes BFS ideal for:
- Level finding
- Shortest path (unweighted)
- Level-order traversal
- Distance calculation

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(V + E) time complexity
- Simple BFS/DFS implementation
- Natural level tracking
- Early termination possible
- Both approaches available

🎯 DISADVANTAGES:
- O(V) space for visited array
- BFS queue may be large
- DFS recursion stack may overflow
- Assumes acyclic graph
- Only finds level, not path

🎯 REAL-WORLD APPLICATIONS:
- Tree level calculation
- Hierarchy depth finding
- Network hop count
- Organizational levels
- Game level progression

🎯 RELATED PROBLEMS:
- Shortest path in unweighted graph
- Level order traversal
- Distance from root
- Binary tree level order
- Graph diameter

🎯 TESTING STRATEGY:
- Target is source
- Target is neighbor
- Target at different levels
- Large graphs
- Star graphs

🎯 DEBUGGING TIPS:
- Print level at each step
- Trace BFS/DFS traversal
- Verify level calculation
- Check visited array
- Monitor queue/stack size

🎯 COMMON MISTAKES:
- Not incrementing level
- Wrong initial level
- Not checking target early
- Forgetting visited check
- Off-by-one errors

🎯 BEST PRACTICES:
- Start from level 0
- Increment level for children
- Check target early
- Handle edge cases
- Use clear variable names

🎯 INTERVIEW TIPS:
- Explain level concept
- Describe BFS/DFS approach
- Walk through example
- Discuss time/space complexity
- Compare BFS vs DFS

🎯 BFS vs DFS COMPARISON:

BFS:
- Natural level processing
- Level-by-level order
- More intuitive
- Better for level finding
- Uses queue

DFS:
- Depth-first exploration
- Tracks level recursively
- Simpler implementation
- Works for acyclic graphs
- Uses recursion

Choice:
- Level finding: BFS preferred
- Simple implementation: DFS
- Memory constraint: Consider DFS
- Large graphs: BFS (avoid stack overflow)

─────────────────────────────────────────

🎯 LEVEL CONCEPT:

WHAT IS LEVEL?

Level = Minimum number of edges from source (node 0)

Examples:
- Level 0: Node 0 itself
- Level 1: Nodes directly connected to 0
- Level 2: Nodes 2 edges away from 0
- Level k: Nodes k edges away from 0

In tree/acyclic graph:
- Exactly one path from 0 to any node
- Level = path length
- Well-defined and unique

─────────────────────────────────────────

🎯 CONCLUSION:
Finding the level of a node in an undirected acyclic graph is efficiently achieved
using BFS or DFS to traverse from node 0, tracking the level (minimum edges) as we
explore. BFS naturally processes nodes level by level, making it ideal for this problem.
DFS works by tracking level through recursion depth. Since the graph is acyclic, there's
exactly one path from 0 to any node, ensuring level is well-defined. This achieves
O(V + E) time complexity and O(V) space complexity, making it optimal for level finding!
*/
