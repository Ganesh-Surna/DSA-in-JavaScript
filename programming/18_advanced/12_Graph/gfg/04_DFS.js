function dfs(adj) {
    let V = adj.length;
    
    let visited = new Array(V).fill(false)
    let res = []
    
    for(let i=0; i<V; i++){
        if(!visited[i]){
            dfsHelper(i)
        }
    }
    return res
    
    function dfsHelper(u){
        visited[u]=true
        res.push(u)
        
        for(let v of adj[u]){
            if(!visited[v]){
                dfsHelper(v)
            }
        }
    } 
}