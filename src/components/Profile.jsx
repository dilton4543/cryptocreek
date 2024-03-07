import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [userImage, setUserImage] = useState(null); // State to hold the user's profile image
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchUserDetails = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');

      if (!accessToken || !userId) {
        setError('No access token or user ID available.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://cryprocreek.onrender.com/api/user/getUserById/${userId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`, //this grabs the token from the local storage
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user details');
        }

        const result = await response.json();
        setUserDetails(result.data); // Assuming the structure is { success: true, data: { ... } }
        localStorage.setItem('userDetails', JSON.stringify(result.data)); //store in local storage
        console.log(result.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    const savedImage = localStorage.getItem('userImage');
    if (savedImage) {
      setUserImage(savedImage);
    }

    fetchUserDetails();
  }, []);

  const getInitials = (name) => {
    return name ? name.split(' ')[0].substring(0, 2).toUpperCase() : 'XX';
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
        localStorage.setItem('userImage', reader.result); // Save image URL to local storage
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUserImage(null);
    localStorage.removeItem('userImage'); // Remove image URL from local storage
  };  

  if (isLoading) {
    return <div>Loading profile details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  const profileImage = userImage || `/default-avatar.png`;
  // Display user details
  return (
    <div className="profile-container">

    <div className="profile-picture-container">
     {userImage ? (
            <img src={profileImage} alt="Profile" className="profile-picture"/>
          ) : (
            <div className="profile-initials">{getInitials(userDetails?.firstName)}</div>
          )}
          <div className="profile-image-actions">
            <input
              type="file"
              id="imageUpload"
              hidden
              onChange={handleImageUpload}
            />
            <label htmlFor="imageUpload" className="image-upload-label">
              {userImage ? 'Change Photo' : 'Add Photo'}
            </label>
            {userImage && (
              <button onClick={removeImage} className="remove-photo-button">
                Remove Photo
              </button>
            )}
          </div>
    </div>

    <div className="user-details">
        <h1>User Profile</h1>
        <p>Username: {userDetails?.username}</p>
        <p>First Name: {userDetails?.firstName}</p>
        <p>Last Name: {userDetails?.lastName}</p>
        <p>Date of Birth: {userDetails?.dateOfBirth}</p>
        <p>Email: {userDetails?.email}</p>
        <p>Phone Number: {userDetails?.phoneNumber}</p>
      </div>
    </div>
  );
};

export default Profile;
