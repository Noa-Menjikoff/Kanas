// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { supabase } from './supabaseClient'; 
import Home from './components/Home';
import KanaTableMultiColumn from './components/KanaTableMultiColumn';
import Quiz from './components/Quiz';
import KanaSelectionPage from './components/KanaSelectionPage';
import KanjiPage from './components/KanjiPage';
import RadicalPage from './components/RadicalPage';
import DrawKana from './components/DrawKana';
import hiraganaData from './data/hiragana';
import katakanaData from './data/katakana';
import TextPage from './components/TextsPage';
import TextDetailPage from './components/TextDetailPage';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

import profilePic from './img/utilisateur.png';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedKanas, setSelectedKanas] = useState([]);
  const [session, setSession] = useState(null); // Initialize session state

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Check the session at the start
  useEffect(() => {
    const checkSession = async () => {
      // Get the current session from Supabase
      const { data: { session } } = await supabase.auth.getSession(); 
      
      if (session) {
        // Fetch additional details from your `users` table based on the Supabase auth user ID
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id) // Assuming `auth_id` links to `auth.users.id`
          .single();

        if (userData) {
          setSession({ ...session.user, ...userData }); // Combine auth user and custom user data
        }
      } else {
        setSession(null); // Clear session if no user is logged in
      }
    };

    checkSession();

    // Listen for changes in the auth session
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Fetch additional user details when the session changes
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => setSession({ ...session.user, ...data }));
      } else {
        setSession(null);
      }
    });

    return () => authListener.subscription.unsubscribe(); // Clean up listener on unmount
  }, []);

  // Function to log out the user and update the session state
  const handleLogout = async () => {
    await supabase.auth.signOut(); // Sign out from Supabase
    sessionStorage.removeItem('userID'); // Clear any userID stored in sessionStorage
    setSession(null); // Clear session state after logout
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <img src={`${process.env.PUBLIC_URL}/logo_nihongo.png`} alt="logo" className="logo-nav" />
          <button className="hamburger" onClick={toggleMenu}>
            &#9776;
          </button>
          <ul className={`navbar-list ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/hiragana" onClick={toggleMenu}>Hiragana</Link></li>
            <li><Link to="/katakana" onClick={toggleMenu}>Katakana</Link></li>
            <li><Link to="/kana-selection" onClick={toggleMenu}>Start Quiz</Link></li>
            <li><Link to="/kanji" onClick={toggleMenu}>Kanjis</Link></li>
            <li><Link to="/radicals" onClick={toggleMenu}>Radicaux</Link></li>
            <li><Link to="/draw-kana" onClick={toggleMenu}>Dessiner un Kana</Link></li>
            <li><Link to="/texts" onClick={toggleMenu}>Textes</Link></li>
            {!session ? (
              <>
                <li><Link to="/signup" onClick={toggleMenu}>S'inscrire</Link></li>
                <li><Link to="/login" onClick={toggleMenu}>Se connecter</Link></li>
              </>
            ) : (
              <div className="profile-container">
                <img
                  src={session.profile_pic || profilePic}
                  alt="Profile"
                  className="profile-pic"
                />
                <div className="dropdown-menu">
                  <Link to="/dashboard" className="dropdown-item">Dashboard</Link>
                  <Link to="/settings" className="dropdown-item">Settings</Link>
                  <p className="dropdown-item">Niveau : {session.level}</p>
                  <button className="dropdown-item" onClick={handleLogout}>Se déconnecter</button>
                </div>
              </div>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hiragana" element={<KanaTableMultiColumn data={hiraganaData} />} />
          <Route path="/katakana" element={<KanaTableMultiColumn data={katakanaData} />} />
          <Route path="/kana-selection" element={<KanaSelectionPage selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />} />
          <Route path="/quiz" element={<Quiz selectedKanas={selectedKanas} setSelectedKanas={setSelectedKanas} />} />
          <Route path="/kanji" element={<KanjiPage />} />
          <Route path="/radicals" element={<RadicalPage />} />
          <Route path="/draw-kana" element={<DrawKana />} />
          <Route path="/texts" element={<TextPage />} />
          <Route path="/texts/:index" element={<TextDetailPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setSession={setSession} />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings session={session} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
