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
    extractMin() { // ✅ TC = O(logn)
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

    // ✅ TC = O(logn)
    insertKey(k) { // ✅ TC = O(logn)
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
            i=p // Move to the parent
        }
        
        this.heap_size++ // Increment the heap size
    }

    /**
     * @param {number} i
     */
    deleteKey(i) { // ✅ TC = O(logn)
        // Your code here.
        if(i >= this.heap_size || this.heap_size === 0) return
        this.decreaseKey(i, -Infinity)
        this.extractMin()
    }
    
    // Decrease key operation, helps in deleting the element
    // Decreasing key at index i will not effect the childs but may effect the parent (coz of min-heap property - the children should be greater than the node)
    decreaseKey(i, new_val) { // ✅ TC = O(logn)
        this.harr[i] = new_val;
        while (i > 0 && this.harr[this.parent(i)] > this.harr[i]) {
            let temp = this.harr[i];
            this.harr[i] = this.harr[this.parent(i)];
            this.harr[this.parent(i)] = temp;
            i = this.parent(i); // Move to the parent
        }
    }

    /* You may call below MinHeapify function in
      above codes. Please do not delete this code
      if you are not writing your own MinHeapify */
    MinHeapify(i) { // ✅ TC = O(logn)
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
}