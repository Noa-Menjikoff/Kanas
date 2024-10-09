import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import KanaTableMultiColumn from './components/KanaTableMultiColumn'; // Tableau Hiragana/Katakana
import Quiz from './components/Quiz'; // Quiz
import KanaSelectionPage from './components/KanaSelectionPage'; // Sélection des Kanas
import KanjiPage from './components/KanjiPage'; // Page des Kanjis
import RadicalPage from './components/RadicalPage';
import DrawKana from './components/DrawKana';
import hiraganaData from './data/hiragana'; // Données Hiragana
import katakanaData from './data/katakana'; // Données Katakana
import TextPage from './components/TextsPage';
import TextDetailPage from './components/TextDetailPage';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture/fermeture du menu
  const [selectedKanas, setSelectedKanas] = useState([]); // Stocke les Kanas sélectionnés par l'utilisateur

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Inverse l'état du menu
  };

  return (
    <Router>
      <div className="App">
        {/* Barre de navigation */}
        <nav className="navbar">
          <img src={`${process.env.PUBLIC_URL}/logo_nihongo.png`} alt="logo" className="logo-nav" />
          <button className="hamburger" onClick={toggleMenu}>
            &#9776; {/* Icône hamburger */}
          </button>
          <ul className={`navbar-list ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/hiragana" onClick={toggleMenu}>Hiragana</Link></li>
            <li><Link to="/katakana" onClick={toggleMenu}>Katakana</Link></li>
            <li><Link to="/kana-selection" onClick={toggleMenu}>Start Quiz</Link></li>
            <li><Link to="/kanji" onClick={toggleMenu}>Kanjis</Link></li>
            <li><Link to="/radicals" onClick={toggleMenu}>Radicaux</Link></li>
            <li><Link to="/draw-kana" onClick={toggleMenu}>Dessiner un Kana</Link></li>
            <li><Link to="/texts" onClick={toggleMenu}>Textes</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiragana" element={<KanaTableMultiColumn data={hiraganaData} />} />
          <Route path="/katakana" element={<KanaTableMultiColumn data={katakanaData} />} />
          <Route path="/kana-selection" element={<KanaSelectionPage selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />} />
          <Route path="/quiz" element={<Quiz selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />} />
          <Route path="/kanji" element={<KanjiPage />} />
          <Route path="/radicals" element={<RadicalPage />} />
          <Route path="/draw-kana" element={<DrawKana />} />
          <Route path="/texts" element={<TextPage />} />
          <Route path="/texts/:index" element={<TextDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
