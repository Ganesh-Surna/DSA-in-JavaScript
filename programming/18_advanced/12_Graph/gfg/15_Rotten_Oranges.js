/* Problem: ✅✅✅✅ Rotten Oranges (Multi-source BFS) ✅✅✅✅

Given a grid of oranges, where each cell can have one of three values:
- 0: Empty cell
- 1: Fresh orange
- 2: Rotten orange

Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange
becomes rotten. Return the minimum number of minutes that must elapse until no cell
has a fresh orange. If this is impossible, return -1.

Key Requirements:
- Rotten oranges rot adjacent fresh oranges in 4 directions (up, down, left, right)
- All rotten oranges act simultaneously in each minute
- Process continues until no more fresh oranges can be rotted
- Return minimum minutes or -1 if impossible

Example 1:
Input: grid = [[2, 1, 0, 2, 1],
               [1, 0, 1, 2, 1],
               [1, 0, 0, 2, 1]]

Grid:
  2 1 0 2 1
  1 0 1 2 1
  1 0 0 2 1

Output: 2
Explanation:
Minute 0: Initial state (2 = rotten, 1 = fresh)
Minute 1: 
  - (0,0) rots (0,1)
  - (0,3) rots (0,4) and (1,3)
  - (1,3) rots (1,4)
  - (2,3) rots (2,4)
Minute 2:
  - (1,0) rots (2,0)
  - (1,2) rots (1,1) and (2,2)
  - (2,3) rots (2,4) - already done
All fresh oranges are now rotten. Total minutes: 2

Example 2:
Input: grid = [[2, 1, 0, 2, 1],
               [0, 0, 1, 2, 1],
               [1, 0, 0, 2, 1]]

Grid:
  2 1 0 2 1
  0 0 1 2 1
  1 0 0 2 1

Output: -1
Explanation:
- (1,2) is isolated and cannot be reached by any rotten orange
- Impossible to rot all fresh oranges
- Return -1

Constraints:
- 1 ≤ n, m ≤ 10
- grid[i][j] = {0, 1, 2}

Expected Complexities:
Time Complexity: O(n * m) - each cell visited at most once
Auxiliary Space: O(n * m) - for queue
*/

// Multi-source BFS Approach
// ✅ TC = O(n * m) - each cell visited at most once
// ✅ SC = O(n * m) - queue for BFS
function orangesRot(grid) {
    let n = grid.length; // Number of rows
    let m = grid[0].length; // Number of columns
    
    // 4 directions: up, down, left, right
    let directions = [
        [-1, 0],  // up
        [1, 0],   // down
        [0, -1],  // left
        [0, 1],   // right
    ];
    
    let q = []; // Queue for BFS (stores [row, col] of rotten oranges)
    let fresh = 0; // Count of fresh oranges
    
    // Initialize: Find all rotten oranges and count fresh oranges
    for(let i = 0; i < n; i++){
        for(let j = 0; j < m; j++){
            if(grid[i][j] === 2){
                // Add rotten orange to queue (multi-source BFS)
                q.push([i, j]);
            }
            else if(grid[i][j] === 1){
                // Count fresh oranges
                fresh++;
            }
        }
    }
    
    let minutes = 0; // Time elapsed
    
    // BFS: Process level by level (each level = 1 minute)
    while(q.length > 0){
        let size = q.length; // Number of rotten oranges at current level
        let rotted = false; // Track if at least one fresh orange rotted this minute
        
        // Process all rotten oranges at current level simultaneously
        // All rotten oranges rot their adjacent fresh oranges in the same minute
        for(let i = 0; i < size; i++){
            let [r, c] = q.shift(); // Get current rotten orange
            
            // Check all 4 adjacent cells
            for(let [dr, dc] of directions){
                let nr = r + dr; // New row
                let nc = c + dc; // New column
                
                // If neighbor is valid and is a fresh orange
                if(nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] === 1){
                    grid[nr][nc] = 2; // Rot this fresh orange
                    fresh--; // Decrement fresh oranges count
                    q.push([nr, nc]); // Add newly rotten orange to queue
                    rotted = true; // Mark that at least one orange rotted
                }
            }
        }
        
        // If at least one fresh orange rotted this minute, increment time
        if(rotted){
            minutes++;
        }
    }
    
    // If any fresh oranges remain, return -1 (impossible)
    // Otherwise, return minutes elapsed
    return fresh > 0 ? -1 : minutes;
}

// Test cases
let grid1 = [
    [2, 1, 0, 2, 1],
    [1, 0, 1, 2, 1],
    [1, 0, 0, 2, 1]
];
console.log("Test 1:", orangesRot(grid1)); // 2

let grid2 = [
    [2, 1, 0, 2, 1],
    [0, 0, 1, 2, 1],
    [1, 0, 0, 2, 1]
];
console.log("Test 2:", orangesRot(grid2)); // -1 (impossible)

let grid3 = [
    [2, 1, 1],
    [1, 1, 0],
    [0, 1, 1]
];
console.log("Test 3:", orangesRot(grid3)); // 4

let grid4 = [
    [2, 1, 1],
    [0, 1, 1],
    [1, 0, 1]
];
console.log("Test 4:", orangesRot(grid4)); // -1 (impossible)

let grid5 = [[2, 2], [2, 1]];
console.log("Test 5:", orangesRot(grid5)); // 1

let grid6 = [[0, 2]];
console.log("Test 6:", orangesRot(grid6)); // 0 (no fresh oranges)

/*🎯 CORE IDEA: Use multi-source BFS to simulate the rotting process. Start with
all rotten oranges as sources. Process level by level (each level = 1 minute),
where all rotten oranges at the current level simultaneously rot their adjacent
fresh oranges. Track the number of fresh oranges remaining. If any fresh oranges
remain after BFS completes, return -1 (impossible). Otherwise, return the number
of minutes elapsed.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Count fresh oranges
   - Add all rotten oranges to queue (multi-source BFS)
   - Initialize minutes counter to 0

2️⃣ BFS PROCESSING (Level by Level):
   - Process all rotten oranges at current level
   - For each rotten orange:
     - Check 4 adjacent cells
     - If fresh orange found:
       - Rot it (change to 2)
       - Add to queue
       - Decrement fresh count
       - Mark that rotting occurred

3️⃣ TIME TRACKING:
   - After processing each level:
     - If at least one fresh orange rotted, increment minutes
     - Continue to next level

4️⃣ TERMINATION:
   - BFS completes when no more fresh oranges can be rotted
   - Check if any fresh oranges remain
   - Return -1 if impossible, otherwise return minutes

🧠 WHY MULTI-SOURCE BFS?
- Multiple starting points (all rotten oranges)
- Level-by-level processing (each level = 1 minute)
- Simultaneous rotting (all rotten oranges act together)
- Natural BFS property ensures minimum time

💡 KEY INSIGHTS:
- Multi-source BFS (all rotten oranges start simultaneously)
- Level-by-level processing (each level = 1 minute)
- Track fresh oranges count
- Check if all fresh oranges rotted
- Return -1 if impossible (isolated fresh oranges)
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Rotten Oranges

INPUT: grid = [[2, 1, 0, 2, 1],
               [1, 0, 1, 2, 1],
               [1, 0, 0, 2, 1]]

Grid:
  2 1 0 2 1
  1 0 1 2 1
  1 0 0 2 1

EXPECTED OUTPUT: 2

🎯 GOAL: Find minimum minutes to rot all fresh oranges!

🔍 STEP-BY-STEP BFS PROCESS:

INITIALIZATION:
- Scan grid:
  - Rotten oranges (2): (0,0), (0,3), (1,3), (2,3) → Add to queue
  - Fresh oranges (1): Count = 10
- Queue: [(0,0), (0,3), (1,3), (2,3)]
- fresh = 10
- minutes = 0

─────────────────────────────────────────

MINUTE 0 → MINUTE 1:

Process all rotten oranges at level 0 (size = 4):

Process (0,0):
  - Check (0,1): fresh → Rot it, fresh=9, add to queue
  - Check (1,0): fresh → Rot it, fresh=8, add to queue
  - rotted = true

Process (0,3):
  - Check (0,4): fresh → Rot it, fresh=7, add to queue
  - Check (1,3): already rotten → Skip
  - rotted = true

Process (1,3):
  - Check (1,4): fresh → Rot it, fresh=6, add to queue
  - Check (2,3): already rotten → Skip
  - rotted = true

Process (2,3):
  - Check (2,4): fresh → Rot it, fresh=5, add to queue
  - rotted = true

rotted = true → minutes = 1

Queue after minute 1: [(0,1), (1,0), (0,4), (1,4), (2,4)]
fresh = 5

─────────────────────────────────────────

MINUTE 1 → MINUTE 2:

Process all rotten oranges at level 1 (size = 5):

Process (0,1):
  - Check neighbors: all empty or already processed

Process (1,0):
  - Check (2,0): fresh → Rot it, fresh=4, add to queue
  - rotted = true

Process (0,4):
  - Check neighbors: all empty or already processed

Process (1,4):
  - Check neighbors: all empty or already processed

Process (2,4):
  - Check neighbors: all empty or already processed

Process (2,0):
  - Check (1,0): already rotten → Skip
  - Check (2,1): empty → Skip
  - Check (1,2): fresh → Rot it, fresh=3, add to queue
  - rotted = true

Process (1,2):
  - Check (1,1): empty → Skip
  - Check (2,2): fresh → Rot it, fresh=2, add to queue
  - rotted = true

Process (2,2):
  - Check neighbors: all empty or already processed

rotted = true → minutes = 2

Queue after minute 2: []
fresh = 2

Wait, let me recalculate. Actually, after minute 1, we have:
- (0,1), (1,0), (0,4), (1,4), (2,4) newly rotten

After minute 2:
- (1,0) rots (2,0)
- (2,0) rots (1,2) and (2,2)
- All fresh oranges should be rotted

Actually, let me trace more carefully:
After minute 1: fresh = 5 (remaining: (1,0), (1,2), (2,0), (2,2), (2,4)?)
Wait, let me check the grid again.

Actually, the grid after minute 1 should be:
  2 2 0 2 2
  2 0 1 2 2
  1 0 0 2 2

After minute 2:
  2 2 0 2 2
  2 0 2 2 2
  2 0 0 2 2

All fresh oranges are now rotten. Total: 2 minutes.

─────────────────────────────────────────

MINUTE 2 → MINUTE 3:

Queue is empty → BFS complete

Check: fresh = 0 → All fresh oranges rotted

🏆 FINAL RESULT: 2 minutes

─────────────────────────────────────────

📊 EXAMPLE 2: Impossible Case

INPUT: grid = [[2, 1, 0, 2, 1],
               [0, 0, 1, 2, 1],
               [1, 0, 0, 2, 1]]

Grid:
  2 1 0 2 1
  0 0 1 2 1
  1 0 0 2 1

EXPECTED OUTPUT: -1

PROCESS:

INITIALIZATION:
- Rotten oranges: (0,0), (0,3), (1,3), (2,3)
- Fresh oranges: Count = 6
- Queue: [(0,0), (0,3), (1,3), (2,3)]

MINUTE 1:
- (0,0) rots (0,1)
- (0,3) rots (0,4)
- (1,3) rots (1,4)
- (2,3) rots (2,4)

After minute 1:
  2 2 0 2 2
  0 0 1 2 2
  1 0 0 2 2

Fresh remaining: (1,2) and (2,0)

MINUTE 2:
- (2,0) can rot... but (1,2) is isolated!
- (1,2) is surrounded by empty cells and cannot be reached

After minute 2:
  2 2 0 2 2
  0 0 1 2 2
  2 0 0 2 2

Fresh remaining: (1,2) - IMPOSSIBLE TO ROT!

🏆 FINAL RESULT: -1 (impossible)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

MULTI-SOURCE BFS:

Level 0 (minute 0):
  Sources: All rotten oranges (2)
  [2] [1] [0] [2] [1]
  [1] [0] [1] [2] [1]
  [1] [0] [0] [2] [1]

Level 1 (minute 1):
  Process all sources simultaneously
  [2] [2] [0] [2] [2]
  [2] [0] [1] [2] [2]
  [1] [0] [0] [2] [2]

Level 2 (minute 2):
  Process newly rotten oranges
  [2] [2] [0] [2] [2]
  [2] [0] [2] [2] [2]
  [2] [0] [0] [2] [2]

All fresh oranges rotted!

─────────────────────────────────────────

📊 LEVEL-BY-LEVEL PROCESSING:

BFS LEVELS REPRESENT MINUTES:

Level 0: Initial rotten oranges
Level 1: Oranges rotted in minute 1
Level 2: Oranges rotted in minute 2
...

Each level processed before moving to next level.
This ensures minimum time (BFS property).

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ MULTI-SOURCE BFS:
   - All rotten oranges start simultaneously
   - Natural BFS ensures minimum time
   - Level-by-level processing
   - Handles multiple sources correctly

2️⃣ LEVEL REPRESENTS MINUTE:
   - Each BFS level = 1 minute
   - Process all cells at same level together
   - Ensures simultaneous rotting
   - Accurate time tracking

3️⃣ FRESH COUNT TRACKING:
   - Count fresh oranges initially
   - Decrement when orange rots
   - Check if count reaches 0
   - Return -1 if count > 0

4️⃣ GRID MODIFICATION:
   - Mark fresh orange as rotten (2)
   - Prevents revisiting
   - Natural visited tracking
   - Efficient processing

5️⃣ CORRECTNESS:
   - Finds minimum time
   - Handles impossible cases
   - Processes all sources correctly
   - Optimal complexity

💡 KEY INSIGHT:
Using multi-source BFS where all rotten oranges start simultaneously, processing
level by level (each level = 1 minute), where all rotten oranges at the current
level simultaneously rot their adjacent fresh oranges. Tracking the number of fresh
oranges remaining, and returning -1 if any fresh oranges remain after BFS completes.
This achieves O(n * m) time and space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Grid scan: O(n * m)
- BFS traversal: O(n * m) - each cell visited at most once
- Total: O(n * m)
- Optimal for grid traversal

🎯 SPACE COMPLEXITY ANALYSIS:
- Queue: O(n * m) worst case
- Grid modification: O(1) extra space
- Total: O(n * m)
- Linear in grid size

🎯 EDGE CASES:

CASE 1: No Fresh Oranges
Input: [[0, 2], [2, 0]]
Process: No fresh oranges, minutes = 0
Output: 0

CASE 2: All Rotten
Input: [[2, 2], [2, 2]]
Process: No fresh oranges, minutes = 0
Output: 0

CASE 3: All Fresh (Impossible)
Input: [[1, 1], [1, 1]]
Process: No rotten oranges to start, fresh = 4
Output: -1

CASE 4: Single Fresh Orange
Input: [[2, 1]]
Process: Minute 1: (2,0) rots (0,1)
Output: 1

CASE 5: Isolated Fresh Orange
Input: [[2, 0, 1], [0, 0, 0], [1, 0, 2]]
Process: (2,0) and (2,2) cannot reach (0,2)
Output: -1

CASE 6: Chain of Fresh Oranges
Input: [[2, 1, 1, 1, 1]]
Process: Minute 1: rots (0,1), Minute 2: rots (0,2), etc.
Output: 4

🎯 ALGORITHM CORRECTNESS:
- Finds minimum time: ✓ (BFS property)
- Handles multiple sources: ✓
- Processes simultaneously: ✓
- Detects impossible cases: ✓
- Optimal complexity: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 86-97: Initialize queue and count fresh oranges
- Line 102-130: Level-by-level BFS processing
- Line 103: Get current level size
- Line 104: Track if rotting occurred
- Line 108-124: Process all rotten oranges at current level
- Line 127-129: Increment minutes if rotting occurred
- Line 134: Return -1 if impossible, otherwise minutes

🎯 MULTI-SOURCE BFS PATTERN:

STANDARD BFS:
- Single source
- Level-by-level processing
- Distance from source

MULTI-SOURCE BFS:
- Multiple sources
- All sources start at level 0
- Process all sources at same level
- Minimum distance from nearest source

APPLICATION:
- Rotten oranges (multiple starting points)
- Distance of nearest cell (multi-source)
- Flood fill from multiple points
- Wave propagation from multiple sources

─────────────────────────────────────────

🎯 SIMULTANEOUS PROCESSING:

KEY CONCEPT:
All rotten oranges at the same level rot their neighbors
simultaneously in the same minute.

Example:
  Level 0: [A, B, C] (3 rotten oranges)
  Process A, B, C together
  All fresh neighbors of A, B, C rot in same minute
  New level: [D, E, F] (newly rotten)

This ensures:
- Correct time tracking
- Simultaneous rotting
- Minimum time guarantee

─────────────────────────────────────────

🎯 ADVANTAGES:
- O(n * m) time complexity
- Simple multi-source BFS
- Handles multiple sources correctly
- Natural time tracking
- Detects impossible cases

🎯 DISADVANTAGES:
- Modifies input grid
- O(n * m) space for queue
- Requires level-by-level processing
- Cannot reuse grid without reset

🎯 REAL-WORLD APPLICATIONS:
- Disease spread simulation
- Fire spread modeling
- Information propagation
- Network broadcast
- Contagion spread

🎯 RELATED PROBLEMS:
- Distance of Nearest Cell Having 1 (multi-source BFS)
- Number of Islands (connected components)
- Walls and Gates (multi-source BFS)
- Shortest Path in Binary Matrix
- Flood fill

🎯 TESTING STRATEGY:
- No fresh oranges
- All rotten
- All fresh (impossible)
- Single fresh orange
- Isolated fresh oranges
- Chain of fresh oranges
- Multiple sources

🎯 DEBUGGING TIPS:
- Print grid after each minute
- Track fresh count
- Verify level-by-level processing
- Check boundary conditions
- Monitor queue size

🎯 COMMON MISTAKES:
- Not processing level by level
- Forgetting to track fresh count
- Not checking impossible case
- Wrong direction array
- Not incrementing minutes correctly

🎯 BEST PRACTICES:
- Process level by level
- Track fresh oranges count
- Check impossible case
- Use clear direction array
- Handle edge cases

🎯 INTERVIEW TIPS:
- Explain multi-source BFS
- Describe level-by-level processing
- Walk through example
- Discuss time/space complexity
- Mention simultaneous processing

🎯 MULTI-SOURCE BFS PATTERN:

INITIALIZATION:
  - Find all sources
  - Add all sources to queue
  - Initialize tracking variables

PROCESSING:
  - Process level by level
  - Get current level size
  - Process all nodes at current level
  - Add next level nodes to queue

TERMINATION:
  - Queue becomes empty
  - Check final state
  - Return result

─────────────────────────────────────────

🎯 CONCLUSION:
Finding the minimum time to rot all fresh oranges using multi-source BFS, where
all rotten oranges start simultaneously and process level by level (each level =
1 minute), ensuring all rotten oranges at the current level simultaneously rot
their adjacent fresh oranges. Tracking the number of fresh oranges remaining and
returning -1 if any fresh oranges remain after BFS completes. This achieves O(n * m)
time and space complexity, making it optimal for the rotten oranges problem!
*/