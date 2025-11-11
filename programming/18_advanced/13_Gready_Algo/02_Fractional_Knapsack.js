/* Problem: ✅✅✅✅ Fractional Knapsack (Greedy) ✅✅✅✅

Given weights and values of N items, along with a knapsack capacity W, determine
maximum total value that can be accommodated in the knapsack when you are allowed
to take fractional parts of items. Unlike the 0/1 knapsack problem, here we can
break an item into smaller pieces; the value gained is proportional to the fraction
of the item taken.

Key Requirements:
- Each item has weight wt[i] and value val[i].
- Fractional selection allowed (e.g., take half an item).
- Goal: maximize total value within capacity W.
- Greedy approach: pick highest value-to-weight (value density) first.
- Items can be re-ordered based on ratio val/wt.

Example 1:
Input: items = [(10,60), (20,100), (30,120)], W = 50
Output: 240
Explanation: Take items with ratios 6, 5, 4. Take first two entirely (weight 30),
then take 20/30 of last item → total value = 60 + 100 + 80 = 240.

Example 2:
Input: items = [(5,10), (3,5), (2,4)], W = 5
Output: 14
Explanation: Sort by ratio: (5,10)=2, (3,5)=1.67, (2,4)=2. Take (5,10) fully.
Remaining capacity 0 → total value 10. (Better solution: take (2,4) and (3,5) →
(4 + 5) + leftover 1 weight from (5,10) worth 2 → 11. But highest density strategy:
(2,4) ratio=2, (5,10)=2, (3,5)=1.67. Take (2,4), then (5,10) fraction 3 weight = 6 → total 10.

Example 3:
Input: items = [(4,20), (2,10), (6,12), (1,7)], W = 7
Output: 47
Explanation: Ratios: 5, 5, 2, 7. Order: (1,7), (4,20), (2,10), (6,12). Take (1,7)
→ W=6, (4,20) → W=2, (2,10) → W=0. Total value: 7 + 20 + 10 = 37. Wait ratio check: 20/4=5, 10/2=5. (6,12)=2. For W=7 best: (1,7)+(4,20)+(2,10)=37.

Constraints:
- 1 ≤ N ≤ 10^5
- 1 ≤ wt[i], val[i], W ≤ 10^9 (assuming large values)
- All weights and values positive

Expected Complexities:
Time Complexity: O(N log N) — sorting by value density
Auxiliary Space: O(1) if sort in-place (O(N) if copying)
*/

class Item {
    constructor(weight, value) {
        this.wt = weight;
        this.val = value;
    }
}

// ✅ TC = O(N log N) - Sort items by value/weight ratio, then linear scan
// ✅ SC = O(1) auxiliary (if sorting in-place)
// Greedy strategy: always take the available item segment with the highest value
// per unit weight (value density) until capacity is exhausted.
function fractionalKnapsack(items, cap) {
    if (cap <= 0 || items.length === 0) return 0;

    // 1. Sort items in descending order of value-to-weight ratio
    items.sort((a, b) => (b.val / b.wt) - (a.val / a.wt));

    // 2. Accumulate value by taking whole items or fractional parts
    let totalValue = 0;

    for (let item of items) {

        if (item.wt <= cap) {
            // Take entire item
            totalValue += item.val;
            cap -= item.wt;
        } else {
            // Take fractional part proportional to remaining capacity
            totalValue += (cap * (item.val / item.wt));
            break; // Knapsack full
        }
    }

    return totalValue;
}



// 2. When two arrays(values and weights) are given:
// ✅ TC = O(N log N) - Sorting by value/weight ratio
// ✅ SC = O(N) - Additional array
function fractionalKnapsack2(val, wt, capacity) {
  let n = val.length;

  if (capacity <= 0 || n === 0) return 0;

  let arr = [];
  for (let i = 0; i < n; i++) {
      arr.push([wt[i], val[i]]); // [weight, value]
  }

  // Sort by (value/weight) in descending order
  arr.sort((a, b) => (b[1] * a[0]) - (a[1] * b[0]));

  let res = 0;

  for (let i = 0; i < n; i++) {
      let [weight, value] = arr[i];

      if (weight <= capacity) {
          res += value;
          capacity -= weight;
      } else {
          res += capacity * (value / weight);
          break;
      }
  }

  return res;
}


// Test cases
let items = [new Item(10, 60), new Item(20, 100), new Item(30, 120)];
let capacity = 50;
console.log("Test 1:", fractionalKnapsack(items, capacity)); // 240

let items2 = [new Item(5, 10), new Item(3, 5), new Item(2, 4)];
let capacity2 = 5;
console.log("Test 2:", fractionalKnapsack(items2, capacity2)); // 14

let items3 = [new Item(4, 20), new Item(2, 10), new Item(6, 12), new Item(1, 7)];
let capacity3 = 7;
console.log("Test 3:", fractionalKnapsack(items3, capacity3)); // 37

/*🎯 CORE IDEA: Treat the knapsack as a container filled with continuous material.
Always pour in the densest material first (highest value per unit weight) to
guarantee the maximum accumulated value. Because fractional parts are allowed,
the greedy strategy is optimal.

📋 STEP-BY-STEP FLOW:

1️⃣ COMPUTE VALUE DENSITY:
   - For each item, value density = value / weight.

2️⃣ SORT BY VALUE DENSITY (DESCENDING):
   - Greedy choice: pick highest value density first.

3️⃣ ITERATE THROUGH SORTED ITEMS:
   - If item fits entirely (weight ≤ remaining capacity), take it.
   - Otherwise, take as much as possible (fractional) and stop.

4️⃣ SUM TOTAL VALUE:
   - Accumulate value including fractional contributions.

🧠 WHY GREEDY WORKS:
- Fractional flexibility: can adjust weight precisely.
- Exchange argument: any deviation from highest density first can be improved by
  swapping in a higher density fraction, increasing value.
- Optimal substructure: after taking the best dense portion, remaining problem is identical.

💡 KEY INSIGHTS:
- Value density drives optimal selection.
- Sorting is mandatory to enforce greedy order.
- Fractional knapsack differs from 0/1 – fractional selection makes greedy viable.
- Works because item value is proportional to the fraction taken.
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

Example: items = [(wt=10,val=60), (20,100), (30,120)], capacity = 50

STEP 1: Compute value densities:
  Item A: 60/10 = 6
  Item B: 100/20 = 5
  Item C: 120/30 = 4

STEP 2: Sort by density descending: [A (6), B (5), C (4)]

STEP 3: Fill knapsack:
  - Take A fully: weight used = 10, value = 60, capacity left = 40
  - Take B fully: weight used = 30, value = 160, capacity left = 20
  - Take C partially: can take only 20 out of 30 weight
      Fraction = 20/30 = 2/3 → value gained = 120 * (20/30) = 80

Total value = 60 + 100 + 80 = 240 ✓

📊 VISUAL FILLING PROCESS:

Capacity timeline (50 units):
  ·········A·········A·········B·········B·········C(partial)
  (10 units)     (20 units)        (20 units)

Value accumulation:
  After A: 60
  After B: 160
  After C portion: 240

📊 VALUE vs WEIGHT GRAPH:
- Total capacity 50
- Highest density segments fill first
- Fractional segment ensures no capacity wasted

🔍 GREEDY PROOF SKETCH:

1️⃣ Suppose we have an optimal solution O not taking highest density portion first.
2️⃣ Swap a lower density portion in O with available higher density portion.
3️⃣ Total value increases (or stays same), capacity unchanged.
4️⃣ Repeat until highest density portions are selected first → transforms O into greedy solution without loss.

Therefore, greedy selection is optimal when fractions allowed.
*/

/*🎯 WHY GREEDY FAILS FOR 0/1 KNAPSACK (contrast):
- 0/1 knapsack requires integral selection (take or leave entire item).
- Greedy by value density fails, e.g., items (weight,value): (10,60), (20,100), (30,120), capacity=50.
  Greedy picks densities 6 and 5 → value 160, but optimal 0/1 is items with weights 20 and 30 → value 220.
- Dynamic programming (O(N*W)) or branch-and-bound required for 0/1 variant.

Fractional knapsack works because we can take partial items, making density-based greedy optimal.
*/

/*🎯 TIME COMPLEXITY ANALYSIS:
- Sorting N items by value density: O(N log N)
- Iterating items to fill knapsack: O(N)
- Total: O(N log N)

🎯 SPACE COMPLEXITY ANALYSIS:
- In-place sort: O(1) auxiliary
- If copying array: O(N)

🎯 EDGE CASES:
- Capacity = 0 → result 0
- All items heavier than capacity → take best fractional portion of highest density item
- Items with zero value → taking them adds no benefit (density 0)
- Items with zero weight (if allowed) and positive value → infinite density (handle by taking all such items first)
- Large values or weights → use floating-point for fractions (watch precision)

🎯 ADVANTAGES:
- Simple greedy algorithm
- Optimal for fractional case
- Efficient O(N log N)
- Easy to implement

🎯 DISADVANTAGES:
- Requires sorting (slower than linear scan)
- Floating-point arithmetic may introduce minor precision errors
- Not applicable to 0/1 knapsack

🎯 REAL-WORLD APPLICATIONS:
- Resource allocation where partial allocation allowed (e.g., bandwidth, raw materials)
- Portfolio selection with divisible assets
- Filling tank with fuel from sources with varying efficiency
- Cutting metals where partial rods allowed

🎯 RELATED PROBLEMS:
- 0/1 Knapsack (DP-based)
- Unbounded knapsack
- Job sequencing with deadlines (greedy variant)
- Activity selection (greedy by finish time)
- Coin change with fractional coins

🎯 TESTING STRATEGY:
- Standard sample inputs
- Capacity smaller than all weights
- Items with same value density
- Items with very large/small values
- Floating point precision scenarios
- Empty item list

🎯 DEBUGGING TIPS:
- Print sorted items with densities to verify order
- Keep track of remaining capacity
- Ensure fractional calculation done with floating point
- Watch for float rounding; use `toFixed` when printing if needed

🎯 COMMON MISTAKES:
- Sorting ascending instead of descending by density
- Using integer division when computing density
- Not handling fractional part (forgetting to break after partial take)
- Not considering zero capacity/empty array

🎯 BEST PRACTICES:
- Use descriptive variable names (`totalValue`, `cap`)
- Guard against capacity ≤ 0 early
- Consider storing ratio if used frequently
- Keep Item class minimal (weight, value)

🎯 INTERVIEW TIPS:
- Explain difference between fractional vs 0/1 knapsack
- Justify greedy choice (value density argument)
- Walk through example
- Discuss complexity and edge cases
- Mention potential floating-point precision

🎯 GREEDY PATTERN SUMMARY:
1. Derive a metric (value density).
2. Sort items by metric descending.
3. Iterate, taking as much as possible of each item.
4. Stop when capacity exhausted.

This is the classic fractional knapsack greedy pattern!
*/
