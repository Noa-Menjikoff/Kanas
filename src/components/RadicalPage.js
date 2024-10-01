import React, { useState } from 'react';
import radicalsData from '../data/radicals'; // Assurez-vous que ce fichier contient les radicaux.
import '../css/RadicalPage.css'; // Pour le style

const RadicalPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Gérer la recherche

  // Fonction pour filtrer les radicaux en fonction du terme recherché
  const filterRadicals = () => {
    return radicalsData.filter(radical =>
      radical.radical.includes(searchTerm) || radical.meaning.includes(searchTerm)
    );
  };

  return (
    <div className="radical-page-container">
      <h1>Liste des Radicaux</h1>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher un radical ou une signification..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="radical-search"
      />

      {/* Liste des radicaux */}
      <table className="radical-table">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Radical</th>
            <th>Signification</th>
          </tr>
        </thead>
        <tbody>
          {filterRadicals().map((radical, index) => (
            <tr key={index}>
              <td>{radical.number}</td>
              <td>{radical.radical}</td>
              <td>{radical.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RadicalPage;
