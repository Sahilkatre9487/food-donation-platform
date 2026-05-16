import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/admin/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(res.data.admin)
      );

      alert("Login successful");

      navigate("/admin/dashboard");

    } catch (err) {

      alert("Invalid credentials");

    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fefff4]">

      <div className="bg-white p-8 rounded-xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-[#2d3b36] text-white py-3 rounded-lg"
        >
          Login
        </button>

      </div>

    </div>
  );

}