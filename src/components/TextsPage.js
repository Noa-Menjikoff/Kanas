import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Ensure supabaseClient is correctly imported
import '../css/TextPage.css';

const TextsPage = () => {
  const [texts, setTexts] = useState([]);
  const [userBooks, setUserBooks] = useState([]); // State to store user's books with statuses
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const userId = sessionStorage.getItem('userID'); // Assuming the user ID is stored in sessionStorage

  // Function to fetch texts from the 'books' table
  const fetchTexts = async () => {
    try {
      const { data: booksData, error: booksError } = await supabase
        .from('books')
        .select('id, title'); // Select only 'id' and 'title' for display

      if (booksError) {
        setErrorMessage('Error fetching texts from the database.');
        console.error('Supabase Error:', booksError.message);
      } else {
        setTexts(booksData);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      console.error('Unexpected Error:', err.message);
    }
  };

  // Function to fetch user's books from the 'user_books' table
  const fetchUserBooks = async () => {
    if (!userId) return; // No need to fetch if user is not logged in

    try {
      const { data: userBooksData, error: userBooksError } = await supabase
        .from('user_books')
        .select(`
          book_id, 
          id_status,
          status: status_books( status )
        `)
        .eq('user_id', userId);

        
      if (userBooksError) {
        setErrorMessage('Error fetching user book statuses.');
        console.error('Supabase Error:', userBooksError.message);
      } else {
        setUserBooks(userBooksData);
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      console.error('Unexpected Error:', err.message);
    }
  };

  // useEffect to fetch both texts and user books when component is mounted
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchTexts(), fetchUserBooks()])
      .finally(() => setLoading(false));
      console.log('fetchUserBook', fetchUserBooks());
  }, []);

  const getStatusForBook = (bookId) => {
    const userBook = userBooks.find((ub) => ub.book_id === bookId);
    const bookStatus = userBook ? userBook.status : ' Pas encore lue'; // Default status if not added
    return bookStatus; // Default status if not added
  };

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
              <div>
                <p className='linkP'> <Link to={`/texts/${text.id}`}>{text.title}</Link></p>
                <p className='book-status'>
                  {getStatusForBook(text.id)} { console.log(userBooks[0]) }
                </p>
              </div>
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
