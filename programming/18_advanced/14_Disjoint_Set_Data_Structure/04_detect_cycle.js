/* Problem: Detect Cycle in Undirected Graph using Disjoint Set Data Structure */

// ✅ TC = O(V+E)
// ✅ SC = O(V)
function detectCycle(n, adj) {
    let parent = new Array(n)
    let rank = new Array(n).fill(0)
    for(let i=0; i<n; i++){
        parent[i]=i
    }
    
    for(let u=0; u<n; u++){
        for(let v of adj[u]){
            
            if(u < v){ // ✅✅✅✅✅ To avoid counting same edge twice (u,v) and (v,u)
                if(!union(u, v)){
                    return 1 // yes cycle found
                }
            }
        }
    }
    return 0 // no cycle found
    
    

    // Disjoint Union-Find functions
    function find(x){
        if(parent[x] !== x){
            parent[x] = find(parent[x]) // Path Compression
        }
        return parent[x] // Return the root node 
    }
    function union(x, y){
        let rx = find(x)
        let ry = find(y)
        if(rx === ry) return false // Already connected. Cycle detected
        
        if(rank[rx] < rank[ry]){
            parent[rx]=ry
            rank[ry] += rank[rx]
        }else{
            parent[ry]=rx
            rank[rx] += rank[ry]
        }
        
        return true
    }
}