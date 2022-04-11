import React from "react";
import GamePageStyles from "./GamePage.module.css";
import Question from "./Question";
import IntroPage from "./IntroPage";
import { nanoid } from "nanoid";

export default function GamePage() {
  const [quizData, setQuizData] = React.useState([]);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [isOver, setIsOver] = React.useState(false);
  const [rightAnswersCount, setRightAnswersCount] = React.useState(0);

  function startQuiz() {
    setShowQuiz(true);
    setIsOver(false);
    setRightAnswersCount(0);
  }

  function answerSelected(answer) {
    setQuizData((oldData) => {
      return oldData.map((item) => {
        if (item.id === answer.questionObj.id) {
          return { ...item, selectedAnswer: answer.selectedAnswer };
        } else {
          return item;
        }
      });
    });
  }

  function fetchQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) =>
        setQuizData(() => {
          return data.results.map((question) => {
            return {
              ...question,
              id: nanoid(),
              selectedAnswer: "",
            };
          });
        })
      );
  }

  React.useEffect(function () {
    fetchQuestions();
  }, []);

  const mapQuizz = quizData.map(function (questionObj) {
    return (
      <Question
        key={questionObj.id}
        valueObj={questionObj}
        onAnswerSelected={answerSelected}
        isOver={isOver}
      ></Question>
    );
  });

  function checkAndPlay() {
    if (isOver === true) {
      fetchQuestions();
    }

    setIsOver((oldIsOver) => !oldIsOver);

    const rightAnswers = quizData.filter(
      (item) => item.selectedAnswer === item.correct_answer
    );

    setRightAnswersCount(rightAnswers.length);
  }

  return (
    <div>
      {showQuiz === false ? (
        <IntroPage startQuiz={startQuiz} />
      ) : (
        <div className={GamePageStyles.container}>
          <main className={GamePageStyles.main}>
            {mapQuizz}
            {isOver === true && (
              <div className={GamePageStyles.scoreCount}>
                You scored {rightAnswersCount}/5 correct answers
              </div>
            )}
            <button onClick={checkAndPlay}>
              {isOver === true ? "Play again" : "Check Answers"}
            </button>
          </main>
          <div className={GamePageStyles.blobBlue}></div>
          <div className={GamePageStyles.blobYellow}></div>
        </div>
      )}
    </div>
  );
}
