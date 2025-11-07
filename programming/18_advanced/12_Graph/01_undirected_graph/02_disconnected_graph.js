// ✅ TC = O(V + E)
class Graph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(V + E)
    // No source is given for disconnected graphs, so we need to traverse all vertices
    BFS() {
        let visited = new Array(this.V).fill(false);
    
        for (let i = 0; i < this.V; i++) {
            if (!visited[i]) { // ⭐⭐
                let q = [];
                q.push(i);
                visited[i] = true;
    
                while (q.length > 0) {
                    let u = q.shift();
                    console.log(u);
    
                    for (let v of this.adj[u]) {
                        if (!visited[v]) { // ⭐⭐
                            q.push(v);
                            visited[v] = true;
                        }
                    }
                }
            }
        }
    }

    // ✅ TC = O(V + E)
    // No source is given for disconnected graphs, so we need to traverse all vertices
    DFSRec(){
        let visited = new Array(this.V).fill(false);
        
        // Traverse all vertices
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){ // ⭐⭐
                helper(i);
            }
        }
    
        // Helper function to perform DFS
        // ✅✅✅ NOTE: Arrow functions capture the parent’s this, so it stays bound to your class instance:
        const helper = (u) => {
            visited[u] = true;
            console.log(u);
            for(let v of this.adj[u]){ 
                if(!visited[v]){ // ⭐⭐
                    helper(v);
                }   
            }
        }
    }

    // ✅ TC = O(V + E)
    countVertices(){
        let visited = new Array(this.V).fill(false);
        let count = 0; // ✅

        // Traverse all vertices
        for(let i = 0; i < this.V; i++){
            if(!visited[i]){
                helper(i);
                count++; 
            }
        }
        return count;

        // Helper function
        function helper(u){
            visited[u] = true;
            for(let i = 0; i < this.adj[u].length; i++){
                let v = this.adj[u][i];
                if(!visited[v]){
                    helper(v);
                }
            }
        }
    }
}