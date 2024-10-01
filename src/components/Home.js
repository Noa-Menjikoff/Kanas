import React from 'react';
import '../css/Home.css';  // Optionnel : pour ajouter du style plus tard

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenue sur l'App d'Apprentissage des Kanas !</h1>
      <p>Les kanas sont les deux syllabaires japonais : Hiragana et Katakana. Ils constituent la base de l'apprentissage de la langue japonaise et sont utilisés dans la plupart des textes.</p>
      <p>Cette application a pour but de vous aider à mémoriser ces symboles en vous proposant plusieurs outils interactifs :</p>
      <ul>
        <li><strong>Tables des Kanas :</strong> Consultez les tableaux des Hiragana et Katakana pour apprendre visuellement chaque symbole.</li>
        <li><strong>Quiz interactif :</strong> Testez vos connaissances et mesurez vos progrès grâce à un quiz dynamique.</li>
        <li><strong>Exercices de dessin :</strong> Dessinez les Kanas à la main pour améliorer la mémorisation.</li>
      </ul>
      
      <p>Utilisez la barre de navigation en haut pour accéder aux différentes sections de l'application. Bonne chance et amusez-vous bien à apprendre les Kanas !</p>
      
      {/* Si nécessaire, vous pouvez ajouter une image ou une illustration */}
      <div className="home-image">
        <img src={`${process.env.PUBLIC_URL}/logo_nihongo.png`} alt="logo"/>
      </div>
    </div>
  );
}

export default Home;
