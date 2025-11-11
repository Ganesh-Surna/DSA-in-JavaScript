class MinHeap{
    constructor(){
        this.harr = []
        this.size=0
    }
    
    left(i){
        return 2*i+1
    }
    right(i){
        return 2*i+2
    }
    parent(i){
        return Math.floor((i-1)/2)
    }
    insert(node){
        let i=this.size
        let arr = this.harr
        arr[i]=node
        
        while(i>0 && arr[this.parent(i)].f > arr[i].f){
            let p = this.parent(i);
            [arr[i], arr[p]]=[arr[p], arr[i]];
            i=p;
        }
        this.size++;
    }
    extractMin(){
        if(this.size===0) return null
        let arr = this.harr;
        let n = this.size;
        
        [arr[0], arr[n-1]]=[arr[n-1], arr[0]];
        
        let min = arr.pop();
        this.size--
        
        this.minHeapify(0)
        return min
    }
    minHeapify(i){
        let arr=this.harr
        let n = this.size
        
        while(true){
            let l = this.left(i)
            let r = this.right(i)
            
            let min = i
            
            if(l<n && arr[l].f < arr[min].f){
                min = l
            }
            if(r<n && arr[r].f < arr[min].f){
                min = r
            }
            
            if(min===i) break;
            
            [arr[i], arr[min]]=[arr[min], arr[i]];
            
            i = min;
        }
    }
}

class HuffmanNode{
    constructor(char, freq){
        this.ch = char
        this.f = freq
        this.left = null
        this.right = null
    }
}

function buildHuffmanTree(freqMap){
    let h = new MinHeap()
    
    // Insert all [char, freq] pairs into min heap
    for(let [ch, f] of freqMap){
        let node = new HuffmanNode(ch, f)
        h.insert(node)
    }
    
    while(h.size >= 2){ // h.size > 1
        let left = h.extractMin()
        let right = h.extractMin()
        
        let newNode = new HuffmanNode(null, left.f+right.f)
        
        newNode.left = left
        newNode.right = right
        
        h.insert(newNode)
    }
    
    return h.harr[0]
}

function generateCodes(root, currCode="", codes){
    if(!root) return
    if(root.ch !== null){
        codes.set(root.ch, currCode)
        return
    }
    
    generateCodes(root.left, currCode + "0", codes)
    generateCodes(root.right, currCode + "1", codes)
}

function huffmanEncode(str){
    let freq = new Map()
    for(let ch of str){
        freq.set(ch, (freq.get(ch) || 0)+1)
    }
    
    let root = buildHuffmanTree(freq)
    
    let codes = new Map()
    generateCodes(root, "", codes)
    
    let encoded = ""
    for(let ch of str){
        encoded += codes.get(ch)
    }
    
    return {encoded, root}
}

function huffmanDecode(encoded, root){
    let decoded = ""
    let curr = root
    
    for(let bit of encoded){
        curr = bit === "0" ? curr.left : curr.right
        
        if(curr.ch !== null){
            decoded += curr.ch
            curr = root // Start again from root for another char's code
        }
    }
    
    return decoded
}

let str = 'Huffman coding is fun!'
console.log('Input: ', str)
let {encoded, root} = huffmanEncode(str)
console.log('Encoded: ', encoded)
console.log('Decoded: ', huffmanDecode(encoded, root))

// Output:
// Encoded:  111000010110111110101001101000000000101011111110101101001111101111000110011101010
// Decoded:  Huffman coding is fun!