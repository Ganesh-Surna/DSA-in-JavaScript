// 1. Using Normal array for free slots (Less efficient than DSU)
// ✅ TC = O(N log N) - Sorting by profit
// ✅ SC = O(N) - Additional array
function jobSequencing(deadline, profit) {
    let n = deadline.length
    
    let jobs = []
    for(let i=0; i<n; i++){
        jobs.push([deadline[i], profit[i]])
    }
    
    // 1. Sort jobs by profit in DESC order
    jobs.sort((a, b)=>b[1]-a[1])
    
    // 2. Create slots (len = highest deadline + 1) initially free
    let maxD = Math.max(...deadline)
    let slots = new Array(maxD+1).fill(0) // 0 means free
    
    let count=0
    let maxProfit=0
    
    for(let [d, p] of jobs){
        
        // Reverse direction, coz we need to fill at the latest free slot <= deadline
        for(let t=d; t>0; t--){
            if(slots[t] === 0){ 
                // If the slot is free, fill it.
                slots[t]=1
                count++
                maxProfit += p
                break // Break the inner loop, coz we done with filling/ignoring the job
            }
        }
    }
    
    return [count, maxProfit]
}


// 2. Using DSU for free slots (More efficient than Normal array)
// ✅ TC = O(N log N) - Sorting by profit
// ✅ SC = O(N) - Additional array
function jobScheduling(deadline, profit) {
    const n = deadline.length;

    // Step 1: Create job list → [deadline, profit]
    let jobs = [];
    for (let i = 0; i < n; i++) {
        jobs.push([deadline[i], profit[i]]);
    }

    // Step 2: Sort jobs by profit in descending order
    jobs.sort((a, b) => b[1] - a[1]);

    // Step 3: Find max deadline
    let maxD = 0;
    for (let d of deadline) maxD = Math.max(maxD, d);

    // Step 4: DSU parent array for time slots
    const parent = new Array(maxD + 1);
    for (let i = 0; i <= maxD; i++) parent[i] = i;

    function find(x) {
        if (parent[x] === x) return x;
        return parent[x] = find(parent[x]); // path compression
    }

    function union(x, y) {
        parent[x] = y;
    }

    // Step 5: Schedule jobs
    let count = 0, maxProfit = 0;

    for (let [d, p] of jobs) {
        let available = find(d);
        if (available > 0) {
            // schedule this job at its latest free slot
            union(available, available - 1);
            count++;
            maxProfit += p;
        }
    }

    return [count, maxProfit];
}
