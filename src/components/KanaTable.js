import React from 'react';

const KanaTable = ({ data }) => {
  return (
    <div className="kana-table-container">
      <h1>Kana List</h1>
      <table className="kana-table">
        <tbody>
          {data.map((kana, index) => (
            <tr key={index}>
              <td className="kana-symbol">{kana.symbol}</td>
              <td className="kana-romaji">{kana.romaji}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KanaTable;
