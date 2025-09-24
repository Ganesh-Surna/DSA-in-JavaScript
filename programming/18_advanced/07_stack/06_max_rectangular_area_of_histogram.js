/* Problem: ✅✅✅✅ Maximum Rectangular Area in Histogram ✅✅✅✅

Given an array representing heights of bars in a histogram, find the area of the largest rectangle that can be formed within the histogram.

Example 1:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The largest rectangle has area = 10 unit²
- Rectangle formed by bars of height 5 and 6: width = 2, height = 5, area = 10

Example 2:
Input: heights = [2,4]
Output: 4
Explanation: The largest rectangle has area = 4 unit²
- Rectangle formed by single bar of height 4: width = 1, height = 4, area = 4

Example 3:
Input: heights = [6,2,5,4,1,5,6]
Output: 10
Explanation: The largest rectangle has area = 10 unit²
- Rectangle formed by bars of height 5: width = 2, height = 5, area = 10

Constraints:
- 1 <= heights.length <= 10^5
- 0 <= heights[i] <= 10^4

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// I. Efficient Solution (Single Traversal) 
// Idea: 
//      If element is greater than peak, that means that element is the next greater for the peak. 
//      Then the prev smaller for the peak is the element just below it(peak) in the stack.
// ✅ TC = O(n)
// ✅ SC = O(n)
function maxRectArea(arr){
    let st = []
    let res = 0
    let n = arr.length
    
    for(let i=0; i<n; i++){
        while(st.length > 0 && arr[st[st.length-1]] >= arr[i]){ // we are looking for next/prev smaller. So removing elements >= curr element
            let peakIdx = st.pop()
            /*
            Note: peak is removed from stack. Let consider arr[peakIdx] is curr el. 
            Then the next smaller el's index is i, and the prev smaller el's index is new peak in the stack.
            
            curr Ele = arr[peakIdx]
            next smaller idx = i
            prev smaller idx = st[st.length-1]

            Rect Area = arr[i] * (count of elements which are >= peak)
            That means the curr ele should be smaller than the consecutive last greater on left & right. 
            That's why if we found next smaller --> i.e., ele just before next greater is last consecutive greater on right side of curr ele.
              & if we found prev smaller --> i.e., ele just next to prev smaller is last consicutive greater on left side of curr ele
            
            count of elements which are >= peak --> 
                    count of all elements from next smaller idx(excluding it) to prev smaller idx(excluding it) -->
                        i - st[st.length-1] - 1 --> if stack is not empty
                        i --> if stack is empty
            
            The count will be i if stack is empty (i.e., if no prev smaller for curr ele from idx=0 to idx=i(excluded). Means all left side 0 to peakIdx. and rightside from peakIdx to i(excluded - because it is nextSmaller, then only we came into this while loop) are >= arr[peakIdx])
            0 to i(excluded) means span = i
            */
            let count = st.length === 0 ? i : (i  - st[st.length - 1] - 1) // count of elements which are >= peak. Actually -->(i  - (st[st.length - 1] + 1))
            let curr = arr[peakIdx] * count
            
            res = Math.max(res, curr)
        }
        st.push(i)
    }
    
    // Here n --> is i. Because for loop ended. But still stack is not empty. 
    while(st.length > 0){
        let peakIdx = st.pop()
        
        let count = st.length === 0 ? n : (n - st[st.length - 1] - 1); // count of elements which are >= peak
        let curr = arr[peakIdx] * count;
        
        res = Math.max(res, curr)
    }
    
    return res
}
let arr = [60, 20, 50, 40, 30] // 100
arr = [6, 2, 5, 4, 1, 5, 6] // 10
arr = [2, 8, 6, 9, 10, 5, 1] // 25
console.log(maxRectArea(arr))




// II. Better Solution (Three Traversals)
// Idea: 
//      First traverse from left to right to find next smaller element for each element.
//      Then traverse from right to left to find prev smaller element for each element.
//      Then traverse from left to right to find max rectangular area.
// ✅ TC = O(n)
// ✅ SC = O(n)
function maxRectArea(arr){
    let n = arr.length
    let prevSmaller = new Array(n) // ✅✅✅✅
    let nextSmaller = new Array(n) // ✅✅✅✅ No need to add into dummy array, and then add in reverse order. We can directly add using index now since we have already initialized arry with n length.
    let st = []
    let res = 0
    
    // 1. Prev Smaller
    for(let i=0; i<n; i++){
        while(st.length > 0 && arr[st[st.length - 1]] >= arr[i]){
            st.pop()
        }
        
        let ps = st.length === 0 ? -1 : st[st.length - 1]
        prevSmaller[i] = ps // ✅✅✅✅
        
        st.push(i)
    }
    
    // 2. Next smaller
    st = []
    for(let i=n-1; i>=0; i--){
        while(st.length > 0 && arr[st[st.length - 1]] >= arr[i]){
            st.pop()
        }
        
        let ns = st.length === 0 ? n : st[st.length - 1] // storing n instead of -1 for next smaller if not exist. Because we need to calculate count of elements from next smaller idx (excluding it) to prev smaller idx(excluding it).
        nextSmaller[i] = ns // ✅✅✅✅
        
        st.push(i)
    }
    
    console.log(prevSmaller)
    console.log(nextSmaller)
    
    // 3.Calculate Max Area (considering every element is smallest)
    for(let i=0; i<n; i++){
        // let barsCount = nextSmaller[i] - prevSmaller[i] - 1 // count of bars which are >= arr[i]
        // let curr = arr[i]*barsCount
        let curr = arr[i] // curr el added
        curr += arr[i]*((i-1) - prevSmaller[i]) // i-1 because curr el already included
        curr += arr[i]*(nextSmaller[i] - (i+1)) // i+1 because curr el already included
        
        res = Math.max(res, curr)
    }
    
    return res
    
}
// OR
function maxRectArea(arr){
    let n = arr.length
    let prevSmaller = []
    let nextSmaller = []
    let st = []
    let res = 0
    
    // 1. Prev Smaller
    for(let i=0; i<n; i++){
        while(st.length > 0 && arr[st[st.length - 1]] >= arr[i]){
            st.pop()
        }
        
        let ps = st.length === 0 ? -1 : st[st.length - 1]
        prevSmaller.push(ps)
        
        st.push(i)
    }
    
    // 2. Next smaller
    st = []
    let nextSmallerRev = [] // these will be in rev order
    for(let i=n-1; i>=0; i--){
        while(st.length > 0 && arr[st[st.length - 1]] >= arr[i]){
            st.pop()
        }
        
        let ns = st.length === 0 ? n : st[st.length - 1] // storing n instead of -1 for next smaller if not exist. Because we need to calculate count of elements from next smaller idx (excluding it) to prev smaller idx(excluding it).
        nextSmallerRev.push(ns)
        
        st.push(i)
    }
    // Add rev next smallers in correct order
    for(let i=nextSmallerRev.length - 1; i>=0; i--){
        nextSmaller.push(nextSmallerRev[i])
    }
    
    console.log(prevSmaller)
    console.log(nextSmaller)
    
    // 3.Calculate Max Area (considering every element is smallest)
    for(let i=0; i<n; i++){
        // let count = arr[i]*(nextSmaller[i] - prevSmaller[i] - 1)
        let curr = arr[i] // curr el added
        curr += arr[i]*((i-1) - prevSmaller[i]) // i-1 because curr el already included
        curr += arr[i]*(nextSmaller[i] - (i+1)) // i+1 because curr el already included
        
        res = Math.max(res, curr)
    }
    
    return res
    
}

arr = [60, 20, 50, 40, 30] // 100
// prevSm = [ -1, -1, 1, 1, 1 ]
// nextSm = [ 1, 5, 3, 4, 5 ]

arr = [6, 2, 5, 4, 1, 5, 6] // 10
// prevSm = [-1, -1, 1, 1, -1,  4, 5]
// nextSm = [ 1, 4, 3, 4, 7, 7, 7]

arr = [2, 8, 6, 9, 10, 5, 1] // 25 
// prevSm = [-1, 0, 0, 2, 3, 0, -1]
// nextSm = [ 6, 2, 5, 5, 5, 6, 7]
console.log(maxRectArea(arr))



// III. Naive Solution (Quadratic Time Complexity)
// Idea: 
//      For each element, consider it as the smallest element and calculate the area.
// ✅ TC = O(n^2)
// ✅ SC = O(1)
function maxRectArea(arr){
    let n = arr.length
    let res = 0
    
    for(let i=0; i<n; i++){
        let curr = arr[i]
        for(let j=i-1; j>=0; j--){ // left side
            if(arr[j] >= arr[i]){
                curr += arr[i]
            }else{
                break // Break the loop if we found prev smaller
            }
        }
        for(let j=i+1; j<n; j++){ // right side
            if(arr[j] >= arr[i]){
                curr += arr[i]
            }else{
                break // Break the loop if we found next smaller
            }
        }
        res = Math.max(res, curr)
    }
    return res
}

/*🎯 CORE IDEA: Use a stack to efficiently find the maximum rectangular area by considering each element as the smallest element in its rectangle and calculating the area it can form.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create empty stack to store indices
   - Initialize result to 0
   - Process array from left to right

2️⃣ MAIN TRAVERSAL:
   - For each element, while stack is not empty and current element <= stack top:
     * Pop element from stack (this element is the "peak")
     * Calculate area considering popped element as smallest
     * Update maximum area
   - Push current index to stack

3️⃣ AREA CALCULATION:
   - For popped element (peak):
     * Next smaller element index = current index (i)
     * Previous smaller element index = new stack top
     * Width = i - stack.top - 1 (if stack not empty) or i (if stack empty)
     * Area = height[peak] × width

4️⃣ FINAL PROCESSING:
   - After main loop, process remaining elements in stack
   - For each remaining element, calculate area with width extending to end

🧠 WHY THIS APPROACH?
- Each element is considered as the smallest element in its rectangle
- Stack maintains increasing order of heights
- Efficient calculation of previous and next smaller elements
- O(n) time complexity with O(n) space

💡 KEY INSIGHTS:
- Consider each element as the smallest element in its rectangle
- Stack stores indices, not values
- Pop elements when current element is smaller
- Calculate area when element is popped
- Width calculation depends on previous and next smaller elements
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: arr = [6, 2, 5, 4, 1, 5, 6]
INPUT: Array of 7 elements representing histogram heights

🎯 GOAL: Find maximum rectangular area!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [6, 2, 5, 4, 1, 5, 6]
st = [] (stack of indices)
res = 0 (maximum area)
n = 7

📋 ITERATION PROCESS:

ITERATION 1: i = 0, arr[0] = 6
Stack: [] (empty)
No popping condition met
st.push(0) → st = [0]
Result: No area calculated yet

ITERATION 2: i = 1, arr[1] = 2
Stack: [0] (contains index 0)
arr[st.top] = arr[0] = 6
Condition: 6 >= 2 ✓ (pop)
peakIdx = st.pop() = 0
st = [] (empty)
count = st.length === 0 ? i : (i - st[st.length-1] - 1) = 1
curr = arr[0] × count = 6 × 1 = 6
res = Math.max(0, 6) = 6
st.push(1) → st = [1]
Result: Area calculated for element 6 = 6

ITERATION 3: i = 2, arr[2] = 5
Stack: [1] (contains index 1)
arr[st.top] = arr[1] = 2
Condition: 2 >= 5 ✗ (don't pop)
st.push(2) → st = [1, 2]
Result: No area calculated yet

ITERATION 4: i = 3, arr[3] = 4
Stack: [1, 2] (contains indices 1, 2)
arr[st.top] = arr[2] = 5
Condition: 5 >= 4 ✓ (pop)
peakIdx = st.pop() = 2
st = [1] (contains index 1)
count = i - st[st.length-1] - 1 = 3 - 1 - 1 = 1
curr = arr[2] × count = 5 × 1 = 5
res = Math.max(6, 5) = 6
st.push(3) → st = [1, 3]
Result: Area calculated for element 5 = 5

ITERATION 5: i = 4, arr[4] = 1
Stack: [1, 3] (contains indices 1, 3)
arr[st.top] = arr[3] = 4
Condition: 4 >= 1 ✓ (pop)
peakIdx = st.pop() = 3
st = [1] (contains index 1)
count = i - st[st.length-1] - 1 = 4 - 1 - 1 = 2
curr = arr[3] × count = 4 × 2 = 8
res = Math.max(6, 8) = 8
arr[st.top] = arr[1] = 2
Condition: 2 >= 1 ✓ (pop)
peakIdx = st.pop() = 1
st = [] (empty)
count = st.length === 0 ? i : (i - st[st.length-1] - 1) = 4
curr = arr[1] × count = 2 × 4 = 8
res = Math.max(8, 8) = 8
st.push(4) → st = [4]
Result: Area calculated for elements 4 and 2 = 8

ITERATION 6: i = 5, arr[5] = 5
Stack: [4] (contains index 4)
arr[st.top] = arr[4] = 1
Condition: 1 >= 5 ✗ (don't pop)
st.push(5) → st = [4, 5]
Result: No area calculated yet

ITERATION 7: i = 6, arr[6] = 6
Stack: [4, 5] (contains indices 4, 5)
arr[st.top] = arr[5] = 5
Condition: 5 >= 6 ✗ (don't pop)
st.push(6) → st = [4, 5, 6]
Result: No area calculated yet

📋 FINAL PROCESSING:
Stack: [4, 5, 6] (contains indices 4, 5, 6)
n = 7

Process remaining elements:
1. peakIdx = st.pop() = 6, st = [4, 5]
   count = n - st[st.length-1] - 1 = 7 - 5 - 1 = 1
   curr = arr[6] × count = 6 × 1 = 6
   res = Math.max(8, 6) = 8

2. peakIdx = st.pop() = 5, st = [4]
   count = n - st[st.length-1] - 1 = 7 - 4 - 1 = 2
   curr = arr[5] × count = 5 × 2 = 10
   res = Math.max(8, 10) = 10

3. peakIdx = st.pop() = 4, st = []
   count = st.length === 0 ? n : (n - st[st.length-1] - 1) = 7
   curr = arr[4] × count = 1 × 7 = 7
   res = Math.max(10, 7) = 10

🏆 FINAL RESULT: 10

─────────────────────────────────────────

📊 SECOND EXAMPLE: arr = [2, 8, 6, 9, 10, 5, 1]

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [2, 8, 6, 9, 10, 5, 1]
st = []
res = 0

ITERATIONS (left to right):
1. i=0, arr[0]=2: st=[] → push → st=[0]
2. i=1, arr[1]=8: st=[0] → 2>=8 ✗ → push → st=[0,1]
3. i=2, arr[2]=6: st=[0,1] → 8>=6 ✓ → pop 1 → area=8×1=8 → st=[0] → push → st=[0,2]
4. i=3, arr[3]=9: st=[0,2] → 6>=9 ✗ → push → st=[0,2,3]
5. i=4, arr[4]=10: st=[0,2,3] → 9>=10 ✗ → push → st=[0,2,3,4]
6. i=5, arr[5]=5: st=[0,2,3,4] → 10>=5 ✓ → pop 4 → area=10×1=10 → st=[0,2,3] → 9>=5 ✓ → pop 3 → area=9×2=18 → st=[0,2] → 6>=5 ✓ → pop 2 → area=6×3=18 → st=[0] → 2>=5 ✗ → push → st=[0,5]
7. i=6, arr[6]=1: st=[0,5] → 5>=1 ✓ → pop 5 → area=5×1=5 → st=[0] → 2>=1 ✓ → pop 0 → area=2×6=12 → st=[] → push → st=[6]

FINAL PROCESSING:
peakIdx=6: area=1×1=1
res = max(18, 1) = 18

🏆 FINAL RESULT: 18
─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

ITERATION 1: st = [0] (pushed 0)
ITERATION 2: st = [1] (popped 0, pushed 1)
ITERATION 3: st = [1, 2] (pushed 2)
ITERATION 4: st = [1, 3] (popped 2, pushed 3)
ITERATION 5: st = [4] (popped 3, popped 1, pushed 4)
ITERATION 6: st = [4, 5] (pushed 5)
ITERATION 7: st = [4, 5, 6] (pushed 6)

FINAL PROCESSING:
st = [4, 5, 6] → process remaining elements

─────────────────────────────────────────

📊 AREA CALCULATION LOGIC:

CASE 1: Stack is empty after popping
- Width = current index (i)
- Area = height[peak] × i

CASE 2: Stack is not empty after popping
- Width = i - stack.top - 1
- Area = height[peak] × (i - stack.top - 1)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ EACH ELEMENT AS SMALLEST: Consider each element as the smallest in its rectangle
2️⃣ STACK MAINTAINS INCREASING ORDER: Efficient for finding previous smaller
3️⃣ EFFICIENT POPPING: Remove elements when current is smaller
4️⃣ AREA CALCULATION: Calculate area when element is popped
5️⃣ OPTIMAL TIME: Each element pushed/popped once

💡 KEY INSIGHT:
Consider each element as the smallest element in its rectangle,
then calculate the maximum area it can form!

🎯 TIME COMPLEXITY ANALYSIS:
- Each element pushed once: O(n)
- Each element popped once: O(n)
- Total operations: O(n)
- Optimal time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack stores at most n indices: O(n)
- Result variable: O(1)
- Total space: O(n)
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Single element array
- Increasing sequence
- Decreasing sequence
- All equal elements
- Mixed sequences

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find maximum rectangular area
- Correct calculation for all cases
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Process from left to right (i = 0 to n-1)
- Stack stores indices, not values
- Pop condition: arr[stack.top] >= arr[i]
- Area calculation: height[peak] × width
- Width calculation: i - stack.top - 1 or i
- Final processing for remaining elements

🎯 RECTANGULAR AREA INTERPRETATION:
- Each element forms a rectangle with height = element value
- Width = number of consecutive elements >= current element
- Area = height × width
- Maximum area = maximum of all possible rectangles

🎯 STACK PROPERTIES:
- Maintains increasing order of heights
- Efficient for finding previous smaller element
- Optimal for area calculation
- Handles all edge cases

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n²) - check all possible rectangles
- Stack: O(n) - efficient with stack
- Both: Correct results
- Stack: Much more efficient

🎯 REAL-WORLD APPLICATIONS:
- Histogram analysis
- Data visualization
- Algorithm optimization
- Data structure design
- Competitive programming

🎯 OPTIMIZATION TECHNIQUES:
- Stack-based approach
- Single pass algorithm
- Efficient area calculation
- Optimal space usage
- Monotonic stack technique

🎯 ALGORITHM PATTERN:
- Monotonic stack technique
- Maximum rectangular area
- Efficient range queries
- Stack-based optimization

🎯 BOUNDARY CONDITIONS:
- First element: width = current index
- Last element: width = remaining elements
- Empty stack: width = current index
- Non-empty stack: width = i - stack.top - 1

🎯 ERROR HANDLING:
- Empty array: handled gracefully
- Single element: area = element value
- Invalid input: robust handling
- Edge cases: comprehensive coverage
*/




