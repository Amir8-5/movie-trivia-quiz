import { useState } from 'react';

export default function QuizForm({
  labelTitle,
  correctAnswer,
  id,
  solved,
  onSolved,
  difficulty, // Note: difficulty is not used in this example, but is passed in
}) {
  const [guess, setGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (solved) return;

    // A simple check, you might have more complex logic based on difficulty
    const correct =
      String(guess).toLowerCase().trim() ===
      String(correctAnswer).toLowerCase().trim();

    setIsCorrect(correct);
    if (correct) {
      onSolved(id);
    }
  };

  const inputStyle = solved
    ? 'bg-asparagus/20 border-asparagus text-gray-500'
    : 'bg-gray-50 border-gray-300 focus:ring-1 focus:ring-asparagus focus:border-asparagus';

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-200 rounded-lg">
      <label
        htmlFor={`quiz-input-${id}`}
        className="block mb-2 text-sm font-bold lato-bold text-outerspace"
      >
        {labelTitle}
      </label>
      <div className="flex gap-2">
        <input
          id={`quiz-input-${id}`}
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          className={`block w-full p-2 text-sm text-gray-900 border rounded-lg transition-colors ${inputStyle}`}
          disabled={solved}
          placeholder="Your answer..."
        />
        <button
          type="submit"
          disabled={solved || !guess}
          className="px-4 py-2 text-sm font-medium text-white rounded-lg bg-asparagus hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-asparagus/50 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {solved ? 'Solved!' : 'Check'}
        </button>
      </div>
      {!solved && isCorrect === false && (
        <p className="mt-2 text-sm text-red-600">Not quite, try again!</p>
      )}
    </form>
  );
}

