class Node{
    constructor(data){
        this.data = data
        this.next = null
    }
}
class Queue{
    constructor(){
        this.front = null
        this.rear = null
        this.sz = 0
    }
    enque(x){
        const newNode = new Node(x)
        if(!this.rear){ // this.sz === 0
            this.front = this.rear = newNode
        }else{
            this.rear.next = newNode
            this.rear = newNode
        }
        this.sz++
    }
    deque(){
        if(!this.front){ // this.sz === 0
            return
        }
        let frontData = this.front.data
        if(this.front === this.rear){ // this.sz === 1
            this.front = this.rear = null
        }else{
            this.front = this.front.next
        }
        this.sz--
        return frontData
    }
    getFront(){
        if(!this.front){ // this.sz === 0
            return null
        }
        return this.front.data
    }
    size(){
        return this.sz
    }
}

// ✅ TC: O(n), ✅ SC: O(n)
function firstCircularTour(petrol, dist){
    const q = new Queue()
    let n = petrol.length
    let curr_petrol = 0
    let start = 0
    let end = 1
    
    curr_petrol = petrol[start] - dist[start]
    q.enque(start)
    
    while(start !== end || curr_petrol < 0) {
        // If current petrol is negative, remove the starting point
        while(curr_petrol < 0 && start !== end) {
            curr_petrol -= petrol[start] - dist[start] // removing starting petrol pump from curr_petrol
            q.deque() // removing starting petrol pump from queue
            start = (start + 1) % n // moving to next petrol pump
            if(start === 0) { // if start is 0, then we have checked all petrol pumps
                return -1
            }
        }
        
        // Add next petrol pump to the queue
        curr_petrol += petrol[end] - dist[end]
        q.enque(end)
        end = (end + 1) % n
    }
    
    return start
}

// ✅ TC: O(n), ✅ SC: O(n)
// gas --> petrol
// cost --> distance
function startStation(gas, cost) {
    //  code here
    let n = gas.length
    let q = []
    q.push(0)
    let prevGas = 0
    let currGas = gas[0] - cost[0]
    
    for(let i=1; i<n; i++){
        if(currGas < 0){
            // remove all previous stations from queue
            while(q.length > 0){
                q.shift()
            }
            prevGas += currGas // add deficit to prevGas
            currGas = 0 // reset currGas
        }

        
        currGas += gas[i] - cost[i]
        if(q.length === 0) q.push(i) // Start at new station only if no prev station worked
    }
    
    return prevGas+currGas >= 0 ? q[0] : -1
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