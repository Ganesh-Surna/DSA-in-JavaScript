class MyHash {
  constructor(c) {
    this.cap = c; // capacity
    this.size = 0; //
    this.table = new Array(c).fill(-1); // means empty
  }
  hash(x) {
    return x % this.cap;
  }
  search(x) {
    const hIdx = this.hash(x);
    let i = hIdx;

    // stop when the slot is empty
    while (this.arr[i] !== -1) {
      if (this.arr[i] === x) return true;
      i = (i + 1) % this.cap; // Linear probing (even circularly)

      // if we have come back to the same index, then the element is not present
      if (i === hIdx) {
        return false;
      }
    }
    return false;
  }
  insert(x) {
    if (this.size === this.cap) {
      return false;
    }

    const i = this.hash(x);

    while (
      this.table[i] !== -1 &&
      this.table[i] !== -2 &&
      this.table[i] !== x
    ) {
      i = (i + 1) % this.cap;
    }

    if (this.table[i] === x) return false;
    else {
      this.table[i] = x;
      this.size++;
      return true;
    }
  }
  delete(x) {
    const hIdx = this.hash(x);
    let i = hIdx;
    while (this.table[i] !== -1) {
      if (this.table[i] === x) {
        this.table[i] = -2;
        return true
      }

      i = (i + 1) % this.cap;
      if (i === hIdx) return false;
    }
    return false;
  }
}
