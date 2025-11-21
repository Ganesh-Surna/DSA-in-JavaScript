// WAY 1. Best Approach
// ✅ TC = O(n)
// ✅ SC = O(1)
function findSum(s) {
    let res = 0;
    let num = 0;
    for (let ch of s) {
        if (ch >= "0" && ch <= "9") {
            // continue digit streak
            num = num * 10 + Number(ch);
        } else {
            res += num; // add current number to result
            num = 0; // reset current number
        }
    }
    res += num; // add last number to result
    return res;
}


// WAY 2. What I thought initially
// ✅ TC = O(n)
// ✅ SC = O(1)
function findSum(s) {
    let n = s.length
    
    let res = 0
    
    let i=0
    while(i<n){
        if(s[i]>="0" && s[i]<="9"){
            // if current character is a digit, then find the digit streak
            let num = 0
            let j = i
            while(j<n && s[j] >= "0" && s[j]<="9" ){
                num = num*10 + Number(s[j])
                j++
            }
            res += num
            i=j // move to next character after the digit streak
        }else{
            i++ // move to next character
        }
    }
    
    return res
}