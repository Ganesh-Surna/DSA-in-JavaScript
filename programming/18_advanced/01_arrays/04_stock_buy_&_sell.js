// Problem: Find the maximum profit by buying and selling a stock.

// Efficient Sol (Greedy):
// ✅ TC = O(n)
// ✅ SC = O(1)

// I. Can sell & Buy at same day
// Efficient Calculation: 
//  Instead of actually buying and selling at every peak and valley,
//  we can simply add all positive differences between consecutive days. 
// This approach ensures we capture all possible profits without missing any.
function maxProfit(arr){
    let n = arr.length;
    let profit = 0;
    
    for(let i=1; i<n; i++){
        // If today's price is higher than yesterday's price, then sell today & buy tomorrow
        if(arr[i] > arr[i-1]){
            profit += (arr[i] - arr[i-1])
        }
    }
    
    console.log(profit)
}
// The above sol works like this:
let arr = [1, 5, 3, 1, 2, 8] // (5-1) + (2-1) + (8-2) = 11
arr = [1, 5, 3, 1, 8, 2] // (5-1) + (8-1) = 11
arr = [1, 5, 3, 9, 8, 2] // (5-1) + (9-3) = 10
arr = [1, 2, 3, 4, 5, 6] // (2-1) + (3-2) + (4-3) + (5-4) + (6-5) = 5
arr = [6, 5, 3, 2, 1] // 0
maxProfit(arr)

// Theoritically not correct to buy one stock & skipping the buy without selling it
function maxProfit(arr){
    let n = arr.length;
    let profit = 0;
    let buy = arr[0]
    
    for(let i=1; i<n; i++){
        if(arr[i] <= buy){
            // today's price is less or equal to buy, just skip the buy (consider we check to buy this, not bought in real)
            buy = arr[i]
        }else{
            profit += (arr[i] - buy) // sell
            buy = arr[i] // buy same day
        }
    }
    
    console.log(profit)
    
}
// The above sol works like this:
arr = [1, 5, 3, 1, 2, 8] // (5-1) + (8-1) = 11
arr = [1, 5, 3, 1, 8, 2] // (5-1) + (8-1) = 11
arr = [1, 5, 3, 9, 8, 2] // (5-1) + (9-3) = 10
arr = [1, 2, 3, 4, 5, 6] // (6-1) = 5
arr = [6, 5, 3, 2, 1] // 0
maxProfit1(arr)


// Do not consider this below sol, just take a look
// I thought like this
// Can't sell & Buy at same day
function maxProfit2(arr){
    // We can buy and sell multiple times, but we can hold only one stock at a time
    // Idea: buy at a valley (low) and sell at the next peak (high)
    // Accumulate all such profits: this is same as summing all positive day-to-day increases
    let n = arr.length;
    let profit = 0;      // total profit across all transactions
    let buy = arr[0]     // current buy price (valley)
    
    let i=1
    while(i<n){
        // Found a cheaper price than our current buy → move our buy to this lower price
        if(arr[i] <= buy){
            buy = arr[i]
            i=i+1
        }else{
            // Price is higher than our buy. Decide when to sell:
            // If tomorrow is even higher, wait (do not sell today)
            if(i+1 < n && arr[i+1] > arr[i]){
                i=i+1
                continue
            }

            // Otherwise, tomorrow is not higher → sell today at arr[i]
            profit += (arr[i] - buy);
            if(i+2 >= n){
               // No room to set a new buy after selling; we are done
                break
            }else{
                // Start a new transaction: buy at the next day after selling
                buy = arr[i+1]
                i = i+2
            }
        }
    }
    
    console.log(profit)
    
}

// Naive Sol (Inefficient)
// ✅ TC = O(2^n)  // Exponential due to exploring many buy-sell partitions recursively
// ✅ SC = O(n)    // Recursion stack depth in the worst case
function maxProfitNaive(arr, st, end){
    if(st >= end) return 0;

    let profit = 0;
    for(let i=st; i<end; i++){
        // Try buying at i and selling at every future day j
        // Profit = (arr[j] - arr[i]) + best profit in left side + best profit in right side
        for(let j=i+1; j<=end; j++){
            if(arr[j] > arr[i]){
                let curr_profit = (arr[j] - arr[i]) + maxProfitNaive(arr, st, i-1) + maxProfitNaive(arr, j+1, end);
                profit = Math.max(profit, curr_profit);
            }
        }
    }
    return profit;
}