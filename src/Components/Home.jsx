import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!storedUser) {
      navigate("/login"); // ❌ not logged in
    } else {
      setUser(storedUser); // ✅ set user data
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="home-container">
      <div className="card">
        <div className="top">
          <h3>Account Settings</h3>
          <button onClick={handleLogout}>Logout</button>
        </div>

        <div className="profile">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="avatar"
          />

          <div>
            <h4>{user.name}</h4>
            <p>{user.email}</p>
          </div>
        </div>

        <p className="desc">
          Welcome {user.name}! This is your dashboard. Your account details are shown here.
        </p>
      </div>
    </div>
  );
};

export default Home;