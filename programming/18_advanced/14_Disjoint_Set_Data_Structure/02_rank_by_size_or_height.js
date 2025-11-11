/*
Disjoint Set Union (DSU) – Rank by Size vs Rank by Height
=========================================================
When we implement DSU with the union-by-rank heuristic alongside path compression,
"rank" can stand for either of the following:

1. Height of the tree (a.k.a. rank by height)
   - We maintain an estimate of the depth of the tree representing each set.
   - During union, we attach the tree with smaller height under the taller tree.
   - If both trees have the same height, we pick one as the new root and increase its height by 1.
   - Height is only updated when two trees of equal height are merged.

2. Size of the tree (a.k.a. rank by size)
   - Instead of tracking height, we track the number of elements in each set.
   - During union, we attach the tree with fewer nodes under the larger tree.
   - The size of the new root becomes the sum of both sizes.
   - This guarantees that no element moves “up” too many times, keeping trees shallow.

Why both heuristics work:
- When combined with path compression, both heuristics guarantee nearly constant-time operations
  (inverse Ackermann complexity, α(n)).
- Rank-by-height keeps tree heights small by preventing unnecessary increases in depth.
- Rank-by-size keeps trees balanced in terms of element counts, which also limits height growth.
- In practice, rank-by-size is often preferred because computing size is intuitive and easier to update.
- Rank-by-height is theoretically equivalent but requires careful height updates only when needed.

Conclusion:
Both interpretations of "rank" are valid. Choose the one that is easier to reason about in your
implementation. The crucial point is to always attach the “smaller” tree under the “larger” tree,
where “smaller” can mean either shorter height or fewer nodes. Path compression then flattens the
structure even further, yielding efficient operations.
*/

/* Rank by Size */
class Solution {

    // Function to find the parent of a node with path compression
    find(x, par) {
        if (par[x] === x) return x;
        return par[x] = this.find(par[x], par);  // path compression
    }

    // ✅✅✅✅✅ Function to merge two nodes a and b.
    union_(a, b, par, rank1) {
        // The rank1 was initialized as:
        // let rank1 = new Array(n).fill(1);  // each node initially has size 1

        let pa = this.find(a, par);
        let pb = this.find(b, par);

        if (pa === pb) return;  // already connected

        // Union by rank (rank1[] is ⭐⭐⭐size or rank)
        if (rank1[pa] < rank1[pb]) {
            par[pa] = pb;
            rank1[pb] += rank1[pa];
        } else {
            par[pb] = pa;
            rank1[pa] += rank1[pb];
        }
    }

    // Function to check whether 2 nodes are connected or not.
    isConnected(x, y, par, rank1) {
        return this.find(x, par) === this.find(y, par) ? 1 : 0;
    }
}


/* Rank by Height */
class Solution1 {

    // Function to find the parent of a node with path compression
    find(x, par) {
        if (par[x] === x) return x;
        return par[x] = this.find(par[x], par);  // path compression
    }

    // ✅✅✅✅✅ Function to merge two nodes a and b using height-based rank
    union_(a, b, par, rank1) {
        // The rank1 was initialized as:
        // let rank1 = new Array(n).fill(0);  // each node initially has height 0

        let pa = this.find(a, par);
        let pb = this.find(b, par);

        if (pa === pb) return;  // already connected

        // Union by HEIGHT (rank1 stores ⭐⭐⭐height, not size)
        if (rank1[pa] < rank1[pb]) {
            par[pa] = pb;   // attach shorter tree under taller tree
        } 
        else if (rank1[pa] > rank1[pb]) {
            par[pb] = pa;
        } 
        else {
            // Same height → choose one root, increase its height
            par[pb] = pa;
            rank1[pa]++;   // ✅ Increase height only when heights are equal
        }
    }

    // Function to check whether 2 nodes are connected or not.
    isConnected(x, y, par, rank1) {
        return this.find(x, par) === this.find(y, par) ? 1 : 0;
    }
}
