/* Problem: ✅✅✅✅ Largest Number with Given Digit Count & Digit Sum ✅✅✅✅

Given two integers N (number of digits) and S (sum of digits), construct the largest
possible N-digit number such that the sum of its digits equals S. Digits may repeat,
and the number should not have leading zeros unless N = 1 and S = 0. If no such
number exists, return "-1".

Key Requirements:
- Output must have exactly N digits (including leading zeros if necessary to fill).
- Sum of digits must equal S.
- Choose digits to maximize the numerical value (i.e., fill from most significant digit).
- When impossible (sum too large or impossible to distribute), return "-1".

Example 1:
Input: N = 2, S = 9 → Output: "90"
Explanation: 9 + 0 = 9; largest 2-digit number satisfying sum.

Example 2:
Input: N = 5, S = 20 → Output: "99200"
Explanation: 9 + 9 + 2 + 0 + 0 = 20; ensures maximum value lexicographically.

Example 3:
Input: N = 5, S = 12 → Output: "93000"
Explanation: 9 + 3 + 0 + 0 + 0 = 12; maximize leading digits.

Example 4:
Input: N = 2, S = 20 → Output: "-1"
Explanation: Maximum sum with 2 digits is 9 + 9 = 18; cannot reach 20.

Constraints:
- 1 ≤ N ≤ 10^5 (number of digits)
- 0 ≤ S ≤ 9N
- Digits are 0-9

Expected Complexities:
Time Complexity: O(N)
Auxiliary Space: O(1) (ignoring output string) or O(N) to build string
*/

// ✅ TC = O(N) — iterate through digits once
// ✅ SC = O(1) extra (string building uses O(N) inherent for output)
// Greedy strategy: fill digits from left to right with the largest possible digit
// that does not exceed the remaining sum, ensuring the remainder can fit in remaining slots.
function largestNumber(n, sum) {
    if (sum > 9 * n) return "-1"; // impossible case

    let num = "";

    let count = n;
    while (sum > 0 && count > 0) {

        if (sum >= 9) {
            // If sum is greater than or equal to 9, add 9 to the number
            num += "9";
            sum -= 9;
        } else {
            // If sum is less than 9, add the sum to the number
            num += String(sum);
            sum = 0;
        }

        count--;
    }

    // If after using all digits some sum is left, impossible
    if (sum !== 0) return "-1";

    // Ensure length exactly n (in case loop exited early)
    return num + "0".repeat(n - num.length);
}

// OR - we can also do like below - Looping n times (instead of adding remaining zeros to the end)
function largestNumber2(N, S) {
    // If sum is zero and N > 1 → no valid N-digit number
    if (S === 0) {
        return (N === 1) ? "0" : "-1";
    }

    let res = "";

    for (let i = 0; i < N; i++) {
        if (S >= 9) {
            res += "9";
            S -= 9;
        } else {
            res += S;
            S = 0;
        }
    }

    // If after filling all digits, S is still left → impossible
    if (S > 0) return "-1";

    return res;
}


// Test cases
console.log("Test 1:", largestNumber(2, 9));   // 90
console.log("Test 2:", largestNumber(5, 20));  // 99200
console.log("Test 3:", largestNumber(5, 12));  // 93000
console.log("Test 4:", largestNumber(2, 20));  // -1
console.log("Test 5:", largestNumber(2, 1));   // 10
console.log("Test 6:", largestNumber(1, 0));   // 0
console.log("Test 7:", largestNumber(3, 27));  // 999

/*🎯 CORE IDEA: Fill digits from most significant to least, greedily placing the
largest possible digit at each position without exceeding the remaining sum or
making it impossible to distribute the remainder among remaining digits.

📋 STEP-BY-STEP FLOW:

1️⃣ CHECK FEASIBILITY:
   - If S > 9N, impossible (each digit ≤ 9).
   - If S == 0 and N > 1, result must be "0" repeated N times (only valid when sum=0).

2️⃣ GREEDY CONSTRUCTION:
   - For each digit position (left to right):
     - Pick the maximum digit d ≤ 9 such that d ≤ remainingSum.
     - Append d to result.
     - Subtract d from remainingSum.

3️⃣ FILL REMAINING DIGITS:
   - Once remainingSum reaches 0, fill remaining positions with 0.

4️⃣ VALIDATION:
   - After processing all positions, if remainingSum ≠ 0 → impossible → return "-1".

🧠 WHY GREEDY WORKS:
- To maximize the number lexicographically, we prioritize higher digits at higher
  positions (most significant digits influence value the most).
- Ensuring we do not exceed remaining sum guarantees feasibility for remaining positions.
- Greedy choice property holds: any solution with smaller digit upfront can be improved
  by swapping with larger available digit without violating sum constraint.

💡 KEY INSIGHTS:
- Highest place value carries most weight; fill with max digit first.
- Maximum digit allowed is min(9, remainingSum).
- After sum exhausted, only zeros are needed.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: N = 5, S = 20

STEP 1: Check feasibility: 9 * 5 = 45 ≥ 20 → possible.

STEP 2: Greedy fill:
  - Position 1: remainingSum=20 → choose min(9,20)=9 → result="9", remainingSum=11
  - Position 2: remainingSum=11 → choose min(9,11)=9 → result="99", remainingSum=2
  - Position 3: remainingSum=2 → choose min(9,2)=2 → result="992", remainingSum=0
  - Positions 4 & 5: remainingSum=0 → fill with zeros → result="99200"

Final answer: "99200"

📊 VISUAL REPRESENTATION:

Positions:  [1] [2] [3] [4] [5]
Digits:      9   9   2   0   0
Sum:         9 + 9 + 2 + 0 + 0 = 20

🔍 WHY SMALL DIGITS FIRST FAILS:
- If we start with smaller digits (e.g., 8 first), result is 98200 < 99200.
- Leading digits dominate numeric value; hence always maximize current digit.
*/

/*🎯 EDGE CASES:
- N=1, S=0 → result "0" (only valid single digit with sum 0)
- N=1, S>9 → impossible → "-1"
- Sum exactly 9N → result is "9" repeated N times
- Sum < N? still possible (allow zeros)
- Sum becomes zero before all digits processed → append zeros to maintain length
*/

/*🎯 TIME & SPACE COMPLEXITY:
- Time: O(N) — loop through each digit once
- Space: O(1) extra (O(N) output string)
*/

/*🎯 ADVANTAGES:
- Simple greedy solution
- Runs in linear time
- Handles large N efficiently

🎯 DISADVANTAGES:
- Relies on string concatenation (manageable in JS)
- Must carefully handle impossible cases

🎯 REAL-WORLD APPLICATIONS:
- Generating maximum numeric codes with digit constraints
- Forming largest identification numbers with specified digit sum
- Cryptographic or combinatorial constructions needing digit constraints

🎯 RELATED PROBLEMS:
- Smallest number with given sum and digits (mirror approach with adjustments)
- Distributing sum across slots with bounds
- Coin change with limited denomination values

🎯 TESTING STRATEGY:
- sum > 9n (impossible)
- sum = 0, n = 1
- sum = 0, n > 1
- sum = 9n (all 9s)
- Random values within limits

🎯 DEBUGGING TIPS:
- Print remainingSum and digits while constructing
- Ensure loop handles sum exhaustion properly
- Verify length of output equals N

🎯 COMMON MISTAKES:
- Forgetting to handle sum > 9n
- Not filling remaining digits with zeros
- Allowing leading zeros when sum > 0
- Stopping before using all digits

🎯 BEST PRACTICES:
- Use descriptive variable names (remainingSum, remainingDigits)
- Guard impossible cases early
- Keep algorithm iterative for clarity

🎯 INTERVIEW TIPS:
- Emphasize greedy reasoning (maximize highest place first)
- Discuss feasibility condition (sum ≤ 9n)
- Mention difference from smallest number variant (fill from right)
- Provide sample walkthroughs

🎯 GREEDY PATTERN SUMMARY:
1. Validate feasibility (sum ≤ 9n).
2. For each digit position, place highest possible digit.
3. Stop early if sum exhausted; pad with zeros.
4. Verify constraints; return result or "-1".
*/