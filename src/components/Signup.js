// src/components/Signup.js
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../css/Auth.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // 1. Sign up with email and password via Supabase auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (signUpError) {
        setErrorMessage('Erreur lors de l\'inscription : ' + signUpError.message);
        return;
      }

      const userId = data.user.id;

      // 2. Insert the user into the custom `users` table (without storing password)
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ id: userId, email: email, username: username , password: password}]); // Insert user details (excluding password)

      if (insertError) {
        setErrorMessage('Erreur lors de l\'insertion dans la table des utilisateurs : ' + insertError.message);
        return;
      }

      // 3. Success: Clear form and show success message
      setSuccessMessage('Utilisateur créé avec succès et inséré dans la base de données !');
      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error('Unexpected error during signup:', error);
      setErrorMessage('Une erreur inattendue est survenue lors de l\'inscription.');
    }
  };

  return (
    <div className="login-container">
      <h2>Inscription</h2>
      <form onSubmit={handleSignup} className='auth'>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='Button-auth'>S'inscrire</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Signup;
