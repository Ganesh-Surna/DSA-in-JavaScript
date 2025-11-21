/* Problem: ✅✅✅✅ Longest Chain of Pairs ✅✅✅✅
    
Given a list of pairs, find the longest chain of pairs that can be formed.
A pair (a, b) can be chained to (c, d) if b < c.
*/

/* NOTE:
✅ similar to Job Sequencing Problem - Can be solved using Greedy Approach.  
⭐ Why similar?
Because here given that all pairs are such that 1st el < 2nd el. 
i.e., for pair (a, b), it is given that a < b.
Which is same as the condition in Job Sequencing Problem.

❌❌❌ Why Max Non-Crossing Bridges problem can't be solved using Greedy Approach?
In Max Non-Crossing Bridges problem, it is not guaranteed that 1st el < 2nd el. 
So we can't solve it using Greedy Approach.

Greedy approach: 
    1. Sort pairs based on the 1st el. O(n log n)
    2. Select the pairs such that the 1st el of the curr pair is less than the 2nd el of the prev pair. O(n)
*/