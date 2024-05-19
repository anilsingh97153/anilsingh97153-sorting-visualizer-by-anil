// bubble sort animation
export const animateBubbleSort = (originalArray, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable) => {
  let animationIndex = 0;
  const auxArray = [...originalArray];
  const arrayBars = document.getElementsByClassName("array-bar");

  const resetColors = () => {
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "#11cffa"; // Reset to default color
    }
  };

  const animateStep = () => {
    if (animationIndex < animations.length) {
      resetColors(); // Reset colors before each animation step
      const { comparison, swap } = animations[animationIndex];
      if (comparison) {
        const [comparisonIndex1, comparisonIndex2] = comparison;
        arrayBars[comparisonIndex1].style.backgroundColor = "green"; // Comparison color
        arrayBars[comparisonIndex2].style.backgroundColor = "green";
      } else if (swap) {
        const [swapIndex1, swapIndex2] = swap;
        arrayBars[swapIndex1].style.backgroundColor = "red"; // Swap color
        arrayBars[swapIndex2].style.backgroundColor = "red";

        const temp = auxArray[swapIndex1];
        auxArray[swapIndex1] = auxArray[swapIndex2];
        auxArray[swapIndex2] = temp;

        const temp1 = arrayBars[swapIndex1].style.height;
        arrayBars[swapIndex1].style.height = arrayBars[swapIndex2].style.height;
        arrayBars[swapIndex2].style.height = temp1;
      }
      animationIndex++;
      // recusrive calling to animateSetp function, until the animation array is finished
      setTimeout(animateStep, 10000/speed); // Adjust the delay as needed
    } else {
      // Update the original array after animations are complete
      setArray(auxArray);
      // Color the sorted elements
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "purple"; // Sorted color
      }
      // Enable the button in the other component once animation completes
      setGenerateDisable(false);
      setLengthDisable(false)
      setOptionDisable(false)
      setSpeedDisable(false)
    }
  };

  // calling for the first time
  animateStep();
};

// selection sort animation
export const animateSelectionSort = (originalArray, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable) => {
  let animationIndex = 0;
  const auxArray = [...originalArray];
  const arrayBars = document.getElementsByClassName("array-bar");

  const resetColors = () => {
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "#11cffa";
    }
  };

  const animateStep = () => {
    if (animationIndex < animations.length) {
      resetColors();
      const { comparison, swap } = animations[animationIndex];

      if (comparison) {
        const [comparisonIndex1, comparisonIndex2] = comparison;
        arrayBars[comparisonIndex1].style.backgroundColor = "green";
        arrayBars[comparisonIndex2].style.backgroundColor = "green";
      }

      if (swap) {
        const [swapIndex1, swapIndex2] = swap;
        arrayBars[swapIndex1].style.backgroundColor = "red";
        arrayBars[swapIndex2].style.backgroundColor = "red";
        const temp = auxArray[swapIndex1];
        auxArray[swapIndex1] = auxArray[swapIndex2];
        auxArray[swapIndex2] = temp;
        const temp1 = arrayBars[swapIndex1].style.height;
        arrayBars[swapIndex1].style.height = arrayBars[swapIndex2].style.height;
        arrayBars[swapIndex2].style.height = temp1;
      }

      animationIndex++;
      setTimeout(animateStep, 10000/speed);
    } else {
      setArray(auxArray);
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "purple";
      }
      // Enable the button in the other component once animation completes
      setGenerateDisable(false);
      setLengthDisable(false)
      setOptionDisable(false)
      setSpeedDisable(false)
    }
  };

  animateStep();
};

// merge sort animation
export const animateMergeSort = (originalArray, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable) => {
  let animationIndex = 0;
  const auxArray = [...originalArray];
  const arrayBars = document.getElementsByClassName("array-bar");

  const resetColors = () => {
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "#11cffa";
    }
  };

  const animateStep = () => {
    if (animationIndex < animations.length) {
      resetColors();
      const { comparison, overwrite, highlight } = animations[animationIndex];

      if (comparison) {
        const [comparisonIndex1, comparisonIndex2] = comparison;
        arrayBars[comparisonIndex1].style.backgroundColor = "green";
        arrayBars[comparisonIndex2].style.backgroundColor = "green";
      }

      if (highlight) {
        const midIndex = highlight;
        arrayBars[midIndex].style.backgroundColor = "yellow";
      }

      if (overwrite) {
        const [overwriteIndex, value] = overwrite;
        auxArray[overwriteIndex] = value;
        arrayBars[overwriteIndex].style.height = `${value}px`;
      }

      animationIndex++;
      setTimeout(animateStep, 10000/speed);
    } else {
      setArray([...auxArray]); // Update the originalArray with the sorted auxArray once the animation is completed
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "purple";
      }
      // Enable the button in the other component once animation completes
      setGenerateDisable(false);
      setLengthDisable(false)
      setOptionDisable(false)
      setSpeedDisable(false)
    }
  };

  animateStep();
};

// quick sort animation
export const animateQuickSort = (originalArray, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable) => {
  let animationIndex = 0;
  const auxArray = [...originalArray];
  const arrayBars = document.getElementsByClassName("array-bar");

  const resetColors = () => {
    for (let i = 0; i < arrayBars.length; i++) {
      arrayBars[i].style.backgroundColor = "#11cffa";
    }
  };

  const animateStep = () => {
    if (animationIndex < animations.length) {
      resetColors();
      const { comparison, highlight, swap } = animations[animationIndex];

      if (comparison) {
        const [comparisonIndex1, comparisonIndex2] = comparison;
        if (
          comparisonIndex1 >= 0 &&
          comparisonIndex1 < arrayBars.length &&
          comparisonIndex2 >= 0 &&
          comparisonIndex2 < arrayBars.length
        ) {
          arrayBars[comparisonIndex1].style.backgroundColor = "green";
          arrayBars[comparisonIndex2].style.backgroundColor = "green";
        } else {
          console.error("Invalid comparison indices:", comparison);
        }
      } else if (highlight) {
        arrayBars[highlight].style.backgroundColor = "yellow";
      } else if (swap) {
        const [swapIndex1, swapIndex2] = swap;
        arrayBars[swapIndex1].style.backgroundColor = "red";
        arrayBars[swapIndex2].style.backgroundColor = "red";
        const temp = auxArray[swapIndex1];
        auxArray[swapIndex1] = auxArray[swapIndex2];
        auxArray[swapIndex2] = temp;
        const temp1 = arrayBars[swapIndex1].style.height;
        arrayBars[swapIndex1].style.height = arrayBars[swapIndex2].style.height;
        arrayBars[swapIndex2].style.height = temp1;
      }

      animationIndex++;
      setTimeout(animateStep, 10000/speed);
    } else {
      setArray(auxArray);
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "#11cffa";
      }
      // Enable the button in the other component once animation completes
      setGenerateDisable(false);
    //   setLengthDisable(false)
    //   setOptionDisable(false)
    //   setSpeedDisable(false)
    }
  };

  animateStep();
};
