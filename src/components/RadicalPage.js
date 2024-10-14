import React, { useState } from 'react';
import radicalsData from '../data/radicalsData'; // Import the radicals data (grouped by WaniKani levels)
import '../css/RadicalPage.css'; // Styles for the Radicals page

const RadicalsPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to handle search input
  const [selectedLevel, setSelectedLevel] = useState(''); // State to handle filtering by level

  // Function to filter radicals based on the search term and level filter
  const filterRadicals = () => {
    let filteredRadicals = [];

    // Loop through levels to find the corresponding radicals
    Object.keys(radicalsData).forEach(level => {
      if (selectedLevel === '' || selectedLevel === level) {
        filteredRadicals = [
          ...filteredRadicals,
          ...radicalsData[level].filter(radical =>
            radical.radical.includes(searchTerm) || radical.signification.includes(searchTerm)
          ),
        ];
      }
    });

    return filteredRadicals;
  };

  return (
    <div className="radicals-page-container">
      <h1>Liste des Radicaux</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Rechercher un radical ou une signification..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="radicals-search"
      />

      {/* Filter by WaniKani Level */}
      <select
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
        className="radicals-filter"
      >
        <option value="">Tous les niveaux</option>
        {Object.keys(radicalsData).map(level => (
          <option key={level} value={level}>
            Niveau {level}
          </option>
        ))}
      </select>

      {/* Display the radicals in a table */}
      <table className="radicals-table">
        <thead>
          <tr>
            <th>Radical</th>
            <th>Niveau</th>
            <th>Signification</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filterRadicals().map((radical, index) => (
            <tr key={index}>
              <td>{radical.radical}</td>
              <td>{selectedLevel || Object.keys(radicalsData).find(level => radicalsData[level].includes(radical))}</td>
              <td>{radical.signification}</td>
              <td>{radical.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RadicalsPage;
