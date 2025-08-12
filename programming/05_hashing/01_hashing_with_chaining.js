class MyHash {
  constructor(size) {
    this.size = size;
    this.table = new Array(size).fill([]);
  }
  hash(x) {
    return x % this.size;
  }
  search(x) {
    const idx = this.hash(x);
    for (let i = 0; i < this.table[idx].length; i++) {
      if (this.table[idx][i] === x) {
        return true;
      }
    }
    return false;
  }
  insert(x) {
    const idx = this.hash(x);
    this.table[idx].push(x);
  }
  delete(x) {
    if (this.search(x)) {
      const idx = this.hash(x);
      this.table[idx].splice(this.table[idx].indexOf(x), 1);
    }
  }
}

const h = new MyHash(7);
h.insert(70);
h.insert(71);
h.insert(56);
console.log(h.search(56));
h.delete(50);
console.log(h.search(56));
