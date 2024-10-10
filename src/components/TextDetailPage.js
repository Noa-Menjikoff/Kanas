import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Assurez-vous que supabaseClient est bien importé
import '../css/TextDetailPage.css';

const TextDetailPage = () => {
  const { index } = useParams(); // Get the index from the URL
  const [textContent, setTextContent] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); // For loading state

  // Function to fetch text data from Supabase
  const fetchTextFromDatabase = async () => {
    try {
      // Fetch the data from Supabase 'books' table using the index (ID)
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', index) // Assuming 'index' is the primary key in the books table
        .single(); // We expect a single book text to be returned

      if (error) {
        setErrorMessage('Error fetching text content from the database.');
        console.error('Supabase Error:', error.message);
      } else {
        // Replace \n with <br> in the mainText before rendering
        data.mainText = data.mainText.replace(/\n/g, '<br/>'); // Replace all \n with <br> tags
        setTextContent(data); // Assuming 'data' has 'title', 'metadata', and 'mainText' fields
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
    fetchTextFromDatabase();
  }, [index]); // Dependency on index to fetch new data if the ID changes

  if (loading) {
    return <p>Loading...</p>; // Display loading message while data is being fetched
  }

  if (errorMessage) {
    return <p>{errorMessage}</p>; // Display error message if something went wrong
  }

  return (
    <div className='texteDetail'>
      {textContent ? (
        <>
          <h1>{textContent.title}</h1>
          <h1>{textContent.author}</h1>
          <div className='mainText'>
            {/* Render the main text content with HTML */}
            <div dangerouslySetInnerHTML={{ __html: textContent.mainText }} />
          </div>
        </>
      ) : (
        <p>No text content found.</p> // In case there's no content found for the given ID
      )}
    </div>
  );
};

export default TextDetailPage;
