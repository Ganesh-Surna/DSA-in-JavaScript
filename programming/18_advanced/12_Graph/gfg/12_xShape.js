/* Problem: ✅✅✅✅ Count X Shapes in Grid ✅✅✅✅

Given a grid of n*m consisting of O's and X's. The task is to find the number of
total 'X' shapes (connected components of X's).

X Shape Definition:
- An 'X' shape consists of one or more adjacent X's
- Adjacency is defined in 4 directions only (up, down, left, right)
- Diagonals are NOT included (unlike 8-directional problems)
- Each connected component of X's forms one X shape

Key Requirements:
- Count the number of connected components of 'X' cells
- Adjacency in 4 directions only (no diagonals)
- X shapes are separated by 'O' cells or grid boundaries
- Use DFS or BFS to mark all connected X cells

You are given a 2D grid where each cell is either 'X' or 'O'.
Return the number of connected components of X's.

Example 1:
Input: grid = [['X','O','X'],
               ['O','X','O'],
               ['X','X','X']]

Grid visualization:
  X O X
  O X O
  X X X

Output: 3
Explanation:
X Shape 1: (0,0) - isolated X
X Shape 2: (1,1) - isolated X
X Shape 3: (2,0), (2,1), (2,2) - connected horizontally

Example 2:
Input: grid = [['X','X'],
               ['X','X']]

Grid visualization:
  X X
  X X

Output: 1
Explanation:
X Shape 1: All 4 X's are connected (all adjacent)
- (0,0) ↔ (0,1) ↔ (1,0) ↔ (1,1)

Example 3:
Input: grid = [['X','O','X','O'],
               ['O','X','O','X'],
               ['X','O','X','O']]

Grid visualization:
  X O X O
  O X O X
  X O X O

Output: 6
Explanation:
6 isolated X's, each forming its own shape

Constraints:
- 1 ≤ n, m ≤ 100
- grid[i][j] = {'X', 'O'}

Expected Complexities:
Time Complexity: O(n * m) - visit each cell once
Auxiliary Space: O(n * m) - for visited array and recursion stack
*/

// 1. DFS Based - Recursive Approach
// ✅ TC = O(n * m) - visit each cell once
// ✅ SC = O(n * m) - visited array and recursion stack
function xShape(grid) {
    let n = grid.length; // Number of rows
    let m = grid[0].length; // Number of columns
    
    // 2D visited array to track visited cells
    let visited = new Array(n);
    for(let i = 0; i < n; i++){
        visited[i] = new Array(m).fill(false);
    }
    
    // 4 directions: up, down, left, right (diagonals NOT included)
    let directions = [
        [-1, 0],  // up (row decreases)
        [1, 0],   // down (row increases)
        [0, -1],  // left (column decreases)
        [0, 1]    // right (column increases)
    ];
    
    let count = 0; // Count of X shapes (connected components)
    
    // Iterate through all cells
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            // If cell is unvisited X, start DFS to mark entire X shape
            if(!visited[i][j] && grid[i][j] === 'X'){
                count++; // Found a new X shape
                dfs(i, j); // Mark all connected X cells
            }
        }
    }
    return count;
    
    
    // Helper function to perform DFS and mark all connected X cells
    function dfs(r, c){
        visited[r][c] = true; // Mark current cell as visited
        
        // Check all 4 neighboring cells
        for(let [dr, dc] of directions){
            let nr = r + dr; // New row
            let nc = c + dc; // New column
            
            // Check if neighbor is valid, unvisited, and is X
            if(nr >= 0 && nr < n && nc >= 0 && nc < m && 
               !visited[nr][nc] && grid[nr][nc] === 'X'){
                dfs(nr, nc); // Recursively visit connected X cells
            }
        }
    }
}

// 2. BFS Based - Iterative Approach
// ✅ TC = O(n * m) - visit each cell once
// ✅ SC = O(n * m) - visited array and queue
function xShape_BFS(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    let count = 0;

    const directions = [
        [-1, 0],  // up
        [1, 0],    // down
        [0, -1],   // left
        [0, 1]     // right
    ];

    const bfs = (r, c) => {
        const queue = [];
        queue.push([r, c]);
        visited[r][c] = true;

        while (queue.length > 0) {
            const [row, col] = queue.shift();

            for (const [dr, dc] of directions) {
                const nr = row + dr;
                const nc = col + dc;

                if (
                    nr >= 0 && nr < n &&
                    nc >= 0 && nc < m &&
                    !visited[nr][nc] &&
                    grid[nr][nc] === 'X'
                ) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] && grid[i][j] === 'X') {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
}

// Test cases
let grid1 = [
    ['X','O','X'],
    ['O','X','O'],
    ['X','X','X']
];
console.log("Test 1 (DFS):", xShape(grid1)); // 3
console.log("Test 1 (BFS):", xShape_BFS(grid1)); // 3

let grid2 = [
    ['X','X'],
    ['X','X']
];
console.log("Test 2 (DFS):", xShape(grid2)); // 1
console.log("Test 2 (BFS):", xShape_BFS(grid2)); // 1

let grid3 = [
    ['X','O','X','O'],
    ['O','X','O','X'],
    ['X','O','X','O']
];
console.log("Test 3 (DFS):", xShape(grid3)); // 6
console.log("Test 3 (BFS):", xShape_BFS(grid3)); // 6

let grid4 = [
    ['X','X','X'],
    ['X','O','X'],
    ['X','X','X']
];
console.log("Test 4 (DFS):", xShape(grid4)); // 1 (connected X's)
console.log("Test 4 (BFS):", xShape_BFS(grid4)); // 1

/*🎯 CORE IDEA: Use DFS or BFS to count connected components of X cells in a grid.
Treat the grid as a graph where each cell is a vertex, and edges connect adjacent cells
in 4 directions only (no diagonals). Each connected component of X's forms one X shape.
For each unvisited X cell, start DFS/BFS to mark all connected X cells as part of the
same shape. Count the number of times we start a new DFS/BFS (each represents a new
X shape).

📋 STEP-BY-STEP FLOW (DFS):

1️⃣ INITIALIZATION:
   - Create 2D visited array
   - Define 4 directions (up, down, left, right)
   - Initialize X shape count to 0

2️⃣ ITERATE THROUGH GRID:
   - For each cell in the grid
   - If cell is unvisited X:
     - Increment X shape count
     - Start DFS from this cell

3️⃣ DFS TRAVERSAL:
   - Mark current cell as visited
   - Check all 4 neighbors
   - For each valid, unvisited, X neighbor:
     - Recursively call DFS

4️⃣ RESULT:
   - Return total X shape count

📋 STEP-BY-STEP FLOW (BFS):

1️⃣ INITIALIZATION:
   - Create 2D visited array
   - Define 4 directions
   - Initialize X shape count to 0

2️⃣ ITERATE THROUGH GRID:
   - For each cell in the grid
   - If cell is unvisited X:
     - Increment X shape count
     - Start BFS from this cell

3️⃣ BFS TRAVERSAL:
   - Enqueue starting cell
   - Mark as visited
   - While queue not empty:
     - Dequeue cell
     - Enqueue unvisited X neighbors

4️⃣ RESULT:
   - Return total X shape count

🧠 WHY THIS APPROACH?
- Connected components = X shapes
- DFS/BFS naturally finds connected components
- Each DFS/BFS call marks one entire X shape
- Counting DFS/BFS starts gives X shape count
- O(n * m) time complexity

💡 KEY INSIGHTS:
- X shape = connected component of X cells
- Adjacency in 4 directions only (not 8)
- DFS/BFS marks all cells in an X shape
- Each new DFS/BFS start = new X shape
- Visited array prevents revisiting cells
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Count X Shapes

INPUT: grid = [['X','O','X'],
               ['O','X','O'],
               ['X','X','X']]

Grid:
  X O X
  O X O
  X X X

EXPECTED OUTPUT: 3

🎯 GOAL: Count connected components of X cells!

🔍 STEP-BY-STEP DFS PROCESS:

INITIALIZATION:
visited = [[false, false, false],
           [false, false, false],
           [false, false, false]]
count = 0

ITERATION:

i=0, j=0: grid[0][0]='X', visited[0][0]=false
  → count++ (count=1)
  → DFS(0, 0)
    Mark (0,0) as visited
    Check neighbors:
      (0,-1): Out of bounds
      (0,1): 'O' → Skip
      (-1,0): Out of bounds
      (1,0): 'O' → Skip
    DFS(0,0) returns
  X Shape 1: (0,0)

i=0, j=1: grid[0][1]='O' → Skip

i=0, j=2: grid[0][2]='X', visited[0][2]=false
  → count++ (count=2)
  → DFS(0, 2)
    Mark (0,2) as visited
    Check neighbors:
      (0,1): 'O' → Skip
      (0,3): Out of bounds
      (-1,2): Out of bounds
      (1,2): 'O' → Skip
    DFS(0,2) returns
  X Shape 2: (0,2)

i=1, j=0: grid[1][0]='O' → Skip

i=1, j=1: grid[1][1]='X', visited[1][1]=false
  → count++ (count=3)
  → DFS(1, 1)
    Mark (1,1) as visited
    Check neighbors:
      (1,0): 'O' → Skip
      (1,2): 'O' → Skip
      (0,1): 'O' → Skip
      (2,1): 'X' → DFS(2,1)
        Mark (2,1) as visited
        Check neighbors:
          (2,0): 'X' → DFS(2,0)
            Mark (2,0) as visited
            Check neighbors:
              (2,-1): Out of bounds
              (2,1): visited → Skip
              (1,0): 'O' → Skip
              (3,0): Out of bounds
            DFS(2,0) returns
          (2,2): 'X' → DFS(2,2)
            Mark (2,2) as visited
            Check neighbors:
              (2,1): visited → Skip
              (2,3): Out of bounds
              (1,2): 'O' → Skip
              (3,2): Out of bounds
            DFS(2,2) returns
          (1,1): visited → Skip
          (3,1): Out of bounds
        DFS(2,1) returns
    DFS(1,1) returns
  X Shape 3: (1,1), (2,0), (2,1), (2,2)

i=1, j=2: grid[1][2]='O' → Skip

i=2, j=0: visited[2][0]=true → Skip

i=2, j=1: visited[2][1]=true → Skip

i=2, j=2: visited[2][2]=true → Skip

🏆 FINAL RESULT: 3
X Shapes found: 3 connected components

─────────────────────────────────────────

📊 EXAMPLE 2: Single Connected X Shape

INPUT: grid = [['X','X'],
               ['X','X']]

Grid:
  X X
  X X

EXPECTED OUTPUT: 1

PROCESS:

i=0, j=0: grid[0][0]='X', unvisited
  → count++ (count=1)
  → DFS(0, 0)
    Mark (0,0), (0,1), (1,0), (1,1) as visited
    (All connected in 4 directions)
  X Shape 1: (0,0), (0,1), (1,0), (1,1)

All other cells visited → Skip

🏆 FINAL RESULT: 1
All X's form one connected shape

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

4-DIRECTIONAL ADJACENCY:

For cell (r, c), neighbors are:
      (r-1, c)
  (r, c-1)  (r, c)  (r, c+1)
      (r+1, c)

Example: Cell (1,1) in grid:
  (0,1)
(1,0) (1,1) (1,2)
  (2,1)

Only 4 neighbors (no diagonals)!

─────────────────────────────────────────

📊 CONNECTED COMPONENT DETECTION:

X SHAPE IDENTIFICATION:

Each DFS/BFS call marks one connected component:
- Start DFS/BFS from unvisited X cell
- Mark all reachable X cells (4 directions)
- All marked cells form one X shape
- Count = number of DFS/BFS starts

Example:
  X O X
  O X O
  X X X

DFS from (0,0):
  Marks (0,0) → X Shape 1

DFS from (0,2):
  Marks (0,2) → X Shape 2

DFS from (1,1):
  Marks (1,1), (2,0), (2,1), (2,2) → X Shape 3

Result: 3 X shapes

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Visit each cell once: O(n * m)
- DFS/BFS visits each cell at most once: O(n * m)
- Total: O(n * m)

SPACE COMPLEXITY:
- visited array: O(n * m)
- DFS recursion stack / BFS queue: O(n * m) worst case
- Total: O(n * m)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ CONNECTED COMPONENTS:
   - X shape = connected component of X cells
   - DFS/BFS naturally finds connected components
   - Each DFS/BFS call marks one X shape
   - Simple and efficient

2️⃣ 4-DIRECTIONAL ADJACENCY:
   - Check only up, down, left, right
   - Diagonals NOT included
   - Matches problem requirements
   - Different from 8-directional problems

3️⃣ VISITED ARRAY:
   - Prevents revisiting cells
   - Ensures each cell processed once
   - Correct X shape counting
   - Efficient tracking

4️⃣ DFS/BFS TRAVERSAL:
   - Recursively/iteratively marks all connected cells
   - Handles any X shape pattern
   - Works for any grid size
   - Robust algorithm

5️⃣ CORRECTNESS:
   - Counts all X shapes correctly
   - Handles edge cases
   - No missed shapes
   - Optimal complexity

💡 KEY INSIGHT:
Counting X shapes by treating the grid as a graph where cells are vertices and adjacency
is defined in 4 directions only (no diagonals). Using DFS or BFS to find connected
components of X cells, where each DFS/BFS start represents a new X shape. This achieves
O(n * m) time and space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Grid iteration: O(n * m)
- DFS/BFS traversal: O(n * m) total
- Each cell visited at most once
- Total: O(n * m)
- Optimal for grid traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- visited array: O(n * m)
- DFS recursion stack: O(n * m) worst case
- BFS queue: O(n * m) worst case
- Total: O(n * m)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: All O's
Input: [['O','O'], ['O','O']]
Process: No X cells, no DFS/BFS calls
Output: 0

CASE 2: All X's
Input: [['X','X'], ['X','X']]
Process: One DFS/BFS call marks all cells
Output: 1

CASE 3: Single X
Input: [['X']]
Process: One DFS/BFS call
Output: 1

CASE 4: Isolated X's
Input: [['X','O','X'], ['O','O','O'], ['X','O','X']]
Process: 4 separate DFS/BFS calls
Output: 4

CASE 5: Large connected X shape
Input: All X's in grid
Process: One DFS/BFS call marks all cells
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Counts all X shapes: ✓
- Handles 4 directions: ✓
- No missed cells: ✓
- No double counting: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 77-78: Get grid dimensions
- Line 81-84: Initialize visited array
- Line 87-92: Define 4 directions
- Line 97-105: Iterate and count X shapes
- Line 110-124: DFS helper function
- Line 143-166: BFS helper function

🎯 4-DIRECTIONAL vs 8-DIRECTIONAL:

4-DIRECTIONAL (This problem):
- Only up, down, left, right
- Diagonals NOT included
- Simpler connectivity
- This algorithm

8-DIRECTIONAL (Islands problem):
- Includes diagonals
- More connections
- Different problem

Example:
  X O X
  O X O
  X O X

4-directional: 4 X shapes (diagonals separate)
8-directional: 1 X shape (diagonals connect)

─────────────────────────────────────────

🎯 DFS RECURSION:

HOW DFS MARKS X SHAPES:

DFS(r, c):
  1. Mark (r,c) as visited
  2. For each of 4 neighbors:
     - If valid, unvisited, and X:
       - Recursively call DFS
  3. All connected X cells marked

Example:
  X X O
  X O X

DFS(0,0):
  → Mark (0,0)
  → DFS(0,1) (right neighbor is X)
    → Mark (0,1)
    → Check neighbors, none are X
  → DFS(1,0) (down neighbor is X)
    → Mark (1,0)
    → Check neighbors, none are X
  → DFS returns

Result: (0,0), (0,1), (1,0) all marked as one X shape

─────────────────────────────────────────

🎯 X SHAPE COUNTING:

WHY COUNT DFS/BFS STARTS?

Each new DFS/BFS call = new X shape:
- First DFS/BFS call from (i,j) → X Shape 1
- Next DFS/BFS call from (i',j') → X Shape 2
- And so on...

Count increments:
- When we find unvisited X cell
- Before starting DFS/BFS
- Each increment = new X shape

Example:
  X O X
  O X O

DFS/BFS starts:
1. (0,0) → X Shape 1
2. (0,2) → X Shape 2
3. (1,1) → X Shape 3

Count = 3

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(n * m) time complexity
- Simple DFS/BFS implementation
- Handles 4 directions correctly
- Correct X shape counting
- Easy to understand

🎯 DISADVANTAGES:
- O(n * m) space for visited array
- Recursion stack may overflow for large grids
- Only counts shapes, doesn't find their sizes
- Requires modifying grid or using extra space

🎯 REAL-WORLD APPLICATIONS:
- Image processing (connected components)
- Pattern recognition (shape detection)
- Game development (territory counting)
- Circuit board analysis (component detection)
- Social network analysis (communities)

🎯 RELATED PROBLEMS:
- Number of islands (8-directional)
- Number of islands (4-directional)
- Surrounded regions
- Max area of island
- Count connected components

🎯 TESTING STRATEGY:
- All O's
- All X's
- Single X
- Isolated X's
- Large connected shapes
- Mixed patterns

🎯 DEBUGGING TIPS:
- Print visited array after each DFS/BFS
- Trace DFS/BFS calls
- Verify 4 directions
- Check boundary conditions
- Monitor X shape count

🎯 COMMON MISTAKES:
- Including diagonals (should be 4, not 8)
- Not checking boundaries
- Wrong visited array initialization
- Not resetting visited between tests
- Off-by-one errors in indices

🎯 BEST PRACTICES:
- Always check boundaries
- Use clear direction arrays
- Initialize visited properly
- Handle edge cases
- Test with various grids

🎯 INTERVIEW TIPS:
- Explain 4-directional adjacency
- Describe DFS/BFS approach
- Walk through example
- Discuss time/space complexity
- Compare with 8-directional

🎯 OPTIMIZATION IDEAS:

SPACE OPTIMIZATION:
- Use grid itself to mark visited (change 'X' to 'O' after visiting)
- Reduces space to O(1) extra space
- But modifies input grid

TIME OPTIMIZATION:
- Already optimal O(n * m)
- Each cell visited once
- No better approach possible

─────────────────────────────────────────

🎯 GRID AS GRAPH:

GRAPH REPRESENTATION:

Vertices: Each grid cell (r, c)
Edges: Connect adjacent cells in 4 directions
X Shape: Connected component of 'X' vertices

Graph properties:
- Implicit graph (not explicit adjacency list)
- Grid structure provides neighbors
- DFS/BFS finds connected components
- Standard graph algorithm

─────────────────────────────────────────

🎯 CONCLUSION:
Counting X shapes in a grid using 4-directional adjacency is efficiently achieved using
DFS or BFS to find connected components of X cells. Each DFS/BFS call marks one entire
X shape, and counting the number of DFS/BFS starts gives the total number of X shapes.
This achieves O(n * m) time complexity and O(n * m) space complexity, making it optimal
for X shape counting in grids!
*/