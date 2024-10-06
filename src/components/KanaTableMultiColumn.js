import React from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/KanaTable.css'; // Styles du tableau

const KanaTableMultiColumn = ({ data }) => {
  const location = useLocation();

  // Déterminer le titre en fonction de l'URL
  const getTitle = () => {
    if (location.pathname.includes('hiragana')) {
      return 'Hiragana Table';
    } else if (location.pathname.includes('katakana')) {
      return 'Katakana Table';
    } else {
      return 'Kana Table';
    }
  };

  // Fonction pour télécharger le tableau en PDF
  const downloadPDF = () => {
    const input = document.getElementById('kana-table'); // Sélectionner l'élément du tableau à capturer

    // Utiliser html2canvas pour capturer le contenu du tableau en image
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png'); // Convertir le canvas en image
        const pdf = new jsPDF('p', 'mm', 'a4'); // Créer un document PDF

        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let position = 10;

        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        pdf.save(`${getTitle()}.pdf`);
      })
      .catch((error) => {
        console.error('Erreur lors de la génération du PDF :', error);
      });
  };

  return (
    <div className="kana-table-container">
      <h1>{getTitle()}</h1>
      {/* Bouton pour télécharger le tableau en PDF */}
      <button onClick={downloadPDF} className="download-button">Télécharger en PDF</button>

      <table className="kana-table" id="kana-table">
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
                    <React.Fragment>
                      <div>{kana.symbol}</div>
                      <div className="kana-romaji">{kana.romaji}</div>
                    </React.Fragment>
                  ) : (
                    <span>&nbsp;</span> // Utilisation de `span` au lieu de `div` pour espaces vides
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
