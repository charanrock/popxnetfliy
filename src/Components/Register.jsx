import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setSuccess("");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters!");
      setSuccess("");
      return;
    }

    // ✅ Correct key + safe parsing
    let existingUsers;
    try {
      existingUsers = JSON.parse(localStorage.getItem("users"));
    } catch {
      existingUsers = [];
    }

    if (!Array.isArray(existingUsers)) {
      existingUsers = [];
    }

    // ✅ Add new user
    const newUser = { name, email, password };
    existingUsers.push(newUser);

    // ✅ Correct variable name
    localStorage.setItem("users", JSON.stringify(existingUsers));

    console.log("Registration Successful", existingUsers);

    setSuccess("Registration Successful ✅");
    setError("");

    setTimeout(() => {
      navigate("/login");
    }, 1000);

    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };



  return (
    <div className="register-container">
      <form className="register-box" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        {/* ✅ FIXED */}
        <p className="login-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;