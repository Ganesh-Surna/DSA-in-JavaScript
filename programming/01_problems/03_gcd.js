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
      //   You asked if using an array for swapping affects the space complexity. In JavaScript, [a, b] = [b, a] creates a temporary array of size 2 for the swap. However, this is still constant space—it does not depend on the size of the input numbers, just a fixed, small amount of extra memory.
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
