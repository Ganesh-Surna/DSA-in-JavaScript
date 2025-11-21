/* Problem: ✅✅✅✅ Minimum Jumps to Reach End (Plain Recursion) ✅✅✅✅

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
Input: arr = [4, 1, 5, 8, 6, 1, 2, 7, 9, 6]
Output: 2
Explanation: Minimum jumps needed is 2:
  - Jump 1: index 0 → index 4 (jumped 4 steps, can jump 1/2/3/4 steps from index 0)
  - Jump 2: index 4 → index 9 (jumped 5 steps, can jump 1/2/3/4/5/6 steps from index 4)
  - Total: 2 jumps

Example 4:
Input: arr = [0, 1, 2]
Output: Infinity
Explanation: Cannot reach the end - stuck at index 0 (can't jump from index 0)

Constraints:
- 1 ≤ arr.length ≤ 10^4
- 0 ≤ arr[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- For an array of length n, we want to reach index n-1 (last index).
- Check all positions i that can reach the end: if i + arr[i] >= n-1.
- For each valid position i, recursively find minimum jumps to reach index i.
- Then add 1 for the jump from i to the end.
- Take minimum of all valid options.
- Base case: if n === 1, we're already at the end (return 0 jumps).

📈 Recurrence Relation:
  if n === 1:
      return 0  // Base case: already at end, 0 jumps needed
  
  res = Infinity
  
  For each i from 0 to n-2:
      if i + arr[i] >= n-1:  // Can reach end from position i
          sub_res = minJumps(arr, i+1)  // Min jumps to reach index i
          if sub_res !== Infinity:
              res = min(res, 1 + sub_res)  // Add 1 for jump from i to end
  
  return res

Base Cases:
- n = 1: return 0 (already at end, no jumps needed)

🎯 Why This Approach?
- Optimal substructure: Minimum jumps to reach end depends on minimum jumps
  to reach positions that can jump to the end.
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible jump paths.
- Guarantees optimal solution by trying all positions that can reach the end.

💡 Key Insights:
- Check all positions that can reach the end (i + arr[i] >= n-1)
- Recursively find minimum jumps to reach each such position
- Add 1 for the final jump from that position to the end
- Take minimum of all valid options
- Base case: n = 1 means we're at the end (return 0)
- If no position can reach end, return Infinity
*/

// ✅ TC = O(n^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function minJumps(arr, n=arr.length){
    // Base case: If array length is 1, we're already at the end
    if(n===1) return 0
    
    // Initialize result as Infinity (impossible initially)
    let res = Infinity
    
    // Check all positions from 0 to n-2 (can't jump from last position)
    for(let i=0; i<n-1; i++){
        // Check if we can reach the end from position i
        if(i+arr[i] >= n-1){
            // Consider this jump & solve for reaching position i first
            // i+1 means recursion for arr length i+1 (the last index is i only)
            let sub_res = minJumps(arr, i+1)
            
            // If we found a valid solution to reach position i
            if(sub_res !== Infinity){
                // Update result: min jumps = 1 (jump from i to end) + min jumps to reach i
                res = Math.min(res, 1+sub_res)
            }
        }
    }
    
    return res
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

We'll trace through the recursive calls to find minimum jumps.

Initial call: minJumps([3, 4, 2, 1, 2, 1], 6)

minJumps([3, 4, 2, 1, 2, 1], 6):
  n = 6, want to reach index 5 (last index)
  Check positions i from 0 to 4 that can reach index 5:
  
  i=0: arr[0]=3, can reach 0+3=3, but 3 < 5? No, 3 < 5, so can't reach end
  i=1: arr[1]=4, can reach 1+4=5, and 5 >= 5? Yes! Can reach end from index 1
  i=2: arr[2]=2, can reach 2+2=4, but 4 < 5, so can't reach end
  i=3: arr[3]=1, can reach 3+1=4, but 4 < 5, so can't reach end
  i=4: arr[4]=2, can reach 4+2=6, and 6 >= 5? Yes! Can reach end from index 4
  
  So we have two options:
    Option 1: Reach index 1, then jump to end
    Option 2: Reach index 4, then jump to end
  
  Option 1: minJumps([3, 4, 2, 1, 2, 1], 2) + 1
  minJumps([3, 4, 2, 1, 2, 1], 2):
    n = 2, want to reach index 1
    Check positions i from 0 to 0:
      i=0: arr[0]=3, can reach 0+3=3, and 3 >= 1? Yes! Can reach index 1 from index 0
      minJumps([3, 4, 2, 1, 2, 1], 1) + 1
      minJumps([3, 4, 2, 1, 2, 1], 1):
        n = 1 → base case, return 0
      So: 0 + 1 = 1
    return 1
  So Option 1: 1 + 1 = 2
  
  Option 2: minJumps([3, 4, 2, 1, 2, 1], 5) + 1
  minJumps([3, 4, 2, 1, 2, 1], 5):
    n = 5, want to reach index 4
    Check positions i from 0 to 3:
      i=0: arr[0]=3, can reach 0+3=3, but 3 < 4, so can't reach
      i=1: arr[1]=4, can reach 1+4=5, and 5 >= 4? Yes! Can reach index 4 from index 1
      i=2: arr[2]=2, can reach 2+2=4, and 4 >= 4? Yes! Can reach index 4 from index 2
      i=3: arr[3]=1, can reach 3+1=4, and 4 >= 4? Yes! Can reach index 4 from index 3
      
      Option 1a: minJumps([3, 4, 2, 1, 2, 1], 2) + 1 = 1 + 1 = 2
      Option 1b: minJumps([3, 4, 2, 1, 2, 1], 3) + 1
        minJumps([3, 4, 2, 1, 2, 1], 3):
          n = 3, want to reach index 2
          Check positions:
            i=0: arr[0]=3, can reach 0+3=3, and 3 >= 2? Yes!
            minJumps([3, 4, 2, 1, 2, 1], 1) + 1 = 0 + 1 = 1
          return 1
        So: 1 + 1 = 2
      Option 1c: minJumps([3, 4, 2, 1, 2, 1], 4) + 1
        minJumps([3, 4, 2, 1, 2, 1], 4):
          n = 4, want to reach index 3
          Check positions:
            i=0: arr[0]=3, can reach 0+3=3, and 3 >= 3? Yes!
            minJumps([3, 4, 2, 1, 2, 1], 1) + 1 = 0 + 1 = 1
          return 1
        So: 1 + 1 = 2
      Minimum: min(2, 2, 2) = 2
    return 2
  So Option 2: 2 + 1 = 3
  
  Result: min(2, 3) = 2

🏆 Result: 2 jumps

✅ Minimum jumps needed = 2 (index 0 → index 1 → index 5)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Recursive Backward Approach
- Start from the end and work backwards
- Find all positions that can reach the end
- Recursively find minimum jumps to reach each such position
- Add 1 for the final jump to the end
- Take minimum of all valid options

Recursive Structure:
1. Base case: n = 1 → return 0 (already at end)
2. Check all positions i that can reach end: i + arr[i] >= n-1
3. For each valid position i, recursively solve for reaching i
4. Add 1 for jump from i to end
5. Take minimum of all valid options

Why Check i + arr[i] >= n-1?
- arr[i] is the maximum steps we can jump from index i
- i + arr[i] is the farthest index we can reach from i
- If i + arr[i] >= n-1, we can reach the end from position i

Why i+1 in Recursion?
- We want to find minimum jumps to reach index i
- Array length needed: i+1 (indices 0 to i)
- minJumps(arr, i+1) finds min jumps to reach index i

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we check up to n-1 positions
- Each position may lead to recursive calls
- Maximum depth: n (if we need n jumps)
- Total recursive calls: O(n^n) in worst case
- Each call: O(n) operations
- Total: O(n^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Already at End
Input: arr = [1]
n = 1 → base case
return 0 ✓

CASE 2: Can Jump Directly
Input: arr = [5, 1, 1, 1, 1]
arr[0] = 5, can reach 0+5=5 >= 4? Yes!
minJumps(arr, 1) = 0
return 0 + 1 = 1 ✓

CASE 3: Not Possible
Input: arr = [0, 1, 2]
No position can reach end (all stuck)
return Infinity ✓

CASE 4: Multiple Valid Paths
Input: arr = [3, 4, 2, 1, 2, 1]
Multiple positions can reach end
Try all, take minimum
return 2 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Minimum jumps to reach end depends on minimum jumps to reach positions
     that can jump to the end
   - Optimal solution contains optimal solutions to subproblems
   - Try all positions and take minimum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: minJumps(arr, 2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ COMPLETE EXPLORATION:
   - Check all positions that can reach the end
   - No valid path is missed
   - Guarantees optimal solution

4️⃣ CORRECTNESS:
   - Base case handles edge case correctly
   - Invalid paths return Infinity
   - Valid paths compute minimum correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Checks all positions that can reach end: ✓
- Recursively finds minimum to reach each position: ✓
- Takes minimum at each step: ✓
- Handles invalid cases correctly: ✓
- Base case is correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 2: Check base case
  - If n = 1, already at end → return 0

Line 4: Initialize result
  - res = Infinity (impossible initially)

Line 6: Check all positions
  - For each i from 0 to n-2 (can't jump from last position)

Line 7: Check if can reach end
  - If i + arr[i] >= n-1, can reach end from position i

Line 9: Recursive call
  - minJumps(arr, i+1) finds min jumps to reach index i
  - i+1 because we need array length i+1 to reach index i

Line 11-13: Update result
  - If valid solution found, update res with minimum
  - Add 1 for jump from i to end

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
- Print recursive calls with parameters
- Track which positions can reach end
- Verify base case is reached
- Check if Infinity is returned correctly
- Trace through small examples manually
- Verify i+1 calculation (array length for index i)

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add 1 for final jump
- Wrong base case (returning 1 instead of 0 for n=1)
- Not checking if position can reach end
- Wrong array length in recursion (should be i+1, not i)
- Not handling Infinity correctly

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base case (n = 1 returns 0)
- Check all positions that can reach end
- Recursively solve for reaching each position
- Add 1 for final jump
- Take minimum of all valid options
- Handle Infinity correctly

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the recursive structure clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Explain why we check i + arr[i] >= n-1

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(n^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n²) time, O(n) space
- Tabulation (DP Bottom-up): O(n²) time, O(n) space
- Greedy approach: O(n) time, O(1) space (for some cases)
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- minJumps(arr, 2) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ BACKWARD APPROACH:
   - Start from end and work backwards
   - Find positions that can reach end
   - Recursively solve for reaching those positions

2️⃣ REACHABILITY CHECK:
   - i + arr[i] >= n-1 means position i can reach end
   - Only consider positions that can actually reach end
   - This reduces unnecessary recursive calls

3️⃣ ARRAY LENGTH IN RECURSION:
   - To reach index i, we need array of length i+1
   - minJumps(arr, i+1) finds min jumps to reach index i
   - This is why we pass i+1, not i

4️⃣ BASE CASE:
   - n = 1 means we're at index 0 (only one element)
   - Already at end, so 0 jumps needed

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `res`: Stores the best (minimum) result found so far
- `sub_res`: Stores the result from recursive call for reaching position i
- For each position that can reach end, we compute `sub_res` and update `res`
- `i`: Current position being checked
- `n`: Current array length (target index is n-1)

─────────────────────────────────────────

🎯 CONCLUSION:
Minimum Jumps to Reach End using Plain Recursion finds the minimum number of
jumps needed by checking all positions that can reach the end, recursively
finding minimum jumps to reach each such position, and taking the minimum of
all valid options. While intuitive, this approach has exponential time
complexity O(n^n). For better performance, use DP memoization or tabulation
(see 03_DP_Tabulation.js)!
*/