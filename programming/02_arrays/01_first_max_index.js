function secondMax(arr) {
    let fMax = arr[0] || -1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > fMax) {
        fMax = arr[i];
      }
    }
    console.log("First Max: ", fMax);
  }