import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Assurez-vous que supabaseClient est bien importé
import '../css/TextPage.css';
const TextsPage = () => {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to fetch texts from the 'books' table
  const fetchTexts = async () => {
    try {
      // Fetch all the texts from the 'books' table
      const { data, error } = await supabase
        .from('books')
        .select('id, title'); // Select only 'id' and 'title' for display purposes

      if (error) {
        setErrorMessage('Error fetching texts from the database.');
        console.error('Supabase Error:', error.message);
      } else {
        setTexts(data); // Set the texts from the database into state
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      console.error('Unexpected Error:', err.message);
    } finally {
      setLoading(false); // Stop the loading state
    }
  };

  // useEffect to fetch data when component is mounted
  useEffect(() => {
    fetchTexts();
  }, []);

  if (loading) {
    return <p>Loading texts...</p>;
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <div>
      <h1>List of Texts</h1>
      <ul className='list-texts'>
        {texts.length > 0 ? (
          texts.map((text) => (
            <li key={text.id}>
              <Link to={`/texts/${text.id}`}>{text.title}</Link> {/* Use the text ID to build the link */}
            </li>
          ))
        ) : (
          <p>No texts available.</p>
        )}
      </ul>
    </div>
  );
};

export default TextsPage;
