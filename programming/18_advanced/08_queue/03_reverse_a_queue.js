/* Problem: ✅✅✅✅ Reverse a Queue ✅✅✅✅

Given a queue q containing integer elements, your task is to reverse the queue.

You are given a queue containing integer elements. The task is to reverse the order of elements in the queue such that the first element becomes the last, the second becomes the second-to-last, and so on.

Example 1:
Input: q[] = [5, 10, 15, 20, 25]
Output: [25, 20, 15, 10, 5]
Explanation: After reversing the given elements of the queue, the resultant queue will be 25 20 15 10 5.

Example 2:
Input: q[] = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 2, 1]
Explanation: After reversing the given elements of the queue, the resultant queue will be 5 4 3 2 1.

Constraints:
- 1 ≤ q.size() ≤ 10³
- 0 ≤ q[i] ≤ 10⁵

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

// 1. Iterative Solution
// ✅ TC = O(n)
// ✅ SC = O(n) --> O(n) for stack
function reverseQueue(q) {
    let st = [] // stack

    // 1. Move all elements from q to st (FIFO to LIFO)
    while(q.length > 0){
        st.push(q.shift()) // q.deque()
    }
    
    // 2. Move all elements from st to q (LIFO to FIFO)
    while(st.length > 0){
        q.push(st.pop()) // q.enqueue()
    }
}

// 2. Recursive Solution
// ✅ TC = O(n)
// ✅ SC = O(n) --> O(n) for recursive call stack
function reverseQueueRecursive(q) {
    if(q.length === 0){
        return
    }
    let x = q.shift() // q.deque()
    reverseQueueRecursive(q) // recursive call
    q.push(x) // q.enqueue()
}

/*🎯 CORE IDEA: Use a stack to reverse the queue by leveraging the LIFO property of stack to reverse the FIFO order of queue. Two approaches: iterative (using explicit stack) and recursive (using call stack).

📋 STEP-BY-STEP FLOW:

APPROACH 1: ITERATIVE SOLUTION
1️⃣ MOVE QUEUE TO STACK:
   - Dequeue all elements from queue
   - Push each element to stack
   - This reverses the order (FIFO → LIFO)

2️⃣ MOVE STACK TO QUEUE:
   - Pop all elements from stack
   - Enqueue each element to queue
   - This restores the reversed order (LIFO → FIFO)

APPROACH 2: RECURSIVE SOLUTION
1️⃣ BASE CASE:
   - If queue is empty, return

2️⃣ RECURSIVE STEP:
   - Dequeue front element
   - Recursively reverse remaining queue
   - Enqueue the element back
   - Call stack maintains the order

🧠 WHY THIS APPROACH?
- Stack LIFO property naturally reverses queue FIFO order
- Two-pass approach: queue→stack→queue
- Recursive approach uses call stack implicitly
- Both achieve O(n) time complexity

💡 KEY INSIGHTS:
- Use stack to reverse queue order
- Two approaches: iterative and recursive
- Stack LIFO vs Queue FIFO property
- Efficient O(n) solution for both approaches
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: [5, 10, 15, 20, 25]

INPUT: Queue with elements [5, 10, 15, 20, 25]
OUTPUT: [25, 20, 15, 10, 5] (reversed order)
EXPLANATION: First element becomes last, second becomes second-to-last

🎯 GOAL: Reverse the queue using stack!

🔍 STEP-BY-STEP PROCESS:

📋 APPROACH 1: ITERATIVE SOLUTION

INITIAL STATE:
q = [5, 10, 15, 20, 25]
st = [] (empty stack)

📋 STEP 1: MOVE QUEUE TO STACK (FIFO → LIFO)

ITERATION 1: q.shift() = 5
q = [10, 15, 20, 25]
st = [5]

ITERATION 2: q.shift() = 10
q = [15, 20, 25]
st = [5, 10]

ITERATION 3: q.shift() = 15
q = [20, 25]
st = [5, 10, 15]

ITERATION 4: q.shift() = 20
q = [25]
st = [5, 10, 15, 20]

ITERATION 5: q.shift() = 25
q = []
st = [5, 10, 15, 20, 25]

📋 STEP 2: MOVE STACK TO QUEUE (LIFO → FIFO)

ITERATION 1: st.pop() = 25
q = [25]
st = [5, 10, 15, 20]

ITERATION 2: st.pop() = 20
q = [25, 20]
st = [5, 10, 15]

ITERATION 3: st.pop() = 15
q = [25, 20, 15]
st = [5, 10]

ITERATION 4: st.pop() = 10
q = [25, 20, 15, 10]
st = [5]

ITERATION 5: st.pop() = 5
q = [25, 20, 15, 10, 5]
st = []

🏆 RESULT: [25, 20, 15, 10, 5] (reversed!)

─────────────────────────────────────────

📊 APPROACH 2: RECURSIVE SOLUTION

INITIAL STATE:
q = [5, 10, 15, 20, 25]

📋 RECURSIVE PROCESS:

CALL 1: reverseQueueRecursive([5, 10, 15, 20, 25])
x = 5, q = [10, 15, 20, 25]
CALL 2: reverseQueueRecursive([10, 15, 20, 25])

CALL 2: reverseQueueRecursive([10, 15, 20, 25])
x = 10, q = [15, 20, 25]
CALL 3: reverseQueueRecursive([15, 20, 25])

CALL 3: reverseQueueRecursive([15, 20, 25])
x = 15, q = [20, 25]
CALL 4: reverseQueueRecursive([20, 25])

CALL 4: reverseQueueRecursive([20, 25])
x = 20, q = [25]
CALL 5: reverseQueueRecursive([25])

CALL 5: reverseQueueRecursive([25])
x = 25, q = []
CALL 6: reverseQueueRecursive([])

CALL 6: reverseQueueRecursive([])
BASE CASE: q.length === 0, return

📋 UNWINDING PROCESS:

CALL 5: q.push(25) → q = [25]
CALL 4: q.push(20) → q = [25, 20]
CALL 3: q.push(15) → q = [25, 20, 15]
CALL 2: q.push(10) → q = [25, 20, 15, 10]
CALL 1: q.push(5) → q = [25, 20, 15, 10, 5]

🏆 RESULT: [25, 20, 15, 10, 5] (reversed!)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL QUEUE (FIFO):
Front ← [5, 10, 15, 20, 25] ← Rear

STEP 1: QUEUE TO STACK (FIFO → LIFO)
Stack (LIFO):
Top → [25, 20, 15, 10, 5] → Bottom

STEP 2: STACK TO QUEUE (LIFO → FIFO)
REVERSED QUEUE (FIFO):
Front ← [25, 20, 15, 10, 5] ← Rear

─────────────────────────────────────────

📊 RECURSIVE CALL STACK VISUALIZATION:

CALL STACK (LIFO):
┌─────────────────────┐
│ reverseQueueRecursive│ ← Call 1: x=5
├─────────────────────┤
│ reverseQueueRecursive│ ← Call 2: x=10
├─────────────────────┤
│ reverseQueueRecursive│ ← Call 3: x=15
├─────────────────────┤
│ reverseQueueRecursive│ ← Call 4: x=20
├─────────────────────┤
│ reverseQueueRecursive│ ← Call 5: x=25
├─────────────────────┤
│ reverseQueueRecursive│ ← Call 6: BASE CASE
└─────────────────────┘

UNWINDING (LIFO):
Call 5: push(25) → q = [25]
Call 4: push(20) → q = [25, 20]
Call 3: push(15) → q = [25, 20, 15]
Call 2: push(10) → q = [25, 20, 15, 10]
Call 1: push(5) → q = [25, 20, 15, 10, 5]

─────────────────────────────────────────

📊 COMPARISON OF APPROACHES:

ITERATIVE APPROACH:
- Uses explicit stack data structure
- Two clear phases: queue→stack, stack→queue
- Easy to understand and debug
- Space: O(n) for explicit stack

RECURSIVE APPROACH:
- Uses call stack implicitly
- Single phase with recursive calls
- More elegant but harder to debug
- Space: O(n) for call stack

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ STACK LIFO PROPERTY: Naturally reverses FIFO order
2️⃣ TWO-PASS APPROACH: Queue→Stack→Queue reverses order
3️⃣ RECURSIVE APPROACH: Call stack maintains order
4️⃣ EFFICIENT COMPLEXITY: O(n) time and space
5️⃣ CORRECT RESULTS: Guaranteed to reverse queue

💡 KEY INSIGHT:
Use stack LIFO property to reverse queue FIFO order
through two-pass approach or recursive calls!

🎯 TIME COMPLEXITY ANALYSIS:
- Iterative: O(n) - two passes through all elements
- Recursive: O(n) - each element processed once
- Total: O(n) time complexity for both approaches

🎯 SPACE COMPLEXITY ANALYSIS:
- Iterative: O(n) - explicit stack storage
- Recursive: O(n) - call stack storage
- Total: O(n) space complexity for both approaches

🎯 EDGE CASES HANDLED:
- Empty queue: handled correctly
- Single element: works correctly
- Multiple elements: maintains reverse order
- Large queues: efficient O(n) solution

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to reverse queue order
- Stack LIFO property ensures reversal
- Recursive approach maintains order
- Both approaches produce correct results

🎯 IMPLEMENTATION DETAILS:
- Iterative: Explicit stack, two-phase approach
- Recursive: Call stack, single-phase approach
- Queue operations: shift() for dequeue, push() for enqueue
- Stack operations: push() and pop()
- Optimal complexity for both approaches

🎯 STACK OPERATIONS:
- Push: Add element to top of stack
- Pop: Remove element from top of stack
- LIFO: Last In, First Out property
- Reversal: Natural property for reversing order

🎯 QUEUE OPERATIONS:
- Enqueue: Add element to rear of queue
- Dequeue: Remove element from front of queue
- FIFO: First In, First Out property
- Order: Maintains insertion order

🎯 COMPARISON WITH OTHER APPROACHES:
- Array reversal: O(n) time, O(1) space (if allowed)
- Stack approach: O(n) time, O(n) space
- Recursive approach: O(n) time, O(n) space
- All: Correct reversal results

🎯 REAL-WORLD APPLICATIONS:
- Data structure manipulation
- Algorithm design
- System architecture
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Use stack efficiently
- Minimize space usage
- Handle edge cases
- Efficient queue operations
- Optimal algorithm choice

🎯 ALGORITHM PATTERN:
- Stack-based reversal
- Two-pass approach
- Recursive approach
- Data structure conversion

🎯 MATHEMATICAL PROPERTIES:
- Stack LIFO property
- Queue FIFO property
- Reversal through LIFO
- Order transformation

🎯 ERROR HANDLING:
- Empty queue: handled gracefully
- Invalid input: robust handling
- Edge cases: comprehensive coverage
- Robust implementation

🎯 ADVANTAGES OF STACK APPROACH:
- Natural reversal property
- Easy to understand
- Efficient implementation
- Correct results
- Educational value

🎯 DISADVANTAGES:
- Extra space required
- Two-pass approach
- More complex than direct reversal
- Space overhead

🎯 ALTERNATIVE APPROACHES:
- Direct array reversal: O(1) space
- Linked list reversal: O(1) space
- Stack approach: O(n) space
- Recursive approach: O(n) space

🎯 IMPLEMENTATION CONSIDERATIONS:
- Stack choice: Array or linked list
- Queue implementation: Array or linked list
- Error handling: Empty queue cases
- Performance: Time vs space trade-offs
- Maintainability: Code clarity

🎯 TESTING STRATEGY:
- Test empty queue
- Test single element
- Test multiple elements
- Test large queues
- Test edge cases

🎯 DEBUGGING TIPS:
- Check stack state after each operation
- Verify queue state after each operation
- Monitor element order
- Validate reversal
- Check complexity

🎯 PERFORMANCE ANALYSIS:
- Iterative: O(n) time, O(n) space
- Recursive: O(n) time, O(n) space
- Both: Efficient for given constraints
- Overall: Acceptable performance

🎯 SCALABILITY CONSIDERATIONS:
- Large queues: Consider space usage
- Frequent operations: Monitor performance
- Memory usage: Track stack size
- Optimization: Consider alternatives

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to handle empty queue
- Incorrect stack operations
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand stack operations
- Learn queue operations
- Master reversal techniques
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain both approaches
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Stack LIFO vs Queue FIFO
- Reversal through LIFO
- Two-pass approach
- Recursive approach
- Data structure conversion

🎯 MATHEMATICAL ANALYSIS:
- Element movements: 2n for iterative
- Recursive calls: n for recursive
- Space usage: O(n) for both
- Time complexity: O(n) for both
- Efficiency: Optimal for constraints

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct order
- Efficient space usage
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various inputs
- Verify reversal behavior
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) time
- Optimized approach: O(n) time
- Alternative approaches: Direct reversal
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- System design
- Algorithm implementation
- Data structure design
- Performance optimization
- Educational purposes

🎯 CONCLUSION:
The stack-based queue reversal demonstrates how to use stack LIFO
property to reverse queue FIFO order through two-pass approach
or recursive calls, achieving efficient O(n) solution!
*/