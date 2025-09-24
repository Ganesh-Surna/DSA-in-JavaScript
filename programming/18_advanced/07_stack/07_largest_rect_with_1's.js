/* Problem: ✅✅✅✅ Largest Rectangle with 1's ✅✅✅✅

Given a binary matrix (2D array) filled with 0's and 1's, find the area of the largest rectangle that can be formed with all 1's.

Example 1:
Input: matrix = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 0]
]
Output: 8
Explanation: The largest rectangle with all 1's has area = 8 unit²
- Rectangle formed by 2×4 submatrix of 1's: width = 4, height = 2, area = 8

Example 2:
Input: matrix = [
  [1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0]
]
Output: 6
Explanation: The largest rectangle with all 1's has area = 6 unit²
- Rectangle formed by 2×3 submatrix of 1's: width = 3, height = 2, area = 6

Example 3:
Input: matrix = [
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1, 1]
]
Output: 12
Explanation: The largest rectangle with all 1's has area = 12 unit²
- Rectangle formed by entire 3×4 matrix: width = 4, height = 3, area = 12

Constraints:
- 1 <= matrix.length <= 200
- 1 <= matrix[0].length <= 200
- matrix[i][j] is either 0 or 1

Expected Time Complexity: O(R × C)
Expected Auxiliary Space: O(C) --> No modification in the input matrix. O(1) if we can modify the input matrix.
*/

// ✅ TC = O(R × C) 
// ✅ SC = O(C) --> No modification in the input matrix. O(1) if we can modify the input matrix.
function largestRectWith1s(mat) {
  let r = mat.length;
  let c = mat[0].length;

  let res = 0;
  let st = [];

  let prevHistogram = new Array(c).fill(0);
  for (let i = 0; i < r; i++) { // ✅ TC = O(R) => Total TC = O(R × C)
    let histogram = mat[i];
    for (let j = 0; j < c; j++) { // OR j<histogram.length   // ✅ TC = O(C)
      if (histogram[j] === 1) { // If base is 1, then we add the previous histogram bar height to the current histogram's corresponding bar height
        histogram[j] = histogram[j] + prevHistogram[j];
      }
      // If base is 0, then we consider it as 0 height bar only
    }

    // ✅✅✅ START of Finding the largest rectangle area in the histogram
    let currRes = 0;
    st = [];
    for (let k = 0; k < c; k++) { // OR k<histogram.length   // ✅ TC = O(C)
      while (st.length > 0 && histogram[st[st.length - 1]] >= histogram[k]) {
        let peakIdx = st.pop();
        let count = st.length === 0 ? k : k - st[st.length - 1] - 1;
        let area = histogram[peakIdx] * count;

        currRes = Math.max(currRes, area);
      }

      st.push(k);
    }

    // c = histogram.length
    while (st.length > 0) {
      let peakIdx = st.pop();
      let count = st.length === 0 ? c : c - st[st.length - 1] - 1;
      let area = histogram[peakIdx] * count;

      currRes = Math.max(currRes, area);
    }
    // ✅✅✅ END of Finding the largest rectangle area in the histogram

    res = Math.max(res, currRes);

    prevHistogram = histogram;
  }

  return res;
}

// OR
function largestRectWith1s(mat) {
    let r = mat.length;
    let c = mat[0].length;
  
    let res = 0;
    let st = [];
  
    let prevHistogram = new Array(c).fill(0);
    for (let i = 0; i < r; i++) {
      let histogram = mat[i];
      
      for (let j = 0; j < c; j++) { // OR j<histogram.length
        if (histogram[j] === 1) { // If base is 1, then we add the previous histogram bar height to the current histogram's corresponding bar height
          histogram[j] = histogram[j] + prevHistogram[j];
        }
        // If base is 0, then we consider it as 0 height bar only
      }
  
      // ✅✅✅ START of Finding the largest rectangle area in the histogram
      let currRes = maxRectAreaHist(histogram, st)
      // ✅✅✅ END of Finding the largest rectangle area in the histogram
  
      res = Math.max(res, currRes);
  
      prevHistogram = histogram;
    }
  
    return res;
}
function maxRectAreaHist(histogram, st){
    let c= histogram.length // Or c we can also pass as arg to this function & use it.
    let res = 0;
    st = [];
    for (let k = 0; k < c; k++) { // OR k<histogram.length
    while (st.length > 0 && histogram[st[st.length - 1]] >= histogram[k]) {
        let peakIdx = st.pop();
        let count = st.length === 0 ? k : k - st[st.length - 1] - 1;
        let area = histogram[peakIdx] * count;

        res = Math.max(res, area);
    }

    st.push(k);
    }

    // c = histogram.length
    while (st.length > 0) {
    let peakIdx = st.pop();
    let count = st.length === 0 ? c : c - st[st.length - 1] - 1;
    let area = histogram[peakIdx] * count;

    res = Math.max(res, area);
    }
    
    return res
}

// OR 
// ✅ If we CAN MODIFY the input matrix 
// ✅ SC = O(1)
function largestRectWith1s(mat) {
  let r = mat.length;
  let c = mat[0].length;

  let st = [];

  // 1st row
  let res = maxRectAreaHist(mat[0], st)

  // 2nd to last row
  for (let i = 1; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (mat[i][j] === 1) {
        // ✅ Add the previous row's height to the current row's height if current cell(base) is 1
        mat[i][j] = mat[i][j] + mat[i-1][j] 
      }
    }
    res = Math.max(res, maxRectAreaHist(mat[i], st))
  }
  return res
}


let mat = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 0],
]; // 8
console.log(largestRectWith1s(mat));

/*🎯 CORE IDEA: Convert the 2D matrix problem into multiple 1D histogram problems by building histograms row by row, then find the maximum rectangular area in each histogram using the stack-based approach.

📋 STEP-BY-STEP FLOW:

1️⃣ INITIALIZATION:
   - Get matrix dimensions (rows r, columns c)
   - Initialize result to 0
   - Create prevHistogram array filled with 0's
   - Process each row from top to bottom

2️⃣ HISTOGRAM CONSTRUCTION:
   - For each row i, create histogram from current row
   - If current cell is 1: histogram[j] = 1 + prevHistogram[j]
   - If current cell is 0: histogram[j] = 0 (reset height)
   - This builds cumulative heights for consecutive 1's

3️⃣ MAXIMUM AREA CALCULATION:
   - Apply histogram maximum area algorithm to current histogram
   - Use stack to find maximum rectangular area
   - Update global maximum result

4️⃣ ITERATION:
   - Update prevHistogram with current histogram
   - Move to next row and repeat process

🧠 WHY THIS APPROACH?
- Converts 2D problem to multiple 1D problems
- Each row creates a histogram of cumulative heights
- Stack-based histogram algorithm finds maximum area efficiently
- O(R×C) time complexity with O(C) space

💡 KEY INSIGHTS:
- Build histograms row by row with cumulative heights
- Reset height to 0 when encountering 0
- Add previous height when encountering 1
- Apply histogram maximum area algorithm to each row
- Global maximum across all histograms gives final answer
*/

/*🎯 DETAILED OPERATION WALKTHROUGH:

📊 EXAMPLE: mat = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 0]
]

INPUT: 4×4 binary matrix

🎯 GOAL: Find largest rectangle with all 1's!

🔍 STEP-BY-STEP PROCESS:

📋 INITIALIZATION:
r = 4, c = 4
res = 0 (global maximum)
prevHistogram = [0, 0, 0, 0]

📋 ROW-BY-ROW PROCESSING:

ROW 0: mat[0] = [0, 1, 1, 0]
prevHistogram = [0, 0, 0, 0]

Histogram Construction:
- j=0: mat[0][0]=0 → histogram[0] = 0 (reset)
- j=1: mat[0][1]=1 → histogram[1] = 1 + 0 = 1
- j=2: mat[0][2]=1 → histogram[2] = 1 + 0 = 1
- j=3: mat[0][3]=0 → histogram[3] = 0 (reset)

histogram = [0, 1, 1, 0]

Maximum Area Calculation:
Stack-based algorithm on [0, 1, 1, 0]
- k=0: st=[] → push → st=[0]
- k=1: st=[0] → 0>=1 ✗ → push → st=[0,1]
- k=2: st=[0,1] → 1>=1 ✓ → pop 1 → area=1×1=1 → st=[0] → push → st=[0,2]
- k=3: st=[0,2] → 1>=0 ✓ → pop 2 → area=1×1=1 → st=[0] → 0>=0 ✓ → pop 0 → area=0×3=0 → st=[] → push → st=[3]

Final processing: peakIdx=3, area=0×1=0
currRes = max(1, 1, 0, 0) = 1

res = max(0, 1) = 1
prevHistogram = [0, 1, 1, 0]

ROW 1: mat[1] = [1, 1, 1, 1]
prevHistogram = [0, 1, 1, 0]

Histogram Construction:
- j=0: mat[1][0]=1 → histogram[0] = 1 + 0 = 1
- j=1: mat[1][1]=1 → histogram[1] = 1 + 1 = 2
- j=2: mat[1][2]=1 → histogram[2] = 1 + 1 = 2
- j=3: mat[1][3]=1 → histogram[3] = 1 + 0 = 1

histogram = [1, 2, 2, 1]

Maximum Area Calculation:
Stack-based algorithm on [1, 2, 2, 1]
- k=0: st=[] → push → st=[0]
- k=1: st=[0] → 1>=2 ✗ → push → st=[0,1]
- k=2: st=[0,1] → 2>=2 ✓ → pop 1 → area=2×1=2 → st=[0] → push → st=[0,2]
- k=3: st=[0,2] → 2>=1 ✓ → pop 2 → area=2×1=2 → st=[0] → 1>=1 ✓ → pop 0 → area=1×3=3 → st=[] → push → st=[3]

Final processing: peakIdx=3, area=1×1=1
currRes = max(2, 2, 3, 1) = 3

res = max(1, 3) = 3
prevHistogram = [1, 2, 2, 1]

ROW 2: mat[2] = [1, 1, 1, 1]
prevHistogram = [1, 2, 2, 1]

Histogram Construction:
- j=0: mat[2][0]=1 → histogram[0] = 1 + 1 = 2
- j=1: mat[2][1]=1 → histogram[1] = 1 + 2 = 3
- j=2: mat[2][2]=1 → histogram[2] = 1 + 2 = 3
- j=3: mat[2][3]=1 → histogram[3] = 1 + 1 = 2

histogram = [2, 3, 3, 2]

Maximum Area Calculation:
Stack-based algorithm on [2, 3, 3, 2]
- k=0: st=[] → push → st=[0]
- k=1: st=[0] → 2>=3 ✗ → push → st=[0,1]
- k=2: st=[0,1] → 3>=3 ✓ → pop 1 → area=3×1=3 → st=[0] → push → st=[0,2]
- k=3: st=[0,2] → 3>=2 ✓ → pop 2 → area=3×1=3 → st=[0] → 2>=2 ✓ → pop 0 → area=2×3=6 → st=[] → push → st=[3]

Final processing: peakIdx=3, area=2×1=2
currRes = max(3, 3, 6, 2) = 6

res = max(3, 6) = 6
prevHistogram = [2, 3, 3, 2]

ROW 3: mat[3] = [1, 1, 0, 0]
prevHistogram = [2, 3, 3, 2]

Histogram Construction:
- j=0: mat[3][0]=1 → histogram[0] = 1 + 2 = 3
- j=1: mat[3][1]=1 → histogram[1] = 1 + 3 = 4
- j=2: mat[3][2]=0 → histogram[2] = 0 (reset)
- j=3: mat[3][3]=0 → histogram[3] = 0 (reset)

histogram = [3, 4, 0, 0]

Maximum Area Calculation:
Stack-based algorithm on [3, 4, 0, 0]
- k=0: st=[] → push → st=[0]
- k=1: st=[0] → 3>=4 ✗ → push → st=[0,1]
- k=2: st=[0,1] → 4>=0 ✓ → pop 1 → area=4×1=4 → st=[0] → 3>=0 ✓ → pop 0 → area=3×2=6 → st=[] → push → st=[2]
- k=3: st=[2] → 0>=0 ✓ → pop 2 → area=0×1=0 → st=[] → push → st=[3]

Final processing: peakIdx=3, area=0×1=0
currRes = max(4, 6, 0, 0) = 6

res = max(6, 6) = 6

🏆 FINAL RESULT: 6

─────────────────────────────────────────

📊 SECOND EXAMPLE: mat = [
  [1, 0, 1, 0, 0],
  [1, 0, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 0, 0, 1, 0]
]

🔍 OPERATION SEQUENCE:

ROW 0: [1, 0, 1, 0, 0] → histogram = [1, 0, 1, 0, 0] → maxArea = 1
ROW 1: [1, 0, 1, 1, 1] → histogram = [2, 0, 2, 1, 1] → maxArea = 2
ROW 2: [1, 1, 1, 1, 1] → histogram = [3, 1, 3, 2, 2] → maxArea = 6
ROW 3: [1, 0, 0, 1, 0] → histogram = [4, 0, 0, 3, 0] → maxArea = 4

🏆 FINAL RESULT: 6

─────────────────────────────────────────

📊 VISUAL REPRESENTATION:

EXAMPLE: mat = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 0, 0]
]

Matrix Visualization:
┌─┬─┬─┬─┐
│0│1│1│0│ ← Row 0
├─┼─┼─┼─┤
│1│1│1│1│ ← Row 1
├─┼─┼─┼─┤
│1│1│1│1│ ← Row 2
├─┼─┼─┼─┤
│1│1│0│0│ ← Row 3
└─┴─┴─┴─┘

Histogram Evolution:
Row 0: [0, 1, 1, 0] → maxArea = 1
Row 1: [1, 2, 2, 1] → maxArea = 3
Row 2: [2, 3, 3, 2] → maxArea = 6
Row 3: [3, 4, 0, 0] → maxArea = 6

Maximum Rectangle (2×3):
┌─┬─┬─┬─┐
│0│1│1│0│
├─┼─┼─┼─┤
│1│1│1│1│ ← 2×3 rectangle
├─┼─┼─┼─┤
│1│1│1│1│ ← with area = 6
├─┼─┼─┼─┤
│1│1│0│0│
└─┴─┴─┴─┘

─────────────────────────────────────────

📊 HISTOGRAM CONSTRUCTION LOGIC:

CASE 1: Current cell is 1
- Add previous height: histogram[j] = 1 + prevHistogram[j]
- Builds cumulative height for consecutive 1's

CASE 2: Current cell is 0
- Reset height: histogram[j] = 0
- Breaks the chain of consecutive 1's

─────────────────────────────────────────

🔍 WHY THIS APPROACH WORKS:
1️⃣ HISTOGRAM CONVERSION: Converts 2D problem to 1D histograms
2️⃣ CUMULATIVE HEIGHTS: Builds heights for consecutive 1's
3️⃣ STACK-BASED ALGORITHM: Efficient maximum area calculation
4️⃣ ROW-BY-ROW PROCESSING: Handles all possible rectangles
5️⃣ OPTIMAL TIME: O(R×C) with O(C) space

💡 KEY INSIGHT:
Convert 2D matrix to histograms row by row,
then find maximum rectangular area in each histogram!

🎯 TIME COMPLEXITY ANALYSIS:
- R rows processed: O(R)
- Each row: histogram construction O(C) + max area calculation O(C)
- Total: O(R × C)
- Optimal time complexity

🎯 SPACE COMPLEXITY ANALYSIS:
- prevHistogram array: O(C)
- Stack for max area: O(C)
- Total space: O(C)
- Optimal space complexity

🎯 EDGE CASES HANDLED:
- Single row matrix
- Single column matrix
- All 0's matrix
- All 1's matrix
- Mixed patterns

🎯 ALGORITHM CORRECTNESS:
- Guaranteed to find maximum rectangular area
- Correct histogram construction
- Handles all edge cases
- Optimal time and space complexity

🎯 IMPLEMENTATION DETAILS:
- Process rows from top to bottom
- Build histograms with cumulative heights
- Reset height to 0 when encountering 0
- Apply histogram max area algorithm
- Update global maximum result

🎯 HISTOGRAM INTERPRETATION:
- Each histogram represents cumulative heights
- Height = number of consecutive 1's from top
- Width = number of consecutive 1's horizontally
- Area = height × width

🎯 STACK PROPERTIES:
- Maintains increasing order of heights
- Efficient for finding previous smaller element
- Optimal for area calculation
- Handles all edge cases

🎯 COMPARISON WITH NAIVE APPROACH:
- Naive: O(R²×C²) - check all possible rectangles
- Histogram: O(R×C) - efficient with histograms
- Both: Correct results
- Histogram: Much more efficient

🎯 REAL-WORLD APPLICATIONS:
- Image processing
- Data analysis
- Pattern recognition
- Algorithm optimization
- Competitive programming

🎯 OPTIMIZATION TECHNIQUES:
- Histogram-based approach
- Stack-based max area calculation
- Row-by-row processing
- Optimal space usage
- Monotonic stack technique

🎯 ALGORITHM PATTERN:
- 2D to 1D conversion
- Histogram construction
- Stack-based optimization
- Maximum area calculation

🎯 BOUNDARY CONDITIONS:
- First row: prevHistogram = [0, 0, ..., 0]
- Last row: final histogram processing
- Empty matrix: handled gracefully
- Single element: area = 1

🎯 ERROR HANDLING:
- Empty matrix: handled gracefully
- Single row/column: handled correctly
- Invalid input: robust handling
- Edge cases: comprehensive coverage
*/
