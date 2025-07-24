// ✅ TC: O(n), SC: O(n)
function isBalanced(str){
    const st = []

    for(let i=0; i<str.length; i++){
        const x = str[i]

        if(x==='(' || x==='{' ||  x==='['){
            st.push(x)
        }else{
            // No opening bracket found, so it's not balanced
            if(st.length===0) return false

            const popped = st.pop()

            // Check if the popped element is matching with the current element:
            // WAY 1:
            // if((x===')' && popped!=='(')||(x==='}' && popped!=='{')||(x===']' && popped!=='[')){
            //     return false
            // }

            // WAY 2:
            function isMatching(a,b){
                return ( a==='(' && b===')' ) || ( a==='{' && b==='}' ) || ( a==='[' && b===']' )
            }
            if(!isMatching(popped, x)){
                return false
            }
        }
    }
    // If the stack is empty, then it's balanced
    return st.length===0
}
let res = isBalanced('([{[()]}])[{}()])') // false
console.log(res)