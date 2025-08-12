function leftmostNonRepeating(s){
    let visited = new Array(256).fill(0) // ascii value as index (a-->97 ,b-->98, so on)
    
    for(let i=0; i<s.length; i++){  
        if(s.charCodeAt(i)){
            visited[s.charCodeAt(i)]++
        }
    }
    
    for(let i=0; i<s.length; i++){
        if(visited[s.charCodeAt(i)]===1){
            return i
        }
    }
    
    return -1
}

let s = 'abcd' // 0
s='abbacdc' // 5
s='aabbccdd' // -1

console.log(leftmostNonRepeating(s))


// Single traversal using queue:
function leftmostNonRepeating(s) {
    let visited = new Array(256).fill(0); // Frequency count
    let queue = []; // To keep track of potential candidates
    let result = -1;

    for (let i = 0; i < s.length; i++) {
        const charCode = s.charCodeAt(i);
        visited[charCode]++;
        queue.push(i);

        // Remove characters from the front of the queue that are no longer candidates
        while (queue.length > 0 && visited[s.charCodeAt(queue[0])] > 1) {
            queue.shift();
        }

        // Update result if a valid candidate is found
        if (queue.length > 0) {
            result = queue[0];
        } else {
            result = -1;
        }
    }

    return result;
}

// let s = 'abcd'; // 0
// console.log(leftmostNonRepeating(s)); // Output: 0

// s = 'abbacdc'; // 5
// console.log(leftmostNonRepeating(s)); // Output: 5

// s = 'aabbccdd'; // -1
// console.log(leftmostNonRepeating(s)); // Output: -1