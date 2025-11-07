/* Problem: ✅✅✅✅ Number of Islands (8-directional) ✅✅✅✅

Given a grid of size n*m (n is the number of rows and m is the number of columns)
consisting of 'W's (Water) and 'L's (Land). Find the number of islands.

An island is either surrounded by water or the boundary of a grid and is formed by
connecting adjacent lands horizontally, vertically, or diagonally (all 8 directions).
Two land cells are part of the same island if they are connected in any of the 8 directions.

Key Requirements:
- Count the number of connected components of 'L' (Land) cells
- Adjacency is defined in all 8 directions (up, down, left, right, and 4 diagonals)
- Islands are separated by water ('W') or grid boundaries
- Use DFS to mark all connected land cells of an island

You are given a 2D grid where each cell is either 'L' (Land) or 'W' (Water).
Return the number of islands in the grid.

Example 1:
Input: grid = [['L', 'L', 'W', 'W', 'W'], 
               ['W', 'L', 'W', 'W', 'L'], 
               ['L', 'W', 'W', 'L', 'L'], 
               ['W', 'W', 'W', 'W', 'W'], 
               ['L', 'W', 'L', 'L', 'W']]

Grid visualization:
  L L W W W
  W L W W L
  L W W L L
  W W W W W
  L W L L W

Output: 4
Explanation:
Island 1: (0,0), (0,1), (1,1)
Island 2: (1,4)
Island 3: (2,0), (2,3), (2,4)
Island 4: (4,0), (4,2), (4,3)

Example 2:
Input: grid = [['W', 'L', 'L', 'L', 'W', 'W', 'W'], 
               ['W', 'W', 'L', 'L', 'W', 'L', 'W']]

Grid visualization:
  W L L L W W W
  W W L L W L W

Output: 2
Explanation:
Island 1: (0,1), (0,2), (0,3), (1,2), (1,3)
Island 2: (1,5)

Constraints:
- 1 ≤ n, m ≤ 500
- grid[i][j] = {'L', 'W'}

Expected Complexities:
Time Complexity: O(n * m) - visit each cell once
Auxiliary Space: O(n * m) - for visited array and recursion stack
*/


// 1. DFS Based - Recursive Approach
// ✅ TC = O(n * m) - visit each cell once
// ✅ SC = O(n * m) - visited array and recursion stack
function numIslands(grid) {
    let n = grid.length; // Number of rows
    let m = grid[0].length; // Number of columns
    
    // 2D visited array to track visited cells
    let visited = new Array(n);
    for(let i = 0; i < n; i++){
        visited[i] = new Array(m).fill(false);
    }
    
    // 8 directions: up-left, up, up-right, left, right, down-left, down, down-right
    let directions = [
        [-1, -1], [-1, 0], [-1, 1],  // top row
        [0, -1],           [0, 1],   // middle row (left, right)
        [1, -1],  [1, 0],  [1, 1]    // bottom row
    ];
    
    let count = 0; // Count of islands
    
    // Iterate through all cells
    for(let r = 0; r < n; r++){
        for(let c = 0; c < m; c++){
            // If cell is unvisited land, start DFS to mark entire island
            if(!visited[r][c] && grid[r][c] === 'L'){
                count++; // Found a new island
                dfs(r, c); // Mark all connected land cells
            }
        }
    }
    
    return count;
    
    // Helper function to perform DFS and mark all connected land cells
    function dfs(r, c){
        visited[r][c] = true; // Mark current cell as visited
        
        // Check all 8 neighboring cells
        for(let [dr, dc] of directions){
            let nr = r + dr; // New row
            let nc = c + dc; // New column
            
            // Check if neighbor is valid, unvisited, and is land
            if(nr >= 0 && nr < n && nc >= 0 && nc < m && 
               !visited[nr][nc] && grid[nr][nc] === 'L'){
                dfs(nr, nc); // Recursively visit connected land cells
            }
        }
    }
}



// 2. BFS Based - Iterative Approach
// ✅ TC = O(n * m) - visit each cell once
// ✅ SC = O(n * m) - visited array and queue
function numIslands(grid) {
    const n = grid.length;
    const m = grid[0].length;
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    let count = 0;

    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],          [0, 1],
        [1, -1], [1, 0], [1, 1]
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
                    grid[nr][nc] === 'L'
                ) {
                    visited[nr][nc] = true;
                    queue.push([nr, nc]);
                }
            }
        }
    };

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] && grid[i][j] === 'L') {
                count++;
                bfs(i, j);
            }
        }
    }

    return count;
}


// Test cases
let grid1 = [['L', 'L', 'W', 'W', 'W'], 
             ['W', 'L', 'W', 'W', 'L'], 
             ['L', 'W', 'W', 'L', 'L'], 
             ['W', 'W', 'W', 'W', 'W'], 
             ['L', 'W', 'L', 'L', 'W']];
console.log("Test 1:", numIslands(grid1)); // 4

let grid2 = [['W', 'L', 'L', 'L', 'W', 'W', 'W'], 
             ['W', 'W', 'L', 'L', 'W', 'L', 'W']];
console.log("Test 2:", numIslands(grid2)); // 2

let grid3 = [['L', 'W', 'L'], 
             ['W', 'L', 'W'], 
             ['L', 'W', 'L']];
console.log("Test 3:", numIslands(grid3)); // 4 (diagonal connectivity)

let grid4 = [['L', 'L', 'L'], 
             ['L', 'L', 'L'], 
             ['L', 'L', 'L']];
console.log("Test 4:", numIslands(grid4)); // 1 (one big island)

/*🎯 CORE IDEA: Use DFS to count connected components of land cells. Treat the grid
as a graph where each cell is a vertex, and edges connect adjacent cells in all 8
directions. Each island is a connected component of 'L' cells. For each unvisited
land cell, start DFS to mark all connected land cells as part of the same island.
Count the number of times we start a new DFS (each represents a new island).

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create 2D visited array to track visited cells
   - Define 8 directions for adjacency checking
   - Initialize island count to 0

2️⃣ ITERATE THROUGH GRID:
   - For each cell in the grid
   - If cell is unvisited land ('L'):
     - Increment island count
     - Start DFS from this cell

3️⃣ DFS TRAVERSAL:
   - Mark current cell as visited
   - Check all 8 neighboring cells
   - For each valid, unvisited, land neighbor:
     - Recursively call DFS

4️⃣ RESULT:
   - Return total island count

🧠 WHY THIS APPROACH?
- DFS naturally finds connected components
- Each DFS call marks one entire island
- Counting DFS starts gives island count
- O(n * m) time complexity
- Handles all 8 directions correctly

💡 KEY INSIGHTS:
- Island = connected component of 'L' cells
- Adjacency in 8 directions (not just 4)
- DFS marks all cells in an island
- Each new DFS start = new island
- Visited array prevents revisiting cells
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Count Islands

INPUT: grid = [['L', 'L', 'W', 'W', 'W'], 
               ['W', 'L', 'W', 'W', 'L'], 
               ['L', 'W', 'W', 'L', 'L'], 
               ['W', 'W', 'W', 'W', 'W'], 
               ['L', 'W', 'L', 'L', 'W']]

Grid:
  L L W W W
  W L W W L
  L W W L L
  W W W W W
  L W L L W

EXPECTED OUTPUT: 4

🎯 GOAL: Count connected components of land cells!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
visited = [[false, false, false, false, false],
           [false, false, false, false, false],
           [false, false, false, false, false],
           [false, false, false, false, false],
           [false, false, false, false, false]]
count = 0

ITERATION:

r=0, c=0: grid[0][0]='L', visited[0][0]=false
  → count++ (count=1)
  → DFS(0, 0)
    Mark (0,0) as visited
    Check neighbors: (0,1)='L' → DFS(0,1)
      Mark (0,1) as visited
      Check neighbors: (0,0) visited, (0,2)='W', (1,0)='W', (1,1)='L' → DFS(1,1)
        Mark (1,1) as visited
        Check neighbors: (0,0) visited, (0,1) visited, (0,2)='W', (1,0)='W', (1,2)='W', (2,0)='W', (2,1)='W', (2,2)='W'
        DFS(1,1) returns
      DFS(0,1) returns
    DFS(0,0) returns
  Island 1: (0,0), (0,1), (1,1)

r=0, c=1: visited[0][1]=true → Skip

r=0, c=2: grid[0][2]='W' → Skip

r=0, c=3: grid[0][3]='W' → Skip

r=0, c=4: grid[0][4]='W' → Skip

r=1, c=0: grid[1][0]='W' → Skip

r=1, c=1: visited[1][1]=true → Skip

r=1, c=2: grid[1][2]='W' → Skip

r=1, c=3: grid[1][3]='W' → Skip

r=1, c=4: grid[1][4]='L', visited[1][4]=false
  → count++ (count=2)
  → DFS(1, 4)
    Mark (1,4) as visited
    Check neighbors: All are 'W' or out of bounds
    DFS(1,4) returns
  Island 2: (1,4)

r=2, c=0: grid[2][0]='L', visited[2][0]=false
  → count++ (count=3)
  → DFS(2, 0)
    Mark (2,0) as visited
    Check neighbors: (2,1)='W', (2,2)='W', (2,3)='L' → DFS(2,3)
      Mark (2,3) as visited
      Check neighbors: (2,2)='W', (2,4)='L' → DFS(2,4)
        Mark (2,4) as visited
        Check neighbors: (2,3) visited, (1,3)='W', (1,4) visited, (3,3)='W', (3,4)='W'
        DFS(2,4) returns
      DFS(2,3) returns
    DFS(2,0) returns
  Island 3: (2,0), (2,3), (2,4)

r=2, c=1: grid[2][1]='W' → Skip

r=2, c=2: grid[2][2]='W' → Skip

r=2, c=3: visited[2][3]=true → Skip

r=2, c=4: visited[2][4]=true → Skip

r=3, c=0: grid[3][0]='W' → Skip
... (all water in row 3)

r=4, c=0: grid[4][0]='L', visited[4][0]=false
  → count++ (count=4)
  → DFS(4, 0)
    Mark (4,0) as visited
    Check neighbors: (4,1)='W', (4,2)='L' → DFS(4,2)
      Mark (4,2) as visited
      Check neighbors: (4,1)='W', (4,3)='L' → DFS(4,3)
        Mark (4,3) as visited
        Check neighbors: (4,2) visited, (4,4)='W', (3,3)='W', (3,4)='W'
        DFS(4,3) returns
      DFS(4,2) returns
    DFS(4,0) returns
  Island 4: (4,0), (4,2), (4,3)

r=4, c=1: grid[4][1]='W' → Skip

r=4, c=2: visited[4][2]=true → Skip

r=4, c=3: visited[4][3]=true → Skip

r=4, c=4: grid[4][4]='W' → Skip

🏆 FINAL RESULT: 4
Islands found: 4 connected components

─────────────────────────────────────────

📊 EXAMPLE 2: Simple Grid

INPUT: grid = [['W', 'L', 'L', 'L', 'W', 'W', 'W'], 
               ['W', 'W', 'L', 'L', 'W', 'L', 'W']]

Grid:
  W L L L W W W
  W W L L W L W

EXPECTED OUTPUT: 2

PROCESS:

r=0, c=0: 'W' → Skip
r=0, c=1: 'L', unvisited
  → count++ (count=1)
  → DFS(0,1)
    Mark (0,1), (0,2), (0,3), (1,2), (1,3) as visited
    (All connected in 8 directions)
  Island 1: (0,1), (0,2), (0,3), (1,2), (1,3)

r=0, c=2: visited → Skip
r=0, c=3: visited → Skip
r=0, c=4: 'W' → Skip
r=0, c=5: 'W' → Skip
r=0, c=6: 'W' → Skip

r=1, c=0: 'W' → Skip
r=1, c=1: 'W' → Skip
r=1, c=2: visited → Skip
r=1, c=3: visited → Skip
r=1, c=4: 'W' → Skip
r=1, c=5: 'L', unvisited
  → count++ (count=2)
  → DFS(1,5)
    Mark (1,5) as visited
    Check neighbors: All are 'W' or visited
  Island 2: (1,5)

r=1, c=6: 'W' → Skip

🏆 FINAL RESULT: 2

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

8-DIRECTIONAL ADJACENCY:

For cell (r, c), neighbors are:
  (r-1, c-1)  (r-1, c)  (r-1, c+1)
  (r, c-1)    (r, c)    (r, c+1)
  (r+1, c-1)  (r+1, c)  (r+1, c+1)

Example: Cell (1,1) in grid:
  (0,0)  (0,1)  (0,2)
  (1,0)  (1,1)  (1,2)
  (2,0)  (2,1)  (2,2)

All 8 neighbors can be part of same island!

─────────────────────────────────────────

📊 CONNECTED COMPONENT DETECTION:

ISLAND IDENTIFICATION:

Each DFS call marks one connected component:
- Start DFS from unvisited land cell
- Mark all reachable land cells (8 directions)
- All marked cells form one island
- Count = number of DFS starts

Example:
  L L W
  W L W
  L W L

DFS from (0,0):
  Marks (0,0), (0,1), (1,1) → Island 1

DFS from (2,0):
  Marks (2,0) → Island 2

DFS from (2,2):
  Marks (2,2) → Island 3

Result: 3 islands

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Visit each cell once: O(n * m)
- DFS visits each cell at most once: O(n * m)
- Total: O(n * m)

SPACE COMPLEXITY:
- visited array: O(n * m)
- DFS recursion stack: O(n * m) worst case
- Total: O(n * m)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ CONNECTED COMPONENTS:
   - Island = connected component of 'L' cells
   - DFS naturally finds connected components
   - Each DFS call marks one island
   - Simple and efficient

2️⃣ 8-DIRECTIONAL ADJACENCY:
   - Check all 8 neighbors
   - Diagonal connections included
   - Matches problem requirements
   - Handles complex shapes

3️⃣ VISITED ARRAY:
   - Prevents revisiting cells
   - Ensures each cell processed once
   - Correct island counting
   - Efficient tracking

4️⃣ DFS TRAVERSAL:
   - Recursively marks all connected cells
   - Handles any island shape
   - Works for any grid size
   - Robust algorithm

5️⃣ CORRECTNESS:
   - Counts all islands correctly
   - Handles edge cases
   - No missed islands
   - Optimal complexity

💡 KEY INSIGHT:
Counting islands by treating the grid as a graph where cells are vertices and adjacency
is defined in all 8 directions. Using DFS to find connected components of land cells,
where each DFS start represents a new island. This achieves O(n * m) time and space
complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Grid iteration: O(n * m)
- DFS traversal: O(n * m) total
- Each cell visited at most once
- Total: O(n * m)
- Optimal for grid traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- visited array: O(n * m)
- DFS recursion stack: O(n * m) worst case (all land)
- Total: O(n * m)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: All water
Input: [['W', 'W'], ['W', 'W']]
Process: No land cells, no DFS calls
Output: 0

CASE 2: All land
Input: [['L', 'L'], ['L', 'L']]
Process: One DFS call marks all cells
Output: 1

CASE 3: Single cell
Input: [['L']]
Process: One DFS call
Output: 1

CASE 4: Diagonal islands
Input: [['L', 'W', 'L'], ['W', 'L', 'W'], ['L', 'W', 'L']]
Process: 4 separate DFS calls (diagonal connectivity)
Output: 4

CASE 5: Large single island
Input: [['L', 'L', 'L'], ['L', 'L', 'L'], ['L', 'L', 'L']]
Process: One DFS call marks all 9 cells
Output: 1

🎯 ALGORITHM CORRECTNESS:
- Counts all islands: ✓
- Handles 8 directions: ✓
- No missed cells: ✓
- No double counting: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 66-67: Get grid dimensions
- Line 70-73: Initialize visited array
- Line 76-80: Define 8 directions
- Line 85-92: Iterate and count islands
- Line 98-112: DFS helper function

🎯 8-DIRECTIONAL MOVEMENT:

DIRECTIONS ARRAY:

[-1, -1]  [-1, 0]  [-1, 1]   top-left, top, top-right
[0, -1]            [0, 1]    left,        right
[1, -1]   [1, 0]   [1, 1]    bottom-left, bottom, bottom-right

Why 8 directions?
- Problem specifies diagonal connectivity
- More connections than 4-directional
- Islands can be diagonally connected
- Matches real-world island shapes

─────────────────────────────────────────

🎯 DFS RECURSION:

HOW DFS MARKS ISLANDS:

DFS(r, c):
  1. Mark (r,c) as visited
  2. For each of 8 neighbors:
     - If valid, unvisited, and land:
       - Recursively call DFS
  3. All connected cells marked

Example:
  L L W
  L W L

DFS(0,0):
  → Mark (0,0)
  → DFS(0,1) (right neighbor is land)
    → Mark (0,1)
    → Check neighbors, none are land
  → DFS(1,0) (down neighbor is land)
    → Mark (1,0)
    → Check neighbors, none are land
  → DFS returns

Result: (0,0), (0,1), (1,0) all marked as one island

─────────────────────────────────────────

🎯 ISLAND COUNTING:

WHY COUNT DFS STARTS?

Each new DFS call = new island:
- First DFS call from (r,c) → Island 1
- Next DFS call from (r',c') → Island 2
- And so on...

Count increments:
- When we find unvisited land cell
- Before starting DFS
- Each increment = new island

Example:
  L W L
  W W W
  L W L

DFS starts:
1. (0,0) → Island 1
2. (0,2) → Island 2
3. (2,0) → Island 3
4. (2,2) → Island 4

Count = 4

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(n * m) time complexity
- Simple DFS implementation
- Handles all 8 directions
- Correct island counting
- Easy to understand

🎯 DISADVANTAGES:
- O(n * m) space for visited array
- Recursion stack may overflow for large grids
- Only counts islands, doesn't find their sizes
- Requires modifying grid or using extra space

🎯 REAL-WORLD APPLICATIONS:
- Image processing (connected components)
- Game development (terrain analysis)
- Geographic mapping (island detection)
- Circuit board analysis (component detection)
- Social network analysis (communities)

🎯 RELATED PROBLEMS:
- Number of islands (4-directional)
- Max area of island
- Island perimeter
- Surrounded regions
- Number of provinces

🎯 TESTING STRATEGY:
- All water
- All land
- Single cell
- Diagonal islands
- Large islands
- Mixed patterns

🎯 DEBUGGING TIPS:
- Print visited array after each DFS
- Trace DFS calls
- Verify 8 directions
- Check boundary conditions
- Monitor island count

🎯 COMMON MISTAKES:
- Forgetting diagonal directions
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
- Explain 8-directional adjacency
- Describe DFS approach
- Walk through example
- Discuss time/space complexity
- Mention optimization possibilities

🎯 OPTIMIZATION IDEAS:

SPACE OPTIMIZATION:
- Use grid itself to mark visited (change 'L' to 'W' after visiting)
- Reduces space to O(1) extra space
- But modifies input grid

TIME OPTIMIZATION:
- Already optimal O(n * m)
- Each cell visited once
- No better approach possible

─────────────────────────────────────────

🎯 8-DIRECTIONAL vs 4-DIRECTIONAL:

4-DIRECTIONAL (Standard):
- Only up, down, left, right
- Simpler connectivity
- Different problem

8-DIRECTIONAL (This problem):
- Includes diagonals
- More connections
- Islands can touch diagonally
- This algorithm

Example:
  L W L
  W L W
  L W L

4-directional: 4 islands
8-directional: 1 island (diagonally connected)

─────────────────────────────────────────

🎯 GRID AS GRAPH:

GRAPH REPRESENTATION:

Vertices: Each grid cell (r, c)
Edges: Connect adjacent cells in 8 directions
Island: Connected component of 'L' vertices

Graph properties:
- Implicit graph (not explicit adjacency list)
- Grid structure provides neighbors
- DFS finds connected components
- Standard graph algorithm

─────────────────────────────────────────

🎯 CONCLUSION:
Counting islands in a grid using 8-directional adjacency is efficiently achieved using
DFS to find connected components of land cells. Each DFS call marks one entire island,
and counting the number of DFS starts gives the total number of islands. This achieves
O(n * m) time complexity and O(n * m) space complexity, making it optimal for island
counting in grids!
*/