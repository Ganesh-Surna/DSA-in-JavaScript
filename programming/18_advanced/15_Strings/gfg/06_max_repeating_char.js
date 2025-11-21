function getMaxOccuringChar(s) {
    let freq = new Array(26).fill(0);
    
    // Count frequency of each character
    for (let ch of s) {
        freq[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
    }

    let maxFreq = 0;
    let res = '';

    // Find the lexicographically smallest char with highest frequency
    for (let i = 0; i < 26; i++) {
        if (freq[i] > maxFreq) {
            maxFreq = freq[i];
            res = String.fromCharCode(i + "a".charCodeAt(0));
        }
    }

    return res;
}


let s = "testsample" // e
s = "output" // t
s = 'xyza' // a

s = "wlrbbmqbhcdarzowkkyhiddqscdxrjmowfrxsjybldbefsarcbynecdyggxxpklorellnmpapqfwkhopkmco" 
// Output: b ---> since [3, 6, 5, 6, 3, 3, 2, 3, 6, 3, 0, 0, 0, 4, 4, 4, 1] - b, d and i occuring 6 times. Among them b is loxicographically smaller
console.log(getMaxOccuringChar(s))