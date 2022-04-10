import React from "react";
import AnswerButtonStyles from "./AnswerButton.module.css";

export default function AnswerButton(props) {
  return (
    <button
      className={AnswerButtonStyles.button}
      onClick={props.holdAnswer}
      style={
        props.isHeld === true
          ? { backgroundColor: "#D6DBF5", border: "solid 1px #D6DBF5" }
          : { backgroundColor: "transparent", border: "solid 1px #4D5B9E" }
      }
    >
      {props.answer}
    </button>
  );
}
