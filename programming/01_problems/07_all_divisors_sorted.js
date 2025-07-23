
export function allDivisors() {
  console.log("******* START of allDivisors ********");
  // ✅ TC= O(√n)
  // ✅ SC = O(1)
  function allDivisors1(n){
    for(let i=1; i*i<=n; i++){
        if(n%i===0){
            console.log(i)
            if(i != n/i){
                console.log(n/i)
            }
        }
    }
  }
  console.log("--> allDivisors1 result NOT in SORTED ORDER:");
  allDivisors1(100);

  // ✅ TC= O(√n)
  // ✅ SC = O(1)
  function allDivisors2(n){
    let i;
    for(i=1; i*i<n; i++){
        if(n%i===0){
            console.log(i)
        }
    }
    for( ; i>=1; i--){
        if(n%i===0){
            console.log(n/i)
        }
    }
  }
  console.log("--> allDivisors2 result SORTED:");
  allDivisors2(100);
  console.log("******* END of allDivisors ********");
}


// Idea for this problem:
//
// A divisor of a number n is any number that divides n exactly (with remainder 0).
//
// To find all divisors efficiently:
// 1. Iterate from 1 to √n. For each i, if n % i == 0, then both i and n/i are divisors.
// 2. This way, you find divisors in pairs (i, n/i), which avoids unnecessary checks and reduces time complexity to O(√n).
//
// Two approaches:
// - The first approach prints divisors as soon as they are found, but the order is not sorted.
// - The second approach first prints all small divisors (i), then prints the corresponding large divisors (n/i) in reverse, ensuring sorted order.
//
// Explanation:
//
// - Every divisor less than √n has a corresponding divisor greater than √n.
// - By looping up to √n, you avoid duplicate work and ensure all divisors are found.
// - To get divisors in sorted order, print the small divisors first, then the large ones in reverse order.
//
// Example:
// - For n = 100:
//   - Divisors: 1, 2, 4, 5, 10, 20, 25, 50, 100
//   - The first loop finds 1, 2, 4, 5, 10
//   - The second loop (in reverse) finds 20, 25, 50, 100
//   - Combined, all divisors are printed in sorted order.
