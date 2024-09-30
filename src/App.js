import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import KanaTableMultiColumn from './components/KanaTableMultiColumn'; // Tableau Hiragana/Katakana
import Quiz from './components/Quiz'; // Quiz
import KanaSelectionPage from './components/KanaSelectionPage'; // Sélection des Kanas avec bouton "Start Quiz"
import hiraganaData from './data/hiragana'; // Données Hiragana
import katakanaData from './data/katakana'; // Données Katakana
import './App.css';

function App() {
  const [selectedKanas, setSelectedKanas] = useState([]); // Stocke les Kanas sélectionnés par l'utilisateur

  return (
    <Router>
      <div className="App">
        {/* Barre de navigation */}
        <nav className="navbar">
          <ul className="navbar-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/hiragana">Hiragana</Link></li>
            <li><Link to="/katakana">Katakana</Link></li>
            <li><Link to="/kana-selection">Start Quiz</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiragana" element={<KanaTableMultiColumn data={hiraganaData} />} />
          <Route path="/katakana" element={<KanaTableMultiColumn data={katakanaData} />} />
          <Route path="/kana-selection" element={<KanaSelectionPage selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />} />
          <Route path="/quiz" element={<Quiz selectedKanas={selectedKanas} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
