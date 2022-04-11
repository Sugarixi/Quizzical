import React from "react";
import AnswerButtonStyles from "./AnswerButton.module.css";

export default function AnswerButton(props) {
  function getClassNames() {
    const classNames = [AnswerButtonStyles.button];

    if (props.isOver === true) {
      if (props.isHeld && props.isRight === true) {
        classNames.push(AnswerButtonStyles.isRight);
      } else if (props.isHeld && props.isRight === false) {
        classNames.push(AnswerButtonStyles.isWrong);
      } else if (props.isRight) {
        classNames.push(AnswerButtonStyles.isRight);
      }
    } else if (props.isHeld) {
      classNames.push(AnswerButtonStyles.isHeld);
    }

    return classNames.join(" ");
  }

  return (
    <button
      disabled={props.isOver}
      className={getClassNames()}
      onClick={props.holdAnswer}
      style={
        props.isHeld === true
          ? { backgroundColor: "#D6DBF5", border: "solid 1px #D6DBF5" }
          : { backgroundColor: "transparent", border: "solid 1px #4D5B9E" }
      }
      dangerouslySetInnerHTML={{ __html: props.answer }}
    ></button>
  );
}
