function KMPSearch(txt, pat) {
    const n = txt.length, m = pat.length;
    if (m > n) return -1;

    // Step 1: Build LPS array
    const lps = new Array(m).fill(0);
    let len = 0, i = 1;
    while (i < m) {
        if (pat[i] === pat[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    // Step 2: Search using KMP
    let j = 0; // index for pat
    for (let i = 0; i < n; ) {
        if (txt[i] === pat[j]) {
            i++;
            j++;
            if (j === m) {
                return i - j; // found match (Returning 1st occurance index of the pattern in the text)
            }
        } else {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return -1; // not found
}

// 🔹 Test cases
console.log(KMPSearch("GeeksForGeeks", "Fr"));   // -1
console.log(KMPSearch("GeeksForGeeks", "For"));  // 5
console.log(KMPSearch("GeeksForGeeks", "gr"));   // -1
console.log(KMPSearch("abcdabcabcd", "abcabcd")); // 4
