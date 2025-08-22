var isPowerOfThree1 = function(n) {
    if(n<=0) return false
    let pow = 1
    while(pow < n){
        pow = pow * 3
    }
    if(pow === n) return true
    return false
};

// Simple
var isPowerOfThree2 = function(n) {
    if (n <= 0) return false;
    while (n % 3 === 0) {
        n = n/3;
    }
    return n === 1;  // means 3/3 --> 1 then only it is pow of 3 (in last iteration of while loop)
};