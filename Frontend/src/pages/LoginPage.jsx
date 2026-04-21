import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import decorativeImg from "../assets/amor.png"; // Your amor circle image

export default function LoginPage(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("restaurant");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password, role });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);
      if(user.role === "restaurant") navigate(`/dashboard/restaurant/${user.id}`);
      else navigate(`/dashboard/volunteer/${user.id}`);
    }catch(err){
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center p-4" style={{ backgroundColor: '#eff5e1', fontFamily: 'Inter, sans-serif' }}>
      <div className="flex items-center gap-0 max-w-3xl w-full">
        {/* Decorative Image - Left Side */}
        <div className=" w-160 h-200">
          <img 
            src={decorativeImg} 
            alt="decorative" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Login Box */}
        <div className="w-full rounded-xl shadow-lg p-10 transition-all duration-300 hover:shadow-3xl animate-fadeIn" style={{ maxWidth: 1000, backgroundColor: '#fefff4', borderColor: '#2d3b36', borderWidth: '2px' }}>
          <h2 className="text-3xl font-bold mb-6 text-center animate-slideDown" style={{ color: '#2d3b36' }}>Login</h2>
          
          <div className="space-y-4">
            <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>Role</label>
              <select 
                value={role} 
                onChange={e => setRole(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105"
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              >
                <option value="restaurant">Restaurant</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>Email</label>
              <input 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:scale-105" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                type="email"
                placeholder="your@email.com"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '1px',
                  color: '#2d3b36'
                }}
              />
            </div>

            <div className="animate-slideIn" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>Password</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:ring-2 focus:scale-105" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '1px',
                  color: '#2d3b36'
                }}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-slideIn" style={{ animationDelay: '0.4s' }}>
              <button 
                type="submit" 
                onClick={submit}
                className="flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg"
                style={{ 
                  background: "#2d3b36", 
                  color: "#fefff4", 
                  border: "none" 
                }}
              >
                Login
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 animate-slideIn" style={{ animationDelay: '0.5s' }}>
              <button
                type="button"
                onClick={() => navigate("/signup/restaurant")}
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md"
                style={{
                  backgroundColor: '#f8fee5',
                  color: '#2d3b36',
                  borderColor: '#2d3b36',
                  borderWidth: '1px'
                }}
              >
                Restaurant Sign up
              </button>
              <button
                type="button"
                onClick={() => navigate("/signup/volunteer")}
                className="flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md"
                style={{
                  backgroundColor: '#f8fee5',
                  color: '#2d3b36',
                  borderColor: '#2d3b36',
                  borderWidth: '1px'
                }}
              >
                Volunteer Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}