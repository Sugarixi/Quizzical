import React from "react";
import IntroPageStyles from "./IntroPage.module.css";

export default function IntroPage(props) {
  return (
    <main className={IntroPageStyles.main}>
      <div className={IntroPageStyles.content}>
        <div className={IntroPageStyles.text}>
          <h1>Quizzical</h1>
          <p>Welcome to the Quizzical game, have fun!</p>
        </div>
        <button onClick={props.startQuiz}>Start quiz</button>
      </div>
      <div className={IntroPageStyles.blobBlue}></div>
      <div className={IntroPageStyles.blobYellow}></div>
    </main>
  );
}
