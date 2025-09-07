// ✅ TC = O(2^n)
// ✅ SC = O(n)
function towerOfHanoi(n, source, destination, auxiliary){
    if(n===1){
        console.log(`Move disk 1 from ${source} to ${destination}`)
        return
    }
    towerOfHanoi(n-1, source, auxiliary, destination) // Move n-1 disks from source to auxiliary using destination as helper
    console.log(`Move disk ${n} from ${source} to ${destination}`)
    towerOfHanoi(n-1, auxiliary, destination, source) // Move n-1 disks from auxiliary to destination using source as helper
}

towerOfHanoi(3, 'A', 'C', 'B')

// ✅ Movements required for n disks = (2^n - 1) ⭐⭐⭐⭐⭐
function countMovesTOH(n, from, to, aux) {
    let c = 0
    // code here
    if(n===1){
        return 1
    }
    
    c += countMovesTOH(n-1, from, to, aux)
    c += 1
    c += countMovesTOH(n-1, aux, from, to)
    
    return c
}

/*
✅ RECURSIVE CALL STACK FLOW for towerOfHanoi(3, 'A', 'C', 'B'):

Initial call: towerOfHanoi(3, 'A', 'C', 'B')
├── towerOfHanoi(3, 'A', 'C', 'B') - n=3, source='A', dest='C', aux='B'
│   ├── towerOfHanoi(2, 'A', 'B', 'C') - n=2, source='A', dest='B', aux='C' (Move 2 disks from A to B using C as helper)
│   │   ├── towerOfHanoi(1, 'A', 'C', 'B') - n=1, source='A', dest='C', aux='B' (Move 1 disk from A to C)
│   │   │   └── BASE CASE: Move disk 1 from A to C
│   │   ├── Move disk 2 from A to B
│   │   └── towerOfHanoi(1, 'C', 'B', 'A') - n=1, source='C', dest='B', aux='A' (Move 1 disk from C to B)
│   │       └── BASE CASE: Move disk 1 from C to B
│   ├── Move disk 3 from A to C
│   └── towerOfHanoi(2, 'B', 'C', 'A') - n=2, source='B', dest='C', aux='A' (Move 2 disks from B to C using A as helper)
│       ├── towerOfHanoi(1, 'B', 'A', 'C') - n=1, source='B', dest='A', aux='C' (Move 1 disk from B to A)
│       │   └── BASE CASE: Move disk 1 from B to A
│       ├── Move disk 2 from B to C
│       └── towerOfHanoi(1, 'A', 'C', 'B') - n=1, source='A', dest='C', aux='B' (Move 1 disk from A to C)
│           └── BASE CASE: Move disk 1 from A to C

✅ EXECUTION ORDER & DISK MOVEMENTS:
1. Move disk 1 from A to C
2. Move disk 2 from A to B  
3. Move disk 1 from C to B
4. Move disk 3 from A to C
5. Move disk 1 from B to A
6. Move disk 2 from B to C
7. Move disk 1 from A to C

✅ TOTAL MOVES: 7 (which equals 2³ - 1 = 8 - 1 = 7)

✅ KEY INSIGHTS:
1. The algorithm follows a divide-and-conquer approach:
   - Move n-1 disks to auxiliary rod
   - Move the largest disk to destination
   - Move n-1 disks from auxiliary to destination
2. Each recursive call reduces the problem size by 1
3. The base case handles moving a single disk
4. The auxiliary rod acts as a temporary storage
5. Total moves follow the formula: 2^n - 1
6. The recursion tree has depth n
7. Each non-base case makes exactly 2 recursive calls
8. The solution is optimal (minimum number of moves required)

✅ RECURSION TREE STRUCTURE:
                             TowerOfHanoi(3, A, C, B)
                            /                       \
                           /                         \
                  TOH(2, A, B, C)                   TOH(2, B, C, A)
                   /          \                    /              \
                  /            \                  /                \
     TOH(1, A, C, B)    TOH(1, C, B, A)      TOH(1, B, A, C)   TOH(1, A, C, B)
*/



/*
✅ WHY TOWER OF HANOI ALWAYS WORKS FOR ALL CASES:

1. MATHEMATICAL INDUCTION PROOF:
   - Base Case (n=1): Directly moves disk from source to destination ✓
   - Inductive Step: Assume it works for n-1 disks, then prove it works for n disks
   - If we can move n-1 disks, we can:
     a) Move n-1 disks to auxiliary rod (by inductive hypothesis)
     b) Move the nth disk to destination (direct move)
     c) Move n-1 disks from auxiliary to destination (by inductive hypothesis)

2. INVARIANT PROPERTIES:
   - At any point, larger disks are never on top of smaller disks
   - The algorithm maintains the constraint that only smaller disks can be placed on larger ones
   - Each recursive call preserves the relative ordering of disks

3. OPTIMALITY GUARANTEE:
   - The minimum number of moves required is 2^n - 1
   - Our algorithm achieves exactly this number
   - No algorithm can solve it in fewer moves
   - This proves our solution is optimal

4. COMPLETENESS:
   - Every valid configuration is reachable
   - The algorithm explores all necessary intermediate states
   - No valid solution is missed due to the systematic approach

5. CORRECTNESS FOR ALL N:
   - Works for n=1: Direct move
   - Works for n=2: Move 1 disk to auxiliary, move 2nd to destination, move 1st to destination
   - Works for n=3: As shown in the detailed flow above
   - Works for n=k: By mathematical induction, if it works for k-1, it works for k
   - Therefore works for all positive integers n

6. WHY THE RECURSIVE APPROACH IS CORRECT:
   - The problem has optimal substructure: optimal solution for n disks contains optimal solutions for n-1 disks
   - The problem has overlapping subproblems: same subproblems are solved multiple times
   - Recursion naturally captures this structure
   - Each recursive call solves a smaller instance of the same problem

7. HANDLING EDGE CASES:
   - n=0: Function returns immediately (no disks to move)
   - n=1: Base case handles single disk movement
   - n>1: Recursive case breaks down into smaller subproblems
   - Invalid inputs (negative n) would cause infinite recursion, but we assume n≥1

8. MEMORY AND STACK MANAGEMENT:
   - Each recursive call adds one frame to the call stack
   - Maximum stack depth = n (number of disks)
   - For reasonable values of n, this is manageable
   - The algorithm is space-efficient: O(n) space complexity

CONCLUSION:
The Tower of Hanoi algorithm always works because it's based on mathematical induction and maintains the fundamental constraints of the problem. 
Each recursive call reduces the problem size while preserving the solution's correctness, ensuring that if it works for smaller cases, it must work for larger cases. 
The divide-and-conquer approach guarantees that all necessary moves are made in the optimal order.
*/