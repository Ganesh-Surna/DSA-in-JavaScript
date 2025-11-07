function countPaths(adj, source, destination) {
    let c=0
    
    dfs(source)
    return c
    

    // Helper Function
    function dfs(u){
        if(u === destination){
            c++
            return
        }
        
        for(let v of adj[u]){
            dfs(v)
        }
    }
}

let adj1 = [[1, 2, 4], [3, 4], [4], [2], []]; 
console.log(countPaths(adj, 0, 4)); // // Output: 4

let adj2 = [[1, 3], [2, 3], [3], []];
console.log(countPaths(adj2, 0, 3)); // Output: 3
