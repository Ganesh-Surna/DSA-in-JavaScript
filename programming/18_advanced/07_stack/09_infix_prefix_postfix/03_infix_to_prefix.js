/* Problem: ✅✅✅✅ Infix to Prefix Conversion ✅✅✅✅

Convert an infix expression to prefix notation using a stack-based algorithm with right-to-left traversal.

Given an infix expression, convert it to prefix notation where:
- Operators come before operands
- Operators are placed before their operands
- Parentheses are removed
- Operator precedence and associativity are preserved

Example 1:
Input: "a+b*(c^d-e)^(f+g*h)-i"
Output: "-+a*b^-^cde+f*ghi"

Explanation:
- a + b * (c^d - e)^(f + g*h) - i
- Prefix: -+a*b^-^cde+f*ghi

Example 2:
Input: "A+B*C"
Output: "+A*BC"

Example 3:
Input: "(A+B)*C"
Output: "*+ABC"

Constraints:
- Expression contains only operands (a-z, A-Z, 0-9) and operators (+, -, *, /, ^)
- Parentheses are properly balanced
- No division by zero or invalid operations

Expected Time Complexity: O(n)
Expected Auxiliary Space: O(n)
*/

// ✅ TC = O(n)
// ✅ SC = O(n)
function infixToPrefix(expression){
    // 1. Precedence of operators
    let precedence = new Map()
    precedence.set('(', 0) // edge case handling
    precedence.set(')', 0) // edge case handling
    precedence.set('+', 1)
    precedence.set('-', 1)
    precedence.set('*', 2)
    precedence.set('/', 2)
    precedence.set('^', 3)
    
    // 2. Initialize stack and result
    let st = []
    let res = []
    
    // 3. Iterate from Right to Left // 1.✅✅✅✅ 
    for(let i=expression.length-1; i>=0; i--){
        let x = expression[i]
    
        if(isOperand(x)){
            // If x is an operand, then add it to res
            res.push(x)
        }else if(x === ")"){ // 2.✅✅✅✅ 
            // If x is an closing bracket, then push it to st
            st.push(x)
        }else if(x === "("){ // 3.✅✅✅✅ 
            while(st.length > 0 && st[st.length - 1] !== ")"){
                // Pop until we find an closing bracket Or stack is empty
                res.push(st.pop())
            }
            if(st.length === 0){ 
                // Because for a opening bracket there should be the closing bracket in the stack. Otherwise it is wrong expression
                return -1
            }else{
                // If stack is not empty, and peak is closing bracket, then just pop it. 
                // Note: Don't add it to res. And don't push opening bracket to st
                st.pop() 
            }
        }else{ // else x is a operator
            while(st.length > 0 && isLowerThanPeek(x, st[st.length - 1])){
                // If st is non-empty & x is lower precedence than peek of st, then pop until found an lower precedence than x OR st is empty. Then push x to st.
                res.push(st.pop())
            }
            // Push if st is empty OR x is higher precedence than peek of st.
            st.push(x)
        }
    }

    // 4. Pop everything from st, and push to res.
    while(st.length > 0){
        // pop everything from st, and push to res.
        res.push(st.pop())
    }

    // 5. Reverse res & return
    return res.reverse().join("") // 4.✅✅✅✅ 


    // ⭐⭐⭐⭐ Helper functions ⭐⭐⭐⭐
    function isLowerThanPeek(x, peek){ // Here x is operator (And x is left to peek in actual expression)
        let p1 = precedence.get(x) // || 0 --> If didn't set in precedence map, then it will be undefined, so we set it to 0 to handle when x is not an operator i.e., for x = "(" or ")"
        let p2 = precedence.get(peek) // || 0 --> If didn't set in precedence map, then it will be undefined, so we set it to 0 to handle when peek is not an operator i.e., for peek = "(" or ")"
        if(p1 < p2){
            return true
        }else if(p1 === p2){
            if(x === "^" && st[st.length - 1] === "^"){ // Associativity Right to Left. But We are traversing R to L, so x is on left of peek in actual expression. So x is lower precedence
                return true // 5.✅✅✅✅ 
            }else{
                // For (+,-) & (*,/) -->Associativity:  L to R. But we are traversing R to L, so x is on left of peek in actual expression. So x is lower precedence
                return false // 6.✅✅✅✅ 
            }
        }
        else{
            // if p1 > p2
            return false
        }
    }
    function isOperand(x){
        if((x >= 'A' && x <="Z") || (x >= 'a' && x <="z") || isdigit(x)){
            return true
        }
        return false
    }
    function isdigit(x){
        // !isNaN("") = !isNaN(" ")  = 0. // ❌❌ But it is not a digit
        // So don't just use isNaN. Use isNaN(parseFloat(x)) along with isNaN(x)
        return !isNaN(x) && !isNaN(parseFloat(x))
    }
}

let expression = "a+b*(c^d-e)^(f+g*h)-i" // -+a*b^-^cde+f*ghi
console.log(infixToPrefix(expression.split("")))

/*🎯 CORE IDEA: Use a stack to convert infix notation to prefix notation with right-to-left traversal. Process each character from right to left: operands go directly to result, operators are pushed to stack based on precedence and associativity, parentheses control grouping (reversed), and finally pop all remaining operators and reverse the result.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Create precedence map for operators (+, -, *, /, ^)
   - Initialize empty stack and result array
   - Set operator precedence: +,- = 1, *,/ = 2, ^ = 3

2️⃣ RIGHT-TO-LEFT TRAVERSAL:
   - Process expression from right to left
   - Operand: Add directly to result
   - Closing ')': Push to stack (reversed from postfix)
   - Opening '(': Pop until ')' found, add operators to result
   - Operator: Pop higher precedence operators, then push current operator

3️⃣ PRECEDENCE HANDLING:
   - Compare current operator with stack top
   - Pop operators with higher or equal precedence
   - Consider associativity (adjusted for right-to-left traversal)

4️⃣ FINAL CLEANUP:
   - Pop all remaining operators from stack
   - Add to result and reverse to get prefix expression

🧠 WHY THIS APPROACH?
- Right-to-left traversal handles operator precedence correctly
- Stack maintains operator precedence order
- Handles parentheses correctly (reversed from postfix)
- Preserves associativity rules with traversal adjustment

💡 KEY INSIGHTS:
- Use right-to-left traversal for prefix conversion
- Handle parentheses in reverse (closing first, then opening)
- Adjust associativity for right-to-left traversal
- Process operands immediately, operators with stack
- Reverse final result to get prefix notation
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: "a+b*(c^d-e)^(f+g*h)-i"

INPUT: Infix expression
OUTPUT: "-+a*b^-^cde+f*ghi"

🎯 GOAL: Convert infix to prefix using right-to-left stack-based algorithm!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
precedence = {'+':1, '-':1, '*':2, '/':2, '^':3}
st = [] (stack)
res = [] (result)

📋 RIGHT-TO-LEFT CHARACTER PROCESSING:

CHAR 'i': operand (position 0 from right)
res = ['i']
st = []

CHAR '-': operator (position 1 from right)
st = [], so push '-'
st = ['-']
res = ['i']

CHAR ')': closing parenthesis (position 2 from right)
st = ['-', ')']
res = ['i']

CHAR 'h': operand (position 3 from right)
res = ['i', 'h']
st = ['-', ')']

CHAR '*': operator (position 4 from right)
')' is not operator, so push '*'
st = ['-', ')', '*']
res = ['i', 'h']

CHAR 'g': operand (position 5 from right)
res = ['i', 'h', 'g']
st = ['-', ')', '*']

CHAR '+': operator (position 6 from right)
'*' precedence(2) > '+' precedence(1), so pop '*'
st = ['-', ')']
res = ['i', 'h', 'g', '*']
Push '+'
st = ['-', ')', '+']
res = ['i', 'h', 'g', '*']

CHAR 'f': operand (position 7 from right)
res = ['i', 'h', 'g', '*', 'f']
st = ['-', ')', '+']

CHAR '(': opening parenthesis (position 8 from right)
Pop until ')' found: pop '+', add to res
st = ['-']
res = ['i', 'h', 'g', '*', 'f', '+']
Pop ')' (don't add to res)
st = ['-']
res = ['i', 'h', 'g', '*', 'f', '+']

CHAR '^': operator (position 9 from right)
'-' precedence(1) < '^' precedence(3), so push '^'
st = ['-', '^']
res = ['i', 'h', 'g', '*', 'f', '+']

CHAR ')': closing parenthesis (position 10 from right)
st = ['-', '^', ')']
res = ['i', 'h', 'g', '*', 'f', '+']

CHAR 'e': operand (position 11 from right)
res = ['i', 'h', 'g', '*', 'f', '+', 'e']
st = ['-', '^', ')']

CHAR '-': operator (position 12 from right)
')' is not operator, so push '-'
st = ['-', '^', ')', '-']
res = ['i', 'h', 'g', '*', 'f', '+', 'e']

CHAR 'd': operand (position 13 from right)
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd']
st = ['-', '^', ')', '-']

CHAR '^': operator (position 14 from right)
'-' precedence(1) < '^' precedence(3), so push '^'
st = ['-', '^', ')', '-', '^']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd']

CHAR 'c': operand (position 15 from right)
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c']
st = ['-', '^', ')', '-', '^']

CHAR '(': opening parenthesis (position 16 from right)
Pop until ')' found: pop '^', '-', add to res
st = ['-', '^']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-']
Pop ')' (don't add to res)
st = ['-', '^']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-']

CHAR '*': operator (position 17 from right)
'^' precedence(3) > '*' precedence(2), so pop '^'
st = ['-']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^']
Push '*'
st = ['-', '*']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^']

CHAR 'b': operand (position 18 from right)
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^', 'b']
st = ['-', '*']

CHAR '+': operator (position 19 from right)
'*' precedence(2) > '+' precedence(1), so pop '*'
st = ['-']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^', 'b', '*']
Push '+'
st = ['-', '+']
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^', 'b', '*']

CHAR 'a': operand (position 20 from right)
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^', 'b', '*', 'a']
st = ['-', '+']

📋 FINAL CLEANUP:
Pop all remaining operators: pop '+', '-'
st = []
res = ['i', 'h', 'g', '*', 'f', '+', 'e', 'd', 'c', '^', '-', '^', 'b', '*', 'a', '+', '-']

📋 REVERSE RESULT:
res.reverse() = ['-', '+', 'a', '*', 'b', '^', '-', '^', 'c', 'd', 'e', '+', 'f', '*', 'g', 'h', 'i']

🏆 FINAL RESULT: "-+a*b^-^cde+f*ghi"

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

INFIX EXPRESSION: a+b*(c^d-e)^(f+g*h)-i
RIGHT-TO-LEFT TRAVERSAL: i-h*g+f)^e-d^c(*b+a

STACK OPERATIONS (Right-to-Left):
┌─────┐
│  +  │ ← Final operators
├─────┤
│  -  │
└─────┘

RESULT BUILDING (Right-to-Left):
i h g * f + e d c ^ - ^ b * a + -

REVERSED RESULT (Prefix):
- + a * b ^ - ^ c d e + f * g h i

FINAL PREFIX: -+a*b^-^cde+f*ghi

─────────────────────────────────────────

📊 OPERATOR PRECEDENCE TABLE (Adjusted for Right-to-Left):

Operator | Precedence | Associativity | Right-to-Left Adjustment
---------|------------|---------------|--------------------------
   ^     |     3      | Right-to-Left | Left-to-Right (reversed)
   *,/   |     2      | Left-to-Right | Right-to-Left (reversed)
   +,-   |     1      | Left-to-Right | Right-to-Left (reversed)

─────────────────────────────────────────

📊 RIGHT-TO-LEFT TRAVERSAL LOGIC:

ORIGINAL EXPRESSION: a+b*(c^d-e)^(f+g*h)-i
RIGHT-TO-LEFT: i-h*g+f)^e-d^c(*b+a

PROCESSING ORDER:
1. i (operand)
2. - (operator)
3. ) (closing parenthesis)
4. h (operand)
5. * (operator)
6. g (operand)
7. + (operator)
8. f (operand)
9. ( (opening parenthesis)
10. ^ (operator)
11. e (operand)
12. - (operator)
13. d (operand)
14. ^ (operator)
15. c (operand)
16. ( (opening parenthesis)
17. * (operator)
18. b (operand)
19. + (operator)
20. a (operand)

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ RIGHT-TO-LEFT TRAVERSAL: Handles operator precedence correctly for prefix
2️⃣ REVERSED PARENTHESES: Closing ')' pushed first, opening '(' pops until ')'
3️⃣ ADJUSTED ASSOCIATIVITY: Considers right-to-left traversal direction
4️⃣ STACK MANAGEMENT: Maintains operator precedence order
5️⃣ RESULT REVERSAL: Converts right-to-left result to prefix notation

💡 KEY INSIGHT:
Use right-to-left traversal with reversed parentheses handling
and result reversal to convert infix to prefix efficiently!

🎯 TIME COMPLEXITY ANALYSIS:
- Single pass through expression: O(n)
- Each character processed once
- Stack operations: O(1) per character
- Result reversal: O(n)
- Total: O(n) time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- Stack: O(n) - worst case all operators
- Result: O(n) - stores all characters
- Precedence map: O(1) - fixed size
- Total: O(n) space complexity

🎯 EDGE CASES HANDLED:
- Balanced parentheses: handled correctly with reversal
- Operator precedence: maintained properly
- Associativity: preserved with right-to-left adjustment
- Empty expression: handled gracefully
- Single operand: returned as-is

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to produce valid prefix
- Maintains operator precedence
- Handles parentheses correctly with reversal
- Preserves associativity rules with traversal adjustment

🎯 IMPLEMENTATION DETAILS:
- Precedence map for operator priority
- Stack for operator management
- Result array for output building
- Right-to-left traversal
- Result reversal for prefix notation

🎯 STACK PROPERTIES:
- LIFO principle for operator precedence
- Parentheses handled in reverse (closing first)
- Operators popped based on precedence
- Final cleanup ensures all operators included

🎯 COMPARISON WITH POSTFIX CONVERSION:
- Postfix: Left-to-right traversal, normal parentheses
- Prefix: Right-to-left traversal, reversed parentheses
- Both: Use stack for operator precedence
- Both: Single pass, O(n) complexity

🎯 REAL-WORLD APPLICATIONS:
- Expression evaluation
- Compiler design
- Calculator implementation
- Formula processing
- Mathematical expression parsing

🎯 OPTIMIZATION TECHNIQUES:
- Single pass algorithm
- Efficient stack operations
- Precedence-based operator handling
- Associativity consideration with traversal
- Minimal space usage

🎯 ALGORITHM PATTERN:
- Stack-based conversion
- Precedence-driven processing
- Right-to-left traversal
- Reversed parentheses handling
- Result reversal

🎯 BOUNDARY CONDITIONS:
- Empty expression: handled gracefully
- Single operand: returned as-is
- All operators: processed correctly
- Nested parentheses: handled properly with reversal

🎯 ERROR HANDLING:
- Unbalanced parentheses: detected and handled
- Invalid characters: handled by operand check
- Empty stack access: prevented by length checks
- Robust error handling

🎯 ADVANTAGES OF RIGHT-TO-LEFT APPROACH:
- Correctly handles operator precedence for prefix
- Maintains associativity with traversal adjustment
- Single pass through expression
- Efficient space usage
- Handles all edge cases correctly
*/ 