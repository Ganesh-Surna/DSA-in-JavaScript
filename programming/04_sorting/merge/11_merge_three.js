class Solution {
    // Function to merge three sorted arrays into a single array.
    // ✅ TC : O(N + M + P)
    // ✅ SC : O(N + M + P)
    mergeThreeByThreePointers(A, B, C) {
        // your code here
        let i = 0, j=0 , k=0, res=[]
        let len1= A.length, len2= B.length, len3=C.length
        while(i<len1 && j<len2 && k<len3){
            if(A[i]<=B[j]){
                if(A[i]<=C[k]){
                    res.push(A[i++])
                }else{
                    res.push(C[k++])
                }
            }else{
                if(B[j]<=C[k]){
                       res.push(B[j++])
                }else{
                    res.push(C[k++])
                }
            }
        }
        while(i<len1 && j<len2){
            if(A[i]<=B[j]){
                    res.push(A[i++])
                }else{
                    res.push(B[j++])
                }
        }
        while(j<len2 && k<len3){
            if(B[j]<=C[k]){
                       res.push(B[j++])
                }else{
                    res.push(C[k++])
                }
        }
        while(i<len1 && k<len3){
            if(A[i]<=C[k]){
                    res.push(A[i++])
                }else{
                    res.push(C[k++])
                }
        }
        while(i<len1){
            res.push(A[i++])
        }
        while(j<len2){
            res.push(B[j++])
        }
        while(k<len3){
            res.push(C[k++])
        }
        
        return res
    }

    // Function to merge three sorted arrays by merging two first, then with the third.
    mergeThreeByMergingTwo(A, B, C) {
        // Helper function to merge two sorted arrays
        function mergeTwo(arr1, arr2) {
            let i = 0, j = 0, res = [];
            let len1 = arr1.length, len2 = arr2.length;
            while (i < len1 && j < len2) {
                if (arr1[i] <= arr2[j]) {
                    res.push(arr1[i++]);
                } else {
                    res.push(arr2[j++]);
                }
            }
            while (i < len1) res.push(arr1[i++]);
            while (j < len2) res.push(arr2[j++]);
            return res;
        }
        // Merge A and B first
        const temp = mergeTwo(A, B);
        // Merge the result with C
        return mergeTwo(temp, C);
    }
}