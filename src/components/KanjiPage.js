import React, { useState } from 'react';
import kanjiData from '../data/kanji'; // Import des données des Kanjis triés par niveau
import '../css/KanjiPage.css'; // Styles de la page des Kanjis

const KanjiPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Gère la barre de recherche
  const [selectedLevel, setSelectedLevel] = useState(''); // Gère le filtre par niveau

  // Fonction pour filtrer les Kanjis par niveau et recherche
  const filterKanjis = () => {
    let filteredKanjis = [];

    // Parcours des niveaux pour trouver les Kanjis
    Object.keys(kanjiData).forEach(level => {
      if (selectedLevel === '' || selectedLevel === level) {
        filteredKanjis = [
          ...filteredKanjis,
          ...kanjiData[level].filter(kanji =>
            kanji.kanji.includes(searchTerm) || kanji.signification.includes(searchTerm)
          ),
        ];
      }
    });

    return filteredKanjis;
  };

  return (
    <div className="kanji-page-container">
      <h1>Liste des Kanjis</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un Kanji ou une signification..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="kanji-search"
      />

      {/* Filtre par niveau */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="kanji-filter"
      >
        <option value="">Tous les niveaux</option>
        <option value="N1">N1</option>
        <option value="N2">N2</option>
        <option value="N3">N3</option>
        <option value="N4">N4</option>
        <option value="N5">N5</option>
      </select>

      {/* Liste des Kanjis */}
      <table className="kanji-table">
        <thead>
          <tr>
            <th>Kanji</th>
            <th>Niveau</th>
            <th>Signification</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filterKanjis().map((kanji, index) => (
            <tr key={index}>
              <td>{kanji.kanji}</td>
              <td>{selectedLevel || Object.keys(kanjiData).find(level => kanjiData[level].includes(kanji))}</td>
              <td>{kanji.signification}</td>
              <td>{kanji.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KanjiPage;
