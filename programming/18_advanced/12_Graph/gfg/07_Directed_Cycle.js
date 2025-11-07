// 1. DFS Based - Recursive Approach (Using Recursion Stack)
// ✅ TC = O(V + E)
// ✅ SC = O(V)
function isCyclic(V, edges) {
    // Step 1: Create adjacency list
    let adj = new Array(V)
    for(let i=0; i<V; i++){
        adj[i]=[]
    }
    for(let [from, to] of edges){
        adj[from].push(to)
    }
    
    let visited = new Array(V).fill(false)
    let recStack = new Array(V).fill(false) // To keep track of vertices in the current recursion stack
    
    // Step 2: Perform DFS to detect cycle
    for(let u=0; u<V; u++){
        if(!visited[u]){
            if(dfs(u)){
                return true
            }
        }
    }
    return false
    
    // Helper function to perform DFS
    function dfs(u){
        visited[u]=true
        recStack[u]=true 
        for(let v of adj[u]){ // Process all neighbors
            if(!visited[v]){
                if(dfs(v)){
                    return true
                }
            }
            else if(recStack[v]){ // If the vertex is already in the current recursion stack, then there is a cycle
                return true 
            }
        }
        
        recStack[u]=false // Backtrack
        return false
    }
}

// 2. Kahn's Algorithm - Topological Sorting Based - BFS Approach
// ✅ TC = O(V + E)
// ✅ SC = O(V)
function isCyclic(V, edges) {
    // Step 1: Create adjacency list and indegree array
    let adj = new Array(V)
    let indegree = new Array(V).fill(0)
    for(let i=0; i<V; i++){
        adj[i]=[]
    }
    for(let [from, to] of edges){
        adj[from].push(to)
        indegree[to]++
    }
    
    // Step 2: Create a queue and add all vertices with indegree 0
    let q=[]
    let c=0
    for(let u=0; u<V; u++){
        if(indegree[u]===0){
            q.push(u)
        }
    }
    
    // Step 3: Process vertices until queue is empty
    while(q.length > 0){
        let u = q.shift()
        c++
        
        // Step 4: Reduce indegree of all adjacent vertices
        for(let v of adj[u]){
            indegree[v]--
            // Step 5: If indegree becomes 0, add it to queue
            if(indegree[v]===0){
                q.push(v)
            }
        }
    }
    
    // Step 6: If the count of processed vertices is not equal to the total number of vertices, then there is a cycle.
    // it means some vertices form cycles and never get indegree 0. This indicates the graph contains a cycle
    if(c !== V) return true
    
    // Step 7: If the count of processed vertices is equal to the total number of vertices, then there is no cycle
    return false
}