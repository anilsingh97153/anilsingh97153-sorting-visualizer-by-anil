// this component sort takes the array as input and receives it in a auxilliary array and then sort it, and while sorting stores all the step like, comparison of two values, swapping, highlight, overwrite in an array named as 'animations' which wis returned to the main sorting visualizer component, from where we actually has schedules these methods. Then that animations array will help us to animate the array on UI, and eventually we udpdate the original array also, by setting auxArray values to original array, because auxArray was sorted while creating animations array.

// Bubble sort
export function bubbleSort(array) {
  const animations = [];
  const auxArray = [...array]; // Create a copy of the array

  for (let i = 0; i < auxArray.length - 1; i++) {
    for (let j = 0; j < auxArray.length - i - 1; j++) {
      animations.push({ comparison: [j, j + 1] });
      if (auxArray[j] > auxArray[j + 1]) {
        animations.push({ swap: [j, j + 1] });
        [auxArray[j], auxArray[j + 1]] = [auxArray[j + 1], auxArray[j]];
      }
    }
  }

  return animations;
}

// selection sort
export function selectionSort(array) {
  const animations = [];
  const auxArray = [...array];

  for (let i = 0; i < auxArray.length - 1; i++) {
    let minIndex = i;
    animations.push({ comparison: [i, minIndex] });

    for (let j = i + 1; j < auxArray.length; j++) {
      animations.push({ comparison: [minIndex, j] });
      if (auxArray[j] < auxArray[minIndex]) {
        animations.push({ comparison: [minIndex, j] });
        minIndex = j;
      }
    }

    animations.push({ swap: [i, minIndex] });
    [auxArray[i], auxArray[minIndex]] = [auxArray[minIndex], auxArray[i]];
  }

  return animations;
}

function merge(left, mid, right, auxArray, animations) {
  const leftArray = auxArray.slice(left, mid + 1);
  const rightArray = auxArray.slice(mid + 1, right + 1);
  let i = 0,
    j = 0,
    k = left;

  while (i < leftArray.length && j < rightArray.length) {
    animations.push({ comparison: [left + i, mid + 1 + j] });
    if (leftArray[i] <= rightArray[j]) {
      animations.push({ overwrite: [k, leftArray[i]] });
      auxArray[k++] = leftArray[i++];
    } else {
      animations.push({ overwrite: [k, rightArray[j]] });
      auxArray[k++] = rightArray[j++];
    }
  }

  while (i < leftArray.length) {
    animations.push({ overwrite: [k, leftArray[i]] });
    auxArray[k++] = leftArray[i++];
  }

  while (j < rightArray.length) {
    animations.push({ overwrite: [k, rightArray[j]] });
    auxArray[k++] = rightArray[j++];
  }
}

export function mergeSort(left, right, auxArray, animations) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  animations.push({ highlight: [mid] });

  mergeSort(left, mid, auxArray, animations);
  mergeSort(mid + 1, right, auxArray, animations);

  animations.push({ highlight: [mid] });
  merge(left, mid, right, auxArray, animations);
}

export function getMergeSortAnimations(array) {
  const animations = [];
  const auxArray = [...array];
  mergeSort(0, array.length - 1, auxArray, animations);
  return animations;
}

// when called in the beginning
// mergeSort(0, array.length, array)

// partition function to sort place the pivot at its correct position
function partition(left, right, auxArray, animations) {
  animations.push({ highlight: [left] });
  const pivot = auxArray[left];
  let i = left + 1, j = right;

  // find values greater than pivot from the left, and lesser than pivot from the right, and then swap.
  while (i <= j) {
    while (i <= right && auxArray[i] <= pivot) {
      animations.push({ comparison: [i, left] });
      i++;
    }

    while (j >= left && auxArray[j] > pivot) {
      animations.push({ comparison: [j, left] });
      j--;
    }

    if (i < j) {
      animations.push({ swap: [i, j] });
      let temp = auxArray[i];
      auxArray[i] = auxArray[j];
      auxArray[j] = temp;
    }
  }

  // when i crosses j
  animations.push({ swap: [left, j] });
  let temp = auxArray[left];
  auxArray[left] = auxArray[j];
  auxArray[j] = temp;
  return j; // partition index
}

export function quickSort(left, right, auxArray, animations) {
  // excutes only when array contains atleast 2 element, as 1 element is already sorted, so no need to quicksort
  if(left < right) {
    const pivotIndex = partition(left, right, auxArray, animations);
    quickSort(left, pivotIndex-1, auxArray, animations);
    quickSort(pivotIndex+1, right, auxArray, animations);
  }
}

export function getQuickSortAnimations(array){
  const auxArray = [...array]
  const animations = []
  quickSort(0, auxArray.length-1, auxArray, animations)
  console.log("quick sorted", auxArray)
  return animations;
}



