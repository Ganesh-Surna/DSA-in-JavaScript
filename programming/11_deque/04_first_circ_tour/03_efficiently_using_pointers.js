// Problem: Find the first petrol pump index from which a truck (with infinite capacity) can complete the circular tour
//          without running out of petrol at any point.
//
// Idea:
// - We want to find a starting petrol pump so that the truck can go around the circle without running out of petrol.
// - As we go from pump to pump, we keep track of how much petrol we have after each move.
// - If at any point, our petrol goes below zero, it means we could not have started from any pump between our last starting point and here.
//   So, we try the next pump as the new starting point, and remember how much petrol we were short by (the deficit).
// - At the end, if the petrol we have from our new starting point to the end is enough to cover all the times we were short before, then this starting point works.
// - If not, then it is not possible to complete the tour from any pump.
//
// This way, we only go through the pumps once (O(n) time), and we never check the same starting point twice.

// Single Pass
// ✅ TC: O(n), ✅ SC: O(1)
function firstCircularTour(petrol, dist) {
    let n = petrol.length;
    let start = 0;           // The pump we are trying as the starting point
    let curr_petrol = 0;     // Petrol left as we move from start to current pump
    let prev_petrol = 0;     // Total petrol we were short by before our current start

    for (let i = 0; i < n; i++) {
        curr_petrol += petrol[i] - dist[i]; // Add petrol at pump, subtract petrol needed to next pump
        if (curr_petrol < 0) {
            // If we run out of petrol before reaching the next pump:
            // - We cannot start from any pump between 'start' and 'i' (inclusive)
            // - So, try the next pump as the new start
            // - Add the petrol we were short by to prev_petrol
            start = i + 1;
            prev_petrol += curr_petrol;
            curr_petrol = 0; // Reset petrol for the new start
        }
    }

    // After checking all pumps:
    // - curr_petrol: petrol left from our last start to the end
    // - prev_petrol: total petrol we were short by before our last start
    // If together they are zero or more, our last start works
    return (curr_petrol + prev_petrol >= 0) ? start : -1;
}

let petrol = [4, 8, 7, 4]
let dist = [6, 5, 3, 5]
console.log(firstCircularTour(petrol, dist)) // Output: 1

petrol = [4, 8]
dist = [5, 6]
console.log(firstCircularTour(petrol, dist)) // Output: 1

petrol = [8, 9, 4]
dist = [5, 10, 12]
console.log(firstCircularTour(petrol, dist)) // Output: -1

petrol = [50, 10, 60, 100]
dist = [30, 20, 100, 10]
console.log(firstCircularTour(petrol, dist)) // Output: 3 // (0-index based)




// Better, but Not better than above( because Two passes)
// ✅ TC: O(n), ✅ SC: O(1)
function firstCircularTour2(petrol, dist) {
    let n = petrol.length;
    let total_petrol = 0;
    let total_dist = 0;

    // First, check if total petrol is enough to cover total distance
    for (let i = 0; i < n; i++) {
        total_petrol += petrol[i];
        total_dist += dist[i];
    }
    if (total_petrol < total_dist) {
        return -1;
    }
    
    let start = 0;
    let curr_petrol = 0;

    // If total petrol is sufficient, find the starting point
    for (let i = 0; i < n; i++) {
        curr_petrol += petrol[i] - dist[i];
        if (curr_petrol < 0) {
            start = i + 1;
            curr_petrol = 0;
        }
    }

    return start;
}

let petrol2 = [4, 8, 7, 4]
let dist2 = [6, 5, 3, 5]
console.log(firstCircularTour2(petrol2, dist2)) // Output: 1

petrol2 = [4, 8]
dist2 = [5, 6]
console.log(firstCircularTour2(petrol2, dist2)) // Output: 1

petrol2 = [8, 9, 4]
dist2 = [5, 10, 12]
console.log(firstCircularTour2(petrol2, dist2)) // Output: -1

petrol2 = [50, 10, 60, 100]
dist2 = [30, 20, 100, 10]
console.log(firstCircularTour2(petrol2, dist2)) // Output: 3 // (0-index based)