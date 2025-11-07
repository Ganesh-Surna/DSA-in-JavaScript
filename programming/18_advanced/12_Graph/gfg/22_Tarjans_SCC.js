// ✅ TC = O(V + E)
// ✅ SC = O(V)
function tarjans(adj) {
    let V = adj.length

    let disc = new Array(V).fill(-1)
    let low = new Array(V).fill(-1)
    let stack = []
    let inStack = new Array(V).fill(false)
    let time = 0
    
    let SCCs = []
    
    for (let i = 0; i < V; i++) {
        if (disc[i] === -1) {
            dfs(i)
        }
    }

    // ✅ Sort SCCs lexicographically
    SCCs.sort((a, b) => {
        let n = Math.min(a.length, b.length);
        for (let i = 0; i < n; i++) {
            if (a[i] !== b[i]) return a[i] - b[i];
        }
        return a.length - b.length;
    });

    return SCCs
    
    function dfs(u) {
        disc[u] = low[u] = time++;
        stack.push(u)
        inStack[u] = true
        
        for (let v of adj[u]) {
            if (disc[v] === -1) {
                dfs(v)
                low[u] = Math.min(low[u], low[v]) // ✅ Tree edge
            }
            else if (inStack[v]) { 
                low[u] = Math.min(low[u], disc[v]) // ✅ Back edge
            }
            // Case 3: v is visited but not in stack (❌ Cross edge)
            // DO NOTHING - cross edges are ignored for low calculation
        }
        
        // ✅ If u is root of SCC
        if (low[u] === disc[u]) {
            let currSCC = []
            let w
            do {
                w = stack.pop()
                inStack[w] = false
                currSCC.push(w)
            } while (w !== u)
            
            currSCC.sort((a, b) => a - b)
            SCCs.push(currSCC)
        }
    }
}

let adj = [
    [1],     // 0
    [2],     // 1
    [3,4],   // 2
    [0],     // 3
    []       // 4
];
console.log(tarjans(adj)) // [ [0,1,2,3], [4] ]

let adj1 = [
    [1],    // 0
    [2],    // 1
    [0]     // 2
];
console.log(tarjans(adj1)) // [ [0,1,2] ]

let adj2 = [
    [1],
    [2],
    [3],
    []
]
console.log(tarjans(adj2)) // [ [0], [1], [2], [3] ]