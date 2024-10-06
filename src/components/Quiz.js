import React, { useState, useEffect } from 'react';
import hiraganaData from '../data/hiragana';
import katakanaData from '../data/katakana';
import '../css/Quiz.css'; // Assure-toi de créer ce fichier pour le style

const Quiz = ({ selectedKanas, setSelectedKanas }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentKana, setCurrentKana] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null); // Gérer si la réponse est correcte ou non

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

  // Passer à un autre kana
  const moveToNextKana = () => {
    setCurrentKana(quizData[Math.floor(Math.random() * quizData.length)]);
    setShowCorrection(false);
    setIsAnswerCorrect(null);
    setInput('');
  };

  // Vérifier la réponse progressivement
  const checkAnswer = (value) => {
    const correctAnswer = currentKana.romaji.toLowerCase();

    // Si l'utilisateur tape partiellement la bonne réponse, on ne montre pas d'erreur
    if (correctAnswer.startsWith(value.toLowerCase())) {
      setIsAnswerCorrect(null); // Pas d'erreur ni de validation tant que la saisie continue
    } else {
      setIsAnswerCorrect(false); // Afficher une erreur si la saisie est incorrecte
    }

    // Si l'utilisateur a fini de taper la réponse complète
    if (value.toLowerCase() === correctAnswer) {
      setIsAnswerCorrect(true);
      setScore(score + 1);
      setTotalAnswers(totalAnswers + 1);
      moveToNextKana(); // Passer au suivant si la réponse est correcte
    }
  };

  // Gérer la touche Entrée
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showCorrection) {
        // Si la correction est affichée, passer au prochain kana
        moveToNextKana();
      } else if (!isAnswerCorrect) {
        // Si la réponse est fausse et qu'on appuie sur Enter, afficher la correction
        setShowCorrection(true);
        setErrors(errors + 1);
        setTotalAnswers(totalAnswers + 1);
      }
    }
  };



  if (quizData.length === 0) {
    return <div>Please select some Kana from the tables above to start the quiz!</div>;
  }

  return (
    <div className="quiz-container" onKeyDown={handleKeyPress} tabIndex={0}>
      {currentKana && (
        <div className="kana-display">
          <div className="kana-symbol-quiz">{currentKana.symbol}</div>
        </div>
      )}

      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          checkAnswer(e.target.value);
        }}
        placeholder="Type the romaji"
        className={`quiz-input ${isAnswerCorrect === false ? 'error' : ''}`}
      />

      {isAnswerCorrect === false && !showCorrection && (
          <p className="error-text">✖</p>
      )}

      {showCorrection && (
          <p className="correct-answer"><strong>{currentKana.romaji}</strong></p>
      )}

      <div className="quiz-stats">
        <p>Correct Answers: {score}</p>
        <p>Wrong Answers: {errors}</p>
        <p>Total Answers: {totalAnswers}</p>
      </div>

     
    </div>
  );
};

export default Quiz;
