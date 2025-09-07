class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }
  printList() {
    if (!this.head) return;

    let curr = this.head;
    while (curr) {
      console.log(curr.data);
      curr = curr.next;
    }
  }
  recursivePrint(node = this.head) {
    if (!node) return;

    console.log(node.data);
    this.recursivePrint(node.next);
  }

  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let curr = this.head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = newNode;
  }

  insertAt(data, pos) {
    if (pos < 1) {
      console.log("Position should be >=1");
      return;
    }

    const newNode = new Node(data);

    if (pos === 1) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let curr = this.head;
    for (let i = 1; i < pos - 1 && curr; i++) {
      curr = curr.next;
    }
    if (!curr) {
      console.log("Position should be valid");
      return;
    }
    newNode.next = curr.next;
    curr.next = newNode;
  }

  delete(data) {
    if (!this.head) return -1;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.data !== data) {
      curr = curr.next;
    }
    if (!curr.next) {
      console.log("Not found to delete");
      return;
    }
    curr.next = curr.next.next;
  }

  removeNthFromEnd(head=this.head, n) {
    // dummy node to handle edge cases where the head needs to be removed
    let dummy = new Node(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;

    // Move fast n+1 steps ahead (Why n+1? because we used extra dummy node)
    for (let i = 0; i <= n && fast; i++) {
        fast = fast.next;
    }

    if (!fast) return dummy.next;

    // Move both pointers until fast reaches the end
    while (fast !== null) {
        fast = fast.next;
        slow = slow.next;
    }

    // Remove the nth node from the end
    slow.next = slow.next.next;

    return dummy.next; // return the new head
};

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
    return pos + 1;
  }

  recursiveSearch(data, node = this.head) {
    if (!node) return -1;
    if (node.data === data) return 1;

    let pos = this.recursiveSearch(data, node.next);

    if (pos === -1) return -1;
    return 1 + pos;
  }

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

    newNode.next = curr.next;
    curr.next = newNode;
  }

  middleNode() {
    if (!this.head) return -1;

    let slow = this.head, fast = this.head;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow.data;
  }

  // ✅ TC : O(n)
  // ✅ SC : O(1)
  length() {
    if (!this.head) return 0;

    let curr = this.head;
    let count = 0;
    // while(curr){
    //     count++
    //     curr = curr.next
    // }
    for (; curr; count++) {
      curr = curr.next;
    }
    return count;
  }

  // ✅ TC : O(n)
  // ✅ SC : O(1)
  nthNodeFromEnd(n) {
    let len = this.length();
    if (n > len) {
      return -1;
    }

    let desiredPos = len - n + 1;
    let curr = this.head;

    for (let i = 1; curr; i++) {
      if (i === desiredPos) {
        return curr.data;
      }
      curr = curr.next;
    }
    return -1;
  }
  // ✅ TC : O(n)
  // ✅ SC : O(1)
  nthNodeFromEndTwoPointer(n) {
    if (n < 1) return -1;
    if (!this.head) return -1;

    let second = this.head,
      first = this.head;
    for (let i = 1; i < n && first; i++) {
      first = first.next;
    }

    if (!first) {
      return -1;
    }

    while (first.next) {
      second = second.next;
      first = first.next;
    }

    return second.data;
  }

  // ✅ TC : O(n)
  // ✅ SC : O(1)
  reverse() {
    if (!this.head) return;

    let prev = null,
      curr = this.head;
    while (curr) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.head = prev;
  }

  removeDupsFromSortedList() {
    if (!this.head) console.log("Empty List");

    // let curr = this.head.next, prevUnique = this.head
    // while(curr){
    //     if(curr.data !== prevUnique.data){
    //         prevUnique.next = curr
    //         prevUnique = curr
    //     }
    //     curr = curr.next
    // }

    let curr = this.head;
    while (curr && curr.next) {
      if (curr.data === curr.next.data) {
        curr.next = curr.next.next;
      } else {
        curr = curr.next;
      }
    }
  }
}

const l = new LinkedList();
l.append(1);
l.append(2);
l.append(4);
l.append(6);
// l.printList()
l.insertAt(10, 5);
console.log("Search position: ", l.search(10));
console.log("Recursive Search position: ", l.recursiveSearch(10));
// l.delete(11)
l.sortedInsert(0);
l.printList();
// l.recursivePrint()
console.log("Middle Node: ", l.middleNode());
console.log("Nth Node from end: ", l.nthNodeFromEnd(6));
console.log(
  "Nth Node from end 2 pointer approach: ",
  l.nthNodeFromEndTwoPointer(6)
);
l.reverse();
l.printList();
