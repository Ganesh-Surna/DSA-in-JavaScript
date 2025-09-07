
// ✅ Euclidean Algorithm

export function gcd() {
  // TC --> O(log(min(a,b)))
  // SC --> O(1)
  function fun1(a, b) {
    // let max = Math.max(a, b);
    // let min = Math.min(a, b);
    // let rem = max % min;
    // while (rem > 0) {
    //   max = min;
    //   min = rem;
    //   rem = max % min;
    // }
    // return min;
    while (b !== 0) {
      [a, b] = [b, a % b]; //Swaping
      //   You asked if using an array for swapping affects the space complexity. 
      // In JavaScript, [a, b] = [b, a] creates a temporary array of size 2 for the swap. 
      // However, this is still constant space—it does not depend on the size of the input numbers, just a fixed, small amount of extra memory.
    }
    return a;
  }
  console.log("GCD : ", fun1(10, 15));

  // TC --> O(log(min(a,b)))
  // SC --> O(log(min(a,b)))
  function fun2(a, b) {
    if (b === 0) {
      return a;
    }
    return fun2(b, a % b);
  }
  console.log("GCD : ", fun2(10, 15));

  // TC --> O(log(min(a,b)))
  // SC --> O(1)
  function fun3(a, b) {
    let res = Math.min(a, b);

    while (res > 0) {
      if (a % res === 0 && b % res === 0) {
        // return res; // steps out of the function itself
        break; // it will break the loop, not the function
      }
      res = Math.floor(res / 2);
    }

    // will mot be executes if returned in loop. Will be executes if break used.
    // console.log("Hello")
    return res;
  }
  console.log("GCD : ", fun3(10, 15));
}

// Idea for this problem:

// The GCD (Greatest Common Divisor) of two numbers is the largest number that divides both of them without leaving a remainder.
//
// There are several ways to compute the GCD:
//
// 1. Euclidean Algorithm (Iterative and Recursive):
//    - The key idea is: GCD(a, b) = GCD(b, a % b).
//    - We keep replacing the larger number with the remainder of dividing the larger by the smaller, until one of them becomes zero. The other number at that point is the GCD.
//    - This is very efficient (O(log(min(a, b)))).
//
// 2. Brute Force (Decremental Search):
//    - Start from the smaller of the two numbers and check if it divides both numbers.
//    - Decrease the candidate until you find a number that divides both.
//    - This is less efficient, especially for large numbers.

// Explanation:

// - The Euclidean algorithm works because if a = bq + r, then any number that divides both a and b must also divide r (the remainder).
// - This reduces the problem size at each step, making it fast.
//
// Example:
// - GCD(10, 15):
//   - 15 % 10 = 5 → GCD(10, 5)
//   - 10 % 5 = 0 → GCD(5, 0)
//   - So, GCD is 5.
