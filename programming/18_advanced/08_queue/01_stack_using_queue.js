/* Problem: ✅✅✅✅ Stack using Two Queues ✅✅✅✅

Implement a stack using two queues. The stack should support the following operations:
- push(x): Add element x to the top of the stack
- pop(): Remove and return the element from the top of the stack
- top(): Return the top element of the stack without removing it
- size(): Return the current size of the stack

You are given two queues and need to implement stack operations using only these queues.
The stack should maintain LIFO (Last In, First Out) order.

Example 1:
Input: push(1), push(2), push(3), pop(), pop()
Output: 3, 2
Explanation: Elements are popped in the order they were pushed (LIFO)

Example 2:
Input: push(10), push(20), pop(), push(30), pop(), pop()
Output: 20, 30, 10
Explanation: Stack maintains LIFO order throughout operations

Constraints:
- 1 ≤ x ≤ 1000
- At most 1000 operations will be performed
- It is guaranteed that pop() will not be called on an empty stack

Expected Complexities:
Time Complexity: O(n) for push, O(1) for pop
Auxiliary Space: O(n) for both operations
*/

class Node {
    constructor(data) {
      this.data = data;
      this.next = null;
    }
  }
  // Queue implementation using Linked List
  class Queue {
    constructor() {
      this.front = null;
      this.rear = null;
      this.len = 0;
    }
    // Adding at rear
    // ✅ TC: O(1)
    enque(x) {
      const newNode = new Node(x);
      if (this.len === 0) {
        this.rear = this.front = newNode;
      } else {
        this.rear.next = newNode;
        this.rear = newNode;
      }
      this.len++;
    }
  
    // Removing front
    // ✅ TC: O(1)
    deque() {
      if (this.len === 0) return null;
  
      let front = this.front;
  
      if (this.len === 1) {
        this.rear = this.front = null;
      } else {
        this.front = this.front.next;
      }
      this.len--;
  
      // Removed value
      return front.data;
    }
  
    // ✅ TC: O(1)
    getFront() {
      if (!this.front) return null;
      return this.front.data;
    }
  
    // ✅ TC: O(1)
    getRear() {
      if (!this.rear) return null;
      return this.rear.data;
    }
  
    // ✅ TC: O(1)
    size() {
      return this.len;
    }
  
    // ✅ TC: O(1)
    isEmpty() {
      return this.len === 0;
    }
  }

// 1. Using 2 queues (Implemented using Linked List)
// ✅ TC = O(n)
// ✅ SC = O(n)
class QueueStack{
    constructor(){
        this.q1 = new Queue() // main queue
        this.q2 = new Queue() // helper queue
    }
    push(x){
        // Inserts an element x at the top of the stack (means at front of the queue)
        // 1. Enque x to q2
        this.q2.enque(x)

        // 2. Push all elements from q1 to q2
        while(this.q1.size() > 0){
            this.q2.enque(this.q1.deque())
        }

        // 3. Just swap q1 & q2 (instead of pushing all elements from q2 to q1)
        [this.q1, this.q2] = [this.q2, this.q1]
    }
    pop(){
        // Removes an element from the top of the stack
        if(this.q1.size() === 0) return -1
        return this.q1.deque()
    }
    peak(){
        // Returns the top element of the stack
        // If stack is empty, return -1
        if(this.q1.size() === 0) return -1
        return this.q1.getFront()
    }
    size(){
        return this.q1.size()
    }
}

// 2. Using 2 queues (using Array) - Not recommended (since shift operation is O(n))
// ✅ TC = O(n)
// ✅ SC = O(n)
class QueueStack {
    constructor() { 
        this.q1 = []; // main queue
        this.q2 = []; // helper queue
    }

    push(x) {
        // Inserts an element x at the top of the stack (means at front of the queue)
        
        // 1. Push x to q2
        this.q2.push(x) // enque

        // 2. Push all elements from q1 to q2
        while(this.q1.length > 0){
            this.q2.push(this.q1.shift()) // only enque(push) & deque(shift)
        }
        
        // 3. Just swap q1 & q2 (instead of pushing all elements from q2 to q1)
        [this.q1, this.q2] = [this.q2, this.q1]
        // while(this.q2.length > 0){
        //     this.q1.push(this.q2.shift())
        // }
        
    }

    pop() {
        // Removes an element from the top of the stack
        if(this.q1.length === 0) return -1
        return this.q1.shift() // deque()
    }

    top() {
        // Returns the top element of the stack
        // If stack is empty, return -1
        if(this.q1.length === 0) return -1
        return this.q1[0] // front of the queue --> top of the stack
    }

    size() {
        // Returns the current size of the stack
        return this.q1.length
    }
}

/*🎯 CORE IDEA: Use two queues to implement stack operations. For push, enqueue new element to q2, move all elements from q1 to q2, then swap q1 and q2. For pop, simply dequeue from q1. This ensures the newest element is always at the front of q1.

📋 STEP-BY-STEP FLOW:

1️⃣ PUSH OPERATION:
   - Enqueue new element x to q2
   - Move all elements from q1 to q2 (maintains order)
   - Swap q1 and q2 (new element becomes front of q1)
   - New element is now at the front of q1 (top of stack)

2️⃣ POP OPERATION:
   - Simply dequeue from q1 (front element)
   - This gives the newest element (LIFO)

3️⃣ TOP OPERATION:
   - Return front element of q1 without removing it

🧠 WHY THIS APPROACH?
- Queue q1 maintains stack order (newest at front)
- Queue q2 is used as temporary storage during push
- Push operation ensures new element goes to front of q1
- Pop operation simply dequeues from front of q1

💡 KEY INSIGHTS:
- Use two queues for stack implementation
- Push requires moving elements to maintain order
- Pop is simple dequeue operation
- q1 maintains the actual stack order
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: push(1), push(2), push(3), pop(), pop()

INPUT: Stack operations using two queues
OUTPUT: 3, 2 (LIFO order)
EXPLANATION: Elements are popped in the order they were pushed

🎯 GOAL: Implement stack using two queues with LIFO order!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
q1 = [] (main queue - maintains stack order)
q2 = [] (helper queue - used during push)

📋 OPERATION 1: push(1)

STEP 1: Enqueue 1 to q2
q1 = [] → q2 = [1]

STEP 2: Move all elements from q1 to q2
q1 = [] → q2 = [1] (no elements to move)

STEP 3: Swap q1 and q2
q1 = [1] → q2 = []

FINAL STATE: q1 = [1], q2 = []

📋 OPERATION 2: push(2)

STEP 1: Enqueue 2 to q2
q1 = [1] → q2 = [2]

STEP 2: Move all elements from q1 to q2
q1 = [1] → q2 = [2, 1]

STEP 3: Swap q1 and q2
q1 = [2, 1] → q2 = []

FINAL STATE: q1 = [2, 1], q2 = []

📋 OPERATION 3: push(3)

STEP 1: Enqueue 3 to q2
q1 = [2, 1] → q2 = [3]

STEP 2: Move all elements from q1 to q2
q1 = [2, 1] → q2 = [3, 2, 1]

STEP 3: Swap q1 and q2
q1 = [3, 2, 1] → q2 = []

FINAL STATE: q1 = [3, 2, 1], q2 = []

📋 OPERATION 4: pop()

STEP 1: Dequeue from q1
q1 = [3, 2, 1] → dequeue() = 3
q1 = [2, 1]

FINAL STATE: q1 = [2, 1], q2 = []
RETURN: 3

📋 OPERATION 5: pop()

STEP 1: Dequeue from q1
q1 = [2, 1] → dequeue() = 2
q1 = [1]

FINAL STATE: q1 = [1], q2 = []
RETURN: 2

🏆 RESULT: 3, 2 (LIFO order maintained)

─────────────────────────────────────────

📊 EXAMPLE: push(10), push(20), pop(), push(30), pop(), pop()

INPUT: Stack operations using two queues
OUTPUT: 20, 30, 10 (LIFO order)
EXPLANATION: Stack maintains LIFO order throughout operations

🔍 Process:

OPERATION 1: push(10)
q1 = [10], q2 = []

OPERATION 2: push(20)
q1 = [20, 10], q2 = []

OPERATION 3: pop()
q1 = [10], q2 = []
RETURN: 20

OPERATION 4: push(30)
q1 = [30, 10], q2 = []

OPERATION 5: pop()
q1 = [10], q2 = []
RETURN: 30

OPERATION 6: pop()
q1 = [], q2 = []
RETURN: 10

🏆 RESULT: 20, 30, 10 (LIFO order maintained)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

INITIAL STATE:
q1: []    q2: []

AFTER push(1):
q1: [1]   q2: []

AFTER push(2):
q1: [2, 1]   q2: []

AFTER push(3):
q1: [3, 2, 1]   q2: []

AFTER pop():
q1: [2, 1]   q2: []
RETURN: 3

AFTER pop():
q1: [1]   q2: []
RETURN: 2

─────────────────────────────────────────

📊 PUSH PROCESS VISUALIZATION:

BEFORE push(3):
q1: [2, 1]   q2: []

STEP 1: Enqueue 3 to q2
q1: [2, 1]   q2: [3]

STEP 2: Move q1 to q2
q1: []   q2: [3, 2, 1]

STEP 3: Swap q1 and q2
q1: [3, 2, 1]   q2: []

─────────────────────────────────────────

📊 STACK ORDER ANALYSIS:

STACK ORDER (LIFO):
Top → [3, 2, 1] → Bottom

QUEUE q1 ORDER (FIFO):
Front ← [3, 2, 1] ← Rear

KEY INSIGHT: Queue q1 maintains stack order with newest at front!

─────────────────────────────────────────

📊 QUEUE STATE TRACKING:

INITIAL: q1 = [], q2 = []

AFTER push(1): q1 = [1], q2 = []

AFTER push(2): q1 = [2, 1], q2 = []

AFTER push(3): q1 = [3, 2, 1], q2 = []

AFTER pop(): q1 = [2, 1], q2 = []
RETURN: 3

AFTER pop(): q1 = [1], q2 = []
RETURN: 2

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ QUEUE q1 MAINTAINS STACK ORDER: Newest at front, oldest at rear
2️⃣ QUEUE q2 IS TEMPORARY: Used only during push operations
3️⃣ PUSH PROCESS: Ensures new element goes to front of q1
4️⃣ POP PROCESS: Simply dequeues from front of q1 (newest element)
5️⃣ LIFO ORDER: Maintained throughout all operations

💡 KEY INSIGHT:
Use two queues to implement stack with q1 maintaining stack order
and q2 as temporary storage during push!

🎯 TIME COMPLEXITY ANALYSIS:
- Push: O(n) - need to move all elements from q1 to q2
- Pop: O(1) - simple dequeue operation
- Top: O(1) - return front element
- Size: O(1) - return queue size

🎯 SPACE COMPLEXITY ANALYSIS:
- Two queues: O(n) space for both
- Temporary storage: O(n) during push
- Total: O(n) space complexity

🎯 EDGE CASES HANDLED:
- Empty stack: pop returns -1
- Single element: works correctly
- Multiple elements: maintains LIFO order
- Mixed operations: push and pop work together

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to maintain LIFO order
- Push adds to top of stack
- Pop removes from top of stack
- Queue operations are correct

🎯 IMPLEMENTATION DETAILS:
- Two queues: q1 (main), q2 (temporary)
- Push: Enqueue to q2, move q1→q2, swap q1↔q2
- Pop: Dequeue from q1
- Top: Return front element of q1
- Queue q1 maintains stack order

🎯 QUEUE OPERATIONS:
- Enqueue: Add element to rear of queue
- Dequeue: Remove element from front of queue
- FIFO: First In, First Out property
- Order: Maintains insertion order

🎯 STACK PROPERTIES:
- LIFO: Last In, First Out
- Push: Add to top
- Pop: Remove from top
- Order preservation: Maintained throughout

🎯 COMPARISON WITH ARRAY-BASED STACK:
- Array stack: O(1) push, O(1) pop
- Queue stack: O(n) push, O(1) pop
- Both: Correct LIFO behavior
- Queue stack: More complex but demonstrates queue usage

🎯 REAL-WORLD APPLICATIONS:
- Data structure implementation
- Algorithm design
- System architecture
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Use two queues efficiently
- Minimize element movements
- Maintain stack order
- Handle edge cases
- Efficient space usage

🎯 ALGORITHM PATTERN:
- Two-queue technique
- Element movement
- Order maintenance
- Queue operations

🎯 MATHEMATICAL PROPERTIES:
- Queue FIFO property
- Stack LIFO property
- Element movement count: n for push
- Space usage: O(n) for both queues

🎯 ERROR HANDLING:
- Empty stack: pop returns -1
- Invalid input: handled gracefully
- Edge cases: comprehensive coverage
- Robust implementation

🎯 ADVANTAGES OF TWO-QUEUE APPROACH:
- Demonstrates queue usage
- Maintains stack properties
- Correct LIFO behavior
- Educational value
- Interview relevance

🎯 DISADVANTAGES:
- Push is O(n) instead of O(1)
- More complex than array-based stack
- Higher time complexity for push
- More memory usage

🎯 ALTERNATIVE APPROACHES:
- Array-based stack: O(1) for both operations
- Linked list stack: O(1) for both operations
- Single queue: O(n) for both operations
- Two-queue: O(n) push, O(1) pop

🎯 IMPLEMENTATION CONSIDERATIONS:
- Queue choice: Array or linked list
- Error handling: Empty stack cases
- Performance: Time vs space trade-offs
- Maintainability: Code clarity
- Testing: Edge case coverage

🎯 TESTING STRATEGY:
- Test empty stack
- Test single element
- Test multiple elements
- Test mixed operations
- Test edge cases

🎯 DEBUGGING TIPS:
- Check queue states after each operation
- Verify element order in q1
- Ensure q2 is empty after push
- Validate LIFO behavior
- Monitor time complexity

🎯 PERFORMANCE ANALYSIS:
- Push: O(n) - linear time
- Pop: O(1) - constant time
- Space: O(n) - linear space
- Overall: Acceptable for small datasets

🎯 SCALABILITY CONSIDERATIONS:
- Large datasets: Consider alternative approaches
- Frequent push: May impact performance
- Memory usage: Monitor queue sizes
- Optimization: Consider other implementations

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to move elements back
- Incorrect queue order
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand queue operations
- Learn stack implementation
- Master two-queue technique
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain the approach clearly
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Queue FIFO vs Stack LIFO
- Element movement strategy
- Order maintenance techniques
- Space-time trade-offs
- Implementation patterns

🎯 MATHEMATICAL ANALYSIS:
- Element movements: n per push
- Queue operations: O(1) each
- Total push: O(n)
- Total pop: O(1)
- Space usage: O(n)

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining stack order
- Efficient element movement
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various inputs
- Verify LIFO behavior
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: O(n²) for both
- Optimized approach: O(n) push, O(1) pop
- Alternative approaches: Array-based, linked list
- Future improvements: Consider other data structures

🎯 PRACTICAL APPLICATIONS:
- System design
- Algorithm implementation
- Data structure design
- Performance optimization
- Educational purposes

🎯 CONCLUSION:
The two-queue stack implementation demonstrates how to use queues
to implement stack operations, maintaining LIFO order through
careful element movement and queue management!
*/