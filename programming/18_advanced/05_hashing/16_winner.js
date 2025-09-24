function winner(arr) {
    let freq = new Map()
    
    for(let name of arr){
        freq.set(name, (freq.get(name) || 0)+1)
    }
    
    // console.log(freq)
    
    let name = ""
    let c = 0
    
    for(let [key, val] of freq){
        if(val > c){
            name = key
            c = val
        }else if(val === c){
            if(key < name){
                name = key
            }
        }
    }
    
    return name + " " + c
}

console.log(winner(["andy", "baba", "andy", "abhay", "abhay"])) // abhay 2