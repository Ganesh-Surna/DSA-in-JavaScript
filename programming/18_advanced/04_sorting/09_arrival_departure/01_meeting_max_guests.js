/* Problem:
Given arrival and departure times of n guests, find the maximum number of guests at any time.

You are given arrival and departure times of n guests in two arrays arr[] and dep[] of size n. 
The task is to find the maximum number of guests that can be present at any time.

Example 1:
Input:
arr[] = {900, 600, 700}
dep[] = {1000, 800, 730}
Output: 2
Explanation: 
- At 600: 1 guest arrives
- At 700: 1 guest arrives (total = 2)
- At 730: 1 guest departs (total = 1)
- At 800: 1 guest departs (total = 0)
- At 900: 1 guest arrives (total = 1)
- At 1000: 1 guest departs (total = 0)
Maximum guests at any time = 2 (i.e., From 600 to 700)

Example 2:
Input:
arr[] = {800, 700, 600, 500}
dep[] = {840, 820, 830, 530}
Output: 4
Explanation: Can meet maximum 4 guests(i.e., from 500 to 840)

Expected Time Complexity : O(n log n)
Expected Auxilliary Space : O(1)
*/

// ✅ TC = O(n log n) - due to sorting
// ✅ SC = O(1) - constant extra space
function maxGuests(arr, dep){
    // 1. Sort Arrays
    arr.sort((a, b)=>a-b)
    dep.sort((a, b)=>a-b)
    
    console.log(arr, dep)
    
    let n = arr.length;
    
    let i=1; // 0-index(1st) of arrival is considered as processed. Since the arrival time is smaller
    let j=0;
    
    let curr = 1, res = 1; // one arrival is considered as already processed
    
    while(i<n && j<n){
        if(arr[i] <= dep[j]){ // consider as new arrival
            curr++
            i++
        }else{ // consider as departure
            curr--
            j++
        }
        
        res = Math.max(res, curr)
    }
    
    return res
}

let arr = [900, 600, 700], dep = [1000, 800, 730]; // 2
console.log(maxGuests(arr, dep))

/*🎯 CORE IDEA: Instead of checking every possible time point (O(n²)), we use a TWO-POINTER approach 
   on SORTED arrays to efficiently track arrivals and departures.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Sort arrival array in ascending order
   - Sort departure array in ascending order
   - Initialize pointers: i=1 (arrivals), j=0 (departures)
   - Start with curr=1, res=1 (first guest is already counted)

2️⃣ TWO-POINTER TECHNIQUE:
   - Compare current arrival time with current departure time
   - If arrival ≤ departure: process as NEW ARRIVAL
     * Increment current guest count
     * Move to next arrival
   - If arrival > departure: process as DEPARTURE
     * Decrement current guest count  
     * Move to next departure

3️⃣ TRACK MAXIMUM:
   - After each operation, update maximum guests seen so far
   - Continue until all arrivals or departures are processed

4️⃣ RETURN RESULT:
   - Return the maximum number of guests at any time

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n log n) vs O(n²) for naive approach
2️⃣ SPACE: O(1) vs O(n) for storing time points
3️⃣ INTUITION: We don't need to check every time point, just transition points
4️⃣ SORTING: Enables linear scan with two pointers

💡 KEY INSIGHT:
The maximum guests occur at transition points (arrivals/departures). By sorting both arrays
and using two pointers, we can process all transitions in O(n) time after O(n log n) sorting.

🎯 WHY SORTING IS CRUCIAL:
- Without sorting: We'd need to check every possible time point
- With sorting: We only check actual arrival/departure times
- Two pointers ensure we process events in chronological order

🔍 ALGORITHM INTUITION:
Think of it as a "sweep line" algorithm - we sweep through time and track
the number of guests present at each transition point.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [900, 600, 700]     (arrival times)
dep = [1000, 800, 730]    (departure times)

🎯 GOAL: Find maximum guests at any time without checking every time point!

🔍 SORTING STEP:
arr = [600, 700, 900]     (sorted arrivals)
dep = [730, 800, 1000]    (sorted departures)

🎯 TWO-POINTER PROCESS:

INITIALIZATION:
i = 1, j = 0              (start from 2nd arrival, 1st departure)
curr = 1, res = 1         (first guest already counted)

─────────────────────────────────────────

ITERATION 1: i=1, j=0
arr[1] = 700, dep[0] = 730
700 ≤ 730 → NEW ARRIVAL
curr = 1 + 1 = 2
i = 1 + 1 = 2
res = max(1, 2) = 2

📊 STATE: 2 guests present (arrived at 600, 700)

─────────────────────────────────────────

ITERATION 2: i=2, j=0  
arr[2] = 900, dep[0] = 730
900 > 730 → DEPARTURE
curr = 2 - 1 = 1
j = 0 + 1 = 1
res = max(2, 1) = 2

📊 STATE: 1 guest present (arrived at 600, departed at 730)

─────────────────────────────────────────

ITERATION 3: i=2, j=1
arr[2] = 900, dep[1] = 800  
900 > 800 → DEPARTURE
curr = 1 - 1 = 0
j = 1 + 1 = 2
res = max(2, 0) = 2

📊 STATE: 0 guests present (all departed)

─────────────────────────────────────────

ITERATION 4: i=2, j=2
arr[2] = 900, dep[2] = 1000
900 ≤ 1000 → NEW ARRIVAL
curr = 0 + 1 = 1
i = 2 + 1 = 3
res = max(2, 1) = 2

📊 STATE: 1 guest present (arrived at 900)

─────────────────────────────────────────

LOOP ENDS: i=3, j=2 (i >= n)

🏆 FINAL RESULT: Maximum guests = 2

🎯 VERIFICATION TIMELINE:
Time 600: +1 guest → Total = 1
Time 700: +1 guest → Total = 2 ← MAXIMUM
Time 730: -1 guest → Total = 1  
Time 800: -1 guest → Total = 0
Time 900: +1 guest → Total = 1
Time 1000: -1 guest → Total = 0

✅ Maximum guests at any time = 2

🎯 WHY THIS WORKS:
1️⃣ SORTING ensures we process events in chronological order
2️⃣ TWO POINTERS ensure we don't miss any transitions
3️⃣ COMPARISON logic handles arrivals vs departures correctly
4️⃣ TRACKING gives us real-time guest count at each transition

💡 KEY INSIGHT:
We don't need to check every minute/second - just the actual arrival and departure times!
The maximum will always occur at one of these transition points.
*/