class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DLL {
  constructor() {
    this.head = null;
  }
  prepend(x) {
    const newNode = new Node(x);
    if (this.head) {
      newNode.next = this.head;
      this.head.prev = newNode;
    }
    this.head = newNode;
  }
  append(x) {
    const newNode = new Node(x);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
    newNode.prev = curr;
  }
  insertAt(x, pos) {
    const newNode = new Node(x);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    if (pos === 1) {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
      return;
    }

    let curr = this.head;
    for (let i = 1; i < pos - 1 && curr; i++) {
      curr = curr.next;
    }
    if (curr) {
      let temp = curr.next;
      curr.next = newNode;
      newNode.prev = curr;
      newNode.next = temp;
      if (temp) {
        temp.prev = newNode;
      }
    }
  }

  reverse() {
    if (!this.head) return;

    let curr = this.head,
      prev = null;
    while (curr) {
      prev = curr;
      // SWAP curr.prev and curr.next:
      // [curr.prev, curr.next]=[curr.next, curr.prev]; // this is also correct but does not worked in GFG
      let currNext = curr.next;
      curr.next = curr.prev;
      curr.prev = currNext;

      curr = curr.prev; // which is next after above swap
    }

    this.head = prev;
  }

  deleteHead() {
    if (!this.head) return;
    this.head = this.head.next;
    if (this.head) {
      this.head.prev = null;
    }
  }

  deleteTail() {
    if (!this.head || !this.head.next) {
      this.head = null;
      return;
    }

    let curr = this.head;
    // let prev = null
    while (curr.next) {
      // prev = curr
      curr = curr.next;
    }

    // No need of this check if "!this.head.next" checked earlier
    // if(curr===this.head){
    //     this.head = null
    //     return
    // }

    let prev = curr.prev; // comment this if above prev used

    prev.next = curr.next;
  }

  deleteAt(pos) {
    if (pos < 1 || !this.head) return;

    if (pos === 1) {
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      }
      return;
    }

    let curr = this.head,
      c = 1;
    while (curr.next && c < pos) {
      curr = curr.next;
      c++;
    }

    if (!curr.next && c !== pos) {
      return;
    }

    let prev = curr.prev;
    let next = curr.next;
    prev.next = curr.next;
    if (next) {
      next.prev = prev;
    }
  }

  print() {
    if (!this.head) return;
    let curr = this.head;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
}

const l = new DLL();
l.prepend(5);
l.prepend(4);
l.prepend(3);
l.prepend(2);
l.prepend(1);
l.append(6);
l.append(7);
l.insertAt(100, 8);
l.reverse();
l.deleteHead();
l.deleteTail();
l.deleteAt(6);
l.print();
