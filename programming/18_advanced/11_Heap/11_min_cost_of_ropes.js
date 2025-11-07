/* Problem: ✅✅✅✅ Minimum Cost of Ropes ✅✅✅✅

Given an array of rope lengths, connect all ropes into one rope with minimum cost.
The cost of connecting two ropes is equal to the sum of their lengths.

The problem requires:
- Connect all ropes into one rope
- Minimize the total cost
- Use greedy approach with min heap
- Return the minimum total cost

You are given an array of rope lengths. Connect all ropes into one rope
with minimum cost. The cost of connecting two ropes is equal to the sum
of their lengths.

Example 1:
Input: arr = [4, 3, 2, 6]
Output: 29
Explanation:
Step 1: Connect ropes of length 2 and 3 (cost = 2+3 = 5)
        Ropes: [4, 5, 6]
Step 2: Connect ropes of length 4 and 5 (cost = 4+5 = 9)
        Ropes: [9, 6]
Step 3: Connect ropes of length 6 and 9 (cost = 6+9 = 15)
        Ropes: [15]
Total cost: 5 + 9 + 15 = 29

Example 2:
Input: arr = [1, 2, 3, 4, 5]
Output: 33
Explanation:
Step 1: Connect ropes of length 1 and 2 (cost = 1+2 = 3)
        Ropes: [3, 3, 4, 5]
Step 2: Connect ropes of length 3 and 3 (cost = 3+3 = 6)
        Ropes: [6, 4, 5]
Step 3: Connect ropes of length 4 and 5 (cost = 4+5 = 9)
        Ropes: [6, 9]
Step 4: Connect ropes of length 6 and 9 (cost = 6+9 = 15)
        Ropes: [15]
Total cost: 3 + 6 + 9 + 15 = 33

Example 3:
Input: arr = [5, 5, 5, 5]
Output: 40
Explanation:
Step 1: Connect ropes of length 5 and 5 (cost = 5+5 = 10)
        Ropes: [10, 5, 5]
Step 2: Connect ropes of length 5 and 5 (cost = 5+5 = 10)
        Ropes: [10, 10]
Step 3: Connect ropes of length 10 and 10 (cost = 10+10 = 20)
        Ropes: [20]
Total cost: 10 + 10 + 20 = 40

Constraints:
- 1 ≤ array length ≤ 10^4
- 1 ≤ rope length ≤ 10^5

Expected Complexities:
Time Complexity: O(n log n) - using min heap approach
Auxiliary Space: O(n) - for min heap
*/

class MinHeap{
    constructor(){
        this.harr = []
        this.size = 0
    }
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    minHeapify(i){
        let n=this.size, arr=this.harr
        
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            let min = i
            
            if(l < n && arr[l] < arr[min]){
                min = l
            }
            if(r < n && arr[r] < arr[min]){
                min = r
            }
            
            if(min===i) break;
            
            [arr[i], arr[min]]=[arr[min], arr[i]];
            i=min;
        }
    }
    insert(k){
        let i=this.size, arr=this.harr;
        
        arr[i]=k
        
        while(i>0 && arr[this.parent(i)] > arr[i]){
            let p = this.parent(i);
            [arr[p], arr[i]]=[arr[i], arr[p]];
            i=p;
        }
        
        this.size++
    }
    extractMin(){
        if(this.size === 0) return null
        
        let n = this.size, arr= this.harr;
        
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        
        let min = arr.pop();
        this.size--
        this.minHeapify(0)
        return min
    }
    
}


// ✅ TC = O(n log n) - n insertions + (n-1) extractions
// ✅ SC = O(n) --> for min heap
function minCost(arr) {
    // 1. Validate input
    let n = arr.length
    let cost = 0
    
    if(n < 1) return cost
    
    // 2. Create a min heap
    let h = new MinHeap()
    
    // 3. Insert all elements into the heap
    for(let i=0; i<n; i++){
        h.insert(arr[i])
    }
    
    // 4. Extract the two smallest ropes and add them to get the new rope
    while(h.size >= 2){
        let sum = h.extractMin() + h.extractMin()
        cost += sum // ✅ Add to total cost
        // 5. Insert the new rope back into the heap
        h.insert(sum)
    }
    
    return cost // ✅ Return the total cost
}

// Test cases
console.log("Test 1:", minCost([4, 3, 2, 6])); // 29
console.log("Test 2:", minCost([1, 2, 3, 4, 5])); // 33
console.log("Test 3:", minCost([5, 5, 5, 5])); // 40

/*🎯 CORE IDEA: Use greedy approach with min heap to minimize total cost of connecting ropes.
Always connect the two smallest ropes first, as this minimizes the cost contribution
to future connections. Use min heap to efficiently get the two smallest ropes
at each step.

📋 STEP-BY-STEP FLOW:

1️⃣ HEAP INITIALIZATION:
   - Create min heap
   - Insert all rope lengths
   - Prepare for greedy processing
   - Initialize with all ropes

2️⃣ GREEDY PROCESSING:
   - Extract two smallest ropes
   - Calculate connection cost
   - Add cost to total
   - Insert new rope back into heap
   - Repeat until one rope remains

3️⃣ COST ACCUMULATION:
   - Each connection adds to total cost
   - Cost = sum of two smallest ropes
   - Accumulate all connection costs
   - Return final total cost

4️⃣ HEAP MAINTENANCE:
   - Maintain min heap property
   - Efficiently get smallest elements
   - Insert new rope after connection
   - Continue until single rope

5️⃣ TERMINATION CONDITION:
   - Stop when heap size < 2
   - Only one rope remains
   - All ropes connected
   - Return total cost

🧠 WHY THIS APPROACH?
- Greedy strategy minimizes total cost
- Min heap provides efficient access
- O(n log n) time complexity
- O(n) space complexity
- Optimal solution

💡 KEY INSIGHTS:
- Always connect smallest ropes first
- Use min heap for efficient access
- Accumulate cost at each step
- Insert new rope after connection
- Greedy approach is optimal
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Minimum Cost of Ropes

INPUT: arr = [4, 3, 2, 6]
EXPECTED OUTPUT: 29

🎯 GOAL: Connect all ropes with minimum total cost!

🔍 STEP-BY-STEP PROCESS:

STEP 1: Initialize Min Heap
Insert all ropes: [4, 3, 2, 6]
Heap: [2, 3, 4, 6] (min heap)
Cost: 0

STEP 2: First Connection
Extract two smallest: 2 and 3
Sum = 2 + 3 = 5
Cost += 5 → Cost = 5
Insert new rope: 5
Heap: [4, 5, 6]
Ropes: [4, 5, 6]

STEP 3: Second Connection
Extract two smallest: 4 and 5
Sum = 4 + 5 = 9
Cost += 9 → Cost = 14
Insert new rope: 9
Heap: [6, 9]
Ropes: [6, 9]

STEP 4: Final Connection
Extract two smallest: 6 and 9
Sum = 6 + 9 = 15
Cost += 15 → Cost = 29
Insert new rope: 15
Heap: [15]
Ropes: [15]

🏆 FINAL RESULT: 29

─────────────────────────────────────────

📊 EXAMPLE 2: Different Rope Lengths

INPUT: arr = [1, 2, 3, 4, 5]
EXPECTED OUTPUT: 33

PROCESS:

STEP 1: Initialize
Heap: [1, 2, 3, 4, 5]
Cost: 0

STEP 2: Connect 1 and 2
Sum = 1 + 2 = 3
Cost = 3
Heap: [3, 3, 4, 5]

STEP 3: Connect 3 and 3
Sum = 3 + 3 = 6
Cost = 3 + 6 = 9
Heap: [4, 5, 6]

STEP 4: Connect 4 and 5
Sum = 4 + 5 = 9
Cost = 9 + 9 = 18
Heap: [6, 9]

STEP 5: Connect 6 and 9
Sum = 6 + 9 = 15
Cost = 18 + 15 = 33
Heap: [15]

🏆 RESULT: 33

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

HEAP EVOLUTION FOR [4, 3, 2, 6]:

Initial heap: [2, 3, 4, 6]
After connecting 2+3=5: [4, 5, 6]
After connecting 4+5=9: [6, 9]
After connecting 6+9=15: [15]

Cost progression: 0 → 5 → 14 → 29

─────────────────────────────────────────

📊 GREEDY STRATEGY EXPLANATION:

WHY CONNECT SMALLEST FIRST?

- Smaller ropes contribute less to future costs
- If we connect larger ropes first, their cost gets added multiple times
- Greedy choice: always pick two smallest available ropes
- This minimizes total cost in the long run

EXAMPLE OF NON-GREEDY APPROACH:
Connect 4+6=10 first: Cost = 10
Then connect 2+3=5: Cost = 10 + 5 = 15
Then connect 5+10=15: Cost = 15 + 15 = 30
Total: 30 (worse than greedy 29)

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- n insertions: O(n log n)
- (n-1) extractions: O(n log n)
- (n-1) insertions: O(n log n)
- Total: O(n log n)

SPACE COMPLEXITY:
- Heap storage: O(n)
- Variables: O(1)
- Total: O(n)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ GREEDY CHOICE:
   - Always connect two smallest ropes
   - Minimizes immediate cost
   - Reduces future cost impact
   - Optimal local choice

2️⃣ MIN HEAP EFFICIENCY:
   - O(log n) insertion
   - O(log n) extraction
   - Efficient access to smallest elements
   - Maintains heap property

3️⃣ COST ACCUMULATION:
   - Each connection adds to total
   - Cost = sum of two smallest ropes
   - Accumulate all connection costs
   - Return final total

4️⃣ TERMINATION:
   - Stop when heap size < 2
   - Only one rope remains
   - All ropes connected
   - Optimal solution achieved

5️⃣ OPTIMALITY:
   - Greedy approach is optimal
   - Proof: Huffman coding algorithm
   - Minimizes total connection cost
   - No better solution exists

💡 KEY INSIGHT:
Using greedy approach with min heap to always connect the two smallest ropes first,
as this minimizes the total cost by reducing the contribution of larger ropes to
future connections, ensuring O(n log n) time complexity and O(n) space complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- n insertions: O(n log n)
- (n-1) extractions: O(n log n)
- (n-1) insertions: O(n log n)
- Total: O(n log n)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Min heap: O(n)
- Variables: O(1)
- Total: O(n)
- Linear in input size

🎯 EDGE CASES:

CASE 1: Single rope
Input: [5]
Process: No connections needed
Result: 0
Output: 0

CASE 2: Two ropes
Input: [3, 7]
Process: Connect 3 and 7
Result: 3 + 7 = 10
Output: 10

CASE 3: All ropes same length
Input: [5, 5, 5, 5]
Process: Connect pairs, then results
Result: 10 + 10 + 20 = 40
Output: 40

CASE 4: Empty array
Input: []
Process: No ropes to connect
Result: 0
Output: 0

CASE 5: Ascending order
Input: [1, 2, 3, 4, 5]
Process: Connect smallest pairs first
Result: 3 + 6 + 9 + 15 = 33
Output: 33

🎯 ALGORITHM CORRECTNESS:
- Connects all ropes: ✓
- Minimizes total cost: ✓
- Uses optimal greedy strategy: ✓
- Handles all edge cases: ✓
- Efficient implementation: ✓

🎯 IMPLEMENTATION DETAILS:
- Line 95: Validate input
- Line 99: Create min heap
- Line 101-103: Insert all ropes
- Line 105-110: Greedy connection loop
- Line 112: Return total cost

🎯 HEAP OPERATIONS:

INSERTION:
- Add rope at end
- Bubble up to maintain heap property
- Time: O(log n)

EXTRACTION:
- Remove root element
- Replace with last element
- Heapify down to maintain property
- Time: O(log n)

This ensures efficient operations!

🎯 GREEDY STRATEGY LOGIC:
while(h.size >= 2){
    let sum = h.extractMin() + h.extractMin()
    cost += sum
    h.insert(sum)
}

This implements the optimal greedy approach!

🎯 ADVANTAGES:
- O(n log n) time complexity
- O(n) space complexity
- Optimal solution
- Simple implementation
- Efficient heap operations

🎯 DISADVANTAGES:
- Requires heap implementation
- More complex than naive approach
- Additional space for heap
- Not optimal for very small inputs

🎯 REAL-WORLD APPLICATIONS:
- Network cable management
- File compression (Huffman coding)
- Task scheduling
- Resource allocation
- Competitive programming
- System optimization

🎯 RELATED PROBLEMS:
- Huffman coding
- Minimum spanning tree
- Task scheduling
- Resource allocation
- Priority queue operations
- Greedy algorithms

🎯 TESTING STRATEGY:
- Single rope
- Two ropes
- All ropes same
- Ascending/descending order
- Random arrays
- Edge cases

🎯 DEBUGGING TIPS:
- Print heap state after each connection
- Trace cost accumulation
- Verify heap properties
- Check connection order
- Monitor heap size

🎯 COMMON MISTAKES:
- Not using greedy approach
- Wrong heap implementation
- Incorrect cost calculation
- Missing edge cases
- Wrong termination condition

🎯 BEST PRACTICES:
- Always connect smallest ropes first
- Use efficient heap implementation
- Handle all edge cases
- Verify cost calculation
- Test with various inputs

🎯 INTERVIEW TIPS:
- Explain greedy approach
- Discuss heap operations
- Show cost calculation
- Walk through example
- Analyze complexity
- Compare with alternatives

🎯 GREEDY CHOICE RATIONALE:
- Why smallest first? Minimizes future cost impact
- Smaller ropes contribute less to total cost
- Greedy choice is optimal for this problem
- Proof: Huffman coding algorithm

This ensures optimality!

🎯 CONNECTION STRATEGY:
1. Extract two smallest ropes
2. Calculate connection cost
3. Add cost to total
4. Insert new rope into heap
5. Repeat until one rope remains

This gives optimal performance!

🎯 COMPARISON WITH ALTERNATIVES:

NAIVE APPROACH:
function minCostNaive(arr) {
    let cost = 0;
    let ropes = [...arr];
    while(ropes.length > 1) {
        ropes.sort((a, b) => a - b);
        let sum = ropes[0] + ropes[1];
        cost += sum;
        ropes = [sum, ...ropes.slice(2)];
    }
    return cost;
}
- Time: O(n² log n)
- Space: O(n)
- Simple but inefficient

HEAP APPROACH:
- Time: O(n log n)
- Space: O(n)
- Optimal solution
- Efficient implementation

DYNAMIC PROGRAMMING:
- Time: O(n³)
- Space: O(n²)
- Overkill for this problem
- Not optimal

🎯 CONCLUSION:
Finding minimum cost of connecting ropes is efficiently achieved using greedy approach
with min heap, always connecting the two smallest ropes first to minimize total cost,
ensuring O(n log n) time complexity and O(n) space complexity, providing the optimal
solution for this problem!
*/