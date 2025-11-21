// ✅ TC = O(n + m)
// ✅ SC = O(256) = O(1)
function concatenatedString(s1, s2) {
    let freq = new Array(256).fill(0); // To track characters of s2

    // Mark all chars present in s2
    for (let ch of s2) {
        freq[ch.charCodeAt(0)] = 1;
    }

    let res = '';

    // Add unique chars from s1 (not in s2)
    for (let ch of s1) {
        if (freq[ch.charCodeAt(0)] === 0) {
            res += ch;
        } else {
            freq[ch.charCodeAt(0)] = -1; // Mark as common
        }
    }

    // Add unique chars from s2 (not common)
    for (let ch of s2) {
        if (freq[ch.charCodeAt(0)] !== -1) {
            res += ch;
        }
    }

    // If no unique characters found
    return res.length > 0 ? res : "-1";
}

console.log(concatenatedString("aacdb", "gafd")) // cbgf
console.log(concatenatedString("aacdb", "gfd")) // aacbgf
console.log(concatenatedString("a", "aa")) // -1
console.log(concatenatedString("abcs", "cxzca")) // bsxz
