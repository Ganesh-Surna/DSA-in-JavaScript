let magic = 1;
function magic() {
  console.loog("Magic function");
}

magic(); // Output:  TypeError because you're trying to declare both a variable and a function with the same name magic in the same scope.

// Ex 2:
var magic = 1;
function magic() {
  console.loog("Magic function");
}

magic(); // Output: TypeError: magic is not a function

// Ex 3:
function magic() {
  console.loog("Magic function");
}
var magic = 1;

magic(); // Output: TypeError: magic is not a function

// What Happens in  Ex2 & Ex3?

// Hoisting: Both the var magic declaration and the function magic() declaration are hoisted to the top of the scope.

// Function Takes Precedence: Function declarations are prioritized over var declarations in hoisting. So initially, magic becomes the function.

// Variable Assignment: Then, the var magic = 1 assignment executes, overwriting the function with the number 1.

// Calling magic(): When you try to call magic(), JavaScript realizes magic is now a number (1), not a function,
// so it throws: TypeError: magic is not a function
