// Simple Linked list implementation in JS

// Node class represents each element in the linked list
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// LinkedList class manages the list
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Append a node at the end
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Prepend a node at the beginning
  // ✅ TC : O(1)
  // ✅ SC : O(1)
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert a node at a given position (1-based index)
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  insertAt(data, pos) {
    const newNode = new Node(data);
    if (pos < 1) {
      return;
    }
    if (pos === 1) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let current = this.head;
    for (let i = 1; i < pos - 1 && current; i++) { // going till pos-2. for pos-2 the curr will move to pos-1 inside the loop for last time.
      curr = current.next; // i<pos-1 because, the curr will be at the pos-1 node
    }
    if (!current) {
      console.log("Position should be valid");
      return;
    }
    // let count = 1;
    // while (current && count < pos - 1) {
    //   current = current.next;
    //   count++;
    // }
    // if (!current) {
    //   return;
    // }

    // curr is pos-1 node
    newNode.next = current.next; 
    current.next = newNode; 
  }

  // Delete first node with given value
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    if (current.next) {
      // curr.next is the node with data === data
      current.next = current.next.next;
    }
  }

  // Delete first node
  // ✅ TC : O(1)
  // ✅ SC : O(1)
  deleteFirst() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  // Find a node with given value
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  search(data) {
    let pos = 1;
    if (!this.head) return -1;
    if (this.head.data === data) return pos;

    let curr = this.head;
    while (curr.next && curr.next.data !== data) {
      curr = curr.next;
      pos++;
    }

    if (!curr.next) return -1;

    // curr is the node with data === data
    return pos + 1;
  }

  // Find a node with given value recursively
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  recursiveSearch(data, node = this.head) {
    if (!node) return -1;
    if (node.data === data) return 1;

    let pos = this.recursiveSearch(data, node.next);

    if (pos === -1) return -1;
    return 1 + pos;
  }

  // Insert a node in a sorted list
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  sortedInsert(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    if (this.head.data > data) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.data <= data) {
      curr = curr.next;
    }

    // curr is the last node with data <= data
    newNode.next = curr.next;
    curr.next = newNode;
  }

  // Print the list
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  printList() {
    if (!this.head) return;

    let curr = this.head;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }

  // Print the list recursively
  // ✅ TC : O(n)
  // ✅ SC : O(n)
  recursivePrint(node = this.head) {
    if (!node) return;

    console.log(node.data);
    this.recursivePrint(node.next);
  }
}

// Example usage:
// const list = new LinkedList();
// list.append(10);
// list.append(20);
// list.prepend(5);
// list.print(); // 5 -> 10 -> 20 -> null
// list.delete(10);
// list.print(); // 5 -> 20 -> null
// console.log(list.find(20)); // Node { data: 20, next: null }