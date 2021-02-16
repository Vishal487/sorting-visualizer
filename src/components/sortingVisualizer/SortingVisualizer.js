import React, { useEffect, useState } from "react";
import "./SortingVisualizer.css";
import { Form } from "react-bootstrap";

import { getMergeSortAnimations } from "../sortingAlgorithm/MergeSort";
import { getBubbleSortAnimations } from "../sortingAlgorithm/BubbleSort";
// import { getInsertionSortAnimations } from "../sortingAlgorithm/InsertionSort";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [barWidth, setBarWidth] = useState(60); // corresponing to small array size
  const [ARRAY_SIZE, SET_ARRAY_SIZE] = useState(20); // small
  const [SPEED, SET_SPEED] = useState(1); // corresponds to super-fast

  useEffect(() => {
    setRandomArray();
  }, []);

  const setRandomArray = () => {
    let array = [];
    for (let i = 0; i < ARRAY_SIZE; i++) {
      array.push(randomIntFromInterval(5, 550));
    }
    // setting background color back to red (bcz it changed when sorting)
    const allArrayBars = document.getElementsByClassName("array__bar");
    for (let i = 0; i < allArrayBars.length; i++) {
      const currBarStyle = allArrayBars[i].style;
      currBarStyle.backgroundColor = "#f88d00";
    }
    setArray(array);
  };

  const handleArraySize = (event) => {
    const array_size = event.target.value;
    if (array_size === "small") {
      SET_ARRAY_SIZE(20);
      setBarWidth(60);
    } else if (array_size === "medium") {
      SET_ARRAY_SIZE(45);
      setBarWidth(25);
    } else if (array_size === "large") {
      SET_ARRAY_SIZE(105);
      setBarWidth(10);
    } else {
      SET_ARRAY_SIZE(310);
      setBarWidth(2);
    }
  };

  const handleSpeed = (event) => {
    const speed = event.target.value;
    if (speed === "slow") {
      SET_SPEED(1000);
    } else if (speed === "medium") {
      SET_SPEED(100);
    } else if (speed === "fast") {
      SET_SPEED(10);
    } else {
      SET_SPEED(1);
    }
  };

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    const allArrayBars = document.getElementsByClassName("array__bar");

    let allToBeDisabledElements = document.getElementsByClassName(
      "toBeDisabled"
    );
    for (let i = 0; i < allToBeDisabledElements.length; i++) {
      allToBeDisabledElements[i].disabled = true;
    }

    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIndex, barTwoIndex] = animations[i];
        const barOneStyle = allArrayBars[barOneIndex].style;
        const barTwoStyle = allArrayBars[barTwoIndex].style;
        const newColor = i % 3 === 0 ? "black" : "green";
        setTimeout(() => {
          barOneStyle.backgroundColor = newColor;
          barTwoStyle.backgroundColor = newColor;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          const [barOneIndex, newHeight] = animations[i];
          const barOneStyle = allArrayBars[barOneIndex].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          for (let i = 0; i < allToBeDisabledElements.length; i++) {
            allToBeDisabledElements[i].disabled = false;
          }
        }, i * SPEED);
      }
    }
  };

  const bubbleSort = () => {
    const animations = getBubbleSortAnimations(array);
    const allArrayBars = document.getElementsByClassName("array__bar");

    let allToBeDisabledElements = document.getElementsByClassName(
      "toBeDisabled"
    );
    for (let i = 0; i < allToBeDisabledElements.length; i++) {
      allToBeDisabledElements[i].disabled = true;
    }

    for (let i = 0; i < animations.length; i++) {
      let isColorChange = true;
      if (i % 4 === 0 || i % 4 === 1) {
        isColorChange = true;
      } else {
        isColorChange = false;
      }

      if (isColorChange) {
        const [barOneIndex, barTwoIndex, newColor] = animations[i];
        const barOneStyle = allArrayBars[barOneIndex].style;
        const barTwoStyle = allArrayBars[barTwoIndex].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = newColor;
          barTwoStyle.backgroundColor = newColor;
        }, i * SPEED);
      } else {
        // set height
        const [barIndex, newHeight] = animations[i];
        const barStyle = allArrayBars[barIndex].style;
        setTimeout(() => {
          barStyle.height = `${newHeight}px`;
        }, i * SPEED);
      }
      if (i === animations.length - 1) {
        setTimeout(() => {
          for (let i = 0; i < allToBeDisabledElements.length; i++) {
            allToBeDisabledElements[i].disabled = false;
          }
        }, i * SPEED);
      }
    }
  };

  // const insertionSort = () => {
  //   const animations = getInsertionSortAnimations(array);
  //   const allArrayBars = document.getElementsByClassName("array__bar");
  //   for (let i = 0; i < animations.length; i++) {
  //     if (animations[i].length == 3) {
  //       const [barIndex, newHeight, newColor] = animations[i];
  //       const barStyle = allArrayBars[barIndex].style;
  //       setTimeout(() => {
  //         barStyle.height = `${newHeight}px`;
  //         // barStyle.backgroundColor = newColor;
  //       }, i * 1000);
  //     } else {
  //       const [barIndex, newColor] = animations[i];
  //       const barStyle = allArrayBars[barIndex].style;
  //       setTimeout(() => {
  //         barStyle.backgroundColor = newColor;
  //       }, i * 1000);
  //     }
  //   }
  // };

  const handleReset = () => {
    window.location.reload(true);
  };

  return (
    <div>
      <div className="header__container">
        <h2 className="heading">Sorting Visualizer</h2>
        <div className="dropdown__container">
          <div className="arraySize__wrapper">
            <div className="arraySize">
              <label htmlFor="arraySize">Array Size:</label>
              <Form.Control
                id="arraySize"
                className="toBeDisabled"
                as="select"
                custom
                onChange={handleArraySize}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="very-large">Very Large</option>
              </Form.Control>
            </div>
          </div>
          <div className="speed_wrapper">
            <div className="speed">
              <label htmlFor="speed">Speed:</label>
              <Form.Control
                id="speed"
                className="toBeDisabled"
                as="select"
                custom
                onChange={handleSpeed}
              >
                <option value="super-fast">Super Fast</option>
                <option value="fast">Fast</option>
                <option value="medium">Medium</option>
                <option value="slow">Slow</option>
              </Form.Control>
            </div>
          </div>
        </div>
        <div className="header__options">
          <button
            id="btn__setArray"
            className="toBeDisabled"
            onClick={setRandomArray}
          >
            Set Random Array
          </button>
          <button className="btn__sort toBeDisabled" onClick={mergeSort}>
            Merge Sort
          </button>
          <button className="btn__sort toBeDisabled" onClick={bubbleSort}>
            Bubble Sort
          </button>
          {/* <button onClick={insertionSort}>Insertion Sort</button> */}
          <button id="reset__button" onClick={handleReset}>Reset to Default</button>
        </div>
      </div>

      <br />
      <div className="array__container">
        {array.map((value, index) => (
          <div
            className="array__bar"
            key={index}
            style={{
              height: `${value}px`,
              width: `${barWidth}px`,
              backgroundColor: "#f88d00",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortingVisualizer;
