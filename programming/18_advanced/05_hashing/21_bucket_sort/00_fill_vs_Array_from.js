

/* ✅ Let’s compare Array(n).fill([]) vs Array.from({length: n}, () => []).

✅ Case 1: fill([])
let arr = Array(3).fill([]);
arr[0].push(1);

console.log(arr);
👉 Output:[ [1], [1], [1] ]

All 3 slots reference the same array object.
When you push(1) into arr[0], it appears in all slots.
This is because fill([]) puts the same reference in each index.


✅ Case 2: Array.from({length: 3}, () => [])
let arr = Array.from({length: 3}, () => []);
arr[0].push(1);

console.log(arr);
👉 Output:[ [1], [], [] ]


Each slot gets a new independent array.
So modifying arr[0] does not affect arr[1] or arr[2].
This is exactly what we want for “buckets” in bucket sort.

✅ Summary:
fill([]) → ❌ All elements share the same array (bad if you need independent buckets).
Array.from({length: n}, () => []) → ✅ Each element is its own fresh array.
*/