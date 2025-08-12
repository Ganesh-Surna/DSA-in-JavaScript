// Input: s = "i.like.this.program.very.much"
// Output: "much.very.program.this.like.i"
// Explanation: The words in the input string are reversed while maintaining the dots as separators,
//  resulting in "much.very.program.this.like.i".

// Input: s = "..geeks..for.geeks."
// Output: "geeks.for.geeks"
// Explanation: After removing extra dots and reversing the whole string,
//  the input string becomes "geeks.for.geeks".

// Time Complexity: O(n)
// Auxiliary Space: O(1)

function reverseWords(s) {
    let res = []
    
    let arr = s.split('.')
    
    for(let i=arr.length-1; i>=0; i--){
        if(arr[i] !== ''){
            res.push(arr[i])
        }
    }
    
    return res.join('.')
}