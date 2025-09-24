/* Problem:
Given an integer array arr[], find the number of triangles that can be formed with
three different array elements as lengths of three sides of the triangle.

A triangle with three given sides is only possible if sum of any two sides is 
always greater than the third side (Triangle Inequality Theorem).

Example 1:
Input: arr[] = [4, 6, 3, 7]
Output: 3
Explanation: There are three triangles possible [3, 4, 6], [4, 6, 7] and [3, 6, 7]. 
Note that [3, 4, 7] is not a possible triangle because 3+4 = 7 (not > 7).

Example 2:
Input: arr[] = [10, 21, 22, 100, 101, 200, 300]
Output: 6
Explanation: There can be 6 possible triangles: [10, 21, 22], [21, 100, 101], 
[22, 100, 101], [10, 100, 101], [100, 101, 200] and [101, 200, 300].

Example 3:
Input: arr[] = [1, 2, 3]
Output: 0
Explanation: No triangles are possible because 1+2 = 3 (not > 3).

Constraints:
1 ≤ arr.size() ≤ 10³
0 ≤ arr[i] ≤ 10⁵

Expected Time Complexity: O(n²)
Expected Auxiliary Space: O(1)
*/

// ✅ TC = O(n²) - nested loops with two pointers
// ✅ SC = O(1) - constant extra space
function countTriangles(arr) {
    // 1. Sort
    arr.sort((a, b)=>a-b);
    
    let n = arr.length;
    let res = 0;
    
    // 2. Count pairs
    for(let k=n-1; k>=2; k--){
        let i=0, j=k-1;
        
        while(i < j){
            if(arr[i]+arr[j] > arr[k]){
                res += (j-i) // all pairs (i...j-1, j) will also satisfies
                j--
            }else{
                i++
            }
        }
    }
    return res
}

/*🎯 CORE IDEA: Instead of checking all possible triplets (O(n³)), we use a TWO-POINTER approach 
   on SORTED arrays to efficiently count valid triangles by fixing the largest side.

📋 STEP-BY-STEP FLOW:

1️⃣ PREPROCESSING:
   - Sort array in ascending order
   - Initialize result counter to 0

2️⃣ FIX LARGEST SIDE (k):
   - Start from the largest element (k = n-1)
   - Move down to k = 2 (need at least 3 elements)
   - For each k, find all valid pairs (i, j) where i < j < k

3️⃣ TWO-POINTER TECHNIQUE:
   - Initialize i = 0, j = k-1
   - While i < j:
     * If arr[i] + arr[j] > arr[k]: Valid triangle found!
       - All pairs (i, i+1), (i, i+2), ..., (i, j-1) with j are also valid
       - Count = j - i (number of valid pairs with current i)
       - Move j left (j--)
     * Else: arr[i] + arr[j] ≤ arr[k]
       - Need larger first side, move i right (i++)

4️⃣ RETURN RESULT:
   - Sum of all valid triangle counts

🧠 WHY THIS APPROACH?

1️⃣ EFFICIENCY: O(n²) vs O(n³) for brute force
2️⃣ SPACE: O(1) vs O(1) for brute force (both constant)
3️⃣ INTUITION: Fix largest side, then find valid pairs efficiently
4️⃣ SORTING: Enables two-pointer technique and triangle inequality

💡 KEY INSIGHT:
For a sorted array, if arr[i] + arr[j] > arr[k], then arr[i+1] + arr[j] > arr[k], similarly arr[i+2...j-1] + arr[j] > arr[k]
is also true (since arr[i...j-1] ≤ arr[j]). This allows us to count multiple valid 
triangles in one operation.

🎯 WHY SORTING IS CRUCIAL:
- Without sorting: We'd need to check all O(n³) triplets
- With sorting: We can use triangle inequality efficiently
- Two pointers work because of sorted order

🔍 ALGORITHM INTUITION:
Think of it as "fixing the hypotenuse" - we fix the largest side and find 
all valid pairs that can form triangles with it.
*/

/*🎯 CRYSTAL CLEAR EXAMPLE WALKTHROUGH:
📊 INPUT:
arr = [4, 6, 3, 7]

🎯 GOAL: Find all possible triangles without checking every triplet!

🔍 SORTING STEP:
arr = [3, 4, 6, 7]     (sorted)

🎯 TWO-POINTER PROCESS:

ITERATION 1: k=3 (largest side = 7)
i=0, j=2              (i=0, j=k-1=2)

📋 CHECK: arr[0] + arr[2] = 3 + 6 = 9
9 > 7 ✓ → Valid triangle (3, 6, 7)
res += (j-i) = (2-0) = 2
This means: (3,6,7) and (4,6,7) are both valid!

j = 2-1 = 1

📋 CHECK: arr[0] + arr[1] = 3 + 4 = 7  
7 ≤ 7 ✗ → Invalid triangle
i = 0+1 = 1

📋 CHECK: arr[1] + arr[1] = 4 + 4 = 8
8 > 7 ✓ → Valid triangle (4, 4, 7) - but this is invalid (same element twice)
But i=1, j=1, so i < j is false → END

Result for k=3: 2 triangles

─────────────────────────────────────────

ITERATION 2: k=2 (largest side = 6)
i=0, j=1              (i=0, j=k-1=1)

📋 CHECK: arr[0] + arr[1] = 3 + 4 = 7
7 > 6 ✓ → Valid triangle (3, 4, 6)
res += (j-i) = (1-0) = 1
This means: (3,4,6) is valid!

j = 1-1 = 0

i=0, j=0, so i < j is false → END

Result for k=2: 1 triangle

─────────────────────────────────────────

ITERATION 3: k=1 (largest side = 4)
k < 2, so we stop

🏆 FINAL RESULT: Total triangles = 2 + 1 = 3

🎯 VERIFICATION:
Valid triangles: [3, 4, 6], [3, 6, 7], [4, 6, 7] = 3 triangles ✓

🎯 WHY THE COUNTING WORKS:
When arr[i] + arr[j] > arr[k]:
- (arr[i], arr[j], arr[k]) is valid
- (arr[i], arr[j-1], arr[k]) is also valid (since arr[j-1] ≤ arr[j])
- (arr[i], arr[j-2], arr[k]) is also valid
- ... and so on until (arr[i], arr[i+1], arr[k])

So we count (j-i) triangles at once!

🎯 WHY THIS IS EFFICIENT:
1️⃣ SORTING ensures triangle inequality can be used effectively
2️⃣ TWO POINTERS avoid checking redundant pairs
3️⃣ FIXING largest side reduces the problem to finding valid pairs
4️⃣ COUNTING multiple triangles in one operation saves time

💡 KEY INSIGHT:
We don't need to check every possible triplet - just fix the largest side 
and efficiently find all valid pairs that can form triangles with it!
*/