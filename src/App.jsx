import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home"; // ✅ add this

function App() {
    return (

        <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} /> {/* ✅ new route */}
        </Routes>

    );
}

export default App;