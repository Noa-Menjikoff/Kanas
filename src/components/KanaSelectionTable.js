import React from 'react';
import hiraganaData from '../data/hiragana';
import katakanaData from '../data/katakana';
import './KanaTable.css'; // Styles

const KanaSelectionTable = ({ selectedKanas, setSelectedKanas }) => {
  const handleCheckboxChange = (groupName, index, isChecked) => {
    if (isChecked) {
      setSelectedKanas((prevState) => [...prevState, { groupName, index }]);
    } else {
      setSelectedKanas((prevState) =>
        prevState.filter((k) => !(k.groupName === groupName && k.index === index))
      );
    }
  };

  const renderTable = (data, groupName) => {
    return (
      <table className="kana-table">
        <thead>
          <tr>
            <th>Select</th>
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
              <td>
                <input
                  type="checkbox"
                  onChange={(e) =>
                    handleCheckboxChange(groupName, rowIndex, e.target.checked)
                  }
                />
              </td>
              {row.map((kana, colIndex) => (
                <td key={colIndex}>
                  {kana.symbol && (
                    <div>
                      {kana.symbol}
                      <br />
                      <small>{kana.romaji}</small>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="kana-selection-container">
      <div className="kana-table-column">
        <h2>Hiragana</h2>
        {renderTable(hiraganaData, 'hiragana')}
      </div>
      <div className="kana-table-column">
        <h2>Katakana</h2>
        {renderTable(katakanaData, 'katakana')}
      </div>
    </div>
  );
};

export default KanaSelectionTable;
