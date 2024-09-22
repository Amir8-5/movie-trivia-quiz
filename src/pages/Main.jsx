import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuizForm from "../components/QuizForm";

export default function Main() {
  const location = useLocation();
  const gameTime = 120;//The amount of the time to complete the game
  const [quizElementArray, setQuizElementArray] = useState(null);
  const [isTimeFinished, setTimeFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameTime); //The time is in seconds
  const apiData = location.state.apiData;
  const formValues = location.state.formValues;
  const pathname = location.pathname ? location.pathname : "";
  console.log("location dats is ", location);
  console.log("the form values are :", formValues);

  useEffect(() => {
    console.log("quiz element array is ", quizElementArray);
    if (apiData != null && quizElementArray == null) {
      console.log("called the set quiz element array");
      setQuizElementArray([
        {
          quizField: "Year",
          title: "Release Year",
          userGuess: "",
          correctAnswer: apiData["Year"],
          solved: false,
          id: 1,
        },
        {
          quizField: "Runtime",
          title: "Runtime",
          userGuess: "",
          correctAnswer: apiData["Runtime"].substring(
            0,
            apiData["Runtime"].indexOf(" ")
          ),
          solved: false,
          id: 2,
        },
        {
          quizField: "imdbRating",
          title: "Rating",
          userGuess: "",
          correctAnswer: apiData["imdbRating"],
          solved: false,
          id: 3,
        },
        {
          quizField: "BoxOffice",
          title: "Box Office",
          userGuess: "",
          correctAnswer: apiData["BoxOffice"],
          solved: false,
          id: 4,
        },
        {
          quizField: "Director",
          title: "Director",
          userGuess: "",
          correctAnswer: apiData["Director"],
          solved: false,
          id: 5,
        },
      ]);
    }
  }, [apiData, quizElementArray]);

  useEffect(() => {
    if (timeLeft === 0) {
      console.log("The game is over");
      setTimeFinished(true);
    }

    const timer = pathname!=''?setInterval(() => {
      setTimeLeft(timeLeft > 0 ? timeLeft - 1 : 0);
    }, 1000):'';

    return () => clearInterval(timer);
  });

  function handleSolve(id) {
    console.log("called handle solve");
    setQuizElementArray(
      quizElementArray.map((quiz) => {
        if (quiz.id === id) {
          return { ...quiz, solved: !quiz.solved };
        }
        return quiz;
      })
    );
  }

  return (
    <div className="flex flex-col flex-wrap grow shrink items-center justify-center w-screen gap-10">
      <div
        className={`w-10/12 h-screen border flex flex-col justify-start items-center gap-6 border-gray-400 rounded bg-lavender`}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-center text-4xl lato-bold text-green-950 m-4">
            {apiData != null ? apiData.Title : ""}
          </h1>
          {apiData != null ? (
            <img src={apiData["Poster"]} alt="pic" className="" />
          ) : (
            ""
          )}
        </div>
        <div className="text-lg text-red-500">
          {timeLeft}
        </div>
        {/*filtering the unchecked elements based on the intial user input */}
        {quizElementArray != null
          ? quizElementArray
              .filter((quizElement) => {
                if (quizElement.quizField === "Year" && formValues.includeYear)
                  return true;
                if (
                  quizElement.quizField === "Runtime" &&
                  formValues.includeRuntime
                )
                  return true;
                if (
                  quizElement.quizField === "imdbRating" &&
                  formValues.includeimdbRating
                )
                  return true;
                if (
                  quizElement.quizField === "BoxOffice" &&
                  formValues.includeBoxoffice
                )
                  return true;
                if (
                  quizElement.quizField === "Director" &&
                  formValues.includeDirector
                )
                  return true;
                return false;
              })
              .map((quizElement) => (
                <QuizForm
                  lableTitle={quizElement.title}
                  quizField={quizElement.quizField}
                  correctAnswer={quizElement.correctAnswer}
                  key={quizElement.id}
                  id={quizElement.id}
                  solved={quizElement.solved}
                  onSolved={handleSolve}
                  difficulty={formValues.difficulty}
                />
              ))
          : ""}
      </div>
    </div>
  );
}
