// TC = O(n)
// SC = O(1)
var largestGoodIntegerEfficient = function (num) {
  let max = -Infinity;

  for (let i = 0; i <= num.length - 3; i++) {
    if (num[i] === num[i + 1] && num[i] === num[i + 2]) {
      // let s = num[i].repeat(3)
      let s = num[i] + num[i + 1] + num[i + 2];
      max = Math.max(max, parseInt(s));
    }
  }

  return max === -Infinity ? "" : max.toString().padStart(3, "0");
};


// TC = O(n)
// SC = O(1)
var largestGoodInteger = function (num) {
  let k = 3;
  let max = -Infinity,
    q = []; // stores indices

  for (let i = 0; i < num.length; i++) {
    while (q.length > 0 && q[0] <= i - k) {
      q.shift();
    }

    while (q.length > 0 && num[q[0]] !== num[i]) {
      q.pop();
    }

    q.push(i);

    if (i >= k - 1) {
      if (q.length === 3) {
        let s = num[q[0]] + num[q[1]] + num[q[2]];
        max = Math.max(max, parseInt(s));
      }
    }
  }

  return max === -Infinity ? "" : max.toString().padStart(3, "0");
};
