/* Problem: ✅✅✅✅ Activity Selection (Maximum Non-Overlapping Activities) ✅✅✅✅

Given a set of activities with start and finish times, select the maximum number
of activities that can be performed by a single person, assuming the person can
work on only one activity at a time. Once an activity starts, the person must
stay with it until it finishes (i.e., no preemption). Two activities are
compatible if one's start time is not less than the other's finish time.

Key Requirements:
- Each activity has a start time and a finish time.
- Select maximum number of activities that do not overlap.
- One person can take only one activity at a time.
- Start times can be equal; finish times can be equal.
- Activities with the same finish time: pick one (doesn't matter which) if start is >= previous finish.

Example 1:
Input: activities = [(1, 3), (2, 4), (3, 5), (0, 6), (5, 7), (5, 9), (8, 9)]
Output: 4
Explanation: One optimal set: (1,3) → (3,5) → (5,7) → (8,9)

Example 2:
Input: activities = [(3, 8), (2, 4), (1, 3), (10, 11)]
Output: 3
Explanation: Optimal set: (1,3) → (3,8) → (10,11)

Example 3:
Input: activities = [(12, 25), (10, 20), (20, 30)]
Output: 2
Explanation: Select (10,20) → (20,30)

Constraints:
- 1 ≤ number of activities ≤ 10^5
- 0 ≤ start[i] < finish[i] ≤ 10^9 (or any comparable range)

Expected Complexities:
Time Complexity: O(n log n) — Sorting activities by finish time
Auxiliary Space: O(1) if sorting in-place; O(n) if making a copy
*/

class Activity {
    constructor(s, f) {
        this.start = s;
        this.finish = f;
    }
}

// ✅ TC = O(n log n): sort activities by finish time, then linear scan
// ✅ SC = O(1) (if we can sort in-place) or O(n) (if we must preserve original order)
// Greedy Strategy: Always pick the next activity with the earliest finish time that
// is compatible with the previously selected one.
function maxNonOverlapActivities(arr) {
    if (arr.length === 0) return 0;

    // 1. Sort activities by their finish time (earliest finish first)
    arr.sort((a, b) => a.finish - b.finish);

    // 2. Pick the first activity (earliest finish) and initialize count
    let count = 1;        // We always take the first activity after sorting
    let lastPicked = 0;   // Index of the last activity included in the solution

    // 3. Iterate through the rest and pick compatible activities greedily
    for (let i = 1; i < arr.length; i++) {
        // If the current activity starts after or when the last picked one finishes
        if (arr[i].start >= arr[lastPicked].finish) { // ✅✅ If strict rule: start > end. Else start >= end.
            count++;            // Include this activity
            lastPicked = i;     // Update the index of the last picked activity
        }
    }

    return count;
}


// 2. When two arrays(start and finish) are given:
// ✅ TC = O(N log N) - Sorting by finish time
// ✅ SC = O(N) - Additional array
function activitySelection(start, finish) {
    let n = start.length
    let arr = []
    for(let i=0; i<n; i++){
        arr.push([start[i], finish[i]])
    }
    
    // Sort by finish time
    arr.sort((a, b)=>a[1]-b[1])
    
    // Initialize count and previous index
    let c=1
    let prev=0
    
    for(let i=1; i<n; i++){
        if(arr[i][0] >= arr[prev][1]){ // ✅✅ If strict rule: start > end. Else start >= end.
            c++
            prev = i
        }
    }
    
    return c
}

// Test cases
let arr = [
    new Activity(3, 8),
    new Activity(2, 4),
    new Activity(1, 3),
    new Activity(10, 11)
];
console.log("Test 1:", maxNonOverlapActivities(arr)); // 3

let arr1 = [
    new Activity(12, 25),
    new Activity(10, 20),
    new Activity(20, 30)
];
console.log("Test 2:", maxNonOverlapActivities(arr1)); // 2

let arr2 = [
    new Activity(1, 2),
    new Activity(3, 4),
    new Activity(0, 6),
    new Activity(5, 7),
    new Activity(8, 9),
    new Activity(5, 9)
];
console.log("Test 3:", maxNonOverlapActivities(arr2)); // 4

/*🎯 CORE IDEA: Sort activities by finish time and greedily pick the next activity
that starts after the last selected activity finishes. This maximizes the number
of non-overlapping activities by always leaving as much room as possible for future
activities.

📋 STEP-BY-STEP FLOW:

1️⃣ SORT BY FINISH TIME:
   - Sort activities in ascending order of finish time.
   - Ensures we always consider the activity that frees earliest.

2️⃣ SELECT FIRST ACTIVITY:
   - After sorting, pick the first activity (earliest finish) as the starting point.

3️⃣ GREEDY SELECTION LOOP:
   - Iterate through remaining activities.
   - If an activity's start time is ≥ finish time of last selected activity, include it.
   - Update last selected index.

4️⃣ COUNT RESULT:
   - Number of selected activities = maximum compatible activities.

🧠 WHY GREEDY WORKS:
- Earliest finish leaves maximum room for future activities.
- Greedy-choice property holds: local optimal (earliest finish) → global optimal.
- Optimal substructure: remaining subproblem is the same after picking an activity.
- Proof sketch: If an optimal solution picks a later-finishing activity first, we
  can swap it with the earliest-finishing one without reducing the solution size.

💡 KEY INSIGHTS:
- Always sort by finish time, not start time.
- Picking earliest finish ensures maximum schedule flexibility.
- Compatible means start ≥ finish (allowing back-to-back activities).
- Equivalent to interval scheduling problem.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: activities = [(3,8), (2,4), (1,3), (10,11)]

STEP 1: Sort by finish time:
Sorted activities (start, finish):
  1. (1, 3)
  2. (2, 4)
  3. (3, 8)
  4. (10, 11)

STEP 2: Select first activity:
  Include (1, 3), count = 1, lastPicked finish = 3

STEP 3: Iterate:
  - (2, 4): start 2 < 3 → conflict → skip
  - (3, 8): start 3 ≥ 3 → compatible → include, count = 2, lastPicked finish = 8
  - (10, 11): start 10 ≥ 8 → compatible → include, count = 3

Final count = 3 activities: (1,3) → (3,8) → (10,11)

📊 VISUAL TIMELINE (Sorted Order):

Time: |---1---2---3---4---5---6---7---8---9---10---11|
       [1---3)
           [2---4)
               [3-------------8)
                                   [10--11)

Selected activities (✓), skipped (✗):
  ✓ (1,3)
  ✗ (2,4)
  ✓ (3,8)
  ✓ (10,11)

📊 GREEDY SELECTION DEMONSTRATION:
- After (1,3), the next earliest finishing compatible activity is (3,8)
- After (3,8), next compatible is (10,11)
- At each step we choose the earliest finishing compatible activity
- Any other choice finishes later, reducing future options

▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

🔍 WHY EARLIEST FINISH GREEDY IS OPTIMAL:

1️⃣ GREEDY CHOICE PROPERTY:
- Let A be the activity with earliest finish.
- Suppose optimal solution O picks some other activity B first.
- A finishes no later than B; replace B with A in O → feasible solution same size.
- Hence there is an optimal solution that starts with A.

2️⃣ OPTIMAL SUBSTRUCTURE:
- After selecting earliest finishing compatible activity, remaining problem is:
  maximize activities starting after its finish → same structure.
- Solve recursively with the same greedy strategy.

3️⃣ CONTRADICTION PROOF:
- Assume greedy solution is sub-optimal.
- Compare greedy solution G and optimal solution O.
- Align picked activities from start; at first difference, O picks later finish →
  O leaves less time → contradiction (G cannot be worse).

💡 KEY TAKEAWAY:
Picking the activity that finishes earliest never blocks an activity that could
have been chosen otherwise, ensuring the maximum number of activities overall.
*/

/*🎯 WHY NOT OTHER APPROACHES?

- Sorting by start times fails: earliest start can have late finish, blocking others.
- Dynamic programming is unnecessary: greedy suffices (linear after sorting).
- Backtracking is exponential: tries all subsets (2^n) vs greedy O(n log n).

⚠️ Example where start-time sorting fails:
  Activities: (1,5), (2,3), (4,6)
  - Sorted by start → pick (1,5), then none compatible → 1 activity
  - Optimal (by finish) → pick (2,3) → (4,6) → 2 activities

Hence sorting by finish time + greedy selection is the correct strategy.
*/

/*🎯 TIME COMPLEXITY ANALYSIS:
- Sorting: O(n log n)
- Iteration: O(n)
- Total: O(n log n)

🎯 SPACE COMPLEXITY ANALYSIS:
- In-place sort: O(1) auxiliary
- If copying array: O(n) for copy

🎯 EDGE CASES:
- Empty list → result 0 (no activities)
- One activity → result 1 (always select it)
- All overlapping (e.g., same start) → result 1
- All non-overlapping → result n
- Activities with same finish time → pick earliest finish; tie doesn’t hurt
- Activities with start == finish of previous → compatible (back-to-back allowed)

🎯 ADVANTAGES:
- Simple greedy strategy
- Optimal solution guaranteed
- Efficient (O(n log n))
- Scales to large input
- Works with any comparable start/finish times

🎯 DISADVANTAGES:
- Requires sorting (O(n log n))
- If original order must be preserved, need extra space (copy)
- Only counts maximum number; does not list activities (can be extended easily)

🎯 REAL-WORLD APPLICATIONS:
- Scheduling talks in a conference room
- CPU job scheduling (non-overlapping intervals)
- Booking meeting rooms / classrooms
- Selecting compatible TV ads or commercials
- Maximizing tasks for resource-constrained systems

🎯 RELATED PROBLEMS:
- Interval scheduling based on earliest start (variation)
- Weighted interval scheduling (profits per activity)
- Minimum number of meeting rooms (interval partitioning)
- Bus platform allocation
- Maximum set of mutually compatible intervals

🎯 TESTING STRATEGY:
- Empty list, single activity
- Activities already sorted
- Activities in reverse order
- All overlapping vs all disjoint
- Random order with same start/finish times
- Large input to test performance

🎯 DEBUGGING TIPS:
- Print sorted activities to ensure correct order
- Trace count increments to verify compatibility checks
- Check condition `start >= finish` carefully (≥ not >!)
- Ensure sorting comparator uses finish times

🎯 COMMON MISTAKES:
- Sorting by start time instead of finish time
- Using `>` instead of `>=` for compatibility (misses back-to-back)
- Forgetting to initialize count with first activity
- Not handling empty input array

🎯 BEST PRACTICES:
- Use meaningful names (`lastPicked`, `count`)
- Guard against empty input
- Keep Activity class simple (just start & finish)
- Extend easily to store selected activities (keep list of indices)

🎯 INTERVIEW TIPS:
- Explain why greedy works (earliest finish argument)
- Mention proof outline (exchange argument)
- Walk through a sample input
- Discuss time and space complexity
- Compare with other strategies (DP, brute force)

🎯 GREEDY PATTERN SUMMARY:
1. Sort intervals by finish time.
2. Select the first interval.
3. For each next interval, if compatible, select it.
4. Count selections.

This is a standard greedy interval scheduling pattern!
*/