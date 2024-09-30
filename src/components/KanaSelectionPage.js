import React from 'react';
import { useNavigate } from 'react-router-dom';
import KanaSelectionTable from './KanaSelectionTable';
import './KanaSelectionPage.css';

const KanaSelectionPage = ({ selectedKanas, setSelectedKanas }) => {
  const navigate = useNavigate();

  const startQuiz = () => {
    if (selectedKanas.length === 0) {
      alert('Please select at least one group of kana to start the quiz!');
    } else {
      navigate('/quiz'); // Redirection vers la page du quiz
    }
  };

  return (
    <div>
      <h1>Select Kana for Quiz</h1>
      <KanaSelectionTable selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />
      <button className="start-quiz-button" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default KanaSelectionPage;
