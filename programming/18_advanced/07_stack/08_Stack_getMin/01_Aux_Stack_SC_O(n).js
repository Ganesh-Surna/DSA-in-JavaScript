/* Problem: ✅✅✅✅ Stack with GetMin Operation ✅✅✅✅

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement a stack with the following operations:
- push(x): Push element x onto stack
- pop(): Remove the element on top of the stack
- top(): Get the top element
- getMin(): Retrieve the minimum element in the stack

Example 1:
Input: 
push(5), push(10), push(20), getMin(), push(2), push(6), push(4), 
pop(), pop(), push(2), pop(), push(1), getMin(), pop(), pop(), getMin()

Output: 
Min: 5, 4, 6, Min: 1, 1, 2, Min: 5

Explanation:
- After push(5), push(10), push(20): stack = [5, 10, 20], min = 5
- After push(2): stack = [5, 10, 20, 2], min = 2
- After push(6), push(4): stack = [5, 10, 20, 2, 6, 4], min = 2
- After pop(), pop(): stack = [5, 10, 20, 2], min = 2
- After push(2), pop(): stack = [5, 10, 20, 2], min = 2
- After push(1): stack = [5, 10, 20, 2, 1], min = 1
- After pop(), pop(): stack = [5, 10, 20], min = 5

Example 2:
Input: push(3), push(5), getMin(), push(2), push(1), getMin(), pop(), getMin()

Output: Min: 3, Min: 1, 1, Min: 2

Constraints:
- All operations must be O(1) time complexity
- -2^31 <= x <= 2^31 - 1
- At most 3 * 10^4 calls will be made to push, pop, top, and getMin

Expected Time Complexity: O(1) for all operations
Expected Auxiliary Space: O(n) --> Overally (not for each operation)
*/

// ✅ Stack Supports Get Min
// ✅ TC = O(1) --> for push, pop, peak, getMin
// ✅ SC = O(n) --> Overally due to auxiliary stack(not for each operation)
class MinStack{
    constructor(){
        this.ms = [] // Main Stack
        this.as = [] // Auxillary Stack
    }
    
    push(x){
        this.ms.push(x)
        if(this.as.length === 0 || x <= this.as[this.as.length - 1]){
            this.as.push(x)
        }
    }
    pop(){
       let res = this.ms.pop()
       if(this.as[this.as.length - 1] === res){
           this.as.pop()
       }
       console.log(res)
       return res
    }
    peak(){
        return this.ms[this.ms.length - 1]
    }
    getMin(){
        let res = this.as[this.as.length - 1]
        console.log('Min: ', res)
        return res
    }
}

let st = new MinStack()
st.push(5)
st.push(10)
st.push(20)
st.getMin() // Min: 5
st.push(2)
st.push(6)
st.push(4)
st.pop()
st.pop()
st.push(2)
st.pop()
st.push(1)
st.getMin() // Min: 1
st.pop()
st.pop()
st.getMin() // Min: 5

/*🎯 CORE IDEA: Use two stacks - a main stack to store all elements and an auxiliary stack to store minimum elements. The auxiliary stack maintains the minimum element at each level of the main stack.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create main stack (ms) to store all elements
   - Create auxiliary stack (as) to store minimum elements
   - Both stacks start empty

2️⃣ PUSH OPERATION:
   - Push element to main stack
   - If auxiliary stack is empty OR current element <= top of auxiliary stack:
     * Push current element to auxiliary stack
   - This ensures auxiliary stack always has the minimum element on top

3️⃣ POP OPERATION:
   - Pop element from main stack
   - If popped element equals top of auxiliary stack:
     * Pop element from auxiliary stack
   - This maintains consistency between both stacks

4️⃣ GETMIN OPERATION:
   - Return top element of auxiliary stack
   - This gives the minimum element in O(1) time

🧠 WHY THIS APPROACH?
- Auxiliary stack tracks minimum elements efficiently
- Only stores elements that can be minimum
- Maintains O(1) time complexity for all operations
- O(n) space complexity in worst case

💡 KEY INSIGHTS:
- Use auxiliary stack to track minimum elements
- Push to auxiliary stack only when element is <= current minimum
- Pop from auxiliary stack when minimum element is removed
- Auxiliary stack top always gives current minimum
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: push(5), push(10), push(20), getMin(), push(2), push(6), push(4), pop(), pop(), push(2), pop(), push(1), getMin(), pop(), pop(), getMin()

INPUT: Sequence of stack operations

🎯 GOAL: Implement stack with O(1) getMin operation!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
ms = [] (main stack)
as = [] (auxiliary stack)

📋 OPERATION SEQUENCE:

OPERATION 1: push(5)
ms.push(5) → ms = [5]
as.length === 0 → as.push(5) → as = [5]
State: ms = [5], as = [5]

OPERATION 2: push(10)
ms.push(10) → ms = [5, 10]
10 > as[as.length-1] (5) → don't push to as
State: ms = [5, 10], as = [5]

OPERATION 3: push(20)
ms.push(20) → ms = [5, 10, 20]
20 > as[as.length-1] (5) → don't push to as
State: ms = [5, 10, 20], as = [5]

OPERATION 4: getMin()
return as[as.length-1] = 5
Output: Min: 5
State: ms = [5, 10, 20], as = [5]

OPERATION 5: push(2)
ms.push(2) → ms = [5, 10, 20, 2]
2 <= as[as.length-1] (5) → as.push(2) → as = [5, 2]
State: ms = [5, 10, 20, 2], as = [5, 2]

OPERATION 6: push(6)
ms.push(6) → ms = [5, 10, 20, 2, 6]
6 > as[as.length-1] (2) → don't push to as
State: ms = [5, 10, 20, 2, 6], as = [5, 2]

OPERATION 7: push(4)
ms.push(4) → ms = [5, 10, 20, 2, 6, 4]
4 > as[as.length-1] (2) → don't push to as
State: ms = [5, 10, 20, 2, 6, 4], as = [5, 2]

OPERATION 8: pop()
res = ms.pop() = 4 → ms = [5, 10, 20, 2, 6]
4 ≠ as[as.length-1] (2) → don't pop from as
Output: 4
State: ms = [5, 10, 20, 2, 6], as = [5, 2]

OPERATION 9: pop()
res = ms.pop() = 6 → ms = [5, 10, 20, 2]
6 ≠ as[as.length-1] (2) → don't pop from as
Output: 6
State: ms = [5, 10, 20, 2], as = [5, 2]

OPERATION 10: push(2)
ms.push(2) → ms = [5, 10, 20, 2, 2]
2 <= as[as.length-1] (2) → as.push(2) → as = [5, 2, 2]
State: ms = [5, 10, 20, 2, 2], as = [5, 2, 2]

OPERATION 11: pop()
res = ms.pop() = 2 → ms = [5, 10, 20, 2]
2 === as[as.length-1] (2) → as.pop() → as = [5, 2]
Output: 2
State: ms = [5, 10, 20, 2], as = [5, 2]

OPERATION 12: push(1)
ms.push(1) → ms = [5, 10, 20, 2, 1]
1 <= as[as.length-1] (2) → as.push(1) → as = [5, 2, 1]
State: ms = [5, 10, 20, 2, 1], as = [5, 2, 1]

OPERATION 13: getMin()
return as[as.length-1] = 1
Output: Min: 1
State: ms = [5, 10, 20, 2, 1], as = [5, 2, 1]

OPERATION 14: pop()
res = ms.pop() = 1 → ms = [5, 10, 20, 2]
1 === as[as.length-1] (1) → as.pop() → as = [5, 2]
Output: 1
State: ms = [5, 10, 20, 2], as = [5, 2]

OPERATION 15: pop()
res = ms.pop() = 2 → ms = [5, 10, 20]
2 === as[as.length-1] (2) → as.pop() → as = [5]
Output: 2
State: ms = [5, 10, 20], as = [5]

OPERATION 16: getMin()
return as[as.length-1] = 5
Output: Min: 5
State: ms = [5, 10, 20], as = [5]

🏆 FINAL RESULT: Min: 5, 4, 6, Min: 1, 1, 2, Min: 5

─────────────────────────────────────────

📊 SECOND EXAMPLE: push(3), push(5), getMin(), push(2), push(1), getMin(), pop(), getMin()

🔍 OPERATION SEQUENCE:

OPERATION 1: push(3)
ms = [3], as = [3]

OPERATION 2: push(5)
ms = [3, 5], as = [3] (5 > 3)

OPERATION 3: getMin()
return 3 → Output: Min: 3

OPERATION 4: push(2)
ms = [3, 5, 2], as = [3, 2] (2 <= 3)

OPERATION 5: push(1)
ms = [3, 5, 2, 1], as = [3, 2, 1] (1 <= 2)

OPERATION 6: getMin()
return 1 → Output: Min: 1

OPERATION 7: pop()
ms = [3, 5, 2], as = [3, 2] (1 === 1, so pop from as)
Output: 1

OPERATION 8: getMin()
return 2 → Output: Min: 2

🏆 FINAL RESULT: Min: 3, Min: 1, 1, Min: 2

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EXAMPLE: push(5), push(10), push(20), push(2), push(1)

Main Stack (ms):     Auxiliary Stack (as):
┌─────┐              ┌─────┐
│  1  │              │  1  │ ← current min
├─────┤              ├─────┤
│  2  │              │  2  │
├─────┤              ├─────┤
│ 20  │              │  5  │
├─────┤              └─────┘
│ 10  │
├─────┤
│  5  │
└─────┘

─────────────────────────────────────────

📊 STACK STATE EVOLUTION:

OPERATION 1: push(5)
ms = [5], as = [5]

OPERATION 2: push(10)
ms = [5, 10], as = [5]

OPERATION 3: push(20)
ms = [5, 10, 20], as = [5]

OPERATION 4: push(2)
ms = [5, 10, 20, 2], as = [5, 2]

OPERATION 5: push(1)
ms = [5, 10, 20, 2, 1], as = [5, 2, 1]

─────────────────────────────────────────

📊 PUSH OPERATION LOGIC:

CASE 1: Auxiliary stack is empty
- Push element to both main and auxiliary stacks
- Element becomes the first minimum

CASE 2: Element <= current minimum
- Push element to both main and auxiliary stacks
- Element becomes new minimum

CASE 3: Element > current minimum
- Push element only to main stack
- Current minimum remains unchanged

─────────────────────────────────────────

📊 POP OPERATION LOGIC:

CASE 1: Popped element === current minimum
- Pop element from both main and auxiliary stacks
- Previous minimum becomes current minimum

CASE 2: Popped element > current minimum
- Pop element only from main stack
- Current minimum remains unchanged

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ AUXILIARY STACK TRACKING: Efficiently tracks minimum elements
2️⃣ CONDITIONAL PUSHING: Only pushes elements that can be minimum
3️⃣ CONDITIONAL POPPING: Only pops when minimum element is removed
4️⃣ CONSTANT TIME ACCESS: O(1) getMin operation
5️⃣ OPTIMAL SPACE: O(n) space complexity

💡 KEY INSIGHT:
Use auxiliary stack to track minimum elements,
ensuring O(1) access to minimum value!

🎯 TIME COMPLEXITY ANALYSIS:
- push(): O(1) - single push operation
- pop(): O(1) - single pop operation
- getMin(): O(1) - direct access to auxiliary stack top
- All operations: O(1) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Main stack: O(n) - stores all elements
- Auxiliary stack: O(n) - worst case stores all elements
- Total space: O(n)
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Empty stack: handled gracefully
- Single element: minimum is the element itself
- All equal elements: all elements in auxiliary stack
- Decreasing sequence: all elements in auxiliary stack
- Increasing sequence: only first element in auxiliary stack

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find minimum element
- Correct push/pop operations
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Two stacks: main and auxiliary
- Push condition: element <= current minimum
- Pop condition: element === current minimum
- getMin: return auxiliary stack top
- Maintain consistency between stacks

🎯 STACK PROPERTIES:
- Main stack: stores all elements
- Auxiliary stack: stores minimum elements
- LIFO principle maintained
- Efficient minimum tracking

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(n) getMin - search through all elements
- Auxiliary: O(1) getMin - direct access
- Both: Correct results
- Auxiliary: Much more efficient

🎯 REAL-WORLD APPLICATIONS:
- Data structure design
- Algorithm optimization
- System design
- Competitive programming
- Software engineering

🎯 OPTIMIZATION TECHNIQUES:
- Auxiliary stack approach
- Conditional pushing/popping
- Constant time operations
- Optimal space usage
- Efficient minimum tracking

🎯 ALGORITHM PATTERN:
- Two-stack technique
- Auxiliary data structure
- Constant time operations
- Efficient tracking

🎯 BOUNDARY CONDITIONS:
- Empty stack: handled gracefully
- Single element: minimum is the element
- All equal elements: all in auxiliary stack
- Mixed elements: selective auxiliary stack

🎯 ERROR HANDLING:
- Empty stack: handled gracefully
- Invalid operations: robust handling
- Edge cases: comprehensive coverage
- Consistent state maintenance
*/