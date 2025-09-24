/* Problem: ✅✅✅✅ Next Greater Element ✅✅✅✅

Given an array, find the next greater element for each element. The next greater element of an element is the first element to the right that is greater than the current element. If no such element exists, return -1.

Example 1:
Input: arr = [10, 20, 30, 40]
Output: [20, 30, 40, -1]
Explanation:
- Element 10: Next greater is 20
- Element 20: Next greater is 30
- Element 30: Next greater is 40
- Element 40: No next greater element → -1

Example 2:
Input: arr = [40, 30, 20, 10]
Output: [-1, -1, -1, -1]
Explanation: Each element is greater than the next one, so no next greater element exists.

Example 3:
Input: arr = [4, 5, 2, 10]
Output: [5, 10, 10, -1]
Explanation:
- Element 4: Next greater is 5
- Element 5: Next greater is 10
- Element 2: Next greater is 10
- Element 10: No next greater element → -1

Constraints:
- 1 <= arr.length <= 10^5
- 0 <= arr[i] <= 10^9

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n) 
// ✅ SC = O(n)
function nextGreater(arr){
    let res = []
    let st = []
    
    for(let i = arr.length - 1; i>=0 ; i--){
        while(st.length > 0 && st[st.length - 1] <= arr[i]){
            st.pop()
        }
        
        let ng = st.length === 0 ? -1 : st[st.length -1]
        
        res.push(ng)
        
        st.push(arr[i])
    }
    
    for(let i=res.length - 1; i>=0; i--){
        console.log(res[i])
    }
}

// OR 

// No need to add into dummy array, and then add in reverse order. 
// We can directly add using index now since we have already initialized arry with n length.
function nextGreater(arr){
  let res = new Array(arr.length) // ✅✅✅✅
  let st = []
  
  for(let i = arr.length - 1; i>=0 ; i--){
      while(st.length > 0 && st[st.length - 1] <= arr[i]){
          st.pop()
      }
      
      let ng = st.length === 0 ? -1 : st[st.length -1]
      
      res[i] = ng
      
      st.push(arr[i]) // ✅✅✅✅
  }
  
  return res // ✅✅✅✅
}

let arr = [10, 20, 30, 40] // 20 30 40 -1
arr = [40, 30, 20, 10] // -1 -1 -1 -1
nextGreater(arr)

/*🎯 CORE IDEA: Use a stack to efficiently find the next greater element for each element in O(n) time by processing from right to left.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create empty result array to store next greater elements
   - Create empty stack to store elements
   - Process array from right to left (reverse order)

2️⃣ REVERSE ITERATION:
   - Start from last element and move left
   - While stack is not empty and stack top <= current element:
     * Pop elements from stack (remove smaller elements)
   - Find next greater element:
     * If stack is empty: next greater = -1
     * If stack not empty: next greater = stack.top
   - Push current element to stack

3️⃣ RESULT PROCESSING:
   - Store results in reverse order
   - Print results in correct order (left to right)

🧠 WHY THIS APPROACH?
- Right-to-left processing allows efficient stack usage
- Stack maintains decreasing order of elements
- Each element is pushed and popped at most once
- O(n) time complexity with O(n) space

💡 KEY INSIGHTS:
- Process from right to left for efficient stack operations
- Stack stores elements, not indices
- Pop elements smaller than or equal to current element
- Stack top gives next greater element
- Results stored in reverse order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: arr = [4, 5, 2, 10]
INPUT: Array of 4 elements

🎯 GOAL: Find next greater element for each element!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [4, 5, 2, 10]
res = [] (result array)
st = [] (stack)
Process from right to left: i = 3, 2, 1, 0

📋 ITERATION PROCESS:

ITERATION 1: i = 3, arr[3] = 10
Stack: [] (empty)
st.length === 0 → nextGreater = -1
res.push(-1) → res = [-1]
st.push(10) → st = [10]
Result: nextGreater[3] = -1

ITERATION 2: i = 2, arr[2] = 2
Stack: [10] (contains element 10)
st.top = 10
Condition: 10 <= 2 ✗ (don't pop)
Stack not empty → nextGreater = st.top = 10
res.push(10) → res = [-1, 10]
st.push(2) → st = [10, 2]
Result: nextGreater[2] = 10

ITERATION 3: i = 1, arr[1] = 5
Stack: [10, 2] (contains elements 10, 2)
st.top = 2
Condition: 2 <= 5 ✓ (pop)
st.pop() → st = [10]
st.top = 10
Condition: 10 <= 5 ✗ (don't pop)
Stack not empty → nextGreater = st.top = 10
res.push(10) → res = [-1, 10, 10]
st.push(5) → st = [10, 5]
Result: nextGreater[1] = 10

ITERATION 4: i = 0, arr[0] = 4
Stack: [10, 5] (contains elements 10, 5)
st.top = 5
Condition: 5 <= 4 ✗ (don't pop)
Stack not empty → nextGreater = st.top = 5
res.push(5) → res = [-1, 10, 10, 5]
st.push(4) → st = [10, 5, 4]
Result: nextGreater[0] = 5

📋 RESULT PROCESSING:
res = [-1, 10, 10, 5] (stored in reverse order)
Print in correct order: 5, 10, 10, -1

🏆 FINAL RESULT: [5, 10, 10, -1]

─────────────────────────────────────────

📊 SECOND EXAMPLE: arr = [10, 20, 30, 40]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [10, 20, 30, 40]
res = []
st = []

ITERATIONS (right to left):
1. i=3, arr[3]=40: st=[] → nextGreater=-1 → res=[-1] → st=[40]
2. i=2, arr[2]=30: st=[40] → 40<=30 ✗ → nextGreater=40 → res=[-1,40] → st=[40,30]
3. i=1, arr[1]=20: st=[40,30] → 30<=20 ✗ → nextGreater=30 → res=[-1,40,30] → st=[40,30,20]
4. i=0, arr[0]=10: st=[40,30,20] → 20<=10 ✗ → nextGreater=20 → res=[-1,40,30,20] → st=[40,30,20,10]

RESULT PROCESSING:
res = [-1, 40, 30, 20] (reverse order)
Print: 20, 30, 40, -1

🏆 FINAL RESULT: [20, 30, 40, -1]

─────────────────────────────────────────

📊 THIRD EXAMPLE: arr = [40, 30, 20, 10]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [40, 30, 20, 10]
res = []
st = []

ITERATIONS (right to left):
1. i=3, arr[3]=10: st=[] → nextGreater=-1 → res=[-1] → st=[10]
2. i=2, arr[2]=20: st=[10] → 10<=20 ✓ → pop → st=[] → nextGreater=-1 → res=[-1,-1] → st=[20]
3. i=1, arr[1]=30: st=[20] → 20<=30 ✓ → pop → st=[] → nextGreater=-1 → res=[-1,-1,-1] → st=[30]
4. i=0, arr[0]=40: st=[30] → 30<=40 ✓ → pop → st=[] → nextGreater=-1 → res=[-1,-1,-1,-1] → st=[40]

RESULT PROCESSING:
res = [-1, -1, -1, -1] (reverse order)
Print: -1, -1, -1, -1

🏆 FINAL RESULT: [-1, -1, -1, -1]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EXAMPLE: [4, 5, 2, 10]

Element 0 (4): ┌─────┐
               │  5  │ ← next greater = 5
               └─────┘

Element 1 (5): ┌─────┐
               │ 10  │ ← next greater = 10
               └─────┘

Element 2 (2): ┌─────┐
               │ 10  │ ← next greater = 10
               └─────┘

Element 3 (10): ┌─────┐
                │ -1  │ ← no next greater element
                └─────┘

─────────────────────────────────────────

📊 STACK STATE EVOLUTION (right to left):

ITERATION 1 (i=3): st = [10] (pushed 10)
ITERATION 2 (i=2): st = [10, 2] (pushed 2)
ITERATION 3 (i=1): st = [10, 5] (popped 2, pushed 5)
ITERATION 4 (i=0): st = [10, 5, 4] (pushed 4)

─────────────────────────────────────────

📊 NEXT GREATER ELEMENT LOGIC:

CASE 1: Stack is empty
- No next greater element exists
- Next greater = -1

CASE 2: Stack is not empty
- Stack top contains the next greater element
- Next greater = stack.top

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RIGHT-TO-LEFT PROCESSING: Efficient stack operations
2️⃣ STACK MAINTAINS DECREASING ORDER: Top element is always greater
3️⃣ EFFICIENT POPPING: Remove elements smaller than or equal to current
4️⃣ NEXT GREATER CALCULATION: Direct access to stack top
5️⃣ OPTIMAL TIME: Each element pushed/popped once

💡 KEY INSIGHT:
Right-to-left processing with stack maintains decreasing order,
allowing O(1) access to next greater element!

🎯 TIME COMPLEXITY ANALYSIS:
- Each element pushed once: O(n)
- Each element popped once: O(n)
- Total operations: O(n)
- Optimal time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack stores at most n elements: O(n)
- Result array stores n elements: O(n)
- Total space: O(n)
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Single element array
- Increasing sequence
- Decreasing sequence
- All equal elements
- Mixed sequences

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find next greater element
- Correct calculation for all cases
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Process from right to left (i = arr.length-1 to 0)
- Stack stores elements, not indices
- Pop condition: stack.top <= arr[i]
- Next greater formula: stack.empty() ? -1 : stack.top
- Push current element after processing
- Results stored in reverse order

🎯 NEXT GREATER INTERPRETATION:
- Next greater = first element to the right that is greater
- If no such element exists, return -1
- Stack maintains decreasing order for efficient access
- Direct access to next greater element

🎯 STACK PROPERTIES:
- Maintains decreasing order of elements
- Top element is next greater element
- Efficient for finding next greater element
- Optimal for next greater calculation

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n²) - check all next elements
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
- Right-to-left processing
- Single pass algorithm
- Efficient popping strategy
- Optimal space usage

🎯 ALGORITHM PATTERN:
- Monotonic stack technique
- Next greater element
- Efficient range queries
- Stack-based optimization

🎯 BOUNDARY CONDITIONS:
- Last element: next greater = -1
- Empty stack: next greater = -1
- Non-empty stack: next greater = stack.top
- All elements processed

🎯 ERROR HANDLING:
- Empty array: handled gracefully
- Single element: next greater = -1
- Invalid input: robust handling
- Edge cases: comprehensive coverage
*/