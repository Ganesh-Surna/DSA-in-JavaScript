// ✅ TC: O(n^2), ✅ SC: O(1)
function firstCircularTour(petrol, dist){
    let n = petrol.length
    for(let i=0; i<n; i++){
        let truckPetrol = petrol[i]
        let j = i
        do{
            truckPetrol -= dist[j]
            if(truckPetrol < 0){
                break // break do-while
            }
            j = (j+1)%n
            truckPetrol += petrol[j]
        }while(j!==i)
        
        if(truckPetrol>=0){
            return i+1
        }
    }
    return -1
}

let petrol = [4, 8, 7, 4]
let dist = [6, 5, 3, 5]
// Output: 2

// let petrol = [4, 8]
// let dist = [5, 6]
// Output: 2

// let petrol = [8, 9, 4]
// let dist = [5, 10, 12]
//Output : -1

console.log(firstCircularTour(petrol, dist))