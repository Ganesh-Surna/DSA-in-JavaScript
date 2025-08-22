// TC = O(n^2) (due to the nested loops and memoization)
// SC = O(n^2) (for storing the memoization table.)

var numTrees = function(n) {
    // Memoization table to store the number of unique BSTs for a given range [start, end]
    const memo = new Array(n + 1).fill().map(() => new Array(n + 1).fill(0));
    
    function countTrees(start, end) {
        if (start > end) {
            return 1; // One null tree
        }
        if (memo[start][end] !== 0) {
            return memo[start][end];
        }
        let total = 0;
        for (let i = start; i <= end; i++) {
            // Number of left subtrees
            const left = countTrees(start, i - 1);
            // Number of right subtrees
            const right = countTrees(i + 1, end);
            // Total number of trees with i as root
            total += left * right;
        }
        memo[start][end] = total;
        return total;
    }
    
    return countTrees(1, n);
};