
export function seiveOfEratosthenes() {
  console.log("******* START of seiveOfEratosthenes ********");
  // ✅ TC= O(n log log n)
  // ✅ SC = O(n)
  function seive1(n){
    let isPrimeArr = new Array(n+1).fill(true);
    isPrimeArr[0] = isPrimeArr[1] = false;
    for(let i=2; i*i<=n; i++){ // 
        if(isPrimeArr[i]){
            for(let j=i*i; j<=n; j+=i){  // j=i*i --> We only need to start marking from i*i, because smaller multiples would have already been marked by smaller primes.
                isPrimeArr[j]=false;
            }
        }
    }
    for(let i=2; i<=n; i++){
      if(isPrimeArr[i]) console.log(i);
    }
  }
  console.log("--> Sieve1 Result: ")
  seive1(50);


  // ✅ TC= O(n log log n)
  // ✅ SC = O(n)
  function seive2(n){
    let isPrimeArr = new Array(n+1).fill(true);
    isPrimeArr[0] = isPrimeArr[1] = false;
    for(let i=2; i<=n; i++){
        if(isPrimeArr[i]){
            console.log(i)
            for(let j=i*i; j<=n; j+=i){  // j=i*i --> We only need to start marking from i*i, because smaller multiples would have already been marked by smaller primes.
                isPrimeArr[j]=false;
            }
        }
    }
  }
  console.log("--> Sieve2 Result: ")
  seive2(50);
  console.log("******* END of seiveOfEratosthenes ********");
}


// Idea for this problem:
//
// The Sieve of Eratosthenes is an efficient algorithm to find all prime numbers up to a given number n.
//
// Steps:
// 1. Create a boolean array isPrimeArr[0..n] and initialize all entries as true. (0 and 1 are not prime)
// 2. Start from the first prime number (2). For each prime, mark all its multiples as not prime.
// 3. Repeat for the next number in the array that is still marked as true (prime).
// 4. Continue this process up to √n. All remaining true values in the array represent prime numbers.
//
// Time Complexity: O(n log log n)
// Space Complexity: O(n)
//
// Explanation:
// - By marking multiples of each prime, we efficiently eliminate non-prime numbers.
// - We only need to start marking from i*i, because smaller multiples would have already been marked by smaller primes.
// - The sieve is much faster than checking each number individually for primality.
//
// Example:
// - For n = 20:
//   - Start with all numbers marked as prime.
//   - Mark multiples of 2 (except 2 itself): 4, 6, 8, 10, 12, 14, 16, 18, 20
//   - Mark multiples of 3: 6, 9, 12, 15, 18
//   - Mark multiples of 5: 10, 15, 20
//   - Remaining true indices: 2, 3, 5, 7, 11, 13, 17, 19 (all primes up to 20)
