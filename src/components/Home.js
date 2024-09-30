import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';  // Optionnel : pour ajouter du style plus tard

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue sur l'App d'Apprentissage des Kanas !</h1>
      <p>Les kanas sont les deux syllabaires japonais : Hiragana et Katakana. Ils sont essentiels pour apprendre à lire et écrire en japonais.</p>
      <p>Cette application va vous aider à les mémoriser de manière interactive et ludique.</p>
      
      <div className="button-group">
        <Link to="/hiragana" className="home-button">Apprendre les Hiragana</Link>
        <Link to="/katakana" className="home-button">Apprendre les Katakana</Link>
        <Link to="/kana-selection" className="home-button">Tester vos connaissances</Link>
      </div>
    </div>
  );
}

export default Home;
