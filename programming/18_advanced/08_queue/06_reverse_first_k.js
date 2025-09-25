/* Problem: ✅✅✅✅ Reverse First K Elements of Queue ✅✅✅✅

Given a queue and an integer k, reverse the first k elements of the queue, leaving the other elements in their original relative order.

You are given a queue containing integer elements and an integer k. The task is to reverse the order of the first k elements in the queue while keeping the remaining elements in their original positions.

Example 1:
Input: queue = [1, 2, 3, 4, 5], k = 3
Output: [3, 2, 1, 4, 5]
Explanation: First 3 elements [1, 2, 3] are reversed to [3, 2, 1], remaining elements [4, 5] stay in original order.

Example 2:
Input: queue = [4, 3, 2, 1], k = 4
Output: [1, 2, 3, 4]
Explanation: All 4 elements are reversed, so [4, 3, 2, 1] becomes [1, 2, 3, 4].

Example 3:
Input: queue = [10, 20, 30, 40, 50, 60], k = 2
Output: [20, 10, 30, 40, 50, 60]
Explanation: First 2 elements [10, 20] are reversed to [20, 10], remaining elements stay in original order.

Constraints:
- 1 ≤ k ≤ queue.length ≤ 1000
- 1 ≤ queue[i] ≤ 1000

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(k)
*/

function reverseKElements(queue, k) {
    let n = queue.length; // size of queue

    if (k > n) return queue; // if k > size, return original queue
  
    let stack = []; // stack to store first k elements
  
    // Step 1: Dequeue first k elements into stack
    for (let i = 0; i < k; i++) {
      stack.push(queue.shift()); // dequeue
    }
  
    // Step 2: Pop from stack and enqueue back
    while (stack.length) {
      queue.push(stack.pop()); // enqueue
    }
  
    // Step 3: Rotate the remaining n-k elements
    for (let i = 0; i < n - k; i++) {
      queue.push(queue.shift()); // dequeue & enqueue same element
    }
  
    return queue;
  }
  
  // Example
  console.log(reverseKElements([1,2,3,4,5], 3)); // [3,2,1,4,5]
  console.log(reverseKElements([4,3,2,1], 4));   // [1,2,3,4]

/*🎯 CORE IDEA: Use a stack to reverse the first k elements of the queue. Dequeue first k elements into stack (reverses order), then pop from stack back to queue (maintains reversed order), and finally rotate remaining elements to their correct positions.

📋 STEP-BY-STEP FLOW:

1️⃣ DEQUEUE FIRST K ELEMENTS TO STACK:
   - Dequeue first k elements from queue
   - Push each element to stack
   - This reverses the order (FIFO → LIFO)

2️⃣ POP FROM STACK BACK TO QUEUE:
   - Pop all elements from stack
   - Enqueue each element back to queue
   - This maintains the reversed order (LIFO → FIFO)

3️⃣ ROTATE REMAINING ELEMENTS:
   - Dequeue and enqueue remaining n-k elements
   - This moves them to their correct positions

🧠 WHY THIS APPROACH?
- Stack LIFO property naturally reverses first k elements
- Three-step approach: dequeue→stack→enqueue→rotate
- Maintains relative order of remaining elements
- Efficient O(n) time and O(k) space complexity

💡 KEY INSIGHTS:
- Use stack to reverse first k elements
- Three phases: dequeue to stack, pop to queue, rotate remaining
- Stack LIFO vs Queue FIFO property
- Efficient O(n) solution with O(k) space
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: queue = [1, 2, 3, 4, 5], k = 3

INPUT: Queue with elements [1, 2, 3, 4, 5] and k = 3
OUTPUT: [3, 2, 1, 4, 5]
EXPLANATION: First 3 elements [1, 2, 3] are reversed to [3, 2, 1], remaining elements [4, 5] stay in original order

🎯 GOAL: Reverse first k elements using stack!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
queue = [1, 2, 3, 4, 5]
k = 3
n = 5
stack = [] (empty stack)

📋 STEP 1: DEQUEUE FIRST K ELEMENTS TO STACK

ITERATION 1: i = 0
queue.shift() = 1 → queue = [2, 3, 4, 5]
stack.push(1) → stack = [1]

ITERATION 2: i = 1
queue.shift() = 2 → queue = [3, 4, 5]
stack.push(2) → stack = [1, 2]

ITERATION 3: i = 2
queue.shift() = 3 → queue = [4, 5]
stack.push(3) → stack = [1, 2, 3]

FINAL STATE: queue = [4, 5], stack = [1, 2, 3]

📋 STEP 2: POP FROM STACK BACK TO QUEUE

ITERATION 1: stack.length > 0
stack.pop() = 3 → stack = [1, 2]
queue.push(3) → queue = [4, 5, 3]

ITERATION 2: stack.length > 0
stack.pop() = 2 → stack = [1]
queue.push(2) → queue = [4, 5, 3, 2]

ITERATION 3: stack.length > 0
stack.pop() = 1 → stack = []
queue.push(1) → queue = [4, 5, 3, 2, 1]

FINAL STATE: queue = [4, 5, 3, 2, 1], stack = []

📋 STEP 3: ROTATE REMAINING ELEMENTS

ITERATION 1: i = 0, i < n-k = 2
queue.shift() = 4 → queue = [5, 3, 2, 1]
queue.push(4) → queue = [5, 3, 2, 1, 4]

ITERATION 2: i = 1, i < n-k = 2
queue.shift() = 5 → queue = [3, 2, 1, 4]
queue.push(5) → queue = [3, 2, 1, 4, 5]

FINAL STATE: queue = [3, 2, 1, 4, 5]

🏆 RESULT: [3, 2, 1, 4, 5]

─────────────────────────────────────────

📊 EXAMPLE: queue = [4, 3, 2, 1], k = 4

INPUT: Queue with elements [4, 3, 2, 1] and k = 4
OUTPUT: [1, 2, 3, 4]
EXPLANATION: All 4 elements are reversed, so [4, 3, 2, 1] becomes [1, 2, 3, 4]

🔍 Process:

STEP 1: DEQUEUE FIRST K ELEMENTS TO STACK
queue = [4, 3, 2, 1] → stack = [4, 3, 2, 1]
queue = []

STEP 2: POP FROM STACK BACK TO QUEUE
stack = [4, 3, 2, 1] → queue = [1, 2, 3, 4]
stack = []

STEP 3: ROTATE REMAINING ELEMENTS
No remaining elements (n-k = 0)

🏆 RESULT: [1, 2, 3, 4]

─────────────────────────────────────────

📊 EXAMPLE: queue = [10, 20, 30, 40, 50, 60], k = 2

INPUT: Queue with elements [10, 20, 30, 40, 50, 60] and k = 2
OUTPUT: [20, 10, 30, 40, 50, 60]
EXPLANATION: First 2 elements [10, 20] are reversed to [20, 10], remaining elements stay in original order

🔍 Process:

STEP 1: DEQUEUE FIRST K ELEMENTS TO STACK
queue = [10, 20, 30, 40, 50, 60] → stack = [10, 20]
queue = [30, 40, 50, 60]

STEP 2: POP FROM STACK BACK TO QUEUE
stack = [10, 20] → queue = [30, 40, 50, 60, 20, 10]
stack = []

STEP 3: ROTATE REMAINING ELEMENTS
queue = [30, 40, 50, 60, 20, 10] → queue = [20, 10, 30, 40, 50, 60]

🏆 RESULT: [20, 10, 30, 40, 50, 60]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

ORIGINAL QUEUE: [1, 2, 3, 4, 5]
k = 3 (reverse first 3 elements)

STEP 1: DEQUEUE TO STACK
Queue: [1, 2, 3, 4, 5] → Stack: [1, 2, 3]
Queue: [4, 5]

STEP 2: POP TO QUEUE
Stack: [1, 2, 3] → Queue: [4, 5, 3, 2, 1]
Stack: []

STEP 3: ROTATE REMAINING
Queue: [4, 5, 3, 2, 1] → Queue: [3, 2, 1, 4, 5]

─────────────────────────────────────────

📊 STACK OPERATIONS VISUALIZATION:

STEP 1: DEQUEUE TO STACK (FIFO → LIFO)
Original: [1, 2, 3, 4, 5]
After dequeue 1: queue = [2, 3, 4, 5], stack = [1]
After dequeue 2: queue = [3, 4, 5], stack = [1, 2]
After dequeue 3: queue = [4, 5], stack = [1, 2, 3]

STEP 2: POP TO QUEUE (LIFO → FIFO)
Stack: [1, 2, 3] → Queue: [4, 5, 3, 2, 1]
Pop 3: stack = [1, 2], queue = [4, 5, 3]
Pop 2: stack = [1], queue = [4, 5, 3, 2]
Pop 1: stack = [], queue = [4, 5, 3, 2, 1]

─────────────────────────────────────────

📊 ROTATION PROCESS VISUALIZATION:

BEFORE ROTATION: [4, 5, 3, 2, 1]
GOAL: Move [4, 5] to end, keep [3, 2, 1] at front

ITERATION 1: Move 4 to end
[4, 5, 3, 2, 1] → [5, 3, 2, 1, 4]

ITERATION 2: Move 5 to end
[5, 3, 2, 1, 4] → [3, 2, 1, 4, 5]

FINAL: [3, 2, 1, 4, 5]

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ STACK LIFO PROPERTY: Naturally reverses first k elements
2️⃣ THREE-STEP APPROACH: Dequeue→Stack→Enqueue→Rotate
3️⃣ ROTATION TECHNIQUE: Moves remaining elements to correct positions
4️⃣ EFFICIENT COMPLEXITY: O(n) time and O(k) space
5️⃣ CORRECT RESULTS: Guaranteed to reverse first k elements

💡 KEY INSIGHT:
Use stack LIFO property to reverse first k elements,
then rotate remaining elements to correct positions!

🎯 TIME COMPLEXITY ANALYSIS:
- Step 1: O(k) - dequeue k elements to stack
- Step 2: O(k) - pop k elements from stack
- Step 3: O(n-k) - rotate remaining elements
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack storage: O(k) for first k elements
- No extra space for rotation
- Total: O(k) space complexity

🎯 EDGE CASES HANDLED:
- k > n: Return original queue
- k = 1: Single element (no change)
- k = n: Reverse entire queue
- Empty queue: Handled gracefully

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to reverse first k elements
- Stack LIFO property ensures reversal
- Rotation maintains relative order of remaining elements
- All elements preserved in final result

🎯 IMPLEMENTATION DETAILS:
- Three-step approach: dequeue to stack, pop to queue, rotate
- Stack operations: push() and pop()
- Queue operations: shift() for dequeue, push() for enqueue
- Optimal complexity: O(n) time and O(k) space

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

🎯 ROTATION TECHNIQUE:
- Dequeue element from front
- Enqueue same element to rear
- Moves element to correct position
- Preserves relative order

🎯 COMPARISON WITH OTHER APPROACHES:
- Array reversal: O(k) time, O(1) space (if allowed)
- Stack approach: O(n) time, O(k) space
- Recursive approach: O(n) time, O(k) space
- All: Correct reversal results

🎯 REAL-WORLD APPLICATIONS:
- Data structure manipulation
- Algorithm design
- Queue processing
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
- Three-step approach
- Rotation technique
- Data structure conversion

🎯 MATHEMATICAL PROPERTIES:
- Stack LIFO property
- Queue FIFO property
- Reversal through LIFO
- Rotation preserves order

🎯 ERROR HANDLING:
- k > n: Return original queue
- Empty queue: Handled gracefully
- Invalid input: Robust handling
- Edge cases: Comprehensive coverage

🎯 ADVANTAGES OF STACK APPROACH:
- Natural reversal property
- Easy to understand
- Efficient implementation
- Correct results
- Educational value

🎯 DISADVANTAGES:
- Extra space required
- Three-step approach
- More complex than direct reversal
- Space overhead

🎯 ALTERNATIVE APPROACHES:
- Direct array reversal: O(k) time, O(1) space
- Linked list reversal: O(k) time, O(1) space
- Stack approach: O(n) time, O(k) space
- Recursive approach: O(n) time, O(k) space

🎯 IMPLEMENTATION CONSIDERATIONS:
- Stack choice: Array or linked list
- Queue implementation: Array or linked list
- Error handling: Edge cases
- Performance: Time vs space trade-offs
- Maintainability: Code clarity

🎯 TESTING STRATEGY:
- Test k = 1 (single element)
- Test k = n (entire queue)
- Test k < n (partial reversal)
- Test edge cases: k > n, empty queue
- Test various queue sizes

🎯 DEBUGGING TIPS:
- Check stack state after each operation
- Verify queue state after each step
- Monitor element order
- Validate reversal
- Check complexity

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - linear processing
- Space: O(k) - stack storage
- Overall: Efficient for given constraints
- Scalable: Works for large queues

🎯 SCALABILITY CONSIDERATIONS:
- Large queues: Consider space usage
- Large k values: Monitor stack size
- Memory usage: Track stack size
- Optimization: Consider alternatives

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to handle k > n case
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
- Explain the approach clearly
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Stack LIFO vs Queue FIFO
- Reversal through LIFO
- Three-step approach
- Rotation technique
- Data structure conversion

🎯 MATHEMATICAL ANALYSIS:
- Element movements: k to stack, k from stack, n-k rotations
- Stack operations: O(1) each
- Queue operations: O(1) each
- Total: O(n) time, O(k) space
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
property to reverse first k elements of a queue through three-step
approach, achieving efficient O(n) time and O(k) space solution!
*/
  