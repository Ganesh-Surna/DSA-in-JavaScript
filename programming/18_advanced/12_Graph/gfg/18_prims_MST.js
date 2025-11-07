function spanningTree(V, edges) {
    // Step 1: Build adjacency matrix
    const graph = Array.from({ length: V }, () => Array(V).fill(0));
    
    for (let [u, v, w] of edges) {
        graph[u][v] = w;
        graph[v][u] = w; // undirected
    }

    // Step 2: Arrays for Prim’s algorithm
    const key = new Array(V).fill(Infinity);
    const mstSet = new Array(V).fill(false);

    // Start with vertex 0
    key[0] = 0;

    let totalWeight = 0;

    // Step 3: Find MST (Need to run V times)
    for (let count = 0; count < V; count++) {
        // Pick vertex with min key value not yet in MST
        let u = -1;
        for (let i = 0; i < V; i++) {
            if (!mstSet[i] && (u === -1 || key[i] < key[u])) {
                u = i;
            }
        }

        // Include vertex u in MST
        mstSet[u] = true;
        totalWeight += key[u];

        // Update key values of adjacent vertices
        for (let v = 0; v < V; v++) {
            if (!mstSet[v] && graph[u][v] !== 0 && key[v] > graph[u][v]) {
                key[v] = graph[u][v];
            }
        }
    }

    return totalWeight;
}


// ✅ 2. We can use a priority queue(Min Heap) to optimize the algorithm.