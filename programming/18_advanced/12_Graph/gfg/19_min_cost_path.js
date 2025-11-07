/* Problem: ✅✅✅✅ Minimum Cost Path in Grid ✅✅✅✅

Given an N×N grid where each cell has a cost (positive integer), find the minimum
cost to reach from the top-left corner (0, 0) to the bottom-right corner (N-1, N-1).
You can only move in 4 directions: up, down, left, right. The cost of a path is
the sum of costs of all cells visited along the path.

Key Requirements:
- Start at (0, 0), end at (N-1, N-1)
- Can move in 4 directions (up, down, left, right)
- Cost of path = sum of all cell values visited
- Find minimum cost path
- Grid is weighted (each cell has different cost)

Example 1:
Input: grid = [[9, 4, 9, 9],
               [6, 7, 6, 4],
               [8, 3, 3, 7],
               [7, 4, 9, 10]]

Output: 43
Explanation:
Path: (0,0)→(0,1)→(1,1)→(2,1)→(2,2)→(2,3)→(3,3)
Cost: 9 + 4 + 7 + 3 + 3 + 7 + 10 = 43

Example 2:
Input: grid = [[1, 1000],
               [1, 1000]]

Output: 1002
Explanation:
Path: (0,0)→(1,0)→(1,1)
Cost: 1 + 1 + 1000 = 1002
(Not (0,0)→(0,1)→(1,1) = 1 + 1000 + 1000 = 2001)

Constraints:
- 1 ≤ N ≤ 500
- 1 ≤ grid[i][j] ≤ 500

Expected Complexities:
Time Complexity: O(N² log N) - Dijkstra with min-heap
Auxiliary Space: O(N²) - for dist array and heap
*/

// MinHeap for Dijkstra's algorithm
// Stores [row, col, cost] tuples, ordered by cost
class MinHeap{
    constructor(){
        this.harr = [] // Array of [r, c, cost] tuples
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    // Insert element and maintain heap property
    insert([r, c, cost]){
        let arr = this.harr
        let i = arr.length
        
        arr[i]=[r, c, cost]
        
        // Bubble up to maintain min-heap property
        while(i>0 && arr[this.parent(i)][2] > arr[i][2]){
            let p = this.parent(i);
            [arr[i], arr[p]]=[arr[p], arr[i]];
            i=p;
        }
    }
    // Extract minimum element (root)
    extractMin(){
        if(this.harr.length === 0) return null
        let arr = this.harr
        let n = arr.length;
        
        // Swap root with last element
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        let min = arr.pop()
        // Restore heap property
        this.minHeapify(0)
        return min
    }
    // Heapify down to maintain min-heap property
    minHeapify(i){
        let arr=this.harr
        let n=arr.length
        
        while(true){
            let l = this.left(i)
            let r=this.right(i)
            
            let min = i
            
            // Find minimum among node and its children
            if(l<n && arr[l][2] < arr[min][2]){
                min=l
            }
            if(r<n && arr[r][2] < arr[min][2]){
                min=r
            }
            
            if(min===i) break; // Heap property satisfied
            
            // Swap and continue down
            [arr[i], arr[min]]=[arr[min], arr[i]];
            
            i=min;
        }
    }
}

// ✅ TC = O(N² log N) - Dijkstra with min-heap, each cell processed once, heap operations O(log N)
// ✅ SC = O(N²) - dist array and heap can contain O(N²) elements
// NOTE: Why BFS ❌❌ doesn't work here? The reason is discussed in the end of the file.
function minimumCostPath(grid) {
   let n = grid.length; // Grid size
   
   // 4-directional movements: left, right, down, up
   let directions = [[0, -1], [0, 1], [1, 0], [-1, 0]]; // [row, col] offsets
   
   // Distance array: minimum cost to reach each cell from (0,0)
   let dist = Array.from({length: n}, ()=>Array(n).fill(Infinity))
   
   // 1. Initialize source: cost to reach (0,0) is grid[0][0]
   dist[0][0] = grid[0][0]

   // 2. Min-heap for Dijkstra: stores [row, col, cost] tuples
   let h = new MinHeap()
   h.insert([0, 0, grid[0][0]]); // Start from (0,0) with cost grid[0][0]
   
   // 3. Dijkstra's algorithm main loop
   while(h.harr.length > 0){
       // Extract cell with minimum cost
       let [r, c, currCost] = h.extractMin()
       
       // 4. Skip outdated entries (lazy deletion)
       // Multiple entries for same cell can exist in heap (we insert instead of decreaseKey)
       // Only process if this is the current best cost for this cell
       if(currCost > dist[r][c]) continue
       
       // 5. Early termination: destination reached
       if(r === n-1 && c === n-1) return currCost
       
       // 6. Explore neighbors in 4 directions
       for(let [dr, dc] of directions){
           let nr = r + dr // New row
           let nc = c + dc // New column
           
           // 7. Check bounds
           if(nr >= 0 && nr < n && nc >= 0 && nc < n){
               // 8. Relax edge: update if we found a shorter path
               let newCost = grid[nr][nc] + currCost
               if(dist[nr][nc] > newCost){
                   dist[nr][nc] = newCost // Update minimum cost
                   h.insert([nr, nc, dist[nr][nc]]) // Add to heap (lazy insertion)
               }
           }
       }
   }
   
   // Destination unreachable (shouldn't happen for valid grids)
   return -1
}

// Test cases
let grid = [[9,4,9,9],[6,7,6,4],[8,3,3,7],[7,4,9,10]]
console.log("Test 1:", minimumCostPath(grid)) // 43 = (9 + 4 + 7 + 3 + 3 + 7 + 10)

let grid1 = [[1, 1000],[1, 1000]]
console.log("Test 2:", minimumCostPath(grid1)) // 1002 = (1+1+1000)

/*🎯 CORE IDEA: Use Dijkstra's algorithm on a grid treated as a weighted graph. Each
cell is a vertex, and moving to a neighbor cell is an edge with weight equal to the
neighbor's cell value. Dijkstra finds the shortest path (minimum cost) from source
(0,0) to destination (N-1, N-1) by always processing the cell with minimum cost first.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Initialize dist array: all Infinity except source (grid[0][0])
   - Insert source (0,0) into min-heap with cost grid[0][0]

2️⃣ DIJKSTRA'S LOOP:
   - Extract cell with minimum cost from heap
   - Skip if outdated (lazy deletion)
   - If destination reached, return cost
   - Explore 4 neighbors:
     - Check bounds
     - Calculate new cost = current cost + neighbor cell value
     - If new cost < dist[neighbor], update and insert into heap

3️⃣ RESULT:
   - Return minimum cost when destination is reached

🧠 WHY DIJKSTRA?
- Grid is weighted: each cell has different cost
- Need shortest path in terms of cost (not steps)
- BFS doesn't work for weighted graphs
- Dijkstra guarantees minimum cost path

💡 KEY INSIGHTS:
- Grid as weighted graph: cells = vertices, moves = edges
- Edge weight = destination cell value
- Lazy deletion: insert duplicates, skip outdated entries
- Early termination: return when destination reached
- 4-directional movement: up, down, left, right
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: Minimum Cost Path

INPUT: grid = [[1, 1000],
               [1, 1000]]

EXPECTED OUTPUT: 1002

🎯 GOAL: Find minimum cost path from (0,0) to (1,1)!

🔍 STEP-BY-STEP PROCESS:

INITIALIZATION:
- dist = [[1, ∞],
          [∞, ∞]]
- Heap: [(0,0,1)]

─────────────────────────────────────────

ITERATION 1:

Extract: (0,0) with cost 1
- currCost (1) == dist[0][0] (1) ✓ (not outdated)
- Not destination yet

Explore neighbors:
- (0,1): newCost = 1000 + 1 = 1001
  dist[0][1] = ∞ > 1001 → Update to 1001
  Insert (0,1,1001) into heap
  
- (1,0): newCost = 1 + 1 = 2
  dist[1][0] = ∞ > 2 → Update to 2
  Insert (1,0,2) into heap

After iteration 1:
  dist = [[1, 1001],
          [2, ∞]]
  Heap: [(0,1,1001), (1,0,2)]

─────────────────────────────────────────

ITERATION 2:

Extract: (1,0) with cost 2 (minimum in heap)
- currCost (2) == dist[1][0] (2) ✓
- Not destination yet

Explore neighbors:
- (0,0): already processed → Skip
- (1,1): newCost = 1000 + 2 = 1002
  dist[1][1] = ∞ > 1002 → Update to 1002
  Insert (1,1,1002) into heap

After iteration 2:
  dist = [[1, 1001],
          [2, 1002]]
  Heap: [(0,1,1001), (1,1,1002)]

─────────────────────────────────────────

ITERATION 3:

Extract: (0,1) with cost 1001
- currCost (1001) == dist[0][1] (1001) ✓
- Not destination yet

Explore neighbors:
- (0,0): already processed → Skip
- (1,1): newCost = 1000 + 1001 = 2001
  dist[1][1] = 1002 < 2001 → No update (already better)

After iteration 3:
  dist = [[1, 1001],
          [2, 1002]]
  Heap: [(1,1,1002)]

─────────────────────────────────────────

ITERATION 4:

Extract: (1,1) with cost 1002
- currCost (1002) == dist[1][1] (1002) ✓
- Destination reached! Return 1002

🏆 FINAL RESULT: 1002
Path: (0,0) → (1,0) → (1,1)
Cost: 1 + 1 + 1000 = 1002

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

GRID AS WEIGHTED GRAPH:

Grid:        Graph Representation:
[1,  1000]   (0,0) --1000--> (0,1)
[1,  1000]    |               |
              |1              |1000
              v               v
            (1,0) --1000--> (1,1)

Edge weights = destination cell values

DIJKSTRA'S PROCESS:

Step 1: Process (0,0), cost = 1
  → Update (0,1): cost = 1001
  → Update (1,0): cost = 2

Step 2: Process (1,0), cost = 2 (minimum)
  → Update (1,1): cost = 1002

Step 3: Process (0,1), cost = 1001
  → (1,1) already has better cost (1002 < 2001)

Step 4: Process (1,1), cost = 1002
  → Destination reached!

─────────────────────────────────────────

📊 DISTANCE ARRAY EVOLUTION:

Initial:
  dist = [[1,   ∞],
          [∞,   ∞]]

After processing (0,0):
  dist = [[1,  1001],
          [2,   ∞]]

After processing (1,0):
  dist = [[1,  1001],
          [2,  1002]]

After processing (0,1):
  dist = [[1,  1001],
          [2,  1002]] (no change)

Final: dist[1][1] = 1002 ✓

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DIJKSTRA'S ALGORITHM:
   - Always processes cell with minimum cost first
   - Guarantees shortest path for non-negative weights
   - Greedy approach: locally optimal → globally optimal
   - Correct for weighted graphs

2️⃣ GRID AS GRAPH:
   - Each cell = vertex
   - Moving to neighbor = edge
   - Edge weight = destination cell value
   - 4-directional movement

3️⃣ LAZY DELETION:
   - Insert duplicates instead of decreaseKey
   - Skip outdated entries when extracting
   - Simpler implementation
   - Slightly more heap operations

4️⃣ EARLY TERMINATION:
   - Return immediately when destination reached
   - Don't need to process all cells
   - Optimization for single-source single-destination

5️⃣ CORRECTNESS:
   - Dijkstra guarantees minimum cost path
   - Non-negative weights (cell values ≥ 1)
   - Optimal solution

💡 KEY INSIGHT:
Using Dijkstra's algorithm on a grid treated as a weighted graph, where each cell
is a vertex and moving to a neighbor is an edge with weight equal to the neighbor's
cell value. Dijkstra always processes the cell with minimum cost first, guaranteeing
the shortest path (minimum cost) from source to destination!
*/

/*✅✅✅ WHY BFS WORKS FOR KNIGHT MOVES BUT NOT FOR MINIMUM COST PATH ✅✅✅

🎯 KEY DIFFERENCE: UNWEIGHTED vs WEIGHTED GRAPH

─────────────────────────────────────────

✅ WHY BFS WORKS FOR KNIGHT MOVES:

Because every move costs exactly the same.

A knight moves from one cell to another with a fixed cost = 1.

✅ No matter which direction
✅ No matter which path
✅ Every step = 1 unit

This means:

All edges have equal weight.

➡️ BFS finds the shortest path in terms of number of steps.
➡️ Shortest steps = minimum cost (because cost per step = 1).

That's why BFS is valid.

─────────────────────────────────────────

❌ WHY BFS DOES NOT WORK FOR THE GRID MINIMUM-COST PROBLEM:

In this problem:

Each step has a different cost → cost = grid[r][c]

Example:

You move into:
cell A → cost 50
cell B → cost 1

These two moves are not equal.

This grid is a weighted graph.

✅ Weighted graph → must use Dijkstra
❌ BFS cannot handle unequal weights

─────────────────────────────────────────

✅ VISUAL COMPARISON:

Here is the difference in one picture:

✅ Knight Problem
Every move → cost 1
Graph = unweighted
BFS works

❌ Minimum-Cost Grid Problem
Move cost = cell value (1 to 500)
Graph = weighted
Dijkstra is required

─────────────────────────────────────────

✅ SMALL EXAMPLE PROVING BFS IS WRONG:

Example grid:

1  1000
1  1000

BFS explores like this:

Start at (0,0):

Neighbors:
- (1,0) cost 1
- (0,1) cost 1000

BUT BFS takes the first found path to (1,1):

Path BFS chooses:
0,0 → 0,1 → 1,1
Cost = 1 + 1000 + 1000 = 2001

Correct minimal path:
0,0 → 1,0 → 1,1
Cost = 1 + 1 + 1000 = 1002

✅ Dijkstra finds 1002
❌ BFS gives 2001 (WRONG)

This shows why BFS fails.

─────────────────────────────────────────

🔍 DETAILED EXPLANATION:

BFS EXPLORATION ORDER (Level by level):

Level 0: (0,0) - cost 1

Level 1: 
  - (0,1) - cost 1001 (via 0,0)
  - (1,0) - cost 2 (via 0,0)

BFS processes level by level. When it reaches (1,1):
  - First path found: (0,0) → (0,1) → (1,1) = 2001
  - BFS marks (1,1) as visited
  - Later path: (0,0) → (1,0) → (1,1) = 1002 (IGNORED!)

BFS doesn't reconsider paths once a cell is visited.

DIJKSTRA EXPLORATION ORDER (Cost by cost):

Step 1: Process (0,0) - cost 1
  → Update (0,1): cost 1001
  → Update (1,0): cost 2

Step 2: Process (1,0) - cost 2 (minimum)
  → Update (1,1): cost 1002 ✓

Step 3: Process (0,1) - cost 1001
  → (1,1) already has better cost (1002 < 2001)

Dijkstra always processes minimum cost first, ensuring optimal path!

─────────────────────────────────────────

📊 COMPARISON TABLE:

┌─────────────────────┬──────────────────┬─────────────────────┐
│ Property            │ Knight Moves     │ Minimum Cost Path   │
├─────────────────────┼──────────────────┼─────────────────────┤
│ Graph Type          │ Unweighted       │ Weighted            │
│ Edge Weight         │ Always 1         │ Varies (1-500)      │
│ Algorithm           │ BFS              │ Dijkstra            │
│ Exploration Order   │ Level by level   │ Cost by cost        │
│ Correctness         │ ✓ Works          │ ✗ BFS fails         │
│ Time Complexity     │ O(N²)            │ O(N² log N)         │
└─────────────────────┴──────────────────┴─────────────────────┘

─────────────────────────────────────────

🎯 FINAL ANSWER:

Knight moves → ✅ BFS works
Because the graph is unweighted.

Minimum cost path in grid → ❌ BFS does not work
Because the graph is weighted.

Therefore you must use Dijkstra.

─────────────────────────────────────────

💡 KEY TAKEAWAY:

When all edges have equal weight → Use BFS
When edges have different weights → Use Dijkstra

This is the fundamental difference!
*/

/*🎯 TIME COMPLEXITY ANALYSIS:
- Grid has N² cells (vertices)
- Each cell processed at most once: O(N²)
- Heap operations (insert/extract): O(log N²) = O(log N) per operation
- Total heap operations: O(N²)
- Total: O(N²) × O(log N) = O(N² log N)
- Optimal for Dijkstra with min-heap

🎯 SPACE COMPLEXITY ANALYSIS:
- dist array: O(N²)
- Min-heap: O(N²) worst case (all cells in heap)
- Total: O(N²)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: Single Cell Grid
Input: grid = [[5]]
Output: 5
Explanation: Source = destination, cost = grid[0][0]

CASE 2: 1×N Grid (Single Row)
Input: grid = [[1, 2, 3, 4]]
Output: 10 (sum of all cells)
Explanation: Must traverse entire row

CASE 3: N×1 Grid (Single Column)
Input: grid = [[1], [2], [3], [4]]
Output: 10 (sum of all cells)
Explanation: Must traverse entire column

CASE 4: All Same Values
Input: grid = [[1, 1], [1, 1]]
Output: 3 (any path has same cost)
Explanation: All paths equivalent

CASE 5: Large Cost Difference
Input: grid = [[1, 1000], [1, 1000]]
Output: 1002
Explanation: Must avoid high-cost cells

🎯 ALGORITHM CORRECTNESS:
- Finds minimum cost path: ✓ (Dijkstra's guarantee)
- Handles weighted graph: ✓
- Processes all reachable cells: ✓
- Correct distance updates: ✓
- Optimal solution: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 128: Initialize source distance
- Line 132: Insert source into heap
- Line 137: Extract minimum cost cell
- Line 142: Skip outdated entries (lazy deletion)
- Line 145: Early termination at destination
- Line 148-161: Explore neighbors and relax edges
- Line 165: Return -1 if unreachable

🎯 DIJKSTRA'S ALGORITHM PROPERTIES:

GREEDY ALGORITHM:
- Always processes cell with minimum cost first
- Locally optimal choice → globally optimal
- Works for non-negative weights
- Guarantees shortest path

LAZY DELETION:
- Insert duplicates instead of decreaseKey
- Skip outdated entries when extracting
- Simpler implementation
- Slightly more heap operations

EARLY TERMINATION:
- Return when destination reached
- Don't need to process all cells
- Optimization for single-source single-destination
- Reduces unnecessary computations

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(N² log N) time complexity
- Guarantees minimum cost path
- Works for weighted graphs
- Early termination optimization
- Handles all grid sizes

🎯 DISADVANTAGES:
- O(N² log N) slower than BFS
- Requires min-heap implementation
- More complex than BFS
- Not optimal for unweighted graphs

🎯 REAL-WORLD APPLICATIONS:
- Pathfinding in games (terrain costs)
- Navigation systems (road costs)
- Resource allocation (cost optimization)
- Network routing (link costs)
- Transportation planning

🎯 RELATED PROBLEMS:
- Knight's minimum steps (unweighted, BFS)
- Number of islands (unweighted, DFS/BFS)
- Shortest path in binary matrix (unweighted, BFS)
- Path with minimum effort (weighted, Dijkstra)
- Cheapest flights within K stops (weighted, Dijkstra variant)

🎯 TESTING STRATEGY:
- Single cell grid
- Single row/column grids
- All same values
- Large cost differences
- Large grids
- Edge cases

🎯 DEBUGGING TIPS:
- Print dist array after each iteration
- Track heap contents
- Verify edge relaxation
- Check boundary conditions
- Monitor cost updates
- Verify lazy deletion works

🎯 COMMON MISTAKES:
- Using BFS instead of Dijkstra
- Not handling lazy deletion
- Wrong edge weight calculation
- Forgetting source cell cost
- Incorrect boundary checks
- Not skipping outdated entries

🎯 BEST PRACTICES:
- Use Dijkstra for weighted graphs
- Implement lazy deletion correctly
- Early termination for optimization
- Clear variable names
- Handle edge cases
- Verify cost calculations

🎯 INTERVIEW TIPS:
- Explain why Dijkstra (not BFS)
- Describe lazy deletion approach
- Walk through example
- Discuss time/space complexity
- Mention early termination
- Compare with BFS

🎯 DIJKSTRA'S ALGORITHM PATTERN:

INITIALIZATION:
  - Initialize dist: all ∞, source = grid[0][0]
  - Insert source into min-heap

MAIN LOOP:
  - Extract minimum cost cell
  - Skip if outdated
  - If destination, return cost
  - Relax edges to neighbors

TERMINATION:
  - Return cost when destination reached
  - Return -1 if unreachable

─────────────────────────────────────────

🎯 GRID AS GRAPH REPRESENTATION:

VERTICES:
- Each cell (r, c) is a vertex
- Total vertices: N²

EDGES:
- Moving to neighbor creates edge
- 4-directional: up, down, left, right
- Edge weight = destination cell value
- Total edges: O(N²) (each cell has ≤ 4 neighbors)

GRAPH TYPE:
- Weighted undirected graph
- Non-negative weights
- Dense graph (each cell connected to neighbors)

─────────────────────────────────────────

🎯 LAZY DELETION EXPLANATION:

WHY LAZY DELETION?
- Simpler than decreaseKey
- No need to track heap positions
- Insert duplicates instead
- Skip outdated entries when extracting

HOW IT WORKS:
- Multiple entries for same cell can exist
- Each entry has different cost
- dist array stores best cost
- Skip if extracted cost > dist[cell]

EXAMPLE:
  Cell (1,1) appears in heap:
  - Entry 1: cost 2001 (outdated)
  - Entry 2: cost 1002 (current)
  
  When extracting:
  - Extract cost 2001 → Skip (2001 > 1002)
  - Extract cost 1002 → Process ✓

─────────────────────────────────────────

🎯 EARLY TERMINATION OPTIMIZATION:

WHY EARLY TERMINATION?
- Single-source single-destination problem
- Don't need all shortest paths
- Return immediately when destination reached
- Reduces unnecessary computations

HOW IT WORKS:
- Check if current cell is destination
- Return cost immediately
- Don't process remaining cells
- Significant optimization for large grids

─────────────────────────────────────────

🎯 COMPARISON WITH OTHER APPROACHES:

DIJKSTRA (This Implementation):
- Time: O(N² log N)
- Space: O(N²)
- Correct for weighted graphs
- Optimal solution

BFS:
- Time: O(N²)
- Space: O(N²)
- Incorrect for weighted graphs
- Wrong answer for this problem

DYNAMIC PROGRAMMING:
- Time: O(N²)
- Space: O(N²)
- Could work but more complex
- Requires careful state definition

─────────────────────────────────────────

🎯 CONCLUSION:
Finding minimum cost path in a grid is efficiently solved using Dijkstra's algorithm,
treating the grid as a weighted graph where each cell is a vertex and moving to a
neighbor is an edge with weight equal to the neighbor's cell value. Dijkstra always
processes the cell with minimum cost first, guaranteeing the shortest path (minimum
cost) from source to destination. This achieves O(N² log N) time and O(N²) space
complexity, making it suitable for weighted grid pathfinding problems. The key
insight is that BFS doesn't work here because the graph is weighted, not unweighted
like in knight moves problems!
*/