let prev = 1 // or var prev = 1

function update(prev){
    prev = prev+1
}

update(prev)
console.log(prev) // Output: 1


// Ex: 2
let prev1 = 1; // or var prev1 = 1
function update() {
    prev1 = prev1 + 1;
}
update();
console.log(prev1);  // Output: 2