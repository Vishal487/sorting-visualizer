export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortUtil(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortUtil(
  mainArray,
  startIndex,
  endIndex,
  auxiliaryArray,
  animations
) {
  if (startIndex === endIndex) return;
  const middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);
  mergeSortUtil(auxiliaryArray, startIndex, middleIndex, mainArray, animations);
  mergeSortUtil(
    auxiliaryArray,
    middleIndex + 1,
    endIndex,
    mainArray,
    animations
  );
  merge(
    mainArray,
    startIndex,
    middleIndex,
    endIndex,
    auxiliaryArray,
    animations
  );
}

function merge(
  mainArray,
  startIndex,
  middleIndex,
  endIndex,
  auxiliaryArray,
  animations
) {
  let k = startIndex;
  let i = startIndex;
  let j = middleIndex + 1;
  while (i <= middleIndex && j <= endIndex) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIndex) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIndex) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
