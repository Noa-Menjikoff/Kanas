import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = ({ setSession }) => {
  const [identifier, setIdentifier] = useState(''); // Can be email or username
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. Authenticate using Supabase's built-in auth system
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: identifier, // Assuming you authenticate with email
        password: password,
      });

      if (authError || !authData) {
        setErrorMessage('Invalid login credentials');
        return;
      }

      const userId = authData.user.id; // The user ID from Supabase authentication
      console.log('User ID:', userId);
      // 2. Once authenticated, fetch additional user details from the `users` table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId) // Ensure 'auth_id' exists in your 'users' table as a foreign key
        .single();

      if (userError || !userData) {
        setErrorMessage('Failed to fetch user details');
        return;
      }

      // 3. Save user details to session (including extra fields from `users` table)
      const sessionUser = { ...authData.user, ...userData }; // Combine Supabase auth info and custom user data
      setSession(sessionUser); // Update session with user data

      // Optionally save userID in sessionStorage or localStorage
      sessionStorage.setItem('userID', userData.id);

      // 4. Redirect to the dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Login failed');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className='auth'>
        <input
          type="text"
          placeholder="Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className='Button-auth'>Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
