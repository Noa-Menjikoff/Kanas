import React from 'react';

const Settings = ({ session }) => {
  if (!session) {
    return <p>No user data available.</p>;
  }

  const { username, email, level, exp } = session; // Assuming these fields are available in the session

  return (
    <div className="settings-container">
      <h1>User Settings</h1>
      <div>
        <p><strong>Username:</strong> {username}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Level:</strong> {level}</p>
        <p><strong>EXP:</strong> {exp}</p>
      </div>
    </div>
  );
};

export default Settings;
