/* Problem: ✅✅✅✅ Two Stacks in One Array ✅✅✅✅

Implement two stacks in a single array efficiently.

Given an array of size n, implement two stacks such that:
- Stack1 starts from the beginning of the array (index 0)
- Stack2 starts from the end of the array (index n-1)
- Both stacks can grow towards each other
- No overflow occurs until the entire array is full

Example 1:
Input: capacity = 4
Operations:
- push1(10) → true
- push2(50) → true  
- push1(20) → true
- push1(30) → true
- push2(40) → false (overflow)
- pop1() → 30
- pop2() → 50
- pop2() → null (underflow)

Example 2:
Input: capacity = 6
Operations:
- push1(1), push1(2), push1(3) → all true
- push2(6), push2(5), push2(4) → all true
- push1(7) → false (overflow)
- pop1() → 3, pop2() → 4

Constraints:
- 1 <= capacity <= 10^6
- -10^9 <= value <= 10^9
- At most 10^5 operations will be performed

Expected Time Complexity: O(1) for all operations
Expected Auxiliary Space: O(1) for all operations
*/

class TwoStack{
    constructor(n){
        this.cap = n
        this.arr = new Array(n)
        this.top1 = -1
        this.top2 = n
    }
    
    push1(x){
        if(this.top1 < this.top2 -1){
            this.top1 += 1 // increasing index to right side
            this.arr[this.top1] = x
            return true
        }
        return false
    }
    push2(x){
        if(this.top1 < this.top2 - 1){
            
        this.top2 -= 1 // adding element, so increasing index to left side
        this.arr[this.top2] = x
        return true
        }
        return false
    }
    pop1(){
        if(this.top1 === -1) return null
        let res = this.arr[this.top1]
        this.top1 -= 1
        return res
    }
    pop2(){
        if(this.top2 === this.cap) return null
        let res = this.arr[this.top2]
        this.top2 += 1
        return res
    }
    size1(){
        return this.top1 + 1
    }
    size2(){
        return this.cap - this.top2
    }
}

const ts = new TwoStack(4)
console.log(ts.push1(10)) // true
console.log(ts.push2(50)) // true
console.log(ts.push1(20)) // true
console.log(ts.push1(30)) // true
console.log(ts.push2(40)) // false
console.log(ts.pop1()) // 30
console.log(ts.pop2()) // 50
console.log(ts.pop2()) // null

/*🎯 CORE IDEA: Implement two stacks in a single array by having them grow towards each other from opposite ends.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create array of size n
   - top1 = -1 (Stack1 starts from left, grows right)
   - top2 = n (Stack2 starts from right, grows left)

2️⃣ PUSH OPERATIONS:
   - push1(x): Check if top1 < top2-1, then increment top1 and store x
   - push2(x): Check if top1 < top2-1, then decrement top2 and store x
   - Overflow when top1 >= top2-1

3️⃣ POP OPERATIONS:
   - pop1(): Check if top1 >= 0, return arr[top1] and decrement top1
   - pop2(): Check if top2 < cap, return arr[top2] and increment top2
   - Underflow when stack is empty

4️⃣ SIZE OPERATIONS:
   - size1(): Return top1 + 1
   - size2(): Return cap - top2

🧠 WHY THIS APPROACH?
- Space efficient: Uses single array for both stacks
- Optimal time complexity: O(1) for all operations
- Flexible: Stacks can grow independently until array is full
- Simple: Easy to implement and understand

💡 KEY INSIGHTS:
- Two pointers approach: top1 grows right, top2 grows left
- Overflow condition: top1 >= top2-1
- Underflow conditions: top1 < 0 for Stack1, top2 >= cap for Stack2
- Space utilization: Maximum when stacks meet in middle
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: capacity = 4
INPUT: TwoStack(4)

🎯 GOAL: Implement two stacks in one array!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
arr = [_, _, _, _] (size 4)
top1 = -1 (Stack1 pointer)
top2 = 4 (Stack2 pointer)

📋 OPERATION SEQUENCE:

OPERATION 1: push1(10)
Condition: top1 < top2-1 → -1 < 3 ✓
top1 = -1 + 1 = 0
arr[0] = 10
arr = [10, _, _, _]
top1 = 0, top2 = 4
Result: true

OPERATION 2: push2(50)
Condition: top1 < top2-1 → 0 < 3 ✓
top2 = 4 - 1 = 3
arr[3] = 50
arr = [10, _, _, 50]
top1 = 0, top2 = 3
Result: true

OPERATION 3: push1(20)
Condition: top1 < top2-1 → 0 < 2 ✓
top1 = 0 + 1 = 1
arr[1] = 20
arr = [10, 20, _, 50]
top1 = 1, top2 = 3
Result: true

OPERATION 4: push1(30)
Condition: top1 < top2-1 → 1 < 2 ✓
top1 = 1 + 1 = 2
arr[2] = 30
arr = [10, 20, 30, 50]
top1 = 2, top2 = 3
Result: true

OPERATION 5: push2(40)
Condition: top1 < top2-1 → 2 < 2 ✗
Overflow condition met!
Result: false

OPERATION 6: pop1()
Condition: top1 >= 0 → 2 >= 0 ✓
res = arr[2] = 30
top1 = 2 - 1 = 1
arr = [10, 20, _, 50]
top1 = 1, top2 = 3
Result: 30

OPERATION 7: pop2()
Condition: top2 < cap → 3 < 4 ✓
res = arr[3] = 50
top2 = 3 + 1 = 4
arr = [10, 20, _, _]
top1 = 1, top2 = 4
Result: 50

OPERATION 8: pop2()
Condition: top2 < cap → 4 < 4 ✗
Underflow condition met!
Result: null

🏆 FINAL STATE:
arr = [10, 20, _, _]
top1 = 1, top2 = 4
Stack1: [10, 20] (size = 2)
Stack2: [] (size = 0)

─────────────────────────────────────────

📊 SECOND EXAMPLE: capacity = 6
INPUT: TwoStack(6)

🔍 OPERATION SEQUENCE:

INITIALIZATION:
arr = [_, _, _, _, _, _] (size 6)
top1 = -1, top2 = 6

OPERATIONS:
1. push1(1) → arr = [1, _, _, _, _, _], top1=0, top2=6
2. push1(2) → arr = [1, 2, _, _, _, _], top1=1, top2=6
3. push1(3) → arr = [1, 2, 3, _, _, _], top1=2, top2=6
4. push2(6) → arr = [1, 2, 3, _, _, 6], top1=2, top2=5
5. push2(5) → arr = [1, 2, 3, _, 5, 6], top1=2, top2=4
6. push2(4) → arr = [1, 2, 3, 4, 5, 6], top1=2, top2=3
7. push1(7) → Condition: 2 < 2 ✗ → Overflow!
8. pop1() → arr = [1, 2, _, 4, 5, 6], top1=1, top2=3
9. pop2() → arr = [1, 2, _, _, 5, 6], top1=1, top2=4

🏆 FINAL STATE:
Stack1: [1, 2] (size = 2)
Stack2: [5, 6] (size = 2)

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

INITIAL STATE (capacity = 4):
┌─────┬─────┬─────┬─────┐
│  _  │  _  │  _  │  _  │
└─────┴─────┴─────┴─────┘
↑                   ↑
top1=-1           top2=4
Stack1            Stack2
(left)            (right)

AFTER push1(10), push2(50):
┌─────┬─────┬─────┬─────┐
│ 10  │  _  │  _  │ 50  │
└─────┴─────┴─────┴─────┘
↑                   ↑
top1=0            top2=3
Stack1            Stack2

AFTER push1(20), push1(30):
┌─────┬─────┬─────┬─────┐
│ 10  │ 20  │ 30  │ 50  │
└─────┴─────┴─────┴─────┘
↑         ↑       ↑
top1=2    top2=3
Stack1    Stack2
FULL ARRAY - OVERFLOW!

AFTER pop1(), pop2():
┌─────┬─────┬─────┬─────┐
│ 10  │ 20  │  _  │  _  │
└─────┴─────┴─────┴─────┘
↑                   ↑
top1=1            top2=4
Stack1            Stack2

─────────────────────────────────────────

📊 OVERFLOW CONDITIONS:

CASE 1: Stack1 grows too much
┌─────┬─────┬─────┬─────┐
│ 10  │ 20  │ 30  │  _  │
└─────┴─────┴─────┴─────┘
↑         ↑
top1=2   top2=3
Condition: top1 < top2-1 → 2 < 2 ✗

CASE 2: Stack2 grows too much
┌─────┬─────┬─────┬─────┐
│  _  │ 20  │ 30  │ 40  │
└─────┴─────┴─────┴─────┘
↑         ↑
top1=0   top2=1
Condition: top1 < top2-1 → 0 < 0 ✗

CASE 3: Both stacks meet
┌─────┬─────┬─────┬─────┐
│ 10  │ 20  │ 30  │ 40  │
└─────┴─────┴─────┴─────┘
↑         ↑
top1=1   top2=2
Condition: top1 < top2-1 → 1 < 1 ✗

─────────────────────────────────────────

📊 UNDERFLOW CONDITIONS:

STACK1 UNDERFLOW:
┌─────┬─────┬─────┬─────┐
│  _  │  _  │  _  │  _  │
└─────┴─────┴─────┴─────┘
↑                   ↑
top1=-1           top2=4
Condition: top1 >= 0 → -1 >= 0 ✗

STACK2 UNDERFLOW:
┌─────┬─────┬─────┬─────┐
│ 10  │ 20  │ 30  │  _  │
└─────┴─────┴─────┴─────┘
↑                   ↑
top1=2            top2=4
Condition: top2 < cap → 4 < 4 ✗

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ SPACE EFFICIENCY: Single array for both stacks
2️⃣ OPTIMAL TIME: O(1) for all operations
3️⃣ FLEXIBLE GROWTH: Stacks grow independently
4️⃣ SIMPLE LOGIC: Easy overflow/underflow detection
5️⃣ MAXIMUM UTILIZATION: Uses entire array capacity

💡 KEY INSIGHT:
Two stacks growing towards each other maximizes space utilization
while maintaining O(1) time complexity for all operations!

🎯 TIME COMPLEXITY ANALYSIS:
- push1/push2: O(1) - constant time operations
- pop1/pop2: O(1) - constant time operations  
- size1/size2: O(1) - simple arithmetic
- All operations are optimal

🎯 SPACE COMPLEXITY ANALYSIS:
- Array: O(n) where n is capacity
- Pointers: O(1) - only top1, top2, cap
- Total: O(n) - optimal for two stacks

🎯 EDGE CASES HANDLED:
- Empty stacks (underflow)
- Full array (overflow)
- Single element operations
- Maximum capacity utilization
- Boundary conditions

🎯 ALGORITHM CORRECTNESS:
- Guaranteed overflow detection
- Guaranteed underflow detection
- Maintains stack properties (LIFO)
- Optimal space utilization
- Handles all edge cases

🎯 IMPLEMENTATION DETAILS:
- Overflow: top1 >= top2-1
- Underflow Stack1: top1 < 0
- Underflow Stack2: top2 >= cap
- Size calculation: top1+1, cap-top2
- Array indexing: 0-based

🎯 SPACE UTILIZATION PATTERNS:
- Best case: Equal distribution (50-50)
- Worst case: One stack dominates
- Average case: Depends on usage pattern
- Maximum: 100% array utilization

🎯 COMPARISON WITH SEPARATE STACKS:
- Space: Same O(n) but shared array
- Time: Same O(1) for all operations
- Flexibility: Better space utilization
- Complexity: Slightly more complex logic

🎯 REAL-WORLD APPLICATIONS:
- Memory management systems
- Dual-ended data structures
- Space-constrained environments
- Efficient resource allocation

🎯 OPTIMIZATION TECHNIQUES:
- Dynamic resizing (advanced)
- Circular buffer approach
- Memory pooling
- Cache-friendly access patterns ✅✅✅✅✅✅✅✅

🎯 STACK PROPERTIES MAINTAINED:
- LIFO (Last In, First Out)
- Push/Pop operations
- Size tracking
- Overflow/Underflow detection
- Independent operation

🎯 BOUNDARY CONDITIONS:
- Empty array initialization
- Single element operations
- Maximum capacity reached
- Minimum capacity (size 1)
- Edge pointer values

🎯 ERROR HANDLING:
- Overflow: Return false
- Underflow: Return null
- Invalid input: Handle gracefully
- Boundary checks: Comprehensive
- State validation: Consistent
*/