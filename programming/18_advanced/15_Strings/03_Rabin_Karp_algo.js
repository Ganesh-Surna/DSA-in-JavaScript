/* Problem: ✅✅✅✅ Rabin-Karp Pattern Searching ✅✅✅✅

Goal: Find all occurrences of a pattern `pat` inside a text `txt` using rolling hash.
We follow the whiteboard steps:
1. Choose base `d` (number of possible characters, e.g. 256) and a prime modulus `q` to limit hash values.
2. Pre-compute `h = pow(d, m-1) % q` and the hash of the pattern (`p`) and first window of text (`t`).
3. Slide the pattern over text one character at a time:
   - If hash values match, check characters to avoid spurious hits.
   - Recompute the next hash using the rolling formula.
4. Return indices wherever the pattern occurs.

Time Complexity: Average / Best O(n + m) due to hashing; Worst O(nm) in case of many collisions.
Space Complexity: O(1) auxiliary.
*/

const CHARSET = 256; // d --> typical choice for extended ASCII

function rabinKarp(txt, pat, q = 101){
    const n = txt.length;
    const m = pat.length;
    if(m === 0 || m > n) return [];

    const result = [];

    // Step 1: precompute h = pow(d, m-1) % q
    let h = 1;
    for(let i = 1; i < m; i++){
        h = (h * CHARSET) % q;
    }

    // Step 2: compute initial hash for pattern (p) and first window of text (t)
    let p = 0;
    let t = 0;
    for(let i = 0; i < m; i++){
        p = ( (p * CHARSET) + pat.charCodeAt(i) ) % q; // p(i+1) = (p(i) * d + pat[i])%q
        t = ( (t * CHARSET) + txt.charCodeAt(i) ) % q; // t(i+1) = (t(i) * d + txt[i])%q
    }

    // Step 3: slide pattern over text
    for(let i = 0; i <= n - m; i++){
        // If hash matches, verify characters to avoid ✅spurious hit✅
        if(p === t){
            let j = 0;
            for(; j < m; j++){
                if(txt[i + j] !== pat[j]) break;
            }
            if(j === m){
                result.push(i);
            }
        }

        // Compute hash for next window: remove leading char, add next char --> t(i+1) = (d * (t(i) - txt[i] * h) + txt[i+m])%q
        if(i < n - m){
            t = (CHARSET * (t - txt.charCodeAt(i) * h) + txt.charCodeAt(i + m)) % q;
            if(t < 0) t += q; // ensure positive
        }
    }

    return result;
}


function example1(){
    const txt = "abdabcabc";
    const pat = "abc";
    const indices = rabinKarp(txt, pat, 101);
    console.log("Example 1:", indices); // Expected [3, 7]
}

function example2(){
    const txt = "aaaaaa";
    const pat = "aaa";
    const indices = rabinKarp(txt, pat, 101);
    console.log("Example 2:", indices); // Expected [0,1,2,3]
}

function example3(){
    const txt = "abcd";
    const pat = "xyz";
    const indices = rabinKarp(txt, pat, 101);
    console.log("Example 3:", indices.length ? indices : "Not Found"); // Expected "Not Found"
}

example1();
example2();
example3();
