/* Problem: ✅✅✅✅ Find Whether Path Exists in Grid ✅✅✅✅

Given a grid of size n*n filled with 0, 1, 2, 3. Check whether there is a path
possible from the source to destination. You can traverse up, down, right and left
(4 directions only).

Cell Values:
- 0: Wall (blocked cell, cannot traverse)
- 1: Source (starting point)
- 2: Destination (target point)
- 3: Blank cell (can traverse)

Key Requirements:
- Find source cell (value 1)
- Find destination cell (value 2)
- Check if path exists from source to destination
- Can only traverse blank cells (3) and destination (2)
- Cannot traverse walls (0)
- Movement only in 4 directions (up, down, left, right)
- Single source and single destination guaranteed

You are given an n*n grid. Return 1 if path exists, 0 otherwise.

Example 1:
Input: grid = [[3,0,3,0,0],
               [3,0,0,0,3],
               [3,3,3,3,3],
               [0,2,3,0,0],
               [3,0,0,1,3]]

Grid visualization:
  3 0 3 0 0
  3 0 0 0 3
  3 3 3 3 3
  0 2 3 0 0
  3 0 0 1 3

Source: (4,3) - value 1
Destination: (3,1) - value 2

Output: 0 (false)
Explanation:
- Source at (4,3), destination at (3,1)
- No path exists (walls block the path)
- Cannot reach destination from source

Example 2:
Input: grid = [[1,3],
               [3,2]]

Grid visualization:
  1 3
  3 2

Source: (0,0) - value 1
Destination: (1,1) - value 2

Output: 1 (true)
Explanation:
- Source at (0,0), destination at (1,1)
- Path: (0,0) → (0,1) → (1,1)
- Path exists!

Constraints:
- 1 ≤ n ≤ 500
- Grid contains exactly one source (1) and one destination (2)
- Cell values: {0, 1, 2, 3}

Expected Complexities:
Time Complexity: O(n²) - visit each cell at most once
Auxiliary Space: O(n²) - for visited array and traversal data structure (queue/stack)
*/


// 1. BFS Based - Iterative Approach
// ✅ TC = O(n²) - visit each cell at most once
// ✅ SC = O(n²) - visited array and queue
function is_Possible_BFS(grid) {
    let n = grid.length; // Grid size (n*n)
    
    // 2D visited array to track visited cells
    let visited = new Array(n);
    for(let i = 0; i < n; i++){
        visited[i] = new Array(n).fill(false);
    }
    
    // 4 directions: up, down, left, right
    let directions = [
        [0, -1],  // left
        [-1, 0],  // up
        [1, 0],   // down
        [0, 1]    // right
    ];
    
    // Find source cell (value 1)
    let source = null;
    for(let i = 0; i < n; i++){
        for(let j = 0; j < n; j++){
            if(grid[i][j] === 1){
                source = [i, j];
                break; // break inner loop when source found
            }
        }
        if(source) break; // break outer loop if source found
    }
    
    // If no source found, return false
    if(!source) return false;
    
    // Initialize BFS queue
    let q = [];
    let [sr, sc] = source;
    q.push(source);
    visited[sr][sc] = true;
    
    // BFS traversal
    while(q.length > 0){
        let [r, c] = q.shift();
        
        // Check if current cell is destination
        if(grid[r][c] === 2) return true; // Destination found
        
        // Explore all 4 neighbors
        for(let [dr, dc] of directions){
            let nr = r + dr;
            let nc = c + dc;
            
            // Check if neighbor is valid, unvisited, and traversable (3 or 2)
            if(nr >= 0 && nr < n && nc >= 0 && nc < n && 
               !visited[nr][nc] && 
               (grid[nr][nc] === 3 || grid[nr][nc] === 2)){
                q.push([nr, nc]);
                visited[nr][nc] = true;
            }
        }
    }
    
    return false; // Destination not reachable
}



// 2. DFS Based - Recursive Approach
// ✅ TC = O(n²) - visit each cell at most once
// ✅ SC = O(n²) - visited array and recursion stack
function is_Possible_DFS(grid) {
    const n = grid.length; // Grid size (n*n)

    // 2D visited array to track visited cells
    let visited = new Array(n);
    for(let i = 0; i < n; i++){
        visited[i] = new Array(n).fill(false);
    }

    // 4 directions: up, down, left, right
    const directions = [
        [-1, 0],  // up
        [1, 0],   // down
        [0, 1],   // right
        [0, -1]   // left
    ];

    // Find the source cell (value 1)
    let source = null;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                source = [i, j];
                break;
            }
        }
        if (source) break;
    }

    // If no source found, return 0
    if (!source) return 0;
    
    // Start DFS from source
    return dfs(source[0], source[1]) ? 1 : 0;
    
    
    // Helper function to perform DFS
    function dfs(r, c) {
        // Check if current cell is destination
        if (grid[r][c] === 2) return true; // Destination found
        
        visited[r][c] = true; // Mark current cell as visited

        // Explore all 4 neighbors
        for (let [dr, dc] of directions) {
            const nr = r + dr;
            const nc = c + dc;

            // Check if neighbor is valid, unvisited, and traversable (3 or 2)
            if (
                nr >= 0 && nr < n &&
                nc >= 0 && nc < n &&
                !visited[nr][nc] &&
                (grid[nr][nc] === 2 || grid[nr][nc] === 3)
            ) {
                // Recursively explore neighbor
                if (dfs(nr, nc)) return true;
            }
        }
        return false; // No path found from this cell
    }
}

// Test cases
let grid1 = [
    [3, 0, 3, 0, 0],
    [3, 0, 0, 0, 3],
    [3, 3, 3, 3, 3],
    [0, 2, 3, 0, 0],
    [3, 0, 0, 1, 3]
];
console.log("Test 1 (BFS):", is_Possible_BFS(grid1)); // false (no path)
console.log("Test 1 (DFS):", is_Possible_DFS(grid1)); // 0 (no path)

let grid2 = [
    [1, 3],
    [3, 2]
];
console.log("Test 2 (BFS):", is_Possible_BFS(grid2)); // true (path exists)
console.log("Test 2 (DFS):", is_Possible_DFS(grid2)); // 1 (path exists)

let grid3 = [
    [1, 3, 3],
    [3, 0, 3],
    [3, 3, 2]
];
console.log("Test 3 (BFS):", is_Possible_BFS(grid3)); // true (path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2))
console.log("Test 3 (DFS):", is_Possible_DFS(grid3)); // 1

let grid4 = [
    [1, 0, 3],
    [0, 0, 3],
    [3, 3, 2]
];
console.log("Test 4 (BFS):", is_Possible_BFS(grid4)); // true (path: (0,0)→(0,2)→(1,2)→(2,2))
console.log("Test 4 (DFS):", is_Possible_DFS(grid4)); // 1

/*🎯 CORE IDEA: Use graph traversal (BFS or DFS) to find if a path exists from source
to destination in a grid. Treat the grid as a graph where each cell is a vertex, and
edges connect adjacent cells in 4 directions. Source (1) and destination (2) are
special vertices. Can only traverse blank cells (3) and destination (2), cannot
traverse walls (0). If destination is reachable from source via BFS/DFS, path exists.

📋 STEP-BY-STEP FLOW (BFS):

1️⃣ INITIALIZATION:
   - Create visited array
   - Define 4 directions
   - Find source cell (value 1)

2️⃣ BFS SETUP:
   - Initialize queue with source
   - Mark source as visited

3️⃣ BFS TRAVERSAL:
   - Dequeue cell
   - Check if destination (2)
   - Explore neighbors (3 or 2)
   - Enqueue valid neighbors

4️⃣ RESULT:
   - Return true if destination found
   - Return false if queue empty

📋 STEP-BY-STEP FLOW (DFS):

1️⃣ INITIALIZATION:
   - Create visited array
   - Define 4 directions
   - Find source cell (value 1)

2️⃣ DFS TRAVERSAL:
   - Start DFS from source
   - Check if destination
   - Mark current as visited
   - Recursively explore neighbors

3️⃣ RESULT:
   - Return true if destination found
   - Return false if all paths exhausted

🧠 WHY THIS APPROACH?
- Grid as graph: cells as vertices, edges as adjacency
- BFS/DFS finds reachable vertices
- Destination reachable = path exists
- O(n²) time complexity
- Handles walls and obstacles

💡 KEY INSIGHTS:
- Source = starting vertex (value 1)
- Destination = target vertex (value 2)
- Can traverse: blank cells (3) and destination (2)
- Cannot traverse: walls (0)
- Path exists if destination reachable from source
- BFS finds shortest path, DFS finds any path
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Path Does Not Exist (BFS)

INPUT: grid = [[3,0,3,0,0],
               [3,0,0,0,3],
               [3,3,3,3,3],
               [0,2,3,0,0],
               [3,0,0,1,3]]

Grid:
  3 0 3 0 0
  3 0 0 0 3
  3 3 3 3 3
  0 2 3 0 0
  3 0 0 1 3

Source: (4,3) - value 1
Destination: (3,1) - value 2

EXPECTED OUTPUT: false

🔍 STEP-BY-STEP BFS PROCESS:

FIND SOURCE:
  Source found at (4,3)

INITIALIZE:
  queue = [(4,3)]
  visited[4][3] = true

BFS ITERATION:

Level 0:
  Dequeue: (4,3)
  Check: grid[4][3] = 1 (source, not destination)
  Explore neighbors:
    (4,2): 0 (wall) → Skip
    (4,4): 3 (blank) → Enqueue
    (3,3): 3 (blank) → Enqueue
    (5,3): Out of bounds → Skip
  queue = [(4,4), (3,3)]
  visited[4][4] = true, visited[3][3] = true

Level 1:
  Dequeue: (4,4)
  Check: grid[4][4] = 3 (not destination)
  Explore neighbors:
    (4,3): visited → Skip
    (4,5): Out of bounds → Skip
    (3,4): 0 (wall) → Skip
    (5,4): Out of bounds → Skip
  queue = [(3,3)]

  Dequeue: (3,3)
  Check: grid[3][3] = 3 (not destination)
  Explore neighbors:
    (3,2): 0 (wall) → Skip
    (3,4): 0 (wall) → Skip
    (2,3): 3 (blank) → Enqueue
    (4,3): visited → Skip
  queue = [(2,3)]
  visited[2][3] = true

Level 2:
  Dequeue: (2,3)
  Check: grid[2][3] = 3 (not destination)
  Explore neighbors:
    (2,2): 3 (blank) → Enqueue
    (2,4): 3 (blank) → Enqueue
    (1,3): 0 (wall) → Skip
    (3,3): visited → Skip
  queue = [(2,2), (2,4)]
  visited[2][2] = true, visited[2][4] = true

... Continue until queue empty ...

All reachable cells explored, destination (3,1) never reached!

🏆 FINAL RESULT: false
No path exists from source to destination

─────────────────────────────────────────

📊 EXAMPLE 2: Path Exists (BFS)

INPUT: grid = [[1,3],
               [3,2]]

Grid:
  1 3
  3 2

Source: (0,0) - value 1
Destination: (1,1) - value 2

EXPECTED OUTPUT: true

PROCESS:

FIND SOURCE:
  Source found at (0,0)

INITIALIZE:
  queue = [(0,0)]
  visited[0][0] = true

BFS ITERATION:

Level 0:
  Dequeue: (0,0)
  Check: grid[0][0] = 1 (source, not destination)
  Explore neighbors:
    (0,-1): Out of bounds → Skip
    (0,1): 3 (blank) → Enqueue
    (-1,0): Out of bounds → Skip
    (1,0): 3 (blank) → Enqueue
  queue = [(0,1), (1,0)]
  visited[0][1] = true, visited[1][0] = true

Level 1:
  Dequeue: (0,1)
  Check: grid[0][1] = 3 (not destination)
  Explore neighbors:
    (0,0): visited → Skip
    (0,2): Out of bounds → Skip
    (-1,1): Out of bounds → Skip
    (1,1): 2 (destination) → Enqueue
  queue = [(1,0), (1,1)]
  visited[1][1] = true

  Dequeue: (1,0)
  Check: grid[1][0] = 3 (not destination)
  Explore neighbors:
    (1,-1): Out of bounds → Skip
    (1,1): visited → Skip
    (0,0): visited → Skip
    (2,0): Out of bounds → Skip

Level 2:
  Dequeue: (1,1)
  Check: grid[1][1] = 2 (destination found!)
  Return true immediately

🏆 FINAL RESULT: true
Path exists: (0,0) → (0,1) → (1,1)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

GRID AS GRAPH:

Cells as vertices:
  (0,0)  (0,1)  (0,2)
  (1,0)  (1,1)  (1,2)
  (2,0)  (2,1)  (2,2)

Edges connect adjacent cells (4 directions):
  (0,0) → (0,1), (1,0)
  (1,1) → (0,1), (1,0), (1,2), (2,1)

Path finding:
  Source (1) → Traverse (3) → Destination (2)
  Cannot traverse walls (0)

─────────────────────────────────────────

📊 BFS vs DFS:

BFS APPROACH:
- Uses queue (iterative)
- Explores level by level
- Finds shortest path
- Better for shortest path problems
- More memory (queue size)

DFS APPROACH:
- Uses recursion (recursive)
- Explores depth first
- Finds any path
- Less memory (recursion stack)
- May be slower for some cases

Both approaches:
- O(n²) time complexity
- O(n²) space complexity
- Correct path detection
- Handle walls and obstacles

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Grid traversal: O(n²)
- Each cell visited at most once: O(n²)
- Total: O(n²)

SPACE COMPLEXITY:
- visited array: O(n²)
- BFS queue / DFS stack: O(n²) worst case
- Total: O(n²)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GRID AS GRAPH:
   - Cells are vertices
   - Adjacency in 4 directions
   - Standard graph problem
   - BFS/DFS applicable

2️⃣ SOURCE FINDING:
   - Linear search for value 1
   - O(n²) in worst case
   - Single source guaranteed

3️⃣ PATH DETECTION:
   - BFS/DFS finds reachable vertices
   - Destination reachable = path exists
   - Visited array prevents cycles
   - Correct termination conditions

4️⃣ WALL HANDLING:
   - Walls (0) not traversable
   - Only blank (3) and destination (2) traversable
   - Correctly blocked paths
   - Natural obstacle handling

5️⃣ CORRECTNESS:
   - Finds path if exists
   - Returns false if no path
   - Handles all edge cases
   - Optimal complexity

💡 KEY INSIGHT:
Finding path existence by treating grid as graph where cells are vertices and edges
connect adjacent cells in 4 directions. Using BFS/DFS to check if destination is
reachable from source, traversing only blank cells (3) and destination (2), avoiding
walls (0). This achieves O(n²) time and space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Source finding: O(n²) worst case
- BFS/DFS traversal: O(n²) worst case
- Each cell visited at most once
- Total: O(n²)
- Optimal for grid traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- visited array: O(n²)
- BFS queue: O(n²) worst case
- DFS recursion stack: O(n²) worst case
- Total: O(n²)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: Source is destination
Input: [[1]]
Process: Check source immediately, it's destination
Output: true (path exists)

CASE 2: Adjacent source and destination
Input: [[1, 2]]
Process: BFS finds destination in one step
Output: true

CASE 3: Source surrounded by walls
Input: [[0,0,0],[0,1,0],[0,0,2]]
Process: Source has no valid neighbors
Output: false

CASE 4: Destination surrounded by walls
Input: [[1,3,3],[3,0,3],[3,3,0],[0,2,0]]
Process: Cannot reach destination
Output: false

CASE 5: Large open path
Input: All 3's with source and destination
Process: BFS finds destination easily
Output: true

🎯 ALGORITHM CORRECTNESS:
- Finds path if exists: ✓
- Returns false if no path: ✓
- Handles walls correctly: ✓
- Handles edge cases: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 79-85: Initialize visited array
- Line 88-93: Define 4 directions
- Line 96-105: Find source cell
- Line 111-136: BFS traversal
- Line 150-205: DFS traversal

🎯 CELL VALUE HANDLING:

TRAVERSABLE CELLS:
- Value 3 (blank): Can traverse
- Value 2 (destination): Can traverse (and is target)

NON-TRAVERSABLE CELLS:
- Value 0 (wall): Cannot traverse
- Value 1 (source): Only starting point, not traversed after start

CHECKING NEIGHBORS:
- If grid[nr][nc] === 3: Traversable blank cell
- If grid[nr][nc] === 2: Traversable destination (found!)
- If grid[nr][nc] === 0: Wall, skip
- If grid[nr][nc] === 1: Source, already visited

─────────────────────────────────────────

🎯 BFS DETAILS:

BFS QUEUE OPERATIONS:

Initialization:
  queue = [source]
  visited[source] = true

Process:
  while queue not empty:
    current = dequeue()
    if current is destination: return true
    for each neighbor:
      if valid and traversable and unvisited:
        enqueue(neighbor)
        visited[neighbor] = true

Return:
  return false (destination not found)

─────────────────────────────────────────

🎯 DFS DETAILS:

DFS RECURSION:

Base case:
  if current is destination: return true

Recursive case:
  visited[current] = true
  for each neighbor:
    if valid and traversable and unvisited:
      if dfs(neighbor) returns true:
        return true
  return false

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(n²) time complexity
- Simple BFS/DFS implementation
- Handles walls and obstacles
- Correct path detection
- Both approaches available

🎯 DISADVANTAGES:
- O(n²) space for visited array
- BFS queue may be large
- DFS recursion stack may overflow
- Only checks existence, doesn't find path
- Doesn't find shortest path (in DFS)

🎯 REAL-WORLD APPLICATIONS:
- Maze solving (path finding)
- Game development (pathfinding)
- Robot navigation (obstacle avoidance)
- Network routing (connectivity)
- Image processing (region connectivity)

🎯 RELATED PROBLEMS:
- Shortest path in grid
- Number of paths in grid
- Unique paths
- Minimum path sum
- Word search

🎯 TESTING STRATEGY:
- Source is destination
- Adjacent cells
- Walls block path
- Large open grids
- Complex mazes

🎯 DEBUGGING TIPS:
- Print visited array
- Trace BFS/DFS steps
- Check source finding
- Verify cell value checks
- Monitor queue/stack size

🎯 COMMON MISTAKES:
- Not checking boundaries
- Wrong cell value checks
- Forgetting to mark visited
- Not handling source as destination
- Off-by-one errors

🎯 BEST PRACTICES:
- Always check boundaries
- Mark visited before enqueue
- Check destination early
- Handle edge cases
- Use clear variable names

🎯 INTERVIEW TIPS:
- Explain grid as graph
- Describe BFS/DFS approach
- Walk through example
- Discuss time/space complexity
- Compare BFS vs DFS

🎯 BFS vs DFS COMPARISON:

BFS:
- Finds shortest path
- Level-order traversal
- Uses queue
- More memory
- Better for shortest path

DFS:
- Finds any path
- Depth-first traversal
- Uses recursion
- Less memory
- Simpler implementation

Choice:
- Path existence: Either works
- Shortest path: Use BFS
- Memory constraint: Use DFS
- Large grids: Consider BFS (avoid stack overflow)

─────────────────────────────────────────

🎯 PATH FINDING ALGORITHMS:

BFS (Breadth-First Search):
- Explores level by level
- Finds shortest path
- Guaranteed optimal
- O(n²) time and space

DFS (Depth-First Search):
- Explores depth first
- Finds any path
- May not be shortest
- O(n²) time and space

A* (Advanced):
- Heuristic-based
- Finds optimal path
- More complex
- Better for large grids

For this problem:
- BFS or DFS sufficient
- Only need existence check
- Both optimal complexity

─────────────────────────────────────────

🎯 CONCLUSION:
Finding whether a path exists from source to destination in a grid is efficiently
achieved using BFS or DFS to check reachability. Treating the grid as a graph where
cells are vertices and edges connect adjacent cells in 4 directions, we can only
traverse blank cells (3) and destination (2), avoiding walls (0). If destination is
reachable from source, path exists. This achieves O(n²) time and space complexity,
making it optimal for path existence checking in grids!
*/