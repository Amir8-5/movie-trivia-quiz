import { useState, useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuizForm from "../components/QuizForm";
export default function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const gameTime = 120; //The amount of the time to complete the game

  useEffect(() => {
    // If location.state is missing, we don't have the data to run the quiz.
    // Redirect back to the movie search page.
    if (!location.state?.apiData || !location.state?.formValues) {
      console.error("Quiz data not available, redirecting.");
      navigate("/Movie-Search");
    }
  }, [location.state, navigate]);

  const [quizElementArray, setQuizElementArray] = useState(null);
  const [isTimeFinished, setTimeFinished] = useState(false);
  const [isGameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(gameTime); //The time is in seconds
  const apiData = location.state?.apiData;
  const formValues = location.state?.formValues;

  const {
    includeYear,
    includeRuntime,
    includeImdbRating,
    includeBoxOffice,
    includeDirector,
  } = formValues || {};

  if (!apiData || !formValues) {
    return null; // Or a loading spinner while redirecting
  }

  // Check if any of the quiz options were selected on the previous screen
  const anyOptionSelected = [
    includeYear,
    includeRuntime,
    includeImdbRating,
    includeBoxOffice,
    includeDirector,
  ].some(Boolean);

  useEffect(() => {
    // This effect runs once to initialize the quiz data from the API data
    if (apiData) {
      const initialQuizElements = [
        {
          quizField: "Year",
          title: "Release Year",
          userGuess: "",
          correctAnswer: apiData.Year,
          solved: false,
          id: 1,
        },
        {
          quizField: "Runtime",
          title: "Runtime",
          userGuess: "",
          correctAnswer: apiData.Runtime ? apiData.Runtime.split(" ")[0] : "",
          solved: false,
          id: 2,
        },
        {
          quizField: "imdbRating",
          title: "Rating",
          userGuess: "",
          correctAnswer: apiData.imdbRating,
          solved: false,
          id: 3,
        },
        {
          quizField: "BoxOffice",
          title: "Box Office",
          userGuess: "",
          correctAnswer: apiData.BoxOffice,
          solved: false,
          id: 4,
        },
        {
          quizField: "Director",
          title: "Director",
          userGuess: "",
          correctAnswer: apiData.Director,
          solved: false,
          id: 5,
        },
      ];
      setQuizElementArray(initialQuizElements);
    }
  }, [apiData]);

  // Timer effect
  useEffect(() => {
    // Only run the timer if the game is active
    if (isTimeFinished || isGameWon) return;

    if (timeLeft === 0) {
      setTimeFinished(true);
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [timeLeft, isTimeFinished, isGameWon]);

  const displayedQuizElements = useMemo(() => {
    if (!quizElementArray) return [];

    if (!anyOptionSelected) {
      return quizElementArray;
    }

    const selectionMap = {
      Year: includeYear,
      Runtime: includeRuntime,
      imdbRating: includeImdbRating,
      BoxOffice: includeBoxOffice,
      Director: includeDirector,
    };

    return quizElementArray.filter((quiz) => selectionMap[quiz.quizField]);
  }, [quizElementArray, anyOptionSelected, includeYear, includeRuntime, includeImdbRating, includeBoxOffice, includeDirector]);

  // Win condition effect
  useEffect(() => {
    if (displayedQuizElements.length > 0 && displayedQuizElements.every((q) => q.solved)) {
      setGameWon(true);
      setTimeFinished(true); // Stop the timer
    }
  }, [displayedQuizElements]);

  const isGameOver = isGameWon || (isTimeFinished && !isGameWon);

  function handleSolve(id) {
    setQuizElementArray(
      quizElementArray.map((quiz) => {
        if (quiz.id === id) {
          return { ...quiz, solved: !quiz.solved };
        }
        return quiz;
      })
    );
  }

  if (isGameOver) {
    return (
      <main className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="w-full max-w-2xl p-8 space-y-6 text-center bg-white border border-gray-200 rounded-lg shadow-xl sm:p-10">
          <h1 className="text-4xl font-bold sm:text-5xl text-outerspace">
            {isGameWon ? "🎉 You Won! 🎉" : "😭 Time's Up! 😭"}
          </h1>
          <p className="text-lg text-gray-600">
            {isGameWon
              ? "Congratulations! You've solved the mystery."
              : "You ran out of time. Better luck next time!"}
          </p>
          <button
            onClick={() => navigate("/Movie-Search")}
            className="capitalize w-full sm:w-auto text-white bg-asparagus hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-asparagus/50 font-medium rounded-lg text-base px-8 py-3"
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  if (!quizElementArray) {
    return (
      <main className="flex flex-col items-center justify-center w-full min-h-screen p-4">
        <div className="text-2xl font-bold text-white">Loading Quiz...</div>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center w-full min-h-screen p-4">
      <div
        className="w-full max-w-4xl p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6"
      >
        <div className="flex flex-col items-center">
          <h1 className="m-4 text-3xl font-bold text-center sm:text-4xl text-outerspace">
            {apiData.Title}
          </h1>
          {apiData.Poster && apiData.Poster !== "N/A" ? (
            <img
              src={apiData.Poster}
              alt={`${apiData.Title} poster`}
              className="rounded-lg shadow-md"
            />
          ) : null}
        </div>
        <div className="text-2xl font-bold text-center text-red-500">
          Time Left: {timeLeft}s
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          {displayedQuizElements.map((quizElement) => (
            <QuizForm
              labelTitle={quizElement.title}
              quizField={quizElement.quizField}
              correctAnswer={quizElement.correctAnswer}
              key={quizElement.id}
              id={quizElement.id}
              solved={quizElement.solved}
              onSolved={handleSolve}
              difficulty={formValues.difficulty}
              isGameOver={isGameOver}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
