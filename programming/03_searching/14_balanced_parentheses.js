// Just "(" & ")" paranthesis

function isBalanced(s) {
    let balance = 0;
    for (const char of s) {
        // balance += (char === '(') ? 1 : -1;
        if(char === '('){
            balance++
        }else{
            balance--
        }
        if (balance < 0) return false; // Early exit
    }
    return balance === 0;
}

// Time Complexity: O(n)
// Space Complexity: O(1)