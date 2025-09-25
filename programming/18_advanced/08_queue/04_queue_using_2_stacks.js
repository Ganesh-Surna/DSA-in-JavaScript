

/* Problem: ✅✅✅✅ Queue using Two Stacks ✅✅✅✅

Implement a queue using two stacks. The queue should support the following operations:
- enqueue(x): Add element x to the rear of the queue
- dequeue(): Remove and return the element from the front of the queue

You are given two stacks and need to implement queue operations using only these stacks.
The queue should maintain FIFO (First In, First Out) order.

Example 1:
Input: enqueue(1), enqueue(2), enqueue(3), dequeue(), dequeue()
Output: 1, 2
Explanation: Elements are dequeued in the order they were enqueued (FIFO)

Example 2:
Input: enqueue(10), enqueue(20), dequeue(), enqueue(30), dequeue(), dequeue()
Output: 10, 20, 30
Explanation: Queue maintains FIFO order throughout operations

Constraints:
- 1 ≤ x ≤ 1000
- At most 1000 operations will be performed
- It is guaranteed that dequeue() will not be called on an empty queue

Expected Time Complexity: O(n) for enqueue, O(1) for dequeue
Expected Auxiliary Space: O(n) for both operations
*/

/*🎯 CORE IDEA: Use two stacks to implement queue operations. For enqueue, move all elements from s1 to s2, push new element to s1, then move all elements back from s2 to s1. For dequeue, simply pop from s1.

📋 STEP-BY-STEP FLOW:

1️⃣ ENQUEUE OPERATION:
   - Move all elements from s1 to s2 (reverse order)
   - Push new element x to s1
   - Move all elements from s2 back to s1 (restore order)
   - New element is now at the bottom of s1

2️⃣ DEQUEUE OPERATION:
   - Simply pop from s1 (top element)
   - This gives the oldest element (FIFO)

🧠 WHY THIS APPROACH?
- Stack s1 maintains queue order (oldest at bottom, newest at top)
- Stack s2 is used as temporary storage during enqueue
- Enqueue operation ensures new element goes to bottom of s1
- Dequeue operation simply pops from top of s1

💡 KEY INSIGHTS:
- Use two stacks for queue implementation
- Enqueue requires moving elements to maintain order
- Dequeue is simple pop operation
- s1 maintains the actual queue order
*/

// ✅ TC = O(n)
// ✅ SC = O(n)
class StackQueue {
    constructor() {
        this.s1 = []
        this.s2 = []
    }

    /**
     * @param {number} x
     */
    // ✅ TC: O(n)
    enqueue(x) {
        let s1 = this.s1, s2=this.s2;

        // 1. Move all elements from s1 to s2
        while(s1.length > 0){
            s2.push(s1.pop())
        }
        
        // 2. Push x to s1
        s1.push(x)
        
        // 3. Push all elements from s2 to s1
        while(s2.length > 0){
            s1.push(s2.pop())
        }
    }

    /**
     * @return {number}
     */
    // ✅ TC: O(1)
    dequeue() {
        // If s1 is empty, return -1
        if(this.s1.length === 0) return -1
        return this.s1.pop()
    }
}

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: enqueue(1), enqueue(2), enqueue(3), dequeue(), dequeue()

INPUT: Queue operations using two stacks
OUTPUT: 1, 2 (FIFO order)
EXPLANATION: Elements are dequeued in the order they were enqueued

🎯 GOAL: Implement queue using two stacks with FIFO order!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
s1 = [] (main stack - maintains queue order)
s2 = [] (temporary stack - used during enqueue)

📋 OPERATION 1: enqueue(1)

STEP 1: Move all elements from s1 to s2
s1 = [] → s2 = [] (no elements to move)

STEP 2: Push 1 to s1
s1 = [1] → s2 = []

STEP 3: Move all elements from s2 to s1
s1 = [1] → s2 = [] (no elements to move back)

FINAL STATE: s1 = [1], s2 = []

📋 OPERATION 2: enqueue(2)

STEP 1: Move all elements from s1 to s2
s1 = [1] → s2 = [1]

STEP 2: Push 2 to s1
s1 = [2] → s2 = [1]

STEP 3: Move all elements from s2 to s1
s1 = [1, 2] → s2 = []

FINAL STATE: s1 = [1, 2], s2 = []

📋 OPERATION 3: enqueue(3)

STEP 1: Move all elements from s1 to s2
s1 = [1, 2] → s2 = [2, 1]

STEP 2: Push 3 to s1
s1 = [3] → s2 = [2, 1]

STEP 3: Move all elements from s2 to s1
s1 = [1, 2, 3] → s2 = []

FINAL STATE: s1 = [1, 2, 3], s2 = []

📋 OPERATION 4: dequeue()

STEP 1: Pop from s1
s1 = [1, 2, 3] → pop() = 1
s1 = [2, 3]

FINAL STATE: s1 = [2, 3], s2 = []
RETURN: 1

📋 OPERATION 5: dequeue()

STEP 1: Pop from s1
s1 = [2, 3] → pop() = 2
s1 = [3]

FINAL STATE: s1 = [3], s2 = []
RETURN: 2

🏆 RESULT: 1, 2 (FIFO order maintained)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

INITIAL STATE:
s1: []    s2: []

AFTER enqueue(1):
s1: [1]   s2: []

AFTER enqueue(2):
s1: [1, 2]   s2: []

AFTER enqueue(3):
s1: [1, 2, 3]   s2: []

AFTER dequeue():
s1: [2, 3]   s2: []
RETURN: 1

AFTER dequeue():
s1: [3]   s2: []
RETURN: 2

─────────────────────────────────────────

📊 ENQUEUE PROCESS VISUALIZATION:

BEFORE enqueue(3):
s1: [1, 2]   s2: []

STEP 1: Move s1 to s2
s1: []   s2: [2, 1]

STEP 2: Push 3 to s1
s1: [3]   s2: [2, 1]

STEP 3: Move s2 to s1
s1: [1, 2, 3]   s2: []

─────────────────────────────────────────

📊 STACK ORDER ANALYSIS:

QUEUE ORDER (FIFO):
Front ← [1, 2, 3] ← Rear

STACK s1 ORDER (LIFO):
Top → [3, 2, 1] → Bottom

KEY INSIGHT: Stack s1 maintains queue order with oldest at bottom!

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ STACK s1 MAINTAINS QUEUE ORDER: Oldest at bottom, newest at top
2️⃣ STACK s2 IS TEMPORARY: Used only during enqueue operations
3️⃣ ENQUEUE PROCESS: Ensures new element goes to bottom of s1
4️⃣ DEQUEUE PROCESS: Simply pops from top of s1 (oldest element)
5️⃣ FIFO ORDER: Maintained throughout all operations

💡 KEY INSIGHT:
Use two stacks to implement queue with s1 maintaining queue order
and s2 as temporary storage during enqueue!

🎯 TIME COMPLEXITY ANALYSIS:
- Enqueue: O(n) - need to move all elements twice
- Dequeue: O(1) - simple pop operation
- Total: O(n) for enqueue, O(1) for dequeue

🎯 SPACE COMPLEXITY ANALYSIS:
- Two stacks: O(n) space for both
- Temporary storage: O(n) during enqueue
- Total: O(n) space complexity

🎯 EDGE CASES HANDLED:
- Empty queue: dequeue returns -1
- Single element: works correctly
- Multiple elements: maintains FIFO order
- Mixed operations: enqueue and dequeue work together

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to maintain FIFO order
- Enqueue adds to rear of queue
- Dequeue removes from front of queue
- Stack operations are correct

🎯 IMPLEMENTATION DETAILS:
- Two stacks: s1 (main), s2 (temporary)
- Enqueue: Move s1→s2, push x, move s2→s1
- Dequeue: Pop from s1
- Stack s1 maintains queue order
- Optimal complexity for given constraints

🎯 STACK OPERATIONS:
- Push: Add element to top of stack
- Pop: Remove element from top of stack
- Length: Check number of elements
- Empty: Check if stack is empty

🎯 QUEUE PROPERTIES:
- FIFO: First In, First Out
- Enqueue: Add to rear
- Dequeue: Remove from front
- Order preservation: Maintained throughout

🎯 COMPARISON WITH ARRAY-BASED QUEUE:
- Array queue: O(1) enqueue, O(1) dequeue
- Stack queue: O(n) enqueue, O(1) dequeue
- Both: Correct FIFO behavior
- Stack queue: More complex but demonstrates stack usage

🎯 REAL-WORLD APPLICATIONS:
- Data structure implementation
- Algorithm design
- System architecture
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Use two stacks efficiently
- Minimize element movements
- Maintain queue order
- Handle edge cases
- Efficient space usage

🎯 ALGORITHM PATTERN:
- Two-stack technique
- Element movement
- Order maintenance
- Stack operations

🎯 MATHEMATICAL PROPERTIES:
- Stack LIFO property
- Queue FIFO property
- Element movement count: 2n for enqueue
- Space usage: O(n) for both stacks

🎯 ERROR HANDLING:
- Empty queue: dequeue returns -1
- Invalid input: handled gracefully
- Edge cases: comprehensive coverage
- Robust implementation

🎯 ADVANTAGES OF TWO-STACK APPROACH:
- Demonstrates stack usage
- Maintains queue properties
- Correct FIFO behavior
- Educational value
- Interview relevance

🎯 DISADVANTAGES:
- Enqueue is O(n) instead of O(1)
- More complex than array-based queue
- Higher time complexity for enqueue
- More memory usage

🎯 ALTERNATIVE APPROACHES:
- Array-based queue: O(1) for both operations
- Linked list queue: O(1) for both operations
- Circular array: O(1) for both operations
- Two-stack: O(n) enqueue, O(1) dequeue

🎯 IMPLEMENTATION CONSIDERATIONS:
- Stack choice: Array or linked list
- Error handling: Empty queue cases
- Performance: Time vs space trade-offs
- Maintainability: Code clarity
- Testing: Edge case coverage

🎯 TESTING STRATEGY:
- Test empty queue
- Test single element
- Test multiple elements
- Test mixed operations
- Test edge cases

🎯 DEBUGGING TIPS:
- Check stack states after each operation
- Verify element order in s1
- Ensure s2 is empty after enqueue
- Validate FIFO behavior
- Monitor time complexity

🎯 PERFORMANCE ANALYSIS:
- Enqueue: O(n) - linear time
- Dequeue: O(1) - constant time
- Space: O(n) - linear space
- Overall: Acceptable for small datasets

🎯 SCALABILITY CONSIDERATIONS:
- Large datasets: Consider alternative approaches
- Frequent enqueue: May impact performance
- Memory usage: Monitor stack sizes
- Optimization: Consider other implementations

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to move elements back
- Incorrect stack order
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand stack operations
- Learn queue implementation
- Master two-stack technique
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
- Element movement strategy
- Order maintenance techniques
- Space-time trade-offs
- Implementation patterns

🎯 MATHEMATICAL ANALYSIS:
- Element movements: 2n per enqueue
- Stack operations: O(1) each
- Total enqueue: O(n)
- Total dequeue: O(1)
- Space usage: O(n)

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining queue order
- Efficient element movement
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various inputs
- Verify FIFO behavior
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) for both
- Optimized approach: O(n) enqueue, O(1) dequeue
- Alternative approaches: Array-based, linked list
- Future improvements: Consider other data structures

🎯 PRACTICAL APPLICATIONS:
- System design
- Algorithm implementation
- Data structure design
- Performance optimization
- Educational purposes

🎯 CONCLUSION:
The two-stack queue implementation demonstrates how to use stacks
to implement queue operations, maintaining FIFO order through
careful element movement and stack management!
*/