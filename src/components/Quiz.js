import React, { useState, useEffect } from 'react';
import hiraganaData from '../data/hiragana';
import katakanaData from '../data/katakana';
import './Quiz.css'; // Assure-toi de créer ce fichier pour le style

const Quiz = ({ selectedKanas }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentKana, setCurrentKana] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);

  // Filtrer les Kanas valides pour éviter les vides
  const filterValidKanas = (data) => {
    return data.filter(kana => kana.symbol && kana.romaji);
  };

  // Rassembler les données sélectionnées et filtrer les Kanas vides
  useEffect(() => {
    const selectedData = selectedKanas.flatMap(selection => {
      if (selection.groupName === 'hiragana') {
        return filterValidKanas(hiraganaData[selection.index]);
      } else if (selection.groupName === 'katakana') {
        return filterValidKanas(katakanaData[selection.index]);
      }
      return [];
    });

    setQuizData(selectedData);

    // Choisir un premier Kana aléatoire si des Kanas ont été sélectionnés
    if (selectedData.length > 0) {
      setCurrentKana(selectedData[Math.floor(Math.random() * selectedData.length)]);
    }
  }, [selectedKanas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTotalAnswers(totalAnswers + 1);

    if (input.toLowerCase() === currentKana.romaji.toLowerCase()) {
      setScore(score + 1);
    } else {
      setErrors(errors + 1);
    }

    setInput('');

    // Passer à un autre caractère aléatoire
    setCurrentKana(quizData[Math.floor(Math.random() * quizData.length)]);
  };

  if (quizData.length === 0) {
    return <div>Please select some Kana from the tables above to start the quiz!</div>;
  }

  return (
    <div className="quiz-container">
      <h1>Quiz: Quel est ce Kana ?</h1>
      
      {currentKana && (
        <div className="kana-display">
          <div className="kana-symbol-quiz">{currentKana.symbol}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="quiz-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type the romaji"
          className="quiz-input"
        />
        <button type="submit" className="quiz-button">Submit</button>
      </form>

      <div className="quiz-stats">
        <p>Correct Answers: {score}</p>
        <p>Wrong Answers: {errors}</p>
        <p>Total Answers: {totalAnswers}</p>
      </div>
    </div>
  );
};

export default Quiz;
