function isCycle(V, edges) {
    // Code here
    let adj = new Array(V)
    for(let i=0; i<V; i++){
        adj[i] = []
    }
    
    for(let [u, v] of edges){
        adj[u].push(v)
        adj[v].push(u)
    }
    
    
    let visited = new Array(V).fill(false)
    
    for(let u=0; u<V; u++){
        if(!visited[u]){
            if(dfs(u, -1)){
                return true
            }
        }
    }
    return false
    
    
    // Helper
    function dfs(u, parent){
        visited[u] = true
        for(let v of adj[u]){
            if(!visited[v]){
                if(dfs(v, u)){
                    return true
                }
            }else{
                if(v !== parent){ // Back edge to its ancestor
                    return true
                }
            }
        }
        
        return false
    }
}