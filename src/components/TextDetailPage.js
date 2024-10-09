import React from 'react';
import { useParams } from 'react-router-dom';
import textsData from '../data/textsT'; // Import the list of texts

const TextDetailPage = () => {
  const { index } = useParams(); // Get the index from the URL
  const textContent = textsData[index].textContent;
  
  return (
    <div>
      <h1>{textsData[index].title}</h1>
      <div>
        <h2>Metadata</h2>
        {/* Using pre tag to preserve line breaks */}
        <pre>{textContent.metadata}</pre>
      </div>
      <div>
        <h2>Main Text</h2>
        {/* Again using pre tag to preserve line breaks */}
        <pre>{textContent.mainText}</pre>
      </div>
    </div>
  );
};

export default TextDetailPage;
