/* Problem:
Given two positive integer arrays arr and brr, 
find the number of pairs such that x^y > y^x where x is an element from arr and y is an element from brr.

Example 1:
Input:
arr[] = {2, 1, 6}
brr[] = {1, 5}
Output: 3
Explanation: The pairs are (2,1), (2,5) and (6,1). 
- 2^1 = 2 > 1^2 = 1 ✓
- 2^5 = 32 > 5^2 = 25 ✓  
- 6^1 = 6 > 1^6 = 1 ✓

Example 2:
Input:
arr[] = {2, 3, 4, 5}
brr[] = {1, 2, 3}
Output: 5
Explanation: The pairs are (2,1), (3,1), (3, 2), (4,1), (5,1).
- 2^1 = 2 > 1^2 = 1 ✓
- 3^1 = 3 > 1^3 = 1 ✓
- 3^2 = 9 > 2^3 = 8 ✓
- 4^1 = 4 > 1^4 = 1 ✓
- 5^1 = 5 > 1^5 = 1 ✓

Expected Time Complexity : O(n*log(m) + m*log(m))
Expected Auxilliary Space : O(1)
*/
    
// ✅ TC = O((m+n)*log(m)) --> O(m*log(m) + n*log(m)) --> Sorting + Binary Search
// ✅ SC = O(1)
function countPairs(arr, brr) {
    brr.sort((a, b) => a - b);
    let m = brr.length;

    let countSmallerYs = new Array(5).fill(0);
    for (let y of brr) {
        if (y < 5) countSmallerYs[y]++;
    }

    function upperBound(x) {
        let l = 0, r = m; //✅✅✅ r = m (NOT m-1)
        while (l < r) {
            let mid = Math.floor((l + r) / 2);
            if (brr[mid] <= x) l = mid + 1;
            else r = mid; //✅✅✅
        }
        return l;
    }
    // ✅✅✅ Why r=m with l<m & why not r=m-1 with l<=m ?
    // function upperBound(x) {
    //     let l = 0, r = m - 1;   // inclusive range
    //     while (l <= r) {
    //         let mid = Math.floor((l + r) / 2);
    //         if (brr[mid] <= x) l = mid + 1;
    //         else r = mid - 1; ✅✅✅
    //     }
    //     return l;  // still works
    // }

    let totalPairs = 0;

    for (let x of arr) {
        if (x === 0 || x === 1) continue;

        let idx = upperBound(x);
        let count = m - idx;

        // add all pairs with y=1
        count += countSmallerYs[1];

        if (x === 2) {
            // subtract exceptions (y=3,4)
            count -= (countSmallerYs[3] + countSmallerYs[4]);
        }

        if (x === 3) {
            // add back special case (y=2)
            count += countSmallerYs[2];
        }

        totalPairs += count;
    }

    return totalPairs;
}

// ✅ Test
console.log(countPairs([2, 1, 6], [1, 5]));        // 3
console.log(countPairs([2, 3, 4, 5], [1, 2, 3]));  // 5


/*🎯 CORE IDEA: Instead of checking every pair (O(n*m)), we use MATHEMATICAL INSIGHTS and BINARY SEARCH to efficiently count valid pairs.

📋 STEP-BY-STEP FLOW:

1️⃣ MATHEMATICAL ANALYSIS:
   - We need to find pairs where x^y > y^x
   - Taking log on both sides: y*log(x) > x*log(y)
   - Rearranging: log(x)/x > log(y)/y
   - This means we need to compare the function f(z) = log(z)/z

2️⃣ FUNCTION BEHAVIOR ANALYSIS:
   - f(z) = log(z)/z has a maximum at z = e ≈ 2.718
   - f(1) = 0, f(2) ≈ 0.346, f(3) ≈ 0.366, f(4) ≈ 0.346, f(5) ≈ 0.322
   - For z > e, f(z) decreases monotonically
   - Special cases: f(1) = 0, f(2) ≈ f(4), f(3) is maximum

3️⃣ SPECIAL CASE HANDLING:
   - x = 0: No valid pairs (0^y = 0, y^0 = 1)
   - x = 1: No valid pairs (1^y = 1, y^1 = y ≥ 1)
   - y = 1: Always valid (x^1 = x > 1^x = 1 for x > 1)
   - x = 2, y = 3: 2^3 = 8 < 3^2 = 9 (exception)
   - x = 2, y = 4: 2^4 = 16 = 4^2 = 16 (exception)
   - x = 3, y = 2: 3^2 = 9 > 2^3 = 8 (special case)

4️⃣ ALGORITHM STEPS:
   a) Sort array brr for binary search
   b) Count occurrences of y < 5 for special case handling
   c) For each x in arr (skip 0,1):
      * Use binary search to find first y where y > x
      * Count all y > x as valid pairs
      * Add all y = 1 as valid pairs
      * Handle exceptions for x = 2 and x = 3

5️⃣ BINARY SEARCH OPTIMIZATION:
   - upperBound(x) finds first element > x in sorted brr
   - All elements after this index are > x, so x^y > y^x
   - Time: O(log m) per x, total O(n*log m)

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n*log(m) + m*log(m)) vs O(n*m) for brute force
2️⃣ MATHEMATICAL INSIGHT: Use function properties instead of computing powers
3️⃣ SPECIAL CASES: Handle edge cases that don't follow general pattern
4️⃣ BINARY SEARCH: Leverage sorted array for fast counting

💡 KEY INSIGHTS:

1️⃣ FUNCTION MONOTONICITY: f(z) = log(z)/z decreases for z > e
2️⃣ SPECIAL VALUES: f(1) = 0, f(2) ≈ f(4), f(3) is maximum
3️⃣ EXCEPTIONS: (2,3), (2,4) don't follow general rule
4️⃣ ALWAYS VALID: (x,1) for x > 1, (3,2) is special case

🎯 MATHEMATICAL PROOF:
For x > y > e: log(x)/x < log(y)/y (decreasing function)
Therefore: y*log(x) < x*log(y)
Taking exponential: x^y < y^x
So we need y > x for x^y > y^x (when both > e)
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [2, 1, 6]     (n=3)
brr = [1, 5]        (m=2, sorted)

🎯 GOAL: Count pairs where x^y > y^x

🔍 STEP-BY-STEP PROCESS:

1️⃣ PREPROCESSING:
   brr = [1, 5] (already sorted)
   countSmallerYs = [0, 1, 0, 0, 0] (count of y=1,2,3,4)

2️⃣ PROCESS EACH x:

   📋 x = 2:
   - Skip 0,1: continue
   - upperBound(2): finds first element > 2 in [1,5]
   - Index = 1 (element 5), count = m-Index= 2-1 = 1
   - Add y=1: count += countSmallerYs[1] = 1 + 1 = 2
   - x=2 exceptions: subtract y=3,4 (none present) = 2
   - Total for x=2: 2 pairs (2,1), (2,5)

   📋 x = 1:
   - Skip: continue (x=1 never works)

   📋 x = 6:
   - upperBound(6): finds first element > 6 in [1,5]
   - Index = 2 (no element > 6), count = 2-2 = 0
   - Add y=1: count += countSmallerYs[1] = 0 + 1 = 1
   - No exceptions for x=6
   - Total for x=6: 1 pair (6,1)

🏆 FINAL RESULT: 2 + 0 + 1 = 3 pairs

🎯 VERIFICATION:
- (2,1): 2^1 = 2 > 1^2 = 1 ✓
- (2,5): 2^5 = 32 > 5^2 = 25 ✓
- (6,1): 6^1 = 6 > 1^6 = 1 ✓

Total: 3 valid pairs ✓

🔍 WHY THIS WORKS:
- For x=2: y=1 always works, y=5 > 2 so 2^5 > 5^2
- For x=6: y=1 always works, y=5 < 6 but 6^5 > 5^6 (general rule)
- We avoid computing large powers by using mathematical properties!

*/
