class Graph {
  constructor(V) {
    this.V = V; // Number of vertices
    this.adj = new Array(V); // Create an array of size V to store the adjacency lists
    for (let i = 0; i < V; i++) {
      this.adj[i] = []; // Initialize each adjacency list as empty
    }
  }

  // ✅ TC = O(V + E)
  shortestPathsOfEveryVertexFromSource(source) {
    // 1. Initialize all distances to Infinity
    let dist = new Array(this.V).fill(Infinity);

    // 2. Initialize all visited to false
    let visited = new Array(this.V).fill(false);

    // 3. Distance of source to itself is 0
    dist[source] = 0;

    // 4. Create a queue and push the source into it
    let q = [];
    q.push(source);
    visited[source] = true; // ✅ mark visited when enqueued

    // 5. BFS traversal
    while (q.length > 0) {
      let u = q.shift();

      for (let v of this.adj[u]) {
        if (!visited[v]) {
          dist[v] = dist[u] + 1; // ✅ Update distance // In BFS, every edge has equal weight (1), and BFS explores in increasing order of distance — so the first discovery is always the shortest.
          visited[v] = true; // ✅ Mark visited here
          q.push(v);
        }
      }
    }

    return dist;
  }
}
