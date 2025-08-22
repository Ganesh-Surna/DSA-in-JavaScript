var isPowerOfTwo = function (n) {
  if (n <= 0) return false;

  return (n & (n - 1)) === 0; // (n & (n-1)) paranthesis are important
};

var isPowerOfTwoSimply = function (n) {
  
    return n > 0 && (n & (n - 1)) === 0; // (n & (n-1)) paranthesis are important
  };