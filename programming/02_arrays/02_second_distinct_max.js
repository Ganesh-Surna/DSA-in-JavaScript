export function secondDistinctMax() {
  console.log("******* START of secondDistinctMax ********");
  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function secondMax1(arr) {
    let fMax = arr[0] || -1;
    let sMax = -1;
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > fMax) {
        sMax = fMax;
        fMax = arr[i];
      } else if (arr[i] > sMax && arr[i] < fMax) {
        sMax = arr[i];
      }
    }
    console.log("Second Max: ", sMax);
  }
  console.log("-- Second distinct max function1 Result:");
  secondMax1([5, 5, 1, 2, 4]);
  secondMax1([5, 5, 1, 4, 5]);
  secondMax1([5, 5]);

  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function secondMax2(arr) {
    let fMax = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > fMax) {
        fMax = arr[i];
      }
    }
    let sMax = -1;
    for (let j = 1; j < arr.length; j++) {
      if (sMax === -1) {
        if (arr[j] < fMax) {
          sMax = arr[j];
        }
      } else {
        if (arr[j] > sMax && arr[j] < fMax) {
          sMax = arr[j];
        }
      }
    }
    console.log("Second Max (function1): ", sMax);
  }
  console.log("-- Second distinct max function2 Result:");
  secondMax2([5, 5, 1, 2, 4]);
  secondMax2([5, 5, 1, 4, 5]);
  secondMax2([5, 5]);

  // ✅ TC= O(n)
  // ✅ SC = O(1)
  function secondMax3(arr) {
    let fMax = (sMax = arr[0]);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > fMax) {
        fMax = arr[i];
      }
    }
    let secondMaxExist = false;
    for (let j = 1; j < arr.length; j++) {
      if (!secondMaxExist) {
        if (arr[j] < fMax) {
          sMax = arr[j];
          secondMaxExist = true;
        }
      } else {
        if (arr[j] > sMax && arr[j] < fMax) {
          sMax = arr[j];
        }
      }
    }
    if (!secondMaxExist) {
      sMax = -1;
    }
    console.log("Second Max (function2): ", sMax);
  }
  console.log("-- Second distinct max function3 Result:");
  secondMax3([5, 5, 1, 2, 4]);
  secondMax3([5, 5, 1, 4, 5]);
  secondMax3([5, 5]);
  console.log("******* END of secondDistinctMax ********");
}
