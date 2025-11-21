/* Problem: ✅✅✅✅ Minimum Jumps to Reach End (DP Tabulation) ✅✅✅✅

Given an array `arr` where each element `arr[i]` represents the maximum number
of steps you can jump forward from index `i`, find the minimum number of jumps
needed to reach the last index (index n-1) starting from index 0. Return
Infinity if it's not possible to reach the end.

🎯 Goal: Find the minimum number of jumps needed to reach the last index.

Example 1:
Input: arr = [3, 4, 2, 1, 2, 1]
Output: 2
Explanation: Minimum jumps needed is 2:
  - Jump 1: index 0 → index 1 (jumped 1 step, can jump 1/2/3 steps from index 0)
  - Jump 2: index 1 → index 5 (jumped 4 steps, can jump 1/2/3/4 steps from index 1)
  - Total: 2 jumps

Example 2:
Input: arr = [2, 1, 3, 2, 3, 4, 5, 1, 2, 8]
Output: 3
Explanation: Minimum jumps needed is 3:
  - Jump 1: index 0 → index 2 (jumped 2 steps, can jump 1/2 steps from index 0)
  - Jump 2: index 2 → index 5 (jumped 3 steps, can jump 1/2/3 steps from index 2)
  - Jump 3: index 5 → index 9 (jumped 4 steps, can jump 1/2/3/4/5 steps from index 5)
  - Total: 3 jumps

Example 3:
Input: arr = [0, 1, 2]
Output: Infinity
Explanation: Cannot reach the end - stuck at index 0 (can't jump from index 0)

Constraints:
- 1 ≤ arr.length ≤ 10^4
- 0 ≤ arr[i] ≤ 10^5

Expected Complexities:
Time Complexity: 
  - minJumps: O(n²) where n = array length
  - minJumps2: O(n) where n = array length (greedy approach)
Space Complexity:
  - minJumps: O(n) for DP array
  - minJumps2: O(1) constant space (greedy approach)

⚠️ Note: This is the optimized DP Tabulation solution. For the plain recursive
approach with exponential time complexity, see 01_plain_recursion.js.

🧠 Core Idea (DP Tabulation):
- Use dynamic programming to build solution bottom-up
- dp[i] = minimum jumps needed to reach index i
- For each index i, check all previous indices j that can reach i
- If j + arr[j] >= i, we can jump from j to i
- Update dp[i] = min(dp[i], dp[j] + 1)
- Base case: dp[0] = 0 (0 jumps to reach starting position)

🧠 Core Idea (Greedy Approach):
- Track the farthest we can reach with current jumps
- Track remaining steps in current jump window
- When steps run out, make a new jump
- Update maxReach as we traverse
- More efficient: O(n) time, O(1) space

📈 Recurrence Relation (DP Tabulation):
  dp[0] = 0  // Base case: 0 jumps to reach starting position
  
  For each i from 1 to n-1:
      dp[i] = Infinity  // Initialize as impossible
      
      For each j from 0 to i-1:
          if j + arr[j] >= i:  // Can reach i from j
              dp[i] = min(dp[i], dp[j] + 1)  // Update with min jumps
  
  Answer = dp[n-1]

Base Cases:
- dp[0] = 0 (0 jumps to reach starting position)

🎯 Why This Approach?
- Optimal substructure: Minimum jumps to reach i depends on minimum jumps
  to reach positions that can jump to i.
- Overlapping subproblems: Avoids recalculating the same subproblems.
- Tabulation builds solution iteratively from start to end.
- Guarantees optimal solution by checking all positions that can reach i.

💡 Key Insights:
- dp[i] = minimum jumps to reach index i
- Check all previous positions j that can reach i
- Update with minimum jumps found
- Greedy approach: Track maxReach and steps for O(n) solution
*/

// ✅ TC = O(n²) where n = array length
// ✅ SC = O(n) for DP array
function minJumps(arr) {
    let n = arr.length;

    // Initialize DP array: dp[i] = min jumps to reach index i
    let dp = new Array(n).fill(Infinity);
    dp[0] = 0;  // start at index 0 with 0 jumps

    // Build DP table: for each index i, find min jumps to reach it
    for (let i = 1; i < n; i++) {
        // Check all previous positions j that can reach i
        for (let j = 0; j < i; j++) {
            // Check if j can reach i
            if (j + arr[j] >= i) {
                // Update dp[i] with minimum jumps: jumps to reach j + 1 (jump from j to i)
                dp[i] = Math.min(dp[i], dp[j] + 1);
            }
        }
    }

    return dp[n - 1];
}

/*─────────────────────────────────────────────────────────────────────────────
🎯 GREEDY IMPLEMENTATION: minJumps2 (O(n) Time, O(1) Space)

This is a greedy approach that achieves O(n) time and O(1) space complexity.
The key insight is to track:
- `jumps`: Number of jumps made so far
- `maxReach`: Farthest index we can reach with current jumps
- `steps`: Remaining steps in the current jump window

How it works:
1. Start with first jump from index 0
2. As we traverse, update maxReach (farthest we can reach)
3. Decrement steps (using steps to move forward)
4. When steps run out, make a new jump
5. Reset steps to maxReach - current position

This is more efficient than DP but requires careful tracking of jump windows.

Key Differences from DP:
1. Time: O(n) vs O(n²) - much faster
2. Space: O(1) vs O(n) - constant space
3. Approach: Greedy (track jump windows) vs DP (check all positions)
4. Complexity: More complex logic but better performance
─────────────────────────────────────────────────────────────────────────────*/

// ✅ TC = O(n) where n = array length
// ✅ SC = O(1) constant space
function minJumps2(arr) {
    let n = arr.length;

    // If array has 1 element, already at destination
    if (n <= 1) return 0;

    // If the first element is 0, we can't move forward
    if (arr[0] === 0) return Infinity;

    // Initialize
    let jumps = 1;           // We make the first jump from index 0
    let maxReach = arr[0];   // Farthest we can reach initially (from index 0)
    let steps = arr[0];      // Steps possible in the current jump window

    for (let i = 1; i < n; i++) {

        // Reached the end
        if (i === n - 1) return jumps;

        // Update max reach: farthest we can reach from current position
        maxReach = Math.max(maxReach, i + arr[i]);

        // Use one step to move forward
        steps--;

        // If no steps left, we need a new jump
        if (steps === 0) {
            jumps++;

            // If we cannot move further (stuck)
            if (i >= maxReach) return Infinity;

            // Reset steps for the new jump window
            // Steps = how far we can reach - current position
            steps = maxReach - i;
        }
    }

    return jumps;
}

console.log(minJumps([3, 4, 2, 1, 2, 1])) // 2 
// Jump 1: index 0 to index 1 (jumped 1 step. coz we can jump 1/2/3 steps from index 0)
// Jump 2: index 1 to index 5 (jumped 4 steps. coz we can jump 1/2/3/4 steps from index 1)

console.log(minJumps([2, 1, 3, 2, 3, 4, 5, 1, 2, 8])) // 3 
// Jump 1: index 0 to index 2 (jumped 2 steps. coz we can jump 1/2 steps from index 0)
// Jump 2: index 2 to index 5 (jumped 3 steps. coz we can jump 1/2/3 steps from index 2)
// Jump 3: index 5 to index 9 (jumped 4 steps. coz we can jump 1/2/3/4/5 steps from index 5)

console.log(minJumps([4, 1, 5, 8, 6, 1, 2, 7, 9, 6])) // 2
// Jump 1: index 0 to index 4 (jumped 4 steps. coz we can jump [1 to 4] steps from index 0)
// Jump 2: index 4 to index 9 (jumped 5 steps. coz we can jump [1 to 6] steps from index 4)

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [3, 4, 2, 1, 2, 1])

DP Tabulation Approach (minJumps):

We'll build a DP table where dp[i] represents the minimum number of jumps
needed to reach index i.

Initialization:
n = 6

Initialize DP array:
dp = [0, ∞, ∞, ∞, ∞, ∞]
      [0,  1,  2,  3,  4,  5]  (indices)

Base case:
dp[0] = 0  // 0 jumps to reach starting position

Processing:

i=1: Find min jumps to reach index 1
  Check j from 0 to 0:
    j=0: arr[0]=3, can reach 0+3=3, and 3 >= 1? Yes!
    dp[1] = min(∞, dp[0] + 1) = min(∞, 0 + 1) = 1

dp = [0, 1, ∞, ∞, ∞, ∞]

i=2: Find min jumps to reach index 2
  Check j from 0 to 1:
    j=0: arr[0]=3, can reach 0+3=3, and 3 >= 2? Yes!
    dp[2] = min(∞, dp[0] + 1) = min(∞, 0 + 1) = 1
    j=1: arr[1]=4, can reach 1+4=5, and 5 >= 2? Yes!
    dp[2] = min(1, dp[1] + 1) = min(1, 1 + 1) = 1

dp = [0, 1, 1, ∞, ∞, ∞]

i=3: Find min jumps to reach index 3
  Check j from 0 to 2:
    j=0: arr[0]=3, can reach 0+3=3, and 3 >= 3? Yes!
    dp[3] = min(∞, dp[0] + 1) = 1
    j=1: arr[1]=4, can reach 1+4=5, and 5 >= 3? Yes!
    dp[3] = min(1, dp[1] + 1) = min(1, 2) = 1
    j=2: arr[2]=2, can reach 2+2=4, and 4 >= 3? Yes!
    dp[3] = min(1, dp[2] + 1) = min(1, 2) = 1

dp = [0, 1, 1, 1, ∞, ∞]

i=4: Find min jumps to reach index 4
  Check j from 0 to 3:
    j=0: arr[0]=3, can reach 0+3=3, but 3 < 4, so skip
    j=1: arr[1]=4, can reach 1+4=5, and 5 >= 4? Yes!
    dp[4] = min(∞, dp[1] + 1) = 2
    j=2: arr[2]=2, can reach 2+2=4, and 4 >= 4? Yes!
    dp[4] = min(2, dp[2] + 1) = min(2, 2) = 2
    j=3: arr[3]=1, can reach 3+1=4, and 4 >= 4? Yes!
    dp[4] = min(2, dp[3] + 1) = min(2, 2) = 2

dp = [0, 1, 1, 1, 2, ∞]

i=5: Find min jumps to reach index 5 (end)
  Check j from 0 to 4:
    j=0: arr[0]=3, can reach 0+3=3, but 3 < 5, so skip
    j=1: arr[1]=4, can reach 1+4=5, and 5 >= 5? Yes!
    dp[5] = min(∞, dp[1] + 1) = 2
    j=2: arr[2]=2, can reach 2+2=4, but 4 < 5, so skip
    j=3: arr[3]=1, can reach 3+1=4, but 4 < 5, so skip
    j=4: arr[4]=2, can reach 4+2=6, and 6 >= 5? Yes!
    dp[5] = min(2, dp[4] + 1) = min(2, 3) = 2

Final DP array:
dp = [0, 1, 1, 1, 2, 2]

🏆 Result: dp[5] = 2

✅ Minimum jumps needed = 2 (index 0 → index 1 → index 5)

─────────────────────────────────────────

Greedy Approach Walkthrough (minJumps2):

arr = [3, 4, 2, 1, 2, 1], n = 6

Initialization:
jumps = 1, maxReach = 3, steps = 3

i=1:
  maxReach = max(3, 1+4) = max(3, 5) = 5
  steps = 3 - 1 = 2
  steps > 0, continue

i=2:
  maxReach = max(5, 2+2) = max(5, 4) = 5
  steps = 2 - 1 = 1
  steps > 0, continue

i=3:
  maxReach = max(5, 3+1) = max(5, 4) = 5
  steps = 1 - 1 = 0
  steps === 0, need new jump
  jumps = 1 + 1 = 2
  i=3 < maxReach=5, can continue
  steps = maxReach - i = 5 - 3 = 2

i=4:
  maxReach = max(5, 4+2) = max(5, 6) = 6
  steps = 2 - 1 = 1
  steps > 0, continue

i=5 (n-1):
  Reached the end!
  return jumps = 2

✅ Minimum jumps needed = 2

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Bottom-Up DP
- Build solution from start to end
- dp[i] = minimum jumps to reach index i
- For each index i, check all previous positions j that can reach i
- Update dp[i] with minimum jumps found

Algorithm Steps (DP Tabulation):
1. Initialize dp array with Infinity
2. Set base case: dp[0] = 0
3. For each index i from 1 to n-1:
   a. Check all previous positions j from 0 to i-1
   b. If j + arr[j] >= i, can reach i from j
   c. Update dp[i] = min(dp[i], dp[j] + 1)
4. Return dp[n-1]

Key Concept: Greedy Approach
- Track jump windows instead of checking all positions
- Use maxReach to track farthest reachable position
- Use steps to track remaining steps in current jump
- Make new jump when steps run out

Why Greedy Works?
- We always want to maximize our reach with minimum jumps
- Tracking maxReach ensures we explore farthest positions
- Making jumps only when necessary (steps = 0) minimizes jumps
- This greedy choice leads to optimal solution

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:

DP Tabulation (minJumps):
- Outer loop: n iterations (indices 1 to n-1)
- Inner loop: up to i iterations (check previous positions)
- Total iterations: 1 + 2 + 3 + ... + (n-1) = n(n-1)/2 = O(n²)
- Each iteration: O(1) operations
- Total: O(n²)

Greedy (minJumps2):
- Single loop: n iterations
- Each iteration: O(1) operations
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:

DP Tabulation (minJumps):
- DP array: O(n)
- No additional space needed
- Total: O(n)

Greedy (minJumps2):
- Only a few variables: O(1)
- No arrays needed
- Total: O(1)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Already at End
Input: arr = [1]
minJumps: dp[0] = 0, return dp[0] = 0 ✓
minJumps2: n <= 1, return 0 ✓

CASE 2: Can Jump Directly
Input: arr = [5, 1, 1, 1, 1]
minJumps: dp[4] = dp[0] + 1 = 1 ✓
minJumps2: jumps = 1, maxReach = 5, reach end in 1 jump ✓

CASE 3: Not Possible
Input: arr = [0, 1, 2]
minJumps: dp[1] = Infinity, dp[2] = Infinity, return Infinity ✓
minJumps2: arr[0] = 0, return Infinity ✓

CASE 4: Multiple Valid Paths
Input: arr = [3, 4, 2, 1, 2, 1]
Both approaches find minimum: 2 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Minimum jumps to reach i depends on minimum jumps to reach positions
     that can jump to i
   - Optimal solution contains optimal solutions to subproblems
   - Try all positions and take minimum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are solved only once
   - Results stored in DP table
   - No recalculation needed

3️⃣ BOTTOM-UP CONSTRUCTION:
   - Solve smaller indices first
   - Use results to solve larger indices
   - Guarantees all dependencies are available

4️⃣ GREEDY CORRECTNESS:
   - Always maximize reach with minimum jumps
   - Making jumps only when necessary
   - Greedy choice leads to optimal solution

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Checks all positions that can reach each index: ✓
- Takes minimum at each step: ✓
- Handles invalid cases correctly: ✓
- Base case is correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

DP Tabulation (minJumps):
Line 5: Initialize DP array
  - Create array of size n
  - Fill with Infinity (impossible initially)

Line 6: Set base case
  - dp[0] = 0 (0 jumps to reach starting position)

Line 8-15: Build DP table
  - For each index i from 1 to n-1
  - Check all previous positions j from 0 to i-1
  - If j can reach i, update dp[i] with minimum

Greedy (minJumps2):
Line 25: Check base case
  - If n <= 1, already at end

Line 28: Check if stuck
  - If arr[0] = 0, can't move forward

Line 31-33: Initialize
  - jumps = 1 (first jump from index 0)
  - maxReach = arr[0] (farthest from index 0)
  - steps = arr[0] (steps in current jump)

Line 35-56: Greedy traversal
  - Update maxReach as we go
  - Decrement steps
  - Make new jump when steps = 0
  - Reset steps for new jump window

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Game development (pathfinding, platform games)
- Network routing (minimum hops)
- Resource allocation
- Navigation systems
- Graph traversal problems
- Optimization problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Minimum Jumps to Reach End (this problem)
- Jump Game (can you reach end?)
- Jump Game II (minimum jumps)
- Climbing Stairs
- Frog Jump
- Unique Paths

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Already at end (n=1)
- Can jump directly (one jump)
- Not possible (stuck)
- Multiple valid paths
- Large values
- Edge values (single element, two elements)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print dp array after each iteration (DP approach)
- Track jumps, maxReach, steps (Greedy approach)
- Verify base cases
- Check if Infinity is returned correctly
- Trace through small examples manually
- Verify reachability checks

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 for jump
- Wrong base case (dp[0] should be 0, not 1)
- Not checking if position can reach target
- Wrong array bounds
- Not handling Infinity correctly
- Greedy: Not resetting steps correctly

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Initialize with Infinity (invalid state)
- Set base case clearly (dp[0] = 0)
- Check reachability before updating
- Take minimum of all valid options
- Handle Infinity correctly
- Greedy: Track maxReach and steps carefully

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the DP approach clearly
- Walk through a small example
- Discuss time and space complexity
- Mention greedy optimization
- Compare both approaches
- Handle edge cases
- Explain why greedy works

─────────────────────────────────────────

🎯 COMPARISON: minJumps vs minJumps2

Both functions solve the same problem but use different approaches:

APPROACH 1: minJumps (DP Tabulation)
- Time: O(n²) - checks all previous positions for each index
- Space: O(n) - stores DP array
- Approach: Bottom-up DP, check all positions
- Pros: Clear logic, easy to understand
- Cons: Slower for large inputs

APPROACH 2: minJumps2 (Greedy)
- Time: O(n) - single pass through array
- Space: O(1) - only a few variables
- Approach: Greedy, track jump windows
- Pros: Much faster, constant space
- Cons: More complex logic

KEY DIFFERENCES:

1️⃣ TIME COMPLEXITY:
   minJumps: O(n²) - quadratic
   minJumps2: O(n) - linear

2️⃣ SPACE COMPLEXITY:
   minJumps: O(n) - DP array
   minJumps2: O(1) - constant

3️⃣ APPROACH:
   minJumps: DP (check all positions)
   minJumps2: Greedy (track jump windows)

4️⃣ LOGIC COMPLEXITY:
   minJumps: Simpler, straightforward
   minJumps2: More complex, requires careful tracking

5️⃣ PERFORMANCE:
   minJumps: Slower for large n
   minJumps2: Faster for large n

WHICH ONE TO USE?

Use minJumps (DP) when:
- You want clear, understandable code
- Learning DP concepts
- Small to medium inputs
- Need to track which positions were used

Use minJumps2 (Greedy) when:
- Performance is critical
- Large inputs (n > 1000)
- Space is limited
- Production code

Both are correct and solve the same problem!

─────────────────────────────────────────

🎯 COMPARISON WITH RECURSIVE APPROACH:

Plain Recursion (See 01_plain_recursion.js):
- Time: O(n^n) exponential
- Space: O(n) recursion stack
- Recalculates same subproblems
- Very slow for large inputs

DP Tabulation (minJumps):
- Time: O(n²) polynomial
- Space: O(n) for DP array
- Each subproblem solved once
- Much faster

Greedy (minJumps2):
- Time: O(n) linear
- Space: O(1) constant
- Single pass through array
- Fastest approach

Improvement:
- Time: From O(n^n) to O(n²) (DP) or O(n) (Greedy)
- Space: From O(n) to O(n) (DP) or O(1) (Greedy)

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ FORWARD APPROACH (DP):
   - Build from start to end
   - For each index, find min jumps to reach it
   - Check all previous positions that can reach it

2️⃣ REACHABILITY CHECK:
   - j + arr[j] >= i means position j can reach i
   - Only consider positions that can actually reach target
   - This ensures valid paths only

3️⃣ GREEDY WINDOW TRACKING:
   - Track maxReach: farthest we can reach
   - Track steps: remaining steps in current jump
   - Make new jump only when steps run out
   - This minimizes jumps while maximizing reach

4️⃣ BASE CASE:
   - dp[0] = 0 (0 jumps to reach starting position)
   - Already at end if n <= 1

─────────────────────────────────────────

🎯 VARIABLE NAMING:

DP Approach (minJumps):
- `dp[i]`: Minimum jumps to reach index i
- `i`: Current target index
- `j`: Previous position being checked
- `n`: Array length

Greedy Approach (minJumps2):
- `jumps`: Number of jumps made so far
- `maxReach`: Farthest index we can reach
- `steps`: Remaining steps in current jump window
- `i`: Current position
- `n`: Array length

─────────────────────────────────────────

🎯 CONCLUSION:
Minimum Jumps to Reach End using DP Tabulation efficiently finds the minimum
number of jumps needed by building a DP table bottom-up, checking all positions
that can reach each index, and taking the minimum. This achieves O(n²) time
complexity, a massive improvement over the exponential recursive approach!

Two implementations are provided:
1. minJumps: DP Tabulation approach (O(n²) time, O(n) space) - clearer logic
2. minJumps2: Greedy approach (O(n) time, O(1) space) - optimal performance

Both solve the same problem - choose based on your performance requirements!
*/