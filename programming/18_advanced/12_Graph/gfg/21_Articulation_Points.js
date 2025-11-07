function articulationPoints(adj) {
    let disc = new Array(V).fill(-1)
    let low = new Array(V).fill(-1)
    let parent = new Array(V).fill(-1)
    let isAp = new Array(V).fill(false)
    let time = 0
    
    for(let i=0; i<V; i++){
        if(disc[i] === -1){ // ✅ If not visited
            dfs(i)
        }
    }
    
    let aps = []
    for(let i=0; i<V; i++){
        if(isAp[i]){
            aps.push(i)
        }
    }
    
    return aps.length ? aps : [-1]
    
    
    // Helper function to perform DFS and find articulation points
    function dfs(u){
        time++
        disc[u]=low[u]=time
        let children = 0
        
        for(let v of adj[u]){
            if(disc[v]===-1){
                parent[v]=u
                dfs(v)
                children++
                
                // ✅ Tree edge
                low[u] = Math.min(low[u], low[v])
                
                // 1. If u is root and has more than 1 child, then it is an articulation point
                if(parent[u]===-1 && children > 1){
                    isAp[u] = true
                }

                // 2. If u is not root and low[v] >= disc[u], then it is an articulation point
                else if(parent[u] !== -1 && low[v] >= disc[u]){
                    isAp[u] = true
                }
            }

            // ✅ Back edge (v is visited & v is not parent of u - means v is ancestor of u)
            else if(v !== parent[u]){
                low[u]=Math.min(low[u], disc[v])
            }
        }
        
    }
}
