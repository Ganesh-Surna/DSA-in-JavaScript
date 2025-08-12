// ✅ TC = O(n)
// ✅ SC = O(1)
function checkPal(s){
    let st=0, end=s.length-1
    while(st<end){
        if(s[st] !== s[end]){
            return false
        }
        st++
        end--
    }
    return true
}

let s = 'abba' // true
s = 'abcba' // true
s = 'abcbaa' // false
console.log(checkPal(s))