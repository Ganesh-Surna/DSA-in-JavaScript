// ✅ TC = O(V + E)
// ✅ SC = O(V)
function kosaraju(adj) {
    let V = adj.length;
    
    let visited = new Array(V).fill(false);
    
    let st = []
    // 1. Topological Order
    for(let i=0; i<V; i++){
        if(!visited[i]){
            dfs1(i)
        }
    }
    
    // 2. Transpose list(reversing edges)
    let trans = new Array(V)
    for(let i=0; i<V; i++){
        trans[i]=[]
    }
    for(let u=0; u<V; u++){
        for(let v of adj[u]){
            trans[v].push(u) // Reverse edge v -> u (original was u -> v)
        }
    }
    
    // 3. Perform DFS on transpose list - in Topological order
    visited = new Array(V).fill(false)
    let sccs=[]

    while(st.length > 0){
        let u = st.pop()
        if(!visited[u]){
            let currSCC = []

            dfs2(u, currSCC)
            
            sccs.push(currSCC)
        }
    }
    
    return sccs
    
    
    // Topological Order DFS helper
    function dfs1(u){
        visited[u]=true
        
        for(let v of adj[u]){
            if(!visited[v]){
                dfs1(v)
            }
        }
        
        st.push(u)
    }
    
    // DFS on transpose list
    function dfs2(u, currSCC){
        visited[u]=true
        currSCC.push(u)
        
        for(let v of trans[u]){
            if(!visited[v]){
                dfs2(v, currSCC)
            }
        }
    }
}

let adj = [[2, 3], [0], [1], [4], []]
console.log(kosaraju(adj)) // [ [ 0, 1, 2 ], [ 3 ], [ 4 ] ]