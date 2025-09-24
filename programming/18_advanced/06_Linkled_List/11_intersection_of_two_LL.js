/* Problem: ✅✅✅✅ Intersection Point in Y Shaped Linked Lists ✅✅✅✅

Given the heads of two singly linked-lists headA and headB, 
return the node at which the two lists intersect. 
If the two linked lists have no intersection at all, return -1.

You are given the heads of two singly linked lists. 
The task is to find the intersection node where the two lists meet. 
The intersection is defined based on reference, not value.

Example 1:
Input: intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
Output: Intersected at '8'
Explanation: The intersected node's value is 8 (note that this must not be 0 if the two lists intersect).

Example 2:
Input: intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
Output: Intersected at '2'
Explanation: The intersected node's value is 2 (note that this must not be 0 if the two lists intersect).

Example 3:
Input: intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
Output: No intersection
Explanation: From the head of A, it reads as [2,6,4]. From the head of B, it reads as [1,5]. 
             Since the two lists do not intersect, intersectVal must be 0, while skipA and skipB can be arbitrary values.

Example 4:
Input: intersectVal = 0, listA = [1], listB = [1], skipA = 1, skipB = 0
Output: No intersection
Explanation: The two lists do not intersect.

Constraints:
- The number of nodes of listA is in the m.
- The number of nodes of listB is in the n.
- 1 <= m, n <= 3 * 10^4
- 1 <= Node.val <= 10^5
- 0 <= skipA < m
- 0 <= skipB < n
- intersectVal is 0 if listA and listB do not intersect.
- intersectVal == listA[skipA] == listB[skipB] if listA and listB intersect.

Expected Time Complexity: O(n+m)
Expected Auxiliary Space: O(1) for optimized solution, O(n) for hash set solution
*/

class Node{
    constructor(data){
        this.key = data
        this.next = null
        this.random = null
    }
}

// I. Optimized Solution (Length Difference & Two Pointers):
// ✅ TC = O(n+m) --> Two passes through both lists
// ✅ SC = O(1) --> Only pointers used
function intersectingNode(head1, head2){
    if(head1 === null || head2 === null){
        return -1
    }
    
    // 1. Get Lengths of both lists
    let len1 = getLen(head1)
    let len2 = getLen(head2)
    
    // 2. Get Abs Diff of their lengths
    let absDiff = Math.abs(len1 - len2)
    
    // 3. longer & shorter pointers
    let longer = len1 >= len2 ? head1 : head2
    let shorter = len1 >= len2 ? head2 : head1
    
    // 4. Traverse longer by absDiff
    let c=1;
    while(longer !== null && c <= absDiff){
        longer = longer.next
        c++
    }
    
    // 5. Now traverse both longer & shorter. And check for intersection
    while(longer !== null && shorter !== null){
        if (longer === shorter) {
            return longer.key; // or return longer if node reference required
        }
        longer = longer.next
        shorter = shorter.next
    }
    
    return -1
}
function getLen(head){
    let len = 0;
    let curr = head;
    while(curr !== null){
        len++
        curr = curr.next
    }
    return len
}

// II. Hash Set Solution:
// ✅ TC = O(n+m) --> Two passes through both lists
// ✅ SC = O(n) --> Hash set to store nodes
function intersectingNodeHashSet(head1, head2){
    if(head1 === null || head2 === null){
        return -1
    }
    
    // 1. Create a set
    let s = new Set()
    
    // 2. Add all nodes of head1 to the set
    let curr = head1
    while(curr !== null){
        s.add(curr)
        curr = curr.next
    }
    
    // 3. Check if any node of head2 is in the set
    curr = head2
    while(curr !== null){
        if(s.has(curr)){ 
            return curr.key // or return curr if node reference required
        }
        curr = curr.next
    }
    
    return -1 // no intersection
}

// ✅ Test Cases

// Test Case 1: Intersection exists
// List1: 1 → 2 → 3 ↘
//                       7 → 8 → 9
// List2:       4 → 5 ↗
let common1 = new Node(7);
common1.next = new Node(8);
common1.next.next = new Node(9);

let head1 = new Node(1);
head1.next = new Node(2);
head1.next.next = new Node(3);
head1.next.next.next = common1;

let head2 = new Node(4);
head2.next = new Node(5);
head2.next.next = common1;

console.log("List1:", print(head1));
console.log("List2:", print(head2));
console.log("Intersection (Optimized):", intersectingNode(head1, head2)); // 7
console.log("Intersection (HashSet):", intersectingNodeHashSet(head1, head2)); // 7

// Test Case 2: No intersection
let head3 = new Node(1);
head3.next = new Node(2);
head3.next.next = new Node(3);

let head4 = new Node(4);
head4.next = new Node(5);
head4.next.next = new Node(6);

console.log("List3:", print(head3));
console.log("List4:", print(head4));
console.log("Intersection (Optimized):", intersectingNode(head3, head4)); // -1
console.log("Intersection (HashSet):", intersectingNodeHashSet(head3, head4)); // -1

// Test Case 3: Same length lists with intersection
let common2 = new Node(2);
common2.next = new Node(4);

let head5 = new Node(1);
head5.next = new Node(9);
head5.next.next = new Node(1);
head5.next.next.next = common2;

let head6 = new Node(3);
head6.next = common2;

console.log("List5:", print(head5));
console.log("List6:", print(head6));
console.log("Intersection (Optimized):", intersectingNode(head5, head6)); // 2
console.log("Intersection (HashSet):", intersectingNodeHashSet(head5, head6)); // 2

/*🎯 CORE IDEA: We use a LENGTH DIFFERENCE approach to find the intersection of two linked lists. The key insight is to align the starting positions of both lists by advancing the longer list by the difference in lengths, then traverse both lists simultaneously to find the intersection.

📋 STEP-BY-STEP FLOW:

1️⃣ EDGE CASE HANDLING:
   - If either head is null, return -1
   - No intersection possible with null lists

2️⃣ LENGTH CALCULATION:
   - Calculate length of both lists
   - Find absolute difference between lengths
   - Determine which list is longer

3️⃣ ALIGNMENT:
   - Advance the longer list by the length difference
   - This ensures both lists start from the same relative position
   - Now both lists have equal remaining length

4️⃣ SIMULTANEOUS TRAVERSAL:
   - Traverse both lists simultaneously
   - Compare node references (not values)
   - Return the first matching node

5️⃣ RETURN RESULT:
   - Return the intersection node value
   - Return -1 if no intersection found

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n) time, O(1) space
2️⃣ NO EXTRA SPACE: Uses only pointers
3️⃣ ALIGNMENT TRICK: Equalizes starting positions
4️⃣ REFERENCE COMPARISON: Compares node objects, not values

💡 KEY INSIGHTS:

1️⃣ LENGTH DIFFERENCE: Align lists by advancing longer list
2️⃣ REFERENCE COMPARISON: Compare node objects, not values
3️⃣ SIMULTANEOUS TRAVERSAL: Move both pointers together
4️⃣ ALIGNMENT PRINCIPLE: Equal remaining lengths after alignment

🎯 WHY LENGTH DIFFERENCE APPROACH?
- Aligns both lists to start from same relative position
- Ensures both lists have equal remaining length
- Enables simultaneous traversal to find intersection
- No extra space required

🎯 ALGORITHM INTUITION:
Think of it as "aligning two runners" by giving the faster runner
a head start, then "running together" to find the meeting point.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
List1: 1 -> 2 -> 3 -> 7 -> 8 -> 9
List2: 4 -> 5 -> 7 -> 8 -> 9
Intersection at node with value 7

🎯 GOAL: Find the intersection node!

🔍 STEP-BY-STEP PROCESS:

📋 STEP 1 - LENGTH CALCULATION:
len1 = getLen(head1) = 6 (1->2->3->7->8->9)
len2 = getLen(head2) = 5 (4->5->7->8->9)
absDiff = |6 - 5| = 1

📋 STEP 2 - DETERMINE LONGER & SHORTER:
len1 >= len2 → longer = head1, shorter = head2
longer = 1 -> 2 -> 3 -> 7 -> 8 -> 9
shorter = 4 -> 5 -> 7 -> 8 -> 9

📋 STEP 3 - ALIGNMENT (Advance longer by absDiff):
Advance longer by 1 position:
longer = 2 -> 3 -> 7 -> 8 -> 9
shorter = 4 -> 5 -> 7 -> 8 -> 9

Now both lists have equal remaining length (5 nodes each)

📋 STEP 4 - SIMULTANEOUS TRAVERSAL:
longer = 2, shorter = 4 → 2 !== 4
longer = 3, shorter = 5 → 3 !== 5
longer = 7, shorter = 7 → 7 === 7 ✅ INTERSECTION FOUND!

🏆 RESULT: Intersection at node with value 7

🎯 VISUAL REPRESENTATION:

ORIGINAL LISTS:
List1: 1 -> 2 -> 3 -> 7 -> 8 -> 9
List2:        4 -> 5 -> 7 -> 8 -> 9
               ↑
            Different starting positions

AFTER ALIGNMENT:
List1:     2 -> 3 -> 7 -> 8 -> 9
List2:     4 -> 5 -> 7 -> 8 -> 9
           ↑
        Same relative position

SIMULTANEOUS TRAVERSAL:
List1: 2 -> 3 -> 7 -> 8 -> 9
List2: 4 -> 5 -> 7 -> 8 -> 9
       ↑     ↑     ↑
       No   No   YES! (Intersection)

🔍 WHY THIS WORKS:
1️⃣ ALIGNMENT: Both lists start from same relative position
2️⃣ EQUAL LENGTH: Both lists have same remaining length
3️⃣ REFERENCE COMPARISON: Compare node objects, not values
4️⃣ SIMULTANEOUS TRAVERSAL: Move both pointers together

💡 KEY INSIGHT:
The algorithm aligns both lists by advancing the longer list,
then traverses both simultaneously to find the intersection!

🎯 TIME COMPLEXITY: O(n) - Two passes through both lists
🎯 SPACE COMPLEXITY: O(1) - Only pointers used
🎯 EDGE CASES: Handles null lists and no intersection

🎯 COMPARISON WITH HASH SET APPROACH:
- Optimized: O(n) time, O(1) space
- Hash Set: O(n) time, O(n) space
- Both find intersection correctly
- Optimized is more space efficient

🎯 WHY REFERENCE COMPARISON?
- Intersection is defined by node reference, not value
- Multiple nodes can have same value
- Reference comparison ensures correct intersection detection
- More accurate than value comparison

🎯 ALIGNMENT PRINCIPLE:
- If lists have different lengths, intersection must be in the common part
- By advancing the longer list, we skip the non-intersecting part
- This ensures both lists start from the same relative position
- Enables simultaneous traversal to find intersection

🎯 MATHEMATICAL PROOF:
- Let len1 = m, len2 = n, where m >= n
- After advancing longer list by (m-n), both have length n
- If intersection exists, it must be in the last n nodes of both lists
- Simultaneous traversal will find the intersection

🎯 EDGE CASES HANDLED:
- Null lists: Return -1 immediately
- No intersection: Return -1 after traversal
- Same length lists: No advancement needed
- Single node lists: Handled correctly

🎯 OPTIMIZATION TECHNIQUES:
- Length difference calculation
- Pointer alignment
- Simultaneous traversal
- Reference comparison

🎯 REAL-WORLD APPLICATIONS:
- Finding common elements in linked lists
- Detecting cycles in linked lists
- Merging linked lists
- List comparison algorithms

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find intersection if it exists
- Guaranteed to return -1 if no intersection
- Handles all edge cases correctly
- Optimal time and space complexity

🎯 WHY THIS APPROACH IS OPTIMAL:
- Time: O(n) - cannot do better than linear
- Space: O(1) - cannot do better than constant
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 KEY DIFFERENCES FROM NAIVE APPROACH:
- No extra space required
- More efficient for large lists
- Uses mathematical insight about alignment
- Better space complexity

🎯 ALGORITHM EFFICIENCY:
- Time: O(n) - optimal for this problem
- Space: O(1) - optimal space usage
- Simple: Easy to understand and implement
- Robust: Handles all edge cases

🎯 LINKED LIST MANIPULATION PRINCIPLES:
- Always check for null pointers
- Use reference comparison for intersection
- Align lists before simultaneous traversal
- Handle edge cases properly

🎯 INTERSECTION DETECTION PATTERN:
- Calculate lengths of both lists
- Find difference and align lists
- Traverse simultaneously to find intersection
- Return intersection node or -1

🎯 ALGORITHM INSIGHTS:
- Length difference is key to alignment
- Reference comparison is crucial
- Simultaneous traversal is efficient
- Alignment principle is fundamental

🎯 WHY ALIGNMENT WORKS:
- If lists intersect, intersection must be in common part
- By advancing longer list, we skip non-intersecting part
- This ensures both lists start from same relative position
- Enables efficient intersection detection

🎯 MATHEMATICAL INSIGHT:
- Let intersection be at position k from end
- After alignment, both lists have same length
- Intersection will be at same position in both lists
- Simultaneous traversal will find it

🎯 ALGORITHM BEAUTY:
- Simple yet powerful
- Uses mathematical insight
- Optimal complexity
- Handles all cases

🎯 WHY THIS IS THE BEST APPROACH:
- Optimal time complexity: O(n)
- Optimal space complexity: O(1)
- Simple to understand and implement
- Handles all edge cases correctly

🎯 FINAL INSIGHT:
The algorithm uses the mathematical property that if two lists
intersect, the intersection must be in the common part after
alignment, enabling efficient detection through simultaneous traversal!
*/