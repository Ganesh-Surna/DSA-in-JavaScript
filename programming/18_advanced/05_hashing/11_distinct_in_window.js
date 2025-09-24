/* Problem:
Given an array arr[] of size n and an integer k, find the count of distinct elements in every window of size k.

Example 1:
Input: arr[] = [10, 20, 20, 10, 30, 40, 10], k = 4
Output: [2, 3, 4, 3]
Explanation:
- Window 1: [10, 20, 20, 10] → distinct elements: {10, 20} → count = 2
- Window 2: [20, 20, 10, 30] → distinct elements: {20, 10, 30} → count = 3
- Window 3: [20, 10, 30, 40] → distinct elements: {20, 10, 30, 40} → count = 4
- Window 4: [10, 30, 40, 10] → distinct elements: {10, 30, 40} → count = 3

Example 2:
Input: arr[] = [10, 10, 10, 10], k = 3
Output: [1, 1]
Explanation:
- Window 1: [10, 10, 10] → distinct elements: {10} → count = 1
- Window 2: [10, 10, 10] → distinct elements: {10} → count = 1

Example 3:
Input: arr[] = [10, 20, 30, 40], k = 3
Output: [3, 3]
Explanation:
- Window 1: [10, 20, 30] → distinct elements: {10, 20, 30} → count = 3
- Window 2: [20, 30, 40] → distinct elements: {20, 30, 40} → count = 3

Constraints:
1 ≤ k ≤ n ≤ 10^5
1 ≤ arr[i] ≤ 10^5

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(k)
*/

// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(k) --> Hash map stores at most k elements
function countDistinctInWindow(arr, k){
    let n = arr.length
    
    let res = [];           // Result array to store distinct counts
    let m = new Map()       // Hash map to store element frequencies
    
    // Build frequency map for first window
    for(let i=0; i<k; i++){
        m.set(arr[i], (m.get(arr[i]) || 0) + 1)
    }
    res.push(m.size)       // Count distinct elements in first window
    
    // Slide window and update frequency map
    for(let i=k; i<n; i++){
        // Remove element going out of window (arr[i-k])
        if(m.get(arr[i-k]) === 1){
            m.delete(arr[i-k])      // Remove if frequency becomes 0
        }else{
            m.set(arr[i-k], m.get(arr[i-k]) - 1)  // Decrease frequency
        }
        
        // Add new element entering window (arr[i])
        m.set(arr[i], (m.get(arr[i]) || 0) + 1)
        
        res.push(m.size)    // Count distinct elements in current window
    }
    
    return res
}

// ✅ Test Cases
console.log(countDistinctInWindow([10, 20, 20, 10, 30, 40, 10], 4)); // [2, 3, 4, 3]
console.log(countDistinctInWindow([10, 10, 10, 10], 3)); // [1, 1]
console.log(countDistinctInWindow([10, 20, 30, 40], 3)); // [3, 3]
console.log(countDistinctInWindow([1, 2, 1, 3, 4, 2, 3], 4)); // [3, 4, 4, 3]

/*🎯 CORE IDEA: Instead of recalculating distinct elements for each window (O(n*k)), we use SLIDING WINDOW technique with HASH MAP to efficiently maintain element frequencies and count distinct elements in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIAL WINDOW SETUP:
   - Create hash map to store element frequencies
   - Build frequency map for first window (indices 0 to k-1)
   - Count distinct elements in first window (map.size)
   - Add count to result array

2️⃣ SLIDING WINDOW TECHNIQUE:
   - For each subsequent window (starting from index k):
     * Remove element going out of window (arr[i-k])
     * Add new element entering window (arr[i])
     * Count distinct elements in current window
     * Add count to result array

3️⃣ FREQUENCY MANAGEMENT:
   - When removing element: decrease frequency or delete if frequency becomes 0
   - When adding element: increase frequency or set to 1 if new
   - Distinct count = number of keys in hash map

4️⃣ EFFICIENT UPDATES:
   - Only update frequencies for elements entering/leaving window
   - Use hash map for O(1) frequency updates
   - Maintain distinct count using map.size

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) vs O(n*k) for naive approach
2️⃣ SLIDING WINDOW: Reuse previous window's information
3️⃣ HASH MAP: O(1) frequency updates and distinct counting
4️⃣ SPACE OPTIMAL: Hash map stores at most k elements

💡 KEY INSIGHTS:

1️⃣ SLIDING WINDOW: Only one element changes between consecutive windows
2️⃣ FREQUENCY TRACKING: Hash map maintains count of each element in current window
3️⃣ DISTINCT COUNTING: Number of keys in hash map = distinct elements
4️⃣ EFFICIENT REMOVAL: Delete key when frequency becomes 0

🎯 WHY SLIDING WINDOW WORKS?
- Consecutive windows differ by exactly one element
- We can update frequencies incrementally instead of recalculating
- Hash map allows O(1) updates and distinct counting

🎯 ALGORITHM INTUITION:
Think of it as maintaining a "moving window" of elements. As the window slides,
we only need to:
- Remove the element that's no longer in the window
- Add the new element entering the window
- Count distinct elements using hash map size
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [10, 20, 20, 10, 30, 40, 10]     (n=7)
k = 4

🎯 GOAL: Find distinct count for each window of size 4!

🔍 STEP-BY-STEP PROCESS:

1️⃣ INITIAL WINDOW SETUP:
Window 1: indices 0-3 → [10, 20, 20, 10]

📋 Build frequency map:
- arr[0] = 10: m.set(10, 1)
- arr[1] = 20: m.set(20, 1)  
- arr[2] = 20: m.set(20, 2)
- arr[3] = 10: m.set(10, 2)

📊 m = {10: 2, 20: 2}
distinct count = m.size = 2
res = [2]

2️⃣ SLIDING WINDOW PROCESS:

📋 Window 2: indices 1-4 → [20, 20, 10, 30]
Remove: arr[0] = 10 (going out)
Add: arr[4] = 30 (coming in)

- Remove arr[0] = 10: m.get(10) = 2, so m.set(10, 1)
- Add arr[4] = 30: m.set(30, 1)

📊 m = {10: 1, 20: 2, 30: 1}
distinct count = m.size = 3
res = [2, 3]

─────────────────────────────────────────

📋 Window 3: indices 2-5 → [20, 10, 30, 40]
Remove: arr[1] = 20 (going out)
Add: arr[5] = 40 (coming in)

- Remove arr[1] = 20: m.get(20) = 2, so m.set(20, 1)
- Add arr[5] = 40: m.set(40, 1)

📊 m = {10: 1, 20: 1, 30: 1, 40: 1}
distinct count = m.size = 4
res = [2, 3, 4]

─────────────────────────────────────────

📋 Window 4: indices 3-6 → [10, 30, 40, 10]
Remove: arr[2] = 20 (going out)
Add: arr[6] = 10 (coming in)

- Remove arr[2] = 20: m.get(20) = 1, so m.delete(20)
- Add arr[6] = 10: m.get(10) = 1, so m.set(10, 2)

📊 m = {10: 2, 30: 1, 40: 1}
distinct count = m.size = 3
res = [2, 3, 4, 3]

🏆 FINAL RESULT: res = [2, 3, 4, 3]

🎯 VERIFICATION:
- Window 1: [10, 20, 20, 10] → distinct: {10, 20} → count = 2 ✓
- Window 2: [20, 20, 10, 30] → distinct: {20, 10, 30} → count = 3 ✓
- Window 3: [20, 10, 30, 40] → distinct: {20, 10, 30, 40} → count = 4 ✓
- Window 4: [10, 30, 40, 10] → distinct: {10, 30, 40} → count = 3 ✓

─────────────────────────────────────────

📊 COMPLEX EXAMPLE:
arr = [1, 2, 1, 3, 4, 2, 3]     (n=7)
k = 4

🔍 WINDOW PROCESSING:

📋 Window 1: [1, 2, 1, 3]
m = {1: 2, 2: 1, 3: 1} → distinct count = 3

📋 Window 2: [2, 1, 3, 4]
Remove: 1, Add: 4
m = {1: 1, 2: 1, 3: 1, 4: 1} → distinct count = 4

📋 Window 3: [1, 3, 4, 2]
Remove: 2, Add: 2
m = {1: 1, 2: 1, 3: 1, 4: 1} → distinct count = 4

📋 Window 4: [3, 4, 2, 3]
Remove: 1, Add: 3
m = {2: 1, 3: 2, 4: 1} → distinct count = 3

🏆 FINAL RESULT: res = [3, 4, 4, 3]

🔍 WHY THIS WORKS:
1️⃣ SLIDING WINDOW technique avoids recalculating for each window
2️⃣ HASH MAP enables O(1) frequency updates and distinct counting
3️⃣ INCREMENTAL UPDATES maintain efficiency across all windows
4️⃣ LINEAR TIME complexity achieved by reusing previous window's information

💡 KEY INSIGHT:
We don't need to recalculate distinct elements for each window - we can
efficiently update the frequency map by removing one element and adding another!

🎯 TIME COMPLEXITY ANALYSIS:
- Initial window setup: O(k)
- Sliding window loop: O(n-k) iterations, each with O(1) operations
- Total: O(k + n-k) = O(n)

🎯 SPACE COMPLEXITY ANALYSIS:
- Hash map storage: O(k) - at most k distinct elements
- Result array: O(n-k+1) = O(n)
- Total: O(n) space complexity

🎯 OPTIMIZATION TECHNIQUES:
- Use Map.size for O(1) distinct counting
- Delete keys when frequency becomes 0 to save space
- Incremental updates instead of full recalculation

*/