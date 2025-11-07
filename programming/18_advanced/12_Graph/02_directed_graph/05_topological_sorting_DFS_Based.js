/* Problem: ✅✅✅✅ Topological Sorting using DFS-Based Approach ✅✅✅✅

Given a Directed Acyclic Graph (DAG), find a topological ordering of its vertices using DFS.
A topological sort is a linear ordering of vertices such that for every directed edge (u, v),
vertex u comes before vertex v in the ordering. This algorithm uses DFS with a stack.

The problem requires:
- Find topological order of vertices in a DAG
- Use DFS-based approach with stack
- Process vertices depth-first
- Push vertex to stack after processing all its neighbors
- Return reversed stack order

You are given a directed graph with V vertices and E edges. Find a topological ordering
of vertices using DFS-based approach. The algorithm uses a stack to store vertices in
reverse order, then returns them in correct topological order.

Example 1:
Input: Graph with edges: 0→1, 0→2, 1→3, 2→3
Output: [0, 1, 2, 3] or [0, 2, 1, 3]
Explanation: 
- DFS from 0: explore 1, then 3, push 3, push 1, push 2, push 0
- Stack: [3, 1, 2, 0] → Reverse: [0, 2, 1, 3]
- Valid topological order

Example 2:
Input: Graph with edges: 0→1, 0→3, 1→2, 3→2
Output: [0, 1, 3, 2] or [0, 3, 1, 2]
Explanation:
- DFS processes vertices depth-first
- Stack stores vertices after processing neighbors
- Reverse stack gives topological order

Example 3:
Input: Graph with edges: 0→1, 1→2, 2→0 (cycle)
Output: Incorrect ordering (algorithm doesn't detect cycle)
Explanation:
- DFS will produce an ordering, but it's invalid due to cycle
- Need additional cycle detection for correctness
- This algorithm assumes DAG

Constraints:
- 1 ≤ V ≤ 10^4
- 0 ≤ E ≤ 10^5
- Graph may contain cycles (but algorithm assumes DAG)

Expected Complexities:
Time Complexity: O(V + E) - using DFS traversal
Auxiliary Space: O(V) - for visited array, recursion stack, and result stack
*/

class DirectedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        this.indegree = new Array(V).fill(0); // Track in-degree of each vertex
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(1)
    addEdge(from, to){
        this.adj[from].push(to); // Only add one direction for directed graph
        this.indegree[to]++; // Increment in-degree of destination vertex
    }
    
    // ✅ TC = O(V)
    getIndegree(vertex){
        return this.indegree[vertex];
    }

    // ✅ TC = O(V + E) - DFS traversal
    // ✅ SC = O(V) - visited array, recursion stack, result stack
    topologicalSortDFSBased(){
        // 1. Initialize visited array to track visited vertices
        const visited = new Array(this.V).fill(false);
        
        // 2. Stack to store vertices in reverse order
        const st = [];

        // 3. Perform DFS for all unvisited vertices
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){
                this.DFSHelper(i, visited, st);
            }
        }

        // 4. Reverse stack to get topological order
        const result = [];
        while(st.length > 0){
            result.push(st.pop());
        }
        
        return result;
    }

    // Helper function to perform DFS and store the result in the stack
    // Push vertex to stack AFTER processing all its neighbors (post-order)
    DFSHelper(u, visited, st){
        visited[u] = true; // Mark the vertex as visited
        
        // Process all neighbors first (depth-first)
        for(let v of this.adj[u]){
            if(!visited[v]){ // If adjacent vertex(v) not visited, then visit it
                this.DFSHelper(v, visited, st); // Recursively visit the adjacent vertex
            }
        }
        
        // Push vertex to stack AFTER processing all neighbors
        // This ensures dependencies are processed before the vertex
        st.push(u);
    }
    
    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" ") + ` (indegree: ${this.indegree[i]})`);
        }
    }
}

// Test cases
let g1 = new DirectedGraph(4);
g1.addEdge(0, 1);
g1.addEdge(0, 2);
g1.addEdge(1, 3);
g1.addEdge(2, 3);
console.log("Test 1:", g1.topologicalSortDFSBased()); // [0, 1, 2, 3] or [0, 2, 1, 3]

let g2 = new DirectedGraph(4);
g2.addEdge(0, 1);
g2.addEdge(0, 3);
g2.addEdge(1, 2);
g2.addEdge(3, 2);
console.log("Test 2:", g2.topologicalSortDFSBased()); // [0, 1, 3, 2] or [0, 3, 1, 2]

let g3 = new DirectedGraph(3);
g3.addEdge(0, 1);
g3.addEdge(1, 2);
console.log("Test 3:", g3.topologicalSortDFSBased()); // [0, 1, 2]

/*🎯 CORE IDEA: Use DFS-based approach with stack to find topological ordering of a DAG.
Perform DFS traversal, and after processing all neighbors of a vertex (post-order), push it
to a stack. The stack will contain vertices in reverse topological order. Reverse the stack
to get the correct topological ordering. This ensures vertices with dependencies are processed
before vertices that depend on them.

📋 STEP-BY-STEP FLOW:

1️⃣ VISITED ARRAY INITIALIZATION:
   - Create visited array to track visited vertices
   - Initialize all vertices as unvisited
   - Prevents revisiting vertices
   - Ensures each vertex processed once

2️⃣ STACK INITIALIZATION:
   - Create empty stack
   - Stack stores vertices in reverse order
   - Will be reversed at end
   - Temporary storage during DFS

3️⃣ DFS TRAVERSAL:
   - Perform DFS for all unvisited vertices
   - Ensures disconnected components processed
   - Start from each unvisited vertex
   - Complete graph traversal

4️⃣ DFS HELPER (POST-ORDER):
   - Mark current vertex as visited
   - Recursively process all neighbors first
   - After all neighbors processed, push vertex to stack
   - Post-order ensures dependencies processed first

5️⃣ RESULT GENERATION:
   - Reverse stack to get topological order
   - Stack contains vertices in reverse order
   - Reversing gives correct ordering
   - Return topological order

🧠 WHY THIS APPROACH?
- DFS naturally explores dependencies
- Post-order ensures dependencies processed first
- Stack reversal gives correct order
- O(V + E) time complexity
- Simple recursive implementation

💡 KEY INSIGHTS:
- Push vertex to stack AFTER processing neighbors (post-order)
- Stack stores vertices in reverse topological order
- Reverse stack to get correct ordering
- DFS handles disconnected components
- Natural dependency resolution
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE 1: Topological Sort using DFS

INPUT: Graph with edges: 0→1, 0→2, 1→3, 2→3
EXPECTED OUTPUT: [0, 2, 1, 3] or [0, 1, 2, 3]

Graph representation:
    0
   / \
  1   2
   \ /
    3

🎯 GOAL: Find topological ordering using DFS!

🔍 STEP-BY-STEP PROCESS:

DFS TRAVERSAL:

CALL 1: DFSHelper(0)
visited[0] = true
Process neighbors: [1, 2]

CALL 2: DFSHelper(1)
visited[1] = true
Process neighbors: [3]

CALL 3: DFSHelper(3)
visited[3] = true
Process neighbors: [] (no neighbors)
Stack.push(3) → Stack: [3]
Return from DFSHelper(3)

Back to DFSHelper(1):
All neighbors processed
Stack.push(1) → Stack: [3, 1]
Return from DFSHelper(1)

CALL 4: DFSHelper(2)
visited[2] = true
Process neighbors: [3]
visited[3] is true (already processed), skip

Back to DFSHelper(2):
All neighbors processed
Stack.push(2) → Stack: [3, 1, 2]
Return from DFSHelper(2)

Back to DFSHelper(0):
All neighbors processed
Stack.push(0) → Stack: [3, 1, 2, 0]
Return from DFSHelper(0)

STEP: Reverse Stack
Stack: [3, 1, 2, 0]
Reversed: [0, 2, 1, 3]

🏆 FINAL RESULT: [0, 2, 1, 3]
Valid topological order!

─────────────────────────────────────────

📊 EXAMPLE 2: Different DFS Path

INPUT: Graph with edges: 0→1, 0→3, 1→2, 3→2
EXPECTED OUTPUT: [0, 3, 1, 2] or [0, 1, 3, 2]

Graph representation:
    0
   / \
  1   3
   \ /
    2

DFS TRAVERSAL:

DFSHelper(0):
  visited[0] = true
  Process neighbors: [1, 3]
  
  DFSHelper(1):
    visited[1] = true
    Process neighbors: [2]
    
    DFSHelper(2):
      visited[2] = true
      Process neighbors: [] (no neighbors)
      Stack.push(2) → Stack: [2]
    
    Stack.push(1) → Stack: [2, 1]
  
  DFSHelper(3):
    visited[3] = true
    Process neighbors: [2]
    visited[2] is true, skip
    
    Stack.push(3) → Stack: [2, 1, 3]
  
  Stack.push(0) → Stack: [2, 1, 3, 0]

Reverse: [0, 3, 1, 2]

🏆 RESULT: [0, 3, 1, 2]

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

DFS CALL STACK FOR 0→1, 0→2, 1→3, 2→3:

DFSHelper(0)
  ├─ visited[0] = true
  ├─ DFSHelper(1)
  │    ├─ visited[1] = true
  │    ├─ DFSHelper(3)
  │    │    ├─ visited[3] = true
  │    │    └─ Stack.push(3) ✓
  │    └─ Stack.push(1) ✓
  ├─ DFSHelper(2)
  │    ├─ visited[2] = true
  │    └─ Stack.push(2) ✓
  └─ Stack.push(0) ✓

Stack progression: [] → [3] → [3, 1] → [3, 1, 2] → [3, 1, 2, 0]
Reversed: [0, 2, 1, 3]

─────────────────────────────────────────

📊 POST-ORDER PROCESSING:

WHY PUSH AFTER PROCESSING NEIGHBORS?

- If we push before: vertex appears before its dependencies (wrong)
- If we push after: dependencies appear before vertex (correct)

EXAMPLE:
Edge: 1 → 2
- Process 1, then process 2
- Push 2 first (dependencies first)
- Push 1 second (dependents second)
- Stack: [2, 1] → Reversed: [1, 2] ✓

This ensures correct ordering!

─────────────────────────────────────────

📊 ALGORITHM ANALYSIS:

TIME COMPLEXITY:
- Initialize visited: O(V)
- DFS traversal: O(V + E)
- Reverse stack: O(V)
- Total: O(V + E)

SPACE COMPLEXITY:
- Visited array: O(V)
- Recursion stack: O(V)
- Result stack: O(V)
- Total: O(V)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:

1️⃣ DFS TRAVERSAL:
   - Explores graph depth-first
   - Natural recursive structure
   - Processes dependencies before dependents
   - Handles disconnected components

2️⃣ POST-ORDER PROCESSING:
   - Process all neighbors first
   - Push vertex after neighbors
   - Ensures dependencies processed first
   - Correct ordering guaranteed

3️⃣ STACK USAGE:
   - Stack stores vertices in reverse order
   - Last vertex processed (no dependencies) at top
   - First vertex (most dependencies) at bottom
   - Reversing gives correct order

4️⃣ VISITED TRACKING:
   - Prevents revisiting vertices
   - Each vertex processed once
   - Ensures O(V + E) complexity
   - Handles cycles gracefully (but produces invalid result)

5️⃣ RESULT GENERATION:
   - Reverse stack to get ordering
   - Stack contains reverse topological order
   - Reversing gives correct order
   - Valid topological sort

💡 KEY INSIGHT:
Using DFS with post-order processing, pushing vertices to stack after processing all neighbors,
ensuring dependencies are processed first. The stack contains vertices in reverse topological
order, which when reversed gives the correct topological ordering with O(V + E) time complexity!

🎯 TIME COMPLEXITY ANALYSIS:
- Initialize visited: O(V)
- DFS traversal: O(V + E)
- Reverse stack: O(V)
- Total: O(V + E)
- Optimal for this problem

🎯 SPACE COMPLEXITY ANALYSIS:
- Visited array: O(V)
- Recursion stack: O(V)
- Result stack: O(V)
- Total: O(V)
- Linear in number of vertices

🎯 EDGE CASES:

CASE 1: Single vertex
Input: Graph with 1 vertex, no edges
Process: DFS from 0, push 0
Stack: [0], Reversed: [0]
Output: [0]

CASE 2: No edges (disconnected vertices)
Input: Graph with 3 vertices, no edges
Process: DFS from each, push in order
Stack: [2, 1, 0], Reversed: [0, 1, 2]
Output: [0, 1, 2] (or any permutation)

CASE 3: Linear graph (chain)
Input: Graph with edges: 0→1→2→3
Process: DFS follows chain
Stack: [3, 2, 1, 0], Reversed: [0, 1, 2, 3]
Output: [0, 1, 2, 3]

CASE 4: Disconnected components
Input: Graph with edges: 0→1, 2→3
Process: DFS from 0 and 2 separately
Stack: [1, 0, 3, 2], Reversed: [2, 3, 0, 1]
Output: [2, 3, 0, 1] (valid)

CASE 5: Graph with cycle (invalid)
Input: Graph with edges: 0→1, 1→2, 2→0
Process: DFS produces ordering, but invalid
Output: [0, 2, 1] (invalid due to cycle)

🎯 ALGORITHM CORRECTNESS:
- Produces valid topological order for DAG: ✓
- Handles disconnected components: ✓
- Processes dependencies first: ✓
- O(V + E) time complexity: ✓
- Does not detect cycles: ✗

🎯 IMPLEMENTATION DETAILS:
- Line 78: Initialize visited array
- Line 80-81: Initialize stack
- Line 83-87: DFS for all unvisited vertices
- Line 89-94: Reverse stack to get result
- Line 97-110: DFS helper with post-order processing

🎯 DFS OPERATIONS:

PRE-ORDER (WRONG):
DFSHelper(u) {
  visited[u] = true
  st.push(u) // Push before processing neighbors
  for each neighbor v:
    if not visited[v]:
      DFSHelper(v)
}
- Vertex appears before dependencies
- Incorrect ordering

POST-ORDER (CORRECT):
DFSHelper(u) {
  visited[u] = true
  for each neighbor v:
    if not visited[v]:
      DFSHelper(v)
  st.push(u) // Push after processing neighbors
}
- Dependencies appear before vertex
- Correct ordering

This ensures correctness!

🎯 STACK REVERSAL LOGIC:

WHY REVERSE?

Stack after DFS: [last, ..., first]
- Last vertex: processed last (no outgoing edges)
- First vertex: processed first (most dependencies)
- Topological order: first → last
- Reversing gives correct order

Example:
Stack: [3, 1, 2, 0]
Reversed: [0, 2, 1, 3] ✓

This gives correct ordering!

🎯 ADVANTAGES:
- O(V + E) time complexity
- O(V) space complexity
- Simple recursive implementation
- Natural DFS structure
- Handles disconnected components

🎯 DISADVANTAGES:
- Does not detect cycles
- Requires stack reversal
- Recursion stack overhead
- Not intuitive (post-order)
- Multiple valid orders possible

🎯 REAL-WORLD APPLICATIONS:
- Task scheduling
- Build system dependencies
- Course prerequisites
- Package management
- Event ordering
- Project management

🎯 RELATED PROBLEMS:
- Topological sort (Kahn's algorithm)
- Cycle detection in directed graph
- Longest path in DAG
- Critical path method
- Dependency resolution
- Course schedule problems

🎯 TESTING STRATEGY:
- Single vertex
- Linear graph
- Tree structure
- Complex DAG
- Disconnected components
- Edge cases

🎯 DEBUGGING TIPS:
- Print visited array
- Trace DFS call stack
- Monitor stack operations
- Check post-order processing
- Verify stack reversal

🎯 COMMON MISTAKES:
- Pushing before processing neighbors (pre-order)
- Not reversing stack
- Using `this` incorrectly in helper
- Not handling disconnected components
- Assuming cycle detection

🎯 BEST PRACTICES:
- Use post-order processing
- Always reverse stack
- Handle disconnected components
- Track visited vertices
- Test with various graphs

🎯 INTERVIEW TIPS:
- Explain post-order concept clearly
- Walk through example step by step
- Discuss stack reversal
- Analyze time/space complexity
- Compare with Kahn's algorithm
- Mention cycle detection limitation

🎯 POST-ORDER RATIONALE:

WHY AFTER PROCESSING NEIGHBORS?

- Topological order requires: if u→v, then u before v
- Post-order ensures: v processed before u
- Stack stores in reverse: v before u in stack
- Reversing gives: u before v in result
- Correct ordering!

Example:
Edge: 1 → 2
- Process 1, then 2
- Push 2, then push 1
- Stack: [2, 1]
- Reverse: [1, 2] ✓

This ensures correctness!

🎯 DFS VS KAHN'S ALGORITHM:

DFS APPROACH:
- Uses recursion/stack
- Post-order processing
- Requires stack reversal
- Does not detect cycles
- O(V + E) time

KAHN'S (BFS):
- Uses queue
- Level-by-level processing
- No reversal needed
- Detects cycles (count < V)
- O(V + E) time

Both valid, different approaches!

🎯 CYCLE HANDLING:

LIMITATION:
- DFS algorithm does not detect cycles
- Will produce ordering even for cyclic graphs
- Ordering will be invalid
- Need additional cycle detection

SOLUTION:
- Add recursion stack tracking
- Detect back edges (gray vertices)
- Return null if cycle detected
- Or use Kahn's algorithm

This is a limitation to be aware of!

🎯 COMPARISON WITH ALTERNATIVES:

NAIVE APPROACH:
- Try all permutations
- Check validity
- Time: O(V! * E)
- Very inefficient

DFS APPROACH:
- Use DFS with stack
- Post-order processing
- Time: O(V + E)
- Space: O(V)
- Simple but no cycle detection

KAHN'S ALGORITHM:
- BFS-based
- Level-by-level
- Time: O(V + E)
- Space: O(V)
- Cycle detection built-in

🎯 CONCLUSION:
Topological sorting using DFS-based approach is efficiently achieved by performing DFS traversal
with post-order processing, pushing vertices to stack after processing all neighbors, ensuring
dependencies are processed first. The stack contains vertices in reverse topological order,
which when reversed gives the correct topological ordering with O(V + E) time complexity and
O(V) space complexity, providing an alternative to Kahn's algorithm for topological sorting!
*/
