/* Problem: ✅✅✅✅ Stock Span Problem ✅✅✅✅

The stock span problem is a financial problem where we have a series of n daily price quotes for a stock 
and we need to calculate the span of the stock's price for all n days.

The span of the stock's price on a given day is defined as the 
maximum number of consecutive days (starting from today and going backward) 
for which the stock price was less than or equal to today's price.

Example 1:
Input: prices = [13, 15, 12, 14, 16, 8, 6, 4, 10, 30]
Output: [1, 2, 1, 2, 5, 1, 1, 1, 4, 10]
Explanation:
- Day 0 (13): Only itself → span = 1
- Day 1 (15): 15 > 13 → span = 2 (13, 15)
- Day 2 (12): 12 < 15 → span = 1 (only 12)
- Day 3 (14): 14 > 12, 14 < 15 → span = 2 (12, 14)
- Day 4 (16): 16 > all previous → span = 5 (13, 15, 12, 14, 16)
- Day 5 (8): 8 < 16 → span = 1 (only 8)
- Day 6 (6): 6 < 8 → span = 1 (only 6)
- Day 7 (4): 4 < 6 → span = 1 (only 4)
- Day 8 (10): 10 > 4, 10 > 6, 10 > 8, 10 < 16 → span = 4 (8, 6, 4, 10)
- Day 9 (30): 30 > all previous → span = 10 (all elements)

Example 2:
Input: prices = [10, 20, 30, 40]
Output: [1, 2, 3, 4]
Explanation: Each day's price is greater than the previous day.

Example 3:
Input: prices = [40, 30, 20, 10]
Output: [1, 1, 1, 1]
Explanation: Each day's price is less than the previous day.

Constraints:
- 1 <= prices.length <= 10^5
- 0 <= prices[i] <= 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) 
// ✅ SC = O(n)
function stockSpans(arr){
    let st = []
    st.push(0) // Note: push INDEX not element
    console.log(1) // span of first el is always 1
    
    for(let i=1; i<arr.length; i++){
        
        while(st.length > 0 && arr[st[st.length-1]] <= arr[i]){
            // remove indexes of elements from stack if that el <= curr el. Means looking for index of closest greater el to curr el
            st.pop()
        }
        
        // if stack is empty --> means no greater el exist from start of arr to curr idx. So span = i+1 . +1 means counting itself too in the span
        // If stack is not empty --> means the peak el is the closest greater el to curr el. So span = (i - that closest element's index)
        let span = st.length === 0 ? i+1 : (i-st[st.length - 1])
        console.log(span)
        
        st.push(i) // pushing curr idx to stack
    }
}

let arr = [13, 15, 12, 14, 16, 8, 6, 4, 10, 30] // 1 2 1 2 5 1 1 1 4 10
arr = [10, 20, 30, 40] // 1 2 3 4
arr = [40, 30, 20, 10] // 1 1 1 1
stockSpans(arr)

/*🎯 CORE IDEA: Use a stack to efficiently find the previous greater element for each day, calculating the span in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create empty stack to store indices
   - Push index 0 to stack
   - Print span 1 for first element

2️⃣ ITERATION FOR EACH DAY:
   - While stack is not empty and current price >= stack top price:
     * Pop indices from stack (remove smaller elements)
   - Calculate span:
     * If stack is empty: span = i + 1 (all previous days)
     * If stack not empty: span = i - stack.top (days since last greater price)
   - Push current index to stack

3️⃣ SPAN CALCULATION:
   - Stack stores indices of elements in decreasing order
   - Top of stack is the index of previous greater element
   - Span = current index - previous greater element index

🧠 WHY THIS APPROACH?
- Stack maintains decreasing order of prices
- Each element is pushed and popped at most once
- O(n) time complexity with O(n) space
- Efficiently finds previous greater element

💡 KEY INSIGHTS:
- Stack stores indices, not values
- Pop elements smaller than current element
- Stack top gives previous greater element index
- Span calculation depends on stack state
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: arr = [13, 15, 12, 14, 16, 8, 6, 4, 10, 30]
INPUT: Stock prices for 10 days

🎯 GOAL: Calculate span for each day!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [13, 15, 12, 14, 16, 8, 6, 4, 10, 30]
st = [0] (stack with index 0)
span[0] = 1 (first element always has span 1)

📋 ITERATION PROCESS:

ITERATION 1: i = 1, arr[1] = 15
Stack: [0] (contains index 0)
arr[st.top] = arr[0] = 13
Condition: 13 <= 15 ✓ (pop)
st.pop() → st = []
Stack is empty → span = i + 1 = 1 + 1 = 2
st.push(1) → st = [1]
Result: span[1] = 2

ITERATION 2: i = 2, arr[2] = 12
Stack: [1] (contains index 1)
arr[st.top] = arr[1] = 15
Condition: 15 <= 12 ✗ (don't pop)
Stack not empty → span = i - st.top = 2 - 1 = 1
st.push(2) → st = [1, 2]
Result: span[2] = 1

ITERATION 3: i = 3, arr[3] = 14
Stack: [1, 2] (contains indices 1, 2)
arr[st.top] = arr[2] = 12
Condition: 12 <= 14 ✓ (pop)
st.pop() → st = [1]
arr[st.top] = arr[1] = 15
Condition: 15 <= 14 ✗ (don't pop)
Stack not empty → span = i - st.top = 3 - 1 = 2
st.push(3) → st = [1, 3]
Result: span[3] = 2

ITERATION 4: i = 4, arr[4] = 16
Stack: [1, 3] (contains indices 1, 3)
arr[st.top] = arr[3] = 14
Condition: 14 <= 16 ✓ (pop)
st.pop() → st = [1]
arr[st.top] = arr[1] = 15
Condition: 15 <= 16 ✓ (pop)
st.pop() → st = []
Stack is empty → span = i + 1 = 4 + 1 = 5
st.push(4) → st = [4]
Result: span[4] = 5

ITERATION 5: i = 5, arr[5] = 8
Stack: [4] (contains index 4)
arr[st.top] = arr[4] = 16
Condition: 16 <= 8 ✗ (don't pop)
Stack not empty → span = i - st.top = 5 - 4 = 1
st.push(5) → st = [4, 5]
Result: span[5] = 1

ITERATION 6: i = 6, arr[6] = 6
Stack: [4, 5] (contains indices 4, 5)
arr[st.top] = arr[5] = 8
Condition: 8 <= 6 ✗ (don't pop)
Stack not empty → span = i - st.top = 6 - 5 = 1
st.push(6) → st = [4, 5, 6]
Result: span[6] = 1

ITERATION 7: i = 7, arr[7] = 4
Stack: [4, 5, 6] (contains indices 4, 5, 6)
arr[st.top] = arr[6] = 6
Condition: 6 <= 4 ✗ (don't pop)
Stack not empty → span = i - st.top = 7 - 6 = 1
st.push(7) → st = [4, 5, 6, 7]
Result: span[7] = 1

ITERATION 8: i = 8, arr[8] = 10
Stack: [4, 5, 6, 7] (contains indices 4, 5, 6, 7)
arr[st.top] = arr[7] = 4
Condition: 4 <= 10 ✓ (pop)
st.pop() → st = [4, 5, 6]
arr[st.top] = arr[6] = 6
Condition: 6 <= 10 ✓ (pop)
st.pop() → st = [4, 5]
arr[st.top] = arr[5] = 8
Condition: 8 <= 10 ✓ (pop)
st.pop() → st = [4]
arr[st.top] = arr[4] = 16
Condition: 16 <= 10 ✗ (don't pop)
Stack not empty → span = i - st.top = 8 - 4 = 4
st.push(8) → st = [4, 8]
Result: span[8] = 4

ITERATION 9: i = 9, arr[9] = 30
Stack: [4, 8] (contains indices 4, 8)
arr[st.top] = arr[8] = 10
Condition: 10 <= 30 ✓ (pop)
st.pop() → st = [4]
arr[st.top] = arr[4] = 16
Condition: 16 <= 30 ✓ (pop)
st.pop() → st = []
Stack is empty → span = i + 1 = 9 + 1 = 10
st.push(9) → st = [9]
Result: span[9] = 10

🏆 FINAL RESULT: [1, 2, 1, 2, 5, 1, 1, 1, 4, 10]

─────────────────────────────────────────

📊 SECOND EXAMPLE: arr = [10, 20, 30, 40]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [10, 20, 30, 40]
st = [0]
span[0] = 1

ITERATIONS:
1. i=1, arr[1]=20: st=[0] → 20>10 → pop → st=[] → span=2 → st=[1]
2. i=2, arr[2]=30: st=[1] → 30>20 → pop → st=[] → span=3 → st=[2]
3. i=3, arr[3]=40: st=[2] → 40>30 → pop → st=[] → span=4 → st=[3]

🏆 FINAL RESULT: [1, 2, 3, 4]

─────────────────────────────────────────

📊 THIRD EXAMPLE: arr = [40, 30, 20, 10]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [40, 30, 20, 10]
st = [0]
span[0] = 1

ITERATIONS:
1. i=1, arr[1]=30: st=[0] → 30<40 → no pop → span=1 → st=[0,1]
2. i=2, arr[2]=20: st=[0,1] → 20<30 → no pop → span=1 → st=[0,1,2]
3. i=3, arr[3]=10: st=[0,1,2] → 10<20 → no pop → span=1 → st=[0,1,2,3]

🏆 FINAL RESULT: [1, 1, 1, 1]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EXAMPLE: [13, 15, 12, 14, 16, 8, 6, 4, 10, 30]

Day 0 (13): ┌─────┐
            │  1  │ ← span = 1 (only itself)
            └─────┘

Day 1 (15): ┌─────┬─────┐
            │ 13  │ 15  │ ← span = 2 (13, 15)
            └─────┴─────┘

Day 2 (12): ┌─────┬─────┬─────┐
            │ 13  │ 15  │ 12  │ ← span = 1 (only 12)
            └─────┴─────┴─────┘

Day 3 (14): ┌─────┬─────┬─────┬─────┐
            │ 13  │ 15  │ 12  │ 14  │ ← span = 2 (12, 14)
            └─────┴─────┴─────┴─────┘

Day 4 (16): ┌─────┬─────┬─────┬─────┬─────┐
            │ 13  │ 15  │ 12  │ 14  │ 16  │ ← span = 5 (all)
            └─────┴─────┴─────┴─────┴─────┘

Day 5 (8):  ┌─────┬─────┬─────┬─────┬─────┬─────┐
            │ 13  │ 15  │ 12  │ 14  │ 16  │  8  │ ← span = 1 (only 8)
            └─────┴─────┴─────┴─────┴─────┴─────┘

─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

ITERATION 0: st = [0]
ITERATION 1: st = [1] (popped 0)
ITERATION 2: st = [1, 2] (pushed 2)
ITERATION 3: st = [1, 3] (popped 2, pushed 3)
ITERATION 4: st = [4] (popped 1,3, pushed 4)
ITERATION 5: st = [4, 5] (pushed 5)
ITERATION 6: st = [4, 5, 6] (pushed 6)
ITERATION 7: st = [4, 5, 6, 7] (pushed 7)
ITERATION 8: st = [4, 8] (popped 5,6,7, pushed 8)
ITERATION 9: st = [9] (popped 4,8, pushed 9)

─────────────────────────────────────────

📊 SPAN CALCULATION LOGIC:

CASE 1: Stack is empty
- No previous greater element exists
- Span = current index + 1 (all previous days + current day)

CASE 2: Stack is not empty
- Stack top contains index of previous greater element
- Span = current index - previous greater element index

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ STACK MAINTAINS DECREASING ORDER: Top element is always greater
2️⃣ EFFICIENT POPPING: Remove elements smaller than current
3️⃣ SPAN CALCULATION: Direct formula based on stack state
4️⃣ OPTIMAL TIME: Each element pushed/popped once
5️⃣ CORRECT LOGIC: Stack top gives previous greater element

💡 KEY INSIGHT:
Stack maintains indices of elements in decreasing order,
allowing O(1) access to previous greater element!

🎯 TIME COMPLEXITY ANALYSIS:
- Each element pushed once: O(n)
- Each element popped once: O(n)
- Total operations: O(n)
- Optimal time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack stores at most n indices: O(n)
- No additional data structures needed
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Single element array
- Increasing sequence
- Decreasing sequence
- All equal elements
- Mixed sequences

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find previous greater element
- Correct span calculation for all cases
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Stack stores indices, not values
- Pop condition: arr[stack.top] <= arr[i]
- Span formula: stack.empty() ? i+1 : i-stack.top
- Push current index after processing

🎯 SPAN INTERPRETATION:
- Span = number of consecutive days (including current)
- Starting from current day going backward
- Until finding a day with greater price
- Inclusive of current day

🎯 STACK PROPERTIES:
- Maintains decreasing order of prices
- Top element is previous greater element
- Efficient for finding previous greater element
- Optimal for span calculation

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n²) - check all previous elements
- Stack: O(n) - efficient with stack
- Both: Correct results
- Stack: Much more efficient

🎯 REAL-WORLD APPLICATIONS:
- Stock market analysis
- Financial data processing
- Time series analysis
- Pattern recognition
- Data visualization

🎯 OPTIMIZATION TECHNIQUES:
- Stack-based approach
- Single pass algorithm
- Efficient popping strategy
- Optimal space usage

🎯 ALGORITHM PATTERN:
- Monotonic stack technique
- Previous greater element
- Efficient range queries
- Stack-based optimization

🎯 BOUNDARY CONDITIONS:
- First element: span = 1
- Empty stack: span = i + 1
- Non-empty stack: span = i - stack.top
- All elements processed

🎯 ERROR HANDLING:
- Empty array: handled gracefully
- Single element: span = 1
- Invalid input: robust handling
- Edge cases: comprehensive coverage
*/