// Note: Use Map if the alphabets size is larger

// ✅ TC = O(n + AlphabetSize)
// ✅ SC = O(AlphabetSize)
// Single Traversal
function leftmostRepeatingEfficient(s){
    let visited = new Array(256).fill(false) // ascii value as index (a-->97 ,b-->98, so on)

    let res = -1
    
    for(let i=s.length-1; i>=0; i--){
        if(visited[s.charCodeAt(i)]){
            res = i
        }else{
            visited[s.charCodeAt(i)] = true
        }
        
    }
    
    return res
}

function leftmostRepeatingOnlyaToz(s) {
    let visited = new Array(26).fill(false); // Only for 'a' to 'z'
    let res = -1;
    
    for (let i = s.length - 1; i >= 0; i--) {
        const index = s.charCodeAt(i) - 'a'.charCodeAt(0);
        if (visited[index]) {
            res = i;
        }else{
            visited[index] = true;
        }
    }
    
    return res;
}


// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Hash map for storing first occurrences
function firstRepeated(arr) {
    let m = new Map();
    let minIndex = Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        if (m.has(arr[i])) {
            // This element has appeared before, check if it's the smallest index so far
            minIndex = Math.min(minIndex, m.get(arr[i]));
        } else {
            // Store the first occurrence (using 1-based indexing)
            m.set(arr[i], i + 1);
        }
    }
    
    return minIndex === Infinity ? -1 : minIndex;
}

// Alternative approach: Right-to-left traversal
// ✅ TC = O(n) --> Single pass through array
// ✅ SC = O(n) --> Set for tracking seen elements
function firstRepeatedRightToLeft(arr) {
    let seen = new Set();
    let minIndex = -1;
    
    // Traverse from right to left to find the leftmost repeating element
    for (let i = arr.length - 1; i >= 0; i--) {
        if (seen.has(arr[i])) {
            minIndex = i + 1; // 1-based indexing
        } else {
            seen.add(arr[i]);
        }
    }
    
    return minIndex;
}

let str = 'abc' // -1
str = 'abcab' // 0 (index)
str = 'abccb' // 1 (index)
console.log(leftmostRepeatingEfficient(str))

function leftmostRepeating(s){
    let count = new Array(256).fill(0) // ascii value as index (a-->97 ,b-->98, so on)

    for(let char of s){
        count[char.charCodeAt(0)]++
    }

    for(let char of s){
        if(count[char.charCodeAt(0)]>1){
            return char
        }
    }

    return -1
}

let s = 'abc' // -1
s = 'abcab' // a
s = 'abccb' // b
console.log(leftmostRepeating(s))