function bfs(adj) {
    let V = adj.length
    let visited = new Array(V).fill(false)
    
    let q = []
    q.push(0)
    visited[0] = true
    
    let res = []
    
    while(q.length > 0){
        let u = q.shift()
        res.push(u)
        
        for(let v of adj[u]){
            if(!visited[v]){
                visited[v] = true
                q.push(v)
            }
        }
    }
    
    return res
}