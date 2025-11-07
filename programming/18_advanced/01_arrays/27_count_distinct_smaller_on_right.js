/* Problem: ✅✅✅✅ Count Distinct Smaller Elements on Right ✅✅✅✅

Given an array of integers, for each element, count the number of distinct 
elements that are smaller than it and appear to its right in the array.
Return the maximum count among all elements.

The problem requires:
- For each element, look at all elements to its right
- Count distinct elements smaller than current element
- Find the maximum count across all elements
- Handle duplicates correctly (count only distinct values)

You are given an array of integers. Return the maximum count of distinct 
smaller elements on the right for any element in the array.

Example 1:
Input: [5, 2, 6, 1]
Output: 2
Explanation:
- For 5: elements on right [2, 6, 1], distinct smaller: [2, 1] → count = 2
- For 2: elements on right [6, 1], distinct smaller: [1] → count = 1
- For 6: elements on right [1], distinct smaller: [1] → count = 1
- For 1: elements on right [], distinct smaller: [] → count = 0
Maximum count: 2

Example 2:
Input: [1, 2, 3, 4, 5]
Output: 0
Explanation:
- All elements are in ascending order
- No element has smaller elements on its right
- Maximum count: 0

Example 3:
Input: [5, 4, 3, 2, 1]
Output: 4
Explanation:
- For 5: elements on right [4, 3, 2, 1], distinct smaller: [4, 3, 2, 1] → count = 4
- For 4: elements on right [3, 2, 1], distinct smaller: [3, 2, 1] → count = 3
- For 3: elements on right [2, 1], distinct smaller: [2, 1] → count = 2
- For 2: elements on right [1], distinct smaller: [1] → count = 1
- For 1: elements on right [], distinct smaller: [] → count = 0
Maximum count: 4

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ array[i] ≤ 10^5

Expected Complexities:
Time Complexity: O(n log n) - using BST approach
Auxiliary Space: O(n) - for BST and result storage
*/

// 1. Using Sorting and Binary Search
// ✅ TC = O(N^2)--> due to splice operation
// ✅ SC = O(N)
function countDistinctSmallerRight(nums, n) {
  let sorted = [];
  let maxCount = 0;

  for (let i = n - 1; i >= 0; i--) { // TC = O(N) * O(N) = O(N^2)
    let pos = lowerbound(sorted, nums[i]); // TC = O(logN)

    maxCount = Math.max(maxCount, pos);

    if (sorted[pos] !== nums[i]) {
      sorted.splice(pos, 0, nums[i]); // TC = O(N) (inserting the number at the correct position)
    }
  }

  return maxCount;

  // Helper functions
  function lowerbound(arr, x) {
    let l = 0, r = arr.length;
    while (l < r) {
      let mid = Math.floor((l + r) / 2);
      if (arr[mid] < x) l = mid + 1;
      else r = mid;
    }

    return l;
  }
}



// 2. Using BST (Binary Search Tree)
class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
      this.leftCount = 0; // distinct nodes smaller than this node
    }
}
// ✅ TC = O(NlogN / NlogN / N^2)--> (Best / Average / Worst Case)
// ✅ SC = O(n)
function countDistinctSmallerRight(nums, n) {
    let root = null;
    let maxCount = 0;

    for (let i = n - 1; i >= 0; i--) {
        let count = insert(root, nums[i]);
        root = count.node; // ✅ always update
        maxCount = Math.max(maxCount, count.smallerCount);
    }

    return maxCount;

    // Helper function to insert value in BST and return count of smaller distinct elements
    function insert(root, val) {
        if (!root) {
            return { node: new Node(val), smallerCount: 0 };
        }

        let smallerCount = 0;
        let curr = root;

        while (true) {
            if (val === curr.val) {
                // duplicate: no new distinct smaller elements
                break;
            } else if (val < curr.val) {
                curr.leftCount++;
                if (!curr.left) {
                    curr.left = new Node(val);
                    break;
                }
                curr = curr.left;
            } else {
                smallerCount += curr.leftCount + 1;
                if (!curr.right) {
                    curr.right = new Node(val);
                    break;
                }
                curr = curr.right;
            }
        }

        return { node: root, smallerCount }; // We are always returning the root node and the smaller count for the current node to be inserted
    }
}

// Test cases
console.log("Test 1:", countDistinctSmallerRight([5, 2, 6, 1], 4)); // 2
console.log("Test 2:", countDistinctSmallerRight([1, 2, 3, 4, 5], 5)); // 0
console.log("Test 3:", countDistinctSmallerRight([5, 4, 3, 2, 1], 5)); // 4
console.log("Test 4:", countDistinctSmallerRight([3, 1, 4, 1, 5], 5)); // 2
console.log("Test 5:", countDistinctSmallerRight([2, 2, 2, 2], 4)); // 0

/*🎯 CORE IDEA: Use BST with leftCount tracking for efficient counting.
Process array from right to left, maintaining a BST where each node tracks
the count of distinct smaller elements in its left subtree. For each new
element, traverse BST to count smaller elements and update leftCounts.

📋 STEP-BY-STEP FLOW:

1️⃣ RIGHT-TO-LEFT PROCESSING:
   - Process array from right to left
   - Build BST incrementally
   - Each element sees all elements to its right
   - Maintain distinct element counts

2️⃣ BST INSERTION WITH COUNTING:
   - Insert new element into BST
   - Track smaller elements during insertion
   - Update leftCount for nodes in path
   - Handle duplicates correctly

3️⃣ SMALLER COUNT CALCULATION:
   - When going right: add leftCount + 1
   - When going left: increment leftCount
   - When duplicate: no new count
   - Accumulate count during traversal

4️⃣ MAXIMUM COUNT TRACKING:
   - Track maximum count seen so far
   - Update after each element processing
   - Return maximum count at end
   - Handle edge cases properly

5️⃣ BST STRUCTURE MAINTENANCE:
   - Maintain BST properties
   - Update leftCount correctly
   - Handle insertion at leaves
   - Preserve tree structure

🧠 WHY THIS APPROACH?
- BST enables efficient counting
- leftCount tracks smaller elements
- Right-to-left processing order
- O(n log n) average time complexity
- Handles duplicates correctly

💡 KEY INSIGHTS:
- Process from right to left
- Use BST with leftCount field
- Count smaller elements during insertion
- Handle duplicates (no new count)
- Track maximum count globally
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Count Distinct Smaller Elements

INPUT: [5, 2, 6, 1]
EXPECTED OUTPUT: 2

🎯 GOAL: Find maximum count of distinct smaller elements on the right!

🔍 STEP-BY-STEP PROCESS:

RIGHT-TO-LEFT PROCESSING:

STEP 1: Process element 1 (index 3)
BST: empty
Insert 1: root = Node(1), leftCount = 0
Smaller count: 0
Max count: 0

STEP 2: Process element 6 (index 2)
BST: 1
Insert 6: 6 > 1, go right
Smaller count: leftCount(1) + 1 = 0 + 1 = 1
BST:    1
           6
Max count: 1

STEP 3: Process element 2 (index 1)
BST:    1
           6
Insert 2: 2 > 1, go right
Smaller count: leftCount(1) + 1 = 0 + 1 = 1
BST:    1
           6
        2
Max count: 1

STEP 4: Process element 5 (index 0)
BST:    1
           6
        2
Insert 5: 5 > 1, go right
Smaller count: leftCount(1) + 1 = 0 + 1 = 1
5 < 6, go left, increment leftCount(6)
Smaller count: 1 + leftCount(6) + 1 = 1 + 0 + 1 = 2
BST:    1
           6
        2   5
Max count: 2

🏆 FINAL RESULT: 2

─────────────────────────────────────────

📊 EXAMPLE 2: Descending Order

INPUT: [5, 4, 3, 2, 1]
EXPECTED OUTPUT: 4

PROCESS:

STEP 1: Process 1
BST: empty, count: 0, max: 0

STEP 2: Process 2
BST: 1, count: 1, max: 1

STEP 3: Process 3
BST: 1→2, count: 2, max: 2

STEP 4: Process 4
BST: 1→2→3, count: 3, max: 3

STEP 5: Process 5
BST: 1→2→3→4, count: 4, max: 4

🏆 RESULT: 4

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

BST EVOLUTION FOR [5, 2, 6, 1]:

After processing 1:
BST: 1 (leftCount: 0)

After processing 6:
BST:    1 (leftCount: 0)
           6 (leftCount: 0)

After processing 2:
BST:    1 (leftCount: 0)
           6 (leftCount: 0)
        2 (leftCount: 0)

After processing 5:
BST:    1 (leftCount: 0)
           6 (leftCount: 1)
        2 (leftCount: 0)  5 (leftCount: 0)

─────────────────────────────────────────

📊 COUNTING LOGIC:

WHEN INSERTING ELEMENT X:

If X < current node:
- Increment current.leftCount
- Go left
- No smaller elements found yet

If X > current node:
- Add current.leftCount + 1 to smaller count
- Go right
- All elements in left subtree + current are smaller

If X = current node:
- Duplicate found
- No new smaller elements
- Stop insertion

─────────────────────────────────────────

📊 BST TRAVERSAL EXAMPLE:

INSERTING 5 INTO BST:
BST:    1 (leftCount: 0)
           6 (leftCount: 0)
        2 (leftCount: 0)

Path: 1 → 6 → 2
At 1: 5 > 1, smaller count += 0 + 1 = 1
At 6: 5 < 6, increment leftCount(6) = 1
At 2: 5 > 2, smaller count += 0 + 1 = 2
Insert 5 as right child of 2

Final smaller count: 2

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ RIGHT-TO-LEFT PROCESSING:
   - Each element sees all elements to its right
   - BST contains all processed elements
   - Natural order for counting
   - Efficient processing

2️⃣ BST WITH LEFTCOUNT:
   - Each node tracks smaller elements in left subtree
   - Enables efficient counting during insertion
   - Maintains distinct element counts
   - Handles duplicates correctly

3️⃣ COUNTING DURING INSERTION:
   - Count smaller elements while traversing
   - Add leftCount + 1 when going right
   - Increment leftCount when going left
   - No need for separate counting pass

4️⃣ DUPLICATE HANDLING:
   - When duplicate found, stop insertion
   - No new smaller elements added
   - Maintains distinct count property
   - Correct behavior for problem

5️⃣ MAXIMUM TRACKING:
   - Track maximum count globally
   - Update after each element
   - Return final maximum
   - Handles all cases correctly

💡 KEY INSIGHT:
Using BST with leftCount field to efficiently count distinct smaller elements
during right-to-left processing, where leftCount tracks smaller elements in
left subtree and counting happens during insertion traversal, achieving
O(n log n) average time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Best case: O(n log n) - balanced BST
- Average case: O(n log n) - random insertion
- Worst case: O(n²) - skewed BST
- Each insertion: O(log n) average
- Total: O(n log n) average

🎯 SPACE COMPLEXITY ANALYSIS:
- BST nodes: O(n)
- leftCount fields: O(n)
- Variables: O(1)
- Total: O(n)
- Linear space usage

🎯 EDGE CASES:

CASE 1: Single Element
Input: [5]
Process: No elements on right
Result: 0
Output: 0

CASE 2: All Same Elements
Input: [2, 2, 2, 2]
Process: All duplicates, no new smaller elements
Result: 0
Output: 0

CASE 3: Ascending Order
Input: [1, 2, 3, 4, 5]
Process: No smaller elements on right
Result: 0
Output: 0

CASE 4: Descending Order
Input: [5, 4, 3, 2, 1]
Process: Each element has all smaller elements on right
Result: 4
Output: 4

CASE 5: Mixed Order
Input: [3, 1, 4, 1, 5]
Process: Count distinct smaller elements
Result: 2
Output: 2

CASE 6: Empty Array
Input: []
Process: No elements
Result: 0
Output: 0

🎯 ALGORITHM CORRECTNESS:
- Processes all elements: ✓
- Counts distinct smaller elements: ✓
- Handles duplicates correctly: ✓
- Maintains BST properties: ✓
- Returns maximum count: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 47: Initialize BST root and max count
- Line 50: Process array right to left
- Line 51: Insert element and get count
- Line 52: Update root reference
- Line 53: Update maximum count
- Line 59-89: BST insertion with counting logic

🎯 BST INSERTION LOGIC:

DUPLICATE CASE:
if (val === curr.val) {
    break; // No new smaller elements
}

SMALLER CASE:
if (val < curr.val) {
    curr.leftCount++; // Increment left count
    if (!curr.left) {
        curr.left = new Node(val); // Insert at leaf
        break;
    }
    curr = curr.left; // Go left
}

LARGER CASE:
if (val > curr.val) {
    smallerCount += curr.leftCount + 1; // Add smaller count
    if (!curr.right) {
        curr.right = new Node(val); // Insert at leaf
        break;
    }
    curr = curr.right; // Go right
}

This ensures correct counting!

🎯 LEFCOUNT MAINTENANCE:
- Increment when going left
- Add to count when going right
- Track distinct smaller elements
- Maintain BST properties

leftCount enables efficient counting!

🎯 ADVANTAGES:
- O(n log n) average time
- Handles duplicates correctly
- Efficient counting during insertion
- Clear logic and implementation
- Optimal for this problem

🎯 DISADVANTAGES:
- O(n²) worst case time
- Requires BST implementation
- More complex than naive approach
- Space overhead for BST

🎯 REAL-WORLD APPLICATIONS:
- Ranking systems
- Competitive programming
- Data analysis
- Statistical calculations
- Algorithm design
- Performance metrics

🎯 RELATED PROBLEMS:
- Count of Smaller Numbers After Self
- Reverse Pairs
- Count Inversions
- Merge Sort
- Binary Indexed Tree
- Segment Tree

🎯 TESTING STRATEGY:
- Single element
- All same elements
- Ascending order
- Descending order
- Mixed order
- Empty array

🎯 DEBUGGING TIPS:
- Print BST structure
- Trace insertion path
- Verify leftCount updates
- Check counting logic
- Monitor maximum count

🎯 COMMON MISTAKES:
- Wrong insertion order
- Incorrect leftCount updates
- Not handling duplicates
- Wrong counting logic
- Missing edge cases

🎯 BEST PRACTICES:
- Use clear variable names
- Handle all edge cases
- Maintain BST properties
- Test with various inputs
- Verify counting logic

🎯 INTERVIEW TIPS:
- Explain BST approach
- Discuss time complexity
- Show insertion logic
- Walk through example
- Analyze space complexity
- Compare with alternatives

🎯 BST COUNTING PATTERN:
1. Process right to left
2. Insert into BST
3. Count during insertion
4. Update leftCount
5. Track maximum

This gives efficient counting!

🎯 COUNTING STRATEGY:
- Use BST properties
- Track leftCount
- Count during insertion
- Handle duplicates
- Maintain efficiency

🎯 COMPARISON WITH NAIVE APPROACH:

NAIVE APPROACH:
function countDistinctSmallerRight(nums) {
    let maxCount = 0;
    for (let i = 0; i < nums.length; i++) {
        let count = 0;
        let seen = new Set();
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[j] < nums[i] && !seen.has(nums[j])) {
                seen.add(nums[j]);
                count++;
            }
        }
        maxCount = Math.max(maxCount, count);
    }
    return maxCount;
}

BST APPROACH:
- O(n log n) vs O(n²) time
- O(n) vs O(n) space
- Efficient counting vs brute force
- BST structure vs simple iteration

🎯 CONCLUSION:
Counting distinct smaller elements on the right is efficiently achieved using
BST with leftCount tracking, processing array right-to-left, counting during
insertion, and maintaining maximum count, achieving O(n log n) average time
complexity and O(n) space complexity!
*/

