import { useState, useEffect } from "react";
import Form from "./Form";
import "../index.css";

function QuizForm({
  correctAnswer,
  lableTitle,
  quizField,
  solved,
  id,
  onSolved,
  difficulty,
}) {
  //A state variable that checks if the quiz is solved
  const [solvedState, setSolvedState] = useState(solved);
  //State variable that checks if the quiz has been attempted
  const [attempted, setAttempted] = useState(false);

  function validateAnswer(userGuess) {
    setAttempted(true);
    console.log("the correct answer is :", correctAnswer);

    switch (difficulty) {
      case "easy":
        switch (quizField) {
          case "Year":
            console.log('the switch case was called');
            if (Math.abs(correctAnswer - userGuess) <= 2) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Runtime":
            if (Math.abs(correctAnswer - userGuess) <= 7) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "imdbRating":
            if (Math.abs(correctAnswer - userGuess) <= 0.5) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "BoxOffice":
            correctAnswer = correctAnswer
              .substring(1, correctAnswer.length)
              .replaceAll(",", "");
            console.log("modified box office is ", correctAnswer);
            if (Math.abs(correctAnswer - userGuess) <= 1000000) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Director":
            if (correctAnswer.toLowerCase().includes(userGuess.toLowerCase())) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
        }
        break;
      case "medium":
        switch (quizField) {
          case "Year":
            if (Math.abs(correctAnswer - userGuess) <= 1) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Runtime":
            if (Math.abs(correctAnswer - userGuess) <= 3) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "imdbRating":
            if (Math.abs(correctAnswer - userGuess) <= 0.3) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "BoxOffice":
            correctAnswer = correctAnswer
              .substring(1, correctAnswer.length)
              .replaceAll(",", "");
            console.log("modified box office is ", correctAnswer);
            if (Math.abs(correctAnswer - userGuess) <= 1000000) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Director":
            if (correctAnswer.toLowerCase().includes(userGuess.toLowerCase())) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
        }
        break;
      case "hard":
        switch (quizField) {
          case "Year":
            console.log('the switch case was called');
            if (Math.abs(correctAnswer - userGuess) <= 0) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Runtime":
            if (Math.abs(correctAnswer - userGuess) <= 1) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "imdbRating":
            if (Math.abs(correctAnswer - userGuess) <= 0) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "BoxOffice":
            correctAnswer = correctAnswer
              .substring(1, correctAnswer.length)
              .replaceAll(",", "");
            console.log("modified box office is ", correctAnswer);
            if (Math.abs(correctAnswer - userGuess) <= 1000000) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
          case "Director":
            if (correctAnswer.toLowerCase().includes(userGuess.toLowerCase())) {
              console.log("correct");
              setSolvedState(true);
              return true;
            } else {
              console.log("wrong");
              setSolvedState(false);
              return false;
            }
            break;
        }
        break;
    }
  }

  function handleValidationSubmition(userGuess) {
    if (validateAnswer(userGuess)) {
      onSolved(id);
    }
  }

  return (
    <div
      className={` flex justify-center items-center gap-2 ${solvedState ? "gap-4" : ""}`}
    >
      <div
        className={`overlay flex justify-center items-center ${attempted && solved ? "bg-green-500" : ""} ${attempted && !solved ? "bg-red-500" : ""} ${!attempted ? "bg-transparent" : ""}`}
      >
        <label
          htmlFor="quiz-form"
          id="quiz-form-label"
          className="w-32 min-w-10 visible text-center"
        >
          {lableTitle}
        </label>
      </div>

      <div className={`${!solvedState ? "visible" : "hidden"} mr-10 `}>
        <Form onSubmit={handleValidationSubmition} />
      </div>
    </div>
  );
}

export default QuizForm;
