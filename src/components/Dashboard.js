import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Supabase client initialization
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Check the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          setErrorMessage('You are not logged in. Redirecting to login...');
          navigate('/login'); // Redirect to login if not authenticated
          return;
        }

        // Fetch the user profile from the `users` table
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id) // Assuming `auth_id` in `users` links to the Supabase auth ID
          .single();

        if (error) {
          // Handle error but allow the profile to appear if the data is present
          setErrorMessage('Failed to fetch user details, but proceeding.');
        }

        if (userProfile) {
          setUserProfile(userProfile); // Update the user profile state
        } else {
          setErrorMessage('No user profile found.');
          navigate('/login'); // Redirect if no profile data
        }
      } catch (err) {
        console.error('Unexpected error during profile load:', err);
        setErrorMessage('An unexpected error occurred.');
      } finally {
        setLoading(false); // Stop the loading indicator once done
      }
    };

    loadUserProfile();
  }, [navigate]);

  // If still loading, show a loading message
  if (loading) {
    return <p>Loading user data...</p>;
  }

  // If there's an error, show the error message but allow profile to display if available
  if (errorMessage && !userProfile) {
    return <p>{errorMessage}</p>;
  }

  // Render the dashboard only if the profile exists
  return (
    <div className="dashboard-container">
      {userProfile ? (
        <>
          <h1>Welcome, {userProfile.username}!</h1>
          <p>Email: {userProfile.email}</p>
          <p>Level: {userProfile.level}</p>
          <p>EXP: {userProfile.exp}</p>
        </>
      ) : (
        <p>No profile data available.</p>
      )}
    </div>
  );
};

export default Dashboard;
