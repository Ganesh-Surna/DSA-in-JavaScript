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