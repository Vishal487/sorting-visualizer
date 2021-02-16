export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortUtil(array, animations);
  return animations;
}

function bubbleSortUtil(mainArray, animations) {
  for (let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length - i - 1; j++) {
      animations.push([j, j + 1, "black"]);
      if (mainArray[j] > mainArray[j + 1]) {
        animations.push([j, j + 1, "red"]);
        animations.push([j + 1, mainArray[j]]);
        animations.push([j, mainArray[j + 1]]);
        let temp = mainArray[j];
        mainArray[j] = mainArray[j + 1];
        mainArray[j + 1] = temp;
      } else {
        animations.push([j, j + 1, "green"]);
        animations.push([j, mainArray[j]]);
        animations.push([j + 1, mainArray[j + 1]]);
      }
    }
  }
}

// function bubbleSortUtil(mainArray, auxiliaryArray, animations) {
//   let currSortedIndex = mainArray.length - 1
//   for (let i = 0; i < mainArray.length; i++) {
//     for (let j = 0; j < mainArray.length - i - 1; j++) {
//       animations.push([j, j + 1]);
//       animations.push([j, j + 1]);
//       if (mainArray[j] > mainArray[j + 1]) {
//         animations.push([j, mainArray[j + 1]]);
//         animations.push([j + 1, mainArray[j]]);
//         let temp = mainArray[j];
//         mainArray[j] = mainArray[j + 1];
//         mainArray[j + 1] = temp;
//       } else {
//         animations.push([j, mainArray[j]]);
//         animations.push([j + 1, mainArray[j + 1]]);
//       }
//     }
//     // animations.push([currSortedIndex--])
//   }
// }
