import React, { useReducer, useState } from "react";

const intitalState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "input") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === "blur") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "reset") {
    return {
      value: "",
      isTouched: false,
    };
  }
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, intitalState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (e) => {
    dispatch({ type: "input", value: e.target.value });
  };

  const valueBlurHandler = () => {
    dispatch({ type: "blur" });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return {
    value: inputState.value,
    isTouched: inputState.isTouched,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    valueIsValid,
    reset,
  };
};

export default useInput;
