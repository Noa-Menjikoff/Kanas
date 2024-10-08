import React, { useState } from 'react';
import textData from '../data/texts'; // Importer les textes par niveau
import '../css/TextPage.css'; // Ajouter des styles pour la page

const TextPage = () => {
  const [selectedLevel, setSelectedLevel] = useState(''); // Pour gérer le niveau sélectionné

  // Filtrer les textes selon le niveau sélectionné
  const filterTexts = () => {
    if (!selectedLevel) return [];
    return textData[selectedLevel] || [];
  };

  return (
    <div className="text-page-container">
      <h1>Textes Japonais</h1>

      {/* Sélection du niveau */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="level-filter"
      >
        <option value="">Sélectionnez un niveau</option>
        <option value="N5">Niveau N5 (Facile)</option>
        <option value="N4">Niveau N4</option>
        <option value="N3">Niveau N3</option>
        <option value="N2">Niveau N2</option>
        <option value="N1">Niveau N1 (Avancé)</option>
      </select>

      {/* Affichage des textes selon le niveau */}
      <div className="text-list">
        {filterTexts().map((text, index) => (
          <div key={index} className="text-item">
            <h2>{text.title}</h2>
            <p>{text.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextPage;
