const arr1 = ["cat", "fox", "apple"];
arr1.sort();
console.log(arr1); // ['apple', 'cat', 'fox']

const arr2 = [1, 1000, 20, 35, 15];
arr2.sort(); // Means it sorts by the characters(like strings) only even it is a numbers array
console.log(arr2); // [1, 1000, 15, 20, 35]

// STABLE SORTING IN JS:
const arr3 = [1, 1000, 20, 35, 15];
arr3.sort((x, y) => x - y); // ASC
console.log(arr3); // [1, 15, 20, 35, 1000]

arr3.sort((x, y) => y - x); // DESC
console.log(arr3); // [1000, 35, 20, 15, 1]
