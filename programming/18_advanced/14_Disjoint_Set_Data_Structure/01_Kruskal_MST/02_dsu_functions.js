// ✅ TC = O(E log E) - Sorting edges
// ✅ SC = O(E+V) - Edge list + DSU structures
function kruskalMST(adj, n) {

    /* 1. Convert adjacency list to edge list */
    let edges = []
    for(let u=0; u<n; u++){
        for(let [v, w] of adj[u]){
            if(u < v){
                edges.push([u, v, w])
            }
        }
    }
    
    /* 2. Sort edges in ASC order of weights */
    edges.sort((a, b) => a[2] - b[2])
    
    /* 3. Initialize parent and rank arrays */
    let parent = new Array(n)
    for(let i=0; i<n; i++){
        parent[i]=i
    }
    let rank = new Array(n).fill(1) // Rank by size (each node initially has size=1)
    
    /* 4. Initialize MST and MST weight */
    let mst = []
    let mstWeight = 0
    
    for(let [u, v, w] of edges){
        let u_rep = find(u)
        let v_rep = find(v)
        
        if(u_rep !== v_rep){ 
            // ✅ If u and v are not in the same set, means no cycle will be formed by adding this edge.
            mst.push([u, v, w])
            mstWeight += w
            union(u, v) // ✅ Union/Merge the two sets.
        }
    }
    
    return mstWeight
    
    
    // Disjoint Union-Find Operations
    function find(x){
        if(parent[x] === x) return parent[x]
        return parent[x] = find(parent[x])
    }
    function union(x, y){
        let rx = find(x)
        let ry = find(y)
        
        if(rx===ry) return
        
        if(rank[rx] < rank[ry]){
            parent[rx] = ry
            rank[ry] += rank[rx]
        }else{
            parent[ry] = rx
            rank[rx] += rank[ry]
        }
    }
}