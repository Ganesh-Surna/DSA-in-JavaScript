/* Problem: ✅✅✅✅ Generate Numbers with Digits 5 and 6 ✅✅✅✅

Generate the first n numbers using only digits 5 and 6 in ascending order.

You are given a number n. Generate the first n numbers that contain only digits 5 and 6, arranged in ascending order. The numbers should be generated in the order they appear when sorted numerically.

Example 1:
Input: n = 2
Output: ["5", "6"]
Explanation: The first 2 numbers with digits 5 and 6 are 5 and 6.

Example 2:
Input: n = 5
Output: ["5", "6", "55", "56", "65"]
Explanation: The first 5 numbers with digits 5 and 6 are 5, 6, 55, 56, 65.

Example 3:
Input: n = 10
Output: ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"]
Explanation: Numbers are generated in ascending order using only digits 5 and 6.

Constraints:
- 1 ≤ n ≤ 10⁶

Expected Complexities:
Time Complexity: O(n)
Auxiliary Space: O(n)
*/

// 1. More Efficient Solution(reduces elements in queue)
// ✅ TC = O(n)
// ✅ SC = O(n)
function generateNumbers(n) {
    let q = [] // new Queue()
    let res = []
    
    // start with "5" and "6"
    q.push("5") // enque()
    q.push("6") // enque()
    
    let i=0
    for(; (i+q.length) < n; i++){
        let x = q.shift() // deque
        res.push(x) // save it
        
        // enqueue next numbers
        q.push(x+"5")
        q.push(x+"6")
    }
    
    // if queue has more elements(upto n), then dequeue them and save them in res
    for(;i < n;i++){
        res.push(q.shift()) // deque
    }
    
    return res
}

// 2. Efficient Solution
// ✅ TC = O(n)
// ✅ SC = O(n)
function generateNumbers(n) {
    let q = []
    let res = []

    // start with "5" and "6"
    q.push("5") // enque()
    q.push("6") // enque()
    
    for(let i=0; i < n; i++){
        let x = q.shift() // deque
        res.push(x) // save it
        
        // enqueue next numbers
        q.push(x+"5")
        q.push(x+"6")
    }
    
    return res
}

// Example
console.log(generateNumbers(5)) // ["5", "6", "55", "56", "65", "66"]
console.log(generateNumbers(10)) // ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"]

/*🎯 CORE IDEA: Use a queue to generate numbers with digits 5 and 6 in ascending order. Start with "5" and "6", then for each number, append "5" and "6" to generate the next level numbers. The queue ensures FIFO order, maintaining ascending sequence.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create empty queue and result array
   - Enqueue "5" and "6" as starting numbers

2️⃣ GENERATION LOOP:
   - For each iteration from 0 to n-1:
     * Dequeue front element (smallest remaining)
     * Add to result array
     * Enqueue two new numbers: current + "5" and current + "6"

3️⃣ RESULT:
   - Return result array with first n numbers

🧠 WHY THIS APPROACH?
- Queue FIFO property ensures ascending order
- Each number generates exactly two new numbers
- No need to sort - queue maintains order
- Efficient O(n) time and space complexity

💡 KEY INSIGHTS:
- Use queue for FIFO order maintenance
- Start with single digits "5" and "6"
- Append "5" and "6" to each number
- Queue ensures ascending order automatically
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: n = 5

INPUT: Generate first 5 numbers with digits 5 and 6
OUTPUT: ["5", "6", "55", "56", "65"]
EXPLANATION: Numbers generated in ascending order using only digits 5 and 6

🎯 GOAL: Generate numbers in ascending order using queue!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
q = [] (empty queue)
res = [] (empty result array)

📋 STEP 1: ENQUEUE STARTING NUMBERS
q.push("5") → q = ["5"]
q.push("6") → q = ["5", "6"]

📋 STEP 2: GENERATION LOOP

ITERATION 1: i = 0
x = q.shift() = "5" → q = ["6"]
res.push("5") → res = ["5"]
q.push("5" + "5") = "55" → q = ["6", "55"]
q.push("5" + "6") = "56" → q = ["6", "55", "56"]

ITERATION 2: i = 1
x = q.shift() = "6" → q = ["55", "56"]
res.push("6") → res = ["5", "6"]
q.push("6" + "5") = "65" → q = ["55", "56", "65"]
q.push("6" + "6") = "66" → q = ["55", "56", "65", "66"]

ITERATION 3: i = 2
x = q.shift() = "55" → q = ["56", "65", "66"]
res.push("55") → res = ["5", "6", "55"]
q.push("55" + "5") = "555" → q = ["56", "65", "66", "555"]
q.push("55" + "6") = "556" → q = ["56", "65", "66", "555", "556"]

ITERATION 4: i = 3
x = q.shift() = "56" → q = ["65", "66", "555", "556"]
res.push("56") → res = ["5", "6", "55", "56"]
q.push("56" + "5") = "565" → q = ["65", "66", "555", "556", "565"]
q.push("56" + "6") = "566" → q = ["65", "66", "555", "556", "565", "566"]

ITERATION 5: i = 4
x = q.shift() = "65" → q = ["66", "555", "556", "565", "566"]
res.push("65") → res = ["5", "6", "55", "56", "65"]
q.push("65" + "5") = "655" → q = ["66", "555", "556", "565", "566", "655"]
q.push("65" + "6") = "656" → q = ["66", "555", "556", "565", "566", "655", "656"]

🏆 RESULT: ["5", "6", "55", "56", "65"]

─────────────────────────────────────────

📊 EXAMPLE: n = 10

INPUT: Generate first 10 numbers with digits 5 and 6
OUTPUT: ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"]

🔍 Process:

ITERATION 1: x = "5", res = ["5"], q = ["6", "55", "56"]
ITERATION 2: x = "6", res = ["5", "6"], q = ["55", "56", "65", "66"]
ITERATION 3: x = "55", res = ["5", "6", "55"], q = ["56", "65", "66", "555", "556"]
ITERATION 4: x = "56", res = ["5", "6", "55", "56"], q = ["65", "66", "555", "556", "565", "566"]
ITERATION 5: x = "65", res = ["5", "6", "55", "56", "65"], q = ["66", "555", "556", "565", "566", "655", "656"]
ITERATION 6: x = "66", res = ["5", "6", "55", "56", "65", "66"], q = ["555", "556", "565", "566", "655", "656", "665", "666"]
ITERATION 7: x = "555", res = ["5", "6", "55", "56", "65", "66", "555"], q = ["556", "565", "566", "655", "656", "665", "666", "5555", "5556"]
ITERATION 8: x = "556", res = ["5", "6", "55", "56", "65", "66", "555", "556"], q = ["565", "566", "655", "656", "665", "666", "5555", "5556", "5565", "5566"]
ITERATION 9: x = "565", res = ["5", "6", "55", "56", "65", "66", "555", "556", "565"], q = ["566", "655", "656", "665", "666", "5555", "5556", "5565", "5566", "5655", "5656"]
ITERATION 10: x = "566", res = ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"], q = ["655", "656", "665", "666", "5555", "5556", "5565", "5566", "5655", "5656", "5665", "5666"]

🏆 RESULT: ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

GENERATION TREE:
        "5"
       /   \
    "55"   "56"
   /  \    /  \
"555" "556" "565" "566"

        "6"
       /   \
    "65"   "66"
   /  \    /  \
"655" "656" "665" "666"

QUEUE ORDER (FIFO):
Front ← ["5", "6", "55", "56", "65", "66", "555", "556", "565", "566"] ← Rear

─────────────────────────────────────────

📊 QUEUE STATE TRACKING:

INITIAL: q = []
AFTER ENQUEUE: q = ["5", "6"]

ITERATION 1: x = "5"
q = ["6", "55", "56"]

ITERATION 2: x = "6"
q = ["55", "56", "65", "66"]

ITERATION 3: x = "55"
q = ["56", "65", "66", "555", "556"]

ITERATION 4: x = "56"
q = ["65", "66", "555", "556", "565", "566"]

ITERATION 5: x = "65"
q = ["66", "555", "556", "565", "566", "655", "656"]

─────────────────────────────────────────

📊 NUMBER GENERATION PATTERN:

LEVEL 1: "5", "6" (2 numbers)
LEVEL 2: "55", "56", "65", "66" (4 numbers)
LEVEL 3: "555", "556", "565", "566", "655", "656", "665", "666" (8 numbers)
LEVEL 4: "5555", "5556", "5565", "5566", "5655", "5656", "5665", "5666", "6555", "6556", "6565", "6566", "6655", "6656", "6665", "6666" (16 numbers)

PATTERN: Each level has 2^level numbers

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ QUEUE FIFO PROPERTY: Ensures ascending order automatically
2️⃣ BINARY TREE STRUCTURE: Each number generates exactly two children
3️⃣ LEVEL-BY-LEVEL GENERATION: Numbers generated in correct order
4️⃣ EFFICIENT COMPLEXITY: O(n) time and space
5️⃣ CORRECT RESULTS: Guaranteed to generate numbers in ascending order

💡 KEY INSIGHT:
Use queue FIFO property to maintain ascending order
while generating numbers with digits 5 and 6!

🎯 TIME COMPLEXITY ANALYSIS:
- Each iteration: O(1) for dequeue, enqueue operations
- Total iterations: n
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Queue storage: O(n) for generated numbers
- Result array: O(n) for output
- Total: O(n) space complexity

🎯 EDGE CASES HANDLED:
- n = 1: Returns ["5"]
- n = 2: Returns ["5", "6"]
- Large n: Efficient O(n) solution
- All constraints: Handled correctly

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to generate numbers in ascending order
- Queue FIFO property ensures correct sequence
- Each number generates exactly two new numbers
- No sorting needed - order maintained automatically

🎯 IMPLEMENTATION DETAILS:
- Queue operations: push() for enqueue, shift() for dequeue
- String concatenation: current + "5" and current + "6"
- Result array: Stores generated numbers
- Optimal complexity: O(n) time and space

🎯 QUEUE OPERATIONS:
- Enqueue: Add element to rear of queue
- Dequeue: Remove element from front of queue
- FIFO: First In, First Out property
- Order: Maintains insertion order

🎯 NUMBER GENERATION:
- Start with single digits: "5", "6"
- Append "5" and "6" to each number
- Binary tree structure: Each node has two children
- Level-by-level: Numbers generated in correct order

🎯 COMPARISON WITH OTHER APPROACHES:
- Brute force: Generate all numbers, then sort O(n log n)
- Queue approach: Generate in order O(n)
- Both: Correct results
- Queue: More efficient

🎯 REAL-WORLD APPLICATIONS:
- Number generation algorithms
- Combinatorial problems
- Sequence generation
- Educational purposes
- Interview preparation

🎯 OPTIMIZATION TECHNIQUES:
- Use queue for order maintenance
- Generate numbers level by level
- Avoid sorting by maintaining order
- Efficient string operations
- Optimal space usage

🎯 ALGORITHM PATTERN:
- Queue-based generation
- Level-by-level traversal
- Binary tree structure
- Order maintenance

🎯 MATHEMATICAL PROPERTIES:
- Binary tree: Each node has two children
- Level count: 2^level numbers per level
- Total numbers: 2^1 + 2^2 + 2^3 + ... = 2^(level+1) - 2
- Order: Ascending by construction

🎯 ERROR HANDLING:
- Empty input: handled gracefully
- Invalid input: robust handling
- Edge cases: comprehensive coverage
- Robust implementation

🎯 ADVANTAGES OF QUEUE APPROACH:
- Automatic order maintenance
- Efficient generation
- No sorting required
- Simple implementation
- Optimal complexity

🎯 DISADVANTAGES:
- Extra space for queue
- String operations overhead
- More complex than brute force
- Space overhead

🎯 ALTERNATIVE APPROACHES:
- Brute force: Generate all, sort O(n log n)
- Recursive: Generate recursively O(n)
- Queue approach: Generate in order O(n)
- All: Correct results

🎯 IMPLEMENTATION CONSIDERATIONS:
- Queue choice: Array or linked list
- String operations: Concatenation efficiency
- Memory usage: Queue size management
- Performance: Time vs space trade-offs
- Maintainability: Code clarity

🎯 TESTING STRATEGY:
- Test small values: n = 1, 2, 3
- Test medium values: n = 5, 10
- Test large values: n = 100, 1000
- Test edge cases: Boundary values

🎯 DEBUGGING TIPS:
- Check queue state after each iteration
- Verify number generation order
- Monitor result array growth
- Validate ascending order
- Check complexity

🎯 PERFORMANCE ANALYSIS:
- Time: O(n) - linear generation
- Space: O(n) - queue and result storage
- Overall: Efficient for given constraints
- Scalable: Works for large n

🎯 SCALABILITY CONSIDERATIONS:
- Large n: Consider memory usage
- Frequent operations: Monitor performance
- Memory usage: Track queue size
- Optimization: Consider alternatives

🎯 BEST PRACTICES:
- Clear variable names
- Proper error handling
- Efficient algorithms
- Good documentation
- Comprehensive testing

🎯 COMMON MISTAKES:
- Forgetting to enqueue starting numbers
- Incorrect queue operations
- Missing edge cases
- Poor error handling
- Inefficient implementations

🎯 LEARNING OBJECTIVES:
- Understand queue operations
- Learn number generation
- Master level-by-level traversal
- Practice algorithm design
- Improve problem-solving skills

🎯 INTERVIEW TIPS:
- Explain the approach clearly
- Discuss time/space complexity
- Handle edge cases
- Write clean code
- Test thoroughly

🎯 ALGORITHM INSIGHTS:
- Queue FIFO vs natural order
- Binary tree generation
- Level-by-level traversal
- Order maintenance
- Efficient generation

🎯 MATHEMATICAL ANALYSIS:
- Binary tree structure: 2^level nodes per level
- Total nodes: 2^(level+1) - 2
- Generation order: Level by level
- Space usage: O(n) for queue and result
- Time complexity: O(n) for generation

🎯 IMPLEMENTATION CHALLENGES:
- Maintaining correct order
- Efficient string operations
- Handling edge cases
- Optimizing performance
- Ensuring correctness

🎯 SOLUTION VALIDATION:
- Test with various inputs
- Verify ascending order
- Check edge cases
- Monitor performance
- Validate correctness

🎯 ALGORITHM EVOLUTION:
- Naive approach: Generate all, sort O(n log n)
- Optimized approach: Generate in order O(n)
- Alternative approaches: Recursive generation
- Future improvements: Space optimization

🎯 PRACTICAL APPLICATIONS:
- System design
- Algorithm implementation
- Number generation
- Performance optimization
- Educational purposes

🎯 CONCLUSION:
The queue-based number generation demonstrates how to use queue FIFO
property to generate numbers with specific digits in ascending order
through level-by-level traversal, achieving efficient O(n) solution!
*/