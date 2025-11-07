/* Problem: ✅✅✅✅ Distance of Nearest Cell Having 1 (Multi-Source BFS) ✅✅✅✅

Given a binary grid of n*m, where 1 represents a cell with value 1 and 0 represents
a cell with value 0. Find the distance of the nearest 1 in the grid for each cell.

Distance Definition:
- Distance is measured as the minimum number of steps (edges) to reach the nearest cell with value 1
- Movement is allowed in 4 directions only (up, down, left, right)
- Cells with value 1 have distance 0 (they are already 1)
- For cells with value 0, find the minimum distance to the nearest cell with value 1

Key Requirements:
- For each cell, find distance to nearest cell with value 1
- Use multi-source BFS starting from all cells with value 1
- Movement in 4 directions only (no diagonals)
- Return a 2D array with distances for each cell

You are given a binary grid. Return a 2D array where each cell contains the distance
to the nearest cell with value 1.

Example 1:
Input: grid = [[0, 1, 1, 0],
               [1, 1, 0, 0],
               [0, 0, 1, 1]]

Grid:
  0 1 1 0
  1 1 0 0
  0 0 1 1

Output: [[1, 0, 0, 1],
         [0, 0, 1, 1],
         [1, 1, 0, 0]]

Explanation:
- Cells with 1: distance 0
- Cell (0,0): distance 1 (nearest 1 at (0,1) or (1,0))
- Cell (0,3): distance 1 (nearest 1 at (0,2))
- Cell (1,2): distance 1 (nearest 1 at (1,1))
- Cell (1,3): distance 1 (nearest 1 at (1,1))
- Cell (2,0): distance 1 (nearest 1 at (1,0))
- Cell (2,1): distance 1 (nearest 1 at (1,1))

Example 2:
Input: grid = [[1, 0, 1],
               [1, 1, 0],
               [1, 0, 0]]

Grid:
  1 0 1
  1 1 0
  1 0 0

Output: [[0, 1, 0],
         [0, 0, 1],
         [0, 1, 2]]

Explanation:
- Cells with 1: distance 0
- Cell (0,1): distance 1 (nearest 1 at (0,0) or (0,2) or (1,1))
- Cell (1,2): distance 1 (nearest 1 at (1,1))
- Cell (2,1): distance 1 (nearest 1 at (1,1) or (2,0))
- Cell (2,2): distance 2 (nearest 1 at (2,0) via (2,1))

Constraints:
- 1 ≤ n, m ≤ 500
- grid[i][j] = {0, 1}
- At least one cell has value 1

Expected Complexities:
Time Complexity: O(n * m) - visit each cell once
Auxiliary Space: O(n * m) - for distance array and queue
*/

// ✅ TC = O(n * m) - Multi-source BFS, visit each cell once
// ✅ SC = O(n * m) - distance array and queue
function nearest(grid) {
    let n = grid.length; // Number of rows
    let m = grid[0].length; // Number of columns

    // Initialize distance array with Infinity for all cells
    let dist = new Array(n);
    for(let i = 0; i < n; i++){
        dist[i] = new Array(m).fill(Infinity);
    }
    
    // 4 directions: up, down, left, right
    let directions = [
        [-1, 0],  // up (row decreases)
        [1, 0],    // down (row increases)
        [0, -1],   // left (column decreases)
        [0, 1]     // right (column increases)
    ];
    
    // Multi-source BFS: Initialize queue with all cells having value 1
    let q = [];
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(grid[i][j] === 1){
                dist[i][j] = 0; // Distance from 1 to itself is 0
                q.push([i, j]); // Add all 1's to queue (multi-source)
            }
        }
    }
    
    // BFS traversal: Process all cells level by level
    while(q.length > 0){
        let [r, c] = q.shift();
        
        // Explore all 4 neighbors
        for(let [dr, dc] of directions){
            let nr = r + dr; // New row
            let nc = c + dc; // New column
            
            // Check if neighbor is within bounds
            if(nr >= 0 && nr < n && nc >= 0 && nc < m){
                // If we found a shorter path to this cell, update it
                if(dist[nr][nc] > dist[r][c] + 1){
                    dist[nr][nc] = dist[r][c] + 1; // Update distance
                    q.push([nr, nc]); // Add to queue for further exploration
                }
            }
        }
    }
    
    return dist; // Return distance array
}

// Test cases
let grid1 = [
    [0, 1, 1, 0],
    [1, 1, 0, 0],
    [0, 0, 1, 1]
];
console.log("Test 1:", nearest(grid1));
// Output: [[1, 0, 0, 1], [0, 0, 1, 1], [1, 1, 0, 0]]

let grid2 = [
    [1, 0, 1],
    [1, 1, 0],
    [1, 0, 0]
];
console.log("Test 2:", nearest(grid2));
// Output: [[0, 1, 0], [0, 0, 1], [0, 1, 2]]

let grid3 = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 0]
];
console.log("Test 3:", nearest(grid3));
// Output: [[2, 1, 2], [1, 0, 1], [2, 1, 2]]

let grid4 = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];
console.log("Test 4:", nearest(grid4));
// Output: [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

/*🎯 CORE IDEA: Use multi-source BFS to find the minimum distance from each cell to the
nearest cell with value 1. Start BFS from all cells with value 1 simultaneously
(multi-source). This ensures that when we process a cell, we've found the minimum distance
from the nearest 1. BFS naturally processes cells level by level, guaranteeing that the
first time we reach a cell, we've found the shortest path to it. This is similar to
"Rotten Oranges" or "Walls and Gates" problems.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize distance array with Infinity for all cells
   - Define 4 directions for movement
   - Find all cells with value 1

2️⃣ MULTI-SOURCE SETUP:
   - Set distance of all 1's to 0
   - Add all cells with value 1 to BFS queue
   - This creates multiple starting points

3️⃣ BFS TRAVERSAL:
   - Dequeue cell
   - For each neighbor:
     - If neighbor distance > current distance + 1:
       - Update neighbor distance
       - Enqueue neighbor

4️⃣ RESULT:
   - Return distance array

🧠 WHY THIS APPROACH?
- Multi-source BFS finds minimum distances efficiently
- BFS guarantees shortest path (first visit = minimum)
- Starting from all 1's ensures correct distances
- O(n * m) time complexity
- Similar to Dijkstra's with unit weights

💡 KEY INSIGHTS:
- Multi-source BFS: Start from all 1's simultaneously
- Distance array: Track minimum distance to nearest 1
- BFS guarantees: First visit = shortest path
- Cells with 1: Distance 0 (already at target)
- Cells with 0: Distance = minimum steps to nearest 1
- Level-by-level processing ensures correctness
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Multi-Source BFS

INPUT: grid = [[0, 1, 1, 0],
               [1, 1, 0, 0],
               [0, 0, 1, 1]]

Grid:
  0 1 1 0
  1 1 0 0
  0 0 1 1

EXPECTED OUTPUT: [[1, 0, 0, 1],
                   [0, 0, 1, 1],
                   [1, 1, 0, 0]]

🎯 GOAL: Find minimum distance to nearest 1 for each cell!

🔍 STEP-BY-STEP MULTI-SOURCE BFS PROCESS:

INITIALIZATION:
dist = [[∞, ∞, ∞, ∞],
        [∞, ∞, ∞, ∞],
        [∞, ∞, ∞, ∞]]

FIND ALL 1'S AND ADD TO QUEUE:
Cells with 1: (0,1), (0,2), (1,0), (1,1), (2,2), (2,3)

dist = [[∞, 0, 0, ∞],
        [0, 0, ∞, ∞],
        [∞, ∞, 0, 0]]

queue = [(0,1), (0,2), (1,0), (1,1), (2,2), (2,3)]

BFS ITERATION:

Level 0 (all 1's):
  Process (0,1): dist=0
    Neighbors: (0,0), (0,2), (-1,1), (1,1)
    - (0,0): dist[0][0]=∞ > 0+1 → dist[0][0]=1, enqueue
    - (0,2): already 1, skip
    - (1,1): already 1, skip

  Process (0,2): dist=0
    Neighbors: (0,1), (0,3), (-1,2), (1,2)
    - (0,1): already 1, skip
    - (0,3): dist[0][3]=∞ > 0+1 → dist[0][3]=1, enqueue
    - (1,2): dist[1][2]=∞ > 0+1 → dist[1][2]=1, enqueue

  Process (1,0): dist=0
    Neighbors: (1,1), (1,-1), (0,0), (2,0)
    - (1,1): already 1, skip
    - (0,0): dist[0][0]=1 (already set), skip
    - (2,0): dist[2][0]=∞ > 0+1 → dist[2][0]=1, enqueue

  Process (1,1): dist=0
    Neighbors: (1,0), (1,2), (0,1), (2,1)
    - All already processed or 1's

  Process (2,2): dist=0
    Neighbors: (2,1), (2,3), (1,2), (3,2)
    - (2,1): dist[2][1]=∞ > 0+1 → dist[2][1]=1, enqueue
    - (2,3): already 1, skip
    - (1,2): dist[1][2]=1 (already set), skip

  Process (2,3): dist=0
    Neighbors: (2,2), (2,4), (1,3), (3,3)
    - (2,2): already 1, skip
    - (1,3): dist[1][3]=∞ > 0+1 → dist[1][3]=1, enqueue

After Level 0:
dist = [[1, 0, 0, 1],
        [0, 0, 1, 1],
        [1, 1, 0, 0]]

All cells processed! BFS completes.

🏆 FINAL RESULT: [[1, 0, 0, 1],
                   [0, 0, 1, 1],
                   [1, 1, 0, 0]]

─────────────────────────────────────────

📊 EXAMPLE 2: Single Source

INPUT: grid = [[1, 0, 1],
               [1, 1, 0],
               [1, 0, 0]]

Grid:
  1 0 1
  1 1 0
  1 0 0

EXPECTED OUTPUT: [[0, 1, 0],
                   [0, 0, 1],
                   [0, 1, 2]]

PROCESS:

INITIALIZATION:
dist = [[∞, ∞, ∞],
        [∞, ∞, ∞],
        [∞, ∞, ∞]]

FIND ALL 1'S:
Cells with 1: (0,0), (0,2), (1,0), (1,1), (2,0)

dist = [[0, ∞, 0],
        [0, 0, ∞],
        [0, ∞, ∞]]

queue = [(0,0), (0,2), (1,0), (1,1), (2,0)]

BFS ITERATION:

Level 0: Process all 1's
  - (0,0): Updates (0,1) → dist[0][1]=1
  - (0,2): Updates (0,1) → already 1, skip
  - (1,0): Updates (1,-1) out of bounds, (2,0) already 1
  - (1,1): Updates (1,2) → dist[1][2]=1, (2,1) → dist[2][1]=1
  - (2,0): Updates (2,1) → already 1, skip

After Level 0:
dist = [[0, 1, 0],
        [0, 0, 1],
        [0, 1, ∞]]

Level 1: Process cells at distance 1
  - (1,2): Updates (1,1) already 1, (1,3) out, (0,2) already 1, (2,2) → dist[2][2]=2
  - (2,1): Updates (2,0) already 1, (2,2) → already 2, skip, (1,1) already 1, (3,1) out

After Level 1:
dist = [[0, 1, 0],
        [0, 0, 1],
        [0, 1, 2]]

🏆 FINAL RESULT: [[0, 1, 0],
                   [0, 0, 1],
                   [0, 1, 2]]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

MULTI-SOURCE BFS:

Starting from all 1's simultaneously:
  Level 0: All 1's (distance 0)
  Level 1: Neighbors of 1's (distance 1)
  Level 2: Neighbors of level 1 (distance 2)
  ...

Example grid:
  0 1 1 0
  1 1 0 0
  0 0 1 1

BFS levels:
Level 0: (0,1), (0,2), (1,0), (1,1), (2,2), (2,3)
Level 1: (0,0), (0,3), (1,2), (1,3), (2,0), (2,1)

All cells processed in 2 levels!

─────────────────────────────────────────

📊 MULTI-SOURCE BFS CONCEPT:

WHY MULTI-SOURCE?

Single-source BFS:
- Start from one 1
- Find distances from that 1
- Wrong answer (only one source)

Multi-source BFS:
- Start from ALL 1's
- Find minimum distance from ANY 1
- Correct answer (all sources)

Example:
  Grid: 0 0 0
        0 1 0
        0 0 1

Single-source from (1,1):
  Distances not optimal

Multi-source from (1,1) and (2,2):
  Distances optimal!

─────────────────────────────────────────

📊 DISTANCE UPDATE LOGIC:

WHY CHECK dist[nr][nc] > dist[r][c] + 1?

This ensures we only update if we found a shorter path:
- If dist[nr][nc] = ∞: Definitely update
- If dist[nr][nc] > current + 1: Found shorter path, update
- If dist[nr][nc] ≤ current + 1: Already have shorter path, skip

This prevents:
- Revisiting cells unnecessarily
- Updating with longer paths
- Infinite loops

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Find all 1's: O(n * m)
- BFS traversal: O(n * m)
- Each cell visited at most once
- Total: O(n * m)

SPACE COMPLEXITY:
- distance array: O(n * m)
- BFS queue: O(n * m) worst case
- Total: O(n * m)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MULTI-SOURCE BFS:
   - Start from all 1's simultaneously
   - Ensures minimum distance from ANY 1
   - Efficient single pass
   - Optimal solution

2️⃣ BFS PROPERTY:
   - First visit = shortest path
   - Level-by-level processing
   - Guarantees minimum distance
   - Correct for unweighted graph

3️⃣ DISTANCE ARRAY:
   - Tracks minimum distance to nearest 1
   - Updated only when shorter path found
   - Prevents unnecessary updates
   - Efficient tracking

4️⃣ LEVEL-BY-LEVEL:
   - Process all cells at distance k before k+1
   - Ensures correctness
   - Natural BFS ordering
   - Optimal for this problem

5️⃣ CORRECTNESS:
   - Finds minimum distance for all cells
   - Handles multiple sources correctly
   - Optimal complexity
   - Handles all edge cases

💡 KEY INSIGHT:
Finding minimum distance to nearest 1 using multi-source BFS, starting from all cells
with value 1 simultaneously. BFS naturally processes cells level by level, ensuring
that the first time we reach a cell, we've found the shortest path to it from the
nearest 1. This achieves O(n * m) time and space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Find all 1's: O(n * m)
- Multi-source BFS: O(n * m)
- Each cell visited at most once
- Total: O(n * m)
- Optimal for grid traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- distance array: O(n * m)
- BFS queue: O(n * m) worst case
- Total: O(n * m)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: All 1's
Input: [[1, 1], [1, 1]]
Process: All distances 0
Output: [[0, 0], [0, 0]]

CASE 2: All 0's (shouldn't happen per constraints, but handle gracefully)
Input: [[0, 0], [0, 0]]
Process: No 1's, all distances remain Infinity
Output: [[∞, ∞], [∞, ∞]]

CASE 3: Single 1
Input: [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
Process: Multi-source BFS from single 1
Output: [[2, 1, 2], [1, 0, 1], [2, 1, 2]]

CASE 4: Single 0
Input: [[1, 1], [1, 0]]
Process: 0 is adjacent to 1's
Output: [[0, 0], [0, 1]]

CASE 5: Isolated 0's
Input: [[1, 0, 0, 1]]
Process: 0's between two 1's
Output: [[0, 1, 1, 0]]

🎯 ALGORITHM CORRECTNESS:
- Finds minimum distance: ✓
- Handles multiple sources: ✓
- Correct for all cells: ✓
- Handles edge cases: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 82-85: Initialize distance array with Infinity
- Line 88-93: Define 4 directions
- Line 97-104: Find all 1's and add to queue
- Line 107-124: BFS traversal with distance updates
- Line 126: Return distance array

🎯 MULTI-SOURCE BFS:

HOW IT WORKS:

Traditional BFS:
- Start from single source
- Process level by level
- Find distances from that source

Multi-Source BFS:
- Start from multiple sources simultaneously
- Process level by level
- Find minimum distance from ANY source
- Perfect for this problem!

Visualization:
Level 0: [Source1, Source2, Source3, ...]
Level 1: [Neighbors of all sources]
Level 2: [Neighbors of level 1]
...

─────────────────────────────────────────

🎯 DISTANCE UPDATE CONDITION:

WHY dist[nr][nc] > dist[r][c] + 1?

This is the relaxation condition:
- If current distance > new distance: Update
- If current distance ≤ new distance: Skip

This ensures:
- Only update when we find shorter path
- Prevents unnecessary processing
- Correct minimum distance calculation
- Efficient algorithm

Example:
  dist[2][2] = ∞
  dist[1][2] = 1
  dist[2][2] > 1 + 1? Yes (∞ > 2)
  → Update dist[2][2] = 2

─────────────────────────────────────────

🎯 BFS vs DIJKSTRA:

BFS (This problem):
- Unweighted graph (unit edges)
- Multi-source
- O(n * m) time
- Simple queue

Dijkstra's:
- Weighted graph
- Single source
- O(E log V) time
- Priority queue

For unweighted graphs:
- BFS is more efficient
- Simpler implementation
- Same result

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(n * m) time complexity
- Simple multi-source BFS
- Guarantees minimum distances
- Efficient single pass
- Optimal algorithm

🎯 DISADVANTAGES:
- O(n * m) space for distance array
- BFS queue may be large
- Requires all 1's to be found first
- Only works for unweighted graphs

🎯 REAL-WORLD APPLICATIONS:
- Distance to nearest service point
- Signal propagation (nearest transmitter)
- Heat diffusion (nearest heat source)
- Network routing (nearest node)
- Image processing (distance transform)

🎯 RELATED PROBLEMS:
- Rotten Oranges (multi-source BFS)
- Walls and Gates (multi-source BFS)
- Shortest path in unweighted graph
- 01 Matrix (LeetCode)
- Distance transform

🎯 TESTING STRATEGY:
- All 1's
- All 0's (edge case)
- Single 1
- Multiple 1's
- Isolated 0's
- Complex patterns

🎯 DEBUGGING TIPS:
- Print distance array after each level
- Trace BFS queue contents
- Verify distance updates
- Check boundary conditions
- Monitor queue size

🎯 COMMON MISTAKES:
- Not using multi-source (using single source)
- Wrong distance initialization
- Not checking distance update condition
- Forgetting to enqueue after update
- Wrong direction array

🎯 BEST PRACTICES:
- Initialize distances to Infinity
- Add all sources to queue initially
- Check distance update condition
- Handle boundary conditions
- Use clear variable names

🎯 INTERVIEW TIPS:
- Explain multi-source BFS concept
- Describe distance update logic
- Walk through example
- Discuss time/space complexity
- Compare with single-source BFS

🎯 MULTI-SOURCE BFS PATTERN:

STANDARD PATTERN:

1. Find all sources
2. Initialize distances (0 for sources, ∞ for others)
3. Add all sources to queue
4. BFS: For each cell, update neighbors if shorter path found
5. Return distance array

This pattern applies to:
- Rotten Oranges
- Walls and Gates
- 01 Matrix
- This problem

─────────────────────────────────────────

🎯 WHY BFS FOR SHORTEST PATH?

BFS PROPERTY:
- Processes level by level
- First visit = shortest path (unweighted)
- Guarantees minimum distance
- Optimal for unweighted graphs

For weighted graphs:
- Need Dijkstra's algorithm
- BFS doesn't guarantee shortest path
- Different problem

─────────────────────────────────────────

🎯 CONCLUSION:
Finding the distance of the nearest cell having 1 is efficiently achieved using
multi-source BFS, starting from all cells with value 1 simultaneously. BFS naturally
processes cells level by level, ensuring that the first time we reach a cell, we've
found the shortest path to it from the nearest 1. The distance array is updated only
when a shorter path is found, ensuring optimal distances. This achieves O(n * m) time
and space complexity, making it optimal for finding nearest 1 distances in grids!
*/