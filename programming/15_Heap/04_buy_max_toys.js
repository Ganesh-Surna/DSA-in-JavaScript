class MinHeap {
    constructor(cap) {
        this.heap_size = 0;
        this.capacity = cap;
        this.harr = new Array(cap);
    }

    parent(i) { return Math.floor((i - 1) / 2); }

    left(i) { return (2 * i + 1); }

    right(i) { return (2 * i + 2); }

    // You need to write code for below three functions
    /**
     * @return {number}
     */
    extractMin() {
        // Your code here.
        let arr = this.harr, n = this.heap_size
        if(n===0) return -1;
        
        // Step1: Swap root with last
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        
        // Step2: Delete last (min after above swap)
        let min = arr.pop()
        this.heap_size--
        
        // Step3: Only root violates the minHeap properties, so minHeapify the root
        this.MinHeapify(0)
        
        return min
    }

    /**
     * @param {number} k
     */

    // ✅ TC = O()
    insertKey(k) {
        // Your code here.
        let arr = this.harr
        if(this.heap_size === this.capacity) return
        
        // New Index to be heap_size
        let i = this.heap_size
        arr[i] = k
        
        // If parent is greater than the child then swap, (minHeapifying iteratively)
        while(i > 0 && arr[this.parent(i)] > arr[i]){
            let p = this.parent(i);
            [arr[i], arr[p]] = [arr[p], arr[i]];
            i=p
        }
        
        this.heap_size++
    }

    /**
     * @param {number} i
     */
    deleteKey(i) {
        // Your code here.
        if(i >= this.heap_size || this.heap_size === 0) return
        this.decreaseKey(i, -Infinity)
        this.extractMin()
    }

    // Decrease key operation, helps in deleting the element
    decreaseKey(i, new_val) {
        this.harr[i] = new_val;
        while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
            let temp = this.harr[i];
            this.harr[i] = this.harr[this.parent(i)];
            this.harr[this.parent(i)] = temp;
            i = this.parent(i);
        }
    }

    /* You may call below MinHeapify function in
      above codes. Please do not delete this code
      if you are not writing your own MinHeapify */
    MinHeapify(i) {
        let l = this.left(i);
        let r = this.right(i);
        let smallest = i;
        if (l < this.heap_size && this.harr[l] < this.harr[i]) smallest = l;
        if (r < this.heap_size && this.harr[r] < this.harr[smallest]) smallest = r;
        if (smallest != i) {
            let temp = this.harr[i];
            this.harr[i] = this.harr[smallest];
            this.harr[smallest] = temp;
            this.MinHeapify(smallest);
        }
    }

    size(){
        return this.heap_size
    }
}

// K is amount to buy the max toys

// TC = O(N log N)
// SC = O(N) (due to the heap storage).
function toyCountUsingHeap(arr, N, K){
        // Step 1: Insert elements into Heap (Building heap)
        const heap = new MinHeap(N);
        for(let i=0; i<N; i++){
            heap.insertKey(arr[i])
        }

        // Step 2: Extract Min & add to sum if sum + min <= K
        let sum=0, toys_count = 0
        while(heap.size() > 0){
            let min = heap.extractMin()

            sum += min
            if(sum > K) return toys_count;
            else{
                toys_count++
            }
        }

        return toys_count
}

// Time: O(N log N) (due to sorting).
// Space: O(1) (if sorting is done in-place).
function toyCountUsingSorting(arr, N, K) {
    arr.sort((a, b) => a - b); // Sort in ascending order (O(N log N))
    let sum = 0, toys_count = 0;

    for (let i = 0; i < N; i++) {
        if (sum + arr[i] <= K) {
            sum += arr[i];
            toys_count++;
        } else {
            break; // Budget exceeded
        }
    }

    return toys_count;
}

// Why Sorting is Better?
// Sorting is simpler and faster for this problem because:
//      Heap operations have higher constant factors (slower in practice).
//      Sorting + linear scan is more cache-friendly.