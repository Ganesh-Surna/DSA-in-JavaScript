/* Problem: ✅✅✅✅ Maximum Number of Meetings in a Single Room ✅✅✅✅

Given two arrays `start[]` and `end[]` of equal length N (1-indexed or 0-indexed),
representing the start and end times of meetings, find the maximum number of
meetings that a single person can attend in a meeting room. Two meetings are
compatible if the start time of the next meeting is strictly greater than the end
time of the previous meeting (i.e., meetings cannot share a boundary). If the
problem allows equality (start >= end), adjust the condition accordingly—here we
enforce the strictly greater rule as specified in the common interview variant.

Key Requirements:
- Each meeting is defined by a start and end time.
- A meeting can be attended only if it starts strictly after the previous one ends.
- Only one meeting can be attended at a time.
- Need to maximize the number of meetings attended.
- Meetings can be sorted/reordered to solve the problem.

Example 1:
Input:
  start = [1, 3, 0, 5, 8, 5]
  end   = [2, 4, 6, 7, 9, 9]
Output: 4
Explanation: Optimal set → meetings at indices (0-based) [0], [1], [3], [4]
  (1,2) → (3,4) → (5,7) → (8,9)
Strict inequality satisfied: 3 > 2, 5 > 4, 8 > 7.

Example 2:
Input:
  start = [10, 12, 20]
  end   = [20, 25, 30]
Output: 2
Explanation: Attend (10,20) then (20,30) is NOT allowed (20 is not > 20). Instead,
             we can attend (10,20) alone or (12,25) then (??) no strict. With strict
             rule, best is (10,20) then (??) none, or (20,30) alone. If equality were
             allowed, answer could be 3.
             (Illustrates the importance of condition.)

Example 3:
Input:
  start = [1, 2, 3]
  end   = [2, 3, 4]
Output: 3
Explanation: Meetings (1,2) → (2,3) → (3,4) violate strict rule.
If we allow start >= end, answer = 3; with strict rule, answer = 1 (only first).
This example shows how problem constraint affects solution.

Constraints:
- 1 ≤ N ≤ 10^5
- 0 ≤ start[i] < end[i] ≤ 10^9 (no zero-length meetings)
- Arrays may be unsorted; sorting allowed

Expected Complexities:
Time Complexity: O(N log N) — dominated by sorting meetings by end time
Auxiliary Space: O(N) to store paired intervals (or O(1) if done in-place)
*/

// ✅ TC = O(N log N) — sort by end time, then linear scan
// ✅ SC = O(N) to create interval array (can be optimized to O(1) with index sorting)
// Greedy strategy: always pick the meeting that finishes earliest, then continue
// with the next meeting that starts strictly after the last selected meeting.
function maxMeetings(start, end) {
    let n = start.length;
    if (n === 0) return 0;

    // 1. Combine start and end times into pairs for easier sorting
    let intervals = [];
    for (let i = 0; i < n; i++) {
        intervals.push([start[i], end[i]]);
    }

    // 2. Sort meetings by their end time (earliest finish first)
    intervals.sort((a, b) => a[1] - b[1]);

    // 3. Select the first meeting (earliest finish) and initialize count
    let count = 1;     // We attend the first meeting after sorting
    let last = 0;      // Index of the last selected meeting

    // 4. Iterate remaining meetings, picking those that start strictly after last end
    for (let i = 1; i < n; i++) {
        if (intervals[i][0] > intervals[last][1]) { // strict rule: start > end
            count++;
            last = i; // Update last selected meeting index
        }
    }

    return count;
}

// Test cases
let start = [1, 3, 0, 5, 8, 5];
let end = [2, 4, 6, 7, 9, 9];
console.log("Test 1:", maxMeetings(start, end)); // 4

let start2 = [10, 12, 20];
let end2 = [20, 25, 30];
console.log("Test 2:", maxMeetings(start2, end2)); // 2 (strict rule)

let start3 = [1, 2, 3];
let end3 = [2, 3, 4];
console.log("Test 3:", maxMeetings(start3, end3)); // 1 with strict rule

/*🎯 CORE IDEA: This is the classic interval scheduling problem. Sort meetings by
finish time and greedily pick the next meeting whose start is strictly after the
last picked meeting's end. This ensures the maximum count of non-overlapping meetings.

📋 STEP-BY-STEP FLOW:

1️⃣ PAIR & SORT:
   - Pair each meeting's start and end.
   - Sort by end time ascending (earliest finishing meeting first).

2️⃣ SELECT FIRST MEETING:
   - After sorting, pick the earliest finishing meeting (first interval).

3️⃣ GREEDY SELECTION LOOP:
   - For each subsequent meeting:
     - If its start time is strictly greater than the last selected meeting's end,
       include it and update last selected.

4️⃣ COUNT RESULT:
   - The total count equals the maximum meetings that can be attended.

🧠 WHY GREEDY WORKS:
- Finishing earliest leaves the maximum room for future meetings.
- Greedy-choice property: earliest finish is always part of some optimal solution.
- Optimal substructure: after selecting one meeting, remaining problem same with reduced intervals.

💡 KEY INSIGHTS:
- Sorting by end time is essential; sorting by start time fails.
- Strict inequality in condition ensures no boundary overlap.
- Equivalent to activity selection problem with strict > rule.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: start = [1, 3, 0, 5, 8, 5], end = [2, 4, 6, 7, 9, 9]

1️⃣ Pair and sort by end:
  Meetings (start, end):
    (1,2), (3,4), (0,6), (5,7), (8,9), (5,9)
  Sorted by end → [(1,2), (3,4), (5,7), (0,6), (8,9), (5,9)]
                  (Note: (0,6) appears after (5,7) due to end time 6).

2️⃣ Select first meeting (1,2) → count=1, last end=2

3️⃣ Iterate:
  - (3,4): start=3 > 2 → include → count=2, last end=4
  - (5,7): start=5 > 4 → include → count=3, last end=7
  - (0,6): start=0 ≤ 7 → skip
  - (8,9): start=8 > 7 → include → count=4, last end=9
  - (5,9): start=5 ≤ 9 → skip

Final count = 4

📊 TIMELINE VISUAL:

Time: |---1---2---3---4---5---6---7---8---9|
       [1-2) ✓
           [3-4) ✓
               [0-----6) ✗ (overlap with 1-2)
                   [5-----7) ✓
                           [8-9) ✓
                   [5-----9) ✗

Selected meetings: (1,2), (3,4), (5,7), (8,9)
Matches expected maximum count of 4.
*/

/*🎯 GREEDY PROOF SKETCH:

1️⃣ Suppose we have an optimal solution O that does not pick the earliest finishing meeting E.
2️⃣ Since E finishes earliest, replacing the first meeting in O with E cannot reduce the number of meetings (it finishes no later).
3️⃣ The remaining meetings can be shifted accordingly without conflicts.
4️⃣ Therefore, there's an optimal solution that starts with the greedy choice E.
5️⃣ Apply recursively to remaining meetings ⇒ greedy strategy optimal.

This exchange argument ensures optimality of sorting by finish time and picking compatible meetings greedily.
*/

/*🎯 STRICT vs NON-STRICT CONDITION:

- Strict rule (start > end): meetings cannot touch; there must be a gap.
- Non-strict rule (start ≥ end): back-to-back meetings allowed.
- Modify condition in loop accordingly: use `>=` if problem states "including when end == start".
- Ensure clarity in interviews; ask the interviewer about boundary condition.
*/

/*🎯 TIME COMPLEXITY ANALYSIS:
- Pairing and sorting: O(N log N)
- Greedy selection loop: O(N)
- Total: O(N log N)

🎯 SPACE COMPLEXITY ANALYSIS:
- Interval array: O(N)
- If indexes stored instead, auxiliary can be O(1)
*/

/*🎯 EDGE CASES:
- Empty inputs (N = 0) → 0 meetings
- Single meeting → always 1
- Meetings all overlapping → result 1
- Meetings already sorted → still works
- Negative or zero durations (start >= end) should be validated based on problem constraints
*/

/*🎯 ADVANTAGES:
- Simple greedy algorithm
- Optimal solution guaranteed
- Efficient for large N

🎯 DISADVANTAGES:
- Requires sorting
- Need to handle strict vs non-strict condition carefully

🎯 REAL-WORLD APPLICATIONS:
- Scheduling talks in a conference hall
- Booking rooms or resources with time slots
- CPU scheduling of non-preemptive tasks
- Personal calendar optimization

🎯 RELATED PROBLEMS:
- Activity selection (classic variant)
- Meeting rooms problem (minimum rooms needed)
- Weighted interval scheduling (DP)
- Maximum number of trains on a platform

🎯 TESTING STRATEGY:
- Random input with varying overlaps
- All meetings overlapping (should return 1)
- Non-overlapping meetings (should return N)
- Boundary cases with equal start/end times
- Large inputs to assess performance

🎯 DEBUGGING TIPS:
- Print sorted intervals to confirm order
- Trace count updates and last end times
- Verify condition (> vs >=) matches problem statement

🎯 COMMON MISTAKES:
- Sorting by start time instead of end time
- Using non-strict condition when strict is required (and vice versa)
- Forgetting to handle empty input arrays

🎯 BEST PRACTICES:
- Encapsulate start/end into an array of pairs for clarity
- Document boundary condition (strict >)
- Keep function pure (no side effects on input arrays if needed)

🎯 INTERVIEW TIPS:
- Explain the greedy rationale clearly
- Mention the exchange argument for correctness
- Discuss strict vs non-strict scenarios
- Provide example and walk through solution
- Mention complexity

🎯 GREEDY PATTERN SUMMARY:
1. Sort intervals by earliest finish time.
2. Pick the first interval.
3. For each subsequent interval, if compatible (start > last end), pick it.
4. Count selections.

This is the standard interval scheduling / activity selection greedy pattern!
*/
