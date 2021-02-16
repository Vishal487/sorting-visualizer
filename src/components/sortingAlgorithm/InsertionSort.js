export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSortUtil(array, animations);
  return animations;
}

function insertionSortUtil(array, animations) {
  for (let i = 1; i < array.length; i++) {
    animations.push([i, "black"]);
    let curr = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > curr) {
      animations.push([j, "red"]);
      animations.push([j + 1, array[j], "blue"]);
      array[j + 1] = array[j];
      j = j - 1;
    }
    animations.push([j + 1, curr]);
    array[j + 1] = curr;
  }
}
