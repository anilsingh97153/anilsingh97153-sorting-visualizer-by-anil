import "../../src/index.css";
import React, { useEffect, useState } from "react";
import {
  bubbleSort,
  selectionSort,
  getMergeSortAnimations,
  getQuickSortAnimations,
} from "./SortingAlgorithms";
import {
  animateBubbleSort,
  animateSelectionSort,
  animateMergeSort,
  animateQuickSort,
} from "./SortingAnimations";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [length, setLength] = useState(50);
  const [generateDisable, setGenerateDisable] = useState(false);
  const [sortDisable, setSortDisable] = useState(false); // sort button enabled initially
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  let [animations, setAnimations] = useState([]);
  const [speed, setSpeed] = useState(500)
  const [lengthDisable, setLengthDisable] = useState(false);
  const [speedDisable, setSpeedDisable] = useState(false);
  const [optionDisable, setOptionDisable] = useState(false)

  // function to generation a random number from given interval
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // function to generate a new random array
  const generateNewArray = () => {
    const arrayBars = document.getElementsByClassName("array-bar");

    const resetColors = () => {
      for (let i = 0; i < arrayBars.length; i++) {
        arrayBars[i].style.backgroundColor = "#11cffa"; // Reset to default color
      }
    };
    resetColors();
    const arr = [];
    for (let i = 0; i < length; i++) {
      arr.push(randomIntFromInterval(10, 500));
    }
    setArray(arr);

    // when the new array is generate after a sorting completes 
    setSortDisable(false);
    setLengthDisable(false)
    setSpeedDisable(false)
    setOptionDisable(false)
  };

  // Re-generate array whenever 'length' changes
  useEffect(() => {
    generateNewArray(length);
  }, [length]); // Dependency array includes 'length'

  // handles Length based on the range input
  const handleLength = (event) => {
    const newValue = parseInt(event.target.value);
    setLength(newValue); // Update length with new value
  };

  // handles speed based on the range input
  const handleSpeed = (event) => {
    const newValue = parseInt(event.target.value);
    setSpeed(newValue); // Update speed with new value
  };

  // handleAlgorithm change from drop down onChange
  const handleSortAlgorithmChange = (event) => {
    setAlgorithm(event.target.value);
  };

  // sorting scheduler
  const sortScheduler = async () => {
    setSortDisable(true);
    setGenerateDisable(true)
    setLengthDisable(true)
    setOptionDisable(true)
    setSpeedDisable(true)
    switch (algorithm) {
      case "bubbleSort":
        animations = bubbleSort(array);
        setAnimations(animations);
        animateBubbleSort(array, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable);
        break;
      case "mergeSort":
        animations = getMergeSortAnimations(array);
        setAnimations(animations);
        animateMergeSort(array, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable);
        break;
      case "selectionSort":
        animations = selectionSort(array);
        setAnimations(animations);
        animateSelectionSort(array, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable);
        break;
      case "quickSort":
        animations = getQuickSortAnimations(array);
        setAnimations(animations);
        animateQuickSort(array, animations, setArray, speed, setGenerateDisable, setLengthDisable, setOptionDisable, setSpeedDisable);
        break;
      default:
        animations = bubbleSort(array);
        setAnimations(animations);
        animateBubbleSort(array, animations, setArray);
    }
  };

  return (
    <>
      {/* Navigation bar till 4th component */}
      <div className="flex flex-wrap items-center justify-center space-x-10 space-y-1">
        {/* 1. button to generate a new random array */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateNewArray}
          disabled={generateDisable}
        >
          Generate New Array
        </button>

        {/* 2. button to start the sorting process */}
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={sortScheduler}
          disabled={sortDisable}
        >
          Sort
        </button>

        {/* 3. dropdown or radio buttons to select the algorithm */}
        <div className="flex items-center">
          <label htmlFor="algorithm" className="mr-2 text-black">
            Algorithm:
          </label>
          <select
            id="algorithm"
            className="border border-gray-300 rounded p-1"
            disabled={optionDisable}
            onChange={handleSortAlgorithmChange} // Call handleSortAlgorithmChange here
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="quickSort">Quick Sort</option>
          </select>
        </div>

        {/* 4. range inpput to adjust array length*/}
        <div className="flex items-center ml-5 text-black">
          <label htmlFor="length" className="mr-2">
            Array Length:
          </label>
          <input
            id="length"
            type="range"
            min="10"
            value={length}
            max="100"
            onChange={handleLength}
            className="w-full"
            disabled={lengthDisable}
          />
        </div>

        {/* 5. range inpput to adjust sorting speed*/}
        <div className="flex items-center ml-5 text-black">
          <label htmlFor="speed" className="mr-2">
            Sorting speed:
          </label>
          <input
            id="speed"
            type="range"
            min="5"
            value={speed}
            max="1000"
            onChange={handleSpeed}
            className="w-full"
            disabled={speedDisable}
          />
        </div>
      </div>

      {/* 5. a container to display array as bars */}
      <div className="array-container flex mt-4">
        {/* Map over the array and render bars */}
        {array.map((value, index) => (
          <div
            className="array-bar mx-0.5"
            key={index}
            style={{
              height: `${value}px`,
              width: `${80 / array.length}vw`,
              backgroundColor: "#11cffa",
            }}
          ></div>
        ))}
      </div>
    </>
  );
}
export default SortingVisualizer;
