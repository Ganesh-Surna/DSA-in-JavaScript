function topoSort(V, edges) {
    // code here
    let adj = new Array(V)
    let indegree = new Array(V).fill(0)
    for(let i=0; i<V; i++){
        adj[i]=[]
    }
    
    for(let [u, v] of edges){
        adj[u].push(v)
        indegree[v]++
    }
    
    let q = []
    for(let u=0; u<V; u++){
        if(indegree[u] === 0) q.push(u)
    }

    let res = []
    let c=0
    while(q.length > 0){
        let u = q.shift()
        res.push(u)
        c++
        
        for(let v of adj[u]){
            indegree[v]--
            if(indegree[v]===0){
                q.push(v)
            }
        }
        
    }
    
    // if(c!==V) return null // If cycle is detected, return null
    
    return res
}