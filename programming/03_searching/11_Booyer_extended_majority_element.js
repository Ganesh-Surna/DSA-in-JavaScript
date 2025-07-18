class BooyerMooreAlgorithmMajorityElement {
  // ✅ TC: O(n), SC: O(1)
  majorityElement(nums) {
    let candidate = null;
    let count = 0;

    // First pass: Find candidate
    for (const num of nums) {
      if (count === 0) {
        candidate = num;
        count = 1;
      } else if (num === candidate) {
        count++;
      } else {
        count--;
      }
    }

    // Second pass: Verify candidate
    count = 0;
    for (const num of nums) {
      if (num === candidate) count++;
    }

    return count > nums.length / 2 ? candidate : -1;
  }

  // ✅ TC: O(n), SC: O(1)
  majorityElementII(nums) {
    let candidate1 = null,
      candidate2 = null;
    let count1 = 0,
      count2 = 0;

    // First pass: Find two candidates
    for (const num of nums) {
      if (num === candidate1) {
        count1++;
      } else if (num === candidate2) {
        count2++;
      } else if (count1 === 0) {
        candidate1 = num;
        count1 = 1;
      } else if (count2 === 0) {
        candidate2 = num;
        count2 = 1;
      } else {
        count1--;
        count2--;
      }
    }

    // Second pass: Verify candidates
    count1 = 0;
    count2 = 0;
    for (const num of nums) {
      if (num === candidate1) count1++;
      else if (num === candidate2) count2++;
    }

    const result = [];
    if (count1 > nums.length / 3) result.push(candidate1);
    if (count2 > nums.length / 3) result.push(candidate2);
    return result;
  }

  // for majority elements > n/k
  /**
     * Finds all elements in the array that appear more than n/k times.
     * ✅ TC: O(nk) in the worst case (due to Object.keys(candidates) in each iteration),
     *   but typically O(n) for small k (since k is usually much smaller than n).
     * ✅ SC: O(k) for storing up to (k-1) candidates.
     
     * Optimization:
     *  - To optimize, use a Map instead of an object and keep track of the number of candidates directly (avoiding Object.keys() in every iteration).
     *  - This reduces the per-iteration overhead, making it strictly O(n) time for all practical purposes.
     */
  majorityElementNKOptimized(nums, k) {
    const candidates = new Map();
    // First pass: Find up to (k-1) candidates
    for (const num of nums) {
      if (candidates.has(num)) {
        candidates.set(num, candidates.get(num) + 1);
      } else if (candidates.size < k - 1) {
        candidates.set(num, 1);
      } else {
        // Decrement count for all candidates
        for (const [key, value] of candidates) {
          if (value === 1) {
            candidates.delete(key);
          } else {
            candidates.set(key, value - 1);
          }
        }
      }
    }
    // Second pass: Verify actual counts
    const result = [];
    const counts = new Map();
    for (const key of candidates.keys()) counts.set(key, 0);
    for (const num of nums) {
      if (counts.has(num)) counts.set(num, counts.get(num) + 1);
    }
    for (const [key, value] of counts) {
      if (value > Math.floor(nums.length / k)) {
        result.push(Number(key));
      }
    }
    return result;
  }

  majorityElementNK(nums, k) {
    const candidates = {};
    // First pass: Find up to (k-1) candidates
    for (const num of nums) {
      if (candidates[num] !== undefined) {
        candidates[num]++;
      } else if (Object.keys(candidates).length < k - 1) {
        candidates[num] = 1;
      } else {
        // Decrement count for all candidates
        for (const key in candidates) {
          candidates[key]--;
          if (candidates[key] === 0) {
            delete candidates[key];
          }
        }
      }
    }
    // Second pass: Verify actual counts
    const result = [];
    const counts = {};
    for (const key in candidates) counts[key] = 0;
    for (const num of nums) {
      if (counts[num] !== undefined) counts[num]++;
    }
    for (const key in counts) {
      if (counts[key] > Math.floor(nums.length / k)) {
        result.push(Number(key));
      }
    }
    return result;
  }

  isMajorityElement(nums, x) {
    // Boyer-Moore to find candidate
    let candidate = null,
      count = 0;
    for (const num of nums) {
      if (count === 0) candidate = num;
      count += num === candidate ? 1 : -1;
    }

    // Verify if candidate is x and appears > n/2 times
    let occurrences = 0;
    for (const num of nums) {
      if (num === x) occurrences++;
    }

    return candidate === x && occurrences > nums.length / 2;
  }
}
