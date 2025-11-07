class Graph{
    constructor(V){
        this.V = V; // Number of vertices
        this.adj = new Array(V); // Create an array of size V to store the adjacency lists
        for(let i = 0; i < V; i++){
            this.adj[i] = []; // Initialize each adjacency list as empty
        }
    }

    // ✅ TC = O(V + E)
    detectCycle(){
        let visited = new Array(this.V).fill(false); // To keep track of visited vertices
        let recStack = new Array(this.V).fill(false); // To keep track of vertices in the current recursion stack

        for(let i = 0; i < this.V; i++){
            if(!visited[i]){ // ⭐⭐
                if(DFSHelper(i, visited, recStack)){ // If cycle is detected, return true
                    return true;
                }
            }
        }
        return false;


        // Helper function to detect cycle using DFS
        function DFSHelper(u, visited, recStack){
            visited[u] = true;
            recStack[u] = true;
            for(let i = 0; i < this.adj[u].length; i++){
                let v = this.adj[u][i];
                if(!visited[v]){ // If adjacent vertex(v) not visited, then visit it
                    if(DFSHelper(v, visited, recStack)){ // If cycle is detected, return true
                        return true;
                    }
                }
                else if(recStack[v]){ // If adjacent vertex(v) is visited and is in the current recursion stack, then there is a cycle
                    return true;
                }
            }
            recStack[u] = false; // Backtrack
            return false;
        }
    }
}