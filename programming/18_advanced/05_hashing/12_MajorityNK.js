/* Problem:
Find all elements in an array that appear more than n/k times, where n is the size of the array and k is a given integer.

Example 1:
Input: arr[] = [30, 10, 20, 20, 20, 10, 40, 30, 30], k = 4
Output: [30, 20]
Explanation: n = 9, n/k = 2.25
- Element 30 appears 3 times (3 ≥ 2.25) ✓
- Element 20 appears 3 times (3 ≥ 2.25) ✓
- Element 10 appears 2 times (2 < 2.25) ✗
- Element 40 appears 1 time (1 < 2.25) ✗

Example 2:
Input: arr[] = [1, 1, 2, 2, 3, 5, 4, 2, 2, 3, 1, 1, 1], k = 4
Output: [1, 2]
Explanation: n = 13, n/k = 3.25
- Element 1 appears 5 times (5 ≥ 3.25) ✓
- Element 2 appears 4 times (4 ≥ 3.25) ✓
- Element 3 appears 2 times (2 < 3.25) ✗
- Element 4 appears 1 time (1 < 3.25) ✗
- Element 5 appears 1 time (1 < 3.25) ✗

Example 3:
Input: arr[] = [1, 2, 3, 4, 5], k = 3
Output: []
Explanation: n = 5, n/k = 1.67
- All elements appear exactly 1 time (1 < 1.67) ✗
- No element appears more than n/k times

Constraints:
1 ≤ k ≤ n ≤ 10^5
1 ≤ arr[i] ≤ 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(k)
*/

// ✅✅✅✅ EXTENDED BOYER-MOORE VOTING ALGORITHM ✅✅✅✅

// ✅ TC = O(n*k) --> Two passes through array
// ✅ SC = O(k) --> At most k-1 candidates stored
function majorityNK(arr, k){
    let n = arr.length
    
    // 1. Phase 1: Voting to find k-1 majority candidates
    let candidates = new Map()
    for(let i=0; i<n; i++){ // O(n) * O(k) = O(n*k)
        if(candidates.has(arr[i])){
            // Element already a candidate, increase count
            candidates.set(arr[i], candidates.get(arr[i]) + 1)
        }else if(candidates.size < k-1){
            // Less than k-1 candidates, add new candidate
            candidates.set(arr[i], 1)
        }else{
            // No more space for new candidates & it is not a candidate, so decrease all candidates counts by 1
            for(let [key, val] of candidates){ // O(k)
                if(val === 1){
                    candidates.delete(key)  // Remove if count becomes 0
                }else{
                    candidates.set(key, val - 1)  // Decrease count
                }
            }
        }
    }
    
    // 2. Phase 2: Validate candidates by counting actual frequencies
    // Reset all candidate counts to 0
    for(let [key, val] of candidates){
        candidates.set(key, 0)
    }
    
    // Count actual frequency of each candidate
    for(let i=0; i<n; i++){
        if(candidates.has(arr[i])){
            candidates.set(arr[i], candidates.get(arr[i]) + 1)
        }
    }
    
    // Filter candidates that appear more than n/k times
    let res = []
    for(let [key, val] of candidates){
        if(val > n/k){
            res.push(key)
        }
    }
    return res
}

// ✅ Test Cases
console.log(majorityNK([30, 10, 20, 20, 20, 10, 40, 30, 30], 4)); // [30, 20]
console.log(majorityNK([1, 1, 2, 2, 3, 5, 4, 2, 2, 3, 1, 1, 1], 4)); // [1, 2]
console.log(majorityNK([1, 2, 3, 4, 5], 3)); // []
console.log(majorityNK([1, 1, 1, 2, 2], 2)); // [1]

/*🎯 CORE IDEA: Instead of using a hash map to count all elements (O(n) space), we use the EXTENDED BOYER-MOORE VOTING ALGORITHM to find at most k-1 majority candidates in O(k) space, then validate them.

📋 STEP-BY-STEP FLOW:

1️⃣ PHASE 1 - CANDIDATE SELECTION (Voting Algorithm):
   - Maintain at most k-1 candidates with their counts
   - For each element:
     * If element is already a candidate: increment its count
     * If less than k-1 candidates: add new candidate
     * If k-1 candidates exist: decrease all counts by 1, remove if count becomes 0

2️⃣ PHASE 2 - CANDIDATE VALIDATION:
   - Reset all candidate counts to 0
   - Count actual frequency of each candidate in the array
   - Return candidates that appear more than n/k times

3️⃣ MATHEMATICAL INSIGHT:
   - At most k-1 elements can appear more than n/k times
   - If k elements each appeared more than n/k times: k × (n/k + 1) > n
   - This is impossible, so we need at most k-1 candidates

4️⃣ VOTING LOGIC:
   - When we have k-1 candidates and encounter a new element
   - We decrease all counts by 1 (canceling out one vote for each candidate)
   - This ensures we don't miss any majority element

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time vs O(n) time for hash map, but O(k) space vs O(n) space
2️⃣ MATHEMATICAL BOUND: At most k-1 elements can be majority
3️⃣ VOTING ALGORITHM: Efficiently finds candidates without counting all elements
4️⃣ VALIDATION: Ensures we only return actual majority elements

💡 KEY INSIGHTS:

1️⃣ CANDIDATE BOUND: At most k-1 elements can appear more than n/k times
2️⃣ VOTING MECHANISM: Decrease all counts when adding new candidate
3️⃣ VALIDATION NECESSARY: Candidates might not be actual majority elements
4️⃣ SPACE OPTIMAL: O(k) space instead of O(n) for frequency counting

🎯 WHY VOTING ALGORITHM WORKS?
- When we decrease all counts by 1, we're canceling out one vote for each candidate
- This ensures that if an element appears more than n/k times, it will survive the voting process
- The algorithm maintains the invariant that we have at most k-1 candidates

🎯 ALGORITHM INTUITION:
Think of it as an election with k-1 seats. When a new candidate appears and all seats are filled,
we remove one vote from each existing candidate. This ensures that truly popular candidates
(those appearing more than n/k times) will survive the process.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [30, 10, 20, 20, 20, 10, 40, 30, 30]     (n=9)
k = 4 → n/k = 2.25

🎯 GOAL: Find elements appearing more than 2.25 times!

🔍 PHASE 1 - CANDIDATE SELECTION:

📋 Process each element:

ITERATION 0: arr[0] = 30
candidates.size = 0 < k-1 = 3
Add 30: candidates = {30: 1}

ITERATION 1: arr[1] = 10
candidates.size = 1 < 3
Add 10: candidates = {30: 1, 10: 1}

ITERATION 2: arr[2] = 20
candidates.size = 2 < 3
Add 20: candidates = {30: 1, 10: 1, 20: 1}

ITERATION 3: arr[3] = 20
20 is already a candidate
candidates = {30: 1, 10: 1, 20: 2}

ITERATION 4: arr[4] = 20
20 is already a candidate
candidates = {30: 1, 10: 1, 20: 3}

ITERATION 5: arr[5] = 10
10 is already a candidate
candidates = {30: 1, 10: 2, 20: 3}

ITERATION 6: arr[6] = 40
candidates.size = 3 = k-1
Decrease all counts by 1:
- 30: 1-1 = 0 → delete
- 10: 2-1 = 1 → keep
- 20: 3-1 = 2 → keep
candidates = {10: 1, 20: 2}

ITERATION 7: arr[7] = 30
candidates.size = 2 < 3
Add 30: candidates = {10: 1, 20: 2, 30: 1}

ITERATION 8: arr[8] = 30
30 is already a candidate
candidates = {10: 1, 20: 2, 30: 2}

📊 Phase 1 Result: candidates = {10: 1, 20: 2, 30: 2}

🔍 PHASE 2 - CANDIDATE VALIDATION:

📋 Reset counts and count actual frequencies:
candidates = {10: 0, 20: 0, 30: 0}

📋 Count actual frequencies:
- 30 appears 3 times → candidates = {10: 0, 20: 0, 30: 3}
- 10 appears 2 times → candidates = {10: 2, 20: 0, 30: 3}
- 20 appears 3 times → candidates = {10: 2, 20: 3, 30: 3}
- 40 appears 1 time → not a candidate, skip

📋 Filter majority elements (frequency > n/k = 2.25):
- 10: 2 ≤ 2.25 ✗
- 20: 3 > 2.25 ✓
- 30: 3 > 2.25 ✓

🏆 FINAL RESULT: [20, 30]

🎯 VERIFICATION:
- Element 20: appears 3 times, 3 > 2.25 ✓
- Element 30: appears 3 times, 3 > 2.25 ✓
- Element 10: appears 2 times, 2 ≤ 2.25 ✗
- Element 40: appears 1 time, 1 ≤ 2.25 ✗

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [1, 1, 2, 2, 3, 5, 4, 2, 2, 3, 1, 1, 1]     (n=13)
k = 4 → n/k = 3.25

🔍 PHASE 1 - CANDIDATE SELECTION:

📋 Key iterations:
- i=0: 1 → candidates = {1: 1}
- i=1: 1 → candidates = {1: 2}
- i=2: 2 → candidates = {1: 2, 2: 1}
- i=3: 2 → candidates = {1: 2, 2: 2}
- i=4: 3 → candidates = {1: 2, 2: 2, 3: 1}
- i=5: 5 → decrease all → candidates = {1: 1, 2: 1}
- i=6: 4 → candidates = {1: 1, 2: 1, 4: 1}
- i=7: 2 → candidates = {1: 1, 2: 2, 4: 1}
- i=8: 2 → candidates = {1: 1, 2: 3, 4: 1}
- i=9: 3 → decrease all → candidates = {2: 2}
- i=10: 1 → candidates = {2: 2, 1: 1}
- i=11: 1 → candidates = {2: 2, 1: 2}
- i=12: 1 → candidates = {2: 2, 1: 3}

🔍 PHASE 2 - VALIDATION:
- 1: appears 5 times > 3.25 ✓
- 2: appears 4 times > 3.25 ✓

🏆 FINAL RESULT: [1, 2]

🔍 WHY THIS WORKS:
1️⃣ VOTING ALGORITHM ensures we don't miss any majority element
2️⃣ CANDIDATE BOUND limits space to O(k) instead of O(n)
3️⃣ VALIDATION PHASE ensures accuracy by counting actual frequencies
4️⃣ MATHEMATICAL INSIGHT guarantees at most k-1 majority elements

💡 KEY INSIGHT:
We don't need to count all elements - we can use the voting algorithm to find
candidates and then validate only those candidates!

🎯 TIME COMPLEXITY ANALYSIS:
- Phase 1: O(n) - single pass through array
- Phase 2: O(n) - single pass through array
- Total: O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Candidates map: O(k) - at most k-1 candidates
- Result array: O(k) - at most k-1 majority elements
- Total: O(k)

🎯 OPTIMIZATION TECHNIQUES:
- Use Map for O(1) candidate operations
- Decrease all counts simultaneously for efficiency
- Validate only candidates, not all elements

*/