import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Check if user exists
    const userExists = users.find((user) => user.email === email);

    if (!userExists) {
      alert("User not found ❌");
      return;
    }

    // ✅ Check password
    if (userExists.password !== password) {
      alert("Wrong password ❌");
      return;
    }

    // ✅ Success
    alert("Login Successful ✅");

    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(userExists));

    navigate("/home");
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <button type="submit">Login</button>

        <p className="register-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;