import React from "react";
import AnswerButton from "./AnswerButton";
import QuestionStyles from "./Question.module.css";
import { nanoid } from "nanoid";

export default function Question(props) {
  const answers = [
    {
      id: nanoid(),
      text: props.valueObj.correct_answer,
      isHeld: false,
    },
  ];

  for (let i = 0; i < props.valueObj.incorrect_answers.length; i++) {
    const curAnswer = props.valueObj.incorrect_answers[i];
    answers.push({
      id: nanoid(),
      text: curAnswer,
      isHeld: false,
    });
  }

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex !== 0) {  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  const [answersData, setAnswersData] = React.useState(shuffle(answers));

  function handleClick(id, text) {
    setAnswersData((oldAnswers) =>
      oldAnswers.map((answer) => {
        if (id === answer.id) {
          return {
            ...answer,
            isHeld: !answer.isHeld,
          };
        } else {
          return {
            ...answer,
            isHeld: false,
          };
        }
      })
    );

    props.onAnswerSelected({
      questionObj: props.valueObj,
      selectedAnswer: text,
    });
  }



  const mapButtons = answersData.map((answer) => (
    <AnswerButton
      key={answer.id}
      isHeld={answer.isHeld}
      answer={answer.text}
      holdAnswer={() => handleClick(answer.id, answer.text)}
    />
  ));

  return (
    <div className={QuestionStyles.questionMain}>
      <div className={QuestionStyles.question} dangerouslySetInnerHTML={{__html: props.valueObj.question}}></div>
      <div className={QuestionStyles.answers}>{mapButtons}</div>
      <hr />
    </div>
  );
}
