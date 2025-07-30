class Deque {
  constructor() {
    this.arr = [];
    this.size = 0;
  }
}

// To know which properties & methods available in any class:
// console.log(Object.getOwnPropertyNames(Deque.prototype))

class Solution {
  /**
   * @param {Deque} dq
   * @param {number} x
   */
  // Function to push element x to the back of the deque.
  push_back_pb(dq, x) {
    dq.arr.push(x);
    dq.size++;
  }

  /**
   * @param {Deque} dq
   */
  // Function to pop element from back of the deque.
  pop_back_ppb(dq) {
    if (dq.size === 0) return;
    dq.arr.pop();
    dq.size--;
  }

  /**
   * @param {Deque} dq
   */
  // Function to return element from front of the deque.

  front_dq(dq) {
    if (dq.size === 0) return -1;
    return dq.arr[0];
  }

  /**
   * @param {Deque} dq
   * @param {number} x
   */

  // Function to push element x to the front of the deque.
  push_front_pf(dq, x) {
    dq.arr.unshift(x);
    dq.size++;
  }
}

class Solution2 {
  // To print space separated elements of the deque:
  printDeque(Deq) {
    console.log(...Deq.arr);
  }
}

class Solution3 {
  /**
   * @param {Deque} deq
   * @param {number} X
   */
  // Function to erase the element from specified position X in deque.
  eraseAt(deq, X) {
    if (X >= 0 && X < deq.size) {
      deq.arr.splice(X, 1);
      deq.size--;
    }
  }

  /**
   * @param {Deque} deq
   * @param {number} start
   * @param {number} end
   */
  // Function to erase the elements in range start (inclusive), end (exclusive).
  eraseInRange(deq, start, end) {
    if (start >= 0 && end <= deq.size && start <= end) {
      let deleteCount = end - start;
      deq.arr.splice(start, deleteCount);
      deq.size -= deleteCount;
    }
  }

  /**
   * @param {Deque} deq
   */
  // Function to erase all the elements in the deque.
  eraseAll(deq) {
    deq.arr = [];
    deq.size = 0;
  }
}
