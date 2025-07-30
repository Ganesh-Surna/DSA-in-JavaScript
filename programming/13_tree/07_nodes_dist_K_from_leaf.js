function printKDistantfromLeaf(node, k) {
  // your code here
  let count = 0;

  function dfs(node) {
    if (!node) return new Set();

    if (!node.left && !node.right) {
      // If k=0, this leaf node itself should be counted
      if (k === 0) count++;
      return new Set([0]); // Means distance from leaf to leaf is 0 (adding 0 to the set)
    }

    let leftDistances = dfs(node.left);
    let rightDistances = dfs(node.right);

    let currDistances = new Set();

    // Add 1 to each distance from children
    for (let d of leftDistances) {
      currDistances.add(d + 1);
    }
    for (let d of rightDistances) {
      currDistances.add(d + 1);
    }

    // Check if current node is at distance k from a leaf
    if (currDistances.has(k)) {
      count++;
    }

    // Return the set of distances from current node to leaves
    return currDistances;
  }

  dfs(node);
  return count;
}

// Test the examples
console.log("\n=== Testing Examples ===");

// Example 1: k=0 (leaf nodes)
let tree1 = new Node(4);
tree1.left = new Node(2);
tree1.right = new Node(7);
tree1.left.left = new Node(0);
console.log("k=0 (leaf nodes):", printKDistantfromLeaf(tree1, 0)); // Expected: 2

// Example 2: k=1 (nodes 1 step from leaves)
console.log("k=1 (1 step from leaves):", printKDistantfromLeaf(tree1, 1)); // Expected: 2

// Example 3: k=2 (nodes 2 steps from leaves)
console.log("k=2 (2 steps from leaves):", printKDistantfromLeaf(tree1, 2)); // Expected: 1

// Example 4: Original tree with k=2
console.log("Original tree k=2:", printKDistantfromLeaf(root, 2)); // Expected: 1

// Example flows:

/*
ALGORITHM EXPLANATION:
- For each node, we calculate all possible distances from leaf nodes to this node
- Leaf nodes return {0} (distance 0 from themselves)
- Internal nodes combine distances from children + 1
- We count nodes that have distance k in their set

EXAMPLE 1: Tree with k=0 (Find leaf nodes)
Tree:
    4
   / \
  2   7
 /
0

Step-by-step flow for k=0:

1. Start at root (4):
   - leftDistances = dfs(2) = {1} (from node 2)
   - rightDistances = dfs(7) = {0} (from leaf 7)
   - currDistances = {2, 1} (1+1, 0+1)
   - Does currDistances have 0? No, so don't count node 4

2. At node 2:
   - leftDistances = dfs(0) = {0} (from leaf 0)
   - rightDistances = dfs(null) = {} (empty)
   - currDistances = {1} (0+1)
   - Does currDistances have 0? No, so don't count node 2

3. At node 0 (leaf):
   - Is k=0? Yes! Count this leaf node
   - Return {0}

4. At node 7 (leaf):
   - Is k=0? Yes! Count this leaf node  
   - Return {0}

Result: 2 nodes (0 and 7 are leaves at distance 0 from themselves)

EXAMPLE 2: Tree with k=1 (Find nodes 1 step away from leaves)
Tree:
    4
   / \
  2   7
 /
0

Step-by-step flow for k=1:

1. Start at root (4):
   - leftDistances = {1} (from node 2)
   - rightDistances = {0} (from leaf 7)
   - currDistances = {2, 1} (1+1, 0+1)
   - Does currDistances have 1? Yes! Count node 4

2. At node 2:
   - leftDistances = {0} (from leaf 0)
   - rightDistances = {} (empty)
   - currDistances = {1} (0+1)
   - Does currDistances have 1? Yes! Count node 2

3. At node 0 (leaf):
   - Is k=1? No, don't count
   - Return {0}

4. At node 7 (leaf):
   - Is k=1? No, don't count
   - Return {0}

Result: 2 nodes (2 and 4 are at distance 1 from leaves)

EXAMPLE 3: Tree with k=2 (Find nodes 2 steps away from leaves)
Tree:
    4
   / \
  2   7
 /
0

Step-by-step flow for k=2:

1. Start at root (4):
   - leftDistances = {1} (from node 2)
   - rightDistances = {0} (from leaf 7)
   - currDistances = {2, 1} (1+1, 0+1)
   - Does currDistances have 2? Yes! Count node 4

2. At node 2:
   - leftDistances = {0} (from leaf 0)
   - rightDistances = {} (empty)
   - currDistances = {1} (0+1)
   - Does currDistances have 2? No, don't count

3. At node 0 (leaf):
   - Is k=2? No, don't count
   - Return {0}

4. At node 7 (leaf):
   - Is k=2? No, don't count
   - Return {0}

Result: 1 node (4 is at distance 2 from leaf 0)

EXAMPLE 4: Original test case
Tree:
    1
   / \
  2   3
 / \   \
4   5   6

Step-by-step flow for k=2:

1. Start at root (1):
   - leftDistances = {1, 1} (from nodes 4, 5)
   - rightDistances = {1} (from node 6)
   - currDistances = {2, 2, 2} = {2} (1+1, 1+1, 1+1)
   - Does currDistances have 2? Yes! Count node 1

2. At node 2:
   - leftDistances = {0} (from leaf 4)
   - rightDistances = {0} (from leaf 5)
   - currDistances = {1, 1} = {1} (0+1, 0+1)
   - Does currDistances have 2? No, don't count

3. At node 3:
   - leftDistances = {} (empty)
   - rightDistances = {0} (from leaf 6)
   - currDistances = {1} (0+1)
   - Does currDistances have 2? No, don't count

4. At nodes 4, 5, 6 (leaves):
   - Is k=2? No, don't count
   - Return {0}

Result: 1 node (1 is at distance 2 from leaves 4, 5, 6)

KEY POINTS:
- Leaf nodes always return {0}
- Internal nodes add 1 to each distance from children
- For k=0, we count leaf nodes themselves
- For k>0, we count internal nodes that have k in their distance set
*/
