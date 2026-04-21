import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import flowerImg from "../assets/flower.png";
import heartImg from "../assets/heart.png";

export default function VolunteerSignup(){
  const [form,setForm] = useState({ngoName:"",representativeName:"",contact:"",email:"",password:"",confirmPassword:"",volunteersCount:"",address:""});
  const [coords,setCoords] = useState({lat:"",lng:""});
  const [regDoc,setRegDoc] = useState(null);
  const [logo,setLogo] = useState(null);
  const navigate = useNavigate();

  const useLocation = () => {
    if(!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(pos => setCoords({lat:pos.coords.latitude,lng:pos.coords.longitude}));
  };

  const submit = async e => {
    e.preventDefault();
    try{
      const data = new FormData();
      Object.entries(form).forEach(([k,v])=>data.append(k,v));
      data.append("latitude", coords.lat);
      data.append("longitude", coords.lng);
      if(regDoc) data.append("registrationDoc", regDoc);
      if(logo) data.append("logo", logo);
      await axios.post("http://localhost:5000/api/auth/register/volunteer", data);
      alert("Registered. Login now.");
      navigate("/");
    }catch(err){
      alert(err.response?.data?.message || "Error");
    }
  };

 return (
    <div className="fixed inset-0 w-full h-full overflow-y-auto p-4" style={{ backgroundColor: '#eff5e1', fontFamily: 'Inter, sans-serif' }}>
      {/* Decorative Images */}
      <div className="absolute top-8 left-40 w-60 h-70 opacity-80">
        <img 
          src={flowerImg} 
          alt="flower" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <div className="absolute bottom-0 right-28 left-70 w-60 h-70 opacity-80">
        <img 
          src={flowerImg}
          alt="flower" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <div className="absolute top-20 right-13 w-60 h-70  opacity-80">
        <img 
          src={flowerImg}
          alt="flower" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>

      <div className="absolute bottom-8 right-0 w-60 h-70 opacity-80">
        <img 
          src={flowerImg} 
          alt="flower" 
          className="w-full h-full object-contain rounded-full" 
        />
      </div>
      
      <div className="max-w-3xl mx-auto py-8">
        <div className="rounded-xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl animate-fadeIn relative overflow-hidden" style={{ maxWidth: 720, margin: "24px auto", backgroundColor: '#fefff4', borderColor: '#2d3b36', borderWidth: '2px' }}>
          
          {/* Header */}
          <div className="mb-6 animate-slideDown text-center">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#2d3b36' }}>Volunteer Signup</h2>
            <p className="text-sm leading-relaxed" style={{ color: '#525349' }}>
              Join our community of volunteers dedicated to reducing food waste and feeding those in need. 
              Register your NGO or volunteer committee to start making a difference today.
            </p>
          </div>

          <div className="space-y-4">
            {/* NGO / Committee Name */}
            <div className="animate-slideIn" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                NGO / Committee Name
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                value={form.ngoName} 
                onChange={e => setForm({...form, ngoName: e.target.value})} 
                placeholder="Enter organization name"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Representative Name */}
            <div className="animate-slideIn" style={{ animationDelay: '0.15s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Representative Name
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                value={form.representativeName} 
                onChange={e => setForm({...form, representativeName: e.target.value})} 
                placeholder="Contact person name"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Contact */}
            <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Contact
              </label>
              <input 
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                value={form.contact} 
                onChange={e => setForm({...form, contact: e.target.value})} 
                placeholder="Phone number"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Email */}
            <div className="animate-slideIn" style={{ animationDelay: '0.25s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Email
              </label>
              <input 
                type="email"
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                value={form.email} 
                onChange={e => setForm({...form, email: e.target.value})} 
                placeholder="your@email.com"
                required 
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slideIn" style={{ animationDelay: '0.3s' }}>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                  Password
                </label>
                <input 
                  type="password"
                  className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                  value={form.password} 
                  onChange={e => setForm({...form, password: e.target.value})} 
                  placeholder="••••••••"
                  required 
                  style={{ 
                    backgroundColor: '#fefff4',
                    borderColor: '#2d3b36',
                    borderWidth: '2px',
                    color: '#2d3b36'
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                  Confirm
                </label>
                <input 
                  type="password"
                  className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                  value={form.confirmPassword} 
                  onChange={e => setForm({...form, confirmPassword: e.target.value})} 
                  placeholder="••••••••"
                  required 
                  style={{ 
                    backgroundColor: '#fefff4',
                    borderColor: '#2d3b36',
                    borderWidth: '2px',
                    color: '#2d3b36'
                  }}
                />
              </div>
            </div>

            {/* Volunteers Count */}
            <div className="animate-slideIn" style={{ animationDelay: '0.35s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Volunteers Count
              </label>
              <input 
                type="number"
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                value={form.volunteersCount} 
                onChange={e => setForm({...form, volunteersCount: e.target.value})}
                placeholder="Number of volunteers"
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Location */}
            <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Location
              </label>
              <div className="flex flex-col md:flex-row gap-2">
                <button 
                  type="button" 
                  onClick={useLocation}
                  className="px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 whitespace-nowrap"
                  style={{
                    backgroundColor: '#f8fee5',
                    color: '#2d3b36',
                    borderColor: '#2d3b36',
                    borderWidth: '2px'
                  }}
                >
                  Use my location
                </button>
                <input 
                  className="flex-1 px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:scale-105" 
                  placeholder="Address (opt)" 
                  value={form.address} 
                  onChange={e => setForm({...form, address: e.target.value})}
                  style={{ 
                    backgroundColor: '#fefff4',
                    borderColor: '#2d3b36',
                    borderWidth: '2px',
                    color: '#2d3b36'
                  }}
                />
              </div>
              {coords.lat && (
                <p className="text-sm mt-2 animate-fadeIn" style={{ color: '#525349' }}>
                  Location: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                </p>
              )}
            </div>

            {/* Registration Doc */}
            <div className="animate-slideIn" style={{ animationDelay: '0.45s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Registration Doc (pdf/image)
              </label>
              <input 
                type="file" 
                accept=".pdf,image/*" 
                onChange={e => setRegDoc(e.target.files[0])}
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm"
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Logo */}
            <div className="animate-slideIn" style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#2d3b36' }}>
                Logo (optional)
              </label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={e => setLogo(e.target.files[0])}
                className="w-full px-4 py-3 rounded-lg transition-all duration-200 text-sm"
                style={{ 
                  backgroundColor: '#fefff4',
                  borderColor: '#2d3b36',
                  borderWidth: '2px',
                  color: '#2d3b36'
                }}
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6 animate-slideIn" style={{ animationDelay: '0.55s' }}>
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
                Register
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: '#f8fee5',
                  color: '#2d3b36',
                  borderColor: '#2d3b36',
                  borderWidth: '2px'
                }}
              >
                Back
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