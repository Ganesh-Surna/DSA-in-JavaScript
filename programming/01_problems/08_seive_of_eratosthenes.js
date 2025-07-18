export function seiveOfEratosthenes() {
  console.log("******* START of seiveOfEratosthenes ********");
  // ✅ TC= O(n log log n)
  // ✅ SC = O(n)
  function seive1(n){
    let isPrimeArr = new Array(n+1).fill(true);
    isPrimeArr[0] = isPrimeArr[1] = false;
    for(let i=2; i*i<=n; i++){
        if(isPrimeArr[i]){
            for(let j=i*i; j<=n; j+=i){
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
            for(let j=i*i; j<=n; j+=i){
                isPrimeArr[j]=false;
            }
        }
    }
  }
  console.log("--> Sieve2 Result: ")
  seive2(50);
  console.log("******* END of seiveOfEratosthenes ********");
}