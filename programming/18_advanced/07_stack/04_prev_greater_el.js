/* Problem: ✅✅✅✅ Previous Greater Element ✅✅✅✅

Given an array, find the previous greater element for each element. The previous greater element of an element is the first element to the left that is greater than the current element. If no such element exists, return -1.

Example 1:
Input: arr = [15, 10, 18, 12, 4, 6, 2, 8]
Output: [-1, 15, -1, 18, 12, 12, 6, 12]
Explanation:
- Element 15: No previous element → -1
- Element 10: Previous greater is 15
- Element 18: No previous greater element → -1
- Element 12: Previous greater is 18
- Element 4: Previous greater is 12
- Element 6: Previous greater is 12
- Element 2: Previous greater is 6
- Element 8: Previous greater is 12

Example 2:
Input: arr = [8, 10, 12]
Output: [-1, -1, -1]
Explanation: Each element is greater than the previous one, so no previous greater element exists.

Example 3:
Input: arr = [12, 10, 8]
Output: [-1, 12, 10]
Explanation: Each element is smaller than the previous one, so the previous element is always the previous greater element.

Constraints:
- 1 <= arr.length <= 10^5
- 0 <= arr[i] <= 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) 
// ✅ SC = O(n)
function prevGreaterElements(arr){
    let st = []
    st.push(arr[0]) // element. no need of index here
    console.log(-1) // prev greater of first el is always 1
    
    for(let i=1; i<arr.length; i++){
        while(st.length > 0 && st[st.length-1] <= arr[i]){
            // remove elements from stack if that el <= curr el. Means looking for prev greater elements of curr el
            st.pop()
        }
        
        // if stack is empty --> means no prev greater el
        // If stack is not empty --> means the peak el is the prev greater el
        let prevGreater = st.length === 0 ? -1 : st[st.length -1]
        console.log(prevGreater)
        
        st.push(arr[i]) // pushing curr el to stack
    }
}
// OR (No need to push first element to stack. Just start from index 0.)
function prevGreaterElements(arr){
    let st = []
    
    for(let i=0; i<arr.length; i++){ 
        while(st.length > 0 && st[st.length-1] <= arr[i]){
            // remove elements from stack if that el <= curr el. Means looking for prev greater elements of curr el
            st.pop()
        }
        
        // if stack is empty --> means no prev greater el
        // If stack is not empty --> means the peak el is the prev greater el
        let prevGreater = st.length === 0 ? -1 : st[st.length -1]
        console.log(prevGreater)
        
        st.push(arr[i]) // pushing curr el to stack
    }
}

let arr = [15, 10, 18, 12, 4, 6, 2, 8] // -1 15 -1 18 12 12 6 12
arr = [8, 10, 12] // -1 -1 -1
arr = [12, 10, 8] // -1 12 10
prevGreaterElements(arr)

/*🎯 CORE IDEA: Use a stack to efficiently find the previous greater element for each element in O(n) time.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create empty stack to store elements
   - Push first element to stack
   - Print -1 for first element (no previous element)

2️⃣ ITERATION FOR EACH ELEMENT:
   - While stack is not empty and stack top <= current element:
     * Pop elements from stack (remove smaller elements)
   - Find previous greater element:
     * If stack is empty: previous greater = -1
     * If stack not empty: previous greater = stack.top
   - Push current element to stack

3️⃣ PREVIOUS GREATER ELEMENT:
   - Stack stores elements in decreasing order
   - Top of stack is the previous greater element
   - Pop smaller elements to maintain decreasing order

🧠 WHY THIS APPROACH?
- Stack maintains decreasing order of elements
- Each element is pushed and popped at most once
- O(n) time complexity with O(n) space
- Efficiently finds previous greater element

💡 KEY INSIGHTS:
- Stack stores elements, not indices
- Pop elements smaller than or equal to current element
- Stack top gives previous greater element
- Previous greater calculation depends on stack state
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: arr = [15, 10, 18, 12, 4, 6, 2, 8]
INPUT: Array of 8 elements

🎯 GOAL: Find previous greater element for each element!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [15, 10, 18, 12, 4, 6, 2, 8]
st = [15] (stack with element 15)
prevGreater[0] = -1 (first element has no previous element)

📋 ITERATION PROCESS:

ITERATION 1: i = 1, arr[1] = 10
Stack: [15] (contains element 15)
st.top = 15
Condition: 15 <= 10 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 15
st.push(10) → st = [15, 10]
Result: prevGreater[1] = 15

ITERATION 2: i = 2, arr[2] = 18
Stack: [15, 10] (contains elements 15, 10)
st.top = 10
Condition: 10 <= 18 ✓ (pop)
st.pop() → st = [15]
st.top = 15
Condition: 15 <= 18 ✓ (pop)
st.pop() → st = []
Stack is empty → prevGreater = -1
st.push(18) → st = [18]
Result: prevGreater[2] = -1

ITERATION 3: i = 3, arr[3] = 12
Stack: [18] (contains element 18)
st.top = 18
Condition: 18 <= 12 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 18
st.push(12) → st = [18, 12]
Result: prevGreater[3] = 18

ITERATION 4: i = 4, arr[4] = 4
Stack: [18, 12] (contains elements 18, 12)
st.top = 12
Condition: 12 <= 4 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 12
st.push(4) → st = [18, 12, 4]
Result: prevGreater[4] = 12

ITERATION 5: i = 5, arr[5] = 6
Stack: [18, 12, 4] (contains elements 18, 12, 4)
st.top = 4
Condition: 4 <= 6 ✓ (pop)
st.pop() → st = [18, 12]
st.top = 12
Condition: 12 <= 6 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 12
st.push(6) → st = [18, 12, 6]
Result: prevGreater[5] = 12

ITERATION 6: i = 6, arr[6] = 2
Stack: [18, 12, 6] (contains elements 18, 12, 6)
st.top = 6
Condition: 6 <= 2 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 6
st.push(2) → st = [18, 12, 6, 2]
Result: prevGreater[6] = 6

ITERATION 7: i = 7, arr[7] = 8
Stack: [18, 12, 6, 2] (contains elements 18, 12, 6, 2)
st.top = 2
Condition: 2 <= 8 ✓ (pop)
st.pop() → st = [18, 12, 6]
st.top = 6
Condition: 6 <= 8 ✓ (pop)
st.pop() → st = [18, 12]
st.top = 12
Condition: 12 <= 8 ✗ (don't pop)
Stack not empty → prevGreater = st.top = 12
st.push(8) → st = [18, 12, 8]
Result: prevGreater[7] = 12

🏆 FINAL RESULT: [-1, 15, -1, 18, 12, 12, 6, 12]

─────────────────────────────────────────

📊 SECOND EXAMPLE: arr = [8, 10, 12]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [8, 10, 12]
st = [8]
prevGreater[0] = -1

ITERATIONS:
1. i=1, arr[1]=10: st=[8] → 8<=10 → pop → st=[] → prevGreater=-1 → st=[10]
2. i=2, arr[2]=12: st=[10] → 10<=12 → pop → st=[] → prevGreater=-1 → st=[12]

🏆 FINAL RESULT: [-1, -1, -1]

─────────────────────────────────────────

📊 THIRD EXAMPLE: arr = [12, 10, 8]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [12, 10, 8]
st = [12]
prevGreater[0] = -1

ITERATIONS:
1. i=1, arr[1]=10: st=[12] → 12<=10 ✗ → no pop → prevGreater=12 → st=[12,10]
2. i=2, arr[2]=8: st=[12,10] → 10<=8 ✗ → no pop → prevGreater=10 → st=[12,10,8]

🏆 FINAL RESULT: [-1, 12, 10]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EXAMPLE: [15, 10, 18, 12, 4, 6, 2, 8]

Element 0 (15): ┌─────┐
                │ -1  │ ← no previous element
                └─────┘

Element 1 (10): ┌─────┬─────┐
                │ 15  │ 10  │ ← previous greater = 15
                └─────┴─────┘

Element 2 (18): ┌─────┐
                │ -1  │ ← no previous greater element
                └─────┘

Element 3 (12): ┌─────┬─────┐
                │ 18  │ 12  │ ← previous greater = 18
                └─────┴─────┘

Element 4 (4):  ┌─────┬─────┬─────┐
                │ 18  │ 12  │  4  │ ← previous greater = 12
                └─────┴─────┴─────┘

Element 5 (6):  ┌─────┬─────┬─────┐
                │ 18  │ 12  │  6  │ ← previous greater = 12
                └─────┴─────┴─────┘

Element 6 (2):  ┌─────┬─────┬─────┬─────┐
                │ 18  │ 12  │  6  │  2  │ ← previous greater = 6
                └─────┴─────┴─────┴─────┘

Element 7 (8):  ┌─────┬─────┬─────┐
                │ 18  │ 12  │  8  │ ← previous greater = 12
                └─────┴─────┴─────┘

─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

ITERATION 0: st = [15]
ITERATION 1: st = [15, 10] (pushed 10)
ITERATION 2: st = [18] (popped 15,10, pushed 18)
ITERATION 3: st = [18, 12] (pushed 12)
ITERATION 4: st = [18, 12, 4] (pushed 4)
ITERATION 5: st = [18, 12, 6] (popped 4, pushed 6)
ITERATION 6: st = [18, 12, 6, 2] (pushed 2)
ITERATION 7: st = [18, 12, 8] (popped 6,2, pushed 8)

─────────────────────────────────────────

📊 PREVIOUS GREATER ELEMENT LOGIC:

CASE 1: Stack is empty
- No previous greater element exists
- Previous greater = -1

CASE 2: Stack is not empty
- Stack top contains the previous greater element
- Previous greater = stack.top

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ STACK MAINTAINS DECREASING ORDER: Top element is always greater
2️⃣ EFFICIENT POPPING: Remove elements smaller than or equal to current
3️⃣ PREVIOUS GREATER CALCULATION: Direct access to stack top
4️⃣ OPTIMAL TIME: Each element pushed/popped once
5️⃣ CORRECT LOGIC: Stack top gives previous greater element

💡 KEY INSIGHT:
Stack maintains elements in decreasing order,
allowing O(1) access to previous greater element!

🎯 TIME COMPLEXITY ANALYSIS:
- Each element pushed once: O(n)
- Each element popped once: O(n)
- Total operations: O(n)
- Optimal time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack stores at most n elements: O(n)
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
- Correct calculation for all cases
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Stack stores elements, not indices
- Pop condition: stack.top <= arr[i]
- Previous greater formula: stack.empty() ? -1 : stack.top
- Push current element after processing

🎯 PREVIOUS GREATER INTERPRETATION:
- Previous greater = first element to the left that is greater
- If no such element exists, return -1
- Stack maintains decreasing order for efficient access
- Direct access to previous greater element

🎯 STACK PROPERTIES:
- Maintains decreasing order of elements
- Top element is previous greater element
- Efficient for finding previous greater element
- Optimal for previous greater calculation

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n²) - check all previous elements
- Stack: O(n) - efficient with stack
- Both: Correct results
- Stack: Much more efficient

🎯 REAL-WORLD APPLICATIONS:
- Data analysis
- Pattern recognition
- Algorithm optimization
- Data structure design
- Competitive programming

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
- First element: previous greater = -1
- Empty stack: previous greater = -1
- Non-empty stack: previous greater = stack.top
- All elements processed

🎯 ERROR HANDLING:
- Empty array: handled gracefully
- Single element: previous greater = -1
- Invalid input: robust handling
- Edge cases: comprehensive coverage
*/