import React from "react";
import GamePageStyles from "./GamePage.module.css";
import Question from "./Question";
import IntroPage from "./IntroPage";
import { nanoid } from "nanoid";

export default function GamePage() {
  const [quizData, setQuizData] = React.useState([]);
  const [showQuiz, setShowQuiz] = React.useState(false);

  const [selectedAnswers, setSelectedAnswers] = React.useState([]);

  function startQuiz() {
    setShowQuiz(true);
  }

  function answerSelected(answer) {
    const newAnswers = selectedAnswers.filter((item) => item.questionObj.id !== answer.questionObj.id);
    setSelectedAnswers((oldAnswers) => {
      return [...newAnswers, answer];
    })
  }

  React.useEffect(function () {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(() => {
          return data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
            };
          });
        })
      );
  }, []);

  const mapQuizz = quizData.map(function (questionObj) {
    return (
      <Question
        key={questionObj.id}
        valueObj={questionObj}
        onAnswerSelected={answerSelected}
      ></Question>
    );
  });

  function checkAnswers() {
    console.log(selectedAnswers);
    const rightAnswers = selectedAnswers.filter((item) => item.selectedAnswer === item.questionObj.correct_answer);
    if (rightAnswers.length === 5) {
      alert("YOU WON");
    }
    else {
      alert("WAK WAK WAAAAK");
    }
  }

  return (
    <div>
      {showQuiz === false ? (
        <IntroPage startQuiz={startQuiz} />
      ) : (
        <div className={GamePageStyles.container}>
          <main className={GamePageStyles.main}>
            {mapQuizz}
            <button onClick={checkAnswers}>Check Answers</button>
          </main>
          <div className={GamePageStyles.blobBlue}></div>
          <div className={GamePageStyles.blobYellow}></div>
        </div>
      )}
    </div>
  );
}
