/* Problem: Number of Connected Components

unionNodes: Join two subsets into a single set.
findNumberOfConnectedNodes: Determine number of different connected components in a graph.

Example 1:
Input:
N = 5
M = 2
Edges[] = {(1,3),(1,5)}

Output: 
3
Explanation: 
- Initially all nodes 1 2 3 4 5 are not connected. 
- After 1 3, node 1 and 3 will be connected.
- After 1 5, node 1 and 5 will be connected.
- Finally we have {1,3,5}, {2}, {4}. So we have a total of 3 connected components.


Example 2:
Input:
N = 5
M = 3
Edges[] = {(1,4),(2,3),(1,5)}

Output: 
2
Explanation: 
- Initially all nodes 1 2 3 4 5 are not connected.
- After 1 4, node 1 and 4 will be connected.
- After 2 3, node 2 and 3 will be connected.
- After 1 5, node 1 and 5 will be connected.
- Finally we have {1,4,5}, {2, 3}. So we have total of 2 connected components


Constraints: 
1 <= N <= 105
1 <= M <= 105
1 <= node1, node2 <= N
*/

class Solution {

    // DSU find with path compression
    find(x, arr) {
        if (arr[x] !== x) {
            arr[x] = this.find(arr[x], arr); // path compression
        }
        return arr[x];
    }
    
    // Function to merge two nodes a and b using height-based union by rank
    unionNodes(a, b, arr, rank1, n) {
        let pa = this.find(a, arr);
        let pb = this.find(b, arr);

        if (pa === pb) return;  // already connected

        // Union by HEIGHT
        if (rank1[pa] < rank1[pb]) {
            arr[pa] = pb;
        } 
        else if (rank1[pa] > rank1[pb]) {
            arr[pb] = pa;
        } 
        else {
            arr[pb] = pa;
            rank1[pa]++;  // increase height only when equal
        }
    }

    // Function to determine number of connected components.
    findNumberOfConnectedComponents(n, arr, rank1) {
        let count = 0;

        for (let i = 1; i <= n; i++) { 
            /* ✅✅✅✅✅ Iterate through all nodes 1 to n (❌❌ NOT 0 to n-1). 
                coz of constraint: 1 <= node1, node2 <= N
                Meaning the graph nodes are: 1, 2, 3, ..., N. 
                Not 0, 1, 2, ..., N-1.
            */
            if (this.find(i, arr) === i) { // ⭐⭐⭐
                count++;  // root node → represents a component
            }
        }

        return count;
    }
}
