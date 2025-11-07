/* Problem: ✅✅✅✅ Rearrange Characters ✅✅✅✅

Given a string S such that it may contain repeated lowercase alphabets. Rearrange the characters
in the string such that no two adjacent characters are same. Return 1 if rearrangement is possible,
otherwise return 0.

The problem requires:
- Rearrange characters so no two adjacent characters are same
- Check if such rearrangement is possible
- Use greedy approach with max heap
- Handle repeated characters efficiently

You are given a string S. Rearrange the characters such that no two adjacent characters are same.
If such rearrangement is possible, return 1, otherwise return 0.

Example 1:
Input: S = "geeksforgeeks"
Output: 1
Explanation: One possible rearrangement: "egeskerskegof"
All adjacent characters are different.

Example 2:
Input: S = "bbbabaaacd"
Output: 1
Explanation: One possible rearrangement: "abababdcab"
All adjacent characters are different.

Example 3:
Input: S = "aaab"
Output: 0
Explanation: Impossible to rearrange. Maximum frequency is 3, string length is 4.
There's no way to place 'a' without having adjacent 'a's.

Example 4:
Input: S = "aabb"
Output: 1
Explanation: One possible rearrangement: "abab"
All adjacent characters are different.

Constraints:
- 1 ≤ |S| ≤ 10^5
- String contains only lowercase English alphabets

Expected Complexities:
Time Complexity: O(|S| log |S|) - using max heap approach
Auxiliary Space: O(|S|) - for frequency map and heap
*/

class MaxHeap {
  constructor() {
    this.harr = [];
    this.size = 0;
  }
  parent(i) {
    return Math.floor((i - 1) / 2);
  }
  left(i) {
    return 2 * i + 1;
  }
  right(i) {
    return 2 * i + 2;
  }
  insert(x) {
    let i = this.size;
    this.harr[i] = x;
    while (i > 0 && this.harr[this.parent(i)][1] < this.harr[i][1]) {
      let p = this.parent(i);
      [this.harr[i], this.harr[p]] = [this.harr[p], this.harr[i]];
      i = p;
    }
    this.size++;
  }
  extractMax() {
    let arr = this.harr;
    let n = this.size;
    if (n === 0) return null;

    [arr[0], arr[n - 1]] = [arr[n - 1], arr[0]];
    let max = arr.pop();
    this.size--; // This should be decreased before maxHeapify
    this.maxHeapify(0);
    return max;
  }
  maxHeapify(i) {
    let arr = this.harr;
    let n = this.size;
    while (true) {
      let l = this.left(i);
      let r = this.right(i);

      let max = i;
      if (l < n && arr[l][1] > arr[max][1]) max = l;
      if (r < n && arr[r][1] > arr[max][1]) max = r;

      if (max === i) break;
      [arr[i], arr[max]] = [arr[max], arr[i]];
      i = max;
    }
  }
}

// ✅ TC = O(|S| log |S|) - heap operations for each character
// ✅ SC = O(|S|) --> for frequency map and heap
function rearrangeString(str) {
  // 1. Count frequency of each character
  let freq = new Map();
  for (let ch of str) {
    freq.set(ch, (freq.get(ch) || 0) + 1);
  }

  // 2. Early check for impossible cases
  let maxFreq = Math.max(...freq.values());
  if (maxFreq > Math.ceil(str.length / 2)) return 0;

  // 3. Create a max heap of characters based on frequency
  let h = new MaxHeap();
  for (let [ch, f] of freq) {
    h.insert([ch, f]);
  }


  let res = "";
  let prev = null; // To keep track of the previous character

  // 4. Build the result string
  while (h.size > 0) {
    let [ch, f] = h.extractMax();
    res += ch;
    f--;

    if (prev && prev[1] > 0) h.insert(prev); // If the previous character has frequency greater than 0, insert it back into the heap
    prev = [ch, f];
  }

  // 5. Return 1 if successful rearrangement, 0 otherwise
  return res.length === str.length ? 1 : 0;
}

// Test cases
console.log("Test 1:", rearrangeString("geeksforgeeks")); // 1
console.log("Test 2:", rearrangeString("bbbabaaacd")); // 1
console.log("Test 3:", rearrangeString("ababbcbcb")); // 1
console.log("Test 4:", rearrangeString("aaab")); // 0
console.log("Test 5:", rearrangeString("aabb")); // 1

/*🎯 CORE IDEA: Use greedy approach with max heap to rearrange characters such that no two adjacent
characters are same. Always pick the character with highest frequency (different from previous),
reduce its frequency, and put the previous character back in heap if it still has frequency > 0.
This ensures we always have different adjacent characters while maximizing remaining options.

📋 STEP-BY-STEP FLOW:

1️⃣ FREQUENCY COUNTING:
   - Count frequency of each character
   - Build frequency map
   - Use Map for O(1) access
   - Complete character statistics

2️⃣ IMPOSSIBILITY CHECK:
   - If max frequency > ceil(n/2), return 0
   - No way to place most frequent character
   - Early termination for impossible cases
   - Necessary and sufficient condition

3️⃣ MAX HEAP INITIALIZATION:
   - Create max heap of [character, frequency] pairs
   - Sort by frequency (max at root)
   - Prepare for greedy selection
   - Initialize with all characters

4️⃣ GREEDY STRING BUILDING:
   - Extract character with max frequency
   - Add to result string
   - Decrease frequency by 1
   - Store as previous character
   - Insert previous character back if frequency > 0
   - Ensure adjacent characters are different

5️⃣ RESULT VALIDATION:
   - Check if result length equals input length
   - Return 1 if successful, 0 otherwise
   - Handle edge cases
   - Verify rearrangement

🧠 WHY THIS APPROACH?
- Greedy ensures no adjacent duplicates
- Max heap provides efficient access
- O(|S| log |S|) time complexity
- O(|S|) space complexity
- Optimal solution

💡 KEY INSIGHTS:
- Always pick highest frequency character (different from previous)
- Put previous character back in heap after one step
- Early check for impossibility: maxFreq > ceil(n/2)
- Greedy approach is optimal
- Max heap maintains frequency order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Successful Rearrangement

INPUT: S = "bbbabaaacd"
EXPECTED OUTPUT: 1

🎯 GOAL: Rearrange characters so no two adjacent are same!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Count Frequencies
freq = {b: 3, a: 3, c: 1, d: 1}
maxFreq = 3, ceil(10/2) = 5
3 <= 5 → Possible ✓

STEP 2: Initialize Max Heap
Heap: [[b, 3], [a, 3], [c, 1], [d, 1]]
prev = null

STEP 3: Build Result
Iteration 1:
  Extract max: [b, 3]
  res = "b", f = 2
  prev = null (skip insert)
  prev = [b, 2]
  Heap: [[a, 3], [c, 1], [d, 1]]

Iteration 2:
  Extract max: [a, 3]
  res = "ba", f = 2
  prev = [b, 2] (insert back)
  prev = [a, 2]
  Heap: [[b, 2], [c, 1], [d, 1]]

Iteration 3:
  Extract max: [b, 2]
  res = "bab", f = 1
  prev = [a, 2] (insert back)
  prev = [b, 1]
  Heap: [[a, 2], [c, 1], [d, 1]]

Continue until heap is empty...

Result: "abababdcab" or similar
All adjacent characters are different ✓

🏆 RESULT: 1 (successful rearrangement)

─────────────────────────────────────────

📊 EXAMPLE 2: Impossible Rearrangement

INPUT: S = "aaab"
EXPECTED OUTPUT: 0

PROCESS:

STEP 1: Count Frequencies
freq = {a: 3, b: 1}
maxFreq = 3, ceil(4/2) = 2
3 > 2 → Impossible ✗

Return 0 immediately

🏆 RESULT: 0

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP OPERATION FOR "bbbabaaacd":

Initial: [[b,3], [a,3], [c,1], [d,1]]

After extracting b: res="b", prev=[b,2]
Heap: [[a,3], [c,1], [d,1]]

After extracting a: res="ba", prev=[a,2]
Insert prev b: Heap: [[b,2], [a,2], [c,1], [d,1]]

After extracting b: res="bab", prev=[b,1]
Insert prev a: Heap: [[a,2], [b,1], [c,1], [d,1]]

Continue until all characters used...

─────────────────────────────────────────

📊 WHY IMPOSSIBILITY CHECK WORKS:

CONDITION: maxFreq > ceil(n/2)

If one character appears more than half the positions, we need to place it at
every other position at minimum. But if it appears more than ceil(n/2) times,
we'll eventually have two of them adjacent.

Example: "aaab"
- 'a' appears 3 times in 4 positions
- To avoid adjacent 'a's, we can place: a _ a _ a
- But we only have 4 positions, so we need a 4th 'a' somewhere
- This forces two 'a's to be adjacent
- Hence, impossible

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Frequency counting: O(n)
- Heap operations: O(n log d) where d = distinct characters
- Total: O(n log d) ≤ O(n log n)
- Optimal for this problem

SPACE COMPLEXITY:
- Frequency map: O(d)
- Max heap: O(d)
- Result string: O(n)
- Total: O(n)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GREEDY CHOICE:
   - Always pick highest frequency character
   - Different from previous character
   - Maximizes remaining options
   - Prevents blocking scenarios

2️⃣ PREVIOUS CHARACTER TRACKING:
   - Can't use same character twice in a row
   - Store previous character temporarily
   - Insert back after one step
   - Ensures no adjacent duplicates

3️⃣ MAX HEAP PROPERTY:
   - Root contains character with max frequency
   - Easy to access highest frequency
   - Efficient insertion and extraction
   - Maintains frequency order

4️⃣ IMPOSSIBILITY CHECK:
   - If maxFreq > ceil(n/2), impossible
   - Early termination
   - Necessary and sufficient condition
   - Saves computation time

5️⃣ TERMINATION:
   - Stop when heap is empty
   - All characters processed
   - Check result length
   - Return success/failure

💡 KEY INSIGHT:
Using greedy approach with max heap to always pick the character with highest frequency
(different from previous), storing previous character temporarily and inserting it back
after one step, ensuring no two adjacent characters are same, with early check for
impossibility when maxFreq > ceil(n/2), achieving O(n log n) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Frequency counting: O(n)
- Heap operations: O(n log d) where d = distinct characters
- Total: O(n log d) ≤ O(n log n)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Frequency map: O(d) where d = distinct characters
- Max heap: O(d)
- Result string: O(n)
- Total: O(n)
- Linear in input size

🎯 EDGE CASES:

CASE 1: Single character repeated
Input: "aaaa"
Process: maxFreq = 4, ceil(4/2) = 2
4 > 2 → Impossible
Output: 0

CASE 2: All characters same frequency
Input: "aabb"
Process: maxFreq = 2, ceil(4/2) = 2
2 <= 2 → Possible
Result: "abab" or "baba"
Output: 1

CASE 3: Single character
Input: "a"
Process: maxFreq = 1, ceil(1/2) = 1
1 <= 1 → Possible
Result: "a"
Output: 1

CASE 4: Two distinct characters
Input: "ab"
Process: maxFreq = 1, ceil(2/2) = 1
1 <= 1 → Possible
Result: "ab" or "ba"
Output: 1

CASE 5: Exactly ceil(n/2) frequency
Input: "aaabb"
Process: maxFreq = 3, ceil(5/2) = 3
3 <= 3 → Possible
Result: "ababa"
Output: 1

🎯 ALGORITHM CORRECTNESS:
- No adjacent duplicates: ✓
- Uses all characters: ✓
- Handles impossibility: ✓
- Greedy is optimal: ✓
- Handles all edge cases: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 105: Count frequencies
- Line 110-111: Check impossibility
- Line 114-117: Initialize heap
- Line 122-131: Build result greedily
- Line 134: Validate and return result

🎯 HEAP OPERATIONS:

INSERTION:
- Add [character, frequency] at end
- Bubble up to maintain heap property
- Compare by frequency (second element)
- Time: O(log d)

EXTRACTION:
- Remove root element
- Replace with last element
- Heapify down to maintain property
- Time: O(log d)

This ensures efficient operations!

🎯 PREVIOUS CHARACTER LOGIC:
prev = null (initially)
while (heap not empty):
  extract max character
  add to result
  if (prev exists and prev.freq > 0):
    insert prev back into heap
  prev = current character (with updated freq)

This prevents adjacent duplicates!

🎯 ADVANTAGES:
- O(n log n) time complexity
- O(n) space complexity
- Handles impossibility efficiently
- Simple implementation
- Optimal greedy approach

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than naive approach
- Additional space for heap
- Not optimal for very small strings

🎯 REAL-WORLD APPLICATIONS:
- String formatting
- Text processing
- Task scheduling with constraints
- Resource allocation
- Competitive programming
- Data structure problems

🎯 RELATED PROBLEMS:
- Task scheduler with cooldown
- Reorganize string
- Rearrange string k distance apart
- Priority queue operations
- Heap sort
- Greedy algorithms

🎯 TESTING STRATEGY:
- Single character
- All same characters
- Two distinct characters
- Impossible cases
- Balanced frequencies
- Edge cases

🎯 DEBUGGING TIPS:
- Print heap state after each extraction
- Trace previous character handling
- Verify impossibility check
- Check result for adjacent duplicates
- Monitor frequency decrements

🎯 COMMON MISTAKES:
- Not tracking previous character
- Wrong impossibility check
- Incorrect heap initialization
- Missing edge cases
- Wrong result validation

🎯 BEST PRACTICES:
- Always track previous character
- Early check for impossibility
- Maintain heap properties
- Verify no adjacent duplicates
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain greedy approach
- Discuss max heap usage
- Show previous character logic
- Walk through example
- Analyze complexity
- Discuss impossibility condition

🎯 IMPOSSIBILITY CONDITION RATIONALE:
- If maxFreq > ceil(n/2), we need more than half positions
- But to avoid adjacent duplicates, we can use at most ceil(n/2) positions
- This creates a contradiction
- Hence, rearrangement is impossible

This ensures correctness!

🎯 GREEDY STRATEGY LOGIC:
1. Always pick highest frequency character (different from previous)
2. This maximizes remaining options
3. Prevents blocking scenarios
4. Ensures optimal solution
5. Guarantees no adjacent duplicates

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

BACKTRACKING APPROACH:
function rearrangeBacktrack(str) {
  // Try all permutations
  // Check for adjacent duplicates
  // Return if valid arrangement found
}
- Time: O(n! * n)
- Space: O(n)
- Correct but very inefficient

GREEDY WITH HEAP:
- Time: O(n log n)
- Space: O(n)
- Optimal solution
- Efficient implementation

SORTING APPROACH:
function rearrangeSort(str) {
  // Sort characters by frequency
  // Alternate between different characters
  // More complex logic
}
- Time: O(n log n)
- Space: O(n)
- Similar complexity but more complex logic

🎯 CONCLUSION:
Rearranging characters to avoid adjacent duplicates is efficiently achieved using greedy
approach with max heap, always picking the character with highest frequency (different from
previous), tracking previous character and inserting it back after one step, with early
check for impossibility when maxFreq > ceil(n/2), ensuring O(n log n) time complexity and
O(n) space complexity for optimal string rearrangement!
*/
