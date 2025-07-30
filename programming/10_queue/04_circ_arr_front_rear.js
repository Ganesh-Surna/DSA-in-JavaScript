class MyQueue {
    constructor() {
        this.front = 0;
        this.rear = 0;
        this.arr = new Array(100005);
    }

    /**
     * @param {number} x
     */
    push(x) {
        if ((this.rear + 1) % 100005 === this.front) {
            // Queue is full (though per constraints, it shouldn't happen)
            return;
        }
        this.arr[this.rear] = x;
        this.rear = (this.rear + 1) % 100005;
    }

    /**
     * @returns {number}
     */
    pop() {
        if (this.front === this.rear) {
            // Queue is empty
            return -1;
        }
        const poppedElement = this.arr[this.front];
        this.front = (this.front + 1) % 100005;
        return poppedElement;
    }
}