// About Map in JavaScript
// A Map is a built-in object that allows you to store key-value pairs. 
// Keys can be of any type (including objects, functions, etc.).

// --- Creating a Map ---
const map1 = new Map(); // Empty map
const map2 = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
console.log(map2); // Map(3) { 'a' => 1, 'b' => 2, 'c' => 3 }

// --- Key Methods on Map ---
map1.set('x', 10); // Adds key 'x' with value 10
map1.set('y', 20).set('z', 30); // Chaining is possible
console.log(map1.get('x')); // 10
console.log(map1.has('y')); // true
map1.delete('y'); // Removes key 'y'
console.log(map1.size); // 2
map1.clear(); // Removes all entries

// --- Ways to Traverse a Map ---
const map3 = new Map([
  ['name', 'Alice'],
  ['age', 25],
  ['city', 'Wonderland'],
]);

// 1. for...of loop (entries)
for (const [key, value] of map3) {
  console.log(key, value);
}

// 2. forEach method
map3.forEach((value, key) => {
  console.log(key, value);
});

// 3. Using keys(), values(), entries()
for (const key of map3.keys()) {
  console.log(key); // keys only
}
for (const value of map3.values()) {
  console.log(value); // values only
}
for (const [key, value] of map3.entries()) {
  console.log(key, value); // key-value pairs
}

// --- Important Notes ---
// - Map keys can be of any type (primitive or object).
// - ✅ Map preserves insertion order of keys.
// - Map allows duplicate values but unique keys.
// - Objects as keys are compared by reference.
const objKey = { id: 1 };
const map4 = new Map();
map4.set(objKey, 'Object Value');
map4.set({ id: 1 }, 'Another Object'); // Different object, so different key
console.log(map4.size); // 2

// --- Common Use Cases ---
// 1. Storing data with non-string keys:
const funcKey = function() {};
const map5 = new Map();
map5.set(funcKey, 'Function as key');
map5.set(123, 'Number as key');
map5.set(true, 'Boolean as key');
console.log(map5.get(funcKey)); // 'Function as key'

// 2. Counting occurrences (frequency map):
const arr = ['a', 'b', 'a', 'c', 'b', 'a'];
const freqMap = new Map();
for (const item of arr) {
  freqMap.set(item, (freqMap.get(item) || 0) + 1);
}
console.log(freqMap); // Map(3) { 'a' => 3, 'b' => 2, 'c' => 1 }

// --- Summary ---
// Map is useful for storing key-value pairs with any type of key, 
// maintaining insertion order, and 
// efficient lookups.
