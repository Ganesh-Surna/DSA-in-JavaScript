// Problem 1: You are given two integer arrays L[] and R[], 
// where each L[i] and R[i] define the start and end of a range respectively. 
// The goal is to find the integer that appears in the most number of these ranges. 
// If multiple integers occur in the same maximum number of ranges, 
// then return the smallest integer among them. 

// Constraints:
// 1) 1 <= left[i] <= right[i] < 100  (Max range is 100)
// 2) 0 <= i < 10^5  (Max "no. of" ranges)

// Note: If more than one element appears the most,
// return the smallest one (which is first in the freq array).

// Best Sol: (Finding maximum range in given R arr is better than using given constraints )
// ✅ TC = O(n) + O(max(R arr)) = O(n + max(R arr))
// ✅ SC = O(max(R arr))
function maxOccured(L, R) {
    let n = L.length
    
    // 1. Find Max range
    let maxRange = R[0]
    for(let i=0; i<n; i++){
        if(R[i] > maxRange){
            maxRange = R[i]
        }
    }
    
    // 2. Create freq arr with len maxRange+1 & fill with 0's
    // we mark ending range's next index by decrementing (so maxRange+1)
    let freq = new Array(maxRange+1).fill(0)
    
    // 3. marking
    for(let i=0; i<n; i++){
        freq[L[i]]++    // start range ++
        freq[R[i]+1]--  // end range --
    }
    
    // 4. prefix sums - freq arr
    // 5. Find max freq index - which is the maximum occurred integer in given ranges
    let maxIdx = 0
    for(let i=1; i<maxRange+1; i++){
        freq[i] += freq[i-1]
        
        if(freq[i] > freq[maxIdx]){
            maxIdx = i
        }
    }
    
    return maxIdx
}


// ✅ TC = O(n) + O(Max Range = 100 here) = O(n + Max Range)
// ✅ SC = O(Max Range = 100 here) = O(Max Range)
function maxOccurEl(left, right) {
  let n = left.length;

  // 1. Create freq_arr with 101 range & fill with 0's
  // Why 101 ? 
  // Because we need to mark the end of the range's next idx as -1
  let freq_arr = new Array(101).fill(0); // max ending range is < 100 given in problem

  // 2. Marking
  // Mark freq_arr[starting idx of range] by incrementing the value
  // Mark freq_arr[ending idx of range + 1] by decrementing the value
  for (let i = 0; i < n; i++) {
    freq_arr[left[i]]++;
    freq_arr[right[i] + 1]--;  // Marking the end of the range's next idx by decrementing
  }

  // 3. Prefix sum of freq_arr (which gives occurances of the numbers represented indexes in freq_arr)
  for (let i = 1; i < freq_arr.length; i++) {
    freq_arr[i] += freq_arr[i - 1];
  }

  // 4. Max of this prefixSums is the max occurrance. And that index of the max is the result(number occuring maximum times in all given ranges)
  let max_freq_idx = 0;
  for (let i = 1; i < freq_arr.length; i++) {
    if (freq_arr[i] > freq_arr[max_freq_idx]) {
      max_freq_idx = i;
    }
  }

  return max_freq_idx;
}


// ⭐ Note: we can do step 3 & 4 in single loop like below:
function maxOccurEl(left, right) {
    let n = left.length;
  
    // 1. Create freq_arr with 101 range & fill with 0's
    let freq_arr = new Array(101).fill(0);
  
    // 2. Marking
    for (let i = 0; i < n; i++) {
      freq_arr[left[i]]++;
      freq_arr[right[i] + 1]--;
    }
  
    // 3. Prefix sum of freq_arr (which gives occurances of the numbers represented indexes in freq_arr)
    // 4. Max of this prefixSums is the max occurrance. And that index of the max is the result(number occuring maximum times in all given ranges)
    let max_freq_idx = 0;
    for (let i = 1; i < freq_arr.length; i++) {
      freq_arr[i] += freq_arr[i - 1];
      if (freq_arr[i] > freq_arr[max_freq_idx]) {
        max_freq_idx = i;
      }
    }
  
    return max_freq_idx;
}
  
  let left = [1, 2, 5, 15], right = [5, 8, 7, 18]; // 5 <-- (ranges [1-5], [2-8], [5, 7], [15, 18])
  
  left = [1, 2], right = [5, 4]; // 2 <-- (ranges [1-5], [2-4])
  console.log(maxOccurEl(left, right));
  