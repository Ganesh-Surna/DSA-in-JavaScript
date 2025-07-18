class Solution {
    nthTermOfGP(a1, r, n) {
        if (n === 1) return a1;
        if (r === 1) return a1; // All terms are a1 if r=1

        const power = (base, exp) => {
            let res = 1;
            while (exp > 0) {
                if (exp % 2 === 1) res *= base;
                base *= base;
                exp = Math.floor(exp / 2);
            }
            return res;
        };

        return a1 * power(r, n - 1);
    }
}

