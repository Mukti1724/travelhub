import { useState } from "react";
import "../styles/profile.css";

function Profile() {
  const email = localStorage.getItem("user");

  // Load saved data
  const savedName = localStorage.getItem("name") || email.split("@")[0];
  const savedPhoto = localStorage.getItem("photo");

  const [name, setName] = useState(savedName);
  const [edit, setEdit] = useState(false);
  const [photo, setPhoto] = useState(savedPhoto);

  // Save name
  const handleSave = () => {
    localStorage.setItem("name", name);
    setEdit(false);
  };

  // Upload photo
  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
        localStorage.setItem("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        <h2>Profile</h2>

        {/* PHOTO */}
        <div className="profile-photo">
          {photo ? (
            <img src={photo} alt="profile" />
          ) : (
            <div className="placeholder">👤</div>
          )}

          <input type="file" onChange={handlePhoto} />
        </div>

        {/* NAME */}
        <div className="profile-info">
          <p><strong>Email:</strong> {email}</p>

          {edit ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button onClick={handleSave}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {name}</p>
              <button onClick={() => setEdit(true)}>Edit Name</button>
            </>
          )}
        </div>

        {/* LOGOUT */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;