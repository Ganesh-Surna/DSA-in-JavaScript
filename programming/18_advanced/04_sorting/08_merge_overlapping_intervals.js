/* Problem:
Given an array of intervals, merge the overlapping intervals.
*/

// ✅ TC = O(n log n)
// ✅ SC = O(1)
function mergeOveralappingIntervals(arr){
    // 1. Sort
    arr.sort((a, b)=> (a[0] - b[0]))
    
    // 2. Merge overlapping intervals
    let res = 0;
    for(let i=1; i<arr.length; i++){ // the 0th interval should be there in the result (either merged or not), so loop starting from index 1
        if(arr[i][0] <= arr[res][1]){
            // overlap, so can be merged
            arr[res][1] = Math.max(arr[res][1], arr[i][1])
        }else{
            res++
            arr[res] = arr[i]
        }
    }

    // 3. Print the result (upto index <= res --> merged intervals which are overlapping)
    for(let i=0; i<res+1; i++){
        console.log(arr[i])
    }
}

let arr = [[5, 10], [2, 3], [6, 8], [1, 7], [1, 10], [2, 3]] // [[1, 10]]
arr = [[5, 10], [3, 15], [18, 30], [2, 7]] // [[2, 15], [18, 30]] <--- At the end of merging loop res=1 & arr = [[2, 15], [18, 30], [5, 10], [18, 30]]
mergeOveralappingIntervals(arr)

/*🎯 CORE IDEA: Sort intervals by start time, then merge overlapping ones in a single pass.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Sort intervals by start time: arr.sort((a, b) => a[0] - b[0])
   - Initialize result pointer: res = 0 (points to last merged interval)

2️⃣ MERGE OVERLAPPING INTERVALS:
   - Loop from i = 1 to n-1 (0th interval is always included)
   - For each interval arr[i]:
     * Check if arr[i][0] ≤ arr[res][1] (overlap condition)
     * If OVERLAP: Merge by updating end time: arr[res][1] = max(arr[res][1], arr[i][1])
     * If NO OVERLAP: Move to next position: res++, arr[res] = arr[i]

3️⃣ OUTPUT RESULT:
   - Print intervals from index 0 to res (inclusive)
   - These are the merged non-overlapping intervals

🧠 WHY THIS APPROACH?

1️⃣ SORTING FIRST: Ensures we process intervals in chronological order
2️⃣ SINGLE PASS: After sorting, we only need one pass to merge
3️⃣ IN-PLACE: Uses same array, just rearranges elements
4️⃣ EFFICIENT: O(n log n) for sorting + O(n) for merging = O(n log n)

💡 KEY INSIGHT:
Two intervals [a,b] and [c,d] overlap if and only if: c ≤ b
After sorting by start time, we only need to check if current start ≤ previous end

🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:

📊 INPUT: [[5, 10], [3, 15], [18, 30], [2, 7]]
🎯 GOAL: Merge overlapping intervals!

🔍 STEP-BY-STEP PROCESS:

STEP 1: SORT BY START TIME
Original: [[5, 10], [3, 15], [18, 30], [2, 7]]
Sorted:   [[2, 7], [3, 15], [5, 10], [18, 30]]

STEP 2: MERGE OVERLAPPING INTERVALS
res = 0, arr = [[2, 7], [3, 15], [5, 10], [18, 30]]

🔍 ITERATION 1: i = 1
Current: [3, 15], Previous: [2, 7]
Check: 3 ≤ 7 ✓ → OVERLAP!
Action: Merge → arr[0][1] = max(7, 15) = 15
Result: arr = [[2, 15], [3, 15], [5, 10], [18, 30]], res = 0

🔍 ITERATION 2: i = 2  
Current: [5, 10], Previous: [2, 15]
Check: 5 ≤ 15 ✓ → OVERLAP!
Action: Merge → arr[0][1] = max(15, 10) = 15
Result: arr = [[2, 15], [3, 15], [5, 10], [18, 30]], res = 0

🔍 ITERATION 3: i = 3
Current: [18, 30], Previous: [2, 15]  
Check: 18 ≤ 15 ✗ → NO OVERLAP!
Action: Move to next position → res = 1, arr[1] = [18, 30]
Result: arr = [[2, 15], [18, 30], [5, 10], [18, 30]], res = 1

🏆 FINAL RESULT:
Merged intervals: [[2, 15], [18, 30]]
- [2, 15] covers: [2,7], [3,15], [5,10] 
- [18, 30] covers: [18,30]

🎯 VERIFICATION:
Original intervals: [2,7], [3,15], [5,10], [18,30]
Merged result: [2,15], [18,30] ✓

📊 COMPLEXITY ANALYSIS:
- Time: O(n log n) - dominated by sorting
- Space: O(1) - in-place merging (excluding output)
- Sorting: O(n log n)
- Merging: O(n) - single pass through sorted array

💡 EDGE CASES HANDLED:
- Empty array: Returns empty result
- Single interval: Returns that interval
- No overlaps: Returns all intervals as-is
- Complete overlap: Merges into single interval
*/