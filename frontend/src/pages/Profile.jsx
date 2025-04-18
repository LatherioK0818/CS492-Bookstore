import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { fetchCurrentUser } from '../services/apiServices'; 
import PageContainer from "../components/PageContainer";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (accessToken) {
        setLoading(true);
        setError(null);
        try {
          const userData = await fetchCurrentUser(accessToken);
          setUser(userData);
        } catch (err) {
          setError('Failed to load profile information.');
          console.error('Error fetching profile:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setError('Not authenticated.');
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [accessToken]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user information available.</div>;
  }

  return (
    <PageContainer>
    <div style={{ maxWidth: 600, margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>User Profile</h2>
      <div style={{ marginBottom: '15px' }}>
        <strong>Username:</strong> {user.username}
      </div>
      <div style={{ marginBottom: '15px' }}>
        <strong>Email:</strong> {user.email}
      </div>
      {user.is_staff && (
        <div style={{ marginBottom: '15px', color: 'green' }}>
          <strong>Role:</strong> Administrator
        </div>
      )}
      {/* Add other user information you want to display */}
      <pre>{/* Optional: Display the entire user object for debugging */}
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
    </PageContainer>
  );
};

export default Profile;