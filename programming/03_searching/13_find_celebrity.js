// Problem: In a party of n people, a celebrity is someone 
// who knows nobody but is known by everyone.
//  Use a voting-like approach to find the celebrity.
// Input: [[1, 1, 0], [0, 1, 0], [0, 1, 1]] 
// (matrix where knows[i][j] = 1 means person i knows j).

// Output: 1 (Person 1 is the celebrity).

function findCelebrity(n, knows) {
    let candidate = 0;

    // First pass: Eliminate non-celebrities
    for (let i = 1; i < n; i++) {
        if (knows(candidate, i)) { // candidate knows i
            candidate = i;
        }
    }

    // Second pass: Verify candidate
    for (let i = 0; i < n; i++) {
        if (i !== candidate && (knows(candidate, i) || !knows(i, candidate))) {
            // When i(idx) is not the candidate idx
            // either candidate knows i 
            // OR i not knows candidate
            // Means he is not a celebrity. (because --> knows nobody & known by everyone)
            return -1;
        }
    }

    return candidate;
}

// Mock `knows` function for the example input
const knowsArrMatrix = [[1, 1, 0], [0, 1, 0], [0, 1, 1]]
const knows = (a, b) => knowsArrMatrix[a][b] === 1;
console.log(findCelebrity(3, knows)); // Output: 1