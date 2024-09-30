import React from 'react';
import { useNavigate } from 'react-router-dom';
import './KanaTable.css'; // Styles du tableau

const KanaTableMultiColumn = ({ data }) => {
  const navigate = useNavigate(); // Hook pour gérer la navigation

  return (
    
    <div className="kana-table-container">
      <h1>Kana Table</h1> {/* Le titre peut être modifié pour Hiragana ou Katakana */}
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
