/* Problem:
Given arrival arr[] and departure dep[] times of trains on the same day, find the minimum number of platforms needed so that no train waits. A platform cannot serve two trains at the same time; if a train arrives before another departs, an extra platform is needed.

Note: Time intervals are in the 24-hour format (HHMM), where the first two characters represent hour (between 00 to 23) and the last two characters represent minutes (this will be <= 59 and >= 0). Leading zeros for hours less than 10 are optional (e.g., 0900 is the same as 900).

Example 1:
Input:
arr[] = [900, 940, 950, 1100, 1500, 1800]
dep[] = [910, 1200, 1120, 1130, 1900, 2000]
Output: 3
Explanation: There are three trains during the time 9:40 to 12:00. So we need a minimum of 3 platforms.
Timeline: 9:40-12:00 has overlapping trains requiring 3 platforms.

Example 2:
Input:
arr[] = [900, 1235, 1100]
dep[] = [1000, 1240, 1200]
Output: 1
Explanation: All train times are mutually exclusive. So we need only one platform.
No overlapping schedules - one platform suffices.

Example 3:
Input:
arr[] = [1000, 935, 1100]
dep[] = [1200, 1240, 1130]
Output: 3
Explanation: All 3 trains have to be there from 11:00 to 11:30.
Maximum overlap occurs at 11:00-11:30 requiring 3 platforms.

Constraints:
1 ≤ number of trains ≤ 50000
0000 ≤ arr[i] ≤ dep[i] ≤ 2359

Expected Time Complexity: O(n log n)
Expected Auxiliary Space: O(1)
*/

// ✅ TC = O(n log n) - due to sorting
// ✅ SC = O(1) - constant extra space
function minPlatform(arr, dep) {
    // 1. Sort Arrays
    arr.sort((a, b)=>a-b)
    dep.sort((a, b)=>a-b)
    
    let i=1, j=0;              // Two pointers
    let curr = 1, res = 1;      // Current platforms, maximum platforms
    
    while(i < arr.length && j < dep.length){
        if(arr[i] <= dep[j]){   // New train arrives before/at departure
            curr++              // Need one more platform
            i++                 // Move to next arrival
        }else{                  // Train departs before new arrival
            curr--              // Free up one platform
            j++                 // Move to next departure
        }
        
        res = Math.max(res, curr)  // Track maximum platforms needed
    }
    
    return res
}

// ✅ Test Cases
console.log(minPlatform([900, 940, 950, 1100, 1500, 1800], [910, 1200, 1120, 1130, 1900, 2000])); // 3
console.log(minPlatform([900, 1235, 1100], [1000, 1240, 1200])); // 1
console.log(minPlatform([1000, 935, 1100], [1200, 1240, 1130])); // 3

/*🎯 CORE IDEA: Instead of checking every possible time point (O(n²)), we use a TWO-POINTER approach 
   on SORTED arrays to efficiently track platform usage at each arrival/departure event.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Sort arrival array in ascending order
   - Sort departure array in ascending order
   - Initialize pointers: i=1 (arrivals), j=0 (departures)
   - Start with curr=1, res=1 (first train already occupies 1 platform)

2️⃣ TWO-POINTER TECHNIQUE:
   - Compare current arrival time with current departure time
   - If arrival ≤ departure: process as NEW TRAIN ARRIVAL
     * Increment current platform count (need one more platform)
     * Move to next arrival
   - If arrival > departure: process as TRAIN DEPARTURE
     * Decrement current platform count (free up one platform)
     * Move to next departure

3️⃣ TRACK MAXIMUM PLATFORMS:
   - After each operation, update maximum platforms needed so far
   - Continue until all arrivals or departures are processed
   - The maximum value gives us minimum platforms required

4️⃣ RETURN RESULT:
   - Return the maximum number of platforms needed at any time

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n log n) vs O(n²) for naive approach
2️⃣ SPACE: O(1) vs O(n) for storing time points
3️⃣ INTUITION: We don't need to check every time point, just transition points
4️⃣ SORTING: Enables linear scan with two pointers

💡 KEY INSIGHT:
The maximum platforms needed occur at transition points (arrivals/departures). By sorting both arrays
and using two pointers, we can process all transitions in O(n) time after O(n log n) sorting.

🎯 WHY SORTING IS CRUCIAL:
- Without sorting: We'd need to check every possible time point
- With sorting: We only check actual arrival/departure times
- Two pointers ensure we process events in chronological order

🔍 ALGORITHM INTUITION:
Think of it as a "sweep line" algorithm - we sweep through time and track
the number of platforms in use at each transition point. The maximum platforms
needed at any point gives us the answer.

🎯 PLATFORM ALLOCATION LOGIC:
- When a train arrives: we need one more platform
- When a train departs: we free up one platform
- We track the peak usage to determine minimum platforms needed
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [900, 940, 950, 1100, 1500, 1800]     (arrival times)
dep = [910, 1200, 1120, 1130, 1900, 2000]   (departure times)

🎯 GOAL: Find minimum platforms needed without checking every time point!

🔍 SORTING STEP:
arr = [900, 940, 950, 1100, 1500, 1800]     (sorted arrivals)
dep = [910, 1120, 1130, 1200, 1900, 2000]   (sorted departures)

🎯 TWO-POINTER PROCESS:

INITIALIZATION:
i = 1, j = 0              (start from 2nd arrival, 1st departure)
curr = 1, res = 1         (first train already occupies 1 platform)

─────────────────────────────────────────

ITERATION 1: i=1, j=0
arr[1] = 940, dep[0] = 910
940 > 910 → TRAIN DEPARTURE
curr = 1 - 1 = 0
j = 0 + 1 = 1
res = max(1, 0) = 1

📊 STATE: 0 platforms in use (train departed at 910)

─────────────────────────────────────────

ITERATION 2: i=1, j=1
arr[1] = 940, dep[1] = 1120
940 ≤ 1120 → NEW TRAIN ARRIVAL
curr = 0 + 1 = 1
i = 1 + 1 = 2
res = max(1, 1) = 1

📊 STATE: 1 platform in use (train arrived at 940)

─────────────────────────────────────────

ITERATION 3: i=2, j=1
arr[2] = 950, dep[1] = 1120
950 ≤ 1120 → NEW TRAIN ARRIVAL
curr = 1 + 1 = 2
i = 2 + 1 = 3
res = max(1, 2) = 2

📊 STATE: 2 platforms in use (trains at 940, 950)

─────────────────────────────────────────

ITERATION 4: i=3, j=1
arr[3] = 1100, dep[1] = 1120
1100 ≤ 1120 → NEW TRAIN ARRIVAL
curr = 2 + 1 = 3
i = 3 + 1 = 4
res = max(2, 3) = 3

📊 STATE: 3 platforms in use (trains at 940, 950, 1100) ← PEAK!

─────────────────────────────────────────

ITERATION 5: i=4, j=1
arr[4] = 1500, dep[1] = 1120
1500 > 1120 → TRAIN DEPARTURE
curr = 3 - 1 = 2
j = 1 + 1 = 2
res = max(3, 2) = 3

📊 STATE: 2 platforms in use (train departed at 1120)

─────────────────────────────────────────

ITERATION 6: i=4, j=2
arr[4] = 1500, dep[2] = 1130
1500 > 1130 → TRAIN DEPARTURE
curr = 2 - 1 = 1
j = 2 + 1 = 3
res = max(3, 1) = 3

📊 STATE: 1 platform in use (train departed at 1130)

─────────────────────────────────────────

ITERATION 7: i=4, j=3
arr[4] = 1500, dep[3] = 1200
1500 > 1200 → TRAIN DEPARTURE
curr = 1 - 1 = 0
j = 3 + 1 = 4
res = max(3, 0) = 3

📊 STATE: 0 platforms in use (train departed at 1200)

─────────────────────────────────────────

ITERATION 8: i=4, j=4
arr[4] = 1500, dep[4] = 1900
1500 ≤ 1900 → NEW TRAIN ARRIVAL
curr = 0 + 1 = 1
i = 4 + 1 = 5
res = max(3, 1) = 3

📊 STATE: 1 platform in use (train arrived at 1500)

─────────────────────────────────────────

ITERATION 9: i=5, j=4
arr[5] = 1800, dep[4] = 1900
1800 ≤ 1900 → NEW TRAIN ARRIVAL
curr = 1 + 1 = 2
i = 5 + 1 = 6
res = max(3, 2) = 3

📊 STATE: 2 platforms in use (trains at 1500, 1800)

─────────────────────────────────────────

LOOP ENDS: i=6, j=4 (i >= n)

🏆 FINAL RESULT: Minimum platforms needed = 3

🎯 VERIFICATION TIMELINE:
Time 900: Train 1 arrives → Platforms = 1
Time 910: Train 1 departs → Platforms = 0
Time 940: Train 2 arrives → Platforms = 1
Time 950: Train 3 arrives → Platforms = 2
Time 1100: Train 4 arrives → Platforms = 3 ← MAXIMUM
Time 1120: Train 2 departs → Platforms = 2
Time 1130: Train 3 departs → Platforms = 1
Time 1200: Train 4 departs → Platforms = 0
Time 1500: Train 5 arrives → Platforms = 1
Time 1800: Train 6 arrives → Platforms = 2
Time 1900: Train 5 departs → Platforms = 1
Time 2000: Train 6 departs → Platforms = 0

✅ Maximum platforms needed at any time = 3

🎯 WHY THIS WORKS:
1️⃣ SORTING ensures we process events in chronological order
2️⃣ TWO POINTERS ensure we don't miss any transitions
3️⃣ COMPARISON logic handles arrivals vs departures correctly
4️⃣ TRACKING gives us real-time platform usage at each transition

💡 KEY INSIGHT:
We don't need to check every minute/second - just the actual arrival and departure times!
The maximum platform usage will always occur at one of these transition points.

🔍 PLATFORM ALLOCATION STRATEGY:
- Each arriving train needs exactly one platform
- Each departing train frees exactly one platform
- We track the peak usage to determine minimum platforms required
- The algorithm ensures no train waits due to platform unavailability

*/