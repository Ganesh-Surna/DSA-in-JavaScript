/* Problem: ✅✅✅✅ Optimal Picking Max Value Game (Plain Recursion) ✅✅✅✅

Given an array `arr` of positive integers, two players take turns picking from
either end of the array (leftmost or rightmost element). Both players play
optimally. Find the maximum value that the first player can obtain.

🎯 Goal: Find the maximum value the first player can get when both players play optimally.

Example 1:
Input: arr = [5, 3, 7, 10]
Output: 15
Explanation: Optimal strategy:
  - Player 1 picks 10 (right end) → remaining [5, 3, 7]
  - Player 2 picks 7 (right end) → remaining [5, 3]
  - Player 1 picks 5 (left end) → remaining [3]
  - Player 2 picks 3
  - Player 1 total: 10 + 5 = 15

Example 2:
Input: arr = [20, 5, 4, 6]
Output: 25
Explanation: Optimal strategy:
  - Player 1 picks 20 (left end) → remaining [5, 4, 6]
  - Player 2 picks 6 (right end) → remaining [5, 4]
  - Player 1 picks 5 (left end) → remaining [4]
  - Player 2 picks 4
  - Player 1 total: 20 + 5 = 25

Example 3:
Input: arr = [1, 2, 3]
Output: 4
Explanation: Optimal strategy:
  - Player 1 picks 3 (right end) → remaining [1, 2]
  - Player 2 picks 2 (right end) → remaining [1]
  - Player 1 picks 1
  - Player 1 total: 3 + 1 = 4

Constraints:
- 1 ≤ arr.length ≤ 20
- 1 ≤ arr[i] ≤ 10^7

Expected Complexities:
Time Complexity: O(2^n) exponential (worst case, without memoization)
Space Complexity: O(n) for recursion stack

⚠️ Note: This is a plain recursive solution with exponential time complexity.
For better performance, see the DP Tabulation solution in 03_DP_Tabulation.js.

🧠 Core Idea:
- This is a game theory problem with optimal play from both players.
- If we pick from left (i), opponent gets [i+1, j] and will play optimally.
- If we pick from right (j), opponent gets [i, j-1] and will play optimally.
- Opponent will leave us the minimum value (they maximize their value).
- We take the maximum of both options (pick left or pick right).
- Base case: if only 2 elements, pick the maximum.

📈 Recurrence Relation:
  if i+1 === j:
      return max(arr[i], arr[j])  // Base case: only 2 elements, pick max
  
  pickI = arr[i] + min(
      optimalPicking(arr, i+2, j),      // Opponent picks i+1
      optimalPicking(arr, i+1, j-1)     // Opponent picks j
  )
  
  pickJ = arr[j] + min(
      optimalPicking(arr, i+1, j-1),    // Opponent picks i
      optimalPicking(arr, i, j-2)       // Opponent picks j-1
  )
  
  return max(pickI, pickJ)

Base Cases:
- i+1 === j: return max(arr[i], arr[j]) (only 2 elements, pick maximum)

🎯 Why This Approach?
- Optimal substructure: Maximum value for [i, j] depends on maximum value for
  smaller subarrays after opponent's move.
- Overlapping subproblems: Same subproblems are recalculated multiple times.
- Recursive solution explores all possible game paths.
- Guarantees optimal solution by considering both player moves.

💡 Key Insights:
- Game theory: Opponent plays optimally, so they minimize our value
- Try both options: pick left (i) or pick right (j)
- Opponent will leave us minimum: use Math.min for opponent's choices
- We take maximum: use Math.max for our choices
- Base case: only 2 elements, pick the maximum
*/

// ✅ TC = O(2^n) exponential (worst case, without memoization)
// ✅ SC = O(n) for recursion stack
function optimalPicking(arr, i=0, j=arr.length-1){

    // Base case: If only 2 elements there, You will pick max of them
    if(i+1 === j){
        return Math.max(arr[i], arr[j])
    }
    
    // 1. If You pick ith index el, then opponent will have [i+1 to j]. Opponent will leave you min in that.
    let pickI = arr[i] + Math.min(
            optimalPicking(arr, i+2, j), // If Opponent pick i+1, you will have [i+2 to j]
            optimalPicking(arr, i+1, j-1) // If Opponent pick j, you will have [i+1, j-1]
        )
    
    // 2. If You pick jth index el, then opponent will have [i to j-1]. Opponent will leave you min in that.
    let pickJ = arr[j] + Math.min(
            optimalPicking(arr, i+1, j-1), // If Opponent pick i. You will have [i+1 to j-1]
            optimalPicking(arr, i, j-2) // If Opponent pick j-1. You will have [i to j-2]
        )
        
    return Math.max(pickI, pickJ)
}

console.log(optimalPicking([5, 3, 7, 10])) // 15 --> You pick 10, Opponent picks 7, You pick 5 (10+5 = 15)
console.log(optimalPicking([20, 5, 4, 6])) // 25 --> You pick 20, Opponent picks 6, You pick 5 (20+5 = 25)

/*🎯 STEP-BY-STEP WALKTHROUGH (arr = [5, 3, 7, 10])

We'll trace through the recursive calls to find maximum value for first player.

Initial call: optimalPicking([5, 3, 7, 10], 0, 3)

optimalPicking([5, 3, 7, 10], 0, 3):
  i=0, j=3, arr[0]=5, arr[3]=10
  Not base case (i+1=1, j=3, 1 !== 3)
  
  Option 1: Pick left (i=0, value=5)
    pickI = 5 + min(
        optimalPicking([5, 3, 7, 10], 2, 3),  // Opponent picks i+1=1
        optimalPicking([5, 3, 7, 10], 1, 2)   // Opponent picks j=3
    )
  
  Option 2: Pick right (j=3, value=10)
    pickJ = 10 + min(
        optimalPicking([5, 3, 7, 10], 1, 2),  // Opponent picks i=0
        optimalPicking([5, 3, 7, 10], 0, 1)    // Opponent picks j-1=2
    )
  
  res = max(pickI, pickJ)

Let's compute each:

Option 1: Pick left (i=0)
  optimalPicking([5, 3, 7, 10], 2, 3):
    i=2, j=3, arr[2]=7, arr[3]=10
    Not base case (i+1=3, j=3, 3 === 3? No, 3 !== 3, wait i+1=3, j=3, so i+1 === j? No)
    Actually: i+1 = 3, j = 3, so i+1 === j? Yes! Base case!
    return max(7, 10) = 10
  
  optimalPicking([5, 3, 7, 10], 1, 2):
    i=1, j=2, arr[1]=3, arr[2]=7
    i+1 = 2, j = 2, so i+1 === j? Yes! Base case!
    return max(3, 7) = 7
  
  pickI = 5 + min(10, 7) = 5 + 7 = 12

Option 2: Pick right (j=3)
  optimalPicking([5, 3, 7, 10], 1, 2):
    i=1, j=2, arr[1]=3, arr[2]=7
    Base case: return max(3, 7) = 7
  
  optimalPicking([5, 3, 7, 10], 0, 1):
    i=0, j=1, arr[0]=5, arr[1]=3
    i+1 = 1, j = 1, so i+1 === j? Yes! Base case!
    return max(5, 3) = 5
  
  pickJ = 10 + min(7, 5) = 10 + 5 = 15

Back to initial call:
  res = max(12, 15) = 15

🏆 Result: 15

✅ Maximum value for first player = 15 (pick 10, then 5)

─────────────────────────────────────────

📊 UNDERSTANDING THE ALGORITHM:

Key Concept: Game Theory with Optimal Play
- Two players take turns picking from array ends
- Both players play optimally (maximize their own value)
- If we pick left, opponent gets remaining array and plays optimally
- Opponent will leave us minimum value (they maximize their value)
- We take maximum of both options (pick left or pick right)

Recursive Structure:
1. Base case: only 2 elements → pick maximum
2. Try picking left (i): opponent gets [i+1, j]
   a. Opponent can pick i+1 → we get [i+2, j]
   b. Opponent can pick j → we get [i+1, j-1]
   c. Opponent will leave us minimum (they play optimally)
3. Try picking right (j): opponent gets [i, j-1]
   a. Opponent can pick i → we get [i+1, j-1]
   b. Opponent can pick j-1 → we get [i, j-2]
   c. Opponent will leave us minimum (they play optimally)
4. Take maximum of both options

Why Math.min for Opponent?
- Opponent plays optimally to maximize their value
- They will choose the move that minimizes our value
- So we get the minimum of the two options they can leave us

Why Math.max for Our Choice?
- We want to maximize our total value
- We choose the option (pick left or pick right) that gives us maximum value

─────────────────────────────────────────

🎯 TIME COMPLEXITY ANALYSIS:
- At each level, we make 2 choices (pick left or pick right)
- Each choice leads to 2 recursive calls (opponent's choices)
- Maximum depth: n/2 (roughly, as we remove 2 elements per level)
- Total recursive calls: O(2^n) in worst case
- Each call: O(1) operations
- Total: O(2^n) exponential

🎯 SPACE COMPLEXITY ANALYSIS:
- Recursion stack depth: O(n) in worst case
- Each call: O(1) space
- Total: O(n)

─────────────────────────────────────────

🎯 EDGE CASES:

CASE 1: Two Elements
Input: arr = [5, 10]
i=0, j=1, i+1 === j? Yes!
return max(5, 10) = 10 ✓

CASE 2: Three Elements
Input: arr = [1, 2, 3]
Try pick left (1) or pick right (3)
Opponent will leave minimum
return 4 ✓

CASE 3: All Same Values
Input: arr = [5, 5, 5, 5]
All choices are equivalent
return 10 ✓

CASE 4: Increasing Order
Input: arr = [1, 2, 3, 4]
Optimal: pick 4, opponent picks 3, we pick 2
return 6 ✓

─────────────────────────────────────────

🎯 WHY THIS APPROACH WORKS:

1️⃣ OPTIMAL SUBSTRUCTURE:
   - Maximum value for [i, j] depends on maximum value for smaller subarrays
   - Optimal solution contains optimal solutions to subproblems
   - Try both options and take maximum

2️⃣ OVERLAPPING SUBPROBLEMS:
   - Same subproblems are recalculated multiple times
   - Example: optimalPicking(arr, 1, 2) might be called from multiple paths
   - This is why DP (memoization) helps

3️⃣ GAME THEORY:
   - Opponent plays optimally (maximizes their value)
   - This minimizes our value
   - We use Math.min for opponent's choices
   - We use Math.max for our choices

4️⃣ CORRECTNESS:
   - Base case handles edge case correctly
   - Opponent's optimal play is modeled correctly
   - Our optimal choice is computed correctly

─────────────────────────────────────────

🎯 ALGORITHM CORRECTNESS:
- Tries all possible game paths: ✓
- Models opponent's optimal play correctly: ✓
- Takes maximum at each step: ✓
- Base case is correct: ✓
- Guarantees optimal solution: ✓

─────────────────────────────────────────

🎯 IMPLEMENTATION DETAILS:

Line 4-6: Check base case
  - If i+1 === j, only 2 elements left
  - Pick the maximum of the two

Line 9-12: Try picking left (i)
  - Add arr[i] to our value
  - Opponent gets [i+1, j] and plays optimally
  - Opponent can pick i+1 (we get [i+2, j]) or j (we get [i+1, j-1])
  - Opponent will leave us minimum (they maximize their value)

Line 15-18: Try picking right (j)
  - Add arr[j] to our value
  - Opponent gets [i, j-1] and plays optimally
  - Opponent can pick i (we get [i+1, j-1]) or j-1 (we get [i, j-2])
  - Opponent will leave us minimum (they maximize their value)

Line 20: Return maximum
  - Take maximum of pickI and pickJ

─────────────────────────────────────────

🎯 REAL-WORLD APPLICATIONS:
- Game theory problems
- Competitive programming
- Algorithm design
- Decision making under uncertainty
- Two-player zero-sum games
- Optimal strategy problems

─────────────────────────────────────────

🎯 RELATED PROBLEMS:
- Optimal Picking Max Value Game (this problem)
- Stone Game
- Predict the Winner
- Coin Game
- Nim Game
- Two Player Game

─────────────────────────────────────────

🎯 TESTING STRATEGY:
- Two elements (base case)
- Three elements
- All same values
- Increasing order
- Decreasing order
- Large values
- Edge values (single element, two elements)

─────────────────────────────────────────

🎯 DEBUGGING TIPS:
- Print recursive calls with parameters
- Track which option is being tried (pick left or pick right)
- Verify base case is reached
- Check if minimum/maximum is calculated correctly
- Trace through small examples manually
- Verify opponent's optimal play logic

─────────────────────────────────────────

🎯 COMMON MISTAKES:
- Forgetting to add current element value
- Using max instead of min for opponent's choices
- Wrong base case (checking i === j instead of i+1 === j)
- Not considering both opponent's options
- Confusing player turns

─────────────────────────────────────────

🎯 BEST PRACTICES:
- Clear base case (i+1 === j, pick maximum)
- Try both options (pick left or pick right)
- Use Math.min for opponent's choices (they minimize our value)
- Use Math.max for our choices (we maximize our value)
- Handle edge cases properly

─────────────────────────────────────────

🎯 INTERVIEW TIPS:
- Explain the game theory aspect clearly
- Walk through a small example
- Discuss time and space complexity
- Mention exponential time complexity
- Suggest DP optimization
- Handle edge cases
- Explain why we use min for opponent and max for us

─────────────────────────────────────────

🎯 OPTIMIZATION NOTE:

⚠️ EXPONENTIAL TIME COMPLEXITY:
This plain recursive solution has O(2^n) time complexity, which is very slow
for large inputs. The same subproblems are recalculated multiple times.

For better performance, use:
- Memoization (DP Top-down): O(n²) time, O(n²) space
- Tabulation (DP Bottom-up): O(n²) time, O(n²) space
- See 03_DP_Tabulation.js for optimized solution

Example of overlapping subproblems:
- optimalPicking(arr, 1, 2) might be called from multiple paths
- Without memoization, it's recalculated each time

─────────────────────────────────────────

🎯 KEY INSIGHTS:

1️⃣ GAME THEORY:
   - Both players play optimally
   - Opponent maximizes their value, which minimizes ours
   - We maximize our value by choosing best option

2️⃣ MIN-MAX STRATEGY:
   - We use Math.max (maximize our value)
   - Opponent uses Math.min (minimize our value)
   - This models optimal play from both sides

3️⃣ TWO OPTIONS:
   - Pick from left end (i)
   - Pick from right end (j)
   - Take maximum of both options

4️⃣ BASE CASE:
   - Only 2 elements left
   - Pick the maximum (we get to choose first)

─────────────────────────────────────────

🎯 VARIABLE NAMING:
- `arr`: Array of values
- `i`: Left index (start of current subarray)
- `j`: Right index (end of current subarray)
- `pickI`: Value when picking from left (i)
- `pickJ`: Value when picking from right (j)

─────────────────────────────────────────

🎯 CONCLUSION:
Optimal Picking Max Value Game using Plain Recursion finds the maximum value
the first player can obtain by recursively trying both options (pick left or
pick right), modeling the opponent's optimal play (using Math.min), and taking
the maximum of both options. While intuitive, this approach has exponential
time complexity O(2^n). For better performance, use DP memoization or
tabulation (see 03_DP_Tabulation.js)!
*/