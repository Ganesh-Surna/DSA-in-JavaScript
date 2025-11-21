/* Problem: ✅✅✅✅ Egg Dropping Puzzle (DP Tabulation) ✅✅✅✅

Given `eggs` eggs and `floors` floors, find the minimum number of attempts
needed in the worst case to determine the critical floor (the highest floor
from which an egg can be dropped without breaking).

Rules:
- If an egg breaks when dropped from floor x, it will break from all floors above x.
- If an egg doesn't break when dropped from floor x, it won't break from all floors below x.
- We need to find the critical floor in the minimum number of attempts (worst case).

🎯 Goal: Find minimum attempts needed in the worst case to find the critical floor.

Example 1:
Input: eggs = 1, floors = 10
Output: 10
Explanation: With only 1 egg, we must test floor by floor from bottom to top.
  Worst case: Critical floor is at top (floor 10), so we need 10 attempts.

Example 2:
Input: eggs = 2, floors = 10
Output: 4
Explanation: With 2 eggs, we can use binary search strategy.
  Optimal strategy: Start from floor 4, then adjust based on result.
  Worst case: 4 attempts needed.

Example 3:
Input: eggs = 2, floors = 6
Output: 3
Explanation: 
  Strategy: Drop from floor 3 first
  - If breaks: Test floors 1, 2 (2 more attempts) → Total 3
  - If doesn't break: Test floor 5, then 6 (2 more attempts) → Total 3
  Worst case: 3 attempts

Constraints:
- 1 ≤ eggs ≤ 100
- 1 ≤ floors ≤ 100

Expected Complexities:
Time Complexity: O(eggs × floors²) - trying all floors for each egg/floor combination
Space Complexity: O(eggs × floors) for the DP table

⚠️ Note: This file contains three solutions:
1. eggDroppingDP: Standard DP with O(eggs × floors²) time
2. eggDroppingDP_BS: DP with binary search optimization O(eggs × floors × log(floors))
3. eggDroppingSuperOptimized: Space-optimized version with O(eggs × moves) time

🧠 Core Idea:
- Use dynamic programming to build solution bottom-up
- dp[i][j] = minimum attempts needed with i eggs and j floors (worst case)
- For each floor x, try dropping an egg:
  - If egg breaks: We have i-1 eggs and x-1 floors below to test
  - If egg doesn't break: We have i eggs and j-x floors above to test
- Take maximum of both cases (worst case scenario)
- Take minimum over all possible floors x (optimal strategy)

📈 Recurrence Relation:
  Base cases:
      dp[i][0] = 0  // No floors, no attempts needed
      dp[i][1] = 1  // One floor, one attempt needed
      dp[1][j] = j  // One egg, must test floor by floor
  
  For i eggs and j floors, try dropping from each floor x (1 to j):
      breaks = dp[i-1][x-1]      // Egg breaks: test floors below x
      notBreaks = dp[i][j-x]     // Egg doesn't break: test floors above x
      attempts = 1 + max(breaks, notBreaks)  // Worst case + 1 attempt
      dp[i][j] = min(attempts over all x)    // Optimal strategy
  
  Answer = dp[eggs][floors]

Base Cases:
- dp[i][0] = 0 (no floors, no attempts)
- dp[i][1] = 1 (one floor, one attempt)
- dp[1][j] = j (one egg, must test floor by floor)

🎯 Why This Approach?
- Optimal substructure: Minimum attempts for i eggs and j floors depends on
  minimum attempts for smaller subproblems.
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution from smaller to larger problems.
- Guarantees optimal solution by trying all possible floors.

💡 Key Insights:
- dp[i][j] = minimum attempts with i eggs and j floors (worst case)
- Try all possible floors x to drop the egg from
- Two outcomes: egg breaks or doesn't break
- Take maximum (worst case) of both outcomes
- Take minimum (optimal strategy) over all floors

⚠️ WHY Math.max(breaks, notBreaks)?

This is CRITICAL to understand:

We use Math.max because we need to handle the WORST CASE scenario.

When we drop an egg from floor x:
- If egg breaks: We need dp[i-1][x-1] attempts for floors below
- If egg doesn't break: We need dp[i][j-x] attempts for floors above

We don't know which will happen, so we must prepare for the WORST case.
The worst case is the scenario that requires MORE attempts.

Example: eggs=2, floors=10, drop from floor 4
- If breaks: Need dp[1][3] = 3 attempts (test floors 1,2,3)
- If doesn't break: Need dp[2][6] = 3 attempts (test floors 5-10)
- Worst case: max(3, 3) = 3 attempts needed

We use Math.max to ensure we can handle whichever outcome requires more attempts.
This guarantees we find the critical floor even in the worst case.

Then we use Math.min over all floors x to find the optimal starting floor.

⭐ WHY +1?

The +1 represents the CURRENT DROP we're making.

Formula: 1 (current drop) + worst case of remaining drops

When we drop an egg from floor x:
- We use 1 attempt for this drop
- Then we need additional attempts based on the outcome:
  - If breaks: dp[i-1][x-1] more attempts needed
  - If doesn't break: dp[i][j-x] more attempts needed
- Total = 1 (this drop) + max(remaining attempts)

Example: eggs=2, floors=10, drop from floor 4
- Current drop: 1 attempt
- If breaks: Need 3 more attempts → Total = 1 + 3 = 4
- If doesn't break: Need 3 more attempts → Total = 1 + 3 = 4
- Worst case: 1 + max(3, 3) = 4 attempts
*/

// ✅ TC = O(eggs × floors²) - trying all floors for each egg/floor combination
// ✅ SC = O(eggs × floors) for 2D DP table
function eggDroppingDP(eggs, floors){
    let e = eggs
    let f = floors
    
    // Initialize DP table: dp[i][j] = min attempts with i eggs and j floors (worst case)
    let dp = new Array(e+1)
    for(let i=0; i<e+1; i++){
        dp[i] = new Array(f+1).fill(Infinity)
    }
    
    // Base Cases:
    
    // 1. dp[i][0] = 0: No floors, no attempts needed
    // 2. dp[i][1] = 1: One floor, one attempt needed
    for(let i=0; i<e+1; i++){
        dp[i][0] = 0  // f=0: no floors
        dp[i][1] = 1  // f=1: one floor, one attempt
    }
    
    // 3. dp[1][j] = j: One egg, must test floor by floor from bottom to top
    for(let j=1; j<f+1; j++){
        dp[1][j] = j  // e=1: one egg, worst case is j attempts
    }
    
    // Build DP table: for each number of eggs and floors
    for(let i=2; i<e+1; i++){  // i = number of eggs (start from 2)
        for(let j=2; j<f+1; j++){  // j = number of floors (start from 2)
            // Try dropping egg from each floor x (1 to j)
            for(let x=1; x<=j; x++){
                // Option 1: Egg breaks when dropped from floor x
                // We have i-1 eggs left and x-1 floors below to test
                let breaks = dp[i-1][x-1]
                
                // Option 2: Egg doesn't break when dropped from floor x
                // We have i eggs left and j-x floors above to test
                let notBreaks = dp[i][j-x]
                
                /* ⚠️ WHY Math.max(breaks, notBreaks)?
                    We need to handle the WORST CASE scenario.
                    We don't know if the egg will break or not, so we must prepare
                    for whichever outcome requires MORE attempts.
                    Math.max ensures we can handle the worst case.
                    Then Math.min finds the optimal floor x that minimizes worst case.
                */
                /* ⭐Why +1 ?
                     --> 1 (current drop) + worst case of remaining drops 
                */
                dp[i][j] = Math.min(dp[i][j], 1 + Math.max(breaks, notBreaks))
            }
        }
    }
    
    // dp[e][f] contains minimum attempts with e eggs and f floors (worst case)
    return dp[e][f]
}

console.log(eggDroppingDP(1, 10)); // 10
console.log(eggDroppingDP(2, 10)); // 4




/* ⚡ OPTIMIZED VERSION: DP with Binary Search ⚡

This version optimizes the inner loop using binary search instead of trying
all floors linearly. The key insight is that the function
f(x) = max(dp[i-1][x-1], dp[i][j-x]) is unimodal (first decreases, then increases).

Time Complexity: O(eggs × floors × log(floors)) - binary search reduces inner loop
Space Complexity: O(eggs × floors) for the DP table

Why Binary Search Works:
- When breaks > notBreaks: We need fewer attempts if we go down (lower floor)
- When breaks < notBreaks: We need fewer attempts if we go up (higher floor)
- Binary search finds the optimal floor x that minimizes max(breaks, notBreaks)
*/

// ✅ TC = O(eggs × floors × log(floors)) - binary search optimization
// ✅ SC = O(eggs × floors) for 2D DP table
function eggDroppingDP_BS(eggs, floors) {
    const e = eggs, f = floors;

    // Initialize DP table: dp[i][j] = min attempts with i eggs and j floors (worst case)
    const dp = Array.from({ length: e + 1 }, () => Array(f + 1).fill(0));

    // Base cases
    for (let i = 1; i <= e; i++) {
        dp[i][0] = 0;  // No floors, no attempts
        dp[i][1] = 1;  // One floor, one attempt
    }
    for (let j = 1; j <= f; j++) {
        dp[1][j] = j;  // One egg, must test floor by floor
    }

    // DP with binary search optimization
    for (let i = 2; i <= e; i++) {  // i = number of eggs (start from 2)
        for (let j = 2; j <= f; j++) {  // j = number of floors (start from 2)
            
            // Binary search to find optimal floor x
            let low = 1, high = j;
            let best = Infinity;

            while (low <= high) {
                let mid = Math.floor((low + high) / 2);

                // Calculate attempts for both outcomes
                let breaks = dp[i - 1][mid - 1];     // Egg breaks: test floors below
                let notBreaks = dp[i][j - mid];      // Egg doesn't break: test floors above
                
                // ⚠️ WHY Math.max(breaks, notBreaks)?
                // Same reason as above: we need to handle the WORST CASE scenario.
                // We don't know if the egg will break, so we prepare for the worst.
                let worst = 1 + Math.max(breaks, notBreaks);

                best = Math.min(best, worst);

                // Binary search: Move toward the side that reduces worst case
                // If breaks > notBreaks: Going down (lower floor) reduces worst case
                // If breaks < notBreaks: Going up (higher floor) reduces worst case
                if (breaks > notBreaks) {
                    high = mid - 1;      // Go down (try lower floor)
                } else {
                    low = mid + 1;       // Go up (try higher floor)
                }
            }

            dp[i][j] = best;
        }
    }

    return dp[e][f];
}



/* ⚡⚡ SUPER OPTIMIZED VERSION: Space-Optimized DP ⚡⚡

This version uses a completely different approach:
- Instead of dp[i][j] = min attempts with i eggs and j floors
- We use dp[e] = max floors we can test with e eggs in 'moves' attempts
- We increment moves until dp[eggs] >= floors

Time Complexity: O(eggs × moves) where moves is the answer
Space Complexity: O(eggs) - only 1D array instead of 2D!

Key Insight:
The recurrence relation is: dp[e] = dp[e] + dp[e-1] + 1
- dp[e]: Floors we can test with e eggs (from previous move)
- dp[e-1]: Floors we can test with e-1 eggs (if egg breaks)
- +1: Current floor we're testing
- Total: Floors we can test with e eggs in current move

This is the inverse problem: instead of "min attempts for given floors",
we compute "max floors for given attempts".
*/

function eggDroppingSuperOptimized(eggs, floors) {
    if (floors === 0 || floors === 1) return floors;
    if (eggs === 1) return floors;

    const dp = Array(eggs + 1).fill(0);

    let moves = 0;

    while (dp[eggs] < floors) {
        moves++;

        for (let e = eggs; e >= 1; e--) {
            dp[e] = dp[e] + dp[e - 1] + 1;
        }
    }

    return moves;
}

/*🎯 STEP-BY-STEP WALKTHROUGH (eggs = 2, floors = 10)

We'll build a DP table where dp[i][j] represents the minimum attempts needed
with i eggs and j floors in the worst case.

Initialization:
eggs = 2, floors = 10

Step 1: Initialize Base Cases

Base case 1: dp[i][0] = 0 (no floors, no attempts)
Base case 2: dp[i][1] = 1 (one floor, one attempt)
Base case 3: dp[1][j] = j (one egg, must test floor by floor)

DP table after base cases:
dp = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // i=0 (no eggs, not used)
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // i=1 (one egg)
  [0, 1, ?, ?, ?, ?, ?, ?, ?, ?, ?]   // i=2 (two eggs)
]
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  (floors)

Step 2: Compute dp[2][2] (2 eggs, 2 floors)

Try dropping from floor x = 1:
  breaks = dp[1][0] = 0 (egg breaks, test 0 floors below)
  notBreaks = dp[2][1] = 1 (egg doesn't break, test 1 floor above)
  attempts = 1 + max(0, 1) = 1 + 1 = 2

Try dropping from floor x = 2:
  breaks = dp[1][1] = 1 (egg breaks, test 1 floor below)
  notBreaks = dp[2][0] = 0 (egg doesn't break, test 0 floors above)
  attempts = 1 + max(1, 0) = 1 + 1 = 2

dp[2][2] = min(2, 2) = 2

Step 3: Compute dp[2][3] (2 eggs, 3 floors)

Try x = 1:
  breaks = dp[1][0] = 0
  notBreaks = dp[2][2] = 2
  attempts = 1 + max(0, 2) = 3

Try x = 2:
  breaks = dp[1][1] = 1
  notBreaks = dp[2][1] = 1
  attempts = 1 + max(1, 1) = 2

Try x = 3:
  breaks = dp[1][2] = 2
  notBreaks = dp[2][0] = 0
  attempts = 1 + max(2, 0) = 3

dp[2][3] = min(3, 2, 3) = 2

Continue this process...

Final result: dp[2][10] = 4

✅ Minimum attempts with 2 eggs and 10 floors = 4 (worst case)

─────────────────────────────────────────

📊 UNDERSTANDING WHY Math.max IS USED:

Key Concept: Worst Case Scenario
- We don't know if the egg will break or not
- We must prepare for the WORST possible outcome
- Worst case = whichever outcome requires MORE attempts

Example: eggs=2, floors=10, drop from floor 4
- If breaks: Need dp[1][3] = 3 attempts (test floors 1,2,3)
- If doesn't break: Need dp[2][6] = 3 attempts (test floors 5-10)
- Worst case: max(3, 3) = 3 attempts

We use Math.max because:
1. We need to guarantee we can find the critical floor
2. We don't control whether the egg breaks
3. We must handle the worst possible scenario
4. Math.max ensures we have enough attempts for worst case

Then Math.min finds the optimal floor x that minimizes this worst case.

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- Outer loop: eggs iterations (2 to e)
- Middle loop: floors iterations (2 to f)
- Inner loop: floors iterations (1 to j) - trying all floors
- Each iteration: O(1) operations
- Total: O(eggs × floors²)

🎯 SPACE COMPLEXITY ANALYSIS:
- DP table: O(eggs × floors)
- No additional space needed
- Total: O(eggs × floors)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: One Egg
Input: eggs = 1, floors = 10
dp[1][10] = 10 ✓ (must test floor by floor)

CASE 2: One Floor
Input: eggs = 2, floors = 1
dp[2][1] = 1 ✓ (one attempt needed)

CASE 3: No Floors
Input: eggs = 2, floors = 0
dp[2][0] = 0 ✓ (no attempts needed)

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Minimum attempts for i eggs and j floors depends on minimum attempts
     for smaller subproblems (fewer eggs or floors)
   - Optimal solution contains optimal solutions to subproblems

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ WORST CASE HANDLING:
   - Math.max ensures we handle worst case scenario
   - Math.min finds optimal strategy
   - Guarantees we can find critical floor

4️⃣ CORRECTNESS:
   - Base cases handle edge cases correctly
   - All possible floors are tried
   - Optimal floor is selected

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible floors: ✓
- Handles both outcomes (breaks/doesn't break): ✓
- Takes maximum for worst case: ✓
- Takes minimum for optimal strategy: ✓
- Base cases are correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 10-13: Initialize DP table
  - Create 2D array of size (eggs+1) × (floors+1)
  - Fill with Infinity (for finding minimum)

Line 19-22: Set base cases (no floors, one floor)
  - dp[i][0] = 0 for all i
  - dp[i][1] = 1 for all i

Line 25-27: Set base case (one egg)
  - dp[1][j] = j for all j

Line 30-55: Build DP table
  - For each i from 2 to e (eggs)
  - For each j from 2 to f (floors)
  - Try all floors x from 1 to j
  - Compute breaks and notBreaks
  - Take max (worst case) and min (optimal)

Line 58: Return result
  - dp[e][f] contains minimum attempts

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Building safety testing
- Quality assurance testing
- System reliability testing
- Resource optimization
- Risk management

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Egg Dropping Puzzle (this problem)
- Super Egg Drop
- Two Egg Problem
- N Egg Problem

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ WORST CASE SCENARIO:
   - We use Math.max to handle worst case
   - We don't know if egg will break
   - We must prepare for worst outcome

2️⃣ OPTIMAL STRATEGY:
   - We use Math.min to find optimal floor
   - Try all possible floors
   - Select floor that minimizes worst case

3️⃣ BASE CASES:
   - No floors: 0 attempts
   - One floor: 1 attempt
   - One egg: floor-by-floor testing

4️⃣ DP STRUCTURE:
   - dp[i][j] = min attempts with i eggs and j floors
   - Build from smaller to larger problems
   - Use previously computed values

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `eggs` / `e`: Number of eggs available
- `floors` / `f`: Number of floors
- `dp[i][j]`: Minimum attempts with i eggs and j floors (worst case)
- `x`: Floor we're trying to drop egg from
- `breaks`: Attempts needed if egg breaks (test floors below)
- `notBreaks`: Attempts needed if egg doesn't break (test floors above)

─────────────────────────────────────────

🎯 CONCLUSION:
Egg Dropping Puzzle using DP Tabulation efficiently finds the minimum attempts
needed in the worst case by building a DP table bottom-up, trying all possible
floors, handling both outcomes (breaks/doesn't break), using Math.max for worst
case scenario, and Math.min for optimal strategy. This achieves O(eggs × floors²)
time complexity. The binary search optimized version reduces this to
O(eggs × floors × log(floors)) for better performance on large inputs!
*/

