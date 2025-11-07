
/*
====================================
GRAPH - BASICS
====================================

1) DEFINITION
   - A graph G = (V, E) is a set of vertices/nodes V and edges E connecting pairs of vertices
   - Edges can be directed (u → v) or undirected (u — v)
   - Edges can have weights/costs; graphs can be weighted or unweighted

2) TERMINOLOGY
   - Vertex/Node: Fundamental unit
   - Edge: Connection between two vertices
   - Degree (undirected): Number of incident edges on a vertex
   - In-degree/Out-degree (directed): Incoming/outgoing edge counts
   - Path: Sequence of vertices connected by edges (Also called as Walk in some books)
   - Simple Path: Path with no repeated vertices (If Walk is considered as per a book, then Simple Path is called as Path in those books)
   - Cycle: Path starting/ending at same vertex with ≥1 edge
   - Connected (undirected): Every vertex is reachable from any other
   - Strongly Connected (directed): Every vertex reachable from every other via directed paths
   - Weakly Connected (directed): Connected if directions are ignored
   - Component: Maximal connected subgraph
   - DAG: Directed Acyclic Graph (no directed cycles)

3) REPRESENTATIONS
   a) Adjacency List (preferred for sparse graphs)
      - For each vertex, store a list of neighbors (optionally with weights)
      - Space: O(V + E)
      - Iterating neighbors of u: O(deg(u))
   b) Adjacency Matrix (preferred for dense graphs)
      - V×V boolean/weight matrix M[u][v]
      - Space: O(V^2)
      - Edge existence check in O(1); iterating all neighbors costs O(V)

4) COMPLEXITIES (using adjacency list)
   - BFS/DFS (over whole graph): O(V + E)
   - Topological sort: O(V + E)
   - Connected components: O(V + E)
   - Dijkstra (with binary heap): O((V + E) log V)
   - Dijkstra (with Fibonacci heap): O(E + V log V)
   - Bellman–Ford: O(V·E)
   - Floyd–Warshall (all-pairs shortest path): O(V^3)
   - Kruskal (MST, with DSU): O(E log V)
   - Prim (MST, with heap): O((V + E) log V)

5) TRAVERSALS
   a) BFS (Breadth-First Search)
      - Uses queue; explores level by level from a source
      - Shortest paths in unweighted graphs
      - Detect bipartite (2-coloring), compute levels, find connected components
   b) DFS (Depth-First Search)
      - Uses recursion/stack; explores as deep as possible
      - Cycle detection, topological sort, articulation points, bridges, SCC (with Kosaraju/Tarjan)

6) COMMON GRAPH TYPES
   - Undirected vs Directed
   - Unweighted vs Weighted (positive, zero, negative)
   - Simple (no parallel edges/self-loops) vs Multigraph
   - Sparse (E ≈ O(V)) vs Dense (E ≈ O(V^2))
   - Bipartite: Vertices can be split into two sets, edges cross sets only
   - Tree: Connected, acyclic, undirected graph (E = V - 1)
   - Forest: Disjoint union of trees
   - DAG: Directed graph with no directed cycles

7) CORE ALGORITHMS/PROBLEMS
   - Shortest Paths:
     * Unweighted: BFS
     * Non-negative weights: Dijkstra
     * With negatives (no negative cycles): Bellman–Ford
     * All pairs (dense/small V): Floyd–Warshall
   - Minimum Spanning Tree (undirected, connected, weighted): Kruskal (sort + DSU), Prim
   - Topological Sort (DAG): Kahn’s algorithm (in-degree + queue) or DFS order
   - Strongly Connected Components (directed): Kosaraju (DFS twice) or Tarjan (lowlink)
   - Cycle Detection:
     * Undirected: DFS with parent check / DSU
     * Directed: DFS with recursion stack / Kahn detects leftover nodes
   - Bridges and Articulation Points (undirected): Tarjan with discovery/low times
   - Bipartite Check: BFS/DFS coloring in 2 colors

8) DISJOINT SET UNION (DSU / UNION-FIND)
   - Maintains disjoint sets with operations: find, union
   - Path compression + union by rank/size → near O(α(n)) amortized
   - Used in Kruskal’s MST, cycle detection, connectivity queries

9) IMPORTANT PROPERTIES/FORMULAS
   - Handshaking Lemma (undirected): Σ degree(v) = 2E
   - For directed graphs: Σ out-degree(v) = Σ in-degree(v) = E
   - Trees: Connected, acyclic → E = V - 1
   - In any undirected graph: E ≥ V - C, where C = number of connected components
   - Simple graph edge bounds: 0 ≤ E ≤ V(V-1)/2 (undirected), 0 ≤ E ≤ V(V-1) (directed)

10) STORAGE AND VISITED STATE
   - visited[v]: boolean array/set to avoid revisiting
   - parent[v]/dist[v]/color[v]/low[v]/disc[v]: helper arrays commonly used
   - For weighted graphs: store pairs {to, weight} in adjacency list

11) PITFALLS & TIPS
   - Always initialize visited; beware of 1-indexed vs 0-indexed nodes
   - For disconnected graphs, loop source over all vertices to cover all components
   - Beware negative weights: Dijkstra requires non-negative weights
   - Detect negative cycles with Bellman–Ford (extra relaxation) or SPFA checks
   - Use long/int64 for large path sums; weights can overflow
   - Prefer adjacency list for large sparse graphs to save memory/time

12) COMPLEXITY CHEATSHEET (ADJACENCY LIST)
   - BFS/DFS/Topo/Components: O(V + E) time, O(V) space (+ recursion/queue)
   - Dijkstra (binary heap): O((V + E) log V), space O(V)
   - Bellman–Ford: O(V·E), space O(V)
   - Floyd–Warshall: O(V^3) time, O(V^2) space
   - Kruskal/Prim: ~O(E log V)

13) USE CASES
   - Navigation/Maps (shortest path)
   - Social networks (recommendations, connectivity)
   - Compilers (DAGs, dependency resolution, SSA)
   - Scheduling (topological ordering, critical path)
   - Web crawling, search engines (PageRank is on graphs)
   - Networking (routing, spanning trees)
   - Biology (protein interaction networks)
   - Transportation, logistics, supply chains

14) SAMPLE REPRESENTATIONS (JS)
   // Adjacency List (unweighted)
   // const graph = [ [1,2], [0,3], [0,3], [1,2] ];

   // Adjacency List (weighted)
   // const graph = [ [{to:1,w:5}], [{to:0,w:5},{to:2,w:1}], ... ];

   // Adjacency Matrix (0/1 or Infinity for no edge)
   // const M = Array.from({length: V}, () => Array(V).fill(0));

15) HIGH-LEVEL TEMPLATES
   // BFS (unweighted shortest path)
   // function bfs(start){
   //   const q = [start], dist = Array(V).fill(Infinity); dist[start] = 0;
   //   const visited = Array(V).fill(false); visited[start] = true;
   //   while(q.length){
   //     const u = q.shift();
   //     for(const v of adj[u]){
   //       if(!visited[v]){ visited[v] = true; dist[v] = dist[u] + 1; q.push(v); }
   //     }
   //   }
   //   return dist;
   // }

   // DFS
   // function dfs(u){ visited[u] = true; for(const v of adj[u]) if(!visited[v]) dfs(v); }

*/


