// src/components/TextsPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import textsData from '../data/textsT'; // Import the list of texts

const TextsPage = () => {
  return (
    <div>
      <h1>List of Texts</h1>
      <ul>
        {textsData.map((text, index) => (
          <li key={index}>
            <Link to={`/texts/${index}`}>{text.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TextsPage;
