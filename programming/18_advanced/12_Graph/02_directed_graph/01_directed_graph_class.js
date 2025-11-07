class DirectedGraph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        this.indegree = new Array(V).fill(0); // Track in-degree of each vertex
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(1)
    addEdge(from, to){
        this.adj[from].push(to); // Only add one direction for directed graph
        this.indegree[to]++; // Increment in-degree of destination vertex
    }
    
    // ✅ TC = O(V)
    getIndegree(vertex){
        return this.indegree[vertex];
    }
    
    // ✅ TC = O(V + E)
    printGraph(){
        for(let i = 0; i < this.V; i++){
            console.log(i + " -> " + this.adj[i].join(" ") + ` (indegree: ${this.indegree[i]})`);
        }
    }

    // ✅ TC = O(V + E)
    BFS(source){
        // 1. Initialize all visited to false
        let visited = new Array(this.V).fill(false);

        // 2. Create a queue and push the source into it
        let q = []  //new Queue();
        q.push(source); // q.enque(source);
        visited[source] = true;

        // 3. While the queue is not empty, deque the front element and print it
        while(q.length > 0){ // !queue.isEmpty()
            let u = q.shift(); // q.deque();
            console.log(u);
            for(let i = 0; i < this.adj[u].length; i++){
                let v = this.adj[u][i];
                if(!visited[v]){
                    q.push(v); // q.enque(v);
                    visited[v] = true;
                }
            }
        }
    }

    // ✅ TC = O(V + E)
    DFS(source){
        let visited = new Array(this.V).fill(false);
        let st = [] // Stack - LIFO
        st.push(source);
        visited[source] = true;

        while(st.length > 0){
            let u = st.pop();
            console.log(u);
            for(let i = 0; i < this.adj[u].length; i++){
                let v = this.adj[u][i];
                if(!visited[v]){
                    st.push(v);
                    visited[v] = true;
                }
            }
        }
    }

    // ✅ TC = O(V + E)
    DFSRec(source){
        let visited = new Array(this.V).fill(false);
        helper(source);

        // Helper function to perform DFS
        // ✅✅✅ NOTE: Arrow functions capture the parent's this, so it stays bound to your class instance:
        const helper = (u) => {
            visited[u] = true;
            console.log(u);
            for(let i = 0; i < this.adj[u].length; i++){ // ✅ this.adj will refer to your graph's adjacency list. only if the helper function is arrow function.
                let v = this.adj[u][i];
                if(!visited[v]){
                    helper(v);
                }
            }
        }
    }
}

// Example usage
let g = new DirectedGraph(5);

g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(2, 0);
g.addEdge(2, 3);
g.addEdge(3, 3);

console.log("Directed Graph:");
g.printGraph();

console.log("\nBFS starting from vertex 2:");
g.BFS(2);

console.log("\nDFS (iterative) starting from vertex 2:");
g.DFS(2);

console.log("\nDFS (recursive) starting from vertex 2:");
g.DFSRec(2);

