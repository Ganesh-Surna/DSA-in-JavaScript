// About Set in JavaScript
// A Set is a built-in object that lets you store unique values of any type, whether primitive values or object references.

// --- Creating a Set ---
const set1 = new Set(); // Empty set
const set2 = new Set([1, 2, 3, 4, 4, 5]); // Duplicates are ignored
console.log(set2); // Set(5) { 1, 2, 3, 4, 5 }

// --- Key Methods on Set ---
set1.add(10); // Adds 10 to the set
set1.add(20).add(30); // Chaining is possible
set1.delete(20); // Removes 20 from the set
console.log(set1.has(10)); // true
console.log(set1.size); // 2
set1.clear(); // Removes all elements

// --- Ways to Traverse a Set ---
const set3 = new Set(['a', 'b', 'c']);

// 1. for...of loop
for (const value of set3) {
  console.log(value);
}

// 2. forEach method
set3.forEach((value) => {
  console.log(value);
});

// 3. Using values(), keys(), entries()
for (const value of set3.values()) {
  console.log(value); // values only
}
for (const key of set3.keys()) {
  console.log(key); // same as values for Set
}
for (const [key, value] of set3.entries()) {
  console.log(key, value); // key and value are same in Set
}

// --- Important Notes ---
// - Set only stores unique values. Adding a duplicate has no effect.
// - ✅ Set preserves insertion order.
// - Set can store any type: numbers, strings, objects, etc.
// - Objects and arrays are compared by reference, not by value.
const obj = { x: 1 };
const set4 = new Set();
set4.add(obj);
set4.add({ x: 1 }); // This is a different object, so it's added
console.log(set4.size); // 2

// --- Common Use Cases ---
// 1. Removing duplicates from an array:
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = [...new Set(arr)]; // [1, 2, 3, 4, 5]

// 2. Checking existence efficiently (O(1) average time):
const set5 = new Set(['apple', 'banana']);
console.log(set5.has('apple')); // true
console.log(set5.has('grape')); // false

// --- Summary ---
// Set is useful for storing unique values, 
// fast existence checks, and 
// removing duplicates from arrays.