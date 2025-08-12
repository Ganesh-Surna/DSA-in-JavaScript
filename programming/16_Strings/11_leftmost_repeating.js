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