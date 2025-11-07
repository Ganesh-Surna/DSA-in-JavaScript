function dijkstra(V, edges, src) {
    // 1. Build adjacency MATRIX
    const graph = Array.from({ length: V }, () => Array(V).fill(0));
    
    for (let [u, v, w] of edges) {
        graph[u][v] = w;
        graph[v][u] = w; // undirected
    }
    
    // 2. Distance array
    const dist = new Array(V).fill(Infinity);
    dist[src] = 0;
    
    // 3. Finalized array
    const finalised = new Array(V).fill(false);
    
    // 4. Process all vertices (Need to run V times)
    for (let count = 0; count < V; count++) {
        // 5. Find unfinalized vertex with min distance
        let u = -1;
        for (let i = 0; i < V; i++) {
            if (!finalised[i] && (u === -1 || dist[i] < dist[u])) {
                u = i;
            }
        }
        
        if (u === -1) break; // No more reachable vertices
        finalised[u] = true; // Finalize vertex u (shortest distance to u is confirmed)
        
        // 6. Relax all edges from u to its neighbors
        for (let v = 0; v < V; v++) {
            if (!finalised[v] && graph[u][v] !== 0 && dist[v] > dist[u] + graph[u][v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    
    return dist;
}

// ✅ 2. We can use a priority queue(Min Heap) to optimize the algorithm. - ⭐⭐⭐ RECOMMENDED ⭐⭐⭐
// WAY1: Normal MinHeap implementation (No decreaseKey operation)
class MinHeap{
    constructor(){
        this.harr = []
        this.size=0
    }
    
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    insert([u, w]){
        let i=this.size
        let arr = this.harr
        arr[i]=[u,w]
        
        while(i>0 && arr[this.parent(i)][1] > arr[i][1]){
            let p = this.parent(i);
            [arr[i], arr[p]]=[arr[p], arr[i]];
            i=p;
        }
        this.size++;
    }
    extractMin(){
        if(this.size===0) return null
        let arr = this.harr;
        let n = this.size;
        
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        
        let min = arr.pop();
        this.size--
        
        this.minHeapify(0)
        return min
    }
    minHeapify(i){
        let arr=this.harr
        let n = this.size
        
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            
            let min = i
            
            if(l<n && arr[l][1] < arr[min][1]){
                min = l
            }
            if(r<n && arr[r][1] < arr[min][1]){
                min = r
            }
            
            if(min===i) break;
            
            [arr[i], arr[min]]=[arr[min], arr[i]];
            
            i = min;
        }
    }
}
function dijkstra(V, edges, src) {
    // 1. Build adj list
    let adj = new Array(V)
    for(let i=0; i<V; i++){
        adj[i] = []
    }
    for(let [u, v, w] of edges){
        adj[u].push([v, w])
        adj[v].push([u, w])
    }
    
    // 2. 
    let dist = new Array(V).fill(Infinity)
    dist[src] = 0 // Important
    
    let visited = new Array(V).fill(false)
    
    let h = new MinHeap()
    h.insert([src, 0])
    
    while(h.size > 0){
        let [u, _] = h.extractMin()
        
        if(visited[u]) continue;
        
        visited[u]=true
        
        for(let [v, w] of adj[u]){
            if(!visited[v] && dist[v] > dist[u]+w){
                dist[v]=dist[u]+w;
                h.insert([v, dist[v]])
            }
        }
    }
    
    return dist
}

// WAY2: Maintaining positions of vertices in the heap (for decreaseKey operation)
class MinHeap {
    constructor() {
        this.harr = [];
        this.size = 0;
        this.pos = {}; // maps vertex -> index in heap
    }

    left(i) { return 2 * i + 1; }
    right(i) { return 2 * i + 2; }
    parent(i) { return Math.floor((i - 1) / 2); }

    swap(i, j) {
        [this.harr[i], this.harr[j]] = [this.harr[j], this.harr[i]];
        this.pos[this.harr[i][0]] = i;
        this.pos[this.harr[j][0]] = j;
    }

    minHeapify(i) {
        let n = this.size, arr = this.harr;
        
        while (true) {
            let l = this.left(i);
            let r = this.right(i);
            let min = i;
            
            if (l < n && arr[l][1] < arr[min][1]) min = l;
            if (r < n && arr[r][1] < arr[min][1]) min = r;
            
            if (min === i) break;
            
            this.swap(i, min);
            i = min;
        }
    }

    insert(k) {
        let i = this.size, arr = this.harr;
        arr[i] = k;
        this.pos[k[0]] = i; // track vertex position
        
        while (i > 0 && arr[this.parent(i)][1] > arr[i][1]) {
            let p = this.parent(i);
            this.swap(i, p);
            i = p;
        }
        this.size++;
    }

    extractMin() {
        if (this.size === 0) return null;
        
        let n = this.size, arr = this.harr;
        this.swap(0, n - 1);
        
        let min = arr.pop();
        delete this.pos[min[0]];
        
        this.size--;
        if (this.size > 0) this.minHeapify(0);
        
        return min;
    }

    decreaseKey(v, newDist) {
        let i = this.pos[v];
        this.harr[i][1] = newDist;
        
        while (i > 0 && this.harr[this.parent(i)][1] > this.harr[i][1]) {
            let p = this.parent(i);
            this.swap(i, p);
            i = p;
        }
    }

    isInHeap(v) {
        return this.pos.hasOwnProperty(v);
    }
}
function dijkstra(adj) {
    let V = adj.length;
    let dist = new Array(V).fill(Infinity);
    let visited = new Array(V).fill(false);
    let h = new MinHeap();

    dist[0] = 0;
    h.insert([0, 0]); // [vertex, distance]

    while (h.size > 0) {
        let [u, d] = h.extractMin();
        visited[u] = true;

        for (let [v, weight] of adj[u]) {
            if (!visited[v] && dist[v] > dist[u] + weight) {
                dist[v] = dist[u] + weight;
                if (h.isInHeap(v)) { // // ⭐⭐⭐⭐
                    h.decreaseKey(v, dist[v]); // ⭐⭐⭐⭐
                } else {
                    h.insert([v, dist[v]]); // // ⭐⭐⭐⭐
                }
            }
        }
    }

    return dist;
}


// NOTE:✅ If you remove visited array, then you can use this approach to optimize the algorithm.
function dijkstra(V, edges, src) {
    // 1. Build adj list
    let adj = Array.from({ length: V }, () => []);

    for (let [u, v, w] of edges) {
        adj[u].push([v, w]);
        adj[v].push([u, w]);
    }

    // 2. Distance array
    let dist = Array(V).fill(Infinity);
    dist[src] = 0;

    // 3. MinHeap
    let h = new MinHeap();
    h.insert([src, 0]);   // [node, distance]

    while (h.size > 0) {
        let [u, currWeight] = h.extractMin();

        // ✅ Skip outdated entries
        if (currWeight > dist[u]) continue; // This ensures currWeight===dist[u] after this line.

        // 4. Relax edges
        for (let [v, w] of adj[u]) {
            let newCost = currWeight + w; // In this Version, currWeight===dist[u]

            if (newCost < dist[v]) {
                dist[v] = newCost;
                h.insert([v, newCost]);   // ✅ push the improved distance
            }
        }
    }

    return dist;
}
