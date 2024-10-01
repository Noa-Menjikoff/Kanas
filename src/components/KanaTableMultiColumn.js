import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/KanaTable.css'; // Styles du tableau

const KanaTableMultiColumn = ({ data }) => {
  const location = useLocation(); // Obtenir l'URL actuelle

  // Déterminer le titre en fonction de l'URL
  const getTitle = () => {
    if (location.pathname.includes('hiragana')) {
      return 'Hiragana Table';
    } else if (location.pathname.includes('katakana')) {
      return 'Katakana Table';
    } else {
      return 'Kana Table'; // Valeur par défaut si aucun des deux
    }
  };

  return (
    <div className="kana-table-container">
      <h1>{getTitle()}</h1> {/* Affiche Hiragana ou Katakana selon la page */}
      <table className="kana-table">
        <thead>
          <tr>
            <th>a</th>
            <th>i</th>
            <th>u</th>
            <th>e</th>
            <th>o</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((kana, index) => (
                <td key={index} className="kana-symbol">
                  {kana.symbol ? (
                    <>
                      <div>{kana.symbol}</div>
                      <div className="kana-romaji">{kana.romaji}</div>
                    </>
                  ) : (
                    <div>&nbsp;</div> // Affichage d'un espace pour les cellules vides
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KanaTableMultiColumn;
