class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}
class Deque {
  constructor() {
    this.front = null;
    this.rear = null;
    this.sz = 0;
  }
  insertFront(x) {
    const newNode = new Node(x);
    if (this.sz === 0) {
      this.front = this.rear = newNode;
    } else {
      this.front.prev = newNode;
      newNode.next = this.front;
      this.front = newNode;
    }
    this.sz++;
  }
  insertRear(x) {
    const newNode = new Node(x);
    if (this.sz === 0) {
      this.front = this.rear = newNode;
    } else {
      this.rear.next = newNode;
      newNode.prev = this.rear;
      this.rear = newNode;
    }
    this.sz++;
  }
  deleteFront() {
    if (this.sz === 0) return null;

    let res = this.front.data;
    if (this.sz === 1) {
      this.front = this.rear = null;
    } else {
      let next = this.front.next;
      next.prev = null;
      this.front = next;
    }

    this.sz--;
    return res;
  }
  deleteRear() {
    if (this.sz === 0) return null;

    let res = this.rear.data;
    if (this.sz === 1) {
      this.front = this.rear = null;
    } else {
      let prev = this.rear.prev;
      prev.next = null;
      this.rear = prev;
    }

    this.sz--;
    return res;
  }
  getFront() {
    if (this.sz === 0) return null;

    return this.front.data;
  }
}
